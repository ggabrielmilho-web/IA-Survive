import { createDiagnosticCheckout } from '../../../lib/mercadopago'
import { supabaseAdmin } from '../../../lib/supabase'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { 
      userId, 
      quizSessionId, 
      withOrderBump = false,
      userEmail,
      userName
    } = req.body

    // Validar dados obrigatórios
    if (!userId || !quizSessionId) {
      return res.status(400).json({ 
        error: 'userId e quizSessionId são obrigatórios' 
      })
    }

    // Buscar dados do usuário
    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()

    if (userError && userError.code !== 'PGRST116') {
      console.error('Erro ao buscar usuário:', userError)
      return res.status(500).json({ error: 'Erro interno do servidor' })
    }

    // Dados do usuário para checkout
    const userData = {
      userId,
      quizSessionId,
      email: user?.email || userEmail,
      name: user?.name || userName,
      productType: withOrderBump ? 'diagnostic_with_ebook' : 'diagnostic'
    }

    // Criar checkout no Mercado Pago
    const checkoutResult = await createDiagnosticCheckout(userData, withOrderBump)

    if (!checkoutResult.success) {
      return res.status(500).json({ 
        error: 'Erro ao criar checkout',
        details: checkoutResult.error 
      })
    }

    // Criar registro do pedido no banco
    const orderData = {
      user_id: userId,
      product_type: withOrderBump ? 'diagnostic_with_ebook' : 'diagnostic',
      amount: withOrderBump ? 29.80 : 19.90, // diagnostic + ebook ou só diagnostic
      currency: 'BRL',
      status: 'pending',
      metadata: {
        quiz_session_id: quizSessionId,
        mercadopago_preference_id: checkoutResult.preferenceId,
        with_order_bump: withOrderBump
      }
    }

    const { data: order, error: orderError } = await supabaseAdmin
      .from('orders')
      .insert([orderData])
      .select()
      .single()

    if (orderError) {
      console.error('Erro ao criar pedido:', orderError)
      // Continuar mesmo com erro no banco, pois checkout foi criado
    }

    res.status(200).json({
      success: true,
      preferenceId: checkoutResult.preferenceId,
      initPoint: checkoutResult.initPoint,
      sandboxInitPoint: checkoutResult.sandboxInitPoint,
      orderId: order?.id
    })

  } catch (error) {
    console.error('Erro na API create-checkout:', error)
    res.status(500).json({ 
      error: 'Erro interno do servidor',
      details: error.message 
    })
  }
}