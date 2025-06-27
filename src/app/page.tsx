// import Hero from './components/Hero';
import Navigation from './components/Navigation';
import FloatingElements from './components/FloatingElements';
import SplineComponent from './components/Spline';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';

export default function Home() {
  return (
    <>
      <FloatingElements />
      <Navigation />
      
      {/* Hero Section with Spline */}
      <SplineComponent />
      
      {/* About Section */}
      <About />
      
      {/* Skills Section */}
      <Skills />
      
      {/* Projects Section */}
      <Projects />
      
      {/* Contact Section */}
      <Contact />
    </>
  );
}
