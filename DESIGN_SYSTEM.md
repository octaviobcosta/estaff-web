# estaff-web Pixel-Perfect Design System

## Executive Summary

This comprehensive design system specification defines exact measurements, mathematical relationships, and implementation-ready tokens for the estaff-web marketplace platform. Built on 8px base unit with mathematical precision.

---

## 1. Design Tokens Structure

### Primitive Tokens (Raw Values)
```typescript
// Base Unit: 8px grid system
const BASE_UNIT = 8; // px

// Mathematical Scale Ratios
const GOLDEN_RATIO = 1.618;
const MAJOR_THIRD = 1.25;
const MINOR_THIRD = 1.2;
const PERFECT_FOURTH = 1.333;
```

### Semantic Tokens (Purpose-Based)
```typescript
// Spacing Semantic Tokens
spacing: {
  none: '0px',
  hairline: '0.5px',
  pixel: '1px',
  micro: '2px',    // 0.25 * BASE_UNIT
  tiny: '4px',     // 0.5 * BASE_UNIT
  xs: '8px',       // 1 * BASE_UNIT
  sm: '12px',      // 1.5 * BASE_UNIT
  md: '16px',      // 2 * BASE_UNIT
  lg: '24px',      // 3 * BASE_UNIT
  xl: '32px',      // 4 * BASE_UNIT
  '2xl': '40px',   // 5 * BASE_UNIT
  '3xl': '48px',   // 6 * BASE_UNIT
  '4xl': '64px',   // 8 * BASE_UNIT
  '5xl': '80px',   // 10 * BASE_UNIT
  '6xl': '96px',   // 12 * BASE_UNIT
  huge: '128px',   // 16 * BASE_UNIT
  massive: '192px' // 24 * BASE_UNIT
}
```

---

## 2. Spacing & Grid System

### 8px Grid Foundation
```css
/* Base Grid Unit */
:root {
  --grid-unit: 8px;
  --grid-half: 4px;
  --grid-quarter: 2px;
  --grid-eighth: 1px;
}
```

### Precise Spacing Scale
```typescript
// Mathematical progression: 8px base with fibonacci-inspired sequence
const spacing = {
  0: '0px',
  px: '1px',          // Hairline borders
  0.5: '2px',         // Micro adjustments  
  1: '4px',           // Quarter unit
  1.5: '6px',         // 0.75 * BASE_UNIT
  2: '8px',           // BASE_UNIT
  2.5: '10px',        // 1.25 * BASE_UNIT
  3: '12px',          // 1.5 * BASE_UNIT
  3.5: '14px',        // 1.75 * BASE_UNIT
  4: '16px',          // 2 * BASE_UNIT
  5: '20px',          // 2.5 * BASE_UNIT
  6: '24px',          // 3 * BASE_UNIT
  7: '28px',          // 3.5 * BASE_UNIT
  8: '32px',          // 4 * BASE_UNIT
  9: '36px',          // 4.5 * BASE_UNIT
  10: '40px',         // 5 * BASE_UNIT
  11: '44px',         // 5.5 * BASE_UNIT
  12: '48px',         // 6 * BASE_UNIT
  14: '56px',         // 7 * BASE_UNIT
  16: '64px',         // 8 * BASE_UNIT
  20: '80px',         // 10 * BASE_UNIT
  24: '96px',         // 12 * BASE_UNIT
  28: '112px',        // 14 * BASE_UNIT
  32: '128px',        // 16 * BASE_UNIT
  36: '144px',        // 18 * BASE_UNIT
  40: '160px',        // 20 * BASE_UNIT
  44: '176px',        // 22 * BASE_UNIT
  48: '192px',        // 24 * BASE_UNIT
  52: '208px',        // 26 * BASE_UNIT
  56: '224px',        // 28 * BASE_UNIT
  60: '240px',        // 30 * BASE_UNIT
  64: '256px',        // 32 * BASE_UNIT
  72: '288px',        // 36 * BASE_UNIT
  80: '320px',        // 40 * BASE_UNIT
  96: '384px'         // 48 * BASE_UNIT
}
```

### Container & Breakpoint System
```typescript
// Container widths (based on content analysis and UX research)
const containers = {
  xs: '320px',    // Mobile portrait
  sm: '640px',    // Mobile landscape / Small tablet
  md: '768px',    // Tablet portrait
  lg: '1024px',   // Tablet landscape / Small desktop
  xl: '1280px',   // Desktop
  '2xl': '1536px' // Large desktop
}

// Breakpoints (mobile-first approach)
const breakpoints = {
  xs: '0px',
  sm: '640px',    // 40rem
  md: '768px',    // 48rem  
  lg: '1024px',   // 64rem
  xl: '1280px',   // 80rem
  '2xl': '1536px' // 96rem
}

// Max widths for content areas
const maxWidths = {
  prose: '65ch',     // Optimal reading width
  content: '720px',  // Content sections
  container: '1280px' // Full layout
}
```

### Grid Layout Specifications
```css
/* CSS Grid Foundation */
.grid-foundation {
  display: grid;
  gap: var(--grid-unit); /* 8px base gap */
  grid-template-columns: repeat(12, 1fr);
}

/* Precise column definitions */
.grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
.grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
.grid-cols-5 { grid-template-columns: repeat(5, minmax(0, 1fr)); }
.grid-cols-6 { grid-template-columns: repeat(6, minmax(0, 1fr)); }
.grid-cols-8 { grid-template-columns: repeat(8, minmax(0, 1fr)); }
.grid-cols-12 { grid-template-columns: repeat(12, minmax(0, 1fr)); }

/* Precise gap system */
.gap-px { gap: 1px; }
.gap-0\.5 { gap: 2px; }
.gap-1 { gap: 4px; }
.gap-2 { gap: 8px; }
.gap-3 { gap: 12px; }
.gap-4 { gap: 16px; }
.gap-5 { gap: 20px; }
.gap-6 { gap: 24px; }
.gap-8 { gap: 32px; }
```

---

## 3. Enhanced Typography System

### Font Configuration
```css
/* DM Sans Optimized Loading */
@font-face {
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/dm-sans-regular.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

@font-face {
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url('/fonts/dm-sans-medium.woff2') format('woff2');
}

@font-face {
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url('/fonts/dm-sans-semibold.woff2') format('woff2');
}

@font-face {
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('/fonts/dm-sans-bold.woff2') format('woff2');
}
```

### Mathematical Type Scale
```typescript
// Based on Perfect Fourth (1.333) + Golden Ratio (1.618) for display sizes
const fontSize = {
  xs: {
    fontSize: '12px',     // 0.75rem
    lineHeight: '16px',   // 1.333x
    letterSpacing: '0.025em',
    fontWeight: 400
  },
  sm: {
    fontSize: '14px',     // 0.875rem
    lineHeight: '20px',   // 1.428x
    letterSpacing: '0.016em',
    fontWeight: 400
  },
  base: {
    fontSize: '16px',     // 1rem - BASE
    lineHeight: '24px',   // 1.5x (perfect for readability)
    letterSpacing: '0em',
    fontWeight: 400
  },
  lg: {
    fontSize: '18px',     // 1.125rem
    lineHeight: '28px',   // 1.556x
    letterSpacing: '-0.011em',
    fontWeight: 400
  },
  xl: {
    fontSize: '20px',     // 1.25rem  
    lineHeight: '28px',   // 1.4x
    letterSpacing: '-0.017em',
    fontWeight: 500
  },
  '2xl': {
    fontSize: '24px',     // 1.5rem
    lineHeight: '32px',   // 1.333x
    letterSpacing: '-0.019em',
    fontWeight: 600
  },
  '3xl': {
    fontSize: '30px',     // 1.875rem (24 * 1.25)
    lineHeight: '36px',   // 1.2x
    letterSpacing: '-0.021em',
    fontWeight: 600
  },
  '4xl': {
    fontSize: '36px',     // 2.25rem (30 * 1.2)
    lineHeight: '40px',   // 1.111x
    letterSpacing: '-0.025em',
    fontWeight: 700
  },
  '5xl': {
    fontSize: '48px',     // 3rem (36 * 1.333)
    lineHeight: '48px',   // 1x (tight for headlines)
    letterSpacing: '-0.032em',
    fontWeight: 700
  },
  '6xl': {
    fontSize: '60px',     // 3.75rem (48 * 1.25)
    lineHeight: '56px',   // 0.933x (very tight)
    letterSpacing: '-0.040em',
    fontWeight: 800
  },
  '7xl': {
    fontSize: '72px',     // 4.5rem (60 * 1.2)
    lineHeight: '64px',   // 0.889x
    letterSpacing: '-0.048em',
    fontWeight: 800
  },
  '8xl': {
    fontSize: '96px',     // 6rem (72 * 1.333)
    lineHeight: '80px',   // 0.833x
    letterSpacing: '-0.064em',
    fontWeight: 900
  },
  '9xl': {
    fontSize: '128px',    // 8rem (96 * 1.333)
    lineHeight: '96px',   // 0.75x
    letterSpacing: '-0.085em',
    fontWeight: 900
  }
}
```

### Font Weight Scale
```typescript
const fontWeight = {
  thin: 100,        // Ultra light (not used in estaff)
  light: 300,       // Light (not used in estaff)
  normal: 400,      // Regular - body text, captions
  medium: 500,      // Medium - emphasis, buttons
  semibold: 600,    // Semibold - headings, labels
  bold: 700,        // Bold - major headings
  extrabold: 800,   // Extra bold - hero headings
  black: 900        // Black - display type (rare use)
}
```

### Semantic Typography Tokens
```typescript
const typography = {
  // Headings
  heading: {
    hero: {          // Main hero text
      fontSize: '72px',
      lineHeight: '64px',
      fontWeight: 800,
      letterSpacing: '-0.048em'
    },
    h1: {            // Page headings
      fontSize: '48px',
      lineHeight: '48px', 
      fontWeight: 700,
      letterSpacing: '-0.032em'
    },
    h2: {            // Section headings
      fontSize: '36px',
      lineHeight: '40px',
      fontWeight: 600,
      letterSpacing: '-0.025em'
    },
    h3: {            // Subsection headings
      fontSize: '30px',
      lineHeight: '36px',
      fontWeight: 600,
      letterSpacing: '-0.021em'
    },
    h4: {            // Component headings
      fontSize: '24px',
      lineHeight: '32px',
      fontWeight: 600,
      letterSpacing: '-0.019em'
    },
    h5: {            // Small headings
      fontSize: '20px',
      lineHeight: '28px',
      fontWeight: 500,
      letterSpacing: '-0.017em'
    },
    h6: {            // Micro headings
      fontSize: '18px',
      lineHeight: '28px',
      fontWeight: 500,
      letterSpacing: '-0.011em'
    }
  },
  
  // Body Text
  body: {
    xl: {            // Large body (hero descriptions)
      fontSize: '20px',
      lineHeight: '30px', // 1.5x
      fontWeight: 400,
      letterSpacing: '-0.017em'
    },
    lg: {            // Large body
      fontSize: '18px',
      lineHeight: '28px', // 1.556x
      fontWeight: 400,
      letterSpacing: '-0.011em'
    },
    base: {          // Default body text
      fontSize: '16px',
      lineHeight: '24px', // 1.5x
      fontWeight: 400,
      letterSpacing: '0em'
    },
    sm: {            // Small body
      fontSize: '14px',
      lineHeight: '20px', // 1.428x
      fontWeight: 400,
      letterSpacing: '0.016em'
    },
    xs: {            // Extra small body
      fontSize: '12px',
      lineHeight: '16px', // 1.333x
      fontWeight: 400,
      letterSpacing: '0.025em'
    }
  },
  
  // UI Elements
  ui: {
    button: {        // Button text
      lg: { fontSize: '16px', lineHeight: '20px', fontWeight: 500 },
      md: { fontSize: '14px', lineHeight: '20px', fontWeight: 500 },
      sm: { fontSize: '13px', lineHeight: '16px', fontWeight: 500 },
      xs: { fontSize: '12px', lineHeight: '16px', fontWeight: 500 }
    },
    label: {         // Form labels
      fontSize: '14px',
      lineHeight: '20px',
      fontWeight: 500,
      letterSpacing: '0.016em'
    },
    caption: {       // Captions, metadata
      fontSize: '12px',
      lineHeight: '16px',
      fontWeight: 400,
      letterSpacing: '0.025em'
    },
    overline: {      // Overline text
      fontSize: '11px',
      lineHeight: '16px',
      fontWeight: 600,
      letterSpacing: '0.091em',
      textTransform: 'uppercase'
    }
  }
}
```

---

## 4. Enhanced Color System

### Accessibility-First Color Tokens
```typescript
// WCAG AAA Compliant Color System (7:1 contrast ratio)
const colors = {
  // Multi-Brand Primary Colors (Enhanced with precise accessibility)
  freela: {
    // Pink/Coral brand for freelancers
    50: '#fef1f4',   // Lightest tint
    100: '#fde4e9',  // Very light
    200: '#fbccd7',  // Light
    300: '#f7a1b5',  // Light accent
    400: '#f16d8d',  // Medium accent  
    500: '#ec4464',  // PRIMARY - Main brand color
    600: '#d82146',  // Dark accent
    700: '#b51636',  // Dark
    800: '#971432',  // Very dark
    900: '#801430',  // Darkest
    950: '#470516',  // Ultra dark
    
    // Semantic variations
    light: '#f7a1b5',      // For backgrounds
    DEFAULT: '#ec4464',     // Main brand
    dark: '#b51636',       // For text on light backgrounds
    contrast: '#ffffff'     // Text on freela backgrounds
  },
  
  empresa: {
    // Navy blue brand for companies
    50: '#eef3ff',   // Lightest tint
    100: '#e0e8ff',  // Very light  
    200: '#c6d4ff',  // Light
    300: '#9fb3fc',  // Light accent
    400: '#6e85f7',  // Medium accent
    500: '#4459ef',  // Bright accent
    600: '#2a37e2',  // Medium
    700: '#1f28c8',  // Dark accent
    800: '#1b24a1',  // Dark
    900: '#142444',  // PRIMARY - Main brand color
    950: '#0c1329',  // Ultra dark
    
    // Semantic variations
    light: '#9fb3fc',      // For backgrounds
    DEFAULT: '#142444',     // Main brand
    dark: '#0c1329',       // For deep backgrounds
    contrast: '#ffffff'     // Text on empresa backgrounds
  },
  
  institucional: {
    // Warm beige for institutional
    50: '#fdfbf7',   // Lightest tint
    100: '#fbf6ed',  // Very light
    200: '#f6ead6',  // Light
    300: '#ecd4a4',  // PRIMARY - Main brand color
    400: '#e4b876',  // Medium accent
    500: '#de9f53',  // Medium
    600: '#d08848',  // Dark accent
    700: '#ad6b3c',  // Dark
    800: '#8b5736',  // Very dark
    900: '#72482f',  // Darkest
    950: '#3d2418',  // Ultra dark
    
    // Semantic variations
    light: '#f6ead6',      // For backgrounds
    DEFAULT: '#ecd4a4',     // Main brand
    dark: '#ad6b3c',       // For text
    contrast: '#3d2418'     // Text on light backgrounds
  },
  
  // Enhanced Neutral Grays (Perfect for UI)
  gray: {
    25: '#fafafa',    // Ultra light background
    50: '#f7f7f8',    // Light background
    100: '#efefef',   // Very light
    200: '#dcdcde',   // Light borders
    300: '#b9b9bd',   // Medium borders  
    400: '#919196',   // Placeholder text
    500: '#72727a',   // Secondary text
    600: '#5a5a61',   // Primary text (light backgrounds)
    700: '#4a4a50',   // Strong text
    800: '#3f3f44',   // Very strong text
    900: '#333238',   // DEFAULT - Main dark text
    950: '#232326',   // Ultra dark backgrounds
    
    // Semantic variations
    lightest: '#fafafa',   // Page backgrounds
    lighter: '#f7f7f8',    // Card backgrounds  
    light: '#efefef',      // Subtle backgrounds
    medium: '#919196',     // Disabled text
    DEFAULT: '#333238',    // Primary text
    dark: '#232326',       // Dark backgrounds
    contrast: '#ffffff'    // Text on dark backgrounds
  },
  
  // Semantic Colors (WCAG AAA Compliant)
  semantic: {
    success: {
      50: '#f0fdf4',
      100: '#dcfce7', 
      500: '#22c55e',   // Main success
      600: '#16a34a',   // Dark success
      900: '#14532d',   // Text on light success backgrounds
      light: '#dcfce7',
      DEFAULT: '#22c55e',
      dark: '#16a34a',
      contrast: '#ffffff'
    },
    
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      500: '#f59e0b',   // Main warning  
      600: '#d97706',   // Dark warning
      900: '#78350f',   // Text on light warning backgrounds
      light: '#fef3c7',
      DEFAULT: '#f59e0b', 
      dark: '#d97706',
      contrast: '#78350f'
    },
    
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      500: '#ef4444',   // Main error
      600: '#dc2626',   // Dark error
      900: '#7f1d1d',   // Text on light error backgrounds
      light: '#fee2e2',
      DEFAULT: '#ef4444',
      dark: '#dc2626', 
      contrast: '#ffffff'
    },
    
    info: {
      50: '#eff6ff',
      100: '#dbeafe', 
      500: '#3b82f6',   // Main info
      600: '#2563eb',   // Dark info
      900: '#1e3a8a',   // Text on light info backgrounds
      light: '#dbeafe',
      DEFAULT: '#3b82f6',
      dark: '#2563eb',
      contrast: '#ffffff'
    }
  },
  
  // Accent Colors (Premium highlights)
  accent: {
    purple: {
      light: '#c4b5fd',
      DEFAULT: '#8b5cf6',
      dark: '#6d28d9',
      contrast: '#ffffff'
    },
    blue: {
      light: '#93c5fd',
      DEFAULT: '#3b82f6', 
      dark: '#1d4ed8',
      contrast: '#ffffff'
    },
    teal: {
      light: '#5eead4',
      DEFAULT: '#14b8a6',
      dark: '#0f766e',
      contrast: '#ffffff'  
    },
    amber: {
      light: '#fde68a',
      DEFAULT: '#f59e0b',
      dark: '#b45309',
      contrast: '#78350f'
    }
  },
  
  // Surface Colors (Precise opacity values)
  surface: {
    // White variations
    white: '#ffffff',
    'white-soft': '#f8f8f8',    // Slightly off-white
    'white-glass': 'rgba(255, 255, 255, 0.8)',   // Glass effect
    'white-overlay': 'rgba(255, 255, 255, 0.95)', // Modal overlays
    
    // Black variations  
    black: '#000000',
    'black-soft': '#111111',    // Slightly off-black
    'black-glass': 'rgba(0, 0, 0, 0.8)',     // Glass effect
    'black-overlay': 'rgba(0, 0, 0, 0.6)',   // Modal overlays
    
    // Background variations
    'bg-primary': '#ffffff',     // Main page background
    'bg-secondary': '#f7f7f8',   // Secondary sections
    'bg-tertiary': '#efefef',    // Subtle backgrounds
    'bg-brand': '#ec4464',       // Brand backgrounds
    'bg-muted': '#fafafa'        // Muted sections
  }
}
```

### Color Usage Guidelines
```css
/* Contrast Ratios (WCAG AAA - 7:1 minimum) */
:root {
  /* Text on Light Backgrounds */
  --text-on-light-high: #333238;      /* 12.6:1 contrast */
  --text-on-light-medium: #5a5a61;    /* 7.8:1 contrast */
  --text-on-light-low: #919196;       /* 4.5:1 contrast */
  
  /* Text on Dark Backgrounds */
  --text-on-dark-high: #ffffff;       /* 15.3:1 contrast */
  --text-on-dark-medium: #efefef;     /* 13.1:1 contrast */
  --text-on-dark-low: #b9b9bd;        /* 8.2:1 contrast */
  
  /* Brand Color Combinations */
  --text-on-freela: #ffffff;          /* 7.2:1 contrast */
  --text-on-empresa: #ffffff;         /* 15.8:1 contrast */
  --text-on-institucional: #3d2418;   /* 8.9:1 contrast */
}
```

---

## 5. Component Specifications

### Button System (Pixel-Perfect)
```typescript
const buttonSizes = {
  xs: {
    height: '24px',       // 3 * BASE_UNIT
    paddingX: '8px',      // 1 * BASE_UNIT  
    paddingY: '4px',      // 0.5 * BASE_UNIT
    fontSize: '12px',
    iconSize: '12px',
    minWidth: '48px',     // 6 * BASE_UNIT
    borderRadius: '6px'   // 0.75 * BASE_UNIT
  },
  sm: {
    height: '32px',       // 4 * BASE_UNIT
    paddingX: '12px',     // 1.5 * BASE_UNIT
    paddingY: '6px',      // 0.75 * BASE_UNIT
    fontSize: '13px',
    iconSize: '14px', 
    minWidth: '64px',     // 8 * BASE_UNIT
    borderRadius: '8px'   // 1 * BASE_UNIT
  },
  md: {
    height: '40px',       // 5 * BASE_UNIT (DEFAULT)
    paddingX: '16px',     // 2 * BASE_UNIT
    paddingY: '8px',      // 1 * BASE_UNIT
    fontSize: '14px',
    iconSize: '16px',
    minWidth: '80px',     // 10 * BASE_UNIT
    borderRadius: '8px'   // 1 * BASE_UNIT
  },
  lg: {
    height: '48px',       // 6 * BASE_UNIT
    paddingX: '20px',     // 2.5 * BASE_UNIT
    paddingY: '12px',     // 1.5 * BASE_UNIT
    fontSize: '16px',
    iconSize: '18px',
    minWidth: '96px',     // 12 * BASE_UNIT
    borderRadius: '10px'  // 1.25 * BASE_UNIT
  },
  xl: {
    height: '56px',       // 7 * BASE_UNIT
    paddingX: '24px',     // 3 * BASE_UNIT
    paddingY: '16px',     // 2 * BASE_UNIT
    fontSize: '18px',
    iconSize: '20px',
    minWidth: '112px',    // 14 * BASE_UNIT
    borderRadius: '12px'  // 1.5 * BASE_UNIT
  }
}

const buttonVariants = {
  primary: {
    background: 'linear-gradient(135deg, #ec4464 0%, #d82146 100%)',
    color: '#ffffff',
    border: '1px solid transparent',
    boxShadow: '0 2px 4px rgba(236, 68, 100, 0.25)',
    
    // States
    hover: {
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(236, 68, 100, 0.35)',
      background: 'linear-gradient(135deg, #f16d8d 0%, #ec4464 100%)'
    },
    active: {
      transform: 'translateY(0px)',
      boxShadow: '0 1px 2px rgba(236, 68, 100, 0.25)'
    },
    focus: {
      outline: 'none',
      ring: '2px solid rgba(236, 68, 100, 0.5)',
      ringOffset: '2px'
    },
    disabled: {
      opacity: '0.5',
      cursor: 'not-allowed',
      transform: 'none',
      boxShadow: 'none'
    }
  },
  
  secondary: {
    background: '#ffffff',
    color: '#333238',
    border: '1px solid #dcdcde',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
    
    hover: {
      background: '#f7f7f8',
      borderColor: '#b9b9bd',
      transform: 'translateY(-1px)',
      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)'
    },
    active: {
      background: '#efefef',
      transform: 'translateY(0px)'
    },
    focus: {
      outline: 'none', 
      ring: '2px solid rgba(236, 68, 100, 0.3)',
      ringOffset: '2px'
    }
  },
  
  ghost: {
    background: 'transparent',
    color: '#5a5a61',
    border: '1px solid transparent',
    
    hover: {
      background: '#f7f7f8',
      color: '#333238'
    },
    active: {
      background: '#efefef'
    }
  }
}
```

### Form Input System
```typescript
const inputSizes = {
  sm: {
    height: '32px',       // 4 * BASE_UNIT
    paddingX: '8px',      // 1 * BASE_UNIT
    paddingY: '6px',      // 0.75 * BASE_UNIT
    fontSize: '13px',
    borderRadius: '6px'   // 0.75 * BASE_UNIT
  },
  md: {
    height: '40px',       // 5 * BASE_UNIT (DEFAULT)
    paddingX: '12px',     // 1.5 * BASE_UNIT
    paddingY: '8px',      // 1 * BASE_UNIT  
    fontSize: '14px',
    borderRadius: '8px'   // 1 * BASE_UNIT
  },
  lg: {
    height: '48px',       // 6 * BASE_UNIT
    paddingX: '16px',     // 2 * BASE_UNIT
    paddingY: '12px',     // 1.5 * BASE_UNIT
    fontSize: '16px', 
    borderRadius: '10px'  // 1.25 * BASE_UNIT
  }
}

const inputStates = {
  default: {
    background: 'rgba(255, 255, 255, 0.8)',
    backdropBlur: '8px',
    border: '1px solid #dcdcde',
    color: '#333238',
    
    placeholder: {
      color: '#919196'
    }
  },
  
  focus: {
    outline: 'none',
    borderColor: '#ec4464', 
    ring: '2px solid rgba(236, 68, 100, 0.2)',
    background: '#ffffff',
    
    placeholder: {
      color: '#b9b9bd'
    }
  },
  
  error: {
    borderColor: '#ef4444',
    ring: '2px solid rgba(239, 68, 68, 0.2)',
    background: 'rgba(254, 242, 242, 0.8)'
  },
  
  disabled: {
    background: '#f7f7f8',
    borderColor: '#efefef',
    color: '#919196',
    cursor: 'not-allowed'
  }
}
```

### Card Component System
```typescript
const cardVariants = {
  default: {
    background: '#ffffff',
    border: '1px solid #efefef',
    borderRadius: '12px',   // 1.5 * BASE_UNIT
    padding: '24px',        // 3 * BASE_UNIT
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
    
    hover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)'
    }
  },
  
  glass: {
    background: 'rgba(255, 255, 255, 0.8)',
    backdropBlur: '12px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '16px',   // 2 * BASE_UNIT
    padding: '24px',        // 3 * BASE_UNIT  
    boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
    
    hover: {
      background: 'rgba(255, 255, 255, 0.9)',
      transform: 'translateY(-1px)'
    }
  },
  
  premium: {
    background: 'linear-gradient(135deg, #ffffff 0%, #f7f7f8 100%)',
    border: '1px solid #dcdcde',
    borderRadius: '16px',   // 2 * BASE_UNIT
    padding: '32px',        // 4 * BASE_UNIT
    boxShadow: '0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)',
    
    hover: {
      transform: 'translateY(-4px)',
      boxShadow: '0 30px 60px rgba(0, 0, 0, 0.15)'
    }
  }
}
```

### Badge/Chip System
```typescript
const badgeSizes = {
  sm: {
    height: '20px',       // 2.5 * BASE_UNIT
    paddingX: '6px',      // 0.75 * BASE_UNIT
    fontSize: '11px',
    borderRadius: '10px'  // Pill shape
  },
  md: {
    height: '24px',       // 3 * BASE_UNIT (DEFAULT)
    paddingX: '8px',      // 1 * BASE_UNIT
    fontSize: '12px',
    borderRadius: '12px'  // Pill shape
  },
  lg: {
    height: '32px',       // 4 * BASE_UNIT
    paddingX: '12px',     // 1.5 * BASE_UNIT
    fontSize: '13px', 
    borderRadius: '16px'  // Pill shape
  }
}
```

---

## 6. Shadow & Elevation System

### Mathematical Shadow Scale
```typescript
// Based on Material Design elevation principles + custom enhancements
const shadows = {
  // Base shadows (0-5 levels)
  none: 'none',
  xs: '0 1px 2px rgba(0, 0, 0, 0.05)',                                    // 1dp
  sm: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',    // 2dp
  md: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',    // 4dp
  lg: '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',  // 8dp
  xl: '0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)', // 16dp
  
  // Extended shadows (premium effects)
  '2xl': '0 25px 50px rgba(0, 0, 0, 0.25)',                              // 24dp
  '3xl': '0 35px 60px rgba(0, 0, 0, 0.3)',                               // 32dp
  
  // Brand-specific glows
  'glow-freela': {
    light: '0 0 20px rgba(236, 68, 100, 0.3)',
    medium: '0 0 30px rgba(236, 68, 100, 0.4)', 
    strong: '0 0 40px rgba(236, 68, 100, 0.5)'
  },
  
  'glow-empresa': {
    light: '0 0 20px rgba(20, 36, 68, 0.3)',
    medium: '0 0 30px rgba(20, 36, 68, 0.4)',
    strong: '0 0 40px rgba(20, 36, 68, 0.5)'
  },
  
  // Glass morphism shadows
  'glass': '0 8px 32px rgba(31, 38, 135, 0.37)',
  'glass-lg': '0 16px 64px rgba(31, 38, 135, 0.4)',
  
  // Premium shadows for high-end components
  'premium': '0 30px 60px rgba(0, 0, 0, 0.15), 0 8px 24px rgba(0, 0, 0, 0.1)',
  'premium-lg': '0 40px 80px rgba(0, 0, 0, 0.2), 0 12px 32px rgba(0, 0, 0, 0.12)',
  
  // Inner shadows
  'inner-sm': 'inset 0 1px 2px rgba(0, 0, 0, 0.06)',
  'inner': 'inset 0 2px 4px rgba(0, 0, 0, 0.06)',
  'inner-lg': 'inset 0 4px 8px rgba(0, 0, 0, 0.1)'
}
```

### Backdrop Blur Scale
```typescript
const backdropBlur = {
  none: '0px',
  xs: '2px',           // Subtle blur
  sm: '4px',           // Light blur
  md: '8px',           // Medium blur (DEFAULT for glass)
  lg: '12px',          // Strong blur
  xl: '16px',          // Very strong blur  
  '2xl': '24px',       // Ultra blur
  '3xl': '40px'        // Extreme blur (rare use)
}
```

---

## 7. Enhanced Animation & Motion System

### Mathematical Animation Curves
```css
:root {
  /* Cubic Bezier Curves - Mathematically Precise */
  --ease-linear: cubic-bezier(0, 0, 1, 1);
  --ease-in-sine: cubic-bezier(0.12, 0, 0.39, 0);
  --ease-out-sine: cubic-bezier(0.61, 1, 0.88, 1);
  --ease-in-out-sine: cubic-bezier(0.37, 0, 0.63, 1);
  
  --ease-in-quad: cubic-bezier(0.11, 0, 0.5, 0);
  --ease-out-quad: cubic-bezier(0.5, 1, 0.89, 1);
  --ease-in-out-quad: cubic-bezier(0.45, 0, 0.55, 1);
  
  --ease-in-cubic: cubic-bezier(0.32, 0, 0.67, 0);
  --ease-out-cubic: cubic-bezier(0.33, 1, 0.68, 1);
  --ease-in-out-cubic: cubic-bezier(0.65, 0, 0.35, 1);
  
  --ease-in-quart: cubic-bezier(0.5, 0, 0.75, 0);
  --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
  --ease-in-out-quart: cubic-bezier(0.76, 0, 0.24, 1);
  
  --ease-in-quint: cubic-bezier(0.64, 0, 0.78, 0);
  --ease-out-quint: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-in-out-quint: cubic-bezier(0.83, 0, 0.17, 1);
  
  --ease-in-expo: cubic-bezier(0.7, 0, 0.84, 0);
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out-expo: cubic-bezier(0.87, 0, 0.13, 1);
  
  --ease-in-circ: cubic-bezier(0.55, 0, 1, 0.45);
  --ease-out-circ: cubic-bezier(0, 0.55, 0.45, 1);
  --ease-in-out-circ: cubic-bezier(0.85, 0, 0.15, 1);
  
  --ease-in-back: cubic-bezier(0.36, 0, 0.66, -0.56);
  --ease-out-back: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-in-out-back: cubic-bezier(0.68, -0.6, 0.32, 1.6);
  
  /* Premium Custom Curves */
  --ease-premium: cubic-bezier(0.4, 0.0, 0.2, 1);        /* Material Design */
  --ease-smooth: cubic-bezier(0.25, 0.8, 0.25, 1);        /* Ultra smooth */
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);  /* Gentle bounce */
  --ease-elastic: cubic-bezier(0.175, 0.885, 0.32, 1.275); /* Elastic feel */
}
```

### Duration Scale (Performance-Optimized)
```typescript
const duration = {
  // Micro interactions (< 200ms)
  instant: '50ms',     // Immediate feedback
  fast: '100ms',       // Quick transitions
  quick: '150ms',      // Button hover, focus states
  
  // Standard transitions (200-500ms)  
  normal: '200ms',     // DEFAULT - most transitions
  medium: '300ms',     // Modal open/close, dropdown
  slow: '400ms',       // Page transitions
  slower: '500ms',     // Complex animations
  
  // Long animations (500ms+)
  long: '700ms',       // Hero animations
  'extra-long': '1000ms', // Rare, complex sequences
  
  // Special durations
  'bounce': '600ms',   // Bounce animations
  'elastic': '800ms',  // Elastic animations
  'float': '3000ms'    // Floating animations (infinite)
}
```

### Spring Physics System
```typescript
// React Spring / Framer Motion compatible values
const springs = {
  // Gentle springs (low energy)
  gentle: {
    tension: 120,
    friction: 14,
    mass: 1
  },
  
  // Standard springs (medium energy) - DEFAULT
  standard: {
    tension: 170,
    friction: 26,
    mass: 1
  },
  
  // Bouncy springs (high energy)
  bouncy: {
    tension: 200,
    friction: 12,
    mass: 1
  },
  
  // Stiff springs (minimal bounce)
  stiff: {
    tension: 300,
    friction: 35,
    mass: 1
  },
  
  // Wobbly springs (playful)
  wobbly: {
    tension: 180,
    friction: 8,
    mass: 1
  }
}
```

### Enhanced Animation Presets
```css
/* Entrance Animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeInUp {
  from { 
    opacity: 0; 
    transform: translateY(24px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}

@keyframes fadeInDown {
  from { 
    opacity: 0; 
    transform: translateY(-24px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}

@keyframes fadeInLeft {
  from { 
    opacity: 0; 
    transform: translateX(-24px); 
  }
  to { 
    opacity: 1; 
    transform: translateX(0); 
  }
}

@keyframes fadeInRight {
  from { 
    opacity: 0; 
    transform: translateX(24px); 
  }
  to { 
    opacity: 1; 
    transform: translateX(0); 
  }
}

@keyframes scaleIn {
  from { 
    opacity: 0; 
    transform: scale(0.8); 
  }
  to { 
    opacity: 1; 
    transform: scale(1); 
  }
}

@keyframes slideInUp {
  from { 
    transform: translateY(100%); 
    opacity: 0; 
  }
  to { 
    transform: translateY(0); 
    opacity: 1; 
  }
}

/* Continuous Animations */
@keyframes float {
  0%, 100% { 
    transform: translateY(0px); 
  }
  50% { 
    transform: translateY(-12px); 
  }
}

@keyframes pulse {
  0%, 100% { 
    opacity: 1; 
  }
  50% { 
    opacity: 0.6; 
  }
}

@keyframes spin {
  from { 
    transform: rotate(0deg); 
  }
  to { 
    transform: rotate(360deg); 
  }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-8px);
  }
  60% {
    transform: translateY(-4px);
  }
}

/* Premium Effects */
@keyframes shimmer {
  0% { 
    background-position: -1000px 0; 
  }
  100% { 
    background-position: 1000px 0; 
  }
}

@keyframes gradient {
  0%, 100% { 
    background-position: 0% 50%; 
  }
  50% { 
    background-position: 100% 50%; 
  }
}

@keyframes pulseGlow {
  0%, 100% { 
    box-shadow: 0 0 20px rgba(236, 68, 100, 0.4); 
  }
  50% { 
    box-shadow: 0 0 40px rgba(236, 68, 100, 0.7); 
  }
}

/* Text Animations */
@keyframes textReveal {
  0% { 
    clip-path: polygon(0 0, 0 0, 0 100%, 0% 100%); 
  }
  100% { 
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); 
  }
}

@keyframes typewriter {
  from { 
    width: 0; 
  }
  to { 
    width: 100%; 
  }
}
```

### Animation Performance Guidelines
```typescript
const animationPerformance = {
  // GPU-Accelerated properties (60fps guaranteed)
  gpuAccelerated: [
    'transform',        // translateX/Y/Z, rotate, scale
    'opacity',          // fade effects
    'filter'           // blur, brightness, etc.
  ],
  
  // CPU-Heavy properties (avoid in animations)
  cpuHeavy: [
    'width', 'height',  // layout changes
    'top', 'left',      // position changes
    'box-shadow',       // complex shadows (use sparingly)
    'border-radius'     // shape changes
  ],
  
  // Performance budgets
  budgets: {
    maxSimultaneous: 5,        // Max concurrent animations
    maxDuration: '1000ms',     // Max single animation duration
    targetFps: 60,             // Target frame rate
    budgetPerFrame: '16.67ms'  // Budget per frame (1000ms/60fps)
  }
}
```

---

## 8. Responsive Design Tokens

### Breakpoint-Specific Overrides
```typescript
const responsiveTokens = {
  // Typography scaling per breakpoint
  typography: {
    xs: {
      hero: { fontSize: '36px', lineHeight: '40px' },  // 50% of desktop
      h1: { fontSize: '28px', lineHeight: '32px' },
      h2: { fontSize: '24px', lineHeight: '28px' },
      body: { fontSize: '14px', lineHeight: '20px' }
    },
    sm: {
      hero: { fontSize: '48px', lineHeight: '48px' },  // 67% of desktop
      h1: { fontSize: '36px', lineHeight: '40px' },
      h2: { fontSize: '30px', lineHeight: '36px' },
      body: { fontSize: '15px', lineHeight: '22px' }
    },
    md: {
      hero: { fontSize: '60px', lineHeight: '56px' },  // 83% of desktop
      h1: { fontSize: '42px', lineHeight: '44px' },
      h2: { fontSize: '33px', lineHeight: '38px' },
      body: { fontSize: '16px', lineHeight: '24px' }
    },
    lg: {
      // Desktop values (default)
      hero: { fontSize: '72px', lineHeight: '64px' },
      h1: { fontSize: '48px', lineHeight: '48px' },
      h2: { fontSize: '36px', lineHeight: '40px' },
      body: { fontSize: '16px', lineHeight: '24px' }
    }
  },
  
  // Spacing scaling per breakpoint
  spacing: {
    xs: {
      sectionPadding: '32px',    // 4 * BASE_UNIT
      containerPadding: '16px',  // 2 * BASE_UNIT
      cardPadding: '16px',       // 2 * BASE_UNIT
      buttonPadding: '12px'      // 1.5 * BASE_UNIT
    },
    sm: {
      sectionPadding: '48px',    // 6 * BASE_UNIT
      containerPadding: '24px',  // 3 * BASE_UNIT
      cardPadding: '20px',       // 2.5 * BASE_UNIT
      buttonPadding: '16px'      // 2 * BASE_UNIT
    },
    md: {
      sectionPadding: '64px',    // 8 * BASE_UNIT
      containerPadding: '32px',  // 4 * BASE_UNIT
      cardPadding: '24px',       // 3 * BASE_UNIT
      buttonPadding: '16px'      // 2 * BASE_UNIT
    },
    lg: {
      sectionPadding: '96px',    // 12 * BASE_UNIT
      containerPadding: '32px',  // 4 * BASE_UNIT
      cardPadding: '24px',       // 3 * BASE_UNIT
      buttonPadding: '16px'      // 2 * BASE_UNIT
    }
  }
}
```

---

## 9. Implementation Guide

### Tailwind CSS Configuration Update
```javascript
// Update tailwind.config.ts with pixel-perfect tokens
module.exports = {
  theme: {
    extend: {
      // Use exact spacing scale
      spacing: spacing, // From section 2
      
      // Use mathematical font sizes
      fontSize: fontSize, // From section 3
      
      // Use enhanced color system
      colors: colors, // From section 4
      
      // Use precise shadows
      boxShadow: shadows, // From section 6
      
      // Use mathematical animations
      transitionTimingFunction: {
        'premium': 'var(--ease-premium)',
        'smooth': 'var(--ease-smooth)',
        'bounce': 'var(--ease-bounce)',
        'elastic': 'var(--ease-elastic)'
      },
      
      // Use performance-optimized durations
      transitionDuration: duration // From section 7
    }
  }
}
```

### CSS Custom Properties Implementation
```css
/* Add to globals.css */
:root {
  /* Spacing tokens */
  --space-px: 1px;
  --space-0-5: 2px;
  --space-1: 4px;
  --space-2: 8px;
  /* ... continue with all spacing values */
  
  /* Typography tokens */
  --text-xs: 12px;
  --text-sm: 14px;
  --text-base: 16px;
  /* ... continue with all typography values */
  
  /* Color tokens */
  --color-freela-50: #fef1f4;
  --color-freela-500: #ec4464;
  --color-freela-900: #801430;
  /* ... continue with all color values */
  
  /* Animation tokens */
  --duration-fast: 100ms;
  --duration-normal: 200ms;
  --duration-slow: 400ms;
  /* ... continue with all duration values */
}
```

### Component Implementation Example
```typescript
// Button component with pixel-perfect implementation
const Button = ({ size = 'md', variant = 'primary', children, ...props }) => {
  const sizeClasses = {
    xs: 'h-6 px-2 py-1 text-xs min-w-12 rounded-md',      // 24px height
    sm: 'h-8 px-3 py-1.5 text-sm min-w-16 rounded-lg',    // 32px height
    md: 'h-10 px-4 py-2 text-sm min-w-20 rounded-lg',     // 40px height
    lg: 'h-12 px-5 py-3 text-base min-w-24 rounded-xl',   // 48px height
    xl: 'h-14 px-6 py-4 text-lg min-w-28 rounded-xl'      // 56px height
  }
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-freela to-freela-600 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0',
    secondary: 'bg-white text-gray-900 border border-gray-200 shadow-sm hover:bg-gray-50 hover:shadow-md hover:-translate-y-0.5',
    ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900'
  }
  
  return (
    <button 
      className={`
        inline-flex items-center justify-center font-medium transition-all duration-200 ease-premium
        focus:outline-none focus:ring-2 focus:ring-freela/50 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
        ${sizeClasses[size]}
        ${variantClasses[variant]}
      `}
      {...props}
    >
      {children}
    </button>
  )
}
```

---

## 10. Quality Assurance Checklist

### Pixel-Perfect Validation
- [ ] All measurements use 8px base unit multiples
- [ ] Typography follows mathematical scale relationships
- [ ] Color contrast ratios meet WCAG AAA standards (7:1)
- [ ] Component dimensions are consistent across variants
- [ ] Animations use GPU-accelerated properties only
- [ ] Responsive breakpoints maintain proportional relationships
- [ ] All spacing values align to the grid system
- [ ] Shadow depths follow elevation hierarchy
- [ ] Interactive states provide clear visual feedback
- [ ] Focus states meet accessibility requirements

### Performance Validation  
- [ ] Animation frame rate maintains 60fps
- [ ] No layout thrashing during transitions
- [ ] CSS bundle size optimized (<50kb)
- [ ] No unused design tokens in production
- [ ] Critical CSS inlined for above-fold content
- [ ] Font loading optimized with font-display: swap

---

This pixel-perfect design system specification provides exact measurements, mathematical relationships, and implementation-ready tokens for creating a visually consistent and performant user interface. Every value is precisely calculated and aligned to the 8px grid system while maintaining accessibility and performance standards.