   
import { useState } from 'react';
import { registerAdmin } from '../api/api';
import React from 'react';
import SignupStyle from './Signup.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
function SignUp() {
  
  const navigate = useNavigate();
  const[error,setError]=useState(null)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
   
  });
  
  const notify = () => {
    toast.success("Signed Up successfully!", { position: "top-center" });
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    let flag = true;

    if (formData.username.trim() === "") {
      setFormData((prevState) => ({ ...prevState, username: "Invalid Name" }));
      flag = false;
    }
    if (formData.email.trim() === "") {
      setFormData((prevState) => ({ ...prevState, email: "Invalid Email" }));
      flag = false;
    }
    if (formData.password.trim() === "") {
      setFormData((prevState) => ({ ...prevState, password: "Weak Password" }));
      flag = false;
    }

    if (!flag) {
      return;
    }
    console.log("userData",formData);
    
    const result = await registerAdmin(formData);
    
    
    if(result.message){
      console.log("error",result.message);
      
      setError(result.message)
    }
    else{
      notify();
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    }
  };

  return (
    <div className={SignupStyle.app}>
      <div className={SignupStyle.parent}>
        <div className={SignupStyle.main}>
          <h1 className={SignupStyle.heading}>Sign Up</h1>
         
          <div className={SignupStyle.form}>
            <div className={SignupStyle.field}>
              <label className={SignupStyle.label}>Name</label>
              <input
                className={SignupStyle.input}
                name="username"
                value={formData.username}
                onChange={handleChange}
                type="text"
              />
            </div>
            <div className={SignupStyle.field}>
              <label className={SignupStyle.label}>Email</label>
              <input
                className={SignupStyle.input}
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
              />
            </div>
            {error && <p className={SignupStyle.error}>{error}</p>}
            <div className={SignupStyle.field}>
              <label className={SignupStyle.label}>Password</label>
              <input
                className={SignupStyle.input}
                name="password"
                value={formData.password}
                onChange={handleChange}
                type="password"
              />
            </div>
           
            <button onClick={handleSubmit} className={SignupStyle.button}>
              SignUp
            </button>
          </div>
        </div>
        <ToastContainer autoClose={2000} />
      </div>
    </div>
  );
}

export default SignUp;


