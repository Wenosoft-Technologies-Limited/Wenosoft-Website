import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom";

import { CTALink } from "@/components/ui-brand/CTAButton";

export function RouteErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error) && error.status === 404) {
    return <NotFoundCard />;
  }

  // Log non-404 errors so they're visible in production tooling.
  console.error(error);

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6">
      <div className="max-w-md text-center">
        <p className="text-caption text-soft-lavender">Error</p>
        <h1 className="mt-3 text-heading text-foreground">Something didn&apos;t load</h1>
        <p className="mt-3 text-soft-lavender">
          We hit an unexpected issue. Please refresh, or head back home.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <CTALink
            href="#"
            variant="primary"
            onClick={(event) => {
              event.preventDefault();
              window.location.reload();
            }}
          >
            Try again
          </CTALink>
          <Link
            to="/"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/15 px-6 text-sm text-foreground transition-colors hover:border-soft-lavender hover:bg-white/5"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function NotFoundCard() {
  return (
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
  );
}
