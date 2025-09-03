'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, MapPin, Briefcase, Trophy, Award, Medal, Shield, TrendingUp, Heart, Clock } from 'lucide-react'

// Simplified profile data for cleaner display
const PROFILE_DATA = [
  {
    id: 1,
    name: 'Marina Costa',
    role: 'Garçonete',
    photo: 'https://i.pravatar.cc/150?img=9',
    rating: 4.95,
    jobs: 143,
    venues: 15,
    location: 'São Paulo - SP',
    verified: true,
    description: 'Especialista em atendimento premium com foco em experiência do cliente e vendas consultivas. Reconhecida pela agilidade e carisma no atendimento em eventos de alta demanda.',
    highlightType: 'avaliacao',
    highlightData: {
      rating: 4.95,
      jobs: 143
    }
  },
  {
    id: 2,
    name: 'Rafael Santos',
    role: 'Chef de Cozinha',
    photo: 'https://i.pravatar.cc/150?img=7',
    rating: 4.8,
    jobs: 198,
    venues: 25,
    location: 'São Paulo - SP',
    verified: true,
    description: 'Chef executivo com expertise em culinária contemporânea e gestão de equipes de alta performance. Formado em gastronomia internacional com passagem por renomados restaurantes.',
    highlightType: 'experiencias',
    highlightData: {
      venues: [
        { name: 'Restaurante Villa Toscana', count: 23 },
        { name: 'Bar do Araújo', count: 10 },
        { name: 'Bistrô Francês Le Bon', count: 8 }
      ]
    }
  },
  {
    id: 3,
    name: 'Ana Silva',
    role: 'Sommelière',
    photo: 'https://i.pravatar.cc/150?img=1',
    rating: 4.9,
    jobs: 89,
    venues: 12,
    location: 'São Paulo - SP',
    verified: true,
    description: 'Sommelière certificada com especialização em vinhos orgânicos e harmonização gastronômica. Experiência em eventos exclusivos e consultoria para importadoras de vinhos premium.',
    highlightType: 'depoimento',
    highlightData: {
      quote: 'Profissional excepcional! Conhecimento profundo em vinhos e harmonização, sempre surpreendendo os clientes com suas sugestões precisas e atendimento impecável.',
      author: 'Restaurante Villa Toscana'
    }
  },
  {
    id: 4,
    name: 'Carlos Eduardo',
    role: 'Bartender',
    photo: 'https://i.pravatar.cc/150?img=6',
    rating: 4.8,
    jobs: 267,
    venues: 30,
    location: 'São Paulo - SP',
    verified: true,
    description: 'Mixologista criativo especializado em coquetelaria molecular e drinks autorais premium. Vencedor de competições nacionais e criador de cartas de drinks para bares conceituados.',
    highlightType: 'conquistas',
    highlightData: {
      badges: [
        { icon: 'top_rated', label: 'Bem Avaliado', description: '4.8+ de avaliação' },
        { icon: 'in_demand', label: 'Disputado', description: 'Alto índice de requisições' },
        { icon: 'verified', label: 'Verificado', description: 'Perfil autenticado' },
        { icon: 'premium', label: 'Premium', description: 'Profissional de elite' }
      ]
    }
  },
  {
    id: 5,
    name: 'Amanda Martins',
    role: 'Hostess',
    photo: 'https://i.pravatar.cc/150?img=5',
    rating: 4.85,
    jobs: 112,
    venues: 18,
    location: 'São Paulo - SP',
    verified: true,
    description: 'Hostess trilíngue com experiência em eventos corporativos internacionais e protocolo diplomático. Especialista em recepção VIP e coordenação de equipes em grandes eventos.',
    highlightType: 'bio',
    highlightData: {
      bio: 'Hostess bilíngue com mais de 5 anos de experiência em eventos corporativos e sociais de alto padrão. Especializada em atendimento VIP, coordenação de equipes de recepção e protocolos internacionais. Fluente em inglês, espanhol e francês, com certificação em etiqueta empresarial e experiência em eventos diplomáticos.'
    }
  }
]

interface ProfileCardsProps {
  className?: string
}

export default function ProfileCards({ 
  className = "" 
}: ProfileCardsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showHighlight, setShowHighlight] = useState(false)

  const currentProfile = PROFILE_DATA[currentIndex]

  // Auto-cycle through profiles with optimized timing
  useEffect(() => {
    const CYCLE_DURATION = 5000
    const HIGHLIGHT_DELAY = 1000
    const TRANSITION_DELAY = 800
    
    const interval = setInterval(() => {
      setShowHighlight(false)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % PROFILE_DATA.length)
        setTimeout(() => setShowHighlight(true), TRANSITION_DELAY)
      }, 400)
    }, CYCLE_DURATION)

    // Initialize first highlight
    const firstHighlightTimeout = setTimeout(() => setShowHighlight(true), HIGHLIGHT_DELAY)

    return () => {
      clearInterval(interval)
      clearTimeout(firstHighlightTimeout)
    }
  }, [])

  // Premium emergence animation variants - FROM WITHIN the main card
  const premiumCardVariants = {
    hidden: {
      opacity: 0,
      scale: 0.2, // Start even smaller for more dramatic emergence
      rotateX: 0,
      rotateY: -5, // Slight initial rotation for "pulling" effect
      rotateZ: -2, // Slight twist
      z: -250, // Start deeper within the card
      y: 0, // Same vertical position as main card center
      x: -216, // Start at the center of the main card (432px width / 2)
      filter: 'blur(15px) brightness(1.8)',
      transformOrigin: 'left center', // Pull from left side of main card
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      z: 50, // Emerge forward from the card
      y: 0,
      x: 0, // Final position
      filter: 'blur(0px) brightness(1)',
      transformOrigin: 'center center',
    },
    exit: {
      opacity: 0,
      scale: 0.15,
      rotateX: 3,
      rotateY: 3,
      rotateZ: 1,
      z: -200, // Sink deeper back into the card
      y: 0,
      x: -130, // Exit more towards main card center
      filter: 'blur(12px) brightness(0.6)',
      transformOrigin: 'left center',
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    floating: {
      y: [-2, 2, -2],
      z: [50, 58, 50], // More pronounced depth floating
      rotateX: [-0.5, 0.5, -0.5],
      scale: [1, 1.008, 1], // Slightly more breathing
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  // Check for reduced motion preference - single check
  const prefersReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Premium glassmorphism base classes - optimized constant
  const HIGHLIGHT_BASE_CLASSES = "w-[400px] rounded-xl z-50 pointer-events-auto relative overflow-hidden " +
    "backdrop-blur-xl bg-white/95 border border-white/30 " +
    "shadow-2xl shadow-black/[0.08] will-change-transform " +
    "before:absolute before:inset-0 before:rounded-xl before:p-[1px] " +
    "before:bg-gradient-to-r before:from-white/40 before:via-white/10 before:to-white/40 " +
    "before:-z-10 before:opacity-70 " +
    "after:absolute after:inset-0 after:rounded-xl after:bg-gradient-to-br " +
    "after:from-white/15 after:via-transparent after:to-white/5 after:-z-10 " +
    "transform-gpu isolation-isolate"

  // Badge icon/color logic - consolidated
  const getBadgeIcon = (iconType: string) => {
    switch (iconType) {
      case 'top_rated': return <Star className="w-5 h-5" />
      case 'in_demand': return <TrendingUp className="w-5 h-5" />
      case 'verified': return <Shield className="w-5 h-5" />
      case 'premium': return <Trophy className="w-5 h-5" />
      default: return <Award className="w-5 h-5" />
    }
  }

  const getBadgeIconColor = (iconType: string) => {
    switch (iconType) {
      case 'top_rated': return 'text-[#ecd4a4] fill-[#ecd4a4]'
      case 'in_demand': return 'text-[#ec4464]'
      case 'verified': return 'text-[#22c55e]'
      case 'premium': return 'text-[#142444]'
      default: return 'text-[#6B7280]'
    }
  }

  // Common card props - eliminate duplication
  const getCardProps = (delay: number) => ({
    variants: premiumCardVariants,
    initial: "hidden",
    animate: "visible",
    exit: "exit",
    transition: {
      duration: 0.9,
      ease: [0.25, 0.8, 0.25, 1],
      delay
    },
    style: {
      transformStyle: 'preserve-3d' as const,
      perspective: 1000,
      willChange: 'transform, opacity'
    },
    whileHover: {
      scale: 1.02,
      z: 60,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  })

  // Render premium highlight cards with glassmorphism
  const renderHighlight = () => {
    if (!currentProfile) return null
    const { highlightType, highlightData } = currentProfile
    
    switch (highlightType) {
      case 'avaliacao':
        return (
          <motion.div
            {...getCardProps(0.1)}
            whileHover={{ ...getCardProps(0.1).whileHover, rotateY: 2, rotateX: -2 }}
            className={`${HIGHLIGHT_BASE_CLASSES} group hover:shadow-3xl hover:shadow-[#ec4464]/20`}
          >
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#ec4464]/5 via-transparent to-[#ecd4a4]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-0 left-1/4 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
            
            <motion.div
              variants={prefersReducedMotion ? {} : { floating: premiumCardVariants.floating }}
              animate={prefersReducedMotion ? {} : "floating"}
              className="px-6 py-5"
            >
              <h3 className="text-sm font-semibold text-[#142444] mb-3">Performance</h3>
              <div className="flex items-center justify-center">
                <div className="flex-1 flex flex-col items-center justify-center">
                  <Star className="w-5 h-5 text-[#ecd4a4] fill-[#ecd4a4] mb-2" />
                  <div className="text-xl font-bold text-[#142444]">{highlightData.rating}</div>
                  <div className="text-xs text-[#6B7280] mt-1">Avaliação</div>
                </div>
                <div className="w-px h-12 bg-[#E5E7EB] mx-4"></div>
                <div className="flex-1 flex flex-col items-center justify-center">
                  <Briefcase className="w-5 h-5 text-[#ec4464] mb-2" />
                  <div className="text-xl font-bold text-[#142444]">{highlightData.jobs}</div>
                  <div className="text-xs text-[#6B7280] mt-1">Jobs</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )
      
      case 'experiencias':
        return (
          <motion.div
            {...getCardProps(0.2)}
            whileHover={{ ...getCardProps(0.2).whileHover, rotateY: -2, rotateX: 2 }}
            className={`${HIGHLIGHT_BASE_CLASSES} group hover:shadow-3xl hover:shadow-[#ec4464]/20`}
          >
            <div className="absolute inset-0 rounded-xl bg-gradient-to-l from-[#ec4464]/5 via-transparent to-[#142444]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-0 right-1/4 w-1/2 h-[1px] bg-gradient-to-l from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
            
            <motion.div
              variants={prefersReducedMotion ? {} : { floating: premiumCardVariants.floating }}
              animate={prefersReducedMotion ? {} : "floating"}
              className="px-6 py-5"
            >
              <h3 className="text-sm font-semibold text-[#142444] mb-3">Onde Trabalhou</h3>
              <div className="space-y-3">
                {highlightData.venues?.map((venue: any, i: number) => (
                  <div key={i} className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-[#ec4464] flex-shrink-0" />
                    <div className="flex-1">
                      <span className="font-medium text-[#142444]">{venue.name}</span>
                      <span className="ml-2 text-sm text-[#6B7280]">({venue.count}x)</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )
      
      case 'depoimento':
        return (
          <motion.div
            {...getCardProps(0.15)}
            whileHover={{ ...getCardProps(0.15).whileHover, rotateY: 3, rotateX: -1 }}
            className={`${HIGHLIGHT_BASE_CLASSES} group hover:shadow-3xl hover:shadow-[#ecd4a4]/20`}
          >
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#ecd4a4]/10 via-transparent to-[#ec4464]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#ecd4a4]/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
            
            <motion.div
              variants={prefersReducedMotion ? {} : { floating: premiumCardVariants.floating }}
              animate={prefersReducedMotion ? {} : "floating"}
              className="relative px-6 py-5"
            >
              <h3 className="text-sm font-semibold text-[#142444] mb-3">Último Feedback</h3>
              <div className="relative">
                <span className="absolute top-0 left-0 text-4xl text-[#ecd4a4] opacity-20 font-serif leading-none">"</span>
                <p className="text-xs italic text-[#142444] pl-8 pr-4 leading-relaxed">
                  {highlightData.quote}
                </p>
                <p className="text-xs text-[#ec4464] text-right mt-3">
                  — {highlightData.author}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )
      
      case 'conquistas':
        return (
          <motion.div
            {...getCardProps(0.25)}
            whileHover={{ ...getCardProps(0.25).whileHover, rotateY: -3, rotateX: 2 }}
            className={`${HIGHLIGHT_BASE_CLASSES} group hover:shadow-3xl hover:shadow-[#142444]/20`}
          >
            <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-[#142444]/5 via-transparent to-[#ecd4a4]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute bottom-2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#142444]/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
            
            <motion.div
              variants={prefersReducedMotion ? {} : { floating: premiumCardVariants.floating }}
              animate={prefersReducedMotion ? {} : "floating"}
              className="px-6 py-5"
            >
              <h3 className="text-sm font-semibold text-[#142444] mb-4">Conquistas e Certificações</h3>
              <div className="grid grid-cols-2 gap-3">
                {highlightData.badges?.map((badge: any, i: number) => (
                  <div key={i} className="relative">
                    <div className="flex flex-col items-start p-3 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
                      <div className={`p-2 rounded-full bg-white shadow-sm mb-2 ${getBadgeIconColor(badge.icon)}`}>
                        {getBadgeIcon(badge.icon)}
                      </div>
                      <div className="text-xs font-semibold text-[#142444] mb-0.5">
                        {badge.label}
                      </div>
                      <div className="text-[10px] text-[#6B7280] leading-tight">
                        {badge.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )
      
      case 'bio':
        return (
          <motion.div
            {...getCardProps(0.3)}
            whileHover={{ ...getCardProps(0.3).whileHover, rotateY: 1, rotateX: -3 }}
            className={`${HIGHLIGHT_BASE_CLASSES} group hover:shadow-3xl hover:shadow-[#ecd4a4]/25 overflow-hidden`}
          >
            <div className="absolute inset-0 rounded-xl bg-gradient-to-bl from-[#ecd4a4]/10 via-transparent to-[#ecd4a4]/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-xl">
              <div className="absolute -top-2 -left-2 w-1/3 h-[2px] bg-gradient-to-r from-transparent via-[#ecd4a4]/40 to-transparent transform rotate-12 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
            </div>
            
            <motion.div
              variants={prefersReducedMotion ? {} : { floating: premiumCardVariants.floating }}
              animate={prefersReducedMotion ? {} : "floating"}
              className="px-6 py-5 relative"
            >
              <div className="absolute inset-0 bg-[#ecd4a4] opacity-5 rounded-xl"></div>
              <div className="relative">
                <h3 className="text-sm font-semibold text-[#142444] mb-3">Sobre o Profissional</h3>
                <p className="text-[#142444] text-sm leading-relaxed">
                  {highlightData.bio}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )
      
      default:
        return null
    }
  }

  return (
    <div className={`relative flex items-center justify-start overflow-visible w-full h-full pl-8 pb-16 ${className}`}>
      {/* Main Profile Card - Compact Professional Layout */}
      <motion.div
        key={currentProfile.id}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          filter: showHighlight ? 'grayscale(100%) brightness(0.7)' : 'grayscale(0%) brightness(1)'
        }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-[432px] h-[600px] bg-white rounded-xl shadow-lg p-6 flex flex-col border border-gray-200 transform-gpu"
        style={{
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden'
        }}
      >
        {/* Header Section */}
        <div className="flex items-start gap-4 mb-3">
          {/* Profile Image */}
          <img
            src={currentProfile.photo}
            alt={`${currentProfile.name}`}
            className="w-[88px] h-[88px] rounded-full object-cover border-2 border-[#ecd4a4]/30 flex-shrink-0"
            loading="lazy"
          />
          
          {/* Profile Info */}
          <div className="flex-1 pt-1">
            <h3 className="text-[26px] font-semibold text-[#142444] leading-[1.1] mb-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
              {currentProfile.name}
            </h3>
            <p className="text-[19px] font-medium text-[#6B7280] mb-1 whitespace-nowrap">{currentProfile.role}</p>
            <div className="flex items-center gap-1 text-[15px] text-[#6B7280] whitespace-nowrap">
              <MapPin className="w-4 h-4" />
              <span>{currentProfile.location}</span>
            </div>
          </div>
        </div>

        {/* Stats Section - Elegant Design */}
        <div className="flex items-stretch justify-center gap-2 mb-3 px-2">
          {/* Jobs Stat */}
          <div className="flex-1 relative group">
            <div className="bg-gradient-to-b from-white to-gray-50 rounded-xl border border-gray-100 hover:border-[#ec4464]/30 transition-all duration-300 px-3 py-3.5 shadow-sm hover:shadow-md">
              <div className="flex flex-col items-center">
                <div className="p-2 rounded-full bg-[#ec4464]/10 mb-2 group-hover:scale-110 transition-transform duration-300">
                  <Briefcase className="w-4 h-4 text-[#ec4464]" />
                </div>
                <div className="text-[22px] font-bold text-[#142444] leading-none mb-1">{currentProfile.jobs}</div>
                <div className="text-[11px] font-medium text-[#6B7280] uppercase tracking-wide">Jobs</div>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-[#ec4464]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-xl"></div>
            </div>
          </div>

          {/* Rating Stat */}
          <div className="flex-1 relative group">
            <div className="bg-gradient-to-b from-white to-gray-50 rounded-xl border border-gray-100 hover:border-[#ecd4a4]/30 transition-all duration-300 px-3 py-3.5 shadow-sm hover:shadow-md">
              <div className="flex flex-col items-center">
                <div className="p-2 rounded-full bg-[#ecd4a4]/10 mb-2 group-hover:scale-110 transition-transform duration-300">
                  <Star className="w-4 h-4 fill-[#ecd4a4] text-[#ecd4a4]" />
                </div>
                <div className="text-[22px] font-bold text-[#142444] leading-none mb-1">{currentProfile.rating}</div>
                <div className="text-[11px] font-medium text-[#6B7280] uppercase tracking-wide">Avaliação</div>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-[#ecd4a4]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-xl"></div>
            </div>
          </div>

          {/* Venues Stat */}
          <div className="flex-1 relative group">
            <div className="bg-gradient-to-b from-white to-gray-50 rounded-xl border border-gray-100 hover:border-[#142444]/30 transition-all duration-300 px-3 py-3.5 shadow-sm hover:shadow-md">
              <div className="flex flex-col items-center">
                <div className="p-2 rounded-full bg-[#142444]/10 mb-2 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-4 h-4 text-[#142444]" />
                </div>
                <div className="text-[22px] font-bold text-[#142444] leading-none mb-1">{currentProfile.venues}</div>
                <div className="text-[11px] font-medium text-[#6B7280] uppercase tracking-wide">Locais</div>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-[#142444]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-xl"></div>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="px-1 mb-3">
          <h4 className="text-[13px] font-semibold text-[#142444] mb-1.5">Sobre</h4>
          <p className="text-[13px] text-[#6B7280] leading-[1.5] line-clamp-3">
            {currentProfile.description}
          </p>
        </div>

        {/* CTA Button - Inside the card */}
        <div className="mt-auto">
          <button className="w-full bg-[#ec4464] text-white py-3 px-5 rounded-lg font-semibold text-base hover:bg-[#d63850] active:scale-[0.98] transition-all duration-150">
            Ver Perfil Completo
          </button>
        </div>
      </motion.div>

      {/* Premium Highlight Cards - 3D Emergence Container */}
      <div 
        className="absolute inset-0 flex justify-start items-center pointer-events-none overflow-visible z-30" 
        style={{ 
          paddingLeft: '30px',
          perspective: '1500px', // Increased perspective for more dramatic depth
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Emergence portal effect - subtle glow emanating from main card */}
        <div 
          className="absolute w-[432px] h-[600px] pointer-events-none z-20"
          style={{
            left: '-216px', // Position over main card
            background: showHighlight 
              ? 'radial-gradient(circle at center, rgba(236, 68, 100, 0.03) 0%, transparent 60%)'
              : 'transparent',
            borderRadius: '12px',
            transition: 'background 0.8s ease-out'
          }}
        />
      </div>

      {/* Highlight Cards Container */}
      <div 
        className="absolute inset-0 flex justify-start items-center pointer-events-none overflow-visible z-30" 
        style={{ 
          paddingLeft: '30px',
          perspective: '1500px',
          transformStyle: 'preserve-3d'
        }}
      >
        <AnimatePresence mode="wait">
          {showHighlight && (
            <motion.div
              className="w-full h-full flex justify-start items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderHighlight()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Dots - Outside and below the card */}
      <div className="absolute flex gap-2 z-40" style={{ bottom: '55px', left: '224px' }}>
        {PROFILE_DATA.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setShowHighlight(false)
              setTimeout(() => {
                setCurrentIndex(index)
                setTimeout(() => setShowHighlight(true), 500)
              }, 300)
            }}
            className={`rounded-full transition-all duration-300 shadow-sm ${
              index === currentIndex
                ? 'bg-[#ec4464] w-6 h-2 shadow-md'
                : 'bg-gray-300 w-2 h-2 hover:bg-gray-400 hover:scale-110 active:scale-95'
            }`}
            aria-label={`Ver perfil ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
