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

/** Smaller pieces shown as a row of Behance covers. */
export type Study = { name: string; summary: string; href: string; shot: Shot };

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
 * The experience timeline, oldest first. Facts come from the resume, the
 * GitHub repos (dates are repo creation months) and the live sites.
 */
export const TIMELINE: TimelineEntry[] = [
  {
    date: "Dec 2023",
    title: "First internship",
    org: "CodSoft, web development intern",
    meta: ["HTML", "CSS", "JavaScript"],
    body: "Where it started. My first internship was all front end: real briefs, real deadlines and sites that had to work on every screen.",
    highlights: [
      "Built and deployed landing pages and small web apps",
      "Responsive layouts in plain HTML, CSS and JavaScript",
    ],
    visual: {
      kind: "list",
      prefix: "wajiha-kulsum/",
      items: [
        { name: "CODSOFT", date: "Dec 2023" },
        { name: "OCTANET_JANUARY", date: "Jan 2024" },
        { name: "PRODIGY_WD_01", date: "Jan 2024" },
      ],
    },
  },
  {
    date: "Jan 2024",
    title: "Two internships at once",
    org: "Prodigy InfoTech and Octanet, front-end intern",
    meta: ["1 month", "HTML", "CSS", "JavaScript"],
    body: "Two front-end internships in parallel taught me to plan my time and finish what I start. QuillQuest, a calligraphy blog from that month, is still live.",
    highlights: [
      "Four web development tasks for Prodigy InfoTech in one month",
      "Octanet's January project alongside it",
      "QuillQuest: editorial layout, typography and a supplies section",
    ],
    visual: {
      kind: "image",
      href: "https://quillquest-ten.vercel.app/",
      shot: {
        src: "/work/quillquest.webp",
        alt: "QuillQuest home page: Where art meets letters",
        width: 1200,
        height: 750,
      },
    },
  },
  {
    date: "Feb 2025",
    title: "Into UX design",
    org: "The Tann Mann Foundation, UI/UX design intern",
    meta: ["2 months", "Remote", "Figma", "User research"],
    body: "My first design role, remote. I led the work from research and wireframes to high-fidelity Figma prototypes, in collaborative design sprints.",
    highlights: [
      "User research shaped every screen",
      "Iterative prototyping and user testing",
      "Standardized design patterns and user flows",
    ],
    visual: { kind: "stat", value: "+25%", label: "interface usability after the research-led redesign" },
  },
  {
    date: "Mar 2025",
    title: "MentorHer",
    org: "Personal project, design and build",
    meta: ["Next.js", "Tailwind CSS", "MongoDB", "Socket.IO"],
    body: "A mentorship platform I designed and built end to end, and still deployed. It was my first product where I owned every decision, from flows to code.",
    highlights: [
      "Personal dashboards for session tracking and resources",
      "A community forum and chat for peer support",
      "A user-friendly, pastel-themed interface",
    ],
    visual: {
      kind: "image",
      href: "https://mentorher.vercel.app",
      shot: {
        src: "/work/mentorher.webp",
        alt: "MentorHer home page: Your journey, her guidance, limitless possibilities",
        width: 1200,
        height: 750,
      },
    },
  },
  {
    date: "Jul 2025",
    title: "Shipping with a team",
    org: "Pitchmatter, full-stack developer intern",
    meta: ["4 months", "Remote", "React", "Redux", "Testing Library"],
    body: "Four months on the build side of the handoff, remote. I learned what makes a design easy or hard to ship, and how to test what I ship.",
    highlights: [
      "15+ React components with Redux and Axios",
      "Boosted performance by 35%",
      "Automated tests with React Testing Library",
    ],
    visual: { kind: "stat", value: "85%", label: "test coverage across the components I shipped" },
  },
  {
    date: "Oct 2025",
    title: "Splitr",
    org: "Personal project, product design",
    meta: ["Figma", "Mobile app", "Dark and light mode"],
    body: "An expense-splitting app for trips, dinners and monthly rent, designed in Figma from onboarding to settling up, in dark and light mode.",
    highlights: [
      "Equal, percentage and custom splits",
      "Group tracking and clear settle-up flows",
      "Onboarding and a mobile banking-style home",
    ],
    visual: {
      kind: "image",
      href: "https://www.behance.net/gallery/239413715/Spliter",
      shot: {
        src: "/work/splitr.webp",
        alt: "Splitr onboarding and wallet screens in dark mode",
        width: 808,
        height: 632,
      },
    },
  },
  {
    date: "Dec 2025",
    title: "Designing for AI",
    org: "AkaiSpace, UI/UX design intern",
    meta: ["6 months", "On-site", "Figma", "Design systems"],
    body: "Six months on-site designing for an AI data company. I made complex web3 and data-labeling workflows simple enough for anyone to use.",
    highlights: [
      "AkaiEarn: user flows to hi-fi prototypes, now on Google Play",
      "Designed the AkaiSpace website",
      "Prototypes and a design system for AI-powered tools",
    ],
    visual: {
      kind: "image",
      href: "https://www.behance.net/gallery/250951879/Web-Design",
      shot: {
        src: "/work/akaispace-mockup.webp",
        alt: "AkaiSpace website on a laptop among cherry blossoms",
        width: 808,
        height: 632,
      },
    },
  },
  {
    date: "Mar 2026",
    title: "Hackathon season",
    org: "EthMumbai, Coherence and Monad Blitz",
    meta: ["Team builds", "Web3", "Rapid prototyping"],
    body: "A run of hackathons where I designed and built with a team against the clock, from Ethereum apps in Mumbai to a one-day build on Monad.",
    highlights: [
      "EthMumbai, the city's Ethereum hackathon",
      "Coherence 2026 with team CRWDSTRK",
      "Monad Blitz: shipped Monowire in a single day",
    ],
    visual: {
      kind: "list",
      items: [
        { name: "EthMumbai", date: "Mar 2026" },
        { name: "Coherence 2026", date: "Mar 2026" },
        { name: "Monad Blitz", date: "May 2026" },
      ],
    },
  },
  {
    date: "Nov 2026",
    title: "Meridian",
    org: "Design and front end, end to end",
    meta: ["Product design", "TypeScript", "NEAR"],
    body: "A market where AI agents buy spare LLM capacity on NEAR. Sellers list what their keys won't use, and agents spend inside a daily limit set on chain.",
    highlights: [
      "Order book and payment flow diagrams that animate the idea",
      "Agent spending limits you can raise from your phone",
      "A receipts page that recomputes the index in the browser",
    ],
    visual: {
      kind: "image",
      href: "https://www.tradeonmeridian.xyz/",
      shot: {
        src: "/work/meridian-hero.webp",
        alt: "Meridian home page: Compute expires. Markets don't.",
        width: 1920,
        height: 1200,
      },
    },
  },
];

export const VALUES = [
  {
    title: "Nothing lost in handoff",
    body: "I design with the build in mind and build with the design open. The spacing in Figma is the spacing in production.",
  },
  {
    title: "Complex things, made calm",
    body: "Web3 wallets, AI data pipelines, OTC trades. My job is to make them feel obvious to someone using them for the first time.",
  },
  {
    title: "Research before pixels",
    body: "I start by talking to people and mapping the flow. At The Tann Mann Foundation that work raised usability by 25%.",
  },
  {
    title: "Tested, not hoped",
    body: "I write tests for what I ship. At Pitchmatter my components reached 85% coverage.",
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

const cover = (src: string, alt: string): Shot => ({ src, alt, width: 808, height: 632 });

export const STUDIES: Study[] = [
  {
    name: "Penumbra",
    summary: "Waitlist for a private OTC trading desk",
    href: "https://www.behance.net/gallery/250964789/Web-Design-Waitlist",
    shot: cover("/work/penumbra.webp", "Penumbra waitlist page on a desktop monitor"),
  },
  {
    name: "Horizon",
    summary: "Landing page concept for an AI lab",
    href: "https://www.behance.net/gallery/252502023/AI-Landing-Page-Concept",
    shot: cover("/work/horizon.webp", "AI landing page concept on a laptop on a desk"),
  },
  {
    name: "Splitr",
    summary: "Expense splitting, onboarding to settle up",
    href: "https://www.behance.net/gallery/239413715/Spliter",
    shot: cover("/work/splitr.webp", "Splitr onboarding and wallet screens in dark mode"),
  },
  {
    name: "DocoPrint",
    summary: "Ordering and tracking print jobs",
    href: "https://www.behance.net/gallery/239408869/Printing",
    shot: cover("/work/docoprint.webp", "DocoPrint login and order status wireframes"),
  },
  {
    name: "Swiftze",
    summary: "Storefront for a made-to-measure tailor",
    href: "https://www.behance.net/gallery/239410135/Clothing-Design",
    shot: cover("/work/swiftze.webp", "Swiftze clothing store pages in Figma"),
  },
];

/**
 * Hackathons and events. `title` is the line shown in the list: put the real
 * outcome there (winner, finalist, track prize) when you have it.
 */
export type Achievement = {
  event: string;
  title: string;
  kind: string;
  href: string;
};

export const ACHIEVEMENTS: Achievement[] = [
  {
    event: "EthMumbai",
    title: "Built at EthMumbai, the city's Ethereum hackathon",
    kind: "Ethereum hackathon",
    href: "https://github.com/wajiha-kulsum/penumbra",
  },
  {
    event: "Monad Blitz",
    title: "Shipped Monowire in a single day at Monad Blitz",
    kind: "One-day build sprint",
    href: "https://github.com/wajiha-kulsum/monowire-blitz",
  },
  {
    event: "PEC Hacks",
    title: "Competed at PEC Hacks, Punjab Engineering College",
    kind: "Hackathon",
    href: "https://linkedin.com/in/wajihakulsum/",
  },
  {
    event: "NIT Agartala",
    title: "Took a product from idea to demo at NIT Agartala",
    kind: "Hackathon",
    href: "https://linkedin.com/in/wajihakulsum/",
  },
  {
    event: "Coherence 2026",
    title: "Built with team CRWDSTRK at Coherence 2026",
    kind: "Hackathon",
    href: "https://github.com/wajiha-kulsum/COHERENCE-26_CRWDSTRK",
  },
];
