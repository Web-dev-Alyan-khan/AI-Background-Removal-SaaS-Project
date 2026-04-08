import { createContext, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios';
import { useAuth, useClerk, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom"; // Don't forget this import

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const [credit, setCredit] = useState(false);
    const [image, setImage] = useState(false);
    const [resultImage, setResultImage] = useState(false);
    
    const navigate = useNavigate();

    const { getToken } = useAuth();
    const { isSignedIn } = useUser();
    const { openSignIn } = useClerk();

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
     
    const loadCreditsData = async () => {
        try {
            const token = await getToken();
            const { data } = await axios.get(backendUrl + '/api/user/credits', {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (data.success) {
                setCredit(data.credits);
            }
        } catch (error) {
            console.error("Frontend Error:", error);
            toast.error(error.message);
        }
    };

    const removeBg = async (image) => {
        try {
            // 1. Check if user is logged in
            if (!isSignedIn) {
                return openSignIn();
            }

            // 2. Setup state and navigate to result page
            setImage(image);
            setResultImage(false);
            navigate('/result');

            // 3. Prepare Form Data for backend
            const token = await getToken();
            const formData = new FormData();
            formData.append('image', image);

            // 4. Send request to backend
            const { data } = await axios.post(backendUrl + '/api/image/remove-bg', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (data.success) {
                setResultImage(data.resultImage);
                // Update credits in UI immediately
                data.creditBalance && setCredit(data.creditBalance);
                toast.success("Background removed!");
            } else {
                toast.error(data.message);
                // If they ran out of credits, send them home or to buy page
                if (data.creditBalance === 0) navigate('/buy');
            }

        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    const value = {
        credit, setCredit,
        backendUrl, loadCreditsData,
        removeBg, resultImage, setResultImage,
        image, setImage
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;