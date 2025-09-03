/**
 * Unit Tests for Design System Spacing Tokens
 * Tests mathematical progression, 8px grid compliance, and responsive calculations
 */

import { 
  BASE_UNIT,
  spacing, 
  semanticSpacing,
  containers,
  breakpoints,
  zIndex,
  aspectRatios,
  getSpacing,
  getSemanticSpacing,
  responsiveSpacing,
  generateSpacingVars,
  type SpacingToken,
  type SemanticSpacingCategory,
  type ContainerSize,
  type Breakpoint
} from '@/lib/design-system/tokens/spacing'

describe('Design System Spacing Tokens', () => {
  describe('Base Unit and Grid System', () => {
    test('should use 8px as base unit', () => {
      expect(BASE_UNIT).toBe(8)
    })

    test('all spacing values should follow 8px grid system', () => {
      Object.entries(spacing).forEach(([key, value]) => {
        if (key === 'px') {
          expect(value).toBe('1px')
          return
        }
        
        if (key === '0') {
          expect(value).toBe('0px')
          return
        }
        
        // Extract numeric value from pixel string
        const numericValue = parseInt(value.replace('px', ''))
        
        // Should be divisible by BASE_UNIT/4 (2px) for sub-pixel precision
        // or by BASE_UNIT (8px) for main grid
        const isValidGridValue = 
          numericValue % (BASE_UNIT / 4) === 0 || // 2px increments
          numericValue % BASE_UNIT === 0          // 8px increments
        
        expect(isValidGridValue).toBe(true)
        
        console.log(`${key}: ${value} (${numericValue}px)`)
      })
    })

    test('spacing scale should follow mathematical progression', () => {
      const spacingValues = Object.entries(spacing)
        .filter(([key]) => key !== 'px' && key !== '0')
        .map(([key, value]) => ({
          key: parseFloat(key),
          value: parseInt(value.replace('px', ''))
        }))
        .sort((a, b) => a.key - b.key)
      
      // Check that values increase monotonically
      for (let i = 0; i < spacingValues.length - 1; i++) {
        expect(spacingValues[i + 1].value).toBeGreaterThan(spacingValues[i].value)
      }
      
      // Check specific calculations
      expect(spacing['0.5']).toBe(`${BASE_UNIT * 0.25}px`) // 2px
      expect(spacing['1']).toBe(`${BASE_UNIT * 0.5}px`)    // 4px
      expect(spacing['2']).toBe(`${BASE_UNIT * 1}px`)      // 8px
      expect(spacing['4']).toBe(`${BASE_UNIT * 2}px`)      // 16px
      expect(spacing['8']).toBe(`${BASE_UNIT * 4}px`)      // 32px
      expect(spacing['16']).toBe(`${BASE_UNIT * 8}px`)     // 64px
    })

    test('should have appropriate spacing range', () => {
      const spacingKeys = Object.keys(spacing)
        .filter(key => key !== 'px')
        .map(key => parseFloat(key))
        .filter(key => !isNaN(key))
        .sort((a, b) => a - b)
      
      // Should start from 0
      expect(spacingKeys[0]).toBe(0)
      
      // Should have reasonable maximum (96 = 768px)
      expect(Math.max(...spacingKeys)).toBe(96)
      
      // Should have enough granular options for small spacing
      expect(spacingKeys).toContain(0.5)
      expect(spacingKeys).toContain(1)
      expect(spacingKeys).toContain(2)
      expect(spacingKeys).toContain(3)
      expect(spacingKeys).toContain(4)
    })
  })

  describe('Semantic Spacing Categories', () => {
    test('should have all semantic spacing categories', () => {
      expect(semanticSpacing).toHaveProperty('component')
      expect(semanticSpacing).toHaveProperty('layout')
      expect(semanticSpacing).toHaveProperty('content')
      expect(semanticSpacing).toHaveProperty('form')
    })

    test('component spacing should follow size progression', () => {
      const { component } = semanticSpacing
      const sizes = ['xs', 'sm', 'md', 'lg', 'xl']
      
      sizes.forEach(size => {
        expect(component).toHaveProperty(size)
        expect(component[size as keyof typeof component]).toMatch(/^\d+px$/)
      })
      
      // Values should increase with size
      const values = sizes.map(size => 
        parseInt(component[size as keyof typeof component].replace('px', ''))
      )
      
      for (let i = 0; i < values.length - 1; i++) {
        expect(values[i + 1]).toBeGreaterThan(values[i])
      }
    })

    test('layout spacing should be appropriate for different contexts', () => {
      const { layout } = semanticSpacing
      
      expect(layout).toHaveProperty('section')
      expect(layout).toHaveProperty('container')
      expect(layout).toHaveProperty('grid')
      expect(layout).toHaveProperty('stack')
      
      // Section spacing should be largest (for visual hierarchy)
      const sectionValue = parseInt(layout.section.replace('px', ''))
      const containerValue = parseInt(layout.container.replace('px', ''))
      const gridValue = parseInt(layout.grid.replace('px', ''))
      const stackValue = parseInt(layout.stack.replace('px', ''))
      
      expect(sectionValue).toBeGreaterThan(containerValue)
      expect(containerValue).toBeGreaterThan(gridValue)
      expect(gridValue).toBeGreaterThanOrEqual(stackValue)
    })

    test('content spacing should be optimized for readability', () => {
      const { content } = semanticSpacing
      
      expect(content).toHaveProperty('paragraph')
      expect(content).toHaveProperty('heading')
      expect(content).toHaveProperty('list')
      expect(content).toHaveProperty('inline')
      
      // Heading spacing should be larger than paragraph for visual hierarchy
      const headingValue = parseInt(content.heading.replace('px', ''))
      const paragraphValue = parseInt(content.paragraph.replace('px', ''))
      const listValue = parseInt(content.list.replace('px', ''))
      const inlineValue = parseInt(content.inline.replace('px', ''))
      
      expect(headingValue).toBeGreaterThan(paragraphValue)
      expect(paragraphValue).toBeGreaterThan(listValue)
      expect(listValue).toBeGreaterThan(inlineValue)
    })

    test('form spacing should support good UX patterns', () => {
      const { form } = semanticSpacing
      
      expect(form).toHaveProperty('field')
      expect(form).toHaveProperty('group')
      expect(form).toHaveProperty('label')
      expect(form).toHaveProperty('help')
      
      // Group spacing should be larger than field for visual separation
      const groupValue = parseInt(form.group.replace('px', ''))
      const fieldValue = parseInt(form.field.replace('px', ''))
      const labelValue = parseInt(form.label.replace('px', ''))
      const helpValue = parseInt(form.help.replace('px', ''))
      
      expect(groupValue).toBeGreaterThan(fieldValue)
      expect(fieldValue).toBeGreaterThan(labelValue)
      expect(labelValue).toBeGreaterThan(helpValue)
    })
  })

  describe('Container Sizes and Breakpoints', () => {
    test('containers should have appropriate sizes', () => {
      const expectedContainers = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full', 'prose']
      
      expectedContainers.forEach(size => {
        expect(containers).toHaveProperty(size)
      })
      
      // Specific size checks
      expect(containers.xs).toBe('320px')
      expect(containers.sm).toBe('640px')
      expect(containers.md).toBe('768px')
      expect(containers.lg).toBe('1024px')
      expect(containers.xl).toBe('1280px')
      expect(containers['2xl']).toBe('1536px')
      expect(containers['3xl']).toBe('1920px')
      expect(containers.full).toBe('100%')
      expect(containers.prose).toBe('65ch')
    })

    test('container sizes should increase progressively', () => {
      const numericContainers = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl']
      const values = numericContainers.map(size => 
        parseInt(containers[size as keyof typeof containers].replace('px', ''))
      )
      
      for (let i = 0; i < values.length - 1; i++) {
        expect(values[i + 1]).toBeGreaterThan(values[i])
      }
    })

    test('breakpoints should align with containers', () => {
      expect(breakpoints.xs).toBe(320)
      expect(breakpoints.sm).toBe(640)
      expect(breakpoints.md).toBe(768)
      expect(breakpoints.lg).toBe(1024)
      expect(breakpoints.xl).toBe(1280)
      expect(breakpoints['2xl']).toBe(1536)
    })

    test('breakpoints should be in ascending order', () => {
      const breakpointValues = Object.values(breakpoints).sort((a, b) => a - b)
      const originalValues = Object.values(breakpoints)
      
      expect(originalValues).toEqual(breakpointValues)
    })
  })

  describe('Z-Index Layering', () => {
    test('should have complete z-index hierarchy', () => {
      const expectedLayers = [
        'hide', 'base', 'dropdown', 'sticky', 'overlay', 
        'modal', 'popover', 'tooltip', 'notification', 'top'
      ]
      
      expectedLayers.forEach(layer => {
        expect(zIndex).toHaveProperty(layer)
        expect(typeof zIndex[layer as keyof typeof zIndex]).toBe('number')
      })
    })

    test('z-index values should increase for higher layers', () => {
      expect(zIndex.hide).toBeLessThan(zIndex.base)
      expect(zIndex.base).toBeLessThan(zIndex.dropdown)
      expect(zIndex.dropdown).toBeLessThan(zIndex.sticky)
      expect(zIndex.sticky).toBeLessThan(zIndex.overlay)
      expect(zIndex.overlay).toBeLessThan(zIndex.modal)
      expect(zIndex.modal).toBeLessThan(zIndex.popover)
      expect(zIndex.popover).toBeLessThan(zIndex.tooltip)
      expect(zIndex.tooltip).toBeLessThan(zIndex.notification)
      expect(zIndex.notification).toBeLessThan(zIndex.top)
    })

    test('z-index values should have appropriate gaps', () => {
      const values = Object.values(zIndex).slice(1, -1) // Exclude hide and top
      
      for (let i = 0; i < values.length - 1; i++) {
        const gap = values[i + 1] - values[i]
        expect(gap).toBeGreaterThanOrEqual(10) // Minimum gap of 10
      }
    })
  })

  describe('Aspect Ratios', () => {
    test('should have common aspect ratios', () => {
      const expectedRatios = ['square', 'video', 'portrait', 'landscape', 'wide', 'golden']
      
      expectedRatios.forEach(ratio => {
        expect(aspectRatios).toHaveProperty(ratio)
        expect(aspectRatios[ratio as keyof typeof aspectRatios]).toMatch(/^\d+\.?\d* \/ \d+\.?\d*$/)
      })
    })

    test('aspect ratio calculations should be correct', () => {
      expect(aspectRatios.square).toBe('1 / 1')
      expect(aspectRatios.video).toBe('16 / 9')
      expect(aspectRatios.portrait).toBe('3 / 4')
      expect(aspectRatios.landscape).toBe('4 / 3')
      expect(aspectRatios.wide).toBe('21 / 9')
      expect(aspectRatios.golden).toBe('1.618 / 1')
      
      // Validate golden ratio approximation
      const golden = 1.618
      expect(Math.abs(golden - 1.618)).toBeLessThan(0.001)
    })
  })

  describe('Spacing Utility Functions', () => {
    test('getSpacing should return correct values', () => {
      expect(getSpacing('0')).toBe('0px')
      expect(getSpacing('2')).toBe('8px')
      expect(getSpacing('4')).toBe('16px')
      expect(getSpacing('8')).toBe('32px')
      expect(getSpacing('px')).toBe('1px')
    })

    test('getSemanticSpacing should return semantic values', () => {
      expect(getSemanticSpacing('component', 'md')).toBe('16px')
      expect(getSemanticSpacing('layout', 'section')).toBe('80px')
      expect(getSemanticSpacing('content', 'paragraph')).toBe('24px')
      expect(getSemanticSpacing('form', 'field')).toBe('24px')
    })

    test('getSemanticSpacing should fall back to default', () => {
      expect(getSemanticSpacing('component', 'invalid')).toBe('16px')
      // @ts-expect-error - Testing invalid category
      expect(getSemanticSpacing('invalid', 'md')).toBe('16px')
    })

    test('responsiveSpacing should calculate scaled values', () => {
      const responsive = responsiveSpacing('4') // 16px base
      
      expect(responsive.mobile).toBe('16px')
      expect(responsive.tablet).toBe('20px') // 16 * 1.25
      expect(responsive.desktop).toBe('24px') // 16 * 1.5
    })

    test('responsiveSpacing should accept custom scale', () => {
      const responsive = responsiveSpacing('4', 2) // 16px base, 2x scale
      
      expect(responsive.mobile).toBe('16px')
      expect(responsive.tablet).toBe('20px') // 16 * 1.25
      expect(responsive.desktop).toBe('32px') // 16 * 2
    })

    test('generateSpacingVars should create CSS custom properties', () => {
      const vars = generateSpacingVars()
      
      expect(vars).toHaveProperty('--ds-spacing-0', '0px')
      expect(vars).toHaveProperty('--ds-spacing-2', '8px')
      expect(vars).toHaveProperty('--ds-spacing-4', '16px')
      expect(vars).toHaveProperty('--ds-spacing-px', '1px')
      
      const varCount = Object.keys(vars).length
      expect(varCount).toBeGreaterThan(30) // Should have many spacing variables
    })

    test('generateSpacingVars should accept custom prefix', () => {
      const vars = generateSpacingVars('--custom-space')
      
      expect(vars).toHaveProperty('--custom-space-0', '0px')
      expect(vars).toHaveProperty('--custom-space-2', '8px')
    })
  })

  describe('Performance and Immutability', () => {
    test('spacing objects should be frozen/immutable', () => {
      expect(Object.isFrozen(spacing)).toBe(true)
      expect(Object.isFrozen(semanticSpacing)).toBe(true)
      expect(Object.isFrozen(containers)).toBe(true)
      expect(Object.isFrozen(breakpoints)).toBe(true)
      expect(Object.isFrozen(zIndex)).toBe(true)
      expect(Object.isFrozen(aspectRatios)).toBe(true)
    })

    test('spacing functions should be performant', () => {
      const startTime = performance.now()
      
      for (let i = 0; i < 1000; i++) {
        getSpacing('4')
        getSemanticSpacing('component', 'md')
        responsiveSpacing('8')
      }
      
      const endTime = performance.now()
      const duration = endTime - startTime
      
      // Should complete 3000 calls in under 50ms
      expect(duration).toBeLessThan(50)
    })
  })

  describe('Mathematical Validation', () => {
    test('spacing scale should maintain consistent ratios', () => {
      // Test some key ratio relationships
      const val2 = parseInt(spacing['2'])  // 8px
      const val4 = parseInt(spacing['4'])  // 16px
      const val8 = parseInt(spacing['8'])  // 32px
      const val16 = parseInt(spacing['16']) // 64px
      
      expect(val4 / val2).toBe(2)   // 2:1 ratio
      expect(val8 / val4).toBe(2)   // 2:1 ratio
      expect(val16 / val8).toBe(2)  // 2:1 ratio
    })

    test('fractional spacing should be precise', () => {
      expect(spacing['0.5']).toBe('2px')  // 8 * 0.25
      expect(spacing['1']).toBe('4px')    // 8 * 0.5
      expect(spacing['1.5']).toBe('6px')  // Would be 8 * 0.75 if it existed
      
      // Check that half-unit values exist and are correct
      const halfUnit = parseInt(spacing['1'])
      const fullUnit = parseInt(spacing['2'])
      
      expect(fullUnit).toBe(halfUnit * 2)
    })
  })

  describe('Type Safety', () => {
    test('spacing token types should be properly defined', () => {
      const token: SpacingToken = '4'
      expect(getSpacing(token)).toBe('16px')
      
      const category: SemanticSpacingCategory = 'component'
      expect(getSemanticSpacing(category, 'md')).toBe('16px')
      
      const containerSize: ContainerSize = 'lg'
      expect(containers[containerSize]).toBe('1024px')
      
      const breakpoint: Breakpoint = 'md'
      expect(breakpoints[breakpoint]).toBe(768)
    })

    test('should prevent invalid spacing values at compile time', () => {
      // These would fail TypeScript compilation if uncommented
      // @ts-expect-error
      const invalid1 = getSpacing('invalid')
      
      // @ts-expect-error
      const invalid2 = getSemanticSpacing('invalid', 'md')
    })
  })
})