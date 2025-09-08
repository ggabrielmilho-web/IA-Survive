export const quizQuestions = [
  {
    id: 1,
    question: "Qual é a sua área de atuação principal?",
    type: "multiple_choice",
    options: [
      "Tecnologia da Informação",
      "Finanças e Contabilidade", 
      "Marketing e Vendas",
      "Recursos Humanos",
      "Atendimento ao Cliente",
      "Saúde",
      "Educação", 
      "Artes e Design",
      "Manufatura",
      "Serviços Gerais",
      "Outro"
    ],
    weight: 0.30,
    key: "area"
  },
  {
    id: 2,
    question: "Qual a proporção de suas tarefas diárias que são altamente repetitivas e baseadas em regras claras?",
    type: "scale",
    options: [
      "0-20%",
      "21-40%", 
      "41-60%",
      "61-80%",
      "81-100%"
    ],
    weight: 0.25,
    key: "repetitive"
  },
  {
    id: 3,
    question: "Em que medida você já utiliza ferramentas de IA em seu trabalho?",
    type: "scale", 
    options: [
      "Nunca",
      "Raramente",
      "Às vezes",
      "Frequentemente", 
      "Extensivamente"
    ],
    weight: 0.20,
    key: "aiUsage"
  },
  {
    id: 4,
    question: "Seu trabalho exige forte interação humana, empatia, negociação ou julgamento ético complexo?",
    type: "scale",
    options: [
      "Raramente",
      "Às vezes",
      "Frequentemente",
      "Constantemente"
    ],
    weight: 0.15,
    key: "humanInteraction"
  },
  {
    id: 5,
    question: "Seu trabalho depende fundamentalmente de plataformas digitais, softwares específicos ou dados digitais?",
    type: "scale",
    options: [
      "Não",
      "Pouco",
      "Moderadamente", 
      "Muito",
      "Totalmente"
    ],
    weight: 0.10,
    key: "digitalDependency"
  }
]