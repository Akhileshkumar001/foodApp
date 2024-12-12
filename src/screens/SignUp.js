// import React, { useState } from 'react';
// import { registerAdmin } from '../api/api';

// export default function SignUp() {
//     const [data, setData] = useState({
//         Name: "",
//         Email: "",
//         Password: ""
//     });

//     const handleOnChange = (e) => {
//         setData({ ...data, [e.target.name]: e.target.value });
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         console.log("Submitting user data:", data);
//         const result = await registerAdmin(data);
//         if (result) {
//             console.log("Registration successful:", result);
//         }
//     }

//     return (
//         <form onSubmit={handleSubmit}>
//             <div className="form-group">
//                 <label htmlFor="name">Name</label>
//                 <input 
//                     type="text" 
//                     className="form-control" 
//                     id="name" 
//                     name="Name" 
//                     value={data.Name} 
//                     onChange={handleOnChange} 
//                     placeholder="Enter Name" 
//                 />
//             </div>
//             <div className="form-group">
//                 <label htmlFor="email">Email address</label>
//                 <input 
//                     type="email" 
//                     className="form-control" 
//                     id="email" 
//                     name="Email" 
//                     value={data.Email} 
//                     onChange={handleOnChange} 
//                     placeholder="Enter email" 
//                 />
//             </div>
//             <div className="form-group">
//                 <label htmlFor="password">Password</label>
//                 <input 
//                     type="password" 
//                     className="form-control" 
//                     id="password" 
//                     name="Password" 
//                     value={data.Password} 
//                     onChange={handleOnChange} 
//                     placeholder="Password" 
//                 />
//             </div>
//             <div className="form-group form-check">
//                 <input 
//                     type="checkbox" 
//                     className="form-check-input" 
//                     id="exampleCheck1" 
//                 />
//                 <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
//             </div>
//             <button type="submit" className="btn btn-primary">Submit</button>
//         </form>
//     );
// }
   
import { useState } from 'react';
import { registerAdmin } from '../api/api';
import React from 'react';
import SignupStyle from './Signup.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  
  const notify = () => {
    toast.success("Signed Up successfully!", { position: "top-center" });
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    let flag = true;

    if (formData.name.trim() === "") {
      setFormData((prevState) => ({ ...prevState, name: "Invalid Name" }));
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
    if (formData.confirmPassword.trim() === "") {
      setFormData((prevState) => ({ ...prevState, confirmPassword: "Password doesn't match" }));
      flag = false;
    }

    if (formData.password !== formData.confirmPassword) {
      return;
    }

    if (!flag) {
      return;
    }

    const result = await registerAdmin(formData);
    if (result) {
      notify();
      setTimeout(() => {
        navigate('/lgoin');
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
                name="name"
                value={formData.name}
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
            <div className={SignupStyle.field}>
              <label className={SignupStyle.label}>Confirm Password</label>
              <input
                className={SignupStyle.input}
                name="confirmPassword"
                value={formData.confirmPassword}
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


// import React from 'react';
// import { useState } from 'react';
// import { registerAdmin } from '../api/api';
// import SignupStyle from './Signup.module.css';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate } from 'react-router-dom';


// function SignUp({ show, onClose }) {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const notify = () => {
//     toast.success("Signed Up successfully!", {
//       position: "top-center"
//     });
//   };

//   const handleChange = (event) => {
//     setFormData({ ...formData, [event.target.name]: event.target.value });
//   };

//   const handleSubmit = async () => {
//     let flag = true;

//     if (formData.name.trim() === "") {
//       setFormData(prevState => ({ ...prevState, name: "Invalid Name" }));
//       flag = false;
//     }
//     if (formData.email.trim() === "") {
//       setFormData(prevState => ({ ...prevState, email: "Invalid Email" }));
//       flag = false;
//     }
//     if (formData.password.trim() === "") {
//       setFormData(prevState => ({ ...prevState, password: "Weak Password" }));
//       flag = false;
//     }
//     if (formData.confirmPassword.trim() === "") {
//       setFormData(prevState => ({ ...prevState, confirmPassword: "Password doesn't match" }));
//       flag = false;
//     }
//     if (formData.password !== formData.confirmPassword) {
//       return;
//     }

//     if (!flag) {
//       return;
//     }

//     const result = await registerAdmin(formData);
//     if (result) {
//       notify();
//       setTimeout(() => {
//         navigate('/');
//         onClose();
//       }, 1500);
//     }
//   };

//   return (
//     <div className={`${SignupStyle.signupContainer} ${show ? SignupStyle.show : ''}`}>
//       <div className={SignupStyle.app}>
//         <div className={SignupStyle.parent}>
//           <div className={SignupStyle.main}>
//             <h1 className={SignupStyle.heading}>Sign Up</h1>
//             <div className={SignupStyle.form}>
//               <div className={SignupStyle.field}>
//                 <label className={SignupStyle.label}>Name</label>
//                 <input
//                   style={{ color: formData.name === "Invalid Name" ? "red" : null }}
//                   className={SignupStyle.input}
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   type="text"
//                 ></input>
//               </div>

//               <div className={SignupStyle.field}>
//                 <label className={SignupStyle.label}>Email</label>
//                 <input
//                   style={{ color: formData.email === "Invalid Email" ? "red" : null }}
//                   className={SignupStyle.input}
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   type="email"
//                 ></input>
//               </div>

//               <div className={SignupStyle.field}>
//                 <label className={SignupStyle.label}>Password</label>
//                 <input
//                   style={{ color: formData.password === "Weak Password" ? "red" : null }}
//                   className={SignupStyle.input}
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   type="text"
//                 ></input>
//               </div>

//               <div className={SignupStyle.field}>
//                 <label className={SignupStyle.label}>Confirm Password</label>
//                 <input
//                   style={{ color: formData.confirmPassword === "Password doesn't match" ? "red" : null }}
//                   className={SignupStyle.input}
//                   name="confirmPassword"
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                   type="text"
//                 ></input>
//               </div>

//               <button onClick={handleSubmit} className={SignupStyle.button}>
//                 SignUp
//               </button>
//             </div>
//           </div>
//           <ToastContainer autoClose={2000} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SignUp;
