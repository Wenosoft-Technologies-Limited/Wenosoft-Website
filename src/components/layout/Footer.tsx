import { Link } from "react-router-dom";

import { CONTACT } from "@/config/site";

import { LogoLockup } from "../brand/LogoLockup";
import { Stagger, StaggerItem } from "../motion/Stagger";
import { SocialLinks } from "../ui-brand/SocialLinks";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-border/60 bg-background">
      <Stagger
        as="div"
        className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-16 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]"
      >
        <StaggerItem>
          <LogoLockup variant="light" withTagline />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Software development and technology consulting, delivered by a team that understands
            both the code and the business case behind it.
          </p>
        </StaggerItem>

        <StaggerItem>
          <p className="text-caption text-muted-foreground">Navigate</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <Link to="/" className="text-foreground/90 hover:text-foreground">
                Home
              </Link>
            </li>
            <li>
              <Link to="/services" className="text-foreground/90 hover:text-foreground">
                Services
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-foreground/90 hover:text-foreground">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-foreground/90 hover:text-foreground">
                Contact
              </Link>
            </li>
          </ul>
        </StaggerItem>

        <StaggerItem>
          <p className="text-caption text-muted-foreground">Contact</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href={CONTACT.mailto} className="text-foreground/90 hover:text-foreground">
                {CONTACT.email}
              </a>
            </li>
            <li>
              <a
                href={`https://${CONTACT.website}`}
                className="text-foreground/90 hover:text-foreground"
              >
                {CONTACT.website}
              </a>
            </li>
            <li className="text-foreground/90">{CONTACT.location}</li>
          </ul>
          <p className="mt-8 text-caption text-muted-foreground">Follow</p>
          <SocialLinks className="mt-4" />
        </StaggerItem>
      </Stagger>

      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 px-6 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:px-8">
          <p>© {new Date().getFullYear()} Wenosoft Technologies. All rights reserved.</p>
          <p className="text-caption">Clarity out of complexity</p>
        </div>
      </div>
    </footer>
  );
}
