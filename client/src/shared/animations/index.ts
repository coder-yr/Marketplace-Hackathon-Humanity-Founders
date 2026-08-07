export { variants } from './variants'
export { transitions } from './transitions'
export { presets } from './presets'

import { variants as v } from './variants'
import { transitions as t } from './transitions'

export const fadeVariants = v.fadeIn
export const slideUpVariants = v.fadeUp
export const slideDownVariants = v.fadeUp
export const slideRightVariants = v.slideRight
export const slideLeftVariants = v.slideLeft
export const scaleVariants = v.scaleIn
export const modalVariants = v.scaleIn
export const overlayVariants = v.fadeIn
export const drawerBottomVariants = v.fadeUp
export const drawerRightVariants = v.slideLeft
export const staggerContainerVariants = v.staggerContainer
export const staggerItemVariants = v.staggerItem
export const pageVariants = v.pageTransition
export const cardHoverVariants = {}
export const buttonPressVariants = {}

export const transitionFast = t.snappy
export const transitionNormal = t.smooth
export const transitionSlow = t.smooth
export const transitionBounce = t.snappy
export const transitionSpring = t.snappy
export const transitionModal = t.smooth
export const transitionPage = t.smooth
export const transitionHover = t.smooth
export const transitionButton = t.snappy
export const transitionDrawer = t.smooth
export const transitionCard = t.smooth
