'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, useReducedMotion } from 'framer-motion'
import { useState, useEffect } from 'react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/#gallery', label: 'Gallery' },
  { href: '/prizes', label: 'Prizes' },
  { href: '/levels', label: 'Levels' },
]

export default function Nav() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-400
        ${scrolled
          ? 'glass-strong shadow-lg shadow-black/20'
          : 'bg-transparent'
        }
      `}
    >
      <nav className="container-main h-20 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="relative group"
        >
          <span className="text-xl font-semibold text-white tracking-tight">
            Vibe-O-Rama
          </span>
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-accent-500 to-secondary-500 transition-all duration-300 group-hover:w-full" />
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`
                    relative px-5 py-2.5 text-sm font-medium rounded-button
                    transition-all duration-300
                    ${isActive
                      ? 'text-white'
                      : 'text-dark-300 hover:text-white'
                    }
                  `}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-dark-700/60 rounded-button border border-dark-600/50 -z-10"
                      transition={{
                        type: 'spring',
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* CTA Button */}
        <div className="hidden md:block">
          <a href="#" className="btn-primary text-sm py-2.5 px-5">
            Join program
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-dark-300 hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{
          height: mobileOpen ? 'auto' : 0,
          opacity: mobileOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="md:hidden overflow-hidden glass-strong border-t border-dark-700/50"
      >
        <div className="container-main py-6 space-y-4">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`
                  block py-3 px-4 rounded-button text-base font-medium transition-colors
                  ${isActive
                    ? 'bg-dark-700/60 text-white'
                    : 'text-dark-300 hover:text-white hover:bg-dark-800/50'
                  }
                `}
              >
                {link.label}
              </Link>
            )
          })}
          <a
            href="#"
            className="btn-primary w-full mt-4"
            onClick={() => setMobileOpen(false)}
          >
            Join program
          </a>
        </div>
      </motion.div>
    </motion.header>
  )
}
