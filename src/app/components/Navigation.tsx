'use client';

import { useState, useEffect } from 'react';

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', href: '#' },
    { id: 'about', label: 'About', href: '#about-section' },
    { id: 'skills', label: 'Skills', href: '#skills-section' },
    { id: 'projects', label: 'Projects', href: '#projects-section' },
    { id: 'contact', label: 'Contact', href: '#contact-section' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['home', 'about-section', 'skills-section', 'projects-section', 'contact-section'];
      const currentSection = sections.find(section => {
        const element = section === 'home' ? { offsetTop: 0, offsetHeight: window.innerHeight } : document.getElementById(section);
        if (element) {
          const rect = section === 'home' ? { top: 0, bottom: window.innerHeight } : element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom > 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection === 'home' ? 'home' : currentSection.replace('-section', ''));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl shadow-purple-500/10' 
        : 'backdrop-blur-md bg-white/5 border border-white/10'
    } rounded-full px-6 py-3`}>
      <div className="flex items-center space-x-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.href)}
            className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeSection === item.id
                ? 'text-white bg-gradient-to-r from-purple-500 to-cyan-500 shadow-lg shadow-purple-500/25'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            {item.label}
            
            {/* Active indicator */}
            {activeSection === item.id && (
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 opacity-20 animate-pulse"></div>
            )}
          </button>
        ))}
      </div>

      {/* Decorative glow effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 animate-pulse-glow opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </nav>
  );
};

export default Navigation; 