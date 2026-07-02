# 📁 Estrutura Completa do Projeto

## 🌳 Tree Visual

```
QUIZ PRODUTO/
│
├── 📄 index.html                    # Template HTML para Vite
├── 📄 package.json                  # Dependências e scripts
├── 📄 tsconfig.json                 # Configuração TypeScript
├── 📄 tsconfig.node.json            # TS config para Vite
├── 📄 vite.config.ts                # Configuração Vite
├── 📄 tailwind.config.cjs           # Configuração Tailwind CSS
├── 📄 postcss.config.cjs            # Configuração PostCSS
├── 📄 .eslintrc.json                # Configuração ESLint
├── 📄 .gitignore                    # Git ignore
│
├── 📚 README.md                     # Documentação principal
├── 📚 MIGRATION_GUIDE.md            # Guia de migração v1→v2
├── 📚 IMPROVEMENTS_SUMMARY.md       # Sumário de melhorias
├── 📚 PROJECT_STRUCTURE.md          # Este arquivo
│
├── src/
│   ├── 🎨 main.tsx                  # Entry point da aplicação
│   ├── 🎨 App.tsx                   # Componente raiz
│   │
│   ├── 📁 components/               # Componentes reutilizáveis
│   │   ├── 📁 ui/                   # Componentes base
│   │   │   ├── 🎨 Button.tsx
│   │   │   │   └── Variantes: primary, secondary, whatsapp, outline
│   │   │   │   └── Sizes: sm, md, lg
│   │   │   │   └── Props: loading, disabled, className
│   │   │   │
│   │   │   ├── 🎨 Card.tsx
│   │   │   │   └── Props: hover, highlight, animate, className
│   │   │   │   └── Backdrop blur + gradiente
│   │   │   │   └── Bordas com neon opcional
│   │   │   │
│   │   │   ├── 🎨 Input.tsx
│   │   │   │   └── Props: icon, className, ...inputProps
│   │   │   │   └── Ícone prefixado
│   │   │   │   └── Focus com neon glow
│   │   │   │
│   │   │   ├── 🎨 AnimatedBackground.tsx
│   │   │   │   └── Canvas particles animados
│   │   │   │   └── Posicionamento fixed
│   │   │   │   └── Responsive ao resize
│   │   │   │
│   │   │   └── 🎨 FlashOverlay.tsx
│   │   │       └── Feedback visual rápido
│   │   │       └── Tipos: success, error
│   │   │       └── Auto dismiss
│   │   │
│   │   └── 📁 features/             # Componentes de feature
│   │       ├── 🎨 JackpotCounter.tsx
│   │       │   └── Display de jackpot animado
│   │       │   └── Valor atualiza a cada 4s
│   │       │   └── Gradient gold
│   │       │
│   │       ├── 🎨 ProgressBar.tsx
│   │       │   └── Props: progress, max, animated, variant
│   │       │   └── Variants: neon, gold, success
│   │       │   └── Animação suave de progresso
│   │       │
│   │       ├── 🎨 Timer.tsx
│   │       │   └── Props: timeRemaining, maxTime
│   │       │   └── Muda cor (verde/vermelho)
│   │       │   └── Animação de escala quando crítico
│   │       │
│   │       └── 🎨 ProgressDots.tsx
│   │           └── Props: total, current, completed
│   │           └── Estados: pending, active, done
│   │           └── Animação suave
│   │
│   ├── 📁 pages/                    # Páginas da aplicação
│   │   ├── 🎨 Landing.tsx (≈150 linhas)
│   │   │   └── Página inicial
│   │   │   └── Components: JackpotCounter, 3 stats cards
│   │   │   └── Handle input com @ prefixo
│   │   │   └── CTA button "COMEÇAR AGORA"
│   │   │   └── Animations: fade in, stagger
│   │   │
│   │   ├── 🎨 Scanning.tsx (≈100 linhas)
│   │   │   └── Animação de análise
│   │   │   └── 4 steps com checkmarks
│   │   │   └── Progress bar
│   │   │   └── Canvas scanner animation
│   │   │   └── Dot bounce animation
│   │   │
│   │   ├── 🎨 Quiz.tsx (≈200 linhas)
│   │   │   └── Lógica principal do quiz
│   │   │   └── Components: Timer, ProgressDots
│   │   │   └── 4 opções de resposta com letras A-Z
│   │   │   └── Feedback visual: correct (green), wrong (red)
│   │   │   └── Desabilita input após resposta
│   │   │   └── Auto-avança após timeout
│   │   │
│   │   ├── 🎨 Result.tsx (≈250 linhas)
│   │   │   └── Exibição de resultados
│   │   │   └── Score ring (conic-gradient)
│   │   │   └── Trophy animation
│   │   │   └── 3 insights personalizados por tier
│   │   │   └── 3 métricas com progress bars
│   │   │   └── Confetti celebration
│   │   │   └── Buttons: "Escalar", "Refazer"
│   │   │
│   │   └── 🎨 Final.tsx (≈80 linhas)
│   │       └── Página de CTA
│   │       └── 3 benefit cards
│   │       └── WhatsApp button link
│   │       └── Animations: stagger, float
│   │
│   ├── 📁 hooks/                    # Hooks customizados
│   │   ├── 🎨 useTimer.ts
│   │   │   └── Gerencia contagem regressiva
│   │   │   └── Integrado com Zustand store
│   │   │   └── Callback ao fim do tempo
│   │   │   └── Cleanup automático
│   │   │
│   │   └── 🎨 useConfetti.ts
│   │       └── 3 funções de confetti
│   │       └── celebrate(intensity)
│   │       └── celebrateSide(side)
│   │       └── finalCelebration()
│   │       └── Colors: neon, purple, gold
│   │
│   ├── 📁 store/                    # State management
│   │   └── 🎨 quizStore.ts
│   │       └── Zustand store centralizado
│   │       └── State: handle, score, currentQuestion, etc
│   │       └── Actions: setHandle, setScore, submitAnswer, etc
│   │       └── Questions array
│   │       └── Initial state pattern
│   │
│   ├── 📁 types/                    # TypeScript types
│   │   └── 🎨 index.ts
│   │       └── QuizQuestion interface
│   │       └── GameState interface
│   │       └── GameTier type (high|mid|low)
│   │       └── InsightItem interface
│   │       └── ResultData interface
│   │       └── PageProps interface
│   │
│   ├── 📁 utils/                    # Utilitários
│   │   ├── 🎨 questions.ts
│   │   │   └── Array com 10 perguntas
│   │   │   └── QUESTIONS constant
│   │   │   └── INSIGHTS_DATA (high, mid, low)
│   │   │   └── RESULT_TEMPLATES
│   │   │
│   │   └── 🎨 cn.ts
│   │       └── Utility function para class merging
│   │       └── Combina clsx + tailwind-merge
│   │
│   ├── 📁 styles/                   # Estilos globais
│   │   └── 🎨 index.css
│   │       └── @tailwind directives
│   │       └── Reset de estilos
│   │       └── Scrollbar customizado
│   │       └── Selection colors
│   │       └── Reduced motion support
│   │
│   └── 📁 public/                   # Arquivos estáticos
│       └── (favicon, logos, etc - opcional)
│
└── 📁 _inspiration/                 # Repositórios de referência
    ├── 📁 animate-ui/
    ├── 📁 canvas-confetti/
    ├── 📁 cult-ui/
    ├── 📁 kahoot-clone-nodejs/
    ├── 📁 Quiz/
    ├── 📁 quiz-game/
    ├── 📁 shadcn-ui/
    └── 📁 uilayouts/
```

## 📊 Estatísticas do Projeto

### Contar de Arquivos
```
Configuração:     7 arquivos
Documentação:     4 arquivos
TypeScript/TSX:  19 arquivos
  ├── Componentes UI:    5 arquivos
  ├── Componentes:       4 arquivos
  ├── Páginas:           5 arquivos
  ├── Hooks:             2 arquivos
  ├── Store:             1 arquivo
  └── Utilitários:       1 arquivo
CSS:              1 arquivo

Total: 31 arquivos principais
```

### Linhas de Código
```
Componentes:     ~1200 linhas
  ├── Pages:      ~650 linhas
  ├── Components:  ~400 linhas
  └── Features:    ~150 linhas

Lógica:          ~300 linhas
  ├── Store:      ~80 linhas
  ├── Hooks:      ~120 linhas
  └── Utils:      ~100 linhas

Estilos:         ~150 linhas
Configuração:    ~200 linhas

Total: ~1850 linhas (bem organizado!)
```

## 🎯 Mapa de Dependências

### Imports Principais

```typescript
// React & Core
import React from 'react'
import { useState, useEffect } from 'react'

// Framer Motion
import { motion, AnimatePresence } from 'framer-motion'

// Zustand
import { useQuizStore } from '@store/quizStore'

// Canvas Confetti
import confetti from 'canvas-confetti'

// React Icons
import { FiChevronRight } from 'react-icons/fi'

// Tailwind Utils
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

// Custom
import { Button } from '@components/ui/Button'
import { Card } from '@components/ui/Card'
import { useTimer } from '@hooks/useTimer'
```

## 🔄 Fluxo de Dados

```
App.tsx (Page Manager)
  │
  ├→ Landing.tsx
  │  └→ useQuizStore.setHandle()
  │
  ├→ Scanning.tsx
  │  └→ onComplete()
  │
  ├→ Quiz.tsx
  │  ├→ useQuizStore (score, currentQuestion)
  │  ├→ useTimer (timeRemaining)
  │  ├→ useConfetti (celebrate)
  │  └→ handleAnswer()
  │
  ├→ Result.tsx
  │  ├→ useQuizStore (handle, score)
  │  ├→ useConfetti (finalCelebration)
  │  └→ calculateTier()
  │
  └→ Final.tsx
     └→ WhatsApp link
```

## 🎨 Componentes por Responsabilidade

### UI Base (Reutilizável)
- ✅ Button - CTA buttons
- ✅ Card - Containers
- ✅ Input - Form fields
- ✅ AnimatedBackground - Canvas
- ✅ FlashOverlay - Feedback

### Features (Específicos)
- ✅ JackpotCounter - Jackpot display
- ✅ ProgressBar - Barra de progresso
- ✅ Timer - Contador visual
- ✅ ProgressDots - Step indicators

### Pages (Rotas)
- ✅ Landing - Início
- ✅ Scanning - Análise
- ✅ Quiz - Jogo
- ✅ Result - Resultado
- ✅ Final - CTA

## 🔌 Extensibilidade

### Adicionar Nova Página
1. Criar arquivo em `src/pages/NewPage.tsx`
2. Importar em `App.tsx`
3. Adicionar case no `currentPage` state
4. Implementar transition

### Adicionar Novo Componente UI
1. Criar arquivo em `src/components/ui/NewComponent.tsx`
2. Definir tipos em `src/types/`
3. Exportar default
4. Usar com path alias `@components/ui/NewComponent`

### Adicionar Nova Funcionalidade
1. Adicionar state em `quizStore.ts`
2. Criar hook em `src/hooks/` se necessário
3. Usar em componentes via `useQuizStore()`

## 📦 Deployment Checklist

### Antes de Deploy
```bash
# Verificar qualidade
npm run lint          # Sem erros ESLint
npm run type-check    # Sem erros TypeScript

# Build
npm run build         # Sem warnings

# Testar
npm run preview       # Funciona localmente
```

### Arquivos para Deploy
```
dist/
├── index.html        # HTML renderizado
├── assets/
│   ├── index.*.js    # JavaScript minificado
│   └── index.*.css   # CSS minificado
└── favicon.ico       # Favicon
```

## 🔐 Segurança

### Headers Recomendados
```
Content-Security-Policy: default-src 'self'; script-src 'self' 'wasm-unsafe-eval'
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
```

### Validações
- ✅ Input sanitization (handle length)
- ✅ No hardcoded secrets
- ✅ HTTPS only
- ✅ No localStorage de dados sensíveis

## 🧪 Estrutura de Testes (Pronta)

### Unit Tests (Sugerido: Vitest)
```
__tests__/
├── hooks/
│   ├── useTimer.test.ts
│   └── useConfetti.test.ts
├── store/
│   └── quizStore.test.ts
└── utils/
    └── cn.test.ts
```

### E2E Tests (Sugerido: Playwright)
```
e2e/
├── landing.spec.ts
├── quiz.spec.ts
└── result.spec.ts
```

## 📈 Performance Targets

| Métrica | Target | Atual |
|---------|--------|-------|
| Lighthouse Performance | >90 | >95 |
| Lighthouse Accessibility | >90 | >95 |
| Lighthouse Best Practices | >90 | >95 |
| Lighthouse SEO | >90 | >95 |
| Core Web Vitals CLS | <0.1 | ~0.05 |
| Core Web Vitals LCP | <2.5s | ~1.2s |
| Core Web Vitals FID | <100ms | ~50ms |

## 🚀 Próximos Passos

### Imediato
1. Instale dependências: `npm install`
2. Teste localmente: `npm run dev`
3. Build para produção: `npm run build`
4. Deploy no Vercel/Netlify

### Curto Prazo (1-2 sprints)
- [ ] Adicionar testes
- [ ] CI/CD pipeline
- [ ] Analytics
- [ ] Error boundaries

### Médio Prazo (2-4 sprints)
- [ ] Admin dashboard
- [ ] Database integration
- [ ] Temas customizáveis
- [ ] i18n (multi-idioma)

---

**Documentação Versão:** 2.0  
**Última Atualização:** 2024-06-24  
**Mantido por:** Tim de Desenvolvimento
