import { useCallback, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "motion/react";

import { EASE_OUT } from "../motion/variants";

type Theme = "light" | "dark";

/** Keep in sync with the inline pre-paint script in public/index.html. */
const STORAGE_KEY = "wenosoft-theme";
const THEME_COLOR: Record<Theme, string> = { dark: "#12103A", light: "#F9F9FB" };

const listeners = new Set<() => void>();

function readTheme(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function applyTheme(theme: Theme): void {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLOR[theme]);
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* storage unavailable; theme still applies for this visit */
  }
  listeners.forEach((notify) => notify());
}

function subscribe(onStoreChange: () => void): () => void {
  listeners.add(onStoreChange);
  return () => listeners.delete(onStoreChange);
}

/**
 * Light/dark toggle. The initial theme is resolved before first paint by the
 * inline script in index.html; this button flips the class on <html> and
 * persists the choice so it overrides automatic resolution on future visits.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, readTheme);
  const isDark = theme === "dark";

  const toggle = useCallback(() => {
    applyTheme(isDark ? "light" : "dark");
  }, [isDark]);

  return (
    <motion.button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={isDark}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className={[
        "inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-border text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.svg
          key={theme}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          focusable="false"
          initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
          transition={{ duration: 0.25, ease: EASE_OUT }}
        >
          {isDark ? (
            <>
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
            </>
          ) : (
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          )}
        </motion.svg>
      </AnimatePresence>
    </motion.button>
  );
}
