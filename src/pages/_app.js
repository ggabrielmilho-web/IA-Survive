import '../styles/globals.css'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Toaster } from 'react-hot-toast'

export default function App({ Component, pageProps }) {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Obter sessão atual
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    // Escutar mudanças na autenticação
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  // Adicionar sessão aos props de todas as páginas
  const pagePropsWithSession = {
    ...pageProps,
    session,
    loading
  }

  return (
    <>
      <Component {...pagePropsWithSession} />
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1C1C1E',
            color: '#FFFFFF',
            border: '1px solid #8E8E93',
          },
        }}
      />
    </>
  )
}