'use client'

import React, { forwardRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertCircle, Check, Eye, EyeOff } from 'lucide-react'
import { tokens } from '@/lib/design-system/tokens'

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

    // Pixel-perfect size variants using design tokens
    const sizeStyles = {
      sm: {
        height: tokens.spacing[9],           // 36px
        paddingLeft: tokens.spacing[3],      // 12px
        paddingRight: tokens.spacing[3],     // 12px
        fontSize: tokens.typography.sm.size,
        lineHeight: tokens.typography.sm.lineHeight,
        letterSpacing: tokens.typography.sm.letterSpacing,
      },
      md: {
        height: tokens.spacing[11],          // 44px
        paddingLeft: tokens.spacing[4],      // 16px
        paddingRight: tokens.spacing[4],     // 16px
        fontSize: tokens.typography.base.size,
        lineHeight: tokens.typography.base.lineHeight,
        letterSpacing: tokens.typography.base.letterSpacing,
      },
      lg: {
        height: tokens.spacing[13],          // 52px
        paddingLeft: tokens.spacing[5],      // 20px
        paddingRight: tokens.spacing[5],     // 20px
        fontSize: tokens.typography.lg.size,
        lineHeight: tokens.typography.lg.lineHeight,
        letterSpacing: tokens.typography.lg.letterSpacing,
      }
    }

    // Base input styling with design tokens
    const baseStyle = {
      position: 'relative' as const,
      width: fullWidth ? '100%' : 'auto',
      borderRadius: tokens.spacing[2],  // 8px
      border: `1px solid ${tokens.colors.gray[200]}`,
      backgroundColor: tokens.colors.brand.neutral.white,
      fontFamily: tokens.fontFamilies.primary,
      fontWeight: tokens.fontWeights.normal,
      transition: `all ${tokens.durations.standard} ${tokens.easings.easeOut}`,
      color: tokens.colors.gray[900],
      ...sizeStyles[size],
      '&:focus': {
        outline: 'none',
        boxShadow: `0 0 0 ${tokens.spacing[1]}px`,  // 4px ring
      },
      '&::placeholder': {
        color: tokens.colors.gray[400],
      },
      ...(leftIcon && {
        paddingLeft: tokens.spacing[10],  // 40px
      }),
      ...((rightIcon || isPassword) && {
        paddingRight: tokens.spacing[10], // 40px
      }),
      ...(disabled && {
        opacity: 0.5,
        cursor: 'not-allowed',
        backgroundColor: tokens.colors.gray[50],
      })
    }

    // Variant-specific focus styles
    const variantFocusStyles = {
      freela: {
        '&:focus': {
          ...baseStyle['&:focus'],
          borderColor: tokens.colors.brand.freela[500],
          boxShadow: `0 0 0 ${tokens.spacing[1]}px ${tokens.colors.brand.freela[500]}20`,
        }
      },
      empresa: {
        '&:focus': {
          ...baseStyle['&:focus'],
          borderColor: tokens.colors.brand.empresa[500],
          boxShadow: `0 0 0 ${tokens.spacing[1]}px ${tokens.colors.brand.empresa[500]}20`,
        }
      },
      institucional: {
        '&:focus': {
          ...baseStyle['&:focus'],
          borderColor: tokens.colors.brand.institucional[500],
          boxShadow: `0 0 0 ${tokens.spacing[1]}px ${tokens.colors.brand.institucional[500]}20`,
        }
      },
      default: {
        '&:focus': {
          ...baseStyle['&:focus'],
          borderColor: tokens.colors.gray[500],
          boxShadow: `0 0 0 ${tokens.spacing[1]}px ${tokens.colors.gray[500]}20`,
        }
      }
    }

    // State-specific styling
    const stateStyle = {
      ...(error && {
        borderColor: tokens.colors.semantic.error[500],
        '&:focus': {
          borderColor: tokens.colors.semantic.error[500],
          boxShadow: `0 0 0 ${tokens.spacing[1]}px ${tokens.colors.semantic.error[500]}20`,
        }
      }),
      ...(success && {
        borderColor: tokens.colors.semantic.success[500],
        '&:focus': {
          borderColor: tokens.colors.semantic.success[500],
          boxShadow: `0 0 0 ${tokens.spacing[1]}px ${tokens.colors.semantic.success[500]}20`,
        }
      }),
    }

    // Combine all styles
    const combinedStyle = {
      ...baseStyle,
      ...(!error && !success && variantFocusStyles[variant]),
      ...stateStyle,
    }

    const inputType = isPassword && showPassword ? 'text' : type

    // Label styling with tokens
    const labelStyle = {
      display: 'block',
      fontSize: tokens.typography.sm.size,
      fontWeight: tokens.fontWeights.medium,
      lineHeight: tokens.typography.sm.lineHeight,
      color: tokens.colors.gray[700],
      marginBottom: tokens.spacing[1.5], // 6px
      fontFamily: tokens.fontFamilies.primary,
    }

    // Icon container styling with tokens
    const iconContainerStyle = {
      position: 'absolute' as const,
      top: '50%',
      transform: 'translateY(-50%)',
      display: 'flex',
      alignItems: 'center',
      gap: tokens.spacing[2], // 8px
    }

    // Helper text styling with tokens
    const helperTextStyle = {
      fontSize: tokens.typography.sm.size,
      lineHeight: tokens.typography.sm.lineHeight,
      marginTop: tokens.spacing[1.5], // 6px
      fontFamily: tokens.fontFamilies.primary,
    }

    return (
      <div style={{ 
        position: 'relative',
        width: fullWidth ? '100%' : 'auto' 
      }}>
        {label && (
          <motion.label
            initial={{ opacity: 0, y: -Number(tokens.spacing[1.25]) }} // -5px
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: Number(tokens.durations.fast.replace('ms', '')) / 1000,
              ease: tokens.easings.easeOut
            }}
            style={labelStyle}
          >
            {label}
          </motion.label>
        )}
        
        <div style={{ position: 'relative' }}>
          {leftIcon && (
            <div style={{
              ...iconContainerStyle,
              left: tokens.spacing[3], // 12px
              color: tokens.colors.gray[400],
            }}>
              {leftIcon}
            </div>
          )}
          
          <motion.input
            ref={ref}
            type={inputType}
            className={className}
            style={combinedStyle}
            disabled={disabled}
            whileFocus={{ 
              scale: 1.005,
              transition: {
                duration: Number(tokens.durations.fast.replace('ms', '')) / 1000,
                ease: tokens.easings.easeOut
              }
            }}
            {...props}
          />
          
          {(rightIcon || isPassword || error || success) && (
            <div style={{
              ...iconContainerStyle,
              right: tokens.spacing[3], // 12px
            }}>
              {isPassword && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    color: tokens.colors.gray[400],
                    transition: `color ${tokens.durations.fast}`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = tokens.colors.gray[600]
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = tokens.colors.gray[400]
                  }}
                >
                  {showPassword ? 
                    <EyeOff size={Number(tokens.spacing[4.5])} /> : // 18px
                    <Eye size={Number(tokens.spacing[4.5])} />
                  }
                </button>
              )}
              {error && (
                <AlertCircle 
                  style={{ color: tokens.colors.semantic.error[500] }}
                  size={Number(tokens.spacing[4.5])} // 18px
                />
              )}
              {success && (
                <Check 
                  style={{ color: tokens.colors.semantic.success[500] }}
                  size={Number(tokens.spacing[4.5])} // 18px
                />
              )}
              {!isPassword && !error && !success && rightIcon}
            </div>
          )}
        </div>

        <AnimatePresence>
          {(error || helperText) && (
            <motion.p
              initial={{ 
                opacity: 0, 
                y: -Number(tokens.spacing[1.25]) // -5px
              }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ 
                opacity: 0, 
                y: -Number(tokens.spacing[1.25]) // -5px
              }}
              transition={{
                duration: Number(tokens.durations.fast.replace('ms', '')) / 1000,
                ease: tokens.easings.easeOut
              }}
              style={{
                ...helperTextStyle,
                color: error 
                  ? tokens.colors.semantic.error[500] 
                  : tokens.colors.gray[500]
              }}
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