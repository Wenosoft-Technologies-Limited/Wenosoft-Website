import { Link } from "react-router-dom";

import iconShowcase from "@/assets/wenosoft-icon-showcase.png";
import logoReveal from "@/assets/wenosoft-logo-reveal.png";
import { LogoMark } from "@/components/brand/LogoMark";
import { Section } from "@/components/layout/Section";
import { Seo } from "@/components/seo/Seo";
import { CTALink } from "@/components/ui-brand/CTAButton";
import { CONTACT, SITE, SOCIAL } from "@/config/site";

const TITLE = `${SITE.name} | Clarity out of complexity`;
const DESCRIPTION =
  "Software development and technology consulting. Wenosoft bridges the ability to think with the ability to build, delivering clarity out of complexity.";

const ORGANIZATION_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.legalName,
  alternateName: SITE.name,
  url: SITE.url,
  logo: `${SITE.url}/wenosoft-icon-purple.png`,
  description: SITE.description,
  email: CONTACT.email,
  address: {
    "@type": "PostalAddress",
    addressRegion: "Lagos State",
    addressCountry: "NG",
  },
  sameAs: SOCIAL.map((profile) => profile.url),
};

const CAPABILITIES = [
  {
    title: "AI & Automation",
    body: "Practical AI integrations and automated workflows. Less manual friction, more time for the decisions that need people.",
  },
  {
    title: "Strategic Software Development",
    body: "Web, mobile, and SaaS products engineered for scale. Built deliberately, so they hold up as your business grows.",
  },
  {
    title: "Cloud & Data Intelligence",
    body: "Resilient infrastructure and data pipelines. Dashboards that turn raw events into clear decisions.",
  },
  {
    title: "IT Consultancy",
    body: "Strategy, architecture, and technical due diligence. Advice from a team that ships.",
  },
];

export function HomePage() {
  return (
    <>
      <Seo
        title={TITLE}
        description={DESCRIPTION}
        path="/"
        ogImage={logoReveal}
        jsonLd={ORGANIZATION_JSONLD}
      />
      <Hero />
      <TrustStrip />
      <CapabilitiesGrid />
      <PhilosophyPanel />
      <ContactCTA />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-20%] h-[640px] w-[640px] -translate-x-1/2 rounded-full bg-electric-violet/30 blur-[140px]" />
        <div className="absolute bottom-[-40%] right-[-10%] h-[480px] w-[480px] rounded-full bg-wenosoft-purple/40 blur-[120px]" />
      </div>
      <div aria-hidden className="absolute inset-0 bg-grid-pattern opacity-40" />

      <div className="relative mx-auto grid w-full max-w-6xl gap-16 px-6 py-24 sm:px-8 sm:py-32 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div>
          <p className="text-caption text-muted-foreground">Wenosoft Technologies</p>
          <h1 className="mt-5 text-display text-foreground">
            Clarity out of <span className="text-primary dark:text-soft-lavender">complexity</span>.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            We build software with deliberate structure. Our team understands the code and the
            business case behind it. You get systems that last.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <CTALink href={CONTACT.mailto} variant="primary" size="lg">
              Get started
            </CTALink>
            <Link
              to="/services"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-border px-8 text-base text-foreground transition-colors hover:border-soft-lavender hover:bg-muted"
            >
              What we do
            </Link>
          </div>
          <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-border pt-8 text-left">
            <Stat k="100%" v="Senior team" />
            <Stat k="∞" v="Ownership" />
            <Stat k="1:1" v="Partnership" />
          </dl>
        </div>

        <div className="relative mx-auto flex w-full max-w-md items-center justify-center">
          <div className="relative aspect-square w-full">
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-electric-violet/40 via-wenosoft-purple/30 to-transparent blur-2xl" />
            <img
              src={iconShowcase}
              alt="Wenosoft brand icon presented in a glass prism"
              className="relative h-full w-full rounded-[2rem] object-cover"
              loading="eager"
              decoding="async"
              width={1080}
              height={1350}
              fetchPriority="high"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dt className="font-display text-2xl text-foreground sm:text-3xl">{k}</dt>
      <dd className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">{v}</dd>
    </div>
  );
}

function TrustStrip() {
  const items = [
    "Information Technology",
    "AI Solutions",
    "SaaS Products",
    "Cloud",
    "Enterprise Automation",
    "Data Analytics",
  ];
  return (
    <div className="relative border-y border-border/60 bg-secondary/10 dark:bg-wenosoft-purple/20">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-6 py-6 text-caption text-muted-foreground sm:px-8">
        {items.map((i) => (
          <span key={i}>{i}</span>
        ))}
      </div>
    </div>
  );
}

function CapabilitiesGrid() {
  return (
    <Section
      eyebrow="What we do"
      title="Software that works. A partnership that thinks."
      intro="We pair engineering depth with strategic clarity. From first prototype to enterprise scale."
    >
      <ul className="grid gap-4 sm:grid-cols-2">
        {CAPABILITIES.map((c) => (
          <li
            key={c.title}
            className="group relative overflow-hidden rounded-2xl border border-border bg-foreground/[0.03] p-6 transition-all hover:-translate-y-1 hover:border-soft-lavender/60 hover:bg-foreground/[0.05]"
          >
            <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-electric-violet/20 ring-1 ring-electric-violet/30">
              <LogoMark variant="adaptive" className="h-5 w-5" />
            </div>
            <h3 className="font-display text-xl text-foreground">{c.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function PhilosophyPanel() {
  return (
    <section className="dark relative overflow-hidden bg-wenosoft-purple py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-30"
      />
      <div
        aria-hidden
        className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-electric-violet/40 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 sm:px-8 md:grid-cols-[1fr_1.4fr] md:items-center">
        <div className="relative">
          <LogoMark variant="white" className="h-32 w-auto opacity-90" />
        </div>
        <div>
          <p className="text-caption text-soft-lavender">Brand Story</p>
          <p className="mt-5 font-display text-2xl leading-snug text-white sm:text-3xl">
            The mark is built from geometry, the most fundamental language of technology. Every line
            of code follows logic. Every system follows structure.
          </p>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-soft-lavender">
            Wenosoft delivers clarity out of complexity. Structure where there was none. Software
            that works, and a partnership that thinks.
          </p>
          <div className="mt-8">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-soft-lavender"
            >
              Read the full story
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactCTA() {
  return (
    <Section align="center">
      <div className="dark relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-wenosoft-purple/60 via-indigo-deep to-indigo-deep p-10 text-center sm:p-16">
        <div aria-hidden className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="relative">
          <p className="text-caption text-soft-lavender">Let&apos;s talk</p>
          <h2 className="mt-4 text-heading text-white">Build something that lasts.</h2>
          <p className="mx-auto mt-4 max-w-xl text-soft-lavender">
            Tell us about the problem. We&apos;ll bring the structure, the people, and the code.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <CTALink href={CONTACT.mailto} variant="primary" size="lg">
              Contact us
            </CTALink>
            <CTALink href={`mailto:${CONTACT.email}`} variant="outline" size="lg">
              {CONTACT.email}
            </CTALink>
          </div>
        </div>
      </div>
    </Section>
  );
}
