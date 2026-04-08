import React, { useContext, useState } from 'react';
import { plans, assets } from '../assets/assets';
import { AppContext } from '../context/AppContext'; // ✅ Uncommented
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useClerk, useAuth } from '@clerk/clerk-react'; 
import { loadStripe } from '@stripe/stripe-js';

const BuyCredit = () => {
  const { backendUrl, setCredit } = useContext(AppContext);
  const navigate = useNavigate();
  
  const { getToken, isSignedIn } = useAuth();
  const { openSignIn } = useClerk(); 

  const [loading, setLoading] = useState(null);

  // Initialize Stripe (Use your Publishable Key from Stripe Dashboard)
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

  const paymentStripe = async (planId) => {
    try {
      if (!isSignedIn) {
        return openSignIn();
      }

      setLoading(planId);
      const token = await getToken();

      // 1. Create a Checkout Session on the Backend
      const { data } = await axios.post(
        backendUrl + '/api/user/pay-stripe',
        { planId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        // 2. Redirect the user to Stripe's secure hosted checkout page
        // This avoids the 400 error because Stripe handles the card UI
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
    <section className="py-10 md:py-24 px-6 max-w-4xl mx-auto text-center">
      <span className="inline-block px-3 py-1 rounded-full bg-slate-50 border border-slate-100 text-slate-500 text-[10px] font-bold tracking-[0.2em] uppercase mb-4">
        Our Plans
      </span>

      <h2 className="text-xl md:text-3xl font-extrabold text-slate-900 mb-10 leading-tight px-4">
        Choose The Plan That's <br className="hidden sm:block" /> 
        <span className="bg-gradient-to-r from-red-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
            Right For You
        </span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {plans.map((item, index) => (
          <div 
            key={index} 
            className="group relative bg-white border border-slate-100 p-6 rounded-3xl shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-500 flex flex-col justify-between"
          >
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-50 transition-colors">
                <img src={assets.logo_icon} alt="" className="w-5 opacity-60" />
              </div>
              <h4 className="text-slate-900 font-bold text-base mb-1">{item.id}</h4>
              <p className="text-slate-400 text-[11px] font-medium leading-relaxed px-2 mb-6">
                {item.desc}
              </p>
            </div>

            <div className="mt-auto pt-6 border-t border-slate-50">
              <div className="mb-6">
                 <span className="text-2xl font-black text-slate-900">${item.price}</span>
                 <span className="text-slate-400 text-[10px] font-bold uppercase tracking-tighter"> / {item.credits} Credits</span>
              </div>

              <button 
                disabled={loading !== null}
                onClick={() => paymentStripe(item.id)}
                className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-gradient-to-r hover:from-red-500 hover:via-pink-500 hover:to-blue-500 transition-all duration-300 active:scale-95 shadow-lg shadow-slate-100 disabled:opacity-50"
              >
                {loading === item.id ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
                ) : (
                  isSignedIn ? 'Get Started' : 'Sign in to Buy'
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-8 text-slate-300 text-[9px] font-bold tracking-widest uppercase">
        Secure Checkout Guaranteed
      </p>
    </section>
  );
};

export default BuyCredit;