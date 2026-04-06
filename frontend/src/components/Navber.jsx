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

  // 1. Separate Scroll Logic
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Separate Data Fetching Logic (Fixed 401 preventer)
  useEffect(() => {
    if (isSignedIn) {
      loadCreditsData();
    }
  }, [isSignedIn]); // Only fires when login status changes

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-2 sm:py-3' : 'py-4 sm:py-5'} px-4`}>
      <div className={`max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-2 transition-all duration-500 border ${
        scrolled 
        ? 'bg-white/90 backdrop-blur-lg border-slate-200/60 shadow-xl shadow-slate-200/20' 
        : 'bg-white border-transparent shadow-sm'
      } rounded-2xl`}>

        {/* Brand */}
        <div 
          onClick={() => navigate('/')} 
          className="flex items-center gap-2 sm:gap-3 cursor-pointer group shrink-0"
        >
          <div className="bg-indigo-600 p-1.5 sm:p-2 rounded-lg sm:rounded-xl shadow-lg shadow-indigo-100 group-hover:scale-105 transition-transform duration-300">
            <img src={assets.logo_icon} alt="NexusAI" className="w-4 h-4 sm:w-5 sm:h-5 object-contain brightness-0 invert" />
          </div>
          <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-900">
          BG<span className="text-indigo-600">AI REMOVE</span>
          </span>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-4">
          {isSignedIn ? (
            <div className="flex items-center gap-2 sm:gap-5">

              {/* Credits Button - Improved Spacing */}
              <button 
                onClick={() => navigate('/buy')}
                className="flex items-center gap-2 bg-slate-50 border border-slate-100 pl-1.5 pr-3 sm:pl-2 sm:pr-4 py-1 sm:py-1.5 rounded-xl hover:bg-white hover:border-indigo-200 transition-all active:scale-95 group"
              >
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-indigo-600 flex items-center justify-center shrink-0">
                  <Zap size={12} className="text-white fill-white sm:w-[14px]" />
                </div>

                <div className="flex flex-col items-start leading-none">
                  <span className="hidden xs:block text-[8px] sm:text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5 sm:mb-1">
                    Credits
                  </span>
                  <span className="text-xs sm:text-sm font-black text-slate-800">
                    {credit === null ? credit : '0'}
                  </span>
                </div>
              </button>

              {/* Profile */}
              <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-4 border-l border-slate-100">
                <div className="hidden md:block text-right">
                  <p className="text-[10px] font-bold text-slate-400 uppercase leading-none mb-1">
                    Account
                  </p>
                  <p className="text-xs font-bold text-slate-700">
                    {user?.firstName || "User"}
                  </p>
                </div>
                <div className="transition-transform active:scale-90">
                  <UserButton 
                    afterSignOutUrl="/" 
                    appearance={{ 
                        elements: { 
                            avatarBox: "h-8 w-8 sm:h-9 sm:w-9 shadow-sm" 
                        } 
                    }} 
                  />
                </div>
              </div>
            </div>
          ) : (
            /* Guest State - Compact on mobile */
            <button 
              onClick={() => openSignIn({})}
              className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 sm:px-6 sm:py-2.5 rounded-xl text-[11px] sm:text-sm font-bold hover:bg-indigo-600 shadow-lg shadow-slate-200 transition-all active:scale-95 whitespace-nowrap"
            >
              Get Started
              <MoveRight size={14} className="hidden xs:block" />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;