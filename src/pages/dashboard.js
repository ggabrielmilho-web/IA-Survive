import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { Brain, Download, Star, CheckCircle, Clock, TrendingUp, AlertTriangle } from 'lucide-react'
import { generateDiagnosis, generateActionPlan } from '../lib/quiz-logic'
import toast from 'react-hot-toast'

export default function Dashboard() {
  const router = useRouter()
  const [quizData, setQuizData] = useState(null)
  const [diagnosis, setDiagnosis] = useState(null)
  const [actionPlan, setActionPlan] = useState(null)
  const [completedTasks, setCompletedTasks] = useState(new Set())
  
  useEffect(() => {
    // Simular dados do usuário (em produção viria do Supabase)
    const mockQuizData = {
      isia: 6.3,
      riskLevel: 'moderate',
      answers: { area: 1, repetitive: 3, aiUsage: 2, humanInteraction: 1, digitalDependency: 4 },
      completedAt: new Date().toISOString(),
      hasPremium: true
    }

    setQuizData(mockQuizData)

    // Gerar diagnóstico e plano
    const diagnosisData = generateDiagnosis(mockQuizData.isia, mockQuizData.riskLevel, mockQuizData.answers)
    const planData = generateActionPlan(mockQuizData.isia, mockQuizData.riskLevel, mockQuizData.answers)
    
    setDiagnosis(diagnosisData)
    setActionPlan(planData)

    // Carregar tarefas completadas do localStorage
    const saved = localStorage.getItem('completedTasks')
    if (saved) {
      setCompletedTasks(new Set(JSON.parse(saved)))
    }
  }, [])

  const toggleTask = (categoryKey, taskIndex) => {
    const taskId = `${categoryKey}-${taskIndex}`
    const newCompleted = new Set(completedTasks)
    
    if (newCompleted.has(taskId)) {
      newCompleted.delete(taskId)
    } else {
      newCompleted.add(taskId)
    }
    
    setCompletedTasks(newCompleted)
    localStorage.setItem('completedTasks', JSON.stringify([...newCompleted]))
  }

  const getRiskColor = (riskLevel) => {
    const colors = {
      'very_low': 'text-primary-green',
      'low': 'text-primary-blue', 
      'moderate': 'text-secondary-yellow',
      'high': 'text-primary-red',
      'critical': 'text-secondary-red-dark'
    }
    return colors[riskLevel] || 'text-primary-gray'
  }

  const calculateProgress = () => {
    if (!actionPlan) return 0
    const totalTasks = Object.values(actionPlan).reduce((acc, category) => acc + category.tasks.length, 0)
    return Math.round((completedTasks.size / totalTasks) * 100)
  }

  const downloadPDF = async (type) => {
    try {
      toast.loading('Preparando download...', { id: 'pdf-download' })
      
      const response = await fetch(`/api/download/${type}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (!response.ok) {
        throw new Error('Erro ao baixar arquivo')
      }

      // Verificar se retornou JSON (arquivo não encontrado) ou binário (arquivo)
      const contentType = response.headers.get('content-type')
      
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json()
        toast.error(data.message, { id: 'pdf-download' })
        return
      }

      // Download do arquivo
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      
      const filename = type === 'diagnostic' 
        ? `diagnostico-isia-${quizData.isia}.pdf`
        : '50-comandos-proibidos-ia.pdf'
      
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)

      toast.success('Download concluído!', { id: 'pdf-download' })
    } catch (error) {
      console.error('Erro no download:', error)
      toast.error('Erro no download. Entre em contato conosco.', { id: 'pdf-download' })
    }
  }

  if (!quizData) {
    return (
      <div className="min-h-screen bg-gradient-apocalypse flex items-center justify-center">
        <div className="text-center">
          <Brain className="w-16 h-16 text-primary-red animate-pulse mx-auto mb-4" />
          <p className="text-xl text-primary-gray">Carregando dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Dashboard - Meu ISIa® {quizData.isia}/10</title>
        <meta name="description" content="Acompanhe seu progresso e acesse seu plano de ação personalizado" />
      </Head>

      <div className="min-h-screen bg-gradient-apocalypse">
        {/* Header */}
        <div className="border-b border-primary-gray/20 bg-secondary-gray-dark/50">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gradient">IA Survivor Dashboard</h1>
                <p className="text-primary-gray">Bem-vindo de volta, Sobrevivente!</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary-red">
                  ISIa® {quizData.isia}/10
                </div>
                <p className={`text-sm ${getRiskColor(quizData.riskLevel)}`}>
                  {diagnosis?.title}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="card-dark text-center"
            >
              <Brain className="w-12 h-12 text-primary-red mx-auto mb-3" />
              <div className="text-2xl font-bold text-primary-red mb-1">
                {quizData.isia}/10
              </div>
              <p className="text-primary-gray text-sm">Seu ISIa®</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="card-dark text-center"
            >
              <TrendingUp className="w-12 h-12 text-primary-green mx-auto mb-3" />
              <div className="text-2xl font-bold text-primary-green mb-1">
                {calculateProgress()}%
              </div>
              <p className="text-primary-gray text-sm">Progresso do Plano</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="card-dark text-center"
            >
              <CheckCircle className="w-12 h-12 text-primary-blue mx-auto mb-3" />
              <div className="text-2xl font-bold text-primary-blue mb-1">
                {completedTasks.size}
              </div>
              <p className="text-primary-gray text-sm">Tarefas Completas</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="card-dark text-center"
            >
              <Clock className="w-12 h-12 text-secondary-yellow mx-auto mb-3" />
              <div className="text-2xl font-bold text-secondary-yellow mb-1">
                {completedTasks.size * 10}
              </div>
              <p className="text-primary-gray text-sm">Minutos Investidos</p>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Downloads */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="card-dark"
            >
              <h2 className="text-2xl font-bold mb-6 text-gradient">Seus Downloads</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-secondary-gray-dark/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Brain className="w-8 h-8 text-primary-red" />
                    <div>
                      <h3 className="font-semibold">Diagnóstico ISIa® Completo</h3>
                      <p className="text-primary-gray text-sm">Relatório detalhado em PDF</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => downloadPDF('diagnostic')}
                    className="btn-primary px-4 py-2 text-sm"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    PDF
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-secondary-gray-dark/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Star className="w-8 h-8 text-secondary-yellow" />
                    <div>
                      <h3 className="font-semibold">50 Comandos Proibidos</h3>
                      <p className="text-primary-gray text-sm">E-book exclusivo de IA</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => downloadPDF('ebook')}
                    className="btn-secondary px-4 py-2 text-sm"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    PDF
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Diagnosis Summary */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="card-dark">
                <h2 className="text-2xl font-bold mb-6">Seu Diagnóstico</h2>
                
                <div className={`mb-6 ${getRiskColor(quizData.riskLevel)}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <AlertTriangle className="w-8 h-8" />
                    <h3 className="text-xl font-bold">
                      {diagnosis?.title}
                    </h3>
                  </div>
                  <p className="text-primary-gray leading-relaxed mb-4">
                    {diagnosis?.message}
                  </p>
                  <div className="flex items-center gap-2 text-lg font-semibold">
                    <Clock className="w-5 h-5" />
                    {diagnosis?.timeframe}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Action Plan */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12"
          >
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-4">
                Seu <span className="text-gradient">Plano de Ação</span>
              </h2>
              <p className="text-xl text-primary-gray">
                16 microtarefas de 10 minutos para garantir sua sobrevivência profissional
              </p>
              <div className="mt-4">
                <div className="w-full bg-secondary-gray-dark rounded-full h-3">
                  <div 
                    className="bg-primary-green h-3 rounded-full transition-all duration-500"
                    style={{ width: `${calculateProgress()}%` }}
                  />
                </div>
                <p className="text-primary-gray text-sm mt-2">
                  Progresso: {calculateProgress()}% completo
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {actionPlan && Object.entries(actionPlan).map(([key, category], index) => (
                <div key={key} className="card-dark">
                  <h3 className="text-lg font-semibold mb-6 text-primary-red">
                    {category.title}
                  </h3>
                  <div className="space-y-3">
                    {category.tasks.map((task, taskIndex) => {
                      const taskId = `${key}-${taskIndex}`
                      const isCompleted = completedTasks.has(taskId)
                      
                      return (
                        <div
                          key={taskIndex}
                          className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                            isCompleted 
                              ? 'border-primary-green bg-primary-green/10' 
                              : 'border-primary-gray/30 hover:border-primary-red/50'
                          }`}
                          onClick={() => toggleTask(key, taskIndex)}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 flex-shrink-0 ${
                              isCompleted 
                                ? 'border-primary-green bg-primary-green' 
                                : 'border-primary-gray'
                            }`}>
                              {isCompleted && <CheckCircle className="w-3 h-3 text-primary-black" />}
                            </div>
                            <p className={`text-sm ${isCompleted ? 'text-primary-green line-through' : 'text-primary-gray'}`}>
                              {task}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 mt-2 text-xs text-primary-gray">
                            <Clock className="w-3 h-3" />
                            10 min
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Footer */}
          <div className="text-center mt-16 py-8 border-t border-primary-gray/20">
            <p className="text-primary-gray">
              💪 Continue sua jornada de sobrevivência profissional • 🤖 IA Survivor 2024
            </p>
          </div>
        </div>
      </div>
    </>
  )
}