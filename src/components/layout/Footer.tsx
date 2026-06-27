import { Link } from "react-router-dom";

import { CONTACT } from "@/config/site";

import { LogoLockup } from "../brand/LogoLockup";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/5 bg-indigo-deep">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-16 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <LogoLockup variant="light" withTagline />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-soft-lavender">
            Software development and technology consulting, delivered by a team that understands
            both the code and the business case behind it.
          </p>
        </div>

        <div>
          <p className="text-caption text-soft-lavender">Navigate</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <Link to="/" className="text-foreground/90 hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to="/services" className="text-foreground/90 hover:text-white">
                Services
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-foreground/90 hover:text-white">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-foreground/90 hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-caption text-soft-lavender">Contact</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href={CONTACT.mailto} className="text-foreground/90 hover:text-white">
                {CONTACT.email}
              </a>
            </li>
            <li>
              <a
                href={`https://${CONTACT.website}`}
                className="text-foreground/90 hover:text-white"
              >
                {CONTACT.website}
              </a>
            </li>
            <li className="text-soft-lavender">Founder &amp; CEO — {CONTACT.founder}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 px-6 py-6 text-xs text-soft-lavender sm:flex-row sm:items-center sm:px-8">
          <p>© {new Date().getFullYear()} Wenosoft Technologies. All rights reserved.</p>
          <p className="text-caption">Clarity out of complexity</p>
        </div>
      </div>
    </footer>
  );
}
