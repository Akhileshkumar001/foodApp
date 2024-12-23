import './App.css'; 
import Home from './screens/Home';
import Login from './screens/Login';
import SignUp from './screens/SignUp.js';
import Search from './screens/Search.js';
import { CartProvider } from './component/ContextReducer';
import 'bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from 'react';
import Cart from './screens/MyCart.js';
import Order from './screens/Order.js';
import Card from './component/Cardss.js';


function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/signUp' element={<SignUp />} />
            <Route exact path='/Cart' element={<Cart/>}  />
            <Route exact path='/Search' element={<Search/>}  />
            <Route exact path='/Order' element={<Order/>}  />
            <Route exact path='/card' element={<Card/>}/>
            
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
