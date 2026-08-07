import { variants } from './variants'
import { transitions } from './transitions'

// Commonly used animation props for Framer Motion components
export const presets = {
  // Use this for page-level components
  page: {
    variants: variants.pageTransition,
    initial: 'hidden',
    animate: 'visible',
    exit: 'exit',
  },

  // Use this for major sections revealing on scroll
  scrollReveal: {
    variants: variants.fadeUp,
    initial: 'hidden',
    whileInView: 'visible',
    viewport: { once: true, margin: '-40px' },
  },

  // Use this for parent containers of lists to stagger children
  staggeredList: {
    variants: variants.staggerContainer,
    initial: 'hidden',
    animate: 'visible',
  },

  // Use this for the individual list items inside staggeredList
  staggeredItem: {
    variants: variants.staggerItem,
  },

  // Button hover and tap effects
  buttonInteraction: {
    whileHover: { scale: 1.02, y: -1, transition: transitions.snappy },
    whileTap: { scale: 0.97, transition: transitions.snappy },
  },

  // Card hover interactions (Marketplace, Dashboards)
  cardHover: {
    whileHover: { 
      y: -6, 
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      transition: transitions.snappy 
    },
  },
}
