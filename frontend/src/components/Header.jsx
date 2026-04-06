import React, { useContext } from 'react';
import { assets } from "../assets/assets";
import { AppContext } from '../context/AppContext';
import { motion } from 'framer-motion';

const Header = () => {
  const { removeBg } = useContext(AppContext);

  return (
    <motion.section 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="relative flex flex-col lg:flex-row items-center justify-between gap-12 py-16 lg:py-24 px-8 max-w-5xl mx-auto min-h-[75vh]"
    >
      
      {/* ------ Left side: Content ----- */}
      <div className="flex-1 space-y-6 text-center lg:text-left order-2 lg:order-1">
        
        {/* Compact Glass Badge */}
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50/50 backdrop-blur-sm border border-indigo-100 text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em]"
        >
          <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
          Software Enginner M ALYAN KHAN
        </motion.div>

        {/* Medium-Sized Premium Heading */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-[900] tracking-tight leading-[1.1] text-slate-900">
          Remove The AI Powered<br />
          <span className="bg-gradient-to-r from-red-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
            background From
          </span> <br />
          Image for free.
        </h1>

        <p className="max-w-sm text-slate-500 text-sm md:text-base leading-relaxed mx-auto lg:mx-0">
          Professional cutouts in seconds. Our neural engine handles complex edges with pixel-perfect precision.
        </p>

        {/* Interactive Colored Button */}
        <div className="pt-2">
          <input type="file" id="upload1" hidden onChange={e => removeBg(e.target.files[0])} accept='image/*'/>
          
          <motion.label 
            whileHover={{ 
              y: -4, 
              shadow: "0 20px 30px -10px rgba(239, 68, 68, 0.4)" 
            }}
            whileTap={{ scale: 0.96 }}
            htmlFor="upload1" 
            // Updated: Background gradient and modern shadow
            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-red-500 via-pink-500 to-blue-600 text-white px-9 py-4 rounded-2xl font-bold text-sm cursor-pointer transition-all overflow-hidden shadow-lg shadow-pink-500/20"
          >
            {/* Glossy Overlay effect on hover */}
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <img 
              src={assets.upload_btn_icon} 
              alt="upload" 
              className="w-4 h-4 invert transition-transform group-hover:scale-110 group-hover:rotate-12" 
            />
            <span className="relative z-10 tracking-tight">Upload Image</span>
          </motion.label>
          
          <p className="text-[10px] text-slate-400 mt-3 font-medium">No registration required • 100% Automatic</p>
        </div>
      </div>

      {/* ------ Right side: Medium Glass Card ----- */}
      <div className="flex-1 flex justify-center lg:justify-end order-1 lg:order-2 w-full">
        <motion.div 
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-full max-w-[340px] group"
        >
          {/* Enhanced Colorful Glow */}
          <div className="absolute -inset-2 bg-gradient-to-tr from-red-500/20 via-pink-500/20 to-blue-500/20 rounded-[2.5rem] blur-2xl group-hover:opacity-100 opacity-60 transition duration-700" />
          
          {/* Premium Glass Container */}
          <div className="relative rounded-[2.2rem] p-2 bg-white/70 backdrop-blur-xl border border-white shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
            <img 
              src={assets.header_img} 
              alt="AI Demo" 
              className="w-full h-auto rounded-[1.8rem] object-cover"
            />
            
            {/* Floating Minimal Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 }}
              className="absolute -bottom-4 -right-2 bg-slate-900 px-4 py-2 rounded-xl shadow-xl border border-slate-800 flex items-center gap-2"
            >
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
                <span className="text-[10px] font-bold text-white tracking-wider uppercase">99% Precise</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
    </motion.section>
  );
};

export default Header;