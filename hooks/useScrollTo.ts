'use client'

import { useCallback } from 'react'

export function useScrollTo() {
  const scrollTo = useCallback((elementId: string, offset: number = 0) => {
    const element = document.querySelector(elementId)
    if (element) {
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }, [])

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [])

  return { scrollTo, scrollToTop }
}

// Hook for handling anchor links with smooth scroll
export function useSmoothScroll() {
  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute('href')
    
    if (href && href.startsWith('#')) {
      e.preventDefault()
      const targetId = href.substring(1)
      const element = document.getElementById(targetId)
      
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    }
  }, [])

  return { handleClick }
}