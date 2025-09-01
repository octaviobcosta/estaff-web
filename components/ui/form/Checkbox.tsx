'use client'

import React, { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'

/**
 * Checkbox component props interface
 */
export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Checkbox variant by brand */
  variant?: 'freela' | 'empresa' | 'institucional' | 'default'
  /** Checkbox size */
  size?: 'sm' | 'md' | 'lg'
  /** Label text */
  label?: string
  /** Helper text */
  helperText?: string
  /** Error state */
  error?: boolean
  /** Indeterminate state */
  indeterminate?: boolean
}

/**
 * Premium Checkbox component with brand variants and smooth animations
 * 
 * @example
 * <Checkbox
 *   variant="freela"
 *   label="Aceito os termos"
 *   helperText="Li e concordo com os termos de uso"
 * />
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ 
    className,
    variant = 'default',
    size = 'md',
    label,
    helperText,
    error,
    indeterminate,
    disabled,
    checked,
    onChange,
    ...props 
  }, ref) => {
    const [isChecked, setIsChecked] = React.useState(checked || false)

    React.useEffect(() => {
      setIsChecked(checked || false)
    }, [checked])

    // Size variants
    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6'
    }

    const labelSizeClasses = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg'
    }

    // Variant colors
    const variantClasses = {
      freela: 'border-freela-500 bg-freela-500',
      empresa: 'border-empresa-500 bg-empresa-500',
      institucional: 'border-institucional-500 bg-institucional-500',
      default: 'border-gray-600 bg-gray-600'
    }

    const borderVariantClasses = {
      freela: 'border-freela-500 hover:border-freela-600 focus:ring-freela-500/20',
      empresa: 'border-empresa-500 hover:border-empresa-600 focus:ring-empresa-500/20',
      institucional: 'border-institucional-500 hover:border-institucional-600 focus:ring-institucional-500/20',
      default: 'border-gray-300 hover:border-gray-400 focus:ring-gray-500/20'
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsChecked(e.target.checked)
      onChange?.(e)
    }

    const checkboxClasses = cn(
      'relative inline-flex items-center justify-center',
      'rounded border-2 bg-white',
      'transition-all duration-200 ease-out cursor-pointer',
      'focus:outline-none focus:ring-4',
      sizeClasses[size],
      isChecked ? variantClasses[variant] : borderVariantClasses[variant],
      error && 'border-red-500',
      disabled && 'opacity-50 cursor-not-allowed',
      className
    )

    return (
      <div className="relative">
        <label className={cn(
          'inline-flex items-start gap-3 cursor-pointer',
          disabled && 'cursor-not-allowed'
        )}>
          <div className="relative flex-shrink-0">
            <input
              ref={ref}
              type="checkbox"
              className="sr-only"
              checked={isChecked}
              onChange={handleChange}
              disabled={disabled}
              {...props}
            />
            <motion.div
              className={checkboxClasses}
              whileHover={!disabled ? { scale: 1.05 } : {}}
              whileTap={!disabled ? { scale: 0.95 } : {}}
            >
              <AnimatePresence>
                {(isChecked || indeterminate) && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                  >
                    {indeterminate ? (
                      <div className="w-2/3 h-0.5 bg-white rounded-full" />
                    ) : (
                      <Check className="text-white" size={size === 'sm' ? 12 : size === 'md' ? 14 : 16} />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {(label || helperText) && (
            <div className="flex flex-col">
              {label && (
                <span className={cn(
                  'font-medium text-gray-900',
                  labelSizeClasses[size],
                  error && 'text-red-500',
                  disabled && 'text-gray-400'
                )}>
                  {label}
                </span>
              )}
              {helperText && (
                <span className={cn(
                  'text-sm text-gray-500 mt-0.5',
                  error && 'text-red-500'
                )}>
                  {helperText}
                </span>
              )}
            </div>
          )}
        </label>
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'