'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { cardVariants, fadeVariantsReduced } from '@/lib/motion'

interface ArtifactItem {
  id: string
  name: string
  description: string
  tags: string[]
  image: string
}

interface GalleryProps {
  items: ArtifactItem[]
}

export default function Gallery({ items }: GalleryProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: prefersReducedMotion ? 0 : 0.06,
            delayChildren: prefersReducedMotion ? 0 : 0.1,
          },
        },
      }}
    >
      {items.map((item) => (
        <GalleryItem key={item.id} item={item} />
      ))}
    </motion.div>
  )
}

function GalleryItem({ item }: { item: ArtifactItem }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      className="group relative card-interactive p-0 overflow-hidden"
      variants={prefersReducedMotion ? fadeVariantsReduced : cardVariants}
    >
      {/* Image area */}
      <div className="aspect-[4/3] bg-dark-800 relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}${item.image}`}
          alt={item.name}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:opacity-80"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950/90 via-dark-950/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

        {/* Glow on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-t from-accent-600/20 to-transparent" />
        </div>
      </div>

      {/* Content */}
      <div className="p-5 relative">
        <h3 className="font-semibold text-white mb-1.5 group-hover:text-accent-300 transition-colors">
          {item.name}
        </h3>
        <p className="text-sm text-dark-400 mb-4 line-clamp-2">{item.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 bg-dark-700/60 text-dark-300 rounded-md border border-dark-600/30"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute top-0 right-0 w-32 h-32 -translate-y-1/2 translate-x-1/2 bg-gradient-to-br from-accent-500/20 to-transparent rounded-full blur-2xl" />
      </div>
    </motion.div>
  )
}

// Skeleton placeholder
export function GalleryPlaceholder() {
  return (
    <div className="card p-0 overflow-hidden animate-pulse">
      <div className="aspect-[4/3] bg-dark-800" />
      <div className="p-5 space-y-3">
        <div className="h-5 bg-dark-700 rounded w-3/4" />
        <div className="h-4 bg-dark-800 rounded w-full" />
        <div className="flex gap-2">
          <div className="h-6 bg-dark-700 rounded w-16" />
          <div className="h-6 bg-dark-700 rounded w-12" />
        </div>
      </div>
    </div>
  )
}
