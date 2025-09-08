import fs from 'fs'
import path from 'path'
import { supabaseAdmin } from '../../../lib/supabase'
import { generateDiagnosticPDF } from '../../../lib/diagnostic-pdf-generator'

export default async function handler(req, res) {
  const { type } = req.query
  const { userId } = req.body || req.query

  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Para desenvolvimento, permitir acesso sem verificação
    // Em produção, descomentar a verificação abaixo:
    
    /*
    // Verificar se usuário tem acesso premium
    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .select('plan')
      .eq('id', userId)
      .single()

    if (userError || user?.plan !== 'premium') {
      return res.status(403).json({ error: 'Acesso negado - Premium necessário' })
    }
    */

    let filePath
    let fileName
    let contentType = 'application/pdf'

    if (type === 'ebook') {
      // Caminho para o PDF do e-book que você já tem
      filePath = path.join(process.cwd(), 'public', 'assets', 'ebooks', '50-comandos-proibidos-ia.pdf')
      fileName = '50-comandos-proibidos-ia.pdf'
    } else if (type === 'diagnostic') {
      // Gerar PDF dinâmico do diagnóstico com dados do usuário
      const userData = {
        isia: 6.3, // Em produção, vem do banco de dados
        riskLevel: 'moderate',
        answers: {
          area: 1, // Finanças
          repetitive: 3, // 61-80%
          aiUsage: 2, // Às vezes
          humanInteraction: 1, // Às vezes
          digitalDependency: 4 // Totalmente
        },
        userName: 'Usuário Premium',
        completedAt: new Date()
      }
      
      const pdfDoc = generateDiagnosticPDF(userData)
      const pdfBuffer = Buffer.from(pdfDoc.output('arraybuffer'))
      
      // Retornar PDF gerado dinamicamente
      res.setHeader('Content-Type', 'application/pdf')
      res.setHeader('Content-Disposition', `attachment; filename="diagnostico-isia-${userData.isia}.pdf"`)
      res.setHeader('Content-Length', pdfBuffer.length)
      return res.send(pdfBuffer)
    } else if (type === 'cover') {
      // Imagem da capa
      filePath = path.join(process.cwd(), 'public', 'assets', 'images', 'ebook-cover.png')
      fileName = 'ebook-cover.png'
      contentType = 'image/png'
    } else {
      return res.status(400).json({ error: 'Tipo de arquivo inválido' })
    }

    // Verificar se arquivo existe
    if (!fs.existsSync(filePath)) {
      // Se arquivo não existe, retornar URL para download manual
      return res.status(200).json({
        message: 'Arquivo será enviado por email',
        downloadUrl: `mailto:suporte@iasurviver.com?subject=Download ${type}&body=Olá, gostaria de receber o arquivo ${fileName}`,
        fileName
      })
    }

    // Ler arquivo
    const fileBuffer = fs.readFileSync(filePath)

    // Definir headers para download
    res.setHeader('Content-Type', contentType)
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`)
    res.setHeader('Content-Length', fileBuffer.length)
    res.setHeader('Cache-Control', 'private, max-age=3600')

    // Enviar arquivo
    res.send(fileBuffer)

  } catch (error) {
    console.error('Erro ao servir arquivo:', error)
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
}