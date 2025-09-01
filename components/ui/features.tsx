'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, ReactNode } from 'react'
import { FeatureCard } from './card'
import { clsx } from 'clsx'

interface Feature {
  icon: ReactNode
  title: string
  description: string
  features?: string[]
  highlight?: boolean
}

interface FeaturesProps {
  title?: string
  subtitle?: string
  description?: string
  features: Feature[]
  columns?: 2 | 3 | 4
  variant?: 'grid' | 'bento' | 'alternating' | 'centered'
}

export default function Features({
  title = "Recursos Poderosos",
  subtitle = "Tudo que você precisa",
  description = "Nossa plataforma oferece ferramentas avançadas para conectar talentos e oportunidades de forma eficiente.",
  features,
  columns = 3,
  variant = 'grid'
}: FeaturesProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0
    }
  }

  if (variant === 'bento') {
    return <BentoFeatures title={title} subtitle={subtitle} description={description} features={features} />
  }

  if (variant === 'alternating') {
    return <AlternatingFeatures title={title} subtitle={subtitle} description={description} features={features} />
  }

  if (variant === 'centered') {
    return <CenteredFeatures title={title} subtitle={subtitle} description={description} features={features} />
  }

  // Default Grid Layout
  return (
    <section ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-freela uppercase tracking-wider">
            {subtitle}
          </span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-gray-900">
            {title}
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            {description}
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className={clsx(
            'grid gap-6 lg:gap-8',
            columns === 2 && 'md:grid-cols-2',
            columns === 3 && 'md:grid-cols-2 lg:grid-cols-3',
            columns === 4 && 'md:grid-cols-2 lg:grid-cols-4'
          )}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                features={feature.features}
                highlight={feature.highlight}
                delay={index * 0.1}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// Bento Grid Layout
function BentoFeatures({ title, subtitle, description, features }: FeaturesProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-freela uppercase tracking-wider">
            {subtitle}
          </span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-gray-900">
            {title}
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            {description}
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:grid-rows-2">
          {features.map((feature, index) => {
            const isLarge = index === 0 || index === 3
            const gridClass = isLarge ? 'md:col-span-2' : 'md:col-span-1'
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={clsx(gridClass, 'group')}
              >
                <div className="h-full bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 relative overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0 bg-gradient-to-br from-freela to-empresa" />
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-14 h-14 rounded-2xl bg-gradient-to-br from-freela/10 to-empresa/10 flex items-center justify-center mb-6 text-freela"
                    >
                      {feature.icon}
                    </motion.div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {feature.description}
                    </p>
                    {feature.features && (
                      <ul className="space-y-2">
                        {feature.features.map((item, i) => (
                          <li key={i} className="flex items-center text-sm text-gray-500">
                            <svg className="w-4 h-4 mr-2 text-freela" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  
                  {/* Hover Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-freela/5 to-empresa/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// Alternating Layout
function AlternatingFeatures({ title, subtitle, description, features }: FeaturesProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-sm font-semibold text-freela uppercase tracking-wider">
            {subtitle}
          </span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-gray-900">
            {title}
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            {description}
          </p>
        </motion.div>

        {/* Alternating Features */}
        <div className="space-y-24">
          {features.map((feature, index) => {
            const isEven = index % 2 === 0
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={clsx(
                  'flex flex-col lg:flex-row items-center gap-12',
                  !isEven && 'lg:flex-row-reverse'
                )}
              >
                {/* Image/Icon Side */}
                <div className="flex-1">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative"
                  >
                    <div className="w-full h-80 bg-gradient-to-br from-freela/10 to-empresa/10 rounded-3xl flex items-center justify-center">
                      <motion.div
                        animate={{ 
                          rotate: [0, 5, -5, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          duration: 4,
                          repeat: Infinity,
                          repeatType: 'reverse'
                        }}
                        className="text-8xl text-freela"
                      >
                        {feature.icon}
                      </motion.div>
                    </div>
                    {/* Floating Elements */}
                    <motion.div
                      animate={{ y: [-10, 10, -10] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute -top-4 -right-4 w-20 h-20 bg-institucional-300 rounded-full opacity-50"
                    />
                    <motion.div
                      animate={{ y: [10, -10, 10] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="absolute -bottom-6 -left-6 w-28 h-28 bg-freela-300 rounded-full opacity-30"
                    />
                  </motion.div>
                </div>

                {/* Content Side */}
                <div className="flex-1 space-y-6">
                  <div>
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-lg text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                  
                  {feature.features && (
                    <ul className="space-y-3">
                      {feature.features.map((item, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: index * 0.2 + i * 0.1 }}
                          className="flex items-start"
                        >
                          <svg className="w-6 h-6 mr-3 text-freela flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-700">{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  )}
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-freela to-empresa text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                  >
                    Saiba mais
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.button>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// Centered Layout
function CenteredFeatures({ title, subtitle, description, features }: FeaturesProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-freela uppercase tracking-wider">
            {subtitle}
          </span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-gray-900">
            {title}
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            {description}
          </p>
        </motion.div>

        {/* Centered Features */}
        <div className="space-y-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-freela/10 to-empresa/10 flex items-center justify-center text-freela"
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}