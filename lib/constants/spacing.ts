/**
 * Sistema de Espaçamento Padronizado
 * 
 * Baseado em escala de 8px para consistência visual
 * Mobile-first approach com breakpoints responsivos
 */

export const SPACING = {
  // Base unit (8px)
  base: 8,
  
  // Padding vertical para seções
  section: {
    mobile: {
      sm: 'py-8',    // 32px (4 * 8)
      md: 'py-12',   // 48px (6 * 8)
      lg: 'py-16',   // 64px (8 * 8)
      xl: 'py-20',   // 80px (10 * 8)
      '2xl': 'py-24' // 96px (12 * 8)
    },
    tablet: {
      sm: 'md:py-12',   // 48px
      md: 'md:py-16',   // 64px
      lg: 'md:py-20',   // 80px
      xl: 'md:py-24',   // 96px
      '2xl': 'md:py-28' // 112px
    },
    desktop: {
      sm: 'lg:py-16',   // 64px
      md: 'lg:py-20',   // 80px
      lg: 'lg:py-24',   // 96px
      xl: 'lg:py-32',   // 128px
      '2xl': 'lg:py-40' // 160px
    }
  },
  
  // Container padding horizontal
  container: {
    mobile: 'px-4',      // 16px
    tablet: 'sm:px-6',   // 24px
    desktop: 'lg:px-8'   // 32px
  },
  
  // Espaçamento entre elementos
  gap: {
    xs: 'gap-2',    // 8px
    sm: 'gap-4',    // 16px
    md: 'gap-6',    // 24px
    lg: 'gap-8',    // 32px
    xl: 'gap-12',   // 48px
    '2xl': 'gap-16' // 64px
  },
  
  // Margens entre componentes
  component: {
    sm: 'mb-4 md:mb-6 lg:mb-8',     // 16/24/32px
    md: 'mb-6 md:mb-8 lg:mb-12',    // 24/32/48px
    lg: 'mb-8 md:mb-12 lg:mb-16',   // 32/48/64px
    xl: 'mb-12 md:mb-16 lg:mb-20'   // 48/64/80px
  }
} as const

/**
 * Classes utilitárias para seções
 * Combina padding, container e responsividade
 */
export const SECTION_CLASSES = {
  // Hero sections (mais espaço)
  hero: `
    ${SPACING.section.mobile['2xl']}
    ${SPACING.section.tablet['2xl']}
    ${SPACING.section.desktop['2xl']}
  `,
  
  // Seções de conteúdo padrão
  default: `
    ${SPACING.section.mobile.lg}
    ${SPACING.section.tablet.xl}
    ${SPACING.section.desktop.lg}
  `,
  
  // Seções compactas
  compact: `
    ${SPACING.section.mobile.md}
    ${SPACING.section.tablet.lg}
    ${SPACING.section.desktop.md}
  `,
  
  // Seções com muito conteúdo
  large: `
    ${SPACING.section.mobile.xl}
    ${SPACING.section.tablet['2xl']}
    ${SPACING.section.desktop.xl}
  `,
  
  // Container padrão
  container: `
    max-w-7xl mx-auto
    ${SPACING.container.mobile}
    ${SPACING.container.tablet}
    ${SPACING.container.desktop}
  `
} as const

/**
 * Função helper para criar classes de seção customizadas
 */
export function getSectionClasses(
  type: 'hero' | 'default' | 'compact' | 'large' = 'default',
  customClasses?: string
): string {
  const baseClasses = SECTION_CLASSES[type]
  const containerClasses = SECTION_CLASSES.container
  
  return `${baseClasses} ${containerClasses} ${customClasses || ''}`.trim()
}

/**
 * Sistema de espaçamento entre seções
 * Para manter ritmo visual consistente
 */
export const SECTION_SPACING = {
  // Espaçamento entre seções diferentes
  between: {
    sm: 'mt-8 md:mt-12 lg:mt-16',    // 32/48/64px
    md: 'mt-12 md:mt-16 lg:mt-20',   // 48/64/80px
    lg: 'mt-16 md:mt-20 lg:mt-24',   // 64/80/96px
    xl: 'mt-20 md:mt-24 lg:mt-32'    // 80/96/128px
  },
  
  // Espaçamento após hero section
  afterHero: 'mt-0', // Hero já tem padding suficiente
  
  // Espaçamento antes do footer
  beforeFooter: 'mb-0' // Footer tem seu próprio padding
} as const

/**
 * Breakpoints do projeto (matching Tailwind)
 */
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
} as const

/**
 * Exemplos de uso:
 * 
 * 1. Seção padrão:
 * <section className={getSectionClasses('default', 'bg-gray-50')}>
 * 
 * 2. Hero section:
 * <section className={getSectionClasses('hero', 'bg-gradient-to-b from-white to-gray-50')}>
 * 
 * 3. Seção compacta:
 * <section className={getSectionClasses('compact')}>
 * 
 * 4. Com espaçamento entre seções:
 * <section className={`${getSectionClasses('default')} ${SECTION_SPACING.between.md}`}>
 */