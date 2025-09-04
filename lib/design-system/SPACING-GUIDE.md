# 📐 Guia de Espaçamento - estaff-web

## 🎯 Princípios

Nosso sistema de espaçamento segue as melhores práticas de gigantes da tecnologia:
- **Apple**: 120-150px desktop / 80-100px mobile
- **Stripe**: 96-128px desktop / 64-80px mobile  
- **Airbnb**: 80-120px desktop / 48-64px mobile
- **Google Material**: 80-160px desktop / 56-96px mobile

## 📊 Sistema Base 8

Todos os espaçamentos são múltiplos de 8px para criar harmonia visual:

```
8px   = 0.5rem  = xs
16px  = 1rem    = sm
24px  = 1.5rem  = md
32px  = 2rem    = lg
48px  = 3rem    = xl
64px  = 4rem    = 2xl
80px  = 5rem    = 3xl
96px  = 6rem    = 4xl
128px = 8rem    = 5xl
160px = 10rem   = 6xl
```

## 🖥️ Espaçamento Entre Seções

### Hero Section (Primeira seção da página)
```jsx
import { sectionClasses } from '@/lib/design-system/spacing-system'

<section className={sectionClasses.hero}>
  // Mobile: 40px | Tablet: 48px | Desktop: 64px
</section>
```

### Primary Section (Seções principais)
```jsx
<section className={sectionClasses.primary}>
  // Mobile: 32px | Tablet: 40px | Desktop: 48px
</section>
```

### Secondary Section (Seções secundárias)
```jsx
<section className={sectionClasses.secondary}>
  // Mobile: 24px | Tablet: 32px | Desktop: 40px
</section>
```

### Support Section (Seções de suporte/rodapé)
```jsx
<section className={sectionClasses.support}>
  // Mobile: 20px | Tablet: 24px | Desktop: 32px
</section>
```

## 💡 Como Usar

### Importação
```typescript
import { 
  sectionClasses, 
  getSectionSpacing,
  withSectionSpacing 
} from '@/lib/design-system/spacing-system'
```

### Exemplo Prático
```jsx
// Uso direto
<section className={sectionClasses.primary}>
  <div className="max-w-7xl mx-auto px-4">
    {/* Conteúdo */}
  </div>
</section>

// Com classes adicionais
<section className={withSectionSpacing('primary', 'bg-white')}>
  {/* Conteúdo */}
</section>

// Dinâmico
const spacing = getSectionSpacing('hero')
<section className={`${spacing} bg-gradient-to-b from-gray-50`}>
  {/* Conteúdo */}
</section>
```

## 📏 Hierarquia Visual

1. **Hero**: Maior espaçamento - primeira impressão
2. **Primary**: Seções de destaque - features principais
3. **Secondary**: Seções complementares - informações adicionais
4. **Support**: Menor espaçamento - footer, disclaimers

## ✅ Checklist de Implementação

- [ ] Hero sections: `py-10 md:py-12 lg:py-16`
- [ ] Primary sections: `py-8 md:py-10 lg:py-12`
- [ ] Secondary sections: `py-6 md:py-8 lg:py-10`
- [ ] Support sections: `py-5 md:py-6 lg:py-8`
- [ ] Container padding: `px-4 md:px-6 lg:px-8`
- [ ] Card padding: `p-4 md:p-6 lg:p-8`
- [ ] Element gaps: Usar múltiplos de 8px

## 🔄 Migração

Para atualizar seções existentes:

```jsx
// Antes
<section className="py-16 bg-gray-100">

// Depois
import { sectionClasses } from '@/lib/design-system/spacing-system'
<section className={`${sectionClasses.primary} bg-gray-100`}>
```

## 📱 Responsividade

O sistema ajusta automaticamente:
- **Mobile First**: Começamos com espaçamento menor
- **Progressive Enhancement**: Aumenta conforme a tela cresce
- **Proporção**: Desktop tem ~1.5x a 2x o espaçamento mobile

## 🎨 Consistência

Usar este sistema garante:
- ✨ Visual harmonioso e profissional
- 📐 Hierarquia clara de informações
- 🎯 Melhor experiência do usuário
- 🚀 Facilidade de manutenção