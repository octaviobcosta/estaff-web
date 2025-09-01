'use client'

import { HTMLAttributes, forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

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
    
    const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-300'
    
    const variantClasses = {
      default: 'bg-gray-100 text-gray-700',
      primary: 'bg-freela text-white',
      secondary: 'bg-empresa text-white',
      success: 'bg-green-500 text-white',
      warning: 'bg-yellow-500 text-white',
      danger: 'bg-red-500 text-white',
      gradient: `bg-gradient-to-r text-white ${getGradient(gradient)}`
    }
    
    const sizeClasses = {
      xs: 'px-2 py-0.5 text-xs',
      sm: 'px-2.5 py-0.5 text-sm',
      md: 'px-3 py-1 text-base',
      lg: 'px-4 py-1.5 text-lg'
    }

    const roundedClasses = {
      sm: 'rounded',
      md: 'rounded-md',
      lg: 'rounded-lg',
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

    const animationProps = animated ? {
      initial: { scale: 0, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      transition: { type: 'spring', stiffness: 500, damping: 15 }
    } : {}

    if (animated) {
      // Filter out HTML-specific props that conflict with Framer Motion
      const { onDrag, onDragEnd, onDragStart, ...motionProps } = props as any
      
      return (
        <motion.span
          ref={ref}
          className={cn(
            baseClasses,
            variantClasses[variant],
            sizeClasses[size],
            roundedClasses[rounded],
            pulse && 'animate-pulse',
            className
          )}
          {...animationProps}
          {...motionProps}
        >
          {children}
        </motion.span>
      )
    }

    return (
      <span
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          roundedClasses[rounded],
          pulse && 'animate-pulse',
          className
        )}
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
    const statusConfig = {
      online: { color: 'bg-green-500', label: 'Online' },
      offline: { color: 'bg-gray-400', label: 'Offline' },
      away: { color: 'bg-yellow-500', label: 'Ausente' },
      busy: { color: 'bg-red-500', label: 'Ocupado' }
    }

    const config = statusConfig[status]

    if (showLabel) {
      return (
        <Badge
          ref={ref}
          className={cn('gap-1.5', className)}
          {...props}
        >
          <span className={cn('w-2 h-2 rounded-full', config.color)} />
          {config.label}
        </Badge>
      )
    }

    return (
      <span
        ref={ref}
        className={cn(
          'inline-block w-3 h-3 rounded-full',
          config.color,
          status === 'online' && 'animate-pulse',
          className
        )}
        {...props}
      />
    )
  }
)

StatusBadge.displayName = 'StatusBadge'

export { Badge, NotificationBadge, StatusBadge }