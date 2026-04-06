import React, { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        setIsProcessing(true);

     // Inside your CheckoutForm.jsx handleSubmit function
const { error } = await stripe.confirmPayment({
    elements,
    confirmParams: {
        //  Update this to match the new route you just created
        return_url: `${window.location.origin}/payment-success`, 
    },
});
        // If there's an immediate error (like card declined)
        if (error) {
            toast.error(error.message);
        } 
        
        setIsProcessing(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="p-2">
                {/* Stripe's all-in-one secure input field */}
                <PaymentElement />
            </div>

            <button 
                disabled={isProcessing || !stripe} 
                className="w-full py-4 rounded-2xl bg-slate-900 text-white font-bold text-sm hover:bg-black transition-all active:scale-95 disabled:opacity-50 shadow-xl shadow-slate-200"
            >
                {isProcessing ? (
                    <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Verifying...</span>
                    </div>
                ) : (
                    "Confirm & Pay"
                )}
            </button>
        </form>
    );
};

export default CheckoutForm;