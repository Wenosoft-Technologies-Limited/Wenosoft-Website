import { Link } from "react-router-dom";

import iconShowcase from "@/assets/wenosoft-icon-showcase.png";
import logoReveal from "@/assets/wenosoft-logo-reveal.png";
import { LogoMark } from "@/components/brand/LogoMark";
import { Section } from "@/components/layout/Section";
import { Seo } from "@/components/seo/Seo";
import { CTALink } from "@/components/ui-brand/CTAButton";
import { CONTACT, SITE } from "@/config/site";

const TITLE = `${SITE.name} — Experience the Future of Technology Today`;
const DESCRIPTION =
  "Software development and technology consulting. Wenosoft bridges the ability to build with the ability to think — delivering clarity out of complexity.";

const CAPABILITIES = [
  { title: "Software Development", body: "Web and mobile applications engineered for scale." },
  { title: "AI Solutions", body: "Practical AI integrations that move real business metrics." },
  { title: "Cloud & DevOps", body: "Resilient infrastructure, CI/CD, and platform engineering." },
  { title: "Enterprise Automation", body: "Workflows and systems that remove manual friction." },
  { title: "Data Analytics", body: "Pipelines and dashboards that turn data into decisions." },
  { title: "IT Consultancy", body: "Strategy and architecture from a team that ships." },
];

export function HomePage() {
  return (
    <>
      <Seo title={TITLE} description={DESCRIPTION} path="/" ogImage={logoReveal} />
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
          <p className="text-caption text-soft-lavender">Wenosoft Technologies</p>
          <h1 className="mt-5 text-display text-foreground">
            Experience the future of <span className="text-soft-lavender">technology</span> today.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-soft-lavender">
            Ready to build something that lasts? We deliver software and consulting from a team that
            understands both the code and the business case behind it.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <CTALink href={CONTACT.mailto} variant="primary" size="lg">
              Get started
            </CTALink>
            <Link
              to="/services"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-white/15 px-8 text-base text-foreground transition-colors hover:border-soft-lavender hover:bg-white/5"
            >
              What we do
            </Link>
          </div>
          <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-white/10 pt-8 text-left">
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
              width={1200}
              height={1200}
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
      <dd className="mt-1 text-xs uppercase tracking-[0.18em] text-soft-lavender">{v}</dd>
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
    <div className="relative border-y border-white/5 bg-wenosoft-purple/20">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-6 py-6 text-caption text-soft-lavender sm:px-8">
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
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CAPABILITIES.map((c) => (
          <li
            key={c.title}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all hover:-translate-y-1 hover:border-soft-lavender/40 hover:bg-white/[0.05]"
          >
            <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-electric-violet/20 ring-1 ring-electric-violet/30">
              <LogoMark variant="white" className="h-5 w-5" />
            </div>
            <h3 className="font-display text-xl text-foreground">{c.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-soft-lavender">{c.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function PhilosophyPanel() {
  return (
    <section className="relative overflow-hidden bg-wenosoft-purple py-24 sm:py-32">
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
          <p className="mt-5 font-display text-2xl leading-snug text-foreground sm:text-3xl">
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
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-soft-lavender"
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
      <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-wenosoft-purple/60 via-indigo-deep to-indigo-deep p-10 text-center sm:p-16">
        <div aria-hidden className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="relative">
          <p className="text-caption text-soft-lavender">Let&apos;s talk</p>
          <h2 className="mt-4 text-heading text-foreground">
            Ready to build something that lasts?
          </h2>
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
