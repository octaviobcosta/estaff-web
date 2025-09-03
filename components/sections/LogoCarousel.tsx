'use client'

import { motion } from 'framer-motion'
import { useRef } from 'react'
import './LogoCarousel.css'

// Reimport CommunitySection as the default export
import CommunitySection from './CommunitySection'

// Legacy LogoCarousel kept for compatibility
const LogoCarousel = CommunitySection

export default LogoCarousel
export { CommunitySection }
