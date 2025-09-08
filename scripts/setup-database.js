import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

// Configuração do Supabase
const supabaseUrl = 'https://kadtoeurkvwxeynjectu.supabase.co'
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImthZHRvZXVya3Z3eGV5bmplY3R1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNTc5MjQzOCwiZXhwIjoyMDQxMzY4NDM4fQ.kxG7PECiELGBTYPhbAGJGNqRLjCGDh--JRTB5PmkLrM'

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function setupDatabase() {
  try {
    console.log('🚀 Configurando banco de dados Supabase...')

    // Executar schema
    console.log('📋 Executando schema...')
    const schemaPath = path.join(process.cwd(), 'supabase', 'schema.sql')
    const schemaSQL = fs.readFileSync(schemaPath, 'utf8')
    
    // Dividir em comandos individuais
    const commands = schemaSQL
      .split(';')
      .map(cmd => cmd.trim())
      .filter(cmd => cmd.length > 0)

    for (const command of commands) {
      if (command.trim()) {
        console.log(`Executando: ${command.substring(0, 50)}...`)
        const { error } = await supabase.rpc('exec', { sql: command })
        if (error && !error.message.includes('already exists')) {
          console.error('Erro no comando:', error)
        }
      }
    }

    // Executar seed data
    console.log('🌱 Inserindo dados iniciais...')
    const seedPath = path.join(process.cwd(), 'supabase', 'seed.sql')
    const seedSQL = fs.readFileSync(seedPath, 'utf8')
    
    const seedCommands = seedSQL
      .split(';')
      .map(cmd => cmd.trim())
      .filter(cmd => cmd.length > 0)

    for (const command of seedCommands) {
      if (command.trim()) {
        console.log(`Executando seed: ${command.substring(0, 50)}...`)
        const { error } = await supabase.rpc('exec', { sql: command })
        if (error && !error.message.includes('already exists')) {
          console.error('Erro no seed:', error)
        }
      }
    }

    // Verificar se as tabelas foram criadas
    console.log('✅ Verificando tabelas criadas...')
    const { data: tables, error: tablesError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')

    if (tablesError) {
      console.error('Erro ao verificar tabelas:', tablesError)
    } else {
      console.log('📊 Tabelas encontradas:', tables.map(t => t.table_name))
    }

    console.log('🎉 Banco de dados configurado com sucesso!')

  } catch (error) {
    console.error('❌ Erro ao configurar banco:', error)
  }
}

// Executar se chamado diretamente
if (import.meta.url === `file://${process.argv[1]}`) {
  setupDatabase()
}

export default setupDatabase