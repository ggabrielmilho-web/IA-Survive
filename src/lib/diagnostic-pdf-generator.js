import jsPDF from 'jspdf'
import { generateDiagnosis, generateActionPlan } from './quiz-logic'

export function generateDiagnosticPDF(userData) {
  const doc = new jsPDF()
  let yPosition = 30

  // Helper function para quebrar linha
  const addText = (text, fontSize = 12, color = [0, 0, 0], isBold = false) => {
    doc.setFontSize(fontSize)
    doc.setTextColor(...color)
    if (isBold) doc.setFont('helvetica', 'bold')
    else doc.setFont('helvetica', 'normal')
    
    const lines = doc.splitTextToSize(text, 170)
    doc.text(lines, 20, yPosition)
    yPosition += lines.length * (fontSize / 2) + 5
    return lines.length
  }

  const addSection = (title) => {
    yPosition += 10
    addText(title, 16, [255, 59, 48], true) // Vermelho
    yPosition += 5
  }

  const checkPageBreak = () => {
    if (yPosition > 260) {
      doc.addPage()
      yPosition = 30
    }
  }

  // CAPA
  addText('IA SURVIVOR', 24, [255, 59, 48], true)
  addText('DIAGNOSTICO COMPLETO ISIa', 18, [0, 0, 0], true)
  yPosition += 10
  
  addText(`Relatorio Personalizado - ${new Date().toLocaleDateString('pt-BR')}`, 10, [128, 128, 128])
  yPosition += 20

  // RESULTADO PRINCIPAL
  const diagnosis = generateDiagnosis(userData.isia, userData.riskLevel, userData.answers)
  
  addText(`SEU ISIa®: ${userData.isia}/10`, 20, [255, 59, 48], true)
  addText(diagnosis.title, 14, [255, 59, 48], true)
  yPosition += 10
  
  addText(diagnosis.message, 12)
  yPosition += 10
  
  addText(`PRAZO: ${diagnosis.timeframe}`, 12, [255, 165, 0], true)

  checkPageBreak()

  // ANÁLISE DAS RESPOSTAS
  addSection('ANALISE DAS SUAS RESPOSTAS')
  
  const questionAnalysis = [
    {
      q: 'Área de Atuação',
      answer: getAreaName(userData.answers.area),
      risk: getAreaRisk(userData.answers.area),
      impact: 'Esta área tem ' + (getAreaRisk(userData.answers.area) > 6 ? 'ALTO' : getAreaRisk(userData.answers.area) > 4 ? 'MÉDIO' : 'BAIXO') + ' risco de automação'
    },
    {
      q: 'Tarefas Repetitivas',
      answer: getRepetitiveLevel(userData.answers.repetitive),
      risk: (userData.answers.repetitive / 4) * 10,
      impact: userData.answers.repetitive > 3 ? 'Tarefas altamente automatizáveis' : 'Tarefas com menor risco de automação'
    },
    {
      q: 'Uso de IA',
      answer: getAIUsageLevel(userData.answers.aiUsage),
      risk: 10 - ((userData.answers.aiUsage / 4) * 10),
      impact: userData.answers.aiUsage < 2 ? 'URGENTE: Comece a usar IA HOJE' : 'Continue se adaptando às IAs'
    },
    {
      q: 'Interação Humana',
      answer: getHumanInteractionLevel(userData.answers.humanInteraction),
      risk: 10 - ((userData.answers.humanInteraction / 3) * 10),
      impact: userData.answers.humanInteraction > 2 ? 'Sua vantagem competitiva' : 'Área vulnerável à automação'
    },
    {
      q: 'Dependência Digital',
      answer: getDigitalDependencyLevel(userData.answers.digitalDependency),
      risk: (userData.answers.digitalDependency / 4) * 10,
      impact: userData.answers.digitalDependency > 3 ? 'Alta exposição à IA' : 'Menor exposição digital'
    }
  ]

  questionAnalysis.forEach((item, index) => {
    checkPageBreak()
    addText(`${index + 1}. ${item.q}`, 12, [0, 0, 0], true)
    addText(`Resposta: ${item.answer}`, 11)
    addText(`Risco: ${item.risk.toFixed(1)}/10`, 11, item.risk > 6 ? [255, 0, 0] : item.risk > 4 ? [255, 165, 0] : [0, 128, 0])
    addText(`Impacto: ${item.impact}`, 11, [128, 128, 128])
    yPosition += 8
  })

  // PLANO DE AÇÃO
  doc.addPage()
  yPosition = 30
  
  addText('SEU PLANO DE ACAO PERSONALIZADO', 18, [255, 59, 48], true)
  addText('16 Microtarefas de 10 minutos cada para garantir sua sobrevivencia profissional', 12, [128, 128, 128])
  yPosition += 15

  const actionPlan = generateActionPlan(userData.isia, userData.riskLevel, userData.answers)
  
  Object.entries(actionPlan).forEach(([key, category], categoryIndex) => {
    checkPageBreak()
    
    addText(`BLOCO ${categoryIndex + 1}: ${category.title}`, 14, [255, 59, 48], true)
    yPosition += 5
    
    category.tasks.forEach((task, taskIndex) => {
      checkPageBreak()
      addText(`Tarefa ${taskIndex + 1}: ${task}`, 10)
      addText(`   Tempo estimado: 10 minutos`, 9, [128, 128, 128])
      yPosition += 3
    })
    yPosition += 10
  })

  // RECOMENDAÇÕES ESPECÍFICAS
  doc.addPage()
  yPosition = 30
  
  addSection('RECOMENDACOES ESPECIFICAS PARA SEU PERFIL')
  
  const specificRecommendations = getSpecificRecommendations(userData.isia, userData.riskLevel, userData.answers)
  specificRecommendations.forEach(rec => {
    checkPageBreak()
    addText(`- ${rec}`, 11)
    yPosition += 5
  })

  // RECURSOS E FERRAMENTAS
  checkPageBreak()
  addSection('FERRAMENTAS RECOMENDADAS')
  
  const tools = getRecommendedTools(userData.answers.area)
  tools.forEach(tool => {
    checkPageBreak()
    addText(`• ${tool.name}: ${tool.description}`, 10)
    yPosition += 3
  })

  // TIMELINE
  checkPageBreak()
  addSection('CRONOGRAMA SUGERIDO')
  
  const timeline = getTimeline(userData.riskLevel)
  timeline.forEach(phase => {
    checkPageBreak()
    addText(`${phase.period}: ${phase.actions}`, 11)
    yPosition += 5
  })

  // RODAPÉ
  doc.setFontSize(8)
  doc.setTextColor(128, 128, 128)
  const pageCount = doc.internal.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.text(`IA Survivor - Diagnostico ISIa | Pagina ${i}/${pageCount} | Gerado em ${new Date().toLocaleDateString('pt-BR')}`, 20, 285)
    doc.text(`2024 IA Survivor - Todos os direitos reservados`, 20, 290)
  }

  return doc
}

// Funções auxiliares
function getAreaName(index) {
  const areas = ["Tecnologia da Informação", "Finanças e Contabilidade", "Marketing e Vendas", "Recursos Humanos", "Atendimento ao Cliente", "Saúde", "Educação", "Artes e Design", "Manufatura", "Serviços Gerais", "Outro"]
  return areas[index] || 'Não informado'
}

function getAreaRisk(index) {
  const risks = [5, 8, 6, 4, 9, 3, 4, 2, 7, 6, 5]
  return risks[index] || 5
}

function getRepetitiveLevel(index) {
  const levels = ["0-20%", "21-40%", "41-60%", "61-80%", "81-100%"]
  return levels[index] || 'Não informado'
}

function getAIUsageLevel(index) {
  const levels = ["Nunca", "Raramente", "Às vezes", "Frequentemente", "Extensivamente"]
  return levels[index] || 'Não informado'
}

function getHumanInteractionLevel(index) {
  const levels = ["Raramente", "Às vezes", "Frequentemente", "Constantemente"]
  return levels[index] || 'Não informado'
}

function getDigitalDependencyLevel(index) {
  const levels = ["Não", "Pouco", "Moderadamente", "Muito", "Totalmente"]
  return levels[index] || 'Não informado'
}

function getSpecificRecommendations(isia, riskLevel, answers) {
  const recommendations = []
  
  if (isia > 7) {
    recommendations.push('URGENTE: Considere mudança completa de carreira nos próximos 6 meses')
    recommendations.push('Invista em habilidades que complementam IA, não competem com ela')
    recommendations.push('Desenvolva expertise em áreas criativas e de relacionamento humano')
  } else if (isia > 5) {
    recommendations.push('Acelere seu aprendizado de ferramentas de IA para se manter relevante')
    recommendations.push('Busque posições que envolvam supervisão e gestão de sistemas automatizados')
    recommendations.push('Desenvolva habilidades de análise crítica dos resultados da IA')
  } else if (isia > 3) {
    recommendations.push('Continue se especializando e use IA como ferramenta de produtividade')
    recommendations.push('Torne-se um especialista na integração entre humanos e IA')
    recommendations.push('Compartilhe seu conhecimento ajudando outros a se adaptarem')
  } else {
    recommendations.push('Você está bem posicionado - continue inovando e liderando')
    recommendations.push('Considere mentoria e consultoria para profissionais em risco')
    recommendations.push('Explore oportunidades de empreendedorismo em IA')
  }

  return recommendations
}

function getRecommendedTools(areaIndex) {
  const toolsByArea = [
    // Tecnologia
    [
      { name: 'GitHub Copilot', description: 'Assistente de código IA' },
      { name: 'ChatGPT/Claude', description: 'Para documentação e debugging' },
      { name: 'Cursor', description: 'Editor de código com IA integrada' }
    ],
    // Finanças
    [
      { name: 'ChatGPT', description: 'Análise de dados financeiros' },
      { name: 'Power BI + IA', description: 'Dashboards inteligentes' },
      { name: 'Excel + Copilot', description: 'Automação de planilhas' }
    ],
    // Marketing
    [
      { name: 'Midjourney', description: 'Criação de imagens' },
      { name: 'Copy.ai', description: 'Geração de conteúdo' },
      { name: 'Canva + IA', description: 'Design automatizado' }
    ]
  ]
  
  return toolsByArea[areaIndex] || [
    { name: 'ChatGPT', description: 'Assistente universal para qualquer área' },
    { name: 'Claude', description: 'IA para análise e escrita' },
    { name: 'Notion AI', description: 'Organização e produtividade' }
  ]
}

function getTimeline(riskLevel) {
  const timelines = {
    'very_low': [
      { period: 'Proximos 30 dias', actions: 'Continue inovando e explore novas oportunidades' },
      { period: 'Proximos 3 meses', actions: 'Desenvolva conteudos e cursos sobre IA na sua area' },
      { period: 'Proximos 6 meses', actions: 'Considere consultoria e mentoria profissional' }
    ],
    'low': [
      { period: 'Proximos 30 dias', actions: 'Domine 2-3 ferramentas de IA essenciais' },
      { period: 'Proximos 3 meses', actions: 'Integre IA em 50% das suas tarefas diarias' },
      { period: 'Proximos 6 meses', actions: 'Torne-se referencia em IA na sua empresa' }
    ],
    'moderate': [
      { period: 'Proximos 15 dias', actions: 'Comece curso intensivo de IA aplicada' },
      { period: 'Proximos 2 meses', actions: 'Redesenhe 70% dos seus processos com IA' },
      { period: 'Proximos 4 meses', actions: 'Busque nova posicao que valorize suas habilidades hibridas' }
    ],
    'high': [
      { period: 'Proximos 7 dias', actions: 'URGENTE: Inicie transicao de carreira imediatamente' },
      { period: 'Proximo mes', actions: 'Complete curso de requalificacao profissional' },
      { period: 'Proximos 3 meses', actions: 'Implemente completamente nova estrategia de carreira' }
    ],
    'critical': [
      { period: 'HOJE', actions: 'Pare tudo e reavalie sua carreira AGORA' },
      { period: 'Proximas 2 semanas', actions: 'Busque recolocacao em area totalmente diferente' },
      { period: 'Proximos 2 meses', actions: 'Execute plano de reinvencao profissional radical' }
    ]
  }
  
  return timelines[riskLevel] || timelines['moderate']
}