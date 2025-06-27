'use client';

import { useState, useEffect } from 'react';

const Hero = () => {
  const lines = [
    'whoami',
    'Wajiha Kulsum',
    'cat about.txt',
    'I\'m a student and a web developer.',
    'I love creating UI/UX experiences.'
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
        // Current line is complete, move to next line immediately
        setCurrentLineIndex(prev => prev + 1);
        setCurrentText('');
      }
    } else {
      // All lines are complete
      setIsTypingComplete(true);
    }
  }, [currentText, currentLineIndex, lines]);

  const getDisplayText = () => {
    const completedLines = lines.slice(0, currentLineIndex);
    const currentDisplayLine = currentText;
    
    return { completedLines, currentDisplayLine };
  };

  return (
    <div className="h-screen w-screen bg-black p-8">
      <section className="h-full w-full bg-black relative overflow-hidden p-1">
        {/* Outer container for concentric effect */}
        <div className="w-full h-full bg-black p-1">
                  {/* Inner Terminal with authentic look */}
        <div className="w-full h-full bg-black border border-gray-600 rounded-md flex flex-col shadow-2xl" style={{fontFamily: 'JetBrains Mono, Consolas, "Liberation Mono", Menlo, "Courier New", monospace'}}>
          {/* Terminal Header - Ubuntu style */}
          <div className="flex items-center justify-between bg-gray-800 px-3 py-2 rounded-t-md border-b border-gray-700 flex-shrink-0">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full shadow-sm"></div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full shadow-sm"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full shadow-sm"></div>
            </div>
            <div className="text-gray-300 text-xs font-medium">
              wajiha@portfolio: ~
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-4 h-4 flex items-center justify-center text-gray-400 hover:bg-gray-700 rounded text-xs cursor-pointer">_</div>
              <div className="w-4 h-4 flex items-center justify-center text-gray-400 hover:bg-gray-700 rounded text-xs cursor-pointer">□</div>
              <div className="w-4 h-4 flex items-center justify-center text-gray-400 hover:bg-red-600 rounded text-xs cursor-pointer">×</div>
            </div>
          </div>
            
            {/* Terminal Content */}
            <div className="flex-1 flex flex-col p-4 pt-3">
              <div className="w-full">
                <div className="text-white space-y-3 text-left leading-relaxed text-xl sm:text-2xl lg:text-3xl xl:text-4xl" style={{fontFamily: 'inherit'}}>
                  {/* Initial prompt with first command */}
                  <div className="flex">
                    <span className="text-green-400 font-bold">wajiha@portfolio</span>
                    <span className="text-white">:</span>
                    <span className="text-blue-400 font-bold">~</span>
                    <span className="text-white">$ </span>
                    {currentLineIndex === 0 && getDisplayText().currentDisplayLine && (
                      <span className="text-white">
                        {getDisplayText().currentDisplayLine}
                        <span className={`bg-white text-black transition-opacity duration-500 ${showCursor ? 'opacity-100' : 'opacity-0'}`}>█</span>
                      </span>
                    )}
                    {currentLineIndex === 0 && !getDisplayText().currentDisplayLine && (
                      <span className={`bg-white text-black transition-opacity duration-500 ${showCursor ? 'opacity-100' : 'opacity-0'}`}>█</span>
                    )}
                  </div>
                  
                  {/* Completed lines */}
                  {getDisplayText().completedLines.map((line, index) => {
                    const isCommand = line === 'whoami' || line === 'cat about.txt';
                    const isName = line === 'Wajiha Kulsum';
                    
                    if (index === 0) {
                      // Skip first line as it's handled above with the initial prompt
                      return null;
                    }
                    
                    return (
                      <div key={index} className="flex">
                        {isCommand && (
                          <>
                            <span className="text-green-400 font-bold">wajiha@portfolio</span>
                            <span className="text-white">:</span>
                            <span className="text-blue-400 font-bold">~</span>
                            <span className="text-white">$ </span>
                          </>
                        )}
                        <span className={
                          isName
                            ? "text-white font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl" 
                            : isCommand
                            ? "text-white"
                            : "text-gray-300"
                        }>
                          {line}
                        </span>
                      </div>
                    );
                  })}
                  
                  {/* Current line being typed with cursor (for lines after first) */}
                  {getDisplayText().currentDisplayLine && currentLineIndex > 0 && (
                    <div className="flex">
                      {(() => {
                        const line = getDisplayText().currentDisplayLine;
                        const isCommand = line === 'whoami' || line === 'cat about.txt';
                        const isName = line === 'Wajiha Kulsum';
                        
                        return (
                          <>
                            {isCommand && (
                              <>
                                <span className="text-green-400 font-bold">wajiha@portfolio</span>
                                <span className="text-white">:</span>
                                <span className="text-blue-400 font-bold">~</span>
                                <span className="text-white">$ </span>
                              </>
                            )}
                            <span className={
                              isName
                                ? "text-white font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl" 
                                : isCommand
                                ? "text-white"
                                : "text-gray-300"
                            }>
                              {line}
                              <span className={`bg-white text-black transition-opacity duration-500 ${showCursor ? 'opacity-100' : 'opacity-0'}`}>█</span>
                            </span>
                          </>
                        );
                      })()}
                    </div>
                  )}
                  
                  {/* Show prompt with cursor when typing is complete */}
                  {isTypingComplete && (
                    <div className="flex">
                      <span className="text-green-500 text-sm sm:text-base lg:text-lg">
                        wajiha@portfolio:~$ 
                      </span>
                      <span 
                        className={`text-sm sm:text-base lg:text-lg text-green-500 transition-opacity duration-100 ${
                          showCursor ? 'opacity-100' : 'opacity-0'
                        }`}
                      >
                        |
                      </span>
                    </div>
                  )}
                  
                  {/* Show cursor on empty line if no current text (for lines after first) */}
                  {!getDisplayText().currentDisplayLine && currentLineIndex < lines.length && currentLineIndex > 0 && (
                    <div className="flex">
                      <span className="text-green-500 text-sm sm:text-base lg:text-lg">
                        wajiha@portfolio:~$ 
                      </span>
                      <span 
                        className={`text-sm sm:text-base lg:text-lg text-green-500 transition-opacity duration-100 ${
                          showCursor ? 'opacity-100' : 'opacity-0'
                        }`}
                      >
                        |
                      </span>
                    </div>
                  )}
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