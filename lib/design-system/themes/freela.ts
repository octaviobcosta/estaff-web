/**
 * Freelancer Theme
 * Energetic and creative theme for freelancer features
 */

import { baseTheme } from './base'
import { tokens } from '../tokens'

export const freelaTheme = {
  ...baseTheme,
  
  name: 'freela',
  
  // Brand colors
  colors: {
    primary: tokens.colors.brand.freela,
    secondary: tokens.colors.brand.empresa,
    accent: tokens.colors.accent,
    ...baseTheme.semantic,
    gray: baseTheme.gray,
    glass: baseTheme.glass,
  },
  
  // Brand-specific shadows and glows
  brandShadows: {
    glow: tokens.glows.freela,
    glowLg: tokens.glows.freelaLg,
    glowSm: tokens.glows.freelaSm,
  },
  
  // Component theming
  components: {
    button: {
      primary: {
        background: tokens.colors.brand.freela[500],
        backgroundHover: tokens.colors.brand.freela[600],
        text: '#ffffff',
        border: 'transparent',
      },
      secondary: {
        background: 'transparent',
        backgroundHover: `${tokens.colors.brand.freela[500]}10`,
        text: tokens.colors.brand.freela[500],
        border: tokens.colors.brand.freela[500],
      },
      ghost: {
        background: 'transparent',
        backgroundHover: `${tokens.colors.brand.freela[500]}10`,
        text: tokens.colors.brand.freela[600],
        border: 'transparent',
      },
    },
    
    input: {
      background: '#ffffff',
      backgroundFocus: '#ffffff',
      border: tokens.colors.gray[300],
      borderFocus: tokens.colors.brand.freela[500],
      text: tokens.colors.gray[900],
      placeholder: tokens.colors.gray[500],
      focusRing: `${tokens.colors.brand.freela[500]}20`,
    },
    
    card: {
      background: '#ffffff',
      backgroundHover: tokens.colors.gray[50],
      border: tokens.colors.gray[200],
      shadow: tokens.shadows.dp2,
      shadowHover: tokens.shadows.dp8,
    },
    
    badge: {
      primary: {
        background: tokens.colors.brand.freela[100],
        text: tokens.colors.brand.freela[700],
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
    brand: `linear-gradient(135deg, ${tokens.colors.brand.freela[400]} 0%, ${tokens.colors.brand.freela[600]} 100%)`,
    hero: `linear-gradient(180deg, ${tokens.colors.brand.freela[500]}10 0%, transparent 100%)`,
    card: `linear-gradient(135deg, ${tokens.colors.brand.freela[50]} 0%, ${tokens.colors.gray[50]} 100%)`,
  },
} as const

export type FreelaTheme = typeof freelaTheme