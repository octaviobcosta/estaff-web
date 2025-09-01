'use client'

import { motion, HTMLMotionProps } from 'framer-motion'
import { ReactNode } from 'react'
import { clsx } from 'clsx'

interface CardProps extends HTMLMotionProps<"div"> {
  children: ReactNode
  variant?: 'default' | 'glass' | 'gradient' | 'bordered' | 'elevated'
  hover?: 'lift' | 'glow' | 'scale' | 'tilt' | 'none'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
  gradient?: 'freela' | 'empresa' | 'institucional' | 'brand' | 'premium'
  className?: string
}

export function Card({
  children,
  variant = 'default',
  hover = 'lift',
  padding = 'md',
  rounded = '2xl',
  gradient,
  className,
  ...props
}: CardProps) {
  const variants = {
    default: 'bg-white shadow-lg',
    glass: 'glass',
    gradient: `bg-gradient-to-br ${getGradient(gradient || 'brand')}`,
    bordered: 'bg-white border-2 border-gray-200',
    elevated: 'bg-white shadow-premium'
  }

  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  }

  const roundeds = {
    none: '',
    sm: 'rounded',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl'
  }

  const hoverEffects = {
    lift: {
      whileHover: { y: -8, transition: { duration: 0.3 } }
    },
    glow: {
      whileHover: { 
        boxShadow: '0 0 40px rgba(236, 68, 100, 0.3)',
        transition: { duration: 0.3 }
      }
    },
    scale: {
      whileHover: { scale: 1.05, transition: { duration: 0.3 } }
    },
    tilt: {
      whileHover: { 
        rotateY: 5,
        rotateX: 5,
        transition: { duration: 0.3 }
      }
    },
    none: {}
  }

  function getGradient(type: string) {
    const gradients = {
      freela: 'from-freela-400 to-freela-600',
      empresa: 'from-empresa-700 to-empresa-900',
      institucional: 'from-institucional-300 to-institucional-500',
      brand: 'from-freela to-empresa',
      premium: 'from-purple-500 to-pink-500'
    }
    return gradients[type as keyof typeof gradients] || gradients.brand
  }

  return (
    <motion.div
      className={clsx(
        'relative overflow-hidden transition-all duration-300',
        variants[variant],
        paddings[padding],
        roundeds[rounded],
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      {...hoverEffects[hover]}
      {...props}
    >
      {children}
    </motion.div>
  )
}

interface CardHeaderProps {
  title?: string
  subtitle?: string
  icon?: ReactNode
  action?: ReactNode
  className?: string
}

export function CardHeader({ 
  title, 
  subtitle, 
  icon, 
  action,
  className 
}: CardHeaderProps) {
  return (
    <div className={clsx('flex items-start justify-between mb-4', className)}>
      <div className="flex items-start space-x-3">
        {icon && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="flex-shrink-0"
          >
            {icon}
          </motion.div>
        )}
        <div>
          {title && (
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          )}
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}

interface CardContentProps {
  children: ReactNode
  className?: string
}

export function CardContent({ children, className }: CardContentProps) {
  return (
    <div className={clsx('text-gray-600', className)}>
      {children}
    </div>
  )
}

interface CardFooterProps {
  children: ReactNode
  className?: string
  divider?: boolean
}

export function CardFooter({ 
  children, 
  className,
  divider = false 
}: CardFooterProps) {
  return (
    <div 
      className={clsx(
        'mt-6',
        divider && 'pt-4 border-t border-gray-200',
        className
      )}
    >
      {children}
    </div>
  )
}

// Premium Feature Card Component
interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
  features?: string[]
  action?: {
    text: string
    onClick: () => void
  }
  highlight?: boolean
  delay?: number
}

export function FeatureCard({
  icon,
  title,
  description,
  features,
  action,
  highlight = false,
  delay = 0
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card
        variant={highlight ? 'gradient' : 'default'}
        hover="lift"
        className={clsx(
          'h-full flex flex-col',
          highlight && 'text-white'
        )}
        gradient={highlight ? 'brand' : undefined}
      >
        {/* Icon */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className={clsx(
            'w-14 h-14 rounded-xl flex items-center justify-center mb-4',
            highlight 
              ? 'bg-white/20 backdrop-blur-sm' 
              : 'bg-gradient-to-br from-freela/10 to-empresa/10'
          )}
        >
          <div className={highlight ? 'text-white' : 'text-freela'}>
            {icon}
          </div>
        </motion.div>

        {/* Content */}
        <h3 className={clsx(
          'text-xl font-bold mb-2',
          highlight ? 'text-white' : 'text-gray-900'
        )}>
          {title}
        </h3>
        <p className={clsx(
          'mb-4 flex-grow',
          highlight ? 'text-white/90' : 'text-gray-600'
        )}>
          {description}
        </p>

        {/* Features List */}
        {features && features.length > 0 && (
          <ul className="space-y-2 mb-4">
            {features.map((feature, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: delay + 0.1 * (index + 1) }}
                className={clsx(
                  'flex items-center text-sm',
                  highlight ? 'text-white/80' : 'text-gray-500'
                )}
              >
                <svg
                  className="w-4 h-4 mr-2 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                {feature}
              </motion.li>
            ))}
          </ul>
        )}

        {/* Action */}
        {action && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={action.onClick}
            className={clsx(
              'mt-auto w-full py-2 px-4 rounded-lg font-semibold transition-all duration-300',
              highlight
                ? 'bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white'
                : 'bg-gradient-to-r from-freela to-empresa text-white hover:shadow-lg'
            )}
          >
            {action.text}
          </motion.button>
        )}
      </Card>
    </motion.div>
  )
}

// Interactive 3D Card Component
interface Card3DProps {
  children: ReactNode
  className?: string
}

export function Card3D({ children, className }: Card3DProps) {
  return (
    <motion.div
      className={clsx('perspective-1000', className)}
      whileHover="hover"
      initial="rest"
      animate="rest"
    >
      <motion.div
        className="preserve-3d relative"
        variants={{
          rest: { rotateY: 0, rotateX: 0 },
          hover: { rotateY: 10, rotateX: -10 }
        }}
        transition={{ duration: 0.5, type: 'spring' }}
      >
        <Card variant="elevated" className="relative z-10">
          {children}
        </Card>
        {/* Shadow/Reflection */}
        <div className="absolute inset-0 bg-gradient-to-br from-freela/20 to-empresa/20 blur-2xl -z-10 translate-z-[-50px]" />
      </motion.div>
    </motion.div>
  )
}