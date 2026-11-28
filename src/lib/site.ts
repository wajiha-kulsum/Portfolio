/**
 * Single source of truth for all portfolio content. Update your info here and
 * every section (nav, hero, work, experience, footer) stays in sync.
 */

export type NavLink = { label: string; href: string };

export type SocialLink = { label: string; href: string; external: boolean };

export type Shot = { src: string; alt: string; width: number; height: number };

export type ProjectLink = { label: string; href: string };

export type Project = {
  name: string;
  summary: string;
  role: string;
  links: ProjectLink[];
  shots: Shot[];
};

export const PROFILE = {
  name: "Wajiha Kulsum",
  role: "Product designer and front-end developer",
  tagline:
    "I research, design and prototype interfaces in Figma, then build them in React, mostly for AI, web3 and fintech teams.",
  availability: "Open to new projects",
  avatar: "https://avatars.githubusercontent.com/wajiha-kulsum?size=460",
  email: "wajihakulsum786@gmail.com",
  phone: "+91-7841912389",
  location: "Mumbai, India",
  booking: "https://cal.com/wajihakulsum",
  resume: "/Wajiha_Resume.pdf",
} as const;

export type TimelineVisual =
  | { kind: "image"; shot: Shot; href: string }
  | { kind: "stat"; value: string; label: string }
  /** A short dated list, e.g. repos or events; `prefix` is shown muted. */
  | { kind: "list"; prefix?: string; items: { name: string; date: string }[] };

export type TimelineEntry = {
  /** Shown big, e.g. "Dec 2023". */
  date: string;
  title: string;
  /** Where, and the role or format. */
  org: string;
  body: string;
  /** Two or three specifics: what was built, used or achieved. */
  highlights: string[];
  /** Short facts shown as chips: duration, where, tools. */
  meta: string[];
  visual: TimelineVisual;
};

/**
 * Work experience, newest first. Facts come from the resume, the live sites
 * and the GitHub repos.
 */
export const TIMELINE: TimelineEntry[] = [
  {
    date: "Oct 2026 - Present",
    title: "Eastwards Consulting",
    org: "UI/UX designer and front-end developer, contract",
    meta: ["Contract", "Next.js", "TypeScript", "Tailwind CSS"],
    body: "I designed and built the website of an IT consulting firm end to end, from the visual language to production Next.js.",
    highlights: [
      "20+ responsive pages, including 13 service pages",
      "Page templates and a reusable component library",
      "Motion and interaction design across the site",
    ],
    visual: {
      kind: "image",
      href: "https://eastwards.vercel.app",
      shot: {
        src: "/work/eastwards.webp",
        alt: "Eastwards Consulting home page: Technology that moves business forward",
        width: 1440,
        height: 900,
      },
    },
  },
  {
    date: "Dec 2025 - May 2026",
    title: "AkaiSpace",
    org: "UI/UX design intern, on-site",
    meta: ["6 months", "On-site", "Figma", "Design systems"],
    body: "Six months on-site designing for an AI data company. I made complex web3 and data-labeling workflows simple enough for anyone to use.",
    highlights: [
      "AkaiEarn: user flows to hi-fi prototypes, now on Google Play",
      "Designed the AkaiSpace website and its visual language",
      "A design system and component library for AI tools",
    ],
    visual: {
      kind: "image",
      href: "https://www.akaispace.xyz/",
      shot: {
        src: "/work/akaispace-live.webp",
        alt: "AkaiSpace home page with the headline Embodied AI needs senses",
        width: 1600,
        height: 1000,
      },
    },
  },
  {
    date: "Jul 2025 - Oct 2025",
    title: "Pitchmatter",
    org: "Full-stack developer intern, remote",
    meta: ["4 months", "Remote", "React", "Redux", "Testing Library"],
    body: "Four months on the build side of the handoff. I learned what makes a design easy or hard to ship, and how to test what I ship.",
    highlights: [
      "15+ reusable React components with Redux and Axios",
      "35% faster performance on the screens I owned",
      "85% test coverage with React Testing Library",
    ],
    visual: {
      kind: "image",
      href: "https://www.pitchmatter.com/",
      shot: {
        src: "/work/pitchmatter.webp",
        alt: "Pitchmatter home page: Still trusting luck? With fundraising success",
        width: 1440,
        height: 900,
      },
    },
  },
  {
    date: "Feb 2025 - Mar 2025",
    title: "The Tann Mann Gaadi",
    org: "UI/UX design intern, remote",
    meta: ["2 months", "Remote", "Figma", "User research"],
    body: "My first design role, for a non-profit. I led the work from research and wireframes to high-fidelity Figma prototypes, in collaborative design sprints.",
    highlights: [
      "User research shaped every screen",
      "Iterative prototyping and user testing",
      "Standardized design patterns and user flows",
    ],
    visual: { kind: "stat", value: "+25%", label: "interface usability after the research-led redesign" },
  },
];

export type Article = {
  title: string;
  date: string;
  readTime: string;
  href: string;
  /**
   * The essay's sections as short labels. `find` is an exact phrase from
   * that section, used as a text-fragment link straight into it.
   */
  lessons: { label: string; find: string }[];
};

export const MEDIUM = "https://medium.com/@wajihakulsum786";

/** Articles on Medium, newest first. Add new ones at the top. */
export const WRITING: Article[] = [
  {
    title: "So you want to get into UI/UX design? Here's where to actually start",
    date: "Feb 2026",
    readTime: "4 min read",
    href: "https://medium.com/@wajihakulsum786/so-you-want-to-get-into-ui-ux-design-heres-where-to-actually-start-553277151f06",
    lessons: [
      { label: "UI vs UX", find: "This is the question every beginner Googles" },
      { label: "Train your eye", find: "Good designers are obsessive observers" },
      { label: "Learn one tool", find: "The industry standard right now is Figma" },
      { label: "Don't skip UX", find: "make the mistake of jumping straight into" },
      { label: "Start a portfolio", find: "a mindset shift that will speed everything up" },
      { label: "Find your people", find: "Learning design alone is hard" },
      { label: "The learning curve", find: "has a frustrating middle stage" },
    ],
  },
];

export const NAV_LINKS: NavLink[] = [
  { label: "Code", href: "#contributions" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "Behance", href: "https://www.behance.net/wajihakulsum", external: true },
  { label: "LinkedIn", href: "https://linkedin.com/in/wajihakulsum/", external: true },
  { label: "GitHub", href: "https://github.com/wajiha-kulsum", external: true },
  { label: "Medium", href: MEDIUM, external: true },
  { label: "Resume", href: "/Wajiha_Resume.pdf", external: false },
];

export const MERIDIAN: Project = {
  name: "Meridian",
  summary:
    "A market where AI agents buy spare LLM API capacity, a million tokens at a time, settled in USDC on NEAR.",
  role: "Design and front-end",
  links: [{ label: "Visit tradeonmeridian.xyz", href: "https://www.tradeonmeridian.xyz/" }],
  shots: [
    {
      src: "/work/meridian-hero.webp",
      alt: "Meridian home page: the headline Compute expires. Markets don't. over a line drawing of the Colosseum",
      width: 1920,
      height: 1200,
    },
    {
      src: "/work/meridian-flow.webp",
      alt: "Meridian diagram of a seller's spare tokens going on the order book and an agent buying the cheapest ask",
      width: 1440,
      height: 900,
    },
    {
      src: "/work/meridian-agent.webp",
      alt: "Meridian agent limit panel showing $4.19 used of a $5.00 daily limit beside a phone wallet view",
      width: 1440,
      height: 900,
    },
  ],
};

export const AKAISPACE: Project = {
  name: "AkaiSpace",
  summary: "Website for AkaiSpace, sensing hardware and data for embodied AI.",
  role: "UI/UX design",
  links: [
    { label: "Visit akaispace.xyz", href: "https://www.akaispace.xyz/" },
    { label: "Case study", href: "https://www.behance.net/gallery/250951879/Web-Design" },
  ],
  shots: [
    {
      src: "/work/akaispace-live.webp",
      alt: "AkaiSpace home page with the headline Embodied AI needs senses over a pixelated landscape",
      width: 1600,
      height: 1000,
    },
  ],
};

export const AKAIEARN: Project = {
  name: "AkaiEarn",
  summary:
    "An Android app where people earn by completing AI data-labeling tasks and withdraw over UPI.",
  role: "App design",
  links: [
    {
      label: "Google Play",
      href: "https://play.google.com/store/apps/details?id=com.akaispace.akaiearn&hl=en",
    },
    { label: "Case study", href: "https://www.behance.net/gallery/250108249/App-Design" },
  ],
  shots: [
    { src: "/work/akaiearn-tasks.webp", alt: "AkaiEarn task list with audio and video labeling tasks", width: 788, height: 1400 },
    { src: "/work/akaiearn-home.webp", alt: "AkaiEarn home screen welcoming a new user", width: 646, height: 1400 },
    { src: "/work/akaiearn-upi.webp", alt: "AkaiEarn wallet showing a UPI withdrawal", width: 788, height: 1400 },
  ],
};

/**
 * One card in My Work. With a `cover`, the card shows the cover first and
 * swaps to the real screen (`shot`) on hover.
 */
export type WorkItem = {
  name: string;
  role: string;
  /** One line under the title; keep it under about 40 characters. */
  summary: string;
  href: string;
  shot: Shot;
  cover?: Shot;
  /** CSS object-position when the screen is cropped to its frame. */
  focus?: string;
};

/**
 * My Work, in order: wide and tall, then full width. A last card left on
 * its own also runs full width. Covers and screens are Figma SVG exports,
 * served as they are; width and height are the frame's size in Figma.
 */
export const WORK: WorkItem[] = [
  {
    name: AKAISPACE.name,
    role: AKAISPACE.role,
    summary: "Website for an embodied-AI data company",
    href: AKAISPACE.links[0].href,
    cover: { src: "/work/akaispace-cover.svg", alt: "AkaiSpace logo", width: 1440, height: 1022 },
    shot: {
      src: "/work/akaispace-landing.svg",
      alt: "AkaiSpace landing page: Labelled data, zero hassle",
      width: 1440,
      height: 1022,
    },
  },
  {
    name: AKAIEARN.name,
    role: AKAIEARN.role,
    summary: "Earn by labeling data for AI",
    href: AKAIEARN.links[0].href,
    cover: { src: "/work/akaiearn-cover.svg", alt: "Akai Earn logo on a dark splash screen", width: 481, height: 701 },
    shot: {
      src: "/work/akaiearn-page.svg",
      alt: "AkaiEarn task screen: complete AI tasks and earn points",
      width: 481,
      height: 701,
    },
  },
  {
    name: MERIDIAN.name,
    role: MERIDIAN.role,
    summary: "A market for spare LLM capacity on NEAR",
    href: MERIDIAN.links[0].href,
    cover: { src: "/work/meridian-cover.svg", alt: "Meridian wordmark on blue", width: 1672, height: 943 },
    shot: {
      src: "/work/meridian-site.svg",
      alt: "Meridian home page: Compute expires. Markets don't.",
      width: 1672,
      height: 943,
    },
    focus: "center top",
  },
  {
    name: "Penumbra",
    role: "UI/UX design",
    summary: "Waitlist for a private OTC trading desk",
    href: "https://www.behance.net/gallery/250964789/Web-Design-Waitlist",
    cover: { src: "/work/penumbra-cover.svg", alt: "Penumbra logo on black", width: 1440, height: 983 },
    shot: {
      src: "/work/penumbra-page.svg",
      alt: "Penumbra waitlist page: Get early access",
      width: 1440,
      height: 983,
    },
  },
];

/**
 * Hackathons and events. `title` is the line shown in the list: put the real
 * outcome there (winner, finalist, track prize) when you have it. A line
 * break in it sets its two lines.
 */
export type Achievement = {
  event: string;
  title: string;
  kind: string;
  href: string;
  /** Shown big on the hover card: the project or team. Falls back to `event`. */
  project?: string;
};

export const ACHIEVEMENTS: Achievement[] = [
  {
    event: "EthMumbai",
    title: "Built at EthMumbai\nand won",
    project: "Penumbra",
    kind: "Ethereum hackathon",
    href: "https://github.com/wajiha-kulsum/penumbra",
  },
  {
    event: "Monad Blitz",
    title: "Won runner-up in a day\nat Monad Blitz",
    project: "Monowire",
    kind: "One-day build sprint",
    href: "https://github.com/wajiha-kulsum/monowire-blitz",
  },
  {
    event: "PEC Hacks",
    title: "Shortlisted in the top 10\nat PEC Hacks",
    project: "Serenity",
    kind: "Hackathon",
    href: "https://linkedin.com/in/wajihakulsum/",
  },
  {
    event: "NIT Agartala",
    title: "Took a product from idea\nto demo at NIT Agartala",
    project: "Team CRWDSTRK",
    kind: "Hackathon",
    href: "https://linkedin.com/in/wajihakulsum/",
  },
];
