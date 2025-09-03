/**
 * Institutional Theme  
 * Approachable and reliable theme for institutional pages
 */

import { baseTheme } from './base'
import { tokens } from '../tokens'

export const institucionalTheme = {
  ...baseTheme,
  
  name: 'institucional',
  
  // Brand colors
  colors: {
    primary: tokens.colors.brand.institucional,
    secondary: tokens.colors.brand.empresa,
    accent: tokens.colors.accent,
    ...baseTheme.semantic,
    gray: baseTheme.gray,
    glass: baseTheme.glass,
  },
  
  // Brand-specific shadows and glows
  brandShadows: {
    glow: tokens.glows.institucional,
    glowLg: tokens.glows.institucionalLg,
    glowSm: tokens.glows.institucionalSm,
  },
  
  // Component theming
  components: {
    button: {
      primary: {
        background: tokens.colors.brand.institucional[400],
        backgroundHover: tokens.colors.brand.institucional[500],
        text: tokens.colors.gray[950],
        border: 'transparent',
      },
      secondary: {
        background: 'transparent',
        backgroundHover: `${tokens.colors.brand.institucional[300]}20`,
        text: tokens.colors.brand.institucional[700],
        border: tokens.colors.brand.institucional[400],
      },
      ghost: {
        background: 'transparent',
        backgroundHover: `${tokens.colors.brand.institucional[300]}15`,
        text: tokens.colors.brand.institucional[700],
        border: 'transparent',
      },
    },
    
    input: {
      background: '#ffffff',
      backgroundFocus: tokens.colors.brand.institucional[50],
      border: tokens.colors.gray[300],
      borderFocus: tokens.colors.brand.institucional[400],
      text: tokens.colors.gray[900],
      placeholder: tokens.colors.gray[500],
      focusRing: `${tokens.colors.brand.institucional[400]}25`,
    },
    
    card: {
      background: '#ffffff',
      backgroundHover: tokens.colors.brand.institucional[100],
      border: tokens.colors.brand.institucional[200],
      shadow: tokens.shadows.dp2,
      shadowHover: tokens.shadows.dp6,
    },
    
    badge: {
      primary: {
        background: tokens.colors.brand.institucional[200],
        text: tokens.colors.brand.institucional[800],
      },
      success: {
        background: tokens.colors.semantic.success.light + '20',
        text: tokens.colors.semantic.success.dark,
      },
      warning: {
        background: tokens.colors.semantic.warning.light + '20',
        text: tokens.colors.semantic.warning.dark,
      },
      error: {
        background: tokens.colors.semantic.error.light + '20',
        text: tokens.colors.semantic.error.dark,
      },
    },
  },
  
  // Gradients
  gradients: {
    brand: `linear-gradient(135deg, ${tokens.colors.brand.institucional[300]} 0%, ${tokens.colors.brand.institucional[500]} 100%)`,
    hero: `linear-gradient(180deg, ${tokens.colors.brand.institucional[300]}15 0%, transparent 100%)`,
    card: `linear-gradient(135deg, ${tokens.colors.brand.institucional[100]} 0%, ${tokens.colors.gray[50]} 100%)`,
  },
} as const

export type InstitucionalTheme = typeof institucionalTheme