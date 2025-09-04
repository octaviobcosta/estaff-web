'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Wine,
  Building2,
  Calendar,
  PartyPopper,
  Users,
  Coffee
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface CategoryItem {
  title: string
  icon: React.ElementType
}

const categories: CategoryItem[] = [
  {
    title: 'Bares e Restaurantes',
    icon: Wine,
  },
  {
    title: 'Hotéis',
    icon: Building2,
  },
  {
    title: 'Eventos',
    icon: Calendar,
  },
  {
    title: 'Festas Particulares',
    icon: PartyPopper,
  },
  {
    title: 'Padarias',
    icon: Coffee,
  },
  {
    title: 'Profissionais de Hospitalidade',
    icon: Users,
  }
]

export default function TargetAudienceSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { 
    once: true, 
    amount: 0.2,
    margin: "-100px" 
  })

  const easeOut = [0.16, 1, 0.3, 1]
  const easeLuxury = [0.25, 0.46, 0.45, 0.94]

  const fadeIn = {
    hidden: { opacity: 0, y: 20, filter: "blur(2px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: easeLuxury }
    }
  }

  const staggerContainer = {
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3
      }
    }
  }

  const slideInLeft = {
    hidden: { opacity: 0, x: -30, scale: 0.96 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.8, ease: easeOut }
    }
  }

  return (
    <section 
      ref={sectionRef}
      className="w-full overflow-hidden relative bg-gradient-to-br from-white/95 via-slate-50/90 to-white/95"
      aria-label="Para quem é a plataforma estaff"
    >
      {/* Ambient background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gradient-to-br from-freela-100/30 to-transparent blur-3xl opacity-50" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-gradient-to-tr from-empresa-100/20 to-transparent blur-3xl opacity-40" />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Two Column Layout */}
        <div className="pt-4 pb-2 md:pt-6 md:pb-3">
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start"
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            
            {/* Left Column - Image */}
            <motion.div 
              variants={slideInLeft}
              className="order-2 lg:order-1 lg:scale-110 flex flex-col items-center gap-4"
            >
              <Image
                src="/3mob.png"
                alt="Profissionais da hospitalidade usando a plataforma estaff"
                width={700}
                height={840}
                className="w-full h-auto rounded-xl"
                priority
                quality={90}
              />
              
              {/* CTA Button below Image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
                transition={{ delay: 0.8, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="w-full flex justify-center mt-2"
              >
                <Link
                  href="/cadastro"
                  className="inline-flex items-center justify-center px-6 py-3 bg-transparent text-empresa-900 border-2 border-empresa-900 rounded-xl font-bold text-base hover:bg-empresa-900 hover:text-white hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  Quero Fazer Parte
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Column - Content matched to image height */}
            <div className="order-1 lg:order-2 h-full">
              {/* Container that matches image aspect ratio */}
              <div className="flex flex-col h-full gap-6">
                
                {/* Title Section */}
                <motion.div variants={fadeIn}>
                  <h2 className="text-4xl md:text-5xl font-black text-empresa-900 mb-3">
                    Para quem?
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Nossa plataforma conecta os melhores profissionais com as principais empresas do setor de hospitalidade
                  </p>
                </motion.div>

                {/* Categories Grid - 3x2 grid */}
                <motion.div 
                  className="grid grid-cols-2 md:grid-cols-3 gap-3 flex-grow"
                  variants={staggerContainer}
                >
                  {categories.map((category) => {
                    const Icon = category.icon
                    
                    return (
                      <motion.div
                        key={category.title}
                        variants={fadeIn}
                        whileHover={{ 
                          scale: 1.03, 
                          y: -2,
                          transition: { duration: 0.2, ease: easeOut }
                        }}
                        className="group perspective-1000"
                      >
                        <div className={cn(
                          "relative h-full p-3 rounded-xl overflow-hidden",
                          "flex flex-col items-center justify-center gap-3 text-center", 
                          "glass-card glass-card-hover",
                          "transition-all duration-300 ease-out"
                        )}>
                          {/* Glass Effects */}
                          <div className="glass-effects">
                            <div className="glass-shine" />
                            <div className="glass-highlight" />
                          </div>

                          {/* Icon */}
                          <motion.div 
                            className="icon-container"
                            whileHover={{ 
                              scale: 1.08,
                              rotateY: 15,
                              rotateX: -8,
                              transition: { duration: 0.3, ease: easeOut }
                            }}
                          >
                            <Icon className="w-4 h-4 text-freela-600 group-hover:text-freela-700 transition-colors duration-300" />
                            <div className="icon-glow" />
                          </motion.div>
                          
                          {/* Title */}
                          <h3 className="text-sm font-semibold text-gray-800 leading-tight group-hover:text-gray-900 transition-colors duration-300">
                            {category.title}
                          </h3>
                        </div>
                      </motion.div>
                    )
                  })}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}