import type { ReactNode } from "react";

interface SectionProps {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  className?: string;
  align?: "left" | "center";
  /** Visual surface tone */
  tone?: "default" | "panel";
}

export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  className,
  align = "left",
  tone = "default",
}: SectionProps) {
  const surface =
    tone === "panel" ? "bg-secondary/10 dark:bg-wenosoft-purple/30 border-y border-border/60" : "";
  const alignment = align === "center" ? "text-center mx-auto" : "";

  return (
    <section
      id={id}
      className={["relative w-full py-20 sm:py-28", surface, className].filter(Boolean).join(" ")}
    >
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-8">
        {(eyebrow || title || intro) && (
          <header className={`max-w-3xl ${alignment} mb-12 sm:mb-16`}>
            {eyebrow && <p className="text-caption text-muted-foreground mb-4">{eyebrow}</p>}
            {title && <h2 className="text-heading text-foreground">{title}</h2>}
            {intro && (
              <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                {intro}
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
