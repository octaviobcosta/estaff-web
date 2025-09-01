'use client'

import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient' | 'glass' | 'glow'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  animation?: 'scale' | 'shine' | 'pulse' | 'none'
  loading?: boolean
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
  gradient?: 'brand' | 'freela' | 'empresa' | 'institucional' | 'premium'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    rounded = 'lg',
    animation = 'scale',
    loading = false,
    icon,
    iconPosition = 'left',
    fullWidth = false,
    gradient = 'brand',
    children,
    disabled,
    ...props 
  }, ref) => {
    
    const baseClasses = 'relative inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden'
    
    const variantClasses = {
      primary: 'bg-freela text-white hover:bg-freela-600 focus-visible:ring-freela shadow-md hover:shadow-lg',
      secondary: 'bg-empresa text-white hover:bg-empresa-800 focus-visible:ring-empresa shadow-md hover:shadow-lg',
      outline: 'border-2 border-freela text-freela hover:bg-freela hover:text-white focus-visible:ring-freela',
      ghost: 'text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-400',
      gradient: `bg-gradient-to-r text-white shadow-lg hover:shadow-xl focus-visible:ring-freela ${getGradient(gradient)}`,
      glass: 'backdrop-blur-md bg-white/20 border border-white/30 text-white hover:bg-white/30 focus-visible:ring-white/50 shadow-glass',
      glow: 'bg-freela text-white shadow-glow hover:shadow-glow-empresa transition-shadow focus-visible:ring-freela'
    }
    
    const sizeClasses = {
      xs: 'px-2.5 py-1.5 text-xs gap-1',
      sm: 'px-3 py-2 text-sm gap-1.5',
      md: 'px-5 py-2.5 text-base gap-2',
      lg: 'px-6 py-3 text-lg gap-2.5',
      xl: 'px-8 py-4 text-xl gap-3',
    }

    const roundedClasses = {
      sm: 'rounded',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
      full: 'rounded-full'
    }
    
    function getGradient(type: string) {
      const gradients = {
        brand: 'from-freela to-empresa',
        freela: 'from-freela-400 to-freela-600',
        empresa: 'from-empresa-700 to-empresa-900',
        institucional: 'from-institucional-300 to-institucional-500',
        premium: 'from-purple-500 to-pink-500'
      }
      return gradients[type as keyof typeof gradients] || gradients.brand
    }

    const animationVariants = {
      scale: {
        whileHover: !disabled && !loading ? { scale: 1.05 } : {},
        whileTap: !disabled && !loading ? { scale: 0.95 } : {},
      },
      shine: {
        whileHover: !disabled && !loading ? {} : {},
      },
      pulse: {
        animate: !disabled && !loading ? { scale: [1, 1.05, 1] } : {},
        transition: { duration: 2, repeat: Infinity }
      },
      none: {}
    }

    const MotionButton = motion.button

    return (
      <MotionButton
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          roundedClasses[rounded],
          fullWidth && 'w-full',
          className
        )}
        ref={ref}
        disabled={disabled || loading}
        {...animationVariants[animation]}
        {...props}
      >
        {/* Shine Effect Overlay */}
        {animation === 'shine' && !disabled && !loading && (
          <motion.div
            className="absolute inset-0 -top-1 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
            initial={{ x: '-200%' }}
            whileHover={{ x: '200%' }}
            transition={{ duration: 0.7 }}
          />
        )}

        {/* Loading Spinner */}
        {loading && (
          <motion.svg
            className="absolute animate-spin h-5 w-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </motion.svg>
        )}

        {/* Content */}
        <span className={cn(
          'relative z-10 flex items-center justify-center',
          loading && 'opacity-0'
        )}>
          {icon && iconPosition === 'left' && (
            <span className="flex-shrink-0">{icon}</span>
          )}
          {children}
          {icon && iconPosition === 'right' && (
            <span className="flex-shrink-0">{icon}</span>
          )}
        </span>

        {/* Ripple Effect on Click */}
        {variant === 'gradient' && (
          <span className="absolute inset-0 rounded-[inherit] bg-white/0 hover:bg-white/10 transition-colors duration-300" />
        )}
      </MotionButton>
    )
  }
)

Button.displayName = 'Button'

// Icon Button Component
interface IconButtonProps extends Omit<ButtonProps, 'children'> {
  'aria-label': string
  children: ReactNode
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, size = 'md', ...props }, ref) => {
    const sizeClasses = {
      xs: 'p-1',
      sm: 'p-1.5',
      md: 'p-2',
      lg: 'p-2.5',
      xl: 'p-3',
    }

    return (
      <Button
        ref={ref}
        className={cn(sizeClasses[size], 'aspect-square', className)}
        size={size}
        {...props}
      />
    )
  }
)

IconButton.displayName = 'IconButton'

export { Button, IconButton }