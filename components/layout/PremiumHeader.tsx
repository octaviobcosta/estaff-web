'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValue, useTransform, useSpring } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavItem {
  label: string
  href: string
  color: string
  gradient: string
  icon: string
  description: string
}

const navigationItems: NavItem[] = [
  { 
    label: 'Para Profissionais', 
    href: '/para-profissionais',
    color: 'freela',
    gradient: 'from-freela to-freela-600',
    icon: '👤',
    description: 'Encontre as melhores oportunidades'
  },
  { 
    label: 'Para Empresas', 
    href: '/para-empresas',
    color: 'empresa',
    gradient: 'from-empresa to-empresa-600',
    icon: '🏢',
    description: 'Contrate os melhores talentos'
  },
  { 
    label: 'Como Funciona', 
    href: '/como-funciona',
    color: 'institucional-500',
    gradient: 'from-institucional-400 to-institucional-600',
    icon: '⚙️',
    description: 'Entenda nosso processo'
  },
  { 
    label: 'Sobre', 
    href: '/sobre',
    color: 'gray-700',
    gradient: 'from-gray-600 to-gray-800',
    icon: 'ℹ️',
    description: 'Conheça nossa história'
  },
]


export default function PremiumHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const pathname = usePathname()
  
  // Advanced scroll detection with performance optimization
  const { scrollY } = useScroll()
  const scrollProgress = useTransform(scrollY, [0, 100], [0, 1])
  const headerBackground = useTransform(
    scrollProgress,
    [0, 1],
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.98)']
  )
  const headerBlur = useTransform(scrollProgress, [0, 1], [0, 20])
  const headerShadow = useTransform(
    scrollProgress,
    [0, 1],
    ['0 0 0 rgba(0,0,0,0)', '0 10px 30px rgba(0,0,0,0.08)']
  )
  
  // Mouse tracking for interactive effects
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 })

  useEffect(() => {
    let rafId: number
    const updateScrollState = () => {
      if (rafId) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 20)
      })
    }
    
    window.addEventListener('scroll', updateScrollState, { passive: true })
    updateScrollState()
    
    return () => {
      window.removeEventListener('scroll', updateScrollState)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left - rect.width / 2)
    mouseY.set(e.clientY - rect.top - rect.height / 2)
  }, [mouseX, mouseY])

  const isActiveRoute = (href: string) => pathname === href

  return (
    <>
      {/* Premium Header with Advanced Effects */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: headerBackground,
          backdropFilter: `blur(${headerBlur}px)`,
          boxShadow: headerShadow,
        }}
        onMouseMove={handleMouseMove}
      >
        {/* Animated gradient background overlay */}
        <motion.div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background: isScrolled
              ? 'linear-gradient(135deg, transparent 0%, rgba(236, 68, 100, 0.03) 25%, rgba(20, 36, 68, 0.03) 50%, rgba(236, 212, 164, 0.03) 75%, transparent 100%)'
              : 'transparent',
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />

        {/* Interactive light effect following mouse */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-50"
          style={{
            background: `radial-gradient(600px circle at ${smoothMouseX.get()}px ${smoothMouseY.get()}px, rgba(236, 68, 100, 0.03), transparent 40%)`,
          }}
        />
        <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-full">
            
            {/* Logo with Delightful Hover Animation */}
            <motion.div
              variants={logoVariants}
              initial="idle"
              whileHover="hover"
              className="flex items-center h-full"
            >
              <Link
                href="/"
                className="flex items-center h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#122046] focus-visible:ring-offset-2 rounded-md"
                aria-label="estaff - Página inicial"
              >
                <Image
                  src="/estaff-logo-azul.svg"
                  alt="estaff"
                  width={72}
                  height={24}
                  priority
                  className="h-6 w-auto object-contain will-change-transform"
                />
              </Link>
            </motion.div>

            {/* Desktop Navigation with Smooth Hover Effects */}
            <nav className="hidden lg:flex items-center h-full" role="navigation">
              <div className="flex items-center space-x-1 relative">
                {navigationItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    variants={navItemVariants}
                    initial="idle"
                    whileHover="hover"
                    whileTap="tap"
                    onHoverStart={() => setHoveredItem(item.href)}
                    onHoverEnd={() => setHoveredItem(null)}
                    className="relative"
                  >
                    <Link
                      href={item.href}
                      className={`
                        relative px-4 py-2 rounded-lg
                        text-sm font-medium
                        transition-all duration-200 ease-out
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#122046] focus-visible:ring-offset-2
                        will-change-transform
                        ${isActiveLink(item.href)
                          ? 'text-[#122046] bg-gray-50'
                          : 'text-gray-600 hover:text-[#122046] hover:bg-gray-50'
                        }
                      `}
                    >
                      {item.label}
                      
                      {/* Animated underline for active state */}
                      {isActiveLink(item.href) && (
                        <motion.div
                          layoutId="activeNavIndicator"
                          className="absolute bottom-1 left-4 right-4 h-0.5 bg-[#122046] rounded-full"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30
                          }}
                        />
                      )}
                      
                      {/* Hover indicator */}
                      {hoveredItem === item.href && !isActiveLink(item.href) && (
                        <motion.div
                          className="absolute bottom-1 left-4 right-4 h-0.5 bg-gray-300 rounded-full"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          exit={{ scaleX: 0 }}
                          transition={{
                            duration: 0.2,
                            ease: "easeOut"
                          }}
                        />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Enhanced CTA Button with Premium Interactions */}
              <motion.div
                variants={ctaButtonVariants}
                initial="idle"
                whileHover="hover"
                whileTap="tap"
                className="ml-8"
              >
                <Link
                  href="/demo"
                  className="
                    relative overflow-hidden
                    px-4 py-2
                    bg-[#122046] text-white text-sm font-medium
                    rounded-md
                    transition-colors duration-200
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#122046] focus-visible:ring-offset-2
                    will-change-transform
                    group
                  "
                >
                  <span className="relative z-10">Agendar Demo</span>
                  
                  {/* Animated gradient overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#0f1d3d] via-[#122046] to-[#0f1d3d]"
                    initial={{ x: "-100%" }}
                    whileHover={{ 
                      x: "100%",
                      transition: { duration: 0.6, ease: "easeInOut" }
                    }}
                  />
                </Link>
              </motion.div>
            </nav>

            {/* Enhanced Mobile Menu Button */}
            <motion.button
              type="button"
              className="
                lg:hidden p-2 -mr-2
                rounded-lg
                hover:bg-gray-50
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#122046] focus-visible:ring-offset-2
                transition-colors duration-150
              "
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <motion.span 
                  className="block h-0.5 w-full bg-gray-900 rounded-full will-change-transform"
                  animate={{
                    rotate: mobileMenuOpen ? 45 : 0,
                    y: mobileMenuOpen ? 6 : 0,
                  }}
                  transition={{ 
                    duration: 0.3, 
                    ease: [0.25, 0.46, 0.45, 0.94] 
                  }}
                />
                <motion.span 
                  className="block h-0.5 w-full bg-gray-900 rounded-full will-change-transform"
                  animate={{
                    opacity: mobileMenuOpen ? 0 : 1,
                    x: mobileMenuOpen ? -10 : 0,
                  }}
                  transition={{ 
                    duration: 0.2, 
                    ease: "easeInOut" 
                  }}
                />
                <motion.span 
                  className="block h-0.5 w-full bg-gray-900 rounded-full will-change-transform"
                  animate={{
                    rotate: mobileMenuOpen ? -45 : 0,
                    y: mobileMenuOpen ? -6 : 0,
                  }}
                  transition={{ 
                    duration: 0.3, 
                    ease: [0.25, 0.46, 0.45, 0.94] 
                  }}
                />
              </div>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Enhanced Mobile Menu with Premium Animations */}
      <AnimatePresence mode="wait">
        {mobileMenuOpen && (
          <>
            {/* Animated Overlay with Smooth Blur Effect */}
            <motion.div
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ 
                opacity: 1, 
                backdropFilter: "blur(8px)",
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              exit={{ 
                opacity: 0, 
                backdropFilter: "blur(0px)",
                transition: { duration: 0.2, ease: "easeIn" }
              }}
              className="fixed inset-0 z-40 bg-black/25 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Premium Mobile Menu Panel */}
            <motion.div
              initial={{ 
                x: '100%',
                opacity: 0,
                scale: 0.95
              }}
              animate={{ 
                x: 0,
                opacity: 1,
                scale: 1,
                transition: { 
                  type: 'spring', 
                  damping: 25, 
                  stiffness: 350,
                  mass: 0.8
                }
              }}
              exit={{ 
                x: '100%',
                opacity: 0,
                scale: 0.95,
                transition: { 
                  type: 'spring', 
                  damping: 25, 
                  stiffness: 400,
                  mass: 0.6
                }
              }}
              className="
                fixed top-0 right-0 bottom-0 w-[300px] z-50
                bg-white/95 backdrop-blur-xl shadow-2xl
                lg:hidden will-change-transform
                border-l border-gray-200/50
              "
            >
              <div className="flex flex-col h-full">
                {/* Animated Mobile Menu Header */}
                <motion.div 
                  className="flex items-center justify-between px-6 h-16 border-b border-gray-200/50"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: 0.1, duration: 0.3, ease: "easeOut" }
                  }}
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ 
                      scale: 1, 
                      rotate: 0,
                      transition: { delay: 0.15, type: "spring", stiffness: 200, damping: 15 }
                    }}
                  >
                    <Image
                      src="/estaff-logo-azul.svg"
                      alt="estaff"
                      width={64}
                      height={20}
                      className="h-5 w-auto object-contain"
                    />
                  </motion.div>
                  
                  <motion.button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#122046] focus-visible:ring-offset-2"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ 
                      opacity: 1, 
                      rotate: 0,
                      transition: { delay: 0.2, duration: 0.3, ease: "easeOut" }
                    }}
                  >
                    <svg 
                      className="w-5 h-5 text-gray-600" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </motion.button>
                </motion.div>

                {/* Enhanced Mobile Navigation with Stagger Animation */}
                <nav className="flex-1 px-6 py-8">
                  {navigationItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 50, scale: 0.9 }}
                      animate={{ 
                        opacity: 1, 
                        x: 0, 
                        scale: 1,
                        transition: { 
                          delay: 0.1 + (index * 0.05), 
                          duration: 0.3, 
                          ease: [0.25, 0.46, 0.45, 0.94]
                        }
                      }}
                      whileHover={{ 
                        x: 4,
                        transition: { duration: 0.2 }
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`
                          block px-4 py-4 mb-2
                          rounded-xl
                          text-base font-medium
                          transition-all duration-200 ease-out
                          will-change-transform
                          ${isActiveLink(item.href)
                            ? 'text-[#122046] bg-blue-50/80 shadow-sm'
                            : 'text-gray-700 hover:text-[#122046] hover:bg-gray-50/80'
                          }
                        `}
                      >
                        <span className="flex items-center justify-between">
                          {item.label}
                          {isActiveLink(item.href) && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-2 h-2 bg-[#122046] rounded-full"
                            />
                          )}
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Enhanced Mobile CTA with Premium Animation */}
                <motion.div 
                  className="p-6 border-t border-gray-200/50"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: 0.3, duration: 0.4, ease: "easeOut" }
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      href="/demo"
                      onClick={() => setMobileMenuOpen(false)}
                      className="
                        relative overflow-hidden
                        flex items-center justify-center
                        w-full py-4
                        bg-[#122046] text-white font-semibold
                        rounded-xl
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#122046] focus-visible:ring-offset-2
                        group
                      "
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        Agendar Demo
                        <motion.svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          whileHover={{ x: 4 }}
                          transition={{ duration: 0.2 }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </motion.svg>
                      </span>
                      
                      {/* Shimmer effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                        initial={{ x: "-100%" }}
                        whileHover={{
                          x: "100%",
                          transition: { duration: 0.8, ease: "easeInOut" }
                        }}
                      />
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Dynamic Header Spacer with Smooth Transitions */}
      <motion.div 
        className="h-16 lg:h-16"
        animate={{
          height: scrolled ? "60px" : "64px"
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut"
        }}
      />
    </>
  )
}