import React, { useEffect, useContext, useState, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Verify = () => {
    const [searchParams] = useSearchParams();
    const success = searchParams.get("success");
    const transactionId = searchParams.get("resId");
    
    const { backendUrl, loadCreditsData } = useContext(AppContext);
    const { getToken } = useAuth();
    const navigate = useNavigate();
    
    const [status, setStatus] = useState('loading'); // 'loading' | 'success' | 'error'
    const hasRun = useRef(false); // Prevents double-running in Strict Mode

    const verifyPayment = async () => {
        // Prevent duplicate calls
        if (hasRun.current) return;
        hasRun.current = true;

        try {
            const token = await getToken(); 

            if (success === "true" && transactionId) {
                const { data } = await axios.post(
                    `${backendUrl}/api/user/verify-stripe`, 
                    { transactionId },
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                if (data.success) {
                    setStatus('success');
                    toast.success("Payment Verified!");
                    await loadCreditsData(); 
                    // Give user time to see the success state
                    setTimeout(() => navigate('/'), 2500);
                } else {
                    setStatus('error');
                    toast.error(data.message);
                    setTimeout(() => navigate('/buy'), 2000);
                }
            } else {
                setStatus('error');
                toast.warn("Payment was not completed.");
                navigate('/buy');
            }
        } catch (error) {
            console.error(error);
            setStatus('error');
            toast.error("Verification system error");
            navigate('/buy');
        }
    };

    useEffect(() => {
        if (backendUrl) {
            verifyPayment();
        }
    }, [backendUrl]);

    return (
        <section className="min-h-[80vh] flex flex-col items-center justify-center px-6 bg-slate-50/50">
            <div className="w-full max-w-md bg-white border border-slate-200/60 p-12 rounded-[3rem] shadow-2xl shadow-blue-500/5 text-center">
                
                {status === 'loading' && (
                    <div className="animate-in fade-in zoom-in duration-500">
                        {/* Premium Spinner */}
                        <div className="relative w-24 h-24 mx-auto mb-8">
                            <div className="absolute inset-0 border-[5px] border-slate-100 rounded-full"></div>
                            <div className="absolute inset-0 border-[5px] border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 mb-3">Confirming Payment</h2>
                        <p className="text-slate-500 text-sm font-medium leading-relaxed">
                            We're communicating with Stripe to <br/> finalize your credits.
                        </p>
                    </div>
                )}

                {status === 'success' && (
                    <div className="animate-in cubic-bezier(0.4, 0, 0.2, 1) duration-700 zoom-in">
                        {/* Success Checkmark with Pulse */}
                        <div className="relative w-24 h-24 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-green-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                            </svg>
                            <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20"></div>
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 mb-3">Payment Successful!</h2>
                        <p className="text-slate-500 text-sm font-medium">
                            Your balance has been updated. <br/> Redirecting to dashboard...
                        </p>
                    </div>
                )}

                {status === 'error' && (
                    <div className="animate-in fade-in duration-500">
                        <div className="w-24 h-24 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-8">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 mb-3">Verification Failed</h2>
                        <p className="text-slate-500 text-sm font-medium">
                            Something went wrong. Returning <br/> you to the billing page.
                        </p>
                    </div>
                )}
                
                {/* Footer Detail */}
                <div className="mt-10 pt-8 border-t border-slate-50 flex items-center justify-center gap-2">
                    <img src="/stripe-logo.png" alt="Stripe" className="h-4 grayscale opacity-50" />
                    <span className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">
                        Encrypted Connection
                    </span>
                </div>
            </div>
        </section>
    );
};

export default Verify;