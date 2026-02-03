'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { cardVariants, fadeVariantsReduced, staggerContainerFast } from '@/lib/motion'
import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  interactive?: boolean
  glow?: boolean
}

export default function Card({
  children,
  className = '',
  interactive = false,
  glow = false,
}: CardProps) {
  const prefersReducedMotion = useReducedMotion()

  const baseClass = glow ? 'card-glow' : interactive ? 'card-interactive' : 'card'

  return (
    <motion.div
      className={`${baseClass} ${className}`}
      variants={prefersReducedMotion ? fadeVariantsReduced : cardVariants}
      whileHover={
        interactive && !prefersReducedMotion
          ? { y: -4, scale: 1.02, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }
          : undefined
      }
    >
      {children}
    </motion.div>
  )
}

// Card grid container
interface CardGridProps {
  children: ReactNode
  columns?: 2 | 3 | 4
  className?: string
}

export function CardGrid({
  children,
  columns = 3,
  className = '',
}: CardGridProps) {
  const prefersReducedMotion = useReducedMotion()

  const colsClass = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  }[columns]

  return (
    <motion.div
      className={`grid gap-6 ${colsClass} ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: prefersReducedMotion ? 0 : 0.08,
            delayChildren: prefersReducedMotion ? 0 : 0.1,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

// Feature card
interface FeatureCardProps {
  icon?: ReactNode
  title: string
  description: string
  items?: string[]
}

export function FeatureCard({
  icon,
  title,
  description,
  items,
}: FeatureCardProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      className="card-interactive group"
      variants={prefersReducedMotion ? fadeVariantsReduced : cardVariants}
    >
      {icon && (
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-600/20 to-secondary-500/20 border border-accent-500/20 flex items-center justify-center mb-5 text-accent-400 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
      )}
      <h3 className="heading-4 mb-3">{title}</h3>
      <p className="body-base">{description}</p>
      {items && items.length > 0 && (
        <ul className="mt-5 space-y-2">
          {items.map((item, i) => (
            <li key={i} className="text-sm text-dark-400 flex items-start gap-3">
              <span className="text-accent-500 mt-1.5 w-1 h-1 rounded-full bg-accent-500 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  )
}

// Comparison card (is/isn't)
interface ComparisonCardProps {
  type: 'is' | 'isnt'
  items: string[]
}

export function ComparisonCard({ type, items }: ComparisonCardProps) {
  const prefersReducedMotion = useReducedMotion()
  const isPositive = type === 'is'

  return (
    <motion.div
      className={`
        card overflow-hidden
        ${isPositive
          ? 'border-accent-500/30 bg-accent-600/5'
          : 'border-dark-600/50 bg-dark-800/30'
        }
      `}
      variants={prefersReducedMotion ? fadeVariantsReduced : cardVariants}
    >
      {/* Header bar */}
      <div className={`
        -mx-6 -mt-6 md:-mx-8 md:-mt-8 px-6 md:px-8 py-4 mb-6
        ${isPositive
          ? 'bg-gradient-to-r from-accent-600/20 to-transparent border-b border-accent-500/20'
          : 'bg-dark-800/50 border-b border-dark-700/50'
        }
      `}>
        <span className={`text-sm font-semibold ${isPositive ? 'text-accent-400' : 'text-dark-400'}`}>
          {isPositive ? 'This is' : 'This isn\'t'}
        </span>
      </div>

      <ul className="space-y-4">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-4">
            <span className={`mt-0.5 flex-shrink-0 ${isPositive ? 'text-accent-500' : 'text-dark-500'}`}>
              {isPositive ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </span>
            <span className="text-dark-200">{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

// Stat card
interface StatCardProps {
  value: string
  label: string
}

export function StatCard({ value, label }: StatCardProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      className="card text-center"
      variants={prefersReducedMotion ? fadeVariantsReduced : cardVariants}
    >
      <p className="text-3xl md:text-4xl font-semibold text-gradient mb-2">{value}</p>
      <p className="text-sm text-dark-400">{label}</p>
    </motion.div>
  )
}
