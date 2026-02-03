'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ReactNode } from 'react'
import { pageVariants, pageVariantsReduced } from '@/lib/motion'

interface PageTransitionProps {
  children: ReactNode
  className?: string
}

export default function PageTransition({ children, className = '' }: PageTransitionProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial="initial"
      animate="enter"
      exit="exit"
      variants={prefersReducedMotion ? pageVariantsReduced : pageVariants}
    >
      {children}
    </motion.div>
  )
}
