'use client';

import { useState, useEffect } from 'react';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

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
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const socialLinks = [
    {
      name: 'GitHub',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
      href: '#',
      color: 'from-gray-400 to-gray-600'
    },
    {
      name: 'LinkedIn',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      href: '#',
      color: 'from-blue-400 to-blue-600'
    },
    {
      name: 'Twitter',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      ),
      href: '#',
      color: 'from-sky-400 to-sky-600'
    },
    {
      name: 'Email',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      href: 'mailto:wajiha@example.com',
      color: 'from-purple-400 to-pink-600'
    }
  ];

  return (
    <section 
      id="contact-section" 
      className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden py-20 px-6"
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl animate-pulse-slow animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/3 rounded-full blur-3xl animate-pulse-slow animation-delay-4000"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-1/4 w-1 h-1 bg-purple-400 rounded-full animate-float"></div>
        <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-float animation-delay-2000"></div>
        <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-pink-400 rounded-full animate-float animation-delay-4000"></div>
        <div className="absolute bottom-20 right-1/3 w-1.5 h-1.5 bg-green-400 rounded-full animate-float animation-delay-1000"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Section header */}
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-white mb-6">
              Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400">Touch</span>
            </h2>
            <p className="text-gray-400 text-xl max-w-3xl mx-auto">
              Let's collaborate and create something amazing together
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full mt-6"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            
            {/* Contact form */}
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/8 transition-all duration-500">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-gray-300 text-sm font-medium mb-2">
                    Name
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
                    Email
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

                <div>
                  <label htmlFor="message" className="block text-gray-300 text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400 transition-all duration-300 resize-none"
                    placeholder="Tell me about your project..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-500 via-cyan-500 to-pink-500 text-white py-3 px-6 rounded-lg font-medium hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact info and social links */}
            <div className="space-y-8">
              
              {/* Contact info cards */}
              <div className="space-y-6">
                <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 transition-all duration-500">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Let's Connect
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    I'm always interested in new opportunities and collaborations. 
                    Whether you have a project in mind or just want to chat about web development, 
                    feel free to reach out!
                  </p>
                </div>

                <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 transition-all duration-500">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Response Time
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    I typically respond to messages within 24 hours. 
                    For urgent inquiries, please mention it in your message.
                  </p>
                </div>
              </div>

              {/* Social links */}
              <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-6">
                  Find Me Online
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((link, index) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className="group flex items-center justify-center p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:scale-105 transition-all duration-300"
                    >
                      <div className={`text-gray-400 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:${link.color} transition-all duration-300`}>
                        {link.icon}
                      </div>
                      <span className="ml-3 text-gray-400 group-hover:text-white transition-colors duration-300">
                        {link.name}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom decorative element */}
          <div className="mt-20 text-center">
            <div className="flex justify-center space-x-4 mb-6">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse animation-delay-1000"></div>
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse animation-delay-2000"></div>
            </div>
            <p className="text-gray-500 text-sm">
              © 2024 Wajiha Kulsum. Crafted with 💜 and modern web technologies.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 