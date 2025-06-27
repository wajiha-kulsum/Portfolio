'use client';

import { useState, useEffect } from 'react';

const About = () => {
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

    const element = document.getElementById('about-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="about-section" 
      className="min-h-screen bg-black relative overflow-hidden py-20 px-6"
    >
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-2 h-2 bg-purple-500 rounded-full animate-float"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-blue-400 rounded-full animate-float animation-delay-2000"></div>
        <div className="absolute bottom-40 left-1/4 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-float animation-delay-4000"></div>
        <div className="absolute top-1/2 right-20 w-1 h-1 bg-pink-400 rounded-full animate-float animation-delay-1000"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-white mb-4">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Me</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left side - Text content */}
            <div className="space-y-8">
              <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-500 hover:scale-105">
                <h3 className="text-2xl font-semibold text-white mb-4 flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></span>
                  Who I Am
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  I'm a passionate Web Developer and UI Designer with a love for creating immersive digital experiences. 
                  I specialize in modern web technologies and enjoy bringing creative concepts to life through code.
                </p>
              </div>

              <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-500 hover:scale-105">
                <h3 className="text-2xl font-semibold text-white mb-4 flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 animate-pulse animation-delay-1000"></span>
                  What I Do
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  I craft responsive websites, intuitive user interfaces, and engaging user experiences. 
                  From concept to deployment, I focus on clean code, modern design patterns, and performance optimization.
                </p>
              </div>

              <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-500 hover:scale-105">
                <h3 className="text-2xl font-semibold text-white mb-4 flex items-center">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-3 animate-pulse animation-delay-2000"></span>
                  My Passion
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  I'm driven by the intersection of technology and creativity. Whether it's exploring new frameworks, 
                  designing seamless user journeys, or solving complex problems, I love pushing boundaries.
                </p>
              </div>
            </div>

            {/* Right side - Visual element */}
            <div className="relative">
              <div className="relative w-full h-96 rounded-3xl overflow-hidden backdrop-blur-md bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-white/20">
                
                {/* Animated orbs */}
                <div className="absolute inset-0">
                  <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-70 animate-pulse-slow"></div>
                  <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full opacity-60 animate-pulse-slow animation-delay-2000"></div>
                  <div className="absolute bottom-1/4 left-1/2 w-12 h-12 bg-gradient-to-r from-green-400 to-teal-400 rounded-full opacity-80 animate-pulse-slow animation-delay-4000"></div>
                </div>

                {/* Code-like elements */}
                <div className="absolute inset-6 space-y-4 pt-8">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  
                  <div className="space-y-3 text-gray-300 font-mono text-sm">
                    <div className="opacity-70">
                      <span className="text-purple-400">const</span> <span className="text-cyan-400">developer</span> = {"{"}
                    </div>
                    <div className="ml-4 opacity-60">
                      <span className="text-green-400">name</span>: <span className="text-yellow-400">"Wajiha Kulsum"</span>,
                    </div>
                    <div className="ml-4 opacity-60">
                      <span className="text-green-400">passion</span>: <span className="text-yellow-400">"Web Development"</span>,
                    </div>
                    <div className="ml-4 opacity-60">
                      <span className="text-green-400">skills</span>: [<span className="text-yellow-400">"React"</span>, <span className="text-yellow-400">"Next.js"</span>, <span className="text-yellow-400">"UI/UX"</span>],
                    </div>
                    <div className="opacity-70">{"}"}</div>
                  </div>
                </div>

                {/* Border glow effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/20 to-cyan-500/20 animate-pulse-glow"></div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 