-- INSERIR PERGUNTAS DO QUIZ (execute após as tabelas)

INSERT INTO public.questions (id, question_text, question_type, options, weight, order_index) VALUES 
(1, 'Qual é a sua área de atuação principal?', 'multiple_choice', '["Tecnologia da Informação", "Finanças e Contabilidade", "Marketing e Vendas", "Recursos Humanos", "Atendimento ao Cliente", "Saúde", "Educação", "Artes e Design", "Manufatura", "Serviços Gerais", "Outro"]'::jsonb, 0.30, 1) 
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.questions (id, question_text, question_type, options, weight, order_index) VALUES 
(2, 'Qual a proporção de suas tarefas diárias que são altamente repetitivas e baseadas em regras claras?', 'scale', '["0-20%", "21-40%", "41-60%", "61-80%", "81-100%"]'::jsonb, 0.25, 2) 
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.questions (id, question_text, question_type, options, weight, order_index) VALUES 
(3, 'Em que medida você já utiliza ferramentas de IA em seu trabalho?', 'scale', '["Nunca", "Raramente", "Às vezes", "Frequentemente", "Extensivamente"]'::jsonb, 0.20, 3) 
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.questions (id, question_text, question_type, options, weight, order_index) VALUES 
(4, 'Seu trabalho exige forte interação humana, empatia, negociação ou julgamento ético complexo?', 'scale', '["Raramente", "Às vezes", "Frequentemente", "Constantemente"]'::jsonb, 0.15, 4) 
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.questions (id, question_text, question_type, options, weight, order_index) VALUES 
(5, 'Seu trabalho depende fundamentalmente de plataformas digitais, softwares específicos ou dados digitais?', 'scale', '["Não", "Pouco", "Moderadamente", "Muito", "Totalmente"]'::jsonb, 0.10, 5) 
ON CONFLICT (id) DO NOTHING;