/**
 * Motion configuration - Dala-inspired cinematic animations
 * Smooth, dramatic, premium feel
 */

// Easing curves
export const easing = {
  smooth: [0.16, 1, 0.3, 1],      // Smooth deceleration
  smoothOut: [0, 0, 0.2, 1],
  smoothIn: [0.4, 0, 1, 1],
  bounce: [0.34, 1.56, 0.64, 1],  // Slight overshoot
  dramatic: [0.6, 0.01, -0.05, 0.95], // Cinematic
} as const

// Duration presets
export const duration = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.6,
  slower: 0.8,
  page: 0.5,
} as const

// Page transition variants
export const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  enter: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: duration.page,
      ease: easing.smooth,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.99,
    transition: {
      duration: 0.3,
      ease: easing.smoothIn,
    },
  },
}

// Reduced motion variants
export const pageVariantsReduced = {
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: 0.15 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
}

// Fade up animation (hero, sections)
export const fadeUpVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.slow,
      ease: easing.smooth,
    },
  },
}

// Fade up with scale
export const fadeUpScaleVariants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: duration.slower,
      ease: easing.smooth,
    },
  },
}

// Reduced motion fade
export const fadeVariantsReduced = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.15 } },
}

// Staggered container
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
}

// Fast stagger for dense content
export const staggerContainerFast = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
}

// Card item animation
export const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: duration.normal,
      ease: easing.smooth,
    },
  },
}

// Scale up on hover (for cards)
export const hoverScale = {
  scale: 1.02,
  y: -4,
  transition: {
    duration: duration.fast,
    ease: easing.smooth,
  },
}

// Glow pulse effect
export const glowVariants = {
  initial: { opacity: 0.3 },
  animate: {
    opacity: [0.3, 0.6, 0.3],
    transition: {
      duration: 3,
      ease: 'easeInOut',
      repeat: Infinity,
    },
  },
}

// Slide in from left
export const slideInLeft = {
  hidden: {
    opacity: 0,
    x: -60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: duration.slow,
      ease: easing.smooth,
    },
  },
}

// Slide in from right
export const slideInRight = {
  hidden: {
    opacity: 0,
    x: 60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: duration.slow,
      ease: easing.smooth,
    },
  },
}

// Scale in (for badges, icons)
export const scaleIn = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: duration.normal,
      ease: easing.bounce,
    },
  },
}

// Text reveal (character by character)
export const textRevealContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.02,
      delayChildren: 0.1,
    },
  },
}

export const textRevealChar = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: easing.smooth,
    },
  },
}

// Line draw animation
export const drawLine = {
  hidden: {
    pathLength: 0,
    opacity: 0,
  },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1, ease: easing.smooth },
      opacity: { duration: 0.3 },
    },
  },
}

// Float animation (for decorative elements)
export const floatVariants = {
  animate: {
    y: [-5, 5, -5],
    transition: {
      duration: 4,
      ease: 'easeInOut',
      repeat: Infinity,
    },
  },
}

// Blur in effect
export const blurInVariants = {
  hidden: {
    opacity: 0,
    filter: 'blur(10px)',
  },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      duration: duration.slow,
      ease: easing.smooth,
    },
  },
}

// Nav link hover underline
export const underlineVariants = {
  initial: { scaleX: 0, originX: 0 },
  hover: {
    scaleX: 1,
    transition: { duration: 0.3, ease: easing.smooth },
  },
}

// Timeline item
export const timelineVariants = {
  hidden: {
    opacity: 0,
    x: -30,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: duration.normal,
      ease: easing.smooth,
    },
  },
}

// Badge pop in
export const badgeVariants = {
  hidden: {
    opacity: 0,
    scale: 0.5,
    y: 10,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: easing.bounce,
    },
  },
}

// Viewport settings for scroll triggers
export const viewportOnce = { once: true, margin: '-100px' }
export const viewportRepeat = { once: false, margin: '-50px' }
