'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { timelineVariants, fadeVariantsReduced } from '@/lib/motion'

interface TimelineItem {
  phase: string
  title: string
  description: string
  weeks?: string
}

interface TimelineProps {
  items: TimelineItem[]
}

export default function Timeline({ items }: TimelineProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      className="relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: prefersReducedMotion ? 0 : 0.2,
            delayChildren: prefersReducedMotion ? 0 : 0.1,
          },
        },
      }}
    >
      {/* Vertical line with gradient */}
      <div className="absolute left-[11px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 hidden md:block">
        <div className="h-full bg-gradient-to-b from-accent-500/50 via-dark-600 to-dark-700" />
      </div>

      <div className="space-y-8 md:space-y-0">
        {items.map((item, index) => (
          <TimelineEntry key={index} item={item} index={index} isLast={index === items.length - 1} />
        ))}
      </div>
    </motion.div>
  )
}

function TimelineEntry({ item, index, isLast }: { item: TimelineItem; index: number; isLast: boolean }) {
  const prefersReducedMotion = useReducedMotion()
  const isEven = index % 2 === 0

  return (
    <motion.div
      className={`relative md:flex md:items-center md:justify-between ${!isLast ? 'md:mb-16' : ''}`}
      variants={prefersReducedMotion ? fadeVariantsReduced : timelineVariants}
    >
      {/* Mobile line */}
      <div className="absolute left-[11px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-500/50 to-dark-700 md:hidden" />

      {/* Desktop: alternate sides */}
      <div className={`md:w-[calc(50%-2rem)] ${isEven ? 'md:pr-8' : 'md:order-2 md:pl-8'}`}>
        <div className={`card group ${isEven ? 'md:text-right' : ''}`}>
          <div className={`flex items-center gap-3 mb-4 ${isEven ? 'md:justify-end' : ''}`}>
            <span className="badge-accent">{item.phase}</span>
            {item.weeks && (
              <span className="text-sm text-dark-400">{item.weeks}</span>
            )}
          </div>
          <h3 className="heading-4 mb-3">{item.title}</h3>
          <p className="body-base">{item.description}</p>
        </div>
      </div>

      {/* Center dot */}
      <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-6 md:top-1/2 md:-translate-y-1/2">
        <div className="relative">
          <div className="w-6 h-6 rounded-full bg-dark-900 border-2 border-accent-500 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-accent-500" />
          </div>
          {/* Glow */}
          <div className="absolute inset-0 rounded-full bg-accent-500/30 blur-md -z-10" />
        </div>
      </div>

      {/* Desktop: empty space on opposite side */}
      <div className={`hidden md:block md:w-[calc(50%-2rem)] ${isEven ? 'md:order-2' : ''}`} />
    </motion.div>
  )
}

// Compact horizontal timeline
interface CompactTimelineProps {
  items: { label: string; description: string }[]
}

export function CompactTimeline({ items }: CompactTimelineProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      className="flex flex-col md:flex-row gap-6 md:gap-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: prefersReducedMotion ? 0 : 0.12,
          },
        },
      }}
    >
      {items.map((item, index) => (
        <motion.div
          key={index}
          className="flex-1 flex items-start gap-4 md:flex-col md:text-center md:items-center"
          variants={prefersReducedMotion ? fadeVariantsReduced : timelineVariants}
        >
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-accent-600 to-accent-700 text-white font-semibold text-sm flex items-center justify-center shadow-glow">
            {index + 1}
          </div>
          <div className="md:mt-4">
            <p className="font-medium text-white">{item.label}</p>
            <p className="text-sm text-dark-400 mt-1">{item.description}</p>
          </div>
          {/* Connector line (hidden on last item and mobile) */}
          {index < items.length - 1 && (
            <div className="hidden md:block absolute top-5 left-full w-full h-0.5 bg-gradient-to-r from-accent-500/50 to-transparent -z-10" />
          )}
        </motion.div>
      ))}
    </motion.div>
  )
}
