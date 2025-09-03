'use client'

import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import './LogoCarousel.css'

const LogoCarousel = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [showDebug] = useState(false)

  // Logo data - using only files that exist
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

  // Duplicate for seamless loop
  const allLogos = [...logos, ...logos]

  return (
    <section className="w-full pt-4 pb-4 md:pt-6 md:pb-6 lg:pt-8 lg:pb-8 bg-gray-50 overflow-hidden" style={showDebug ? { outline: '2px solid orange', position: 'relative' } : {}}>
      {/* Debug Info */}
      {showDebug && (
        <div className="absolute top-2 left-2 z-50 bg-black/80 text-white p-2 rounded text-xs font-mono">
          <div>Section: LogoCarousel</div>
          <div>w-full pt-4 pb-4 md:pt-6 md:pb-6 lg:pt-8 lg:pb-8</div>
          <div>bg-gray-50</div>
        </div>
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-2 md:mb-3 lg:mb-4" style={showDebug ? { outline: '2px solid purple' } : {}}>
        {/* Container Debug */}
        {showDebug && (
          <div className="absolute top-2 right-2 z-50 bg-purple-600/80 text-white p-2 rounded text-xs font-mono">
            <div>Container: max-w-7xl</div>
            <div>mb-2 md:mb-3 lg:mb-4</div>
          </div>
        )}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Empresas que confiam em nós
          </h2>
          <p className="text-base text-gray-600">
            Conectando talentos às melhores empresas do mercado
          </p>
        </motion.div>
      </div>

      <div className="relative" style={showDebug ? { outline: '2px solid pink' } : {}}>
        {/* Carousel Debug */}
        {showDebug && (
          <div className="absolute bottom-2 left-2 z-50 bg-pink-600/80 text-white p-2 rounded text-xs font-mono">
            <div>Carousel Container</div>
            <div>relative positioning</div>
          </div>
        )}
        {/* Left gradient */}
        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
        {/* Right gradient */}
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-gray-50 to-transparent z-10"></div>
        
        {/* Logos container */}
        <div 
          ref={containerRef}
          className="logo-track"
        >
          {allLogos.map((logo, index) => (
            <div
              key={index}
              className="logo-item"
            >
              <img
                src={logo}
                alt="Partner logo"
                className="h-14 md:h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default LogoCarousel