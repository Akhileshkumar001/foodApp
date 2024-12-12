import React, { useState } from 'react';
import './ContectUs.css';
import foodV from '../image/foodvideo.mp4';
import { submitContactForm } from '../api/api';
// import { Link } from 'react-router-dom';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        howDidYouFindUs: '',
        message: '',
        termsAccepted: false,
    });

    const [formErrors, setFormErrors] = useState({});
    const [formSubmitted, setFormSubmitted] = useState(false);

    // Handle form input change
    const handleInputChange = (e) => {
        const { name, value, checked, type } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    // Validate form inputs
    const validateForm = () => {
        const errors = {};
        if (!formData.name.trim()) errors.name = 'Name is required';
        if (!formData.email.trim()) errors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
        if (!formData.howDidYouFindUs) errors.howDidYouFindUs = 'Please select how you found us';
        if (!formData.message.trim()) errors.message = 'Message is required';
        if (!formData.termsAccepted) errors.termsAccepted = 'You must accept the terms and conditions';
        return errors;
    };

    // Handle form submission
    const handleSubmit = async(e) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
            setFormSubmitted(true);
            try {
                await submitContactForm(formData);
                setFormSubmitted(true);
            } catch (error) {
                console.log("Error submitting form:", error);
                setFormErrors({ global: 'An error occurred while submitting the form' });
            }

            // Perform form submission or send data to backend here
            console.log('Form submitted:', formData);
        } else {
            setFormErrors(errors);
        }
    };

    return (
        <div className='contactCard'>
            <div className='h1Box'>
                <h1 className='h1'>CONTACT US</h1>
                <div className="line"></div>
            </div>

            <div className="cDetail">
                <div className="videoBox">
                    <video src={foodV} className="video" muted='muted' type='video/mp4' loop autoPlay />
                </div>

                <div className="contactInfo">
                    {formSubmitted ? (
                        <div className="alert alert-success">Thank you! Your message has been sent.</div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className="entry">
                                <div className="entry-text">Name</div>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                                {formErrors.name && <small className="text-danger">{formErrors.name}</small>}
                            </div>

                            <div className="entry">
                                <div className="entry-text">Email</div>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your Email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                                {formErrors.email && <small className="text-danger">{formErrors.email}</small>}
                            </div>

                            <div className="entry">
                                <div className="entry-text">How did you find us</div>
                                <select
                                    name="howDidYouFindUs"
                                    className="select"
                                    value={formData.howDidYouFindUs}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Select an option</option>
                                    <option value="friends">Friends</option>
                                    <option value="search">Search</option>
                                    <option value="advertisement">Advertisement</option>
                                    <option value="other">Other</option>
                                </select>
                                {formErrors.howDidYouFindUs && <small className="text-danger">{formErrors.howDidYouFindUs}</small>}
                            </div>

                            <div className="textBox">
                                <div className="entry-text">Drop us a line</div>
                                <textarea
                                    name="message"
                                    placeholder="Your Message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                ></textarea>
                                {formErrors.message && <small className="text-danger">{formErrors.message}</small>}
                            </div>

                            <div className="checkbox">
                                <input
                                    type="checkbox"
                                    name="termsAccepted"
                                    className="checkbox"
                                    checked={formData.termsAccepted}
                                    onChange={handleInputChange}
                                />
                                <span className="checkbox-conditions">
                                    I have read and agree with all the Privacy Policy and Terms Conditions
                                </span>
                                {formErrors.termsAccepted && <small className="text-danger">{formErrors.termsAccepted}</small>}
                            </div>

                            <div className="sendBtn">
                                <button type="submit" className="btn-full form-button">SEND</button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Contact;
