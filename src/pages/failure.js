import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { XCircle, RefreshCw, HelpCircle, ArrowLeft } from 'lucide-react'

export default function Failure() {
  return (
    <>
      <Head>
        <title>Pagamento Não Aprovado - IA Survivor</title>
        <meta name="description" content="Houve um problema com seu pagamento. Tente novamente." />
      </Head>

      <div className="min-h-screen bg-gradient-apocalypse">
        <div className="py-20 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              {/* Error Icon */}
              <div className="w-24 h-24 bg-primary-red/20 rounded-full mx-auto mb-8 flex items-center justify-center">
                <XCircle className="w-16 h-16 text-primary-red" />
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                ❌ <span className="text-primary-red">Pagamento Não Aprovado</span>
              </h1>

              <p className="text-xl text-primary-gray mb-12">
                Houve um problema ao processar seu pagamento. Mas não se preocupe, isso acontece!
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="card-dark mb-8"
            >
              <h3 className="text-xl font-semibold mb-6">Possíveis motivos:</h3>
              <div className="space-y-3 text-left">
                {[
                  'Limite do cartão insuficiente',
                  'Dados do cartão incorretos',
                  'Cartão bloqueado pelo banco',
                  'Problema temporário na operadora',
                  'Cartão vencido ou inativo'
                ].map((reason, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary-red rounded-full mt-2 flex-shrink-0" />
                    <span className="text-primary-gray">{reason}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="space-y-6 mb-12"
            >
              {/* Botões de ação */}
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/checkout">
                  <button className="btn-primary w-full inline-flex items-center justify-center gap-3">
                    <RefreshCw className="w-5 h-5" />
                    Tentar Novamente
                  </button>
                </Link>
                
                <a 
                  href="mailto:suporte@iasurviver.com"
                  className="btn-secondary w-full inline-flex items-center justify-center gap-3"
                >
                  <HelpCircle className="w-5 h-5" />
                  Falar com Suporte
                </a>
              </div>

              <Link href="/">
                <button className="text-primary-gray hover:text-white transition-colors inline-flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Voltar ao Início
                </button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="card-dark"
            >
              <h3 className="text-lg font-semibold mb-4 text-secondary-yellow">
                💡 Dicas para o próximo pagamento:
              </h3>
              <div className="space-y-2 text-left text-sm text-primary-gray">
                <p>• Verifique se os dados do cartão estão corretos</p>
                <p>• Confirme se há limite disponível</p>
                <p>• Tente usar outro cartão ou forma de pagamento</p>
                <p>• Entre em contato com seu banco se o problema persistir</p>
              </div>
            </motion.div>

            <div className="mt-8 text-primary-gray text-sm">
              <p>🔒 Todos os pagamentos são processados com segurança pelo Mercado Pago</p>
              <p>📧 Em caso de dúvidas: suporte@iasurviver.com</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}