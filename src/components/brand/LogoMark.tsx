import iconPurple from "@/assets/wenosoft-icon-purple.png";
import iconDark from "@/assets/wenosoft-icon-dark.png";

type Variant = "default" | "dark" | "white";

interface LogoMarkProps {
  variant?: Variant;
  className?: string;
  alt?: string;
}

/**
 * Wenosoft 'W' icon mark. Use across nav, favicon contexts, and brand surfaces.
 * - `default`: purple mark for light surfaces
 * - `dark`: black mark
 * - `white`: white mark (CSS-inverted from dark asset)
 */
export function LogoMark({ variant = "default", className, alt = "Wenosoft" }: LogoMarkProps) {
  const src = variant === "default" ? iconPurple : iconDark;
  const invert = variant === "white" ? "invert brightness-0 contrast-100" : "";
  return (
    <img
      src={src}
      alt={alt}
      loading="eager"
      decoding="async"
      className={[invert, className].filter(Boolean).join(" ")}
    />
  );
}
