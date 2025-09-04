'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { 
  Database,
  ShieldCheck,
  CalendarDays,
  BarChart3,
  Headphones,
  Star,
  Maximize2,
  X
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
  const [isExpanded, setIsExpanded] = useState(false)
  
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
  
  // Close sidebar on scroll
  useEffect(() => {
    if (!isExpanded) return

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsExpanded(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isExpanded])
  
  // Premium animation configurations
  const smoothEase = [0.25, 0.46, 0.45, 0.94]
  
  return (
    <section 
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center overflow-hidden bg-white"
      aria-label="Tecnologia e benefícios da plataforma"
    >
      {/* Subtle background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 -left-32 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-freela-50/30 to-transparent blur-3xl" />
        <div className="absolute bottom-1/3 -right-32 w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-institucional-50/30 to-transparent blur-3xl" />
      </div>
      
      <div 
        ref={containerRef}
        className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:pb-0 lg:pt-20"
      >
        {/* Premium 55-45 Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Content (55%) */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: smoothEase }}
            className="space-y-10"
          >
            {/* Premium Title - Two Lines */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: smoothEase }}
            >
              <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-[#2d3436] leading-[0.95] tracking-tight">
                <span className="block">Usamos a tecnologia</span>
                <span className="block text-[#ec4464]">a seu favor</span>
              </h2>
            </motion.div>
            
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
          
          {/* Right Column - Premium Image (45%) - Bottom Aligned */}
          <motion.div 
            className="relative lg:h-[700px] flex items-end justify-center lg:justify-end"
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: smoothEase }}
          >
            <motion.div
              className="relative w-full scale-[1.3] lg:scale-[1.5] origin-bottom-right -mb-32 lg:-mb-40 mr-0 lg:mr-[-10%]"
              style={{ 
                y: imageY,
                scale: imageScale
              }}
            >
              {/* Premium Image Container - Max Size */}
              <div className="relative group">
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-freela-100/10 via-transparent to-transparent rounded-3xl pointer-events-none" />
                
                {/* Main Image - Bottom Aligned */}
                <Image
                  src="/phone-mockup-hand.png"
                  alt="Interface do app estaff mostrando tecnologia avançada"
                  width={800}
                  height={1000}
                  className="w-full h-auto object-contain object-bottom relative z-10 cursor-pointer transition-transform duration-500 group-hover:scale-[1.02]"
                  quality={95}
                  priority
                  onClick={() => setIsExpanded(true)}
                />
                
                {/* Premium Expand Button - Elegant Circle Bottom Right */}
                <motion.button
                  onClick={() => setIsExpanded(true)}
                  className="absolute bottom-8 right-8 z-20 w-14 h-14 rounded-full bg-white border-2 border-freela-400 flex items-center justify-center shadow-xl hover:shadow-2xl hover:border-freela-500 transition-all duration-500 group/btn"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2, duration: 0.5, ease: smoothEase }}
                >
                  <Maximize2 className="w-6 h-6 text-freela-500 group-hover/btn:text-freela-600 transition-colors duration-300" />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Premium Expanded Sidebar - 50vw Right Slide */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex"
          >
            {/* Premium Backdrop with Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
              onClick={() => setIsExpanded(false)}
            />

            {/* Premium Sidebar Panel - Exactly 50vw Width */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ 
                type: "spring", 
                damping: 30, 
                stiffness: 300,
                mass: 0.8
              }}
              className="relative ml-auto w-[50vw] h-full bg-white shadow-2xl overflow-hidden"
            >
              {/* Premium Header */}
              <div className="absolute top-0 left-0 right-0 z-20 p-8 bg-gradient-to-b from-white to-white/95">
                <div className="flex items-center justify-between">
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <h3 className="text-3xl font-bold text-[#2d3436] mb-2">
                      Interface Premium
                    </h3>
                    <p className="text-gray-600 text-lg">
                      Tecnologia de ponta para seu negócio
                    </p>
                  </motion.div>
                  
                  <motion.button
                    onClick={() => setIsExpanded(false)}
                    className="w-14 h-14 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 flex items-center justify-center transition-all duration-300 shadow-lg"
                    whileHover={{ scale: 1.05, rotate: 90 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X className="w-7 h-7 text-gray-700" />
                  </motion.button>
                </div>
              </div>

              {/* Premium Image - Bottom Aligned, 90vh Height */}
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 0.4, 
                  duration: 0.8, 
                  ease: smoothEase 
                }}
                className="absolute bottom-0 left-1/2 -translate-x-1/2"
                style={{ height: '90vh' }}
              >
                <Image
                  src="/phone-mockup-hand.png"
                  alt="Interface expandida do app estaff"
                  width={900}
                  height={1100}
                  className="h-full w-auto object-contain drop-shadow-2xl"
                  quality={100}
                  priority
                />
              </motion.div>

              {/* Premium Info Overlay */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="absolute bottom-12 left-8 right-8 z-10"
              >
                <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-gray-100">
                  <p className="text-gray-700 text-center text-lg leading-relaxed font-medium">
                    Interface intuitiva com tecnologia de ponta para 
                    conectar os melhores profissionais às melhores oportunidades
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}