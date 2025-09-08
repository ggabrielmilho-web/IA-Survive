# 🚀 INSTRUÇÕES PARA FINALIZAR O IA SURVIVOR

## ⚡ PASSOS OBRIGATÓRIOS PARA COMPLETAR:

### 1. 🗄️ CONFIGURAR BANCO SUPABASE
1. Acesse: https://kadtoeurkvwxeynjectu.supabase.co
2. Vá em **SQL Editor**
3. Copie e cole TODO o conteúdo do arquivo: `supabase/EXECUTE_THIS_SQL.sql`
4. Clique em **"Run"**
5. ✅ Confirme que as tabelas foram criadas (devem aparecer 6 tabelas)

### 2. 📁 INTEGRAR SEUS ARQUIVOS EXISTENTES
**Copie seus arquivos para estas pastas:**

```
IA-Survive/public/assets/ebooks/
├── 50-comandos-proibidos-ia.pdf     ← SEU PDF DOS 50 PROMPTS
└── diagnostico-modelo.pdf           ← PDF modelo para diagnóstico

IA-Survive/public/assets/images/
└── ebook-cover.jpg                  ← SUA IMAGEM DA CAPA
```

**Comandos para copiar (execute no terminal):**
```bash
# Vá para a pasta do projeto
cd C:\Users\note\IA-Survive

# Copie seu PDF (ajuste o caminho do seu arquivo)
copy "C:\SEU_ARQUIVO_50_PROMPTS.pdf" "public\assets\ebooks\50-comandos-proibidos-ia.pdf"

# Copie sua imagem da capa (ajuste o caminho)
copy "C:\SUA_IMAGEM_CAPA.jpg" "public\assets\images\ebook-cover.jpg"
```

### 3. 🧪 TESTAR TUDO
1. Execute: `npm run dev`
2. Abra: http://localhost:3001
3. **Teste o fluxo completo:**
   - ✅ Landing page
   - ✅ Quiz completo (5 perguntas)
   - ✅ Página de resultado
   - ✅ Checkout (não finalize o pagamento)
   - ✅ Dashboard (http://localhost:3001/dashboard)
   - ✅ Download dos PDFs no dashboard

### 4. 🚀 DEPLOY NA VERCEL
1. Execute: `npm run build` (testar se não há erros)
2. Execute: `npx vercel --prod`
3. Configure as variáveis de ambiente na Vercel:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://kadtoeurkvwxeynjectu.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImthZHRvZXVya3Z3eGV5bmplY3R1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU3OTI0MzgsImV4cCI6MjA0MTM2ODQzOH0.gHGfVU2OxTnlYgJZP3j6QV7xoGJKqw7eDrAnKWKBRtA
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImthZHRvZXVya3Z3eGV5bmplY3R1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNTc5MjQzOCwiZXhwIjoyMDQxMzY4NDM4fQ.kxG7PECiELGBTYPhbAGJGNqRLjCGDh--JRTB5PmkLrM
   NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY=APP_USR-f6ce755f-f20b-4856-bac4-d6a0b32b1c13
   MERCADOPAGO_ACCESS_TOKEN=APP_USR-7810557650029226-080707-bee55d28f3378feb485ac0cd51108f2e-344879246
   NEXTAUTH_URL=https://SEU_DOMINIO_VERCEL.app
   NEXTAUTH_SECRET=change_this_in_production_123456
   PRODUCT_PRICE_DIAGNOSTIC=19.90
   PRODUCT_PRICE_EBOOK=9.90
   ```

### 5. ⚙️ CONFIGURAR WEBHOOK MERCADO PAGO
1. No painel do Mercado Pago, configure:
2. **URL webhook**: `https://SEU_DOMINIO_VERCEL.app/api/mercadopago/webhook`
3. **Eventos**: `payment`

## ✅ CHECKLIST FINAL:

- [ ] Banco Supabase configurado (6 tabelas criadas)
- [ ] PDF do e-book copiado para `public/assets/ebooks/`
- [ ] Imagem da capa copiada para `public/assets/images/`
- [ ] Teste local funcionando 100%
- [ ] Build sem erros (`npm run build`)
- [ ] Deploy na Vercel concluído
- [ ] Variáveis de ambiente configuradas
- [ ] Webhook Mercado Pago configurado
- [ ] Teste completo em produção

## 🎯 RESULTADO FINAL:
- ✅ MVP totalmente funcional
- ✅ Quiz científico ISIa®
- ✅ Checkout com Mercado Pago
- ✅ Downloads reais dos PDFs
- ✅ Dashboard premium completo
- ✅ Sistema de pagamento integrado

## 🆘 SE PRECISAR DE AJUDA:
Execute este comando para voltar ao desenvolvimento:
```bash
cd C:\Users\note\IA-Survive && npm run dev
```

Depois me fale qual parte está com problema! 🚀