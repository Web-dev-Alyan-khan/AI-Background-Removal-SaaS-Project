import React, { useState } from 'react';
import { assets } from '../assets/assets';

const BgSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSliderChange = (e) => {
    setSliderPosition(e.target.value);
  };

  return (
    // THEME: Deep midnight background with vertical grid lines
    <section 
      className="relative py-12 sm:py-20 md:py-32 px-3 sm:px-4 md:px-6 max-w-full bg-[#050505] overflow-hidden"
      style={{ 
        backgroundImage: 'linear-gradient(to right, #111 1px, transparent 1px)', 
        backgroundSize: '80px 100%' 
      }}
    >
      {/* Cyan Glow Overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-cyan-500/5 blur-[120px] pointer-events-none rounded-full" />
      
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Title: High-Contrast Cyberpunk style */}
        <div className="mb-10 sm:mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black italic tracking-tighter text-white uppercase leading-none">
            Remove Background With <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Precision & Speed
            </span>
          </h2>

          <p className="text-zinc-500 text-xs sm:text-sm md:text-base font-bold tracking-[0.2em] uppercase max-w-lg mx-auto">
            Slide to compare original vs AI result instantly.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto rounded-full" />
        </div>

        {/* Slider Container: Glassmorphism Border */}
        <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-3xl sm:rounded-[2.5rem] md:rounded-[3rem] border border-white/10 shadow-2xl aspect-[4/3] sm:aspect-video bg-zinc-900/40 backdrop-blur-sm group">
          
          {/* Before */}
          <img 
            src={assets.image_wo_bg} 
            alt="Original"
            className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none opacity-80"
          />

          {/* After */}
          <img 
            src={assets.image_w_bg} 
            alt="Result"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none transition-all duration-75 ease-out"
          />

          {/* Range Input */}
          <input 
            type="range" 
            min={0} 
            max={100} 
            value={sliderPosition} 
            onChange={handleSliderChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
          />

          {/* Divider Line: Cyan Neon Style */}
          <div 
            className="absolute top-0 bottom-0 w-[2px] bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)] pointer-events-none z-20"
            style={{ left: `${sliderPosition}%` }}
          >
            {/* Handle: Cyber Circular Style */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-black border border-cyan-400 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.4)] flex items-center justify-center transition-transform group-hover:scale-110">
              <div className="flex gap-[3px]">
                <div className="w-[3px] h-4 bg-cyan-400 rounded-full animate-pulse"></div>
                <div className="w-[3px] h-4 bg-cyan-400 rounded-full animate-pulse delay-75"></div>
              </div>
            </div>
          </div>

          {/* Labels: Obsidian style */}
          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-8 z-10 px-4 py-1.5 bg-black/80 backdrop-blur border border-white/10 rounded-lg text-[8px] sm:text-[10px] text-zinc-400 font-black uppercase tracking-widest pointer-events-none">
            Original
          </div>

          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-8 z-10 px-4 py-1.5 bg-cyan-500/80 backdrop-blur rounded-lg text-[8px] sm:text-[10px] text-white font-black uppercase tracking-widest pointer-events-none shadow-lg shadow-cyan-500/20">
            Processed
          </div>
        </div>
      </div>
    </section>
  );
};

export default BgSlider;