import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { ContributionsSection } from "@/components/contributions-heatmap";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-[#020000] text-white overflow-x-auto">
      {/* Floating Responsive Header */}
      <header className="fixed top-4 left-0 right-0 z-50 px-4 flex justify-center pointer-events-none">
        <div className="flex items-center gap-3 sm:gap-6 nav-bar-bg backdrop-blur-xl px-4 sm:px-6 py-2.5 rounded-full border shadow-2xl pointer-events-auto max-w-[95vw] overflow-x-auto">
          <nav className="flex items-center gap-4 sm:gap-8 whitespace-nowrap">
            <NavLink href="#about">About</NavLink>
            <NavLink href="#projects">Projects</NavLink>
            <NavLink href="#experience">Experience</NavLink>
            <NavLink href="#contact">Contact</NavLink>
          </nav>
          <div className="h-4 w-[1px] bg-white/20 light:bg-black/20 flex-shrink-0" />
          <ThemeToggle className="flex-shrink-0" />
        </div>
      </header>

      {/* Main Canvas Container */}
      <div className="relative mx-auto" style={{ width: 1440, height: 4048 }}>
        {/* Decorative arrow circle */}
        <div className="group absolute top-[371px] left-[1237px] z-10 w-[67px] h-[67px] rounded-full border-2 border-white flex items-center justify-center cursor-pointer">
          <ArrowUpRight size={26} strokeWidth={2} className="text-white transition-transform duration-300 group-hover:rotate-45" />
        </div>

        {/* Hero - Wajiha */}
        <section id="about" className="absolute top-[296px] left-[137px]">
          <h1 className="font-[family-name:var(--font-bricolage)] text-[150px] font-medium leading-[180px] tracking-[0.05em]">
            Wajiha
          </h1>
        </section>

        {/* Hero - Kulsum */}
        <section className="absolute top-[457px] left-[734px]">
          <h2 className="font-[family-name:var(--font-bricolage)] text-[150px] font-medium leading-[180px] tracking-[0.05em]">
            Kulsum
          </h2>
        </section>

        {/* Tagline */}
        <p className="absolute top-[508px] left-[137px] w-[527px] text-[30px] font-normal leading-[36px]">
          I blend UX UI and Full Stack I blend UX UI and Full Stack I blend UX UI
          and Full Stack
        </p>

        {/* About me pill button - redirects to footer */}
        <a
          href="#contact"
          className="group absolute top-[371px] left-[793px] w-[410px] h-[67px] rounded-full bg-white hover:bg-gray-100 transition-colors flex items-center justify-center gap-[10px] z-10 cursor-pointer"
        >
          <span className="font-[family-name:var(--font-bricolage)] text-[40px] font-normal leading-[48px] text-black">
            About me
          </span>
        </a>

        {/* Social pills */}
        <PillButton left={135} href="https://www.behance.net/wajihakulsum">Behance</PillButton>
        <PillButton left={431} href="http://linkedin.com/in/wajihakulsum/">Linkedin</PillButton>
        <PillButton left={727} href="https://github.com/wajiha-kulsum">Github</PillButton>
        <PillButton left={1054} href="/Wajiha_Resume.pdf">Resume</PillButton>

        {/* My Contributions heading */}
        <h3 className="absolute top-[1013px] left-[135px] text-[50px] font-medium leading-[60px]">
          My Contributions
        </h3>

        {/* Live GitHub Contributions Stats & Heatmap */}
        <ContributionsSection />

        {/* Legend */}
        <p className="absolute top-[1306px] left-[1107px] text-[20px] font-light leading-[24px]">
          Less
        </p>
        <div className="absolute top-[1308px] left-[1146px] flex items-center gap-[4px]">
          <div className="w-[19px] h-[19px] rounded-[5px] bg-[#121111]" />
          <div className="w-[19px] h-[19px] rounded-[5px] bg-[#93E7A2]" />
          <div className="w-[19px] h-[19px] rounded-[5px] bg-[#2F984A]" />
          <div className="w-[19px] h-[19px] rounded-[5px] bg-[#216435]" />
        </div>
        <p className="absolute top-[1306px] left-[1256px] text-[20px] font-light leading-[24px]">
          More
        </p>

        {/* Experience */}
        <h3 id="experience" className="absolute top-[1431px] left-[135px] text-[50px] font-medium leading-[60px]">
          Experience
        </h3>
        <ExpCard
          top="1517px"
          role="UI/UX Design Intern"
          company="AkaiSpace — On-site"
          date="Dec 2025 – May 2026"
          bullets={[
            "Conceptualized and designed user interfaces and user flows for the AkaiEarn data labeling platform, creating wireframes and high-fidelity prototypes using Figma. Ensuring complex web3 workflows were accessible to everyday users.",
            "Created high-fidelity prototypes and design systems for our AI-powered tools, focusing on clarity, and visual appeal.",
          ]}
        />
        <ExpCard
          top="1685px"
          role="UI/UX Design Intern"
          company="The Tann Mann Foundation — Remote"
          date="Feb 2025 – Mar 2025"
          bullets={[
            "Led end-to-end design process from wireframing to high-fidelity prototypes using Figma, managing design iterations through collaborative workflows and tracking project milestones via design sprints.",
            "Delivered cohesive user experience designs aligned with user research insights, improving interface usability by 25%.",
            "Optimized design systems and user flows through iterative prototyping, user testing, and design pattern standardization.",
          ]}
        />
        <ExpCard
          top="1885px"
          role="Full Stack Developer Intern"
          company="Pitchmatter"
          date="Jul 2025 – Oct 2025"
          bullets={[
            "Developed 15+ React components with Redux state management and Axios integration, boosting performance by 35%.",
            "Built automated testing workflows using React Testing Library, achieving 85% code coverage.",
          ]}
        />

        {/* Work */}
        <h3 id="projects" className="absolute top-[2044px] left-[135px] text-[50px] font-medium leading-[60px]">
          Work
        </h3>

        <ProjectCard
          cardStyle={{ left: 585, top: 2129, width: 718, height: 600, borderRadius: 10 }}
          imageSrc="/akai_space.png"
          imageAlt="AkaiSpace"
          imageStyle={{ left: 601, top: 2143, width: 686, height: 457 }}
          name="AkaiSpace"
          subtitle="Data annotation Platform"
          textTop={2632}
          textLeft={607}
        />

        <ProjectCard
          cardStyle={{ left: 135, top: 2239, width: 436, height: 490, borderRadius: 10 }}
          imageSrc="/akai_earn.png"
          imageAlt="AkaiEarn"
          imageStyle={{ left: 155, top: 2255, width: 397, height: 321 }}
          name="AkaiEarn"
          desc="Gamified data labeling App to complete AI annotation tasks."
          textTop={2595}
          textLeft={150}
          descWidth={397}
        />

        <ProjectCard
          cardStyle={{ left: 135, top: 2744, width: 722, height: 648, borderRadius: 10 }}
          imageSrc="/penumbra.png"
          imageAlt="Penumbra"
          imageStyle={{ left: 152, top: 2758, width: 689, height: 516 }}
          name="Penumbra"
          subtitle="A secure OTC trading platform"
          subtitleGap={10}
          textTop={3291}
          textLeft={152}
        />

        <ProjectCard
          cardStyle={{ left: 876, top: 2744, width: 427, height: 524, borderRadius: 8 }}
          imageSrc="/docoprint.png"
          imageAlt="DocoPrint"
          imageStyle={{ left: 896, top: 2762, width: 388, height: 361 }}
          name="DocoPrint"
          subtitle="A digital printing platform"
          subtitleGap={11}
          textTop={3152}
          textLeft={896}
        />

        {/* Footer divider ellipse */}
        <svg
          viewBox="0 0 655 655"
          width="655"
          height="655"
          className="absolute top-[3520px] left-[387px] pointer-events-none"
        >
          <path
            d="M327.500 0.000C508.373 0.000 655.000 146.627 655.000 327.500C655.000 508.373 508.373 655.000 327.500 655.000C146.627 655.000 0.000 508.373 0.000 327.500C0.000 146.627 146.627 0.000 327.500 0.000Z"
            fillRule="nonzero"
            fill="#191818"
          />
        </svg>

        {/* Contact Section Anchor Target */}
        <div id="contact" className="absolute top-[3500px] left-0 right-0" />

        {/* Got a project CTA */}
        <div className="absolute top-[3524px] left-1/2 -translate-x-1/2 text-center">
          <p className="text-[42px] font-semibold leading-[52px] whitespace-nowrap">
            Got a project ? What to collaborate ?
          </p>
        </div>

        {/* Book a call button */}
        <div className="absolute top-[3604px] left-1/2 -translate-x-1/2">
          <a
            href="#contact"
            className="group flex items-center justify-center gap-[15px] w-[253px] h-[49px] rounded-full bg-white hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <span className="font-[family-name:var(--font-bricolage)] text-[25px] font-semibold leading-[30px] text-black">
              Book a call
            </span>
            <ArrowUpRight
              className="text-black transition-transform duration-300 group-hover:rotate-45"
              size={33}
              strokeWidth={2}
            />
          </a>
        </div>

        {/* Contact info */}
        <div className="absolute top-[3653px] left-[128px]">
          <p className="text-[22px] font-normal leading-[28px]">Contacts</p>
          <p className="text-[22px] font-bold leading-[28px] mt-[16px]">
            wajihakulsum786@gmail.com
          </p>
          <p className="text-[22px] font-bold leading-[28px] mt-[16px]">
            +91-7841912389
          </p>
          <p className="text-[22px] font-bold leading-[28px] mt-[16px]">
            Mumbai, India
          </p>
        </div>

        {/* Social links */}
        <div className="absolute top-[3653px] left-[1167px] w-[140px] flex flex-col items-end gap-[14px]">
          <FooterSocial href="https://www.behance.net/wajihakulsum">Behance</FooterSocial>
          <FooterSocial href="http://linkedin.com/in/wajihakulsum/">Linkedin</FooterSocial>
          <FooterSocial href="https://github.com/wajiha-kulsum">Github</FooterSocial>
          <FooterSocial href="/Wajiha_Resume.pdf">Resume</FooterSocial>
        </div>

        {/* Big CTA text */}
        <h2 className="absolute top-[3925px] left-[-17px] font-[family-name:var(--font-bricolage)] text-[130px] font-bold leading-[156px] whitespace-nowrap">
          LET&rsquo;S WORK TOGETHER
        </h2>
      </div>
    </div>
  );
}

function NavLink({ children, href }: { children: string; href: string }) {
  return (
    <a href={href} className="text-sm sm:text-[20px] font-light cursor-pointer hover:opacity-80 transition-opacity">
      {children}
    </a>
  );
}

function FooterSocial({ children, href }: { children: string; href?: string }) {
  const Component = href ? "a" : "div";
  return (
    <Component
      href={href}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener noreferrer" : undefined}
      className="group flex items-center gap-[5px] cursor-pointer hover:opacity-80 transition-opacity text-white"
    >
      <span className="text-[22px] font-normal leading-[28px]">{children}</span>
      <ArrowUpRight size={26} strokeWidth={2} className="text-white flex-shrink-0 transition-transform duration-300 group-hover:rotate-45" />
    </Component>
  );
}

function PillButton({ left, children, href }: { left: number; children: string; href?: string }) {
  const Component = href ? "a" : "button";
  return (
    <Component
      href={href}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener noreferrer" : undefined}
      className="group absolute top-[749px] w-[250px] h-[67px] rounded-full border-[0.8px] border-white flex items-center justify-center gap-[8px] text-[22px] leading-[28px] text-white transition-colors hover:bg-white/5 cursor-pointer"
      style={{ left }}
    >
      {children}
      <ArrowUpRight size={26} strokeWidth={2} className="text-white flex-shrink-0 transition-transform duration-300 group-hover:rotate-45" />
    </Component>
  );
}

function ExpCard({
  top,
  role,
  company,
  date,
  bullets,
}: {
  top: string;
  role: string;
  company: string;
  date: string;
  bullets: string[];
}) {
  return (
    <div className="absolute left-[135px] w-[1170px]" style={{ top }}>
      <div className="flex items-baseline justify-between w-full">
        <div className="flex items-center gap-[12px] flex-wrap">
          <p className="text-[26px] font-medium leading-[32px] text-white">
            {role}
          </p>
          <span className="text-[20px] font-normal text-white/70">
            &bull; {company}
          </span>
        </div>
        <p className="text-[18px] font-light leading-[22px] text-white/60 whitespace-nowrap">
          {date}
        </p>
      </div>
      <ul className="mt-[10px] space-y-[6px] text-[16px] leading-[24px] text-white/80 list-disc list-inside max-w-[1100px]">
        {bullets.map((bullet, idx) => (
          <li key={idx}>{bullet}</li>
        ))}
      </ul>
    </div>
  );
}

function ProjectCard({
  cardStyle,
  imageSrc,
  imageAlt,
  imageStyle,
  name,
  subtitle,
  subtitleGap = 6,
  desc,
  textTop,
  textLeft,
  descWidth,
}: {
  cardStyle: {
    left: number;
    top: number;
    width: number;
    height: number;
    borderRadius: number;
  };
  imageSrc: string;
  imageAlt: string;
  imageStyle: { left: number; top: number; width: number; height: number };
  name: string;
  subtitle?: string;
  subtitleGap?: number;
  desc?: string;
  textTop: number;
  textLeft: number;
  descWidth?: number;
}) {
  return (
    <div
      className="absolute group cursor-pointer transition-colors duration-300 rounded-[10px] bg-[#0B0B0B85] hover:bg-[#EDEFE2]"
      style={{
        left: cardStyle.left,
        top: cardStyle.top,
        width: cardStyle.width,
        height: cardStyle.height,
        borderRadius: cardStyle.borderRadius,
      }}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        width={imageStyle.width}
        height={imageStyle.height}
        className="absolute"
        style={{
          left: imageStyle.left - cardStyle.left,
          top: imageStyle.top - cardStyle.top,
          width: imageStyle.width,
          height: imageStyle.height,
          objectFit: "cover",
          borderRadius: 10,
        }}
        unoptimized
      />
      <div
        className="absolute"
        style={{
          left: textLeft - cardStyle.left,
          top: textTop - cardStyle.top,
        }}
      >
        <p className="text-[28px] font-semibold leading-[34px] text-white group-hover:text-black transition-colors duration-300">
          {name}
        </p>
        {subtitle && (
          <p
            className="text-[20px] font-medium leading-[24px] text-[#AAAAAA] group-hover:text-[#3A3A3A] transition-colors duration-300"
            style={{ marginTop: subtitleGap }}
          >
            {subtitle}
          </p>
        )}
        {desc && (
          <p
            className="text-[18px] font-medium leading-[22px] mt-[8px] text-[#6B6B6B]"
            style={descWidth ? { width: descWidth } : undefined}
          >
            {desc}
          </p>
        )}
      </div>
    </div>
  );
}
