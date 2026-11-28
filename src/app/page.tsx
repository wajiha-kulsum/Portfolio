import Image from "next/image";
import { ArrowUp, ArrowUpRight } from "lucide-react";

import { SiteNav } from "@/components/site-nav";
import { ContributionGraph } from "@/components/contribution-graph";
import { AchievementsList } from "@/components/achievements-list";
import { ExperienceDial } from "@/components/experience-dial";
import { HeroOrbit } from "@/components/hero-orbit";
import { Cursor } from "@/components/cursor";
import { LocalTime } from "@/components/local-time";
import {
  PROFILE,
  SOCIAL_LINKS,
  WRITING,
  WORK,
  type WorkItem,
} from "@/lib/site";

const LANE = "mx-auto w-full max-w-[1120px] px-6";
const BTN = "inline-flex h-11 items-center justify-center gap-2 px-5 text-sm font-medium";
const EXTERNAL = { target: "_blank", rel: "noopener noreferrer" } as const;

export default function Home() {
  return (
    <div id="top" className="min-h-screen overflow-x-clip bg-background text-foreground">
      <Cursor />
      <SiteNav />

      <main id="main">
        <Hero />
        <ContributionsSection />
        <ExperienceDial />
        <WorkSection />
        <WritingSection />
        <AchievementsSection />
      </main>

      <SiteFooter />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Shared pieces                                                               */
/* -------------------------------------------------------------------------- */

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
          <a href="#experience" className={`btn-outline ${BTN}`}>
            See my experience
          </a>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Work                                                                        */
/* -------------------------------------------------------------------------- */

/** Sizes per grid slot, matching the five-card cycle in globals.css. */
const WORK_SIZES = [
  "(min-width: 1120px) 603px, (min-width: 768px) 56vw, 92vw",
  "(min-width: 1120px) 402px, (min-width: 768px) 37vw, 92vw",
  "(min-width: 1120px) 1072px, 92vw",
  "(min-width: 1120px) 402px, (min-width: 768px) 37vw, 92vw",
  "(min-width: 1120px) 603px, (min-width: 768px) 56vw, 92vw",
];

/**
 * A cover pair keeps its own aspect ratio. A tall phone screen is capped so
 * the whole card fits on screen: at most 560px or 70% of the viewport high.
 */
function frameStyle(item: WorkItem): React.CSSProperties {
  const ratio = item.shot.width / item.shot.height;
  return ratio < 1
    ? { aspectRatio: `${item.shot.width} / ${item.shot.height}`, width: `min(100%, calc(min(560px, 70vh) * ${ratio.toFixed(4)}))` }
    : { aspectRatio: `${item.shot.width} / ${item.shot.height}` };
}

/** The real screen, with the cover on top until the card is hovered. */
function WorkCover({ item, sizes }: { item: WorkItem; sizes: string }) {
  const position = item.focus ? { objectPosition: item.focus } : undefined;
  // Cover pairs are Figma SVG exports, served as they are (no re-encoding).
  const svg = item.shot.src.endsWith(".svg");
  return (
    <>
      <Image src={item.shot.src} alt={item.shot.alt} fill sizes={sizes} unoptimized={svg} className="work-img" style={position} />
      {item.cover && (
        <Image src={item.cover.src} alt={item.cover.alt} fill sizes={sizes} unoptimized={svg} className="work-img work-cover" />
      )}
    </>
  );
}

function WorkSection() {
  return (
    <section id="work" className="pt-28 sm:pt-36">
      <div className={LANE}>
        <SectionTitle title="My work">
          Products I designed, and the ones I also shipped in code.
        </SectionTitle>

        <ul className="work-grid mt-16">
          {WORK.map((item, index) => (
            <li key={item.name}>
              <a href={item.href} {...EXTERNAL} data-cursor="View project" className="work-card group block">
                <div
                  className="shot work-frame bg-plate"
                  style={item.cover ? frameStyle(item) : undefined}
                >
                  <WorkCover item={item} sizes={WORK_SIZES[index % 5]} />
                </div>
                <h3 className="mt-6 text-[clamp(1.4rem,2.2vw,1.75rem)] font-normal leading-tight tracking-[-0.02em]">
                  {item.name}
                  <span className="ml-3 text-base tracking-normal text-muted-foreground">{item.role}</span>
                </h3>
                <p className="mt-2 truncate text-lg leading-relaxed text-muted-foreground">
                  {item.summary}
                </p>
              </a>
            </li>
          ))}
        </ul>

        <a
          href={SOCIAL_LINKS[0].href}
          {...EXTERNAL}
          className="group mt-4 inline-flex items-center gap-1 text-sm font-medium"
        >
          <span className="text-link">More case studies on Behance</span>
          <ArrowUpRight size={14} strokeWidth={2} aria-hidden className="text-muted-foreground" />
        </a>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Writing                                                                     */
/* -------------------------------------------------------------------------- */

function WritingSection() {
  const [article] = WRITING;
  return (
    <section id="writing" className="pt-28 sm:pt-36">
      <div className={LANE}>
        <SectionTitle title="Writing">The guide I wish I&rsquo;d had when I started.</SectionTitle>
        <h3 className="sr-only">{article.title}</h3>

        {/* One compact card: the cover is the way in, the lessons say what's inside */}
        <div className="essay-card mt-10">
          <a href={article.href} {...EXTERNAL} data-cursor="Read article" className="essay-banner">
            <Image
              src="/work/essay-banner.jpg"
              alt={`${article.title}. Continue reading on Medium`}
              width={1600}
              height={533}
              sizes="(min-width: 1120px) 600px, 92vw"
              className="block h-auto w-full"
            />
          </a>

          <div className="flex flex-col gap-4 px-2 pb-3 pt-1 lg:px-4 lg:py-1">
            <p className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-[13px] text-muted-foreground">
              <span className="text-foreground">Essay on Medium</span>
              <span>{article.date}</span>
              <span>{article.readTime}</span>
            </p>

            <ol className="flex flex-wrap gap-1.5" aria-label={`${article.lessons.length} lessons inside`}>
              {article.lessons.map((lesson, i) => (
                <li key={lesson.label}>
                  <a
                    href={`${article.href}#:~:text=${encodeURIComponent(lesson.find)}`}
                    {...EXTERNAL}
                    className="lesson-pill"
                  >
                    <span className="lesson-pill-num tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    {lesson.label}
                    <span className="sr-only">, opens Medium in a new tab</span>
                  </a>
                </li>
              ))}
            </ol>

            <a href={article.href} {...EXTERNAL} className={`btn-primary self-start ${BTN}`}>
              Read the essay
              <ArrowUpRight size={16} strokeWidth={2} aria-hidden />
              <span className="sr-only">(opens Medium in a new tab)</span>
            </a>
          </div>
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
/* Achievements                                                                */
/* -------------------------------------------------------------------------- */

function AchievementsSection() {
  return (
    <section id="achievements" className="pt-28 sm:pt-36">
      <div className={LANE}>
        <SectionTitle title="Achievements">Hackathons where I designed and built under a deadline.</SectionTitle>
        <div className="mt-8">
          <AchievementsList />
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Contact + footer                                                            */
/* -------------------------------------------------------------------------- */

/**
 * Contact and footer in one dark band (both themes) that rises with rounded
 * corners: a personal call to action with my photo in the headline, three
 * real facts about right now, the name set edge to edge, and a sign-off.
 * The nav's Contact link lands here.
 */
function SiteFooter() {
  const year = new Date().getFullYear();
  const [essay] = WRITING;
  return (
    <footer
      id="contact"
      data-theme="dark"
      className="mt-28 rounded-t-[2rem] border-t border-border bg-background text-foreground sm:mt-36 sm:rounded-t-[3rem]"
    >
      <div className={`${LANE} pb-8 pt-16 sm:pt-24`}>
        <p className="inline-flex items-center gap-2 font-mono text-[12.5px] text-muted-foreground">
          <span aria-hidden className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60 motion-safe:animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          {PROFILE.availability}
        </p>

        <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-[clamp(2.75rem,7vw,5.5rem)] font-normal leading-[1.02] tracking-[-0.045em]">
              Let&rsquo;s work{" "}
              <span className="footer-photo">
                <Image src={PROFILE.avatar} alt="" fill sizes="120px" className="object-cover" />
              </span>{" "}
              together
            </h2>
            <p className="mt-5 max-w-[44ch] text-lg leading-relaxed text-muted-foreground">
              Got a product that needs designing, building, or both? Tell me about it.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-x-8 gap-y-5">
            <a href={PROFILE.booking} {...EXTERNAL} className={`btn-primary ${BTN}`}>
              Book a call
              <ArrowUpRight size={16} strokeWidth={2} aria-hidden />
            </a>
            <a href={`mailto:${PROFILE.email}`} className="text-link text-sm font-medium">
              {PROFILE.email}
            </a>
          </div>
        </div>

        {/* Three real things about right now */}
        <div className="mt-16 grid gap-6 border-t border-border pt-8 font-mono text-[12.5px] leading-relaxed sm:mt-20 sm:grid-cols-3">
          <p>
            <span className="block text-muted-foreground">Right now</span>
            Designing and building at{" "}
            <a href="https://eastwards.vercel.app" {...EXTERNAL} className="link-underline">
              Eastwards
            </a>
          </p>
          <p>
            <span className="block text-muted-foreground">Latest writing</span>
            <a href={essay.href} {...EXTERNAL} className="link-underline">
              Want to get into UI/UX?
            </a>
          </p>
          <p className="sm:text-right">
            <span className="block text-muted-foreground">{PROFILE.location}</span>
            <LocalTime />
          </p>
        </div>

        {/* The name, sized to the footer's own width so it always runs edge to
         * edge; each letter lifts when the pointer passes over it. */}
        <div aria-hidden className="@container my-10 sm:my-14">
          <p className="footer-name">
            {"wajiha kulsum".split("").map((ch, i) => (ch === " " ? " " : <span key={i}>{ch}</span>))}
          </p>
        </div>

        <p className="font-mono text-[12.5px] text-muted-foreground">Thanks for scrolling all the way down.</p>

        <div className="mt-6 flex flex-col gap-4 border-t border-border pt-6 font-mono text-[12px] sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex flex-wrap gap-x-4 gap-y-1 text-[12.5px]">
            {SOCIAL_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href} {...(link.external ? EXTERNAL : {})} className="link-underline">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-muted-foreground sm:justify-end">
            <p>&copy; {year} Wajiha Kulsum. Designed and built by me.</p>
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
        </div>
      </div>
    </footer>
  );
}
