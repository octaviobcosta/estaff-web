'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

const LogoCarousel = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Logo data with proper file names from the directory
  const logos = [
    { name: 'Arcos', src: '/logocarrossel/arcos.png', alt: 'Arcos logo' },
    { name: 'Blue Note', src: '/logocarrossel/bluenote.png', alt: 'Blue Note logo' },
    { name: 'Brahma', src: '/logocarrossel/brahma.png', alt: 'Brahma logo' },
    { name: 'Quintal', src: '/logocarrossel/quintal.png', alt: 'Quintal logo' },
    { name: 'Riviera', src: '/logocarrossel/riviera.png', alt: 'Riviera logo' },
    { name: 'Logo 1', src: '/logocarrossel/1.png', alt: 'Partner logo' },
    { name: 'Logo 2', src: '/logocarrossel/2.png', alt: 'Partner logo' },
    { name: 'Logo 4', src: '/logocarrossel/4.png', alt: 'Partner logo' },
    { name: 'Logo 5', src: '/logocarrossel/5.png', alt: 'Partner logo' },
    { name: 'Logo 6', src: '/logocarrossel/6.png', alt: 'Partner logo' },
    { name: 'Logo 8', src: '/logocarrossel/8.png', alt: 'Partner logo' },
    { name: 'Logo 10', src: '/logocarrossel/10.png', alt: 'Partner logo' },
    { name: 'Logo 11', src: '/logocarrossel/11.png', alt: 'Partner logo' },
    { name: 'Logo 12', src: '/logocarrossel/12.png', alt: 'Partner logo' },
    { name: 'Logo 13', src: '/logocarrossel/13.png', alt: 'Partner logo' },
    { name: 'Logo 14', src: '/logocarrossel/14.png', alt: 'Partner logo' },
    { name: 'Logo 15', src: '/logocarrossel/15.png', alt: 'Partner logo' },
    { name: 'Logo 17', src: '/logocarrossel/17.png', alt: 'Partner logo' },
    { name: 'Logo 18', src: '/logocarrossel/18.png', alt: 'Partner logo' },
    { name: 'Logo 19', src: '/logocarrossel/19.png', alt: 'Partner logo' },
    { name: 'Logo 20', src: '/logocarrossel/20.png', alt: 'Partner logo' },
    { name: 'Logo 21', src: '/logocarrossel/21.png', alt: 'Partner logo' },
    { name: 'Logo 22', src: '/logocarrossel/22.png', alt: 'Partner logo' },
    { name: 'Logo 23', src: '/logocarrossel/23.png', alt: 'Partner logo' },
    { name: 'Logo 25', src: '/logocarrossel/25.png', alt: 'Partner logo' },
    { name: 'Logo 26', src: '/logocarrossel/26.png', alt: 'Partner logo' },
    { name: 'Logo 27', src: '/logocarrossel/27.png', alt: 'Partner logo' },
    { name: 'Logo 28', src: '/logocarrossel/28.png', alt: 'Partner logo' },
    { name: 'Logo 29', src: '/logocarrossel/29.png', alt: 'Partner logo' },
  ]

  // Duplicate logos for seamless scrolling
  const duplicatedLogos = [...logos, ...logos]

  if (!isClient) {
    return null
  }

  return (
    <section 
      ref={ref} 
      className="relative py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden"
      aria-label="Nossos parceiros"
      style={{ minHeight: '400px' }}
    >
      {/* Subtle background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-institucional-100/20 rounded-full blur-3xl transform -translate-y-1/2" />
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-freela-100/20 rounded-full blur-3xl transform -translate-y-1/2" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Header with fade-in animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-12 md:mb-16 lg:mb-20"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-3"
          >
            Confiado pelas maiores marcas
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Empresas líderes escolhem nossa plataforma para conectar-se com os melhores profissionais
          </motion.p>
        </motion.div>

        {/* Logo Carousel */}
        <div className="relative">
          {/* Gradient fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-12 md:w-20 lg:w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 md:w-20 lg:w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />
          
          {/* Scrolling container */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex gap-8 md:gap-12 lg:gap-16"
            style={{
              animation: 'scroll 40s linear infinite',
            }}
          >
            {duplicatedLogos.map((logo, index) => (
              <motion.div
                key={`${logo.name}-${index}`}
                className="flex-shrink-0 group"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.5 + (index % logos.length) * 0.05,
                  ease: 'easeOut'
                }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.3, ease: 'easeOut' }
                }}
              >
                <div className="relative w-32 h-16 md:w-40 md:h-20 lg:w-48 lg:h-24 bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl shadow-sm border border-gray-100/50 flex items-center justify-center p-3 md:p-4 transition-all duration-300 group-hover:shadow-lg group-hover:border-gray-200/70">
                  {/* Logo container with proper aspect ratio */}
                  <div className="relative w-full h-full flex items-center justify-center">
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className="max-w-full max-h-full w-auto h-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-500 opacity-60 group-hover:opacity-100"
                      loading="lazy"
                    />
                  </div>
                  
                  {/* Subtle hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-freela/5 via-institucional-200/5 to-empresa/5 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom fade decoration */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 1.2, delay: 1 }}
          className="mt-12 md:mt-16 lg:mt-20 flex justify-center"
        >
          <div className="h-px w-24 md:w-32 lg:w-48 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
        </motion.div>
      </div>

      {/* CSS for continuous scrolling animation */}
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        /* Pause animation on hover */
        .group:hover {
          animation-play-state: paused;
        }
        
        /* Respect reduced motion preference */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
          }
        }
      `}</style>
    </section>
  )
}

export default LogoCarousel