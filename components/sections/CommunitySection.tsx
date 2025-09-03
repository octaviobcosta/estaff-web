'use client'

import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import './LogoCarousel.css'

const CommunitySection = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Premium animated counter with easing
  const useCounter = (end: number, duration: number = 2500, startOnView: boolean = true, decimals: number = 0) => {
    const [count, setCount] = useState(0)
    const [isInView, setIsInView] = useState(false)
    const [hasAnimated, setHasAnimated] = useState(false)
    
    useEffect(() => {
      if (!startOnView || (isInView && !hasAnimated)) {
        setHasAnimated(true)
        let startTime: number | null = null
        const animate = (timestamp: number) => {
          if (!startTime) startTime = timestamp
          const elapsed = timestamp - startTime
          const progress = Math.min(elapsed / duration, 1)
          
          // Elegant easing function (ease-out-expo)
          const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
          
          const currentValue = easeOutExpo * end
          setCount(decimals > 0 ? parseFloat(currentValue.toFixed(decimals)) : Math.floor(currentValue))
          
          if (progress < 1) {
            requestAnimationFrame(animate)
          }
        }
        requestAnimationFrame(animate)
      }
    }, [end, duration, isInView, startOnView, hasAnimated, decimals])
    
    return { count, setIsInView }
  }

  // Logo data
  const logos = [
    '/logocarrossel/1.png',
    '/logocarrossel/2.png',
    '/logocarrossel/4.png',
    '/logocarrossel/5.png',
    '/logocarrossel/6.png',
    '/logocarrossel/8.png',
    '/logocarrossel/10.png',
    '/logocarrossel/11.png',
    '/logocarrossel/12.png',
    '/logocarrossel/13.png',
    '/logocarrossel/14.png',
    '/logocarrossel/15.png',
    '/logocarrossel/17.png',
    '/logocarrossel/18.png',
    '/logocarrossel/19.png',
    '/logocarrossel/20.png',
    '/logocarrossel/21.png',
    '/logocarrossel/22.png',
    '/logocarrossel/23.png',
    '/logocarrossel/25.png',
    '/logocarrossel/26.png',
    '/logocarrossel/27.png',
    '/logocarrossel/28.png',
    '/logocarrossel/29.png',
    '/logocarrossel/arcos.png',
    '/logocarrossel/bluenote.png',
    '/logocarrossel/brahma.png',
    '/logocarrossel/quintal.png',
    '/logocarrossel/riviera.png',
  ]

  // Duplicate logos for seamless loop
  const allLogos = [...logos, ...logos]

  // Premium metrics with refined styling (removed score médio)
  const metrics = [
    {
      value: 421000,
      label: 'vagas preenchidas',
      displayValue: (count: number) => `${Math.floor(count / 1000)}k+`,
      duration: 2800,
    },
    {
      value: 700,
      label: 'estabelecimentos',
      displayValue: (count: number) => count.toString(),
      duration: 2400,
    },
    {
      value: 1000,
      label: 'eventos realizados',
      displayValue: (count: number) => `${count}+`,
      duration: 2600,
    },
    {
      value: 143000,
      label: 'profissionais',
      displayValue: (count: number) => `${Math.floor(count / 1000)}k`,
      duration: 2700,
    }
  ]

  return (
    <section className="w-full bg-white overflow-hidden relative">
      {/* Premium layered background with depth */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/40 via-transparent to-empresa-900/[0.02]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-empresa-900/[0.02] via-transparent to-transparent"></div>
      </div>

      {/* Main Content - Aligned with Hero Section */}
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Two Column Layout: Numbers Left, Hero Content Right */}
        <div className="pt-4 pb-2 md:pt-6 md:pb-3">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Left Column - Numbers (2x2 grid) */}
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-6 md:gap-8">
                {metrics.map((metric, index) => {
                  const { count, setIsInView } = useCounter(
                    metric.value,
                    metric.duration,
                    true,
                    0
                  )
                  
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 40, scale: 0.9 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      onViewportEnter={() => setIsInView(true)}
                      transition={{ 
                        duration: 0.7, 
                        delay: index * 0.15,
                        ease: [0.16, 1, 0.3, 1]
                      }}
                      className="group relative"
                    >
                      {/* Clean content container */}
                      <div className="relative p-4 text-center">
                        {/* Professional corner accent */}
                        <motion.div 
                          className="absolute top-2 right-2 w-8 h-[2px] bg-gradient-to-r from-freela/40 to-transparent rounded-full"
                          initial={{ scaleX: 0, opacity: 0 }}
                          animate={{ scaleX: 1, opacity: 1 }}
                          transition={{
                            duration: 0.8,
                            delay: 0.2 + index * 0.1,
                            ease: [0.22, 1, 0.36, 1]
                          }}
                        />
                        
                        {/* Vertical accent line */}
                        <motion.div 
                          className="absolute top-2 right-2 w-[2px] h-8 bg-gradient-to-b from-freela/40 to-transparent rounded-full"
                          initial={{ scaleY: 0, opacity: 0 }}
                          animate={{ scaleY: 1, opacity: 1 }}
                          transition={{
                            duration: 0.8,
                            delay: 0.4 + index * 0.1,
                            ease: [0.22, 1, 0.36, 1]
                          }}
                        />
                        
                        {/* Premium number display */}
                        <div className="relative">
                          <motion.div 
                            className="text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-br from-freela via-freela-600 to-freela-700 bg-clip-text text-transparent mb-3 tabular-nums leading-none"
                            initial={{ opacity: 0, scale: 0.3, rotateY: -45, filter: "blur(8px)" }}
                            animate={{ opacity: 1, scale: 1, rotateY: 0, filter: "blur(0px)" }}
                            transition={{ 
                              duration: 1.2,
                              delay: 0.3 + index * 0.15,
                              ease: [0.34, 1.56, 0.64, 1]
                            }}
                            whileHover={{
                              scale: 1.05,
                              filter: "brightness(1.2)",
                              transition: { duration: 0.3 }
                            }}
                          >
                            {metric.displayValue(count)}
                          </motion.div>
                          
                          {/* Elegant animated divider */}
                          <motion.div
                            className="w-12 h-[2px] bg-gradient-to-r from-transparent via-freela/60 to-transparent mx-auto my-3 rounded-full"
                            initial={{ scaleX: 0, opacity: 0 }}
                            animate={{ scaleX: 1, opacity: 1 }}
                            transition={{
                              duration: 0.8,
                              delay: 0.5 + index * 0.15,
                              ease: [0.22, 1, 0.36, 1]
                            }}
                          />
                          
                          <motion.p 
                            className="text-sm md:text-base text-gray-700 font-semibold tracking-wide uppercase"
                            initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            transition={{ 
                              duration: 0.6,
                              delay: 0.7 + index * 0.15
                            }}
                          >
                            {metric.label}
                          </motion.p>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Right Column - Hero Content */}
            <div className="order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="text-center lg:text-left"
              >
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-empresa-900 mb-6">
                  Uma comunidade que não para de crescer!
                </h2>
                
                {/* Mini subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-lg md:text-xl text-gray-600 font-medium leading-relaxed"
                >
                  Conectamos talentos e empresas em um ecossistema próspero de oportunidades
                </motion.p>
              </motion.div>
            </div>

          </div>
        </div>

      </div>

      {/* Premium Logo Carousel - Full Width Cutting */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative pb-6 md:pb-8"
      >
        {/* Elegant edge gradients */}
        <div className="absolute left-0 top-0 w-32 md:w-48 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 w-32 md:w-48 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
        
        {/* Premium carousel container */}
        <div className="overflow-hidden">
          <div 
            ref={containerRef}
            className="logo-track-premium"
          >
            {allLogos.map((logo, index) => (
              <motion.div
                key={index}
                className="logo-item-premium"
                whileHover={{ scale: 1.1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 400, 
                  damping: 17 
                }}
              >
                <img
                  src={logo}
                  alt="Partner logo"
                  className="h-16 md:h-20 lg:h-24 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300 filter grayscale hover:grayscale-0"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default CommunitySection