import banner from "@/assets/wenosoft-banner.png";
import founderImage from "@/assets/wenosoft-founder.jpeg";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { scaleIn } from "@/components/motion/variants";
import { Seo } from "@/components/seo/Seo";
import { CTALink } from "@/components/ui-brand/CTAButton";
import { SocialLinks } from "@/components/ui-brand/SocialLinks";
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
          <div className="animate-float-slow absolute -left-40 top-1/3 h-[520px] w-[520px] rounded-full bg-wenosoft-purple/40 blur-[140px]" />
          <div className="animate-float-slower absolute right-0 top-10 h-[420px] w-[420px] rounded-full bg-electric-violet/30 blur-[120px]" />
        </div>

        <div className="relative mx-auto grid max-w-6xl gap-16 px-6 py-24 sm:px-8 sm:py-32 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <Reveal>
              <p className="text-caption text-muted-foreground">Contact</p>
              <h1 className="mt-5 text-display text-foreground">Let&apos;s talk.</h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                Tell us about the problem you&apos;re solving. We&apos;ll come back within one
                business day with a clear next step, not a sales pitch.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="mt-10 flex flex-wrap gap-3">
              <CTALink href={CONTACT.mailto} variant="primary" size="lg">
                Email the team
              </CTALink>
              <CTALink href={`mailto:${CONTACT.email}`} variant="outline" size="lg">
                {CONTACT.email}
              </CTALink>
            </Reveal>

            <Stagger
              as="dl"
              className="mt-14 grid gap-6 border-t border-border pt-10 sm:grid-cols-2"
            >
              <StaggerItem interactive>
                <ContactCard
                  label="General inquiries"
                  value={CONTACT.email}
                  href={`mailto:${CONTACT.email}`}
                />
              </StaggerItem>
              <StaggerItem interactive>
                <ContactCard label="Office" value={CONTACT.location} />
              </StaggerItem>
              <StaggerItem interactive>
                <ContactCard label="Founder & CEO" value={CONTACT.founder} imageSrc={founderImage} />
              </StaggerItem>
              <StaggerItem interactive>
                <ContactCard label="Response time" value="Within 1 business day" />
              </StaggerItem>
            </Stagger>

            <Reveal className="mt-10">
              <p className="text-caption text-muted-foreground">Connect with us</p>
              <SocialLinks className="mt-4" iconClassName="h-6 w-6" />
            </Reveal>
          </div>

          <Reveal variants={scaleIn} delay={0.15} className="relative">
            <div className="overflow-hidden rounded-3xl border border-border shadow-2xl">
              <img
                src={banner}
                alt="Wenosoft Technologies storefront signage"
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
                width={1080}
                height={1350}
              />
            </div>
            <p className="mt-4 text-center text-xs uppercase tracking-[0.18em] text-muted-foreground">
              {SITE.tagline}
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function ContactCard({
  label,
  value,
  href,
  imageSrc,
}: {
  label: string;
  value: string;
  href?: string;
  imageSrc?: string;
}) {
  const content = (
    <>
      <dt className="text-caption text-muted-foreground">{label}</dt>
      {imageSrc ? (
        <dd className="mt-3 flex items-center gap-3">
          <img
            src={imageSrc}
            alt={`${value}, ${label} at Wenosoft Technologies`}
            className="h-12 w-12 rounded-full border border-soft-lavender/40 object-cover"
            loading="lazy"
            decoding="async"
            width={96}
            height={96}
          />
          <span className="font-display text-lg text-foreground">{value}</span>
        </dd>
      ) : (
        <dd className="mt-2 font-display text-lg text-foreground">{value}</dd>
      )}
    </>
  );
  return (
    <div className="rounded-2xl border border-border bg-foreground/[0.03] p-5 transition-colors hover:border-soft-lavender/60">
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
