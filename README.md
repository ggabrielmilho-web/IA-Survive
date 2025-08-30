# 🤖 IA Survivor - Descubra Seu Risco de Substituição pela IA

> **"Você será substituído por IA nos próximos 2 anos? Descubra em 3 minutos."**

Um aplicativo web inovador que calcula o risco de substituição profissional pela Inteligência Artificial e oferece planos de ação personalizados para sobrevivência no mercado de trabalho.

## 📊 Sobre o Projeto

O **IA Survivor** é uma plataforma de diagnóstico que utiliza o **ISIa®** (Índice de Substituição pela IA) - uma métrica proprietária que avalia de 0 a 10 o risco de um profissional ser substituído por Inteligência Artificial.

### 🎯 Funcionalidades Principais

- **📋 Quiz Gamificado**: 5 perguntas estratégicas que analisam perfil profissional
- **📈 Índice ISIa®**: Métrica proprietária de risco (0-10) com cálculo não-linear
- **🎯 Diagnóstico Personalizado**: Análise "brutal e reveladora" em 4 camadas
- **📋 Plano de Ação**: 4 blocos de microtarefas de 10 minutos cada
- **💰 Monetização**: Diagnóstico vitalício + order bump estratégico
- **👥 Área do Usuário**: Dashboard, histórico e comunidade

## 🧮 Como Funciona o ISIa®

O algoritmo considera 5 dimensões principais:

1. **📊 Área de Atuação** (30%): Mapeamento de setores por risco de automação
2. **🔄 Natureza das Tarefas** (25%): Proporção de atividades repetitivas
3. **🤖 Exposição à IA** (20%): Nível atual de uso de ferramentas de IA
4. **👥 Habilidades Interpessoais** (15%): Dependência de interação humana
5. **💻 Dependência Digital** (10%): Grau de digitalização do trabalho

### 📊 Níveis de Risco

- **🟢 0-2**: Pioneiro Digital (Liderar a revolução)
- **🟡 3-4**: Sobrevivente Resiliente (Base sólida)
- **🟠 5-6**: Alerta Amarelo (Ação necessária)
- **🔴 7-8**: Alerta Vermelho (Urgência máxima)
- **⚫ 9-10**: Código Vermelho (Substituição iminente)

## 🏗️ Arquitetura Técnica

### Stack Principal
- **Frontend**: Next.js 14 + React 18 + TailwindCSS
- **Backend**: Next.js API Routes
- **Banco de Dados**: Supabase (PostgreSQL)
- **Autenticação**: Supabase Auth
- **Pagamentos**: Stripe + Webhooks
- **Animações**: Framer Motion

### 🛠️ Tecnologias Utilizadas

```json
{
  "frontend": ["Next.js", "React", "TailwindCSS", "Framer Motion"],
  "backend": ["Next.js API Routes", "Supabase"],
  "database": ["PostgreSQL", "Row Level Security"],
  "payments": ["Stripe Checkout", "Webhooks"],
  "deployment": ["Vercel", "Supabase Cloud"]
}
```

## 📁 Estrutura do Projeto

```
ia-survivor/
├── 📄 analise_ia_survivor.md      # Análise completa do projeto (64KB)
├── 📄 estrutura_codigo_ia_survivor.md # Guia técnico de implementação (20KB)
├── 📁 src/
│   ├── 📁 components/
│   │   ├── 📁 ui/           # Componentes básicos
│   │   ├── 📁 quiz/         # Componentes do quiz
│   │   ├── 📁 layout/       # Layout e navegação
│   │   └── 📁 common/       # Componentes reutilizáveis
│   ├── 📁 pages/
│   │   ├── 📁 api/          # API Routes
│   │   ├── index.js         # Landing page
│   │   ├── quiz.js          # Quiz gamificado
│   │   ├── result.js        # Resultado e diagnóstico
│   │   └── dashboard.js     # Área do usuário
│   ├── 📁 lib/
│   │   ├── supabase.js      # Cliente Supabase
│   │   ├── stripe.js        # Cliente Stripe
│   │   └── quiz-logic.js    # Algoritmo ISIa®
│   └── 📁 data/
│       ├── questions.js     # Perguntas do quiz
│       └── tasks.js         # Microtarefas do plano
└── 📁 supabase/
    ├── migrations/          # Schema do banco
    └── seed.sql            # Dados iniciais
```

## 🎨 Design System

### Paleta de Cores (Tema Apocalíptico/Futurista)
- **⚫ Preto Profundo**: `#0A0A0A` - Base principal
- **🔴 Vermelho Alerta**: `#FF3B30` - Urgência e CTAs
- **⚪ Branco Puro**: `#FFFFFF` - Textos principais
- **🔘 Cinza Metálico**: `#8E8E93` - Elementos secundários
- **🟢 Verde Neon**: `#30D158` - Sucesso e progresso

### 🖋️ Tipografia
- **Headlines**: Inter/Roboto Bold
- **Corpo**: Inter/Roboto Regular
- **Métricas**: JetBrains Mono (visual digital)

## 💰 Modelo de Negócio

### 🎯 Monetização Principal
- **📊 Diagnóstico Vitalício**: R$ 19,90 (produto principal)
- **📚 Order Bump**: E-book "50 Comandos Proibidos" - R$ 9,90
- **📈 Conversão Esperada**: 15-25% (quiz → pagamento)

### 📈 Estratégias de Expansão
- **💳 Modelo SaaS**: Planos mensais (R$ 9,90 a R$ 49,90)
- **🎓 Cursos Especializados**: R$ 97 - R$ 297
- **👨‍💼 Consultoria 1:1**: R$ 197/hora
- **🏢 Plano Corporate**: Diagnóstico de equipes
- **🤝 Programa de Afiliados**: 30-50% comissão

## 📊 Métricas de Sucesso

### 🎯 KPIs Principais
- **Conversão Landing → Quiz**: Meta 60%+
- **Conclusão do Quiz**: Meta 80%+
- **Conversão Quiz → Pagamento**: Meta 20%+
- **LTV (Lifetime Value)**: Meta R$ 150+
- **NPS (Net Promoter Score)**: Meta 50+

## 🚀 Instalação e Desenvolvimento

### 📋 Pré-requisitos
- Node.js 18+
- Conta Supabase
- Conta Stripe
- Git

### ⚡ Quick Start
```bash
# 1. Clonar e instalar
git clone https://github.com/ggabrielmilho-web/IA-Survive.git
cd IA-Survive
npm install

# 2. Configurar ambiente
cp .env.example .env.local
# Editar .env.local com suas chaves

# 3. Executar
npm run dev
```

### 🌐 Deploy
```bash
# Vercel (recomendado)
npx vercel --prod

# Configurar variáveis de ambiente
# Configurar webhooks Stripe
```

## 📚 Documentação Completa

- **📊 Análise Detalhada**: [`analise_ia_survivor.md`](./analise_ia_survivor.md) - Análise completa do projeto, estratégias de monetização, design UX/UI e roadmap de implementação
- **🛠️ Guia Técnico**: [`estrutura_codigo_ia_survivor.md`](./estrutura_codigo_ia_survivor.md) - Estruturação do código, schema do banco, implementação e guia passo a passo

## 🎯 Roadmap

### 📅 Fase 1: MVP (0-3 meses)
- ✅ Quiz funcional com ISIa®
- ✅ Sistema de pagamento Stripe
- ✅ Diagnóstico básico personalizado
- ✅ Landing page otimizada

### 📅 Fase 2: Expansão (3-6 meses)
- 📈 Plano de ação expandido
- 👥 Área do usuário completa
- 📊 Analytics avançados
- 🤝 Programa de afiliados

### 📅 Fase 3: Escala (6-12 meses)
- 💳 Modelo de assinatura
- 👥 Comunidade de usuários
- 🎓 Cursos especializados
- 🏢 Versão corporativa

## 🌟 Diferenciais Competitivos

- **📊 Métrica Proprietária**: ISIa® como padrão de mercado
- **🎯 Diagnóstico Personalizado**: Análise em 4 camadas (técnica, econômica, cultural, social)
- **⚡ Ação Imediata**: Microtarefas de 10 minutos
- **🎮 Gamificação**: Experiência envolvente e viciante
- **🔍 Transparência**: Metodologia clara e científica

## 👨‍💻 Autor

**Gabriel Carvalho** - Desenvolvedor e Especialista em IA  
- GitHub: [@ggabrielmilho-web](https://github.com/ggabrielmilho-web)

---

> **⚠️ Aviso Legal**: Este projeto é uma ferramenta educacional e de autoavaliação. Os resultados do ISIa® são estimativas baseadas em padrões de mercado e não garantem precisão absoluta sobre substituição profissional por IA.

**🚀 "Não seja substituído. Seja o substituto." - IA Survivor**