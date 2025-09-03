# 🎨 Guia Completo do Design System eStaff

> Sistema de design moderno, automatizado e pronto para produção com suporte multi-marca para freelancers e empresas.

## 📖 Índice

1. [Introdução](#introdução)
2. [Instalação e Setup](#instalação-e-setup)
3. [Conceitos Fundamentais](#conceitos-fundamentais)
4. [Usando os Design Tokens](#usando-os-design-tokens)
5. [Trabalhando com Componentes](#trabalhando-com-componentes)
6. [Sistema de Temas](#sistema-de-temas)
7. [Automação com CLI](#automação-com-cli)
8. [VSCode Snippets](#vscode-snippets)
9. [React Hooks Customizados](#react-hooks-customizados)
10. [Storybook e Documentação Visual](#storybook-e-documentação-visual)
11. [Testes e Validação](#testes-e-validação)
12. [Melhores Práticas](#melhores-práticas)
13. [Troubleshooting](#troubleshooting)

---

## 🚀 Introdução

O Design System eStaff é uma solução completa para padronização visual e desenvolvimento eficiente. Ele oferece:

- **🎯 Consistência Total**: Todos os componentes usam tokens padronizados
- **⚡ Performance Otimizada**: Tree-shaking, memoização e lazy loading
- **🔧 Automação Completa**: CLI, snippets e hooks para produtividade máxima
- **🎨 Multi-marca**: Suporte para temas Freelancer, Empresa e Institucional
- **♿ Acessibilidade**: WCAG 2.1 AA por padrão
- **📚 Documentação Rica**: Storybook interativo com todos os componentes

---

## 🔧 Instalação e Setup

### Pré-requisitos

```bash
# Node.js 18+ e npm 9+
node --version  # v18.0.0 ou superior
npm --version   # v9.0.0 ou superior
```

### Comandos Disponíveis

```bash
# Desenvolvimento
npm run dev                    # Inicia servidor de desenvolvimento
npm run storybook             # Abre documentação visual

# Design System
npm run ds:generate           # Gera novo componente
npm run ds:validate          # Valida integridade do sistema
npm run ds:tokens            # Visualiza todos os tokens

# Testes
npm run test                 # Roda todos os testes
npm run test:coverage       # Relatório de cobertura
npm run test:watch         # Modo watch para desenvolvimento
```

---

## 💡 Conceitos Fundamentais

### Design Tokens

Design tokens são valores primitivos do sistema de design que garantem consistência:

```typescript
// Exemplo de uso direto dos tokens
import { tokens } from '@/lib/design-system/tokens'

// Cores
tokens.colors.brand.freela[500]      // #ec4464 - Rosa vibrante
tokens.colors.brand.empresa[700]     // #1e3a8a - Azul profissional
tokens.colors.semantic.success[500]  // #10b981 - Verde sucesso

// Espaçamento (baseado em 8px)
tokens.spacing[2]   // 8px
tokens.spacing[4]   // 16px
tokens.spacing[8]   // 32px

// Tipografia
tokens.typography.base.size        // 16px
tokens.typography.base.lineHeight  // 1.5

// Animações
tokens.durations.fast      // 150ms
tokens.springs.gentle      // { stiffness: 120, damping: 14 }
```

### Arquitetura do Sistema

```
/lib/design-system/
├── tokens/              # Valores primitivos do design
│   ├── colors.ts       # Paleta de cores e funções
│   ├── spacing.ts      # Sistema de espaçamento 8px
│   ├── typography.ts   # Escalas tipográficas
│   ├── animation.ts    # Timings e springs
│   └── index.ts        # Export agregado
│
├── themes/             # Configurações por marca
│   ├── freela.ts      # Tema para freelancers
│   ├── empresa.ts     # Tema para empresas
│   └── institucional.ts # Tema institucional
│
├── hooks/              # React hooks customizados
│   ├── useTheme.ts    # Gerenciamento de temas
│   ├── useSpacing.ts  # Helpers de espaçamento
│   └── useAnimation.ts # Animações padronizadas
│
├── utils/              # Utilitários e helpers
│   ├── cn.ts          # Class name helper
│   ├── contrast.ts    # Cálculo de contraste WCAG
│   └── responsive.ts  # Breakpoints e media queries
│
└── cli/                # Ferramentas de automação
    ├── generate.js     # Gerador de componentes
    └── templates/      # Templates Handlebars
```

---

## 🎨 Usando os Design Tokens

### Cores

```tsx
// ❌ Não faça isso
<div style={{ backgroundColor: '#ec4464' }}>

// ✅ Use tokens
import { tokens } from '@/lib/design-system/tokens'

<div style={{ backgroundColor: tokens.colors.brand.freela[500] }}>
```

### Espaçamento

```tsx
// ❌ Evite valores mágicos
<div className="p-12 mt-24">

// ✅ Use o sistema de 8px
<div className="p-[--spacing-3] mt-[--spacing-6]">

// Ou com style objects
<div style={{ 
  padding: tokens.spacing[3],      // 12px
  marginTop: tokens.spacing[6]     // 24px
}}>
```

### Tipografia

```tsx
// ❌ Não hardcode tamanhos
<h1 style={{ fontSize: '32px' }}>

// ✅ Use a escala tipográfica
<h1 style={{ 
  fontSize: tokens.typography.xl2.size,
  lineHeight: tokens.typography.xl2.lineHeight,
  letterSpacing: tokens.typography.xl2.letterSpacing
}}>
```

### Animações

```tsx
// ❌ Animações inconsistentes
<motion.div animate={{ scale: 1.1 }} transition={{ duration: 0.3 }}>

// ✅ Use springs padronizados
import { tokens } from '@/lib/design-system/tokens'

<motion.div 
  whileHover={{ scale: 1.02 }}
  transition={tokens.springs.gentle}
>
```

---

## 🧩 Trabalhando com Componentes

### Estrutura de um Componente

```tsx
// components/ui/MyComponent.tsx
'use client'

import { tokens } from '@/lib/design-system/tokens'
import { cn } from '@/lib/design-system/utils/cn'
import { motion } from 'framer-motion'

interface MyComponentProps {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export function MyComponent({ 
  variant = 'primary',
  size = 'md',
  children 
}: MyComponentProps) {
  // Use tokens para styling
  const styles = {
    backgroundColor: variant === 'primary' 
      ? tokens.colors.brand.freela[500]
      : tokens.colors.brand.empresa[700],
    padding: tokens.spacing[size === 'sm' ? 2 : size === 'md' ? 4 : 6],
    borderRadius: tokens.spacing[2],
    transition: `all ${tokens.durations.standard}`
  }

  return (
    <motion.div
      style={styles}
      whileHover={{ scale: 1.02 }}
      transition={tokens.springs.gentle}
    >
      {children}
    </motion.div>
  )
}
```

### Componentes Disponíveis

| Componente | Descrição | Variantes |
|------------|-----------|-----------|
| `Button` | Botão interativo | primary, secondary, outline, ghost, gradient |
| `Card` | Container de conteúdo | default, elevated, bordered, gradient, glass |
| `Badge` | Indicador de status | default, primary, success, warning, danger |
| `Input` | Campo de entrada | freela, empresa, institucional, default |
| `Typography` | Textos padronizados | h1-h6, body, caption, overline |

---

## 🎭 Sistema de Temas

### Aplicando Temas

```tsx
// app/layout.tsx
import { ThemeProvider } from '@/lib/design-system/hooks/useTheme'

export default function Layout({ children }) {
  return (
    <ThemeProvider defaultTheme="freela">
      {children}
    </ThemeProvider>
  )
}
```

### Usando o Hook useTheme

```tsx
import { useTheme } from '@/lib/design-system/hooks/useTheme'

function MyComponent() {
  const { theme, setTheme, colors } = useTheme()
  
  return (
    <div style={{ backgroundColor: colors.primary }}>
      <button onClick={() => setTheme('empresa')}>
        Mudar para tema Empresa
      </button>
    </div>
  )
}
```

### Temas Disponíveis

1. **Freelancer (`freela`)**: Rosa vibrante, energético e criativo
2. **Empresa (`empresa`)**: Azul profissional, confiável e sério
3. **Institucional (`institucional`)**: Bege acolhedor, acessível e confiável

---

## 🤖 Automação com CLI

### Gerando Componentes

```bash
# Comando interativo
npm run ds:generate

# Será perguntado:
? Nome do componente: UserCard
? Categoria: cards
? Incluir stories? Sim
? Incluir testes? Sim

# Arquivos criados:
✅ components/cards/UserCard.tsx
✅ components/cards/UserCard.stories.tsx
✅ components/cards/UserCard.test.tsx
```

### Estrutura Gerada

```tsx
// components/cards/UserCard.tsx
'use client'

import React from 'react'
import { tokens } from '@/lib/design-system/tokens'
import { cn } from '@/lib/design-system/utils/cn'

export interface UserCardProps {
  // Props geradas automaticamente
}

export const UserCard = React.forwardRef<
  HTMLDivElement,
  UserCardProps
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('', className)}
      style={{
        // Tokens aplicados automaticamente
      }}
      {...props}
    />
  )
})

UserCard.displayName = 'UserCard'
```

---

## ⚡ VSCode Snippets

### Snippets Disponíveis

| Snippet | Descrição | Expande para |
|---------|-----------|--------------|
| `dscomp` | Componente completo | Componente com tokens |
| `dstoken` | Import tokens | `import { tokens } from '@/lib/design-system/tokens'` |
| `dscolor` | Usar cor | `tokens.colors.brand.freela[500]` |
| `dsspace` | Usar espaçamento | `tokens.spacing[4]` |
| `dstext` | Tipografia | `tokens.typography.base` |
| `dsanim` | Animação | `tokens.springs.gentle` |
| `dshook` | Custom hook | Hook com tokens |

### Como Usar

1. Digite o prefixo do snippet (ex: `dscomp`)
2. Pressione `Tab`
3. Preencha os placeholders
4. Use `Tab` para navegar entre campos

---

## 🪝 React Hooks Customizados

### useTheme

```tsx
const { theme, setTheme, colors, isDark } = useTheme()

// Mudar tema
setTheme('empresa')

// Acessar cores do tema
<div style={{ color: colors.primary }}>
```

### useSpacing

```tsx
const { space, responsive } = useSpacing()

// Espaçamento responsivo
<div style={responsive({
  padding: { base: 2, md: 4, lg: 6 }
})}>
```

### useAnimation

```tsx
const { animate, spring } = useAnimation()

// Animação padronizada
<motion.div {...animate('fadeIn')}>
  Conteúdo animado
</motion.div>
```

### useBreakpoint

```tsx
const { isMobile, isTablet, isDesktop } = useBreakpoint()

// Renderização condicional
{isMobile && <MobileMenu />}
{isDesktop && <DesktopNav />}
```

---

## 📚 Storybook e Documentação Visual

### Acessando o Storybook

```bash
npm run storybook
# Acesse http://localhost:6006
```

### Estrutura do Storybook

```
📖 Storybook
├── Welcome                 # Página inicial
├── Design System
│   ├── Colors             # Paleta de cores
│   ├── Typography         # Escalas tipográficas
│   ├── Spacing           # Sistema de espaçamento
│   └── Animation         # Exemplos de animação
└── Components
    ├── Button            # Todas as variantes
    ├── Card              # Exemplos de cards
    ├── Badge             # Estados e tipos
    └── Input             # Campos de formulário
```

### Criando Stories

```tsx
// MyComponent.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { MyComponent } from './MyComponent'

const meta: Meta<typeof MyComponent> = {
  title: 'Components/MyComponent',
  component: MyComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary']
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Hello World'
  }
}

export const AllVariants: Story = {
  render: () => (
    <>
      <MyComponent variant="primary">Primary</MyComponent>
      <MyComponent variant="secondary">Secondary</MyComponent>
    </>
  )
}
```

---

## ✅ Testes e Validação

### Rodando Testes

```bash
# Todos os testes
npm run test

# Com cobertura
npm run test:coverage

# Modo watch
npm run test:watch

# Apenas design system
npm run test -- --testPathPattern=design-system
```

### Escrevendo Testes

```tsx
// MyComponent.test.tsx
import { render, screen } from '@testing-library/react'
import { MyComponent } from './MyComponent'
import { tokens } from '@/lib/design-system/tokens'

describe('MyComponent', () => {
  it('should use design tokens', () => {
    const { container } = render(
      <MyComponent variant="primary">Test</MyComponent>
    )
    
    const element = container.firstChild as HTMLElement
    expect(element.style.backgroundColor).toBe(
      tokens.colors.brand.freela[500]
    )
  })

  it('should be accessible', () => {
    const { container } = render(<MyComponent>Test</MyComponent>)
    expect(container).toHaveNoViolations()
  })
})
```

### Validação do Design System

```bash
# Valida integridade
npm run ds:validate

# Checagem realizada:
✓ Tokens válidos e completos
✓ Componentes usando tokens
✓ Temas configurados corretamente
✓ Acessibilidade WCAG AA
✓ Performance dentro dos limites
```

---

## 🎯 Melhores Práticas

### ✅ Faça

```tsx
// Use tokens sempre
backgroundColor: tokens.colors.brand.freela[500]

// Use hooks customizados
const { theme, colors } = useTheme()

// Use o helper cn para classes
className={cn('base-class', conditional && 'conditional-class')}

// Componha componentes menores
<Card>
  <CardHeader />
  <CardContent />
</Card>

// Teste acessibilidade
expect(element).toHaveAttribute('aria-label')
```

### ❌ Evite

```tsx
// Valores hardcoded
color: '#ec4464'

// Estilos inline complexos
style={{ padding: '12px', margin: '24px' }}

// Ignorar temas
backgroundColor: 'pink'

// Componentes muito grandes
<GiantComponentWithEverything />

// Esquecer acessibilidade
<div onClick={handleClick}> // Use button!
```

---

## 🔧 Troubleshooting

### Problema: Tokens não aparecem no IntelliSense

**Solução:**
```bash
# Reinicie o TypeScript server
Ctrl+Shift+P > TypeScript: Restart TS Server
```

### Problema: Storybook não carrega

**Solução:**
```bash
# Limpe cache e reinstale
rm -rf node_modules .next
npm install
npm run storybook
```

### Problema: Componente não usa tema

**Solução:**
```tsx
// Certifique-se que está dentro do ThemeProvider
<ThemeProvider>
  <MyComponent /> {/* Agora tem acesso ao tema */}
</ThemeProvider>
```

### Problema: Performance lenta

**Solução:**
```tsx
// Use memoização para componentes pesados
import { memo } from 'react'

export const MyComponent = memo(function MyComponent(props) {
  // ...
})
```

---

## 📞 Suporte

- **Documentação**: `/DESIGN-SYSTEM.md`
- **Storybook**: `http://localhost:6006`
- **Exemplos**: `/stories/`
- **Testes**: `/__tests__/design-system/`

---

## 🚀 Próximos Passos

1. **Explore o Storybook** para ver todos os componentes
2. **Use os snippets** para acelerar desenvolvimento
3. **Rode os testes** para garantir qualidade
4. **Customize temas** para sua marca
5. **Contribua** com novos componentes usando o CLI

---

> 💡 **Dica Pro**: Configure seu VSCode para usar os snippets e tenha o Storybook sempre aberto durante o desenvolvimento para referência visual rápida.

---

*Design System eStaff v1.0.0 - Criado com ❤️ para desenvolvedores*