'use client'

import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'
import { tokens } from '@/lib/design-system/tokens'

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
    
    // Pixel-perfect base styling using design tokens
    const baseClasses = `
      relative inline-flex items-center justify-center font-medium 
      transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 
      disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden
    `.replace(/\s+/g, ' ').trim()
    
    // Style object for precise token usage
    const baseStyle = {
      fontFamily: tokens.fontFamilies.primary,
      transitionDuration: tokens.durations.standard,
      transitionTimingFunction: tokens.easings.easeOut,
    }
    
    const variantStyles = {
      primary: {
        backgroundColor: tokens.colors.brand.freela[500],
        color: tokens.colors.brand.neutral.white,
        boxShadow: tokens.shadows.dp2,
        '&:hover': {
          backgroundColor: tokens.colors.brand.freela[600],
          boxShadow: tokens.shadows.dp4,
          transform: `translateY(${tokens.spacing[0.5]}px)`,
        },
        '&:focus-visible': {
          boxShadow: `${tokens.shadows.dp2}, 0 0 0 ${tokens.spacing[1]}px ${tokens.colors.brand.freela[500]}40`,
        }
      },
      secondary: {
        backgroundColor: tokens.colors.brand.empresa[700],
        color: tokens.colors.brand.neutral.white,
        boxShadow: tokens.shadows.dp2,
        '&:hover': {
          backgroundColor: tokens.colors.brand.empresa[800],
          boxShadow: tokens.shadows.dp4,
          transform: `translateY(-${tokens.spacing[0.5]}px)`,
        }
      },
      outline: {
        border: `2px solid ${tokens.colors.brand.freela[500]}`,
        backgroundColor: 'transparent',
        color: tokens.colors.brand.freela[500],
        '&:hover': {
          backgroundColor: tokens.colors.brand.freela[500],
          color: tokens.colors.brand.neutral.white,
        }
      },
      ghost: {
        backgroundColor: 'transparent',
        color: tokens.colors.gray[700],
        '&:hover': {
          backgroundColor: tokens.colors.gray[100],
        }
      },
      gradient: {
        background: `linear-gradient(135deg, ${tokens.colors.brand.freela[500]}, ${tokens.colors.brand.empresa[600]})`,
        color: tokens.colors.brand.neutral.white,
        boxShadow: tokens.shadows.dp6,
        '&:hover': {
          boxShadow: tokens.shadows.dp12,
          transform: `translateY(-${tokens.spacing[1]}px)`,
        }
      },
      glass: {
        backgroundColor: `${tokens.colors.brand.neutral.white}20`,
        backdropFilter: 'blur(12px)',
        border: `1px solid ${tokens.colors.brand.neutral.white}30`,
        color: tokens.colors.brand.neutral.white,
        '&:hover': {
          backgroundColor: `${tokens.colors.brand.neutral.white}30`,
        }
      },
      glow: {
        backgroundColor: tokens.colors.brand.freela[500],
        color: tokens.colors.brand.neutral.white,
        boxShadow: tokens.glows.freela,
        '&:hover': {
          boxShadow: tokens.glows.empresa,
        }
      }
    }
    
    // Pixel-perfect sizing using 8px grid
    const sizeStyles = {
      xs: {
        paddingLeft: tokens.spacing[2],    // 8px
        paddingRight: tokens.spacing[2],   // 8px
        paddingTop: tokens.spacing[1],     // 4px
        paddingBottom: tokens.spacing[1],  // 4px
        fontSize: tokens.typography.xs.size,
        lineHeight: tokens.typography.xs.lineHeight,
        letterSpacing: tokens.typography.xs.letterSpacing,
        gap: tokens.spacing[1],            // 4px
        minHeight: tokens.spacing[6],      // 24px
      },
      sm: {
        paddingLeft: tokens.spacing[3],    // 12px
        paddingRight: tokens.spacing[3],   // 12px
        paddingTop: tokens.spacing[1.5],   // 6px
        paddingBottom: tokens.spacing[1.5],// 6px
        fontSize: tokens.typography.sm.size,
        lineHeight: tokens.typography.sm.lineHeight,
        letterSpacing: tokens.typography.sm.letterSpacing,
        gap: tokens.spacing[1.5],          // 6px
        minHeight: tokens.spacing[8],      // 32px
      },
      md: {
        paddingLeft: tokens.spacing[4],    // 16px
        paddingRight: tokens.spacing[4],   // 16px
        paddingTop: tokens.spacing[2.5],   // 10px
        paddingBottom: tokens.spacing[2.5],// 10px
        fontSize: tokens.typography.base.size,
        lineHeight: tokens.typography.base.lineHeight,
        letterSpacing: tokens.typography.base.letterSpacing,
        gap: tokens.spacing[2],            // 8px
        minHeight: tokens.spacing[10],     // 40px
      },
      lg: {
        paddingLeft: tokens.spacing[6],    // 24px
        paddingRight: tokens.spacing[6],   // 24px
        paddingTop: tokens.spacing[3],     // 12px
        paddingBottom: tokens.spacing[3],  // 12px
        fontSize: tokens.typography.lg.size,
        lineHeight: tokens.typography.lg.lineHeight,
        letterSpacing: tokens.typography.lg.letterSpacing,
        gap: tokens.spacing[2.5],          // 10px
        minHeight: tokens.spacing[12],     // 48px
      },
      xl: {
        paddingLeft: tokens.spacing[8],    // 32px
        paddingRight: tokens.spacing[8],   // 32px
        paddingTop: tokens.spacing[4],     // 16px
        paddingBottom: tokens.spacing[4],  // 16px
        fontSize: tokens.typography.xl.size,
        lineHeight: tokens.typography.xl.lineHeight,
        letterSpacing: tokens.typography.xl.letterSpacing,
        gap: tokens.spacing[3],            // 12px
        minHeight: tokens.spacing[14],     // 56px
      },
    }

    const roundedStyles = {
      sm: { borderRadius: tokens.spacing[1] },    // 4px
      md: { borderRadius: tokens.spacing[1.5] },  // 6px
      lg: { borderRadius: tokens.spacing[2] },    // 8px
      xl: { borderRadius: tokens.spacing[3] },    // 12px
      full: { borderRadius: '9999px' }
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

    // Pixel-perfect animations using design tokens
    const animationVariants = {
      scale: {
        whileHover: !disabled && !loading ? { 
          scale: 1.02,
          transition: { 
            duration: Number(tokens.durations.fast.replace('ms', '')) / 1000,
            ease: tokens.springs.gentle.ease 
          }
        } : {},
        whileTap: !disabled && !loading ? { 
          scale: 0.98,
          transition: { 
            duration: Number(tokens.durations.faster.replace('ms', '')) / 1000,
            ease: tokens.springs.snappy.ease 
          }
        } : {},
      },
      shine: {
        whileHover: !disabled && !loading ? {
          transition: { 
            duration: Number(tokens.durations.standard.replace('ms', '')) / 1000,
            ease: tokens.easings.easeOut 
          }
        } : {},
      },
      pulse: {
        animate: !disabled && !loading ? { 
          scale: [1, 1.02, 1],
          transition: { 
            duration: Number(tokens.durations.slow.replace('ms', '')) / 1000 * 2,
            repeat: Infinity,
            ease: tokens.easings.easeInOut 
          }
        } : {},
      },
      none: {}
    }

    // Combine all styles for the component
    const combinedStyle = {
      ...baseStyle,
      ...sizeStyles[size],
      ...roundedStyles[rounded],
      ...(fullWidth && { width: '100%' }),
    }

    const MotionButton = motion.button

    return (
      <MotionButton
        className={cn(baseClasses, className)}
        style={combinedStyle}
        ref={ref}
        disabled={disabled || loading}
        {...animationVariants[animation]}
        {...props}
      >
        {/* Shine Effect Overlay */}
        {animation === 'shine' && !disabled && !loading && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
            style={{
              top: `-${tokens.spacing[0.5]}px`,
            }}
            initial={{ x: '-200%' }}
            whileHover={{ x: '200%' }}
            transition={{ 
              duration: Number(tokens.durations.standard.replace('ms', '')) / 1000 * 2.5,
              ease: tokens.easings.easeOut 
            }}
          />
        )}

        {/* Loading Spinner */}
        {loading && (
          <motion.svg
            className="absolute animate-spin"
            style={{
              width: tokens.spacing[5],  // 20px
              height: tokens.spacing[5], // 20px
            }}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              transition: {
                duration: Number(tokens.durations.fast.replace('ms', '')) / 1000
              }
            }}
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
    // Pixel-perfect icon button padding using tokens
    const iconSizeStyles = {
      xs: { 
        padding: tokens.spacing[1],     // 4px
        minWidth: tokens.spacing[6],    // 24px
        minHeight: tokens.spacing[6],   // 24px
      },
      sm: { 
        padding: tokens.spacing[1.5],   // 6px
        minWidth: tokens.spacing[8],    // 32px
        minHeight: tokens.spacing[8],   // 32px
      },
      md: { 
        padding: tokens.spacing[2],     // 8px
        minWidth: tokens.spacing[10],   // 40px
        minHeight: tokens.spacing[10],  // 40px
      },
      lg: { 
        padding: tokens.spacing[2.5],   // 10px
        minWidth: tokens.spacing[12],   // 48px
        minHeight: tokens.spacing[12],  // 48px
      },
      xl: { 
        padding: tokens.spacing[3],     // 12px
        minWidth: tokens.spacing[14],   // 56px
        minHeight: tokens.spacing[14],  // 56px
      },
    }

    return (
      <Button
        ref={ref}
        className={cn('aspect-square', className)}
        style={iconSizeStyles[size]}
        size={size}
        {...props}
      />
    )
  }
)

IconButton.displayName = 'IconButton'

export { Button, IconButton }