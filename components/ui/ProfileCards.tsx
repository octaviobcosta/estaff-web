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

  const currentProfile = PROFILE_DATA[currentIndex]!
  if (!currentProfile) return null

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

  // Render simplified highlight cards
  const renderHighlight = () => {
    if (!currentProfile) return null
    const { highlightType, highlightData } = currentProfile
    
    // Simplified card styling with professional colors - auto height
    const HIGHLIGHT_BASE_CLASSES = "w-[400px] rounded-xl shadow-xl z-30 pointer-events-auto bg-white border border-gray-200"
    
    switch (highlightType) {
      case 'avaliacao':
        // Card 1 - Performance Indicators
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25 }}
            className={HIGHLIGHT_BASE_CLASSES}
          >
            <div className="px-6 py-5">
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
            </div>
          </motion.div>
        )
      
      case 'experiencias':
        // Card 2 - Onde Trabalhou
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25 }}
            className={HIGHLIGHT_BASE_CLASSES}
          >
            <div className="px-6 py-5">
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
            </div>
          </motion.div>
        )
      
      case 'depoimento':
        // Card 3 - Último Feedback
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25 }}
            className={HIGHLIGHT_BASE_CLASSES}
          >
            <div className="relative px-6 py-5">
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
            </div>
          </motion.div>
        )
      
      case 'conquistas':
        // Card 4 - Conquistas e Certificações
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25 }}
            className={HIGHLIGHT_BASE_CLASSES}
          >
            <div className="px-6 py-5">
              <h3 className="text-sm font-semibold text-[#142444] mb-4">Conquistas e Certificações</h3>
              <div className="grid grid-cols-2 gap-3">
                {highlightData.badges?.map((badge: any, i: number) => {
                  const getIcon = () => {
                    switch (badge.icon) {
                      case 'top_rated':
                        return <Star className="w-5 h-5" />
                      case 'in_demand':
                        return <TrendingUp className="w-5 h-5" />
                      case 'verified':
                        return <Shield className="w-5 h-5" />
                      case 'premium':
                        return <Trophy className="w-5 h-5" />
                      default:
                        return <Award className="w-5 h-5" />
                    }
                  }

                  const getIconColor = () => {
                    switch (badge.icon) {
                      case 'top_rated':
                        return 'text-[#ecd4a4] fill-[#ecd4a4]'
                      case 'in_demand':
                        return 'text-[#ec4464]'
                      case 'verified':
                        return 'text-[#22c55e]'
                      case 'premium':
                        return 'text-[#142444]'
                      default:
                        return 'text-[#6B7280]'
                    }
                  }

                  return (
                    <div key={i} className="relative">
                      <div className="flex flex-col items-start p-3 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
                        <div className={`p-2 rounded-full bg-white shadow-sm mb-2 ${getIconColor()}`}>
                          {getIcon()}
                        </div>
                        <div className="text-xs font-semibold text-[#142444] mb-0.5">
                          {badge.label}
                        </div>
                        <div className="text-[10px] text-[#6B7280] leading-tight">
                          {badge.description}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )
      
      case 'bio':
        // Card 5 - Sobre o Profissional
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25 }}
            className={`${HIGHLIGHT_BASE_CLASSES} overflow-hidden`}
          >
            <div className="px-6 py-5 relative">
              <div className="absolute inset-0 bg-[#ecd4a4] opacity-5 rounded-xl"></div>
              <div className="relative">
                <h3 className="text-sm font-semibold text-[#142444] mb-3">Sobre o Profissional</h3>
                <p className="text-[#142444] text-sm leading-relaxed">
                  {highlightData.bio}
                </p>
              </div>
            </div>
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
        className="relative z-10 w-[432px] h-[600px] bg-white rounded-xl shadow-lg p-6 flex flex-col border border-gray-200"
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

      {/* Animated Highlight Rectangle - Crossing the card */}
      <div className="absolute inset-0 flex justify-start items-center pointer-events-none overflow-visible" style={{ paddingLeft: '30px' }}>
        <AnimatePresence mode="wait">
          {showHighlight && renderHighlight()}
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
