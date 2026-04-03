import React from 'react';
import { assets } from "../assets/assets";
import { MoveRight } from 'lucide-react';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-4 md:py-6 px-4 md:px-8">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-5 py-2.5 border border-white/20 backdrop-blur-xl bg-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.04)] rounded-full transition-all duration-300">
        
        {/* --- Logo Section --- */}
        <div 
          onClick={() => navigate('/')} 
          className="flex items-center gap-2 group cursor-pointer outline-none"
        >
          <div className="relative">
            <img 
              src={assets.logo_icon} 
              alt="Logo" 
              className="w-8 h-8 object-contain transition-transform duration-500 group-hover:rotate-[10deg]" 
            />
            <div className="absolute inset-0 bg-blue-500/10 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="text-lg font-black tracking-tighter text-slate-900">
            Nexus<span className="text-blue-600">AI</span>
          </span>
        </div>

        {/* --- Authentication & Actions --- */}
        <div className="flex items-center gap-4">
          {isSignedIn ? (
            <div className="flex items-center gap-4 md:gap-6">
              
              {/* Credit Display - Professional Dashboard Style */}
              <button 
                onClick={() => navigate('/buy')}
                className="hidden sm:flex items-center gap-2 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-full hover:bg-blue-50 transition-colors group"
              >
                <img src={assets.credit_icon} alt="credits" className="w-4 h-4 opacity-70 group-hover:opacity-100" />
                <span className="text-[10px] font-black text-slate-500 group-hover:text-blue-600 uppercase tracking-widest">
                  Credits : 48
                </span>
              </button>
              
              {/* Profile Menu */}
              <div className="flex items-center ring-2 ring-white shadow-sm rounded-full">
                <UserButton afterSignOutUrl="/" />
              </div>

            </div>
          ) : (
            /* Login/Sign-up Button */
            <button 
              onClick={() => openSignIn({})}
              className="group flex items-center gap-2 bg-slate-950 text-white px-6 py-2 rounded-full text-xs font-bold transition-all hover:bg-black hover:shadow-xl hover:shadow-blue-500/10 active:scale-95"
            >
              Get started
              <MoveRight 
                size={14} 
                className="transition-transform duration-300 group-hover:translate-x-1" 
              />
            </button>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;