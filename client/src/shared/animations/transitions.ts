import type { Transition } from 'framer-motion'

// Hover (120ms)
export const transitionHover: Transition = {
  duration: 0.12,
  ease: [0.4, 0, 0.2, 1],
}

// Buttons (80ms)
export const transitionButton: Transition = {
  duration: 0.08,
  ease: 'linear',
}

// Drawer (250ms)
export const transitionDrawer: Transition = {
  duration: 0.25,
  ease: [0.32, 0.72, 0, 1], // easeOutCubic
}

// Modal (180ms)
export const transitionModal: Transition = {
  duration: 0.18,
  ease: [0.34, 1.56, 0.64, 1],
}

// Page (300ms)
export const transitionPage: Transition = {
  duration: 0.3,
  ease: [0, 0, 0.2, 1],
}

// Cards (120ms)
export const transitionCard: Transition = {
  duration: 0.12,
  ease: [0.4, 0, 0.2, 1],
}

// Keep legacy ones for fallback during refactor
export const transitionFast: Transition = { duration: 0.15, ease: [0.4, 0, 0.2, 1] }
export const transitionNormal: Transition = { duration: 0.25, ease: [0, 0, 0.2, 1] }
export const transitionSlow: Transition = { duration: 0.4, ease: [0, 0, 0.2, 1] }
export const transitionBounce: Transition = { type: 'spring', stiffness: 400, damping: 25 }
export const transitionSpring: Transition = { type: 'spring', stiffness: 300, damping: 30 }
