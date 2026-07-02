# ⚡ Quick Start - 5 Minutos para Começar

## 1️⃣ Instalação (1 min)

```bash
cd "QUIZ PRODUTO"
npm install
```

## 2️⃣ Rodar Localmente (Instant)

```bash
npm run dev
```

Seu navegador abrirá automaticamente em `http://localhost:3000` 🎉

## 3️⃣ Fazer Mudanças

### Alterar Perguntas
Edite `src/utils/questions.ts`:
```typescript
const QUESTIONS = [
  {
    q: "Sua pergunta aqui?",
    o: ["Opção A", "Opção B", "Opção C", "Opção D"],
    c: 1,  // Índice da resposta correta (0-3)
  },
  // ... mais perguntas
]
```

### Mudar Cores
Edite `tailwind.config.cjs`:
```javascript
colors: {
  'neon': '#00ffc8',      // Cor principal
  'gold': '#f59e0b',      // Destaque
  'hot': '#ff3d71',       // Erro
  // ... etc
}
```

### Adicionar Componente
```bash
# 1. Criar arquivo
touch src/components/ui/NewComponent.tsx

# 2. Editar
# Copiar de um componente similar e adaptar

# 3. Usar
import { NewComponent } from '@components/ui/NewComponent'
```

## 4️⃣ Build para Produção (2 min)

```bash
npm run build
```

Resultado em `dist/` - pronto para deploy! 🚀

## 5️⃣ Deploy (Escolha um)

### Opção A: Vercel (Recomendado)
```bash
npm install -g vercel
vercel
```

### Opção B: Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Opção C: GitHub Pages
```bash
# Configurar no vite.config.ts: base: '/repo-name/'
npm run build
# Push para main
```

---

## 🎮 Estrutura Básica Compreendida

```
Landing → Scanning → Quiz → Result → Final
  ↓
setHandle()  → score++ → showResult() → WhatsApp
```

## 💡 Comandos Úteis

```bash
npm run dev          # Modo desenvolvimento
npm run build        # Build para produção
npm run preview      # Ver build localmente
npm run lint         # Verificar código
npm run type-check   # Verificar tipos
```

## 🆘 Problemas Comuns

### Erro: "Cannot find module"
→ Verifique se o caminho está correto no import (use `@components/`, `@pages/`, etc)

### Animações muito rápidas/lentas
→ Edite `duration` em `tailwind.config.cjs` ou `tailwindcss`

### Cores não aparecem
→ Aguarde o Tailwind compilar ou rode `npm run dev` novamente

### TypeScript errors
→ Execute `npm run type-check` para ver detalhes

## 📝 Estrutura de Ficheiros Importante

```
src/
├── main.tsx          ← Entry point
├── App.tsx           ← Page manager
├── pages/            ← Páginas (Landing, Quiz, etc)
├── components/       ← Componentes reutilizáveis
├── store/            ← Estado global (Zustand)
├── utils/questions.ts ← Dados do quiz
└── styles/index.css  ← CSS global
```

## 🎨 Customizações Comuns

### Mudar Logo
Edite em `src/pages/Landing.tsx`:
```tsx
<h1>Your Logo Here</h1>
```

### Mudar WhatsApp Number
Edite em `src/pages/Final.tsx`:
```tsx
<a href="https://wa.me/YOUR_NUMBER">
```

### Mudar Textos
Procure e edite as strings nos componentes.

### Mudar Timer (15s)
Edite `src/utils/questions.ts` e aumente/diminua.

## 🚀 Próximas Etapas

1. ✅ Instale e rode
2. ✅ Customize as perguntas
3. ✅ Customize as cores
4. ✅ Teste no mobile
5. ✅ Deploy!

## 📞 Precisa de Ajuda?

1. Consulte `README.md` - Documentação completa
2. Veja `MIGRATION_GUIDE.md` - Para entender a arquitetura
3. Leia `PROJECT_STRUCTURE.md` - Estrutura detalhada
4. Verifique exemplos em `src/pages/` - Padrões usados

---

**Pronto?** Rode `npm run dev` e comece! 🎉
