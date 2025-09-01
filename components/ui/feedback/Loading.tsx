'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

/**
 * Loading component props interface
 */
export interface LoadingProps {
  /** Loading variant */
  variant?: 'spinner' | 'dots' | 'pulse' | 'bars'
  /** Loading size */
  size?: 'sm' | 'md' | 'lg'
  /** Brand color variant */
  color?: 'freela' | 'empresa' | 'institucional' | 'default'
  /** Loading text */
  text?: string
  /** Full screen overlay */
  fullScreen?: boolean
  /** Custom className */
  className?: string
}

/**
 * Premium Loading component with multiple variants and animations
 * 
 * @example
 * <Loading variant="dots" size="md" color="freela" text="Carregando..." />
 */
export const Loading: React.FC<LoadingProps> = ({
  variant = 'spinner',
  size = 'md',
  color = 'default',
  text,
  fullScreen = false,
  className
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  const colorClasses = {
    freela: 'text-freela-500',
    empresa: 'text-empresa-500',
    institucional: 'text-institucional-500',
    default: 'text-gray-600'
  }

  const borderColorClasses = {
    freela: 'border-freela-500',
    empresa: 'border-empresa-500',
    institucional: 'border-institucional-500',
    default: 'border-gray-600'
  }

  const renderSpinner = () => (
    <div
      className={cn(
        sizeClasses[size],
        'border-2 border-gray-200 rounded-full animate-spin',
        borderColorClasses[color],
        'border-t-transparent'
      )}
    />
  )

  const renderDots = () => (
    <div className="flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={cn(
            size === 'sm' ? 'w-1.5 h-1.5' : size === 'md' ? 'w-2 h-2' : 'w-3 h-3',
            'rounded-full',
            colorClasses[color]
          )}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.2,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  )

  const renderPulse = () => (
    <div className="relative">
      <motion.div
        className={cn(
          sizeClasses[size],
          'rounded-full',
          colorClasses[color],
          'bg-current'
        )}
        animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
      <motion.div
        className={cn(
          sizeClasses[size],
          'absolute inset-0 rounded-full',
          colorClasses[color],
          'bg-current'
        )}
        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
    </div>
  )

  const renderBars = () => (
    <div className="flex items-end gap-1">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={cn(
            size === 'sm' ? 'w-1' : size === 'md' ? 'w-1.5' : 'w-2',
            colorClasses[color],
            'bg-current rounded-full'
          )}
          animate={{
            height: size === 'sm' ? [8, 16, 8] : size === 'md' ? [12, 24, 12] : [16, 32, 16]
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.15,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  )

  const loadingContent = (
    <div className={cn('flex flex-col items-center gap-3', className)}>
      {variant === 'spinner' && renderSpinner()}
      {variant === 'dots' && renderDots()}
      {variant === 'pulse' && renderPulse()}
      {variant === 'bars' && renderBars()}
      {text && (
        <span className={cn('text-sm font-medium', colorClasses[color])}>
          {text}
        </span>
      )}
    </div>
  )

  if (fullScreen) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm"
      >
        {loadingContent}
      </motion.div>
    )
  }

  return loadingContent
}

Loading.displayName = 'Loading'