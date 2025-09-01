'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { clsx } from 'clsx'

interface NavItem {
  label: string
  href: string
  icon?: React.ReactNode
  badge?: string | number
}

interface NavigationProps {
  logo?: React.ReactNode
  items?: NavItem[]
  actions?: React.ReactNode
  variant?: 'default' | 'glass' | 'solid'
  sticky?: boolean
}

export default function Navigation({
  logo = <span className="text-2xl font-bold gradient-text">estaff</span>,
  items = [
    { label: 'Home', href: '/' },
    { label: 'Para Freelancers', href: '/freelancers' },
    { label: 'Para Empresas', href: '/empresas' },
    { label: 'Como Funciona', href: '/como-funciona' },
    { label: 'Preços', href: '/precos' },
    { label: 'Contato', href: '/contato' }
  ],
  actions,
  variant = 'glass',
  sticky = true
}: NavigationProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navVariants = {
    default: clsx(
      'bg-white',
      scrolled ? 'shadow-lg' : 'shadow-sm'
    ),
    glass: clsx(
      scrolled 
        ? 'bg-white/95 backdrop-blur-xl shadow-lg' 
        : 'bg-white/80 backdrop-blur-md shadow-sm'
    ),
    solid: 'bg-empresa-900 text-white shadow-lg'
  }

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0
    },
    open: {
      opacity: 1,
      height: 'auto'
    }
  }

  const itemVariants = {
    closed: { x: -20, opacity: 0 },
    open: {
      x: 0,
      opacity: 1
    }
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={clsx(
        'w-full z-50 transition-all duration-300',
        sticky && 'fixed top-0',
        navVariants[variant]
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0"
          >
            <Link href="/">
              {logo}
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {items.map((item, index) => {
              const isActive = pathname === item.href
              
              return (
                <Link key={index} href={item.href}>
                  <motion.div
                    className="relative px-4 py-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Active Indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute inset-0 bg-gradient-to-r from-freela/10 to-empresa/10 rounded-lg"
                        transition={{ type: 'spring', stiffness: 300 }}
                      />
                    )}
                    
                    <span className={clsx(
                      'relative z-10 flex items-center space-x-2 font-medium transition-colors',
                      isActive 
                        ? 'text-freela' 
                        : variant === 'solid'
                          ? 'text-white/80 hover:text-white'
                          : 'text-gray-700 hover:text-freela'
                    )}>
                      {item.icon && <span>{item.icon}</span>}
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="ml-2 px-2 py-0.5 text-xs bg-freela text-white rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </span>
                  </motion.div>
                </Link>
              )
            })}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {actions || (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={clsx(
                    'px-4 py-2 font-medium rounded-lg transition-all',
                    variant === 'solid'
                      ? 'text-white/90 hover:text-white'
                      : 'text-gray-700 hover:text-freela'
                  )}
                >
                  Entrar
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gradient-to-r from-freela to-empresa text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                  Cadastrar
                </motion.button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center"
          >
            <div className="flex flex-col justify-center items-center w-6">
              <motion.span
                animate={{
                  rotate: mobileMenuOpen ? 45 : 0,
                  y: mobileMenuOpen ? 8 : 0
                }}
                className={clsx(
                  'block h-0.5 w-6 mb-1.5 transition-all',
                  variant === 'solid' ? 'bg-white' : 'bg-gray-900'
                )}
              />
              <motion.span
                animate={{
                  opacity: mobileMenuOpen ? 0 : 1,
                  scaleX: mobileMenuOpen ? 0 : 1
                }}
                className={clsx(
                  'block h-0.5 w-6 mb-1.5 transition-all',
                  variant === 'solid' ? 'bg-white' : 'bg-gray-900'
                )}
              />
              <motion.span
                animate={{
                  rotate: mobileMenuOpen ? -45 : 0,
                  y: mobileMenuOpen ? -8 : 0
                }}
                className={clsx(
                  'block h-0.5 w-6 transition-all',
                  variant === 'solid' ? 'bg-white' : 'bg-gray-900'
                )}
              />
            </div>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="md:hidden overflow-hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {items.map((item, index) => {
                  const isActive = pathname === item.href
                  
                  return (
                    <motion.div
                      key={index}
                      custom={index}
                      variants={itemVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                    >
                      <Link href={item.href}>
                        <motion.div
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setMobileMenuOpen(false)}
                          className={clsx(
                            'block px-3 py-2 rounded-lg text-base font-medium transition-all',
                            isActive
                              ? 'bg-gradient-to-r from-freela/10 to-empresa/10 text-freela'
                              : variant === 'solid'
                                ? 'text-white/80 hover:text-white hover:bg-white/10'
                                : 'text-gray-700 hover:text-freela hover:bg-gray-50'
                          )}
                        >
                          <span className="flex items-center space-x-2">
                            {item.icon && <span>{item.icon}</span>}
                            <span>{item.label}</span>
                            {item.badge && (
                              <span className="ml-auto px-2 py-0.5 text-xs bg-freela text-white rounded-full">
                                {item.badge}
                              </span>
                            )}
                          </span>
                        </motion.div>
                      </Link>
                    </motion.div>
                  )
                })}
                
                {/* Mobile Actions */}
                <div className="pt-4 space-y-2 border-t border-gray-200">
                  <motion.button
                    custom={items.length}
                    variants={itemVariants}
                    initial="closed"
                    animate="open"
                    whileTap={{ scale: 0.95 }}
                    className={clsx(
                      'block w-full px-3 py-2 text-left rounded-lg font-medium transition-all',
                      variant === 'solid'
                        ? 'text-white/90 hover:text-white hover:bg-white/10'
                        : 'text-gray-700 hover:text-freela hover:bg-gray-50'
                    )}
                  >
                    Entrar
                  </motion.button>
                  <motion.button
                    custom={items.length + 1}
                    variants={itemVariants}
                    initial="closed"
                    animate="open"
                    whileTap={{ scale: 0.95 }}
                    className="block w-full px-3 py-2 bg-gradient-to-r from-freela to-empresa text-white font-medium rounded-lg shadow-md"
                  >
                    Cadastrar
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Progress Bar (optional) */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-freela to-empresa"
        style={{
          scaleX: 0,
          transformOrigin: 'left'
        }}
        animate={{
          scaleX: scrolled ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.nav>
  )
}

// Sub Navigation Component for sections
interface SubNavProps {
  items: NavItem[]
  className?: string
}

export function SubNavigation({ items, className }: SubNavProps) {
  const pathname = usePathname()
  
  return (
    <div className={clsx('flex space-x-1 p-1 bg-gray-100 rounded-lg', className)}>
      {items.map((item, index) => {
        const isActive = pathname === item.href
        
        return (
          <Link key={index} href={item.href} className="flex-1">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={clsx(
                'w-full px-4 py-2 rounded-md font-medium transition-all relative',
                isActive
                  ? 'text-white'
                  : 'text-gray-600 hover:text-gray-900'
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="subnav-indicator"
                  className="absolute inset-0 bg-gradient-to-r from-freela to-empresa rounded-md"
                  transition={{ type: 'spring', stiffness: 300 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </motion.button>
          </Link>
        )
      })}
    </div>
  )
}