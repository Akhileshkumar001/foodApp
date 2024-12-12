import React, { useState } from 'react';
import { useCart } from '../component/ContextReducer';
import { loadStripe } from '@stripe/stripe-js';
// import emptyCartImage from '../image'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Notification from '../component/Notification'; // Import the Notification component
import './Order.css'
const stripePromise = loadStripe('your-publishable-key-here'); // Replace with your Stripe public key

const Order = () => {
    const cart = useCart();
    const [customerInfo, setCustomerInfo] = useState({
        name: '',
        address: '',
        phone: '',
    });
    const [paymentMethod, setPaymentMethod] = useState('credit_card');
    const [notification, setNotification] = useState({
        message: '',
        show: false,
    });
    const stripe = useStripe();
    const elements = useElements();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomerInfo({ ...customerInfo, [name]: value });
    };

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const showNotification = (message) => {
        setNotification({
            message,
            show: true,
        });
    };

    const handleOrderSubmit = async (e) => {
        e.preventDefault();

        const currentTime = new Date();
        const orderCutoffTime = new Date();
        orderCutoffTime.setHours(23, 30, 0, 0); // Set cutoff time to 11:30 PM

        if (currentTime > orderCutoffTime) {
            showNotification('Sorry, we are not accepting orders after 11:30 PM.');
            return;
        }

        setNotification({ ...notification, show: false });

        if (!stripe || !elements) {
            return;
        }

        if (paymentMethod === 'credit_card') {
            const cardElement = elements.getElement(CardElement);

            const { error, paymentMethod: stripePaymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
                billing_details: {
                    name: customerInfo.name,
                    address: {
                        line1: customerInfo.address,
                    },
                    phone: customerInfo.phone,
                },
            });

            if (error) {
                showNotification(`Error: ${error.message}`);
            } else {
                console.log('Payment method created:', stripePaymentMethod);
                // Send stripePaymentMethod.id along with order data to your backend to complete payment and save the order
            }
        } else if (paymentMethod === 'paypal') {
            // Implement PayPal payment processing here
            console.log('Proceed with PayPal payment');
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">Order Summary</h1>
            <div className="row justify-content-center">
                {cart.length === 0 ? (
                    <div className="text-center">
                    <img src="https://img.freepik.com/premium-vector/take-away-semi-flat-illustrations-other-styles_1238412-46.jpg?w=740"
                    alt="Empty Cart" className="img-fluid mb-3" style={{ maxWidth: '35%', height: 'auto', margin: '0 auto', display: 'block' }}  />
                    <p>You haven't placed any order yet.</p>
                </div>
                    // <img src=''/>
                    // <p className="text-center">Your cart is empty</p>
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
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="mb-3">
                            <h5>Total Price: ${cart.reduce((total, item) => total + item.price, 0)}</h5>
                        </div>

                        {/* Notification Component */}
                        <Notification
                            message={notification.message}
                            show={notification.show}
                            onClose={() => setNotification({ ...notification, show: false })}
                        />

                        <form onSubmit={handleOrderSubmit}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    value={customerInfo.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="address" className="form-label">Address</label>
                                <textarea
                                    className="form-control"
                                    id="address"
                                    name="address"
                                    value={customerInfo.address}
                                    onChange={handleInputChange}
                                    required
                                ></textarea>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="phone" className="form-label">Phone Number</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="phone"
                                    name="phone"
                                    value={customerInfo.phone}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            {/* Payment Method Selection */}
                            <div className="mb-3">
                                <label className="form-label">Choose Payment Method</label>
                                <div>
                                    <input
                                        type="radio"
                                        id="credit_card"
                                        name="paymentMethod"
                                        value="credit_card"
                                        checked={paymentMethod === 'credit_card'}
                                        onChange={handlePaymentMethodChange}
                                    />
                                    <label htmlFor="credit_card" className="ms-2">Credit Card</label>
                                </div>
                                <div>
                                    <input
                                        type="radio"
                                        id="paypal"
                                        name="paymentMethod"
                                        value="paypal"
                                        checked={paymentMethod === 'paypal'}
                                        onChange={handlePaymentMethodChange}
                                    />
                                    <label htmlFor="paypal" className="ms-2">PayPal</label>
                                </div>
                                <div>
                                    <input
                                        type="radio"
                                        id="phone_pay"
                                        name="paymentMethod"
                                        value="phone_pay"
                                        checked={paymentMethod === 'phone_pay'}
                                        onChange={handlePaymentMethodChange}
                                    />
                                    <label htmlFor="phone_pay" className="ms-2">Phone Pay</label>
                                </div>
                            </div>

                            {paymentMethod === 'credit_card' && (
                                <div className="mb-3">
                                    <CardElement />
                                </div>
                            )}

                            <button type="submit" className="btn btn-primary" disabled={!stripe}>
                                Place Order
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default function OrderWrapper() {
    return (
        <Elements stripe={stripePromise}>
            <Order />
        </Elements>
    );
}
