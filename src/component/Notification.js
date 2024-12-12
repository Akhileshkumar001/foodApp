// components/Notification.js
import React from 'react';

const Notification = ({ message, show, onClose }) => {
    return (
        show && (
            <div className="alert alert-warning alert-dismissible fade show" role="alert">
                {message}
                <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
            </div>
        )
    );
};

export default Notification;
