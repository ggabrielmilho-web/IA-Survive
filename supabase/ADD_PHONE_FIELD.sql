-- =====================================================
-- ADICIONAR CAMPO TELEFONE - EXECUTE NO SUPABASE
-- =====================================================

-- Adicionar campo phone na tabela users (se não existir)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'users' AND column_name = 'phone') THEN
        ALTER TABLE public.users ADD COLUMN phone TEXT;
    END IF;
END$$;

-- Comentário para o campo
COMMENT ON COLUMN public.users.phone IS 'Telefone do usuário capturado no checkout';

-- Verificar se o campo foi adicionado
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'users' AND column_name = 'phone';