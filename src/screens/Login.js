import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import  './login.css'
import { ToastContainer, toast } from 'react-toastify';
import { loginAdmin } from '../api/api';
import 'react-toastify/dist/ReactToastify.css'


function Login() {
const navigate=useNavigate();
const notify = () => {
  toast.success("logged in successfully !", {
    position: "top-center"
  });
}
const notify2 = () => {
  toast.error("Invalid Credentials !", {
    position: "top-right"
  });
}
  
  const [formData, setFormData] = useState({ 
      email: "",
      password: "",
  });

  const handleChange = (event) => {
      setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
      let flag = true;

      if (formData.email.trim() === "") {
        setFormData(prevState => ({ ...prevState, email: "Invalid Email" }));
        flag = false;
      }
      if (formData.password.trim() === "") {
        setFormData(prevState => ({...prevState, password: "wrong Password"}));
        flag = false;
      }
      if(!flag){
        return;
      }
      const result = await loginAdmin(formData);
      if(result){
        console.log(result);
        notify();
        setTimeout(() => {
          navigate('/');
        }, 2000);
        return;
      }
      notify2()
      return;
      

  };
    
  return (
    <div className="app">
      <div className = "parent">
        <div className="main">
          <h1 className="heading">Login</h1>
          <div className="container">
          <div onClick={ () => navigate('/signUp')} className="signup">Sign Up</div>
            <div className="login">Log In</div>
          </div>
          <div className="form">
            <div className="field">
              <label className="label">Email</label>
              <input
                  className="input"
                  name="email"
                  style={{ color: formData.email === "Invalid Email" ? "red" : null }}
                  value={formData.email}
                  onChange={handleChange}
                  type={"email"}
              ></input>
            </div>

            <div className="field">
              <label className="label">Password</label>
              <input
                  className="input"
                  name="password"
                  style={{ color: formData.password === "wrong Password" ? "red" : null }}
                  value={formData.password}
                  onChange={handleChange}
                  type={"text"}
              ></input>
            </div>
            <div className="field">
              
              
              </div>
            <button onClick={handleSubmit} className="button">
                Login
            </button>

          </div>
        </div>
        <ToastContainer autoClose={2000}/>
      </div>
    </div>
  )
}

 export default Login
