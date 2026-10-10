import Image from "next/image";
import { ArrowUp, ArrowUpRight } from "lucide-react";

import { SiteNav } from "@/components/site-nav";
import { ContributionGraph } from "@/components/contribution-graph";
import {
  EXPERIENCE,
  NAV_LINKS,
  PROJECTS,
  PROFILE,
  SOCIAL_LINKS,
  type Project,
  type SocialLink,
} from "@/lib/site";

export default function Home() {
  return (
    <div id="top" className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <SiteNav />

      <main>
        <Hero />
        <ContributionsSection />
        <ExperienceSection />
        <WorkSection />
        <ContactSection />
      </main>

      <SiteFooter />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Hero                                                                        */
/* -------------------------------------------------------------------------- */

function Hero() {
  return (
    <section id="about" className="relative overflow-hidden px-6 pb-20 pt-32 sm:pt-36">
      {/* Soft top glow, Attio-style */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-260px] h-[560px] w-[900px] max-w-[120vw] -translate-x-1/2 rounded-full opacity-70 blur-3xl"
        style={{ background: "radial-gradient(closest-side, var(--glow), transparent)" }}
      />

      <div className="mx-auto flex max-w-5xl flex-col items-center gap-10 text-center md:flex-row md:items-center md:gap-14 md:text-left">
        {/* Circular profile picture, live from GitHub */}
        <div className="card-shadow relative h-40 w-40 shrink-0 overflow-hidden rounded-full border border-border bg-card p-1.5 sm:h-48 sm:w-48">
          <Image
            src={PROFILE.avatar}
            alt={`${PROFILE.name} on GitHub`}
            width={192}
            height={192}
            priority
            sizes="192px"
            className="h-full w-full rounded-full object-cover"
          />
        </div>

        <div className="min-w-0">
          <p className="section-eyebrow">Hey, this is</p>
          <h1 className="mt-3 font-display text-[clamp(2.75rem,8vw,5rem)] font-medium leading-[1.05] tracking-[-0.03em]">
            Wajiha Kulsum
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {PROFILE.tagline}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:justify-start">
            <a
              href={PROFILE.booking}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary px-6 py-3 text-sm font-medium"
            >
              Book a call
              <ArrowUpRight size={16} strokeWidth={2} />
            </a>
            <a href="#work" className="btn-outline px-6 py-3 text-sm font-medium">
              View my work
            </a>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-2.5 md:justify-start">
            {SOCIAL_LINKS.map((link) => (
              <PillLink key={link.label} link={link} small />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PillLink({ link, small = false }: { link: SocialLink; small?: boolean }) {
  return (
    <a
      href={link.href}
      {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`pill text-sm ${small ? "px-4 py-2" : "px-5 py-2.5"}`}
    >
      {link.label}
      <ArrowUpRight
        size={14}
        strokeWidth={2}
        className="text-muted-foreground transition-transform duration-300 hover:rotate-45"
        aria-hidden
      />
    </a>
  );
}

/* -------------------------------------------------------------------------- */
/* Contributions                                                               */
/* -------------------------------------------------------------------------- */

function ContributionsSection() {
  return (
    <section id="contributions" className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
      <SectionHeader eyebrow="GitHub" title="My contributions" />
      <div className="mt-10">
        <ContributionGraph />
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Experience                                                                  */
/* -------------------------------------------------------------------------- */

function ExperienceSection() {
  return (
    <section id="experience">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <SectionHeader
          eyebrow="Career"
          title="Experience"
          description="Where I have been learning, designing, and shipping so far."
        />

        <ol className="mt-10 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card card-shadow">
          {EXPERIENCE.map((entry) => (
            <li key={`${entry.company}-${entry.date}`} className="p-6 sm:p-8">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="text-lg font-medium">{entry.role}</h3>
                  <p className="text-sm text-muted-foreground">
                    {entry.company} &middot; {entry.location}
                  </p>
                </div>
                <p className="whitespace-nowrap text-sm text-muted-foreground tabular-nums">
                  {entry.date}
                </p>
              </div>

              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground">
                {entry.bullets.map((bullet, index) => (
                  <li key={index} className="flex gap-2.5">
                    <span
                      aria-hidden
                      className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-muted-foreground/60"
                    />
                    {bullet}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Work                                                                        */
/* -------------------------------------------------------------------------- */

function WorkSection() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
      <SectionHeader eyebrow="Work" title="Selected projects" />

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const content = (
    <>
      <div className="relative aspect-[4/3] overflow-hidden border-b border-border bg-faint">
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          sizes="(min-width: 768px) 550px, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05] group-focus-visible:scale-[1.05]"
        />
      </div>

      <div className="flex items-start justify-between gap-4 p-6">
        <div>
          <h3 className="font-display text-xl font-medium">{project.name}</h3>
          <p className="mt-1.5 text-sm text-muted-foreground">{project.subtitle}</p>
          {project.description && (
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {project.description}
            </p>
          )}
          {project.behanceUrl && (
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium">
              View case study on Behance
              <ArrowUpRight
                size={14}
                strokeWidth={2}
                className="text-muted-foreground transition-transform duration-300 group-hover:rotate-45"
                aria-hidden
              />
            </span>
          )}
        </div>
        <span
          aria-hidden
          className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors duration-300 group-hover:border-transparent group-hover:bg-foreground group-hover:text-background"
        >
          <ArrowUpRight
            size={15}
            strokeWidth={2}
            className="transition-transform duration-300 group-hover:rotate-45"
          />
        </span>
      </div>
    </>
  );

  const className =
    "group project-card block overflow-hidden rounded-2xl border border-border bg-card";

  // The entire card is one link to the Behance case study: a single tab stop
  // for keyboard users and no invalid nested anchors. Cards without a URL
  // stay plain articles.
  if (project.behanceUrl) {
    return (
      <a
        href={project.behanceUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${project.name} — view case study on Behance`}
        className={className}
      >
        {content}
      </a>
    );
  }

  return <article className={className}>{content}</article>;
}

/* -------------------------------------------------------------------------- */
/* Contact + footer                                                            */
/* -------------------------------------------------------------------------- */

function ContactSection() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 pb-16 pt-24 sm:pt-28">
      <p className="section-eyebrow">Contact</p>

      {/* Loud, editorial CTA — big type instead of a centered button */}
      <div className="mt-6">
        <h2 className="font-display text-[clamp(2.75rem,9vw,7rem)] font-medium leading-[0.95] tracking-[-0.03em]">
          Let&rsquo;s work
          <br />
          together
        </h2>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
          <a
            href={PROFILE.booking}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary px-7 py-3 text-sm font-medium"
          >
            Book a call
            <ArrowUpRight size={16} strokeWidth={2} />
          </a>
          <a
            href={`mailto:${PROFILE.email}`}
            className="group inline-flex items-center gap-1.5 text-sm font-medium"
          >
            <span className="link-underline">{PROFILE.email}</span>
            <ArrowUpRight
              size={14}
              strokeWidth={2}
              className="text-muted-foreground transition-transform duration-300 group-hover:rotate-45"
              aria-hidden
            />
          </a>
        </div>

        <p className="mt-8 max-w-md text-sm leading-relaxed text-muted-foreground">
          Got a project? Want to collaborate? Tell me about it.
        </p>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="relative">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="grid gap-12 sm:grid-cols-3">
          <FooterColumn title="Pages">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="link-underline block w-fit font-medium"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Elsewhere">
            {SOCIAL_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group inline-flex w-fit items-center gap-1.5 font-medium"
                >
                  <span className="link-underline">{link.label}</span>
                  <ArrowUpRight
                    size={14}
                    strokeWidth={2}
                    className="text-muted-foreground transition-transform duration-300 group-hover:rotate-45"
                    aria-hidden
                  />
                </a>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Contact">
            <li>
              <a
                href={`mailto:${PROFILE.email}`}
                className="link-underline block w-fit font-medium"
              >
                {PROFILE.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${PROFILE.phone.replace(/-/g, "")}`}
                className="link-underline block w-fit font-medium"
              >
                {PROFILE.phone}
              </a>
            </li>
            <li>
              <span className="block text-muted-foreground">{PROFILE.location}</span>
            </li>
          </FooterColumn>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-6 py-6 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Wajiha Kulsum</p>
          <p>{PROFILE.location}</p>
          <a
            href="#top"
            className="group inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
          >
            Back to top
            <ArrowUp
              size={12}
              strokeWidth={2}
              className="transition-transform duration-300 group-hover:-translate-y-0.5"
              aria-hidden
            />
          </a>
        </div>
      </div>

      {/* Giant outlined name — clipped to an 0.9em-tall strip, so ~90% of
       * the glyphs peek up from the page edge. */}
      <div aria-hidden className="overflow-hidden px-6 text-[clamp(3.5rem,13vw,13rem)]">
        <p
          className="h-[0.9em] select-none overflow-hidden whitespace-nowrap text-center font-display font-semibold leading-none tracking-[-0.02em] text-transparent"
          style={{ WebkitTextStroke: "1px var(--watermark)" }}
        >
          Wajiha Kulsum
        </p>
      </div>

      {/* Progressive blur — melts the name into the page edge */}
      <div
        aria-hidden
        className="blur-fade pointer-events-none absolute inset-x-0 bottom-0 h-28 sm:h-44"
      />
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">{title}</p>
      <ul className="mt-4 space-y-2.5 text-sm">{children}</ul>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Shared                                                                      */
/* -------------------------------------------------------------------------- */

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="section-eyebrow">{eyebrow}</p>
        <h2 className="mt-3 font-display text-3xl font-medium tracking-tight sm:text-4xl">
          {title}
        </h2>
      </div>
      {description && (
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground md:text-right">
          {description}
        </p>
      )}
    </div>
  );
}
