import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Brain, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react'

export default function Home() {
  return (
    <>
      <Head>
        <title>IA Survivor - Descubra Seu Risco de Substituição pela IA</title>
        <meta name="description" content="Você será substituído por IA nos próximos 2 anos? Descubra em 3 minutos com o ISIa®" />
      </Head>

      <div className="min-h-screen bg-gradient-apocalypse">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="text-gradient">IA SURVIVOR</span>
              </h1>
              <p className="text-xl md:text-2xl text-primary-gray mb-8">
                Você será <span className="text-primary-red font-semibold">substituído por IA</span> nos próximos 2 anos?
              </p>
              <p className="text-3xl md:text-4xl font-bold text-primary-white mb-12">
                Descubra em <span className="text-secondary-yellow">3 minutos</span>
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-6"
            >
              <Link href="/quiz">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary text-xl px-12 py-6 inline-flex items-center gap-3"
                >
                  <Brain className="w-6 h-6" />
                  DESCOBRIR MEU ISIa® AGORA
                  <ArrowRight className="w-6 h-6" />
                </motion.button>
              </Link>
              
              <p className="text-primary-gray text-sm">
                ✅ Teste gratuito • ✅ Resultado imediato • ✅ Plano de ação personalizado
              </p>
            </motion.div>
          </div>

          {/* Floating Elements */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute top-20 left-10 text-primary-red opacity-20"
          >
            <AlertTriangle className="w-16 h-16" />
          </motion.div>
          
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute bottom-20 right-10 text-primary-green opacity-20"
          >
            <CheckCircle className="w-12 h-12" />
          </motion.div>
        </section>

        {/* ISIa Explanation */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6">
                O que é o <span className="text-gradient">ISIa®</span>?
              </h2>
              <p className="text-xl text-primary-gray max-w-3xl mx-auto">
                O Índice de Substituição pela IA é uma métrica proprietária que avalia de 0 a 10 
                o risco de um profissional ser substituído por Inteligência Artificial.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <TrendingUp className="w-12 h-12" />,
                  title: "Algoritmo Científico",
                  description: "Baseado em 5 dimensões principais que determinam sua vulnerabilidade à automação"
                },
                {
                  icon: <Brain className="w-12 h-12" />,
                  title: "Análise Personalizada", 
                  description: "Diagnóstico brutal e revelador em 4 camadas: técnica, econômica, cultural e social"
                },
                {
                  icon: <CheckCircle className="w-12 h-12" />,
                  title: "Plano de Ação",
                  description: "4 blocos de microtarefas de 10 minutos cada para garantir sua sobrevivência profissional"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="card-dark text-center"
                >
                  <div className="text-primary-red mb-4 flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-primary-gray">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Risk Levels */}
        <section className="py-20 px-4 bg-secondary-gray-dark/50">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6">Níveis de Risco ISIa®</h2>
              <p className="text-xl text-primary-gray">
                Onde você se encaixa na escala de substituição?
              </p>
            </motion.div>

            <div className="space-y-4">
              {[
                { range: "0-2", level: "PIONEIRO DIGITAL", color: "bg-primary-green", description: "Liderar a revolução" },
                { range: "3-4", level: "SOBREVIVENTE RESILIENTE", color: "bg-primary-blue", description: "Base sólida" },
                { range: "5-6", level: "ALERTA AMARELO", color: "bg-secondary-yellow", description: "Ação necessária" },
                { range: "7-8", level: "ALERTA VERMELHO", color: "bg-primary-red", description: "Urgência máxima" },
                { range: "9-10", level: "CÓDIGO VERMELHO", color: "bg-secondary-red-dark", description: "Substituição iminente" }
              ].map((risk, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 p-4 rounded-lg border border-primary-gray/20"
                >
                  <div className={`w-16 h-16 ${risk.color} rounded-lg flex items-center justify-center font-bold text-white`}>
                    {risk.range}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{risk.level}</h3>
                    <p className="text-primary-gray">{risk.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">
                Não seja <span className="text-primary-red">substituído</span>.
                <br />
                Seja o <span className="text-primary-green">substituto</span>.
              </h2>
              
              <p className="text-xl text-primary-gray mb-12">
                Descubra seu ISIa® agora e receba seu plano de sobrevivência personalizado
              </p>

              <Link href="/quiz">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary text-xl px-12 py-6 inline-flex items-center gap-3"
                >
                  <Brain className="w-6 h-6" />
                  COMEÇAR TESTE GRATUITO
                  <ArrowRight className="w-6 h-6" />
                </motion.button>
              </Link>

              <p className="text-primary-gray text-sm mt-6">
                ⚡ 3 minutos • 🎯 Resultado imediato • 📋 Plano de ação personalizado
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}