import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { Brain, AlertTriangle, CheckCircle, Clock, ArrowRight, TrendingUp } from 'lucide-react'
import { generateDiagnosis, generateActionPlan } from '../lib/quiz-logic'

export default function Result() {
  const router = useRouter()
  const [quizData, setQuizData] = useState(null)
  const [diagnosis, setDiagnosis] = useState(null)
  const [actionPlan, setActionPlan] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Recuperar resultado do localStorage
    const storedResult = localStorage.getItem('quizResult')
    if (!storedResult) {
      router.push('/quiz')
      return
    }

    const result = JSON.parse(storedResult)
    setQuizData(result)

    // Gerar diagnóstico e plano de ação
    const diagnosisData = generateDiagnosis(result.isia, result.riskLevel, result.answers)
    const planData = generateActionPlan(result.isia, result.riskLevel, result.answers)
    
    setDiagnosis(diagnosisData)
    setActionPlan(planData)
    setLoading(false)
  }, [router])

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

  const getRiskIcon = (riskLevel) => {
    if (riskLevel === 'very_low' || riskLevel === 'low') {
      return <CheckCircle className="w-16 h-16" />
    }
    return <AlertTriangle className="w-16 h-16" />
  }

  if (loading || !quizData) {
    return (
      <div className="min-h-screen bg-gradient-apocalypse flex items-center justify-center">
        <div className="text-center">
          <Brain className="w-16 h-16 text-primary-red animate-pulse mx-auto mb-4" />
          <p className="text-xl text-primary-gray">Calculando seu ISIa®...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Seu ISIa® é {quizData.isia}/10 - IA Survivor</title>
        <meta name="description" content={`Seu risco de substituição pela IA é ${quizData.isia}/10. ${diagnosis?.message}`} />
      </Head>

      <div className="min-h-screen bg-gradient-apocalypse">
        {/* Hero Result */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              {/* ISIa Score */}
              <div className="mb-8">
                <div className="inline-flex items-center justify-center w-32 h-32 bg-primary-red/20 rounded-full mb-6">
                  <span className="text-6xl font-bold text-primary-red">
                    {quizData.isia}
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Seu <span className="text-gradient">ISIa®</span> é {quizData.isia}/10
                </h1>
              </div>

              {/* Risk Level */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className={`mb-8 ${getRiskColor(quizData.riskLevel)}`}
              >
                <div className="flex justify-center mb-4">
                  {getRiskIcon(quizData.riskLevel)}
                </div>
                <h2 className="text-3xl font-bold mb-4">
                  {diagnosis?.title}
                </h2>
                <div className="flex items-center justify-center gap-2 text-lg">
                  <Clock className="w-5 h-5" />
                  {diagnosis?.timeframe}
                </div>
              </motion.div>

              {/* Diagnosis Message */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="card-dark max-w-3xl mx-auto mb-12"
              >
                <p className="text-lg text-primary-gray leading-relaxed">
                  {diagnosis?.message}
                </p>
              </motion.div>

              {/* CTA para comprar diagnóstico completo */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                <button
                  onClick={() => router.push('/checkout')}
                  className="btn-primary text-xl px-12 py-6 inline-flex items-center gap-3 mb-6"
                >
                  <TrendingUp className="w-6 h-6" />
                  ACESSAR DIAGNÓSTICO COMPLETO
                  <ArrowRight className="w-6 h-6" />
                </button>
                
                <div className="text-sm text-primary-gray space-y-1">
                  <p>✅ Análise completa em 4 camadas</p>
                  <p>✅ Plano de ação personalizado com 16 microtarefas</p>
                  <p>✅ Acesso vitalício ao seu diagnóstico</p>
                  <p className="font-semibold text-secondary-yellow">
                    Por apenas R$ 19,90 - Oferta limitada!
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Preview do Plano de Ação */}
        <section className="py-20 px-4 bg-secondary-gray-dark/30">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6">
                Preview do Seu <span className="text-gradient">Plano de Ação</span>
              </h2>
              <p className="text-xl text-primary-gray">
                Veja uma amostra das estratégias personalizadas que você receberá
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {actionPlan && Object.entries(actionPlan).map(([key, category], index) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="card-dark"
                >
                  <h3 className="text-lg font-semibold mb-4 text-primary-red">
                    {category.title}
                  </h3>
                  <div className="space-y-3">
                    {category.tasks.slice(0, 2).map((task, taskIndex) => (
                      <div key={taskIndex} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-primary-green mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-primary-gray">
                          {task}
                        </p>
                      </div>
                    ))}
                    <div className="text-xs text-primary-gray/60 italic">
                      + {category.tasks.length - 2} tarefas adicionais...
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="card-dark max-w-md mx-auto"
              >
                <AlertTriangle className="w-12 h-12 text-secondary-yellow mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">
                  Desbloqueie o Plano Completo
                </h3>
                <p className="text-primary-gray mb-6">
                  16 microtarefas de 10 minutos cada para garantir sua sobrevivência profissional
                </p>
                <button
                  onClick={() => router.push('/checkout')}
                  className="btn-primary w-full"
                >
                  Acessar por R$ 19,90
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Urgência */}
        <section className="py-20 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">
                ⚠️ <span className="text-primary-red">ATENÇÃO:</span> O Tempo Está Se Esgotando
              </h2>
              
              <p className="text-xl text-primary-gray mb-8">
                A cada dia que passa, a IA evolui exponencialmente. 
                Profissionais que não se adaptam <strong>HOJE</strong> serão deixados para trás amanhã.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {[
                  { stat: "70%", desc: "dos empregos serão impactados pela IA até 2030" },
                  { stat: "50%", desc: "das tarefas atuais podem ser automatizadas" },
                  { stat: "24 meses", desc: "tempo médio para substituição profissional" }
                ].map((item, index) => (
                  <div key={index} className="card-dark text-center">
                    <div className="text-3xl font-bold text-primary-red mb-2">
                      {item.stat}
                    </div>
                    <p className="text-primary-gray text-sm">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => router.push('/checkout')}
                className="btn-primary text-2xl px-16 py-8 inline-flex items-center gap-4"
              >
                <Brain className="w-8 h-8" />
                GARANTIR MINHA SOBREVIVÊNCIA AGORA
                <ArrowRight className="w-8 h-8" />
              </button>

              <p className="text-primary-gray text-sm mt-4">
                💳 Pagamento 100% seguro • 🔒 Acesso imediato • ⚡ Garantia de 7 dias
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}