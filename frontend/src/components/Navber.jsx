import React, { useContext, useEffect, useState } from 'react';
import { assets } from "../assets/assets";
import { MoveRight, Zap } from 'lucide-react';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();
  
  const { credit, loadCreditsData } = useContext(AppContext);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isSignedIn) {
      loadCreditsData();
    }
  }, [isSignedIn]);

  return (
    // THEME: Midnight background with the vertical grid lines from the reference
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-[#050505] ${scrolled ? 'py-2 border-b border-white/5' : 'py-4'} px-4`}
         style={{ backgroundImage: 'linear-gradient(to right, #111 1px, transparent 1px)', backgroundSize: '80px 100%' }}>
      
      <div className={`max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-2 transition-all duration-500 border ${
        scrolled 
        ? 'bg-zinc-900/40 backdrop-blur-xl border-white/10 shadow-2xl' 
        : 'bg-transparent border-transparent'
      } rounded-2xl`}>

        {/* Brand: High-contrast Cyan/White from the screenshot */}
        <div onClick={() => navigate('/')} className="flex items-center gap-2 cursor-pointer group">
          <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-1.5 rounded-lg shadow-lg shadow-cyan-500/20 group-hover:rotate-6 transition-transform">
            <img src={assets.logo_icon} alt="Logo" className="w-5 h-5 brightness-0 invert" />
          </div>
          <span className="text-lg sm:text-xl font-black text-white italic tracking-tighter uppercase">
            BG<span className="text-cyan-400">AI</span>
          </span>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {isSignedIn ? (
            <div className="flex items-center gap-3 sm:gap-6">

              {/* Credits Button: Dark glass style */}
              <button 
                onClick={() => navigate('/buy')}
                className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl hover:bg-white/10 transition-all active:scale-95"
              >
                <Zap size={14} className="text-cyan-400 fill-cyan-400" />
                <div className="flex flex-col items-start">
                  <span className="text-[9px] font-black text-cyan-500 uppercase leading-none tracking-widest">Credits</span>
                  <span className="text-sm font-black text-white">
                    {credit !== false ? credit : '...'}
                  </span>
                </div>
              </button>

              {/* Profile Section */}
              <div className="flex items-center gap-3 pl-3 border-l border-white/5">
                <div className="hidden sm:block text-right">
                  <p className="text-[9px] font-black text-zinc-500 uppercase tracking-tighter">User Online</p>
                  <p className="text-xs font-bold text-cyan-400 italic">{user?.firstName}</p>
                </div>
                <div className="border-2 border-cyan-500/30 rounded-full p-0.5">
                    <UserButton afterSignOutUrl="/" appearance={{ baseTheme: 'dark' }} />
                </div>
              </div>
            </div>
          ) : (
            // Auth Button: Matches the white pill button style in the screenshot
            <button 
              onClick={() => openSignIn({})}
              className="flex items-center gap-2 bg-white text-black px-6 py-2 rounded-full text-xs font-black uppercase italic tracking-tighter hover:bg-cyan-400 transition-all shadow-xl shadow-cyan-500/10"
            >
              Auth <MoveRight size={14} strokeWidth={3} />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;