'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'

interface HeroProps {
  title?: string
  subtitle?: string
  description?: string
  primaryCTA?: {
    text: string
    href: string
  }
  secondaryCTA?: {
    text: string
    href: string
  }
  variant?: 'freela' | 'empresa' | 'institucional' | 'default'
}

export default function Hero({
  title = "Conectamos talentos com oportunidades",
  subtitle = "estaff",
  description = "A plataforma que revoluciona a forma como freelancers e empresas se conectam. Encontre os melhores profissionais ou as melhores oportunidades.",
  primaryCTA = { text: "Começar Agora", href: "/signup" },
  secondaryCTA = { text: "Saiba Mais", href: "#features" },
  variant = 'default'
}: HeroProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const x = (clientX / window.innerWidth - 0.5) * 20
      const y = (clientY / window.innerHeight - 0.5) * 20
      setMousePosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const variants = {
    freela: 'from-freela-400 via-freela-500 to-freela-600',
    empresa: 'from-empresa-700 via-empresa-800 to-empresa-900',
    institucional: 'from-institucional-300 via-institucional-400 to-institucional-500',
    default: 'from-freela-500 via-empresa-800 to-institucional-400'
  }

  const textAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0
    }
  }

  const floatingAnimation = {
    animate: {
      y: [0, -10, 0]
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-white">
        <div 
          className={`absolute inset-0 bg-gradient-to-br ${variants[variant]} opacity-10 animate-gradient`}
          style={{ backgroundSize: '400% 400%' }}
        />
      </div>

      {/* Floating Orbs */}
      <motion.div
        className="absolute top-20 left-20 w-72 h-72 bg-freela-400 rounded-full filter blur-3xl opacity-20"
        animate={{
          x: mousePosition.x * 2,
          y: mousePosition.y * 2,
        }}
        transition={{ type: 'spring', stiffness: 50 }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-96 h-96 bg-empresa-600 rounded-full filter blur-3xl opacity-20"
        animate={{
          x: mousePosition.x * -1.5,
          y: mousePosition.y * -1.5,
        }}
        transition={{ type: 'spring', stiffness: 50 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-institucional-400 rounded-full filter blur-3xl opacity-15"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
        }}
        transition={{ type: 'spring', stiffness: 30 }}
      />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-block mb-6"
        >
          <div className="badge-premium backdrop-blur-sm bg-white/10 border border-white/20">
            <span className="animate-pulse mr-2">✨</span>
            Novo: Integração com IA
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={textAnimation}
          className="mb-4"
        >
          <span className="text-lg md:text-xl font-medium gradient-text-animated uppercase tracking-wider">
            {subtitle}
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={textAnimation}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
        >
          <span className="block text-gray-900">
            {title.split(' ').slice(0, 2).join(' ')}
          </span>
          <span className="block gradient-text mt-2">
            {title.split(' ').slice(2).join(' ')}
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={textAnimation}
          className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          {description}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={textAnimation}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href={primaryCTA.href}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 bg-gradient-to-r from-freela to-empresa text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center">
                {primaryCTA.text}
                <svg
                  className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-empresa to-freela opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
          </Link>

          <Link href={secondaryCTA.href}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-900 font-semibold rounded-xl shadow-lg hover:shadow-xl border border-gray-200 hover:border-freela/30 transition-all duration-300"
            >
              <span className="flex items-center justify-center">
                {secondaryCTA.text}
                <svg
                  className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
        >
          {[
            { value: '10K+', label: 'Freelancers' },
            { value: '500+', label: 'Empresas' },
            { value: '95%', label: 'Satisfação' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={floatingAnimation}
              animate="animate"
              style={{ animationDelay: `${index * 0.2}s` }}
              className="glass rounded-2xl p-4"
            >
              <div className="text-2xl md:text-3xl font-bold gradient-text">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center text-gray-400"
          >
            <span className="text-sm mb-2">Scroll</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-10 right-10 w-20 h-20 border border-freela/20 rounded-full animate-spin-slow" />
        <div className="absolute bottom-10 left-10 w-32 h-32 border border-empresa/20 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse' }} />
        <div className="absolute top-1/3 right-1/4 w-16 h-16 border border-institucional/20 rounded-full animate-float" />
      </div>
    </section>
  )
}