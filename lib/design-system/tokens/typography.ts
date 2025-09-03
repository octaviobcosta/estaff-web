/**
 * Design System Typography Tokens
 * Mathematical type scale using Perfect Fourth (1.333x) and Golden Ratio
 */

// Base font size
export const BASE_FONT_SIZE = 16

// Type scale multipliers
const SCALE_RATIO = 1.333 // Perfect Fourth
const GOLDEN_RATIO = 1.618

// Font families
export const fontFamilies = {
  sans: ['var(--font-dm-sans)', 'system-ui', '-apple-system', 'sans-serif'].join(', '),
  display: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'].join(', '),
  mono: ['Monaco', 'Consolas', 'monospace'].join(', '),
} as const

// Font weights
export const fontWeights = {
  thin: 100,
  extralight: 200,
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
} as const

// Font sizes with mathematical scaling
export const fontSizes = {
  '2xs': {
    size: `${BASE_FONT_SIZE * 0.625}px`,  // 10px
    lineHeight: 1.6,
    letterSpacing: '0.025em',
  },
  xs: {
    size: `${BASE_FONT_SIZE * 0.75}px`,   // 12px
    lineHeight: 1.5,
    letterSpacing: '0.02em',
  },
  sm: {
    size: `${BASE_FONT_SIZE * 0.875}px`,  // 14px
    lineHeight: 1.5,
    letterSpacing: '0.01em',
  },
  base: {
    size: `${BASE_FONT_SIZE}px`,          // 16px
    lineHeight: 1.5,
    letterSpacing: '0',
  },
  lg: {
    size: `${BASE_FONT_SIZE * 1.125}px`,  // 18px
    lineHeight: 1.5,
    letterSpacing: '-0.01em',
  },
  xl: {
    size: `${BASE_FONT_SIZE * 1.25}px`,   // 20px
    lineHeight: 1.4,
    letterSpacing: '-0.015em',
  },
  '2xl': {
    size: `${BASE_FONT_SIZE * 1.5}px`,    // 24px
    lineHeight: 1.35,
    letterSpacing: '-0.02em',
  },
  '3xl': {
    size: `${BASE_FONT_SIZE * 1.875}px`,  // 30px
    lineHeight: 1.3,
    letterSpacing: '-0.025em',
  },
  '4xl': {
    size: `${BASE_FONT_SIZE * 2.25}px`,   // 36px
    lineHeight: 1.25,
    letterSpacing: '-0.03em',
  },
  '5xl': {
    size: `${BASE_FONT_SIZE * 3}px`,      // 48px
    lineHeight: 1.2,
    letterSpacing: '-0.035em',
  },
  '6xl': {
    size: `${BASE_FONT_SIZE * 3.75}px`,   // 60px
    lineHeight: 1.15,
    letterSpacing: '-0.04em',
  },
  '7xl': {
    size: `${BASE_FONT_SIZE * 4.5}px`,    // 72px
    lineHeight: 1.1,
    letterSpacing: '-0.045em',
  },
  '8xl': {
    size: `${BASE_FONT_SIZE * 6}px`,      // 96px
    lineHeight: 1.05,
    letterSpacing: '-0.05em',
  },
  '9xl': {
    size: `${BASE_FONT_SIZE * 8}px`,      // 128px
    lineHeight: 1,
    letterSpacing: '-0.055em',
  },
} as const

// Semantic typography styles
export const typography = {
  // Display styles for hero sections
  display: {
    hero: {
      fontSize: fontSizes['7xl'].size,
      fontWeight: fontWeights.black,
      lineHeight: fontSizes['7xl'].lineHeight,
      letterSpacing: fontSizes['7xl'].letterSpacing,
      fontFamily: fontFamilies.display,
    },
    title: {
      fontSize: fontSizes['5xl'].size,
      fontWeight: fontWeights.bold,
      lineHeight: fontSizes['5xl'].lineHeight,
      letterSpacing: fontSizes['5xl'].letterSpacing,
      fontFamily: fontFamilies.display,
    },
    subtitle: {
      fontSize: fontSizes['3xl'].size,
      fontWeight: fontWeights.semibold,
      lineHeight: fontSizes['3xl'].lineHeight,
      letterSpacing: fontSizes['3xl'].letterSpacing,
      fontFamily: fontFamilies.display,
    },
  },
  
  // Heading styles
  heading: {
    h1: {
      fontSize: fontSizes['4xl'].size,
      fontWeight: fontWeights.bold,
      lineHeight: fontSizes['4xl'].lineHeight,
      letterSpacing: fontSizes['4xl'].letterSpacing,
      fontFamily: fontFamilies.sans,
    },
    h2: {
      fontSize: fontSizes['3xl'].size,
      fontWeight: fontWeights.semibold,
      lineHeight: fontSizes['3xl'].lineHeight,
      letterSpacing: fontSizes['3xl'].letterSpacing,
      fontFamily: fontFamilies.sans,
    },
    h3: {
      fontSize: fontSizes['2xl'].size,
      fontWeight: fontWeights.semibold,
      lineHeight: fontSizes['2xl'].lineHeight,
      letterSpacing: fontSizes['2xl'].letterSpacing,
      fontFamily: fontFamilies.sans,
    },
    h4: {
      fontSize: fontSizes.xl.size,
      fontWeight: fontWeights.medium,
      lineHeight: fontSizes.xl.lineHeight,
      letterSpacing: fontSizes.xl.letterSpacing,
      fontFamily: fontFamilies.sans,
    },
    h5: {
      fontSize: fontSizes.lg.size,
      fontWeight: fontWeights.medium,
      lineHeight: fontSizes.lg.lineHeight,
      letterSpacing: fontSizes.lg.letterSpacing,
      fontFamily: fontFamilies.sans,
    },
    h6: {
      fontSize: fontSizes.base.size,
      fontWeight: fontWeights.medium,
      lineHeight: fontSizes.base.lineHeight,
      letterSpacing: fontSizes.base.letterSpacing,
      fontFamily: fontFamilies.sans,
    },
  },
  
  // Body text styles
  body: {
    large: {
      fontSize: fontSizes.lg.size,
      fontWeight: fontWeights.regular,
      lineHeight: 1.7,
      letterSpacing: fontSizes.lg.letterSpacing,
      fontFamily: fontFamilies.sans,
    },
    base: {
      fontSize: fontSizes.base.size,
      fontWeight: fontWeights.regular,
      lineHeight: 1.6,
      letterSpacing: fontSizes.base.letterSpacing,
      fontFamily: fontFamilies.sans,
    },
    small: {
      fontSize: fontSizes.sm.size,
      fontWeight: fontWeights.regular,
      lineHeight: 1.5,
      letterSpacing: fontSizes.sm.letterSpacing,
      fontFamily: fontFamilies.sans,
    },
    tiny: {
      fontSize: fontSizes.xs.size,
      fontWeight: fontWeights.regular,
      lineHeight: 1.4,
      letterSpacing: fontSizes.xs.letterSpacing,
      fontFamily: fontFamilies.sans,
    },
  },
  
  // UI text styles
  ui: {
    label: {
      fontSize: fontSizes.sm.size,
      fontWeight: fontWeights.medium,
      lineHeight: 1.2,
      letterSpacing: '0.025em',
      fontFamily: fontFamilies.sans,
    },
    button: {
      fontSize: fontSizes.base.size,
      fontWeight: fontWeights.semibold,
      lineHeight: 1,
      letterSpacing: '0.02em',
      fontFamily: fontFamilies.sans,
    },
    caption: {
      fontSize: fontSizes.xs.size,
      fontWeight: fontWeights.regular,
      lineHeight: 1.4,
      letterSpacing: '0.03em',
      fontFamily: fontFamilies.sans,
    },
    code: {
      fontSize: fontSizes.sm.size,
      fontWeight: fontWeights.regular,
      lineHeight: 1.5,
      letterSpacing: '0',
      fontFamily: fontFamilies.mono,
    },
  },
} as const

// Helper functions
export function getTypographyStyle(category: string, style: string) {
  const categoryStyles = (typography as any)[category]
  return categoryStyles?.[style] || typography.body.base
}

// Calculate fluid typography for responsive design
export function fluidTypography(
  minSize: number,
  maxSize: number,
  minViewport = 320,
  maxViewport = 1920
): string {
  const slope = (maxSize - minSize) / (maxViewport - minViewport)
  const intercept = minSize - slope * minViewport
  
  return `clamp(${minSize}px, ${intercept}px + ${slope * 100}vw, ${maxSize}px)`
}

// Generate CSS custom properties for typography
export function generateTypographyVars(prefix = '--ds-type'): Record<string, string> {
  const vars: Record<string, string> = {}
  
  // Font families
  for (const [key, value] of Object.entries(fontFamilies)) {
    vars[`${prefix}-family-${key}`] = value
  }
  
  // Font weights
  for (const [key, value] of Object.entries(fontWeights)) {
    vars[`${prefix}-weight-${key}`] = value.toString()
  }
  
  // Font sizes
  for (const [key, value] of Object.entries(fontSizes)) {
    vars[`${prefix}-size-${key}`] = value.size
    vars[`${prefix}-leading-${key}`] = value.lineHeight.toString()
    vars[`${prefix}-tracking-${key}`] = value.letterSpacing
  }
  
  return vars
}

// Text truncation utilities
export const textTruncation = {
  singleLine: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  multiLine: (lines: number) => ({
    display: '-webkit-box',
    WebkitLineClamp: lines,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  }),
} as const

export type FontFamily = keyof typeof fontFamilies
export type FontWeight = keyof typeof fontWeights
export type FontSize = keyof typeof fontSizes
export type TypographyCategory = keyof typeof typography
export type HeadingLevel = keyof typeof typography.heading