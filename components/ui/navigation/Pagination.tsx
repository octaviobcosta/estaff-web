'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'

/**
 * Pagination component props interface
 */
export interface PaginationProps {
  /** Current page */
  currentPage: number
  /** Total pages */
  totalPages: number
  /** Page change handler */
  onPageChange: (page: number) => void
  /** Number of visible page buttons */
  siblingCount?: number
  /** Show first/last buttons */
  showFirstLast?: boolean
  /** Variant by brand */
  variant?: 'freela' | 'empresa' | 'institucional' | 'default'
  /** Size */
  size?: 'sm' | 'md' | 'lg'
  /** Custom className */
  className?: string
}

/**
 * Premium Pagination component with numbers and arrows
 * 
 * @example
 * <Pagination
 *   currentPage={3}
 *   totalPages={10}
 *   onPageChange={(page) => console.log(page)}
 *   variant="freela"
 * />
 */
export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  showFirstLast = true,
  variant = 'default',
  size = 'md',
  className
}) => {
  // Generate page numbers array
  const range = (start: number, end: number) => {
    const length = end - start + 1
    return Array.from({ length }, (_, idx) => idx + start)
  }

  const generatePagination = () => {
    const totalNumbers = siblingCount * 2 + 3
    const totalBlocks = totalNumbers + 2

    if (totalPages <= totalBlocks) {
      return range(1, totalPages)
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages)

    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount
      const leftRange = range(1, leftItemCount)
      return [...leftRange, 'dots', totalPages]
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount
      const rightRange = range(totalPages - rightItemCount + 1, totalPages)
      return [1, 'dots', ...rightRange]
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex)
      return [1, 'dots', ...middleRange, 'dots', totalPages]
    }

    return []
  }

  const pages = generatePagination()

  const sizeClasses = {
    sm: 'h-8 min-w-[32px] px-2 text-sm',
    md: 'h-10 min-w-[40px] px-3 text-base',
    lg: 'h-12 min-w-[48px] px-4 text-lg'
  }

  const variantClasses = {
    freela: {
      active: 'bg-freela-500 text-white border-freela-500',
      hover: 'hover:bg-freela-50 hover:border-freela-300',
      focus: 'focus:ring-freela-500'
    },
    empresa: {
      active: 'bg-empresa-500 text-white border-empresa-500',
      hover: 'hover:bg-empresa-50 hover:border-empresa-300',
      focus: 'focus:ring-empresa-500'
    },
    institucional: {
      active: 'bg-institucional-500 text-white border-institucional-500',
      hover: 'hover:bg-institucional-50 hover:border-institucional-300',
      focus: 'focus:ring-institucional-500'
    },
    default: {
      active: 'bg-gray-900 text-white border-gray-900',
      hover: 'hover:bg-gray-50 hover:border-gray-300',
      focus: 'focus:ring-gray-500'
    }
  }

  const buttonClasses = cn(
    'inline-flex items-center justify-center rounded-md border border-gray-200',
    'font-medium transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    sizeClasses[size],
    variantClasses[variant].hover,
    variantClasses[variant].focus
  )

  return (
    <nav aria-label="Pagination" className={cn('flex items-center gap-1', className)}>
      {/* First button */}
      {showFirstLast && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className={cn(
            buttonClasses,
            currentPage === 1 && 'opacity-50 cursor-not-allowed'
          )}
          aria-label="First page"
        >
          <ChevronLeft className="w-4 h-4" />
          <ChevronLeft className="w-4 h-4 -ml-2" />
        </motion.button>
      )}

      {/* Previous button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          buttonClasses,
          currentPage === 1 && 'opacity-50 cursor-not-allowed'
        )}
        aria-label="Previous page"
      >
        <ChevronLeft className="w-4 h-4" />
      </motion.button>

      {/* Page numbers */}
      {pages.map((page, index) => {
        if (page === 'dots') {
          return (
            <span
              key={`dots-${index}`}
              className="inline-flex items-center justify-center px-2 text-gray-400"
            >
              <MoreHorizontal className="w-4 h-4" />
            </span>
          )
        }

        const pageNumber = page as number
        const isActive = pageNumber === currentPage

        return (
          <motion.button
            key={pageNumber}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onPageChange(pageNumber)}
            className={cn(
              buttonClasses,
              isActive && variantClasses[variant].active
            )}
            aria-label={`Page ${pageNumber}`}
            aria-current={isActive ? 'page' : undefined}
          >
            {pageNumber}
          </motion.button>
        )
      })}

      {/* Next button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          buttonClasses,
          currentPage === totalPages && 'opacity-50 cursor-not-allowed'
        )}
        aria-label="Next page"
      >
        <ChevronRight className="w-4 h-4" />
      </motion.button>

      {/* Last button */}
      {showFirstLast && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={cn(
            buttonClasses,
            currentPage === totalPages && 'opacity-50 cursor-not-allowed'
          )}
          aria-label="Last page"
        >
          <ChevronRight className="w-4 h-4" />
          <ChevronRight className="w-4 h-4 -ml-2" />
        </motion.button>
      )}
    </nav>
  )
}

Pagination.displayName = 'Pagination'