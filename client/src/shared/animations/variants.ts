import type { Variants } from 'framer-motion'
import { transitions } from './transitions'

// Standardized animation variants across the app
export const variants = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: transitions.smooth },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  } as Variants,

  fadeUp: {
    hidden: { opacity: 0, y: 12 }, // Slight upward motion (8-12px) as requested
    visible: { opacity: 1, y: 0, transition: transitions.smooth },
    exit: { opacity: 0, y: -8, transition: { duration: 0.2 } }
  } as Variants,

  slideLeft: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: transitions.smooth },
    exit: { opacity: 0, x: 20, transition: { duration: 0.2 } }
  } as Variants,

  slideRight: {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: transitions.smooth },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } }
  } as Variants,

  scaleIn: {
    hidden: { opacity: 0, scale: 0.96 },
    visible: { opacity: 1, scale: 1, transition: transitions.smooth },
    exit: { opacity: 0, scale: 0.98, transition: { duration: 0.15 } }
  } as Variants,

  popIn: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: transitions.snappy },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.15 } }
  } as Variants,

  // For parent containers wrapping multiple items
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      }
    }
  } as Variants,

  staggerItem: {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: transitions.smooth }
  } as Variants,

  pageTransition: {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: transitions.smooth },
    exit: { opacity: 0, y: 0, transition: { duration: 0.2 } } // Fast exit
  } as Variants,

  shimmer: {
    hidden: { backgroundPosition: '200% 0' },
    visible: {
      backgroundPosition: '-200% 0',
      transition: {
        repeat: Infinity,
        duration: 1.5,
        ease: 'linear'
      }
    }
  } as Variants,
}
