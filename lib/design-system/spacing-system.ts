/**
 * Sistema de Espaçamento Padronizado - estaff-web
 * Baseado nas melhores práticas de Apple, Stripe, Airbnb e Google Material
 * 
 * Sistema Base 8: Todos os valores são múltiplos de 8px
 * Proporção Desktop/Mobile: 1.5x a 2x
 */

export const spacingSystem = {
  // Valores base em pixels (múltiplos de 8)
  base: {
    xs: 8,    // 0.5rem
    sm: 16,   // 1rem
    md: 24,   // 1.5rem
    lg: 32,   // 2rem
    xl: 48,   // 3rem
    '2xl': 64,  // 4rem
    '3xl': 80,  // 5rem
    '4xl': 96,  // 6rem
    '5xl': 128, // 8rem
    '6xl': 160, // 10rem
  },

  // Espaçamento entre seções (valores otimizados - redução adicional de ~30%)
  section: {
    hero: {
      mobile: 'py-8',  // 32px (2rem) - Era 40px
      tablet: 'md:py-10', // 40px (2.5rem) - Era 48px
      desktop: 'lg:py-12', // 48px (3rem) - Era 64px
    },
    primary: {
      mobile: 'py-6',  // 24px (1.5rem) - Era 32px
      tablet: 'md:py-8', // 32px (2rem) - Era 40px
      desktop: 'lg:py-10', // 40px (2.5rem) - Era 48px
    },
    secondary: {
      mobile: 'py-4',  // 16px (1rem) - Era 24px
      tablet: 'md:py-6', // 24px (1.5rem) - Era 32px
      desktop: 'lg:py-8', // 32px (2rem) - Era 40px
    },
    support: {
      mobile: 'py-3',  // 12px (0.75rem) - Era 20px
      tablet: 'md:py-4', // 16px (1rem) - Era 24px
      desktop: 'lg:py-6', // 24px (1.5rem) - Era 32px
    },
  },

  // Espaçamento interno de componentes
  component: {
    card: {
      padding: 'p-4 md:p-6 lg:p-8',
      gap: 'gap-4 md:gap-6',
    },
    button: {
      sm: 'px-4 py-2',
      md: 'px-6 py-3',
      lg: 'px-8 py-4',
    },
    container: {
      padding: 'px-4 md:px-6 lg:px-8',
      maxWidth: 'max-w-7xl mx-auto',
    }
  },

  // Espaçamento entre elementos
  gap: {
    xs: 'gap-2',   // 8px
    sm: 'gap-4',   // 16px
    md: 'gap-6',   // 24px
    lg: 'gap-8',   // 32px
    xl: 'gap-12',  // 48px
    '2xl': 'gap-16', // 64px
  }
}

// Classes Tailwind prontas para uso (valores otimizados - compactos mas respirados)
export const sectionClasses = {
  hero: 'py-8 md:py-10 lg:py-12',       // 32px → 40px → 48px
  primary: 'py-6 md:py-8 lg:py-10',     // 24px → 32px → 40px
  secondary: 'py-4 md:py-6 lg:py-8',    // 16px → 24px → 32px
  support: 'py-3 md:py-4 lg:py-6',      // 12px → 16px → 24px
}

// Função helper para aplicar espaçamento de seção
export function getSectionSpacing(type: keyof typeof sectionClasses = 'primary'): string {
  return sectionClasses[type]
}

// Função para combinar espaçamento com outras classes
export function withSectionSpacing(
  type: keyof typeof sectionClasses,
  additionalClasses: string = ''
): string {
  return `${sectionClasses[type]} ${additionalClasses}`.trim()
}