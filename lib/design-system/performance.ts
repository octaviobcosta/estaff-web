/**
 * Performance Optimization Utilities
 * Tools for optimizing design system performance
 */

import { tokens } from './tokens'

// Token cache for memoization
const tokenCache = new Map<string, any>()

/**
 * Memoized token access for frequently used values
 */
export function getCachedToken<T extends keyof typeof tokens>(
  category: T,
  key: keyof typeof tokens[T]
): typeof tokens[T][keyof typeof tokens[T]] {
  const cacheKey = `${String(category)}.${String(key)}`
  
  if (!tokenCache.has(cacheKey)) {
    const value = tokens[category][key as any]
    tokenCache.set(cacheKey, value)
  }
  
  return tokenCache.get(cacheKey)
}

/**
 * Preload commonly used tokens into cache
 */
export function preloadTokenCache() {
  // Preload most commonly used spacing values
  const commonSpacing = [0, 1, 2, 3, 4, 6, 8, 12, 16]
  commonSpacing.forEach(spacing => {
    getCachedToken('spacing', spacing as keyof typeof tokens.spacing)
  })
  
  // Preload brand colors
  Object.keys(tokens.colors.brand).forEach(brand => {
    const brandColors = tokens.colors.brand[brand as keyof typeof tokens.colors.brand]
    if (typeof brandColors === 'object') {
      ;[400, 500, 600].forEach(shade => {
        getCachedToken('colors', `brand.${brand}.${shade}` as any)
      })
    }
  })
  
  // Preload common typography
  ;['xs', 'sm', 'base', 'lg', 'xl'].forEach(size => {
    getCachedToken('typography', size as keyof typeof tokens.typography)
  })
}

/**
 * CSS-in-JS optimization utilities
 */
export class StyleBuilder {
  private styles: Record<string, any> = {}
  
  spacing(property: string, value: keyof typeof tokens.spacing) {
    this.styles[property] = getCachedToken('spacing', value)
    return this
  }
  
  color(property: string, path: string) {
    // Parse color path like "brand.freela.500"
    const parts = path.split('.')
    let color: any = tokens.colors
    
    for (const part of parts) {
      color = color?.[part]
    }
    
    if (color) {
      this.styles[property] = color
    }
    
    return this
  }
  
  typography(variant: keyof typeof tokens.typography) {
    const typo = getCachedToken('typography', variant)
    Object.assign(this.styles, {
      fontSize: typo.size,
      lineHeight: typo.lineHeight,
      letterSpacing: typo.letterSpacing,
    })
    return this
  }
  
  animation(
    property: string = 'all',
    duration: keyof typeof tokens.durations = 'standard',
    easing: keyof typeof tokens.easings = 'easeOut'
  ) {
    this.styles.transition = `${property} ${tokens.durations[duration]} ${tokens.easings[easing]}`
    return this
  }
  
  build() {
    return { ...this.styles }
  }
  
  reset() {
    this.styles = {}
    return this
  }
}

/**
 * Optimized style builder factory
 */
export function createStyles() {
  return new StyleBuilder()
}

/**
 * Bundle size optimization - tree-shakeable imports
 */
export const optimizedTokens = {
  // Most commonly used spacing values
  spacing: {
    xs: tokens.spacing[1],
    sm: tokens.spacing[2], 
    md: tokens.spacing[4],
    lg: tokens.spacing[6],
    xl: tokens.spacing[8],
  },
  
  // Essential colors only
  colors: {
    primary: tokens.colors.brand.freela[500],
    secondary: tokens.colors.brand.empresa[500], 
    success: tokens.colors.semantic.success[500],
    error: tokens.colors.semantic.error[500],
    gray: {
      light: tokens.colors.gray[100],
      medium: tokens.colors.gray[500],
      dark: tokens.colors.gray[900],
    }
  },
  
  // Core typography
  typography: {
    body: tokens.typography.base,
    heading: tokens.typography.xl,
    caption: tokens.typography.sm,
  },
  
  // Essential animations
  transitions: {
    fast: `all ${tokens.durations.fast} ${tokens.easings.easeOut}`,
    standard: `all ${tokens.durations.standard} ${tokens.easings.easeOut}`,
  }
}

/**
 * Lazy-loaded token modules for code splitting
 */
export const lazyTokens = {
  colors: () => import('./tokens/colors').then(m => m.colors),
  spacing: () => import('./tokens/spacing').then(m => m.spacing),
  typography: () => import('./tokens/typography').then(m => m.typography),
  animations: () => import('./tokens/animation').then(m => m.animations),
  shadows: () => import('./tokens/shadows').then(m => m.shadows),
}

/**
 * Critical path CSS generation
 * Generate minimal CSS for above-the-fold content
 */
export function generateCriticalCSS(): string {
  const critical = `
    :root {
      /* Critical spacing */
      --spacing-xs: ${tokens.spacing[1]};
      --spacing-sm: ${tokens.spacing[2]};
      --spacing-md: ${tokens.spacing[4]};
      --spacing-lg: ${tokens.spacing[6]};
      
      /* Critical colors */
      --color-primary: ${tokens.colors.brand.freela[500]};
      --color-text: ${tokens.colors.gray[900]};
      --color-background: ${tokens.colors.brand.neutral.white};
      
      /* Critical typography */
      --font-family: ${tokens.fontFamilies.primary};
      --font-size-base: ${tokens.typography.base.size};
      --line-height-base: ${tokens.typography.base.lineHeight};
      
      /* Critical transitions */
      --transition-fast: ${tokens.durations.fast} ${tokens.easings.easeOut};
    }
    
    /* Critical utility classes */
    .ds-btn {
      font-family: var(--font-family);
      padding: var(--spacing-sm) var(--spacing-md);
      border-radius: var(--spacing-xs);
      border: none;
      cursor: pointer;
      transition: var(--transition-fast);
    }
    
    .ds-btn-primary {
      background-color: var(--color-primary);
      color: var(--color-background);
    }
    
    .ds-text {
      font-family: var(--font-family);
      font-size: var(--font-size-base);
      line-height: var(--line-height-base);
      color: var(--color-text);
    }
  `.replace(/\s+/g, ' ').trim()
  
  return critical
}

/**
 * Performance monitoring for design system
 */
export class DesignSystemMonitor {
  private static instance: DesignSystemMonitor
  private metrics: {
    tokenAccess: Map<string, number>
    componentRenders: Map<string, number>
    cacheHits: number
    cacheMisses: number
  } = {
    tokenAccess: new Map(),
    componentRenders: new Map(),
    cacheHits: 0,
    cacheMisses: 0,
  }
  
  static getInstance() {
    if (!this.instance) {
      this.instance = new DesignSystemMonitor()
    }
    return this.instance
  }
  
  trackTokenAccess(category: string, key: string) {
    const tokenKey = `${category}.${key}`
    this.metrics.tokenAccess.set(
      tokenKey,
      (this.metrics.tokenAccess.get(tokenKey) || 0) + 1
    )
  }
  
  trackComponentRender(componentName: string) {
    this.metrics.componentRenders.set(
      componentName,
      (this.metrics.componentRenders.get(componentName) || 0) + 1
    )
  }
  
  trackCacheHit() {
    this.metrics.cacheHits++
  }
  
  trackCacheMiss() {
    this.metrics.cacheMisses++
  }
  
  getMetrics() {
    return {
      ...this.metrics,
      cacheHitRate: this.metrics.cacheHits / (this.metrics.cacheHits + this.metrics.cacheMisses),
      mostAccessedTokens: Array.from(this.metrics.tokenAccess.entries())
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10),
      mostRenderedComponents: Array.from(this.metrics.componentRenders.entries())
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10),
    }
  }
  
  logReport() {
    if (process.env.NODE_ENV === 'development') {
      console.group('🎯 Design System Performance Report')
      console.table(this.getMetrics().mostAccessedTokens)
      console.table(this.getMetrics().mostRenderedComponents)
      console.log(`Cache Hit Rate: ${(this.getMetrics().cacheHitRate * 100).toFixed(2)}%`)
      console.groupEnd()
    }
  }
  
  reset() {
    this.metrics = {
      tokenAccess: new Map(),
      componentRenders: new Map(),
      cacheHits: 0,
      cacheMisses: 0,
    }
  }
}

/**
 * React DevTools integration
 */
export function enableDesignSystemDevTools() {
  if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
    ;(window as any).__DESIGN_SYSTEM__ = {
      tokens,
      monitor: DesignSystemMonitor.getInstance(),
      cache: tokenCache,
      clearCache: () => tokenCache.clear(),
      preloadCache: preloadTokenCache,
      generateCriticalCSS,
    }
    
    console.log('🎨 Design System DevTools enabled. Access via window.__DESIGN_SYSTEM__')
  }
}

/**
 * Webpack bundle analysis helpers
 */
export const bundleOptimization = {
  // Mark these as side-effect free for better tree shaking
  sideEffects: false,
  
  // Suggest code splitting points
  splitPoints: [
    'animations', // Can be lazy loaded
    'shadows',    // Not always needed
    'glows',      // Premium features only
  ],
  
  // Critical path modules
  critical: [
    'colors',     // Always needed
    'spacing',    // Always needed  
    'typography', // Always needed
  ]
}

// Initialize performance monitoring
if (process.env.NODE_ENV === 'development') {
  enableDesignSystemDevTools()
}