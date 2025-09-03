# eStaff Design System Documentation

> **Complete Developer Guide for the eStaff Design System**
> 
> A production-ready, token-based design system built for scalability, consistency, and developer experience.

## 🎯 Quick Start

```bash
# Install dependencies
npm install

# Start Storybook for component development
npm run storybook

# Start dev server to see components in action
npm run dev
```

## 🏗️ Architecture Overview

The eStaff Design System follows a **token-first** approach with strict TypeScript typing and comprehensive tooling:

```
lib/design-system/
├── tokens/           # Design tokens (source of truth)
├── themes/           # Brand-specific theme configurations
├── hooks/            # React hooks for design system integration
├── utils/            # Utility functions and component factories
└── components/       # (Legacy - being migrated to /components/ui/)

components/ui/        # Modern UI components with token integration
├── button.tsx        # Example: Fully token-integrated button
├── card.tsx         # Token-based card component
└── ...

.vscode/
└── estaff-design-system.code-snippets  # VSCode snippets for productivity
```

## 🎨 Design Tokens

### Core Concept

Design tokens are the **single source of truth** for all design decisions. Every component uses tokens instead of hardcoded values.

```tsx
// ❌ Don't do this
<button style={{ padding: '12px 16px', backgroundColor: '#ec4464' }}>

// ✅ Do this  
<button style={{ 
  padding: `${tokens.spacing[3]} ${tokens.spacing[4]}`,
  backgroundColor: tokens.colors.brand.freela[500]
}}>
```

### Token Categories

#### 🌈 Colors

```tsx
import { tokens } from '@/lib/design-system/tokens'

// Brand colors (theme-aware)
tokens.colors.brand.freela[500]      // Pink/coral for freelancers
tokens.colors.brand.empresa[700]     // Navy blue for companies  
tokens.colors.brand.institucional[400] // Beige for institutional

// Semantic colors
tokens.colors.semantic.success[500]  // Success state
tokens.colors.semantic.error[500]    // Error state
tokens.colors.semantic.warning[500]  // Warning state

// Neutral colors
tokens.colors.gray[100]              // Light gray
tokens.colors.gray[900]              // Dark gray
```

#### 📏 Spacing

Based on an 8px grid system for pixel-perfect layouts:

```tsx
tokens.spacing[1]     // 4px
tokens.spacing[2]     // 8px  
tokens.spacing[4]     // 16px
tokens.spacing[6]     // 24px
tokens.spacing[8]     // 32px
// ... up to tokens.spacing[40] (160px)
```

#### 📝 Typography

```tsx
// Text sizes with complete typography scales
tokens.typography.xs       // 12px, optimized line-height & letter-spacing
tokens.typography.sm       // 14px
tokens.typography.base     // 16px (body text)
tokens.typography.lg       // 18px
tokens.typography.xl       // 20px
// ... up to tokens.typography['9xl'] // 96px

// Font families
tokens.fontFamilies.primary    // DM Sans (default)
tokens.fontFamilies.mono       // Monospace for code

// Font weights
tokens.fontWeights.normal      // 400
tokens.fontWeights.medium      // 500
tokens.fontWeights.semibold    // 600
tokens.fontWeights.bold        // 700
```

#### 🌊 Animations

```tsx
// Durations
tokens.durations.faster     // 100ms
tokens.durations.fast       // 150ms
tokens.durations.standard   // 250ms
tokens.durations.slow       // 400ms

// Easing functions
tokens.easings.easeOut      // Smooth deceleration
tokens.easings.easeIn       // Smooth acceleration
tokens.easings.easeInOut    // Smooth both ways

// Spring configurations (for Framer Motion)
tokens.springs.gentle       // Subtle bounce
tokens.springs.snappy       // Quick, responsive
tokens.springs.bouncy       // Playful bounce

// Pre-configured animations
tokens.animations.fadeIn
tokens.animations.slideUp
tokens.animations.scaleIn
```

#### 🎭 Shadows & Elevation

```tsx
// Material Design inspired shadows
tokens.shadows.dp1      // Subtle
tokens.shadows.dp2      // Cards
tokens.shadows.dp4      // Buttons hover
tokens.shadows.dp6      // Modals
tokens.shadows.dp12     // Navigation
tokens.shadows.dp24     // App bars

// Glow effects for premium interactions
tokens.glows.freela     // Pink glow
tokens.glows.empresa    // Blue glow
```

## 🪝 Design System Hooks

Powerful React hooks for seamless integration:

### useTheme()

```tsx
import { useTheme } from '@/lib/design-system/hooks'

function MyComponent() {
  const { theme, switchTheme, mounted } = useTheme()
  
  // theme: 'freela' | 'empresa' | 'institucional'
  // switchTheme: Function to change theme
  // mounted: Boolean for hydration safety
}
```

### useColors()

```tsx
import { useColors } from '@/lib/design-system/hooks'

function MyComponent() {
  const { 
    primary,           // Current theme primary color
    getThemeColor,     // Get specific shade: getThemeColor(600)
    rgba,              // Add transparency: rgba('#ec4464', 0.5)
    getContrastColor   // Automatic text color for backgrounds
  } = useColors()
}
```

### useSpacing()

```tsx
import { useSpacing } from '@/lib/design-system/hooks'

function MyComponent() {
  const { 
    getSpacing,        // getSpacing(4) → '16px'
    getPixelValue,     // getPixelValue(4) → 16
    rem,               // Convert to rem: rem(16) → '1rem'
    component,         // Common spacing: 24px
    section           // Section spacing: 64px
  } = useSpacing()
}
```

### useBreakpoint()

```tsx
import { useBreakpoint } from '@/lib/design-system/hooks'

function ResponsiveComponent() {
  const { breakpoint, isMobile, isDesktop } = useBreakpoint()
  
  return (
    <div>
      {isMobile && <MobileLayout />}
      {isDesktop && <DesktopLayout />}
    </div>
  )
}
```

### useAnimation()

```tsx
import { useAnimation } from '@/lib/design-system/hooks'

function AnimatedComponent() {
  const { 
    createTransition,  // createTransition('transform', 'fast')
    spring,           // spring('gentle') for Framer Motion
    fadeIn            // Pre-configured animation
  } = useAnimation()
}
```

## 🧩 Component Usage

### Button Component

The button component showcases perfect token integration:

```tsx
import { Button } from '@/components/ui'

// Basic usage
<Button variant="primary" size="md">
  Click me
</Button>

// All variants
<Button variant="primary">Primary Action</Button>
<Button variant="secondary">Secondary Action</Button>  
<Button variant="outline">Outline Style</Button>
<Button variant="ghost">Subtle Action</Button>
<Button variant="gradient">Premium Effect</Button>
<Button variant="glass">Glassmorphism</Button>
<Button variant="glow">Glowing Effect</Button>

// Sizes (pixel-perfect 8px grid)
<Button size="xs">Extra Small</Button>    // 24px height
<Button size="sm">Small</Button>          // 32px height  
<Button size="md">Medium</Button>         // 40px height
<Button size="lg">Large</Button>          // 48px height
<Button size="xl">Extra Large</Button>    // 56px height

// Loading states
<Button loading>Processing...</Button>

// With icons
<Button icon={<PlusIcon />} iconPosition="left">
  Add Item
</Button>
```

### Component Factories

For rapid component creation:

```tsx
import { ComponentFactories } from '@/lib/design-system/utils/component-factory'

// Create theme-specific components
const FreelaButton = ComponentFactories.Button('freela')
const EmpresaButton = ComponentFactories.Button('empresa')

// Usage
<FreelaButton variant="primary">Freelancer CTA</FreelaButton>
<EmpresaButton variant="primary">Company CTA</EmpresaButton>
```

## 🎨 Theme System

### Theme Provider Setup

```tsx
// app/layout.tsx
import { ThemeProvider } from '@/lib/design-system/hooks/theme'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ThemeProvider defaultTheme="freela">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

### Theme-Aware Components

```tsx
import { useThemeColors } from '@/lib/design-system/hooks/theme'

function ThemedComponent() {
  const { primary, primaryHover } = useThemeColors()
  
  return (
    <div 
      style={{ 
        backgroundColor: primary,
        '--hover-color': primaryHover 
      }}
      className="hover:bg-[var(--hover-color)]"
    >
      Automatically themed content
    </div>
  )
}
```

### Theme Switcher

```tsx
import { ThemeSwitcher } from '@/lib/design-system/hooks/theme'

<ThemeSwitcher showLabels={true} className="my-4" />
```

## 💻 VSCode Integration

Install the included snippets for maximum productivity:

### Token Snippets

- `ds-spacing` → `tokens.spacing[4]`
- `ds-color` → `tokens.colors.brand.freela[500]`
- `ds-typography` → `tokens.typography.base.size`
- `ds-animation` → `tokens.durations.standard`

### Hook Snippets

- `usespace` → Complete `useSpacing()` hook setup
- `usecolors` → Complete `useColors()` hook setup  
- `usebreakpoint` → Complete `useBreakpoint()` hook setup

### Component Snippets

- `ds-button` → Full Button component with all props
- `ds-card` → Complete Card component
- `ds-input` → Full Input component with validation
- `ds-component` → Complete component template with tokens

### Advanced Snippets

- `ds-motion` → Framer Motion with design tokens
- `themeprovider` → Theme provider setup
- `responsive` → Responsive style object with tokens

## 🚀 Performance Optimizations

### Tree Shaking

The design system is fully tree-shakeable:

```tsx
// ✅ This only bundles what you use
import { Button, Card } from '@/components/ui'
import { useColors, useSpacing } from '@/lib/design-system/hooks'

// ❌ This bundles everything  
import * as UI from '@/components/ui'
```

### Memoized Token Access

For high-frequency token access:

```tsx
import { getMemoizedSpacing } from '@/lib/design-system/utils'

// Cached token access for performance
const spacing = getMemoizedSpacing(4) // Cached after first call
```

### Bundle Analysis

```bash
# Analyze bundle size impact
npm run build
npm run analyze  # If analyzer is configured
```

## 🧪 Testing & Validation

### Token Validation Hook

Development-only validation:

```tsx
import { useTokenValidation } from '@/lib/design-system/hooks'

function App() {
  const { isValid, errors } = useTokenValidation()
  
  // Automatically logs token issues in development
  return <YourApp />
}
```

### Storybook Testing

```bash
npm run storybook

# Test all component variants
# Verify token integration  
# Check responsive behavior
# Validate accessibility
```

## 🎯 Migration Guide

### From Legacy Components

```tsx
// Before: Hardcoded values
<button className="bg-pink-500 px-4 py-2 rounded-lg">
  
// After: Token-integrated  
<Button variant="primary" size="md">
```

### Adding Tokens to Existing Components

```tsx
// 1. Import tokens
import { tokens } from '@/lib/design-system/tokens'

// 2. Replace hardcoded values
const styles = {
  // Before
  padding: '16px',
  backgroundColor: '#ec4464',
  borderRadius: '8px',
  
  // After  
  padding: tokens.spacing[4],
  backgroundColor: tokens.colors.brand.freela[500],
  borderRadius: tokens.spacing[2],
}

// 3. Use design system hooks
const { primary } = useColors()
const { getSpacing } = useSpacing()
```

## 📏 Best Practices

### ✅ Do's

- **Always use tokens** instead of hardcoded values
- **Use design system hooks** for reactive token access
- **Follow the 8px grid** for spacing consistency  
- **Test components in Storybook** before integration
- **Use semantic color names** (`error`, `success`) over specific colors
- **Leverage VSCode snippets** for faster development
- **Use component factories** for theme-specific variants

### ❌ Don'ts  

- **Never hardcode spacing, colors, or typography**
- **Don't bypass the theme system** for brand colors
- **Don't create spacing that doesn't follow the grid**
- **Don't import the entire token object** unnecessarily
- **Don't mix design system components with legacy styles**

## 🔧 Advanced Usage

### Custom Component with Tokens

```tsx
import { forwardRef } from 'react'
import { tokens } from '@/lib/design-system/tokens'
import { useColors } from '@/lib/design-system/hooks'

interface CustomComponentProps {
  variant?: 'default' | 'accent'
  size?: 'sm' | 'md' | 'lg'
}

const CustomComponent = forwardRef<HTMLDivElement, CustomComponentProps>(
  ({ variant = 'default', size = 'md', ...props }, ref) => {
    const { primary } = useColors()
    
    const baseStyles = {
      fontFamily: tokens.fontFamilies.primary,
      borderRadius: tokens.spacing[2],
      transition: `all ${tokens.durations.standard} ${tokens.easings.easeOut}`,
    }
    
    const variantStyles = {
      default: {
        backgroundColor: tokens.colors.gray[100],
        color: tokens.colors.gray[900],
      },
      accent: {
        backgroundColor: primary,
        color: tokens.colors.brand.neutral.white,
      }
    }
    
    const sizeStyles = {
      sm: { padding: tokens.spacing[2] },
      md: { padding: tokens.spacing[4] },  
      lg: { padding: tokens.spacing[6] },
    }
    
    return (
      <div
        ref={ref}
        style={{
          ...baseStyles,
          ...variantStyles[variant],
          ...sizeStyles[size],
        }}
        {...props}
      />
    )
  }
)

CustomComponent.displayName = 'CustomComponent'
```

### Responsive Design with Tokens

```tsx
import { useBreakpoint } from '@/lib/design-system/hooks'
import { tokens } from '@/lib/design-system/tokens'

function ResponsiveComponent() {
  const { isMobile, isDesktop } = useBreakpoint()
  
  const styles = {
    fontSize: isMobile 
      ? tokens.typography.base.size 
      : tokens.typography.lg.size,
    padding: isMobile 
      ? tokens.spacing[4] 
      : tokens.spacing[8],
  }
  
  return <div style={styles}>Responsive content</div>
}
```

### Animation Integration

```tsx
import { motion } from 'framer-motion'
import { tokens } from '@/lib/design-system/tokens'

const AnimatedCard = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      duration: Number(tokens.durations.standard.replace('ms', '')) / 1000,
      ease: tokens.easings.easeOut,
    }}
    style={{
      backgroundColor: tokens.colors.brand.neutral.white,
      padding: tokens.spacing[6],
      borderRadius: tokens.spacing[3],
      boxShadow: tokens.shadows.dp2,
    }}
  >
    Animated with design tokens
  </motion.div>
)
```

## 🐛 Troubleshooting

### Common Issues

**Q: Tokens not updating when theme changes**
```tsx
// ❌ Static token access
const color = tokens.colors.brand.freela[500]

// ✅ Reactive hook access  
const { primary } = useColors()
```

**Q: Inconsistent spacing across components**
```tsx
// ❌ Manual calculations
padding: '12px 18px'

// ✅ Use the spacing scale
padding: `${tokens.spacing[3]} ${tokens.spacing[4.5]}` // 12px 18px
```

**Q: TypeScript errors with token keys**
```tsx
// ❌ String literal
const spacing = tokens.spacing['4']

// ✅ Proper key access
const spacing = tokens.spacing[4]
```

**Q: Bundle size issues**
```tsx
// ❌ Importing everything
import { tokens } from '@/lib/design-system/tokens'
import * as hooks from '@/lib/design-system/hooks'

// ✅ Import only what you need
import { useColors, useSpacing } from '@/lib/design-system/hooks'
```

## 🔗 Integration Examples

### Next.js App Router

```tsx
// app/layout.tsx
import { ThemeProvider } from '@/lib/design-system/hooks/theme'
import '@/lib/design-system/globals.css'

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <style dangerouslySetInnerHTML={{
          __html: generateCSSVars() // Auto-inject CSS custom properties
        }} />
      </head>
      <body>
        <ThemeProvider>
          {children}  
        </ThemeProvider>
      </body>
    </html>
  )
}
```

### Tailwind Configuration

```js
// tailwind.config.js
import { generateTailwindTheme } from '@/lib/design-system/tokens'

export default {
  theme: {
    extend: generateTailwindTheme()
  }
}
```

## 🏆 Production Checklist

- [ ] All components use design tokens
- [ ] No hardcoded values in codebase
- [ ] Theme provider is set up
- [ ] Storybook stories are complete
- [ ] VSCode snippets are installed
- [ ] Bundle size is optimized
- [ ] Accessibility is validated
- [ ] Token validation passes
- [ ] Migration from legacy components is complete
- [ ] Performance benchmarks are met

---

## 📚 Additional Resources

- **Storybook**: `npm run storybook` - Interactive component documentation
- **Token Reference**: `/lib/design-system/tokens/` - Complete token definitions
- **Hook Reference**: `/lib/design-system/hooks/` - All available hooks
- **Component Examples**: `/components/ui/` - Real-world implementations

---

**🎯 The eStaff Design System is production-ready and optimized for developer experience. Every decision has been made with scalability, consistency, and performance in mind.**