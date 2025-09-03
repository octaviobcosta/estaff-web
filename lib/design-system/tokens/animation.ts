/**
 * Design System Animation Tokens
 * Spring physics and mathematical timing functions
 */

// Animation durations (in milliseconds)
export const durations = Object.freeze({
  instant: 0,
  fast: 150,
  normal: 300,
  slow: 500,
  slower: 700,
  slowest: 1000,
  
  // Semantic durations
  micro: 50,        // Micro-interactions
  quick: 200,       // Button clicks, hovers
  moderate: 400,    // Modals, drawers
  deliberate: 600,  // Page transitions
  relaxed: 800,     // Lazy animations
  
  // Stagger delays
  stagger: Object.freeze({
    fast: 50,
    normal: 100,
    slow: 150,
  }),
}) as const

// Easing functions (cubic-bezier curves)
export const easings = Object.freeze({
  // Basic easings
  linear: 'linear',
  ease: 'ease',
  easeIn: 'ease-in',
  easeOut: 'ease-out',
  easeInOut: 'ease-in-out',
  
  // Custom cubic-bezier curves
  premium: 'cubic-bezier(0.4, 0.0, 0.2, 1)',      // Material Design standard
  bounceIn: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  smooth: 'cubic-bezier(0.25, 0.8, 0.25, 1)',
  sharp: 'cubic-bezier(0.4, 0.0, 0.6, 1)',
  
  // Spring-like easings
  spring: 'cubic-bezier(0.5, 1.25, 0.75, 1.25)',
  springOut: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  springIn: 'cubic-bezier(0.6, -0.28, 0.735, 0.045)',
  
  // Aggressive easings
  power1: 'cubic-bezier(0.4, 0.0, 1, 1)',
  power2: 'cubic-bezier(0.54, 0.0, 1, 1)',
  power3: 'cubic-bezier(0.7, 0.0, 1, 1)',
  power4: 'cubic-bezier(0.86, 0.0, 1, 1)',
}) as const

// Spring physics configurations
export const springs = Object.freeze({
  // Stiffness & damping pairs
  wobbly: Object.freeze({ stiffness: 180, damping: 12 }),
  stiff: Object.freeze({ stiffness: 260, damping: 20 }),
  gentle: Object.freeze({ stiffness: 120, damping: 14 }),
  slow: Object.freeze({ stiffness: 280, damping: 60 }),
  molasses: Object.freeze({ stiffness: 400, damping: 110 }), // Adjusted stiffness to keep damping ratio under 3
  
  // Common spring presets
  default: Object.freeze({ stiffness: 170, damping: 26 }),
  bounce: Object.freeze({ stiffness: 600, damping: 15 }),
  noWobble: Object.freeze({ stiffness: 170, damping: 26 }),
}) as const

// Keyframe animations
export const keyframes = Object.freeze({
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  fadeOut: {
    from: { opacity: 1 },
    to: { opacity: 0 },
  },
  fadeUp: {
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  },
  fadeDown: {
    from: { opacity: 0, transform: 'translateY(-20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  },
  slideInRight: {
    from: { transform: 'translateX(100%)', opacity: 0 },
    to: { transform: 'translateX(0)', opacity: 1 },
  },
  slideInLeft: {
    from: { transform: 'translateX(-100%)', opacity: 0 },
    to: { transform: 'translateX(0)', opacity: 1 },
  },
  slideInUp: {
    from: { transform: 'translateY(100%)', opacity: 0 },
    to: { transform: 'translateY(0)', opacity: 1 },
  },
  slideInDown: {
    from: { transform: 'translateY(-100%)', opacity: 0 },
    to: { transform: 'translateY(0)', opacity: 1 },
  },
  zoomIn: {
    from: { transform: 'scale(0.5)', opacity: 0 },
    to: { transform: 'scale(1)', opacity: 1 },
  },
  zoomOut: {
    from: { transform: 'scale(1)', opacity: 1 },
    to: { transform: 'scale(0.5)', opacity: 0 },
  },
  rotate: {
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
  },
  pulse: {
    '0%, 100%': { opacity: 1 },
    '50%': { opacity: 0.5 },
  },
  ping: {
    '75%, 100%': {
      transform: 'scale(2)',
      opacity: 0,
    },
  },
  bounce: {
    '0%, 100%': {
      transform: 'translateY(-25%)',
      animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
    },
    '50%': {
      transform: 'translateY(0)',
      animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
    },
  },
  float: {
    '0%, 100%': { transform: 'translateY(0)' },
    '50%': { transform: 'translateY(-20px)' },
  },
  wiggle: {
    '0%, 100%': { transform: 'rotate(-3deg)' },
    '50%': { transform: 'rotate(3deg)' },
  },
  shake: {
    '0%, 100%': { transform: 'translateX(0)' },
    '25%': { transform: 'translateX(-10px)' },
    '75%': { transform: 'translateX(10px)' },
  },
}) as const

// Transition configurations
export const transitions = Object.freeze({
  // Base transitions
  base: `all ${durations.normal}ms ${easings.premium}`,
  fast: `all ${durations.fast}ms ${easings.premium}`,
  slow: `all ${durations.slow}ms ${easings.premium}`,
  
  // Property-specific transitions
  opacity: `opacity ${durations.normal}ms ${easings.premium}`,
  transform: `transform ${durations.normal}ms ${easings.premium}`,
  colors: `background-color ${durations.fast}ms ${easings.premium}, 
           border-color ${durations.fast}ms ${easings.premium}, 
           color ${durations.fast}ms ${easings.premium}`,
  shadow: `box-shadow ${durations.normal}ms ${easings.premium}`,
  
  // Complex transitions
  all: `all ${durations.normal}ms ${easings.premium}`,
  none: 'none',
}) as const

// Animation compositions
export const animations = Object.freeze({
  // Entrance animations
  fadeIn: `fadeIn ${durations.normal}ms ${easings.premium}`,
  fadeUp: `fadeUp ${durations.normal}ms ${easings.premium}`,
  slideIn: `slideInUp ${durations.normal}ms ${easings.springOut}`,
  zoomIn: `zoomIn ${durations.normal}ms ${easings.springOut}`,
  
  // Exit animations
  fadeOut: `fadeOut ${durations.fast}ms ${easings.premium}`,
  slideOut: `slideOutDown ${durations.fast}ms ${easings.sharp}`,
  zoomOut: `zoomOut ${durations.fast}ms ${easings.sharp}`,
  
  // Attention animations
  pulse: `pulse ${durations.slower}ms ${easings.ease} infinite`,
  bounce: `bounce ${durations.slowest}ms ${easings.ease} infinite`,
  wiggle: `wiggle ${durations.slow}ms ${easings.ease} infinite`,
  
  // Loading animations
  spin: `rotate ${durations.slowest}ms ${easings.linear} infinite`,
  ping: `ping ${durations.slowest}ms ${easings.ease} infinite`,
}) as const

// Framer Motion variants
export const motionVariants = Object.freeze({
  // Page transitions
  pageInitial: { opacity: 0, y: 20 },
  pageAnimate: { opacity: 1, y: 0 },
  pageExit: { opacity: 0, y: -20 },
  
  // Modal/overlay transitions
  overlayInitial: { opacity: 0 },
  overlayAnimate: { opacity: 1 },
  overlayExit: { opacity: 0 },
  
  modalInitial: { opacity: 0, scale: 0.95 },
  modalAnimate: { opacity: 1, scale: 1 },
  modalExit: { opacity: 0, scale: 0.95 },
  
  // List item stagger
  listContainer: {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  },
  listItem: {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        ...springs.gentle,
      },
    },
  },
}) as const

// Helper functions
export function createTransition(
  property = 'all',
  duration = durations.normal,
  easing = easings.premium,
  delay = 0
): string {
  return delay > 0
    ? `${property} ${duration}ms ${easing} ${delay}ms`
    : `${property} ${duration}ms ${easing}`
}

export function createStaggerDelay(
  index: number,
  staggerAmount = durations.stagger.normal
): number {
  return index * staggerAmount
}

// Generate CSS animation utilities
export function generateAnimationVars(prefix = '--ds-anim'): Record<string, string> {
  const vars: Record<string, string> = {}
  
  // Durations
  for (const [key, value] of Object.entries(durations)) {
    if (typeof value === 'number') {
      vars[`${prefix}-duration-${key}`] = `${value}ms`
    }
  }
  
  // Easings
  for (const [key, value] of Object.entries(easings)) {
    vars[`${prefix}-ease-${key}`] = value
  }
  
  return vars
}

export type Duration = keyof typeof durations
export type Easing = keyof typeof easings
export type Spring = keyof typeof springs
export type Animation = keyof typeof animations
export type Transition = keyof typeof transitions