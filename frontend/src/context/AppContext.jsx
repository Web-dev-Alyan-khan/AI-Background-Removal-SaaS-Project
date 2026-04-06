import { useState, createContext } from "react";
import { useAuth, useClerk, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const [credit, setCredit] = useState(false);
    const [image, setImage] = useState(false);
    const [resultImage, setResultImage] = useState(false);

    const navigate = useNavigate();

    // Backend URL from .env
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    
    const { getToken } = useAuth();
    const { isSignedIn } = useUser();
    const { openSignIn } = useClerk();

    // Fetch credits
const loadCreditsData = async () => {
    try {
        const token = await getToken({ skipCache: true }); // Forces a fresh token
        
        if (!token) return;

        const { data } = await axios.get(backendUrl + '/api/user/credits', {
    headers: { 
        // Use backticks and check for the space after Bearer
        'Authorization': `Bearer ${token}` 
    }
});

        if (data.success) {
            setCredit(data.credits);
        }
    } catch (error) {
        console.log("Credit Load Error:", error.response?.data?.message || error.message);
    }
};
    // Remove Background Logic
    const removeBg = async (file) => {
        try {
            if (!isSignedIn) {
                return openSignIn();
            }

            setImage(file);
            setResultImage(false);
            navigate('/result');

            const token = await getToken();
             console.log("Token check:", token); // If this is null, that's your 401 source.

        if (!token) {
         toast.error("Session expired. Please sign in again.");
        return openSignIn();
         }

            // Prepare form data
            const formData = new FormData();
            formData.append('image', file);

           const { data } = await axios.post(backendUrl + '/api/image/remove-bg', formData, {
    headers: { 
        Authorization: `Bearer ${token}` // Ensure there is a space after Bearer
    }
});

            if (data.success) {
                setResultImage(data.resultImage);
                data.creditBalance && setCredit(data.creditBalance);
                toast.success("Success! Background removed.");
            } else {
                toast.error(data.message);
                // If they ran out of credits, send them to buy page
                if (data.creditBalance === 0) navigate('/buy');
            }

        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || error.message);
        }
    };

    const value = {
        credit, setCredit,
        backendUrl,
        loadCreditsData,
        image, setImage,
        resultImage, setResultImage,
        removeBg
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;