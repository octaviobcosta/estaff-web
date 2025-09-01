'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { clsx } from 'clsx'

interface PricingFeature {
  text: string
  included: boolean
}

interface PricingPlan {
  name: string
  description: string
  price: string | number
  period?: string
  features: PricingFeature[] | string[]
  highlighted?: boolean
  badge?: string
  cta: {
    text: string
    href: string
  }
  variant?: 'freela' | 'empresa' | 'institucional'
}

interface PricingProps {
  title?: string
  subtitle?: string
  description?: string
  plans: PricingPlan[]
  billing?: 'monthly' | 'yearly' | 'both'
}

export default function Pricing({
  title = "Planos e Preços",
  subtitle = "Escolha o melhor para você",
  description = "Transparente, simples e justo. Sem taxas escondidas.",
  plans,
  billing = 'both'
}: PricingProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly')

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

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0
    }
  }

  return (
    <section ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-freela-200 rounded-full filter blur-3xl opacity-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-empresa-200 rounded-full filter blur-3xl opacity-20" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
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

        {/* Billing Toggle */}
        {billing === 'both' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center mb-12"
          >
            <div className="bg-gray-100 p-1 rounded-xl inline-flex">
              <button
                onClick={() => setBillingPeriod('monthly')}
                className={clsx(
                  'px-6 py-2 rounded-lg font-medium transition-all duration-300',
                  billingPeriod === 'monthly'
                    ? 'bg-white text-gray-900 shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                )}
              >
                Mensal
              </button>
              <button
                onClick={() => setBillingPeriod('yearly')}
                className={clsx(
                  'px-6 py-2 rounded-lg font-medium transition-all duration-300 relative',
                  billingPeriod === 'yearly'
                    ? 'bg-white text-gray-900 shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                )}
              >
                Anual
                <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-freela text-white text-xs rounded-full">
                  -20%
                </span>
              </button>
            </div>
          </motion.div>
        )}

        {/* Pricing Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="relative"
            >
              <PricingCard
                plan={plan}
                billingPeriod={billingPeriod}
                index={index}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 flex flex-wrap justify-center items-center gap-8 text-gray-400"
        >
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">Pagamento Seguro</span>
          </div>
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">Garantia de 30 dias</span>
          </div>
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">Suporte 24/7</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Individual Pricing Card Component
interface PricingCardProps {
  plan: PricingPlan
  billingPeriod: 'monthly' | 'yearly'
  index: number
}

function PricingCard({ plan, billingPeriod, index }: PricingCardProps) {
  const variantColors = {
    freela: 'from-freela-400 to-freela-600',
    empresa: 'from-empresa-700 to-empresa-900',
    institucional: 'from-institucional-300 to-institucional-500'
  }

  const isHighlighted = plan.highlighted

  return (
    <motion.div
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className={clsx(
        'relative h-full rounded-3xl p-8 transition-all duration-300',
        isHighlighted
          ? 'bg-gradient-to-br ' + (plan.variant ? variantColors[plan.variant] : variantColors.freela) + ' text-white shadow-2xl scale-105'
          : 'bg-white shadow-lg hover:shadow-xl'
      )}
    >
      {/* Badge */}
      {plan.badge && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 0.3 }}
          className="absolute -top-4 left-1/2 -translate-x-1/2"
        >
          <span className={clsx(
            'px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider',
            isHighlighted
              ? 'bg-white text-freela'
              : 'bg-gradient-to-r from-freela to-empresa text-white'
          )}>
            {plan.badge}
          </span>
        </motion.div>
      )}

      {/* Plan Name */}
      <div className="mb-6">
        <h3 className={clsx(
          'text-2xl font-bold mb-2',
          isHighlighted ? 'text-white' : 'text-gray-900'
        )}>
          {plan.name}
        </h3>
        <p className={clsx(
          'text-sm',
          isHighlighted ? 'text-white/90' : 'text-gray-600'
        )}>
          {plan.description}
        </p>
      </div>

      {/* Price */}
      <div className="mb-8">
        <div className="flex items-baseline">
          <span className={clsx(
            'text-5xl font-bold',
            isHighlighted ? 'text-white' : 'text-gray-900'
          )}>
            {typeof plan.price === 'number' 
              ? `R$ ${billingPeriod === 'yearly' ? Math.floor(plan.price * 0.8) : plan.price}`
              : plan.price
            }
          </span>
          {plan.period && (
            <span className={clsx(
              'ml-2',
              isHighlighted ? 'text-white/80' : 'text-gray-500'
            )}>
              /{billingPeriod === 'yearly' ? 'ano' : plan.period}
            </span>
          )}
        </div>
        {billingPeriod === 'yearly' && typeof plan.price === 'number' && (
          <p className={clsx(
            'text-sm mt-2',
            isHighlighted ? 'text-white/80' : 'text-gray-500'
          )}>
            Economia de R$ {Math.floor(plan.price * 12 * 0.2)}/ano
          </p>
        )}
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-8">
        {plan.features.map((feature, i) => {
          const isString = typeof feature === 'string'
          const text = isString ? feature : feature.text
          const included = isString ? true : feature.included
          
          return (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + i * 0.05 }}
              className={clsx(
                'flex items-start',
                !included && 'opacity-50'
              )}
            >
              {included ? (
                <svg 
                  className={clsx(
                    'w-5 h-5 mr-3 flex-shrink-0 mt-0.5',
                    isHighlighted ? 'text-white' : 'text-freela'
                  )}
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg 
                  className={clsx(
                    'w-5 h-5 mr-3 flex-shrink-0 mt-0.5',
                    isHighlighted ? 'text-white/50' : 'text-gray-400'
                  )}
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              )}
              <span className={clsx(
                'text-sm',
                isHighlighted ? 'text-white/90' : 'text-gray-600'
              )}>
                {text}
              </span>
            </motion.li>
          )
        })}
      </ul>

      {/* CTA Button */}
      <motion.a
        href={plan.cta.href}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={clsx(
          'block w-full py-3 px-6 text-center font-semibold rounded-xl transition-all duration-300',
          isHighlighted
            ? 'bg-white text-freela hover:bg-gray-50'
            : 'bg-gradient-to-r from-freela to-empresa text-white hover:shadow-lg'
        )}
      >
        {plan.cta.text}
      </motion.a>
    </motion.div>
  )
}