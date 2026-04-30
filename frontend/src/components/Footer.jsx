import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    // THEME: Midnight background with the signature vertical grid and border-top glow
    <footer 
      className="relative bg-[#050505] border-t border-white/5 pt-20 pb-10 px-6 overflow-hidden"
      style={{ 
        backgroundImage: 'linear-gradient(to right, #111 1px, transparent 1px)', 
        backgroundSize: '80px 100%' 
      }}
    >
      
      {/* Top Edge Cyan Glow: Mirroring the 'CarRental' header vibe */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent shadow-[0_0_20px_rgba(34,211,238,0.3)]" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-20 text-center sm:text-left">
          
          {/* Brand Column */}
          <div className="space-y-6 flex flex-col items-center sm:items-start">
            <img src={assets.logo} alt="Logo" className="w-36 md:w-44 brightness-0 invert" />
            <p className="text-zinc-500 text-sm leading-relaxed max-w-xs font-bold uppercase tracking-tight italic">
              Revolutionizing visual content with studio-grade AI precision.
            </p>
            
            {/* Social Icons with Cyan Glow Hover */}
            <div className="flex gap-4">
              {[assets.facebook_icon, assets.twitter_icon, assets.google_plus_icon].map((icon, i) => (
                <a key={i} href="#" className="relative group p-[1px] rounded-lg transition-all duration-300">
                  <div className="absolute inset-0 bg-cyan-500 rounded-lg opacity-0 group-hover:opacity-100 blur-[2px] transition-opacity" />
                  <div className="relative bg-zinc-900 border border-white/5 group-hover:border-transparent w-10 h-10 rounded-lg flex items-center justify-center transition-all">
                    <img src={icon} alt="" className="w-4 h-4 invert opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-6">
            <h4 className="text-white font-black text-xs uppercase tracking-[0.25em] italic">Platform</h4>
            <ul className="space-y-4 text-zinc-500 text-xs font-black uppercase tracking-widest">
              <li className="hover:text-cyan-400 cursor-pointer transition-colors">Background Remover</li>
              <li className="hover:text-cyan-400 cursor-pointer transition-colors">Batch Processing</li>
              <li className="hover:text-cyan-400 cursor-pointer transition-colors">API Integration</li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-6">
            <h4 className="text-white font-black text-xs uppercase tracking-[0.25em] italic">Support</h4>
            <ul className="space-y-4 text-zinc-500 text-xs font-black uppercase tracking-widest">
              <li className="hover:text-blue-500 cursor-pointer transition-colors">Documentation</li>
              <li className="hover:text-blue-500 cursor-pointer transition-colors">Help Center</li>
              <li className="hover:text-blue-500 cursor-pointer transition-colors">Privacy Policy</li>
            </ul>
          </div>

          {/* CTA/Newsletter: Matching the "Try Now" button style */}
          <div className="space-y-6">
            <h4 className="text-white font-black text-xs uppercase tracking-[0.25em] italic">Get Started</h4>
            <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">Ready to scale your design workflow?</p>
            <button className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-black italic text-xs shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/30 hover:-translate-y-1 transition-all active:scale-95 uppercase">
              Free Access
            </button>
          </div>
        </div>

        {/* Bottom Bar: Obsidian Minimalism */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-zinc-600 text-[10px] font-black tracking-[0.3em] uppercase">
            © 2026 MUHAMMAD ALYAN. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8">
            <span className="text-zinc-600 text-[10px] font-black hover:text-cyan-400 cursor-pointer transition-colors tracking-widest uppercase italic">Privacy</span>
            <span className="text-zinc-600 text-[10px] font-black hover:text-cyan-400 cursor-pointer transition-colors tracking-widest uppercase italic">Terms</span>
            <span className="text-zinc-600 text-[10px] font-black hover:text-cyan-400 cursor-pointer transition-colors tracking-widest uppercase italic">Cookies</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;