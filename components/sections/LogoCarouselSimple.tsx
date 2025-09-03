'use client'

import { useEffect, useState } from 'react'

const LogoCarouselSimple = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    console.log('🎯 LogoCarouselSimple: Component mounted')
  }, [])

  const logos = [
    { name: 'Arcos', src: '/logocarrossel/arcos.png', alt: 'Arcos logo' },
    { name: 'Blue Note', src: '/logocarrossel/bluenote.png', alt: 'Blue Note logo' },
    { name: 'Brahma', src: '/logocarrossel/brahma.png', alt: 'Brahma logo' },
    { name: 'Quintal', src: '/logocarrossel/quintal.png', alt: 'Quintal logo' },
    { name: 'Riviera', src: '/logocarrossel/riviera.png', alt: 'Riviera logo' },
  ]

  if (!mounted) {
    return (
      <div className="py-16 bg-gray-100 text-center">
        <div className="text-gray-500">Loading simple carousel...</div>
      </div>
    )
  }

  return (
    <section className="py-16 bg-gray-100">
      {/* Debug Info */}
      <div className="fixed top-20 left-2 z-[100] bg-black text-white p-2 rounded text-xs">
        <div>✅ Simple Carousel Mounted</div>
        <div>Images: {logos.length}</div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          SIMPLE CAROUSEL TEST
        </h2>
        
        {/* Static Test Content */}
        <div className="bg-red-500 text-white p-4 mb-8 text-center">
          If you see this RED BOX, the component is rendering!
        </div>

        {/* Simple Logo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {logos.map((logo, index) => (
            <div 
              key={logo.name} 
              className="bg-white p-4 rounded shadow hover:shadow-lg transition-shadow"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="w-full h-20 object-contain"
                onLoad={() => console.log(`✅ Image loaded: ${logo.name}`)}
                onError={(e) => console.error(`❌ Image failed: ${logo.name}`, e)}
              />
              <p className="text-center text-sm mt-2">{logo.name}</p>
            </div>
          ))}
        </div>

        {/* Animated Scroll Container */}
        <div className="mt-8 overflow-hidden">
          <div 
            className="flex gap-4"
            style={{
              animation: 'scrollTest 20s linear infinite',
              width: 'fit-content'
            }}
          >
            {[...logos, ...logos].map((logo, index) => (
              <div 
                key={`scroll-${index}`}
                className="flex-shrink-0 w-32 h-20 bg-white p-2 rounded shadow"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollTest {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}

export default LogoCarouselSimple