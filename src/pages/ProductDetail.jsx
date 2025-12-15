import React, { useState } from "react";

import { Routes, Route } from "react-router-dom";
import { useCart } from "../context/CartContext";

// Import your detail components
import AllDetail from "../pages/Detail/AllDetail";
import BabyCareDetail from "../pages/Detail/BabyCareDetail";
import CovidDetail from "../pages/Detail/CovidDetail";
import DiabetesCareDetail from "../pages/Detail/DiabetesCareDetail";
import ElderlyCareDetail from "../pages/Detail/ElderlyCareDetail";
import FirstAidDetail from "../pages/Detail/FirstAidDetail";
import HeartCareDetail from "../pages/Detail/HeartCareDetail";
import ImmunityDetail from "../pages/Detail/ImmunityDetail";
import LiverCareDetail from "../pages/Detail/LiverCareDetail";
import OralCareDetail from "../pages/Detail/OralCareDetail";
import PainReliefDetail from "../pages/Detail/PainReliefDetail";
import RespiratoryDetail from "../pages/Detail/RespiratoryDetail";
import StomachDetail from "../pages/Detail/StomachDetail";
import SexualHealthDetail from "../pages/Detail/SexualHealthDetail";
import SkinCareDetail from "../pages/Detail/SkinCareDetail";
import WomenHealthDetail from "../pages/Detail/WomenHealthDetail";

import Header from "../components/Header/Header";
import Footer from "../components/Header/Footer";

const ProductDetail = () => {
  const { cart = [], setShowCart } = useCart(); // Added default value for cart
  const [searchQuery, setSearchQuery] = useState("");
  const [showAccount, setShowAccount] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement your search logic here
    console.log("Searching for:", searchQuery);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
  };

  const clearCategory = () => {
    setSelectedCategory(null);
  };

  const handleScanClick = () => {
    // Implement scan functionality
    console.log("Scan clicked");
  };

  // Mock user data - replace with actual authentication
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    // Implement login logic
    setIsLoggedIn(true);
    setUser({ name: "John Doe", email: "john@example.com" });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setShowAccount(false);
  };

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: ""
  });

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Modal states
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

  return (
    <>
      <Header 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        clearSearch={clearSearch}
        searchResults={searchResults}
        selectedCategory={selectedCategory}
        clearCategory={clearCategory}
        cart={cart || []} // Ensure cart is always an array
        setShowCart={setShowCart}
        handleScanClick={handleScanClick}
        isLoggedIn={isLoggedIn}
        user={user}
        showAccount={showAccount}
        setShowAccount={setShowAccount}
        handleLogin={handleLogin}
        loginForm={loginForm}
        handleLoginInputChange={handleLoginInputChange}
        handleLogout={handleLogout}
        setShowLoginModal={setShowLoginModal}
        setShowSignupModal={setShowSignupModal}
        setShowForgotPasswordModal={setShowForgotPasswordModal}
      />
      <div className="mt-16">
        <Routes>
          {/* ALL DETAILS */}
          <Route path="AllDetail/:id" element={<AllDetail />} />

          {/* CATEGORY-WISE SPECIFIC DETAIL PAGES */}
          <Route path="BabyCareDetail/:id" element={<BabyCareDetail />} />
          <Route path="CovidDetail/:id" element={<CovidDetail />} />
          <Route path="DiabetesCareDetail/:id" element={<DiabetesCareDetail />} />
          <Route path="ElderlyCareDetail/:id" element={<ElderlyCareDetail />} />
          <Route path="FirstAidDetail/:id" element={<FirstAidDetail />} />
          <Route path="HeartCareDetail/:id" element={<HeartCareDetail />} />
          <Route path="ImmunityDetail/:id" element={<ImmunityDetail />} />
          <Route path="LiverCareDetail/:id" element={<LiverCareDetail />} />
          <Route path="OralCareDetail/:id" element={<OralCareDetail />} />
          <Route path="PainReliefDetail/:id" element={<PainReliefDetail />} />
          <Route path="RespiratoryDetail/:id" element={<RespiratoryDetail />} />
          <Route path="StomachDetail/:id" element={<StomachDetail />} />
          <Route path="SexualHealthDetail/:id" element={<SexualHealthDetail />} />
          <Route path="SkinCareDetail/:id" element={<SkinCareDetail />} />
          <Route path="WomenHealthDetail/:id" element={<WomenHealthDetail />} />
        </Routes>
      </div>
      <Footer/>
    </>
  );
};

export default ProductDetail;
