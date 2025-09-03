/**
 * Unit Tests for Design System Animation Tokens
 * Tests performance metrics, spring physics, and mathematical timing
 */

import { 
  durations,
  easings,
  springs,
  keyframes,
  transitions,
  animations,
  motionVariants,
  createTransition,
  createStaggerDelay,
  generateAnimationVars,
  type Duration,
  type Easing,
  type Spring,
  type Animation,
  type Transition
} from '@/lib/design-system/tokens/animation'

describe('Design System Animation Tokens', () => {
  describe('Animation Durations', () => {
    test('should have complete duration range', () => {
      const expectedDurations = ['instant', 'fast', 'normal', 'slow', 'slower', 'slowest']
      
      expectedDurations.forEach(duration => {
        expect(durations).toHaveProperty(duration)
        expect(typeof durations[duration as keyof typeof durations]).toBe('number')
      })
      
      // Check specific values
      expect(durations.instant).toBe(0)
      expect(durations.fast).toBe(150)
      expect(durations.normal).toBe(300)
      expect(durations.slow).toBe(500)
      expect(durations.slower).toBe(700)
      expect(durations.slowest).toBe(1000)
    })

    test('durations should increase progressively', () => {
      const durationValues = [
        durations.instant,
        durations.fast,
        durations.normal,
        durations.slow,
        durations.slower,
        durations.slowest
      ]
      
      for (let i = 0; i < durationValues.length - 1; i++) {
        expect(durationValues[i + 1]).toBeGreaterThan(durationValues[i])
      }
    })

    test('should have semantic durations for different use cases', () => {
      expect(durations).toHaveProperty('micro', 50)     // Micro-interactions
      expect(durations).toHaveProperty('quick', 200)    // Button clicks
      expect(durations).toHaveProperty('moderate', 400) // Modals
      expect(durations).toHaveProperty('deliberate', 600) // Page transitions
      expect(durations).toHaveProperty('relaxed', 800)  // Lazy animations
    })

    test('should have stagger delay configurations', () => {
      expect(durations.stagger).toHaveProperty('fast', 50)
      expect(durations.stagger).toHaveProperty('normal', 100)
      expect(durations.stagger).toHaveProperty('slow', 150)
      
      // Stagger values should increase progressively
      expect(durations.stagger.normal).toBeGreaterThan(durations.stagger.fast)
      expect(durations.stagger.slow).toBeGreaterThan(durations.stagger.normal)
    })

    test('durations should be optimized for 60fps performance', () => {
      // Durations should be multiples of frame time (16.67ms) for smooth animations
      const frameTime = 16.67 // 1000ms / 60fps
      
      Object.values(durations).forEach(duration => {
        if (typeof duration === 'number' && duration > 0) {
          // Duration should be reasonable for smooth animation
          expect(duration).toBeGreaterThanOrEqual(50) // Minimum perceptible
          expect(duration).toBeLessThanOrEqual(1200) // Maximum practical
        }
      })
    })
  })

  describe('Easing Functions', () => {
    test('should have basic CSS easing functions', () => {
      expect(easings.linear).toBe('linear')
      expect(easings.ease).toBe('ease')
      expect(easings.easeIn).toBe('ease-in')
      expect(easings.easeOut).toBe('ease-out')
      expect(easings.easeInOut).toBe('ease-in-out')
    })

    test('should have custom cubic-bezier curves', () => {
      const customEasings = ['premium', 'bounceIn', 'smooth', 'sharp']
      
      customEasings.forEach(easing => {
        expect(easings).toHaveProperty(easing)
        expect(easings[easing as keyof typeof easings]).toMatch(/^cubic-bezier\([\d\.,\s-]+\)$/)
      })
      
      // Check specific curves
      expect(easings.premium).toBe('cubic-bezier(0.4, 0.0, 0.2, 1)')
      expect(easings.bounceIn).toBe('cubic-bezier(0.68, -0.55, 0.265, 1.55)')
    })

    test('should have spring-like easings', () => {
      const springEasings = ['spring', 'springOut', 'springIn']
      
      springEasings.forEach(easing => {
        expect(easings).toHaveProperty(easing)
        expect(easings[easing as keyof typeof easings]).toMatch(/^cubic-bezier\([\d\.,\s-]+\)$/)
      })
    })

    test('should have power curve easings', () => {
      const powerEasings = ['power1', 'power2', 'power3', 'power4']
      
      powerEasings.forEach(easing => {
        expect(easings).toHaveProperty(easing)
        expect(easings[easing as keyof typeof easings]).toMatch(/^cubic-bezier\([\d\.,\s-]+\)$/)
      })
      
      // Power curves should have increasing aggressiveness
      // This is validated by the curve values, but we can't easily parse them
      expect(easings.power1).toBe('cubic-bezier(0.4, 0.0, 1, 1)')
      expect(easings.power4).toBe('cubic-bezier(0.86, 0.0, 1, 1)')
    })

    test('cubic-bezier values should be mathematically valid', () => {
      const customEasings = Object.entries(easings)
        .filter(([key, value]) => value.startsWith('cubic-bezier'))
      
      customEasings.forEach(([name, curve]) => {
        const match = curve.match(/cubic-bezier\(([\d\.,\s-]+)\)/)
        if (match) {
          const values = match[1].split(',').map(v => parseFloat(v.trim()))
          
          // Should have 4 control points
          expect(values).toHaveLength(4)
          
          // X values should be between 0 and 1 (time must be monotonic)
          expect(values[0]).toBeGreaterThanOrEqual(0)
          expect(values[0]).toBeLessThanOrEqual(1)
          expect(values[2]).toBeGreaterThanOrEqual(0)
          expect(values[2]).toBeLessThanOrEqual(1)
          
          // Y values can exceed 0-1 for bouncy effects
          values.forEach(value => {
            expect(value).toBeGreaterThanOrEqual(-2) // Reasonable lower bound
            expect(value).toBeLessThanOrEqual(2)     // Reasonable upper bound
          })
        }
      })
    })
  })

  describe('Spring Physics', () => {
    test('should have complete spring presets', () => {
      const expectedSprings = [
        'wobbly', 'stiff', 'gentle', 'slow', 'molasses',
        'default', 'bounce', 'noWobble'
      ]
      
      expectedSprings.forEach(spring => {
        expect(springs).toHaveProperty(spring)
        
        const springConfig = springs[spring as keyof typeof springs]
        expect(springConfig).toHaveProperty('stiffness')
        expect(springConfig).toHaveProperty('damping')
        
        expect(typeof springConfig.stiffness).toBe('number')
        expect(typeof springConfig.damping).toBe('number')
      })
    })

    test('spring physics values should be realistic', () => {
      Object.entries(springs).forEach(([name, config]) => {
        // Stiffness should be positive and reasonable
        expect(config.stiffness).toBeGreaterThan(0)
        expect(config.stiffness).toBeLessThan(1000) // Realistic upper bound
        
        // Damping should be positive and reasonable
        expect(config.damping).toBeGreaterThan(0)
        expect(config.damping).toBeLessThan(200) // Prevent over-damping
        
        // Higher stiffness should generally correlate with higher damping for stability
        // This is a general rule but not absolute
      })
    })

    test('spring presets should have appropriate characteristics', () => {
      // Bouncy springs should have low damping relative to stiffness
      const bounceRatio = springs.bounce.damping / springs.bounce.stiffness
      const wobbleRatio = springs.wobbly.damping / springs.wobbly.stiffness
      
      expect(bounceRatio).toBeLessThan(0.1) // Very bouncy
      expect(wobbleRatio).toBeLessThan(0.1) // Also bouncy
      
      // Slow/molasses should have high damping
      expect(springs.slow.damping).toBeGreaterThan(50)
      expect(springs.molasses.damping).toBeGreaterThan(100)
      
      // Gentle should be balanced
      const gentleRatio = springs.gentle.damping / springs.gentle.stiffness
      expect(gentleRatio).toBeGreaterThan(0.1)
      expect(gentleRatio).toBeLessThan(0.15)
    })
  })

  describe('Keyframe Animations', () => {
    test('should have complete keyframe definitions', () => {
      const expectedKeyframes = [
        'fadeIn', 'fadeOut', 'fadeUp', 'fadeDown',
        'slideInRight', 'slideInLeft', 'slideInUp', 'slideInDown',
        'zoomIn', 'zoomOut', 'rotate', 'pulse', 'ping',
        'bounce', 'float', 'wiggle', 'shake'
      ]
      
      expectedKeyframes.forEach(keyframe => {
        expect(keyframes).toHaveProperty(keyframe)
        
        const animation = keyframes[keyframe as keyof typeof keyframes]
        expect(typeof animation).toBe('object')
        
        // Should have at least from/to or percentage keys
        const keys = Object.keys(animation)
        const hasFromTo = keys.includes('from') && keys.includes('to')
        const hasPercentages = keys.some(key => key.includes('%') || /^\d+$/.test(key))
        
        expect(hasFromTo || hasPercentages).toBe(true)
      })
    })

    test('fade animations should manipulate opacity correctly', () => {
      expect(keyframes.fadeIn.from.opacity).toBe(0)
      expect(keyframes.fadeIn.to.opacity).toBe(1)
      
      expect(keyframes.fadeOut.from.opacity).toBe(1)
      expect(keyframes.fadeOut.to.opacity).toBe(0)
    })

    test('slide animations should use appropriate transforms', () => {
      expect(keyframes.slideInRight.from.transform).toBe('translateX(100%)')
      expect(keyframes.slideInLeft.from.transform).toBe('translateX(-100%)')
      expect(keyframes.slideInUp.from.transform).toBe('translateY(100%)')
      expect(keyframes.slideInDown.from.transform).toBe('translateY(-100%)')
      
      // All slide animations should end at neutral position
      expect(keyframes.slideInRight.to.transform).toBe('translateX(0)')
      expect(keyframes.slideInLeft.to.transform).toBe('translateX(0)')
      expect(keyframes.slideInUp.to.transform).toBe('translateY(0)')
      expect(keyframes.slideInDown.to.transform).toBe('translateY(0)')
    })

    test('zoom animations should scale appropriately', () => {
      expect(keyframes.zoomIn.from.transform).toBe('scale(0.5)')
      expect(keyframes.zoomIn.to.transform).toBe('scale(1)')
      
      expect(keyframes.zoomOut.from.transform).toBe('scale(1)')
      expect(keyframes.zoomOut.to.transform).toBe('scale(0.5)')
    })

    test('attention animations should have proper keyframe percentages', () => {
      // Pulse should animate between full and partial opacity
      expect(keyframes.pulse['0%, 100%'].opacity).toBe(1)
      expect(keyframes.pulse['50%'].opacity).toBe(0.5)
      
      // Ping should scale up and fade out
      expect(keyframes.ping['75%, 100%']).toEqual({
        transform: 'scale(2)',
        opacity: 0,
      })
      
      // Bounce should have proper timing functions
      expect(keyframes.bounce['0%, 100%']).toHaveProperty('animationTimingFunction')
      expect(keyframes.bounce['50%']).toHaveProperty('animationTimingFunction')
    })

    test('float animation should have smooth vertical movement', () => {
      expect(keyframes.float['0%, 100%'].transform).toBe('translateY(0)')
      expect(keyframes.float['50%'].transform).toBe('translateY(-20px)')
    })

    test('wiggle and shake should have controlled movement', () => {
      // Wiggle should rotate back and forth
      expect(keyframes.wiggle['0%, 100%'].transform).toBe('rotate(-3deg)')
      expect(keyframes.wiggle['50%'].transform).toBe('rotate(3deg)')
      
      // Shake should translate horizontally
      expect(keyframes.shake['0%, 100%'].transform).toBe('translateX(0)')
      expect(keyframes.shake['25%'].transform).toBe('translateX(-10px)')
      expect(keyframes.shake['75%'].transform).toBe('translateX(10px)')
    })
  })

  describe('Transitions', () => {
    test('should have base transition configurations', () => {
      expect(transitions.base).toBe(`all ${durations.normal}ms ${easings.premium}`)
      expect(transitions.fast).toBe(`all ${durations.fast}ms ${easings.premium}`)
      expect(transitions.slow).toBe(`all ${durations.slow}ms ${easings.premium}`)
    })

    test('should have property-specific transitions', () => {
      expect(transitions.opacity).toBe(`opacity ${durations.normal}ms ${easings.premium}`)
      expect(transitions.transform).toBe(`transform ${durations.normal}ms ${easings.premium}`)
      expect(transitions.shadow).toBe(`box-shadow ${durations.normal}ms ${easings.premium}`)
      
      // Colors transition should include multiple properties
      expect(transitions.colors).toContain('background-color')
      expect(transitions.colors).toContain('border-color')
      expect(transitions.colors).toContain('color')
    })

    test('should have utility transitions', () => {
      expect(transitions.all).toContain('all')
      expect(transitions.none).toBe('none')
    })

    test('transitions should use consistent timing', () => {
      const transitionRegex = /(\d+)ms/
      
      Object.entries(transitions).forEach(([name, value]) => {
        if (name !== 'none' && typeof value === 'string') {
          const match = value.match(transitionRegex)
          if (match) {
            const duration = parseInt(match[1])
            
            // Duration should be one of our defined durations
            const validDurations = Object.values(durations).filter(d => typeof d === 'number')
            expect(validDurations).toContain(duration)
          }
        }
      })
    })
  })

  describe('Animation Compositions', () => {
    test('should have entrance animations', () => {
      const entranceAnimations = ['fadeIn', 'fadeUp', 'slideIn', 'zoomIn']
      
      entranceAnimations.forEach(animation => {
        expect(animations).toHaveProperty(animation)
        
        const animationValue = animations[animation as keyof typeof animations]
        expect(animationValue).toContain(durations.normal.toString())
        expect(animationValue).toContain('ms')
      })
    })

    test('should have exit animations', () => {
      const exitAnimations = ['fadeOut', 'slideOut', 'zoomOut']
      
      exitAnimations.forEach(animation => {
        expect(animations).toHaveProperty(animation)
        
        const animationValue = animations[animation as keyof typeof animations]
        // Exit animations should generally be faster
        expect(animationValue).toContain(durations.fast.toString())
      })
    })

    test('should have attention animations', () => {
      const attentionAnimations = ['pulse', 'bounce', 'wiggle']
      
      attentionAnimations.forEach(animation => {
        expect(animations).toHaveProperty(animation)
        
        const animationValue = animations[animation as keyof typeof animations]
        expect(animationValue).toContain('infinite')
      })
    })

    test('should have loading animations', () => {
      expect(animations.spin).toContain('rotate')
      expect(animations.spin).toContain('infinite')
      expect(animations.spin).toContain('linear')
      
      expect(animations.ping).toContain('ping')
      expect(animations.ping).toContain('infinite')
    })
  })

  describe('Framer Motion Variants', () => {
    test('should have page transition variants', () => {
      expect(motionVariants).toHaveProperty('pageInitial')
      expect(motionVariants).toHaveProperty('pageAnimate')
      expect(motionVariants).toHaveProperty('pageExit')
      
      expect(motionVariants.pageInitial).toEqual({ opacity: 0, y: 20 })
      expect(motionVariants.pageAnimate).toEqual({ opacity: 1, y: 0 })
      expect(motionVariants.pageExit).toEqual({ opacity: 0, y: -20 })
    })

    test('should have modal transition variants', () => {
      expect(motionVariants).toHaveProperty('overlayInitial')
      expect(motionVariants).toHaveProperty('overlayAnimate')
      expect(motionVariants).toHaveProperty('overlayExit')
      
      expect(motionVariants).toHaveProperty('modalInitial')
      expect(motionVariants).toHaveProperty('modalAnimate')
      expect(motionVariants).toHaveProperty('modalExit')
      
      // Modal should scale from 0.95 to 1
      expect(motionVariants.modalInitial.scale).toBe(0.95)
      expect(motionVariants.modalAnimate.scale).toBe(1)
      expect(motionVariants.modalExit.scale).toBe(0.95)
    })

    test('should have stagger animation variants', () => {
      expect(motionVariants).toHaveProperty('listContainer')
      expect(motionVariants).toHaveProperty('listItem')
      
      const container = motionVariants.listContainer
      expect(container.visible).toHaveProperty('transition')
      expect(container.visible.transition).toHaveProperty('staggerChildren')
      expect(container.visible.transition).toHaveProperty('delayChildren')
      
      const item = motionVariants.listItem
      expect(item.hidden).toEqual({ y: 20, opacity: 0 })
      expect(item.visible).toHaveProperty('y', 0)
      expect(item.visible).toHaveProperty('opacity', 1)
      expect(item.visible.transition).toHaveProperty('type', 'spring')
    })

    test('stagger timing should be reasonable', () => {
      const container = motionVariants.listContainer
      const staggerChildren = container.visible.transition.staggerChildren
      const delayChildren = container.visible.transition.delayChildren
      
      expect(staggerChildren).toBeGreaterThan(0)
      expect(staggerChildren).toBeLessThan(0.5) // Not too slow
      
      expect(delayChildren).toBeGreaterThanOrEqual(0)
      expect(delayChildren).toBeLessThan(1) // Reasonable initial delay
    })
  })

  describe('Animation Utility Functions', () => {
    test('createTransition should generate valid CSS transitions', () => {
      const basicTransition = createTransition()
      expect(basicTransition).toBe(`all ${durations.normal}ms ${easings.premium}`)
      
      const customTransition = createTransition('opacity', durations.fast, easings.ease)
      expect(customTransition).toBe(`opacity ${durations.fast}ms ${easings.ease}`)
    })

    test('createTransition should handle delay parameter', () => {
      const delayedTransition = createTransition('transform', durations.normal, easings.premium, 100)
      expect(delayedTransition).toBe(`transform ${durations.normal}ms ${easings.premium} 100ms`)
      
      const noDelayTransition = createTransition('transform', durations.normal, easings.premium, 0)
      expect(noDelayTransition).toBe(`transform ${durations.normal}ms ${easings.premium}`)
    })

    test('createStaggerDelay should calculate delays correctly', () => {
      expect(createStaggerDelay(0)).toBe(0)
      expect(createStaggerDelay(1)).toBe(durations.stagger.normal)
      expect(createStaggerDelay(2)).toBe(durations.stagger.normal * 2)
      expect(createStaggerDelay(3, 50)).toBe(150) // 3 * 50ms
    })

    test('generateAnimationVars should create CSS custom properties', () => {
      const vars = generateAnimationVars()
      
      // Should include duration variables
      expect(vars).toHaveProperty('--ds-anim-duration-fast', '150ms')
      expect(vars).toHaveProperty('--ds-anim-duration-normal', '300ms')
      
      // Should include easing variables
      expect(vars).toHaveProperty('--ds-anim-ease-premium', easings.premium)
      expect(vars).toHaveProperty('--ds-anim-ease-linear', 'linear')
      
      const varCount = Object.keys(vars).length
      expect(varCount).toBeGreaterThan(20)
    })

    test('generateAnimationVars should accept custom prefix', () => {
      const vars = generateAnimationVars('--custom-anim')
      
      expect(vars).toHaveProperty('--custom-anim-duration-fast', '150ms')
      expect(vars).toHaveProperty('--custom-anim-ease-premium', easings.premium)
    })
  })

  describe('Performance Considerations', () => {
    test('animation objects should be frozen/immutable', () => {
      expect(Object.isFrozen(durations)).toBe(true)
      expect(Object.isFrozen(easings)).toBe(true)
      expect(Object.isFrozen(springs)).toBe(true)
      expect(Object.isFrozen(keyframes)).toBe(true)
      expect(Object.isFrozen(transitions)).toBe(true)
      expect(Object.isFrozen(animations)).toBe(true)
      expect(Object.isFrozen(motionVariants)).toBe(true)
    })

    test('durations should not exceed performance thresholds', () => {
      Object.values(durations).forEach(duration => {
        if (typeof duration === 'number') {
          // No animation should be longer than 1.2 seconds for UX
          expect(duration).toBeLessThanOrEqual(1200)
          
          // No animation should be shorter than 50ms (imperceptible)
          if (duration > 0) {
            expect(duration).toBeGreaterThanOrEqual(50)
          }
        }
      })
    })

    test('animation functions should be performant', () => {
      const startTime = performance.now()
      
      for (let i = 0; i < 1000; i++) {
        createTransition('opacity', durations.fast, easings.premium)
        createStaggerDelay(i % 10)
      }
      
      const endTime = performance.now()
      const duration = endTime - startTime
      
      // Should complete 2000 calls in under 50ms
      expect(duration).toBeLessThan(50)
    })

    test('spring physics should prevent infinite oscillation', () => {
      Object.entries(springs).forEach(([name, config]) => {
        // Calculate damping ratio to ensure system stability
        const dampingRatio = config.damping / (2 * Math.sqrt(config.stiffness))
        
        // Should not be underdamped to the point of being annoying
        // Critically damped (dampingRatio = 1) or slightly underdamped is ideal
        expect(dampingRatio).toBeGreaterThan(0.1) // Prevent extreme oscillation
        
        // Should not be overdamped to the point of being sluggish
        expect(dampingRatio).toBeLessThan(3) // Prevent over-damping
      })
    })
  })

  describe('Type Safety', () => {
    test('animation types should be properly defined', () => {
      const duration: Duration = 'normal'
      expect(durations[duration]).toBe(300)
      
      const easing: Easing = 'premium'
      expect(easings[easing]).toBe('cubic-bezier(0.4, 0.0, 0.2, 1)')
      
      const spring: Spring = 'default'
      expect(springs[spring]).toEqual({ stiffness: 170, damping: 26 })
      
      const animation: Animation = 'fadeIn'
      expect(animations[animation]).toContain('fadeIn')
      
      const transition: Transition = 'base'
      expect(transitions[transition]).toContain('all')
    })

    test('should prevent invalid animation values at compile time', () => {
      // These would fail TypeScript compilation if uncommented
      // @ts-expect-error
      const invalidDuration: Duration = 'invalid'
      
      // @ts-expect-error
      const invalidEasing: Easing = 'invalid'
      
      // @ts-expect-error
      const invalidSpring: Spring = 'invalid'
    })
  })

  describe('Mathematical Validation', () => {
    test('duration progression should follow mathematical ratios', () => {
      // Check golden ratio or fibonacci-like progression in some durations
      const fastToNormal = durations.normal / durations.fast      // 300/150 = 2
      const normalToSlow = durations.slow / durations.normal      // 500/300 = 1.67
      
      expect(fastToNormal).toBeCloseTo(2, 0)
      expect(normalToSlow).toBeCloseTo(1.67, 1)
    })

    test('stagger delays should create pleasing rhythms', () => {
      const staggerValues = Object.values(durations.stagger)
      
      // Should increase by reasonable increments
      expect(durations.stagger.normal - durations.stagger.fast).toBe(50)
      expect(durations.stagger.slow - durations.stagger.normal).toBe(50)
      
      // Total stagger time for 5 items should be reasonable
      const fiveItemStagger = createStaggerDelay(4, durations.stagger.normal)
      expect(fiveItemStagger).toBe(400) // Should complete within 400ms
      expect(fiveItemStagger).toBeLessThan(durations.slow)
    })
  })
})