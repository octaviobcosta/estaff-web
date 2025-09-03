/**
 * Componente de Seção Padronizado
 * Aplica espaçamentos consistentes em todo o projeto
 */

import { ReactNode } from 'react'
import { getSectionClasses, SECTION_SPACING } from '@/lib/constants/spacing'
import { cn } from '@/lib/utils'

interface SectionProps {
  children: ReactNode
  className?: string
  id?: string
  
  // Tipo de seção define o espaçamento
  type?: 'hero' | 'default' | 'compact' | 'large'
  
  // Espaçamento entre seções
  spacing?: 'sm' | 'md' | 'lg' | 'xl' | 'none'
  
  // Container customizado
  noContainer?: boolean
  
  // Background
  background?: 'white' | 'gray' | 'gradient' | 'transparent' | 'custom'
  
  // Props HTML
  role?: string
  'aria-label'?: string
  'aria-labelledby'?: string
}

const backgroundClasses = {
  white: 'bg-white',
  gray: 'bg-gray-50',
  gradient: 'bg-gradient-to-b from-white to-gray-50',
  transparent: 'bg-transparent',
  custom: ''
} as const

export function Section({
  children,
  className,
  id,
  type = 'default',
  spacing = 'md',
  noContainer = false,
  background = 'transparent',
  role,
  ...ariaProps
}: SectionProps) {
  // Monta as classes base
  const baseClasses = noContainer 
    ? '' 
    : getSectionClasses(type)
  
  // Adiciona espaçamento entre seções
  const spacingClass = spacing !== 'none' 
    ? SECTION_SPACING.between[spacing] 
    : ''
  
  // Background
  const bgClass = backgroundClasses[background]
  
  // Combina todas as classes
  const sectionClasses = cn(
    baseClasses,
    spacingClass,
    bgClass,
    'relative', // Para posicionamento de elementos decorativos
    className
  )
  
  return (
    <section
      id={id}
      className={sectionClasses}
      role={role}
      {...ariaProps}
    >
      {children}
    </section>
  )
}

/**
 * Container interno para quando precisar de estrutura adicional
 */
interface ContainerProps {
  children: ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

const containerSizes = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl', 
  lg: 'max-w-7xl',
  xl: 'max-w-[90rem]',
  full: 'max-w-full'
} as const

export function Container({ 
  children, 
  className,
  size = 'lg'
}: ContainerProps) {
  return (
    <div className={cn(
      containerSizes[size],
      'mx-auto px-4 sm:px-6 lg:px-8',
      className
    )}>
      {children}
    </div>
  )
}

/**
 * Componente para título de seção padronizado
 */
interface SectionHeaderProps {
  title: string
  subtitle?: string
  align?: 'left' | 'center' | 'right'
  className?: string
}

export function SectionHeader({
  title,
  subtitle,
  align = 'center',
  className
}: SectionHeaderProps) {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  }
  
  return (
    <div className={cn(
      alignClasses[align],
      'mb-12 md:mb-16',
      className
    )}>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  )
}

/**
 * Grid responsivo para conteúdo de seções
 */
interface SectionGridProps {
  children: ReactNode
  columns?: 1 | 2 | 3 | 4
  gap?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const gridColumns = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
} as const

const gridGaps = {
  sm: 'gap-4',
  md: 'gap-6 md:gap-8',
  lg: 'gap-8 md:gap-12',
  xl: 'gap-12 md:gap-16'
} as const

export function SectionGrid({
  children,
  columns = 3,
  gap = 'md',
  className
}: SectionGridProps) {
  return (
    <div className={cn(
      'grid',
      gridColumns[columns],
      gridGaps[gap],
      className
    )}>
      {children}
    </div>
  )
}

/**
 * Exemplos de uso:
 * 
 * <Section type="hero" background="gradient">
 *   <SectionHeader 
 *     title="Bem-vindo" 
 *     subtitle="Conectando profissionais" 
 *   />
 * </Section>
 * 
 * <Section type="default" spacing="lg">
 *   <SectionGrid columns={3}>
 *     <Card />
 *     <Card />
 *     <Card />
 *   </SectionGrid>
 * </Section>
 */