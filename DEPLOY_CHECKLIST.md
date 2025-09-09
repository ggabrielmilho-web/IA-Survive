# ✅ CHECKLIST DE DEPLOY - IA-SURVIVOR

## 🎯 SISTEMA COMPLETO PRONTO PARA PRODUÇÃO

---

## 📋 PRÉ-DEPLOY (JÁ FEITO)

✅ **Código Commitado**: Sistema completo no GitHub  
✅ **Credenciais Configuradas**: Supabase + Mercado Pago  
✅ **Banco de Dados**: Tabelas + campo phone criados  
✅ **PDF Generation**: Testado (6 páginas, 16KB)  
✅ **APIs**: Todas funcionando  
✅ **Documentação**: README + DEPLOY_GUIDE completos  

---

## 🚀 DEPLOY VERCEL (30 MINUTOS)

### 1. 📤 **Push para GitHub** (2 min)
```bash
git push origin main
```

### 2. ☁️ **Conectar Vercel** (5 min)
1. Acessar: https://vercel.com
2. Import Git Repository
3. Conectar repositório IA-Survive
4. Framework: **Next.js** (auto-detect)

### 3. 🔧 **Environment Variables** (10 min)
**Colar exatamente estas variáveis no Vercel:**

```bash
NEXT_PUBLIC_SUPABASE_URL=https://kadtoeurkvwxeynjectu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImthZHRvZXVya3Z3eGV5bmplY3R1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2MDA5NzEsImV4cCI6MjA2ODE3Njk3MX0.qbKPi22EW_izttL72PqWak_MJR-PwR01IGI8BQ7ag9o
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImthZHRvZXVya3Z3eGV5bmplY3R1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjYwMDk3MSwiZXhwIjoyMDY4MTc2OTcxfQ.N98pWxGmKcubdhTsFRGRyInpqqRUd1q5zwaheJ4W3pA
NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY=APP_USR-f6ce755f-f20b-4856-bac4-d6a0b32b1c13
MERCADOPAGO_ACCESS_TOKEN=APP_USR-7810557650029226-080707-bee55d28f3378feb485ac0cd51108f2e-344879246
MERCADOPAGO_WEBHOOK_SECRET=7005778b7c6382e814c78cfb6f96952da35ef7f71ae6858a857caddbe2f56dcb
NEXT_PUBLIC_APP_URL=https://survivor.carvalhoia.com
```

### 4. 🏗️ **Deploy** (5 min)
- Clicar **Deploy**
- Aguardar build (2-3 min)
- ✅ Deploy realizado!

### 5. 🌐 **Domínio** (8 min)
**Vercel:**
1. Settings → Domains
2. Add Domain: `survivor.carvalhoia.com`

**DNS (Cloudflare/Registro.br):**
```
Tipo: CNAME
Nome: survivor
Destino: cname.vercel-dns.com
TTL: 300
```

---

## 💳 PÓS-DEPLOY (10 MINUTOS)

### 1. 🔗 **Webhook Mercado Pago** (5 min)
1. Acessar: https://www.mercadopago.com.br/developers/panel
2. **URL**: `https://survivor.carvalhoia.com/api/mercadopago/webhook`
3. **Eventos**: Marcar apenas `payment`
4. **Secret**: `7005778b7c6382e814c78cfb6f96952da35ef7f71ae6858a857caddbe2f56dcb`

### 2. 🧪 **Testes Produção** (5 min)
```bash
# 1. Homepage
GET https://survivor.carvalhoia.com

# 2. API Status
GET https://survivor.carvalhoia.com/api/users/list-premium

# 3. PDF Download
GET https://survivor.carvalhoia.com/api/download/diagnostic

# 4. Login
GET https://survivor.carvalhoia.com/login
```

---

## 🎯 TESTE COMPLETO (5 MINUTOS)

### ✅ **Fluxo End-to-End:**
1. **Acessar**: https://survivor.carvalhoia.com
2. **Fazer Quiz**: 5 perguntas
3. **Ver Resultado**: ISIa® calculado
4. **Checkout**: R$ 19,90 (teste com PIX)
5. **Login**: Usar email do checkout
6. **Dashboard**: Verificar acesso premium
7. **Download**: PDF personalizado

---

## 📊 MONITORAMENTO

### 🔍 **Logs & Debugging:**
- **Vercel**: Functions → View Function Logs
- **Supabase**: Database → Logs
- **Mercado Pago**: Webhooks → Activity

### 📈 **Métricas:**
```bash
# Usuários premium capturados
GET https://survivor.carvalhoia.com/api/users/list-premium

# Stats esperadas:
{
  "total_premium": X,
  "with_email": X,
  "with_phone": X,
  "complete_data": X
}
```

---

## 🆘 TROUBLESHOOTING

### ❌ **Problemas Comuns:**

**1. Build Error:**
- Verificar syntax errors nos arquivos
- Verificar imports/exports

**2. Webhook não funciona:**
- Verificar URL webhook no MP
- Verificar secret no env vars
- Ver logs das functions

**3. PDF não gera:**
- Ver logs Vercel functions
- Verificar timeout (max 30s)

**4. Login falha:**
- Verificar Supabase env vars
- Verificar conexão com banco

---

## 🎉 DEPLOY CONCLUÍDO

### ✅ **Sistema Funcionando:**
- 🌐 **Site**: https://survivor.carvalhoia.com
- 💳 **Pagamentos**: Mercado Pago (R$ 19,90)
- 📄 **PDFs**: Geração automática
- 🔐 **Login**: Acesso permanente
- 📊 **Dashboard**: Área premium
- 📱 **Mobile**: Responsivo completo

### 🎯 **Ready to Generate Leads!**

**Total time: ~40 minutos**  
**System: 100% Production Ready** ✅

---

*Em caso de dúvidas, consultar `DEPLOY_GUIDE.md` ou `README.md`*