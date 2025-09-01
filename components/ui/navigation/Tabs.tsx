'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Tab item interface
 */
export interface TabItem {
  id: string
  label: string
  content: React.ReactNode
  disabled?: boolean
  icon?: React.ReactNode
}

/**
 * Tabs component props interface
 */
export interface TabsProps {
  /** Tabs array */
  tabs: TabItem[]
  /** Default active tab */
  defaultTab?: string
  /** Controlled active tab */
  activeTab?: string
  /** Tab change handler */
  onChange?: (tabId: string) => void
  /** Variant by brand */
  variant?: 'freela' | 'empresa' | 'institucional' | 'default'
  /** Tab style */
  style?: 'underline' | 'pills' | 'bordered'
  /** Full width tabs */
  fullWidth?: boolean
  /** Custom className */
  className?: string
}

/**
 * Premium Tabs component with animated indicator
 * 
 * @example
 * <Tabs
 *   tabs={[
 *     { id: 'tab1', label: 'Perfil', content: <ProfileContent /> },
 *     { id: 'tab2', label: 'Configurações', content: <SettingsContent /> }
 *   ]}
 *   variant="freela"
 *   style="underline"
 * />
 */
export const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultTab,
  activeTab: controlledActiveTab,
  onChange,
  variant = 'default',
  style = 'underline',
  fullWidth = false,
  className
}) => {
  const [internalActiveTab, setInternalActiveTab] = React.useState(
    defaultTab || tabs[0]?.id
  )

  const activeTabId = controlledActiveTab || internalActiveTab

  const handleTabChange = (tabId: string) => {
    if (!controlledActiveTab) {
      setInternalActiveTab(tabId)
    }
    onChange?.(tabId)
  }

  const variantClasses = {
    freela: {
      active: 'text-freela-600',
      indicator: 'bg-freela-500',
      pills: 'bg-freela-500 text-white',
      bordered: 'border-freela-500 text-freela-600'
    },
    empresa: {
      active: 'text-empresa-600',
      indicator: 'bg-empresa-500',
      pills: 'bg-empresa-500 text-white',
      bordered: 'border-empresa-500 text-empresa-600'
    },
    institucional: {
      active: 'text-institucional-600',
      indicator: 'bg-institucional-500',
      pills: 'bg-institucional-500 text-white',
      bordered: 'border-institucional-500 text-institucional-600'
    },
    default: {
      active: 'text-gray-900',
      indicator: 'bg-gray-900',
      pills: 'bg-gray-900 text-white',
      bordered: 'border-gray-900 text-gray-900'
    }
  }

  const styleClasses = {
    underline: 'border-b border-gray-200',
    pills: 'bg-gray-100 p-1 rounded-lg',
    bordered: 'border border-gray-200 rounded-lg p-1'
  }

  const activeTab = tabs.find(tab => tab.id === activeTabId)

  return (
    <div className={className}>
      {/* Tab Headers */}
      <div className={cn(
        'relative',
        styleClasses[style],
        fullWidth && 'w-full'
      )}>
        <div className={cn(
          'flex',
          style === 'underline' && 'gap-6',
          style === 'pills' && 'gap-1',
          style === 'bordered' && 'gap-1',
          fullWidth && 'justify-between'
        )}>
          {tabs.map((tab) => {
            const isActive = tab.id === activeTabId
            
            return (
              <button
                key={tab.id}
                onClick={() => !tab.disabled && handleTabChange(tab.id)}
                disabled={tab.disabled}
                className={cn(
                  'relative px-4 py-2 font-medium text-sm transition-all duration-200',
                  'focus:outline-none focus:ring-2 focus:ring-offset-2 rounded',
                  fullWidth && 'flex-1',
                  
                  // Style specific classes
                  style === 'underline' && [
                    isActive ? variantClasses[variant].active : 'text-gray-500 hover:text-gray-700',
                    tab.disabled && 'opacity-50 cursor-not-allowed'
                  ],
                  
                  style === 'pills' && [
                    'rounded-md',
                    isActive ? variantClasses[variant].pills : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200',
                    tab.disabled && 'opacity-50 cursor-not-allowed'
                  ],
                  
                  style === 'bordered' && [
                    'rounded-md border-2',
                    isActive ? variantClasses[variant].bordered : 'border-transparent text-gray-600 hover:text-gray-900',
                    tab.disabled && 'opacity-50 cursor-not-allowed'
                  ]
                )}
              >
                <span className="flex items-center gap-2">
                  {tab.icon}
                  {tab.label}
                </span>
                
                {/* Animated indicator for underline style */}
                {style === 'underline' && isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className={cn(
                      'absolute bottom-0 left-0 right-0 h-0.5',
                      variantClasses[variant].indicator
                    )}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  />
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTabId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {activeTab?.content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

Tabs.displayName = 'Tabs'