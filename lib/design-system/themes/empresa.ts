/**
 * Company Theme
 * Professional and trustworthy theme for company features
 */

import { baseTheme } from './base'
import { tokens } from '../tokens'

export const empresaTheme = {
  ...baseTheme,
  
  name: 'empresa',
  
  // Brand colors
  colors: {
    primary: tokens.colors.brand.empresa,
    secondary: tokens.colors.brand.freela,
    accent: tokens.colors.accent,
    ...baseTheme.semantic,
    gray: baseTheme.gray,
    glass: baseTheme.glass,
  },
  
  // Brand-specific shadows and glows
  brandShadows: {
    glow: tokens.glows.empresa,
    glowLg: tokens.glows.empresaLg,
    glowSm: tokens.glows.empresaSm,
  },
  
  // Component theming
  components: {
    button: {
      primary: {
        background: tokens.colors.brand.empresa[900],
        backgroundHover: tokens.colors.brand.empresa[800],
        text: '#ffffff',
        border: 'transparent',
      },
      secondary: {
        background: 'transparent',
        backgroundHover: `${tokens.colors.brand.empresa[900]}10`,
        text: tokens.colors.brand.empresa[900],
        border: tokens.colors.brand.empresa[900],
      },
      ghost: {
        background: 'transparent',
        backgroundHover: `${tokens.colors.brand.empresa[900]}10`,
        text: tokens.colors.brand.empresa[800],
        border: 'transparent',
      },
    },
    
    input: {
      background: '#ffffff',
      backgroundFocus: '#ffffff',
      border: tokens.colors.gray[300],
      borderFocus: tokens.colors.brand.empresa[700],
      text: tokens.colors.gray[900],
      placeholder: tokens.colors.gray[500],
      focusRing: `${tokens.colors.brand.empresa[700]}20`,
    },
    
    card: {
      background: '#ffffff',
      backgroundHover: tokens.colors.brand.empresa[50],
      border: tokens.colors.gray[200],
      shadow: tokens.shadows.dp2,
      shadowHover: tokens.shadows.dp8,
    },
    
    badge: {
      primary: {
        background: tokens.colors.brand.empresa[100],
        text: tokens.colors.brand.empresa[900],
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
    brand: `linear-gradient(135deg, ${tokens.colors.brand.empresa[700]} 0%, ${tokens.colors.brand.empresa[950]} 100%)`,
    hero: `linear-gradient(180deg, ${tokens.colors.brand.empresa[900]}10 0%, transparent 100%)`,
    card: `linear-gradient(135deg, ${tokens.colors.brand.empresa[50]} 0%, ${tokens.colors.gray[50]} 100%)`,
  },
} as const

export type EmpresaTheme = typeof empresaTheme