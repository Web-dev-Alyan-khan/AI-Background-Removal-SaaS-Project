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
  
  // Destructure credits and the loader function from Context
  const { credit, loadCreditsData } = useContext(AppContext);
  const [scrolled, setScrolled] = useState(false);

  // 1. Handle Scroll Logic
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Fetch Credits automatically when user signs in
  useEffect(() => {
    if (isSignedIn) {
      loadCreditsData();
    }
  }, [isSignedIn]); // Only runs when sign-in status changes

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-2' : 'py-4'} px-4`}>
      <div className={`max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-2 transition-all duration-500 border ${
        scrolled 
        ? 'bg-white/80 backdrop-blur-md border-slate-200/60 shadow-lg' 
        : 'bg-white border-transparent shadow-sm'
      } rounded-2xl`}>

        {/* Brand */}
        <div onClick={() => navigate('/')} className="flex items-center gap-2 cursor-pointer group">
          <div className="bg-indigo-600 p-1.5 rounded-lg shadow-indigo-100 group-hover:rotate-6 transition-transform">
            <img src={assets.logo_icon} alt="Logo" className="w-5 h-5 brightness-0 invert" />
          </div>
          <span className="text-lg sm:text-xl font-bold text-slate-900">
            BG<span className="text-indigo-600">AI</span>
          </span>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {isSignedIn ? (
            <div className="flex items-center gap-3 sm:gap-6">

              {/* Credits Button - Logic Integrated */}
              <button 
                onClick={() => navigate('/buy')}
                className="flex items-center gap-2 bg-indigo-50/50 border border-indigo-100 px-3 py-1.5 rounded-xl hover:bg-indigo-100/50 transition-all active:scale-95"
              >
                <Zap size={14} className="text-indigo-600 fill-indigo-600" />
                <div className="flex flex-col items-start">
                  <span className="text-[10px] font-bold text-indigo-400 uppercase leading-none">Credits</span>
                  <span className="text-sm font-black text-indigo-700">
                    {/* Display '...' while loading, then the number */}
                    {credit !== false ? credit : '...'}
                  </span>
                </div>
              </button>

              {/* Profile Section */}
              <div className="flex items-center gap-3 pl-3 border-l border-slate-100">
                <div className="hidden sm:block text-right">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Hi, {user?.firstName}</p>
                  <p className="text-xs font-bold text-slate-700">welcome</p>
                </div>
                <UserButton afterSignOutUrl="/" />
              </div>
            </div>
          ) : (
            <button 
              onClick={() => openSignIn({})}
              className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-indigo-600 transition-all"
            >
              Get Started <MoveRight size={16} />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;