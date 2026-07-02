import { Reveal } from "@/components/motion/Reveal";
import { Seo } from "@/components/seo/Seo";
import { CTALink } from "@/components/ui-brand/CTAButton";
import { scaleIn } from "@/components/motion/variants";
import { SITE } from "@/config/site";

export function NotFoundPage() {
  return (
    <>
      <Seo
        title={`Page not found | ${SITE.name}`}
        description="The page you are looking for doesn't exist or has been moved."
        path="/404"
        noIndex
      />

      <div className="flex min-h-[70vh] items-center justify-center px-6">
        <Reveal variants={scaleIn} className="max-w-md text-center">
          <p className="text-caption text-muted-foreground">404</p>
          <h1 className="mt-3 text-heading text-foreground">This page wandered off.</h1>
          <p className="mt-3 text-muted-foreground">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="mt-8">
            <CTALink href="/" variant="primary">
              Back to home
            </CTALink>
          </div>
        </Reveal>
      </div>
    </>
  );
}
