'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, MapPin, Briefcase, CheckCircle } from 'lucide-react'

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
    highlightType: 'experiencias',
    highlightData: {
      venues: [
        { name: 'Villa Toscana', count: 23 },
        { name: 'Bar do Araújo', count: 10 }
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
    highlightType: 'depoimento',
    highlightData: {
      quote: 'Excelente profissional!',
      author: 'Cliente'
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
    highlightType: 'conquistas',
    highlightData: {
      icons: ['🏆', '📜', '🥇', '⭐']
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
    highlightType: 'bio',
    highlightData: {
      bio: 'Hostess com 5 anos de experiência em eventos corporativos'
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
    
    // Simplified card styling with professional colors
    const HIGHLIGHT_BASE_CLASSES = "w-[640px] h-[140px] rounded-xl shadow-xl z-30 pointer-events-auto overflow-hidden bg-white border border-gray-200"
    
    switch (highlightType) {
      case 'avaliacao':
        // Card 1 - Simple centered rating display
        return (
          <motion.div
            initial={{ opacity: 0, scaleY: 0.8 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0.8 }}
            transition={{ type: "spring", damping: 25 }}
            className={HIGHLIGHT_BASE_CLASSES}
          >
            <div className="flex flex-col items-center justify-center h-full">
              <div className="text-5xl mb-3">⭐</div>
              <div className="text-4xl font-bold text-[#1e3c72] mb-2">{highlightData.rating}</div>
              <div className="text-sm text-[#666]">{highlightData.jobs} jobs</div>
            </div>
          </motion.div>
        )
      
      case 'experiencias':
        // Card 2 - Simple venue list
        return (
          <motion.div
            initial={{ opacity: 0, scaleY: 0.8 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0.8 }}
            transition={{ type: "spring", damping: 25 }}
            className={HIGHLIGHT_BASE_CLASSES}
          >
            <div className="flex flex-col justify-center h-full px-8 py-6">
              {highlightData.venues?.map((venue: any, i: number) => (
                <div key={i} className="flex items-center gap-3 mb-4">
                  <span className="text-[#1e3c72] text-lg">📍</span>
                  <div>
                    <p className="text-base font-semibold text-[#1e3c72]">{venue.name}</p>
                    <p className="text-sm text-[#666]">{venue.count} vezes</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )
      
      case 'depoimento':
        // Card 3 - Simple testimonial
        return (
          <motion.div
            initial={{ opacity: 0, scaleY: 0.8 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0.8 }}
            transition={{ type: "spring", damping: 25 }}
            className={HIGHLIGHT_BASE_CLASSES}
          >
            <div className="flex flex-col items-center justify-center h-full px-12">
              <p className="text-2xl italic text-[#1e3c72] mb-3">"{highlightData.quote}"</p>
              <p className="text-sm text-[#666]">— {highlightData.author}</p>
            </div>
          </motion.div>
        )
      
      case 'conquistas':
        // Card 4 - Icon grid only
        return (
          <motion.div
            initial={{ opacity: 0, scaleY: 0.8 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0.8 }}
            transition={{ type: "spring", damping: 25 }}
            className={HIGHLIGHT_BASE_CLASSES}
          >
            <div className="flex items-center justify-center h-full">
              <div className="grid grid-cols-2 gap-6">
                {highlightData.icons?.map((icon: string, i: number) => (
                  <div key={i} className="text-5xl">{icon}</div>
                ))}
              </div>
            </div>
          </motion.div>
        )
      
      case 'bio':
        // Card 5 - Simple bio text
        return (
          <motion.div
            initial={{ opacity: 0, scaleY: 0.8 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0.8 }}
            transition={{ type: "spring", damping: 25 }}
            className={HIGHLIGHT_BASE_CLASSES}
          >
            <div className="flex items-center justify-center h-full px-12">
              <p className="text-lg text-[#1e3c72] text-center leading-relaxed">
                {highlightData.bio}
              </p>
            </div>
          </motion.div>
        )
      
      default:
        return null
    }
  }

  return (
    <div className={`relative flex items-center justify-start overflow-visible w-full h-full pl-5 ${className}`}>
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
        className="relative z-10 w-[420px] h-[480px] bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-6 flex flex-col border border-gray-100"
      >
        {/* Header Section */}
        <div className="flex items-start gap-6 mb-8">
          {/* Profile Image */}
          <img
            src={currentProfile.photo}
            alt={`${currentProfile.name}`}
            className="w-20 h-20 rounded-full object-cover border-2 border-gray-100"
            loading="lazy"
          />
          
          {/* Profile Info */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-2xl font-semibold text-[#1e3c72] leading-tight">
                {currentProfile.name}
              </h3>
              {currentProfile.verified && (
                <CheckCircle className="w-5 h-5 text-[#FFD700] fill-[#FFD700]" />
              )}
            </div>
            <p className="text-lg font-medium text-[#666] mb-3">{currentProfile.role}</p>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{currentProfile.location}</span>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="flex items-center justify-between px-6 py-4 mb-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 mb-1">
              <Briefcase className="w-4 h-4 text-[#1e3c72]" />
              <span className="text-sm font-medium text-gray-600">Jobs</span>
            </div>
            <div className="text-xl font-bold text-[#1e3c72]">{currentProfile.jobs}</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 mb-1">
              <Star className="w-4 h-4 fill-[#FFD700] text-[#FFD700]" />
              <span className="text-sm font-medium text-gray-600">Avaliação</span>
            </div>
            <div className="text-xl font-bold text-[#1e3c72]">{currentProfile.rating}</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="w-4 h-4 text-[#1e3c72]" />
              <span className="text-sm font-medium text-gray-600">Locais</span>
            </div>
            <div className="text-xl font-bold text-[#1e3c72]">{currentProfile.venues}</div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-2">
          <button className="w-full bg-[#1e3c72] text-white py-2.5 px-5 rounded-lg font-semibold text-sm hover:bg-[#142f5a] active:scale-[0.98] transition-all duration-150">
            Ver Perfil Completo
          </button>
        </div>
      </motion.div>

      {/* Animated Highlight Rectangle - Crossing the card */}
      <div className="absolute inset-0 flex justify-center items-start pointer-events-none overflow-visible pt-[120px]">
        <AnimatePresence mode="wait">
          {showHighlight && renderHighlight()}
        </AnimatePresence>
      </div>

      {/* Navigation Dots - Enhanced Visual Design */}
      <div className="absolute flex gap-2 z-40 top-[500px] left-[210px]">
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
                ? 'bg-[#1e3c72] w-6 h-2 shadow-md'
                : 'bg-gray-300 w-2 h-2 hover:bg-gray-400 hover:scale-110 active:scale-95'
            }`}
            aria-label={`Ver perfil ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
