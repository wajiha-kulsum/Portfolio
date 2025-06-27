'use client';

const FloatingElements = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Large background orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/5 to-transparent rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-full blur-3xl animate-pulse-slow animation-delay-2000"></div>
      <div className="absolute top-1/2 left-3/4 w-64 h-64 bg-gradient-to-br from-pink-500/3 to-transparent rounded-full blur-3xl animate-pulse-slow animation-delay-4000"></div>

      {/* Floating geometric shapes */}
      <div className="absolute top-20 left-[10%] w-3 h-3 border border-purple-400/30 rotate-45 animate-float"></div>
      <div className="absolute top-[30%] right-[15%] w-4 h-4 border border-cyan-400/30 rotate-45 animate-float animation-delay-2000"></div>
      <div className="absolute bottom-[40%] left-[20%] w-2 h-2 border border-pink-400/30 rotate-45 animate-float animation-delay-4000"></div>
      <div className="absolute top-[60%] right-[30%] w-3 h-3 border border-green-400/30 rotate-45 animate-float animation-delay-1000"></div>
      <div className="absolute bottom-[20%] left-[70%] w-4 h-4 border border-blue-400/30 rotate-45 animate-float animation-delay-3000"></div>

      {/* Flowing particles */}
      <div className="absolute top-[15%] left-[5%] w-1 h-1 bg-purple-400/50 rounded-full animate-float"></div>
      <div className="absolute top-[45%] right-[8%] w-1.5 h-1.5 bg-cyan-400/50 rounded-full animate-float animation-delay-2000"></div>
      <div className="absolute bottom-[35%] left-[12%] w-1 h-1 bg-pink-400/50 rounded-full animate-float animation-delay-4000"></div>
      <div className="absolute top-[75%] right-[25%] w-1.5 h-1.5 bg-green-400/50 rounded-full animate-float animation-delay-1000"></div>
      <div className="absolute bottom-[10%] left-[85%] w-1 h-1 bg-blue-400/50 rounded-full animate-float animation-delay-3000"></div>
      <div className="absolute top-[55%] left-[40%] w-1 h-1 bg-yellow-400/50 rounded-full animate-float animation-delay-5000"></div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] animate-grid-pulse"></div>
    </div>
  );
};

export default FloatingElements; 