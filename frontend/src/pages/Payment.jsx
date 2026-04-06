import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../components/CheckoutForm';

// Initialize Stripe with your Public Key (Starts with pk_test_)
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const Payment = () => {
    const { state } = useLocation();
    
    // Safety check: if there is no secret, the user shouldn't be here
    if (!state || !state.clientSecret) {
        return <Navigate to="/buy" />;
    }

    const { clientSecret, planId } = state;

    // Appearance customization for the Stripe fields
    const appearance = {
        theme: 'stripe',
        variables: {
            colorPrimary: '#0f172a', // Matches your slate-900 buttons
            borderRadius: '12px',
        },
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-6 bg-slate-50">
            <div className="w-full max-w-md bg-white p-8 rounded-[2rem] shadow-2xl border border-slate-100">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-black text-slate-900">Finalize Payment</h2>
                    <p className="text-slate-400 text-xs mt-2 uppercase tracking-widest font-bold">
                        Plan: {planId}
                    </p>
                </div>

                {/* The Elements provider is required to wrap the CheckoutForm */}
                <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
                    <CheckoutForm />
                </Elements>

                <p className="mt-6 text-center text-[10px] text-slate-400 font-medium">
                    Your payment information is encrypted and never stored on our servers.
                </p>
            </div>
        </div>
    );
};

export default Payment;