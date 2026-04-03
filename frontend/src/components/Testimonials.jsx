import React from 'react';
import { testimonialsData } from "../assets/assets";

const Testimonials = () => {
  return (
    <section className="py-12 md:py-20 px-4 md:px-8 max-w-6xl mx-auto">
      
      {/* --- Section Header (Responsive Text) --- */}
      <div className="text-center mb-10 md:mb-16">
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
          Trusted by <span className="bg-gradient-to-r from-red-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">Professionals</span>
        </h2>
        <p className="text-slate-500 mt-3 text-xs sm:text-sm md:text-base font-medium max-w-xs sm:max-w-md mx-auto">
          Real results from creators worldwide. Our AI is the preferred choice for modern workflows.
        </p>
      </div>

      {/* --- Testimonials Grid (Mobile-First) --- */}
      {/* Changed to 1 column on mobile, 2 on tablet, and 3 on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
        {testimonialsData.map((item, index) => (
          <div 
            key={index} 
            className="group relative p-[1px] rounded-[1.5rem] transition-all duration-500 hover:-translate-y-1.5 active:scale-[0.98] md:active:scale-100"
          >
            {/* Dynamic Border */}
            <div className="absolute inset-0 bg-slate-200 group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:via-indigo-400 group-hover:to-purple-500 rounded-[1.5rem] transition-all duration-500 shadow-sm group-hover:shadow-blue-500/10" />

            {/* Inner Card (Z-index 10) */}
            <div className="relative h-full bg-white rounded-[1.45rem] p-6 md:p-8 flex flex-col justify-between">
              
              <div className="relative">
                <span className="text-3xl md:text-4xl text-blue-100 font-serif absolute -top-3 -left-1">“</span>
                <p className="text-slate-600 text-[14px] md:text-[15px] leading-relaxed relative z-10 pt-2 italic">
                  {item.text}
                </p>
              </div>

              {/* Author Section */}
              <div className="flex items-center gap-3 mt-6 md:mt-8 pt-5 border-t border-slate-50">
                <div className="relative flex-shrink-0">
                  <div className="absolute -inset-1 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <img 
                    src={item.image} 
                    alt={item.author} 
                    className="relative w-10 h-10 md:w-12 md:h-12 rounded-full object-cover ring-2 ring-white shadow-sm"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm md:text-base font-bold text-slate-900 truncate tracking-tight">
                    {item.author}
                  </p>
                  <p className="text-[10px] md:text-[11px] font-bold text-blue-500 uppercase tracking-[0.1em]">
                    {item.jobTitle}
                  </p>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;