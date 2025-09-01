'use client'

import React, { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { motion, HTMLMotionProps } from 'framer-motion'

/**
 * Grid component props interface
 */
export interface GridProps extends Omit<HTMLMotionProps<'div'>, 'ref'> {
  /** Number of columns (1-12) */
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  /** Responsive column configuration */
  responsive?: {
    sm?: number
    md?: number
    lg?: number
    xl?: number
    '2xl'?: number
  }
  /** Gap between grid items */
  gap?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
  /** Align items vertically */
  alignItems?: 'start' | 'center' | 'end' | 'stretch'
  /** Justify content horizontally */
  justifyContent?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
}

/**
 * Premium Grid component with 12-column system and responsive breakpoints
 * 
 * @example
 * <Grid cols={3} responsive={{ sm: 1, md: 2, lg: 3 }} gap={4}>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Grid>
 */
export const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ 
    children, 
    className, 
    cols = 1,
    responsive,
    gap = 4,
    alignItems = 'stretch',
    justifyContent = 'start',
    initial = { opacity: 0, y: 20 },
    animate = { opacity: 1, y: 0 },
    transition = { duration: 0.4, ease: 'easeOut', staggerChildren: 0.1 },
    ...props 
  }, ref) => {
    // Base grid classes
    const gridCols = {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
      5: 'grid-cols-5',
      6: 'grid-cols-6',
      7: 'grid-cols-7',
      8: 'grid-cols-8',
      9: 'grid-cols-9',
      10: 'grid-cols-10',
      11: 'grid-cols-11',
      12: 'grid-cols-12'
    }

    // Responsive classes
    const responsiveClasses = responsive ? [
      responsive.sm && `sm:grid-cols-${responsive.sm}`,
      responsive.md && `md:grid-cols-${responsive.md}`,
      responsive.lg && `lg:grid-cols-${responsive.lg}`,
      responsive.xl && `xl:grid-cols-${responsive.xl}`,
      responsive['2xl'] && `2xl:grid-cols-${responsive['2xl']}`
    ].filter(Boolean).join(' ') : ''

    // Gap classes
    const gapClasses = {
      1: 'gap-1',
      2: 'gap-2',
      3: 'gap-3',
      4: 'gap-4',
      5: 'gap-5',
      6: 'gap-6',
      7: 'gap-7',
      8: 'gap-8'
    }

    // Alignment classes
    const alignClasses = {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch'
    }

    // Justify classes
    const justifyClasses = {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly'
    }

    const gridClasses = cn(
      'grid',
      gridCols[cols],
      responsiveClasses,
      gapClasses[gap],
      alignClasses[alignItems],
      justifyClasses[justifyContent],
      className
    )

    return (
      <motion.div
        ref={ref}
        className={gridClasses}
        initial={initial}
        animate={animate}
        transition={transition}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

Grid.displayName = 'Grid'