'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { fadeUpVariants, fadeVariantsReduced, viewportOnce } from '@/lib/motion'
import { ReactNode } from 'react'

interface SectionProps {
  children: ReactNode
  className?: string
  id?: string
  background?: 'default' | 'darker' | 'gradient' | 'glow'
  size?: 'default' | 'small' | 'large'
  container?: 'default' | 'narrow' | 'full'
}

export default function Section({
  children,
  className = '',
  id,
  background = 'default',
  size = 'default',
  container = 'default',
}: SectionProps) {
  const prefersReducedMotion = useReducedMotion()

  const bgClass = {
    default: 'bg-dark-950',
    darker: 'bg-dark-900',
    gradient: 'bg-gradient-to-b from-dark-900 to-dark-950',
    glow: 'bg-dark-950 relative overflow-hidden',
  }[background]

  const paddingClass = {
    default: 'section-padding',
    small: 'section-padding-sm',
    large: 'py-32 md:py-40 lg:py-48',
  }[size]

  const containerClass = {
    default: 'container-main',
    narrow: 'container-narrow',
    full: 'w-full px-6 md:px-8',
  }[container]

  return (
    <motion.section
      id={id}
      className={`${bgClass} ${paddingClass} ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={prefersReducedMotion ? fadeVariantsReduced : fadeUpVariants}
    >
      {/* Glow effect for glow background */}
      {background === 'glow' && (
        <>
          <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-600/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-1/3 right-1/4 translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-secondary-500/10 rounded-full blur-[100px] pointer-events-none" />
        </>
      )}
      <div className={`${containerClass} relative`}>
        {children}
      </div>
    </motion.section>
  )
}

// Section header
interface SectionHeaderProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  gradient?: boolean
  className?: string
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  gradient = false,
  className = '',
}: SectionHeaderProps) {
  const prefersReducedMotion = useReducedMotion()

  const alignClass = align === 'center' ? 'text-center mx-auto' : ''

  return (
    <motion.div
      className={`max-w-2xl mb-16 md:mb-20 ${alignClass} ${className}`}
      variants={prefersReducedMotion ? fadeVariantsReduced : fadeUpVariants}
    >
      {eyebrow && (
        <motion.span
          className="inline-block badge-accent mb-4"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {eyebrow}
        </motion.span>
      )}
      <h2 className={`heading-2 ${gradient ? 'text-gradient' : ''}`}>
        {title}
      </h2>
      {description && (
        <p className="body-large mt-5">{description}</p>
      )}
    </motion.div>
  )
}
