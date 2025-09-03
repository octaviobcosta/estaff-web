/**
 * Design System Utilities
 * Helper functions and utilities for the design system
 */

import { tokens } from '../tokens'
import type { DesignTokens } from '../tokens'

// Type-safe token getters
export function getSpacing(value: keyof typeof tokens.spacing): string {
  return tokens.spacing[value]
}

export function getColor(path: string): string {
  const keys = path.split('.')
  let current: any = tokens.colors
  
  for (const key of keys) {
    current = current?.[key]
  }
  
  return current || '#000000'
}

export function getTypography(variant: keyof typeof tokens.typography) {
  return tokens.typography[variant]
}

export function getShadow(variant: keyof typeof tokens.shadows): string {
  return tokens.shadows[variant]
}

// CSS-in-JS style generators
export function createSpacingStyle(
  property: 'padding' | 'margin' | 'gap',
  values: {
    top?: keyof typeof tokens.spacing
    right?: keyof typeof tokens.spacing
    bottom?: keyof typeof tokens.spacing
    left?: keyof typeof tokens.spacing
    x?: keyof typeof tokens.spacing
    y?: keyof typeof tokens.spacing
    all?: keyof typeof tokens.spacing
  }
) {
  const style: Record<string, string> = {}
  
  if (values.all) {
    style[property] = getSpacing(values.all)
  } else {
    if (values.x) {
      style[`${property}Left`] = getSpacing(values.x)
      style[`${property}Right`] = getSpacing(values.x)
    }
    if (values.y) {
      style[`${property}Top`] = getSpacing(values.y)
      style[`${property}Bottom`] = getSpacing(values.y)
    }
    if (values.top) style[`${property}Top`] = getSpacing(values.top)
    if (values.right) style[`${property}Right`] = getSpacing(values.right)
    if (values.bottom) style[`${property}Bottom`] = getSpacing(values.bottom)
    if (values.left) style[`${property}Left`] = getSpacing(values.left)
  }
  
  return style
}

export function createTypographyStyle(variant: keyof typeof tokens.typography) {
  const typo = getTypography(variant)
  return {
    fontSize: typo.size,
    lineHeight: typo.lineHeight,
    letterSpacing: typo.letterSpacing,
    fontWeight: typo.fontWeight,
  }
}

// Color manipulation utilities
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

export function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map(x => {
    const hex = x.toString(16)
    return hex.length === 1 ? "0" + hex : hex
  }).join("")
}

export function addAlpha(hex: string, alpha: number): string {
  const rgb = hexToRgb(hex)
  if (!rgb) return hex
  
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`
}

export function lighten(hex: string, amount: number): string {
  const rgb = hexToRgb(hex)
  if (!rgb) return hex
  
  const lighten = (value: number) => Math.min(255, Math.floor(value + (255 - value) * amount))
  
  return rgbToHex(lighten(rgb.r), lighten(rgb.g), lighten(rgb.b))
}

export function darken(hex: string, amount: number): string {
  const rgb = hexToRgb(hex)
  if (!rgb) return hex
  
  const darken = (value: number) => Math.floor(value * (1 - amount))
  
  return rgbToHex(darken(rgb.r), darken(rgb.g), darken(rgb.b))
}

// Responsive utilities
export function createResponsiveStyles<T>(
  styles: {
    base?: T
    sm?: T
    md?: T
    lg?: T
    xl?: T
    '2xl'?: T
  }
): Record<string, T> {
  const result: Record<string, T> = {}
  
  if (styles.base) result['@media (min-width: 0px)'] = styles.base
  if (styles.sm) result[`@media (min-width: ${tokens.breakpoints.sm}px)`] = styles.sm
  if (styles.md) result[`@media (min-width: ${tokens.breakpoints.md}px)`] = styles.md
  if (styles.lg) result[`@media (min-width: ${tokens.breakpoints.lg}px)`] = styles.lg
  if (styles.xl) result[`@media (min-width: ${tokens.breakpoints.xl}px)`] = styles.xl
  if (styles['2xl']) result[`@media (min-width: ${tokens.breakpoints['2xl']}px)`] = styles['2xl']
  
  return result
}

// Component variant utilities
export function createVariant<T extends Record<string, any>>(
  baseStyle: Record<string, any>,
  variants: T
) {
  return function(variant: keyof T) {
    return {
      ...baseStyle,
      ...variants[variant]
    }
  }
}

// Animation utilities
export function createTransition(
  properties: string[] = ['all'],
  duration: keyof typeof tokens.durations = 'standard',
  easing: keyof typeof tokens.easings = 'easeOut'
): string {
  return properties
    .map(prop => `${prop} ${tokens.durations[duration]} ${tokens.easings[easing]}`)
    .join(', ')
}

export function parseSpringConfig(spring: keyof typeof tokens.springs) {
  const config = tokens.springs[spring]
  
  // Convert to Framer Motion format
  return {
    type: "spring",
    damping: config.damping,
    stiffness: config.stiffness,
    mass: config.mass || 1,
  }
}

// Layout utilities
export function createGridStyles(
  cols: number,
  gap: keyof typeof tokens.spacing = 4,
  responsive?: {
    sm?: number
    md?: number
    lg?: number
  }
) {
  const baseStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${cols}, 1fr)`,
    gap: getSpacing(gap)
  }
  
  if (responsive) {
    return {
      ...baseStyle,
      ...createResponsiveStyles({
        sm: responsive.sm ? { gridTemplateColumns: `repeat(${responsive.sm}, 1fr)` } : undefined,
        md: responsive.md ? { gridTemplateColumns: `repeat(${responsive.md}, 1fr)` } : undefined,
        lg: responsive.lg ? { gridTemplateColumns: `repeat(${responsive.lg}, 1fr)` } : undefined,
      })
    }
  }
  
  return baseStyle
}

export function createFlexStyles(
  direction: 'row' | 'column' = 'row',
  justify: 'start' | 'center' | 'end' | 'between' | 'around' = 'start',
  align: 'start' | 'center' | 'end' | 'stretch' = 'start',
  gap: keyof typeof tokens.spacing = 0
) {
  const justifyMap = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    between: 'space-between',
    around: 'space-around'
  }
  
  const alignMap = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    stretch: 'stretch'
  }
  
  return {
    display: 'flex',
    flexDirection: direction,
    justifyContent: justifyMap[justify],
    alignItems: alignMap[align],
    gap: getSpacing(gap)
  }
}

// Accessibility utilities
export function createFocusStyles(color?: string) {
  const focusColor = color || tokens.colors.brand.freela[500]
  
  return {
    '&:focus': {
      outline: 'none',
    },
    '&:focus-visible': {
      boxShadow: `0 0 0 2px ${addAlpha(focusColor, 0.5)}`,
      borderColor: focusColor,
    }
  }
}

export function createHoverStyles(transform = 'translateY(-2px)') {
  return {
    '&:hover': {
      transform,
      transition: createTransition(['transform'], 'fast')
    }
  }
}

// Debug utilities (development only)
export function debugTokens() {
  if (process.env.NODE_ENV === 'development') {
    console.group('🎨 Design System Tokens')
    console.log('Colors:', tokens.colors)
    console.log('Spacing:', tokens.spacing)
    console.log('Typography:', tokens.typography)
    console.log('Animations:', tokens.animations)
    console.log('Shadows:', tokens.shadows)
    console.groupEnd()
  }
}

export function validateToken<T extends keyof DesignTokens>(
  category: T,
  value: keyof DesignTokens[T]
): boolean {
  return value in tokens[category]
}

// CSS custom properties generator
export function generateTokenCSSVars(prefix = 'ds') {
  const vars: Record<string, string> = {}
  
  // Colors
  Object.entries(tokens.colors.brand).forEach(([brand, shades]) => {
    if (typeof shades === 'object') {
      Object.entries(shades).forEach(([shade, color]) => {
        vars[`--${prefix}-color-${brand}-${shade}`] = color
      })
    }
  })
  
  // Spacing
  Object.entries(tokens.spacing).forEach(([key, value]) => {
    vars[`--${prefix}-spacing-${key}`] = value
  })
  
  // Typography
  Object.entries(tokens.typography).forEach(([key, typo]) => {
    vars[`--${prefix}-text-${key}-size`] = typo.size
    vars[`--${prefix}-text-${key}-height`] = typo.lineHeight
    vars[`--${prefix}-text-${key}-spacing`] = typo.letterSpacing
  })
  
  // Shadows
  Object.entries(tokens.shadows).forEach(([key, shadow]) => {
    vars[`--${prefix}-shadow-${key}`] = shadow
  })
  
  return vars
}

// Performance optimization utilities
export const memoizedGetters = {
  spacing: new Map<keyof typeof tokens.spacing, string>(),
  colors: new Map<string, string>(),
  typography: new Map<keyof typeof tokens.typography, typeof tokens.typography[keyof typeof tokens.typography]>(),
}

export function getMemoizedSpacing(value: keyof typeof tokens.spacing): string {
  if (!memoizedGetters.spacing.has(value)) {
    memoizedGetters.spacing.set(value, getSpacing(value))
  }
  return memoizedGetters.spacing.get(value)!
}

// Export all utilities
export * from './component-factory'