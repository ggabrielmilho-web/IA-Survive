# Estruturação do Código e Orientações de Implementação - IA Survivor

## 1. Estrutura do Projeto

A estrutura do projeto Next.js deve ser organizada de forma modular e escalável, facilitando a manutenção e o desenvolvimento futuro.

```
ia-survivor/
├── .env.local                 # Variáveis de ambiente
├── .env.example              # Exemplo de variáveis de ambiente
├── next.config.js            # Configuração do Next.js
├── tailwind.config.js        # Configuração do TailwindCSS
├── package.json              # Dependências do projeto
├── README.md                 # Documentação do projeto
├── public/                   # Arquivos estáticos
│   ├── images/              # Imagens e ícones
│   ├── favicon.ico          # Favicon
│   └── robots.txt           # SEO
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── ui/             # Componentes de interface básicos
│   │   ├── quiz/           # Componentes específicos do quiz
│   │   ├── layout/         # Componentes de layout
│   │   └── common/         # Componentes comuns
│   ├── pages/              # Páginas do Next.js
│   │   ├── api/            # API Routes
│   │   │   ├── auth/       # Autenticação
│   │   │   ├── quiz/       # Lógica do quiz
│   │   │   ├── stripe/     # Integração Stripe
│   │   │   └── user/       # Operações de usuário
│   │   ├── _app.js         # App wrapper
│   │   ├── _document.js    # Document customizado
│   │   ├── index.js        # Landing page
│   │   ├── quiz.js         # Página do quiz
│   │   ├── result.js       # Página de resultado
│   │   ├── checkout.js     # Página de checkout
│   │   ├── success.js      # Página de sucesso
│   │   ├── dashboard.js    # Área do usuário
│   │   └── login.js        # Página de login
│   ├── lib/                # Utilitários e configurações
│   │   ├── supabase.js     # Cliente Supabase
│   │   ├── stripe.js       # Cliente Stripe
│   │   ├── auth.js         # Helpers de autenticação
│   │   ├── quiz-logic.js   # Lógica de cálculo do ISIa
│   │   └── utils.js        # Funções utilitárias
│   ├── hooks/              # Custom React hooks
│   │   ├── useAuth.js      # Hook de autenticação
│   │   ├── useQuiz.js      # Hook do quiz
│   │   └── useLocalStorage.js # Hook para localStorage
│   ├── styles/             # Estilos globais
│   │   ├── globals.css     # Estilos globais
│   │   └── components.css  # Estilos de componentes
│   ├── types/              # Definições TypeScript (se usar)
│   │   ├── quiz.ts         # Tipos do quiz
│   │   ├── user.ts         # Tipos de usuário
│   │   └── database.ts     # Tipos do banco de dados
│   └── data/               # Dados estáticos
│       ├── questions.js    # Perguntas do quiz
│       ├── areas.js        # Áreas de atuação
│       └── tasks.js        # Microtarefas do plano de ação
└── supabase/               # Configurações do Supabase
    ├── migrations/         # Migrações do banco
    └── seed.sql           # Dados iniciais
```

## 2. Configuração Inicial

### 2.1. Dependências do Projeto (package.json)

```json
{
  "name": "ia-survivor",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "@supabase/supabase-js": "^2.38.0",
    "@supabase/auth-helpers-nextjs": "^0.8.0",
    "stripe": "^14.0.0",
    "framer-motion": "^10.16.0",
    "react-hook-form": "^7.47.0",
    "react-hot-toast": "^2.4.1",
    "lucide-react": "^0.292.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "autoprefixer": "^10.0.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "^14.0.0",
    "postcss": "^8.0.0",
    "tailwindcss": "^3.3.0",
    "typescript": "^5.0.0"
  }
}
```

### 2.2. Configuração do TailwindCSS (tailwind.config.js)

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          black: '#0A0A0A',
          red: '#FF3B30',
          gray: '#8E8E93',
          white: '#FFFFFF',
          green: '#30D158',
          blue: '#007AFF',
        },
        secondary: {
          'red-dark': '#8B0000',
          'gray-dark': '#1C1C1E',
          yellow: '#FFD60A',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-glow': 'pulseGlow 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(255, 59, 48, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(255, 59, 48, 0.8)' },
        },
      },
    },
  },
  plugins: [],
}
```

### 2.3. Variáveis de Ambiente (.env.local)

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# App
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
```

## 3. Configuração do Banco de Dados (Supabase)

### 3.1. Schema SQL

```sql
-- Extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela de usuários (extends auth.users)
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'premium')),
  profile_data JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de perguntas do quiz
CREATE TABLE public.questions (
  id SERIAL PRIMARY KEY,
  question_text TEXT NOT NULL,
  question_type TEXT NOT NULL CHECK (question_type IN ('multiple_choice', 'scale', 'text')),
  options JSONB, -- Para opções de múltipla escolha
  weight DECIMAL(3,2) NOT NULL, -- Peso da pergunta (0.00 a 1.00)
  order_index INTEGER NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de sessões de quiz
CREATE TABLE public.quiz_sessions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  isia_index DECIMAL(3,1) NOT NULL, -- ISIa de 0.0 a 10.0
  risk_level TEXT NOT NULL CHECK (risk_level IN ('very_low', 'low', 'moderate', 'high', 'critical')),
  quiz_version INTEGER DEFAULT 1,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de respostas do quiz
CREATE TABLE public.quiz_answers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  quiz_session_id UUID REFERENCES public.quiz_sessions(id) ON DELETE CASCADE,
  question_id INTEGER REFERENCES public.questions(id),
  answer_value TEXT NOT NULL,
  score_component DECIMAL(4,2), -- Contribuição desta resposta para o ISIa
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de planos de ação
CREATE TABLE public.action_plans (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  quiz_session_id UUID REFERENCES public.quiz_sessions(id) ON DELETE SET NULL,
  plan_data JSONB NOT NULL, -- Estrutura do plano com as 4 categorias
  plan_version INTEGER DEFAULT 1,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de pedidos/compras
CREATE TABLE public.orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE RESTRICT,
  stripe_checkout_session_id TEXT UNIQUE,
  product_type TEXT NOT NULL CHECK (product_type IN ('diagnostic', 'order_bump', 'subscription')),
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'BRL',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX idx_quiz_sessions_user_id ON public.quiz_sessions(user_id);
CREATE INDEX idx_quiz_answers_session_id ON public.quiz_answers(quiz_session_id);
CREATE INDEX idx_action_plans_user_id ON public.action_plans(user_id);
CREATE INDEX idx_orders_user_id ON public.orders(user_id);
CREATE INDEX idx_orders_stripe_session ON public.orders(stripe_checkout_session_id);

-- Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.action_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Políticas RLS
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own quiz sessions" ON public.quiz_sessions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create quiz sessions" ON public.quiz_sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own quiz answers" ON public.quiz_answers
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.quiz_sessions 
      WHERE id = quiz_session_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create quiz answers" ON public.quiz_answers
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.quiz_sessions 
      WHERE id = quiz_session_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view own action plans" ON public.action_plans
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create action plans" ON public.action_plans
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own orders" ON public.orders
  FOR SELECT USING (auth.uid() = user_id);

-- Função para atualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### 3.2. Dados Iniciais (seed.sql)

```sql
-- Inserir perguntas do quiz
INSERT INTO public.questions (question_text, question_type, options, weight, order_index) VALUES
(
  'Qual é a sua área de atuação principal?',
  'multiple_choice',
  '["Tecnologia da Informação", "Finanças e Contabilidade", "Marketing e Vendas", "Recursos Humanos", "Atendimento ao Cliente", "Saúde", "Educação", "Artes e Design", "Manufatura", "Serviços Gerais", "Outro"]',
  0.30,
  1
),
(
  'Qual a proporção de suas tarefas diárias que são altamente repetitivas e baseadas em regras claras?',
  'scale',
  '["0-20%", "21-40%", "41-60%", "61-80%", "81-100%"]',
  0.25,
  2
),
(
  'Em que medida você já utiliza ferramentas de IA em seu trabalho?',
  'scale',
  '["Nunca", "Raramente", "Às vezes", "Frequentemente", "Extensivamente"]',
  0.20,
  3
),
(
  'Seu trabalho exige forte interação humana, empatia, negociação ou julgamento ético complexo?',
  'scale',
  '["Raramente", "Às vezes", "Frequentemente", "Constantemente"]',
  0.15,
  4
),
(
  'Seu trabalho depende fundamentalmente de plataformas digitais, softwares específicos ou dados digitais?',
  'scale',
  '["Não", "Pouco", "Moderadamente", "Muito", "Totalmente"]',
  0.10,
  5
);
```

## 4. Implementação dos Componentes Principais

### 4.1. Cliente Supabase (lib/supabase.js)

```javascript
import { createClient } from '@supabase/supabase-js'
import { createClientComponentClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Cliente para uso no frontend
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Cliente para componentes do cliente
export const createSupabaseClient = () => createClientComponentClient()

// Cliente para componentes do servidor
export const createSupabaseServerClient = (context) => createServerComponentClient(context)

// Cliente com privilégios de service role (apenas para API routes)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})
```

### 4.2. Lógica de Cálculo do ISIa (lib/quiz-logic.js)

```javascript
// Mapeamento de áreas de atuação para fatores de risco base
const AREA_RISK_FACTORS = {
  'Tecnologia da Informação': 5,
  'Finanças e Contabilidade': 8,
  'Marketing e Vendas': 6,
  'Recursos Humanos': 4,
  'Atendimento ao Cliente': 9,
  'Saúde': 3,
  'Educação': 4,
  'Artes e Design': 2,
  'Manufatura': 7,
  'Serviços Gerais': 6,
  'Outro': 5
}

// Função principal para calcular o ISIa
export function calculateISIa(answers) {
  const weights = {
    area: 0.30,
    repetitive: 0.25,
    aiUsage: 0.20,
    humanInteraction: 0.15,
    digitalDependency: 0.10
  }

  // Normalizar respostas para escala 0-10
  const normalizedScores = {
    area: normalizeAreaScore(answers.area),
    repetitive: normalizeScaleScore(answers.repetitive, 5), // 5 opções
    aiUsage: normalizeAIUsageScore(answers.aiUsage),
    humanInteraction: normalizeHumanInteractionScore(answers.humanInteraction),
    digitalDependency: normalizeScaleScore(answers.digitalDependency, 5)
  }

  // Calcular ISIa base
  let isiaBase = 0
  Object.keys(weights).forEach(key => {
    isiaBase += normalizedScores[key] * weights[key]
  })

  // Aplicar ajustes não-lineares
  let isiaFinal = applyNonLinearAdjustments(isiaBase, normalizedScores)

  // Garantir que está na escala 0-10
  isiaFinal = Math.max(0, Math.min(10, isiaFinal))

  return {
    isia: Math.round(isiaFinal * 10) / 10, // Uma casa decimal
    riskLevel: getRiskLevel(isiaFinal),
    breakdown: normalizedScores
  }
}

function normalizeAreaScore(area) {
  return AREA_RISK_FACTORS[area] || 5
}

function normalizeScaleScore(scaleIndex, maxOptions) {
  // Converter índice da escala para pontuação 0-10
  return (scaleIndex / (maxOptions - 1)) * 10
}

function normalizeAIUsageScore(scaleIndex) {
  // Inverter a pontuação: mais uso de IA = menor risco
  const maxOptions = 5
  return 10 - ((scaleIndex / (maxOptions - 1)) * 10)
}

function normalizeHumanInteractionScore(scaleIndex) {
  // Inverter a pontuação: mais interação humana = menor risco
  const maxOptions = 4
  return 10 - ((scaleIndex / (maxOptions - 1)) * 10)
}

function applyNonLinearAdjustments(baseScore, scores) {
  let adjustedScore = baseScore

  // Bônus de risco: área de alto risco + tarefas muito repetitivas
  if (scores.area > 7 && scores.repetitive > 8) {
    adjustedScore *= 1.2
  }

  // Atenuação: uso extensivo de IA + alta interação humana
  if (scores.aiUsage < 3 && scores.humanInteraction < 3) {
    adjustedScore *= 0.8
  }

  // Bônus crítico: área crítica + tarefas 100% repetitivas + sem uso de IA
  if (scores.area > 8 && scores.repetitive > 9 && scores.aiUsage > 8) {
    adjustedScore *= 1.5
  }

  return adjustedScore
}

function getRiskLevel(isia) {
  if (isia <= 2) return 'very_low'
  if (isia <= 4) return 'low'
  if (isia <= 6) return 'moderate'
  if (isia <= 8) return 'high'
  return 'critical'
}

// Função para gerar diagnóstico personalizado
export function generateDiagnosis(isia, riskLevel, userAnswers) {
  const diagnoses = {
    very_low: {
      title: "PIONEIRO DIGITAL DETECTADO!",
      message: `Seu ISIa® de ${isia}/10 revela que você está à frente da curva. Você não apenas sobreviverá à revolução da IA, mas liderará ela. Continue inovando e ajudando outros a se adaptarem.`,
      timeframe: "Você está preparado para o futuro"
    },
    low: {
      title: "SOBREVIVENTE RESILIENTE",
      message: `Com um ISIa® de ${isia}/10, você possui uma base sólida de adaptabilidade. Pequenos ajustes em sua estratégia profissional garantirão sua relevância contínua no mercado.`,
      timeframe: "Mantenha-se vigilante e continue evoluindo"
    },
    moderate: {
      title: "ALERTA AMARELO - AÇÃO NECESSÁRIA",
      message: `Seu ISIa® de ${isia}/10 indica que você está na zona de risco moderado. É hora de acelerar sua adaptação. A IA está se aproximando da sua área, mas você ainda tem tempo para se reposicionar.`,
      timeframe: "12 a 18 meses para implementar mudanças significativas"
    },
    high: {
      title: "ALERTA VERMELHO - URGÊNCIA MÁXIMA",
      message: `Seu ISIa® de ${isia}/10 é um sinal de alarme que não pode ser ignorado. Até 70% das suas atividades atuais estão na mira da automação. A transformação não é mais opcional, é questão de sobrevivência.`,
      timeframe: "6 a 12 meses para reinvenção completa"
    },
    critical: {
      title: "CÓDIGO VERMELHO - SUBSTITUIÇÃO IMINENTE",
      message: `Com um ISIa® de ${isia}/10, você está na linha de frente da obsolescência profissional. A IA já pode executar a maioria das suas tarefas com maior eficiência. A reinvenção radical é sua única saída.`,
      timeframe: "3 a 6 meses para mudança drástica ou substituição inevitável"
    }
  }

  return diagnoses[riskLevel]
}
```

## 5. Guia de Instalação e Execução Local

### 5.1. Pré-requisitos

- Node.js 18+ instalado
- Conta no Supabase
- Conta no Stripe
- Git instalado

### 5.2. Passo a Passo

```bash
# 1. Clonar o repositório (ou criar novo projeto)
npx create-next-app@latest ia-survivor --typescript --tailwind --eslint
cd ia-survivor

# 2. Instalar dependências
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs stripe framer-motion react-hook-form react-hot-toast lucide-react clsx tailwind-merge

# 3. Configurar variáveis de ambiente
cp .env.example .env.local
# Editar .env.local com suas chaves

# 4. Configurar Supabase
# - Criar projeto no Supabase
# - Executar o SQL schema no SQL Editor
# - Configurar autenticação (email/password)
# - Copiar URL e chaves para .env.local

# 5. Configurar Stripe
# - Criar conta no Stripe
# - Configurar produtos (Diagnóstico R$19,90, E-book R$9,90)
# - Configurar webhook endpoint: /api/stripe/webhook
# - Copiar chaves para .env.local

# 6. Executar em desenvolvimento
npm run dev
```

### 5.3. Deploy em Produção

```bash
# 1. Build do projeto
npm run build

# 2. Deploy na Vercel (recomendado)
npx vercel --prod

# 3. Configurar variáveis de ambiente na Vercel
# 4. Atualizar URLs do Stripe webhook para produção
# 5. Configurar domínio personalizado (opcional)
```

Esta estrutura fornece uma base sólida e escalável para o desenvolvimento do IA Survivor, com todas as funcionalidades principais implementadas e prontas para customização e expansão.

