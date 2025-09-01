'use client'

import React, { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertCircle, Check } from 'lucide-react'

/**
 * Textarea component props interface
 */
export interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd'> {
  /** Textarea variant by brand */
  variant?: 'freela' | 'empresa' | 'institucional' | 'default'
  /** Error message */
  error?: string
  /** Success state */
  success?: boolean
  /** Label text */
  label?: string
  /** Helper text */
  helperText?: string
  /** Full width */
  fullWidth?: boolean
  /** Auto resize */
  autoResize?: boolean
  /** Character counter */
  showCounter?: boolean
}

/**
 * Premium Textarea component with brand variants and validation states
 * 
 * @example
 * <Textarea
 *   variant="freela"
 *   label="Descrição"
 *   placeholder="Descreva seu projeto..."
 *   rows={4}
 *   maxLength={500}
 *   showCounter
 * />
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ 
    className,
    variant = 'default',
    error,
    success,
    label,
    helperText,
    fullWidth = false,
    autoResize = false,
    showCounter = false,
    disabled,
    maxLength,
    onChange,
    value,
    ...props 
  }, ref) => {
    const [charCount, setCharCount] = React.useState(
      value ? String(value).length : 0
    )

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

    const textareaClasses = cn(
      'relative w-full rounded-lg border border-gray-200 bg-white',
      'px-4 py-3 text-base',
      'transition-all duration-200 ease-out',
      'focus:outline-none focus:ring-4',
      'placeholder:text-gray-400',
      'resize-none',
      !autoResize && 'overflow-auto',
      !error && !success && variantClasses[variant],
      stateClasses,
      fullWidth && 'w-full',
      className
    )

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length)
      
      if (autoResize) {
        e.target.style.height = 'auto'
        e.target.style.height = `${e.target.scrollHeight}px`
      }
      
      onChange?.(e)
    }

    React.useEffect(() => {
      if (value) {
        setCharCount(String(value).length)
      }
    }, [value])

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
          <motion.textarea
            ref={ref}
            className={textareaClasses}
            disabled={disabled}
            maxLength={maxLength}
            onChange={handleChange}
            value={value}
            whileFocus={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
            {...props}
          />
          
          {(error || success) && (
            <div className="absolute right-3 top-3 flex items-center gap-2">
              {error && <AlertCircle className="text-red-500" size={18} />}
              {success && <Check className="text-green-500" size={18} />}
            </div>
          )}
        </div>

        <div className="flex justify-between items-start mt-1.5">
          <AnimatePresence>
            {(error || helperText) && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className={cn(
                  'text-sm',
                  error ? 'text-red-500' : 'text-gray-500'
                )}
              >
                {error || helperText}
              </motion.p>
            )}
          </AnimatePresence>

          {showCounter && maxLength && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={cn(
                'text-sm ml-auto',
                charCount >= maxLength ? 'text-red-500' : 'text-gray-400'
              )}
            >
              {charCount}/{maxLength}
            </motion.span>
          )}
        </div>
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'