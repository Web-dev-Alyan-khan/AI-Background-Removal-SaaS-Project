import React from 'react';
import { testimonialsData } from "../assets/assets";
import { motion } from 'framer-motion';

const Testimonials = () => {
  return (
    // THEME: Midnight background with signature vertical grid lines
    <section 
      className="relative py-16 sm:py-24 md:py-32 px-4 bg-[#050505] overflow-hidden"
      style={{ 
        backgroundImage: 'linear-gradient(to right, #111 1px, transparent 1px)', 
        backgroundSize: '80px 100%' 
      }}
    >
      {/* Dynamic Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-cyan-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header: Cyberpunk High-Contrast Style */}
        <div className="text-center mb-12 sm:mb-16 md:mb-24">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black italic tracking-tighter text-white uppercase leading-none">
            Trusted by <br className="sm:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
              Professionals
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto mt-6 rounded-full" />
          <p className="text-zinc-500 mt-6 text-xs sm:text-sm md:text-base font-bold tracking-[0.2em] uppercase max-w-lg mx-auto">
            Real results from creators worldwide.
          </p>
        </div>

        {/* Grid: Tighter gap for "High Performance" feel */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonialsData.map((item, index) => (
            <motion.div 
              key={index} 
              whileHover={{ y: -10 }}
              className="group relative p-[1px] rounded-3xl transition-all duration-500"
            >
              
              {/* Animated Cyan Border */}
              <div className="absolute inset-0 bg-white/5 rounded-3xl group-hover:bg-gradient-to-br group-hover:from-cyan-400 group-hover:to-blue-600 transition-all duration-500 opacity-50 group-hover:opacity-100" />

              {/* Card: Dark Glassmorphism */}
              <div className="relative h-full bg-zinc-900/60 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-white/5 shadow-2xl">
                
                {/* Text Content */}
                <div className="relative">
                  {/* Styled Quotes */}
                  <span className="text-5xl md:text-6xl text-cyan-500/20 font-black absolute -top-4 -left-2 italic select-none">
                    “
                  </span>

                  <p className="text-zinc-400 text-sm md:text-[15px] leading-relaxed relative z-10 pt-4 font-medium italic group-hover:text-zinc-200 transition-colors">
                    {item.text}
                  </p>
                </div>

                {/* Author Info: Obsidian Highlight */}
                <div className="flex items-center gap-4 mt-10 pt-6 border-t border-white/5">
                  
                  <div className="relative flex-shrink-0">
                    {/* Pulsing Avatar Ring */}
                    <div className="absolute -inset-1 bg-cyan-500 rounded-full opacity-0 group-hover:opacity-40 animate-pulse transition-opacity duration-300" />
                    
                    <img 
                      src={item.image} 
                      alt={item.author} 
                      className="relative w-12 h-12 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 border-2 border-zinc-800"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm md:text-base font-black text-white uppercase italic tracking-tighter">
                      {item.author}
                    </p>

                    <p className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.15em]">
                      {item.jobTitle}
                    </p>
                  </div>

                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;