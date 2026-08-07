import type { Transition } from 'framer-motion'

// Enterprise-grade timing constants
export const TIMING = {
  FAST: 0.2,
  NORMAL: 0.3,
  SLOW: 0.5,
  CINEMATIC: 0.6,
}

// Reusable transition definitions
export const transitions = {
  // Snappy for micro-interactions (buttons, hovers)
  snappy: {
    type: 'spring',
    stiffness: 400,
    damping: 25,
  } as Transition,

  // Smooth for page transitions and large layout shifts
  smooth: {
    type: 'tween',
    ease: [0.25, 0.1, 0.25, 1],
    duration: TIMING.NORMAL,
  } as Transition,

  // Cinematic for hero sections and dramatic reveals
  cinematic: {
    type: 'tween',
    ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier for a premium slide
    duration: TIMING.CINEMATIC,
  } as Transition,

  // Used for layout transitions (e.g. Marketplace filtering)
  layout: {
    type: 'spring',
    stiffness: 300,
    damping: 30,
  } as Transition,
}
