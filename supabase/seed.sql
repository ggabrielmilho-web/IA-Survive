-- Inserir perguntas do quiz (Delete existing first)
DELETE FROM public.questions;

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