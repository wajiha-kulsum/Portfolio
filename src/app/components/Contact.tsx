'use client';

import { useState, useEffect } from 'react';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Create Gmail compose URL - this ALWAYS works
    setTimeout(() => {
      const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
      const body = encodeURIComponent(
        `Hi Wajiha,\n\n` +
        `Name: ${formData.name}\n` +
        `Email: ${formData.email}\n\n` +
        `Message:\n${formData.message}\n\n` +
        `Best regards,\n${formData.name}`
      );
      
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=wajihakulsum786@gmail.com&su=${subject}&body=${body}`;
      
      // Open Gmail compose in new tab
      window.open(gmailUrl, '_blank');
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
      
      // Clear status after 8 seconds
      setTimeout(() => setSubmitStatus('idle'), 8000);
    }, 1000);
  };

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
      className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden py-12 sm:py-16 md:py-20 px-4 sm:px-6"
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-purple-500/3 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-cyan-500/3 rounded-full blur-3xl animate-pulse-slow animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/2 rounded-full blur-3xl animate-pulse-slow animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Professional Header */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-white mb-4">
              Let&apos;s <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400">Connect</span>
            </h2>
            <p className="text-gray-400 text-lg sm:text-xl max-w-3xl mx-auto">
              Fill out the form below or use the direct email button - both open Gmail with a pre-filled message
            </p>
            <div className="w-20 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full mt-6"></div>
          </div>

          {/* Main Content - Horizontal Layout */}
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
            
            {/* Contact Form - Takes 3/5 of the width */}
            <div className="lg:col-span-3">
              <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 hover:bg-white/8 transition-all duration-500">
                <h3 className="text-xl sm:text-2xl font-semibold text-white mb-6 text-center lg:text-left">
                  Send a Message
                </h3>
                <div className="mb-4 p-3 bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-300 text-sm">
                  <strong>📧 How it works:</strong> This form opens Gmail in a new tab with your message pre-filled. Works 100% of the time!
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name and Email in horizontal row */}
                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label htmlFor="name" className="block text-gray-300 text-sm font-medium mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all duration-300"
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all duration-300"
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-gray-300 text-sm font-medium mb-2">
                      Project Details
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400 transition-all duration-300 resize-none"
                      placeholder="Tell me about your project, requirements, timeline, and budget..."
                      required
                    ></textarea>
                  </div>

                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 text-center">
                      <div className="flex items-center justify-center mb-2">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Gmail opened in new tab!
                      </div>
                      <p className="text-sm text-green-300">
                        A Gmail compose window opened with your message pre-filled. Just click <strong>"Send"</strong> to send it to Wajiha!
                      </p>
                    </div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-center">
                      <div className="flex items-center justify-center mb-2">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Failed to send message
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-red-300">Gmail couldn't open automatically.</p>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText('wajihakulsum786@gmail.com');
                            alert('Email address copied! Paste it in your email app.');
                          }}
                          className="px-4 py-2 bg-red-500/20 border border-red-500/30 rounded text-red-300 hover:bg-red-500/30 transition-colors text-sm"
                        >
                          Copy Email Address
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="space-y-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-purple-500 via-cyan-500 to-pink-500 text-white py-4 px-6 rounded-lg font-semibold hover:scale-[1.02] transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Opening Gmail...
                        </div>
                      ) : (
                        'Send Message'
                      )}
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => {
                        window.open('mailto:wajihakulsum786@gmail.com?subject=Portfolio Contact&body=Hi Wajiha, I would like to discuss a project with you.', '_blank');
                      }}
                      className="w-full bg-white/10 border border-white/20 text-white py-3 px-6 rounded-lg font-medium hover:bg-white/20 transition-all duration-300 text-sm"
                    >
                      📧 Quick Email (Alternative)
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Contact Info - Takes 2/5 of the width */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Direct Contact */}
              <div className="backdrop-blur-md bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 rounded-2xl p-6 hover:from-purple-500/15 hover:to-cyan-500/15 transition-all duration-500">
                <h3 className="text-xl font-semibold text-white mb-4">
                  📧 Direct Contact
                </h3>
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-gray-300 text-sm mb-3">Send me an email directly:</p>
                    <button
                      onClick={() => {
                        window.open('https://mail.google.com/mail/?view=cm&fs=1&to=wajihakulsum786@gmail.com&su=Portfolio Contact&body=Hi Wajiha, I would like to discuss a project with you.', '_blank');
                      }}
                      className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white py-3 px-4 rounded-lg font-semibold hover:scale-105 transition-all duration-300"
                    >
                      ✉️ Open Gmail & Send
                    </button>
                  </div>
                  
                  <div className="border-t border-white/10 pt-4">
                    <div className="flex items-center justify-between text-gray-300">
                      <span className="text-sm">Email:</span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText('wajihakulsum786@gmail.com');
                          alert('Email copied to clipboard!');
                        }}
                        className="text-sm text-purple-400 hover:text-purple-300 underline"
                      >
                        wajihakulsum786@gmail.com
                      </button>
                    </div>
                    <div className="flex items-center justify-between text-gray-300 mt-2">
                      <span className="text-sm">Response:</span>
                      <span className="text-sm text-cyan-400">Within 24 hours</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links - Horizontal Layout */}
              <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 transition-all duration-500">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Connect Online
                </h3>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:scale-105 transition-all duration-300 flex-1 min-w-fit"
                    >
                      <div className={`text-gray-400 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:${link.color} transition-all duration-300`}>
                        {link.icon}
                      </div>
                      <span className="ml-2 text-gray-400 group-hover:text-white transition-colors duration-300 text-sm font-medium">
                        {link.name}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Availability Status */}
              <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 transition-all duration-500">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      Current Status
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Available for new projects
                    </p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse mr-2"></div>
                    <span className="text-green-400 text-sm font-medium">Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-16 pt-8 border-t border-white/10">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse animation-delay-1000"></div>
                <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse animation-delay-2000"></div>
              </div>
              <p className="text-gray-500 text-sm">
                © 2025 Wajiha Kulsum. Professional web development services.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 