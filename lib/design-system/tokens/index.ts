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