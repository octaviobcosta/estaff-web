'use client'

import React, { forwardRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertCircle, Check, Eye, EyeOff } from 'lucide-react'

/**
 * Input component props interface
 */
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd'> {
  /** Input variant by brand */
  variant?: 'freela' | 'empresa' | 'institucional' | 'default'
  /** Input size */
  size?: 'sm' | 'md' | 'lg'
  /** Error message */
  error?: string
  /** Success state */
  success?: boolean
  /** Label text */
  label?: string
  /** Helper text */
  helperText?: string
  /** Left icon */
  leftIcon?: React.ReactNode
  /** Right icon */
  rightIcon?: React.ReactNode
  /** Full width */
  fullWidth?: boolean
}

/**
 * Premium Input component with brand variants and validation states
 * 
 * @example
 * <Input
 *   variant="freela"
 *   label="Email"
 *   placeholder="seu@email.com"
 *   error="Email inválido"
 * />
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className,
    variant = 'default',
    size = 'md',
    error,
    success,
    label,
    helperText,
    leftIcon,
    rightIcon,
    fullWidth = false,
    type = 'text',
    disabled,
    ...props 
  }, ref) => {
    const [showPassword, setShowPassword] = useState(false)
    const isPassword = type === 'password'

    // Size variants
    const sizeClasses = {
      sm: 'h-9 px-3 text-sm',
      md: 'h-11 px-4 text-base',
      lg: 'h-13 px-5 text-lg'
    }

    // Variant focus colors
    const variantClasses = {
      freela: 'focus:border-freela-500 focus:ring-freela-500/20',
      empresa: 'focus:border-empresa-500 focus:ring-empresa-500/20',
      institucional: 'focus:border-institucional-500 focus:ring-institucional-500/20',
      default: 'focus:border-gray-500 focus:ring-gray-500/20'
    }

    // State classes
    const stateClasses = cn(
      error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
      success && 'border-green-500 focus:border-green-500 focus:ring-green-500/20',
      disabled && 'opacity-50 cursor-not-allowed bg-gray-50'
    )

    const inputClasses = cn(
      'relative w-full rounded-lg border border-gray-200 bg-white',
      'transition-all duration-200 ease-out',
      'focus:outline-none focus:ring-4',
      'placeholder:text-gray-400',
      sizeClasses[size],
      !error && !success && variantClasses[variant],
      stateClasses,
      leftIcon && 'pl-10',
      (rightIcon || isPassword) && 'pr-10',
      fullWidth && 'w-full',
      className
    )

    const inputType = isPassword && showPassword ? 'text' : type

    return (
      <div className={cn('relative', fullWidth && 'w-full')}>
        {label && (
          <motion.label
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            {label}
          </motion.label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {leftIcon}
            </div>
          )}
          
          <motion.input
            ref={ref}
            type={inputType}
            className={inputClasses}
            disabled={disabled}
            whileFocus={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
            {...props}
          />
          
          {(rightIcon || isPassword || error || success) && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
              {isPassword && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              )}
              {error && <AlertCircle className="text-red-500" size={18} />}
              {success && <Check className="text-green-500" size={18} />}
              {!isPassword && !error && !success && rightIcon}
            </div>
          )}
        </div>

        <AnimatePresence>
          {(error || helperText) && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className={cn(
                'mt-1.5 text-sm',
                error ? 'text-red-500' : 'text-gray-500'
              )}
            >
              {error || helperText}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    )
  }
)

Input.displayName = 'Input'