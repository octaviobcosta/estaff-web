/**
 * Design System Hooks
 * Custom hooks for seamless design system integration
 */

'use client'

import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { tokens } from '../tokens'
import type { DesignTokens } from '../tokens'

// Theme context hook
export function useTheme() {
  const [theme, setTheme] = useState<'freela' | 'empresa' | 'institucional'>('freela')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('estaff-theme') as typeof theme
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [])

  const switchTheme = (newTheme: typeof theme) => {
    setTheme(newTheme)
    localStorage.setItem('estaff-theme', newTheme)
  }

  return { theme, switchTheme, mounted }
}

// Responsive breakpoint hook
export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<keyof typeof tokens.breakpoints>('sm')

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth
      if (width >= tokens.breakpoints['2xl']) setBreakpoint('2xl')
      else if (width >= tokens.breakpoints.xl) setBreakpoint('xl')
      else if (width >= tokens.breakpoints.lg) setBreakpoint('lg')
      else if (width >= tokens.breakpoints.md) setBreakpoint('md')
      else if (width >= tokens.breakpoints.sm) setBreakpoint('sm')
      else setBreakpoint('xs')
    }

    updateBreakpoint()
    window.addEventListener('resize', updateBreakpoint)
    return () => window.removeEventListener('resize', updateBreakpoint)
  }, [])

  const isMobile = breakpoint === 'xs' || breakpoint === 'sm'
  const isTablet = breakpoint === 'md'
  const isDesktop = breakpoint === 'lg' || breakpoint === 'xl' || breakpoint === '2xl'

  return { breakpoint, isMobile, isTablet, isDesktop }
}

// Spacing utility hook
export function useSpacing() {
  const spacing = tokens.spacing
  
  const getSpacing = (value: keyof typeof tokens.spacing) => spacing[value]
  const getPixelValue = (value: keyof typeof tokens.spacing) => 
    parseInt(spacing[value].replace('px', ''))
  
  const rem = (pixels: number) => `${pixels / 16}rem`
  const em = (pixels: number, context = 16) => `${pixels / context}em`
  
  return { 
    spacing, 
    getSpacing, 
    getPixelValue,
    rem,
    em,
    // Common spacing patterns
    container: spacing[20], // 80px
    section: spacing[16],   // 64px  
    component: spacing[6],  // 24px
    element: spacing[4],    // 16px
    tight: spacing[2],      // 8px
  }
}

// Typography utility hook
export function useTypography() {
  const typography = tokens.typography
  
  const getTextStyle = (variant: keyof typeof typography) => ({
    fontSize: typography[variant].size,
    lineHeight: typography[variant].lineHeight,
    letterSpacing: typography[variant].letterSpacing,
    fontWeight: typography[variant].fontWeight,
  })
  
  const getFontFamily = (type: keyof typeof tokens.fontFamilies) => 
    tokens.fontFamilies[type]
  
  return { 
    typography, 
    getTextStyle,
    getFontFamily,
    // Semantic text sizes
    hero: getTextStyle('4xl'),
    title: getTextStyle('3xl'), 
    heading: getTextStyle('2xl'),
    subheading: getTextStyle('xl'),
    body: getTextStyle('base'),
    caption: getTextStyle('sm'),
    micro: getTextStyle('xs'),
  }
}

// Color utility hook with theme awareness
export function useColors() {
  const { theme } = useTheme()
  const colors = tokens.colors
  
  const getThemeColor = (shade: number = 500) => {
    return colors.brand[theme][shade]
  }
  
  const getContrastColor = (backgroundColor: string) => {
    // Simple contrast calculation - in production use a proper contrast library
    const hex = backgroundColor.replace('#', '')
    const r = parseInt(hex.substr(0, 2), 16)
    const g = parseInt(hex.substr(2, 2), 16)  
    const b = parseInt(hex.substr(4, 2), 16)
    const brightness = (r * 299 + g * 587 + b * 114) / 1000
    return brightness > 128 ? colors.gray[900] : colors.brand.neutral.white
  }
  
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16), 
      b: parseInt(result[3], 16)
    } : null
  }
  
  const rgba = (hex: string, alpha: number) => {
    const rgb = hexToRgb(hex)
    return rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})` : hex
  }
  
  return {
    colors,
    theme,
    getThemeColor,
    getContrastColor,
    hexToRgb,
    rgba,
    // Semantic color shortcuts
    primary: getThemeColor(500),
    primaryHover: getThemeColor(600),
    secondary: colors.gray[600],
    success: colors.semantic.success[500],
    error: colors.semantic.error[500],
    warning: colors.semantic.warning[500],
    info: colors.semantic.info[500],
  }
}

// Animation utility hook
export function useAnimation() {
  const animations = tokens.animations
  const durations = tokens.durations
  const easings = tokens.easings
  const springs = tokens.springs
  
  const createTransition = (
    property: string = 'all',
    duration: keyof typeof durations = 'standard',
    easing: keyof typeof easings = 'easeOut'
  ) => ({
    transition: `${property} ${durations[duration]} ${easings[easing]}`
  })
  
  const spring = (type: keyof typeof springs = 'gentle') => springs[type]
  
  return {
    animations,
    durations,
    easings,
    springs,
    createTransition,
    spring,
    // Common animation patterns
    fadeIn: { ...animations.fadeIn },
    slideUp: { ...animations.slideUp },
    scaleIn: { ...animations.scaleIn },
    hover: createTransition('transform', 'fast'),
    smooth: createTransition('all', 'standard'),
    quick: createTransition('all', 'fast'),
  }
}

// Media query hook
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    
    if (media.matches !== matches) {
      setMatches(media.matches)
    }
    
    const listener = () => setMatches(media.matches)
    media.addListener(listener)
    return () => media.removeListener(listener)
  }, [matches, query])

  return matches
}

// Reduced motion preference hook
export function useReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}

// Focus management hook
export function useFocusManagement() {
  const [focusVisible, setFocusVisible] = useState(false)
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setFocusVisible(true)
      }
    }
    
    const handleMouseDown = () => {
      setFocusVisible(false)
    }
    
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleMouseDown)
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleMouseDown)
    }
  }, [])
  
  return focusVisible
}

// Component size calculation hook
export function useComponentSize<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })
  
  useEffect(() => {
    if (!ref.current) return
    
    const resizeObserver = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect
      setSize({ width, height })
    })
    
    resizeObserver.observe(ref.current)
    
    return () => resizeObserver.disconnect()
  }, [])
  
  return { ref, size }
}

// Design token validation hook (development only)
export function useTokenValidation() {
  const [isValid, setIsValid] = useState(true)
  const [errors, setErrors] = useState<string[]>([])
  
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      import('../tokens').then(({ validateTokens }) => {
        const validation = validateTokens()
        setIsValid(validation.valid)
        setErrors(validation.errors)
        
        if (!validation.valid) {
          console.warn('Design System Token Validation Errors:', validation.errors)
        }
      })
    }
  }, [])
  
  return { isValid, errors }
}

// All hooks re-export
export * from './theme'