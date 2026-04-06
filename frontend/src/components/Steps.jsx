import React from 'react';
import { assets } from "../assets/assets";
import { motion } from 'framer-motion';

const Steps = () => {
  const stepsData = [
    {
      title: "Source Input",
      desc: "Upload any portrait or product shot. Our vision model identifies foreground boundaries instantly.",
      icon: assets.upload_icon,
    },
    {
      title: "Neural Processing",
      desc: "The AI engine performs multi-layer semantic segmentation to separate hair and complex edges.",
      icon: assets.remove_bg_icon,
    },
    {
      title: "Export Assets",
      desc: "Download studio-quality transparent PNGs optimized for e-commerce and creative design.",
      icon: assets.download_icon,
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <section className="py-12 sm:py-20 px-6 max-w-5xl mx-auto overflow-hidden">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12 md:mb-16"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-[900] tracking-tight text-slate-900 leading-tight">
          How it{" "}
          <span className="bg-gradient-to-r from-red-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
            works
          </span>
        </h2>
        <div className="w-12 h-1 bg-gradient-to-r from-red-500 to-blue-500 mx-auto mt-4 rounded-full opacity-60" />
        <p className="text-slate-500 mt-4 text-xs sm:text-sm md:text-base font-medium tracking-wide">
          Powered by Advanced Machine Learning
        </p>
      </motion.div>

      {/* Steps Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8"
      >
        {stepsData.map((step, index) => (
          <motion.div 
            key={index} 
            variants={itemVariants}
            whileHover={{ y: -8 }}
            className="group relative p-[1px] rounded-[2rem] transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 rounded-[2rem] group-hover:from-red-500 group-hover:via-pink-500 group-hover:to-blue-500 transition-all duration-500 opacity-50 group-hover:opacity-100" />

            <div className="relative h-full bg-white rounded-[2rem] p-8 flex flex-col items-center text-center shadow-sm group-hover:shadow-2xl group-hover:shadow-pink-500/10 transition-all duration-500">
              
              <div className="mb-6 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-blue-500 blur-2xl rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                
                <div className="relative w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:scale-110 group-hover:bg-slate-900 transition-all duration-500">
                  <img 
                    src={step.icon} 
                    alt={step.title} 
                    className="w-8 h-8 group-hover:invert transition-all duration-500" 
                  />
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg md:text-xl font-bold text-slate-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-red-600 group-hover:to-blue-600 transition-all duration-300">
                  {step.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">
                  {step.desc}
                </p>
              </div>

              <div className="mt-8 flex items-center gap-2">
                <span className="h-[2px] w-4 bg-slate-100 group-hover:w-8 group-hover:bg-pink-500 transition-all duration-500" />
                <span className="text-[10px] font-black tracking-[0.2em] text-slate-300 group-hover:text-slate-900 transition-colors uppercase">
                  Phase 0{index + 1}
                </span>
                <span className="h-[2px] w-4 bg-slate-100 group-hover:w-8 group-hover:bg-blue-500 transition-all duration-500" />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Steps;