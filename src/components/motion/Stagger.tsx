import type { ReactNode } from "react";
import { motion } from "motion/react";

import { staggerContainer, staggerItem } from "./variants";

const CONTAINER_TAGS = {
  div: motion.div,
  ul: motion.ul,
  ol: motion.ol,
  dl: motion.dl,
} as const;

const ITEM_TAGS = {
  div: motion.div,
  li: motion.li,
} as const;

interface StaggerProps {
  children: ReactNode;
  className?: string;
  /** Semantic element to render. */
  as?: keyof typeof CONTAINER_TAGS;
  /** Fraction of the container that must be visible before it animates in. */
  amount?: number;
}

/**
 * Container that reveals its {@link StaggerItem} children one after another as
 * it scrolls into view.
 */
export function Stagger({ children, className, as = "div", amount = 0.15 }: StaggerProps) {
  const Component = CONTAINER_TAGS[as];
  return (
    <Component
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
    >
      {children}
    </Component>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  /** Semantic element to render. */
  as?: keyof typeof ITEM_TAGS;
  /** Adds a hover lift + tap press, for interactive cards. */
  interactive?: boolean;
}

/** Individual child of a {@link Stagger} container. */
export function StaggerItem({
  children,
  className,
  as = "div",
  interactive = false,
}: StaggerItemProps) {
  const Component = ITEM_TAGS[as];
  return (
    <Component
      className={className}
      variants={staggerItem}
      whileHover={interactive ? { y: -6 } : undefined}
      whileTap={interactive ? { scale: 0.99 } : undefined}
      transition={interactive ? { type: "spring", stiffness: 320, damping: 24 } : undefined}
    >
      {children}
    </Component>
  );
}
