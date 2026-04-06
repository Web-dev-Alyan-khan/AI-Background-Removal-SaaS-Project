import React, { useState } from 'react';
import { assets } from '../assets/assets';

const BgSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSliderChange = (e) => {
    setSliderPosition(e.target.value);
  };

  return (
    <section className="py-10 sm:py-12 md:py-20 px-3 sm:px-4 md:px-6 max-w-5xl mx-auto text-center">
      
      {/* Title */}
      <div className="mb-6 sm:mb-8 md:mb-12 space-y-2 sm:space-y-3">
        <h2 className="text-xl sm:text-2xl md:text-4xl font-extrabold tracking-tight text-gray-900 leading-tight px-2">
          Remove Background With High <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-red-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
            Quality and Accuracy
          </span>
        </h2>

        <p className="text-gray-500 text-[11px] sm:text-xs md:text-base font-medium max-w-md mx-auto px-2 sm:px-4">
          Slide to compare original vs AI result instantly.
        </p>
      </div>

      {/* Slider */}
      <div className="relative w-full max-w-3xl mx-auto overflow-hidden rounded-2xl sm:rounded-[1.5rem] md:rounded-[2.5rem] border-[3px] sm:border-[4px] md:border-[8px] border-white shadow-lg sm:shadow-xl md:shadow-[0_20px_50px_rgba(0,0,0,0.1)] aspect-[4/3] sm:aspect-video bg-gray-50">
        
        {/* Before */}
        <img 
          src={assets.image_wo_bg} 
          alt="Original"
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
        />

        {/* After */}
        <img 
          src={assets.image_w_bg} 
          alt="Result"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none transition-all duration-75 ease-out"
        />

        {/* Range Input (Touch Friendly) */}
        <input 
          type="range" 
          min={0} 
          max={100} 
          value={sliderPosition} 
          onChange={handleSliderChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
        />

        {/* Divider Line */}
        <div 
          className="absolute top-0 bottom-0 w-[2px] sm:w-[3px] md:w-1 bg-white shadow-md pointer-events-none z-20"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Handle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-white rounded-full shadow-xl flex items-center justify-center border-2 md:border-3 border-blue-600">
            <div className="flex gap-[2px] sm:gap-1">
              <div className="w-[2px] h-2 sm:h-3 bg-blue-200 rounded-full"></div>
              <div className="w-[2px] h-2 sm:h-3 bg-blue-200 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 md:bottom-4 md:left-6 z-10 px-2 py-[2px] sm:py-1 bg-black/40 backdrop-blur rounded-full text-[7px] sm:text-[8px] md:text-[10px] text-white font-bold uppercase pointer-events-none">
          Before
        </div>

        <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 md:bottom-4 md:right-6 z-10 px-2 py-[2px] sm:py-1 bg-blue-600/50 backdrop-blur rounded-full text-[7px] sm:text-[8px] md:text-[10px] text-white font-bold uppercase pointer-events-none">
          After
        </div>

      </div>
    </section>
  );
};

export default BgSlider;