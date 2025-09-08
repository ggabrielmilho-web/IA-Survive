// Mapeamento de áreas de atuação para fatores de risco base
const AREA_RISK_FACTORS = {
  'Tecnologia da Informação': 5,
  'Finanças e Contabilidade': 8,
  'Marketing e Vendas': 6,
  'Recursos Humanos': 4,
  'Atendimento ao Cliente': 9,
  'Saúde': 3,
  'Educação': 4,
  'Artes e Design': 2,
  'Manufatura': 7,
  'Serviços Gerais': 6,
  'Outro': 5
}

// Função principal para calcular o ISIa
export function calculateISIa(answers) {
  const weights = {
    area: 0.30,
    repetitive: 0.25,
    aiUsage: 0.20,
    humanInteraction: 0.15,
    digitalDependency: 0.10
  }

  // Normalizar respostas para escala 0-10
  const normalizedScores = {
    area: normalizeAreaScore(answers.area),
    repetitive: normalizeScaleScore(answers.repetitive, 5), // 5 opções
    aiUsage: normalizeAIUsageScore(answers.aiUsage),
    humanInteraction: normalizeHumanInteractionScore(answers.humanInteraction),
    digitalDependency: normalizeScaleScore(answers.digitalDependency, 5)
  }

  // Calcular ISIa base
  let isiaBase = 0
  Object.keys(weights).forEach(key => {
    isiaBase += normalizedScores[key] * weights[key]
  })

  // Aplicar ajustes não-lineares
  let isiaFinal = applyNonLinearAdjustments(isiaBase, normalizedScores)

  // Garantir que está na escala 0-10
  isiaFinal = Math.max(0, Math.min(10, isiaFinal))

  return {
    isia: Math.round(isiaFinal * 10) / 10, // Uma casa decimal
    riskLevel: getRiskLevel(isiaFinal),
    breakdown: normalizedScores
  }
}

function normalizeAreaScore(area) {
  return AREA_RISK_FACTORS[area] || 5
}

function normalizeScaleScore(scaleIndex, maxOptions) {
  // Converter índice da escala para pontuação 0-10
  return (scaleIndex / (maxOptions - 1)) * 10
}

function normalizeAIUsageScore(scaleIndex) {
  // Inverter a pontuação: mais uso de IA = menor risco
  const maxOptions = 5
  return 10 - ((scaleIndex / (maxOptions - 1)) * 10)
}

function normalizeHumanInteractionScore(scaleIndex) {
  // Inverter a pontuação: mais interação humana = menor risco
  const maxOptions = 4
  return 10 - ((scaleIndex / (maxOptions - 1)) * 10)
}

function applyNonLinearAdjustments(baseScore, scores) {
  let adjustedScore = baseScore

  // Bônus de risco: área de alto risco + tarefas muito repetitivas
  if (scores.area > 7 && scores.repetitive > 8) {
    adjustedScore *= 1.2
  }

  // Atenuação: uso extensivo de IA + alta interação humana
  if (scores.aiUsage < 3 && scores.humanInteraction < 3) {
    adjustedScore *= 0.8
  }

  // Bônus crítico: área crítica + tarefas 100% repetitivas + sem uso de IA
  if (scores.area > 8 && scores.repetitive > 9 && scores.aiUsage > 8) {
    adjustedScore *= 1.5
  }

  return adjustedScore
}

function getRiskLevel(isia) {
  if (isia <= 2) return 'very_low'
  if (isia <= 4) return 'low'
  if (isia <= 6) return 'moderate'
  if (isia <= 8) return 'high'
  return 'critical'
}

// Função para gerar diagnóstico personalizado
export function generateDiagnosis(isia, riskLevel, userAnswers) {
  const diagnoses = {
    very_low: {
      title: "PIONEIRO DIGITAL DETECTADO!",
      message: `Seu ISIa® de ${isia}/10 revela que você está à frente da curva. Você não apenas sobreviverá à revolução da IA, mas liderará ela. Continue inovando e ajudando outros a se adaptarem.`,
      timeframe: "Você está preparado para o futuro",
      color: "green"
    },
    low: {
      title: "SOBREVIVENTE RESILIENTE",
      message: `Com um ISIa® de ${isia}/10, você possui uma base sólida de adaptabilidade. Pequenos ajustes em sua estratégia profissional garantirão sua relevância contínua no mercado.`,
      timeframe: "Mantenha-se vigilante e continue evoluindo",
      color: "blue"
    },
    moderate: {
      title: "ALERTA AMARELO - AÇÃO NECESSÁRIA",
      message: `Seu ISIa® de ${isia}/10 indica que você está na zona de risco moderado. É hora de acelerar sua adaptação. A IA está se aproximando da sua área, mas você ainda tem tempo para se reposicionar.`,
      timeframe: "12 a 18 meses para implementar mudanças significativas",
      color: "yellow"
    },
    high: {
      title: "ALERTA VERMELHO - URGÊNCIA MÁXIMA",
      message: `Seu ISIa® de ${isia}/10 é um sinal de alarme que não pode ser ignorado. Até 70% das suas atividades atuais estão na mira da automação. A transformação não é mais opcional, é questão de sobrevivência.`,
      timeframe: "6 a 12 meses para reinvenção completa",
      color: "red"
    },
    critical: {
      title: "CÓDIGO VERMELHO - SUBSTITUIÇÃO IMINENTE",
      message: `Com um ISIa® de ${isia}/10, você está na linha de frente da obsolescência profissional. A IA já pode executar a maioria das suas tarefas com maior eficiência. A reinvenção radical é sua única saída.`,
      timeframe: "3 a 6 meses para mudança drástica ou substituição inevitável",
      color: "red"
    }
  }

  return diagnoses[riskLevel]
}

// Função para gerar plano de ação personalizado
export function generateActionPlan(isia, riskLevel, userAnswers) {
  const basePlans = {
    very_low: {
      category1: {
        title: "LIDERANÇA TECNOLÓGICA",
        tasks: [
          "Torne-se mentor de colegas menos adaptados à IA",
          "Compartilhe conhecimento em eventos e redes sociais",
          "Explore oportunidades de consultoria em IA",
          "Desenvolva produtos ou serviços que complementem IA"
        ]
      },
      category2: {
        title: "INOVAÇÃO CONTÍNUA",
        tasks: [
          "Teste ferramentas de IA emergentes semanalmente",
          "Crie conteúdo educativo sobre IA na sua área",
          "Participe de hackathons e projetos open-source",
          "Estabeleça partnerships com startups de IA"
        ]
      },
      category3: {
        title: "NETWORKING ESTRATÉGICO",
        tasks: [
          "Conecte-se com outros pioneiros digitais",
          "Participe de conferências de tecnologia",
          "Construa presença digital como expert",
          "Mentore profissionais em transição"
        ]
      },
      category4: {
        title: "MONETIZAÇÃO",
        tasks: [
          "Desenvolva cursos sobre IA na sua área",
          "Ofereça consultoria especializada",
          "Crie produtos digitais inovadores",
          "Explore oportunidades de investimento em IA"
        ]
      }
    },
    low: {
      category1: {
        title: "FORTALECIMENTO DE COMPETÊNCIAS",
        tasks: [
          "Identifique 3 ferramentas de IA para sua área",
          "Faça um curso online sobre IA aplicada",
          "Pratique automação de tarefas repetitivas",
          "Desenvolva habilidades de prompt engineering"
        ]
      },
      category2: {
        title: "ADAPTAÇÃO GRADUAL",
        tasks: [
          "Integre IA em 20% das suas tarefas diárias",
          "Documente processos que podem ser otimizados",
          "Teste chatbots para atendimento básico",
          "Automatize relatórios e análises simples"
        ]
      },
      category3: {
        title: "NETWORKING E APRENDIZADO",
        tasks: [
          "Siga 5 especialistas em IA no LinkedIn",
          "Participe de webinars sobre IA na sua área",
          "Junte-se a grupos de discussão sobre tecnologia",
          "Agende coffee chats com colegas tech-savvy"
        ]
      },
      category4: {
        title: "PLANEJAMENTO ESTRATÉGICO",
        tasks: [
          "Defina metas de evolução tecnológica para 6 meses",
          "Crie um plano de capacitação em IA",
          "Identifique oportunidades de crescimento interno",
          "Desenvolva um projeto piloto usando IA"
        ]
      }
    },
    moderate: {
      category1: {
        title: "UPSKILLING URGENTE",
        tasks: [
          "Inscreva-se em um bootcamp de IA imediatamente",
          "Dedique 2h/dia ao aprendizado de tecnologia",
          "Obtenha certificações em plataformas de IA",
          "Pratique análise de dados e automação"
        ]
      },
      category2: {
        title: "REPOSICIONAMENTO PROFISSIONAL",
        tasks: [
          "Atualize currículo com skills tecnológicas",
          "Busque posições que exigem colaboração com IA",
          "Desenvolva expertise em áreas complementares à IA",
          "Crie portfólio demonstrando adaptabilidade"
        ]
      },
      category3: {
        title: "NETWORKING INTENSIVO",
        tasks: [
          "Participe de 2 eventos de tecnologia por mês",
          "Construa presença no LinkedIn com conteúdo relevante",
          "Conecte-se com recrutadores tech",
          "Busque mentoria de profissionais bem-sucedidos"
        ]
      },
      category4: {
        title: "TRANSIÇÃO ESTRATÉGICA",
        tasks: [
          "Identifique 3 áreas menos vulneráveis à IA",
          "Desenvolva habilidades híbridas (humano + IA)",
          "Crie projetos que demonstrem valor único",
          "Explore oportunidades de empreendedorismo"
        ]
      }
    },
    high: {
      category1: {
        title: "REINVENÇÃO COMPLETA",
        tasks: [
          "Faça uma transição de carreira completa AGORA",
          "Invista 4h/dia em nova capacitação",
          "Busque áreas que exigem criatividade e empatia",
          "Desenvolva habilidades de gestão e liderança"
        ]
      },
      category2: {
        title: "EDUCAÇÃO INTENSIVA",
        tasks: [
          "Matricule-se em curso superior/pós em área segura",
          "Complete 3 certificações profissionais urgentemente",
          "Aprenda programação básica e análise de dados",
          "Domine ferramentas de design e criatividade"
        ]
      },
      category3: {
        title: "NETWORKING DE EMERGÊNCIA",
        tasks: [
          "Ative toda sua rede de contatos HOJE",
          "Peça indicações e referencias profissionais",
          "Participe de grupos de recolocação profissional",
          "Busque coaching de carreira especializado"
        ]
      },
      category4: {
        title: "PLANO B E C",
        tasks: [
          "Desenvolva 2 fontes alternativas de renda",
          "Explore trabalho freelancer e consultoria",
          "Considere empreendedorismo de necessidade",
          "Crie reserva financeira para transição"
        ]
      }
    },
    critical: {
      category1: {
        title: "AÇÃO DE EMERGÊNCIA",
        tasks: [
          "PARE TUDO e reavalie sua carreira HOJE",
          "Busque recolocação em área totalmente diferente",
          "Invista 6h/dia em nova capacitação urgente",
          "Considere retorno aos estudos em tempo integral"
        ]
      },
      category2: {
        title: "CAPACITAÇÃO INTENSIVA",
        tasks: [
          "Matricule-se em curso técnico/superior imediatamente",
          "Aprenda programação, design ou gestão",
          "Desenvolva habilidades manuais e artesanais",
          "Busque certificações em áreas humanas"
        ]
      },
      category3: {
        title: "SOBREVIVÊNCIA PROFISSIONAL",
        tasks: [
          "Aceite posições temporárias para se manter",
          "Explore trabalhos que exigem presença física",
          "Desenvolva múltiplas fontes de renda",
          "Considere mudança de cidade/país se necessário"
        ]
      },
      category4: {
        title: "REINVENÇÃO RADICAL",
        tasks: [
          "Explore empreendedorismo de necessidade",
          "Desenvolva negócios baseados em relacionamento",
          "Considere áreas como cuidados, educação, artes",
          "Crie um plano de 5 anos para nova carreira"
        ]
      }
    }
  }

  return basePlans[riskLevel] || basePlans.moderate
}