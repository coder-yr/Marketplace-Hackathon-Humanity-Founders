/**
 * Design System Tokens
 *
 * Single source of truth for all design values.
 * NEVER hardcode colors, spacing, or typography.
 * Always use tokens from this file (via Tailwind classes).
 */

export const colors = {
  // Brand
  brand: {
    primary: '#2563EB',      // Blue-600 — CTAs, links, highlights
    primaryHover: '#1D4ED8', // Blue-700 — Hover state
    secondary: '#7C3AED',    // Violet-600 — Accents, badges
    secondaryHover: '#6D28D9', // Violet-700
  },

  // Surfaces (dark theme base)
  surface: {
    1: '#0F172A',   // Slate-900 — Base background
    2: '#1E293B',   // Slate-800 — Card backgrounds
    3: '#334155',   // Slate-700 — Borders, dividers
    4: '#475569',   // Slate-600 — Subtle interactive
  },

  // Text
  text: {
    primary: '#F8FAFC',   // Slate-50 — Main content
    secondary: '#94A3B8', // Slate-400 — Subtitles, meta
    muted: '#64748B',     // Slate-500 — Disabled, placeholders
    inverse: '#0F172A',   // Dark on light surfaces
  },

  // Semantic
  success: '#10B981',   // Emerald-500
  warning: '#F59E0B',   // Amber-500
  error: '#EF4444',     // Red-500
  info: '#3B82F6',      // Blue-500

  // Neutrals
  white: '#FFFFFF',
  black: '#000000',
} as const

export const typography = {
  fontFamily: {
    display: '"Outfit", sans-serif',
    body: '"Inter", sans-serif',
    mono: '"JetBrains Mono", monospace',
  },
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],        // 12px
    sm: ['0.875rem', { lineHeight: '1.25rem' }],    // 14px
    base: ['1rem', { lineHeight: '1.5rem' }],       // 16px
    lg: ['1.125rem', { lineHeight: '1.75rem' }],    // 18px
    xl: ['1.25rem', { lineHeight: '1.75rem' }],     // 20px
    '2xl': ['1.5rem', { lineHeight: '2rem' }],      // 24px
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }],   // 36px
    '5xl': ['3rem', { lineHeight: '1' }],            // 48px
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
} as const

export const spacing = {
  // 4px baseline grid
  0.5: '0.125rem',  // 2px
  1: '0.25rem',     // 4px
  1.5: '0.375rem',  // 6px
  2: '0.5rem',      // 8px
  2.5: '0.625rem',  // 10px
  3: '0.75rem',     // 12px
  3.5: '0.875rem',  // 14px
  4: '1rem',        // 16px
  5: '1.25rem',     // 20px
  6: '1.5rem',      // 24px
  7: '1.75rem',     // 28px
  8: '2rem',        // 32px
  9: '2.25rem',     // 36px
  10: '2.5rem',     // 40px
  12: '3rem',       // 48px
  14: '3.5rem',     // 56px
  16: '4rem',       // 64px
  20: '5rem',       // 80px
  24: '6rem',       // 96px
  28: '7rem',       // 112px
  32: '8rem',       // 128px
} as const

export const borderRadius = {
  none: '0',
  sm: '0.25rem',   // 4px — Tags, badges
  DEFAULT: '0.375rem', // 6px
  md: '0.5rem',    // 8px — Inputs, small buttons
  lg: '0.75rem',   // 12px — Cards
  xl: '1rem',      // 16px — Modal dialogs
  '2xl': '1.5rem', // 24px — Large panels
  '3xl': '2rem',   // 32px
  full: '9999px',  // Pills, avatars
} as const

export const boxShadow = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  // Brand glow — for CTAs and focus
  glow: '0 0 0 3px rgb(37 99 235 / 0.3)',
  'glow-purple': '0 0 0 3px rgb(124 58 237 / 0.3)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  none: 'none',
} as const

export const animation = {
  duration: {
    instant: '75ms',
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    slower: '700ms',
  },
  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
} as const

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const

export const zIndex = {
  hide: -1,
  base: 0,
  raised: 1,
  dropdown: 10,
  sticky: 20,
  overlay: 30,
  modal: 40,
  popover: 50,
  toast: 60,
  tooltip: 70,
} as const

// Component variants — consistent patterns
export const componentVariants = {
  button: {
    primary: 'bg-brand-primary hover:bg-brand-primary-hover text-white font-semibold',
    secondary: 'bg-surface-3 hover:bg-surface-4 text-text-primary font-medium',
    ghost: 'bg-transparent hover:bg-surface-2 text-text-secondary hover:text-text-primary font-medium',
    danger: 'bg-error hover:bg-red-600 text-white font-semibold',
  },
  badge: {
    default: 'bg-surface-3 text-text-secondary',
    primary: 'bg-brand-primary/20 text-brand-primary',
    success: 'bg-success/20 text-success',
    warning: 'bg-warning/20 text-warning',
    error: 'bg-error/20 text-error',
  },
} as const
