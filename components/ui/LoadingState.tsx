'use client'

import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

interface LoadingStateProps {
  text?: string
  variant?: 'inline' | 'overlay' | 'fullscreen'
  size?: 'sm' | 'md' | 'lg'
}

export function LoadingState({ 
  text = 'Carregando...', 
  variant = 'inline',
  size = 'md' 
}: LoadingStateProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  }

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  }

  if (variant === 'fullscreen') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm"
      >
        <div className="flex flex-col items-center gap-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          >
            <Loader2 className={`${sizeClasses[size]} text-institucional-600`} />
          </motion.div>
          {text && (
            <p className={`${textSizeClasses[size]} text-gray-600 font-medium`}>
              {text}
            </p>
          )}
        </div>
      </motion.div>
    )
  }

  if (variant === 'overlay') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 z-10 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-lg"
      >
        <div className="flex flex-col items-center gap-3">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          >
            <Loader2 className={`${sizeClasses[size]} text-institucional-600`} />
          </motion.div>
          {text && (
            <p className={`${textSizeClasses[size]} text-gray-600 font-medium`}>
              {text}
            </p>
          )}
        </div>
      </motion.div>
    )
  }

  // Inline variant (default)
  return (
    <div className="flex items-center justify-center gap-3 p-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      >
        <Loader2 className={`${sizeClasses[size]} text-institucional-600`} />
      </motion.div>
      {text && (
        <p className={`${textSizeClasses[size]} text-gray-600 font-medium`}>
          {text}
        </p>
      )}
    </div>
  )
}

// Skeleton loader for content placeholders
interface SkeletonProps {
  className?: string
  variant?: 'text' | 'circular' | 'rectangular'
  animation?: 'pulse' | 'wave'
}

export function Skeleton({ 
  className = '', 
  variant = 'text',
  animation = 'pulse' 
}: SkeletonProps) {
  const baseClasses = 'bg-gray-200'
  
  const variantClasses = {
    text: 'h-4 w-full rounded',
    circular: 'h-12 w-12 rounded-full',
    rectangular: 'h-24 w-full rounded-lg',
  }

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-shimmer',
  }

  return (
    <div 
      className={`${baseClasses} ${variantClasses[variant]} ${animationClasses[animation]} ${className}`}
      aria-hidden="true"
    />
  )
}

// Loading button state
interface LoadingButtonProps {
  isLoading: boolean
  children: React.ReactNode
  loadingText?: string
  className?: string
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

export function LoadingButton({
  isLoading,
  children,
  loadingText = 'Processando...',
  className = '',
  onClick,
  disabled,
  type = 'button',
}: LoadingButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`relative inline-flex items-center justify-center gap-2 transition-all duration-200 ${className} ${
        isLoading ? 'cursor-not-allowed opacity-70' : ''
      }`}
      aria-busy={isLoading}
    >
      {isLoading ? (
        <>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          >
            <Loader2 className="h-4 w-4" />
          </motion.div>
          <span>{loadingText}</span>
        </>
      ) : (
        children
      )}
    </button>
  )
}