# 🚀 IA-Survivor - Instruções de Deploy

## ✅ Configuração Atual:
- **Domínio**: https://survivor.carvalhoia.com  
- **Supabase**: ✅ Configurado
- **PDF Generation**: ✅ Testado e funcionando

---

## 📋 PRÓXIMOS PASSOS:

### 1. 💳 **CONFIGURAR MERCADO PAGO:**

**No Painel do Mercado Pago:**
1. Acessar: https://www.mercadopago.com.br/developers/panel
2. **Webhook URL**: `https://survivor.carvalhoia.com/api/mercadopago/webhook`
3. **Eventos**: Marcar apenas `payment` (aprovação/rejeição)

**Credenciais necessárias:**
```
PUBLIC_KEY: TEST-xxxxx (para sandbox) ou APP_USR-xxxxx (produção)
ACCESS_TOKEN: TEST-xxxxx (para sandbox) ou APP_USR-xxxxx (produção)
```

---

### 2. 🌐 **CONFIGURAÇÃO DNS:**

**No seu provedor DNS (Registro.br, Cloudflare, etc):**
```
Tipo: CNAME
Nome: survivor
Destino: cname.vercel-dns.com
TTL: 300
```

**OU usar A Record:**
```
Tipo: A
Nome: survivor  
IP: 76.76.19.61
TTL: 300
```

---

### 3. ☁️ **DEPLOY VERCEL:**

**Variáveis de Ambiente no Vercel:**
```bash
NEXT_PUBLIC_SUPABASE_URL=https://kadtoeurkvwxeynjectu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImthZHRvZXVya3Z3eGV5bmplY3R1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2MDA5NzEsImV4cCI6MjA2ODE3Njk3MX0.qbKPi22EW_izttL72PqWak_MJR-PwR01IGI8BQ7ag9o
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImthZHRvZXVya3Z3eGV5bmplY3R1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjYwMDk3MSwiZXhwIjoyMDY4MTc2OTcxfQ.N98pWxGmKcubdhTsFRGRyInpqqRUd1q5zwaheJ4W3pA
NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY=SUAS_CREDENCIAIS_MP
MERCADOPAGO_ACCESS_TOKEN=SUAS_CREDENCIAIS_MP  
NEXT_PUBLIC_APP_URL=https://survivor.carvalhoia.com
```

---

### 4. 🗄️ **EXECUTAR SQL NO SUPABASE:**

**No SQL Editor do Supabase, executar em ordem:**
1. `supabase/FIXED_SQL.sql` - Criação das tabelas
2. `supabase/INSERT_QUESTIONS.sql` - Inserção das perguntas

---

## ✅ **CHECKLIST PRÉ-DEPLOY:**

- [x] Supabase configurado
- [x] PDF generation funcionando  
- [ ] Credenciais Mercado Pago
- [ ] DNS configurado
- [ ] Deploy no Vercel
- [ ] Teste do webhook MP
- [ ] Teste fluxo completo

---

## 🔧 **COMANDOS ÚTEIS:**

```bash
# Desenvolvimento local
npm run dev

# Build para produção
npm run build

# Testar PDF
curl -X GET "https://survivor.carvalhoia.com/api/download/diagnostic"
```