// 'use client';

// import { useState, useEffect } from 'react';

// const Skills = () => {
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//         }
//       },
//       { threshold: 0.1 }
//     );

//     const element = document.getElementById('skills-section');
//     if (element) observer.observe(element);

//     return () => observer.disconnect();
//   }, []);

//   const skillCategories = [
//     {
//       title: "Frontend",
//       skills: [
//         { name: "React", level: 90, color: "from-blue-400 to-cyan-400" },
//         { name: "Next.js", level: 85, color: "from-gray-400 to-white" },
//         { name: "TypeScript", level: 80, color: "from-blue-500 to-blue-300" },
//         { name: "Tailwind CSS", level: 95, color: "from-teal-400 to-blue-500" },
//       ]
//     },
//     {
//       title: "Design",
//       skills: [
//         { name: "UI/UX Design", level: 88, color: "from-purple-400 to-pink-400" },
//         { name: "Figma", level: 85, color: "from-purple-500 to-red-400" },
//         { name: "Adobe XD", level: 75, color: "from-pink-400 to-purple-600" },
//         { name: "Prototyping", level: 82, color: "from-indigo-400 to-purple-400" },
//       ]
//     },
//     {
//       title: "Tools & Tech",
//       skills: [
//         { name: "Git & GitHub", level: 85, color: "from-orange-400 to-red-400" },
//         { name: "VS Code", level: 95, color: "from-blue-400 to-blue-600" },
//         { name: "Node.js", level: 75, color: "from-green-400 to-green-600" },
//         { name: "MongoDB", level: 70, color: "from-green-500 to-teal-500" },
//       ]
//     }
//   ];

//   return (
//     <section 
//       id="skills-section" 
//       className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden py-20 px-6"
//     >
//       {/* Background effects */}
//       <div className="absolute inset-0">
//         <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
//         <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-slow animation-delay-2000"></div>
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl animate-pulse-slow animation-delay-4000"></div>
//       </div>

//       <div className="max-w-7xl mx-auto relative z-10">
//         <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
//           {/* Section header */}
//           <div className="text-center mb-20">
//             <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-white mb-6">
//               My <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">Skills</span>
//             </h2>
//             <p className="text-gray-400 text-xl max-w-3xl mx-auto">
//               Technologies and tools I use to bring ideas to life
//             </p>
//             <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full mt-6"></div>
//           </div>

//           {/* Skills grid */}
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {skillCategories.map((category, categoryIndex) => (
//               <div 
//                 key={category.title}
//                 className={`transition-all duration-700 delay-${categoryIndex * 200} ${
//                   isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
//                 }`}
//               >
//                 <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:border-white/20 group">
                  
//                   {/* Category header */}
//                   <div className="mb-8">
//                     <h3 className="text-2xl font-semibold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 transition-all duration-300">
//                       {category.title}
//                     </h3>
//                     <div className="w-12 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full group-hover:w-20 transition-all duration-500"></div>
//                   </div>

//                   {/* Skills list */}
//                   <div className="space-y-6">
//                     {category.skills.map((skill, skillIndex) => (
//                       <div key={skill.name} className="group/skill">
//                         <div className="flex justify-between items-center mb-2">
//                           <span className="text-gray-300 font-medium group-hover/skill:text-white transition-colors duration-300">
//                             {skill.name}
//                           </span>
//                           <span className="text-gray-500 text-sm">
//                             {skill.level}%
//                           </span>
//                         </div>
                        
//                         {/* Progress bar */}
//                         <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
//                           <div 
//                             className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out`}
//                             style={{ 
//                               width: isVisible ? `${skill.level}%` : '0%',
//                               transitionDelay: `${(categoryIndex * 200) + (skillIndex * 100)}ms`
//                             }}
//                           >
//                             <div className="h-full bg-white/20 animate-pulse-glow"></div>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   {/* Decorative element */}
//                   <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-purple-400/20 to-cyan-400/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500 rotate-45">
//                     <div className="w-full h-full bg-gradient-to-br from-purple-400 to-cyan-400 rounded-lg animate-spin-slow"></div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Bottom decorative elements */}
//           <div className="mt-20 flex justify-center space-x-8">
//             <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce-slow"></div>
//             <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce-slow animation-delay-1000"></div>
//             <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce-slow animation-delay-2000"></div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Skills; 