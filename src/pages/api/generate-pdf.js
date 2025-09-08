import { generateDiagnosticPDF, generateEbookPDF } from '../../lib/pdf-generator'
import { generateDiagnosis, generateActionPlan } from '../../lib/quiz-logic'
import { supabaseAdmin } from '../../lib/supabase'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { userId, type, quizData } = req.body

    // Verificar se usuário tem acesso premium
    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .select('plan')
      .eq('id', userId)
      .single()

    if (userError || user?.plan !== 'premium') {
      return res.status(403).json({ error: 'Acesso negado - Premium necessário' })
    }

    let pdfBlob

    if (type === 'diagnostic') {
      // Gerar PDF do diagnóstico
      const diagnosis = generateDiagnosis(quizData.isia, quizData.riskLevel, quizData.answers)
      const actionPlan = generateActionPlan(quizData.isia, quizData.riskLevel, quizData.answers)
      
      pdfBlob = generateDiagnosticPDF(user, quizData, diagnosis, actionPlan)
    } else if (type === 'ebook') {
      // Gerar PDF do e-book
      pdfBlob = generateEbookPDF()
    } else {
      return res.status(400).json({ error: 'Tipo inválido' })
    }

    // Converter blob para buffer
    const arrayBuffer = await pdfBlob.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Definir headers para download
    const filename = type === 'diagnostic' 
      ? `diagnostico-isia-${quizData.isia}.pdf`
      : '50-comandos-proibidos-ia.pdf'

    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`)
    res.setHeader('Content-Length', buffer.length)

    // Retornar PDF
    res.send(buffer)

  } catch (error) {
    console.error('Erro ao gerar PDF:', error)
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
}