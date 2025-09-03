'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { motion, useScroll, useTransform, useInView, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import Image from 'next/image'
import HeroInstawork from '@/components/sections/HeroInstawork'
import LogoCarousel from '@/components/sections/LogoCarousel'
// import LogoCarouselSimple from '@/components/sections/LogoCarouselSimple'
// import TestCarousel from '@/components/sections/TestCarousel'
import PremiumHeader from '@/components/layout/PremiumHeader'

export default function HomePage() {
  // Debug state
  const [showDebug] = useState(false)
  
  // State management
  const [counts, setCounts] = useState({
    vagas: 0,
    estabelecimentos: 0,
    eventos: 0,
    profissionais: 0
  })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [isCarouselPaused, setIsCarouselPaused] = useState(false)
  const [emailInput, setEmailInput] = useState('')
  const [emailStatus, setEmailStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [hasCounterStarted, setHasCounterStarted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Refs
  const { scrollY, scrollYProgress } = useScroll()
  const heroRef = useRef(null)
  const numbersRef = useRef(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const isNumbersInView = useInView(numbersRef, { once: true, margin: '-100px' })
  
  // Enhanced parallax transforms with spring physics
  const heroY = useSpring(useTransform(scrollY, [0, 500], [0, 150]), { stiffness: 100, damping: 30 })
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.3])
  const floatY = useSpring(useTransform(scrollY, [0, 1000], [0, -50]), { stiffness: 50, damping: 20 })
  const scaleProgress = useTransform(scrollYProgress, [0, 0.5], [1, 1.1])
  
  // Advanced mouse tracking with spring
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 })

  // Enhanced mouse tracking with performance optimization
  useEffect(() => {
    let rafId: number
    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        const { clientX, clientY } = e
        setMousePosition({ x: clientX, y: clientY })
        mouseX.set(clientX - window.innerWidth / 2)
        mouseY.set(clientY - window.innerHeight / 2)
      })
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  // Loading state management
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  // Enhanced counter animation with easing
  useEffect(() => {
    if (isNumbersInView && !hasCounterStarted) {
      setHasCounterStarted(true)
      
      const animateCount = (target: number, key: string, duration: number = 2500) => {
        const steps = 100
        let current = 0
        let step = 0
        
        const timer = setInterval(() => {
          step++
          // Easing function for smooth animation
          const progress = step / steps
          const easeOutQuart = 1 - Math.pow(1 - progress, 4)
          current = Math.floor(target * easeOutQuart)
          
          setCounts(prev => ({ ...prev, [key]: current }))
          
          if (step >= steps) {
            clearInterval(timer)
            setCounts(prev => ({ ...prev, [key]: target }))
          }
        }, duration / steps)
      }
      
      // Staggered animation start for visual appeal
      animateCount(3285, 'vagas', 2500)
      setTimeout(() => animateCount(457, 'estabelecimentos', 2300), 200)
      setTimeout(() => animateCount(892, 'eventos', 2100), 400)
      setTimeout(() => animateCount(143241, 'profissionais', 2800), 600)
    }
  }, [isNumbersInView, hasCounterStarted])

  // Testimonial auto-rotation with pause on hover
  useEffect(() => {
    if (!isCarouselPaused) {
      const interval = setInterval(() => {
        setActiveTestimonial(prev => (prev + 1) % 3)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [isCarouselPaused, activeTestimonial])

  // Parallax scroll effect for cards
  const handleScroll = useCallback(() => {
    if (carouselRef.current) {
      const scrollPosition = window.scrollY
      const cards = carouselRef.current.querySelectorAll('.parallax-card')
      cards.forEach((card, index) => {
        const speed = 0.5 + (index * 0.1)
        const yPos = -(scrollPosition * speed)
        ;(card as HTMLElement).style.transform = `translateY(${yPos}px)`
      })
    }
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  // Email validation and submission handler
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!emailInput || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput)) {
      setEmailStatus('error')
      setTimeout(() => setEmailStatus('idle'), 3000)
      return
    }
    
    setEmailStatus('loading')
    // Simulate API call
    setTimeout(() => {
      setEmailStatus('success')
      setEmailInput('')
      setTimeout(() => setEmailStatus('idle'), 5000)
    }, 1500)
  }

  // Interactive background gradient based on mouse position
  const backgroundGradient = {
    background: `radial-gradient(
      circle at ${mousePosition.x}px ${mousePosition.y}px,
      rgba(236, 68, 100, 0.03) 0%,
      transparent 50%
    )`
  }

  // Loading animation
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <div className="w-20 h-20 border-4 border-freela/20 border-t-freela rounded-full animate-spin" />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-4 text-gray-600 font-medium"
          >
            Carregando experiências incríveis...
          </motion.p>
        </motion.div>
      </div>
    )
  }

  const testimonials = [
    {
      name: "Ana Silva",
      role: "Garçonete Premium",
      company: "Restaurante Fasano",
      image: "https://i.pravatar.cc/150?img=1",
      text: "A estaff transformou minha carreira. Em menos de uma semana, consegui uma vaga em um dos melhores restaurantes de SP.",
      rating: 5,
      badge: "Top Performer"
    },
    {
      name: "Carlos Mendes",
      role: "Chef de Cozinha",
      company: "Hotel Copacabana Palace",
      image: "https://i.pravatar.cc/150?img=3",
      text: "Plataforma excepcional! Conecta os melhores profissionais com as melhores oportunidades do mercado.",
      rating: 5,
      badge: "Verified Pro"
    },
    {
      name: "Beatriz Costa",
      role: "Coordenadora de Eventos",
      company: "Blue Note São Paulo",
      image: "https://i.pravatar.cc/150?img=5",
      text: "Encontrei profissionais qualificados em tempo recorde. A curadoria da estaff é impecável!",
      rating: 5,
      badge: "Elite Recruiter"
    }
  ]

  return (
    <>
      {/* PREMIUM HEADER - Fixed at top */}
      <PremiumHeader />
      
      {/* Skip to main content for accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-20 focus:left-4 bg-empresa text-white px-4 py-2 rounded-lg z-50">
        Pular para o conteúdo principal
      </a>
      
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-freela via-institucional-400 to-empresa z-[60] origin-left"
        style={{ scaleX: scrollYProgress }}
      />
      
      {/* Interactive background effect */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-50"
        style={backgroundGradient}
      />

      <main id="main-content" className="bg-gradient-to-b from-white via-gray-50 to-white relative" role="main" style={showDebug ? { outline: '4px solid cyan' } : {}}>
        {/* Main Debug Info */}
        {showDebug && (
          <div className="fixed top-20 right-4 z-[100] bg-cyan-900/90 text-white p-3 rounded-lg text-xs font-mono space-y-1">
            <div className="font-bold text-sm mb-2">📐 MAIN CONTAINER</div>
            <div>Type: &lt;main&gt;</div>
            <div>Classes: bg-gradient-to-b</div>
            <div>Contains: Hero + Carousel</div>
            <hr className="my-2 border-cyan-600" />
            <div className="text-yellow-300">Color Legend:</div>
            <div>🔴 Red: Hero Section</div>
            <div>🔵 Blue: Hero Container</div>
            <div>🟢 Green: Hero Grid</div>
            <div>🟠 Orange: Carousel Section</div>
            <div>🟣 Purple: Carousel Container</div>
            <div>🩷 Pink: Carousel Track</div>
            <div>🟦 Cyan: Main Container</div>
          </div>
        )}
        {/* NEW INSTAWORK-STYLE HERO SECTION */}
        <HeroInstawork />

        {/* LOGO CAROUSEL SECTION */}
        <LogoCarousel />

      </main>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(236, 68, 100, 0.4); }
          50% { box-shadow: 0 0 20px 10px rgba(236, 68, 100, 0); }
        }
        
        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }
        
        /* Hide scrollbar but keep functionality */
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        /* Glassmorphism effects */
        .glass {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
        
        .glass-dark {
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
        
        /* Gradient text animation */
        .gradient-text-animate {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
        
        /* Card hover effects */
        .card-hover-effect {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .card-hover-effect:hover {
          transform: translateY(-8px) scale(1.02);
        }
        
        /* Shimmer effect for loading states */
        .shimmer {
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.5) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          background-size: 200% 100%;
          animation: shimmer 2s ease-in-out infinite;
        }
        
        /* Premium input focus effect */
        .input-focus-gradient {
          position: relative;
          background: linear-gradient(90deg, #ec4464, #ecd4a4, #142444);
          background-size: 200% 100%;
          animation: gradient 3s ease infinite;
        }
        
        /* Improved performance for animations */
        .gpu-accelerated {
          transform: translateZ(0);
          will-change: transform;
        }
        
        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
        
        /* High contrast mode support */
        @media (prefers-contrast: high) {
          .backdrop-blur-xl, .backdrop-blur-lg, .backdrop-blur-md {
            backdrop-filter: none;
            background-color: rgba(255, 255, 255, 0.95);
          }
        }
      `}</style>
    </>
  )
}