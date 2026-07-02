import type { ReactNode } from "react";
import { motion, type Variants } from "motion/react";

import { fadeUp } from "./variants";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Motion preset to animate with. Defaults to a fade-up. */
  variants?: Variants;
  /** Extra delay in seconds, layered on top of the preset transition. */
  delay?: number;
  /** Fraction of the element that must be visible before it animates in. */
  amount?: number;
}

/**
 * Reveals its children the first time they scroll into view. Respects
 * `prefers-reduced-motion` automatically via the app-level `MotionConfig`.
 */
export function Reveal({
  children,
  className,
  variants = fadeUp,
  delay = 0,
  amount = 0.2,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
