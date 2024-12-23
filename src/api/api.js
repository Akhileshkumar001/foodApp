import axios from "axios";
const BackendUrl = process.env.REACT_APP_Backend;

export const registerAdmin = async ({ email, password, name }) => {
    try {
        const reqUrl = `${BackendUrl}/auth/signUp`; 
        console.log("Request URL:", reqUrl);
        
        const response = await axios.post(reqUrl, {
            name,
            password,
            email,
        });

        return response;

    } catch (error) {
        console.log("Error in API call:", error);
        throw error;
    }
};

export const loginAdmin = async ({ email, password }) => {
    try {
        const reqUrl = `${BackendUrl}/auth/login`;
        const response = await axios.post(reqUrl, {
            password,
            email,
        });
        if (response.status === 200 && response.data?.token) {
            const { token, name, userId } = response.data;
            localStorage.setItem("token",token);
            localStorage.setItem("name", JSON.stringify(name));
            localStorage.setItem("userId", JSON.stringify(userId));
        }
        return response;
    } 
    catch (error) {
        console.log("error");
    }
};

export const submitContactForm = async ({ name, email, howDidYouFindUs, message, termsAccepted }) => {
    try {
        const reqUrl = `${BackendUrl}/auth/submit`; // Ensure the endpoint matches your backend route
        console.log("Request URL:", reqUrl);
        
        const response = await axios.post(reqUrl, {
            name,
            email,
            howDidYouFindUs,
            message,
            termsAccepted
        });

        return response;

    } catch (error) {
        console.log("Error in API call:", error);
        throw error;
    }
};
