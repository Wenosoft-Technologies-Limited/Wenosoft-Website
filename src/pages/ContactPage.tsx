import banner from "@/assets/wenosoft-banner.png";
import { Seo } from "@/components/seo/Seo";
import { CTALink } from "@/components/ui-brand/CTAButton";
import { CONTACT, SITE } from "@/config/site";

const TITLE = `Contact | ${SITE.name}`;
const DESCRIPTION =
  "Get in touch with Wenosoft Technologies. Email info@wenosoft.com to start a consulting or software engagement.";

export function ContactPage() {
  return (
    <>
      <Seo title={TITLE} description={DESCRIPTION} path="/contact" ogImage={banner} />

      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 top-1/3 h-[520px] w-[520px] rounded-full bg-wenosoft-purple/40 blur-[140px]" />
          <div className="absolute right-0 top-10 h-[420px] w-[420px] rounded-full bg-electric-violet/30 blur-[120px]" />
        </div>

        <div className="relative mx-auto grid max-w-6xl gap-16 px-6 py-24 sm:px-8 sm:py-32 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <p className="text-caption text-soft-lavender">Contact</p>
            <h1 className="mt-5 text-display text-foreground">Let&apos;s talk.</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-soft-lavender">
              Tell us about the problem you&apos;re solving. We&apos;ll come back within one
              business day with a clear next step, not a sales pitch.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <CTALink href={CONTACT.mailto} variant="primary" size="lg">
                Email the team
              </CTALink>
              <CTALink href={`mailto:${CONTACT.email}`} variant="outline" size="lg">
                {CONTACT.email}
              </CTALink>
            </div>

            <dl className="mt-14 grid gap-6 border-t border-white/10 pt-10 sm:grid-cols-2">
              <ContactCard
                label="General inquiries"
                value={CONTACT.email}
                href={`mailto:${CONTACT.email}`}
              />
              <ContactCard
                label="Website"
                value={CONTACT.website}
                href={`https://${CONTACT.website}`}
              />
              <ContactCard label="Founder & CEO" value={CONTACT.founder} />
              <ContactCard label="Response time" value="Within 1 business day" />
            </dl>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
              <img
                src={banner}
                alt="Wenosoft Technologies storefront signage"
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
                width={1400}
                height={900}
              />
            </div>
            <p className="mt-4 text-center text-xs uppercase tracking-[0.18em] text-soft-lavender">
              {SITE.tagline}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactCard({ label, value, href }: { label: string; value: string; href?: string }) {
  const content = (
    <>
      <dt className="text-caption text-soft-lavender">{label}</dt>
      <dd className="mt-2 font-display text-lg text-foreground">{value}</dd>
    </>
  );
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-soft-lavender/40">
      {href ? (
        <a href={href} className="block">
          {content}
        </a>
      ) : (
        content
      )}
    </div>
  );
}
