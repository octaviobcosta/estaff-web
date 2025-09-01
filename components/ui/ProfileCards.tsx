'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { Star, Award, Quote, Briefcase, CheckCircle, TrendingUp, Clock, Users } from 'lucide-react'

// Professional data interface
interface Professional {
  id: number
  name: string
  role: string
  avatar: string
  rating: number
  totalJobs: number
  onTimeRate: number
  verified: boolean
  topPerformer: boolean
  testimonial: {
    text: string
    author: string
  }
  experience: string[]
  skills: string[]
  badges: string[]
}

// Professional profiles data
const professionals: Professional[] = [
  {
    id: 1,
    name: 'Marina Costa',
    role: 'Garçonete Premium',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&q=80',
    rating: 4.9,
    totalJobs: 143,
    onTimeRate: 99,
    verified: true,
    topPerformer: true,
    testimonial: {
      text: 'Atendimento diferenciado e conhecimento excepcional de vinhos. Transformou nosso evento em uma experiência memorável.',
      author: 'Chef Roberto - Fasano'
    },
    experience: ['Fasano', 'Copa Palace', 'Unique Garden'],
    skills: ['Vinhos', 'Inglês', 'Fine Dining', 'Coquetelaria'],
    badges: ['Top 5%', 'Certificada', 'Verificada']
  },
  {
    id: 2,
    name: 'Carlos Eduardo',
    role: 'Bartender Especialista',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&q=80',
    rating: 4.8,
    totalJobs: 267,
    onTimeRate: 98,
    verified: true,
    topPerformer: true,
    testimonial: {
      text: 'Criatividade e técnica impecáveis. Seus coquetéis autorais são verdadeiras obras de arte.',
      author: 'Gerente Paula - Rooftop SP'
    },
    experience: ['Bar do Copa', 'Skye Bar', 'Frank Bar'],
    skills: ['Mixologia', 'Flair', 'Molecular', 'Autorais'],
    badges: ['Elite', 'Premiado', 'Instrutor']
  },
  {
    id: 3,
    name: 'Ana Beatriz',
    role: 'Hostess Executiva',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&q=80',
    rating: 5.0,
    totalJobs: 89,
    onTimeRate: 100,
    verified: true,
    topPerformer: true,
    testimonial: {
      text: 'Profissional excepcional, transmite elegância e sofisticação. Essencial para eventos corporativos.',
      author: 'Dir. Marcos - Microsoft'
    },
    experience: ['Google', 'Meta', 'Apple Events'],
    skills: ['Trilíngue', 'Protocolo', 'VIP', 'Corporativo'],
    badges: ['Perfeita', '5 Estrelas', 'Premium']
  },
  {
    id: 4,
    name: 'Rafael Santos',
    role: 'Chef de Cozinha',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&q=80',
    rating: 4.9,
    totalJobs: 198,
    onTimeRate: 97,
    verified: true,
    topPerformer: false,
    testimonial: {
      text: 'Talento extraordinário na culinária contemporânea. Cada prato é uma experiência única.',
      author: 'Crítica Gastronômica - Veja'
    },
    experience: ['D.O.M', 'Maní', 'Oro'],
    skills: ['Contemporânea', 'Francesa', 'Molecular', 'Vegana'],
    badges: ['Michelin', 'Chef Elite', 'Inovador']
  },
  {
    id: 5,
    name: 'Juliana Ferreira',
    role: 'Sommelier Internacional',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&q=80',
    rating: 4.9,
    totalJobs: 112,
    onTimeRate: 99,
    verified: true,
    topPerformer: true,
    testimonial: {
      text: 'Conhecimento profundo e didática excepcional. Eleva qualquer experiência gastronômica.',
      author: 'Sommelier Master - ABS'
    },
    experience: ['Eataly', 'Rubaiyat', 'Emiliano'],
    skills: ['Bordeaux', 'Borgonha', 'Napa', 'Harmonização'],
    badges: ['WSET 3', 'Court of Masters', 'Top Wine']
  }
]

// Zoom states enum
enum ZoomState {
  RATING_EXPLOSION = 0,
  TESTIMONIAL_SPOTLIGHT = 1,
  EXPERIENCE_TIMELINE = 2,
  SKILLS_SHOWCASE = 3
}

// Spring physics for smooth animations
const springConfig = {
  type: "spring",
  damping: 25,
  stiffness: 150,
  mass: 1
}

// Particle component for effects
const Particle: React.FC<{ delay: number }> = ({ delay }) => (
  <motion.div
    className="absolute w-1 h-1 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full"
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 1, 0],
      scale: [0, 1.5, 0],
      x: [0, Math.random() * 200 - 100],
      y: [0, Math.random() * 200 - 100],
    }}
    transition={{
      duration: 2,
      delay,
      repeat: Infinity,
      repeatDelay: 1
    }}
  />
)

// Glow effect component
const GlowEffect: React.FC<{ color: string; size: string }> = ({ color, size }) => (
  <motion.div
    className={`absolute ${size} rounded-full pointer-events-none`}
    style={{
      background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`,
      filter: 'blur(20px)',
    }}
    animate={{
      opacity: [0.3, 0.6, 0.3],
      scale: [0.9, 1.1, 0.9],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  />
)

// Main ProfileCard component
const ProfileCard: React.FC<{
  professional: Professional
  zoomState: ZoomState
  isActive: boolean
  isPaused: boolean
}> = ({ professional, zoomState, isActive, isPaused }) => {
  const controls = useAnimation()
  
  // Base card animation variants
  const cardVariants = {
    inactive: {
      scale: 0.9,
      opacity: 0.6,
      filter: "blur(2px)",
    },
    active: {
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
    }
  }

  // Zoom state specific transforms
  const getZoomTransform = () => {
    if (!isActive) return {}
    
    switch (zoomState) {
      case ZoomState.RATING_EXPLOSION:
        return {
          perspective: 1000,
          rotateX: -5,
          translateZ: 50,
        }
      case ZoomState.TESTIMONIAL_SPOTLIGHT:
        return {
          perspective: 1000,
          rotateY: 5,
          translateZ: 30,
        }
      case ZoomState.EXPERIENCE_TIMELINE:
        return {
          perspective: 1000,
          rotateY: -3,
          translateX: -20,
          translateZ: 40,
        }
      case ZoomState.SKILLS_SHOWCASE:
        return {
          perspective: 1000,
          rotateZ: 2,
          translateZ: 60,
        }
      default:
        return {}
    }
  }

  return (
    <motion.div
      className="relative w-[380px] h-[500px] rounded-2xl overflow-hidden"
      variants={cardVariants}
      initial="inactive"
      animate={isActive ? "active" : "inactive"}
      transition={springConfig}
      style={{
        transformStyle: "preserve-3d",
        ...getZoomTransform()
      }}
    >
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/90 to-white/85 backdrop-blur-xl" />
      
      {/* Dynamic shadow */}
      <motion.div
        className="absolute inset-0 shadow-2xl"
        animate={{
          boxShadow: isActive 
            ? "0 25px 50px -12px rgba(0, 0, 0, 0.25)" 
            : "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
        }}
      />

      {/* Header Section with Avatar */}
      <div className="relative p-6 pb-4">
        <div className="flex items-start gap-4">
          <motion.div
            className="relative"
            animate={zoomState === ZoomState.RATING_EXPLOSION && isActive ? {
              scale: 1.2,
              rotate: [0, -5, 5, 0],
            } : {}}
            transition={{ duration: 0.5 }}
          >
            <img
              src={professional.avatar}
              alt={professional.name}
              className="w-20 h-20 rounded-full object-cover border-3 border-white shadow-lg"
            />
            {professional.verified && (
              <motion.div
                className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <CheckCircle className="w-4 h-4 text-white" />
              </motion.div>
            )}
          </motion.div>

          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900">{professional.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{professional.role}</p>
            
            {/* Rating Section - ZOOM STATE 1 */}
            <motion.div
              className="relative"
              animate={zoomState === ZoomState.RATING_EXPLOSION && isActive ? {
                scale: 2.5,
                translateZ: 100,
                translateX: 50,
                translateY: 20,
              } : {}}
              transition={springConfig}
            >
              {zoomState === ZoomState.RATING_EXPLOSION && isActive && (
                <>
                  <GlowEffect color="#fbbf24" size="w-32 h-32 -top-8 -left-8" />
                  {[...Array(5)].map((_, i) => (
                    <Particle key={i} delay={i * 0.2} />
                  ))}
                </>
              )}
              
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={zoomState === ZoomState.RATING_EXPLOSION && isActive ? {
                        scale: [1, 1.3, 1],
                        rotate: [0, 360],
                      } : {}}
                      transition={{
                        duration: 0.5,
                        delay: i * 0.1,
                        repeat: zoomState === ZoomState.RATING_EXPLOSION && isActive ? Infinity : 0,
                        repeatDelay: 2
                      }}
                    >
                      <Star
                        className={`w-4 h-4 ${
                          i < Math.floor(professional.rating)
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    </motion.div>
                  ))}
                </div>
                <motion.span
                  className="text-sm font-semibold text-gray-900"
                  animate={zoomState === ZoomState.RATING_EXPLOSION && isActive ? {
                    scale: [1, 1.2, 1],
                  } : {}}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  {professional.rating}
                </motion.span>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 mt-2">
                <motion.div
                  className="flex items-center gap-1 text-xs text-gray-600"
                  animate={zoomState === ZoomState.RATING_EXPLOSION && isActive ? {
                    x: [0, 5, 0],
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Briefcase className="w-3 h-3" />
                  <span>{professional.totalJobs} jobs</span>
                </motion.div>
                <motion.div
                  className="flex items-center gap-1 text-xs text-gray-600"
                  animate={zoomState === ZoomState.RATING_EXPLOSION && isActive ? {
                    x: [0, -5, 0],
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  <Clock className="w-3 h-3" />
                  <span>{professional.onTimeRate}% pontual</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Testimonial Section - ZOOM STATE 2 */}
      <motion.div
        className="relative px-6 py-4"
        animate={zoomState === ZoomState.TESTIMONIAL_SPOTLIGHT && isActive ? {
          scale: 2.2,
          translateY: -50,
          translateZ: 80,
          rotateY: 5,
        } : {}}
        transition={springConfig}
      >
        {zoomState === ZoomState.TESTIMONIAL_SPOTLIGHT && isActive && (
          <>
            <motion.div
              className="absolute -top-4 -left-4 text-8xl text-blue-100 opacity-50"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [-5, 5, -5],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              "
            </motion.div>
            <motion.div
              className="absolute -bottom-4 -right-4 text-8xl text-blue-100 opacity-50 rotate-180"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [175, 185, 175],
              }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
            >
              "
            </motion.div>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50 rounded-lg"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </>
        )}
        
        <div className="relative bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
          <Quote className="w-4 h-4 text-blue-400 mb-2" />
          <motion.p
            className="text-sm text-gray-700 italic mb-2"
            animate={zoomState === ZoomState.TESTIMONIAL_SPOTLIGHT && isActive ? {
              opacity: [0, 1],
            } : {}}
            transition={{ duration: 1 }}
          >
            "{professional.testimonial.text}"
          </motion.p>
          <p className="text-xs text-gray-600 font-medium">
            — {professional.testimonial.author}
          </p>
        </div>
      </motion.div>

      {/* Experience Section - ZOOM STATE 3 */}
      <motion.div
        className="relative px-6 py-4"
        animate={zoomState === ZoomState.EXPERIENCE_TIMELINE && isActive ? {
          scale: 2.0,
          translateX: -50,
          translateY: -100,
          translateZ: 60,
        } : {}}
        transition={springConfig}
      >
        <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3">
          Experiência
        </h4>
        <div className="relative">
          {zoomState === ZoomState.EXPERIENCE_TIMELINE && isActive && (
            <motion.div
              className="absolute left-2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 to-purple-400"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1 }}
            />
          )}
          <div className="space-y-2">
            {professional.experience.map((exp, index) => (
              <motion.div
                key={exp}
                className="flex items-center gap-3"
                animate={zoomState === ZoomState.EXPERIENCE_TIMELINE && isActive ? {
                  x: [0, 10, 0],
                  opacity: [0, 1],
                } : {}}
                transition={{
                  duration: 0.5,
                  delay: index * 0.2,
                }}
              >
                <motion.div
                  className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-400 to-purple-400"
                  animate={zoomState === ZoomState.EXPERIENCE_TIMELINE && isActive ? {
                    scale: [0, 1.5, 1],
                  } : {}}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.2,
                  }}
                />
                <span className="text-sm text-gray-700 font-medium">{exp}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Skills Section - ZOOM STATE 4 */}
      <motion.div
        className="relative px-6 py-4"
        animate={zoomState === ZoomState.SKILLS_SHOWCASE && isActive ? {
          scale: 2.8,
          translateY: -180,
          translateZ: 100,
          rotateZ: 5,
        } : {}}
        transition={springConfig}
      >
        {zoomState === ZoomState.SKILLS_SHOWCASE && isActive && (
          <>
            {[...Array(8)].map((_, i) => (
              <Particle key={i} delay={i * 0.15} />
            ))}
            <GlowEffect color="#a855f7" size="w-40 h-40 -top-10 -left-10" />
          </>
        )}
        
        <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3">
          Habilidades
        </h4>
        <div className="flex flex-wrap gap-2">
          {professional.skills.map((skill, index) => (
            <motion.span
              key={skill}
              className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-xs font-medium rounded-full"
              animate={zoomState === ZoomState.SKILLS_SHOWCASE && isActive ? {
                scale: [1, 1.2, 1],
                rotate: [0, 360],
                x: Math.sin(index * 0.5) * 20,
                y: Math.cos(index * 0.5) * 20,
              } : {}}
              transition={{
                duration: 2,
                delay: index * 0.1,
                repeat: zoomState === ZoomState.SKILLS_SHOWCASE && isActive ? Infinity : 0,
              }}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Badges Section */}
      <div className="absolute bottom-6 left-6 right-6">
        <div className="flex gap-2">
          {professional.badges.map((badge, index) => (
            <motion.div
              key={badge}
              className="px-2 py-1 bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-xs font-bold rounded-full flex items-center gap-1"
              animate={zoomState === ZoomState.SKILLS_SHOWCASE && isActive ? {
                scale: [1, 1.1, 1],
                y: [0, -5, 0],
              } : {}}
              transition={{
                duration: 1,
                delay: index * 0.2,
                repeat: Infinity,
              }}
            >
              <Award className="w-3 h-3" />
              {badge}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// Main ProfileCards component
const ProfileCards: React.FC<{
  containerWidth?: number
  containerHeight?: number
}> = ({ containerWidth = 1200, containerHeight = 600 }) => {
  const [currentProfile, setCurrentProfile] = useState(0)
  const [zoomState, setZoomState] = useState<ZoomState>(ZoomState.RATING_EXPLOSION)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const zoomIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Handle zoom state rotation
  useEffect(() => {
    if (isPaused) return

    zoomIntervalRef.current = setInterval(() => {
      setZoomState((prev) => (prev + 1) % 4)
    }, 3000)

    return () => {
      if (zoomIntervalRef.current) {
        clearInterval(zoomIntervalRef.current)
      }
    }
  }, [isPaused])

  // Handle profile rotation
  useEffect(() => {
    if (isPaused) return

    intervalRef.current = setInterval(() => {
      setCurrentProfile((prev) => (prev + 1) % professionals.length)
      setZoomState(ZoomState.RATING_EXPLOSION) // Reset zoom state on profile change
    }, 15000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPaused])

  // Handle click to advance zoom state
  const handleClick = useCallback(() => {
    setZoomState((prev) => (prev + 1) % 4)
  }, [])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setCurrentProfile((prev) => (prev + 1) % professionals.length)
      } else if (e.key === 'ArrowLeft') {
        setCurrentProfile((prev) => (prev - 1 + professionals.length) % professionals.length)
      } else if (e.key === ' ') {
        e.preventDefault()
        handleClick()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [handleClick])

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReducedMotion) {
    // Simplified version for accessibility
    return (
      <div className="flex justify-center items-center" style={{ width: containerWidth, height: containerHeight }}>
        <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md">
          <h2 className="text-2xl font-bold mb-4">Profissionais em Destaque</h2>
          {professionals.map((prof) => (
            <div key={prof.id} className="mb-4 p-4 border rounded-lg">
              <h3 className="font-semibold">{prof.name}</h3>
              <p className="text-sm text-gray-600">{prof.role}</p>
              <div className="flex items-center gap-1 mt-2">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-sm">{prof.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div 
      className="relative flex justify-center items-center overflow-hidden"
      style={{ 
        width: containerWidth, 
        height: containerHeight,
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onClick={handleClick}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50" />
      
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full"
            initial={{
              x: Math.random() * containerWidth,
              y: Math.random() * containerHeight,
            }}
            animate={{
              x: Math.random() * containerWidth,
              y: Math.random() * containerHeight,
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Profile cards carousel */}
      <div className="relative flex items-center justify-center">
        <AnimatePresence mode="wait">
          {professionals.map((professional, index) => {
            const offset = index - currentProfile
            const isActive = index === currentProfile
            const isVisible = Math.abs(offset) <= 2

            if (!isVisible) return null

            return (
              <motion.div
                key={professional.id}
                className="absolute"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: isActive ? 1 : 0.3,
                  scale: isActive ? 1 : 0.8,
                  x: offset * 100,
                  z: isActive ? 0 : -100,
                  rotateY: offset * 15,
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={springConfig}
                style={{
                  transformStyle: 'preserve-3d',
                  zIndex: isActive ? 10 : 5 - Math.abs(offset),
                }}
              >
                <ProfileCard
                  professional={professional}
                  zoomState={zoomState}
                  isActive={isActive}
                  isPaused={isPaused}
                />
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
        {professionals.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentProfile
                ? 'bg-purple-600 w-8'
                : 'bg-gray-400 hover:bg-gray-600'
            }`}
            onClick={(e) => {
              e.stopPropagation()
              setCurrentProfile(index)
              setZoomState(ZoomState.RATING_EXPLOSION)
            }}
            aria-label={`Ir para perfil ${index + 1}`}
          />
        ))}
      </div>

      {/* Zoom state indicator */}
      <div className="absolute top-8 right-8 flex flex-col gap-2">
        {Object.values(ZoomState).filter(v => typeof v === 'number').map((state) => (
          <div
            key={state}
            className={`w-2 h-2 rounded-full transition-all ${
              zoomState === state
                ? 'bg-purple-600 scale-150'
                : 'bg-gray-400'
            }`}
            aria-label={`Estado de zoom ${state + 1}`}
          />
        ))}
      </div>

      {/* Instructions */}
      <div className="absolute bottom-8 right-8 text-xs text-gray-600 bg-white/80 backdrop-blur-sm rounded-lg p-3">
        <p>← → Navegar perfis</p>
        <p>Clique ou Espaço: Próximo zoom</p>
        <p>Passe o mouse para pausar</p>
      </div>
    </div>
  )
}

export default ProfileCards