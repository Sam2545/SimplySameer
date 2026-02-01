/**
 * Animation utilities and constants
 */

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
} as const

export function getTransition(duration = 0.3, delay = 0) {
  return { duration, delay }
}
