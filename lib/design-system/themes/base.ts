/**
 * Base Theme Configuration
 * Shared properties across all brand themes
 */

import { tokens } from '../tokens'

export const baseTheme = {
  // Core tokens that remain consistent
  spacing: tokens.spacing,
  typography: tokens.typography,
  animations: tokens.animations,
  shadows: tokens.shadows,
  breakpoints: tokens.breakpoints,
  containers: tokens.containers,
  zIndex: tokens.zIndex,
  
  // Base semantic colors
  semantic: tokens.colors.semantic,
  gray: tokens.colors.gray,
  
  // Glass morphism defaults
  glass: tokens.colors.glass,
  
  // Default transitions
  transitions: tokens.transitions,
  easings: tokens.easings,
  durations: tokens.durations,
  
  // Border radius scale
  radius: {
    none: '0',
    xs: '2px',
    sm: '4px',
    md: '6px',
    lg: '8px',
    xl: '12px',
    '2xl': '16px',
    '3xl': '24px',
    full: '9999px',
  },
  
  // Border widths
  borderWidth: {
    0: '0',
    1: '1px',
    2: '2px',
    3: '3px',
    4: '4px',
    8: '8px',
  },
  
  // Opacity scale
  opacity: {
    0: '0',
    5: '0.05',
    10: '0.1',
    15: '0.15',
    20: '0.2',
    25: '0.25',
    30: '0.3',
    40: '0.4',
    50: '0.5',
    60: '0.6',
    70: '0.7',
    75: '0.75',
    80: '0.8',
    90: '0.9',
    95: '0.95',
    100: '1',
  },
  
  // Blur values for glass morphism
  blur: {
    none: '0',
    xs: '2px',
    sm: '4px',
    base: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    '2xl': '40px',
    '3xl': '64px',
  },
} as const

export type BaseTheme = typeof baseTheme