/**
 * Design System Tokens - Central Export
 * All design tokens in one place for easy importing
 */

// Re-export all tokens
export * from './colors'
export * from './spacing'
export * from './typography'
export * from './animation'
export * from './shadows'

// Import for aggregation
import { colors, generateColorVars } from './colors'
import { spacing, breakpoints, containers, zIndex, generateSpacingVars } from './spacing'
import { typography, fontFamilies, fontWeights, fontSizes, generateTypographyVars } from './typography'
import { animations, transitions, easings, durations, springs, generateAnimationVars } from './animation'
import { shadows, glows, elevation, generateShadowVars } from './shadows'

// Aggregate all tokens
export const tokens = {
  colors,
  spacing,
  typography,
  animations,
  shadows,
  breakpoints,
  containers,
  zIndex,
  fontFamilies,
  fontWeights,
  fontSizes,
  easings,
  durations,
  springs,
  transitions,
  glows,
  elevation,
} as const

// Generate all CSS custom properties
export function generateCSSVars(): string {
  const allVars = {
    ...generateColorVars(),
    ...generateSpacingVars(),
    ...generateTypographyVars(),
    ...generateAnimationVars(),
    ...generateShadowVars(),
  }
  
  const cssVars = Object.entries(allVars)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n')
  
  return `:root {\n${cssVars}\n}`
}

// Media query helpers
export const media = {
  xs: `@media (min-width: ${breakpoints.xs}px)`,
  sm: `@media (min-width: ${breakpoints.sm}px)`,
  md: `@media (min-width: ${breakpoints.md}px)`,
  lg: `@media (min-width: ${breakpoints.lg}px)`,
  xl: `@media (min-width: ${breakpoints.xl}px)`,
  '2xl': `@media (min-width: ${breakpoints['2xl']}px)`,
  
  // Utility queries
  motion: '@media (prefers-reduced-motion: no-preference)',
  motionSafe: '@media (prefers-reduced-motion: reduce)',
  dark: '@media (prefers-color-scheme: dark)',
  light: '@media (prefers-color-scheme: light)',
  highContrast: '@media (prefers-contrast: high)',
  
  // Hover capability
  hover: '@media (hover: hover) and (pointer: fine)',
  touch: '@media (hover: none) and (pointer: coarse)',
} as const

// Tailwind config generator
export function generateTailwindTheme() {
  return {
    colors: {
      ...colors.brand,
      gray: colors.gray,
      ...colors.semantic,
      accent: colors.accent,
    },
    spacing,
    fontFamily: fontFamilies,
    fontSize: Object.entries(fontSizes).reduce((acc, [key, value]) => ({
      ...acc,
      [key]: [value.size, { lineHeight: value.lineHeight, letterSpacing: value.letterSpacing }],
    }), {}),
    fontWeight: fontWeights,
    boxShadow: shadows,
    animation: animations,
    transitionDuration: durations,
    transitionTimingFunction: easings,
    zIndex,
    screens: breakpoints,
    container: {
      screens: containers,
    },
  }
}

// Token validation
export function validateTokens(): { 
  valid: boolean
  errors: string[] 
} {
  const errors: string[] = []
  
  // Check color contrast ratios
  // This would implement actual WCAG validation
  
  // Check spacing consistency
  Object.entries(spacing).forEach(([key, value]) => {
    if (typeof value === 'string' && !value.endsWith('px')) {
      errors.push(`Spacing token "${key}" should end with "px"`)
    }
  })
  
  // Check font size scaling
  // Verify mathematical progression
  
  return {
    valid: errors.length === 0,
    errors,
  }
}

// Export type for the complete token system
export type DesignTokens = typeof tokens

// Export convenience types
export type ColorToken = keyof typeof colors
export type SpacingToken = keyof typeof spacing
export type TypographyToken = keyof typeof typography
export type AnimationToken = keyof typeof animations
export type ShadowToken = keyof typeof shadows
export type BreakpointToken = keyof typeof breakpoints

// Advanced type utilities for component props
export type ThemeColor = keyof typeof colors.brand
export type ColorShade = keyof typeof colors.brand.freela
export type SemanticColor = keyof typeof colors.semantic

// Component variant types
export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type ComponentVariant = 'primary' | 'secondary' | 'outline' | 'ghost'

// Spacing utilities
export type SpacingValue = typeof spacing[SpacingToken]
export type BreakpointValue = typeof breakpoints[BreakpointToken]

// Animation utilities  
export type AnimationDuration = keyof typeof durations
export type AnimationEasing = keyof typeof easings
export type SpringType = keyof typeof springs

// Validation utilities
export interface TokenValidationResult {
  valid: boolean
  errors: string[]
  warnings: string[]
}

/**
 * Enhanced token validation with comprehensive checks
 */
export function validateTokens(): TokenValidationResult {
  const errors: string[] = []
  const warnings: string[] = []
  
  // Validate spacing consistency (8px grid)
  Object.entries(spacing).forEach(([key, value]) => {
    const numValue = parseInt(value.replace('px', ''))
    if (numValue % 4 !== 0 && key !== '0.5' && key !== '1.5' && key !== '2.5' && key !== '3.5') {
      warnings.push(`Spacing token "${key}" (${value}) doesn't follow 4px base grid`)
    }
  })
  
  // Validate color contrast ratios (simplified)
  const checkContrast = (bg: string, fg: string, name: string) => {
    // This is a simplified contrast check
    // In production, use a proper contrast library like 'color-contrast'
    if (bg === fg) {
      errors.push(`Color combination "${name}" has insufficient contrast`)
    }
  }
  
  // Check semantic color consistency
  Object.entries(colors.semantic).forEach(([type, colorObj]) => {
    if (!colorObj[500]) {
      errors.push(`Semantic color "${type}" missing 500 shade`)
    }
  })
  
  // Validate typography scale progression
  const fontSizes = Object.values(fontSizes).map(t => 
    parseFloat(t.size.replace('px', '').replace('rem', ''))
  )
  
  for (let i = 1; i < fontSizes.length; i++) {
    if (fontSizes[i] <= fontSizes[i - 1]) {
      warnings.push(`Typography scale not consistently increasing at index ${i}`)
    }
  }
  
  // Validate animation durations
  Object.entries(durations).forEach(([key, duration]) => {
    const ms = parseInt(duration.replace('ms', ''))
    if (ms < 100 || ms > 1000) {
      warnings.push(`Animation duration "${key}" (${duration}) outside recommended range (100ms-1000ms)`)
    }
  })
  
  // Validate shadow progression
  const shadowKeys = Object.keys(shadows).filter(key => key.startsWith('dp'))
  const shadowNumbers = shadowKeys.map(key => parseInt(key.replace('dp', '')))
  
  for (let i = 1; i < shadowNumbers.length; i++) {
    if (shadowNumbers[i] <= shadowNumbers[i - 1]) {
      warnings.push(`Shadow elevation not consistently increasing`)
    }
  }
  
  return {
    valid: errors.length === 0,
    errors,
    warnings,
  }
}

/**
 * Runtime token access with validation
 */
export function safeTokenAccess<T extends keyof DesignTokens>(
  category: T,
  key: keyof DesignTokens[T]
): DesignTokens[T][keyof DesignTokens[T]] | null {
  try {
    const value = tokens[category][key as any]
    if (value === undefined) {
      console.warn(`Token not found: ${String(category)}.${String(key)}`)
      return null
    }
    return value
  } catch (error) {
    console.error(`Error accessing token: ${String(category)}.${String(key)}`, error)
    return null
  }
}