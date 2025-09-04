'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { 
  Database,
  ShieldCheck,
  CalendarDays,
  BarChart3,
  Headphones,
  Star
} from 'lucide-react'

// Benefit interface with icon and text
interface Benefit {
  icon: React.ElementType
  text: string
}

// Premium benefits data - more concise
const benefits: Benefit[] = [
  {
    icon: Database,
    text: 'Match ideal entre profissionais e clientes'
  },
  {
    icon: ShieldCheck,
    text: 'Check-in e check-out seguros'
  },
  {
    icon: CalendarDays,
    text: 'Ferramenta de escala inteligente'
  },
  {
    icon: BarChart3,
    text: 'Relatórios em tempo real'
  },
  {
    icon: Headphones,
    text: 'Atendimento dedicado'
  },
  {
    icon: Star,
    text: 'Favoritar profissionais de destaque'
  }
]

export default function TechnologyBenefitsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Section visibility detection
  const isInView = useInView(sectionRef, { 
    once: true, 
    amount: 0.15,
    margin: "-50px" 
  })
  
  // Parallax scrolling for image
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  // Transform values for parallax effect
  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40])
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 0.92])
  
  // Premium animation configurations
  const smoothEase = [0.25, 0.46, 0.45, 0.94]
  
  return (
    <section 
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-visible bg-white"
      aria-label="Tecnologia e benefícios da plataforma"
    >
      {/* Subtle background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 -left-32 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-freela-50/30 to-transparent blur-3xl" />
        <div className="absolute bottom-1/3 -right-32 w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-institucional-50/30 to-transparent blur-3xl" />
      </div>
      
      {/* Title Outside and Above Container - Exactly 2 Lines */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.1, ease: smoothEase }}
        className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-20 lg:pt-24 pb-8"
      >
        <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-[#2d3436] leading-none">
          <span className="block">Usamos a tecnologia</span>
          <span className="block text-[#ec4464] -mt-1">a seu favor</span>
        </h2>
      </motion.div>
      
      <div 
        ref={containerRef}
        className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-20 lg:pb-0"
      >
        {/* Premium 45-55 Split Layout - Benefits smaller, Image larger */}
        <div className="grid grid-cols-1 lg:grid-cols-[45fr_55fr] gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Benefits (45%) */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: smoothEase }}
            className="space-y-10"
          >
            {/* Benefits Grid - Premium Design */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3, ease: smoothEase }}
            >
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ 
                      duration: 0.6, 
                      delay: 0.4 + index * 0.1,
                      ease: smoothEase 
                    }}
                    whileHover={{ 
                      x: 8,
                      transition: { duration: 0.3, ease: smoothEase }
                    }}
                    className="group"
                  >
                    <div className="flex items-start gap-3 p-3 rounded-2xl bg-white border border-gray-100 hover:border-freela-200 hover:bg-gradient-to-br hover:from-white hover:to-freela-50/30 transition-all duration-500 hover:shadow-lg hover:shadow-freela-100/50">
                      {/* Premium Icon Container - Smaller */}
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-freela-50 to-freela-100/50 flex items-center justify-center group-hover:from-freela-100 group-hover:to-freela-200/50 transition-all duration-500">
                        <Icon className="w-4 h-4 text-freela-600 group-hover:text-freela-700 transition-colors duration-300" />
                      </div>
                      
                      {/* Premium Text - More Concise */}
                      <p className="text-[#2d3436]/80 leading-[1.4] text-[14px] font-medium group-hover:text-[#2d3436] transition-colors duration-300">
                        {benefit.text}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </motion.div>
          
          {/* Right Column - Dramatically Larger Image (55%) */}
          <motion.div 
            className="relative lg:h-auto flex items-center justify-center lg:justify-end"
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: smoothEase }}
          >
            <motion.div
              className="relative w-full scale-[2.2] lg:scale-[2.8] origin-bottom-right -mb-48 lg:-mb-64 mr-0 lg:mr-[-20%]"
              style={{ 
                y: imageY,
                scale: imageScale
              }}
            >
              {/* Premium Image Container - Dramatically Larger */}
              <div className="relative">
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-freela-100/10 via-transparent to-transparent rounded-3xl pointer-events-none" />
                
                {/* Main Image - Much Larger */}
                <Image
                  src="/phone-mockup-hand.png"
                  alt="Interface do app estaff mostrando tecnologia avançada"
                  width={1200}
                  height={1440}
                  className="w-full h-auto object-contain relative z-10 transition-transform duration-500 hover:scale-[1.02]"
                  quality={100}
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

    </section>
  )
}