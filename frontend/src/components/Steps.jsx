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
    // THEME: Deep midnight background with vertical grid pattern
    <section 
      className="relative py-12 sm:py-24 px-6 max-w-full bg-[#050505] overflow-hidden"
      style={{ 
        backgroundImage: 'linear-gradient(to right, #111 1px, transparent 1px)', 
        backgroundSize: '80px 100%' 
      }}
    >
      {/* Cyan Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-cyan-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header - Updated to high-contrast Cyberpunk style */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black italic tracking-tighter text-white uppercase leading-tight">
            How it{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              works
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto mt-6 rounded-full" />
          <p className="text-zinc-500 mt-6 text-xs sm:text-sm md:text-base font-bold tracking-[0.2em] uppercase">
            Powered by Advanced Machine Learning
          </p>
        </motion.div>

        {/* Steps Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
        >
          {stepsData.map((step, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group relative p-[1px] rounded-[2.5rem] transition-all duration-500"
            >
              {/* Animated Gradient Border */}
              <div className="absolute inset-0 bg-white/10 rounded-[2.5rem] group-hover:bg-gradient-to-br group-hover:from-cyan-400 group-hover:to-blue-600 transition-all duration-500 opacity-50 group-hover:opacity-100" />

              {/* Dark Glass Card */}
              <div className="relative h-full bg-zinc-900/60 backdrop-blur-2xl rounded-[2.5rem] p-10 flex flex-col items-center text-center shadow-2xl transition-all duration-500 border border-white/5">
                
                {/* Icon Container */}
                <div className="mb-8 relative">
                  <div className="absolute inset-0 bg-cyan-500 blur-3xl rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                  
                  <div className="relative w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 group-hover:bg-cyan-500 transition-all duration-500">
                    <img 
                      src={step.icon} 
                      alt={step.title} 
                      className="w-10 h-10 invert opacity-60 group-hover:opacity-100 group-hover:invert-0 transition-all duration-500" 
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl md:text-2xl font-black text-white italic uppercase tracking-tighter transition-all duration-300">
                    {step.title}
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed font-medium group-hover:text-zinc-300 transition-colors">
                    {step.desc}
                  </p>
                </div>

                {/* Cyber Phase Indicator */}
                <div className="mt-10 flex items-center gap-3">
                  <span className="h-[1px] w-6 bg-white/10 group-hover:w-10 group-hover:bg-cyan-500 transition-all duration-500" />
                  <span className="text-[10px] font-black tracking-[0.3em] text-zinc-600 group-hover:text-white transition-colors uppercase italic">
                    PHASE 0{index + 1}
                  </span>
                  <span className="h-[1px] w-6 bg-white/10 group-hover:w-10 group-hover:bg-blue-500 transition-all duration-500" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Steps;