import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Footer from "./Header/Footer";
import Header from "./Header/Header";

// ArticleCard component
const ArticleCard = ({ article }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
            <img 
                src={article.img} 
                alt={article.title} 
                className="w-full h-48 object-cover" 
            />
            <div className="p-5">
                <h3 className="font-bold text-gray-800 mb-3">{article.title}</h3>
                
                {isExpanded && (
                    <div className="mb-4">
                        <ul className="space-y-2 text-sm text-gray-600">
                            {article.content.map((point, index) => (
                                <li key={index} className="flex items-start">
                                    <span className="mr-2">•</span>
                                    {point}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                
                <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>{article.readTime} read</span>
                    <button 
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-blue-600 font-semibold hover:text-blue-700 transition"
                    >
                        {isExpanded ? "Show Less" : "Read →"}
                    </button>
                </div>
            </div>
        </div>
    );
};

// Login Modal Component
const LoginModal = ({ isOpen, onClose, onLogin, onSwitchToSignup, onSwitchToForgotPassword }) => {
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

    if (!isOpen) return null;

    return (
        <>
            <div 
                className="fixed inset-0 bg-black bg-opacity-50 z-50"
                onClick={onClose}
            />
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-2xl z-50 p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Login to Your Account</h2>
                    <button 
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
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
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                        Login
                    </button>
                </form>

                <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                    <p className="text-gray-600">
                        Don't have an account?{" "}
                        <button 
                            onClick={onSwitchToSignup}
                            className="text-blue-600 hover:underline font-semibold"
                        >
                            Sign up
                        </button>
                    </p>
                </div>
            </div>
        </>
    );
};

// Signup Modal Component
const SignupModal = ({ isOpen, onClose, onSwitchToLogin }) => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle signup logic here
        alert('Account created successfully!');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <>
            <div 
                className="fixed inset-0 bg-black bg-opacity-50 z-50"
                onClick={onClose}
            />
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-2xl z-50 p-6 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
                    <button 
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter your phone number"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Create a password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm your password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                        Create Account
                    </button>
                </form>

                <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                    <p className="text-gray-600">
                        Already have an account?{" "}
                        <button 
                            onClick={onSwitchToLogin}
                            className="text-blue-600 hover:underline font-semibold"
                        >
                            Login
                        </button>
                    </p>
                </div>
            </div>
        </>
    );
};

// Forgot Password Modal Component
const ForgotPasswordModal = ({ isOpen, onClose, onSwitchToLogin }) => {
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle forgot password logic here
        alert(`Password reset link sent to ${email}`);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <>
            <div 
                className="fixed inset-0 bg-black bg-opacity-50 z-50"
                onClick={onClose}
            />
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-2xl z-50 p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Reset Password</h2>
                    <button 
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <p className="text-gray-600 mb-6">
                    Enter your email address and we'll send you a link to reset your password.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Send Reset Link
                    </button>
                </form>

                <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                    <button 
                        onClick={onSwitchToLogin}
                        className="text-blue-600 hover:underline font-semibold"
                    >
                        Back to Login
                    </button>
                </div>
            </div>
        </>
    );
};

// Updated categories with proper routes
const categories = [
    { 
        id: 1, 
        name: "Baby Care", 
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5ZvMQ7HT0UmsmyhOGHAbeeInlMSBjCwf7kA&s", 
        color: "bg-yellow-50",
        route: "/home/baby-care"
    },
    { 
        id: 2, 
        name: "Heart Care", 
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKnxObqnyN8HnUIffYl808uGkEwa9fbh5UbA&s", 
        color: "bg-red-50",
        route: "/home/cardiac-care"
    },
    { 
        id: 3, 
        name: "Stomach Care", 
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR_dH_SNfBSSZUdlH675sha6QFgolAxulcFg&s", 
        color: "bg-orange-50",
        route: "/home/stomach-care"
    },
    { 
        id: 4, 
        name: "Oral Care", 
        img: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&h=300&fit=crop", 
        color: "bg-teal-50",
        route: "/home/oral-care"
    },
    { 
        id: 5, 
        name: "Skin Care", 
        img: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&h=300&fit=crop", 
        color: "bg-pink-50",
        route: "/home/skin-care"
    },
    { 
        id: 6, 
        name: "Diabetes Care", 
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfU724WziCECcMlN7gul2LnygLtSXX_fgndQ&s", 
        color: "bg-green-50",
        route: "/home/diabetes-care"
    },
    { 
        id: 7, 
        name: "Liver Care", 
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXUxw0e8FBrXQMu4EpHlNgw4PQT60_JQK4sA&s", 
        color: "bg-purple-50",
        route: "/home/liver-care"
    },
    { 
        id: 8, 
        name: "Pain Relief", 
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG30-R18oPHkLVtWgBeYlnTrU2sYWYh37TTw&s", 
        color: "bg-blue-50",
        route: "/home/pain-relief"
    }
];

const popularItems = [
    { id: 1, name: "Paracetamol 650mg", mrp: "₹30", price: "₹28", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdKy95SWXBLbsWHBUSFqZxML9vh9G72J8_hA&s", badge: "16% OFF", prescription: false },
    { id: 2, name: "M Torr 800 Capsule 10", mrp: "₹324.79", price: "₹259.83", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwb8u_E-sV8Vno520RhiBrQT17v7FF7ImIpg&s", badge: "20% OFF", prescription: true },
    { id: 3, name: "A To Z Woman Capsule 15", mrp: "₹383.52", price: "₹306.82", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4mnv1fq3Ckz9uR83cAq4DoCTGy2AdgJ9mpw&s", badge: "20% OFF", prescription: false },
    { id: 4, name: "Naturolax Powder 300gm", mrp: "₹486", price: "₹403.87", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf5bOvFV7BW4ffSZ3-Bnqw_mKT24STHGq43g&s", badge: "17% OFF", prescription: true },
    { id: 5, name: "Reffron Tablet 15", mrp: "₹347.03", price: "₹277.62", img: "data:image/jpeg;base64,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", badge: "20% OFF", prescription: true }
];

// Main LandingPage component
export default function LandingPage() {
    const navigate = useNavigate();
    const [openFaq, setOpenFaq] = useState(null);
    const [cart, setCart] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("Deliver to");
    const [wishlist, setWishlist] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [uploadedPrescription, setUploadedPrescription] = useState(null);
    const [showAccount, setShowAccount] = useState(false);
    const [showScan, setShowScan] = useState(false);
    
    // Modal states
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignupModal, setShowSignupModal] = useState(false);
    const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
    
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    const faqs = [
        {
            q: "Do you provide express delivery for medicines?",
            a: "Yes! Anand Pharmacy offers fast doorstep delivery for all medicines and wellness items."
        },
        {
            q: "Is a prescription required for ordering medicines?",
            a: "Prescription is required only for prescription drugs. OTC and wellness items do not require one."
        },
        {
            q: "Do you sell genuine and verified products?",
            a: "Absolutely. We source directly from licensed distributors and verified pharmaceutical companies."
        },
        {
            q: "Can I track my order in real-time?",
            a: "Yes, once your order is confirmed, you can track it from the Orders section."
        },
        {
            q: "Do you offer 24/7 customer support?",
            a: "Our support team is available from 8 AM – 11 PM daily to assist you."
        }
    ];

    // Functionality functions
    const addToCart = (item) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
            if (existingItem) {
                return prevCart.map(cartItem =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            } else {
                return [...prevCart, { ...item, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (itemId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== itemId));
    };

    const updateCartQuantity = (itemId, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(itemId);
            return;
        }
        setCart(prevCart =>
            prevCart.map(item =>
                item.id === itemId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const toggleWishlist = (item) => {
        setWishlist(prev => {
            const isInWishlist = prev.find(wishItem => wishItem.id === item.id);
            if (isInWishlist) {
                return prev.filter(wishItem => wishItem.id !== item.id);
            } else {
                return [...prev, item];
            }
        });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            const results = popularItems.filter(item => 
                item.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setSearchResults(results);
        }
    };

    const scrollPopularItems = (direction) => {
        const container = document.getElementById('popular-items-container');
        if (container) {
            const scrollAmount = 300;
            container.scrollBy({
                left: direction === 'right' ? scrollAmount : -scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    // UPDATED: Category click handler with navigation
    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        // Navigate to the category page
        navigate(category.route);
    };

    const handleUploadPrescription = () => {
        setUploadedPrescription({
            name: "prescription.jpg",
            date: new Date().toLocaleDateString()
        });
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUploadedPrescription({
                name: file.name,
                date: new Date().toLocaleDateString()
            });
        }
    };

    const clearSearch = () => {
        setSearchQuery("");
        setSearchResults([]);
    };

    const clearCategory = () => {
        setSelectedCategory(null);
        setSearchResults([]);
    };

    const getCartTotal = () => {
        if (!cart || cart.length === 0) return 0;
        return cart.reduce((total, item) => {
            const price = parseInt(item.price.replace('₹', '').replace(',', ''));
            return total + (price * (item.quantity || 1));
        }, 0);
    };

    const handleScanClick = () => {
        setShowScan(true);
    };

    const handleLogin = (formData) => {
        if (formData.email && formData.password) {
            setIsLoggedIn(true);
            setUser({
                name: "John Doe",
                email: formData.email
            });
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUser(null);
        setShowAccount(false);
    };

    const handleSwitchToSignup = () => {
        setShowLoginModal(false);
        setShowSignupModal(true);
    };

    const handleSwitchToLogin = () => {
        setShowSignupModal(false);
        setShowForgotPasswordModal(false);
        setShowLoginModal(true);
    };

    const handleSwitchToForgotPassword = () => {
        setShowLoginModal(false);
        setShowForgotPasswordModal(true);
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">
            {/* Header */}
            <Header 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleSearch={handleSearch}
                clearSearch={clearSearch}
                searchResults={searchResults}
                selectedCategory={selectedCategory}
                clearCategory={clearCategory}
                handleCategoryClick={handleCategoryClick}
                handleScanClick={handleScanClick}
                showAccount={showAccount}
                setShowAccount={setShowAccount}
                isLoggedIn={isLoggedIn}
                user={user}
                handleLogout={handleLogout}
                setShowLoginModal={setShowLoginModal}
                setShowSignupModal={setShowSignupModal}
                cart={cart}
                setShowCart={setShowCart}
            />

            {/* Modals */}
            <LoginModal 
                isOpen={showLoginModal}
                onClose={() => setShowLoginModal(false)}
                onLogin={handleLogin}
                onSwitchToSignup={handleSwitchToSignup}
                onSwitchToForgotPassword={handleSwitchToForgotPassword}
            />

            <SignupModal 
                isOpen={showSignupModal}
                onClose={() => setShowSignupModal(false)}
                onSwitchToLogin={handleSwitchToLogin}
            />

            <ForgotPasswordModal 
                isOpen={showForgotPasswordModal}
                onClose={() => setShowForgotPasswordModal(false)}
                onSwitchToLogin={handleSwitchToLogin}
            />

            {/* ====== SCAN MODAL ====== */}
            {showScan && (
                <>
                    <div 
                        className="fixed inset-0 bg-black bg-opacity-50 z-50"
                        onClick={() => setShowScan(false)}
                    />
                    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-2xl z-50 p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-gray-800">Scan Medicine</h3>
                            <button 
                                onClick={() => setShowScan(false)}
                                className="p-2 hover:bg-gray-100 rounded-full transition"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="text-center">
                            <div className="w-64 h-64 mx-auto bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                                <span className="text-4xl">📷</span>
                            </div>
                            <p className="text-gray-600 mb-4">Point your camera at the medicine barcode to scan</p>
                            <div className="flex gap-3">
                                <button 
                                    onClick={() => setShowScan(false)}
                                    className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
                                >
                                    Cancel
                                </button>
                                <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                                    Take Photo
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* ====== CART SIDEBAR ====== */}
            {showCart && (
                <>
                    <div 
                        className="fixed inset-0 bg-black bg-opacity-50 z-50"
                        onClick={() => setShowCart(false)}
                    />
                    <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col">
                        <div className="flex items-center justify-between p-6 border-b">
                            <h3 className="text-xl font-bold text-gray-800">Your Cart</h3>
                            <button 
                                onClick={() => setShowCart(false)}
                                className="p-2 hover:bg-gray-100 rounded-full transition"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6">
                            {(!cart || cart.length === 0) ? (
                                <div className="text-center py-12">
                                    <div className="text-6xl mb-4">🛒</div>
                                    <h4 className="text-gray-600 mb-2">Your cart is empty</h4>
                                    <p className="text-gray-500 text-sm">Add some medicines to get started</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {cart.map((item) => (
                                        <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                                            <img 
                                                src={item.img} 
                                                alt={item.name} 
                                                className="w-16 h-16 object-contain rounded-lg bg-gray-50"
                                            />
                                            <div className="flex-1">
                                                <h4 className="font-medium text-gray-800 text-sm">{item.name}</h4>
                                                <p className="text-green-600 font-bold">{item.price}</p>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <button 
                                                        onClick={() => updateCartQuantity(item.id, (item.quantity || 1) - 1)}
                                                        className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="w-8 text-center">{item.quantity || 1}</span>
                                                    <button 
                                                        onClick={() => updateCartQuantity(item.id, (item.quantity || 1) + 1)}
                                                        className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                            <button 
                                                onClick={() => removeFromCart(item.id)}
                                                className="p-2 text-red-500 hover:bg-red-50 rounded-full transition"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {cart && cart.length > 0 && (
                            <div className="border-t p-6 space-y-4">
                                <div className="flex justify-between items-center text-lg font-semibold">
                                    <span>Total:</span>
                                    <span>₹{getCartTotal()}</span>
                                </div>
                                <button className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition">
                                    Proceed to Checkout
                                </button>
                                <button 
                                    onClick={() => setShowCart(false)}
                                    className="w-full border border-gray-300 text-gray-700 py-4 rounded-lg font-semibold hover:bg-gray-50 transition"
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        )}
                    </div>
                </>
            )}

            {/* ====== PAGE BODY ====== */}
            <main className="pt-28">
                <div className="w-full px-4 md:px-6 lg:px-8">

                    {/* ====== HERO SECTION ====== */}
                    <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl p-8 md:p-12 mb-10 overflow-hidden">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-32 translate-x-32"></div>
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-24 -translate-x-24"></div>
                        </div>
                        
                        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <motion.div 
                                className="flex flex-col gap-6"
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                                    Your Health, <br />
                                    <span className="text-blue-200">Our Priority</span>
                                </h1>
                                <p className="text-blue-100 text-lg md:text-xl">Fast, reliable medicine delivery with expert care</p>

                                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                                    

                                    <div className="flex-1 min-w-0">
                                        <form onSubmit={handleSearch} className="flex items-center bg-white rounded-full shadow-lg overflow-hidden">
                                            <input 
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                className="flex-1 px-6 py-4 text-sm outline-none w-full text-gray-800" 
                                                placeholder="Search for medicines & healthcare products" 
                                            />
                                            <button 
                                                type="submit"
                                                className="bg-blue-500 text-white px-8 py-4 rounded-full m-1 flex-shrink-0 hover:bg-blue-400 transition"
                                            >
                                                Search
                                            </button>
                                        </form>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-4 mt-4">
                                    {[ "🛡️ 100% Genuine", "💊 Expert Advice"].map((feature, index) => (
                                        <motion.div
                                            key={index}
                                            className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.2 + 0.5 }}
                                        >
                                            {feature}
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            <motion.div 
                                className="flex justify-center"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                <div className="relative w-full h-full">
                                    
                                    <img 
                                        src="https://images.unsplash.com/photo-1580281657529-557a6abb6387?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBoYXJtYWNpc3R8ZW58MHx8MHx8fDA%3D" 
                                        alt="Healthcare Professional" 
                                        className="relative w-full  rounded-2xl shadow-2xl" 
                                    />
                                </div>
                            </motion.div>
                        </div>
                    </section>

                    {/* ====== CATEGORIES ====== */}
                    <section className="mb-14">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-3xl font-bold text-gray-800">Shop by Categories</h2>
                            <button 
                                className="text-blue-600 hover:underline font-medium"
                                onClick={() => navigate('/home')}
                            >
                                View all
                            </button>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                            {categories.map((category, index) => (
                                <motion.button
                                    key={category.id}
                                    className={`p-4 rounded-2xl flex flex-col items-center justify-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${
                                        selectedCategory?.id === category.id 
                                            ? 'bg-blue-100 border-2 border-blue-500 shadow-lg' 
                                            : `${category.color} hover:bg-blue-50`
                                    }`}
                                    onClick={() => handleCategoryClick(category)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <div className="w-full h-32 mb-4 overflow-hidden rounded-xl">
                                        <img 
                                            src={category.img} 
                                            alt={category.name} 
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
                                        />
                                    </div>
                                    <div className="text-center font-semibold text-gray-700 text-sm md:text-base">
                                        {category.name}
                                    </div>
                                    {selectedCategory?.id === category.id && (
                                        <motion.div 
                                            className="mt-2 text-xs text-blue-600 font-semibold"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                        >
                                            ✓ Selected
                                        </motion.div>
                                    )}
                                </motion.button>
                            ))}
                        </div>
                    </section>

                    {/* ====== UPLOAD PRESCRIPTION ====== */}
                    <section className="mb-14 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-8 text-white">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <h2 className="text-3xl font-bold mb-4">Upload Prescription</h2>
                                <p className="text-green-100 mb-6 text-lg">Get your prescribed medicines delivered safely to your doorstep</p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button 
                                        className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center gap-2"
                                        onClick={handleUploadPrescription}
                                    >
                                        <span>📄</span> Upload Now
                                    </button>
                                    <button className="border border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition">
                                        Learn More
                                    </button>
                                </div>
                                {uploadedPrescription && (
                                    <motion.div 
                                        className="mt-4 p-4 bg-white/20 backdrop-blur-sm rounded-lg"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                    >
                                        <p className="text-white text-sm">
                                            ✅ Prescription uploaded: {uploadedPrescription.name}
                                        </p>
                                        <p className="text-green-100 text-xs">Uploaded on {uploadedPrescription.date}</p>
                                    </motion.div>
                                )}
                            </motion.div>
                            <motion.div 
                                className="flex justify-center"
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl w-full max-w-xs">
                                    <div className="border-2 border-dashed border-white/30 rounded-xl p-8 text-center">
                                        <div className="text-5xl mb-4">📄</div>
                                        <p className="text-white/80 text-sm mb-4">Upload prescription image</p>
                                        <input 
                                            type="file" 
                                            id="prescription-upload"
                                            className="hidden"
                                            onChange={handleFileUpload}
                                            accept="image/*"
                                        />
                                        <label 
                                            htmlFor="prescription-upload"
                                            className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition cursor-pointer inline-block"
                                        >
                                            Browse Files
                                        </label>
                                        {uploadedPrescription && (
                                            <p className="mt-3 text-xs text-green-200">File selected: {uploadedPrescription.name}</p>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </section>

                    {/* ====== POPULAR ITEMS ====== */}
                    <section className="mb-14">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-3xl font-bold text-gray-800">Popular Items</h2>
                            <button 
                                className="text-blue-600 hover:underline font-medium"
                                onClick={() => setSearchResults(popularItems)}
                            >
                                View all
                            </button>
                        </div>

                        <div className="relative">
                            <button 
                                onClick={() => scrollPopularItems('left')}
                                className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition"
                            >
                                ←
                            </button>

                            <div 
                                id="popular-items-container"
                                className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide scroll-smooth px-2"
                                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                            >
                                {popularItems.map((item, index) => (
                                    <motion.div 
                                        key={item.id}
                                        className="min-w-[280px] bg-white rounded-2xl shadow-sm p-6 flex-shrink-0 border border-gray-100 hover:shadow-lg transition-all duration-300 relative"
                                        whileHover={{ y: -5 }}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <button 
                                            onClick={() => toggleWishlist(item)}
                                            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-red-50 transition"
                                        >
                                            {wishlist.find(wishItem => wishItem.id === item.id) ? "❤️" : "🤍"}
                                        </button>

                                        <div className="relative mb-5">
                                            <div className="absolute top-3 left-3 bg-green-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
                                                {item.badge}
                                            </div>
                                            {item.prescription && (
                                                <div className="absolute top-3 right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                                    📋 Prescription
                                                </div>
                                            )}
                                            <img 
                                                src={item.img} 
                                                alt={item.name} 
                                                className="h-40 w-full object-contain rounded-xl bg-gray-50 p-4" 
                                            />
                                        </div>
                                        
                                        <h3 className="text-base font-semibold text-gray-800 mb-3 line-clamp-2 min-h-[2.5rem] leading-tight">
                                            {item.name}
                                        </h3>
                                        
                                        <div className="mb-5">
                                            <div className="text-gray-400 text-sm line-through">{item.mrp}</div>
                                            <div className="text-xl font-bold text-gray-800">{item.price}</div>
                                        </div>
                                        
                                        <button 
                                            onClick={() => addToCart(item)}
                                            className="w-full bg-blue-600 text-white border border-blue-600 rounded-xl py-3 text-sm font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
                                        >
                                            <span>🛒</span> Add to Cart
                                        </button>
                                    </motion.div>
                                ))}
                            </div>

                            <button 
                                onClick={() => scrollPopularItems('right')}
                                className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition"
                            >
                                →
                            </button>
                        </div>
                    </section>

                    {/* ====== WHY CHOOSE US ====== */}
                    <section className="mb-14 bg-white rounded-2xl p-8 shadow-sm">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Anand Pharmacy?</h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">We're committed to providing the best healthcare experience with genuine products and expert service</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { icon: "🛡️", title: "100% Genuine", desc: "Licensed & verified pharmaceutical products" },
                                { icon: "🚚", title: "Fast Delivery", desc: "2-hour delivery in most urban areas" },
                                { icon: "💳", title: "Secure Payment", desc: "SSL encrypted transactions for safety" },
                                { icon: "🏥", title: "Expert Support", desc: "24/7 pharmacist consultation available" },
                                { icon: "💰", title: "Best Prices", desc: "Competitive pricing with regular discounts" },
                                { icon: "📱", title: "Easy Ordering", desc: "Simple app and website interface" },
                                { icon: "🔒", title: "Data Privacy", desc: "Your health data is completely secure" },
                                { icon: "⭐", title: "Trusted", desc: "Serving customers for over 15 years" }
                            ].map((item, idx) => (
                                <motion.div 
                                    key={idx}
                                    className="text-center p-6 bg-gray-50 rounded-xl hover:bg-blue-50 transition-all duration-300 hover:shadow-md"
                                    whileHover={{ scale: 1.05 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                >
                                    <div className="text-4xl mb-4">{item.icon}</div>
                                    <h3 className="font-bold text-gray-800 mb-3 text-lg">{item.title}</h3>
                                    <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    {/* ====== HEALTH ARTICLES ====== */}
                    <section className="mb-14">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-3xl font-bold text-gray-800">Health & Wellness Tips</h2>
                            <button className="text-blue-600 hover:underline font-medium">
                                View all articles
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { 
                                    title: "5 Ways to Boost Immunity", 
                                    img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop", 
                                    readTime: "3 min",
                                    content: [
                                        "1. Eat a balanced diet rich in fruits and vegetables",
                                        "2. Get adequate sleep (7-9 hours per night)",
                                        "3. Exercise regularly to boost circulation",
                                        "4. Stay hydrated with plenty of water",
                                        "5. Manage stress through meditation or yoga"
                                    ]
                                },
                                { 
                                    title: "Managing Diabetes Naturally", 
                                    img: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=400&h=250&fit=crop", 
                                    readTime: "5 min",
                                    content: [
                                        "• Monitor blood sugar levels regularly",
                                        "• Follow a low-glycemic index diet",
                                        "• Include fiber-rich foods in your meals",
                                        "• Engage in daily physical activity",
                                        "• Maintain a healthy weight",
                                        "• Get regular health check-ups"
                                    ]
                                },
                                { 
                                    title: "Seasonal Allergy Relief", 
                                    img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop", 
                                    readTime: "4 min",
                                    content: [
                                        "Keep windows closed during high pollen days",
                                        "Use air purifiers with HEPA filters",
                                        "Shower after being outdoors",
                                        "Wear sunglasses to protect eyes",
                                        "Consider over-the-counter antihistamines",
                                        "Consult doctor for persistent symptoms"
                                    ]
                                }
                            ].map((article, idx) => (
                                <ArticleCard key={idx} article={article} />
                            ))}
                        </div>
                    </section>

                    {/* ====== FAQ ====== */}
                    <section className="mb-14">
                        <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
                            Frequently Asked Questions
                        </h2>

                        <div className="space-y-4 max-w-4xl mx-auto">
                            {faqs.map((item, index) => (
                                <motion.div
                                    key={index}
                                    className="border border-gray-200 rounded-2xl p-6 bg-white shadow-sm cursor-pointer hover:shadow-md transition-all duration-300"
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                    whileHover={{ scale: 1.02 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-lg font-semibold text-gray-800 pr-4">{item.q}</h3>
                                        <span className="text-xl text-gray-600 font-medium flex-shrink-0">
                                            {openFaq === index ? "−" : "+"}
                                        </span>
                                    </div>

                                    {openFaq === index && (
                                        <motion.p 
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            className="mt-4 text-gray-600 leading-relaxed border-t border-gray-100 pt-4"
                                        >
                                            {item.a}
                                        </motion.p>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    {/* ====== DOWNLOAD APP ====== */}
                    <section className="mb-14 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <h2 className="text-3xl font-bold mb-4">Get the App</h2>
                                <p className="mb-6 text-blue-100 text-lg">Order medicines faster with our mobile app. Get exclusive app-only discounts and health tracking features!</p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center justify-center gap-3">
                                        <span className="text-2xl">📱</span>
                                        <div className="text-left">
                                            <div className="text-xs">GET IT ON</div>
                                            <div className="text-lg font-bold">Google Play</div>
                                        </div>
                                    </button>
                                    <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center justify-center gap-3">
                                        <span className="text-2xl">📱</span>
                                        <div className="text-left">
                                            <div className="text-xs">Download on the</div>
                                            <div className="text-lg font-bold">App Store</div>
                                        </div>
                                    </button>
                                </div>
                            </motion.div>
                            <motion.div 
                                className="flex justify-center"
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-sm">
                                    <img 
                                        src="https://cdn-icons-png.flaticon.com/512/4711/4711986.png" 
                                        alt="App Preview" 
                                        className="w-64 h-64 object-contain" 
                                    />
                                </div>
                            </motion.div>
                        </div>
                    </section>
                </div>
            </main>
            <Footer/>
        </div>
    );
}