'use client';

import { useState, useEffect } from 'react';

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeProject, setActiveProject] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('projects-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      id: 1,
      title: "Mentor Her",
      description: "A mentorship platform connecting women with industry professionals. Features include user authentication, mentorship matching, and scheduling tools.",
      tech: ["React", "Next.js", "Tailwind", "Node.js"],
      gradient: "from-purple-500 to-pink-500",
      status: "Live",
      link: "https://mentorher-frontend.vercel.app/",
      github: "https://github.com/wajiha-kulsum/MentorHer"
    },
    {
      id: 2,
      title: "Serenity",
      description: "A mental wellness application with guided meditation, mood tracking, and personalized recommendations for stress management.",
      tech: ["React", "Node.js", "MongoDB", "Chart.js"],
      gradient: "from-cyan-500 to-blue-500",
      status: "In Progress",
      link: "https://github.com/wajiha-kulsum/H10_crwdstrk",
      github: "https://github.com/wajiha-kulsum/H10_crwdstrk"
    },
    {
      id: 3,
      title: "Clinicalsh",
      description: "Healthcare management system for clinics with appointment scheduling, patient records, and billing integration.",
      tech: ["React", "TypeScript", "Firebase", "Tailwind"],
      gradient: "from-orange-500 to-red-500",
      status: "Completed",
      link: "https://github.com/wajiha-kulsum/CliniCash",
      github: "https://github.com/wajiha-kulsum/CliniCash"
    }
    
  ];

  return (
    <section 
      id="projects-section" 
      className="min-h-screen bg-black relative overflow-hidden py-12 sm:py-16 md:py-20 px-4 sm:px-6"
    >
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      {/* Floating geometric shapes - hidden on mobile */}
      <div className="absolute inset-0 hidden md:block">
        <div className="absolute top-32 left-20 w-4 h-4 border border-purple-400 rotate-45 animate-float"></div>
        <div className="absolute top-1/2 right-32 w-6 h-6 border border-cyan-400 rotate-45 animate-float animation-delay-2000"></div>
        <div className="absolute bottom-40 left-1/3 w-3 h-3 border border-pink-400 rotate-45 animate-float animation-delay-4000"></div>
        <div className="absolute top-1/4 right-1/4 w-5 h-5 border border-green-400 rotate-45 animate-float animation-delay-1000"></div>
      </div>

      {/* Mobile floating elements */}
      <div className="absolute inset-0 md:hidden">
        <div className="absolute top-20 right-6 w-3 h-3 border border-purple-400 rotate-45 animate-float"></div>
        <div className="absolute bottom-32 left-6 w-2 h-2 border border-cyan-400 rotate-45 animate-float animation-delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 px-2 sm:px-0">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Section header */}
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-white mb-4 sm:mb-6">
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400">Projects</span>
            </h2>
            <p className="text-gray-400 text-lg sm:text-xl max-w-3xl mx-auto px-4">
              A collection of projects that showcase my skills and passion for web development
            </p>
            <div className="w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full mt-4 sm:mt-6"></div>
          </div>

          {/* Projects grid */}
          <div className="flex flex-col space-y-4 sm:space-y-6">
            {projects.slice(0, 6).map((project, index) => (
              <div 
                key={project.id}
                className={`group cursor-pointer transition-all duration-700 delay-${index * 100} ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                onMouseEnter={() => setActiveProject(project.id)}
                onMouseLeave={() => setActiveProject(null)}
              >
                <div className={`relative backdrop-blur-md bg-white/5 border border-white/10 rounded-xl min-h-[280px] sm:min-h-[220px] md:h-44 hover:bg-white/10 transition-all duration-500 ${activeProject === project.id ? 'scale-[1.02]' : ''} hover:border-white/20 overflow-hidden flex flex-col md:flex-row`}>
                  
                  {/* Status badge */}
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-20">
                    <span className={`px-2.5 sm:px-3 py-1 rounded-full text-xs font-medium ${
                      project.status === 'Live' ? 'bg-green-500/20 text-green-300 border border-green-400/30' :
                      project.status === 'In Progress' ? 'bg-blue-500/20 text-blue-300 border border-blue-400/30' :
                      project.status === 'In Development' ? 'bg-orange-500/20 text-orange-300 border border-orange-400/30' :
                      'bg-purple-500/20 text-purple-300 border border-purple-400/30'
                    }`}>
                      {project.status}
                    </span>
                  </div>

                  {/* Gradient background effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 md:group-hover:opacity-10 transition-all duration-500 rounded-xl`}></div>
                  
                  {/* Project content - left side */}
                  <div className="relative z-10 p-4 sm:p-6 flex-1">
                    {/* Project header */}
                    <div className="mb-3 sm:mb-4">
                      <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                        {project.title}
                      </h3>
                      <div className={`w-12 sm:w-16 h-1 bg-gradient-to-r ${project.gradient} rounded-full group-hover:w-20 sm:group-hover:w-24 transition-all duration-500`}></div>
                    </div>

                    {/* Project description */}
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4 md:mb-0 relative z-10 max-w-2xl">
                      {project.description}
                    </p>
                  </div>

                  {/* Project content - right side */}
                  <div className="relative z-10 p-4 sm:p-6 w-full md:w-1/3 flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/10">
                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-3 relative z-10">
                      {project.tech.map((tech) => (
                        <span 
                          key={tech}
                          className="px-2.5 py-1 bg-white/10 border border-white/20 rounded-full text-xs sm:text-sm text-gray-200 hover:bg-white/20 hover:text-white transition-all duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Project links */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 relative z-10">
                      <a 
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-gradient-to-r from-purple-500 to-cyan-500 text-white py-3 sm:py-2 px-4 rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105 transition-all duration-300 text-center min-h-[44px] flex items-center justify-center"
                      >
                        View Project
                      </a>
                      <a 
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 sm:p-2 border border-white/20 rounded-lg text-gray-300 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all duration-300 min-h-[44px] flex items-center justify-center sm:w-auto"
                        aria-label="View GitHub repository"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" clipRule="evenodd" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  {/* Decorative corner elements */}
                  <div className="absolute top-2 left-2 w-4 h-4 sm:w-6 sm:h-6 border-t border-l border-white/20 rounded-tl-lg"></div>
                  <div className="absolute bottom-2 right-2 w-4 h-4 sm:w-6 sm:h-6 border-b border-r border-white/20 rounded-br-lg"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects; 