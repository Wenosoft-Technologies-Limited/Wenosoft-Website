import brandStory from "@/assets/wenosoft-brand-story.png";
import { Section } from "@/components/layout/Section";
import { Seo } from "@/components/seo/Seo";
import { CTALink } from "@/components/ui-brand/CTAButton";
import { CONTACT, SITE } from "@/config/site";

const TITLE = `About — ${SITE.name}`;
const DESCRIPTION =
  "Wenosoft Technologies exists at the intersection of two things most companies struggle to find in one place: the ability to build, and the ability to think.";

const PRINCIPLES = [
  {
    title: "Build",
    body: "We ship production software — not slideware. Engineering judgment at every layer.",
  },
  {
    title: "Think",
    body: "Strategy and architecture from people who have stood in your shoes, and shipped from them.",
  },
  {
    title: "Deliver",
    body: "Clarity out of complexity. Structure where there was none. A partnership that thinks.",
  },
];

export function AboutPage() {
  return (
    <>
      <Seo title={TITLE} description={DESCRIPTION} path="/about" ogImage={brandStory} />

      <section className="relative overflow-hidden border-b border-white/5">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 left-1/3 h-[520px] w-[520px] rounded-full bg-electric-violet/25 blur-[140px]" />
        </div>
        <div className="relative mx-auto max-w-4xl px-6 py-24 text-center sm:px-8 sm:py-32">
          <p className="text-caption text-soft-lavender">About</p>
          <h1 className="mt-5 text-display text-foreground">
            A partnership that <span className="text-soft-lavender">thinks</span>.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-soft-lavender">
            Wenosoft exists at the intersection of two things most companies struggle to find in one
            place. The ability to build, and the ability to think.
          </p>
        </div>
      </section>

      <Section eyebrow="Brand story" title="Simple rules. Deliberate construction.">
        <div className="grid gap-12 md:grid-cols-[1fr_1.2fr] md:items-start">
          <div className="overflow-hidden rounded-3xl border border-white/10">
            <img
              src={brandStory}
              alt="Wenosoft brand story plaque"
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
              width={1200}
              height={700}
            />
          </div>
          <div className="space-y-5 text-base leading-relaxed text-soft-lavender sm:text-lg">
            <p>
              Wenosoft Technologies exists at the intersection of two things most companies struggle
              to find in one place. The ability to build, and the ability to think. Software
              development and technology consulting, delivered by a team that understands both the
              code and the business case behind it.
            </p>
            <p>
              The mark is built from geometry — the most fundamental language of technology. Every
              line of code follows logic. Every system follows structure. Every solution, no matter
              how complex, starts with a simple set of rules.
            </p>
            <p>
              That is what Wenosoft delivers for every client. Clarity out of complexity. Structure
              where there was none. Software that works, and a partnership that thinks.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="panel" eyebrow="Our principles" title="Three ideas. Every engagement.">
        <ul className="grid gap-5 md:grid-cols-3">
          {PRINCIPLES.map((p, i) => (
            <li key={p.title} className="rounded-2xl border border-white/10 bg-indigo-deep/40 p-7">
              <p className="text-caption text-soft-lavender">0{i + 1}</p>
              <h3 className="mt-3 font-display text-2xl text-foreground">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-soft-lavender">{p.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section eyebrow="Leadership" align="center">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-3xl text-foreground sm:text-4xl">{CONTACT.founder}</p>
          <p className="mt-2 text-caption text-soft-lavender">Founder &amp; CEO</p>
          <p className="mt-6 text-soft-lavender">
            Leading a team that pairs engineering depth with strategic clarity — across software,
            AI, cloud, and enterprise systems.
          </p>
          <div className="mt-10 flex justify-center">
            <CTALink href={CONTACT.mailto} variant="primary" size="lg">
              Work with us
            </CTALink>
          </div>
        </div>
      </Section>
    </>
  );
}
