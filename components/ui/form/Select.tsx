'use client'

import React, { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, AlertCircle, Check } from 'lucide-react'

/**
 * Select option interface
 */
export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

/**
 * Select component props interface
 */
export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size' | 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd'> {
  /** Select variant by brand */
  variant?: 'freela' | 'empresa' | 'institucional' | 'default'
  /** Select size */
  size?: 'sm' | 'md' | 'lg'
  /** Options array */
  options: SelectOption[]
  /** Error message */
  error?: string
  /** Success state */
  success?: boolean
  /** Label text */
  label?: string
  /** Helper text */
  helperText?: string
  /** Placeholder text */
  placeholder?: string
  /** Full width */
  fullWidth?: boolean
}

/**
 * Premium Select component with brand variants and validation states
 * 
 * @example
 * <Select
 *   variant="empresa"
 *   label="Categoria"
 *   options={[
 *     { value: 'dev', label: 'Desenvolvimento' },
 *     { value: 'design', label: 'Design' }
 *   ]}
 * />
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ 
    className,
    variant = 'default',
    size = 'md',
    options,
    error,
    success,
    label,
    helperText,
    placeholder = 'Selecione uma opção',
    fullWidth = false,
    disabled,
    ...props 
  }, ref) => {
    // Size variants
    const sizeClasses = {
      sm: 'h-9 px-3 pr-9 text-sm',
      md: 'h-11 px-4 pr-10 text-base',
      lg: 'h-13 px-5 pr-11 text-lg'
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

    const selectClasses = cn(
      'relative w-full rounded-lg border border-gray-200 bg-white',
      'transition-all duration-200 ease-out appearance-none',
      'focus:outline-none focus:ring-4',
      'cursor-pointer',
      sizeClasses[size],
      !error && !success && variantClasses[variant],
      stateClasses,
      fullWidth && 'w-full',
      className
    )

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
          <motion.select
            ref={ref}
            className={selectClasses}
            disabled={disabled}
            whileFocus={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map(option => (
              <option 
                key={option.value} 
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </motion.select>
          
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none flex items-center gap-2">
            {error && <AlertCircle className="text-red-500" size={18} />}
            {success && <Check className="text-green-500" size={18} />}
            {!error && !success && (
              <ChevronDown className="text-gray-400" size={18} />
            )}
          </div>
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

Select.displayName = 'Select'