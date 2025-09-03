/**
 * Component Factory Utilities
 * Advanced utilities for creating design system components
 */

import { forwardRef, ComponentPropsWithoutRef, ElementType } from 'react'
import { cn } from '@/lib/utils'
import { tokens } from '../tokens'
import { createVariant, createSpacingStyle, createTypographyStyle } from './index'

// Type utilities for polymorphic components
export type AsProp<C extends ElementType> = {
  as?: C
}

export type PropsToOmit<C extends ElementType, P> = keyof (AsProp<C> & P)

export type PolymorphicComponentProp<
  C extends ElementType,
  Props = {}
> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>

export type PolymorphicRef<C extends ElementType> = React.ComponentPropsWithRef<C>['ref']

export type PolymorphicComponentPropWithRef<
  C extends ElementType,
  Props = {}
> = PolymorphicComponentProp<C, Props> & { ref?: PolymorphicRef<C> }

// Base component factory
export function createComponent<T extends Record<string, any>>(
  displayName: string,
  baseStyles: string,
  variants?: T
) {
  const Component = forwardRef<HTMLElement, any>(
    ({ as: Element = 'div', className, variant, children, ...props }, ref) => {
      const variantClasses = variant && variants ? variants[variant] : ''
      
      return (
        <Element
          ref={ref}
          className={cn(baseStyles, variantClasses, className)}
          {...props}
        >
          {children}
        </Element>
      )
    }
  )
  
  Component.displayName = displayName
  return Component
}

// Styled component factory with tokens
export function createStyledComponent<
  C extends ElementType = 'div',
  V extends Record<string, any> = {}
>(
  config: {
    as?: C
    displayName: string
    baseStyles: Record<string, any>
    variants?: V
    defaultVariant?: keyof V
  }
) {
  type ComponentProps = PolymorphicComponentPropWithRef<
    C,
    {
      variant?: keyof V
    }
  >

  const Component = forwardRef<PolymorphicRef<C>, ComponentProps>(
    ({ as, className, variant, style, ...props }, ref) => {
      const Element = as || config.as || 'div'
      const selectedVariant = variant || config.defaultVariant
      
      const computedStyles = {
        ...config.baseStyles,
        ...(selectedVariant && config.variants?.[selectedVariant]),
        ...style,
      }

      return (
        <Element
          ref={ref}
          className={className}
          style={computedStyles}
          {...props}
        />
      )
    }
  )

  Component.displayName = config.displayName
  return Component
}

// Button factory with design system integration
export function createButton(theme: 'freela' | 'empresa' | 'institucional' = 'freela') {
  const themeColors = tokens.colors.brand[theme]
  
  return createStyledComponent({
    as: 'button',
    displayName: `${theme}Button`,
    baseStyles: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: tokens.fontFamilies.primary,
      fontWeight: tokens.fontWeights.medium,
      borderRadius: tokens.spacing[2],
      border: 'none',
      cursor: 'pointer',
      transition: `all ${tokens.durations.standard} ${tokens.easings.easeOut}`,
      '&:focus': {
        outline: 'none',
        boxShadow: `0 0 0 2px ${themeColors[500]}40`,
      },
      '&:disabled': {
        opacity: 0.5,
        cursor: 'not-allowed',
      },
    },
    variants: {
      primary: {
        backgroundColor: themeColors[500],
        color: tokens.colors.brand.neutral.white,
        padding: `${tokens.spacing[2.5]} ${tokens.spacing[4]}`,
        fontSize: tokens.typography.base.size,
        '&:hover:not(:disabled)': {
          backgroundColor: themeColors[600],
          transform: 'translateY(-1px)',
          boxShadow: tokens.shadows.dp4,
        },
      },
      secondary: {
        backgroundColor: 'transparent',
        color: themeColors[500],
        border: `2px solid ${themeColors[500]}`,
        padding: `${tokens.spacing[2]} ${tokens.spacing[3.5]}`,
        fontSize: tokens.typography.base.size,
        '&:hover:not(:disabled)': {
          backgroundColor: themeColors[500],
          color: tokens.colors.brand.neutral.white,
        },
      },
      ghost: {
        backgroundColor: 'transparent',
        color: tokens.colors.gray[700],
        padding: `${tokens.spacing[2]} ${tokens.spacing[3]}`,
        fontSize: tokens.typography.sm.size,
        '&:hover:not(:disabled)': {
          backgroundColor: tokens.colors.gray[100],
        },
      },
    },
    defaultVariant: 'primary',
  })
}

// Input factory
export function createInput(theme: 'freela' | 'empresa' | 'institucional' = 'freela') {
  const themeColors = tokens.colors.brand[theme]
  
  return createStyledComponent({
    as: 'input',
    displayName: `${theme}Input`,
    baseStyles: {
      width: '100%',
      fontFamily: tokens.fontFamilies.primary,
      fontSize: tokens.typography.base.size,
      lineHeight: tokens.typography.base.lineHeight,
      borderRadius: tokens.spacing[1.5],
      border: `1px solid ${tokens.colors.gray[300]}`,
      transition: `all ${tokens.durations.standard} ${tokens.easings.easeOut}`,
      '&:focus': {
        outline: 'none',
        borderColor: themeColors[500],
        boxShadow: `0 0 0 1px ${themeColors[500]}`,
      },
      '&:disabled': {
        backgroundColor: tokens.colors.gray[50],
        cursor: 'not-allowed',
      },
      '&::placeholder': {
        color: tokens.colors.gray[500],
      },
    },
    variants: {
      sm: {
        padding: `${tokens.spacing[1.5]} ${tokens.spacing[3]}`,
        fontSize: tokens.typography.sm.size,
      },
      md: {
        padding: `${tokens.spacing[2.5]} ${tokens.spacing[3.5]}`,
        fontSize: tokens.typography.base.size,
      },
      lg: {
        padding: `${tokens.spacing[3]} ${tokens.spacing[4]}`,
        fontSize: tokens.typography.lg.size,
      },
    },
    defaultVariant: 'md',
  })
}

// Card factory
export function createCard() {
  return createStyledComponent({
    displayName: 'Card',
    baseStyles: {
      backgroundColor: tokens.colors.brand.neutral.white,
      borderRadius: tokens.spacing[3],
      border: `1px solid ${tokens.colors.gray[200]}`,
      transition: `all ${tokens.durations.standard} ${tokens.easings.easeOut}`,
    },
    variants: {
      flat: {
        boxShadow: 'none',
      },
      elevated: {
        boxShadow: tokens.shadows.dp2,
        '&:hover': {
          boxShadow: tokens.shadows.dp4,
          transform: 'translateY(-1px)',
        },
      },
      glass: {
        backgroundColor: `${tokens.colors.brand.neutral.white}90`,
        backdropFilter: 'blur(10px)',
        border: `1px solid ${tokens.colors.brand.neutral.white}30`,
      },
    },
    defaultVariant: 'elevated',
  })
}

// Typography factory
export function createText() {
  return createStyledComponent({
    displayName: 'Text',
    baseStyles: {
      margin: 0,
      fontFamily: tokens.fontFamilies.primary,
      color: tokens.colors.gray[900],
    },
    variants: {
      xs: createTypographyStyle('xs'),
      sm: createTypographyStyle('sm'),
      base: createTypographyStyle('base'),
      lg: createTypographyStyle('lg'),
      xl: createTypographyStyle('xl'),
      '2xl': createTypographyStyle('2xl'),
      '3xl': createTypographyStyle('3xl'),
      '4xl': createTypographyStyle('4xl'),
    },
    defaultVariant: 'base',
  })
}

// Container factory with responsive behavior
export function createContainer() {
  return createStyledComponent({
    displayName: 'Container',
    baseStyles: {
      width: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',
      paddingLeft: tokens.spacing[4],
      paddingRight: tokens.spacing[4],
    },
    variants: {
      sm: {
        maxWidth: `${tokens.containers.sm}px`,
      },
      md: {
        maxWidth: `${tokens.containers.md}px`,
      },
      lg: {
        maxWidth: `${tokens.containers.lg}px`,
      },
      xl: {
        maxWidth: `${tokens.containers.xl}px`,
      },
      '2xl': {
        maxWidth: `${tokens.containers['2xl']}px`,
      },
      full: {
        maxWidth: 'none',
      },
    },
    defaultVariant: 'lg',
  })
}

// Box factory for layout primitives
export function createBox() {
  return createStyledComponent({
    displayName: 'Box',
    baseStyles: {},
    variants: {
      // Flexbox variants
      flex: {
        display: 'flex',
      },
      inlineFlex: {
        display: 'inline-flex',
      },
      // Grid variants
      grid: {
        display: 'grid',
      },
      inlineGrid: {
        display: 'inline-grid',
      },
    },
  })
}

// Higher-order component for theme injection
export function withThemeProps<P extends object>(
  Component: React.ComponentType<P>,
  themeProps: Partial<P>
) {
  const ThemedComponent = forwardRef<any, P>((props, ref) => (
    <Component ref={ref} {...themeProps} {...props} />
  ))
  
  ThemedComponent.displayName = `Themed(${Component.displayName || Component.name})`
  
  return ThemedComponent
}

// Compound component factory
export function createCompoundComponent<
  T extends Record<string, React.ComponentType<any>>
>(
  displayName: string,
  components: T
): React.FC & T {
  const CompoundComponent = () => null
  CompoundComponent.displayName = displayName
  
  Object.keys(components).forEach(key => {
    ;(CompoundComponent as any)[key] = components[key as keyof T]
  })
  
  return CompoundComponent as React.FC & T
}

// Animation component factory
export function createAnimatedComponent<C extends ElementType = 'div'>(
  config: {
    as?: C
    displayName: string
    animations: Record<string, any>
    defaultAnimation?: string
  }
) {
  type ComponentProps = PolymorphicComponentPropWithRef<
    C,
    {
      animation?: string
      animate?: boolean
    }
  >

  const Component = forwardRef<PolymorphicRef<C>, ComponentProps>(
    ({ as, animation, animate = true, style, ...props }, ref) => {
      const Element = as || config.as || 'div'
      const selectedAnimation = animation || config.defaultAnimation
      
      const animationStyles = animate && selectedAnimation
        ? config.animations[selectedAnimation]
        : {}

      return (
        <Element
          ref={ref}
          style={{
            ...animationStyles,
            ...style,
          }}
          {...props}
        />
      )
    }
  )

  Component.displayName = config.displayName
  return Component
}

// Export pre-configured component factories
export const ComponentFactories = {
  Button: createButton,
  Input: createInput,
  Card: createCard,
  Text: createText,
  Container: createContainer,
  Box: createBox,
}

export type ComponentFactory = typeof ComponentFactories