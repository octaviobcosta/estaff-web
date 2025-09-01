'use client'

import React, { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { motion, HTMLMotionProps } from 'framer-motion'

/**
 * Stack component props interface
 */
export interface StackProps extends Omit<HTMLMotionProps<'div'>, 'ref'> {
  /** Stack direction */
  direction?: 'horizontal' | 'vertical'
  /** Spacing between items */
  spacing?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
  /** Align items */
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline'
  /** Justify content */
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  /** Wrap items */
  wrap?: boolean
  /** Full width */
  fullWidth?: boolean
  /** Responsive direction */
  responsive?: boolean
}

/**
 * Premium Stack component for vertical/horizontal layouts with consistent spacing
 * 
 * @example
 * <Stack direction="horizontal" spacing={4} align="center">
 *   <Button>Action 1</Button>
 *   <Button>Action 2</Button>
 * </Stack>
 */
export const Stack = forwardRef<HTMLDivElement, StackProps>(
  ({ 
    children, 
    className,
    direction = 'vertical',
    spacing = 4,
    align = 'stretch',
    justify = 'start',
    wrap = false,
    fullWidth = false,
    responsive = false,
    initial = { opacity: 0 },
    animate = { opacity: 1 },
    transition = { duration: 0.3, ease: 'easeOut', staggerChildren: 0.05 },
    ...props 
  }, ref) => {
    // Direction classes
    const directionClasses = {
      horizontal: responsive ? 'flex-col sm:flex-row' : 'flex-row',
      vertical: 'flex-col'
    }

    // Spacing classes
    const spacingClasses = {
      horizontal: {
        0: 'space-x-0',
        1: responsive ? 'space-y-1 sm:space-y-0 sm:space-x-1' : 'space-x-1',
        2: responsive ? 'space-y-2 sm:space-y-0 sm:space-x-2' : 'space-x-2',
        3: responsive ? 'space-y-3 sm:space-y-0 sm:space-x-3' : 'space-x-3',
        4: responsive ? 'space-y-4 sm:space-y-0 sm:space-x-4' : 'space-x-4',
        5: responsive ? 'space-y-5 sm:space-y-0 sm:space-x-5' : 'space-x-5',
        6: responsive ? 'space-y-6 sm:space-y-0 sm:space-x-6' : 'space-x-6',
        7: responsive ? 'space-y-7 sm:space-y-0 sm:space-x-7' : 'space-x-7',
        8: responsive ? 'space-y-8 sm:space-y-0 sm:space-x-8' : 'space-x-8'
      },
      vertical: {
        0: 'space-y-0',
        1: 'space-y-1',
        2: 'space-y-2',
        3: 'space-y-3',
        4: 'space-y-4',
        5: 'space-y-5',
        6: 'space-y-6',
        7: 'space-y-7',
        8: 'space-y-8'
      }
    }

    // Alignment classes
    const alignClasses = {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
      baseline: 'items-baseline'
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

    const stackClasses = cn(
      'flex',
      directionClasses[direction],
      spacingClasses[direction][spacing],
      alignClasses[align],
      justifyClasses[justify],
      wrap && 'flex-wrap',
      fullWidth && 'w-full',
      className
    )

    return (
      <motion.div
        ref={ref}
        className={stackClasses}
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

Stack.displayName = 'Stack'