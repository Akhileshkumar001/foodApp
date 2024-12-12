import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; 
import { useCart, useDispatchCart } from '../component/ContextReducer';
import 'bootstrap/dist/css/bootstrap.min.css';

// import './MyCarts.css';

const Cart = () => {
    // const navigate=useNavigate()
    const cart = useCart();
    const dispatch = useDispatchCart();

    const handleRemove = (index) => {
        dispatch({ type: "REMOVE", index });
    };

    const handleClearCart = () => {
        dispatch({ type: "CLEAR" });
    };

    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    // const handleProceedToCheckout = () => {
    //     if (cart.length > 0) {
    //         navigate('/Order'); // Navigate to Order component
    //     } else {
    //         alert("Your cart is empty.");
    //     }
    // };

    return (
        <div className="container mt-5">
            <h1 className="text-center">Your Cart</h1>
            <div className="row justify-content-center">
                {cart.length === 0 ? (
                    <p className="text-center">Your cart is empty</p>
                ) : (
                    <div className="col-md-8">
                        <ul className="list-group mb-3">
                            {cart.map((item, index) => (
                                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                    <div>
                                        <h5>{item.name}</h5>
                                        <p>Size: {item.size}</p>
                                        <p>Quantity: {item.qty}</p>
                                    </div>
                                    <div>
                                        <span className="badge bg-primary rounded-pill">${item.price}</span>
                                        <button 
                                            className="btn btn-danger btn-sm ms-3" 
                                            onClick={() => handleRemove(index)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="d-flex justify-content-between">
                            <h5>Total Price: ${totalPrice}</h5>
                            <div>
                                <button 
                                    className="btn btn-warning me-3"
                                    onClick={handleClearCart}
                                >
                                    Clear Cart
                                </button>
                                <Link to="/Order">
                                    <button className="btn btn-success">Proceed to Checkout</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
