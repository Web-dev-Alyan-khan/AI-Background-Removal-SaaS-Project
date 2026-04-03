import React from 'react';
import { assets } from "../assets/assets";

const Steps = () => {
  const stepsData = [
    {
      title: "Upload Image",
      desc: "Drag and drop any JPG or PNG. Our AI supports high-res files.",
      icon: assets.upload_icon,
    },
    {
      title: "AI Analysis",
      desc: "Our neural engine isolates subjects with pixel-perfect precision.",
      icon: assets.remove_bg_icon,
    },
    {
      title: "Save Result",
      desc: "Get your transparent PNG in seconds, ready for any project.",
      icon: assets.download_icon,
    }
  ];

  return (
    <section className="py-12 md:py-20 px-6 max-w-5xl mx-auto">
      {/* Header Section - Responsive Text */}
      <div className="text-center mb-10 md:mb-16">
        <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-gray-900 leading-tight">
          How it <span className="bg-gradient-to-r from-red-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">works</span>
        </h2>
        <p className="text-gray-500 mt-2 text-xs md:text-base font-medium">Simple. Fast. Professional.</p>
      </div>

      {/* Steps Grid - Stacked on Mobile, 3 Columns on Tablet+ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {stepsData.map((step, index) => (
          <div 
            key={index} 
            className="group relative p-[1px] rounded-[2rem] transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] md:active:scale-100"
          >
            {/* The Gradient Border Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-indigo-500/20 to-purple-500/20 rounded-[2rem] group-hover:from-blue-600 group-hover:via-indigo-500 group-hover:to-purple-600 transition-all duration-500" />

            {/* Inner Content Card */}
            <div className="relative h-full bg-white rounded-[2rem] p-6 sm:p-8 flex flex-col items-center text-center">
              
              {/* Step Icon with responsive sizing */}
              <div className="mb-4 md:mb-6 relative">
                <div className="absolute inset-0 bg-blue-500/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-blue-600 transition-all duration-300">
                  <img 
                    src={step.icon} 
                    alt={step.title} 
                    className="w-6 h-6 md:w-8 md:h-8 group-hover:invert transition-all" 
                  />
                </div>
              </div>

              {/* Text Content */}
              <div className="space-y-2">
                <h3 className="text-base md:text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {step.title}
                </h3>
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed max-w-[200px] md:max-w-none">
                  {step.desc}
                </p>
              </div>

              {/* Minimalist Step Number */}
              <div className="mt-4 md:mt-6 text-[9px] md:text-[10px] font-black tracking-widest text-gray-300 uppercase group-hover:text-blue-300 transition-colors">
                Step 0{index + 1}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Steps;