/**
 * Unit Tests for Design System Color Tokens
 * Tests WCAG AAA compliance, contrast ratios, and mathematical progression
 */

import { 
  colors, 
  getColor, 
  generateColorVars, 
  getContrastRatio, 
  getAccessiblePair,
  type ColorToken 
} from '@/lib/design-system/tokens/colors'

// Test utilities for color analysis
interface WCAGLevel {
  AA: number
  AAA: number
}

const WCAG_CONTRAST_RATIOS: Record<string, WCAGLevel> = {
  normal: { AA: 4.5, AAA: 7.0 },
  large: { AA: 3.0, AAA: 4.5 }
}

/**
 * Calculate actual contrast ratio between two hex colors
 * Implementation of WCAG contrast ratio formula
 */
function calculateContrastRatio(color1: string, color2: string): number {
  const getLuminance = (hex: string): number => {
    // Remove # if present
    const color = hex.replace('#', '')
    
    // Convert to RGB
    const r = parseInt(color.substr(0, 2), 16) / 255
    const g = parseInt(color.substr(2, 2), 16) / 255
    const b = parseInt(color.substr(4, 2), 16) / 255
    
    // Apply gamma correction
    const toLinear = (val: number) => 
      val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4)
    
    const rLinear = toLinear(r)
    const gLinear = toLinear(g)
    const bLinear = toLinear(b)
    
    // Calculate relative luminance
    return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear
  }
  
  const lum1 = getLuminance(color1)
  const lum2 = getLuminance(color2)
  const lighter = Math.max(lum1, lum2)
  const darker = Math.min(lum1, lum2)
  
  return (lighter + 0.05) / (darker + 0.05)
}

/**
 * Validate color format and accessibility
 */
function validateColor(colorValue: string, name: string) {
  // Check hex format
  expect(colorValue).toMatch(/^#[0-9a-fA-F]{6}$/)
  
  // Check if it's a valid hex color
  const isValidHex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(colorValue)
  expect(isValidHex).toBe(true)
}

describe('Design System Color Tokens', () => {
  describe('Color Structure and Format', () => {
    test('should have all required color categories', () => {
      expect(colors).toHaveProperty('brand')
      expect(colors).toHaveProperty('gray')
      expect(colors).toHaveProperty('semantic')
      expect(colors).toHaveProperty('accent')
      expect(colors).toHaveProperty('glass')
    })

    test('should have all brand colors', () => {
      expect(colors.brand).toHaveProperty('freela')
      expect(colors.brand).toHaveProperty('empresa')
      expect(colors.brand).toHaveProperty('institucional')
    })

    test('all color values should be valid hex colors', () => {
      const validateColorObject = (obj: any, path = '') => {
        for (const [key, value] of Object.entries(obj)) {
          const currentPath = path ? `${path}.${key}` : key
          
          if (typeof value === 'string' && value.startsWith('#')) {
            validateColor(value, currentPath)
          } else if (typeof value === 'object' && value !== null) {
            validateColorObject(value, currentPath)
          }
        }
      }
      
      validateColorObject(colors)
    })

    test('brand colors should have complete shade ranges', () => {
      const expectedShades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950']
      
      Object.entries(colors.brand).forEach(([brandName, brandColors]) => {
        expectedShades.forEach(shade => {
          expect(brandColors).toHaveProperty(shade)
          validateColor(brandColors[shade as keyof typeof brandColors], `brand.${brandName}.${shade}`)
        })
      })
    })

    test('gray scale should have all required shades', () => {
      const expectedGrayShades = ['0', '25', '50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950', '1000']
      
      expectedGrayShades.forEach(shade => {
        expect(colors.gray).toHaveProperty(shade)
        validateColor(colors.gray[shade as keyof typeof colors.gray], `gray.${shade}`)
      })
    })
  })

  describe('WCAG Contrast Ratio Compliance', () => {
    test('semantic colors should meet WCAG AAA contrast requirements', () => {
      Object.entries(colors.semantic).forEach(([colorName, colorObj]) => {
        const backgroundColors = [colorObj.light, colorObj.DEFAULT, colorObj.dark]
        const textColor = colorObj.contrast
        
        backgroundColors.forEach((bgColor, index) => {
          const contrastRatio = calculateContrastRatio(bgColor, textColor)
          const colorVariant = index === 0 ? 'light' : index === 1 ? 'default' : 'dark'
          
          expect(contrastRatio).toBeGreaterThanOrEqual(WCAG_CONTRAST_RATIOS.normal.AAA)
          
          // Log actual ratios for verification
          console.log(`${colorName}.${colorVariant} contrast ratio: ${contrastRatio.toFixed(2)}:1`)
        })
      })
    })

    test('brand primary colors should have sufficient contrast with white/black', () => {
      const brandPrimaries = {
        'freela.500': colors.brand.freela['500'],
        'empresa.900': colors.brand.empresa['900'],
        'institucional.300': colors.brand.institucional['300']
      }
      
      Object.entries(brandPrimaries).forEach(([name, color]) => {
        const whiteContrast = calculateContrastRatio(color, colors.gray['0'])
        const blackContrast = calculateContrastRatio(color, colors.gray['1000'])
        
        // At least one should meet AA standards
        const meetsStandards = whiteContrast >= WCAG_CONTRAST_RATIOS.normal.AA || 
                              blackContrast >= WCAG_CONTRAST_RATIOS.normal.AA
        
        expect(meetsStandards).toBe(true)
        
        console.log(`${name} - White: ${whiteContrast.toFixed(2)}:1, Black: ${blackContrast.toFixed(2)}:1`)
      })
    })

    test('gray scale should have proper contrast progression', () => {
      // Test adjacent gray shades have sufficient contrast
      const grayShades = ['0', '100', '200', '300', '400', '500', '600', '700', '800', '900', '1000']
      
      for (let i = 0; i < grayShades.length - 2; i++) {
        const lightShade = colors.gray[grayShades[i] as keyof typeof colors.gray]
        const darkShade = colors.gray[grayShades[i + 2] as keyof typeof colors.gray]
        
        const contrastRatio = calculateContrastRatio(lightShade, darkShade)
        expect(contrastRatio).toBeGreaterThanOrEqual(3.0) // Minimum for visual distinction
      }
    })
  })

  describe('Mathematical Color Progression', () => {
    test('brand colors should follow mathematical progression in luminance', () => {
      Object.entries(colors.brand).forEach(([brandName, brandColors]) => {
        const shades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950']
        const luminanceValues: number[] = []
        
        shades.forEach(shade => {
          const color = brandColors[shade as keyof typeof brandColors]
          const luminance = calculateContrastRatio(color, '#000000') - 1
          luminanceValues.push(luminance)
        })
        
        // Check that luminance decreases as shade numbers increase
        for (let i = 0; i < luminanceValues.length - 1; i++) {
          expect(luminanceValues[i]).toBeGreaterThan(luminanceValues[i + 1])
        }
      })
    })

    test('color temperature should be consistent within brand families', () => {
      // This would test color temperature consistency
      // For now, we'll test that colors maintain their hue family
      Object.entries(colors.brand).forEach(([brandName, brandColors]) => {
        const primaryColor = brandColors['500']
        const lighterShades = [brandColors['100'], brandColors['200'], brandColors['300']]
        const darkerShades = [brandColors['700'], brandColors['800'], brandColors['900']]
        
        // Test that all shades are recognizably the same hue family
        // This is a simplified test - in production you'd analyze HSL values
        expect(typeof primaryColor).toBe('string')
        expect(primaryColor).toMatch(/^#[0-9a-fA-F]{6}$/)
        
        const allShades = lighterShades.concat(darkerShades)
        allShades.forEach(shade => {
          expect(shade).toMatch(/^#[0-9a-fA-F]{6}$/)
        })
      })
    })
  })

  describe('Color Utility Functions', () => {
    test('getColor should return correct colors', () => {
      expect(getColor('brand.freela.500')).toBe('#ec4464')
      expect(getColor('brand.empresa.900')).toBe('#142444')
      expect(getColor('brand.institucional.300')).toBe('#ecd4a4')
      expect(getColor('gray.0')).toBe('#ffffff')
      expect(getColor('gray.1000')).toBe('#000000')
    })

    test('getColor should handle invalid paths gracefully', () => {
      // Mock console.warn to verify warning is logged
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
      
      expect(getColor('invalid.path')).toBe('#000000')
      expect(getColor('brand.nonexistent.500')).toBe('#000000')
      
      expect(consoleSpy).toHaveBeenCalledWith('Color token not found: invalid.path')
      consoleSpy.mockRestore()
    })

    test('generateColorVars should create CSS custom properties', () => {
      const vars = generateColorVars()
      
      expect(vars).toHaveProperty('--ds-brand-freela-500', '#ec4464')
      expect(vars).toHaveProperty('--ds-brand-empresa-900', '#142444')
      expect(vars).toHaveProperty('--ds-gray-0', '#ffffff')
      
      // Count total variables
      const varCount = Object.keys(vars).length
      expect(varCount).toBeGreaterThan(50) // Should have many color variables
    })

    test('generateColorVars should accept custom prefix', () => {
      const vars = generateColorVars('--custom')
      
      expect(vars).toHaveProperty('--custom-brand-freela-500', '#ec4464')
      expect(vars).toHaveProperty('--custom-gray-0', '#ffffff')
    })

    test('getAccessiblePair should return high contrast combinations', () => {
      const result = getAccessiblePair(colors.brand.freela['500'])
      
      expect(result).toHaveProperty('background')
      expect(result).toHaveProperty('foreground')
      expect(result).toHaveProperty('ratio')
      
      expect(result.background).toBe(colors.brand.freela['500'])
      expect([colors.gray['0'], colors.gray['900']]).toContain(result.foreground)
      expect(result.ratio).toBeGreaterThanOrEqual(4.5)
    })
  })

  describe('Glass Morphism Colors', () => {
    test('should have proper alpha channel values', () => {
      expect(colors.glass.background).toMatch(/rgba\(\d+, \d+, \d+, 0\.\d+\)/)
      expect(colors.glass.backgroundHover).toMatch(/rgba\(\d+, \d+, \d+, 0\.\d+\)/)
      expect(colors.glass.border).toMatch(/rgba\(\d+, \d+, \d+, 0\.\d+\)/)
      expect(colors.glass.borderHover).toMatch(/rgba\(\d+, \d+, \d+, 0\.\d+\)/)
      expect(colors.glass.text).toMatch(/rgba\(\d+, \d+, \d+, 0\.\d+\)/)
      expect(colors.glass.backdrop).toMatch(/rgba\(\d+, \d+, \d+, 0\.\d+\)/)
    })

    test('hover states should have higher opacity than default states', () => {
      const backgroundOpacity = parseFloat(colors.glass.background.match(/0\.\d+/)?.[0] || '0')
      const backgroundHoverOpacity = parseFloat(colors.glass.backgroundHover.match(/0\.\d+/)?.[0] || '0')
      
      const borderOpacity = parseFloat(colors.glass.border.match(/0\.\d+/)?.[0] || '0')
      const borderHoverOpacity = parseFloat(colors.glass.borderHover.match(/0\.\d+/)?.[0] || '0')
      
      expect(backgroundHoverOpacity).toBeGreaterThan(backgroundOpacity)
      expect(borderHoverOpacity).toBeGreaterThan(borderOpacity)
    })
  })

  describe('Performance and Memory', () => {
    test('color objects should be frozen/immutable', () => {
      expect(Object.isFrozen(colors)).toBe(true)
    })

    test('getColor function should be performant', () => {
      const startTime = performance.now()
      
      for (let i = 0; i < 1000; i++) {
        getColor('brand.freela.500')
        getColor('gray.900')
        getColor('semantic.success.DEFAULT')
      }
      
      const endTime = performance.now()
      const duration = endTime - startTime
      
      // Should complete 3000 calls in under 50ms
      expect(duration).toBeLessThan(50)
    })

    test('generateColorVars should cache results', () => {
      const startTime = performance.now()
      const vars1 = generateColorVars()
      const midTime = performance.now()
      const vars2 = generateColorVars()
      const endTime = performance.now()
      
      const firstCallTime = midTime - startTime
      const secondCallTime = endTime - midTime
      
      // Results should be identical
      expect(vars1).toEqual(vars2)
      
      // Second call should be much faster (assuming caching)
      // This test might need adjustment based on actual caching implementation
      expect(secondCallTime).toBeLessThanOrEqual(firstCallTime)
    })
  })

  describe('Type Safety', () => {
    test('color token types should be properly defined', () => {
      const colorToken: ColorToken = colors
      expect(colorToken).toBeDefined()
      
      // Test that TypeScript compilation would catch invalid access
      // @ts-expect-error - This should fail TypeScript compilation
      const invalid = colors.nonexistent
    })
  })
})