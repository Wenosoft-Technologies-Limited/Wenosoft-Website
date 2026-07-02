import type { ReactNode } from "react";
import { motion } from "motion/react";

import { pageTransition } from "./variants";

/**
 * Animates a route's contents in and out. Rendered inside an `AnimatePresence`
 * keyed by pathname so exit animations play before the next route enters.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div variants={pageTransition} initial="hidden" animate="visible" exit="exit">
      {children}
    </motion.div>
  );
}
