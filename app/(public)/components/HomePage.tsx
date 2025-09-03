'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { motion, useScroll, useTransform, useInView, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import Image from 'next/image'
import HeroInstawork from '@/components/sections/HeroInstawork'
import LogoCarousel from '@/components/sections/LogoCarousel'
import PremiumHeader from '@/components/layout/PremiumHeader'

export default function HomePage() {
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
          // Easing function (ease-out-cubic)
          const progress = step / steps
          const easedProgress = 1 - Math.pow(1 - progress, 3)
          current = Math.floor(target * easedProgress)
          
          if (step >= steps) {
            current = target
            clearInterval(timer)
          }
          setCounts(prev => ({ ...prev, [key]: current }))
        }, duration / steps)
      }

      // Stagger the animations
      setTimeout(() => animateCount(421000, 'vagas', 2500), 100)
      setTimeout(() => animateCount(701, 'estabelecimentos', 2000), 300)
      setTimeout(() => animateCount(850, 'eventos', 1800), 500)
      setTimeout(() => animateCount(143000, 'profissionais', 2200), 700)
    }
  }, [isNumbersInView, hasCounterStarted])

  // Auto-rotate testimonials with pause/resume functionality
  useEffect(() => {
    if (!isCarouselPaused) {
      const interval = setInterval(() => {
        setActiveTestimonial((prev) => (prev + 1) % 3)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [isCarouselPaused])

  // Handle newsletter form submission
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(emailInput)) {
      setEmailStatus('error')
      setTimeout(() => setEmailStatus('idle'), 3000)
      return
    }
    
    setEmailStatus('loading')
    
    // Simulate API call - replace with actual API integration
    setTimeout(() => {
      setEmailStatus('success')
      setEmailInput('')
      setTimeout(() => setEmailStatus('idle'), 5000)
    }, 1500)
  }

  // Data
  const testimonials = [
    { 
      name: "João Silva", 
      role: "Bartender", 
      text: "Encontrei oportunidades incríveis através da estaff! A plataforma mudou minha carreira.", 
      rating: 5 
    },
    { 
      name: "Maria Santos", 
      role: "Gerente de Hotel", 
      text: "A plataforma facilitou muito nosso processo de contratação. Profissionais qualificados sempre.", 
      rating: 5 
    },
    { 
      name: "Pedro Costa", 
      role: "Chef", 
      text: "Profissionalismo e qualidade em cada interação. Recomendo para todos do setor.", 
      rating: 5 
    }
  ]

  const clientLogos = [
    'Hilton Hotels', 'Marriott', 'Accor', 'Fasano', 
    'Copacabana Palace', 'Four Seasons', 'Hyatt', 'InterContinental'
  ]

  // Loading skeleton component
  const SkeletonLoader = () => (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white animate-pulse">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="h-12 bg-gray-200 rounded-full w-64 mx-auto mb-8" />
        <div className="h-20 bg-gray-200 rounded-lg w-full max-w-4xl mx-auto mb-6" />
        <div className="h-20 bg-gray-200 rounded-lg w-full max-w-3xl mx-auto mb-12" />
        <div className="flex gap-4 justify-center">
          <div className="h-16 bg-gray-200 rounded-2xl w-64" />
          <div className="h-16 bg-gray-200 rounded-2xl w-64" />
        </div>
      </div>
    </div>
  )

  // Show loading state for first render
  if (isLoading) {
    return <SkeletonLoader />
  }

  return (
    <>
      {/* Premium Header */}
      <PremiumHeader />
      
      {/* Skip to main content for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-empresa text-white px-4 py-2 rounded-lg z-50"
      >
        Pular para o conteúdo principal
      </a>

      {/* Structured Data for SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "estaff",
          "url": "https://estaff.com.br",
          "logo": "https://estaff.com.br/logo.png",
          "description": "Plataforma de conexão entre profissionais e empresas do setor de hospitalidade",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "R. Br. de Itapetininga, 275",
            "addressLocality": "São Paulo",
            "addressRegion": "SP",
            "postalCode": "01042-914",
            "addressCountry": "BR"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+55-11-94535-1374",
            "contactType": "customer service",
            "availableLanguage": "Portuguese"
          },
          "sameAs": [
            "https://instagram.com/estaff",
            "https://linkedin.com/company/estaff",
            "https://youtube.com/estaff"
          ]
        })
      }} />

      <main id="main-content" className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white overflow-x-hidden" role="main">
        {/* NEW INSTAWORK-STYLE HERO SECTION */}
        <HeroInstawork />

        {/* LOGO CAROUSEL SECTION */}
        <LogoCarousel />

        {/* HOSPITALIDADE SECTION with premium cards */}
        <section className="py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-institucional-50/30 to-transparent" />
          
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-empresa to-institucional-600 bg-clip-text text-transparent">
                Hospitalidade
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Feito por profissionais e para profissionais de Hospitalidade, visando uma melhor experiência para empresas, profissionais e clientes.
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 px-4 sm:px-0">
              {[
                { 
                  icon: "❤️", 
                  title: "Paixão", 
                  desc: "Conectamos pessoas apaixonadas pelo que fazem com oportunidades que valorizam seu talento.",
                  gradient: "from-freela-50 via-freela-100 to-freela-200",
                  color: "freela",
                  delay: 0
                },
                { 
                  icon: "🤝", 
                  title: "Conexão", 
                  desc: "Facilitamos o encontro entre talentos qualificados e empresas que buscam excelência.",
                  gradient: "from-empresa-50 via-empresa-100 to-empresa-200",
                  color: "empresa",
                  delay: 0.1
                },
                { 
                  icon: "⭐", 
                  title: "Excelência", 
                  desc: "Elevamos o padrão do setor com profissionais comprometidos e processos eficientes.",
                  gradient: "from-institucional-100 via-institucional-200 to-institucional-300",
                  color: "institucional-500",
                  delay: 0.2
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    duration: 0.6, 
                    delay: item.delay,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    y: -15, 
                    transition: { 
                      type: "spring", 
                      stiffness: 300,
                      damping: 20
                    } 
                  }}
                  className="group relative transform-gpu"
                >
                  <motion.div 
                    className={`absolute inset-0 bg-gradient-to-br ${item.gradient} rounded-3xl blur-2xl opacity-40 group-hover:opacity-80 transition-all duration-700`}
                    animate={{ 
                      scale: [1, 1.05, 1],
                      rotate: [0, 1, -1, 0]
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                  <div className="relative bg-white/95 backdrop-blur-xl border border-white/60 rounded-3xl p-10 shadow-2xl hover:shadow-3xl transition-shadow duration-500">
                    <motion.div 
                      className={`w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br ${item.gradient} rounded-3xl flex items-center justify-center mb-6 sm:mb-8 shadow-xl mx-auto sm:mx-0`}
                      whileHover={{ 
                        rotate: [0, -10, 10, -10, 10, 0],
                        scale: 1.1
                      }}
                      transition={{ duration: 0.6 }}
                      role="img"
                      aria-label={item.title}
                    >
                      <motion.span 
                        className="text-4xl sm:text-5xl filter drop-shadow-lg"
                        animate={{ 
                          scale: [1, 1.1, 1],
                        }}
                        transition={{ 
                          duration: 3,
                          repeat: Infinity,
                          repeatDelay: 2
                        }}
                      >{item.icon}</motion.span>
                    </motion.div>
                    <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900 text-center sm:text-left">{item.title}</h3>
                    <p className="text-lg text-gray-600 leading-[1.6] text-center sm:text-left">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* PARA QUEM SECTION with interactive cards */}
        <section className="py-32 bg-gradient-to-br from-gray-50 via-white to-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <motion.h2 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-6xl font-black text-center mb-20 bg-gradient-to-r from-empresa via-freela to-institucional-600 bg-clip-text text-transparent"
            >
              Para quem?
            </motion.h2>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8 lg:gap-10 px-4 sm:px-0">
              {[
                { icon: "🍷", title: "Bares e Restaurantes", color: "from-freela to-freela-600", desc: "Staffs especializados em alta gastronomia", delay: 0 },
                { icon: "🏨", title: "Hotéis", color: "from-empresa to-empresa-600", desc: "Profissionais de hotelaria experientes", delay: 0.05 },
                { icon: "📅", title: "Eventos", color: "from-institucional-400 to-institucional-600", desc: "Equipes para eventos de todos os portes", delay: 0.1 },
                { icon: "🎉", title: "Festas Particulares", color: "from-freela via-purple-500 to-empresa", desc: "Staffs para ocasiões especiais", delay: 0.15 },
                { icon: "👨‍🍳", title: "Profissionais", color: "from-institucional-400 via-freela to-empresa", desc: "Oportunidades para todos os níveis", delay: 0.2 }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    duration: 0.5, 
                    delay: item.delay,
                    type: "spring",
                    stiffness: 150
                  }}
                  whileHover={{ 
                    y: -20, 
                    scale: 1.08,
                    transition: { 
                      type: "spring",
                      stiffness: 400,
                      damping: 15
                    }
                  }}
                  className="group relative transform-gpu col-span-1 md:col-span-1"
                  role="article"
                  tabIndex={0}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-2xl sm:rounded-3xl shadow-lg group-hover:shadow-2xl transition-shadow duration-500" />
                  <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-8 shadow-xl border border-white/60 overflow-hidden min-h-[180px] sm:min-h-[200px] flex flex-col justify-center hover:border-gray-200 transition-colors duration-300">
                    <motion.div 
                      className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br from-transparent via-white/30 to-transparent rounded-full blur-xl"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3]
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <motion.div 
                      className={`w-16 h-16 sm:w-20 lg:w-24 sm:h-20 lg:h-24 mx-auto mb-4 sm:mb-6 bg-gradient-to-br ${item.color} rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-lg transform-gpu`}
                      whileHover={{ 
                        rotate: [0, -15, 15, -15, 15, 0],
                        scale: 1.15
                      }}
                      transition={{ duration: 0.6 }}
                      role="img"
                      aria-label={item.title}
                    >
                      <span className="text-2xl sm:text-3xl lg:text-4xl filter drop-shadow-lg">{item.icon}</span>
                    </motion.div>
                    <h3 className="font-bold text-gray-900 text-center mb-3 sm:mb-4 text-base sm:text-lg px-2">{item.title}</h3>
                    <motion.p 
                      initial={{ opacity: 0, height: 0 }}
                      whileHover={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3 }}
                      className="text-xs sm:text-sm text-gray-600 text-center leading-tight px-2 overflow-hidden"
                    >
                      {item.desc}
                    </motion.p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* NOSSOS NÚMEROS SECTION with animated counters */}
        <section ref={numbersRef} className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-empresa via-empresa-700 to-empresa-900" />
          <div className="absolute inset-0 opacity-5 bg-gray-100"></div>
          
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl font-black text-center mb-20 text-white"
            >
              Nossos números
            </motion.h2>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8 md:gap-10 lg:gap-16 px-4 sm:px-0" role="region" aria-label="Estatísticas da plataforma">
              {[
                { value: counts.vagas, label: "Vagas preenchidas", suffix: "mil", prefix: "+", delay: 0 },
                { value: counts.estabelecimentos, label: "Estabelecimentos", prefix: "+", delay: 0.1 },
                { value: counts.eventos, label: "Eventos", prefix: "+", delay: 0.2 },
                { value: counts.profissionais, label: "Profissionais", suffix: "mil", prefix: "+", delay: 0.3 },
                { value: 4.7, label: "Score Médio", suffix: "⭐", isStatic: true, delay: 0.4 }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5, y: 30 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    duration: 0.6, 
                    delay: item.delay,
                    type: "spring",
                    stiffness: 120
                  }}
                  className="text-center col-span-1 md:col-span-1 transform-gpu"
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                >
                  <motion.div 
                    className="bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-8 border border-white/30 hover:border-white/50 min-h-[140px] sm:min-h-[160px] flex flex-col justify-center text-center transition-all duration-300 hover:bg-white/15"
                    whileHover={{ 
                      boxShadow: "0 20px 40px rgba(255, 255, 255, 0.1)"
                    }}
                  >
                    <motion.p 
                      className="text-3xl sm:text-4xl md:text-5xl font-black mb-2 text-transparent bg-gradient-to-br from-white to-gray-100 bg-clip-text"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ 
                        opacity: isNumbersInView ? 1 : 0,
                        scale: isNumbersInView ? 1 : 0.5
                      }}
                      transition={{ 
                        duration: 0.5, 
                        delay: index * 0.2,
                        type: "spring",
                        stiffness: 200
                      }}
                    >
                      <motion.span
                        animate={item.isStatic ? {} : { 
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          duration: 1,
                          delay: 1.5 + index * 0.2
                        }}
                      >
                        {item.prefix}{item.isStatic ? item.value : item.value > 1000 ? `${Math.floor(item.value / 1000)}` : item.value}{item.suffix}
                      </motion.span>
                    </motion.p>
                    <p className="text-sm md:text-base text-white/90 font-medium leading-tight">{item.label}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* TECNOLOGIA SECTION with glassmorphism cards */}
        <section className="py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white" />
          
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-empresa via-freela to-institucional-600 bg-clip-text text-transparent">
                Usamos a tecnologia a seu favor
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
                Ferramentas inteligentes que facilitam sua vida e otimizam resultados
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 px-4 sm:px-0">
              {[
                { icon: "🎯", title: "Match Ideal", desc: "Dados auxiliam a dar o match ideal entre profissionais e clientes", gradient: "from-freela to-freela-600", delay: 0 },
                { icon: "🔒", title: "Segurança", desc: "Check-in e check-out para evitar fraudes", gradient: "from-empresa to-empresa-600", delay: 0.1 },
                { icon: "📋", title: "Escala", desc: "Ferramenta de auxílio na montagem de brigada", gradient: "from-institucional-400 to-institucional-600", delay: 0.2 },
                { icon: "📊", title: "Relatórios", desc: "Relatórios em tempo real de toda a operação de staff", gradient: "from-freela via-purple-500 to-empresa", delay: 0.3 },
                { icon: "🎧", title: "Atendimento", desc: "Atendimento dedicado", gradient: "from-empresa via-blue-500 to-institucional-500", delay: 0.4 },
                { icon: "⭐", title: "Favoritos", desc: "Favoritar os staffs que se destacam", gradient: "from-institucional-400 via-yellow-500 to-freela", delay: 0.5 }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40, rotateX: -10 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    duration: 0.6, 
                    delay: item.delay,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    y: -15, 
                    scale: 1.03,
                    rotateY: 5,
                    transition: { 
                      type: "spring",
                      stiffness: 300
                    }
                  }}
                  className="group relative transform-gpu"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-700"
                    animate={{ 
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-10 shadow-xl border border-white/60 hover:border-gray-200 transition-all duration-300 hover:shadow-2xl">
                    <motion.div 
                      className={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br ${item.gradient} rounded-2xl sm:rounded-3xl flex items-center justify-center mb-6 sm:mb-8 shadow-xl`}
                      whileHover={{ 
                        rotate: 360,
                        scale: 1.1
                      }}
                      transition={{ duration: 0.8, type: "spring" }}
                      role="img"
                      aria-label={item.title}
                    >
                      <motion.span 
                        className="text-3xl sm:text-4xl filter drop-shadow-lg"
                        animate={{ 
                          scale: [1, 1.2, 1]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 3
                        }}
                      >{item.icon}</motion.span>
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-6 text-gray-900">{item.title}</h3>
                    <p className="text-lg text-gray-600 leading-[1.6]">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CLIENTES SECTION with premium carousel */}
        <section className="py-32 bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl font-black text-center mb-20 bg-gradient-to-r from-empresa to-institucional-600 bg-clip-text text-transparent"
            >
              Clientes que confiam na estaff
            </motion.h2>
            
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
              
              <motion.div 
                ref={carouselRef}
                className="flex gap-4 sm:gap-6 lg:gap-8"
                animate={{ x: isCarouselPaused ? 0 : [0, -1920] }}
                transition={{ 
                  duration: isCarouselPaused ? 0 : 30, 
                  repeat: Infinity, 
                  ease: "linear",
                  repeatType: "loop"
                }}
                onMouseEnter={() => setIsCarouselPaused(true)}
                onMouseLeave={() => setIsCarouselPaused(false)}
                onTouchStart={() => setIsCarouselPaused(true)}
                onTouchEnd={() => setIsCarouselPaused(false)}
                role="region"
                aria-label="Clientes parceiros"
                tabIndex={0}
              >
                {[...clientLogos, ...clientLogos].map((logo, i) => (
                  <motion.div 
                    key={i} 
                    className="flex-shrink-0"
                    whileHover={{ scale: 1.08, rotate: 2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-48 sm:w-52 lg:w-56 h-28 sm:h-32 bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl border border-gray-200 hover:border-gray-300 flex items-center justify-center transition-all duration-300 cursor-pointer">
                      <span className="text-gray-600 font-bold text-sm sm:text-base lg:text-lg px-4 text-center">{logo}</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Testimonials */}
            <div className="mt-20 max-w-4xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, x: 50, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -50, scale: 0.95 }}
                  transition={{ 
                    duration: 0.5,
                    type: "spring",
                    stiffness: 100
                  }}
                  className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 sm:p-10 shadow-2xl border border-white/60 hover:border-gray-200 transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    <motion.div 
                      className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-freela via-purple-500 to-empresa rounded-full flex items-center justify-center text-white font-bold text-2xl sm:text-3xl shadow-xl mx-auto sm:mx-0"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.8 }}
                    >
                      {testimonials[activeTestimonial].name[0]}
                    </motion.div>
                    <div className="flex-1 text-center sm:text-left">
                      <div className="flex gap-1 mb-3 sm:mb-4 justify-center sm:justify-start">
                        {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                          <motion.span 
                            key={i} 
                            className="text-yellow-500 text-lg sm:text-xl"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                          >⭐</motion.span>
                        ))}
                      </div>
                      <p className="text-base sm:text-lg lg:text-xl text-gray-700 mb-4 sm:mb-6 italic leading-relaxed">"{testimonials[activeTestimonial].text}"</p>
                      <div>
                        <p className="font-bold text-gray-900 text-sm sm:text-base">{testimonials[activeTestimonial].name}</p>
                        <p className="text-gray-600 text-sm">{testimonials[activeTestimonial].role}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              
              <div className="flex justify-center gap-3 mt-8">
                {testimonials.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    aria-label={`Depoimento ${index + 1}`}
                    className={`h-3 rounded-full transition-all duration-500 ${
                      index === activeTestimonial 
                        ? 'w-12 bg-gradient-to-r from-freela via-purple-500 to-empresa shadow-lg' 
                        : 'w-3 bg-gray-300 hover:bg-gray-400'
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CALL TO ACTION SECTION with premium design */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-institucional-100 via-institucional-200 to-institucional-300" />
          <div className="absolute inset-0 opacity-10 bg-white"></div>
          
          <motion.div 
            style={{ y: floatY }}
            className="max-w-5xl mx-auto px-4 text-center relative z-10"
          >
            <motion.h2 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.8,
                type: "spring",
                stiffness: 100
              }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-8 sm:mb-10 leading-tight px-4 sm:px-0"
            >
              <motion.span
                className="block"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                Vamos juntos tornar o
              </motion.span>
              <motion.span
                className="block bg-gradient-to-r from-empresa via-freela to-institucional-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                Setor de Hospitalidade
              </motion.span>
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                um ambiente melhor para todos!
              </motion.span>
            </motion.h2>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-6 justify-center px-4 sm:px-0"
            >
              <motion.a 
                href="#contato" 
                className="group relative px-10 py-5 bg-gradient-to-r from-gray-900 to-black text-white rounded-2xl font-bold text-lg shadow-2xl overflow-hidden transform-gpu min-h-[64px] flex items-center justify-center"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)"
                }}
                whileTap={{ scale: 0.98 }}
                role="button"
                tabIndex={0}
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <motion.span 
                    className="text-2xl"
                    animate={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  >💬</motion.span>
                  Entre em Contato
                </span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-gray-700 via-gray-800 to-black"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
              
              <motion.a 
                href="/app" 
                className="group relative px-10 py-5 bg-white/90 backdrop-blur-xl text-gray-900 rounded-2xl font-bold text-lg shadow-2xl overflow-hidden border-2 border-gray-900 hover:border-gray-700 transition-colors duration-300 transform-gpu min-h-[64px] flex items-center justify-center"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)"
                }}
                whileTap={{ scale: 0.98 }}
                role="button"
                tabIndex={0}
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <motion.span 
                    className="text-2xl"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  >📱</motion.span>
                  Baixe o App
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-100/20 to-gray-200/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.a>
            </motion.div>
          </motion.div>
        </section>

        {/* CONTATO SECTION with premium design */}
        <section id="contato" className="py-32 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl font-black text-center mb-20 bg-gradient-to-r from-empresa to-institucional-600 bg-clip-text text-transparent"
            >
              Entre em contato
            </motion.h2>
            
            <div className="grid lg:grid-cols-2 gap-12">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                {/* Contact card with glassmorphism */}
                <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-10 shadow-2xl border border-white/50">
                  <h3 className="text-2xl font-bold mb-6 text-gray-900">Informações de Contato</h3>
                  <div className="space-y-4">
                    <motion.a 
                      href="https://wa.me/5511945351374?text=Olá! Gostaria de saber mais sobre a estaff" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gradient-to-r hover:from-green-50 hover:to-green-100/50 transition-all duration-300 group"
                      whileHover={{ x: 8, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      aria-label="Contato via WhatsApp"
                    >
                      <motion.div 
                        className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-3xl flex items-center justify-center text-white text-3xl shadow-xl group-hover:shadow-green-500/30 group-hover:shadow-2xl transition-shadow duration-300"
                        whileHover={{ rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        📱
                      </motion.div>
                      <div>
                        <p className="font-bold text-gray-900 text-base">WhatsApp</p>
                        <p className="text-green-600 font-medium text-base">(11) 94535-1374</p>
                      </div>
                    </motion.a>
                    
                    <motion.a 
                      href="mailto:ola@estaff.com.br?subject=Contato via site" 
                      className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gradient-to-r hover:from-empresa-50 hover:to-empresa-100/50 transition-all duration-300 group"
                      whileHover={{ x: 8, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      aria-label="Contato via email"
                    >
                      <motion.div 
                        className="w-16 h-16 bg-gradient-to-br from-empresa to-empresa-600 rounded-3xl flex items-center justify-center text-white text-3xl shadow-xl group-hover:shadow-empresa/30 group-hover:shadow-2xl transition-shadow duration-300"
                        whileHover={{ rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        ✉️
                      </motion.div>
                      <div>
                        <p className="font-bold text-gray-900 text-base">Email</p>
                        <p className="text-empresa font-medium text-base">ola@estaff.com.br</p>
                      </div>
                    </motion.a>
                    
                    <motion.div 
                      className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gradient-to-r hover:from-institucional-100 hover:to-institucional-200/50 transition-all duration-300 group cursor-default"
                      whileHover={{ scale: 1.02 }}
                    >
                      <motion.div 
                        className="w-16 h-16 bg-gradient-to-br from-institucional-400 to-institucional-600 rounded-3xl flex items-center justify-center text-white text-3xl shadow-xl flex-shrink-0 group-hover:shadow-institucional-500/30 group-hover:shadow-2xl transition-shadow duration-300"
                        animate={{ 
                          y: [0, -5, 0]
                        }}
                        transition={{ 
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        📍
                      </motion.div>
                      <div>
                        <p className="font-bold text-gray-900 mb-2 text-base">Endereço</p>
                        <p className="text-gray-600 text-base leading-relaxed">
                          R. Br. de Itapetininga, 275<br />
                          Centro Histórico de São Paulo - SP<br />
                          01042-914
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </div>
                
                {/* Social media with hover effects */}
                <div>
                  <h3 className="text-2xl font-bold mb-6 text-gray-900">Redes Sociais</h3>
                  <div className="flex gap-6">
                    {[
                      { icon: "📷", gradient: "from-purple-500 to-pink-500", name: "Instagram", url: "https://instagram.com/estaff" },
                      { icon: "💼", gradient: "from-blue-600 to-blue-700", name: "LinkedIn", url: "https://linkedin.com/company/estaff" },
                      { icon: "▶️", gradient: "from-red-500 to-red-600", name: "YouTube", url: "https://youtube.com/@estaff" },
                      { icon: "🎵", gradient: "from-gray-800 to-black", name: "TikTok", url: "https://tiktok.com/@estaff" }
                    ].map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Siga-nos no ${social.name}`}
                        className={`group relative w-16 h-16 bg-gradient-to-br ${social.gradient} rounded-3xl flex items-center justify-center text-white text-2xl shadow-xl overflow-hidden`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="relative z-10">{social.icon}</span>
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                      </motion.a>
                    ))}
                  </div>
                </div>
                
                {/* CTA cards */}
                <div className="grid gap-4">
                  <motion.div 
                    className="bg-gradient-to-br from-empresa-50 to-empresa-100 rounded-3xl p-6 border border-empresa-200"
                    whileHover={{ scale: 1.02 }}
                  >
                    <p className="font-bold mb-3 text-gray-900">Quer contratar mão-de-obra?</p>
                    <a href="/para-empresas" className="inline-block px-6 py-3 bg-gradient-to-r from-empresa to-empresa-600 text-white rounded-xl font-bold hover:shadow-lg transition-all duration-300">
                      Clique aqui!
                    </a>
                  </motion.div>
                  
                  <div>
                    <p className="font-bold mb-4 text-gray-900">Baixe o aplicativo para profissionais grátis</p>
                    <div className="flex gap-6">
                      <motion.a 
                        href="https://apps.apple.com/br/app/estaff" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-black text-white px-6 py-4 rounded-2xl flex items-center justify-center gap-3 font-bold hover:bg-gray-800 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="text-2xl">🍎</span>
                        App Store
                      </motion.a>
                      <motion.a 
                        href="https://play.google.com/store/apps/details?id=com.estaff" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-black text-white px-6 py-4 rounded-2xl flex items-center justify-center gap-3 font-bold hover:bg-gray-800 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="text-2xl">🤖</span>
                        Google Play
                      </motion.a>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Map with premium styling */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="h-[640px] rounded-3xl overflow-hidden shadow-2xl border-8 border-white"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.5489!2d-46.6389!3d-23.5489!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59b8d1d3b3b7%3A0x1234567890abcdef!2sR.%20Bar%C3%A3o%20de%20Itapetininga%2C%20275%20-%20Centro%20Hist%C3%B3rico%20de%20S%C3%A3o%20Paulo%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2001042-001!5e0!3m2!1spt-BR!2sbr!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização estaff"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* PREMIUM FOOTER */}
        <footer className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white py-20 overflow-hidden" role="contentinfo">
          <div className="absolute inset-0 opacity-5 bg-white"></div>
          
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="grid md:grid-cols-3 gap-16 mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-5xl font-black mb-4 bg-gradient-to-r from-freela via-institucional-400 to-empresa bg-clip-text text-transparent">
                  estaff
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Conectando talentos e oportunidades no setor de hospitalidade com excelência e inovação.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h4 className="font-bold text-xl mb-6">Links Rápidos</h4>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { href: "/", label: "Home" },
                    { href: "/para-profissionais", label: "Para Profissionais" },
                    { href: "/para-empresas", label: "Para Empresas" },
                    { href: "/sobre", label: "Sobre Nós" }
                  ].map((link, index) => (
                    <motion.a
                      key={index}
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      {link.label}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h4 className="font-bold text-xl mb-6">Newsletter</h4>
                <p className="text-gray-400 mb-4">Receba novidades e oportunidades em primeira mão</p>
                <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="Seu melhor email"
                    className="w-full px-4 py-3 bg-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-institucional-400"
                    aria-label="Email para newsletter"
                    required
                  />
                  <button
                    type="submit"
                    disabled={emailStatus === 'loading'}
                    className="w-full px-6 py-3 bg-gradient-to-r from-institucional-400 to-institucional-600 text-white rounded-xl font-bold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                  >
                    {emailStatus === 'loading' ? 'Enviando...' : 
                     emailStatus === 'success' ? '✓ Inscrito!' : 
                     emailStatus === 'error' ? 'Email inválido' : 
                     'Inscrever-se'}
                  </button>
                </form>
              </motion.div>
            </div>
            
            <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400">© 2024, ESTAFF LTDA. Todos os direitos reservados.</p>
              <p className="text-gray-400 mt-4 md:mt-0">Made with ❤️ in São Paulo</p>
            </div>
          </div>
        </footer>
      </main>

      {/* Enhanced CSS with performance optimizations */}
      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes gradient-reverse {
          0% { background-position: 100% 50%; }
          50% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        
        .animate-gradient {
          animation: gradient 8s ease infinite;
          background-size: 300% 300%;
          will-change: background-position;
        }
        
        .animate-gradient-reverse {
          animation: gradient-reverse 8s ease infinite;
          background-size: 300% 300%;
          will-change: background-position;
        }
        
        .bg-300\% {
          background-size: 300% 300%;
        }
        
        .transform-gpu {
          transform: translateZ(0);
          backface-visibility: hidden;
        }
        
        /* Reduce motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
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