'use client';

import Spline from '@splinetool/react-spline/next';
import { useState } from 'react';

export default function Home() {
  const [githubMouse, setGithubMouse] = useState({ x: 50, y: 25 });
  const [resumeMouse, setResumeMouse] = useState({ x: 50, y: 25 });
  const [githubHovered, setGithubHovered] = useState(false);
  const [resumeHovered, setResumeHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>, setMouse: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMouse({ x, y });
  };

  return (
    <main className="relative w-full h-screen bg-black">
      {/* Spline 3D Scene */}
      <div className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
        <div style={{ pointerEvents: 'none', width: '100%', height: '100%' }}>
          <Spline
            scene="https://prod.spline.design/Z4TwK8ahQ4Fxtjoe/scene.splinecode"
            style={{ pointerEvents: 'none' }}
          />
        </div>
      </div>

      {/* Watermark Cover Overlays */}
      <div className="absolute inset-0 pointer-events-none z-5">
        {/* Bottom-right corner overlay - Larger coverage */}
        <div className="absolute bottom-0 right-0 w-48 h-24 bg-black"></div>
        
        {/* Bottom-left corner overlay - Larger coverage */}
        <div className="absolute bottom-0 left-0 w-48 h-24 bg-black"></div>
        
        {/* Bottom edge gradient overlay - Taller */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
        
        {/* Side edge overlays for extra coverage - Wider */}
        <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-black via-black/60 to-transparent"></div>
        <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-black via-black/60 to-transparent"></div>
      </div>

      {/* Decorative Elements to Make Overlays Look Intentional */}
      <div className="absolute inset-0 pointer-events-none z-8">
        {/* Bottom corner decorative dots */}
        <div className="absolute bottom-6 right-6 flex space-x-2">
          <div className="w-2 h-2 bg-purple-500/30 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-cyan-500/30 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="w-2 h-2 bg-pink-500/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="absolute bottom-6 left-6 flex space-x-2">
          <div className="w-1.5 h-1.5 bg-blue-500/20 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
          <div className="w-1.5 h-1.5 bg-green-500/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Side edge floating particles */}
        <div className="absolute top-1/4 right-4 w-1 h-1 bg-purple-400/40 rounded-full animate-float"></div>
        <div className="absolute top-1/3 left-4 w-1 h-1 bg-cyan-400/40 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 right-4 w-1.5 h-1.5 bg-pink-400/30 rounded-full animate-float" style={{ animationDelay: '3s' }}></div>
      </div>
      
      {/* Text Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none -mt-32">
        <div className="text-center space-y-4">
          <h1 className="text-white text-6xl md:text-7xl lg:text-8xl font-light tracking-wide">
            Hello,
          </h1>
          <h2 className="text-white text-6xl md:text-7xl lg:text-8xl font-light tracking-wide">
            I&apos;m Wajiha Kulsum
          </h2>
          <p className="text-gray-400 text-xl md:text-2xl lg:text-3xl font-light tracking-wide mt-6">
            Web Developer and UI Designer
          </p>
          
          {/* Buttons */}
          <div className="flex justify-center gap-6 mt-8 pointer-events-auto">
            <a 
              href="https://github.com/wajihakulsum" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative px-8 py-3 bg-black/20 border border-purple-500/50 text-white text-lg font-medium rounded-lg hover:bg-purple-500/20 hover:border-purple-400 transition-all duration-300 backdrop-blur-sm overflow-hidden"
              onMouseMove={(e) => handleMouseMove(e, setGithubMouse)}
              onMouseEnter={() => setGithubHovered(true)}
              onMouseLeave={() => setGithubHovered(false)}
            >
              <span className="relative z-20">GitHub</span>
              <div 
                className="absolute inset-0 rounded-lg"
                style={{
                  background: `radial-gradient(circle 80px at ${githubMouse.x}px ${githubMouse.y}px, rgba(147, 51, 234, 0.8), rgba(147, 51, 234, 0.4) 50%, rgba(147, 51, 234, 0.1) 80%, transparent)`,
                  opacity: githubHovered ? 1 : 0,
                  transition: 'opacity 0.2s ease-out',
                  zIndex: 5,
                }}
              ></div>
            </a>
            
            <a 
              href="/resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative px-8 py-3 bg-black/20 border border-cyan-500/50 text-white text-lg font-medium rounded-lg hover:bg-cyan-500/20 hover:border-cyan-400 transition-all duration-300 backdrop-blur-sm overflow-hidden"
              onMouseMove={(e) => handleMouseMove(e, setResumeMouse)}
              onMouseEnter={() => setResumeHovered(true)}
              onMouseLeave={() => setResumeHovered(false)}
            >
              <span className="relative z-20">Resume</span>
              <div 
                className="absolute inset-0 rounded-lg"
                style={{
                  background: `radial-gradient(circle 80px at ${resumeMouse.x}px ${resumeMouse.y}px, rgba(6, 182, 212, 0.8), rgba(6, 182, 212, 0.4) 50%, rgba(6, 182, 212, 0.1) 80%, transparent)`,
                  opacity: resumeHovered ? 1 : 0,
                  transition: 'opacity 0.2s ease-out',
                  zIndex: 5,
                }}
              ></div>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
