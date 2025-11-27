// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// const Header = ({ 
//     searchQuery, 
//     setSearchQuery, 
//     handleSearch, 
//     clearSearch, 
//     searchResults, 
//     selectedCategory, 
//     clearCategory, 
//     cart, 
//     setShowCart, 
//     handleScanClick,
//     isLoggedIn,
//     user,
//     showAccount,
//     setShowAccount,
//     handleLogin,
//     loginForm,
//     handleLoginInputChange,
//     handleLogout,
//     setShowLoginModal,
//     setShowSignupModal,
//     setShowForgotPasswordModal
// }) => {
//     return (
//         <header className="fixed top-0 w-full bg-white shadow-sm z-40">
//             <div className="w-full px-4 py-4">
//                 <div className="flex items-center justify-between">
//                     {/* Logo */}
//                     <Link to="/">
//                         <div className="flex items-center gap-2">
//                             <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
//                                 <span className="text-white font-bold text-lg">A</span>
//                             </div>
//                             <span className="text-xl font-bold text-gray-800">
//                                 <span className="text-blue-600">Anand</span> Pharmacy
//                             </span>
//                         </div>
//                     </Link>

//                     {/* Search Bar - Desktop */}
//                     <div className="hidden md:flex flex-1 max-w-2xl mx-8">
//                         <div className="flex items-center bg-white rounded-full shadow-sm border overflow-hidden w-full">
//                             <input
//                                 type="text"
//                                 value={searchQuery}
//                                 onChange={(e) => setSearchQuery(e.target.value)}
//                                 className="flex-1 px-6 py-3 text-sm outline-none w-full"
//                                 placeholder="Search for medicines & healthcare products"
//                             />
//                             <button 
//                                 onClick={handleSearch}
//                                 className="bg-blue-600 text-white px-6 py-3 hover:bg-blue-700 transition flex items-center gap-2"
//                             >
//                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                                 </svg>
//                                 Search
//                             </button>
//                         </div>
//                     </div>

//                     {/* Right Icons */}
//                     <div className="flex items-center gap-4">
//                         {/* Scan Button */}
//                         <button 
//                             onClick={handleScanClick}
//                             className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition p-2 rounded-lg hover:bg-blue-50"
//                         >
//                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
//                             </svg>
//                             <span className="hidden md:block">Scan</span>
//                         </button>

//                         {/* Account Button */}
//                         <div className="relative">
//                             <button 
//                                 onClick={() => setShowAccount(!showAccount)}
//                                 className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition p-2 rounded-lg hover:bg-blue-50"
//                             >
//                                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                                 </svg>
//                                 <span className="hidden md:block">
//                                     {isLoggedIn ? user?.name : "Account"}
//                                 </span>
//                             </button>

//                             {/* Account Dropdown */}
//                             {showAccount && (
//                                 <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border z-50 overflow-hidden">
//                                     {isLoggedIn ? (
//                                         // Logged in state
//                                         <div className="p-4">
//                                             <div className="flex items-center gap-3 mb-4 p-3 bg-blue-50 rounded-lg">
//                                                 <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
//                                                     <span className="text-white font-bold text-lg">
//                                                         {user?.name?.charAt(0)}
//                                                     </span>
//                                                 </div>
//                                                 <div>
//                                                     <h3 className="font-semibold text-gray-800">{user?.name}</h3>
//                                                     <p className="text-sm text-gray-600">{user?.email}</p>
//                                                 </div>
//                                             </div>
//                                             <div className="space-y-1">
//                                                 <button className="w-full text-left px-4 py-3 hover:bg-gray-100 rounded-lg transition flex items-center gap-3">
//                                                     <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
//                                                     </svg>
//                                                     My Orders
//                                                 </button>
//                                                 <button className="w-full text-left px-4 py-3 hover:bg-gray-100 rounded-lg transition flex items-center gap-3">
//                                                     <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
//                                                         <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
//                                                     </svg>
//                                                     My Wishlist
//                                                 </button>
//                                                 <button className="w-full text-left px-4 py-3 hover:bg-gray-100 rounded-lg transition flex items-center gap-3">
//                                                     <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
//                                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                                                     </svg>
//                                                     Account Settings
//                                                 </button>
//                                                 <button 
//                                                     onClick={handleLogout}
//                                                     className="w-full text-left px-4 py-3 hover:bg-red-50 rounded-lg transition flex items-center gap-3 text-red-600"
//                                                 >
//                                                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//                                                     </svg>
//                                                     Logout
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     ) : (
//                                         // Login/Signup Options
//                                         <div className="p-4">
//                                             <div className="text-center mb-4">
//                                                 <h3 className="font-semibold text-gray-800 text-lg">Welcome!</h3>
//                                                 <p className="text-gray-600 text-sm">Login or create an account</p>
//                                             </div>
                                            
//                                             <div className="space-y-3">
//                                                 <button 
//                                                     onClick={() => {
//                                                         setShowAccount(false);
//                                                         setShowLoginModal(true);
//                                                     }}
//                                                     className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
//                                                 >
//                                                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
//                                                     </svg>
//                                                     Login
//                                                 </button>
                                                
//                                                 <button 
//                                                     onClick={() => {
//                                                         setShowAccount(false);
//                                                         setShowSignupModal(true);
//                                                     }}
//                                                     className="w-full border border-blue-600 text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 transition flex items-center justify-center gap-2"
//                                                 >
//                                                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
//                                                     </svg>
//                                                     Create Account
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     )}
//                                 </div>
//                             )}
//                         </div>
                        
//                         {/* Cart Button - FIXED LINE */}
//                         <button 
//                             onClick={() => setShowCart(true)}
//                             className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition p-2 rounded-lg hover:bg-blue-50 relative"
//                         >
//                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
//                             </svg>
//                             <span className="hidden md:block">Cart</span>
//                             {/* FIX: Added null check for cart */}
//                             {cart && cart.length > 0 && (
//                                 <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
//                                     {cart.reduce((total, item) => total + (item.quantity || 0), 0)}
//                                 </span>
//                             )}
//                         </button>
//                     </div>
//                 </div>

//                 {/* Mobile Search */}
//                 <div className="md:hidden mt-4">
//                     <div className="flex items-center gap-2">
//                         <button 
//                             onClick={handleScanClick}
//                             className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition p-2 rounded-lg hover:bg-blue-50"
//                         >
//                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
//                             </svg>
//                             <span>Scan</span>
//                         </button>
                        
//                         <form onSubmit={handleSearch} className="flex-1 flex items-center bg-white rounded-full shadow-sm border overflow-hidden">
//                             <input
//                                 type="text"
//                                 value={searchQuery}
//                                 onChange={(e) => setSearchQuery(e.target.value)}
//                                 className="flex-1 px-4 py-3 text-sm outline-none"
//                                 placeholder="Search medicines..."
//                             />
//                             <button 
//                                 type="submit"
//                                 className="bg-blue-600 text-white px-4 py-3 hover:bg-blue-700 transition flex items-center"
//                             >
//                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                                 </svg>
//                             </button>
//                         </form>
//                     </div>
//                 </div>

//                 {/* Search Results */}
//                 {searchResults && searchResults.length > 0 && (
//                     <div className="mt-4 p-4 bg-white rounded-lg shadow-lg border">
//                         <div className="flex justify-between items-center mb-3">
//                             <h3 className="font-semibold text-gray-800">Search Results</h3>
//                             <button onClick={clearSearch} className="text-sm text-blue-600 hover:underline flex items-center gap-1">
//                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                                 </svg>
//                                 Clear
//                             </button>
//                         </div>
//                         <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//                             {searchResults.map(item => (
//                                 <div key={item.id} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition">
//                                     <img src={item.img} alt={item.name} className="w-12 h-12 object-contain rounded" />
//                                     <div>
//                                         <p className="text-sm font-medium text-gray-800">{item.name}</p>
//                                         <p className="text-green-600 font-bold text-sm">{item.price}</p>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 )}

//                 {/* Selected Category */}
//                 {selectedCategory && (
//                     <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
//                         <div className="flex justify-between items-center">
//                             <div className="flex items-center gap-3">
//                                 <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
//                                     <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                                     </svg>
//                                 </div>
//                                 <h3 className="font-semibold text-gray-800">Browsing: {selectedCategory.name}</h3>
//                             </div>
//                             <button onClick={clearCategory} className="text-sm text-blue-600 hover:underline flex items-center gap-1">
//                                 View All
//                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                                 </svg>
//                             </button>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </header>
//     );
// };

// export default Header;







import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = ({
    searchQuery,
    setSearchQuery,
    handleSearch,
    clearSearch,
    searchResults,
    selectedCategory,
    clearCategory,
    cart,
    setShowCart,
    handleScanClick,
    isLoggedIn,
    user,
    showAccount,
    setShowAccount,
    handleLogin,
    loginForm,
    handleLoginInputChange,
    handleLogout,
    setShowLoginModal,
    setShowSignupModal,
    setShowForgotPasswordModal
}) => {
    const [showMobileSearch, setShowMobileSearch] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const toggleMobileSearch = () => {
        setShowMobileSearch(!showMobileSearch);
        setShowMobileMenu(false);
    };

    const toggleMobileMenu = () => {
        setShowMobileMenu(!showMobileMenu);
        setShowMobileSearch(false);
    };

    const closeAllMobileViews = () => {
        setShowMobileSearch(false);
        setShowMobileMenu(false);
        setShowAccount(false);
    };

    const handleMobileSearchSubmit = (e) => {
        if (e) {
            e.preventDefault();
        }
        handleSearch(e);
        setShowMobileSearch(false);
    };

    // Simple function for quick search
    const handleQuickSearch = (term) => {
        setSearchQuery(term);
        handleSearch({ preventDefault: () => { } });
        setShowMobileSearch(false);
    };

    return (
        <header className="fixed top-0 w-full bg-white shadow-sm z-40">
            <div className="w-full px-3 py-2 max-w-[100vw] overflow-hidden">
                {/* Main Header Row - Everything in one line */}
                <div className="flex items-center justify-between gap-2">
                    {/* Logo Section - Fixed width */}
                    <Link to="/" onClick={closeAllMobileViews} className="flex-shrink-0 min-w-0">
                        <div className="flex items-center gap-2 min-w-0">
                            {/* CEO Image - Hidden on mobile, shown on desktop */}
                            <div className="hidden md:flex items-center gap-2">
                                <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0">
                                    <img
                                        src="/assets/CEO.png"
                                        alt="CEO"
                                        className="w-10 h-10 object-cover object-top rounded-full"
                                    />
                                </div>
                                <div className="w-7 h-7 flex items-center justify-center flex-shrink-0">
                                    <img
                                        src="/assets/logo.png"
                                        alt="Anand Pharmacy Logo"
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            </div>

                            {/* Mobile View - Compact logo */}
                            <div className="flex md:hidden items-center gap-1 min-w-0">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0">
                                    <img
                                        src="/assets/CEO.png"
                                        alt="Anand Pharmacy Logo"
                                        className="w-8 h-8 object-cover object-top rounded-full"
                                    />
                                </div>
                                <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                                    <img
                                        src="/assets/logo.png"
                                        alt="Anand Pharmacy Logo"
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            </div>

                            {/* Brand Name */}
                            <div className="flex flex-col min-w-0">
                                <span className="text-base font-bold text-gray-800 whitespace-nowrap md:text-lg truncate">
                                    <span className="text-blue-600">Anand</span> Pharmacy
                                </span>
                                {/* Tagline - Hidden on mobile */}
                                <span className="md:block text-xs text-gray-500 whitespace-nowrap">
                                    Trusted Healthcare
                                </span>
                            </div>
                        </div>
                    </Link>

                    {/* Search Bar - Desktop - Flexible width */}
                    <div className="hidden md:flex flex-1 max-w-2xl mx-4 min-w-0">
                        <div className="flex items-center bg-white rounded-full shadow-sm border border-gray-300 overflow-hidden w-full">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="flex-1 px-4 py-2 text-sm outline-none w-full text-gray-700 placeholder-gray-500 min-w-0"
                                placeholder="Search for medicines & healthcare products"
                                onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
                            />
                            <button
                                onClick={handleSearch}
                                className="bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition flex items-center gap-2 whitespace-nowrap flex-shrink-0 font-medium text-sm"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                Search
                            </button>
                        </div>
                    </div>

                    {/* Right Icons Container - Fixed width */}
                    <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
                        {/* Mobile Search Button */}
                        <button
                            onClick={toggleMobileSearch}
                            className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition rounded-lg hover:bg-blue-50 flex-shrink-0"
                            aria-label="Search"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>

                        {/* Desktop Icons */}
                        <div className="hidden md:flex items-center gap-1">
                            {/* Scan Button */}
                            <button
                                onClick={handleScanClick}
                                className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition p-2 rounded-lg hover:bg-blue-50 whitespace-nowrap flex-shrink-0"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                                </svg>
                                <span className="text-md font-medium">Scan</span>
                            </button>

                            {/* Account Button */}
                            <div className="relative flex-shrink-0">
                                <button
                                    onClick={() => setShowAccount(!showAccount)}
                                    className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition p-2 rounded-lg hover:bg-blue-50 whitespace-nowrap flex-shrink-0"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    <span className="text-md font-medium truncate max-w-[80px]">{isLoggedIn ? user?.name : "Account"}</span>
                                </button>

                                {/* Account Dropdown */}
                                {showAccount && (
                                    <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
                                        {isLoggedIn ? (
                                            // Logged in state
                                            <div className="p-3">
                                                <div className="flex items-center gap-2 mb-3 p-2 bg-blue-50 rounded-lg">
                                                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                                                        <span className="text-white font-bold text-sm">
                                                            {user?.name?.charAt(0)}
                                                        </span>
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <h3 className="font-semibold text-gray-800 text-sm truncate">{user?.name}</h3>
                                                        <p className="text-xs text-gray-600 truncate">{user?.email}</p>
                                                    </div>
                                                </div>
                                                <div className="space-y-1">
                                                    <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg transition flex items-center gap-2 text-xs">
                                                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                                        </svg>
                                                        My Orders
                                                    </button>
                                                    <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg transition flex items-center gap-2 text-xs">
                                                        <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                                        </svg>
                                                        My Wishlist
                                                    </button>
                                                    <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg transition flex items-center gap-2 text-xs">
                                                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                        Account Settings
                                                    </button>
                                                    <button
                                                        onClick={handleLogout}
                                                        className="w-full text-left px-3 py-2 hover:bg-red-50 rounded-lg transition flex items-center gap-2 text-red-600 text-xs"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                        </svg>
                                                        Logout
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            // Login/Signup Options
                                            <div className="p-3">
                                                <div className="text-center mb-3">
                                                    <h3 className="font-semibold text-gray-800 text-sm">Welcome!</h3>
                                                    <p className="text-gray-600 text-xs">Login or create an account</p>
                                                </div>

                                                <div className="space-y-2">
                                                    <button
                                                        onClick={() => {
                                                            setShowAccount(false);
                                                            setShowLoginModal(true);
                                                        }}
                                                        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2 text-xs"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                                        </svg>
                                                        Login
                                                    </button>

                                                    <button
                                                        onClick={() => {
                                                            setShowAccount(false);
                                                            setShowSignupModal(true);
                                                        }}
                                                        className="w-full border border-blue-600 text-blue-600 py-2 rounded-lg font-semibold hover:bg-blue-50 transition flex items-center justify-center gap-2 text-xs"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                                        </svg>
                                                        Create Account
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Cart Button - Both mobile and desktop */}
                        <button
                            onClick={() => {
                                setShowCart(true);
                                closeAllMobileViews();
                            }}
                            className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition p-2 rounded-lg hover:bg-blue-50 relative whitespace-nowrap flex-shrink-0"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span className="hidden md:block text-md font-medium">Cart</span>
                            {cart && cart.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-semibold">
                                    {cart.reduce((total, item) => total + (item.quantity || 0), 0)}
                                </span>
                            )}
                        </button>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={toggleMobileMenu}
                            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition flex-shrink-0"
                            aria-label="Menu"
                        >
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Search Overlay */}
                {showMobileSearch && (
                    <div className="md:hidden fixed inset-0 bg-white z-50 top-0 left-0 right-0 bottom-0">
                        <div className="p-4 border-b border-gray-200">
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setShowMobileSearch(false)}
                                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <form onSubmit={handleMobileSearchSubmit} className="flex-1 flex items-center bg-gray-100 rounded-full overflow-hidden border border-gray-300">
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="flex-1 px-3 py-2 text-sm outline-none bg-transparent text-gray-700 min-w-0"
                                        placeholder="Search medicines..."
                                        autoFocus
                                    />
                                    <button
                                        type="submit"
                                        className="bg-blue-600 text-white px-3 py-2 hover:bg-blue-700 transition flex items-center flex-shrink-0"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Quick Search Suggestions */}
                        <div className="p-4">
                            <h3 className="font-semibold text-gray-800 text-xs mb-2">Popular Searches</h3>
                            <div className="flex flex-wrap gap-1">
                                {["Paracetamol", "Vitamin C", "Diabetes", "Blood Pressure", "Skin Care"].map((term, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleQuickSearch(term)}
                                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1.5 rounded-full text-xs transition flex-shrink-0"
                                    >
                                        {term}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Mobile Menu Overlay */}
                {showMobileMenu && (
                    <div className="md:hidden fixed inset-0 bg-white z-50 top-0 left-0 right-0 bottom-0 overflow-y-auto">
                        <div className="p-4 border-b border-gray-200">
                            <div className="flex justify-between items-center">
                                <button
                                    onClick={() => setShowMobileMenu(false)}
                                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className="p-4 space-y-1">
                            {/* User Info */}
                            {isLoggedIn ? (
                                <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg mb-3">
                                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-white font-bold text-sm">
                                            {user?.name?.charAt(0)}
                                        </span>
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <h3 className="font-semibold text-gray-800 text-sm truncate">{user?.name}</h3>
                                        <p className="text-xs text-gray-600 truncate">{user?.email}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="p-3 bg-gray-50 rounded-lg mb-3">
                                    <p className="text-gray-600 text-xs mb-2">Welcome! Login to access all features</p>
                                    <div className="flex gap-1">
                                        <button
                                            onClick={() => {
                                                setShowMobileMenu(false);
                                                setShowLoginModal(true);
                                            }}
                                            className="flex-1 bg-blue-600 text-white py-1.5 rounded-lg font-semibold text-xs"
                                        >
                                            Login
                                        </button>
                                        <button
                                            onClick={() => {
                                                setShowMobileMenu(false);
                                                setShowSignupModal(true);
                                            }}
                                            className="flex-1 border border-blue-600 text-blue-600 py-1.5 rounded-lg font-semibold text-xs"
                                        >
                                            Sign Up
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Menu Items */}
                            <Link
                                to="/"
                                onClick={() => setShowMobileMenu(false)}
                                className="w-full text-left px-3 py-2.5 hover:bg-gray-100 rounded-lg transition flex items-center gap-2 border-b text-sm"
                            >
                                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                Home
                            </Link>

                            <button className="w-full text-left px-3 py-2.5 hover:bg-gray-100 rounded-lg transition flex items-center gap-2 border-b text-sm">
                                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                My Orders
                            </button>

                            <button className="w-full text-left px-3 py-2.5 hover:bg-gray-100 rounded-lg transition flex items-center gap-2 border-b text-sm">
                                <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                </svg>
                                My Wishlist
                            </button>

                            <button
                                onClick={() => {
                                    handleScanClick();
                                    setShowMobileMenu(false);
                                }}
                                className="w-full text-left px-3 py-2.5 hover:bg-gray-100 rounded-lg transition flex items-center gap-2 border-b text-sm"
                            >
                                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                                </svg>
                                Scan Medicine
                            </button>

                            {isLoggedIn && (
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setShowMobileMenu(false);
                                    }}
                                    className="w-full text-left px-3 py-2.5 hover:bg-red-50 rounded-lg transition flex items-center gap-2 text-red-600 mt-2 text-sm"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    Logout
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {/* Search Results */}
                {searchResults && searchResults.length > 0 && (
                    <div className="mt-2 p-2 bg-white rounded-lg shadow-lg border border-gray-200 w-full max-w-full overflow-hidden">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-semibold text-gray-800 text-xs">Search Results</h3>
                            <button onClick={clearSearch} className="text-[10px] text-blue-600 hover:underline flex items-center gap-1 flex-shrink-0">
                                <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Clear
                            </button>
                        </div>
                        <div className="grid grid-cols-2 gap-1 w-full">
                            {searchResults.map(item => (
                                <div key={item.id} className="flex items-center gap-1 p-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition w-full overflow-hidden">
                                    <img src={item.img} alt={item.name} className="w-6 h-6 object-contain rounded flex-shrink-0" />
                                    <div className="flex-1 min-w-0 overflow-hidden">
                                        <p className="text-[10px] font-medium text-gray-800 truncate">{item.name}</p>
                                        <p className="text-green-600 font-bold text-[10px] truncate">{item.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Selected Category */}
                {selectedCategory && (
                    <div className="mt-2 p-2 bg-blue-50 rounded-lg border border-blue-200 w-full max-w-full overflow-hidden">
                        <div className="flex justify-between items-center w-full">
                            <div className="flex items-center gap-1 min-w-0 flex-1">
                                <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                                    <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="font-semibold text-gray-800 text-xs truncate flex-1">Browsing: {selectedCategory.name}</h3>
                            </div>
                            <button onClick={clearCategory} className="text-[10px] text-blue-600 hover:underline flex items-center gap-1 flex-shrink-0 ml-2">
                                View All
                                <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Backdrop for mobile overlays */}
            {(showMobileSearch || showMobileMenu) && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={closeAllMobileViews}
                />
            )}
        </header>
    );
};

export default Header;