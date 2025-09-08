const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://kadtoeurkvwxeynjectu.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImthZHRvZXVya3Z3eGV5bmplY3R1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNTc5MjQzOCwiZXhwIjoyMDQxMzY4NDM4fQ.kxG7PECiELGBTYPhbAGJGNqRLjCGDh--JRTB5PmkLrM'

const supabase = createClient(supabaseUrl, supabaseKey)

async function createTables() {
  console.log('🚀 Criando tabelas no Supabase...')

  try {
    // 1. Tabela de usuários
    console.log('👥 Criando tabela users...')
    const { error: usersError } = await supabase.rpc('exec', {
      sql: `
        CREATE TABLE IF NOT EXISTS public.users (
          id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
          email TEXT UNIQUE NOT NULL,
          name TEXT,
          plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'premium')),
          profile_data JSONB DEFAULT '{}',
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    })
    if (usersError) console.log('Error users:', usersError)

    // 2. Tabela de perguntas
    console.log('❓ Criando tabela questions...')
    const { error: questionsError } = await supabase.rpc('exec', {
      sql: `
        CREATE TABLE IF NOT EXISTS public.questions (
          id SERIAL PRIMARY KEY,
          question_text TEXT NOT NULL,
          question_type TEXT NOT NULL CHECK (question_type IN ('multiple_choice', 'scale', 'text')),
          options JSONB,
          weight DECIMAL(3,2) NOT NULL,
          order_index INTEGER NOT NULL,
          is_active BOOLEAN DEFAULT TRUE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    })
    if (questionsError) console.log('Error questions:', questionsError)

    // 3. Tabela de sessões de quiz
    console.log('🧠 Criando tabela quiz_sessions...')
    const { error: sessionsError } = await supabase.rpc('exec', {
      sql: `
        CREATE TABLE IF NOT EXISTS public.quiz_sessions (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
          isia_index DECIMAL(3,1) NOT NULL,
          risk_level TEXT NOT NULL CHECK (risk_level IN ('very_low', 'low', 'moderate', 'high', 'critical')),
          quiz_version INTEGER DEFAULT 1,
          completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    })
    if (sessionsError) console.log('Error quiz_sessions:', sessionsError)

    // 4. Tabela de respostas
    console.log('✅ Criando tabela quiz_answers...')
    const { error: answersError } = await supabase.rpc('exec', {
      sql: `
        CREATE TABLE IF NOT EXISTS public.quiz_answers (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          quiz_session_id UUID REFERENCES public.quiz_sessions(id) ON DELETE CASCADE,
          question_id INTEGER REFERENCES public.questions(id),
          answer_value TEXT NOT NULL,
          score_component DECIMAL(4,2),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    })
    if (answersError) console.log('Error quiz_answers:', answersError)

    // 5. Tabela de pedidos
    console.log('💰 Criando tabela orders...')
    const { error: ordersError } = await supabase.rpc('exec', {
      sql: `
        CREATE TABLE IF NOT EXISTS public.orders (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          user_id UUID REFERENCES public.users(id) ON DELETE RESTRICT,
          mercadopago_payment_id TEXT UNIQUE,
          product_type TEXT NOT NULL CHECK (product_type IN ('diagnostic', 'order_bump', 'subscription')),
          amount DECIMAL(10,2) NOT NULL,
          currency TEXT DEFAULT 'BRL',
          status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'cancelled', 'refunded')),
          metadata JSONB DEFAULT '{}',
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    })
    if (ordersError) console.log('Error orders:', ordersError)

    // 6. Inserir perguntas
    console.log('🌱 Inserindo perguntas do quiz...')
    const { error: insertError } = await supabase
      .from('questions')
      .upsert([
        {
          id: 1,
          question_text: 'Qual é a sua área de atuação principal?',
          question_type: 'multiple_choice',
          options: ["Tecnologia da Informação", "Finanças e Contabilidade", "Marketing e Vendas", "Recursos Humanos", "Atendimento ao Cliente", "Saúde", "Educação", "Artes e Design", "Manufatura", "Serviços Gerais", "Outro"],
          weight: 0.30,
          order_index: 1
        },
        {
          id: 2,
          question_text: 'Qual a proporção de suas tarefas diárias que são altamente repetitivas e baseadas em regras claras?',
          question_type: 'scale',
          options: ["0-20%", "21-40%", "41-60%", "61-80%", "81-100%"],
          weight: 0.25,
          order_index: 2
        },
        {
          id: 3,
          question_text: 'Em que medida você já utiliza ferramentas de IA em seu trabalho?',
          question_type: 'scale',
          options: ["Nunca", "Raramente", "Às vezes", "Frequentemente", "Extensivamente"],
          weight: 0.20,
          order_index: 3
        },
        {
          id: 4,
          question_text: 'Seu trabalho exige forte interação humana, empatia, negociação ou julgamento ético complexo?',
          question_type: 'scale',
          options: ["Raramente", "Às vezes", "Frequentemente", "Constantemente"],
          weight: 0.15,
          order_index: 4
        },
        {
          id: 5,
          question_text: 'Seu trabalho depende fundamentalmente de plataformas digitais, softwares específicos ou dados digitais?',
          question_type: 'scale',
          options: ["Não", "Pouco", "Moderadamente", "Muito", "Totalmente"],
          weight: 0.10,
          order_index: 5
        }
      ])

    if (insertError) {
      console.log('Error inserting questions:', insertError)
    }

    // 7. Verificar tabelas criadas
    console.log('🔍 Verificando tabelas...')
    const { data: tables } = await supabase
      .from('questions')
      .select('*')
      .limit(1)

    console.log('✅ Tabelas criadas com sucesso!')
    console.log('📊 Exemplo de dados:', tables)

  } catch (error) {
    console.error('❌ Erro geral:', error)
  }
}

createTables()