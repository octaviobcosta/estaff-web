'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, MapPin, Award, CheckCircle, Briefcase, GraduationCap, TrendingUp } from 'lucide-react'

// Professional profiles with different highlight areas
const profiles = [
  {
    id: 1,
    name: 'Marina Costa',
    role: 'Garçonete Premium',
    photo: 'https://i.pravatar.cc/150?img=9',
    rating: 4.95,
    jobs: 143,
    onTime: 99,
    highlightType: 'avaliacoes',
    highlightData: {
      title: '⭐ Cliente VIP Recomenda',
      rating: 5,
      mainReview: {
        text: '"Marina transformou nosso evento corporativo. Atendimento impecável, memoriza preferências dos convidados e antecipa necessidades. Absolutamente profissional!"',
        author: 'Roberto Silva, CEO TechCorp',
        event: 'Jantar Executivo - 50 pessoas',
        date: 'Dezembro 2023'
      },
      stats: {
        fiveStars: 138,
        fourStars: 5,
        total: 143
      }
    }
  },
  {
    id: 2,
    name: 'Rafael Santos',
    role: 'Chef de Cozinha',
    photo: 'https://i.pravatar.cc/150?img=7',
    rating: 4.8,
    jobs: 198,
    onTime: 97,
    highlightType: 'disponibilidade',
    highlightData: {
      title: '📅 Agenda Disponível',
      availability: {
        today: 'Disponível das 18h às 23h',
        tomorrow: 'Dia completo disponível',
        weekend: 'Sábado e Domingo livres'
      },
      preferences: {
        events: ['Jantares', 'Brunches', 'Eventos corporativos'],
        cuisine: ['Italiana', 'Contemporânea', 'Fusion'],
        team: 'Disponível para liderar equipe de até 8 pessoas'
      },
      responseTime: 'Responde em ~15 minutos'
    }
  },
  {
    id: 3,
    name: 'Ana Silva',
    role: 'Sommelière',
    photo: 'https://i.pravatar.cc/150?img=1',
    rating: 4.9,
    jobs: 89,
    onTime: 100,
    highlightType: 'conquistas',
    highlightData: {
      title: '🏆 Conquistas & Reconhecimentos',
      achievements: [
        { icon: '🥇', title: 'Top 3 Sommelières', desc: 'Ranking Estaff 2023' },
        { icon: '🍷', title: '500+ Rótulos', desc: 'Expertise comprovada' },
        { icon: '💎', title: 'Cliente Diamante', desc: '50+ eventos premium' }
      ],
      specialties: ['Vinhos Franceses', 'Harmonização', 'Eventos VIP'],
      languages: ['Português', 'Inglês', 'Francês', 'Espanhol']
    }
  },
  {
    id: 4,
    name: 'Carlos Eduardo',
    role: 'Bartender Expert',
    photo: 'https://i.pravatar.cc/150?img=6',
    rating: 4.8,
    jobs: 267,
    onTime: 97,
    highlightType: 'especialidades',
    highlightData: {
      title: '🍸 Especialista em Cocktails',
      signature: {
        name: 'Sunset Paulista',
        description: 'Cachaça artesanal, maracujá, espuma de gengibre',
        price: 'Menu premium R$ 45'
      },
      skills: [
        { name: 'Mixologia Molecular', level: 95 },
        { name: 'Flair Bartending', level: 88 },
        { name: 'Cocktails Clássicos', level: 100 },
        { name: 'Criações Autorais', level: 92 }
      ],
      events: '150+ eventos atendidos em 2023'
    }
  },
  {
    id: 5,
    name: 'Amanda Martins',
    role: 'Host/Hostess',
    photo: 'https://i.pravatar.cc/150?img=5',
    rating: 4.7,
    jobs: 61,
    onTime: 98,
    highlightType: 'diferenciais',
    highlightData: {
      title: '✨ Por que me escolher?',
      differentials: [
        { icon: '🌟', text: '98% de pontualidade em todos os eventos' },
        { icon: '💬', text: 'Fluente em 4 idiomas (PT/EN/ES/FR)' },
        { icon: '👥', text: 'Experiência com público VIP e celebridades' },
        { icon: '🎯', text: 'Especialista em eventos corporativos internacionais' }
      ],
      testimonial: '"Amanda salvou nosso evento! Gerenciou 200 convidados com maestria." - EventPro',
      nextAvailable: 'Disponível Imediatamente'
    }
  }
]

export default function ProfileCards({ containerWidth = 900, containerHeight = 450 }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showHighlight, setShowHighlight] = useState(false)

  const currentProfile = profiles[currentIndex]

  // Cycle through profiles
  useEffect(() => {
    const interval = setInterval(() => {
      setShowHighlight(false)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % profiles.length)
        setTimeout(() => setShowHighlight(true), 800)
      }, 400)
    }, 5000)

    // Show first highlight
    setTimeout(() => setShowHighlight(true), 1000)

    return () => clearInterval(interval)
  }, [])

  // Render highlight based on type - crossing the entire card
  const renderHighlight = () => {
    const { highlightType, highlightData } = currentProfile
    
    // Base positioning - centered on card and extending beyond
    // Como está dentro de um container centralizado, apenas definimos tamanho e estilo
    const baseClass = "w-[650px] h-[150px] rounded-xl shadow-2xl z-30 pointer-events-auto overflow-hidden"
    const elevatedShadow = "drop-shadow-[0_10px_25px_rgba(0,0,0,0.3)]" // Sombra mais pronunciada
    
    switch (highlightType) {
      case 'avaliacoes':
        return (
          <motion.div
            initial={{ opacity: 0, scaleX: 0, scaleY: 0.8 }}
            animate={{ opacity: 1, scaleX: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleX: 0, scaleY: 0.8 }}
            transition={{ type: "spring", damping: 20, stiffness: 200 }}
            className={`${baseClass} ${elevatedShadow} bg-gradient-to-r from-yellow-50 to-orange-50 p-5`}
          >
            <div className="flex h-full gap-4">
              <div className="flex-1">
                <h3 className="text-gray-800 font-bold text-sm mb-2 flex items-center gap-2">
                  {highlightData.title}
                  <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full text-xs">Destaque</span>
                </h3>
                <div className="bg-white/80 rounded-lg p-3 mb-2">
                  <p className="text-xs text-gray-700 italic leading-relaxed mb-2">
                    {highlightData.mainReview.text}
                  </p>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[11px] font-semibold text-gray-800">{highlightData.mainReview.author}</p>
                      <p className="text-[10px] text-gray-600">{highlightData.mainReview.event}</p>
                    </div>
                    <p className="text-[10px] text-gray-500">{highlightData.mainReview.date}</p>
                  </div>
                </div>
              </div>
              <div className="w-32 flex flex-col items-center justify-center bg-white/60 rounded-lg">
                <div className="text-3xl font-bold text-yellow-500 mb-1">{highlightData.rating}.0</div>
                <div className="flex gap-0.5 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <div className="text-center">
                  <p className="text-[10px] text-gray-600">{highlightData.stats.fiveStars} de {highlightData.stats.total}</p>
                  <p className="text-[10px] font-semibold text-gray-700">avaliações 5⭐</p>
                </div>
              </div>
            </div>
          </motion.div>
        )
      
      case 'disponibilidade':
        return (
          <motion.div
            initial={{ opacity: 0, scaleX: 0, scaleY: 0.8 }}
            animate={{ opacity: 1, scaleX: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleX: 0, scaleY: 0.8 }}
            transition={{ type: "spring", damping: 20, stiffness: 200 }}
            className={`${baseClass} ${elevatedShadow} bg-gradient-to-r from-green-50 to-emerald-50 p-5`}
          >
            <div className="flex h-full gap-4">
              <div className="flex-1">
                <h3 className="text-gray-800 font-bold text-sm mb-3 flex items-center gap-2">
                  {highlightData.title}
                  <span className="animate-pulse w-2 h-2 bg-green-500 rounded-full"></span>
                </h3>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className="bg-white/80 rounded p-2">
                    <p className="text-[10px] font-semibold text-gray-700">Hoje</p>
                    <p className="text-[11px] text-green-600">{highlightData.availability.today}</p>
                  </div>
                  <div className="bg-white/80 rounded p-2">
                    <p className="text-[10px] font-semibold text-gray-700">Amanhã</p>
                    <p className="text-[11px] text-green-600">{highlightData.availability.tomorrow}</p>
                  </div>
                  <div className="bg-white/80 rounded p-2">
                    <p className="text-[10px] font-semibold text-gray-700">Fim de Semana</p>
                    <p className="text-[11px] text-green-600">{highlightData.availability.weekend}</p>
                  </div>
                </div>
                <div className="bg-white/60 rounded p-2">
                  <p className="text-[10px] text-gray-600 mb-1"><strong>Preferências:</strong> {highlightData.preferences.events.join(' • ')}</p>
                  <p className="text-[10px] text-gray-600"><strong>Cozinhas:</strong> {highlightData.preferences.cuisine.join(' • ')}</p>
                </div>
              </div>
              <div className="w-40 bg-white/60 rounded-lg p-3 flex flex-col justify-center">
                <div className="text-center mb-2">
                  <p className="text-[10px] text-gray-600 mb-1">Tempo de Resposta</p>
                  <p className="text-sm font-bold text-green-600">{highlightData.responseTime}</p>
                </div>
                <div className="border-t pt-2">
                  <p className="text-[10px] text-gray-700 text-center">{highlightData.preferences.team}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )
      
      case 'conquistas':
        return (
          <motion.div
            initial={{ opacity: 0, scaleX: 0, scaleY: 0.8 }}
            animate={{ opacity: 1, scaleX: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleX: 0, scaleY: 0.8 }}
            transition={{ type: "spring", damping: 20, stiffness: 200 }}
            className={`${baseClass} ${elevatedShadow} bg-gradient-to-r from-purple-50 to-pink-50 p-5`}
          >
            <div className="flex flex-col h-full">
              <h3 className="text-gray-800 font-bold text-sm mb-3">{highlightData.title}</h3>
              <div className="flex gap-4 mb-3">
                {highlightData.achievements.map((achievement, i) => (
                  <div key={i} className="flex-1 bg-white/80 rounded-lg p-2 text-center">
                    <div className="text-2xl mb-1">{achievement.icon}</div>
                    <p className="text-[11px] font-semibold text-gray-800">{achievement.title}</p>
                    <p className="text-[10px] text-gray-600">{achievement.desc}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-4">
                <div className="flex-1 bg-white/60 rounded p-2">
                  <p className="text-[10px] font-semibold text-gray-700 mb-1">Especialidades</p>
                  <p className="text-[10px] text-gray-600">{highlightData.specialties.join(' • ')}</p>
                </div>
                <div className="flex-1 bg-white/60 rounded p-2">
                  <p className="text-[10px] font-semibold text-gray-700 mb-1">Idiomas</p>
                  <p className="text-[10px] text-gray-600">{highlightData.languages.join(' • ')}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )
      
      case 'especialidades':
        return (
          <motion.div
            initial={{ opacity: 0, scaleX: 0, scaleY: 0.8 }}
            animate={{ opacity: 1, scaleX: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleX: 0, scaleY: 0.8 }}
            transition={{ type: "spring", damping: 20, stiffness: 200 }}
            className={`${baseClass} ${elevatedShadow} bg-gradient-to-r from-indigo-50 to-blue-50 p-5`}
          >
            <div className="flex h-full gap-4">
              <div className="flex-1">
                <h3 className="text-gray-800 font-bold text-sm mb-3">{highlightData.title}</h3>
                <div className="bg-white/80 rounded-lg p-3 mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-xs font-bold text-indigo-700">Cocktail Assinatura</h4>
                    <span className="text-[10px] bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded">{highlightData.signature.price}</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-800">{highlightData.signature.name}</p>
                  <p className="text-[11px] text-gray-600 italic">{highlightData.signature.description}</p>
                </div>
                <p className="text-[11px] font-semibold text-center text-gray-700 bg-white/60 rounded py-1">
                  {highlightData.events}
                </p>
              </div>
              <div className="w-48">
                <p className="text-[10px] font-semibold text-gray-700 mb-2">Nível de Expertise</p>
                {highlightData.skills.map((skill, i) => (
                  <div key={i} className="mb-2">
                    <div className="flex justify-between items-center mb-0.5">
                      <span className="text-[10px] text-gray-700">{skill.name}</span>
                      <span className="text-[10px] font-bold text-gray-800">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="bg-gradient-to-r from-indigo-400 to-blue-500 h-1.5 rounded-full transition-all"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )
      
      case 'diferenciais':
        return (
          <motion.div
            initial={{ opacity: 0, scaleX: 0, scaleY: 0.8 }}
            animate={{ opacity: 1, scaleX: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleX: 0, scaleY: 0.8 }}
            transition={{ type: "spring", damping: 20, stiffness: 200 }}
            className={`${baseClass} ${elevatedShadow} bg-gradient-to-r from-rose-50 to-orange-50 p-5`}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-gray-800 font-bold text-sm">{highlightData.title}</h3>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium animate-pulse">
                  {highlightData.nextAvailable}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-3">
                {highlightData.differentials.map((diff, i) => (
                  <div key={i} className="bg-white/80 rounded-lg p-2 flex items-start gap-2">
                    <span className="text-lg">{diff.icon}</span>
                    <p className="text-[10px] text-gray-700 leading-relaxed">{diff.text}</p>
                  </div>
                ))}
              </div>
              <div className="bg-white/60 rounded-lg p-2 mt-auto">
                <p className="text-[11px] text-gray-700 italic text-center">
                  {highlightData.testimonial}
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
    <div className="relative flex items-center justify-center overflow-visible" style={{ width: containerWidth, height: containerHeight }}>
      {/* Main Profile Card - Compact and Grayscale when highlight is shown */}
      <motion.div
        key={currentProfile.id}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          filter: showHighlight ? 'grayscale(100%) brightness(0.6)' : 'grayscale(0%) brightness(1)'
        }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-[420px] bg-white rounded-2xl shadow-xl p-5"
      >
        {/* Dynamic content based on profile type */}
        {(() => {
          const { highlightType, highlightData } = currentProfile
          
          switch (highlightType) {
            case 'avaliacoes':
              return (
                <>
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={currentProfile.photo}
                      alt={currentProfile.name}
                      className="w-16 h-16 rounded-full border-2 border-gray-200 object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900">{currentProfile.name}</h3>
                      <p className="text-sm text-gray-600">{currentProfile.role}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-gray-500">{currentProfile.jobs} jobs</span>
                        <span className="text-gray-300">•</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{currentProfile.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-t pt-3">
                    <h4 className="text-sm font-semibold text-gray-800 mb-2">Avaliações</h4>
                    <div className="flex items-start gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < highlightData.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <div className="space-y-2">
                      <div className="bg-gray-50 rounded p-2">
                        <p className="text-xs text-gray-700 line-clamp-2">{highlightData.mainReview.text}</p>
                        <p className="text-[10px] text-gray-500 text-right mt-1">{highlightData.mainReview.date}</p>
                      </div>
                    </div>
                  </div>
                </>
              )
              
            case 'disponibilidade':
              return (
                <>
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={currentProfile.photo}
                      alt={currentProfile.name}
                      className="w-16 h-16 rounded-full border-2 border-gray-200 object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900">{currentProfile.name}</h3>
                      <p className="text-sm text-gray-600">{currentProfile.role}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-gray-500">{currentProfile.jobs} jobs</span>
                        <span className="text-gray-300">•</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{currentProfile.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-t pt-3">
                    <h4 className="text-sm font-semibold text-gray-800 mb-3">Disponibilidade</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-gray-700">Disponível Hoje</span>
                      </div>
                      <div className="bg-green-50 rounded p-2">
                        <p className="text-xs text-green-700">{highlightData.availability.today}</p>
                      </div>
                      <p className="text-xs text-gray-600">Responde em {highlightData.responseTime}</p>
                    </div>
                  </div>
                </>
              )
              
            case 'conquistas':
              return (
                <>
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={currentProfile.photo}
                      alt={currentProfile.name}
                      className="w-16 h-16 rounded-full border-2 border-gray-200 object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900">{currentProfile.name}</h3>
                      <p className="text-sm text-gray-600">{currentProfile.role}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-gray-500">{currentProfile.jobs} jobs</span>
                        <span className="text-gray-300">•</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{currentProfile.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-t pt-3">
                    <h4 className="text-sm font-semibold text-gray-800 mb-3">Conquistas</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {highlightData.achievements.map((achievement, i) => (
                        <div key={i} className="text-center">
                          <div className="text-2xl mb-1">{achievement.icon}</div>
                          <p className="text-[10px] text-gray-700">{achievement.title}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )
              
            case 'especialidades':
              return (
                <>
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={currentProfile.photo}
                      alt={currentProfile.name}
                      className="w-16 h-16 rounded-full border-2 border-gray-200 object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900">{currentProfile.name}</h3>
                      <p className="text-sm text-gray-600">{currentProfile.role}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-gray-500">{currentProfile.jobs} jobs</span>
                        <span className="text-gray-300">•</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{currentProfile.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-t pt-3">
                    <h4 className="text-sm font-semibold text-gray-800 mb-3">Especialidades</h4>
                    <div className="bg-indigo-50 rounded p-2 mb-2">
                      <p className="text-xs font-semibold text-indigo-700">{highlightData.signature.name}</p>
                      <p className="text-[10px] text-gray-600">{highlightData.signature.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {highlightData.skills.slice(0, 3).map((skill, i) => (
                        <span key={i} className="text-[10px] bg-gray-100 px-2 py-1 rounded">
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              )
              
            case 'diferenciais':
              return (
                <>
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={currentProfile.photo}
                      alt={currentProfile.name}
                      className="w-16 h-16 rounded-full border-2 border-gray-200 object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900">{currentProfile.name}</h3>
                      <p className="text-sm text-gray-600">{currentProfile.role}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-gray-500">{currentProfile.jobs} jobs</span>
                        <span className="text-gray-300">•</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{currentProfile.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-t pt-3">
                    <h4 className="text-sm font-semibold text-gray-800 mb-3">Diferenciais</h4>
                    <div className="space-y-2">
                      {highlightData.differentials.slice(0, 2).map((diff, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="text-lg">{diff.icon}</span>
                          <p className="text-xs text-gray-700">{diff.text}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3">
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                        {highlightData.nextAvailable}
                      </span>
                    </div>
                  </div>
                </>
              )
              
            default:
              return null
          }
        })()}
      </motion.div>

      {/* Animated Highlight Rectangle - Crossing the card */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-visible">
        <AnimatePresence mode="wait">
          {showHighlight && renderHighlight()}
        </AnimatePresence>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-40">
        {profiles.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setShowHighlight(false)
              setTimeout(() => {
                setCurrentIndex(index)
                setTimeout(() => setShowHighlight(true), 500)
              }, 300)
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-[#142444] w-8'
                : 'bg-gray-300 w-2 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
