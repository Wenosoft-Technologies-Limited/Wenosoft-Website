import { Section } from "@/components/layout/Section";
import { Seo } from "@/components/seo/Seo";
import { CTALink } from "@/components/ui-brand/CTAButton";
import { CONTACT, SITE } from "@/config/site";

const TITLE = `Services | ${SITE.name}`;
const DESCRIPTION =
  "Custom software, AI, cloud, automation, and IT consulting. Engineered with structure and shipped with care.";

const SERVICES = [
  {
    title: "Software Development",
    body: "Custom web and mobile applications built for clarity, performance, and longevity.",
    points: ["Product engineering", "Web & mobile apps", "Modernization & refactors"],
  },
  {
    title: "Artificial Intelligence Solutions",
    body: "Practical AI capability, from intelligent assistants to decision systems grounded in your data.",
    points: ["LLM integrations", "Workflow copilots", "Custom model deployment"],
  },
  {
    title: "SaaS Products",
    body: "End-to-end product builds with multi-tenant architecture, billing, and observability baked in.",
    points: ["Architecture & DX", "Subscription billing", "Analytics & retention"],
  },
  {
    title: "Cloud Solutions",
    body: "Resilient infrastructure on AWS, GCP, and Azure. Designed for scale and cost discipline.",
    points: ["Platform engineering", "Migration & lift-and-shift", "Cost optimization"],
  },
  {
    title: "Enterprise Automation",
    body: "Replace manual handoffs with reliable, auditable systems that move work forward.",
    points: ["Process automation", "Internal tools", "Integrations & ETL"],
  },
  {
    title: "Data Analytics",
    body: "From raw events to executive dashboards. Pipelines and visualizations that tell the truth.",
    points: ["Data pipelines", "BI dashboards", "Warehouse modeling"],
  },
  {
    title: "Web & Mobile Application Development",
    body: "Beautiful, accessible, performance-first interfaces built with modern frameworks.",
    points: ["React / TypeScript", "iOS & Android", "Design systems"],
  },
  {
    title: "IT Consultancy",
    body: "Strategy, architecture and technical due diligence from a team that ships, not just slides.",
    points: ["Tech strategy", "Architecture reviews", "Hiring & team design"],
  },
];

const PROCESS = [
  {
    step: "Discover",
    body: "We listen first. Map the business case, the constraints, and the risks.",
  },
  { step: "Design", body: "Architecture, UX, and a plan you can read in one sitting." },
  { step: "Build", body: "Tight iteration loops. Senior engineers. No surprises." },
  { step: "Operate", body: "We stay through launch, scale and the boring bits that matter." },
];

export function ServicesPage() {
  return (
    <>
      <Seo title={TITLE} description={DESCRIPTION} path="/services" />

      <section className="relative overflow-hidden border-b border-border/60">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 left-1/4 h-[480px] w-[480px] rounded-full bg-wenosoft-purple/40 blur-[140px]" />
          <div className="absolute right-0 top-20 h-[380px] w-[380px] rounded-full bg-electric-violet/25 blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-4xl px-6 py-24 text-center sm:px-8 sm:py-32">
          <p className="text-caption text-muted-foreground">Services</p>
          <h1 className="mt-5 text-display text-foreground">
            Engineering, strategy, and everything between.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            One team. Full-stack capability. Designed to flex from prototype to enterprise scale.
          </p>
        </div>
      </section>

      <Section>
        <ul className="grid gap-5 md:grid-cols-2">
          {SERVICES.map((s, i) => (
            <li
              key={s.title}
              className="group relative overflow-hidden rounded-3xl border border-border bg-foreground/[0.03] p-8 transition-all hover:-translate-y-1 hover:border-soft-lavender/60"
            >
              <p className="text-caption text-muted-foreground">{`0${i + 1}`}</p>
              <h2 className="mt-4 font-display text-2xl text-foreground sm:text-3xl">{s.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {s.body}
              </p>
              <ul className="mt-6 space-y-2 text-sm text-foreground/90">
                {s.points.map((p) => (
                  <li key={p} className="flex items-center gap-3">
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-electric-violet" />
                    {p}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="panel" eyebrow="Process" title="A simple, deliberate way of working.">
        <ol className="grid gap-5 md:grid-cols-4">
          {PROCESS.map((p, i) => (
            <li key={p.step} className="relative rounded-2xl border border-border bg-card p-6">
              <p className="font-display text-4xl text-primary">{`0${i + 1}`}</p>
              <h3 className="mt-4 font-display text-xl text-foreground">{p.step}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section align="center">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-heading text-foreground">Start the conversation.</h2>
          <p className="mt-4 text-muted-foreground">
            One email is all it takes. We reply within one business day.
          </p>
          <div className="mt-8 flex justify-center">
            <CTALink href={CONTACT.mailto} variant="primary" size="lg">
              Contact us
            </CTALink>
          </div>
        </div>
      </Section>
    </>
  );
}
