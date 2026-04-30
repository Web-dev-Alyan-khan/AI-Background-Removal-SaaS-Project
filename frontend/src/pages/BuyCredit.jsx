import React, { useContext, useState } from 'react';
import { plans, assets } from '../assets/assets';
import { AppContext } from '../context/AppContext'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useClerk, useAuth } from '@clerk/clerk-react'; 
import { loadStripe } from '@stripe/stripe-js';
import { motion } from 'framer-motion';

const BuyCredit = () => {
  const { backendUrl, setCredit } = useContext(AppContext);
  const navigate = useNavigate();
  
  const { getToken, isSignedIn } = useAuth();
  const { openSignIn } = useClerk(); 

  const [loading, setLoading] = useState(null);

  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

  const paymentStripe = async (planId) => {
    try {
      if (!isSignedIn) {
        return openSignIn();
      }

      setLoading(planId);
      const token = await getToken();

      const { data } = await axios.post(
        backendUrl + '/api/user/pay-stripe',
        { planId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        window.location.replace(data.session_url);
      } else {
        toast.error(data.message);
        setLoading(null);
      }
    } catch (error) {
      console.error(error);
      toast.error("Payment failed to initialize");
      setLoading(null);
    }
  };

  return (
    // THEME: Midnight background with vertical grid lines
    <section 
      className="relative py-20 md:py-32 px-6 bg-[#050505] overflow-hidden min-h-screen"
      style={{ 
        backgroundImage: 'linear-gradient(to right, #111 1px, transparent 1px)', 
        backgroundSize: '80px 100%' 
      }}
    >
      {/* Ambient Cyber Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-cyan-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto relative z-10 text-center">
        <span className="inline-block px-4 py-1.5 rounded-full bg-zinc-900 border border-white/10 text-cyan-400 text-[10px] font-black tracking-[0.3em] uppercase mb-6 italic">
          Fuel Your Workflow
        </span>

        <h2 className="text-3xl md:text-6xl font-black italic tracking-tighter text-white uppercase mb-12 leading-none">
          Choose The Plan That's <br className="hidden sm:block" /> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
              Right For You
          </span>
        </h2>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((item, index) => (
            <motion.div 
              key={index} 
              whileHover={{ y: -10 }}
              className="group relative p-[1px] rounded-[2.5rem] transition-all duration-500"
            >
              {/* Card Border Glow */}
              <div className="absolute inset-0 bg-white/5 rounded-[2.5rem] group-hover:bg-gradient-to-br group-hover:from-cyan-400 group-hover:to-blue-600 transition-all duration-500 opacity-50 group-hover:opacity-100" />

              {/* Card Content: Obsidian Glass */}
              <div className="relative h-full bg-zinc-900/80 backdrop-blur-2xl rounded-[2.45rem] p-8 flex flex-col justify-between border border-white/5">
                
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-black border border-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:border-cyan-500/50 transition-all shadow-xl">
                    <img src={assets.logo_icon} alt="" className="w-6 invert opacity-80 group-hover:opacity-100 transition-opacity" />
                  </div>
                  
                  <h4 className="text-white font-black text-xl mb-2 uppercase italic tracking-tighter">{item.id}</h4>
                  <p className="text-zinc-500 text-xs font-bold leading-relaxed px-4 mb-8 uppercase tracking-widest">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-auto pt-8 border-t border-white/5">
                  <div className="mb-8">
                     <span className="text-4xl font-black text-white italic tracking-tighter">${item.price}</span>
                     <span className="text-cyan-500 text-[10px] font-black uppercase tracking-widest block mt-1">
                       {item.credits} Power Credits
                     </span>
                  </div>

                  <button 
                    disabled={loading !== null}
                    onClick={() => paymentStripe(item.id)}
                    className="w-full py-4 rounded-2xl bg-white text-black font-black uppercase italic text-xs tracking-widest hover:bg-cyan-400 hover:text-black transition-all duration-300 active:scale-95 disabled:opacity-50 shadow-2xl shadow-white/5"
                  >
                    {loading === item.id ? (
                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin mx-auto"></div>
                    ) : (
                      isSignedIn ? 'Purchase Plan' : 'Login to Buy'
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mt-12 text-zinc-700 text-[10px] font-black tracking-[0.4em] uppercase italic">
          Secure Neural Transaction Guaranteed
        </p>
      </div>
    </section>
  );
};

export default BuyCredit;