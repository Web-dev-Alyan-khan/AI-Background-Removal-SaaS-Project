import React, { useState } from 'react';
import { assets } from '../assets/assets';

const BgSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSliderChange = (e) => {
    setSliderPosition(e.target.value);
  };

  return (
    <section className="py-12 md:py-20 px-4 md:px-6 max-w-5xl mx-auto text-center">
      
      {/* -- Title Section -- */}
      <div className="mb-8 md:mb-12 space-y-3">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 leading-tight px-2">
          Remove Background With High <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-red-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
            Quality and Accuracy
          </span>
        </h2>
        <p className="text-gray-500 text-xs md:text-base font-medium max-w-md mx-auto px-4">
          Experience pixel-perfect AI precision. Slide to compare the original with our studio-grade result.
        </p>
      </div>

      {/* Comparison Container - Responsive Sizing */}
      <div className="relative w-full max-w-3xl mx-auto overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] border-[4px] md:border-[8px] border-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] aspect-[4/3] sm:aspect-video bg-gray-50">
        
        {/* Background Image ("Before") */}
        <img 
          src={assets.image_w_bg} 
          alt="Original"
          className="absolute inset-0 w-full h-full object-cover select-none"
        />

        {/* Foreground Image ("After") */}
        <img 
          src={assets.image_wo_bg} 
          alt="Result"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          className="absolute inset-0 w-full h-full object-cover select-none transition-all duration-75 ease-out"
        />

        {/* Invisible Real Slider */}
        <input 
          type="range" 
          min={0} 
          max={100} 
          value={sliderPosition} 
          onChange={handleSliderChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
        />

        {/* Visual Slider Line & Handle */}
        <div 
          className="absolute top-0 bottom-0 w-0.5 md:w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.3)] pointer-events-none z-20"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Handle Button - Resized for Mobile */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 md:w-10 md:h-10 bg-white rounded-full shadow-2xl flex items-center justify-center border-[2px] md:border-[3px] border-blue-600">
             <div className="flex gap-0.5 md:gap-1">
                <div className="w-0.5 h-2 md:w-1 md:h-3 bg-blue-200 rounded-full"></div>
                <div className="w-0.5 h-2 md:w-1 md:h-3 bg-blue-200 rounded-full"></div>
             </div>
          </div>
        </div>

        {/* UX Labels - Hidden on very small screens or moved for better fit */}
        <div className="absolute bottom-3 left-3 md:bottom-4 md:left-6 z-10 px-2 md:px-3 py-1 bg-black/30 backdrop-blur-md rounded-full text-[8px] md:text-[10px] text-white font-bold tracking-widest uppercase pointer-events-none">
          Before
        </div>
        <div className="absolute bottom-3 right-3 md:bottom-4 md:right-6 z-10 px-2 md:px-3 py-1 bg-blue-600/40 backdrop-blur-md rounded-full text-[8px] md:text-[10px] text-white font-bold tracking-widest uppercase pointer-events-none">
          After
        </div>

      </div>
    </section>
  );
};

export default BgSlider;