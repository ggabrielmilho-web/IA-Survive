# 🚀 IA-Survivor - Guia Completo de Deploy

## 📋 SISTEMA COMPLETO FINALIZADO

### ✅ FUNCIONALIDADES IMPLEMENTADAS:
- **Quiz ISIa®**: Algoritmo completo de cálculo de risco
- **Geração de PDF**: Diagnóstico personalizado (6 páginas)
- **Mercado Pago**: Integração completa com webhook
- **Sistema de Login**: Acesso permanente ao dashboard
- **Captura de Dados**: Nome, email e telefone
- **Dashboard Premium**: Downloads e progresso

---

## 🔐 CREDENCIAIS CONFIGURADAS

### Supabase:
```
URL: https://kadtoeurkvwxeynjectu.supabase.co
ANON_KEY: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImthZHRvZXVya3Z3eGV5bmplY3R1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2MDA5NzEsImV4cCI6MjA2ODE3Njk3MX0.qbKPi22EW_izttL72PqWak_MJR-PwR01IGI8BQ7ag9o
SERVICE_ROLE: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImthZHRvZXVya3Z3eGV5bmplY3R1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjYwMDk3MSwiZXhwIjoyMDY4MTc2OTcxfQ.N98pWxGmKcubdhTsFRGRyInpqqRUd1q5zwaheJ4W3pA
```

### Mercado Pago (PRODUÇÃO):
```
PUBLIC_KEY: APP_USR-f6ce755f-f20b-4856-bac4-d6a0b32b1c13
ACCESS_TOKEN: APP_USR-7810557650029226-080707-bee55d28f3378feb485ac0cd51108f2e-344879246
WEBHOOK_SECRET: 7005778b7c6382e814c78cfb6f96952da35ef7f71ae6858a857caddbe2f56dcb
```

---

## 🗄️ BANCO DE DADOS (SUPABASE)

### ✅ JÁ EXECUTADO:
- ✅ Tabelas criadas (`FIXED_SQL.sql`)
- ✅ Perguntas inseridas (`INSERT_QUESTIONS.sql`)
- ✅ Campo `phone` adicionado na tabela users

### 📊 ESTRUTURA:
- `users` - Usuários premium com email, nome, telefone
- `questions` - Perguntas do quiz ISIa®
- `quiz_sessions` - Sessões de quiz completadas
- `quiz_answers` - Respostas individuais
- `action_plans` - Planos de ação personalizados
- `orders` - Pedidos e pagamentos

---

## ☁️ DEPLOY VERCEL

### 1. Push para GitHub:
```bash
git add .
git commit -m "Final version ready for production deploy"
git push origin main
```

### 2. Configurar no Vercel:
1. Conectar repositório GitHub
2. **Configurar Environment Variables:**

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://kadtoeurkvwxeynjectu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImthZHRvZXVya3Z3eGV5bmplY3R1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2MDA5NzEsImV4cCI6MjA2ODE3Njk3MX0.qbKPi22EW_izttL72PqWak_MJR-PwR01IGI8BQ7ag9o
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImthZHRvZXVya3Z3eGV5bmplY3R1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjYwMDk3MSwiZXhwIjoyMDY4MTc2OTcxfQ.N98pWxGmKcubdhTsFRGRyInpqqRUd1q5zwaheJ4W3pA

# Mercado Pago
NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY=APP_USR-f6ce755f-f20b-4856-bac4-d6a0b32b1c13
MERCADOPAGO_ACCESS_TOKEN=APP_USR-7810557650029226-080707-bee55d28f3378feb485ac0cd51108f2e-344879246
MERCADOPAGO_WEBHOOK_SECRET=7005778b7c6382e814c78cfb6f96952da35ef7f71ae6858a857caddbe2f56dcb

# App URL
NEXT_PUBLIC_APP_URL=https://survivor.carvalhoia.com
```

### 3. Deploy:
- Vercel fará build automático
- Deploy será feito em https://ia-survivor.vercel.app (ou seu domínio)

---

## 🌐 CONFIGURAÇÃO DE DOMÍNIO

### DNS (Cloudflare/Registro.br):
```
Tipo: CNAME
Nome: survivor
Destino: cname.vercel-dns.com
TTL: 300
```

### No Vercel:
1. Ir em Settings → Domains
2. Adicionar: `survivor.carvalhoia.com`
3. Configurar SSL automático

---

## 💳 WEBHOOK MERCADO PAGO

### Após Deploy, configurar:
1. **Painel MP**: https://www.mercadopago.com.br/developers/panel
2. **URL**: `https://survivor.carvalhoia.com/api/mercadopago/webhook`
3. **Eventos**: Marcar apenas `payment`
4. **Assinatura**: Usar o WEBHOOK_SECRET configurado

---

## 🧪 TESTES PÓS-DEPLOY

### APIs para testar:
```bash
# 1. Usuários premium
GET https://survivor.carvalhoia.com/api/users/list-premium

# 2. Download PDF
GET https://survivor.carvalhoia.com/api/download/diagnostic

# 3. Login
POST https://survivor.carvalhoia.com/api/auth/check-access
Body: {"email": "test@test.com"}

# 4. Criar checkout
POST https://survivor.carvalhoia.com/api/mercadopago/create-checkout
Body: {
  "userId": "uuid-aqui",
  "quizSessionId": "uuid-aqui", 
  "userEmail": "test@test.com",
  "userName": "Test User",
  "userPhone": "11987654321"
}
```

---

## 📱 FLUXO COMPLETO FUNCIONANDO

### User Journey:
1. **Acessa**: https://survivor.carvalhoia.com
2. **Faz Quiz**: Calcula ISIa® (1-10)
3. **Vê Resultado**: Com recomendação de compra
4. **Paga**: R$ 19,90 (diagnóstico) ou R$ 29,80 (+ebook)
5. **Webhook**: User vira premium automaticamente
6. **Login**: Sempre disponível em `/login`
7. **Dashboard**: Downloads ilimitados

### Dados Capturados:
- ✅ **Email** (obrigatório)
- ✅ **Nome** (opcional)
- ✅ **Telefone** (opcional)
- ✅ **Dados do quiz** (ISIa®, respostas)

---

## 🎯 CHECKLIST DEPLOY

- [ ] Push código para GitHub
- [ ] Conectar Vercel ao repositório
- [ ] Configurar environment variables
- [ ] Deploy inicial
- [ ] Configurar domínio survivor.carvalhoia.com
- [ ] Configurar webhook Mercado Pago
- [ ] Testar checkout completo
- [ ] Testar webhook com pagamento real
- [ ] Testar login e dashboard
- [ ] Verificar downloads PDF

---

## ⚡ COMANDOS RÁPIDOS

### Build local:
```bash
npm run build
npm start
```

### Logs em produção:
- Vercel Functions → Ver logs das APIs
- Supabase → Database → Logs

---

## 🆘 TROUBLESHOOTING

### Problemas comuns:
1. **Webhook não funciona**: Verificar URL e Secret
2. **PDF não gera**: Verificar logs do Vercel
3. **Login falha**: Verificar env vars Supabase
4. **Checkout falha**: Verificar credenciais MP

### Suporte:
- Email: suporte@carvalhoia.com
- Logs: Vercel Dashboard
- DB: Supabase Dashboard

---

**🎉 Sistema completo e pronto para produção!**

*Estimativa de tempo total de deploy: 30 minutos*