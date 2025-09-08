import { supabaseAdmin } from '../../../lib/supabase'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { userId, email, name, phone } = req.body

    if (!userId) {
      return res.status(400).json({ error: 'userId é obrigatório' })
    }

    // Criar ou atualizar usuário
    const { data: user, error } = await supabaseAdmin
      .from('users')
      .upsert({
        id: userId,
        email: email || null,
        name: name || null,
        phone: phone || null,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'id',
        returning: 'minimal'
      })

    if (error) {
      console.error('Erro ao salvar contato:', error)
      return res.status(500).json({ error: 'Erro ao salvar contato' })
    }

    return res.status(200).json({ 
      success: true,
      message: 'Contato salvo com sucesso' 
    })

  } catch (error) {
    console.error('Erro na API save-contact:', error)
    return res.status(500).json({ error: 'Erro interno do servidor' })
  }
}