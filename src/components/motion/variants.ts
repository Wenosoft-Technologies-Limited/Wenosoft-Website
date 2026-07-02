import type { Variants } from "motion/react";

/**
 * Shared motion presets used across the site. Kept in a non-component module so
 * the `react-refresh/only-export-components` rule stays satisfied.
 *
 * A branded ease curve (a soft, confident ease-out) gives every reveal the same
 * deliberate feel as the brand voice.
 */
export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Fade in while rising from below. The workhorse reveal. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

/** Pure opacity fade, for elements that should not shift position. */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: EASE_OUT } },
};

/** Gentle scale + fade, for cards, images and hero art. */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: EASE_OUT } },
};

/** Slide in from the left. */
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

/** Orchestrates its children with a staggered reveal. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

/** Child preset paired with {@link staggerContainer}. */
export const staggerItem: Variants = fadeUp;

/** Route transition preset: fade + subtle vertical slide. */
export const pageTransition: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE_OUT } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.25, ease: EASE_OUT } },
};
