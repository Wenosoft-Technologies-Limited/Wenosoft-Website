import {
  forwardRef,
  type ButtonHTMLAttributes,
  type AnchorHTMLAttributes,
  type ReactNode,
} from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-violet focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-electric-violet text-white hover:bg-electric-violet/90 hover:-translate-y-0.5 hover:shadow-[0_12px_36px_-8px_color-mix(in_oklab,var(--electric-violet)_70%,transparent)]",
  secondary: "bg-foreground text-background hover:bg-foreground/85 hover:-translate-y-0.5",
  outline: "border border-border text-foreground hover:border-soft-lavender hover:bg-muted",
  ghost: "text-foreground hover:bg-muted",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-14 px-8 text-base",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement>;
type AnchorProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export const CTAButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, children, ...rest }, ref) => (
    <button
      ref={ref}
      className={[base, variants[variant], sizes[size], className].filter(Boolean).join(" ")}
      {...rest}
    >
      {children}
    </button>
  ),
);
CTAButton.displayName = "CTAButton";

export function CTALink({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: AnchorProps) {
  return (
    <a
      className={[base, variants[variant], sizes[size], className].filter(Boolean).join(" ")}
      {...rest}
    >
      {children}
    </a>
  );
}
