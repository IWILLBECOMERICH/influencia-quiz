export const QUESTIONS = [
  {
    q: 'Qual é o tamanho da sua audiência hoje?',
    o: [
      'Menos de 5 mil seguidores',
      'Entre 5 mil e 50 mil',
      'Entre 50 mil e 500 mil',
      'Mais de 500 mil',
    ],
    values: [1, 2, 3, 4],
  },
  {
    q: 'Você já monetizou sua audiência de alguma forma?',
    o: [
      'Ainda não tentei',
      'Tentei mas sem resultado consistente',
      'Sim, com publis e parcerias pontuais',
      'Sim, tenho receita recorrente',
    ],
    values: [1, 2, 3, 4],
  },
  {
    q: 'Qual é o seu nicho de conteúdo principal?',
    o: [
      'Sem nicho definido / variedades',
      'Entretenimento geral ou humor',
      'Lifestyle, finanças pessoais ou esportes',
      'Games, apostas, iGaming ou finanças',
    ],
    values: [1, 2, 3, 4],
  },
  {
    q: 'Com que frequência você publica conteúdo?',
    o: [
      'Raramente ou sem consistência',
      '1 a 2 vezes por semana',
      '3 a 5 vezes por semana',
      'Diariamente ou mais',
    ],
    values: [1, 2, 3, 4],
  },
  {
    q: 'Como você descreveria o engajamento da sua audiência?',
    o: [
      'Baixo, pouca interação nos posts',
      'Médio, algumas curtidas e comentários',
      'Bom, audiência ativa e participativa',
      'Alto, audiência muito engajada e fiel',
    ],
    values: [1, 2, 3, 4],
  },
  {
    q: 'Você já teve contato com o mercado de iGaming?',
    o: [
      'Nunca ouvi falar ou não conheço',
      'Conheço mas nunca trabalhei',
      'Já trabalhei pontualmente com alguma casa',
      'Tenho experiência com operações de iGaming',
    ],
    values: [1, 2, 3, 4],
  },
  {
    q: 'Qual é o seu principal objetivo com o iGaming?',
    o: [
      'Só quero explorar e entender',
      'Gerar uma renda extra',
      'Transformar em minha principal fonte de renda',
      'Construir uma operação profissional e escalável',
    ],
    values: [1, 2, 3, 4],
  },
  {
    q: 'Quanto tempo por semana você pode dedicar a isso?',
    o: [
      'Menos de 5 horas por semana',
      'Entre 5 e 10 horas',
      'Entre 10 e 20 horas',
      'Mais de 20 horas / dedico integralmente',
    ],
    values: [1, 2, 3, 4],
  },
  {
    q: 'Você tem ou planeja ter um canal focado em iGaming?',
    o: [
      'Não tenho e não planejo',
      'Estou avaliando a possibilidade',
      'Sim, estou construindo agora',
      'Sim, já tenho um canal ativo',
    ],
    values: [1, 2, 3, 4],
  },
  {
    q: 'Como prefere operar no mercado de iGaming?',
    o: [
      'Ainda estou descobrindo como funciona',
      'Sozinho, no meu próprio ritmo',
      'Com apoio pontual de uma equipe',
      'Com estrutura profissional e suporte completo',
    ],
    values: [1, 2, 3, 4],
  },
]

export const INSIGHTS_DATA = {
  high: [
    { icon: '🎯', text: 'Seu perfil tem os indicadores que buscamos em uma operação profissional de iGaming', bar: 91 },
    { icon: '📊', text: 'Audiência com potencial de conversão acima da média do mercado', bar: 88 },
    { icon: '⚡', text: 'Nível de engajamento e intenção compatíveis com nossa estrutura', bar: 86 },
  ],
  mid: [
    { icon: '📈', text: 'Seu perfil está em desenvolvimento — há espaço real para crescimento com a estrutura certa', bar: 64 },
    { icon: '🎯', text: 'Nicho e audiência com potencial identificado para monetização em iGaming', bar: 58 },
    { icon: '⚡', text: 'Com suporte e processo, você pode acelerar seus resultados significativamente', bar: 52 },
  ],
  low: [
    { icon: '🌱', text: 'Você está no início da jornada — e esse é o melhor momento para estruturar a base', bar: 38 },
    { icon: '🎯', text: 'Nossa equipe já ajudou creators em estágios parecidos a escalar com iGaming', bar: 30 },
    { icon: '⚡', text: 'O caminho mais rápido é começar com uma estrutura profissional desde o início', bar: 24 },
  ],
}

export const RESULT_TEMPLATES = {
  high: {
    title: '🏆 Perfil Qualificado',
    message:
      'suas respostas indicam um perfil com forte potencial para nossa operação. Recomendamos conversar com nossa equipe para entender o próximo passo.',
  },
  mid: {
    title: '📈 Perfil em Desenvolvimento',
    message:
      'você já tem base e potencial. Com a estrutura e suporte certos, pode transformar sua audiência em uma operação consistente de iGaming.',
  },
  low: {
    title: '🌱 Perfil em Formação',
    message:
      'você está construindo sua presença. Nossa equipe pode mostrar como creators no seu estágio conseguiram resultados reais com iGaming.',
  },
}
