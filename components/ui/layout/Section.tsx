'use client'

import React, { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { motion, HTMLMotionProps } from 'framer-motion'

/**
 * Section component props interface
 */
export interface SectionProps extends Omit<HTMLMotionProps<'section'>, 'ref' | 'children'> {
  children?: React.ReactNode
  /** Section padding size */
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  /** Background color variant */
  background?: 'default' | 'subtle' | 'muted' | 'brand'
  /** Brand theme variant */
  brand?: 'freela' | 'empresa' | 'institucional'
  /** Full viewport height */
  fullHeight?: boolean
  /** Apply decorative elements */
  decorated?: boolean
}

/**
 * Premium Section component with consistent spacing and backgrounds
 * 
 * @example
 * <Section padding="lg" background="subtle">
 *   <Container>
 *     <h2>Section Title</h2>
 *   </Container>
 * </Section>
 */
export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ 
    children, 
    className,
    padding = 'md',
    background = 'default',
    brand,
    fullHeight = false,
    decorated = false,
    initial = { opacity: 0 },
    animate = { opacity: 1 },
    transition = { duration: 0.5, ease: 'easeOut' },
    ...props 
  }, ref) => {
    // Padding variants
    const paddingClasses = {
      none: '',
      sm: 'py-8 sm:py-12',
      md: 'py-12 sm:py-16 lg:py-20',
      lg: 'py-16 sm:py-20 lg:py-24',
      xl: 'py-20 sm:py-24 lg:py-32'
    }

    // Background variants
    const backgroundClasses = {
      default: 'bg-white',
      subtle: 'bg-gray-50',
      muted: 'bg-gray-100',
      brand: brand ? {
        freela: 'bg-gradient-to-br from-freela-50 to-freela-100/50',
        empresa: 'bg-gradient-to-br from-empresa-50 to-empresa-100/50',
        institucional: 'bg-gradient-to-br from-institucional-50 to-institucional-100/50'
      }[brand] : 'bg-gradient-to-br from-gray-50 to-gray-100/50'
    }

    const sectionClasses = cn(
      'relative overflow-hidden',
      paddingClasses[padding],
      background === 'brand' ? backgroundClasses.brand : backgroundClasses[background],
      fullHeight && 'min-h-screen flex flex-col justify-center',
      className
    )

    return (
      <motion.section
        ref={ref}
        className={sectionClasses}
        initial={initial}
        animate={animate}
        transition={transition}
        {...props}
      >
        {decorated && (
          <>
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-radial from-freela-200/20 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-radial from-empresa-200/20 to-transparent rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
          </>
        )}
        <div className="relative z-10">
          {children}
        </div>
      </motion.section>
    )
  }
)

Section.displayName = 'Section'