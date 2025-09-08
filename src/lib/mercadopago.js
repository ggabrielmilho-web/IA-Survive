import { MercadoPagoConfig, Preference, Payment } from 'mercadopago'

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
  options: { timeout: 5000 }
})

const preference = new Preference(client)
const payment = new Payment(client)

export const createPreference = async (items, userData = {}) => {
  try {
    const preferenceData = {
      items: items,
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_APP_URL}/success`,
        failure: `${process.env.NEXT_PUBLIC_APP_URL}/failure`, 
        pending: `${process.env.NEXT_PUBLIC_APP_URL}/success`
      },
      notification_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/mercadopago/webhook`,
      external_reference: userData.userId || 'anonymous',
      payer: {
        name: userData.name || '',
        email: userData.email || '',
        phone: {
          area_code: userData.phone ? userData.phone.substring(0, 2) : '11',
          number: userData.phone ? userData.phone.substring(2) : ''
        },
        address: {
          street_name: userData.streetName || '',
          street_number: userData.streetNumber || '',
          zip_code: userData.zipCode || ''
        }
      },
      payment_methods: {
        excluded_payment_types: [],
        excluded_payment_methods: [],
        installments: 12
      },
      metadata: {
        user_id: userData.userId,
        product_type: userData.productType || 'diagnostic',
        quiz_session_id: userData.quizSessionId
      }
    }

    const response = await preference.create({ body: preferenceData })
    return {
      success: true,
      preferenceId: response.id,
      initPoint: response.init_point,
      sandboxInitPoint: response.sandbox_init_point
    }
  } catch (error) {
    console.error('Erro ao criar preferência do Mercado Pago:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

export const getPaymentInfo = async (paymentId) => {
  try {
    const paymentInfo = await payment.get({ id: paymentId })
    return {
      success: true,
      payment: paymentInfo
    }
  } catch (error) {
    console.error('Erro ao buscar informações do pagamento:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

// Produtos do IA Survivor
export const PRODUCTS = {
  DIAGNOSTIC: {
    id: 'diagnostic',
    title: 'Diagnóstico ISIa® Vitalício',
    description: 'Descubra seu risco de substituição pela IA + Plano de ação personalizado',
    price: parseFloat(process.env.PRODUCT_PRICE_DIAGNOSTIC) || 19.90,
    currency: 'BRL',
    category_id: 'services'
  },
  EBOOK: {
    id: 'ebook',
    title: '50 Comandos Proibidos de IA',
    description: 'E-book exclusivo com comandos secretos para dominar qualquer IA',
    price: parseFloat(process.env.PRODUCT_PRICE_EBOOK) || 9.90,
    currency: 'BRL', 
    category_id: 'digital_goods'
  }
}

export const createDiagnosticCheckout = async (userData, withOrderBump = false) => {
  const items = [
    {
      id: PRODUCTS.DIAGNOSTIC.id,
      title: PRODUCTS.DIAGNOSTIC.title,
      description: PRODUCTS.DIAGNOSTIC.description,
      quantity: 1,
      unit_price: PRODUCTS.DIAGNOSTIC.price,
      currency_id: PRODUCTS.DIAGNOSTIC.currency,
      category_id: PRODUCTS.DIAGNOSTIC.category_id
    }
  ]

  // Adicionar order bump se selecionado
  if (withOrderBump) {
    items.push({
      id: PRODUCTS.EBOOK.id,
      title: PRODUCTS.EBOOK.title,
      description: PRODUCTS.EBOOK.description,
      quantity: 1,
      unit_price: PRODUCTS.EBOOK.price,
      currency_id: PRODUCTS.EBOOK.currency,
      category_id: PRODUCTS.EBOOK.category_id
    })
  }

  const checkoutData = {
    ...userData,
    productType: withOrderBump ? 'diagnostic_with_ebook' : 'diagnostic'
  }

  return await createPreference(items, checkoutData)
}

// Helper para validar webhook
export const validateWebhook = (body, signature) => {
  // Implementar validação de webhook do Mercado Pago se necessário
  // Por enquanto, retorna true para desenvolvimento
  return true
}