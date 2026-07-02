import type { Lead, LeadStatus, LeadTier, LeadSource } from '../types'

const niches = ['iGaming', 'Games', 'Finanças', 'Lifestyle', 'Esportes', 'Apostas', 'Crypto', 'Entretenimento', 'Humor', 'Tecnologia']
const cities = ['São Paulo, SP', 'Rio de Janeiro, RJ', 'Belo Horizonte, MG', 'Salvador, BA', 'Fortaleza, CE', 'Curitiba, PR', 'Manaus, AM', 'Recife, PE', 'Porto Alegre, RS', 'Goiânia, GO', 'Brasília, DF', 'Florianópolis, SC']
const sources: LeadSource[] = ['quiz', 'instagram', 'whatsapp', 'referral', 'ads']

function randomDate(daysAgo: number): string {
  const d = new Date()
  d.setDate(d.getDate() - Math.floor(Math.random() * daysAgo))
  d.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60))
  return d.toISOString()
}


const rawLeads = [
  { name: 'Gabriela Rocha', handle: 'gabrielarocha', followers: 487000, score: 88, gender: 'women', idx: 44 },
  { name: 'Lucas Mendes', handle: 'lucasmendes_', followers: 1200000, score: 94, gender: 'men', idx: 32 },
  { name: 'Isabela Costa', handle: 'isabelacosta', followers: 320000, score: 72, gender: 'women', idx: 68 },
  { name: 'Rafael Torres', handle: 'rafaeltorres', followers: 89000, score: 65, gender: 'men', idx: 75 },
  { name: 'Fernanda Lima', handle: 'fernandalima', followers: 2100000, score: 96, gender: 'women', idx: 90 },
  { name: 'Bruno Alves', handle: 'brunoalves', followers: 540000, score: 82, gender: 'men', idx: 12 },
  { name: 'Camila Souza', handle: 'camilasouza_', followers: 175000, score: 70, gender: 'women', idx: 56 },
  { name: 'Diego Santos', handle: 'diegosantos', followers: 67000, score: 48, gender: 'men', idx: 23 },
  { name: 'Ana Paula Ferreira', handle: 'anafferreira', followers: 930000, score: 91, gender: 'women', idx: 37 },
  { name: 'Thiago Oliveira', handle: 'thiagooliv', followers: 440000, score: 78, gender: 'men', idx: 8 },
  { name: 'Mariana Barbosa', handle: 'marianabarbosa', followers: 280000, score: 68, gender: 'women', idx: 15 },
  { name: 'Felipe Castro', handle: 'felipecastro', followers: 1650000, score: 93, gender: 'men', idx: 49 },
  { name: 'Juliana Neves', handle: 'juliananevesbr', followers: 115000, score: 55, gender: 'women', idx: 62 },
  { name: 'Renato Lopes', handle: 'renatolopes', followers: 73000, score: 42, gender: 'men', idx: 18 },
  { name: 'Patricia Gomes', handle: 'patriciagomes', followers: 390000, score: 80, gender: 'women', idx: 77 },
  { name: 'Eduardo Martins', handle: 'eduardomartins', followers: 850000, score: 89, gender: 'men', idx: 3 },
  { name: 'Larissa Pinto', handle: 'larissapinto_', followers: 210000, score: 63, gender: 'women', idx: 29 },
  { name: 'Vinicius Carvalho', handle: 'viniciuscarvalho', followers: 1450000, score: 97, gender: 'men', idx: 55 },
  { name: 'Beatriz Melo', handle: 'beatrizmelobb', followers: 98000, score: 52, gender: 'women', idx: 41 },
  { name: 'Gustavo Pereira', handle: 'gustavopereira', followers: 580000, score: 86, gender: 'men', idx: 67 },
  { name: 'Sandra Freitas', handle: 'sandrafreitas', followers: 145000, score: 58, gender: 'women', idx: 11 },
  { name: 'Marcelo Ribeiro', handle: 'marcelo_ribeiro', followers: 760000, score: 90, gender: 'men', idx: 34 },
  { name: 'Vanessa Lima', handle: 'vanessalimabr', followers: 62000, score: 37, gender: 'women', idx: 25 },
  { name: 'Carlos Eduardo', handle: 'carlosedu_', followers: 340000, score: 75, gender: 'men', idx: 60 },
  { name: 'Monica Andrade', handle: 'monicaandrade', followers: 195000, score: 66, gender: 'women', idx: 72 },
  { name: 'Rodrigo Silva', handle: 'rodriigosilvaa', followers: 1100000, score: 95, gender: 'men', idx: 6 },
  { name: 'Aline Cardoso', handle: 'alinecardoso', followers: 83000, score: 45, gender: 'women', idx: 48 },
  { name: 'Henrique Moura', handle: 'henriquemoura', followers: 460000, score: 83, gender: 'men', idx: 19 },
  { name: 'Priscila Farias', handle: 'priscilafarias', followers: 127000, score: 60, gender: 'women', idx: 38 },
  { name: 'Alexandre Campos', handle: 'alexcampos_', followers: 690000, score: 88, gender: 'men', idx: 74 },
  { name: 'Tatiana Ramos', handle: 'tatianaramoss', followers: 232000, score: 69, gender: 'women', idx: 53 },
  { name: 'Paulo Henrique', handle: 'paulohenriquebr', followers: 1850000, score: 98, gender: 'men', idx: 28 },
  { name: 'Renata Vieira', handle: 'renatavieira', followers: 71000, score: 41, gender: 'women', idx: 84 },
  { name: 'Sandro Lima', handle: 'sandrolima_', followers: 420000, score: 79, gender: 'men', idx: 9 },
  { name: 'Natalia Cunha', handle: 'nataliacunha', followers: 158000, score: 62, gender: 'women', idx: 66 },
  { name: 'André Batista', handle: 'andrebatista', followers: 935000, score: 92, gender: 'men', idx: 43 },
  { name: 'Cristiane Assis', handle: 'cristianeassis', followers: 89000, score: 49, gender: 'women', idx: 17 },
  { name: 'Leonardo Fonseca', handle: 'leofonseca_', followers: 560000, score: 85, gender: 'men', idx: 70 },
  { name: 'Micheli Cruz', handle: 'michelicruz', followers: 175000, score: 64, gender: 'women', idx: 31 },
  { name: 'Davi Macedo', handle: 'davimacedoo', followers: 1300000, score: 93, gender: 'men', idx: 58 },
  { name: 'Eliane Borges', handle: 'elianeborges', followers: 51000, score: 33, gender: 'women', idx: 22 },
  { name: 'Fábio Mendonça', handle: 'fabiomendonca', followers: 785000, score: 87, gender: 'men', idx: 47 },
  { name: 'Gisele Duarte', handle: 'giseleduarte', followers: 267000, score: 71, gender: 'women', idx: 63 },
  { name: 'Igor Teixeira', handle: 'igorteixeira', followers: 380000, score: 77, gender: 'men', idx: 36 },
  { name: 'Jéssica Braga', handle: 'jessicabraga', followers: 105000, score: 54, gender: 'women', idx: 80 },
  { name: 'Kleber Nogueira', handle: 'klebernogueira', followers: 630000, score: 84, gender: 'men', idx: 14 },
  { name: 'Luana Siqueira', handle: 'luanasiqueira', followers: 142000, score: 57, gender: 'women', idx: 26 },
  { name: 'Marco Leite', handle: 'marcoleite', followers: 1000000, score: 91, gender: 'men', idx: 52 },
  { name: 'Nayara Leal', handle: 'nayaraleal', followers: 77000, score: 44, gender: 'women', idx: 69 },
  { name: 'Otávio Pires', handle: 'otaviopires', followers: 510000, score: 81, gender: 'men', idx: 4 },
  { name: 'Paula Monteiro', handle: 'paulamonteiro', followers: 223000, score: 67, gender: 'women', idx: 88 },
  { name: 'Quintino Araujo', handle: 'quintino_araujo', followers: 680000, score: 86, gender: 'men', idx: 39 },
  { name: 'Roberta Branco', handle: 'robertabranco', followers: 118000, score: 56, gender: 'women', idx: 57 },
  { name: 'Sergio Figueiredo', handle: 'sergiofig', followers: 1500000, score: 96, gender: 'men', idx: 21 },
  { name: 'Tania Ferraz', handle: 'taniaferraz', followers: 87000, score: 47, gender: 'women', idx: 73 },
  { name: 'Ulisses Barros', handle: 'ulissesbarros', followers: 445000, score: 80, gender: 'men', idx: 46 },
  { name: 'Viviane Rocha', handle: 'vivianerocha_', followers: 193000, score: 65, gender: 'women', idx: 30 },
  { name: 'Wagner Pinto', handle: 'wagnerpinto', followers: 870000, score: 90, gender: 'men', idx: 1 },
  { name: 'Xênia Mota', handle: 'xeniamota', followers: 59000, score: 38, gender: 'women', idx: 50 },
  { name: 'Yuri Azevedo', handle: 'yuriazevedo', followers: 740000, score: 88, gender: 'men', idx: 35 },
  { name: 'Zilda Moraes', handle: 'zildamoraes', followers: 161000, score: 61, gender: 'women', idx: 85 },
  { name: 'Antonio Rios', handle: 'antoniorios_', followers: 2500000, score: 99, gender: 'men', idx: 10 },
  { name: 'Bruna Esteves', handle: 'brunaesteves', followers: 132000, score: 59, gender: 'women', idx: 92 },
  { name: 'Caio Vasconcelos', handle: 'caiovasconcelos', followers: 580000, score: 83, gender: 'men', idx: 16 },
  { name: 'Débora Navarro', handle: 'deboranavarro', followers: 247000, score: 70, gender: 'women', idx: 45 },
  { name: 'Evandro Menezes', handle: 'evandromenezes', followers: 670000, score: 87, gender: 'men', idx: 27 },
  { name: 'Flavia Nascimento', handle: 'flavianascimento', followers: 95000, score: 51, gender: 'women', idx: 61 },
  { name: 'Geraldo Soares', handle: 'geraldosoares', followers: 405000, score: 78, gender: 'men', idx: 5 },
  { name: 'Helena Vargas', handle: 'helenavargas', followers: 310000, score: 73, gender: 'women', idx: 40 },
  { name: 'Ivan Correia', handle: 'ivancorreia', followers: 1750000, score: 95, gender: 'men', idx: 76 },
  { name: 'Josiana Paiva', handle: 'josianapaiva', followers: 68000, score: 40, gender: 'women', idx: 59 },
  { name: 'Kevin Dias', handle: 'kevindias_', followers: 520000, score: 82, gender: 'men', idx: 33 },
  { name: 'Leticia Brandao', handle: 'leticiabrandao', followers: 188000, score: 64, gender: 'women', idx: 82 },
  { name: 'Mauricio Cunha', handle: 'mauriciocunha', followers: 950000, score: 91, gender: 'men', idx: 20 },
  { name: 'Nadia Abreu', handle: 'nadiaabreu', followers: 113000, score: 53, gender: 'women', idx: 71 },
  { name: 'Osman Queiroz', handle: 'osmanqueiroz', followers: 700000, score: 89, gender: 'men', idx: 42 },
  { name: 'Paloma Silveira', handle: 'palomasilveira', followers: 165000, score: 62, gender: 'women', idx: 54 },
  { name: 'Quirino Matos', handle: 'quirinomatos', followers: 810000, score: 90, gender: 'men', idx: 7 },
  { name: 'Raquel Medeiros', handle: 'raquelmedeiros', followers: 78000, score: 43, gender: 'women', idx: 79 },
  { name: 'Samuel Brito', handle: 'samuelbrito_', followers: 1600000, score: 97, gender: 'men', idx: 13 },
]

function getTier(score: number): LeadTier {
  if (score >= 70) return 'high'
  if (score >= 40) return 'mid'
  return 'low'
}

function getStatus(score: number, idx: number): LeadStatus {
  if (score >= 85) {
    const opts: LeadStatus[] = ['qualified', 'negotiating', 'converted', 'converted', 'converted']
    return opts[idx % opts.length]
  }
  if (score >= 65) {
    const opts: LeadStatus[] = ['contacted', 'qualified', 'negotiating', 'contacted']
    return opts[idx % opts.length]
  }
  if (score >= 40) {
    const opts: LeadStatus[] = ['new', 'contacted', 'lost', 'new']
    return opts[idx % opts.length]
  }
  const opts: LeadStatus[] = ['new', 'lost', 'new']
  return opts[idx % opts.length]
}

function formatFollowers(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`
  if (n >= 1000) return `${Math.floor(n / 1000)}K`
  return String(n)
}

export const MOCK_LEADS: Lead[] = rawLeads.map((r, i) => {
  const tier = getTier(r.score)
  const status = getStatus(r.score, i)
  const createdAt = randomDate(90)
  const niche = niches[i % niches.length]

  return {
    id: `lead_${String(i + 1).padStart(3, '0')}`,
    name: r.name,
    handle: `@${r.handle}`,
    email: `${r.handle.replace('_', '.')}@gmail.com`,
    phone: `+55 ${10 + (i % 89)} 9${String(10000 + (i * 1234) % 90000).padStart(5, '0')}-${String(1000 + (i * 7) % 9000).padStart(4, '0')}`,
    avatar: `https://randomuser.me/api/portraits/${r.gender}/${r.idx}.jpg`,
    score: r.score,
    tier,
    status,
    source: sources[i % sources.length],
    followers: r.followers,
    engagement: parseFloat((2.5 + (r.score / 100) * 8.5).toFixed(1)),
    niche,
    location: cities[i % cities.length],
    bio: `Creator de conteúdo de ${niche.toLowerCase()} com ${formatFollowers(r.followers)} seguidores. Especialista em monetização digital e iGaming.`,
    monthlyRevenue: status === 'converted' ? Math.floor(r.score * 450 + Math.random() * 10000) : undefined,
    notes: [],
    activities: [
      {
        id: `act_${i}_1`,
        type: 'created',
        description: 'Lead criado via quiz de qualificação',
        createdAt,
      },
    ],
    createdAt,
    updatedAt: createdAt,
  }
})

export const STATUS_LABELS: Record<string, string> = {
  new: 'Novo',
  contacted: 'Contactado',
  qualified: 'Qualificado',
  negotiating: 'Negociando',
  converted: 'Convertido',
  lost: 'Perdido',
}

export const STATUS_COLORS: Record<string, string> = {
  new: '#00ffc8',
  contacted: '#3b82f6',
  qualified: '#f59e0b',
  negotiating: '#a855f7',
  converted: '#00e676',
  lost: '#ff3d71',
}

export const TIER_LABELS: Record<string, string> = {
  high: 'Alto Potencial',
  mid: 'Potencial Médio',
  low: 'Baixo Potencial',
}

export const SOURCE_LABELS: Record<string, string> = {
  quiz: 'Quiz',
  instagram: 'Instagram',
  whatsapp: 'WhatsApp',
  referral: 'Indicação',
  ads: 'Anúncios',
}
