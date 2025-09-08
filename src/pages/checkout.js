import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { Brain, CheckCircle, CreditCard, Shield, Clock, Star, Plus } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Checkout() {
  const router = useRouter()
  const [quizData, setQuizData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [withOrderBump, setWithOrderBump] = useState(false)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')

  useEffect(() => {
    // Verificar se há resultado do quiz
    const storedResult = localStorage.getItem('quizResult')
    if (!storedResult) {
      router.push('/quiz')
      return
    }
    setQuizData(JSON.parse(storedResult))
  }, [router])

  const handleCheckout = async () => {
    if (!email || !name) {
      toast.error('Por favor, preencha nome e email')
      return
    }

    if (!email.includes('@')) {
      toast.error('Por favor, insira um email válido')
      return
    }

    setLoading(true)

    try {
      // Simular criação de sessão de usuário
      const userId = 'temp-' + Date.now()
      const quizSessionId = 'session-' + Date.now()

      // Criar checkout
      const response = await fetch('/api/mercadopago/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          quizSessionId,
          withOrderBump,
          userEmail: email,
          userName: name
        }),
      })

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error || 'Erro ao criar checkout')
      }

      // Redirecionar para checkout do Mercado Pago
      window.location.href = data.initPoint

    } catch (error) {
      console.error('Erro no checkout:', error)
      toast.error('Erro ao processar pagamento. Tente novamente.')
      setLoading(false)
    }
  }

  const basePrice = 19.90
  const orderBumpPrice = 9.90
  const totalPrice = withOrderBump ? basePrice + orderBumpPrice : basePrice

  if (!quizData) {
    return (
      <div className="min-h-screen bg-gradient-apocalypse flex items-center justify-center">
        <div className="text-center">
          <Brain className="w-16 h-16 text-primary-red animate-pulse mx-auto mb-4" />
          <p className="text-xl text-primary-gray">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Checkout - Diagnóstico ISIa® Completo</title>
        <meta name="description" content="Garanta acesso ao seu diagnóstico completo e plano de ação personalizado" />
      </Head>

      <div className="min-h-screen bg-gradient-apocalypse py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold mb-4">
              🔓 Desbloqueie Seu <span className="text-gradient">Diagnóstico Completo</span>
            </h1>
            <p className="text-xl text-primary-gray">
              Seu ISIa® é <span className="text-primary-red font-bold">{quizData.isia}/10</span> - 
              Agora descubra EXATAMENTE como se proteger
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Produto Principal */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="card-dark"
            >
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-primary-red/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Brain className="w-8 h-8 text-primary-red" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Diagnóstico ISIa® Vitalício</h2>
                <p className="text-primary-gray">Acesso completo + Plano de ação personalizado</p>
              </div>

              {/* Benefícios */}
              <div className="space-y-4 mb-8">
                {[
                  'Análise completa em 4 camadas (técnica, econômica, cultural, social)',
                  '16 microtarefas de 10 minutos cada para sua proteção',
                  'Plano de ação personalizado baseado no seu ISIa®',
                  'Acesso vitalício - consulte sempre que precisar',
                  'Relatório detalhado em PDF para download',
                  'Suporte por email para dúvidas'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary-green mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-primary-gray">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-primary-red mb-2">
                  R$ {basePrice.toFixed(2)}
                </div>
                <p className="text-primary-gray text-sm">Pagamento único - Acesso vitalício</p>
              </div>
            </motion.div>

            {/* Order Bump */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`card-dark relative ${withOrderBump ? 'ring-2 ring-secondary-yellow' : ''}`}
            >
              {/* Etiqueta de oferta */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="bg-secondary-yellow text-primary-black px-4 py-1 rounded-full text-sm font-bold">
                  🔥 OFERTA ESPECIAL
                </div>
              </div>

              <div className="text-center mb-8 pt-4">
                <div className="w-16 h-16 bg-secondary-yellow/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Star className="w-8 h-8 text-secondary-yellow" />
                </div>
                <h3 className="text-xl font-bold mb-2">50 Comandos Proibidos de IA</h3>
                <p className="text-primary-gray text-sm">E-book exclusivo para dominar qualquer IA</p>
              </div>

              <div className="space-y-3 mb-8">
                {[
                  'Comandos secretos para ChatGPT, Claude e Gemini',
                  'Técnicas avançadas de prompt engineering',
                  'Automações que ninguém te ensina',
                  'Casos práticos para cada área profissional'
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-secondary-yellow mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-primary-gray">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-lg text-primary-gray line-through">R$ 29,90</span>
                  <span className="text-2xl font-bold text-secondary-yellow">R$ {orderBumpPrice.toFixed(2)}</span>
                </div>
                <p className="text-primary-gray text-xs">67% OFF - Apenas hoje!</p>
              </div>

              <button
                onClick={() => setWithOrderBump(!withOrderBump)}
                className={`w-full p-4 rounded-lg border-2 transition-all ${
                  withOrderBump
                    ? 'border-secondary-yellow bg-secondary-yellow/10 text-secondary-yellow'
                    : 'border-primary-gray/30 text-primary-gray hover:border-secondary-yellow/50'
                }`}
              >
                <div className="flex items-center justify-center gap-3">
                  <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                    withOrderBump ? 'border-secondary-yellow bg-secondary-yellow' : 'border-primary-gray'
                  }`}>
                    {withOrderBump && <CheckCircle className="w-4 h-4 text-primary-black" />}
                  </div>
                  {withOrderBump ? (
                    <span className="font-semibold">✅ ADICIONADO - Economia de R$ 20!</span>
                  ) : (
                    <span>
                      <Plus className="w-4 h-4 inline mr-2" />
                      SIM! Quero o e-book também
                    </span>
                  )}
                </div>
              </button>
            </motion.div>
          </div>

          {/* Formulário de Checkout */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12"
          >
            <div className="max-w-lg mx-auto card-dark">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">Finalizar Pedido</h3>
                <div className="text-3xl font-bold text-primary-red">
                  TOTAL: R$ {totalPrice.toFixed(2)}
                </div>
                <p className="text-primary-gray text-sm">
                  {withOrderBump ? 'Diagnóstico + E-book' : 'Apenas Diagnóstico'}
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <div>
                  <label className="block text-sm font-medium mb-2">Nome completo</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome completo"
                    className="input-dark w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    className="input-dark w-full"
                  />
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={loading}
                className="btn-primary w-full text-lg py-4 mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processando...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-3">
                    <CreditCard className="w-6 h-6" />
                    PAGAR COM MERCADO PAGO
                  </div>
                )}
              </button>

              <div className="flex items-center justify-center gap-4 text-xs text-primary-gray">
                <div className="flex items-center gap-1">
                  <Shield className="w-4 h-4" />
                  Pagamento Seguro
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  Acesso Imediato
                </div>
              </div>
            </div>
          </motion.div>

          {/* Garantia */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-12"
          >
            <div className="card-dark max-w-lg mx-auto">
              <Shield className="w-12 h-12 text-primary-green mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3 text-primary-green">
                Garantia de 7 dias
              </h3>
              <p className="text-primary-gray text-sm">
                Se não ficar 100% satisfeito com seu diagnóstico, devolvemos seu dinheiro. 
                Sem perguntas, sem burocracia.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}