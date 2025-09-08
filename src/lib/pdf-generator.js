// Gerador de PDF do diagnóstico
import jsPDF from 'jspdf'

export function generateDiagnosticPDF(userData, quizResult, diagnosis, actionPlan) {
  const doc = new jsPDF()
  
  // Header
  doc.setFontSize(24)
  doc.setTextColor(255, 59, 48) // Red
  doc.text('IA SURVIVOR - DIAGNÓSTICO COMPLETO', 20, 30)
  
  // ISIa Score
  doc.setFontSize(18)
  doc.setTextColor(0, 0, 0)
  doc.text(`Seu ISIa®: ${quizResult.isia}/10`, 20, 50)
  doc.text(`Nível de Risco: ${diagnosis.title}`, 20, 65)
  
  // Diagnosis
  doc.setFontSize(14)
  doc.text('DIAGNÓSTICO:', 20, 85)
  const splitDiagnosis = doc.splitTextToSize(diagnosis.message, 170)
  doc.text(splitDiagnosis, 20, 95)
  
  // Action Plan
  let yPosition = 95 + (splitDiagnosis.length * 7) + 20
  
  doc.setFontSize(16)
  doc.text('PLANO DE AÇÃO PERSONALIZADO:', 20, yPosition)
  yPosition += 15
  
  Object.entries(actionPlan).forEach(([key, category]) => {
    if (yPosition > 250) {
      doc.addPage()
      yPosition = 30
    }
    
    doc.setFontSize(14)
    doc.setTextColor(255, 59, 48)
    doc.text(category.title, 20, yPosition)
    yPosition += 10
    
    doc.setFontSize(10)
    doc.setTextColor(0, 0, 0)
    category.tasks.forEach((task, index) => {
      if (yPosition > 270) {
        doc.addPage()
        yPosition = 30
      }
      
      const taskText = `${index + 1}. ${task}`
      const splitTask = doc.splitTextToSize(taskText, 170)
      doc.text(splitTask, 25, yPosition)
      yPosition += splitTask.length * 5 + 3
    })
    yPosition += 10
  })
  
  // Footer
  doc.setFontSize(8)
  doc.setTextColor(128, 128, 128)
  doc.text('© 2024 IA Survivor - Diagnóstico gerado em ' + new Date().toLocaleDateString(), 20, 285)
  
  return doc.output('blob')
}

// Conteúdo do E-book (exemplo)
export const EBOOK_CONTENT = {
  title: "50 COMANDOS PROIBIDOS DE IA",
  subtitle: "Técnicas avançadas que ninguém te ensina",
  chapters: [
    {
      title: "COMANDOS PARA CHATGPT",
      commands: [
        {
          name: "Persona Ultra-Especializada",
          prompt: "Aja como [ESPECIALISTA] com 20 anos de experiência em [ÁREA]. Você tem doutorado em [CAMPO] e já trabalhou em [EMPRESAS]. Sua tarefa é [OBJETIVO] considerando [CONTEXTO ESPECÍFICO].",
          example: "Aja como um neurocientista com 20 anos de experiência em inteligência artificial. Você tem doutorado em Ciências Cognitivas e já trabalhou na Google DeepMind e OpenAI. Sua tarefa é explicar como o cérebro humano pode superar IA considerando neuroplasticidade."
        },
        {
          name: "Chain of Thought Reverso",
          prompt: "Antes de responder, liste 3 possíveis interpretações da minha pergunta. Para cada interpretação, apresente uma resposta diferente. Depois escolha a melhor e explique por quê.",
          example: "Pergunta: 'Como ser mais produtivo?' - O GPT listará interpretações (tempo, energia, foco) e dará respostas específicas para cada uma."
        },
        // ... mais 48 comandos
      ]
    },
    {
      title: "COMANDOS PARA CLAUDE",
      commands: [
        // ... comandos específicos para Claude
      ]
    },
    {
      title: "COMANDOS PARA GEMINI",
      commands: [
        // ... comandos específicos para Gemini
      ]
    }
  ]
}

export function generateEbookPDF() {
  const doc = new jsPDF()
  
  // Capa
  doc.setFontSize(28)
  doc.setTextColor(255, 215, 10) // Yellow
  doc.text('50 COMANDOS', 20, 60)
  doc.text('PROIBIDOS', 20, 80)
  doc.text('DE IA', 20, 100)
  
  doc.setFontSize(14)
  doc.setTextColor(0, 0, 0)
  doc.text('Técnicas avançadas que ninguém te ensina', 20, 130)
  doc.text('© 2024 IA Survivor', 20, 260)
  
  // Conteúdo
  EBOOK_CONTENT.chapters.forEach((chapter) => {
    doc.addPage()
    doc.setFontSize(20)
    doc.setTextColor(255, 59, 48)
    doc.text(chapter.title, 20, 30)
    
    let yPos = 50
    chapter.commands.forEach((command, index) => {
      if (yPos > 240) {
        doc.addPage()
        yPos = 30
      }
      
      doc.setFontSize(14)
      doc.setTextColor(0, 0, 0)
      doc.text(`${index + 1}. ${command.name}`, 20, yPos)
      yPos += 10
      
      doc.setFontSize(10)
      const promptText = doc.splitTextToSize(command.prompt, 170)
      doc.text(promptText, 20, yPos)
      yPos += promptText.length * 5 + 10
      
      if (command.example) {
        doc.setFontSize(9)
        doc.setTextColor(128, 128, 128)
        doc.text('Exemplo:', 20, yPos)
        yPos += 5
        const exampleText = doc.splitTextToSize(command.example, 170)
        doc.text(exampleText, 20, yPos)
        yPos += exampleText.length * 4 + 15
      }
    })
  })
  
  return doc.output('blob')
}