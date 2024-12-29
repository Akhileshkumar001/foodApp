import axios from "axios";
const backendUrl = process.env.REACT_APP_Backend;
export const registerAdmin = async ({ email, password , username})=>{
    try {
       
        
        // "https://food-app-backend-lemon.vercel.app/api/v1"
        // http://localhost:3005/api/v1/auth/signUp
        const reqUrl = `${backendUrl}/auth/signUp`; 
        console.log("Request URL:", reqUrl);
        
        const response = await axios.post(reqUrl, {
            username,
            password,
            email,
        });
        console.log("usermessage", response.data);

        return response.data; 
      } catch (error) {
        console.log("Error in API call:", error);
    
        
        if (error.response && error.response.data && error.response.data.message) {
          return { errorMessage: error.response.data.message }; 
        }
    
        return { errorMessage: "An unknown error occurred." };
      }
    };
        
        



export const loginAdmin = async ({ email, password }) => {
    try {
        const reqUrl = `${backendUrl}/auth/login`;
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
        const reqUrl = `${backendUrl}/auth/submit`; // Ensure the endpoint matches your backend route
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
