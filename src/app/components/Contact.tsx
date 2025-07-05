'use client';

import { useState, useEffect } from 'react';

const Contact = () => {
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

    const element = document.getElementById('contact-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const socialLinks = [
    {
      name: 'GitHub',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
      href: 'https://github.com/wajiha-kulsum',
      color: 'from-gray-400 to-gray-600'
    },
    {
      name: 'LinkedIn',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      href: 'https://linkedin.com/in/wajiha-kulsum',
      color: 'from-blue-400 to-blue-600'
    },
    {
      name: 'Resume',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      href: '/Wajiha_Kulsum.pdf',
      color: 'from-green-400 to-green-600'
    },
    {
      name: 'Email',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      href: 'mailto:wajihakulsum786@gmail.com',
      color: 'from-purple-400 to-pink-600'
    },
    {
      name: 'Twitter',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      href: 'https://x.com/KulsumWajiha',
      color: 'from-blue-400 to-blue-600'
    }
  ];

  return (
    <section 
      id="contact-section" 
      className="bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden py-12 px-4 sm:px-6"
    >
      {/* Subtle background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-10 w-40 h-40 bg-purple-500/2 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-10 w-36 h-36 bg-cyan-500/2 rounded-full blur-3xl animate-pulse-slow animation-delay-2000"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Professional Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-white mb-2">
              Let&apos;s <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400">Connect</span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
              Find me on social platforms and check my current availability
            </p>
            <div className="w-12 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full mt-3"></div>
          </div>

                    {/* Main Content - Centered Layout */}
          <div className="max-w-3xl mx-auto">
            <div className="grid md:grid-cols-2 gap-4 items-stretch">

              {/* Social Links */}
              <div className="backdrop-blur-lg bg-white/8 border border-white/20 rounded-lg p-4 hover:bg-white/12 hover:border-white/30 transition-all duration-300 min-h-[260px] flex flex-col shadow-lg">
                <h3 className="text-lg font-semibold text-white mb-4 text-center">
                  Connect Online
                </h3>
                <div className="grid grid-cols-1 gap-2 flex-1">
                  {socialLinks.map((link, index) => (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative overflow-hidden flex items-center justify-start px-3 py-2.5 bg-white/5 border border-white/15 rounded-md hover:bg-white/10 hover:border-white/25 hover:scale-[1.01] transition-all duration-300 transform"
                      style={{
                        animationDelay: `${index * 50}ms`
                      }}
                    >
                      {/* Subtle background gradient */}
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-cyan-500/0 to-pink-500/0 group-hover:from-purple-500/3 group-hover:via-cyan-500/3 group-hover:to-pink-500/3 transition-all duration-300"></div>
                      
                      {/* Content */}
                      <div className="relative flex items-center">
                        <div className={`text-gray-400 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:${link.color} transition-all duration-300 transform group-hover:scale-105`}>
                          {link.icon}
                        </div>
                        <span className="ml-3 text-gray-400 group-hover:text-white transition-all duration-300 font-medium text-sm">
                          {link.name}
                        </span>
                      </div>
                      
                      {/* Crisp hover line */}
                      <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400 w-0 group-hover:w-full transition-all duration-300"></div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Current Status */}
              <div className="backdrop-blur-lg bg-white/8 border border-white/20 rounded-lg p-4 hover:bg-white/12 hover:border-white/30 transition-all duration-300 min-h-[260px] flex flex-col justify-center shadow-lg">
                <h3 className="text-lg font-semibold text-white mb-4 text-center">
                  Current Status
                </h3>
                <div className="text-center space-y-4 flex-1 flex flex-col justify-center">
                  <div className="flex items-center justify-center">
                    <div className="relative">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping opacity-30"></div>
                    </div>
                    <span className="ml-2 text-green-400 text-base font-bold">Available</span>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-gray-300 text-base font-medium">
                      Open for new projects
                    </p>
                    <p className="text-gray-400 text-xs">
                      Ready to discuss your next idea!
                    </p>
                  </div>

                  {/* Location */}
                  <div className="flex items-center justify-center">
                    <svg className="w-3 h-3 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-gray-400 text-xs font-medium">Mumbai, India</span>
                  </div>
                  
                  {/* Crisp status indicators */}
                  <div className="flex flex-col gap-2 mt-3">
                    <div className="bg-green-500/15 border border-green-500/30 rounded-md p-2">
                      <div className="flex items-center justify-center">
                        <svg className="w-3 h-3 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-green-300 text-xs font-medium">Accepting Projects</span>
                      </div>
                    </div>
                    <div className="bg-blue-500/15 border border-blue-500/30 rounded-md p-2">
                      <div className="flex items-center justify-center">
                        <svg className="w-3 h-3 text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-blue-300 text-xs font-medium">Quick Response</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

                    {/* Bottom Section */}
          <div className="mt-8 pt-4 border-t border-white/10">
            <div className="flex justify-center items-center gap-2">
              <div className="flex items-center space-x-1">
                <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse"></div>
                <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse animation-delay-1000"></div>
                <div className="w-1 h-1 bg-pink-400 rounded-full animate-pulse animation-delay-2000"></div>
              </div>
              <p className="text-gray-500 text-xs">
                © 2025 Wajiha Kulsum. Let&apos;s build something amazing together.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 