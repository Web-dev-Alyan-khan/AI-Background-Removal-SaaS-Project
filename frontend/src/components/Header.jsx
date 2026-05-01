import React, { useContext } from 'react';
import { assets } from "../assets/assets";
import { motion } from 'framer-motion';
import { AppContext } from '../context/AppContext';

const Header = () => {
  const { removeBg } = useContext(AppContext);

  return (
    <motion.section 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      /* 
         UI FIX: Reduced gap-12 to gap-6 and changed justify-between to justify-center 
         to bring the text and image closer together.
      */
      className="relative flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-16 py-12 lg:py-24 px-6 md:px-8 max-w-7xl mx-auto min-h-[85vh] overflow-hidden bg-[#050505] border border-white/5 rounded-[2.5rem] lg:rounded-[3rem] my-10"
      style={{ 
        backgroundImage: 'linear-gradient(to right, #111 1px, transparent 1px)', 
        backgroundSize: '100px 100%' 
      }}
    >
      {/* Cyan Aura Overlay */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-cyan-500/5 blur-[120px] pointer-events-none"></div>
      
      {/* ------ Content Section ----- */}
      {/* Removed flex-1 to prevent the text container from expanding unnecessarily */}
      <div className="space-y-6 text-center lg:text-left order-1 relative z-10 max-w-xl">
        
        {/* Cyber Badge */}
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 backdrop-blur-md border border-cyan-500/30 text-cyan-400 text-[10px] font-black uppercase tracking-[0.2em]"
        >
          <span className="flex h-2 w-2 rounded-full bg-cyan-500 animate-pulse"></span>
          Software Engineer Muhammad Alyan
        </motion.div>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-[900] tracking-tight leading-[1.1] text-white uppercase italic">
          Remove The AI Powered<br />
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            background From
          </span> <br />
          Image for free.
        </h1>

        <p className="max-w-sm text-zinc-400 text-sm md:text-base leading-relaxed mx-auto lg:mx-0 font-medium">
          Professional cutouts in seconds. Our neural engine handles complex edges with pixel-perfect precision.
        </p>

        {/* Cyan Gradient Button */}
        <div className="pt-2">
          <input type="file" id="upload1" hidden onChange={e => removeBg(e.target.files[0])} accept='image/*'/>
          
          <motion.label 
            whileHover={{ y: -4, shadow: "0px 0px 25px rgba(34, 211, 238, 0.5)" }}
            whileTap={{ scale: 0.96 }}
            htmlFor="upload1" 
            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-cyan-400 to-blue-600 text-white px-8 md:px-10 py-4 rounded-2xl font-black uppercase italic text-sm cursor-pointer transition-all shadow-lg"
          >
            <img 
              src={assets.upload_btn_icon} 
              alt="upload" 
              className="w-4 h-4 invert" 
            />
            <span className="relative z-10 tracking-tighter">Upload Image</span>
          </motion.label>
          
          <p className="text-[10px] text-zinc-600 mt-4 font-black tracking-[0.3em] uppercase opacity-60">100% Automatic Precision</p>
        </div>
      </div>

      {/* ------ Image Card Section ----- */}
      {/* Removed flex-1 and adjusted lg:justify-start to keep it close to text */}
      <div className="flex justify-center order-2 w-full lg:w-auto relative z-10">
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-full max-w-[280px] md:max-w-[300px] group"
        >
          {/* Subtle Outer Neon Glow */}
          <div className="absolute -inset-4 bg-cyan-500/15 rounded-[3.5rem] blur-3xl opacity-50" />
          
          {/* Dark Glass Container */}
          <div className="relative rounded-[2.5rem] p-2 bg-zinc-900/50 backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden">
            
            <img 
              src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=800" 
              alt="AI Neural Demo" 
              className="w-full h-auto rounded-[2.1rem] object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
            />

            {/* Scanning Line */}
            <motion.div 
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 right-0 h-[3px] bg-cyan-400 z-20 shadow-[0_0_20px_cyan] opacity-70"
            />
            
            {/* Status Badge */}
            <motion.div 
              className="absolute bottom-6 right-4 bg-black/90 backdrop-blur-xl px-4 py-1.5 rounded-2xl border border-cyan-500/40 flex items-center gap-2 z-30 shadow-xl"
            >
                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,211,238,1)]" />
                <span className="text-[9px] font-black text-cyan-400 tracking-widest uppercase italic">Neural Active</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
    </motion.section>
  );
};

export default Header;