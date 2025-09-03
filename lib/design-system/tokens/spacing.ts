/**
 * Design System Spacing Tokens
 * 8px base grid system with mathematical progression
 */

// Base unit for all spacing calculations
export const BASE_UNIT = 8

// Spacing scale using 8px grid
export const spacing = {
  px: '1px',
  0: '0px',
  0.5: `${BASE_UNIT * 0.25}px`, // 2px
  1: `${BASE_UNIT * 0.5}px`,     // 4px
  2: `${BASE_UNIT * 1}px`,       // 8px
  3: `${BASE_UNIT * 1.5}px`,     // 12px
  4: `${BASE_UNIT * 2}px`,       // 16px
  5: `${BASE_UNIT * 2.5}px`,     // 20px
  6: `${BASE_UNIT * 3}px`,       // 24px
  7: `${BASE_UNIT * 3.5}px`,     // 28px
  8: `${BASE_UNIT * 4}px`,       // 32px
  9: `${BASE_UNIT * 4.5}px`,     // 36px
  10: `${BASE_UNIT * 5}px`,      // 40px
  11: `${BASE_UNIT * 5.5}px`,    // 44px
  12: `${BASE_UNIT * 6}px`,      // 48px
  14: `${BASE_UNIT * 7}px`,      // 56px
  16: `${BASE_UNIT * 8}px`,      // 64px
  18: `${BASE_UNIT * 9}px`,      // 72px
  20: `${BASE_UNIT * 10}px`,     // 80px
  24: `${BASE_UNIT * 12}px`,     // 96px
  28: `${BASE_UNIT * 14}px`,     // 112px
  32: `${BASE_UNIT * 16}px`,     // 128px
  36: `${BASE_UNIT * 18}px`,     // 144px
  40: `${BASE_UNIT * 20}px`,     // 160px
  48: `${BASE_UNIT * 24}px`,     // 192px
  56: `${BASE_UNIT * 28}px`,     // 224px
  64: `${BASE_UNIT * 32}px`,     // 256px
  72: `${BASE_UNIT * 36}px`,     // 288px
  80: `${BASE_UNIT * 40}px`,     // 320px
  96: `${BASE_UNIT * 48}px`,     // 384px
} as const

// Semantic spacing tokens
export const semanticSpacing = {
  // Component padding
  component: {
    xs: spacing[2],    // 8px
    sm: spacing[3],    // 12px
    md: spacing[4],    // 16px
    lg: spacing[6],    // 24px
    xl: spacing[8],    // 32px
  },
  
  // Layout spacing
  layout: {
    section: spacing[20],    // 80px
    container: spacing[16],  // 64px
    grid: spacing[6],        // 24px
    stack: spacing[4],       // 16px
  },
  
  // Content spacing
  content: {
    paragraph: spacing[6],   // 24px
    heading: spacing[8],     // 32px
    list: spacing[4],        // 16px
    inline: spacing[2],      // 8px
  },
  
  // Form spacing
  form: {
    field: spacing[6],       // 24px
    group: spacing[8],       // 32px
    label: spacing[2],       // 8px
    help: spacing[1],        // 4px
  },
} as const

// Container widths
export const containers = {
  xs: '320px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
  '3xl': '1920px',
  full: '100%',
  prose: '65ch',
} as const

// Breakpoints for responsive design
export const breakpoints = {
  xs: 320,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

// Z-index layers
export const zIndex = {
  hide: -1,
  base: 0,
  dropdown: 10,
  sticky: 20,
  overlay: 30,
  modal: 40,
  popover: 50,
  tooltip: 60,
  notification: 70,
  top: 9999,
} as const

// Aspect ratios
export const aspectRatios = {
  square: '1 / 1',
  video: '16 / 9',
  portrait: '3 / 4',
  landscape: '4 / 3',
  wide: '21 / 9',
  golden: '1.618 / 1',
} as const

// Helper functions
export function getSpacing(value: keyof typeof spacing): string {
  return spacing[value]
}

export function getSemanticSpacing(
  category: keyof typeof semanticSpacing,
  size: string
): string {
  const categorySpacing = semanticSpacing[category] as any
  return categorySpacing[size] || spacing[4]
}

// Calculate responsive spacing
export function responsiveSpacing(
  base: keyof typeof spacing,
  scale = 1.5
): {
  mobile: string
  tablet: string
  desktop: string
} {
  const baseValue = parseInt(spacing[base])
  
  return {
    mobile: `${baseValue}px`,
    tablet: `${Math.round(baseValue * 1.25)}px`,
    desktop: `${Math.round(baseValue * scale)}px`,
  }
}

// Generate CSS custom properties for spacing
export function generateSpacingVars(prefix = '--ds-spacing'): Record<string, string> {
  const vars: Record<string, string> = {}
  
  for (const [key, value] of Object.entries(spacing)) {
    vars[`${prefix}-${key}`] = value
  }
  
  return vars
}

export type SpacingToken = keyof typeof spacing
export type SemanticSpacingCategory = keyof typeof semanticSpacing
export type ContainerSize = keyof typeof containers
export type Breakpoint = keyof typeof breakpoints