'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import ProfileCards from '@/components/ui/ProfileCards'

export default function HeroInstawork() {
  const [showDebug, setShowDebug] = useState(false)

  return (
    <section className="relative min-h-[50vh] lg:min-h-[55vh] bg-gradient-to-b from-gray-50 to-white" style={showDebug ? { outline: '2px solid red', position: 'relative' } : {}}>
      {/* Debug Info */}
      {showDebug && (
        <div className="absolute top-2 left-2 z-50 bg-black/80 text-white p-2 rounded text-xs font-mono">
          <div>Section: Hero</div>
          <div>min-h-[50vh] lg:min-h-[55vh]</div>
        </div>
      )}
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-freela/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-empresa/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-4 pb-2 lg:pt-8 lg:pb-4" style={showDebug ? { outline: '2px solid blue' } : {}}>
        {/* Container Debug */}
        {showDebug && (
          <div className="absolute top-2 right-2 z-50 bg-blue-600/80 text-white p-2 rounded text-xs font-mono">
            <div>Container: max-w-7xl</div>
            <div>pt-4 pb-6 lg:pt-8 lg:pb-10</div>
          </div>
        )}
        <div className="grid lg:grid-cols-[50%_50%] gap-4 items-center" style={showDebug ? { outline: '2px solid green' } : {}}>
          {/* Grid Debug */}
          {showDebug && (
            <div className="absolute bottom-2 left-2 z-50 bg-green-600/80 text-white p-2 rounded text-xs font-mono">
              <div>Grid: 50% + 50%</div>
              <div>gap-4</div>
            </div>
          )}
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
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
              <span className="text-sm font-medium text-gray-700">Profissionais qualificados em minutos</span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight"
            >
              <span className="text-gray-900">Conectando quem</span>
              <br />
              <span className="text-gray-900">faz a </span>
              <span className="text-freela">hospitalidade</span>
              <br />
              <span className="text-gray-900">acontecer</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg text-gray-600 leading-relaxed max-w-xl"
            >
              A plataforma mais completa para aproximar profissionais qualificados 
              de hospitalidade às melhores oportunidades. Tecnologia e 
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
              <div className="space-y-1">
                <Link
                  href="/para-profissionais"
                  className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-freela transition-colors duration-300 group"
                >
                  Procurando trabalho?
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </Link>
                <p className="text-xs text-freela font-medium">
                  Vagas para Bares, Restaurantes, Eventos e Hotéis
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Spectacular ProfileCards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative w-full h-[460px] overflow-visible pl-6"
          >
            <ProfileCards className="w-full h-full" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}