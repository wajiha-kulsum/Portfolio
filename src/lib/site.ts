/**
 * Single source of truth for all portfolio content. Update your info here and
 * every section (nav, hero, stats, experience, projects, footer) stays in sync.
 */

export type NavLink = { label: string; href: string };

export type SocialLink = { label: string; href: string; external: boolean };

export type Experience = {
  role: string;
  company: string;
  location: string;
  date: string;
  bullets: string[];
};

export type Project = {
  name: string;
  subtitle: string;
  description?: string;
  image: string;
  imageAlt: string;
  /** Link to the Behance case-study gallery, when one exists. */
  behanceUrl?: string;
};

export const PROFILE = {
  name: "Wajiha Kulsum",
  tagline:
    "I blend UX/UI design and full-stack engineering to craft intuitive, high-impact digital products.",
  avatar: "https://avatars.githubusercontent.com/wajiha-kulsum?size=384",
  email: "wajihakulsum786@gmail.com",
  phone: "+91-7841912389",
  location: "Mumbai, India",
  booking: "https://cal.com/wajihakulsum",
  resume: "/Wajiha_Resume.pdf",
} as const;

export const NAV_LINKS: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "Behance", href: "https://www.behance.net/wajihakulsum", external: true },
  { label: "LinkedIn", href: "https://linkedin.com/in/wajihakulsum/", external: true },
  { label: "GitHub", href: "https://github.com/wajiha-kulsum", external: true },
  { label: "Resume", href: "/Wajiha_Resume.pdf", external: false },
];

export const EXPERIENCE: Experience[] = [
  {
    role: "UI/UX Design Intern",
    company: "AkaiSpace",
    location: "On-site",
    date: "Dec 2025 — May 2026",
    bullets: [
      "Conceptualized user interfaces and user flows for the AkaiEarn data labeling platform, creating wireframes and high-fidelity prototypes in Figma while keeping complex web3 workflows accessible to everyday users.",
      "Created high-fidelity prototypes and design systems for AI-powered tools with a focus on clarity and visual appeal.",
    ],
  },
  {
    role: "UI/UX Design Intern",
    company: "The Tann Mann Foundation",
    location: "Remote",
    date: "Feb 2025 — Mar 2025",
    bullets: [
      "Led the end-to-end design process from wireframing to high-fidelity prototypes in Figma, iterating through collaborative design sprints.",
      "Delivered cohesive user-experience designs grounded in user research, improving interface usability by 25%.",
      "Optimized design systems and user flows through iterative prototyping, user testing, and design-pattern standardization.",
    ],
  },
  {
    role: "Full Stack Developer Intern",
    company: "Pitchmatter",
    location: "Remote",
    date: "Jul 2025 — Oct 2025",
    bullets: [
      "Developed 15+ React components with Redux state management and Axios integration, boosting performance by 35%.",
      "Built automated testing workflows with React Testing Library, achieving 85% code coverage.",
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    name: "AkaiSpace",
    subtitle: "Data annotation platform",
    description:
      "A labeling workspace that keeps complex annotation pipelines simple for AI teams.",
    image: "/akai_space.png",
    imageAlt: "AkaiSpace data annotation platform preview",
    behanceUrl: "https://www.behance.net/gallery/250951879/Web-Design",
  },
  {
    name: "AkaiEarn",
    subtitle: "Gamified data labeling app",
    description:
      "A companion app where annotators complete AI annotation tasks through gamified micro-quests.",
    image: "/akai_earn.png",
    imageAlt: "AkaiEarn gamified labeling app preview",
  },
  {
    name: "Penumbra",
    subtitle: "A secure OTC trading platform",
    description:
      "Over-the-counter trading flows designed around trust, privacy, and clarity.",
    image: "/penumbra.png",
    imageAlt: "Penumbra OTC trading platform preview",
  },
  {
    name: "DocoPrint",
    subtitle: "A digital printing platform",
    description:
      "Order, customize, and track print jobs from a single streamlined interface.",
    image: "/docoprint.png",
    imageAlt: "DocoPrint digital printing platform preview",
  },
];
