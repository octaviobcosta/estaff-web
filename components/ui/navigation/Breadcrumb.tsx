'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { ChevronRight, Home } from 'lucide-react'
import NextLink from 'next/link'

/**
 * Breadcrumb item interface
 */
export interface BreadcrumbItem {
  label: string
  href?: string
  icon?: React.ReactNode
}

/**
 * Breadcrumb component props interface
 */
export interface BreadcrumbProps {
  /** Breadcrumb items */
  items: BreadcrumbItem[]
  /** Show home icon */
  showHome?: boolean
  /** Separator icon */
  separator?: React.ReactNode
  /** Variant by brand */
  variant?: 'freela' | 'empresa' | 'institucional' | 'default'
  /** Custom className */
  className?: string
}

/**
 * Premium Breadcrumb component with responsive behavior
 * 
 * @example
 * <Breadcrumb
 *   items={[
 *     { label: 'Home', href: '/' },
 *     { label: 'Projetos', href: '/projetos' },
 *     { label: 'Detalhes' }
 *   ]}
 *   variant="empresa"
 * />
 */
export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  showHome = true,
  separator = <ChevronRight className="w-4 h-4" />,
  variant = 'default',
  className
}) => {
  const variantClasses = {
    freela: 'text-freela-600 hover:text-freela-700',
    empresa: 'text-empresa-600 hover:text-empresa-700',
    institucional: 'text-institucional-600 hover:text-institucional-700',
    default: 'text-gray-600 hover:text-gray-900'
  }

  const allItems = showHome 
    ? [{ label: 'Home', href: '/', icon: <Home className="w-4 h-4" /> }, ...items]
    : items

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex items-center flex-wrap gap-2">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1
          
          return (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className="flex items-center gap-2"
            >
              {item.href && !isLast ? (
                <NextLink
                  href={item.href}
                  className={cn(
                    'inline-flex items-center gap-1 text-sm font-medium transition-colors duration-200',
                    'hover:underline underline-offset-2',
                    variantClasses[variant]
                  )}
                >
                  {item.icon}
                  <span className={cn(
                    index === 0 && showHome && 'hidden sm:inline'
                  )}>
                    {item.label}
                  </span>
                </NextLink>
              ) : (
                <span
                  className={cn(
                    'inline-flex items-center gap-1 text-sm font-medium',
                    isLast ? 'text-gray-900' : 'text-gray-500'
                  )}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.icon}
                  <span className={cn(
                    index === 0 && showHome && 'hidden sm:inline'
                  )}>
                    {item.label}
                  </span>
                </span>
              )}
              
              {!isLast && (
                <span className="text-gray-400" aria-hidden="true">
                  {separator}
                </span>
              )}
            </motion.li>
          )
        })}
      </ol>
    </nav>
  )
}

Breadcrumb.displayName = 'Breadcrumb'