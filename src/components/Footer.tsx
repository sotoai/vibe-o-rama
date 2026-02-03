'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { fadeUpVariants, fadeVariantsReduced, viewportOnce } from '@/lib/motion'

export default function Footer() {
  const prefersReducedMotion = useReducedMotion()
  const variants = prefersReducedMotion ? fadeVariantsReduced : fadeUpVariants

  return (
    <footer className="relative border-t border-dark-800/50 bg-dark-950">
      {/* Glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-accent-500/50 to-transparent" />

      <motion.div
        className="container-main py-16 md:py-20"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={variants}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Vibe-O-Rama</h3>
            <p className="text-sm text-dark-400 max-w-xs leading-relaxed">
              An internal AI enablement program for SPRO.
              Built for learning, experimentation, and play.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-dark-200 uppercase tracking-wider">Navigate</h4>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Home' },
                { href: '/#gallery', label: 'Gallery' },
                { href: '/prizes', label: 'Prizes' },
                { href: '/levels', label: 'Levels' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-dark-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-dark-200 uppercase tracking-wider">Contact</h4>
            <p className="text-sm text-dark-400">Questions or feedback?</p>
            <a
              href="mailto:vibeorama@cisco.com"
              className="inline-flex items-center gap-2 text-sm text-accent-400 hover:text-accent-300 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              vibeorama@cisco.com
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-dark-800/50">
          <p className="text-xs text-dark-500 text-center">
            This is an internal enablement program, not an official product.
          </p>
        </div>
      </motion.div>
    </footer>
  )
}
