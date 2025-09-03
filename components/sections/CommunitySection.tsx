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

  // Premium metrics with refined styling
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
    },
    {
      value: 4.7,
      label: 'score médio',
      displayValue: (count: number) => count.toFixed(1),
      duration: 2500,
      isDecimal: true,
    }
  ]

  return (
    <section className="w-full bg-white overflow-hidden relative">
      {/* Premium layered background with depth */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/40 via-transparent to-empresa-900/[0.02]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-empresa-900/[0.02] via-transparent to-transparent"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Premium Metrics Display with Enhanced UX */}
        <div className="py-16 md:py-20">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
            {metrics.map((metric, index) => {
              const { count, setIsInView } = useCounter(
                metric.value,
                metric.duration,
                true,
                metric.isDecimal ? 1 : 0
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
                    delay: index * 0.12,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="group relative"
                >
                  <div className="relative">
                    {/* Premium glass card effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/40 rounded-3xl backdrop-blur-xl border border-gray-100/50 shadow-[0_8px_32px_rgba(0,0,0,0.04)] transform transition-all duration-700 group-hover:shadow-[0_12px_48px_rgba(20,36,68,0.08)] group-hover:scale-[1.02] group-hover:border-empresa-900/10"></div>
                    
                    {/* Premium content container */}
                    <div className="relative p-8 text-center">
                      {/* Animated accent circle */}
                      <motion.div 
                        className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gradient-to-br from-empresa-900/5 to-empresa-900/10"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.3, 0.6, 0.3]
                        }}
                        transition={{
                          duration: 3,
                          delay: index * 0.2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      
                      {/* Premium number display with depth */}
                      <div className="relative">
                        <motion.div 
                          className="text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-br from-empresa-900 via-empresa-800 to-empresa-900 bg-clip-text text-transparent mb-3 tabular-nums leading-none"
                          initial={{ opacity: 0, scale: 0.5, rotateX: -30 }}
                          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                          transition={{ 
                            duration: 0.8,
                            delay: 0.3 + index * 0.15,
                            ease: [0.34, 1.56, 0.64, 1]
                          }}
                        >
                          {metric.isDecimal ? count.toFixed(1) : metric.displayValue(count)}
                        </motion.div>
                        
                        {/* Elegant divider line */}
                        <motion.div
                          className="w-12 h-[2px] bg-gradient-to-r from-transparent via-empresa-900/20 to-transparent mx-auto my-4"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{
                            duration: 0.6,
                            delay: 0.5 + index * 0.15,
                            ease: [0.22, 1, 0.36, 1]
                          }}
                        />
                        
                        <motion.p 
                          className="text-sm md:text-base text-gray-700 font-medium tracking-wide uppercase"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ 
                            duration: 0.5,
                            delay: 0.6 + index * 0.15
                          }}
                        >
                          {metric.label}
                        </motion.p>
                      </div>

                      {/* Interactive hover indicator */}
                      <motion.div
                        className="absolute bottom-3 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-empresa-900"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.5, 0] }}
                        transition={{
                          duration: 2,
                          delay: 1 + index * 0.1,
                          repeat: Infinity
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

      </div>

      {/* Premium Logo Carousel - Closer to Numbers */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative mt-8 pb-16"
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