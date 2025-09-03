/**
 * Unit Tests for Design System Typography Tokens
 * Tests mathematical scaling, readability, and responsive calculations
 */

import { 
  BASE_FONT_SIZE,
  fontFamilies,
  fontWeights,
  fontSizes,
  typography,
  getTypographyStyle,
  fluidTypography,
  generateTypographyVars,
  textTruncation,
  type FontFamily,
  type FontWeight,
  type FontSize,
  type TypographyCategory,
  type HeadingLevel
} from '@/lib/design-system/tokens/typography'

describe('Design System Typography Tokens', () => {
  describe('Base Typography Configuration', () => {
    test('should use 16px as base font size', () => {
      expect(BASE_FONT_SIZE).toBe(16)
    })

    test('should have appropriate font families', () => {
      expect(fontFamilies.sans).toContain('var(--font-dm-sans)')
      expect(fontFamilies.sans).toContain('system-ui')
      expect(fontFamilies.sans).toContain('sans-serif')
      
      expect(fontFamilies.display).toContain('var(--font-dm-sans)')
      expect(fontFamilies.display).toContain('system-ui')
      
      expect(fontFamilies.mono).toContain('Monaco')
      expect(fontFamilies.mono).toContain('Consolas')
      expect(fontFamilies.mono).toContain('monospace')
    })

    test('should have complete font weight scale', () => {
      const expectedWeights = [
        'thin', 'extralight', 'light', 'regular', 'medium', 
        'semibold', 'bold', 'extrabold', 'black'
      ]
      
      expectedWeights.forEach(weight => {
        expect(fontWeights).toHaveProperty(weight)
        expect(typeof fontWeights[weight as keyof typeof fontWeights]).toBe('number')
      })
      
      // Check specific weight values
      expect(fontWeights.thin).toBe(100)
      expect(fontWeights.regular).toBe(400)
      expect(fontWeights.bold).toBe(700)
      expect(fontWeights.black).toBe(900)
    })

    test('font weights should increase progressively', () => {
      const weights = Object.values(fontWeights)
      
      for (let i = 0; i < weights.length - 1; i++) {
        expect(weights[i + 1]).toBeGreaterThan(weights[i])
      }
      
      // Check that weights are in 100-unit increments
      weights.forEach(weight => {
        expect(weight % 100).toBe(0)
        expect(weight).toBeGreaterThanOrEqual(100)
        expect(weight).toBeLessThanOrEqual(900)
      })
    })
  })

  describe('Font Size Mathematical Scaling', () => {
    test('should have complete font size range', () => {
      const expectedSizes = [
        '2xs', 'xs', 'sm', 'base', 'lg', 'xl', 
        '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl'
      ]
      
      expectedSizes.forEach(size => {
        expect(fontSizes).toHaveProperty(size)
        
        const fontSize = fontSizes[size as keyof typeof fontSizes]
        expect(fontSize).toHaveProperty('size')
        expect(fontSize).toHaveProperty('lineHeight')
        expect(fontSize).toHaveProperty('letterSpacing')
        
        // Validate size format
        expect(fontSize.size).toMatch(/^\d+px$/)
        expect(typeof fontSize.lineHeight).toBe('number')
        expect(typeof fontSize.letterSpacing).toBe('string')
      })
    })

    test('font sizes should increase progressively', () => {
      const sizes = Object.entries(fontSizes).map(([key, value]) => ({
        key,
        numericValue: parseInt(value.size.replace('px', ''))
      }))
      
      // Sort by numeric value to check progression
      sizes.sort((a, b) => a.numericValue - b.numericValue)
      
      for (let i = 0; i < sizes.length - 1; i++) {
        expect(sizes[i + 1].numericValue).toBeGreaterThan(sizes[i].numericValue)
      }
    })

    test('should follow mathematical scaling ratios', () => {
      // Check specific size calculations
      expect(fontSizes['2xs'].size).toBe(`${BASE_FONT_SIZE * 0.625}px`)  // 10px
      expect(fontSizes.xs.size).toBe(`${BASE_FONT_SIZE * 0.75}px`)       // 12px
      expect(fontSizes.sm.size).toBe(`${BASE_FONT_SIZE * 0.875}px`)      // 14px
      expect(fontSizes.base.size).toBe(`${BASE_FONT_SIZE}px`)            // 16px
      expect(fontSizes.lg.size).toBe(`${BASE_FONT_SIZE * 1.125}px`)      // 18px
      expect(fontSizes.xl.size).toBe(`${BASE_FONT_SIZE * 1.25}px`)       // 20px
      expect(fontSizes['2xl'].size).toBe(`${BASE_FONT_SIZE * 1.5}px`)    // 24px
      expect(fontSizes['3xl'].size).toBe(`${BASE_FONT_SIZE * 1.875}px`)  // 30px
      expect(fontSizes['4xl'].size).toBe(`${BASE_FONT_SIZE * 2.25}px`)   // 36px
      expect(fontSizes['5xl'].size).toBe(`${BASE_FONT_SIZE * 3}px`)      // 48px
      expect(fontSizes['6xl'].size).toBe(`${BASE_FONT_SIZE * 3.75}px`)   // 60px
      expect(fontSizes['7xl'].size).toBe(`${BASE_FONT_SIZE * 4.5}px`)    // 72px
      expect(fontSizes['8xl'].size).toBe(`${BASE_FONT_SIZE * 6}px`)      // 96px
      expect(fontSizes['9xl'].size).toBe(`${BASE_FONT_SIZE * 8}px`)      // 128px
    })

    test('line heights should optimize for readability', () => {
      // Smaller text should have higher line height for readability
      expect(fontSizes['2xs'].lineHeight).toBeGreaterThan(fontSizes['9xl'].lineHeight)
      expect(fontSizes.xs.lineHeight).toBeGreaterThan(fontSizes['8xl'].lineHeight)
      expect(fontSizes.sm.lineHeight).toBeGreaterThan(fontSizes['7xl'].lineHeight)
      
      // Base size should have optimal reading line height (~1.5)
      expect(fontSizes.base.lineHeight).toBe(1.5)
      
      // Large display sizes should have tighter line height
      expect(fontSizes['7xl'].lineHeight).toBeLessThan(1.3)
      expect(fontSizes['8xl'].lineHeight).toBeLessThan(1.2)
      expect(fontSizes['9xl'].lineHeight).toBe(1)
    })

    test('letter spacing should compensate for size', () => {
      // Smaller fonts should have positive letter spacing
      expect(fontSizes['2xs'].letterSpacing).toBe('0.025em')
      expect(fontSizes.xs.letterSpacing).toBe('0.02em')
      expect(fontSizes.sm.letterSpacing).toBe('0.01em')
      
      // Base size should have neutral spacing
      expect(fontSizes.base.letterSpacing).toBe('0')
      
      // Larger fonts should have negative letter spacing
      expect(fontSizes.lg.letterSpacing).toBe('-0.01em')
      expect(fontSizes.xl.letterSpacing).toBe('-0.015em')
      expect(fontSizes['2xl'].letterSpacing).toBe('-0.02em')
      
      // Very large fonts should have more negative spacing
      expect(fontSizes['7xl'].letterSpacing).toBe('-0.045em')
      expect(fontSizes['8xl'].letterSpacing).toBe('-0.05em')
      expect(fontSizes['9xl'].letterSpacing).toBe('-0.055em')
    })
  })

  describe('Semantic Typography Styles', () => {
    test('should have all semantic categories', () => {
      expect(typography).toHaveProperty('display')
      expect(typography).toHaveProperty('heading')
      expect(typography).toHaveProperty('body')
      expect(typography).toHaveProperty('ui')
    })

    test('display styles should be appropriate for hero sections', () => {
      const { display } = typography
      
      expect(display).toHaveProperty('hero')
      expect(display).toHaveProperty('title')
      expect(display).toHaveProperty('subtitle')
      
      // Hero should be largest and boldest
      expect(display.hero.fontSize).toBe(fontSizes['7xl'].size)
      expect(display.hero.fontWeight).toBe(fontWeights.black)
      expect(display.hero.fontFamily).toBe(fontFamilies.display)
      
      // Sizes should decrease hierarchically
      const heroSize = parseInt(display.hero.fontSize)
      const titleSize = parseInt(display.title.fontSize)
      const subtitleSize = parseInt(display.subtitle.fontSize)
      
      expect(heroSize).toBeGreaterThan(titleSize)
      expect(titleSize).toBeGreaterThan(subtitleSize)
    })

    test('heading styles should follow hierarchical sizing', () => {
      const { heading } = typography
      const headingLevels: HeadingLevel[] = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
      
      headingLevels.forEach(level => {
        expect(heading).toHaveProperty(level)
        expect(heading[level]).toHaveProperty('fontSize')
        expect(heading[level]).toHaveProperty('fontWeight')
        expect(heading[level]).toHaveProperty('lineHeight')
        expect(heading[level]).toHaveProperty('letterSpacing')
        expect(heading[level]).toHaveProperty('fontFamily')
      })
      
      // Check hierarchical size progression
      const sizes = headingLevels.map(level => parseInt(heading[level].fontSize))
      
      for (let i = 0; i < sizes.length - 1; i++) {
        expect(sizes[i]).toBeGreaterThan(sizes[i + 1])
      }
      
      // Check specific mappings
      expect(heading.h1.fontSize).toBe(fontSizes['4xl'].size)
      expect(heading.h2.fontSize).toBe(fontSizes['3xl'].size)
      expect(heading.h3.fontSize).toBe(fontSizes['2xl'].size)
      expect(heading.h4.fontSize).toBe(fontSizes.xl.size)
      expect(heading.h5.fontSize).toBe(fontSizes.lg.size)
      expect(heading.h6.fontSize).toBe(fontSizes.base.size)
    })

    test('body text styles should optimize for readability', () => {
      const { body } = typography
      
      expect(body).toHaveProperty('large')
      expect(body).toHaveProperty('base')
      expect(body).toHaveProperty('small')
      expect(body).toHaveProperty('tiny')
      
      // Check size progression
      const largeSize = parseInt(body.large.fontSize)
      const baseSize = parseInt(body.base.fontSize)
      const smallSize = parseInt(body.small.fontSize)
      const tinySize = parseInt(body.tiny.fontSize)
      
      expect(largeSize).toBeGreaterThan(baseSize)
      expect(baseSize).toBeGreaterThan(smallSize)
      expect(smallSize).toBeGreaterThan(tinySize)
      
      // Check line heights are optimized for reading
      expect(body.large.lineHeight).toBeGreaterThanOrEqual(1.6)
      expect(body.base.lineHeight).toBeGreaterThanOrEqual(1.6)
      expect(body.small.lineHeight).toBeGreaterThanOrEqual(1.5)
      expect(body.tiny.lineHeight).toBeGreaterThanOrEqual(1.4)
      
      // All body text should use regular weight
      expect(body.large.fontWeight).toBe(fontWeights.regular)
      expect(body.base.fontWeight).toBe(fontWeights.regular)
      expect(body.small.fontWeight).toBe(fontWeights.regular)
      expect(body.tiny.fontWeight).toBe(fontWeights.regular)
    })

    test('UI text styles should be functional', () => {
      const { ui } = typography
      
      expect(ui).toHaveProperty('label')
      expect(ui).toHaveProperty('button')
      expect(ui).toHaveProperty('caption')
      expect(ui).toHaveProperty('code')
      
      // Labels should be medium weight for clarity
      expect(ui.label.fontWeight).toBe(fontWeights.medium)
      expect(ui.label.lineHeight).toBe(1.2) // Compact for UI
      
      // Buttons should be semibold and compact
      expect(ui.button.fontWeight).toBe(fontWeights.semibold)
      expect(ui.button.lineHeight).toBe(1)
      
      // Code should use monospace font
      expect(ui.code.fontFamily).toBe(fontFamilies.mono)
      
      // Caption should be smallest UI text
      const captionSize = parseInt(ui.caption.fontSize)
      const labelSize = parseInt(ui.label.fontSize)
      const buttonSize = parseInt(ui.button.fontSize)
      
      expect(labelSize).toBeGreaterThanOrEqual(captionSize)
      expect(buttonSize).toBeGreaterThan(captionSize)
    })
  })

  describe('Typography Utility Functions', () => {
    test('getTypographyStyle should return correct styles', () => {
      const headingStyle = getTypographyStyle('heading', 'h1')
      expect(headingStyle.fontSize).toBe(fontSizes['4xl'].size)
      expect(headingStyle.fontWeight).toBe(fontWeights.bold)
      
      const bodyStyle = getTypographyStyle('body', 'base')
      expect(bodyStyle.fontSize).toBe(fontSizes.base.size)
      expect(bodyStyle.fontWeight).toBe(fontWeights.regular)
    })

    test('getTypographyStyle should fallback to body.base', () => {
      const invalidStyle = getTypographyStyle('invalid', 'style')
      expect(invalidStyle).toEqual(typography.body.base)
      
      const invalidCategory = getTypographyStyle('heading', 'invalid')
      expect(invalidCategory).toEqual(typography.body.base)
    })

    test('fluidTypography should calculate responsive scaling', () => {
      const fluidSize = fluidTypography(16, 32, 320, 1920)
      
      expect(fluidSize).toContain('clamp(')
      expect(fluidSize).toContain('16px')
      expect(fluidSize).toContain('32px')
      expect(fluidSize).toContain('vw')
      
      // Should be a valid CSS clamp function
      expect(fluidSize).toMatch(/^clamp\(.+px,\s*.+px\s*\+\s*.+vw,\s*.+px\)$/)
    })

    test('fluidTypography should handle edge cases', () => {
      // Same min and max should clamp to that value
      const staticSize = fluidTypography(16, 16)
      expect(staticSize).toContain('16px')
      
      // Very small viewport range
      const smallRange = fluidTypography(14, 18, 320, 480)
      expect(smallRange).toContain('clamp(')
    })

    test('generateTypographyVars should create CSS custom properties', () => {
      const vars = generateTypographyVars()
      
      // Font families
      expect(vars).toHaveProperty('--ds-type-family-sans')
      expect(vars).toHaveProperty('--ds-type-family-display')
      expect(vars).toHaveProperty('--ds-type-family-mono')
      
      // Font weights
      expect(vars).toHaveProperty('--ds-type-weight-regular', '400')
      expect(vars).toHaveProperty('--ds-type-weight-bold', '700')
      
      // Font sizes
      expect(vars).toHaveProperty('--ds-type-size-base', '16px')
      expect(vars).toHaveProperty('--ds-type-leading-base', '1.5')
      expect(vars).toHaveProperty('--ds-type-tracking-base', '0')
      
      // Count should be substantial
      const varCount = Object.keys(vars).length
      expect(varCount).toBeGreaterThan(50)
    })

    test('generateTypographyVars should accept custom prefix', () => {
      const vars = generateTypographyVars('--custom')
      
      expect(vars).toHaveProperty('--custom-family-sans')
      expect(vars).toHaveProperty('--custom-weight-regular', '400')
      expect(vars).toHaveProperty('--custom-size-base', '16px')
    })
  })

  describe('Text Truncation Utilities', () => {
    test('should provide single line truncation', () => {
      expect(textTruncation.singleLine).toEqual({
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      })
    })

    test('should provide multi-line truncation', () => {
      const twoLineClamp = textTruncation.multiLine(2)
      
      expect(twoLineClamp).toEqual({
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      })
      
      const fiveLineClamp = textTruncation.multiLine(5)
      expect(fiveLineClamp.WebkitLineClamp).toBe(5)
    })
  })

  describe('Performance and Accessibility', () => {
    test('typography objects should be frozen/immutable', () => {
      expect(Object.isFrozen(fontFamilies)).toBe(true)
      expect(Object.isFrozen(fontWeights)).toBe(true)
      expect(Object.isFrozen(fontSizes)).toBe(true)
      expect(Object.isFrozen(typography)).toBe(true)
    })

    test('font sizes should be accessible (minimum 12px for body text)', () => {
      // Check that body text is at least 12px
      const bodySmall = parseInt(typography.body.small.fontSize)
      const bodyTiny = parseInt(typography.body.tiny.fontSize)
      
      expect(bodySmall).toBeGreaterThanOrEqual(14) // 14px
      expect(bodyTiny).toBeGreaterThanOrEqual(12)  // 12px
      
      // UI elements can be smaller but should be reasonable
      const captionSize = parseInt(typography.ui.caption.fontSize)
      expect(captionSize).toBeGreaterThanOrEqual(12)
    })

    test('line heights should support readability', () => {
      // Body text should have line heights >= 1.4 for accessibility
      expect(typography.body.large.lineHeight).toBeGreaterThanOrEqual(1.6)
      expect(typography.body.base.lineHeight).toBeGreaterThanOrEqual(1.6)
      expect(typography.body.small.lineHeight).toBeGreaterThanOrEqual(1.5)
      expect(typography.body.tiny.lineHeight).toBeGreaterThanOrEqual(1.4)
      
      // Even small UI text should be readable
      expect(typography.ui.caption.lineHeight).toBeGreaterThanOrEqual(1.4)
    })

    test('typography functions should be performant', () => {
      const startTime = performance.now()
      
      for (let i = 0; i < 1000; i++) {
        getTypographyStyle('heading', 'h1')
        fluidTypography(16, 24)
        generateTypographyVars()
      }
      
      const endTime = performance.now()
      const duration = endTime - startTime
      
      // Should complete 3000 calls in under 100ms
      expect(duration).toBeLessThan(100)
    })
  })

  describe('Mathematical Relationships', () => {
    test('should maintain consistent scaling ratios', () => {
      // Test Perfect Fourth ratio (1.333) in some key sizes
      const baseSize = parseInt(fontSizes.base.size)      // 16px
      const xlSize = parseInt(fontSizes.xl.size)          // 20px
      const xl2Size = parseInt(fontSizes['2xl'].size)     // 24px
      
      // Check approximate ratios (allowing for rounding)
      const ratio1 = xlSize / baseSize        // 20/16 = 1.25
      const ratio2 = xl2Size / xlSize         // 24/20 = 1.2
      
      expect(ratio1).toBeCloseTo(1.25, 1)
      expect(ratio2).toBeCloseTo(1.2, 1)
    })

    test('should have harmonious size relationships', () => {
      // Check that heading sizes create good hierarchy
      const h1Size = parseInt(typography.heading.h1.fontSize)    // 36px
      const h2Size = parseInt(typography.heading.h2.fontSize)    // 30px
      const h3Size = parseInt(typography.heading.h3.fontSize)    // 24px
      
      const ratio1 = h1Size / h2Size  // 36/30 = 1.2
      const ratio2 = h2Size / h3Size  // 30/24 = 1.25
      
      // Ratios should be consistent and harmonious
      expect(ratio1).toBeCloseTo(1.2, 1)
      expect(ratio2).toBeCloseTo(1.25, 1)
    })
  })

  describe('Type Safety', () => {
    test('typography types should be properly defined', () => {
      const family: FontFamily = 'sans'
      expect(fontFamilies[family]).toBeDefined()
      
      const weight: FontWeight = 'bold'
      expect(fontWeights[weight]).toBe(700)
      
      const size: FontSize = 'base'
      expect(fontSizes[size].size).toBe('16px')
      
      const category: TypographyCategory = 'heading'
      expect(typography[category]).toBeDefined()
      
      const headingLevel: HeadingLevel = 'h1'
      expect(typography.heading[headingLevel]).toBeDefined()
    })

    test('should prevent invalid typography values at compile time', () => {
      // These would fail TypeScript compilation if uncommented
      // @ts-expect-error
      const invalidFamily: FontFamily = 'invalid'
      
      // @ts-expect-error
      const invalidWeight: FontWeight = 'invalid'
      
      // @ts-expect-error
      const invalidSize: FontSize = 'invalid'
    })
  })
})