import React from 'react';
import { assets } from '../assets/assets';

const Upload = () => {
  return (
    <section className="py-16 md:py-24 px-6 text-center">
      
      {/* Responsive Title */}
      <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-8 leading-tight">
        See The Magic. <br className="sm:hidden" /> 
        <span className="bg-gradient-to-r from-red-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
          Try Now
        </span>
      </h2>

      {/* Compact Gradient Button - Mobile Set */}
      <div className="flex justify-center">
        <input type="file" id="upload2" hidden />
        <label 
          htmlFor="upload2" 
          className="inline-flex items-center gap-3 bg-gradient-to-r from-red-500 via-pink-500 to-blue-500 text-white px-10 py-4 rounded-full font-bold text-sm md:text-base cursor-pointer transition-all hover:scale-105 hover:shadow-xl hover:shadow-blue-200 active:scale-95 w-full sm:w-auto justify-center shadow-lg"
        >
          <img 
            src={assets.upload_btn_icon} 
            alt="upload" 
            className="w-5 h-5 invert" 
          />
          <span>Upload your Image</span>
        </label>
      </div>

      <p className="mt-4 text-gray-400 text-xs md:text-sm font-medium">
        No credit card required. Fast & Free.
      </p>

    </section>
  );
};

export default Upload;