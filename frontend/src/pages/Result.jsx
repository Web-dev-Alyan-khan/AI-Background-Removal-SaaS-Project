import React, { useState } from 'react';
import { assets } from "../assets/assets";

const Result = () => {
  // Logic: Change to true to see the loading state
  const [loading, setLoading] = useState(false); 

  return (
    <section className="py-20 md:py-28 px-4 max-w-4xl mx-auto flex flex-col items-center">
      
      {/* --- Main Comparison Grid (Compact Sizing) --- */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-8">
        
        {/* ------ Left side: Original --- */}
        <div className="flex flex-col gap-2">
          <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest text-center">Original</p>
          <div className="relative aspect-square max-w-70 mx-auto w-full rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 shadow-sm">
             <img src={assets.image_w_bg} alt="Original" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* ----- Right Side: Result --- */}
        <div className="flex flex-col gap-2">
          <p className="text-blue-500 font-bold text-[10px] uppercase tracking-widest text-center">AI Result</p>
          <div className="relative aspect-square max-w-[280px] mx-auto w-full rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-md">
             
             {loading ? (
               <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
                  <div className="w-8 h-8 border-[3px] border-blue-500 border-t-transparent rounded-full animate-spin"></div>
               </div>
             ) : (
               <img src={assets.image_wo_bg} alt="Result" className="w-full h-full object-cover relative z-10" />
             )}

             {/* Checkerboard Pattern (Indicates Transparency) */}
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 -z-10" />
          </div>
        </div>
      </div>

      {/* ----- Compact Buttons (Mobile Optimized) ------ */}
      <div className="flex flex-wrap items-center justify-center gap-3 w-full">
        <button className="px-6 py-2.5 rounded-full border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 transition-all active:scale-95">
          Try another
        </button>

        <a 
          href={assets.image_wo_bg} 
          download
          className="px-8 py-2.5 rounded-full bg-linear-to-r from-red-500 via-pink-500 to-blue-500 text-white font-bold text-xs shadow-md shadow-pink-500/10 hover:shadow-pink-500/30 transition-all active:scale-95"
        >
          Download Image
        </a>
      </div>
      
    </section>
  );
};

export default Result;