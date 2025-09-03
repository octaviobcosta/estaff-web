/**
 * Design System Shadow Tokens
 * Material Design elevation system with brand-specific glows
 */

// Shadow color with opacity
const SHADOW_COLOR = '0, 0, 0' // RGB values for rgba()
const GLOW_COLORS = {
  freela: '236, 68, 100',     // #ec4464
  empresa: '20, 36, 68',       // #142444
  institucional: '236, 212, 164', // #ecd4a4
  purple: '139, 92, 246',      // #8b5cf6
  blue: '59, 130, 246',        // #3b82f6
} as const

// Material Design elevation shadows
export const shadows = {
  none: 'none',
  
  // Elevation levels (dp - density-independent pixels)
  dp0: 'none',
  dp1: `0 1px 2px 0 rgba(${SHADOW_COLOR}, 0.05)`,
  dp2: `0 1px 3px 0 rgba(${SHADOW_COLOR}, 0.1), 0 1px 2px 0 rgba(${SHADOW_COLOR}, 0.06)`,
  dp3: `0 4px 6px -1px rgba(${SHADOW_COLOR}, 0.1), 0 2px 4px -1px rgba(${SHADOW_COLOR}, 0.06)`,
  dp4: `0 10px 15px -3px rgba(${SHADOW_COLOR}, 0.1), 0 4px 6px -2px rgba(${SHADOW_COLOR}, 0.05)`,
  dp6: `0 20px 25px -5px rgba(${SHADOW_COLOR}, 0.1), 0 10px 10px -5px rgba(${SHADOW_COLOR}, 0.04)`,
  dp8: `0 25px 50px -12px rgba(${SHADOW_COLOR}, 0.25)`,
  dp12: `0 30px 60px -15px rgba(${SHADOW_COLOR}, 0.3)`,
  dp16: `0 35px 70px -20px rgba(${SHADOW_COLOR}, 0.35)`,
  dp24: `0 40px 80px -25px rgba(${SHADOW_COLOR}, 0.4)`,
  
  // Semantic shadows
  sm: `0 1px 2px 0 rgba(${SHADOW_COLOR}, 0.05)`,
  base: `0 1px 3px 0 rgba(${SHADOW_COLOR}, 0.1), 0 1px 2px 0 rgba(${SHADOW_COLOR}, 0.06)`,
  md: `0 4px 6px -1px rgba(${SHADOW_COLOR}, 0.1), 0 2px 4px -1px rgba(${SHADOW_COLOR}, 0.06)`,
  lg: `0 10px 15px -3px rgba(${SHADOW_COLOR}, 0.1), 0 4px 6px -2px rgba(${SHADOW_COLOR}, 0.05)`,
  xl: `0 20px 25px -5px rgba(${SHADOW_COLOR}, 0.1), 0 10px 10px -5px rgba(${SHADOW_COLOR}, 0.04)`,
  '2xl': `0 25px 50px -12px rgba(${SHADOW_COLOR}, 0.25)`,
  '3xl': `0 35px 60px -15px rgba(${SHADOW_COLOR}, 0.3)`,
  
  // Inner shadows
  inner: `inset 0 2px 4px 0 rgba(${SHADOW_COLOR}, 0.06)`,
  innerLg: `inset 0 4px 8px 0 rgba(${SHADOW_COLOR}, 0.1)`,
  
  // Glass morphism shadow
  glass: `0 8px 32px 0 rgba(31, 38, 135, 0.37)`,
  glassSoft: `0 4px 16px 0 rgba(31, 38, 135, 0.2)`,
  glassHard: `0 12px 48px 0 rgba(31, 38, 135, 0.5)`,
  
  // Brutal design shadow
  brutal: `8px 8px 0 0 rgba(${SHADOW_COLOR}, 1)`,
  brutalSm: `4px 4px 0 0 rgba(${SHADOW_COLOR}, 1)`,
  brutalLg: `12px 12px 0 0 rgba(${SHADOW_COLOR}, 1)`,
  
  // Premium shadows
  premium: `0 30px 60px -15px rgba(${SHADOW_COLOR}, 0.3)`,
  premiumSoft: `0 20px 40px -10px rgba(${SHADOW_COLOR}, 0.2)`,
  premiumHard: `0 40px 80px -20px rgba(${SHADOW_COLOR}, 0.4)`,
} as const

// Glow effects
export const glows = {
  // Brand glows
  freela: `0 0 30px rgba(${GLOW_COLORS.freela}, 0.3)`,
  freelaLg: `0 0 50px rgba(${GLOW_COLORS.freela}, 0.4)`,
  freelaSm: `0 0 20px rgba(${GLOW_COLORS.freela}, 0.25)`,
  
  empresa: `0 0 30px rgba(${GLOW_COLORS.empresa}, 0.3)`,
  empresaLg: `0 0 50px rgba(${GLOW_COLORS.empresa}, 0.4)`,
  empresaSm: `0 0 20px rgba(${GLOW_COLORS.empresa}, 0.25)`,
  
  institucional: `0 0 30px rgba(${GLOW_COLORS.institucional}, 0.3)`,
  institucionalLg: `0 0 50px rgba(${GLOW_COLORS.institucional}, 0.4)`,
  institucionalSm: `0 0 20px rgba(${GLOW_COLORS.institucional}, 0.25)`,
  
  // Accent glows
  purple: `0 0 30px rgba(${GLOW_COLORS.purple}, 0.3)`,
  blue: `0 0 30px rgba(${GLOW_COLORS.blue}, 0.3)`,
  
  // Intensity variations
  soft: `0 0 20px rgba(255, 255, 255, 0.2)`,
  medium: `0 0 30px rgba(255, 255, 255, 0.3)`,
  intense: `0 0 50px rgba(255, 255, 255, 0.4)`,
} as const

// Elevation to shadow mapping
export const elevation = {
  0: shadows.none,
  1: shadows.dp1,
  2: shadows.dp2,
  3: shadows.dp3,
  4: shadows.dp4,
  6: shadows.dp6,
  8: shadows.dp8,
  12: shadows.dp12,
  16: shadows.dp16,
  24: shadows.dp24,
} as const

// Component-specific shadows
export const componentShadows = {
  button: {
    rest: shadows.dp2,
    hover: shadows.dp4,
    active: shadows.dp1,
    disabled: shadows.none,
  },
  card: {
    rest: shadows.dp2,
    hover: shadows.dp8,
    dragging: shadows.dp16,
  },
  modal: {
    backdrop: `0 0 0 100vmax rgba(${SHADOW_COLOR}, 0.5)`,
    content: shadows.dp24,
  },
  dropdown: {
    menu: shadows.dp8,
    item: shadows.none,
    itemHover: shadows.dp1,
  },
  input: {
    rest: shadows.inner,
    focus: `${shadows.inner}, 0 0 0 3px rgba(${GLOW_COLORS.freela}, 0.1)`,
    error: `${shadows.inner}, 0 0 0 3px rgba(239, 68, 68, 0.1)`,
  },
  tooltip: shadows.dp8,
  notification: shadows.dp6,
} as const

// Helper functions
export function getShadow(name: keyof typeof shadows): string {
  return shadows[name]
}

export function getGlow(name: keyof typeof glows): string {
  return glows[name]
}

export function getElevation(level: keyof typeof elevation): string {
  return elevation[level]
}

// Create custom shadow
export function createShadow(
  x: number,
  y: number,
  blur: number,
  spread: number,
  color: string,
  opacity: number,
  inset = false
): string {
  const prefix = inset ? 'inset ' : ''
  return `${prefix}${x}px ${y}px ${blur}px ${spread}px rgba(${color}, ${opacity})`
}

// Create layered shadow for depth
export function createLayeredShadow(
  elevation: number,
  color = SHADOW_COLOR
): string {
  const shadows = []
  
  // Ambient shadow
  shadows.push(createShadow(0, elevation * 0.5, elevation * 1, -elevation * 0.5, color, 0.2))
  
  // Direct shadow
  shadows.push(createShadow(0, elevation * 1, elevation * 2, 0, color, 0.14))
  
  // Penumbra
  shadows.push(createShadow(0, elevation * 0.25, elevation * 1.5, 0, color, 0.12))
  
  return shadows.join(', ')
}

// Generate CSS custom properties
export function generateShadowVars(prefix = '--ds-shadow'): Record<string, string> {
  const vars: Record<string, string> = {}
  
  // Shadows
  for (const [key, value] of Object.entries(shadows)) {
    vars[`${prefix}-${key}`] = value
  }
  
  // Glows
  for (const [key, value] of Object.entries(glows)) {
    vars[`${prefix}-glow-${key}`] = value
  }
  
  return vars
}

export type ShadowToken = keyof typeof shadows
export type GlowToken = keyof typeof glows
export type ElevationLevel = keyof typeof elevation
export type ComponentShadow = keyof typeof componentShadows