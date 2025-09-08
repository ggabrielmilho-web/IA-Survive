import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0A0A0A" />
        <meta name="description" content="Descubra seu risco de substituição pela IA em 3 minutos" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="IA Survivor - Descubra Seu Risco de Substituição pela IA" />
        <meta property="og:description" content="Você será substituído por IA nos próximos 2 anos? Descubra em 3 minutos." />
        <meta property="og:image" content="/og-image.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="IA Survivor - Descubra Seu Risco de Substituição pela IA" />
        <meta property="twitter:description" content="Você será substituído por IA nos próximos 2 anos? Descubra em 3 minutos." />
        <meta property="twitter:image" content="/og-image.jpg" />

        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      </Head>
      <body className="bg-primary-black text-primary-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}