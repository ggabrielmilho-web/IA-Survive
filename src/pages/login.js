import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { motion } from 'framer-motion'
import { Mail, Phone, Brain, ArrowRight } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    
    if (!email) {
      toast.error('Digite seu email')
      return
    }

    setLoading(true)
    toast.loading('Verificando acesso...', { id: 'login' })

    try {
      // Simular verificação no Supabase
      // Em produção: verificar se email tem plano premium
      const response = await fetch('/api/auth/check-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      const data = await response.json()

      if (data.hasAccess) {
        // Salvar sessão local
        localStorage.setItem('user_email', email)
        localStorage.setItem('user_premium', 'true')
        
        toast.success('Acesso liberado!', { id: 'login' })
        router.push('/dashboard')
      } else {
        toast.error('Email não encontrado ou sem plano premium', { id: 'login' })
      }
    } catch (error) {
      toast.error('Erro ao verificar acesso', { id: 'login' })
    }

    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Login - IA Survivor</title>
        <meta name="description" content="Acesse sua área premium do IA Survivor" />
      </Head>

      <div className="min-h-screen bg-gradient-apocalypse flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-secondary-gray-dark rounded-lg border border-primary-gray/20 p-8 w-full max-w-md"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <Brain className="w-16 h-16 text-primary-red mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gradient mb-2">
              Acesso Premium
            </h1>
            <p className="text-primary-gray">
              Entre com o email usado na compra
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-primary-gray mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary-gray" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-secondary-gray-light border border-primary-gray/30 rounded-lg text-white placeholder-primary-gray focus:border-primary-red focus:outline-none"
                  placeholder="seu@email.com"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3 flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Acessar Dashboard
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Help */}
          <div className="mt-8 text-center">
            <p className="text-primary-gray text-sm mb-4">
              💡 <strong>Não encontra seu email?</strong>
            </p>
            <div className="space-y-2 text-xs text-primary-gray">
              <p>• Verifique se o pagamento foi aprovado</p>
              <p>• Use o mesmo email da compra</p>
              <p>• Entre em contato: suporte@carvalhoia.com</p>
            </div>
          </div>

          {/* Back to home */}
          <div className="mt-6 text-center">
            <button
              onClick={() => router.push('/')}
              className="text-primary-gray hover:text-white text-sm transition-colors"
            >
              ← Voltar ao início
            </button>
          </div>
        </motion.div>
      </div>
    </>
  )
}