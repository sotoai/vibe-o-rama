'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { badgeVariants, fadeVariantsReduced } from '@/lib/motion'
import { ReactNode } from 'react'

type BadgeVariant = 'default' | 'accent' | 'glow' | 'outline'

interface BadgeProps {
  children: ReactNode
  variant?: BadgeVariant
  size?: 'sm' | 'md' | 'lg'
  animated?: boolean
  className?: string
}

export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  animated = false,
  className = '',
}: BadgeProps) {
  const prefersReducedMotion = useReducedMotion()

  const variantClasses = {
    default: 'bg-dark-700/80 text-dark-200 border border-dark-600/50',
    accent: 'bg-accent-600/20 text-accent-300 border border-accent-500/30',
    glow: 'bg-accent-600/20 text-accent-300 border border-accent-500/30 shadow-glow',
    outline: 'bg-transparent text-dark-300 border border-dark-500',
  }

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-sm px-4 py-2',
  }

  const Component = animated && !prefersReducedMotion ? motion.span : 'span'

  return (
    <Component
      className={`
        inline-flex items-center font-medium rounded-badge
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
      {...(animated && !prefersReducedMotion
        ? { variants: badgeVariants, initial: 'hidden', animate: 'visible' }
        : {}
      )}
    >
      {children}
    </Component>
  )
}

// Level badge with gradient
interface LevelBadgeProps {
  level: number
  name: string
  size?: 'sm' | 'md' | 'lg'
}

const levelGradients = [
  'from-slate-400 to-slate-500',      // Level 1 - Curious
  'from-blue-400 to-blue-600',        // Level 2 - Builder-in-Training
  'from-cyan-400 to-teal-500',        // Level 3 - Maker
  'from-violet-400 to-purple-600',    // Level 4 - Workflow Designer
  'from-amber-400 to-orange-500',     // Level 5 - Vibe Architect
]

export function LevelBadge({ level, name, size = 'md' }: LevelBadgeProps) {
  const gradient = levelGradients[level - 1] || levelGradients[0]

  const sizeClasses = {
    sm: 'text-xs px-2.5 py-1 gap-1.5',
    md: 'text-sm px-3 py-1.5 gap-2',
    lg: 'text-base px-4 py-2 gap-2',
  }

  return (
    <span
      className={`
        inline-flex items-center font-semibold rounded-button text-white
        bg-gradient-to-r ${gradient}
        shadow-lg shadow-accent-500/20
        ${sizeClasses[size]}
      `}
    >
      <span className="opacity-80">L{level}</span>
      <span>{name}</span>
    </span>
  )
}

// Tag badge for artifacts
interface TagBadgeProps {
  children: ReactNode
  color?: 'default' | 'accent' | 'cyan' | 'green' | 'orange'
}

export function TagBadge({ children, color = 'default' }: TagBadgeProps) {
  const colorClasses = {
    default: 'bg-dark-700/60 text-dark-300 border-dark-600/30',
    accent: 'bg-accent-600/20 text-accent-400 border-accent-500/30',
    cyan: 'bg-cyan-600/20 text-cyan-400 border-cyan-500/30',
    green: 'bg-emerald-600/20 text-emerald-400 border-emerald-500/30',
    orange: 'bg-orange-600/20 text-orange-400 border-orange-500/30',
  }

  return (
    <span className={`text-xs px-2.5 py-1 rounded-md border ${colorClasses[color]}`}>
      {children}
    </span>
  )
}

// Number badge (for counts, notifications)
interface NumberBadgeProps {
  value: number
  max?: number
}

export function NumberBadge({ value, max = 99 }: NumberBadgeProps) {
  const displayValue = value > max ? `${max}+` : value

  return (
    <span className="inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 text-xs font-semibold rounded-full bg-accent-600 text-white">
      {displayValue}
    </span>
  )
}
