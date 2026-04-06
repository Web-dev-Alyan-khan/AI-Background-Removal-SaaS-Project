import React, { useEffect, useContext, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Success = () => {
    const { backendUrl, loadCreditsData, token } = useContext(AppContext);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [isVerifying, setIsVerifying] = useState(true);

    // Stripe appends 'payment_intent' to the URL automatically
    const paymentIntentId = searchParams.get("payment_intent");

    useEffect(() => {
        const verifyAndAddCredits = async () => {
            try {
                if (!token) return;

                // We send the ID to our backend to manually check status
                const { data } = await axios.post(
                    `${backendUrl}/api/user/verify-stripe`, 
                    { paymentIntentId }, 
                    { headers: { token } }
                );

                if (data.success) {
                    await loadCreditsData(); // Refresh Navbar credits
                    setIsVerifying(false);
                    toast.success("Credits added successfully!");
                } else {
                    toast.error(data.message);
                    navigate('/buy');
                }
            } catch (error) {
                console.error(error);
                toast.error("Verification failed");
            }
        };

        if (paymentIntentId && token) {
            verifyAndAddCredits();
        }
    }, [paymentIntentId, token]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                </svg>
            </div>

            <h1 className="text-3xl font-extrabold text-slate-900">
                {isVerifying ? "Verifying Payment..." : "Payment Successful!"}
            </h1>
            
            <p className="text-slate-500 mt-3 max-w-sm">
                {isVerifying 
                    ? "Please wait while we update your credit balance. Do not refresh this page." 
                    : "Your credits have been added to your account and are ready to use."}
            </p>

            {!isVerifying && (
                <button 
                    onClick={() => navigate('/')} 
                    className="mt-10 px-10 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-black transition-all shadow-xl active:scale-95"
                >
                    Back to Dashboard
                </button>
            )}
        </div>
    );
};

export default Success;