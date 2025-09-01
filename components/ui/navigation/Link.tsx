'use client'

import React, { forwardRef } from 'react'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

/**
 * Link component props interface
 */
export interface LinkProps extends NextLinkProps {
  /** Link variant by brand */
  variant?: 'freela' | 'empresa' | 'institucional' | 'default'
  /** Link size */
  size?: 'sm' | 'md' | 'lg'
  /** Underline style */
  underline?: 'always' | 'hover' | 'none'
  /** External link indicator */
  external?: boolean
  /** Disabled state */
  disabled?: boolean
  /** Children content */
  children: React.ReactNode
  /** Custom className */
  className?: string
}

/**
 * Premium Link component with brand variants and smooth animations
 * 
 * @example
 * <Link href="/about" variant="freela" underline="hover">
 *   Sobre nós
 * </Link>
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ 
    children,
    className,
    variant = 'default',
    size = 'md',
    underline = 'hover',
    external = false,
    disabled = false,
    ...props 
  }, ref) => {
    const sizeClasses = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg'
    }

    const variantClasses = {
      freela: 'text-freela-600 hover:text-freela-700',
      empresa: 'text-empresa-600 hover:text-empresa-700',
      institucional: 'text-institucional-600 hover:text-institucional-700',
      default: 'text-gray-600 hover:text-gray-900'
    }

    const underlineClasses = {
      always: 'underline underline-offset-2',
      hover: 'hover:underline hover:underline-offset-2',
      none: ''
    }

    const linkClasses = cn(
      'inline-flex items-center gap-1 transition-all duration-200 ease-out',
      'focus:outline-none focus:ring-2 focus:ring-offset-2 rounded',
      sizeClasses[size],
      !disabled && variantClasses[variant],
      underlineClasses[underline],
      disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
      variant === 'freela' && 'focus:ring-freela-500',
      variant === 'empresa' && 'focus:ring-empresa-500',
      variant === 'institucional' && 'focus:ring-institucional-500',
      variant === 'default' && 'focus:ring-gray-500',
      className
    )

    const content = (
      <>
        {children}
        {external && <ExternalLink className="w-3 h-3 ml-1" />}
      </>
    )

    if (external) {
      return (
        <motion.a
          ref={ref}
          className={linkClasses}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          {...(props as any)}
        >
          {content}
        </motion.a>
      )
    }

    return (
      <NextLink {...props} passHref legacyBehavior>
        <motion.a
          ref={ref}
          className={linkClasses}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {content}
        </motion.a>
      </NextLink>
    )
  }
)

Link.displayName = 'Link'