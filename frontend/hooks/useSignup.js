import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    const { dispatch } = useAuthContext();

    const signup = async (email, password) => {
        setIsLoading(true);
        setError(null);

        try {
            const { data } = await axios.post("http://localhost:5000/api/users/signup", {
                headers: { 'Content-Type': "application/json" },
                body: { email, password }
            });

            // Save user to local storage
            localStorage.setItem('user', JSON.stringify(data));

            // Update Auth Context
            dispatch({ type: 'LOGIN', payload: data });
            
            setIsLoading(false);
        } catch (e) {
            setIsLoading(false);
            setError(e.response.data.error);
        }
    };

    return { signup, isLoading, error };
}