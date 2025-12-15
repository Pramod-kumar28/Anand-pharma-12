import React, { useState } from 'react';
import Modal from './Modal';

const LoginModal = ({ 
    isOpen, 
    onClose, 
    onSwitchToSignup, 
    onSwitchToForgotPassword, 
    onLogin 
}) => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(formData);
        onClose();
    };

    return (
        <Modal 
            isOpen={isOpen} 
            onClose={onClose} 
            title="Login"
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                        autoFocus
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                    />
                </div>
                
                <div className="flex justify-between items-center">
                    <button 
                        type="button"
                        onClick={onSwitchToForgotPassword}
                        className="text-sm text-blue-600 hover:underline"
                    >
                        Forgot password?
                    </button>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                    Login to Account
                </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                <p className="text-gray-600">
                    Don't have an account?{" "}
                    <button 
                        type="button"
                        onClick={onSwitchToSignup}
                        className="text-blue-600 hover:underline font-semibold"
                    >
                        Sign up
                    </button>
                </p>
            </div>
        </Modal>
    );
};

export default LoginModal;