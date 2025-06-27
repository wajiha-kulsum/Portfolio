'use client';

import { useState, useEffect } from 'react';

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);

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
      title: "E-Commerce Platform",
      description: "Modern e-commerce solution with React, Next.js, and Stripe integration. Features include user authentication, shopping cart, and admin dashboard.",
      tech: ["React", "Next.js", "Tailwind", "Stripe"],
      gradient: "from-purple-500 to-pink-500",
      status: "Live"
    },
    {
      title: "Task Management App",
      description: "Collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
      tech: ["React", "Node.js", "Socket.io", "MongoDB"],
      gradient: "from-cyan-500 to-blue-500",
      status: "In Progress"
    },
    {
      title: "Portfolio Website",
      description: "Interactive portfolio showcase with 3D animations, smooth transitions, and responsive design. Built with modern web technologies.",
      tech: ["Next.js", "TypeScript", "Spline", "Framer Motion"],
      gradient: "from-green-500 to-teal-500",
      status: "Live"
    },
    {
      title: "Weather Dashboard",
      description: "Real-time weather application with location-based forecasts, interactive maps, and beautiful data visualizations.",
      tech: ["React", "APIs", "Chart.js", "CSS3"],
      gradient: "from-orange-500 to-red-500",
      status: "Completed"
    },
    {
      title: "Chat Application",
      description: "Real-time messaging platform with group chats, file sharing, and emoji reactions. Features end-to-end encryption.",
      tech: ["React", "Firebase", "WebRTC", "CSS3"],
      gradient: "from-indigo-500 to-purple-500",
      status: "Live"
    },
    {
      title: "Learning Management System",
      description: "Educational platform with course management, video streaming, quizzes, and progress tracking for students and instructors.",
      tech: ["Next.js", "Prisma", "PostgreSQL", "Tailwind"],
      gradient: "from-pink-500 to-rose-500",
      status: "In Development"
    }
  ];

  return (
    <section 
      id="projects-section" 
      className="min-h-screen bg-black relative overflow-hidden py-20 px-6"
    >
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      {/* Floating geometric shapes */}
      <div className="absolute inset-0">
        <div className="absolute top-32 left-20 w-4 h-4 border border-purple-400 rotate-45 animate-float"></div>
        <div className="absolute top-1/2 right-32 w-6 h-6 border border-cyan-400 rotate-45 animate-float animation-delay-2000"></div>
        <div className="absolute bottom-40 left-1/3 w-3 h-3 border border-pink-400 rotate-45 animate-float animation-delay-4000"></div>
        <div className="absolute top-1/4 right-1/4 w-5 h-5 border border-green-400 rotate-45 animate-float animation-delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Section header */}
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-white mb-6">
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400">Projects</span>
            </h2>
            <p className="text-gray-400 text-xl max-w-3xl mx-auto">
              A collection of projects that showcase my skills and passion for web development
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full mt-6"></div>
          </div>

          {/* Projects grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div 
                key={project.title}
                className={`group cursor-pointer transition-all duration-700 delay-${index * 100} ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="relative backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 h-full hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:border-white/20 overflow-hidden">
                  
                  {/* Status badge */}
                  <div className="absolute top-4 right-4 z-20">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      project.status === 'Live' ? 'bg-green-500/20 text-green-400 border border-green-400/30' :
                      project.status === 'In Progress' ? 'bg-blue-500/20 text-blue-400 border border-blue-400/30' :
                      project.status === 'In Development' ? 'bg-orange-500/20 text-orange-400 border border-orange-400/30' :
                      'bg-purple-500/20 text-purple-400 border border-purple-400/30'
                    }`}>
                      {project.status}
                    </span>
                  </div>

                  {/* Gradient background effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition-all duration-500 rounded-2xl`}></div>
                  
                  {/* Project header */}
                  <div className="relative z-10 mb-6">
                    <h3 className="text-2xl font-semibold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                      {project.title}
                    </h3>
                    <div className={`w-12 h-0.5 bg-gradient-to-r ${project.gradient} rounded-full group-hover:w-20 transition-all duration-500`}></div>
                  </div>

                  {/* Project description */}
                  <p className="text-gray-300 text-base leading-relaxed mb-6 relative z-10">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 mb-6 relative z-10">
                    {project.tech.map((tech, techIndex) => (
                      <span 
                        key={tech}
                        className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-sm text-gray-300 hover:bg-white/20 hover:text-white transition-all duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Project links */}
                  <div className="flex space-x-4 relative z-10">
                    <button className="flex-1 bg-gradient-to-r from-purple-500 to-cyan-500 text-white py-2 px-4 rounded-lg font-medium hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25">
                      View Project
                    </button>
                    <button className="p-2 border border-white/20 rounded-lg text-gray-400 hover:text-white hover:border-white/40 transition-all duration-300 hover:scale-105">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>

                  {/* Decorative corner element */}
                  <div className="absolute bottom-4 right-4 w-8 h-8 opacity-0 group-hover:opacity-20 transition-all duration-500">
                    <div className={`w-full h-full bg-gradient-to-br ${project.gradient} rounded-lg rotate-45 animate-spin-slow`}></div>
                  </div>
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