import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <footer className="relative bg-white border-t border-slate-100 pt-16 pb-8 px-6 overflow-hidden">
      
      {/* Decorative background glow to tie in the AI theme */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-pink-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto">
        
        {/* Main Grid: 1 Col on Mobile, 2 on Tablet, 4 on Desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 text-center sm:text-left">
          
          {/* Brand Column */}
          <div className="space-y-6 flex flex-col items-center sm:items-start">
            <img src={assets.logo} alt="Logo" className="w-36 md:w-44" />
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs font-medium">
              Revolutionizing visual content with studio-grade AI precision.
            </p>
            
            {/* Social Icons with Gradient Border Hover */}
            <div className="flex gap-3">
              {[assets.facebook_icon, assets.twitter_icon, assets.google_plus_icon].map((icon, i) => (
                <a key={i} href="#" className="relative group p-[1px] rounded-xl transition-all duration-300">
                  {/* Invisible Gradient Border that appears on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-pink-500 to-blue-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative bg-slate-50 group-hover:bg-white w-10 h-10 rounded-[11px] flex items-center justify-center transition-colors">
                    <img src={icon} alt="" className="w-4 h-4 opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-5">
            <h4 className="text-slate-900 font-bold text-xs uppercase tracking-[0.2em]">Platform</h4>
            <ul className="space-y-3 text-slate-500 text-sm font-semibold">
              <li className="hover:text-pink-500 cursor-pointer transition-colors">Background Remover</li>
              <li className="hover:text-pink-500 cursor-pointer transition-colors">Batch Processing</li>
              <li className="hover:text-pink-500 cursor-pointer transition-colors">API for Developers</li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-5">
            <h4 className="text-slate-900 font-bold text-xs uppercase tracking-[0.2em]">Support</h4>
            <ul className="space-y-3 text-slate-500 text-sm font-semibold">
              <li className="hover:text-red-500 cursor-pointer transition-colors">Documentation</li>
              <li className="hover:text-red-500 cursor-pointer transition-colors">Help Center</li>
              <li className="hover:text-red-500 cursor-pointer transition-colors">Privacy & Terms</li>
            </ul>
          </div>

          {/* Newsletter / Contact (Modern Touch) */}
          <div className="space-y-5">
            <h4 className="text-slate-900 font-bold text-xs uppercase tracking-[0.2em]">Contact</h4>
            <p className="text-slate-500 text-xs font-medium">Ready to scale your design workflow?</p>
            <button className="w-full py-3 rounded-xl bg-gradient-to-r from-red-500 via-pink-500 to-blue-500 text-white font-bold text-xs shadow-lg shadow-pink-500/20 hover:shadow-pink-500/40 hover:-translate-y-0.5 transition-all active:scale-95">
              GET STARTED FREE
            </button>
          </div>
        </div>

        {/* Bottom Bar: Clean & Minimalist */}
        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-[10px] md:text-xs font-bold tracking-widest uppercase">
            © 2026 MUHAMMAD ALYAN. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8">
            <span className="text-slate-400 text-[10px] font-bold hover:text-blue-500 cursor-pointer transition-colors tracking-tighter">PRIVACY</span>
            <span className="text-slate-400 text-[10px] font-bold hover:text-blue-500 cursor-pointer transition-colors tracking-tighter">TERMS</span>
            <span className="text-slate-400 text-[10px] font-bold hover:text-blue-500 cursor-pointer transition-colors tracking-tighter">COOKIES</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;