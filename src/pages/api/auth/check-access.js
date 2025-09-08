import { supabaseAdmin } from '../../../lib/supabase'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({ error: 'Email é obrigatório' })
    }

    // Verificar se usuário existe e tem plano premium
    const { data: user, error } = await supabaseAdmin
      .from('users')
      .select('id, email, name, phone, plan, created_at')
      .eq('email', email.toLowerCase())
      .eq('plan', 'premium')
      .single()

    if (error || !user) {
      // Para desenvolvimento, permitir acesso com qualquer email
      if (process.env.NODE_ENV === 'development') {
        return res.status(200).json({ 
          hasAccess: true,
          user: {
            id: 'dev-user',
            email: email,
            name: 'Usuário de Desenvolvimento',
            plan: 'premium'
          }
        })
      }

      return res.status(200).json({ 
        hasAccess: false, 
        message: 'Email não encontrado ou sem plano premium' 
      })
    }

    // Buscar dados do quiz se existir
    const { data: quizSession } = await supabaseAdmin
      .from('quiz_sessions')
      .select('*')
      .eq('user_id', user.id)
      .order('completed_at', { ascending: false })
      .limit(1)
      .single()

    return res.status(200).json({ 
      hasAccess: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        plan: user.plan,
        quizData: quizSession
      }
    })

  } catch (error) {
    console.error('Erro ao verificar acesso:', error)
    return res.status(500).json({ error: 'Erro interno do servidor' })
  }
}