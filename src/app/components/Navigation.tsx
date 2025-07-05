'use client';

import { useState, useEffect } from 'react';

// Responsive Navigation Component - Mobile & Desktop

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('home')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isManualNavigation, setIsManualNavigation] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', href: '#' },
    { id: 'about', label: 'About', href: '#about-section' },
    // { id: 'skills', label: 'Skills', href: '#skills-section' },
    { id: 'projects', label: 'Projects', href: '#projects-section' },
    { id: 'contact', label: 'Contact', href: '#contact-section' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Don't update active section if user manually navigated
      if (isManualNavigation) return;
      
      // Update active section based on scroll position
      const sections = ['home', 'about-section', 'skills-section', 'projects-section', 'contact-section'];
      const currentSection = sections.find(section => {
        if (section === 'home') {
          return window.scrollY < 100;
        } else {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            return rect.top <= 100 && rect.bottom > 100;
          }
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection === 'home' ? 'home' : currentSection.replace('-section', ''));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isManualNavigation]);

  const scrollToSection = (href: string, itemId: string) => {
    // Set manual navigation flag to prevent scroll detection interference
    setIsManualNavigation(true);
    
    // Immediately update active section for instant visual feedback
    setActiveSection(itemId);
    
    if (href === '#' || itemId === 'home') {
      // Enhanced scroll to top for Home
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      
      // Also use smooth scroll
      window.scrollTo({ 
        top: 0, 
        behavior: 'smooth' 
      });
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    
    // Close mobile menu after navigation
    setIsMobileMenuOpen(false);
    
    // Re-enable scroll detection after a delay
    setTimeout(() => {
      setIsManualNavigation(false);
    }, 1000);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex fixed top-6 left-1/2 transform -translate-x-1/2 z-50 backdrop-blur-xl bg-black/20 border border-white/10 rounded-full px-2 py-2 shadow-2xl shadow-black/20">
        <div className="flex items-center space-x-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.href, item.id)}
              className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 overflow-hidden group ${
                activeSection === item.id
                  ? 'text-white bg-gradient-to-r from-purple-500 to-cyan-500 shadow-lg shadow-purple-500/25'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800/60'
              }`}
                          >
                {item.label}
                
                {/* Gradient border on hover for all items */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10">
                  <div className="absolute inset-[1px] rounded-full bg-black"></div>
                </div>
              </button>
          ))}
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className={`md:hidden fixed top-4 right-4 z-50 transition-all duration-500`}>
        {/* Mobile Menu Toggle Button */}
        <button
          onClick={toggleMobileMenu}
          className="relative w-12 h-12 rounded-full backdrop-blur-xl bg-black/20 border border-white/10 shadow-2xl shadow-black/20 flex items-center justify-center group"
        >
          {/* Hamburger Icon */}
          <div className="flex flex-col items-center justify-center w-5 h-5 space-y-1">
            <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${
              isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
            }`}></span>
            <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${
              isMobileMenuOpen ? 'opacity-0' : ''
            }`}></span>
            <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${
              isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
            }`}></span>
          </div>
        </button>

        {/* Mobile Menu Overlay */}
        <div className={`absolute top-16 right-0 transition-all duration-500 transform origin-top-right ${
          isMobileMenuOpen 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 -translate-y-4 pointer-events-none'
        }`}>
          <div className="backdrop-blur-xl bg-black/20 border border-white/10 rounded-2xl shadow-2xl shadow-black/20 overflow-hidden min-w-[200px]">
            <div className="px-2 py-3 space-y-1">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.href, item.id)}
                  className={`relative w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center overflow-hidden group ${
                    activeSection === item.id
                      ? 'text-white bg-gradient-to-r from-purple-500 to-cyan-500 shadow-lg shadow-purple-500/25'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800/60'
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="relative z-10">{item.label}</span>
                  
                  {/* Gradient border on hover for all items */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10">
                    <div className="absolute inset-[1px] rounded-xl bg-black/20"></div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Navigation; 
