import Spline from '@splinetool/react-spline/next';

export default function Home() {
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
      
      {/* Text Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none -mt-32">
        <div className="text-center space-y-4">
          <h1 className="text-white text-6xl md:text-7xl lg:text-8xl font-light tracking-wide">
            Hello,
          </h1>
          <h2 className="text-white text-6xl md:text-7xl lg:text-8xl font-light tracking-wide">
            I'm Wajiha Kulsum
          </h2>
          <p className="text-gray-400 text-xl md:text-2xl lg:text-3xl font-light tracking-wide mt-6">
            Web Developer and UI Designer
          </p>
        </div>
      </div>
    </main>
  );
}
