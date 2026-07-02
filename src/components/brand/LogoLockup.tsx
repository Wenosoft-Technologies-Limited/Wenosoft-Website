import { Link } from "react-router-dom";

import { LogoMark } from "./LogoMark";

interface LogoLockupProps {
  /** Variant determines text color. Mark stays white on dark, purple on light. */
  variant?: "light" | "dark";
  className?: string;
  withTagline?: boolean;
}

export function LogoLockup({ variant = "light", className, withTagline = false }: LogoLockupProps) {
  const textClass = variant === "light" ? "text-foreground" : "text-indigo-deep";
  const taglineClass = variant === "light" ? "text-soft-lavender" : "text-wenosoft-purple";
  const markVariant = variant === "light" ? "white" : "default";

  return (
    <Link
      to="/"
      aria-label="Wenosoft Technologies, home"
      className={["group inline-flex items-center gap-3", className].filter(Boolean).join(" ")}
    >
      <LogoMark
        variant={markVariant}
        className="h-8 w-auto transition-transform duration-300 group-hover:rotate-[-3deg]"
      />
      <span className="flex flex-col leading-none">
        <span className={`font-display text-xl font-semibold tracking-tight ${textClass}`}>
          Wenosoft
        </span>
        {withTagline && (
          <span className={`mt-0.5 text-[0.625rem] uppercase tracking-[0.2em] ${taglineClass}`}>
            Technologies
          </span>
        )}
      </span>
    </Link>
  );
}
