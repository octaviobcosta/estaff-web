'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { clsx } from 'clsx'

interface Testimonial {
  id: string
  name: string
  role: string
  company?: string
  avatar?: string
  content: string
  rating?: number
  type?: 'freela' | 'empresa'
}

interface TestimonialsProps {
  title?: string
  subtitle?: string
  testimonials: Testimonial[]
  autoPlay?: boolean
  interval?: number
  variant?: 'carousel' | 'grid' | 'masonry'
}

export default function Testimonials({
  title = "O que dizem sobre nós",
  subtitle = "Depoimentos",
  testimonials,
  autoPlay = true,
  interval = 5000,
  variant = 'carousel'
}: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (autoPlay && variant === 'carousel') {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
      }, interval)

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
        }
      }
    }
  }, [autoPlay, interval, testimonials.length, variant])

  const handlePrevious = () => {
    setCurrentIndex((prev) => prev === 0 ? testimonials.length - 1 : prev - 1)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const handleDotClick = (index: number) => {
    setCurrentIndex(index)
  }

  if (variant === 'grid') {
    return <TestimonialsGrid title={title} subtitle={subtitle} testimonials={testimonials} />
  }

  if (variant === 'masonry') {
    return <TestimonialsMasonry title={title} subtitle={subtitle} testimonials={testimonials} />
  }

  // Default Carousel variant
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-freela uppercase tracking-wider">
            {subtitle}
          </span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-gray-900">
            {title}
          </h2>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Testimonials */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="relative"
            >
              <TestimonialCard testimonial={testimonials[currentIndex]} featured />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-freela hover:shadow-xl transition-all group"
          >
            <svg
              className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-freela hover:shadow-xl transition-all group"
          >
            <svg
              className="w-6 h-6 group-hover:translate-x-0.5 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={clsx(
                  'transition-all duration-300',
                  index === currentIndex
                    ? 'w-8 h-2 bg-gradient-to-r from-freela to-empresa rounded-full'
                    : 'w-2 h-2 bg-gray-300 rounded-full hover:bg-gray-400'
                )}
              />
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 flex flex-wrap justify-center items-center gap-8"
        >
          <div className="flex items-center space-x-2 text-gray-600">
            <span className="text-3xl font-bold gradient-text">4.9</span>
            <div>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm">+10.000 avaliações</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Individual Testimonial Card Component
interface TestimonialCardProps {
  testimonial: Testimonial
  featured?: boolean
  delay?: number
}

function TestimonialCard({ testimonial, featured = false, delay = 0 }: TestimonialCardProps) {
  const typeColors = {
    freela: 'from-freela-50 to-freela-100 border-freela-200',
    empresa: 'from-empresa-50 to-empresa-100 border-empresa-200'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={clsx(
        'relative p-8 rounded-3xl',
        featured
          ? 'bg-white shadow-2xl'
          : 'bg-gradient-to-br ' + (testimonial.type ? typeColors[testimonial.type] : 'from-gray-50 to-gray-100') + ' border'
      )}
    >
      {/* Quote Icon */}
      <div className="absolute top-6 left-6 text-6xl text-gray-200 opacity-50">
        "
      </div>

      {/* Rating */}
      {testimonial.rating && (
        <div className="flex mb-4">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={clsx(
                'w-5 h-5',
                i < (testimonial.rating || 5) ? 'text-yellow-400 fill-current' : 'text-gray-300'
              )}
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      )}

      {/* Content */}
      <p className={clsx(
        'mb-6 relative z-10',
        featured ? 'text-lg text-gray-700' : 'text-gray-600'
      )}>
        {testimonial.content}
      </p>

      {/* Author */}
      <div className="flex items-center">
        {testimonial.avatar ? (
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            className="w-12 h-12 rounded-full mr-4 object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-freela to-empresa mr-4 flex items-center justify-center text-white font-bold">
            {testimonial.name.charAt(0).toUpperCase()}
          </div>
        )}
        <div>
          <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
          <p className="text-sm text-gray-600">
            {testimonial.role}
            {testimonial.company && ` • ${testimonial.company}`}
          </p>
        </div>
      </div>

      {/* Type Badge */}
      {testimonial.type && (
        <div className="absolute top-6 right-6">
          <span className={clsx(
            'px-3 py-1 rounded-full text-xs font-semibold',
            testimonial.type === 'freela'
              ? 'bg-freela text-white'
              : 'bg-empresa text-white'
          )}>
            {testimonial.type === 'freela' ? 'Freelancer' : 'Empresa'}
          </span>
        </div>
      )}
    </motion.div>
  )
}

// Grid Layout
function TestimonialsGrid({ title, subtitle, testimonials }: TestimonialsProps) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-freela uppercase tracking-wider">
            {subtitle}
          </span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-gray-900">
            {title}
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// Masonry Layout
function TestimonialsMasonry({ title, subtitle, testimonials }: TestimonialsProps) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-freela uppercase tracking-wider">
            {subtitle}
          </span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-gray-900">
            {title}
          </h2>
        </motion.div>

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.id} className="break-inside-avoid">
              <TestimonialCard
                testimonial={testimonial}
                delay={index * 0.1}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}