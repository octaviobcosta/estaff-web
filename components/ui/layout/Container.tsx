'use client'

import React, { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { motion, HTMLMotionProps } from 'framer-motion'

/**
 * Container component variants
 */
export type ContainerVariant = 'full' | 'boxed' | 'fluid' | 'narrow'

/**
 * Container component props interface
 */
export interface ContainerProps extends Omit<HTMLMotionProps<'div'>, 'ref'> {
  /** Container variant type */
  variant?: ContainerVariant
  /** Apply padding to container */
  padded?: boolean
  /** Center content horizontally */
  centered?: boolean
  /** Custom max width override */
  maxWidth?: string
}

/**
 * Premium Container component with responsive behavior and animations
 * 
 * @example
 * <Container variant="boxed" padded>
 *   <h1>Content goes here</h1>
 * </Container>
 */
export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ 
    children, 
    className, 
    variant = 'boxed',
    padded = true,
    centered = true,
    maxWidth,
    initial = { opacity: 0 },
    animate = { opacity: 1 },
    transition = { duration: 0.3, ease: 'easeOut' },
    ...props 
  }, ref) => {
    const variants = {
      full: 'w-full',
      boxed: 'max-w-7xl',
      fluid: 'max-w-[90vw]',
      narrow: 'max-w-4xl'
    }

    const containerClasses = cn(
      'relative',
      variants[variant],
      centered && 'mx-auto',
      padded && 'px-4 sm:px-6 lg:px-8',
      className
    )

    return (
      <motion.div
        ref={ref}
        className={containerClasses}
        initial={initial}
        animate={animate}
        transition={transition}
        style={{ maxWidth }}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

Container.displayName = 'Container'