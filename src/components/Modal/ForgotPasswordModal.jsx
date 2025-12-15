import React, { useState } from 'react';
import Modal from './Modal';

const ForgotPasswordModal = ({ isOpen, onClose, onSwitchToLogin }) => {
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Reset password for:", email);
        alert(`Password reset link sent to ${email}`);
        onClose();
    };

    return (
        <Modal 
            isOpen={isOpen} 
            onClose={onClose} 
            title="Reset Password"
        >
            <p className="text-gray-600 mb-6">
                Enter your email address and we'll send you a link to reset your password.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                        autoFocus
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                    Send Reset Link
                </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                <button 
                    type="button"
                    onClick={onSwitchToLogin}
                    className="text-blue-600 hover:underline font-semibold"
                >
                    Back to Login
                </button>
            </div>
        </Modal>
    );
};

export default ForgotPasswordModal;