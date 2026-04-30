import React, { useContext, useState, useEffect } from 'react';
import { assets } from "../assets/assets";
import { AppContext } from '../context/AppContext'; 
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Result = () => {
  const { image, resultImage } = useContext(AppContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [originalUrl, setOriginalUrl] = useState(null);

  useEffect(() => {
    if (image) {
      const url = URL.createObjectURL(image);
      setOriginalUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      navigate('/');
    }
  }, [image, navigate]);

  useEffect(() => {
    if (resultImage) {
      setLoading(false);
    }
  }, [resultImage]);

  return (
    // THEME: Midnight background with vertical grid lines
    <section 
      className="relative min-h-screen py-24 md:py-32 px-4 bg-[#050505] overflow-hidden"
      style={{ 
        backgroundImage: 'linear-gradient(to right, #111 1px, transparent 1px)', 
        backgroundSize: '80px 100%' 
      }}
    >
      {/* Dynamic Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[500px] bg-cyan-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        
        {/* --- Main Comparison Grid --- */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10 mb-12">
          
          {/* Left side: Original */}
          <div className="flex flex-col gap-4">
            <p className="text-zinc-500 font-black text-[10px] uppercase tracking-[0.3em] text-center italic">Source Asset</p>
            <div className="relative aspect-square max-w-[320px] mx-auto w-full rounded-[2rem] overflow-hidden border border-white/5 bg-zinc-900/40 backdrop-blur-md shadow-2xl">
              <img 
                src={originalUrl || undefined} 
                alt="Original" 
                className="w-full h-full object-cover grayscale opacity-60" 
              />
            </div>
          </div>

          {/* Right Side: Result */}
          <div className="flex flex-col gap-4">
            <p className="text-cyan-400 font-black text-[10px] uppercase tracking-[0.3em] text-center italic">Neural Output</p>
            <div className="relative aspect-square max-w-[320px] mx-auto w-full rounded-[2rem] overflow-hidden border border-cyan-500/20 bg-zinc-900/60 backdrop-blur-xl shadow-[0_0_50px_rgba(34,211,238,0.1)]">
               
               {loading ? (
                 <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md">
                    <div className="w-10 h-10 border-[3px] border-cyan-500 border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(34,211,238,0.5)]"></div>
                    <p className='text-[10px] text-cyan-400 mt-4 font-black uppercase tracking-widest animate-pulse'>AI Processing Layer...</p>
                 </div>
               ) : (
                 <img 
                   src={resultImage} 
                   alt="Result" 
                   className="w-full h-full object-contain relative z-10 p-4" 
                 />
               )}

               {/* Modern Transparency Pattern */}
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/checkerboard.png')] opacity-5 invert" />
            </div>
          </div>
        </div>

        {/* --- Action Buttons --- */}
        <div className="flex flex-wrap items-center justify-center gap-4 w-full">
          <button 
            onClick={() => navigate('/')} 
            className="px-8 py-3 rounded-xl border border-white/10 text-zinc-400 font-black text-xs uppercase tracking-widest hover:bg-white/5 hover:text-white transition-all active:scale-95 italic"
          >
            Reset Process
          </button>

          {!loading && resultImage && (
            <motion.a 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              href={resultImage} 
              download="bg-removed.png"
              className="px-10 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all active:scale-95 italic"
            >
              Export PNG
            </motion.a>
          )}
        </div>
      </div>
      
    </section>
  );
};

export default Result;