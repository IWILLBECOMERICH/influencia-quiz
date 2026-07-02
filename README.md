# 🎯 influencIA Quiz - Frontend Modernizado

Um quiz interativo e gamificado para descobrir o nível de influência em redes sociais, com animações fluidas, design elegante e experiência de usuário premium.

## ✨ Características

- ⚡ **React 18** + **TypeScript** - Código robusto e type-safe
- 🎨 **Tailwind CSS** - Design moderno e responsivo
- ✨ **Framer Motion** - Animações fluidas e delicadas
- 🎯 **Zustand** - State management leve e eficiente
- 🎉 **Canvas Confetti** - Efeitos de celebração
- 📱 **Responsivo** - Funciona perfeitamente em mobile, tablet e desktop
- ♿ **Acessível** - ARIA labels e navegação por teclado
- 🚀 **Performático** - Lazy loading e code splitting

## 🏗️ Estrutura do Projeto

```
src/
├── components/
│   ├── ui/              # Componentes base (Button, Card, Input, etc)
│   └── features/        # Componentes de features (Timer, ProgressBar, etc)
├── pages/               # Páginas da aplicação (Landing, Quiz, Result, etc)
├── hooks/               # Hooks customizados (useTimer, useConfetti)
├── store/               # Zustand store para state management
├── types/               # Definições de tipos TypeScript
├── utils/               # Utilitários (questions, cn function, etc)
├── styles/              # CSS global e estilos
├── App.tsx              # Componente principal
└── main.tsx             # Ponto de entrada
```

## 🚀 Como Rodar

### Pré-requisitos
- Node.js >= 16.0.0
- npm ou yarn

### Instalação

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

O projeto será aberto automaticamente em `http://localhost:3000`

## 📖 Páginas

### 1. **Landing** (`/landing`)
- Apresentação do quiz
- Input para Instagram handle
- Jackpot counter animado
- Stats cards

### 2. **Scanning** (`/scanning`)
- Animação de carregamento/análise
- Progress bar visual
- Steps animados

### 3. **Quiz** (`/quiz`)
- 10 perguntas sobre marketing de influência
- Timer (15 segundos por pergunta)
- Feedback visual imediato
- Animações de resposta correta/incorreta

### 4. **Result** (`/result`)
- Score visual (anel de progresso)
- Tier (Elite, Ascensão, Expansão)
- Insights personalizados
- Métricas com progress bars
- Confetti celebration

### 5. **Final** (`/final`)
- CTA para escalar resultados
- Benefícios de forma atrativa
- Link WhatsApp direto

## 🎮 Estados do Quiz

- **High (80-100%)**: Influenciador Elite 🏆
- **Mid (50-79%)**: Criador em Ascensão 📈
- **Low (0-49%)**: Potencial em Expansão 🌱

## 🛠️ Tecnologias

| Tecnologia | Versão | Uso |
|-----------|--------|-----|
| React | ^18.3.1 | Framework UI |
| TypeScript | ^5.3.3 | Tipagem estática |
| Vite | ^5.0.10 | Build tool |
| Tailwind CSS | ^3.4.1 | Styling |
| Framer Motion | ^10.16.18 | Animações |
| Zustand | ^4.4.1 | State management |
| Canvas Confetti | ^1.9.0 | Efeitos |
| React Icons | ^4.12.0 | Ícones |

## 🎨 Design System

### Cores

```
Neon: #00ffc8
Neon Dark: #00a878
Purple: #7c3aed
Gold: #f59e0b
Hot Pink: #ff3d71
Success: #00e676
Background: #050510
```

### Tipografia

- Corpo: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto
- Font size: xs (0.75rem) até lg (1.125rem)
- Font weights: normal, medium (500), bold (700), black (900)

### Componentes Reutilizáveis

- **Button** - Variantes: primary, secondary, whatsapp, outline
- **Card** - Base para conteúdo com backdrop blur
- **Input** - Com suporte a ícone prefixado
- **ProgressBar** - Com animação de progresso
- **Timer** - Display de tempo restante
- **ProgressDots** - Indicador visual de progresso

## 🔄 State Management (Zustand)

O store centralizado (`useQuizStore`) gerencia:
- Handle do usuário
- Score atual
- Pergunta atual
- Respostas selecionadas
- Estado do timer
- Perguntas do quiz

## 🎬 Animações

- **Fade & Slide**: Transições entre páginas
- **Pulse Glow**: Cards em destaque
- **Float**: Elementos flutuando
- **Shake**: Resposta errada
- **Scale**: Interações com botões
- **Confetti**: Celebração de sucesso

## 📱 Responsividade

- **Mobile (< 640px)**: Padding reduzido, texto ajustado
- **Tablet (640px - 1024px)**: Layout otimizado
- **Desktop (> 1024px)**: Layout full

## ⌨️ Acessibilidade

- ✅ Suporte a navegação por teclado
- ✅ ARIA labels nos formulários
- ✅ Alto contraste de cores
- ✅ Respeitando `prefers-reduced-motion`

## 🚀 Performance

- Code splitting automático via Vite
- Tree shaking de dependências
- Lazy loading de componentes
- Otimização de re-renders com React

## 📝 Variáveis de Ambiente

```env
# .env.local (não incluir em git)
# Não há variáveis obrigatórias por enquanto
```

## 🔧 Scripts Úteis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor local

# Build
npm run build        # Build para produção
npm run preview      # Visualiza build

# Qualidade
npm run lint         # Lint com ESLint
npm run type-check   # Verificação de tipos TypeScript
```

## 📦 Deploy

### Vercel (Recomendado)

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# Fazer deploy da pasta dist/
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 🐛 Debugging

Adicione ao seu navegador:

```js
// Console
localStorage.debug = 'quiz:*'
```

## 📄 Licença

MIT - Livre para uso comercial e pessoal

## 👤 Autor

Projeto de modernização do Quiz influencIA

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Suporte

Dúvidas? Entre em contato via [WhatsApp](https://wa.me/5527981226077)

---

**Status:** ✅ Pronto para Produção | **Versão:** 2.0.0
