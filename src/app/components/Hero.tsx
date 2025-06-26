'use client';

import { useState, useEffect } from 'react';

const Hero = () => {
  const lines = [
    '> Hello, I\'m Wajiha Kulsum.',
    '> I\'m a student and a web developer.',
    '> I love creating UI/UX experiences.'
  ];

  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    // Cursor blinking effect
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    if (currentLineIndex < lines.length) {
      const currentLine = lines[currentLineIndex];
      
      if (currentText.length < currentLine.length) {
        // Still typing current line
        const timeout = setTimeout(() => {
          setCurrentText(currentLine.slice(0, currentText.length + 1));
        }, 100); // Typing speed
        
        return () => clearTimeout(timeout);
      } else {
        // Current line is complete, move to next line after a pause
        const timeout = setTimeout(() => {
          setCurrentLineIndex(prev => prev + 1);
          setCurrentText('');
        }, 1000); // Pause between lines
        
        return () => clearTimeout(timeout);
      }
    } else {
      // All lines are complete
      setIsTypingComplete(true);
    }
  }, [currentText, currentLineIndex, lines]);

  const getDisplayText = () => {
    const completedLines = lines.slice(0, currentLineIndex);
    const currentDisplayLine = currentText;
    
    return [...completedLines, currentDisplayLine].filter(line => line.length > 0);
  };

  return (
    <div className="h-screen w-screen bg-black p-8">
      <section className="h-full w-full bg-black relative overflow-hidden p-1">
        {/* Outer container for concentric effect */}
        <div className="w-full h-full bg-black p-1">
          {/* Inner Terminal with green border */}
          <div className="w-full h-full bg-gray-900 border-2 border-green-500 rounded-lg flex flex-col">
            {/* Terminal Header */}
            <div className="flex items-center justify-between bg-gray-900 px-4 py-2 rounded-t-lg border-b border-green-500 flex-shrink-0">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="text-green-400 text-sm font-mono">
                wajiha@portfolio:~$
              </div>
              <div className="w-16"></div> {/* Spacer for centering */}
            </div>
            
            {/* Terminal Content */}
            <div className="flex-1 flex items-center justify-center px-6 sm:px-8 lg:px-12">
              <div className="w-full max-w-4xl">
                <div className="font-mono text-green-400 space-y-3 sm:space-y-4">
                  {getDisplayText().map((line, index) => (
                    <div 
                      key={index} 
                      className="text-lg sm:text-xl lg:text-2xl xl:text-3xl leading-relaxed"
                    >
                      {line}
                    </div>
                  ))}
                  
                  {/* Cursor */}
                  <div className="inline-block">
                    <span 
                      className={`text-lg sm:text-xl lg:text-2xl xl:text-3xl transition-opacity duration-100 ${
                        showCursor ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      |
                    </span>
                  </div>
                </div>
                
                {/* Optional: Show completion message */}
                {isTypingComplete && (
                  <div className="mt-8 sm:mt-12 text-green-500 font-mono text-sm sm:text-base opacity-70">
                    <div className="animate-pulse">
                      Press any key to continue...
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Ambient glow effect */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500 rounded-full opacity-3 blur-3xl"></div>
        </div>
      </section>
    </div>
  );
};

export default Hero; 