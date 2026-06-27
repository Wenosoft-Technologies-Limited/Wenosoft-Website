import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { CONTACT } from "@/config/site";

import { LogoLockup } from "../brand/LogoLockup";
import { CTALink } from "../ui-brand/CTAButton";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={[
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-white/5 bg-indigo-deep/80 backdrop-blur-xl"
          : "border-b border-transparent",
      ].join(" ")}
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-[auto_1fr_auto] items-center gap-4 px-6 py-4 sm:px-8">
        <LogoLockup variant="light" withTagline />

        <nav className="hidden justify-center md:flex" aria-label="Primary">
          <ul className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-1.5">
            {NAV.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    [
                      "rounded-full px-4 py-1.5 text-sm transition-colors",
                      isActive
                        ? "bg-electric-violet text-white"
                        : "text-soft-lavender hover:text-foreground",
                    ].join(" ")
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center justify-end gap-3">
          <CTALink
            href={CONTACT.mailto}
            variant="primary"
            size="sm"
            className="hidden sm:inline-flex"
          >
            Start a project
          </CTALink>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="primary-nav-mobile"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 md:hidden"
          >
            <span className="sr-only">Menu</span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div
          id="primary-nav-mobile"
          className="border-t border-white/5 bg-indigo-deep/95 backdrop-blur-xl md:hidden"
        >
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-4" aria-label="Primary">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  [
                    "rounded-lg px-3 py-3 text-base transition-colors",
                    isActive ? "text-white" : "text-soft-lavender hover:bg-white/5",
                  ].join(" ")
                }
              >
                {item.label}
              </NavLink>
            ))}
            <CTALink href={CONTACT.mailto} variant="primary" size="md" className="mt-3">
              Start a project
            </CTALink>
          </nav>
        </div>
      )}
    </header>
  );
}
