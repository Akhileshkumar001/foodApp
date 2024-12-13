

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styles from './Navebar.module.css'; 

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate('/login');
  };

  return (
    <nav className={`${styles.navbar} navbar navbar-expand-lg sticky-top`}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/card">GoFood</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            {localStorage.getItem('token') && (
              <li className="nav-item">
                <Link className="nav-link active" to="/Order">My Orders</Link>
              </li>
            )}
          </ul>
          {!localStorage.getItem('token') ? (
            <div className='d-flex'>
              <Link className={`${styles.navLink} btn btn-outline-light`} to="/login">Login</Link>
              <Link className={`${styles.navLink} btn btn-outline-light ms-2`} to="/signUp">Sign Up</Link>
            </div>
          ) : (
            <div className='d-flex'>
              <Link className={`${styles.navLink} btn btn-outline-light`} to="/Cart">My Cart</Link>
              <Link className={`${styles.navLink} btn btn-outline-light ms-2`} to="/Search">Search</Link>
              <button className={`${styles.navLink} btn btn-outline-danger ms-2`} onClick={handleLogOut}>Log Out</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
