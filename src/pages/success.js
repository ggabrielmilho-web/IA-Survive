import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle, Download, Brain, Star, ArrowRight } from 'lucide-react'

export default function Success() {
  return (
    <>
      <Head>
        <title>Pagamento Aprovado - IA Survivor</title>
        <meta name="description" content="Pagamento aprovado! Acesse seu diagnóstico completo agora." />
      </Head>

      <div className="min-h-screen bg-gradient-apocalypse">
        <div className="py-20 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              {/* Success Icon */}
              <div className="w-24 h-24 bg-primary-green/20 rounded-full mx-auto mb-8 flex items-center justify-center">
                <CheckCircle className="w-16 h-16 text-primary-green" />
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                🎉 <span className="text-gradient">Pagamento Aprovado!</span>
              </h1>

              <p className="text-xl text-primary-gray mb-12">
                Parabéns! Agora você tem acesso completo ao seu diagnóstico ISIa® e plano de ação personalizado.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid md:grid-cols-2 gap-6 mb-12"
            >
              <div className="card-dark">
                <Brain className="w-12 h-12 text-primary-red mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Diagnóstico Completo</h3>
                <p className="text-primary-gray text-sm mb-6">
                  Análise detalhada em 4 camadas + 16 microtarefas personalizadas
                </p>
                <Link href="/dashboard">
                  <button className="btn-primary w-full">
                    <Download className="w-5 h-5 mr-2" />
                    Acessar Diagnóstico
                  </button>
                </Link>
              </div>

              <div className="card-dark">
                <Star className="w-12 h-12 text-secondary-yellow mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">E-book Bônus</h3>
                <p className="text-primary-gray text-sm mb-6">
                  50 Comandos Proibidos de IA para dominar qualquer ferramenta
                </p>
                <Link href="/dashboard">
                  <button className="btn-secondary w-full">
                    <Download className="w-5 h-5 mr-2" />
                    Baixar E-book
                  </button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="card-dark mb-8"
            >
              <h3 className="text-2xl font-bold mb-4 text-primary-green">
                ✅ O que você recebeu:
              </h3>
              <div className="space-y-3 text-left max-w-lg mx-auto">
                {[
                  'Relatório completo do seu ISIa® em PDF',
                  'Plano de ação com 16 microtarefas de 10 minutos',
                  'Análise detalhada em 4 camadas (técnica, econômica, cultural, social)',
                  'Acesso vitalício ao seu diagnóstico',
                  'E-book "50 Comandos Proibidos de IA" (se incluído)',
                  'Suporte por email para dúvidas'
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary-green mt-0.5 flex-shrink-0" />
                    <span className="text-primary-gray">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <h3 className="text-2xl font-bold mb-6">
                🚀 Próximos Passos Recomendados:
              </h3>
              
              <div className="space-y-4 mb-8">
                <div className="card-dark">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-primary-red rounded-full flex items-center justify-center text-white font-bold">
                      1
                    </div>
                    <div className="text-left">
                      <h4 className="font-semibold">Leia seu diagnóstico completo</h4>
                      <p className="text-primary-gray text-sm">Entenda exatamente onde você está e o que precisa fazer</p>
                    </div>
                  </div>
                </div>

                <div className="card-dark">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-primary-red rounded-full flex items-center justify-center text-white font-bold">
                      2
                    </div>
                    <div className="text-left">
                      <h4 className="font-semibold">Implemente as primeiras 4 microtarefas</h4>
                      <p className="text-primary-gray text-sm">Comece hoje mesmo com ações de 10 minutos cada</p>
                    </div>
                  </div>
                </div>

                <div className="card-dark">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-primary-red rounded-full flex items-center justify-center text-white font-bold">
                      3
                    </div>
                    <div className="text-left">
                      <h4 className="font-semibold">Use os comandos de IA do e-book</h4>
                      <p className="text-primary-gray text-sm">Acelere sua produtividade com técnicas avançadas</p>
                    </div>
                  </div>
                </div>
              </div>

              <Link href="/dashboard">
                <button className="btn-primary text-xl px-12 py-6 inline-flex items-center gap-3">
                  <Brain className="w-6 h-6" />
                  ACESSAR MINHA ÁREA
                  <ArrowRight className="w-6 h-6" />
                </button>
              </Link>

              <p className="text-primary-gray text-sm mt-6">
                💌 Você também receberá um email com todos os detalhes e links de acesso.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}