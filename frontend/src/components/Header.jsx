import React from 'react';
import { assets } from "../assets/assets";

const Header = () => {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-between gap-10 py-32 md:py-24 px-6 md:px-12 max-w-6xl mx-auto min-h-[70vh]">
      
      {/* ------ Left side: Content (Responsive Scaling) ----- */}
      <div className="flex-1 space-y-6 text-center lg:text-left order-2 lg:order-1">
        
        {/* Subtle Badge */}
        <div className="inline-block px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[10px] md:text-xs font-semibold tracking-wide uppercase">
          Free AI Tool
        </div>

        {/* Responsive Heading */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-gray-900">
          Remove The <br className="hidden sm:block" /> 
          <span className="bg-gradient-to-r from-red-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
            background
          </span> 
          <br /> From Image For Free.
        </h1>

        {/* Responsive Paragraph */}
        <p className="max-w-md text-gray-700 text-sm md:text-lg leading-relaxed mx-auto lg:mx-0">
          Transform your photos instantly. Our AI delivers pixel-perfect transparency for your projects in seconds.
        </p>

        {/* Compact Gradient Button */}
        <div className="pt-2">
          <input type="file" id="upload1" hidden />
          <label 
            htmlFor="upload1" 
            className="inline-flex items-center gap-3 bg-gradient-to-r from-red-500 via-pink-500 to-blue-500 text-white px-8 py-3.5 rounded-xl font-bold text-sm cursor-pointer transition-all hover:opacity-90 hover:shadow-lg hover:shadow-blue-200 active:scale-95 w-full sm:w-auto justify-center"
          >
            <img 
              src={assets.upload_btn_icon} 
              alt="upload" 
              className="w-5 h-5 invert" 
            />
            <span>Upload your Image</span>
          </label>
        </div>
      </div>

      {/* ------ Right side: Image (Mobile Optimization) ----- */}
      <div className="flex-1 flex justify-center lg:justify-end order-1 lg:order-2">
        <div className="relative w-full max-w-[280px] sm:max-w-[340px] group px-4 sm:px-0">
          {/* Subtle Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-[1.5rem] blur opacity-20 group-hover:opacity-30 transition duration-500" />
          
          <div className="relative rounded-[1.5rem] overflow-hidden border border-gray-100 shadow-xl bg-white">
            <img 
              src={assets.header_img} 
              alt="AI Demo" 
              className="w-full h-auto object-cover" 
            />
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default Header;