/**
 * Theme Provider and Context
 * Centralized theme management for the design system
 */

'use client'

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { tokens } from '../tokens'

export type ThemeType = 'freela' | 'empresa' | 'institucional'

interface ThemeContextValue {
  theme: ThemeType
  setTheme: (theme: ThemeType) => void
  colors: typeof tokens.colors.brand[ThemeType]
  mounted: boolean
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

interface ThemeProviderProps {
  children: ReactNode
  defaultTheme?: ThemeType
  storageKey?: string
}

/**
 * Enhanced Theme Provider with CSS custom properties injection
 */
export function ThemeProvider({
  children,
  defaultTheme = 'freela',
  storageKey = 'estaff-theme'
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeType>(defaultTheme)
  const [mounted, setMounted] = useState(false)

  // Hydration-safe theme initialization
  useEffect(() => {
    const savedTheme = localStorage.getItem(storageKey) as ThemeType
    if (savedTheme && ['freela', 'empresa', 'institucional'].includes(savedTheme)) {
      setThemeState(savedTheme)
    }
    setMounted(true)
  }, [storageKey])

  // Update CSS custom properties when theme changes
  useEffect(() => {
    if (!mounted) return

    const root = document.documentElement
    const themeColors = tokens.colors.brand[theme]

    // Inject theme-specific CSS custom properties
    Object.entries(themeColors).forEach(([shade, color]) => {
      root.style.setProperty(`--theme-${shade}`, color)
    })

    // Update theme class on document
    root.classList.remove('theme-freela', 'theme-empresa', 'theme-institucional')
    root.classList.add(`theme-${theme}`)

    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', themeColors[500])
    }

    // Persist theme preference
    localStorage.setItem(storageKey, theme)
  }, [theme, mounted, storageKey])

  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme)
  }

  const contextValue: ThemeContextValue = {
    theme,
    setTheme,
    colors: tokens.colors.brand[theme],
    mounted,
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}

/**
 * Hook to access theme context
 */
export function useThemeContext() {
  const context = useContext(ThemeContext)
  
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider')
  }
  
  return context
}

/**
 * Higher-order component for theme-aware components
 */
export function withTheme<P extends object>(
  Component: React.ComponentType<P & { theme: ThemeType }>
) {
  return function ThemedComponent(props: P) {
    const { theme } = useThemeContext()
    
    return <Component {...props} theme={theme} />
  }
}

/**
 * Theme switcher component
 */
interface ThemeSwitcherProps {
  className?: string
  showLabels?: boolean
}

export function ThemeSwitcher({ className, showLabels = true }: ThemeSwitcherProps) {
  const { theme, setTheme, mounted } = useThemeContext()

  if (!mounted) return null

  const themes = [
    { key: 'freela' as const, label: 'Freelancer', color: tokens.colors.brand.freela[500] },
    { key: 'empresa' as const, label: 'Empresa', color: tokens.colors.brand.empresa[500] },
    { key: 'institucional' as const, label: 'Institucional', color: tokens.colors.brand.institucional[500] },
  ]

  return (
    <div className={`flex gap-2 ${className}`}>
      {themes.map(({ key, label, color }) => (
        <button
          key={key}
          onClick={() => setTheme(key)}
          className={`
            flex items-center gap-2 px-3 py-2 rounded-lg transition-all
            ${theme === key 
              ? 'bg-white shadow-md ring-2 ring-offset-2' 
              : 'hover:bg-gray-50'
            }
          `}
          style={{
            ...(theme === key && { 
              ringColor: color,
              borderColor: color 
            })
          }}
          aria-label={`Switch to ${label} theme`}
        >
          <div
            className="w-4 h-4 rounded-full border-2 border-gray-200"
            style={{ backgroundColor: color }}
          />
          {showLabels && (
            <span className="text-sm font-medium text-gray-700">
              {label}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}

/**
 * Component to get current theme colors
 */
export function useThemeColors() {
  const { theme, colors, mounted } = useThemeContext()
  
  return {
    theme,
    colors,
    mounted,
    primary: colors[500],
    primaryHover: colors[600],
    primaryLight: colors[400],
    primaryDark: colors[700],
  }
}