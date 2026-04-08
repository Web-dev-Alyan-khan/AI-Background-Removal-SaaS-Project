import React, { useContext, useState, useEffect } from 'react';
import { assets } from "../assets/assets";
import { AppContext } from '../context/AppContext'; // ✅ Uncommented and fixed
import { useNavigate } from 'react-router-dom';

const Result = () => {
  // Pulling state from Context
  const { image, resultImage } = useContext(AppContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [originalUrl, setOriginalUrl] = useState(null);

  useEffect(() => {
    // 1. Handle Original Image URL
    if (image) {
      const url = URL.createObjectURL(image);
      setOriginalUrl(url);
      
      // Cleanup function to prevent memory leaks
      return () => URL.revokeObjectURL(url);
    } else {
      // If someone tries to visit /result directly without an image, send them home
      navigate('/');
    }
  }, [image, navigate]);

  useEffect(() => {
    // 2. Manage Loading state
    // When resultImage changes from false to a Base64 string, stop loading
    if (resultImage) {
      setLoading(false);
    }
  }, [resultImage]);

  return (
    <section className="py-20 md:py-28 px-4 max-w-4xl mx-auto flex flex-col items-center">
      
      {/* --- Main Comparison Grid --- */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-8">
        
        {/* Left side: Original */}
        <div className="flex flex-col gap-2">
          <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest text-center">Original</p>
          <div className="relative aspect-square max-w-70 mx-auto w-full rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 shadow-sm">
            <img 
              src={originalUrl || undefined} 
              alt="Original" 
              className="w-full h-full object-cover" 
            />
          </div>
        </div>

        {/* Right Side: Result */}
        <div className="flex flex-col gap-2">
          <p className="text-blue-500 font-bold text-[10px] uppercase tracking-widest text-center">AI Result</p>
          <div className="relative aspect-square max-w-[280px] mx-auto w-full rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-md">
             
             {loading ? (
               <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
                  <div className="w-8 h-8 border-[3px] border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className='text-xs text-slate-500 mt-2 font-medium italic'>Removing Background...</p>
               </div>
             ) : (
               <img 
                 src={resultImage} 
                 alt="Result" 
                 className="w-full h-full object-contain relative z-10" 
               />
             )}

             {/* Transparency Checkerboard Pattern (Visible behind the result) */}
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/checkerboard.png')] opacity-10" />
          </div>
        </div>
      </div>

      {/* --- Action Buttons --- */}
      <div className="flex flex-wrap items-center justify-center gap-3 w-full">
        <button 
          onClick={() => navigate('/')} 
          className="px-6 py-2.5 rounded-full border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 transition-all active:scale-95"
        >
          Try another
        </button>

        {/* Download button only appears when result is ready */}
        {!loading && resultImage && (
          <a 
            href={resultImage} 
            download="bg-removed.png"
            className="px-8 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-xs shadow-md hover:shadow-lg transition-all active:scale-95"
          >
            Download Image
          </a>
        )}
      </div>
      
    </section>
  );
};

export default Result;