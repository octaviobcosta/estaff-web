/**
 * Theme Provider
 * Context and hooks for dynamic theme switching
 */

'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { freelaTheme } from '../themes/freela'
import { empresaTheme } from '../themes/empresa'
import { institucionalTheme } from '../themes/institucional'

// Available themes
export const themes = {
  freela: freelaTheme,
  empresa: empresaTheme,
  institucional: institucionalTheme,
} as const

export type ThemeName = keyof typeof themes
export type Theme = typeof themes[ThemeName]

// Theme context
interface ThemeContextValue {
  theme: Theme
  themeName: ThemeName
  setTheme: (name: ThemeName) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

// Theme provider props
interface ThemeProviderProps {
  children: ReactNode
  defaultTheme?: ThemeName
  storageKey?: string
}

// Theme provider component
export function ThemeProvider({ 
  children, 
  defaultTheme = 'freela',
  storageKey = 'estaff-theme'
}: ThemeProviderProps) {
  const [themeName, setThemeName] = useState<ThemeName>(defaultTheme)
  
  // Load theme from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(storageKey)
    if (stored && stored in themes) {
      setThemeName(stored as ThemeName)
    }
  }, [storageKey])
  
  // Save theme to localStorage when it changes
  useEffect(() => {
    localStorage.setItem(storageKey, themeName)
    
    // Apply theme CSS variables to root
    const root = document.documentElement
    const theme = themes[themeName]
    
    // Apply primary color CSS variables
    if (theme.colors.primary) {
      Object.entries(theme.colors.primary).forEach(([shade, value]) => {
        root.style.setProperty(`--color-primary-${shade}`, value)
      })
    }
    
    // Apply component styles
    root.setAttribute('data-theme', themeName)
  }, [themeName, storageKey])
  
  const setTheme = (name: ThemeName) => {
    setThemeName(name)
  }
  
  const toggleTheme = () => {
    const themeNames = Object.keys(themes) as ThemeName[]
    const currentIndex = themeNames.indexOf(themeName)
    const nextIndex = (currentIndex + 1) % themeNames.length
    setThemeName(themeNames[nextIndex])
  }
  
  const value: ThemeContextValue = {
    theme: themes[themeName],
    themeName,
    setTheme,
    toggleTheme,
  }
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

// Hook to use theme
export function useTheme() {
  const context = useContext(ThemeContext)
  
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  
  return context
}

// Hook to get theme-aware classes
export function useThemeClasses() {
  const { themeName } = useTheme()
  
  return {
    primary: `theme-${themeName}-primary`,
    secondary: `theme-${themeName}-secondary`,
    accent: `theme-${themeName}-accent`,
    background: `theme-${themeName}-bg`,
    text: `theme-${themeName}-text`,
    border: `theme-${themeName}-border`,
  }
}

// Get theme by route or context
export function getThemeByContext(path: string): ThemeName {
  if (path.includes('/freelancer')) return 'freela'
  if (path.includes('/empresa') || path.includes('/company')) return 'empresa'
  if (path.includes('/sobre') || path.includes('/about')) return 'institucional'
  
  // Default based on common patterns
  return 'freela'
}