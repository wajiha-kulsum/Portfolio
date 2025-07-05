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
      className="bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden py-16 px-4 sm:px-6"
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-purple-500/3 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-10 w-56 h-56 bg-cyan-500/3 rounded-full blur-3xl animate-pulse-slow animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-pink-500/2 rounded-full blur-3xl animate-pulse-slow animation-delay-4000"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Professional Header */}
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white mb-3">
              Let&apos;s <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400">Connect</span>
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
              Find me on social platforms and check my current availability
            </p>
            <div className="w-16 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full mt-4"></div>
          </div>

                    {/* Main Content - Centered Layout */}
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6 items-stretch">

              {/* Social Links */}
              <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/8 transition-all duration-500 min-h-[320px] flex flex-col">
                <h3 className="text-xl font-semibold text-white mb-5 text-center">
                  Connect Online
                </h3>
                <div className="grid grid-cols-1 gap-3 flex-1">
                  {socialLinks.map((link, index) => (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative overflow-hidden flex items-center justify-start px-4 py-3 bg-gradient-to-r from-white/5 to-white/10 border border-white/20 rounded-lg hover:from-white/10 hover:to-white/15 hover:border-white/30 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-500 transform"
                      style={{
                        animationDelay: `${index * 100}ms`
                      }}
                    >
                      {/* Animated background gradient */}
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-cyan-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:via-cyan-500/5 group-hover:to-pink-500/5 transition-all duration-500"></div>
                      
                      {/* Content */}
                      <div className="relative flex items-center">
                        <div className={`text-gray-400 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:${link.color} transition-all duration-500 transform group-hover:scale-110`}>
                          {link.icon}
                        </div>
                        <span className="ml-3 text-gray-400 group-hover:text-white transition-all duration-500 font-medium group-hover:translate-x-1">
                          {link.name}
                        </span>
                      </div>
                      
                      {/* Hover shine effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Current Status */}
              <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/8 transition-all duration-500 min-h-[320px] flex flex-col justify-center">
                <h3 className="text-xl font-semibold text-white mb-6 text-center">
                  Current Status
                </h3>
                <div className="text-center space-y-5 flex-1 flex flex-col justify-center">
                  <div className="flex items-center justify-center">
                    <div className="relative">
                      <div className="w-5 h-5 bg-green-400 rounded-full animate-pulse"></div>
                      <div className="absolute inset-0 w-5 h-5 bg-green-400 rounded-full animate-ping opacity-30"></div>
                    </div>
                    <span className="ml-3 text-green-400 text-lg font-bold">Available</span>
                  </div>
                  
                  <div className="space-y-3">
                    <p className="text-gray-300 text-lg font-medium">
                      Open for new projects and collaborations
                    </p>
                    <p className="text-gray-400 text-sm">
                      Ready to discuss your next idea!
                    </p>
                  </div>
                  
                  {/* Status cards */}
                  <div className="grid grid-cols-1 gap-2 mt-4">
                    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-2.5">
                      <div className="flex items-center justify-center">
                        <svg className="w-4 h-4 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-green-300 text-xs font-medium">Accepting New Projects</span>
                      </div>
                    </div>
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-2.5">
                      <div className="flex items-center justify-center">
                        <svg className="w-4 h-4 text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-blue-300 text-xs font-medium">Response within 24h</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

                    {/* Bottom Section */}
          <div className="mt-12 pt-6 border-t border-white/10">
            <div className="flex justify-center items-center gap-3">
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse"></div>
                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse animation-delay-1000"></div>
                <div className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse animation-delay-2000"></div>
              </div>
              <p className="text-gray-500 text-xs">
                © 2025 Wajiha Kulsum. Let's build something amazing together.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 