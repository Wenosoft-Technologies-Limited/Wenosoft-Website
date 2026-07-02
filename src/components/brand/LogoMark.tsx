import iconPurple from "@/assets/wenosoft-icon-purple.png";
import iconDark from "@/assets/wenosoft-icon-dark.png";

type Variant = "default" | "dark" | "white" | "adaptive";

interface LogoMarkProps {
  variant?: Variant;
  className?: string;
  alt?: string;
}

/**
 * Wenosoft 'W' icon mark. Use across nav, favicon contexts, and brand surfaces.
 * - `default`: purple mark for light surfaces
 * - `dark`: black mark
 * - `white`: white mark (CSS-inverted from dark asset) for fixed dark surfaces
 * - `adaptive`: purple in the light theme, white in the dark theme
 */
export function LogoMark({ variant = "default", className, alt = "Wenosoft" }: LogoMarkProps) {
  const src = variant === "default" || variant === "adaptive" ? iconPurple : iconDark;
  const filter =
    variant === "white"
      ? "invert brightness-0 contrast-100"
      : variant === "adaptive"
        ? "dark:brightness-0 dark:invert"
        : "";
  return (
    <img
      src={src}
      alt={alt}
      loading="eager"
      decoding="async"
      width={512}
      height={512}
      className={[filter, className].filter(Boolean).join(" ")}
    />
  );
}
