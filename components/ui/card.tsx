'use client'

import { motion, HTMLMotionProps } from 'framer-motion'
import { ReactNode } from 'react'
import { clsx } from 'clsx'
import { tokens } from '@/lib/design-system/tokens'

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
  // Pixel-perfect variant styling using design tokens
  const variantStyles = {
    default: {
      backgroundColor: tokens.colors.brand.neutral.white,
      boxShadow: tokens.shadows.dp4,
      border: 'none',
    },
    glass: {
      backgroundColor: `${tokens.colors.brand.neutral.white}20`,
      backdropFilter: 'blur(16px)',
      border: `1px solid ${tokens.colors.brand.neutral.white}30`,
      boxShadow: tokens.shadows.glass,
    },
    gradient: {
      background: `linear-gradient(135deg, ${getGradientColors(gradient || 'brand')})`,
      color: tokens.colors.brand.neutral.white,
      boxShadow: tokens.shadows.dp6,
    },
    bordered: {
      backgroundColor: tokens.colors.brand.neutral.white,
      border: `2px solid ${tokens.colors.gray[200]}`,
      boxShadow: 'none',
    },
    elevated: {
      backgroundColor: tokens.colors.brand.neutral.white,
      boxShadow: tokens.shadows.dp12,
    }
  }

  // 8px grid-aligned padding using tokens
  const paddingStyles = {
    none: { padding: 0 },
    sm: { padding: tokens.spacing[4] },  // 16px
    md: { padding: tokens.spacing[6] },  // 24px
    lg: { padding: tokens.spacing[8] },  // 32px
    xl: { padding: tokens.spacing[10] }, // 40px
  }

  // Consistent border radius using spacing tokens
  const roundedStyles = {
    none: { borderRadius: 0 },
    sm: { borderRadius: tokens.spacing[1] },    // 4px
    md: { borderRadius: tokens.spacing[1.5] },  // 6px
    lg: { borderRadius: tokens.spacing[2] },    // 8px
    xl: { borderRadius: tokens.spacing[3] },    // 12px
    '2xl': { borderRadius: tokens.spacing[4] }, // 16px
    '3xl': { borderRadius: tokens.spacing[6] }, // 24px
  }

  // Precise animations using design token timing
  const hoverEffects = {
    lift: {
      whileHover: { 
        y: -Number(tokens.spacing[2]),  // -8px
        boxShadow: tokens.shadows.dp8,
        transition: { 
          duration: Number(tokens.durations.standard.replace('ms', '')) / 1000,
          ease: tokens.easings.easeOut 
        }
      }
    },
    glow: {
      whileHover: { 
        boxShadow: tokens.glows.freela,
        transition: { 
          duration: Number(tokens.durations.standard.replace('ms', '')) / 1000,
          ease: tokens.easings.easeOut 
        }
      }
    },
    scale: {
      whileHover: { 
        scale: 1.02,
        transition: { 
          duration: Number(tokens.durations.fast.replace('ms', '')) / 1000,
          ease: tokens.springs.gentle.ease 
        }
      }
    },
    tilt: {
      whileHover: { 
        rotateY: 3,
        rotateX: 3,
        transition: { 
          duration: Number(tokens.durations.standard.replace('ms', '')) / 1000,
          ease: tokens.springs.gentle.ease 
        }
      }
    },
    none: {}
  }

  function getGradientColors(type: string): string {
    const gradientColors = {
      freela: `${tokens.colors.brand.freela[400]}, ${tokens.colors.brand.freela[600]}`,
      empresa: `${tokens.colors.brand.empresa[700]}, ${tokens.colors.brand.empresa[900]}`,
      institucional: `${tokens.colors.brand.institucional[300]}, ${tokens.colors.brand.institucional[500]}`,
      brand: `${tokens.colors.brand.freela[500]}, ${tokens.colors.brand.empresa[600]}`,
      premium: `${tokens.colors.accent.purple[500]}, ${tokens.colors.accent.pink[500]}`
    }
    return gradientColors[type as keyof typeof gradientColors] || gradientColors.brand
  }

  // Combine all styles for pixel-perfect rendering
  const combinedStyle = {
    ...variantStyles[variant],
    ...paddingStyles[padding],
    ...roundedStyles[rounded],
    position: 'relative' as const,
    overflow: 'hidden' as const,
  }

  return (
    <motion.div
      className={clsx('transition-all', className)}
      style={combinedStyle}
      initial={{ 
        opacity: 0, 
        y: Number(tokens.spacing[5])  // 20px
      }}
      animate={{ 
        opacity: 1, 
        y: 0 
      }}
      transition={{ 
        duration: Number(tokens.durations.slower.replace('ms', '')) / 1000,
        ease: tokens.easings.easeOut 
      }}
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
  const headerStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: tokens.spacing[4], // 16px
  }

  const contentStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: tokens.spacing[3], // 12px
  }

  const titleStyle = {
    fontSize: tokens.typography.lg.size,
    fontWeight: tokens.fontWeights.semibold,
    lineHeight: tokens.typography.lg.lineHeight,
    letterSpacing: tokens.typography.lg.letterSpacing,
    color: tokens.colors.gray[900],
    margin: 0,
  }

  const subtitleStyle = {
    fontSize: tokens.typography.sm.size,
    lineHeight: tokens.typography.sm.lineHeight,
    letterSpacing: tokens.typography.sm.letterSpacing,
    color: tokens.colors.gray[500],
    marginTop: tokens.spacing[0.5], // 2px
    margin: 0,
  }

  return (
    <div className={className} style={headerStyle}>
      <div style={contentStyle}>
        {icon && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              duration: Number(tokens.durations.slower.replace('ms', '')) / 1000, 
              type: 'spring',
              ...tokens.springs.bouncy 
            }}
            style={{ flexShrink: 0 }}
          >
            {icon}
          </motion.div>
        )}
        <div>
          {title && (
            <h3 style={titleStyle}>{title}</h3>
          )}
          {subtitle && (
            <p style={subtitleStyle}>{subtitle}</p>
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
  const contentStyle = {
    color: tokens.colors.gray[600],
    fontSize: tokens.typography.base.size,
    lineHeight: tokens.typography.base.lineHeight,
    letterSpacing: tokens.typography.base.letterSpacing,
  }

  return (
    <div className={className} style={contentStyle}>
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
  const footerStyle = {
    marginTop: tokens.spacing[6], // 24px
    ...(divider && {
      paddingTop: tokens.spacing[4],      // 16px
      borderTop: `1px solid ${tokens.colors.gray[200]}`,
    })
  }

  return (
    <div className={className} style={footerStyle}>
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
  const containerStyle = {
    height: '100%',
  }

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        y: Number(tokens.spacing[7.5]) // 30px
      }}
      animate={{ 
        opacity: 1, 
        y: 0 
      }}
      transition={{ 
        duration: Number(tokens.durations.slower.replace('ms', '')) / 1000, 
        delay,
        ease: tokens.easings.easeOut 
      }}
      whileHover={{ 
        y: -Number(tokens.spacing[1.25]), // -5px
        transition: {
          duration: Number(tokens.durations.fast.replace('ms', '')) / 1000,
          ease: tokens.springs.gentle.ease
        }
      }}
      style={containerStyle}
    >
      <Card
        variant={highlight ? 'gradient' : 'default'}
        hover="lift"
        className="h-full flex flex-col"
        style={{
          color: highlight ? tokens.colors.brand.neutral.white : 'inherit'
        }}
        gradient={highlight ? 'brand' : undefined}
      >
        {/* Icon */}
        <motion.div
          whileHover={{ 
            scale: 1.05, 
            rotate: 3,
            transition: {
              duration: Number(tokens.durations.fast.replace('ms', '')) / 1000,
              ease: tokens.springs.gentle.ease
            }
          }}
          transition={{ 
            type: 'spring', 
            ...tokens.springs.snappy 
          }}
          style={{
            width: tokens.spacing[14],      // 56px (14 * 4px)
            height: tokens.spacing[14],     // 56px 
            borderRadius: tokens.spacing[3], // 12px
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: tokens.spacing[4], // 16px
            ...(highlight ? {
              backgroundColor: `${tokens.colors.brand.neutral.white}20`,
              backdropFilter: 'blur(8px)'
            } : {
              background: `linear-gradient(135deg, ${tokens.colors.brand.freela[500]}10, ${tokens.colors.brand.empresa[600]}10)`
            })
          }}
        >
          <div style={{
            color: highlight 
              ? tokens.colors.brand.neutral.white 
              : tokens.colors.brand.freela[500]
          }}>
            {icon}
          </div>
        </motion.div>

        {/* Content */}
        <h3 style={{
          fontSize: tokens.typography.xl.size,
          fontWeight: tokens.fontWeights.bold,
          lineHeight: tokens.typography.xl.lineHeight,
          letterSpacing: tokens.typography.xl.letterSpacing,
          marginBottom: tokens.spacing[2], // 8px
          color: highlight 
            ? tokens.colors.brand.neutral.white 
            : tokens.colors.gray[900],
          margin: `0 0 ${tokens.spacing[2]}px 0`
        }}>
          {title}
        </h3>
        <p style={{
          fontSize: tokens.typography.base.size,
          lineHeight: tokens.typography.base.lineHeight,
          letterSpacing: tokens.typography.base.letterSpacing,
          marginBottom: tokens.spacing[4], // 16px
          flexGrow: 1,
          color: highlight 
            ? `${tokens.colors.brand.neutral.white}90` 
            : tokens.colors.gray[600],
          margin: `0 0 ${tokens.spacing[4]}px 0`
        }}>
          {description}
        </p>

        {/* Features List */}
        {features && features.length > 0 && (
          <ul style={{
            display: 'flex',
            flexDirection: 'column',
            gap: tokens.spacing[2], // 8px
            marginBottom: tokens.spacing[4], // 16px
            padding: 0,
            listStyle: 'none',
          }}>
            {features.map((feature, index) => (
              <motion.li
                key={index}
                initial={{ 
                  opacity: 0, 
                  x: -Number(tokens.spacing[5]) // -20px
                }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  delay: delay + 0.1 * (index + 1),
                  duration: Number(tokens.durations.fast.replace('ms', '')) / 1000,
                  ease: tokens.easings.easeOut
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: tokens.typography.sm.size,
                  lineHeight: tokens.typography.sm.lineHeight,
                  color: highlight 
                    ? `${tokens.colors.brand.neutral.white}80` 
                    : tokens.colors.gray[500]
                }}
              >
                <svg
                  style={{
                    width: tokens.spacing[4],  // 16px
                    height: tokens.spacing[4], // 16px
                    marginRight: tokens.spacing[2], // 8px
                    flexShrink: 0
                  }}
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
            whileHover={{ 
              scale: 1.02,
              transition: {
                duration: Number(tokens.durations.fast.replace('ms', '')) / 1000,
                ease: tokens.springs.gentle.ease
              }
            }}
            whileTap={{ 
              scale: 0.98,
              transition: {
                duration: Number(tokens.durations.faster.replace('ms', '')) / 1000,
                ease: tokens.springs.snappy.ease
              }
            }}
            onClick={action.onClick}
            style={{
              marginTop: 'auto',
              width: '100%',
              paddingTop: tokens.spacing[2],    // 8px
              paddingBottom: tokens.spacing[2], // 8px
              paddingLeft: tokens.spacing[4],   // 16px
              paddingRight: tokens.spacing[4],  // 16px
              borderRadius: tokens.spacing[2],  // 8px
              fontWeight: tokens.fontWeights.semibold,
              fontSize: tokens.typography.base.size,
              lineHeight: tokens.typography.base.lineHeight,
              border: 'none',
              cursor: 'pointer',
              transition: `all ${tokens.durations.standard}`,
              ...(highlight ? {
                backgroundColor: `${tokens.colors.brand.neutral.white}20`,
                backdropFilter: 'blur(8px)',
                color: tokens.colors.brand.neutral.white,
              } : {
                background: `linear-gradient(135deg, ${tokens.colors.brand.freela[500]}, ${tokens.colors.brand.empresa[600]})`,
                color: tokens.colors.brand.neutral.white,
                boxShadow: tokens.shadows.dp2,
              }),
              '&:hover': {
                ...(highlight ? {
                  backgroundColor: `${tokens.colors.brand.neutral.white}30`,
                } : {
                  boxShadow: tokens.shadows.dp4,
                })
              }
            }}
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