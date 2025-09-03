'use client'

import { HTMLAttributes, forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { tokens } from '@/lib/design-system/tokens'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'gradient'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  rounded?: 'sm' | 'md' | 'lg' | 'full'
  animated?: boolean
  pulse?: boolean
  gradient?: 'brand' | 'freela' | 'empresa' | 'institucional' | 'premium'
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ 
    className, 
    variant = 'default', 
    size = 'sm',
    rounded = 'full',
    animated = false,
    pulse = false,
    gradient = 'brand',
    children,
    ...props 
  }, ref) => {
    
    const baseClasses = 'inline-flex items-center justify-center font-medium transition-all'
    
    // Pixel-perfect variant styling using design tokens
    const variantStyles = {
      default: {
        backgroundColor: tokens.colors.gray[100],
        color: tokens.colors.gray[700],
      },
      primary: {
        backgroundColor: tokens.colors.brand.freela[500],
        color: tokens.colors.brand.neutral.white,
      },
      secondary: {
        backgroundColor: tokens.colors.brand.empresa[700],
        color: tokens.colors.brand.neutral.white,
      },
      success: {
        backgroundColor: tokens.colors.semantic.success[500],
        color: tokens.colors.brand.neutral.white,
      },
      warning: {
        backgroundColor: tokens.colors.semantic.warning[500],
        color: tokens.colors.brand.neutral.white,
      },
      danger: {
        backgroundColor: tokens.colors.semantic.error[500],
        color: tokens.colors.brand.neutral.white,
      },
      gradient: {
        background: `linear-gradient(135deg, ${getGradientColors(gradient)})`,
        color: tokens.colors.brand.neutral.white,
      }
    }
    
    // 8px grid-aligned sizing using tokens
    const sizeStyles = {
      xs: {
        paddingLeft: tokens.spacing[2],     // 8px
        paddingRight: tokens.spacing[2],    // 8px
        paddingTop: tokens.spacing[0.5],    // 2px
        paddingBottom: tokens.spacing[0.5], // 2px
        fontSize: tokens.typography.xs.size,
        lineHeight: tokens.typography.xs.lineHeight,
        letterSpacing: tokens.typography.xs.letterSpacing,
        minHeight: tokens.spacing[5],       // 20px
      },
      sm: {
        paddingLeft: tokens.spacing[2.5],   // 10px
        paddingRight: tokens.spacing[2.5],  // 10px
        paddingTop: tokens.spacing[0.5],    // 2px
        paddingBottom: tokens.spacing[0.5], // 2px
        fontSize: tokens.typography.sm.size,
        lineHeight: tokens.typography.sm.lineHeight,
        letterSpacing: tokens.typography.sm.letterSpacing,
        minHeight: tokens.spacing[6],       // 24px
      },
      md: {
        paddingLeft: tokens.spacing[3],     // 12px
        paddingRight: tokens.spacing[3],    // 12px
        paddingTop: tokens.spacing[1],      // 4px
        paddingBottom: tokens.spacing[1],   // 4px
        fontSize: tokens.typography.base.size,
        lineHeight: tokens.typography.base.lineHeight,
        letterSpacing: tokens.typography.base.letterSpacing,
        minHeight: tokens.spacing[8],       // 32px
      },
      lg: {
        paddingLeft: tokens.spacing[4],     // 16px
        paddingRight: tokens.spacing[4],    // 16px
        paddingTop: tokens.spacing[1.5],    // 6px
        paddingBottom: tokens.spacing[1.5], // 6px
        fontSize: tokens.typography.lg.size,
        lineHeight: tokens.typography.lg.lineHeight,
        letterSpacing: tokens.typography.lg.letterSpacing,
        minHeight: tokens.spacing[10],      // 40px
      }
    }

    const roundedStyles = {
      sm: { borderRadius: tokens.spacing[1] },    // 4px
      md: { borderRadius: tokens.spacing[1.5] },  // 6px
      lg: { borderRadius: tokens.spacing[2] },    // 8px
      full: { borderRadius: '9999px' }
    }
    
    function getGradientColors(type: string): string {
      const gradientColors = {
        brand: `${tokens.colors.brand.freela[500]}, ${tokens.colors.brand.empresa[600]}`,
        freela: `${tokens.colors.brand.freela[400]}, ${tokens.colors.brand.freela[600]}`,
        empresa: `${tokens.colors.brand.empresa[700]}, ${tokens.colors.brand.empresa[900]}`,
        institucional: `${tokens.colors.brand.institucional[300]}, ${tokens.colors.brand.institucional[500]}`,
        premium: `${tokens.colors.accent.purple[500]}, ${tokens.colors.accent.pink[500]}`
      }
      return gradientColors[type as keyof typeof gradientColors] || gradientColors.brand
    }

    // Combine all styles for pixel-perfect rendering
    const combinedStyle = {
      ...variantStyles[variant],
      ...sizeStyles[size],
      ...roundedStyles[rounded],
      fontFamily: tokens.fontFamilies.primary,
      fontWeight: tokens.fontWeights.medium,
      transitionDuration: tokens.durations.standard,
      transitionTimingFunction: tokens.easings.easeOut,
    }

    const animationProps = animated ? {
      initial: { scale: 0, opacity: 0 },
      animate: { 
        scale: 1, 
        opacity: 1,
        transition: {
          type: 'spring',
          ...tokens.springs.bouncy,
          duration: Number(tokens.durations.fast.replace('ms', '')) / 1000
        }
      }
    } : {}

    const pulseAnimation = pulse ? {
      animate: {
        opacity: [1, 0.5, 1],
        transition: {
          duration: Number(tokens.durations.slow.replace('ms', '')) / 1000,
          repeat: Infinity,
          ease: tokens.easings.easeInOut
        }
      }
    } : {}

    if (animated) {
      // Filter out HTML-specific props that conflict with Framer Motion
      const { onDrag, onDragEnd, onDragStart, ...motionProps } = props as any
      
      return (
        <motion.span
          ref={ref}
          className={cn(baseClasses, className)}
          style={combinedStyle}
          {...animationProps}
          {...pulseAnimation}
          {...motionProps}
        >
          {children}
        </motion.span>
      )
    }

    return (
      <span
        ref={ref}
        className={cn(baseClasses, pulse && 'animate-pulse', className)}
        style={combinedStyle}
        {...props}
      >
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'

// Notification Badge Component
interface NotificationBadgeProps extends Omit<BadgeProps, 'children'> {
  count: number
  max?: number
}

const NotificationBadge = forwardRef<HTMLSpanElement, NotificationBadgeProps>(
  ({ count, max = 99, ...props }, ref) => {
    const displayCount = count > max ? `${max}+` : count.toString()
    
    return (
      <Badge
        ref={ref}
        variant="primary"
        size="xs"
        animated
        {...props}
      >
        {displayCount}
      </Badge>
    )
  }
)

NotificationBadge.displayName = 'NotificationBadge'

// Status Badge Component
interface StatusBadgeProps extends Omit<BadgeProps, 'children' | 'variant'> {
  status: 'online' | 'offline' | 'away' | 'busy'
  showLabel?: boolean
}

const StatusBadge = forwardRef<HTMLSpanElement, StatusBadgeProps>(
  ({ status, showLabel = false, className, ...props }, ref) => {
    // Pixel-perfect status configuration using design tokens
    const statusConfig = {
      online: { 
        backgroundColor: tokens.colors.semantic.success[500], 
        label: 'Online' 
      },
      offline: { 
        backgroundColor: tokens.colors.gray[400], 
        label: 'Offline' 
      },
      away: { 
        backgroundColor: tokens.colors.semantic.warning[500], 
        label: 'Ausente' 
      },
      busy: { 
        backgroundColor: tokens.colors.semantic.error[500], 
        label: 'Ocupado' 
      }
    }

    const config = statusConfig[status]

    if (showLabel) {
      return (
        <Badge
          ref={ref}
          className={className}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: tokens.spacing[1.5], // 6px
          }}
          {...props}
        >
          <span 
            style={{
              width: tokens.spacing[2],      // 8px
              height: tokens.spacing[2],     // 8px
              borderRadius: '50%',
              backgroundColor: config.backgroundColor,
              flexShrink: 0,
            }}
          />
          {config.label}
        </Badge>
      )
    }

    const dotStyle = {
      display: 'inline-block',
      width: tokens.spacing[3],      // 12px
      height: tokens.spacing[3],     // 12px
      borderRadius: '50%',
      backgroundColor: config.backgroundColor,
      ...(status === 'online' && {
        animation: `pulse ${tokens.durations.slow} infinite`,
      })
    }

    return (
      <span
        ref={ref}
        className={className}
        style={dotStyle}
        {...props}
      />
    )
  }
)

StatusBadge.displayName = 'StatusBadge'

export { Badge, NotificationBadge, StatusBadge }