'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { sectionClasses } from '@/lib/design-system/spacing-system'

export default function HospitalidadeSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { 
    once: true, 
    amount: 0.2,
    margin: "-100px" 
  })

  // Premium easing curves for professional feel
  const easeOut = [0.16, 1, 0.3, 1] as const
  const easeLuxury = [0.22, 0.61, 0.36, 1] as const

  // Professional animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: easeLuxury }
    }
  }

  const staggerContainer = {
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  }

  const slideInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: easeOut }
    }
  }


  return (
    <section 
      ref={sectionRef}
      className={`${sectionClasses.primary} w-full overflow-hidden relative`}
      style={{
        background: `
          radial-gradient(ellipse at top left, rgba(236, 212, 164, 0.95) 0%, rgba(236, 212, 164, 1) 40%),
          radial-gradient(ellipse at bottom right, rgba(226, 199, 148, 1) 0%, rgba(236, 212, 164, 1) 60%),
          linear-gradient(180deg, #ecd4a4 0%, #e2c794 100%)
        `,
      }}
      aria-label="Seção sobre hospitalidade - Feito por e para profissionais"
    >
      {/* Premium professional background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Sophisticated gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/5" />
        
        {/* Elegant ambient lighting */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-b from-white/15 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/5 to-transparent" />
        
        {/* Professional geometric accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[1px] bg-gradient-to-r from-transparent via-empresa-900/10 to-transparent" />
      </div>


      {/* Main Content Container - Following exact design system measurements */}
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col items-center justify-center text-center"
        >
          
          {/* Professional Title */}
          <motion.div variants={fadeIn} className="mb-8">
            <h2 
              className="text-5xl md:text-6xl lg:text-7xl font-light tracking-wide"
              style={{ 
                color: '#142444',
                letterSpacing: '0.02em'
              }}
            >
              Hospitalidade
            </h2>
            
            {/* Minimalist accent line */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
              transition={{
                duration: 1.4,
                delay: 0.6,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="w-32 h-[2px] bg-empresa-900/30 mx-auto mt-8"
            />
          </motion.div>

          {/* Professional subtitle */}
          <motion.div variants={slideInUp} className="max-w-3xl">
            <p 
              className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed"
              style={{ 
                color: '#142444',
                lineHeight: '1.7',
                letterSpacing: '0.01em'
              }}
            >
              Feito por profissionais e para profissionais de Hospitalidade, visando uma melhor experiência para empresas, profissionais e clientes.
            </p>
          </motion.div>


        </motion.div>
      </div>

      {/* Professional bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/10 to-transparent pointer-events-none" />
    </section>
  )
}