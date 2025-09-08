import { supabaseAdmin } from '../../../lib/supabase'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Buscar todos os usuários premium com seus dados
    const { data: users, error } = await supabaseAdmin
      .from('users')
      .select('id, email, name, phone, plan, created_at, updated_at')
      .eq('plan', 'premium')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Erro ao buscar usuários premium:', error)
      return res.status(500).json({ error: 'Erro ao buscar usuários' })
    }

    const stats = {
      total_premium: users.length,
      with_email: users.filter(u => u.email).length,
      with_name: users.filter(u => u.name).length,
      with_phone: users.filter(u => u.phone).length,
      complete_data: users.filter(u => u.email && u.name && u.phone).length
    }

    return res.status(200).json({ 
      success: true,
      stats,
      users: users.map(user => ({
        ...user,
        // Mascarar dados sensíveis para segurança
        email: user.email ? `${user.email.substring(0, 3)}***@${user.email.split('@')[1]}` : null,
        phone: user.phone ? `${user.phone.substring(0, 4)}****${user.phone.substring(8)}` : null
      }))
    })

  } catch (error) {
    console.error('Erro na API list-premium:', error)
    return res.status(500).json({ error: 'Erro interno do servidor' })
  }
}