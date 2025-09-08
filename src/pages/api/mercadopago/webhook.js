import { getPaymentInfo } from '../../../lib/mercadopago'
import { supabaseAdmin } from '../../../lib/supabase'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
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
        const { error: userUpdateError } = await supabaseAdmin
          .from('users')
          .update({ 
            plan: 'premium',
            updated_at: new Date().toISOString()
          })
          .eq('id', userId)

        if (userUpdateError) {
          console.error('Erro ao atualizar plano do usuário:', userUpdateError)
        }

        console.log(`Usuário ${userId} atualizado para plano premium`)
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