import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import { motion } from 'framer-motion';

const Upload = () => {
  const { removeBg } = useContext(AppContext);

  return (
    // THEME: Midnight background with vertical grid lines to match reference image
    <section 
      className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 text-center bg-[#050505] overflow-hidden"
      style={{ 
        backgroundImage: 'linear-gradient(to right, #111 1px, transparent 1px)', 
        backgroundSize: '80px 100%' 
      }}
    >
      {/* Cyan Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[300px] bg-cyan-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="relative z-10">
        {/* Header: Cyberpunk High-Contrast Style */}
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-black italic tracking-tighter text-white uppercase mb-8 sm:mb-10 leading-none">
          See The Magic. <br className="sm:hidden" />
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Try Now
          </span>
        </h2>

        <div className="flex justify-center">
          <input 
            type="file" 
            id="upload2" 
            hidden 
            onChange={e => removeBg(e.target.files[0])} 
            accept='image/*'
          />

          {/* CTA Button: Matches "Find My Ride" button style from reference */}
          <motion.label 
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95 }}
            htmlFor="upload2" 
            className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-400 to-blue-600 text-white px-10 py-4 sm:px-12 md:px-16 rounded-2xl font-black uppercase italic text-sm sm:text-lg cursor-pointer transition-all shadow-lg shadow-cyan-500/20 w-full sm:w-auto justify-center"
          >
            <img 
              src={assets.upload_btn_icon} 
              alt="upload" 
              className="w-5 h-5 sm:w-6 sm:h-6 invert" 
            />
            <span className="tracking-tighter">Upload Image</span>
          </motion.label>
        </div>

        {/* Status Text: Obsidian style */}
        <p className="mt-6 text-zinc-500 text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-[0.2em]">
          No registration required • Instant AI Processing
        </p>
      </div>
    </section>
  );
};

export default Upload;