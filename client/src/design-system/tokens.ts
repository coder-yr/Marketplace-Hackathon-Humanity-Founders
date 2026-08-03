/**
 * Design System Tokens — Phase 1 Enhanced
 *
 * Single source of truth for all design values.
 * NEVER hardcode colors, spacing, or typography.
 * All values are mirrored in index.css @theme for Tailwind v4.
 */

// ── Colors ──────────────────────────────────────────────────────
export const colors = {
  brand: {
    primary: '#2563EB',
    primaryHover: '#1D4ED8',
    primaryLight: '#DBEAFE',
    secondary: '#7C3AED',
    secondaryHover: '#6D28D9',
    secondaryLight: '#EDE9FE',
  },

  // Dark theme surfaces
  dark: {
    surface1: '#0F172A',   // Base bg
    surface2: '#1E293B',   // Card bg
    surface3: '#334155',   // Borders
    surface4: '#475569',   // Hover interactive
    surface5: '#64748B',   // Active interactive
  },

  // Light theme surfaces
  light: {
    surface1: '#FFFFFF',
    surface2: '#F8FAFC',
    surface3: '#F1F5F9',
    surface4: '#E2E8F0',
    surface5: '#CBD5E1',
  },

  // Dark theme text
  darkText: {
    primary: '#F8FAFC',
    secondary: '#94A3B8',
    muted: '#64748B',
    inverse: '#0F172A',
  },

  // Light theme text
  lightText: {
    primary: '#0F172A',
    secondary: '#475569',
    muted: '#94A3B8',
    inverse: '#F8FAFC',
  },

  // Semantic
  semantic: {
    success: '#10B981',
    successLight: '#D1FAE5',
    successDark: '#059669',
    warning: '#F59E0B',
    warningLight: '#FEF3C7',
    warningDark: '#D97706',
    error: '#EF4444',
    errorLight: '#FEE2E2',
    errorDark: '#DC2626',
    info: '#3B82F6',
    infoLight: '#DBEAFE',
    infoDark: '#2563EB',
  },

  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
} as const

// ── Typography ───────────────────────────────────────────────────
export const typography = {
  fontFamily: {
    display: '"Outfit", sans-serif',
    body: '"Inter", sans-serif',
    mono: '"JetBrains Mono", monospace',
  },
  fontSize: {
    xs:   ['0.75rem',   { lineHeight: '1rem' }],
    sm:   ['0.875rem',  { lineHeight: '1.25rem' }],
    base: ['1rem',      { lineHeight: '1.5rem' }],
    lg:   ['1.125rem',  { lineHeight: '1.75rem' }],
    xl:   ['1.25rem',   { lineHeight: '1.75rem' }],
    '2xl':['1.5rem',    { lineHeight: '2rem' }],
    '3xl':['1.875rem',  { lineHeight: '2.25rem' }],
    '4xl':['2.25rem',   { lineHeight: '2.5rem' }],
    '5xl':['3rem',      { lineHeight: '1' }],
  },
  fontWeight: {
    normal:    '400',
    medium:    '500',
    semibold:  '600',
    bold:      '700',
    extrabold: '800',
  },
  letterSpacing: {
    tight:   '-0.025em',
    normal:  '0em',
    wide:    '0.025em',
    wider:   '0.05em',
    widest:  '0.1em',
  },
} as const

// ── Spacing (4px baseline grid) ──────────────────────────────────
export const spacing = {
  px:   '1px',
  0:    '0',
  0.5:  '0.125rem',
  1:    '0.25rem',
  1.5:  '0.375rem',
  2:    '0.5rem',
  2.5:  '0.625rem',
  3:    '0.75rem',
  3.5:  '0.875rem',
  4:    '1rem',
  5:    '1.25rem',
  6:    '1.5rem',
  7:    '1.75rem',
  8:    '2rem',
  9:    '2.25rem',
  10:   '2.5rem',
  11:   '2.75rem',
  12:   '3rem',
  14:   '3.5rem',
  16:   '4rem',
  20:   '5rem',
  24:   '6rem',
  28:   '7rem',
  32:   '8rem',
  36:   '9rem',
  40:   '10rem',
  48:   '12rem',
  56:   '14rem',
  64:   '16rem',
  72:   '18rem',
  80:   '20rem',
  96:   '24rem',
} as const

// ── Border Radius ────────────────────────────────────────────────
export const borderRadius = {
  none:    '0',
  sm:      '0.25rem',
  DEFAULT: '0.375rem',
  md:      '0.5rem',
  lg:      '0.75rem',
  xl:      '1rem',
  '2xl':   '1.5rem',
  '3xl':   '2rem',
  full:    '9999px',
} as const

// ── Shadows / Elevation ──────────────────────────────────────────
export const boxShadow = {
  none:         'none',
  xs:           '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  sm:           '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  DEFAULT:      '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  md:           '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg:           '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl:           '0 20px 25px -5px rgb(0 0 0 / 0.15), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl':        '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner:        'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  glow:         '0 0 0 3px rgb(37 99 235 / 0.35)',
  'glow-sm':    '0 0 0 2px rgb(37 99 235 / 0.3)',
  'glow-purple':'0 0 0 3px rgb(124 58 237 / 0.35)',
  'glow-error': '0 0 0 3px rgb(239 68 68 / 0.35)',
  'glow-success':'0 0 0 3px rgb(16 185 129 / 0.35)',
} as const

// ── Borders ──────────────────────────────────────────────────────
export const border = {
  width: {
    0:       '0px',
    DEFAULT: '1px',
    2:       '2px',
    4:       '4px',
    8:       '8px',
  },
} as const

// ── Focus Ring ───────────────────────────────────────────────────
export const focusRing = {
  width:  '2px',
  offset: '2px',
  color:  '#2563EB',        // brand-primary
  colorError:   '#EF4444',
  colorSuccess: '#10B981',
} as const

// ── Animation ────────────────────────────────────────────────────
export const animation = {
  duration: {
    instant: '75ms',
    fast:    '150ms',
    normal:  '250ms',
    slow:    '400ms',
    slower:  '600ms',
  },
  easing: {
    default:  'cubic-bezier(0.4, 0, 0.2, 1)',
    in:       'cubic-bezier(0.4, 0, 1, 1)',
    out:      'cubic-bezier(0, 0, 0.2, 1)',
    inOut:    'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce:   'cubic-bezier(0.34, 1.56, 0.64, 1)',
    spring:   'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },
} as const

// ── Breakpoints ──────────────────────────────────────────────────
export const breakpoints = {
  sm:   '640px',
  md:   '768px',
  lg:   '1024px',
  xl:   '1280px',
  '2xl':'1536px',
} as const

// ── Z-Index ──────────────────────────────────────────────────────
export const zIndex = {
  hide:     -1,
  base:     0,
  raised:   1,
  dropdown: 10,
  sticky:   20,
  overlay:  30,
  modal:    40,
  popover:  50,
  toast:    60,
  tooltip:  70,
} as const

// ── Container Widths ─────────────────────────────────────────────
export const containerWidth = {
  sm:   '640px',
  md:   '768px',
  lg:   '1024px',
  xl:   '1280px',
  '2xl':'1400px',
  prose:'65ch',
} as const

// ── Component Size Tokens (height scale) ─────────────────────────
export const componentSize = {
  xs:  '1.5rem',    // 24px
  sm:  '2rem',      // 32px
  md:  '2.5rem',    // 40px
  lg:  '3rem',      // 48px
  xl:  '3.5rem',    // 56px
} as const

// ── Sidebar / Nav Widths ─────────────────────────────────────────
export const layoutSize = {
  navbarHeight:      '4rem',   // 64px
  sidebarWidth:      '16rem',  // 256px
  sidebarCollapsed:  '4rem',   // 64px
  topbarHeight:      '2.5rem', // 40px
} as const
