import type { Variants } from 'framer-motion'

// ── Fade ─────────────────────────────────────────────────────────
export const fadeVariants: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25, ease: 'easeOut' } },
  exit:    { opacity: 0, transition: { duration: 0.15, ease: 'easeIn' } },
}

// ── Slide Up ─────────────────────────────────────────────────────
export const slideUpVariants: Variants = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: [0, 0, 0.2, 1] } },
  exit:    { opacity: 0, y: 8, transition: { duration: 0.15, ease: [0.4, 0, 1, 1] } },
}

// ── Slide Down ───────────────────────────────────────────────────
export const slideDownVariants: Variants = {
  hidden:  { opacity: 0, y: -16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: [0, 0, 0.2, 1] } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.15, ease: [0.4, 0, 1, 1] } },
}

// ── Slide Right (for left-origin drawer) ─────────────────────────
export const slideRightVariants: Variants = {
  hidden:  { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: [0, 0, 0.2, 1] } },
  exit:    { opacity: 0, x: -32, transition: { duration: 0.2, ease: [0.4, 0, 1, 1] } },
}

// ── Slide Left (for right-origin drawer) ─────────────────────────
export const slideLeftVariants: Variants = {
  hidden:  { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: [0, 0, 0.2, 1] } },
  exit:    { opacity: 0, x: 32, transition: { duration: 0.2, ease: [0.4, 0, 1, 1] } },
}

// ── Scale ─────────────────────────────────────────────────────────
export const scaleVariants: Variants = {
  hidden:  { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1, scale: 1,
    transition: { duration: 0.2, ease: [0.34, 1.56, 0.64, 1] },
  },
  exit: {
    opacity: 0, scale: 0.97,
    transition: { duration: 0.15, ease: [0.4, 0, 1, 1] },
  },
}

// ── Scale + Fade (for modals) ─────────────────────────────────────
export const modalVariants: Variants = {
  hidden:  { opacity: 0, scale: 0.94, y: 8 },
  visible: {
    opacity: 1, scale: 1, y: 0,
    transition: { duration: 0.25, ease: [0.34, 1.56, 0.64, 1] },
  },
  exit: {
    opacity: 0, scale: 0.97, y: 4,
    transition: { duration: 0.15, ease: [0.4, 0, 1, 1] },
  },
}

// ── Overlay backdrop ─────────────────────────────────────────────
export const overlayVariants: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit:    { opacity: 0, transition: { duration: 0.15 } },
}

// ── Drawer (bottom) ───────────────────────────────────────────────
export const drawerBottomVariants: Variants = {
  hidden:  { y: '100%', opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.3, ease: [0, 0, 0.2, 1] } },
  exit:    { y: '100%', opacity: 0, transition: { duration: 0.2, ease: [0.4, 0, 1, 1] } },
}

// ── Drawer (right) ────────────────────────────────────────────────
export const drawerRightVariants: Variants = {
  hidden:  { x: '100%', opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.3, ease: [0, 0, 0.2, 1] } },
  exit:    { x: '100%', opacity: 0, transition: { duration: 0.2, ease: [0.4, 0, 1, 1] } },
}

// ── Stagger container ─────────────────────────────────────────────
export const staggerContainerVariants: Variants = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
}

// ── Stagger item (use inside stagger container) ───────────────────
export const staggerItemVariants: Variants = {
  hidden:  { opacity: 0, y: 12 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.25, ease: [0, 0, 0.2, 1] },
  },
}

// ── Page transition ───────────────────────────────────────────────
export const pageVariants: Variants = {
  hidden:  { opacity: 0, y: 8 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.3, ease: [0, 0, 0.2, 1] },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.15 },
  },
}

// ── Card hover (use with whileHover) ─────────────────────────────
export const cardHoverVariants = {
  rest:  { scale: 1,    y: 0,  transition: { duration: 0.2 } },
  hover: { scale: 1.01, y: -2, transition: { duration: 0.2 } },
}

// ── Button press (use with whileTap) ─────────────────────────────
export const buttonPressVariants = {
  rest:  { scale: 1 },
  tap:   { scale: 0.97, transition: { duration: 0.1 } },
}
