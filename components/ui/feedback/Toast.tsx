'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'

/**
 * Toast types
 */
export type ToastType = 'success' | 'error' | 'warning' | 'info'

/**
 * Toast positions
 */
export type ToastPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'

/**
 * Toast component props interface
 */
export interface ToastProps {
  /** Unique ID */
  id: string
  /** Toast type */
  type?: ToastType
  /** Toast title */
  title: string
  /** Toast description */
  description?: string
  /** Duration in ms (0 for persistent) */
  duration?: number
  /** Close handler */
  onClose?: () => void
  /** Action button */
  action?: {
    label: string
    onClick: () => void
  }
}

/**
 * Premium Toast component with multiple types and smooth animations
 * 
 * @example
 * <Toast
 *   type="success"
 *   title="Sucesso!"
 *   description="Operação realizada com sucesso"
 *   duration={5000}
 * />
 */
export const Toast: React.FC<ToastProps> = ({
  type = 'info',
  title,
  description,
  duration = 5000,
  onClose,
  action
}) => {
  React.useEffect(() => {
    if (duration > 0 && onClose) {
      const timer = setTimeout(onClose, duration)
      return () => clearTimeout(timer)
    }
  }, [duration, onClose])

  const icons = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <AlertCircle className="w-5 h-5" />,
    warning: <AlertTriangle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />
  }

  const typeClasses = {
    success: 'bg-green-50 text-green-900 border-green-200',
    error: 'bg-red-50 text-red-900 border-red-200',
    warning: 'bg-amber-50 text-amber-900 border-amber-200',
    info: 'bg-blue-50 text-blue-900 border-blue-200'
  }

  const iconClasses = {
    success: 'text-green-500',
    error: 'text-red-500',
    warning: 'text-amber-500',
    info: 'text-blue-500'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={cn(
        'relative flex items-start gap-3 p-4 rounded-lg border shadow-lg backdrop-blur-sm',
        'min-w-[320px] max-w-[420px]',
        typeClasses[type]
      )}
    >
      <div className={cn('flex-shrink-0 mt-0.5', iconClasses[type])}>
        {icons[type]}
      </div>

      <div className="flex-1">
        <h3 className="font-semibold text-sm">{title}</h3>
        {description && (
          <p className="mt-1 text-sm opacity-90">{description}</p>
        )}
        {action && (
          <button
            onClick={action.onClick}
            className="mt-2 text-sm font-medium underline hover:no-underline transition-all"
          >
            {action.label}
          </button>
        )}
      </div>

      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 ml-2 text-current opacity-60 hover:opacity-100 transition-opacity"
        >
          <X className="w-4 h-4" />
        </button>
      )}

      {duration > 0 && (
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-current opacity-20"
          initial={{ width: '100%' }}
          animate={{ width: '0%' }}
          transition={{ duration: duration / 1000, ease: 'linear' }}
        />
      )}
    </motion.div>
  )
}

/**
 * Toast Container component for managing multiple toasts
 */
export interface ToastContainerProps {
  /** Toast position */
  position?: ToastPosition
  /** Toasts array */
  toasts: ToastProps[]
  /** Remove toast handler */
  onRemove: (id: string) => void
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  position = 'top-right',
  toasts,
  onRemove
}) => {
  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
    'bottom-right': 'bottom-4 right-4'
  }

  const isBottom = position.includes('bottom')

  return (
    <div className={cn(
      'fixed z-50 pointer-events-none',
      positionClasses[position]
    )}>
      <div className={cn(
        'flex flex-col gap-3 pointer-events-auto',
        isBottom && 'flex-col-reverse'
      )}>
        <AnimatePresence mode="sync">
          {toasts.map(toast => (
            <Toast
              key={toast.id}
              {...toast}
              onClose={() => onRemove(toast.id)}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

Toast.displayName = 'Toast'
ToastContainer.displayName = 'ToastContainer'