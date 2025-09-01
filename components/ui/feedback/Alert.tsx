'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from 'lucide-react'

/**
 * Alert types
 */
export type AlertType = 'success' | 'error' | 'warning' | 'info'

/**
 * Alert component props interface
 */
export interface AlertProps {
  /** Alert type */
  type?: AlertType
  /** Alert title */
  title?: string
  /** Alert description */
  description?: string
  /** Dismissible alert */
  dismissible?: boolean
  /** Close handler */
  onClose?: () => void
  /** Custom icon */
  icon?: React.ReactNode
  /** Compact mode */
  compact?: boolean
  /** Children content */
  children?: React.ReactNode
}

/**
 * Premium Alert component with inline feedback and icons
 * 
 * @example
 * <Alert
 *   type="warning"
 *   title="Atenção"
 *   description="Verifique os dados antes de continuar"
 *   dismissible
 * />
 */
export const Alert: React.FC<AlertProps> = ({
  type = 'info',
  title,
  description,
  dismissible = false,
  onClose,
  icon,
  compact = false,
  children
}) => {
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
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={cn(
        'relative flex items-start gap-3 rounded-lg border',
        compact ? 'p-3' : 'p-4',
        typeClasses[type]
      )}
    >
      <div className={cn('flex-shrink-0', compact ? 'mt-0' : 'mt-0.5', iconClasses[type])}>
        {icon || icons[type]}
      </div>

      <div className="flex-1">
        {title && (
          <h3 className={cn('font-semibold', compact ? 'text-sm' : 'text-base')}>
            {title}
          </h3>
        )}
        {description && (
          <p className={cn(
            title ? 'mt-1' : '',
            compact ? 'text-sm' : 'text-base',
            'opacity-90'
          )}>
            {description}
          </p>
        )}
        {children && (
          <div className={cn(
            (title || description) ? 'mt-2' : '',
            compact ? 'text-sm' : 'text-base'
          )}>
            {children}
          </div>
        )}
      </div>

      {dismissible && onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 ml-2 text-current opacity-60 hover:opacity-100 transition-opacity"
        >
          <X className={compact ? 'w-4 h-4' : 'w-5 h-5'} />
        </button>
      )}
    </motion.div>
  )
}

Alert.displayName = 'Alert'