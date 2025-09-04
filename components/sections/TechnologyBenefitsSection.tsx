'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { sectionClasses } from '@/lib/design-system/spacing-system'
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
  
  // Transform values for parallax effect - sem movimento vertical
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 0])
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 0.92])
  
  // Premium animation configurations
  const smoothEase = [0.25, 0.46, 0.45, 0.94]
  
  return (
    <section 
      ref={sectionRef}
      className={`${sectionClasses.primary} relative w-full overflow-visible bg-white`}
      aria-label="Tecnologia e benefícios da plataforma"
    >
      {/* Subtle background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 -left-32 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-freela-50/30 to-transparent blur-3xl" />
        <div className="absolute bottom-1/3 -right-32 w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-institucional-50/30 to-transparent blur-3xl" />
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Content Section - Matching TargetAudienceSection structure */}
        <div>
          <div ref={containerRef} className="relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: smoothEase }}
            >
              <h2 className="text-4xl md:text-5xl font-black text-empresa-900 mb-3">
                Usamos a tecnologia <span className="text-[#ec4464]">a seu favor</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Conectamos você às melhores oportunidades através de tecnologia inteligente e eficiente
              </p>
            </motion.div>
            
            {/* Benefits Cards */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: smoothEase }}
              className="w-full lg:w-1/2 mt-6"
            >
              {/* Benefits Grid - Premium Design */}
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
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
        
            {/* Image Section - Ajustado tamanho e posição */}
            <div className="absolute -bottom-2 -right-10 md:-right-16 lg:-right-20 w-full lg:w-2/3 h-full">
              <motion.div 
                className="relative flex items-end justify-end h-full"
                initial={{ opacity: 0, x: 60 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 1, delay: 0.2, ease: smoothEase }}
              >
                <motion.div
                  className="relative w-full"
                  style={{ 
                    y: imageY,
                    scale: 1.2  // Reduzido para 20% de aumento
                  }}
                >
                  {/* Premium Image Container */}
                  <div className="relative">
                    {/* Subtle gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-freela-100/10 via-transparent to-transparent rounded-3xl pointer-events-none" />
                    
                    {/* Main Image - Tamanho otimizado */}
                    <Image
                      src="/phone-mockup-hand.png"
                      alt="Interface do app estaff mostrando tecnologia avançada"
                      width={4500}
                      height={5400}
                      className="w-full h-auto object-contain relative z-10 transition-transform duration-500 hover:scale-[1.02] origin-bottom"
                      quality={100}
                      priority
                    />
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}