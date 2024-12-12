import axios from "axios";

const backendUrl = `http://localhost:3005/api/v1/auth`;;

export const registerAdmin = async ({ email, password, name }) => {
    try {
        const reqUrl = `${backendUrl}/signUp`; // Ensure the endpoint matches
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
        const reqUrl = `${backendUrl}/login`;
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
        const reqUrl = `${backendUrl}/submit`; // Ensure the endpoint matches your backend route
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
