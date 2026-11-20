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

/** The one-paragraph version, revealed word by word as you scroll. */
export const STORY_INTRO =
  "I started out writing HTML and CSS for internship tasks in 2023. Somewhere between fixing layouts and watching people use them, I cared more about how a product feels than how it compiles. So I learned design properly and kept the code. Now nothing gets lost in handoff, because the handoff is me.";

export type Chapter = {
  when: string;
  title: string;
  body: string;
  /** Which visual the chapter shows. */
  visual: "repos" | "studies" | "stat" | "akai" | "meridian";
};

export const STORY: Chapter[] = [
  {
    when: "2023 - 2024",
    title: "Learning to build",
    body: "My first internships, at CodSoft, Prodigy InfoTech and Octanet, were all front end: landing pages, a blog called QuillQuest and a lot of CSS. Then came my own projects, from health-care tools to MentorHer.",
    visual: "repos",
  },
  {
    when: "Early 2025",
    title: "Design pulled me in",
    body: "At The Tann Mann Foundation I led the design from wireframes to high-fidelity prototypes, grounded in user research. Usability went up 25%. I kept going on Behance with Splitr, DocoPrint and Swiftze.",
    visual: "studies",
  },
  {
    when: "Jul - Oct 2025",
    title: "Shipping with a team",
    body: "At Pitchmatter I was on the other side of the handoff: React components with Redux and Axios, and the tests to back them.",
    visual: "stat",
  },
  {
    when: "Dec 2025 - May 2026",
    title: "Designing for AI",
    body: "At AkaiSpace I designed AkaiEarn, an Android app where anyone can earn by labeling data for AI, and the AkaiSpace website. Both are live.",
    visual: "akai",
  },
  {
    when: "2026",
    title: "Design and code, end to end",
    body: "Meridian is a market where AI agents buy spare LLM capacity. I designed it and built it, from the order book diagrams to the agent limits.",
    visual: "meridian",
  },
];

/** Early repos shown in the first chapter, all real and public. */
export const EARLY_REPOS = [
  { name: "CODSOFT", year: "2023", href: "https://codsoft-two-sooty.vercel.app" },
  { name: "QuillQuest", year: "2024", href: "https://quillquest-ten.vercel.app/" },
  { name: "Spotify landing", year: "2024", href: "https://spotify-clone-landing-page.vercel.app" },
  { name: "Bento grid", year: "2024", href: "https://bento-grid-blond.vercel.app" },
  { name: "MentorHer", year: "2025", href: "https://mentorher.vercel.app" },
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
  { label: "Work", href: "#work" },
  { label: "Story", href: "#story" },
  { label: "Code", href: "#contributions" },
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
