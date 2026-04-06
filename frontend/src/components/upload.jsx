import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';

const Upload = () => {

   const { removeBg } = useContext(AppContext)
  return (
    <section className="py-8 sm:py-16 md:py-24 px-4 sm:px-6 text-center">

      <h2 className="text-xl sm:text-2xl md:text-4xl font-extrabold text-gray-900 mb-6 sm:mb-8 leading-tight">
        See The Magic. <br className="sm:hidden" />
        <span className="bg-gradient-to-r from-red-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
          Try Now
        </span>
      </h2>

      <div className="flex justify-center">
        <input type="file" id="upload2" hidden onChange={e => removeBg(e.target.files[0])} accept='image/*'/>

        <label 
          htmlFor="upload2" 
          className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-red-500 via-pink-500 to-blue-500 text-white px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 rounded-full font-bold text-sm sm:text-base cursor-pointer transition-all hover:scale-105 active:scale-95 w-full sm:w-auto justify-center shadow-md"
        >
          <img 
            src={assets.upload_btn_icon} 
            alt="upload" 
            className="w-5 h-5 sm:w-6 sm:h-6" 
          />
          <span>Upload Image</span>
        </label>
      </div>

      <p className="mt-3 sm:mt-4 text-gray-400 text-xs sm:text-sm md:text-sm font-medium">
        No credit card required. Fast & Free.
      </p>

    </section>
  );
};

export default Upload;