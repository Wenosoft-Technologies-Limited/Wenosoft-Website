import { Seo } from "@/components/seo/Seo";
import { CTALink } from "@/components/ui-brand/CTAButton";
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
        <div className="max-w-md text-center">
          <p className="text-caption text-soft-lavender">404</p>
          <h1 className="mt-3 text-heading text-foreground">This page wandered off.</h1>
          <p className="mt-3 text-soft-lavender">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="mt-8">
            <CTALink href="/" variant="primary">
              Back to home
            </CTALink>
          </div>
        </div>
      </div>
    </>
  );
}
