import Image from "next/image";
import { ArrowUp, ArrowUpRight } from "lucide-react";

import { SiteNav } from "@/components/site-nav";
import { ContributionGraph } from "@/components/contribution-graph";
import { FooterName } from "@/components/footer-name";
import { HeroOrbit } from "@/components/hero-orbit";
import {
  AKAIEARN,
  AKAISPACE,
  EARLY_REPOS,
  MERIDIAN,
  NAV_LINKS,
  PROFILE,
  SOCIAL_LINKS,
  STORY,
  STORY_INTRO,
  STUDIES,
  type Chapter,
  type Project,
  type Shot,
} from "@/lib/site";

const LANE = "mx-auto w-full max-w-[1120px] px-6";
const BTN = "inline-flex h-11 items-center justify-center gap-2 px-5 text-sm font-medium";
const EXTERNAL = { target: "_blank", rel: "noopener noreferrer" } as const;

export default function Home() {
  return (
    <div id="top" className="min-h-screen overflow-x-clip bg-background text-foreground">
      <SiteNav />

      <main id="main">
        <Hero />
        <StorySection />
        <WorkSection />
        <ContributionsSection />
        <ContactSection />
      </main>

      <SiteFooter />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Shared pieces                                                               */
/* -------------------------------------------------------------------------- */

/** Figma-style selection: frame, four handles and the shot's pixel size. */
function Selection({ size }: { size?: string }) {
  return (
    <span aria-hidden className="sel">
      <span className="sel-handle" />
      <span className="sel-handle" />
      <span className="sel-handle" />
      <span className="sel-handle" />
      {size && <span className="sel-tag">{size}</span>}
    </span>
  );
}

function ShotImage({ shot, sizes, priority = false, className = "" }: {
  shot: Shot;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Image
      src={shot.src}
      alt={shot.alt}
      width={shot.width}
      height={shot.height}
      sizes={sizes}
      priority={priority}
      className={`block h-auto w-full ${className}`}
    />
  );
}

function SectionTitle({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className="max-w-[60ch]">
      <h2 className="text-[clamp(2rem,4vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.025em] text-balance">
        {title}
      </h2>
      {children && (
        <p className="mt-3 text-lg leading-relaxed text-muted-foreground text-pretty">{children}</p>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Hero                                                                        */
/* -------------------------------------------------------------------------- */

function Hero() {
  return (
    <section id="about" className="relative overflow-x-clip pt-24 sm:pt-28">
      <div className={LANE}>
        <div
          className="rise flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-sm"
          style={{ "--d": "0ms" } as React.CSSProperties}
        >
          <p>
            Hi, I&rsquo;m <span className="font-medium">{PROFILE.name}</span>, based in {PROFILE.location}.
          </p>
          <p className="inline-flex items-center gap-2 text-muted-foreground">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
            {PROFILE.availability}
          </p>
        </div>
      </div>

      {/* The giant words sit behind the orbit; the h1 reads as one sentence. */}
      <h1 className="sr-only">Wajiha Kulsum, a product designer who also writes the code.</h1>
      <div className="relative mx-auto max-w-[1440px] px-6 sm:px-10">
        <p
          aria-hidden
          className="hero-word rise relative z-0 mt-6 sm:mt-2"
          style={{ "--d": "80ms" } as React.CSSProperties}
        >
          Product
        </p>
        <div
          className="rise relative z-10 -my-16 sm:-my-28 lg:-my-40"
          style={{ "--d": "200ms" } as React.CSSProperties}
        >
          <HeroOrbit />
        </div>
        <p
          aria-hidden
          className="hero-word rise relative z-0 text-right"
          style={{ "--d": "140ms" } as React.CSSProperties}
        >
          designer
        </p>
      </div>

      <div
        className={`${LANE} rise mt-8 flex flex-col gap-8 sm:mt-10 md:flex-row md:items-end md:justify-between`}
        style={{ "--d": "320ms" } as React.CSSProperties}
      >
        <div className="max-w-[44ch]">
          <p className="text-[clamp(1.5rem,2.6vw,2rem)] leading-tight tracking-[-0.02em]">
            who also writes the code.
          </p>
          <p className="mt-3 text-lg leading-relaxed text-muted-foreground text-pretty">
            {PROFILE.tagline}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href={PROFILE.booking} {...EXTERNAL} className={`btn-primary ${BTN}`}>
            Book a call
            <ArrowUpRight size={16} strokeWidth={2} aria-hidden />
          </a>
          <a href="#story" className={`btn-outline ${BTN}`}>
            Read my story
          </a>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Story                                                                       */
/* -------------------------------------------------------------------------- */

function ChapterVisual({ visual }: { visual: Chapter["visual"] }) {
  if (visual === "repos") {
    return (
      <ul className="overflow-hidden rounded-2xl bg-plate font-mono text-[13px]">
        {EARLY_REPOS.map((repo) => (
          <li key={repo.name}>
            <a
              href={repo.href}
              {...EXTERNAL}
              className="flex items-center justify-between gap-4 px-5 py-3.5 transition-colors duration-200 hover:bg-[var(--hover)]"
            >
              <span>
                <span className="text-muted-foreground">wajiha-kulsum/</span>
                {repo.name}
              </span>
              <span className="tabular-nums text-muted-foreground">{repo.year}</span>
            </a>
          </li>
        ))}
      </ul>
    );
  }
  if (visual === "studies") {
    const picks = STUDIES.filter((study) => study.name === "Swiftze" || study.name === "Splitr");
    return (
      <div className="grid grid-cols-2 gap-4">
        {picks.map((study) => (
          <a key={study.name} href={study.href} {...EXTERNAL} className="work relative block">
            <div className="shot">
              <ShotImage shot={study.shot} sizes="(min-width: 768px) 260px, 45vw" />
            </div>
            <Selection />
          </a>
        ))}
      </div>
    );
  }
  if (visual === "stat") {
    return (
      <p className="rounded-2xl bg-plate px-6 py-8 text-[clamp(1.6rem,3vw,2.25rem)] leading-tight tracking-[-0.02em]">
        15+ React components.
        <br />
        <span className="text-muted-foreground">85% test coverage.</span>
      </p>
    );
  }
  if (visual === "akai") {
    return (
      <a href={AKAISPACE.links[1].href} {...EXTERNAL} className="work relative block">
        <div className="shot">
          <ShotImage
            shot={{
              src: "/work/akaispace-mockup.webp",
              alt: "AkaiSpace website on a laptop among cherry blossoms",
              width: 808,
              height: 632,
            }}
            sizes="(min-width: 768px) 540px, 90vw"
          />
        </div>
        <Selection size="808 × 632" />
      </a>
    );
  }
  return (
    <a href={MERIDIAN.links[0].href} {...EXTERNAL} className="work relative block">
      <div className="shot">
        <ShotImage shot={MERIDIAN.shots[0]} sizes="(min-width: 768px) 540px, 90vw" />
      </div>
      <Selection size="1440 × 900" />
    </a>
  );
}

function StorySection() {
  const words = STORY_INTRO.split(" ");
  return (
    <section id="story" className="pt-32 sm:pt-44">
      <div className={LANE}>
        <p className="max-w-[30ch] text-[clamp(1.75rem,3.6vw,3rem)] leading-[1.2] tracking-[-0.025em]">
          {words.map((word, i) => (
            <span key={i} className="lit-word">
              {word}{" "}
            </span>
          ))}
        </p>

        <div className="mt-28 sm:mt-36">
          <SectionTitle title="How I got here" />
          <ol className="relative mt-14 space-y-20 pl-8 sm:space-y-28 sm:pl-12">
            <span aria-hidden className="story-rail" />
            {STORY.map((chapter) => (
              <li
                key={chapter.title}
                className="relative grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:gap-14"
              >
                <span aria-hidden className="story-dot -ml-8 sm:-ml-12" />
                <div className="md:sticky md:top-28 md:self-start">
                  <p className="font-mono text-[13px] text-accent">{chapter.when}</p>
                  <h3 className="mt-3 text-[clamp(1.6rem,2.8vw,2.1rem)] font-normal leading-tight tracking-[-0.02em]">
                    {chapter.title}
                  </h3>
                  <p className="mt-4 max-w-[48ch] text-lg leading-relaxed text-muted-foreground text-pretty">
                    {chapter.body}
                  </p>
                </div>
                <ChapterVisual visual={chapter.visual} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Work                                                                        */
/* -------------------------------------------------------------------------- */

function ProjectCaption({ project }: { project: Project }) {
  return (
    <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-10">
      <div className="max-w-[58ch]">
        <h3 className="text-xl font-medium tracking-[-0.01em]">
          {project.name}
          <span className="ml-3 text-base font-normal text-muted-foreground">{project.role}</span>
        </h3>
        <p className="mt-2 leading-relaxed text-muted-foreground text-pretty">{project.summary}</p>
      </div>
      <ul className="flex shrink-0 flex-wrap gap-x-5 gap-y-2 text-sm sm:pt-1">
        {project.links.map((link) => (
          <li key={link.href}>
            <a href={link.href} {...EXTERNAL} className="group inline-flex items-center gap-1 font-medium">
              <span className="text-link">{link.label}</span>
              <ArrowUpRight
                size={14}
                strokeWidth={2}
                aria-hidden
                className="text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function WorkSection() {
  const [, flow, agent] = MERIDIAN.shots;
  return (
    <section id="work" className="pt-28 sm:pt-36">
      <div className={LANE}>
        <SectionTitle title="Selected work">
          Products I designed, and the ones I also shipped in code.
        </SectionTitle>

        {/* Meridian: the inside of the product */}
        <article className="mt-14">
          <div className="grid gap-8 rounded-2xl bg-plate p-5 sm:p-8 md:grid-cols-2 md:gap-8">
            {[flow, agent].map((shot) => (
              <a
                key={shot.src}
                href={MERIDIAN.links[0].href}
                {...EXTERNAL}
                aria-label={`Meridian: ${shot.alt}`}
                className="work relative block"
              >
                <div className="shot">
                  <ShotImage shot={shot} sizes="(min-width: 1120px) 480px, (min-width: 768px) 45vw, 90vw" />
                </div>
                <Selection size="1440 × 900" />
              </a>
            ))}
          </div>
          <ProjectCaption project={MERIDIAN} />
        </article>

        {/* AkaiSpace and AkaiEarn: one company, web and app */}
        <div className="mt-20 grid gap-x-6 gap-y-16 lg:grid-cols-12">
          <article className="lg:col-span-7">
            <a
              href={AKAISPACE.links[0].href}
              {...EXTERNAL}
              aria-label="Open AkaiSpace, akaispace.xyz"
              className="work block overflow-hidden rounded-2xl bg-plate lg:h-[440px]"
            >
              <div className="relative ml-5 mt-5 sm:ml-8 sm:mt-8 md:w-[720px]">
                <div className="shot rounded-r-none lg:rounded-b-none">
                  <ShotImage shot={AKAISPACE.shots[0]} sizes="(min-width: 768px) 720px, 90vw" />
                </div>
              </div>
            </a>
            <ProjectCaption project={AKAISPACE} />
          </article>

          <article className="lg:col-span-5">
            <a
              href={AKAIEARN.links[0].href}
              {...EXTERNAL}
              aria-label="Open AkaiEarn on Google Play"
              className="work flex h-[360px] items-end justify-center overflow-hidden rounded-2xl bg-plate px-4 pt-8 sm:h-[440px]"
            >
              {AKAIEARN.shots.map((shot, index) => (
                <div
                  key={shot.src}
                  className={`shot relative -mb-6 h-[64%] shrink-0 rounded-[14px] ${
                    index === 1 ? "z-10 -mx-8" : "origin-bottom scale-[0.9]"
                  }`}
                >
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    width={shot.width}
                    height={shot.height}
                    sizes="200px"
                    className="block h-full w-auto"
                  />
                </div>
              ))}
            </a>
            <ProjectCaption project={AKAIEARN} />
          </article>
        </div>

        {/* Smaller studies, straight from Behance */}
        <div className="mt-24">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <h3 className="text-xl font-medium tracking-[-0.01em]">More on Behance</h3>
            <a
              href={SOCIAL_LINKS[0].href}
              {...EXTERNAL}
              className="group inline-flex items-center gap-1 text-sm font-medium"
            >
              <span className="text-link">All case studies</span>
              <ArrowUpRight size={14} strokeWidth={2} aria-hidden className="text-muted-foreground" />
            </a>
          </div>

          <ul className="-mx-6 mt-8 flex snap-x snap-mandatory scroll-px-6 gap-5 overflow-x-auto px-6 pb-2 md:mx-0 md:grid md:grid-cols-5 md:overflow-visible md:px-0 md:pb-0">
            {STUDIES.map((study) => (
              <li key={study.name} className="w-[66%] shrink-0 snap-start md:w-auto">
                <a href={study.href} {...EXTERNAL} className="work group block">
                  <div className="relative">
                    <div className="shot">
                      <ShotImage shot={study.shot} sizes="(min-width: 768px) 210px, 45vw" />
                    </div>
                    <Selection />
                  </div>
                  <p className="mt-4 text-sm font-medium">{study.name}</p>
                  <p className="mt-1 text-sm leading-snug text-muted-foreground">{study.summary}</p>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Contributions                                                               */
/* -------------------------------------------------------------------------- */

function ContributionsSection() {
  return (
    <section id="contributions" className="pt-28 sm:pt-36">
      <div className={LANE}>
        <SectionTitle title="Code, most days">
          Live from GitHub. I build what I design, mostly in React, Next.js and TypeScript.
        </SectionTitle>
        <div className="mt-10">
          <ContributionGraph />
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Contact + footer                                                            */
/* -------------------------------------------------------------------------- */

function ContactSection() {
  return (
    <section id="contact" className="pb-16 pt-32 sm:pt-44">
      <div className={LANE}>
        <h2 className="text-[clamp(3rem,10vw,7.5rem)] font-normal leading-[0.95] tracking-[-0.045em]">
          Let&rsquo;s work
          <br />
          together
        </h2>

        <p className="mt-8 max-w-[44ch] text-lg leading-relaxed text-muted-foreground">
          Got a product that needs designing, building, or both? Tell me about it.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
          <a href={PROFILE.booking} {...EXTERNAL} className={`btn-primary ${BTN}`}>
            Book a call
            <ArrowUpRight size={16} strokeWidth={2} aria-hidden />
          </a>
          <a href={`mailto:${PROFILE.email}`} className="text-link text-sm font-medium">
            {PROFILE.email}
          </a>
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="relative">
      <div className={`${LANE} py-16 sm:py-20`}>
        <div className="grid gap-10 sm:grid-cols-3 sm:gap-12">
          <FooterColumn title="Pages">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="link-underline block w-fit font-medium">
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
                  {...(link.external ? EXTERNAL : {})}
                  className="group inline-flex w-fit items-center gap-1.5 font-medium"
                >
                  <span className="link-underline">{link.label}</span>
                  {link.external && (
                    <ArrowUpRight
                      size={14}
                      strokeWidth={2}
                      className="text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  )}
                </a>
              </li>
            ))}
          </FooterColumn>

          {/* Contact info is exactly what <address> is for; not-italic resets
           * the browser default. */}
          <div>
            <p className="text-sm text-muted-foreground">Contact</p>
            <address className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm not-italic sm:block sm:space-y-2.5">
              <a href={`mailto:${PROFILE.email}`} className="link-underline block w-fit font-medium">
                {PROFILE.email}
              </a>
              <a
                href={`tel:${PROFILE.phone.replace(/-/g, "")}`}
                className="link-underline block w-fit font-medium"
              >
                {PROFILE.phone}
              </a>
              <span className="block text-muted-foreground">{PROFILE.location}</span>
            </address>
          </div>
        </div>
      </div>

      <div className={`${LANE} flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-6 text-xs text-muted-foreground`}>
        <p>© {new Date().getFullYear()} Wajiha Kulsum. Designed and built by me.</p>
        <a
          href="#top"
          className="group inline-flex items-center gap-1.5 transition-colors duration-200 hover:text-foreground"
        >
          Back to top
          <ArrowUp
            size={12}
            strokeWidth={2}
            className="transition-transform duration-200 group-hover:-translate-y-0.5"
            aria-hidden
          />
        </a>
      </div>

      {/* Giant outlined name: "Wajiha" on phones, full name on desktop;
       * clipped to an 0.8em strip so the glyphs peek from the edge, with the
       * cursor glow lighting them in the accent. */}
      <div
        aria-hidden
        className="overflow-hidden px-6 text-[clamp(4.5rem,22vw,13rem)] sm:text-[clamp(3.5rem,13vw,13rem)]"
      >
        <FooterName text="Wajiha Kulsum" className="hidden sm:block" />
        <FooterName text="Wajiha" className="sm:hidden" />
      </div>

      <div aria-hidden className="blur-fade pointer-events-none absolute inset-x-0 bottom-0 h-28 sm:h-44" />
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-sm text-muted-foreground">{title}</p>
      {/* Phones: links flow inline under the label. Desktop: stacked column. */}
      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm sm:block sm:space-y-2.5">
        {children}
      </ul>
    </div>
  );
}
