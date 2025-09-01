'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

// TypeScript types
interface Professional {
  id: number
  name: string
  role: string
  photo: string
  rating: number
  jobsCompleted: number
  onTimeRate: number
  badges: string[]
  testimonial: string
  available: boolean
  specialty?: string
}

// Mock data for professionals
const professionals: Professional[] = [
  {
    id: 1,
    name: 'Ana Silva',
    role: 'Bartender Especialista',
    photo: 'https://i.pravatar.cc/150?img=1',
    rating: 4.9,
    jobsCompleted: 127,
    onTimeRate: 98,
    badges: ['Mixologia Avançada', 'Atendimento Premium'],
    testimonial: 'Ana foi excepcional! Preparou drinks incríveis e manteve o bar organizado a noite toda.',
    available: true,
    specialty: '3x Profissional Ouro'
  },
  {
    id: 2,
    name: 'Carlos Mendes',
    role: 'Chef de Cozinha',
    photo: 'https://i.pravatar.cc/150?img=3',
    rating: 4.8,
    jobsCompleted: 89,
    onTimeRate: 96,
    badges: ['Culinária Internacional', 'Gestão de Equipe'],
    testimonial: 'Carlos elevou nosso evento a outro nível. Pratos impecáveis e timing perfeito.',
    available: true,
    specialty: '2x Melhor Chef'
  },
  {
    id: 3,
    name: 'Marina Costa',
    role: 'Garçonete Premium',
    photo: 'https://i.pravatar.cc/150?img=5',
    rating: 4.9,
    jobsCompleted: 143,
    onTimeRate: 99,
    badges: ['Atendimento VIP', 'Sommelière Certificada'],
    testimonial: 'Marina tem um atendimento diferenciado. Profissional e carismática!',
    available: true,
    specialty: 'Top 5% da Plataforma'
  },
  {
    id: 4,
    name: 'Roberto Lima',
    role: 'Hostess de Eventos',
    photo: 'https://i.pravatar.cc/150?img=7',
    rating: 4.8,
    jobsCompleted: 112,
    onTimeRate: 97,
    badges: ['Recepção Bilíngue', 'Eventos Corporativos'],
    testimonial: 'Roberto gerenciou a recepção com maestria. Todos os convidados elogiaram!',
    available: true,
    specialty: 'Especialista em Eventos'
  },
  {
    id: 5,
    name: 'Juliana Santos',
    role: 'Cozinheira Especializada',
    photo: 'https://i.pravatar.cc/150?img=9',
    rating: 4.9,
    jobsCompleted: 98,
    onTimeRate: 95,
    badges: ['Confeitaria', 'Pratos Veganos'],
    testimonial: 'Juliana superou todas as expectativas. Sobremesas divinas!',
    available: true,
    specialty: 'Certificação Internacional'
  },
  {
    id: 6,
    name: 'Pedro Oliveira',
    role: 'Auxiliar de Cozinha',
    photo: 'https://i.pravatar.cc/150?img=11',
    rating: 4.7,
    jobsCompleted: 81,
    onTimeRate: 94,
    badges: ['Mise en Place', 'Higiene Certificada'],
    testimonial: 'Pedro é extremamente organizado e eficiente. Um profissional exemplar.',
    available: true,
    specialty: 'Rising Star 2024'
  }
]

const ProfessionalCard: React.FC<{ professional: Professional; isActive: boolean }> = ({ professional, isActive }) => {
  const cardVariants = {
    enter: {
      x: 300,
      opacity: 0,
      scale: 0.95
    },
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    },
    exit: {
      x: -300,
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.6,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    }
  }

  const metricVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.4
      }
    })
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="enter"
      animate="center"
      exit="exit"
      className="absolute inset-0 w-full"
    >
      <div className="bg-white/90 backdrop-blur-md border border-gray-100 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 h-full">
        {/* Header with photo and basic info */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Image
                src={professional.photo}
                alt={professional.name}
                width={56}
                height={56}
                className="rounded-full object-cover ring-2 ring-white shadow-lg"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">{professional.name}</h3>
              <p className="text-sm text-gray-600">{professional.role}</p>
            </div>
          </div>
          {professional.available && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"
            >
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              DISPONÍVEL HOJE
            </motion.div>
          )}
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <motion.div
            custom={0}
            variants={metricVariants}
            initial="hidden"
            animate="visible"
            className="text-center p-2 bg-gray-50 rounded-xl"
          >
            <div className="flex items-center justify-center gap-1">
              <span className="text-yellow-500 text-sm">★</span>
              <span className="font-bold text-gray-900">{professional.rating}</span>
            </div>
            <p className="text-xs text-gray-600 mt-1">Avaliação</p>
          </motion.div>
          
          <motion.div
            custom={1}
            variants={metricVariants}
            initial="hidden"
            animate="visible"
            className="text-center p-2 bg-gray-50 rounded-xl"
          >
            <p className="font-bold text-gray-900">{professional.jobsCompleted}</p>
            <p className="text-xs text-gray-600 mt-1">Trabalhos</p>
          </motion.div>
          
          <motion.div
            custom={2}
            variants={metricVariants}
            initial="hidden"
            animate="visible"
            className="text-center p-2 bg-gray-50 rounded-xl"
          >
            <p className="font-bold text-gray-900">{professional.onTimeRate}%</p>
            <p className="text-xs text-gray-600 mt-1">Pontualidade</p>
          </motion.div>
        </div>

        {/* Verified Badge */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-2 mb-4"
        >
          <div className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Verificado
          </div>
          {professional.specialty && (
            <div className="bg-amber-100 text-amber-700 px-3 py-1.5 rounded-lg text-xs font-bold">
              {professional.specialty}
            </div>
          )}
        </motion.div>

        {/* Specialties/Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {professional.badges.map((badge, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-lg text-xs font-medium"
            >
              {badge}
            </motion.span>
          ))}
        </div>

        {/* Testimonial Quote */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="border-t pt-3"
        >
          <p className="text-sm text-gray-600 italic leading-relaxed">
            "{professional.testimonial}"
          </p>
          <p className="text-xs text-gray-500 mt-2">— Último empregador</p>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function HeroInstawork() {
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Auto-rotate profiles
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentProfileIndex((prev) => (prev + 1) % professionals.length)
      }, 4000) // Change every 4 seconds

      return () => clearInterval(interval)
    }
  }, [isPaused])

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-freela/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-empresa/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 lg:py-32">
        <div className="grid lg:grid-cols-[60%_40%] gap-12 items-center">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-gray-100"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-sm font-medium text-gray-700">Conecte-se em minutos</span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight"
            >
              <span className="text-gray-900">Staffing </span>
              <span className="text-freela">reinventado</span>
              <span className="text-gray-900">:</span>
              <br />
              <span className="text-gray-900">Inteligência artificial,</span>
              <br />
              <span className="text-gray-900">verificação humana</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg text-gray-600 leading-relaxed max-w-xl"
            >
              A plataforma mais completa para conectar profissionais qualificados 
              de hospitalidade com as melhores oportunidades. Tecnologia e 
              confiança em cada conexão.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/cadastro"
                className="px-8 py-4 bg-gradient-to-r from-freela to-freela-600 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-center"
              >
                Cadastre-se
              </Link>
              <Link
                href="/demo"
                className="px-8 py-4 bg-white border-2 border-empresa text-empresa rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 hover:bg-empresa hover:text-white transition-all duration-300 text-center"
              >
                Agende uma Demo
              </Link>
            </motion.div>

            {/* Secondary Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Link
                href="/para-profissionais"
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-freela transition-colors duration-300 group"
              >
                Procurando trabalho?
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Side - Animated Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative h-[500px] lg:h-[600px]"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Card Container */}
            <div className="relative w-full h-full">
              <AnimatePresence mode="wait">
                <ProfessionalCard
                  key={professionals[currentProfileIndex].id}
                  professional={professionals[currentProfileIndex]}
                  isActive={true}
                />
              </AnimatePresence>
            </div>

            {/* Navigation Dots */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
              {professionals.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentProfileIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentProfileIndex
                      ? 'w-8 bg-freela'
                      : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Ver profissional ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}