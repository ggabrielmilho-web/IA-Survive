import { getPaymentInfo } from '../../../lib/mercadopago'
import { supabaseAdmin } from '../../../lib/supabase'
import crypto from 'crypto'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Verificar assinatura do webhook (opcional, para maior segurança)
    const webhookSecret = process.env.MERCADOPAGO_WEBHOOK_SECRET
    if (webhookSecret) {
      const signature = req.headers['x-signature']
      const requestId = req.headers['x-request-id']
      
      if (signature && requestId) {
        const dataID = req.body?.data?.id
        const ts = signature.split(',')[0].split('=')[1]
        const hash = signature.split(',')[1].split('=')[1]
        
        const manifest = `id:${dataID};request-id:${requestId};ts:${ts};`
        const hmac = crypto.createHmac('sha256', webhookSecret)
        hmac.update(manifest)
        const sha = hmac.digest('hex')
        
        if (sha !== hash) {
          console.error('Assinatura do webhook inválida')
          return res.status(401).json({ error: 'Unauthorized' })
        }
      }
    }

    console.log('Webhook recebido:', req.body)

    const { type, data } = req.body

    // Processar apenas notificações de pagamento
    if (type === 'payment') {
      const paymentId = data.id

      // Buscar informações detalhadas do pagamento
      const paymentResult = await getPaymentInfo(paymentId)

      if (!paymentResult.success) {
        console.error('Erro ao buscar pagamento:', paymentResult.error)
        return res.status(400).json({ error: 'Erro ao processar pagamento' })
      }

      const paymentData = paymentResult.payment
      const userId = paymentData.external_reference
      const status = paymentData.status

      console.log(`Pagamento ${paymentId} - Status: ${status} - Usuario: ${userId}`)

      // Atualizar status do pedido no banco
      const { data: order, error: updateError } = await supabaseAdmin
        .from('orders')
        .update({
          mercadopago_payment_id: paymentId.toString(),
          status: mapPaymentStatus(status),
          metadata: {
            ...paymentData.metadata,
            payment_method: paymentData.payment_method_id,
            payment_type: paymentData.payment_type_id,
            transaction_amount: paymentData.transaction_amount,
            currency: paymentData.currency_id,
            updated_at: new Date().toISOString()
          }
        })
        .eq('user_id', userId)
        .eq('status', 'pending')
        .select()
        .single()

      if (updateError) {
        console.error('Erro ao atualizar pedido:', updateError)
        // Continuar processamento mesmo com erro
      }

      // Se pagamento aprovado, atualizar plano do usuário
      if (status === 'approved') {
        // Extrair TODOS os dados do payer do Mercado Pago
        const payerName = paymentData.payer?.first_name || 
                         paymentData.payer?.name || 
                         `${paymentData.payer?.first_name || ''} ${paymentData.payer?.last_name || ''}`.trim() || 
                         null
        
        const payerEmail = paymentData.payer?.email || null
        
        const payerPhone = paymentData.payer?.phone ? 
          `${paymentData.payer.phone.area_code || ''}${paymentData.payer.phone.number || ''}` : null

        // UPSERT completo - salva TODOS os dados disponíveis
        const updateData = {
          plan: 'premium',
          updated_at: new Date().toISOString()
        }

        // Só atualizar campos se tiver dados do MP (não sobrescrever com null)
        if (payerEmail) updateData.email = payerEmail
        if (payerName) updateData.name = payerName  
        if (payerPhone) updateData.phone = payerPhone

        const { data: updatedUser, error: userUpdateError } = await supabaseAdmin
          .from('users')
          .update(updateData)
          .eq('id', userId)
          .select()
          .single()

        if (userUpdateError) {
          console.error('Erro ao atualizar plano do usuário:', userUpdateError)
        } else {
          console.log(`✅ Usuário ${userId} atualizado para PREMIUM`)
          console.log(`📧 Email: ${updatedUser?.email || 'não informado'}`)
          console.log(`👤 Nome: ${updatedUser?.name || 'não informado'}`) 
          console.log(`📱 Phone: ${updatedUser?.phone || 'não informado'}`)
        }
      }
    }

    // Sempre retornar 200 para o Mercado Pago
    res.status(200).json({ received: true })

  } catch (error) {
    console.error('Erro no webhook:', error)
    res.status(200).json({ received: true, error: error.message })
  }
}

function mapPaymentStatus(mercadoPagoStatus) {
  const statusMap = {
    'pending': 'pending',
    'approved': 'approved', 
    'authorized': 'approved',
    'in_process': 'pending',
    'in_mediation': 'pending',
    'rejected': 'rejected',
    'cancelled': 'cancelled',
    'refunded': 'refunded',
    'charged_back': 'refunded'
  }

  return statusMap[mercadoPagoStatus] || 'pending'
}