'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import ProfileCards from '@/components/ui/ProfileCards'

export default function HeroInstawork() {

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-freela/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-empresa/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-8 pb-20 lg:pt-12 lg:pb-32">
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

          {/* Right Side - Spectacular ProfileCards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative h-[500px] lg:h-[600px]"
            style={{ overflow: 'visible' }}
          >
            <ProfileCards 
              containerWidth={500} 
              containerHeight={600} 
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}