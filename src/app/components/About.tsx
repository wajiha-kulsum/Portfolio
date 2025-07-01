'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);

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

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Add initial scroll position
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      id="about-section" 
      className="min-h-screen bg-black relative overflow-hidden py-20 px-6"
    >
      {/* Background grid pattern */}
      <div 
        className="absolute inset-0 bg-grid-pattern opacity-20"
        style={{
          transform: `translateY(${scrollY * 0.3}px)`,
        }}
      ></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        <div 
          className="absolute top-20 left-20 w-2 h-2 bg-purple-500 rounded-full animate-float"
          style={{
            transform: `translateY(${scrollY * 0.4}px) translateX(${scrollY * 0.1}px)`,
          }}
        ></div>
        <div 
          className="absolute top-40 right-32 w-1 h-1 bg-blue-400 rounded-full animate-float animation-delay-2000"
          style={{
            transform: `translateY(${scrollY * 0.6}px) translateX(${scrollY * -0.1}px)`,
          }}
        ></div>
        <div 
          className="absolute bottom-40 left-1/4 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-float animation-delay-4000"
          style={{
            transform: `translateY(${scrollY * 0.5}px) translateX(${scrollY * 0.05}px)`,
          }}
        ></div>
        <div 
          className="absolute top-1/2 right-20 w-1 h-1 bg-pink-400 rounded-full animate-float animation-delay-1000"
          style={{
            transform: `translateY(${scrollY * 0.7}px) translateX(${scrollY * -0.05}px)`,
          }}
        ></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Section header */}
          <div 
            className="text-center mb-16"
            style={{
              transform: `translateY(${scrollY * 0.15}px)`,
            }}
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-extralight text-white mb-4 font-poppins tracking-wide">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Me</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full"></div>
          </div>

          <div className="space-y-16">
            
            {/* Main content with text and image */}
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
              
              {/* Left side - About text */}
              <div 
                className="flex-1 text-center lg:text-right"
                style={{
                  transform: `translateY(${scrollY * 0.08}px)`,
                }}
              >
                <div>
                  <p className="text-gray-300 text-xl leading-relaxed font-poppins font-light tracking-wide">
                    Hey! I&apos;m from Mumbai, a web developer and designer who loves creating digital experiences.
                  </p>
                  <p className="text-gray-300 text-xl leading-relaxed mt-4 font-poppins font-light tracking-wide">
                    Always curious about new technologies and up for connections with fellow creators.
                  </p>
                </div>
              </div>

              {/* Right side - Circular Image */}
              <div 
                className="flex-shrink-0 order-first lg:order-last"
                style={{
                  transform: `translateY(${scrollY * 0.12}px)`,
                }}
              >
                <div className="relative w-64 h-64 md:w-80 md:h-80">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full p-1">
                    <div className="w-full h-full bg-black rounded-full p-2">
                      <Image
                        src="/dp.jpg"
                        alt="Profile Picture"
                        width={320}
                        height={320}
                        className="w-full h-full object-cover rounded-full"
                        priority
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tech Stack Marquee - bottom */}
            <div 
              className="space-y-8"
              style={{
                transform: `translateY(${scrollY * 0.06}px)`,
              }}
            >
              <h3 className="text-2xl font-light text-white text-center mb-8 font-poppins tracking-wide">
                Tech Stack
              </h3>
              
              {/* Marquee container */}
              <div className="relative overflow-hidden">
                {/* Left fade overlay */}
                <div className="absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-black via-black/95 via-black/70 via-black/40 via-black/20 to-transparent z-10 pointer-events-none"></div>
                {/* Right fade overlay */}
                <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-black via-black/95 via-black/70 via-black/40 via-black/20 to-transparent z-10 pointer-events-none"></div>
                <div className="flex animate-marquee whitespace-nowrap">
                  <div className="flex items-center space-x-8 mx-8">
                    <div className="tech-button-purple bg-gray-900 border border-purple-500/30 px-6 py-3 rounded-full text-purple-300 font-light shadow-lg transition-colors font-poppins">
                      React
                    </div>
                    <div className="tech-button-cyan bg-gray-900 border border-cyan-500/30 px-6 py-3 rounded-full text-cyan-300 font-light shadow-lg transition-colors font-poppins">
                      Next.js
                    </div>
                    <div className="tech-button-cyan bg-gray-900 border border-cyan-500/30 px-6 py-3 rounded-full text-cyan-300 font-light shadow-lg transition-colors font-poppins">
                      TypeScript
                    </div>
                    <div className="tech-button-purple bg-gray-900 border border-purple-500/30 px-6 py-3 rounded-full text-purple-300 font-light shadow-lg transition-colors font-poppins">
                      Tailwind
                    </div>
                    <div className="tech-button-cyan bg-gray-900 border border-cyan-500/30 px-6 py-3 rounded-full text-cyan-300 font-light shadow-lg transition-colors font-poppins">
                      JavaScript
                    </div>
                    <div className="tech-button-purple bg-gray-900 border border-purple-500/30 px-6 py-3 rounded-full text-purple-300 font-light shadow-lg transition-colors font-poppins">
                      Node.js
                    </div>
                    <div className="tech-button-cyan bg-gray-900 border border-cyan-500/30 px-6 py-3 rounded-full text-cyan-300 font-light shadow-lg transition-colors font-poppins">
                      HTML5
                    </div>
                    <div className="tech-button-purple bg-gray-900 border border-purple-500/30 px-6 py-3 rounded-full text-purple-300 font-light shadow-lg transition-colors font-poppins">
                      CSS3
                    </div>
                    <div className="tech-button-cyan bg-gray-900 border border-cyan-500/30 px-6 py-3 rounded-full text-cyan-300 font-light shadow-lg transition-colors font-poppins">
                      Framer Motion
                    </div>
                    <div className="tech-button-purple bg-gray-900 border border-purple-500/30 px-6 py-3 rounded-full text-purple-300 font-light shadow-lg transition-colors font-poppins">
                      Redux
                    </div>
                    <div className="tech-button-cyan bg-gray-900 border border-cyan-500/30 px-6 py-3 rounded-full text-cyan-300 font-light shadow-lg transition-colors font-poppins">
                      Express
                    </div>
                    <div className="tech-button-purple bg-gray-900 border border-purple-500/30 px-6 py-3 rounded-full text-purple-300 font-light shadow-lg transition-colors font-poppins">
                      Vercel
                    </div>
                  </div>
                  {/* Duplicate for seamless loop */}
                  <div className="flex items-center space-x-8 mx-8">
                    <div className="tech-button-purple bg-gray-900 border border-purple-500/30 px-6 py-3 rounded-full text-purple-300 font-light shadow-lg transition-colors font-poppins">
                      React
                    </div>
                    <div className="tech-button-cyan bg-gray-900 border border-cyan-500/30 px-6 py-3 rounded-full text-cyan-300 font-light shadow-lg transition-colors font-poppins">
                      Next.js
                    </div>
                    <div className="tech-button-cyan bg-gray-900 border border-cyan-500/30 px-6 py-3 rounded-full text-cyan-300 font-light shadow-lg transition-colors font-poppins">
                      TypeScript
                    </div>
                    <div className="tech-button-purple bg-gray-900 border border-purple-500/30 px-6 py-3 rounded-full text-purple-300 font-light shadow-lg transition-colors font-poppins">
                      Tailwind
                    </div>
                    <div className="tech-button-cyan bg-gray-900 border border-cyan-500/30 px-6 py-3 rounded-full text-cyan-300 font-light shadow-lg transition-colors font-poppins">
                      JavaScript
                    </div>
                    <div className="tech-button-purple bg-gray-900 border border-purple-500/30 px-6 py-3 rounded-full text-purple-300 font-light shadow-lg transition-colors font-poppins">
                      Node.js
                    </div>
                    <div className="tech-button-cyan bg-gray-900 border border-cyan-500/30 px-6 py-3 rounded-full text-cyan-300 font-light shadow-lg transition-colors font-poppins">
                      HTML5
                    </div>
                    <div className="tech-button-purple bg-gray-900 border border-purple-500/30 px-6 py-3 rounded-full text-purple-300 font-light shadow-lg transition-colors font-poppins">
                      CSS3
                    </div>
                    <div className="tech-button-cyan bg-gray-900 border border-cyan-500/30 px-6 py-3 rounded-full text-cyan-300 font-light shadow-lg transition-colors font-poppins">
                      Framer Motion
                    </div>
                    <div className="tech-button-purple bg-gray-900 border border-purple-500/30 px-6 py-3 rounded-full text-purple-300 font-light shadow-lg transition-colors font-poppins">
                      Redux
                    </div>
                    <div className="tech-button-cyan bg-gray-900 border border-cyan-500/30 px-6 py-3 rounded-full text-cyan-300 font-light shadow-lg transition-colors font-poppins">
                      Express
                    </div>
                    <div className="tech-button-purple bg-gray-900 border border-purple-500/30 px-6 py-3 rounded-full text-purple-300 font-light shadow-lg transition-colors font-poppins">
                      Vercel
                    </div>
                  </div>
                </div>
              </div>

              {/* Second row moving in opposite direction */}
              <div className="relative overflow-hidden">
                {/* Left fade overlay */}
                <div className="absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-black via-black/95 via-black/70 via-black/40 via-black/20 to-transparent z-10 pointer-events-none"></div>
                {/* Right fade overlay */}
                <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-black via-black/95 via-black/70 via-black/40 via-black/20 to-transparent z-10 pointer-events-none"></div>
                <div className="flex animate-marquee-reverse whitespace-nowrap">
                  <div className="flex items-center space-x-8 mx-8">
                    <div className="tech-button-purple bg-gray-900 border border-purple-500/30 px-6 py-3 rounded-full text-purple-300 font-light shadow-lg transition-colors font-poppins">
                      Figma
                    </div>
                    <div className="tech-button-cyan bg-gray-900 border border-cyan-500/30 px-6 py-3 rounded-full text-cyan-300 font-light shadow-lg transition-colors font-poppins">
                      Git
                    </div>
                    <div className="tech-button-purple bg-gray-900 border border-purple-500/30 px-6 py-3 rounded-full text-purple-300 font-light shadow-lg transition-colors font-poppins">
                      VS Code
                    </div>
                    <div className="tech-button-cyan bg-gray-900 border border-cyan-500/30 px-6 py-3 rounded-full text-cyan-300 font-light shadow-lg transition-colors font-poppins">
                      MongoDB
                    </div>
                    <div className="tech-button-purple bg-gray-900 border border-purple-500/30 px-6 py-3 rounded-full text-purple-300 font-light shadow-lg transition-colors font-poppins">
                      Firebase
                    </div>
                    <div className="tech-button-cyan bg-gray-900 border border-cyan-500/30 px-6 py-3 rounded-full text-cyan-300 font-light shadow-lg transition-colors font-poppins">
                      GitHub
                    </div>
                    <div className="tech-button-purple bg-gray-900 border border-purple-500/30 px-6 py-3 rounded-full text-purple-300 font-light shadow-lg transition-colors font-poppins">
                      Sass
                    </div>
                    <div className="tech-button-cyan bg-gray-900 border border-cyan-500/30 px-6 py-3 rounded-full text-cyan-300 font-light shadow-lg transition-colors font-poppins">
                      PostgreSQL
                    </div>
                    <div className="tech-button-purple bg-gray-900 border border-purple-500/30 px-6 py-3 rounded-full text-purple-300 font-light shadow-lg transition-colors font-poppins">
                      Prisma
                    </div>
                    <div className="tech-button-cyan bg-gray-900 border border-cyan-500/30 px-6 py-3 rounded-full text-cyan-300 font-light shadow-lg transition-colors font-poppins">
                      Netlify
                    </div>
                    <div className="tech-button-purple bg-gray-900 border border-purple-500/30 px-6 py-3 rounded-full text-purple-300 font-light shadow-lg transition-colors font-poppins">
                      Supabase
                    </div>
                    <div className="tech-button-cyan bg-gray-900 border border-cyan-500/30 px-6 py-3 rounded-full text-cyan-300 font-light shadow-lg transition-colors font-poppins">
                      Adobe XD
                    </div>
                  </div>
                  {/* Duplicate for seamless loop */}
                  <div className="flex items-center space-x-8 mx-8">
                    <div className="tech-button-purple bg-gray-900 border border-purple-500/30 px-6 py-3 rounded-full text-purple-300 font-light shadow-lg transition-colors font-poppins">
                      Figma
                    </div>
                    <div className="tech-button-cyan bg-gray-900 border border-cyan-500/30 px-6 py-3 rounded-full text-cyan-300 font-light shadow-lg transition-colors font-poppins">
                      Git
                    </div>
                    <div className="tech-button-purple bg-gray-900 border border-purple-500/30 px-6 py-3 rounded-full text-purple-300 font-light shadow-lg transition-colors font-poppins">
                      VS Code
                    </div>
                    <div className="tech-button-cyan bg-gray-900 border border-cyan-500/30 px-6 py-3 rounded-full text-cyan-300 font-light shadow-lg transition-colors font-poppins">
                      MongoDB
                    </div>
                    <div className="tech-button-purple bg-gray-900 border border-purple-500/30 px-6 py-3 rounded-full text-purple-300 font-light shadow-lg transition-colors font-poppins">
                      Firebase
                    </div>
                    <div className="tech-button-cyan bg-gray-900 border border-cyan-500/30 px-6 py-3 rounded-full text-cyan-300 font-light shadow-lg transition-colors font-poppins">
                      GitHub
                    </div>
                    <div className="tech-button-purple bg-gray-900 border border-purple-500/30 px-6 py-3 rounded-full text-purple-300 font-light shadow-lg transition-colors font-poppins">
                      Sass
                    </div>
                    <div className="tech-button-cyan bg-gray-900 border border-cyan-500/30 px-6 py-3 rounded-full text-cyan-300 font-light shadow-lg transition-colors font-poppins">
                      PostgreSQL
                    </div>
                    <div className="tech-button-purple bg-gray-900 border border-purple-500/30 px-6 py-3 rounded-full text-purple-300 font-light shadow-lg transition-colors font-poppins">
                      Prisma
                    </div>
                    <div className="tech-button-cyan bg-gray-900 border border-cyan-500/30 px-6 py-3 rounded-full text-cyan-300 font-light shadow-lg transition-colors font-poppins">
                      Netlify
                    </div>
                    <div className="tech-button-purple bg-gray-900 border border-purple-500/30 px-6 py-3 rounded-full text-purple-300 font-light shadow-lg transition-colors font-poppins">
                      Supabase
                    </div>
                    <div className="tech-button-cyan bg-gray-900 border border-cyan-500/30 px-6 py-3 rounded-full text-cyan-300 font-light shadow-lg transition-colors font-poppins">
                      Adobe XD
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 