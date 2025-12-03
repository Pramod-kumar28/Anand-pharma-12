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
//     const [showMobileSearch, setShowMobileSearch] = useState(false);
//     const [showMobileMenu, setShowMobileMenu] = useState(false);

//     const toggleMobileSearch = () => {
//         setShowMobileSearch(!showMobileSearch);
//         setShowMobileMenu(false);
//     };

//     const toggleMobileMenu = () => {
//         setShowMobileMenu(!showMobileMenu);
//         setShowMobileSearch(false);
//     };

//     const closeAllMobileViews = () => {
//         setShowMobileSearch(false);
//         setShowMobileMenu(false);
//         setShowAccount(false);
//     };

//     const handleMobileSearchSubmit = (e) => {
//         if (e) {
//             e.preventDefault();
//         }
//         handleSearch(e);
//         setShowMobileSearch(false);
//     };

//     // Simple function for quick search
//     const handleQuickSearch = (term) => {
//         setSearchQuery(term);
//         handleSearch({ preventDefault: () => { } });
//         setShowMobileSearch(false);
//     };

//     return (
//         <header className="fixed top-0 w-full bg-white shadow-sm z-40">
//             <div className="w-full px-3 py-2 max-w-[100vw] overflow-hidden">
//                 {/* Main Header Row - Everything in one line */}
//                 <div className="flex items-center justify-between gap-2">
//                     {/* Logo Section - Fixed width */}
//                     <Link to="/" onClick={closeAllMobileViews} className="flex-shrink-0 min-w-0">
//                         <div className="flex items-center gap-2 min-w-0">
//                             {/* CEO Image - Hidden on mobile, shown on desktop */}
//                             <div className="hidden md:flex items-center gap-2">
//                                 <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0">
//                                     <img
//                                         src="/assets/CEO.png"
//                                         alt="CEO"
//                                         className="w-10 h-10 object-cover object-top rounded-full"
//                                     />
//                                 </div>
//                                 <div className="w-7 h-7 flex items-center justify-center flex-shrink-0">
//                                     <img
//                                         src="/assets/logo.png"
//                                         alt="Anand Pharmacy Logo"
//                                         className="w-full h-full object-contain"
//                                     />
//                                 </div>
//                             </div>

//                             {/* Mobile View - Compact logo */}
//                             <div className="flex md:hidden items-center gap-1 min-w-0">
//                                 <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0">
//                                     <img
//                                         src="/assets/CEO.png"
//                                         alt="Anand Pharmacy Logo"
//                                         className="w-8 h-8 object-cover object-top rounded-full"
//                                     />
//                                 </div>
//                                 <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
//                                     <img
//                                         src="/assets/logo.png"
//                                         alt="Anand Pharmacy Logo"
//                                         className="w-full h-full object-contain"
//                                     />
//                                 </div>
//                             </div>

//                             {/* Brand Name */}
//                             <div className="flex flex-col min-w-0">
//                                 <span className="text-base font-bold text-gray-800 whitespace-nowrap md:text-lg truncate">
//                                     <span className="text-blue-600">Anand</span> Pharmacy
//                                 </span>
//                                 {/* Tagline - Hidden on mobile */}
//                                 <span className="md:block text-xs text-gray-500 whitespace-nowrap">
//                                     Trusted Healthcare
//                                 </span>
//                             </div>
//                         </div>
//                     </Link>

//                     {/* Search Bar - Desktop - Flexible width */}
//                     <div className="hidden md:flex flex-1 max-w-2xl mx-4 min-w-0">
//                         <div className="flex items-center bg-white rounded-full shadow-sm border border-gray-300 overflow-hidden w-full">
//                             <input
//                                 type="text"
//                                 value={searchQuery}
//                                 onChange={(e) => setSearchQuery(e.target.value)}
//                                 className="flex-1 px-4 py-2 text-sm outline-none w-full text-gray-700 placeholder-gray-500 min-w-0"
//                                 placeholder="Search for medicines & healthcare products"
//                                 onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
//                             />
//                             <button
//                                 onClick={handleSearch}
//                                 className="bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition flex items-center gap-2 whitespace-nowrap flex-shrink-0 font-medium text-sm"
//                             >
//                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                                 </svg>
//                                 Search
//                             </button>
//                         </div>
//                     </div>

//                     {/* Right Icons Container - Fixed width */}
//                     <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
//                         {/* Mobile Search Button */}
//                         <button
//                             onClick={toggleMobileSearch}
//                             className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition rounded-lg hover:bg-blue-50 flex-shrink-0"
//                             aria-label="Search"
//                         >
//                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                             </svg>
//                         </button>

//                         {/* Desktop Icons */}
//                         <div className="hidden md:flex items-center gap-1">
//                             {/* Scan Button */}
//                             <button
//                                 onClick={handleScanClick}
//                                 className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition p-2 rounded-lg hover:bg-blue-50 whitespace-nowrap flex-shrink-0"
//                             >
//                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
//                                 </svg>
//                                 <span className="text-md font-medium">Scan</span>
//                             </button>

//                             {/* Account Button */}
//                             <div className="relative flex-shrink-0">
//                                 <button
//                                     onClick={() => setShowAccount(!showAccount)}
//                                     className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition p-2 rounded-lg hover:bg-blue-50 whitespace-nowrap flex-shrink-0"
//                                 >
//                                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                                     </svg>
//                                     <span className="text-md font-medium truncate max-w-[80px]">{isLoggedIn ? user?.name : "Account"}</span>
//                                 </button>

//                                 {/* Account Dropdown */}
//                                 {showAccount && (
//                                     <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
//                                         {isLoggedIn ? (
//                                             // Logged in state
//                                             <div className="p-3">
//                                                 <div className="flex items-center gap-2 mb-3 p-2 bg-blue-50 rounded-lg">
//                                                     <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
//                                                         <span className="text-white font-bold text-sm">
//                                                             {user?.name?.charAt(0)}
//                                                         </span>
//                                                     </div>
//                                                     <div className="min-w-0 flex-1">
//                                                         <h3 className="font-semibold text-gray-800 text-sm truncate">{user?.name}</h3>
//                                                         <p className="text-xs text-gray-600 truncate">{user?.email}</p>
//                                                     </div>
//                                                 </div>
//                                                 <div className="space-y-1">
//                                                     <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg transition flex items-center gap-2 text-xs">
//                                                         <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
//                                                         </svg>
//                                                         My Orders
//                                                     </button>
//                                                     <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg transition flex items-center gap-2 text-xs">
//                                                         <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
//                                                             <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
//                                                         </svg>
//                                                         My Wishlist
//                                                     </button>
//                                                     <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg transition flex items-center gap-2 text-xs">
//                                                         <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
//                                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                                                         </svg>
//                                                         Account Settings
//                                                     </button>
//                                                     <button
//                                                         onClick={handleLogout}
//                                                         className="w-full text-left px-3 py-2 hover:bg-red-50 rounded-lg transition flex items-center gap-2 text-red-600 text-xs"
//                                                     >
//                                                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//                                                         </svg>
//                                                         Logout
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                         ) : (
//                                             // Login/Signup Options
//                                             <div className="p-3">
//                                                 <div className="text-center mb-3">
//                                                     <h3 className="font-semibold text-gray-800 text-sm">Welcome!</h3>
//                                                     <p className="text-gray-600 text-xs">Login or create an account</p>
//                                                 </div>

//                                                 <div className="space-y-2">
//                                                     <button
//                                                         onClick={() => {
//                                                             setShowAccount(false);
//                                                             setShowLoginModal(true);
//                                                         }}
//                                                         className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2 text-xs"
//                                                     >
//                                                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
//                                                         </svg>
//                                                         Login
//                                                     </button>

//                                                     <button
//                                                         onClick={() => {
//                                                             setShowAccount(false);
//                                                             setShowSignupModal(true);
//                                                         }}
//                                                         className="w-full border border-blue-600 text-blue-600 py-2 rounded-lg font-semibold hover:bg-blue-50 transition flex items-center justify-center gap-2 text-xs"
//                                                     >
//                                                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
//                                                         </svg>
//                                                         Create Account
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                         )}
//                                     </div>
//                                 )}
//                             </div>
//                         </div>

//                         {/* Cart Button - Both mobile and desktop */}
//                         <button
//                             onClick={() => {
//                                 setShowCart(true);
//                                 closeAllMobileViews();
//                             }}
//                             className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition p-2 rounded-lg hover:bg-blue-50 relative whitespace-nowrap flex-shrink-0"
//                         >
//                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
//                             </svg>
//                             <span className="hidden md:block text-md font-medium">Cart</span>
//                             {cart && cart.length > 0 && (
//                                 <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-semibold">
//                                     {cart.reduce((total, item) => total + (item.quantity || 0), 0)}
//                                 </span>
//                             )}
//                         </button>

//                         {/* Mobile Menu Button */}
//                         <button
//                             onClick={toggleMobileMenu}
//                             className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition flex-shrink-0"
//                             aria-label="Menu"
//                         >
//                             <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//                             </svg>
//                         </button>
//                     </div>
//                 </div>

//                 {/* Mobile Search Overlay */}
//                 {showMobileSearch && (
//                     <div className="md:hidden fixed inset-0 bg-white z-50 top-0 left-0 right-0 bottom-0">
//                         <div className="p-4 border-b border-gray-200">
//                             <div className="flex items-center gap-2">
//                                 <button
//                                     onClick={() => setShowMobileSearch(false)}
//                                     className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition"
//                                 >
//                                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                                     </svg>
//                                 </button>
//                                 <form onSubmit={handleMobileSearchSubmit} className="flex-1 flex items-center bg-gray-100 rounded-full overflow-hidden border border-gray-300">
//                                     <input
//                                         type="text"
//                                         value={searchQuery}
//                                         onChange={(e) => setSearchQuery(e.target.value)}
//                                         className="flex-1 px-3 py-2 text-sm outline-none bg-transparent text-gray-700 min-w-0"
//                                         placeholder="Search medicines..."
//                                         autoFocus
//                                     />
//                                     <button
//                                         type="submit"
//                                         className="bg-blue-600 text-white px-3 py-2 hover:bg-blue-700 transition flex items-center flex-shrink-0"
//                                     >
//                                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                                         </svg>
//                                     </button>
//                                 </form>
//                             </div>
//                         </div>

//                         {/* Quick Search Suggestions */}
//                         <div className="p-4">
//                             <h3 className="font-semibold text-gray-800 text-xs mb-2">Popular Searches</h3>
//                             <div className="flex flex-wrap gap-1">
//                                 {["Paracetamol", "Vitamin C", "Diabetes", "Blood Pressure", "Skin Care"].map((term, index) => (
//                                     <button
//                                         key={index}
//                                         onClick={() => handleQuickSearch(term)}
//                                         className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1.5 rounded-full text-xs transition flex-shrink-0"
//                                     >
//                                         {term}
//                                     </button>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 {/* Mobile Menu Overlay */}
//                 {showMobileMenu && (
//                     <div className="md:hidden fixed inset-0 bg-white z-50 top-0 left-0 right-0 bottom-0 overflow-y-auto">
//                         <div className="p-4 border-b border-gray-200">
//                             <div className="flex justify-between items-center">
//                                 <button
//                                     onClick={() => setShowMobileMenu(false)}
//                                     className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition"
//                                 >
//                                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                                     </svg>
//                                 </button>
//                             </div>
//                         </div>

//                         <div className="p-4 space-y-1">
//                             {/* User Info */}
//                             {isLoggedIn ? (
//                                 <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg mb-3">
//                                     <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
//                                         <span className="text-white font-bold text-sm">
//                                             {user?.name?.charAt(0)}
//                                         </span>
//                                     </div>
//                                     <div className="min-w-0 flex-1">
//                                         <h3 className="font-semibold text-gray-800 text-sm truncate">{user?.name}</h3>
//                                         <p className="text-xs text-gray-600 truncate">{user?.email}</p>
//                                     </div>
//                                 </div>
//                             ) : (
//                                 <div className="p-3 bg-gray-50 rounded-lg mb-3">
//                                     <p className="text-gray-600 text-xs mb-2">Welcome! Login to access all features</p>
//                                     <div className="flex gap-1">
//                                         <button
//                                             onClick={() => {
//                                                 setShowMobileMenu(false);
//                                                 setShowLoginModal(true);
//                                             }}
//                                             className="flex-1 bg-blue-600 text-white py-1.5 rounded-lg font-semibold text-xs"
//                                         >
//                                             Login
//                                         </button>
//                                         <button
//                                             onClick={() => {
//                                                 setShowMobileMenu(false);
//                                                 setShowSignupModal(true);
//                                             }}
//                                             className="flex-1 border border-blue-600 text-blue-600 py-1.5 rounded-lg font-semibold text-xs"
//                                         >
//                                             Sign Up
//                                         </button>
//                                     </div>
//                                 </div>
//                             )}

//                             {/* Menu Items */}
//                             <Link
//                                 to="/"
//                                 onClick={() => setShowMobileMenu(false)}
//                                 className="w-full text-left px-3 py-2.5 hover:bg-gray-100 rounded-lg transition flex items-center gap-2 border-b text-sm"
//                             >
//                                 <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
//                                 </svg>
//                                 Home
//                             </Link>

//                             <button className="w-full text-left px-3 py-2.5 hover:bg-gray-100 rounded-lg transition flex items-center gap-2 border-b text-sm">
//                                 <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
//                                 </svg>
//                                 My Orders
//                             </button>

//                             <button className="w-full text-left px-3 py-2.5 hover:bg-gray-100 rounded-lg transition flex items-center gap-2 border-b text-sm">
//                                 <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
//                                     <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
//                                 </svg>
//                                 My Wishlist
//                             </button>

//                             <button
//                                 onClick={() => {
//                                     handleScanClick();
//                                     setShowMobileMenu(false);
//                                 }}
//                                 className="w-full text-left px-3 py-2.5 hover:bg-gray-100 rounded-lg transition flex items-center gap-2 border-b text-sm"
//                             >
//                                 <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
//                                 </svg>
//                                 Scan Medicine
//                             </button>

//                             {isLoggedIn && (
//                                 <button
//                                     onClick={() => {
//                                         handleLogout();
//                                         setShowMobileMenu(false);
//                                     }}
//                                     className="w-full text-left px-3 py-2.5 hover:bg-red-50 rounded-lg transition flex items-center gap-2 text-red-600 mt-2 text-sm"
//                                 >
//                                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//                                     </svg>
//                                     Logout
//                                 </button>
//                             )}
//                         </div>
//                     </div>
//                 )}

//                 {/* Search Results */}
//                 {searchResults && searchResults.length > 0 && (
//                     <div className="mt-2 p-2 bg-white rounded-lg shadow-lg border border-gray-200 w-full max-w-full overflow-hidden">
//                         <div className="flex justify-between items-center mb-2">
//                             <h3 className="font-semibold text-gray-800 text-xs">Search Results</h3>
//                             <button onClick={clearSearch} className="text-[10px] text-blue-600 hover:underline flex items-center gap-1 flex-shrink-0">
//                                 <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                                 </svg>
//                                 Clear
//                             </button>
//                         </div>
//                         <div className="grid grid-cols-2 gap-1 w-full">
//                             {searchResults.map(item => (
//                                 <div key={item.id} className="flex items-center gap-1 p-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition w-full overflow-hidden">
//                                     <img src={item.img} alt={item.name} className="w-6 h-6 object-contain rounded flex-shrink-0" />
//                                     <div className="flex-1 min-w-0 overflow-hidden">
//                                         <p className="text-[10px] font-medium text-gray-800 truncate">{item.name}</p>
//                                         <p className="text-green-600 font-bold text-[10px] truncate">{item.price}</p>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 )}

//                 {/* Selected Category */}
//                 {selectedCategory && (
//                     <div className="mt-2 p-2 bg-blue-50 rounded-lg border border-blue-200 w-full max-w-full overflow-hidden">
//                         <div className="flex justify-between items-center w-full">
//                             <div className="flex items-center gap-1 min-w-0 flex-1">
//                                 <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
//                                     <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                                     </svg>
//                                 </div>
//                                 <h3 className="font-semibold text-gray-800 text-xs truncate flex-1">Browsing: {selectedCategory.name}</h3>
//                             </div>
//                             <button onClick={clearCategory} className="text-[10px] text-blue-600 hover:underline flex items-center gap-1 flex-shrink-0 ml-2">
//                                 View All
//                                 <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                                 </svg>
//                             </button>
//                         </div>
//                     </div>
//                 )}
//             </div>

//             {/* Backdrop for mobile overlays */}
//             {(showMobileSearch || showMobileMenu) && (
//                 <div
//                     className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
//                     onClick={closeAllMobileViews}
//                 />
//             )}
//         </header>
//     );
// };

// export default Header;






















// import React, { useState, useEffect, useRef } from "react";
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
//     handleLogout,
//     setShowLoginModal,
//     setShowSignupModal,
//     setShowForgotPasswordModal
// }) => {
//     const [showMobileSearch, setShowMobileSearch] = useState(false);
//     const [showMobileMenu, setShowMobileMenu] = useState(false);
//     const [showAccount, setShowAccount] = useState(false);
    
//     const accountRef = useRef(null);

//     // Close all mobile views
//     const closeAllMobileViews = () => {
//         setShowMobileSearch(false);
//         setShowMobileMenu(false);
//         setShowAccount(false);
//     };

//     // Toggle mobile search
//     const toggleMobileSearch = () => {
//         setShowMobileSearch(!showMobileSearch);
//         setShowMobileMenu(false);
//         setShowAccount(false);
//     };

//     // Toggle mobile menu
//     const toggleMobileMenu = () => {
//         setShowMobileMenu(!showMobileMenu);
//         setShowMobileSearch(false);
//         setShowAccount(false);
//     };

//     // Toggle account modal - SIMPLE VERSION
//     const handleAccountClick = () => {
//         console.log("Account button clicked, current state:", showAccount);
//         setShowAccount(prev => !prev);
//     };

//     // Handle click outside
//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (accountRef.current && !accountRef.current.contains(event.target)) {
//                 setShowAccount(false);
//             }
//         };

//         document.addEventListener("mousedown", handleClickOutside);
//         return () => {
//             document.removeEventListener("mousedown", handleClickOutside);
//         };
//     }, []);

//     const handleMobileSearchSubmit = (e) => {
//         if (e) {
//             e.preventDefault();
//         }
//         handleSearch(e);
//         setShowMobileSearch(false);
//     };

//     const handleQuickSearch = (term) => {
//         setSearchQuery(term);
//         handleSearch({ preventDefault: () => { } });
//         setShowMobileSearch(false);
//     };

//     // Account modal actions
//     const handleAccountLogin = () => {
//         setShowAccount(false);
//         setShowLoginModal(true);
//     };

//     const handleAccountSignup = () => {
//         setShowAccount(false);
//         setShowSignupModal(true);
//     };

//     return (
//         <header className="fixed top-0 w-full bg-white shadow-sm z-50">
//             <div className="w-full px-3 py-2 max-w-[100vw] overflow-hidden">
//                 {/* Main Header Row */}
//                 <div className="flex items-center justify-between gap-2">
//                     {/* Logo Section */}
//                     <Link to="/" onClick={closeAllMobileViews} className="flex-shrink-0 min-w-0">
//                         <div className="flex items-center gap-2 min-w-0">
//                             <div className="hidden md:flex items-center gap-2">
//                                 <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0">
//                                     <img
//                                         src="/assets/CEO.png"
//                                         alt="CEO"
//                                         className="w-10 h-10 object-cover object-top rounded-full"
//                                     />
//                                 </div>
//                                 <div className="w-7 h-7 flex items-center justify-center flex-shrink-0">
//                                     <img
//                                         src="/assets/logo.png"
//                                         alt="Anand Pharmacy Logo"
//                                         className="w-full h-full object-contain"
//                                     />
//                                 </div>
//                             </div>

//                             <div className="flex md:hidden items-center gap-1 min-w-0">
//                                 <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0">
//                                     <img
//                                         src="/assets/CEO.png"
//                                         alt="Anand Pharmacy Logo"
//                                         className="w-8 h-8 object-cover object-top rounded-full"
//                                     />
//                                 </div>
//                                 <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
//                                     <img
//                                         src="/assets/logo.png"
//                                         alt="Anand Pharmacy Logo"
//                                         className="w-full h-full object-contain"
//                                     />
//                                 </div>
//                             </div>

//                             <div className="flex flex-col min-w-0">
//                                 <span className="text-base font-bold text-gray-800 whitespace-nowrap md:text-lg truncate">
//                                     <span className="text-blue-600">Anand</span> Pharmacy
//                                 </span>
//                                 <span className="hidden md:block text-xs text-gray-500 whitespace-nowrap">
//                                     Trusted Healthcare
//                                 </span>
//                             </div>
//                         </div>
//                     </Link>

//                     {/* Search Bar - Desktop */}
//                     <div className="hidden md:flex flex-1 max-w-2xl mx-4 min-w-0">
//                         <div className="flex items-center bg-white rounded-full shadow-sm border border-gray-300 overflow-hidden w-full">
//                             <input
//                                 type="text"
//                                 value={searchQuery}
//                                 onChange={(e) => setSearchQuery(e.target.value)}
//                                 className="flex-1 px-4 py-2 text-sm outline-none w-full text-gray-700 placeholder-gray-500 min-w-0"
//                                 placeholder="Search for medicines & healthcare products"
//                                 onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
//                             />
//                             <button
//                                 onClick={handleSearch}
//                                 className="bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition flex items-center gap-2 whitespace-nowrap flex-shrink-0 font-medium text-sm"
//                             >
//                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                                 </svg>
//                                 Search
//                             </button>
//                         </div>
//                     </div>

//                     {/* Right Icons Container */}
//                     <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
//                         {/* Mobile Search Button */}
//                         <button
//                             onClick={toggleMobileSearch}
//                             className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition rounded-lg hover:bg-blue-50 flex-shrink-0"
//                         >
//                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                             </svg>
//                         </button>

//                         {/* Desktop Icons */}
//                         <div className="hidden md:flex items-center gap-1">
//                             {/* Scan Button */}
//                             <button
//                                 onClick={handleScanClick}
//                                 className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition p-2 rounded-lg hover:bg-blue-50 whitespace-nowrap flex-shrink-0"
//                             >
//                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
//                                 </svg>
//                                 <span className="text-md font-medium">Scan</span>
//                             </button>

//                             {/* Account Button - SIMPLIFIED */}
//                             <div className="relative" ref={accountRef}>
//                                 <button
//                                     onClick={handleAccountClick}
//                                     className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition p-2 rounded-lg hover:bg-blue-50 whitespace-nowrap flex-shrink-0"
//                                 >
//                                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                                     </svg>
//                                     <span className="text-md font-medium truncate max-w-[80px]">
//                                         {isLoggedIn ? (user?.name || "Account") : "Account"}
//                                     </span>
//                                 </button>

//                                 {/* Account Dropdown */}
//                                 {showAccount && (
//                                     <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-200 z-50">
//                                         {isLoggedIn ? (
//                                             <div className="p-3">
//                                                 <div className="flex items-center gap-2 mb-3 p-2 bg-blue-50 rounded-lg">
//                                                     <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
//                                                         <span className="text-white font-bold text-sm">
//                                                             {user?.name?.charAt(0) || "U"}
//                                                         </span>
//                                                     </div>
//                                                     <div className="min-w-0 flex-1">
//                                                         <h3 className="font-semibold text-gray-800 text-sm truncate">{user?.name || "User"}</h3>
//                                                         <p className="text-xs text-gray-600 truncate">{user?.email || ""}</p>
//                                                     </div>
//                                                 </div>
//                                                 <div className="space-y-1">
//                                                     <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg transition flex items-center gap-2 text-xs">
//                                                         <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
//                                                         </svg>
//                                                         My Orders
//                                                     </button>
//                                                     <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg transition flex items-center gap-2 text-xs">
//                                                         <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
//                                                             <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
//                                                         </svg>
//                                                         My Wishlist
//                                                     </button>
//                                                     <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg transition flex items-center gap-2 text-xs">
//                                                         <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
//                                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                                                         </svg>
//                                                         Account Settings
//                                                     </button>
//                                                     <button
//                                                         onClick={() => {
//                                                             handleLogout();
//                                                             setShowAccount(false);
//                                                         }}
//                                                         className="w-full text-left px-3 py-2 hover:bg-red-50 rounded-lg transition flex items-center gap-2 text-red-600 text-xs"
//                                                     >
//                                                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//                                                         </svg>
//                                                         Logout
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                         ) : (
//                                             <div className="p-3">
//                                                 <div className="text-center mb-3">
//                                                     <h3 className="font-semibold text-gray-800 text-sm">Welcome!</h3>
//                                                     <p className="text-gray-600 text-xs">Login or create an account</p>
//                                                 </div>
//                                                 <div className="space-y-2">
//                                                     <button
//                                                         onClick={handleAccountLogin}
//                                                         className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2 text-xs"
//                                                     >
//                                                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
//                                                         </svg>
//                                                         Login
//                                                     </button>
//                                                     <button
//                                                         onClick={handleAccountSignup}
//                                                         className="w-full border border-blue-600 text-blue-600 py-2 rounded-lg font-semibold hover:bg-blue-50 transition flex items-center justify-center gap-2 text-xs"
//                                                     >
//                                                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
//                                                         </svg>
//                                                         Create Account
//                                                     </button>
//                                                 </div>
//                                                 <div className="mt-3 pt-3 border-t border-gray-200">
//                                                     <button
//                                                         onClick={() => {
//                                                             setShowAccount(false);
//                                                             setShowForgotPasswordModal(true);
//                                                         }}
//                                                         className="w-full text-center text-blue-600 hover:underline text-xs"
//                                                     >
//                                                         Forgot Password?
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                         )}
//                                     </div>
//                                 )}
//                             </div>
//                         </div>

//                         {/* Cart Button */}
//                         <button
//                             onClick={() => {
//                                 setShowCart(true);
//                                 closeAllMobileViews();
//                             }}
//                             className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition p-2 rounded-lg hover:bg-blue-50 relative whitespace-nowrap flex-shrink-0"
//                         >
//                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
//                             </svg>
//                             <span className="hidden md:block text-md font-medium">Cart</span>
//                             {cart && cart.length > 0 && (
//                                 <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-semibold">
//                                     {cart.reduce((total, item) => total + (item.quantity || 0), 0)}
//                                 </span>
//                             )}
//                         </button>

//                         {/* Mobile Menu Button */}
//                         <button
//                             onClick={toggleMobileMenu}
//                             className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition flex-shrink-0"
//                         >
//                             <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//                             </svg>
//                         </button>
//                     </div>
//                 </div>

//                 {/* Mobile Search Overlay */}
//                 {showMobileSearch && (
//                     <div className="md:hidden fixed inset-0 bg-white z-50 top-0 left-0 right-0 bottom-0">
//                         <div className="p-4 border-b border-gray-200">
//                             <div className="flex items-center gap-2">
//                                 <button
//                                     onClick={() => setShowMobileSearch(false)}
//                                     className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition"
//                                 >
//                                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                                     </svg>
//                                 </button>
//                                 <form onSubmit={handleMobileSearchSubmit} className="flex-1 flex items-center bg-gray-100 rounded-full overflow-hidden border border-gray-300">
//                                     <input
//                                         type="text"
//                                         value={searchQuery}
//                                         onChange={(e) => setSearchQuery(e.target.value)}
//                                         className="flex-1 px-3 py-2 text-sm outline-none bg-transparent text-gray-700 min-w-0"
//                                         placeholder="Search medicines..."
//                                         autoFocus
//                                     />
//                                     <button
//                                         type="submit"
//                                         className="bg-blue-600 text-white px-3 py-2 hover:bg-blue-700 transition flex items-center flex-shrink-0"
//                                     >
//                                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                                         </svg>
//                                     </button>
//                                 </form>
//                             </div>
//                         </div>
//                         <div className="p-4">
//                             <h3 className="font-semibold text-gray-800 text-xs mb-2">Popular Searches</h3>
//                             <div className="flex flex-wrap gap-1">
//                                 {["Paracetamol", "Vitamin C", "Diabetes", "Blood Pressure", "Skin Care"].map((term, index) => (
//                                     <button
//                                         key={index}
//                                         onClick={() => handleQuickSearch(term)}
//                                         className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1.5 rounded-full text-xs transition flex-shrink-0"
//                                     >
//                                         {term}
//                                     </button>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 {/* Mobile Menu Overlay */}
//                 {showMobileMenu && (
//                     <div className="md:hidden fixed inset-0 bg-white z-50 top-0 left-0 right-0 bottom-0 overflow-y-auto">
//                         <div className="p-4 border-b border-gray-200">
//                             <div className="flex justify-between items-center">
//                                 <button
//                                     onClick={() => setShowMobileMenu(false)}
//                                     className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition"
//                                 >
//                                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                                     </svg>
//                                 </button>
//                             </div>
//                         </div>
//                         <div className="p-4 space-y-1">
//                             {/* Mobile menu content */}
//                         </div>
//                     </div>
//                 )}

//                 {/* Search Results */}
//                 {searchResults && searchResults.length > 0 && (
//                     <div className="mt-2 p-2 bg-white rounded-lg shadow-lg border border-gray-200 w-full max-w-full overflow-hidden">
//                         <div className="flex justify-between items-center mb-2">
//                             <h3 className="font-semibold text-gray-800 text-xs">Search Results</h3>
//                             <button onClick={clearSearch} className="text-[10px] text-blue-600 hover:underline flex items-center gap-1 flex-shrink-0">
//                                 Clear
//                             </button>
//                         </div>
//                         <div className="grid grid-cols-2 gap-1 w-full">
//                             {searchResults.map(item => (
//                                 <div key={item.id} className="flex items-center gap-1 p-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition w-full overflow-hidden">
//                                     <img src={item.img} alt={item.name} className="w-6 h-6 object-contain rounded flex-shrink-0" />
//                                     <div className="flex-1 min-w-0 overflow-hidden">
//                                         <p className="text-[10px] font-medium text-gray-800 truncate">{item.name}</p>
//                                         <p className="text-green-600 font-bold text-[10px] truncate">{item.price}</p>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 )}

//                 {/* Selected Category */}
//                 {selectedCategory && (
//                     <div className="mt-2 p-2 bg-blue-50 rounded-lg border border-blue-200 w-full max-w-full overflow-hidden">
//                         <div className="flex justify-between items-center w-full">
//                             <div className="flex items-center gap-1 min-w-0 flex-1">
//                                 <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
//                                     <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                                     </svg>
//                                 </div>
//                                 <h3 className="font-semibold text-gray-800 text-xs truncate flex-1">Browsing: {selectedCategory.name}</h3>
//                             </div>
//                             <button onClick={clearCategory} className="text-[10px] text-blue-600 hover:underline flex items-center gap-1 flex-shrink-0 ml-2">
//                                 View All
//                             </button>
//                         </div>
//                     </div>
//                 )}
//             </div>

//             {/* Backdrop for mobile overlays */}
//             {(showMobileSearch || showMobileMenu) && (
//                 <div
//                     className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
//                     onClick={closeAllMobileViews}
//                 />
//             )}
//         </header>
//     );
// };

// export default Header;






























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
//     const [showMobileSearch, setShowMobileSearch] = useState(false);
//     const [showMobileMenu, setShowMobileMenu] = useState(false);

//     const toggleMobileSearch = () => {
//         setShowMobileSearch(!showMobileSearch);
//         setShowMobileMenu(false);
//     };

//     const toggleMobileMenu = () => {
//         setShowMobileMenu(!showMobileMenu);
//         setShowMobileSearch(false);
//     };

//     const closeAllMobileViews = () => {
//         setShowMobileSearch(false);
//         setShowMobileMenu(false);
//         setShowAccount(false);
//     };

//     const handleMobileSearchSubmit = (e) => {
//         if (e) {
//             e.preventDefault();
//         }
//         handleSearch(e);
//         setShowMobileSearch(false);
//     };

//     const handleQuickSearch = (term) => {
//         setSearchQuery(term);
//         handleSearch({ preventDefault: () => { } });
//         setShowMobileSearch(false);
//     };

//     return (
//         <header className="fixed top-0 w-full bg-white shadow-sm z-40">
//             <div className="w-full px-3 py-2 max-w-[100vw] overflow-hidden">
//                 {/* Main Header Row - Everything in one line */}
//                 <div className="flex items-center justify-between gap-2">
//                     {/* Logo Section - Fixed width - ONLY LOGO UPDATED */}
//                     <Link to="/" onClick={closeAllMobileViews} className="flex-shrink-0 min-w-0">
//                         <div className="flex items-center gap-2 min-w-0">
//                             {/* CEO Image - Hidden on mobile, shown on desktop */}
//                             <div className="hidden md:flex items-center gap-2">
//                                 <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0">
//                                     <img
//                                         src="/assets/CEO.png"
//                                         alt="CEO"
//                                         className="w-10 h-10 object-cover object-top rounded-full"
//                                     />
//                                 </div>
//                                 <div className="w-7 h-7 flex items-center justify-center flex-shrink-0">
//                                     <img
//                                         src="/assets/logo.png"
//                                         alt="Anand Pharmacy Logo"
//                                         className="w-full h-full object-contain"
//                                     />
//                                 </div>
//                             </div>

//                             {/* Mobile View - Compact logo */}
//                             <div className="flex md:hidden items-center gap-1 min-w-0">
//                                 <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0">
//                                     <img
//                                         src="/assets/CEO.png"
//                                         alt="Anand Pharmacy Logo"
//                                         className="w-8 h-8 object-cover object-top rounded-full"
//                                     />
//                                 </div>
//                                 <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
//                                     <img
//                                         src="/assets/logo.png"
//                                         alt="Anand Pharmacy Logo"
//                                         className="w-full h-full object-contain"
//                                     />
//                                 </div>
//                             </div>

//                             {/* Brand Name */}
//                             <div className="flex flex-col min-w-0">
//                                 <span className="text-base font-bold text-gray-800 whitespace-nowrap md:text-lg truncate">
//                                     <span className="text-blue-600">Anand</span> Pharmacy
//                                 </span>
//                                 {/* Tagline - Hidden on mobile */}
//                                 <span className="hidden md:block text-xs text-gray-500 whitespace-nowrap">
//                                     Trusted Healthcare
//                                 </span>
//                             </div>
//                         </div>
//                     </Link>

//                     {/* Search Bar - Desktop - Flexible width */}
//                     <div className="hidden md:flex flex-1 max-w-2xl mx-4 min-w-0">
//                         <div className="flex items-center bg-white rounded-full shadow-sm border border-gray-300 overflow-hidden w-full">
//                             <input
//                                 type="text"
//                                 value={searchQuery}
//                                 onChange={(e) => setSearchQuery(e.target.value)}
//                                 className="flex-1 px-4 py-2 text-sm outline-none w-full text-gray-700 placeholder-gray-500 min-w-0"
//                                 placeholder="Search for medicines & healthcare products"
//                                 onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
//                             />
//                             <button
//                                 onClick={handleSearch}
//                                 className="bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition flex items-center gap-2 whitespace-nowrap flex-shrink-0 font-medium text-sm"
//                             >
//                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                                 </svg>
//                                 Search
//                             </button>
//                         </div>
//                     </div>

//                     {/* Right Icons Container - Fixed width */}
//                     <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
//                         {/* Mobile Search Button */}
//                         <button
//                             onClick={toggleMobileSearch}
//                             className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition rounded-lg hover:bg-blue-50 flex-shrink-0"
//                             aria-label="Search"
//                         >
//                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                             </svg>
//                         </button>

//                         {/* Desktop Icons */}
//                         <div className="hidden md:flex items-center gap-1">
//                             {/* Scan Button */}
//                             <button
//                                 onClick={handleScanClick}
//                                 className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition p-2 rounded-lg hover:bg-blue-50 whitespace-nowrap flex-shrink-0"
//                             >
//                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
//                                 </svg>
//                                 <span className="text-md font-medium">Scan</span>
//                             </button>

//                             {/* Account Button - EXACTLY SAME */}
//                             <div className="relative flex-shrink-0">
//                                 <button
//                                     onClick={() => setShowAccount(!showAccount)}
//                                     className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition p-2 rounded-lg hover:bg-blue-50 whitespace-nowrap flex-shrink-0"
//                                 >
//                                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                                     </svg>
//                                     <span className="text-md font-medium truncate max-w-[80px]">{isLoggedIn ? user?.name : "Account"}</span>
//                                 </button>

//                                 {/* Account Dropdown - EXACTLY SAME */}
//                                 {showAccount && (
//                                     <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
//                                         {isLoggedIn ? (
//                                             // Logged in state
//                                             <div className="p-3">
//                                                 <div className="flex items-center gap-2 mb-3 p-2 bg-blue-50 rounded-lg">
//                                                     <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
//                                                         <span className="text-white font-bold text-sm">
//                                                             {user?.name?.charAt(0)}
//                                                         </span>
//                                                     </div>
//                                                     <div className="min-w-0 flex-1">
//                                                         <h3 className="font-semibold text-gray-800 text-sm truncate">{user?.name}</h3>
//                                                         <p className="text-xs text-gray-600 truncate">{user?.email}</p>
//                                                     </div>
//                                                 </div>
//                                                 <div className="space-y-1">
//                                                     <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg transition flex items-center gap-2 text-xs">
//                                                         <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
//                                                         </svg>
//                                                         My Orders
//                                                     </button>
//                                                     <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg transition flex items-center gap-2 text-xs">
//                                                         <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
//                                                             <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
//                                                         </svg>
//                                                         My Wishlist
//                                                     </button>
//                                                     <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg transition flex items-center gap-2 text-xs">
//                                                         <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
//                                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                                                         </svg>
//                                                         Account Settings
//                                                     </button>
//                                                     <button
//                                                         onClick={handleLogout}
//                                                         className="w-full text-left px-3 py-2 hover:bg-red-50 rounded-lg transition flex items-center gap-2 text-red-600 text-xs"
//                                                     >
//                                                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//                                                         </svg>
//                                                         Logout
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                         ) : (
//                                             // Login/Signup Options
//                                             <div className="p-3">
//                                                 <div className="text-center mb-3">
//                                                     <h3 className="font-semibold text-gray-800 text-sm">Welcome!</h3>
//                                                     <p className="text-gray-600 text-xs">Login or create an account</p>
//                                                 </div>

//                                                 <div className="space-y-2">
//                                                     <button
//                                                         onClick={() => {
//                                                             setShowAccount(false);
//                                                             setShowLoginModal(true);
//                                                         }}
//                                                         className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2 text-xs"
//                                                     >
//                                                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
//                                                         </svg>
//                                                         Login
//                                                     </button>

//                                                     <button
//                                                         onClick={() => {
//                                                             setShowAccount(false);
//                                                             setShowSignupModal(true);
//                                                         }}
//                                                         className="w-full border border-blue-600 text-blue-600 py-2 rounded-lg font-semibold hover:bg-blue-50 transition flex items-center justify-center gap-2 text-xs"
//                                                     >
//                                                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
//                                                         </svg>
//                                                         Create Account
//                                                     </button>
//                                                 </div>

//                                                 <div className="mt-3 pt-3 border-t border-gray-200">
//                                                     <button
//                                                         onClick={() => {
//                                                             setShowAccount(false);
//                                                             setShowForgotPasswordModal(true);
//                                                         }}
//                                                         className="w-full text-center text-blue-600 hover:underline text-xs"
//                                                     >
//                                                         Forgot Password?
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                         )}
//                                     </div>
//                                 )}
//                             </div>
//                         </div>

//                         {/* Cart Button - Both mobile and desktop */}
//                         <button
//                             onClick={() => {
//                                 setShowCart(true);
//                                 closeAllMobileViews();
//                             }}
//                             className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition p-2 rounded-lg hover:bg-blue-50 relative whitespace-nowrap flex-shrink-0"
//                         >
//                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
//                             </svg>
//                             <span className="hidden md:block text-md font-medium">Cart</span>
//                             {cart && cart.length > 0 && (
//                                 <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-semibold">
//                                     {cart.reduce((total, item) => total + (item.quantity || 0), 0)}
//                                 </span>
//                             )}
//                         </button>

//                         {/* Mobile Menu Button */}
//                         <button
//                             onClick={toggleMobileMenu}
//                             className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition flex-shrink-0"
//                             aria-label="Menu"
//                         >
//                             <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//                             </svg>
//                         </button>
//                     </div>
//                 </div>

//                 {/* Mobile Search Overlay - ONLY MOBILE VIEW UPDATED */}
//                 {showMobileSearch && (
//                     <div className="md:hidden fixed inset-0 bg-white z-50 top-0 left-0 right-0 bottom-0">
//                         <div className="p-4 border-b border-gray-200">
//                             <div className="flex items-center gap-2">
//                                 <button
//                                     onClick={() => setShowMobileSearch(false)}
//                                     className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition"
//                                 >
//                                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                                     </svg>
//                                 </button>
//                                 <form onSubmit={handleMobileSearchSubmit} className="flex-1 flex items-center bg-gray-100 rounded-full overflow-hidden border border-gray-300">
//                                     <input
//                                         type="text"
//                                         value={searchQuery}
//                                         onChange={(e) => setSearchQuery(e.target.value)}
//                                         className="flex-1 px-3 py-2 text-sm outline-none bg-transparent text-gray-700 min-w-0"
//                                         placeholder="Search medicines..."
//                                         autoFocus
//                                     />
//                                     <button
//                                         type="submit"
//                                         className="bg-blue-600 text-white px-3 py-2 hover:bg-blue-700 transition flex items-center flex-shrink-0"
//                                     >
//                                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                                         </svg>
//                                     </button>
//                                 </form>
//                             </div>
//                         </div>

//                         {/* Quick Search Suggestions */}
//                         <div className="p-4">
//                             <h3 className="font-semibold text-gray-800 text-xs mb-2">Popular Searches</h3>
//                             <div className="flex flex-wrap gap-1">
//                                 {["Paracetamol", "Vitamin C", "Diabetes", "Blood Pressure", "Skin Care"].map((term, index) => (
//                                     <button
//                                         key={index}
//                                         onClick={() => handleQuickSearch(term)}
//                                         className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1.5 rounded-full text-xs transition flex-shrink-0"
//                                     >
//                                         {term}
//                                     </button>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 {/* Mobile Menu Overlay - ONLY MOBILE VIEW UPDATED */}
//                 {showMobileMenu && (
//                     <div className="md:hidden fixed inset-0 bg-white z-50 top-0 left-0 right-0 bottom-0 overflow-y-auto">
//                         <div className="p-4 border-b border-gray-200">
//                             <div className="flex justify-between items-center">
//                                 <button
//                                     onClick={() => setShowMobileMenu(false)}
//                                     className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition"
//                                 >
//                                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                                     </svg>
//                                 </button>
//                             </div>
//                         </div>

//                         <div className="p-4 space-y-1">
//                             {/* User Info */}
//                             {isLoggedIn ? (
//                                 <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg mb-3">
//                                     <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
//                                         <span className="text-white font-bold text-sm">
//                                             {user?.name?.charAt(0)}
//                                         </span>
//                                     </div>
//                                     <div className="min-w-0 flex-1">
//                                         <h3 className="font-semibold text-gray-800 text-sm truncate">{user?.name}</h3>
//                                         <p className="text-xs text-gray-600 truncate">{user?.email}</p>
//                                     </div>
//                                 </div>
//                             ) : (
//                                 <div className="p-3 bg-gray-50 rounded-lg mb-3">
//                                     <p className="text-gray-600 text-xs mb-2">Welcome! Login to access all features</p>
//                                     <div className="flex gap-1">
//                                         <button
//                                             onClick={() => {
//                                                 setShowMobileMenu(false);
//                                                 setShowLoginModal(true);
//                                             }}
//                                             className="flex-1 bg-blue-600 text-white py-1.5 rounded-lg font-semibold text-xs"
//                                         >
//                                             Login
//                                         </button>
//                                         <button
//                                             onClick={() => {
//                                                 setShowMobileMenu(false);
//                                                 setShowSignupModal(true);
//                                             }}
//                                             className="flex-1 border border-blue-600 text-blue-600 py-1.5 rounded-lg font-semibold text-xs"
//                                         >
//                                             Sign Up
//                                         </button>
//                                     </div>
//                                 </div>
//                             )}

//                             {/* Menu Items */}
//                             <Link
//                                 to="/"
//                                 onClick={() => setShowMobileMenu(false)}
//                                 className="w-full text-left px-3 py-2.5 hover:bg-gray-100 rounded-lg transition flex items-center gap-2 border-b text-sm"
//                             >
//                                 <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
//                                 </svg>
//                                 Home
//                             </Link>

//                             <button className="w-full text-left px-3 py-2.5 hover:bg-gray-100 rounded-lg transition flex items-center gap-2 border-b text-sm">
//                                 <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
//                                 </svg>
//                                 My Orders
//                             </button>

//                             <button className="w-full text-left px-3 py-2.5 hover:bg-gray-100 rounded-lg transition flex items-center gap-2 border-b text-sm">
//                                 <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
//                                     <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
//                                 </svg>
//                                 My Wishlist
//                             </button>

//                             <button
//                                 onClick={() => {
//                                     handleScanClick();
//                                     setShowMobileMenu(false);
//                                 }}
//                                 className="w-full text-left px-3 py-2.5 hover:bg-gray-100 rounded-lg transition flex items-center gap-2 border-b text-sm"
//                             >
//                                 <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
//                                 </svg>
//                                 Scan Medicine
//                             </button>

//                             {isLoggedIn && (
//                                 <button
//                                     onClick={() => {
//                                         handleLogout();
//                                         setShowMobileMenu(false);
//                                     }}
//                                     className="w-full text-left px-3 py-2.5 hover:bg-red-50 rounded-lg transition flex items-center gap-2 text-red-600 mt-2 text-sm"
//                                 >
//                                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//                                     </svg>
//                                     Logout
//                                 </button>
//                             )}
//                         </div>
//                     </div>
//                 )}

//                 {/* Search Results - EXACTLY SAME */}
//                 {searchResults && searchResults.length > 0 && (
//                     <div className="mt-2 p-2 bg-white rounded-lg shadow-lg border border-gray-200 w-full max-w-full overflow-hidden">
//                         <div className="flex justify-between items-center mb-2">
//                             <h3 className="font-semibold text-gray-800 text-xs">Search Results</h3>
//                             <button onClick={clearSearch} className="text-[10px] text-blue-600 hover:underline flex items-center gap-1 flex-shrink-0">
//                                 <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                                 </svg>
//                                 Clear
//                             </button>
//                         </div>
//                         <div className="grid grid-cols-2 gap-1 w-full">
//                             {searchResults.map(item => (
//                                 <div key={item.id} className="flex items-center gap-1 p-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition w-full overflow-hidden">
//                                     <img src={item.img} alt={item.name} className="w-6 h-6 object-contain rounded flex-shrink-0" />
//                                     <div className="flex-1 min-w-0 overflow-hidden">
//                                         <p className="text-[10px] font-medium text-gray-800 truncate">{item.name}</p>
//                                         <p className="text-green-600 font-bold text-[10px] truncate">{item.price}</p>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 )}

//                 {/* Selected Category - EXACTLY SAME */}
//                 {selectedCategory && (
//                     <div className="mt-2 p-2 bg-blue-50 rounded-lg border border-blue-200 w-full max-w-full overflow-hidden">
//                         <div className="flex justify-between items-center w-full">
//                             <div className="flex items-center gap-1 min-w-0 flex-1">
//                                 <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
//                                     <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                                     </svg>
//                                 </div>
//                                 <h3 className="font-semibold text-gray-800 text-xs truncate flex-1">Browsing: {selectedCategory.name}</h3>
//                             </div>
//                             <button onClick={clearCategory} className="text-[10px] text-blue-600 hover:underline flex items-center gap-1 flex-shrink-0 ml-2">
//                                 View All
//                                 <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                                 </svg>
//                             </button>
//                         </div>
//                     </div>
//                 )}
//             </div>

//             {/* Backdrop for mobile overlays - EXACTLY SAME */}
//             {(showMobileSearch || showMobileMenu) && (
//                 <div
//                     className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
//                     onClick={closeAllMobileViews}
//                 />
//             )}
//         </header>
//     );
// };

// export default Header;





















import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

// Modal Components (keep as is)
const LoginModal = ({ isOpen, onClose, onSwitchToSignup, onSwitchToForgotPassword, onLogin }) => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const modalRef = useRef();

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

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
                className="fixed inset-0 bg-black bg-opacity-50 z-[100]"
                onClick={onClose}
            />
            <div 
                ref={modalRef}
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-2xl z-[101] p-6 mx-4 animate-fadeIn"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Login</h2>
                    <button 
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition"
                        aria-label="Close"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

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
            </div>
        </>
    );
};

const SignupModal = ({ isOpen, onClose, onSwitchToLogin }) => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    });
    const modalRef = useRef();

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords don't match!");
            return;
        }
        console.log("Signup data:", formData);
        alert('Account created successfully!');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <>
            <div 
                className="fixed inset-0 bg-black bg-opacity-50 z-[100]"
                onClick={onClose}
            />
            <div 
                ref={modalRef}
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-2xl z-[101] p-6 mx-4 max-h-[90vh] overflow-y-auto animate-fadeIn"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
                    <button 
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition"
                        aria-label="Close"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="John Doe"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                            autoFocus
                        />
                    </div>
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
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+91 9876543210"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
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
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="••••••••"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                        Create Account
                    </button>
                </form>

                <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                    <p className="text-gray-600">
                        Already have an account?{" "}
                        <button 
                            type="button"
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

const ForgotPasswordModal = ({ isOpen, onClose, onSwitchToLogin }) => {
    const [email, setEmail] = useState("");
    const modalRef = useRef();

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Reset password for:", email);
        alert(`Password reset link sent to ${email}`);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <>
            <div 
                className="fixed inset-0 bg-black bg-opacity-50 z-[100]"
                onClick={onClose}
            />
            <div 
                ref={modalRef}
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-2xl z-[101] p-6 mx-4 animate-fadeIn"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Reset Password</h2>
                    <button 
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition"
                        aria-label="Close"
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
            </div>
        </>
    );
};

const ScanModal = ({ isOpen, onClose }) => {
    const modalRef = useRef();

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    const handleTakePhoto = () => {
        alert("Camera access requested");
    };

    if (!isOpen) return null;

    return (
        <>
            <div 
                className="fixed inset-0 bg-black bg-opacity-50 z-[100]"
                onClick={onClose}
            />
            <div 
                ref={modalRef}
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-2xl z-[101] p-6 mx-4 animate-fadeIn"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Scan Medicine</h2>
                    <button 
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition"
                        aria-label="Close"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                
                <div className="text-center">
                    <div className="w-64 h-64 mx-auto bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                        <div className="text-center">
                            <div className="text-6xl mb-4">📷</div>
                            <p className="text-gray-500">Camera preview will appear here</p>
                        </div>
                    </div>
                    
                    <p className="text-gray-600 mb-6">
                        Point your camera at the medicine barcode or label to scan
                    </p>
                    
                    <div className="flex gap-4">
                        <button 
                            onClick={onClose}
                            className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={handleTakePhoto}
                            className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                        >
                            Take Photo
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

// Main Header Component with optimized mobile view
const Header = ({ 
    searchQuery, 
    setSearchQuery, 
    handleSearch, 
    clearSearch, 
    searchResults, 
    selectedCategory, 
    clearCategory, 
    cart = [], 
    setShowCart,
    isLoggedIn,
    user,
    onLogin,
    onLogout
}) => {
    const navigate = useNavigate();
    const [showMobileSearch, setShowMobileSearch] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showAccount, setShowAccount] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignupModal, setShowSignupModal] = useState(false);
    const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
    const [showScanModal, setShowScanModal] = useState(false);
    
    const accountRef = useRef();
    const mobileMenuRef = useRef();
    const mobileSearchRef = useRef();

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (accountRef.current && !accountRef.current.contains(event.target)) {
                setShowAccount(false);
            }
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
                setShowMobileMenu(false);
            }
            if (mobileSearchRef.current && !mobileSearchRef.current.contains(event.target)) {
                setShowMobileSearch(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Handle body overflow when mobile menu/search is open
    useEffect(() => {
        if (showMobileMenu || showMobileSearch) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [showMobileMenu, showMobileSearch]);

    const toggleMobileSearch = () => {
        setShowMobileSearch(!showMobileSearch);
        setShowMobileMenu(false);
        setShowAccount(false);
    };

    const toggleMobileMenu = () => {
        setShowMobileMenu(!showMobileMenu);
        setShowMobileSearch(false);
        setShowAccount(false);
    };

    const closeAllMobileViews = () => {
        setShowMobileSearch(false);
        setShowMobileMenu(false);
        setShowAccount(false);
    };

    const handleMobileSearchSubmit = (e) => {
        e.preventDefault();
        handleSearch(e);
        setShowMobileSearch(false);
    };

    const handleQuickSearch = (term) => {
        setSearchQuery(term);
        handleSearch({ preventDefault: () => {} });
        setShowMobileSearch(false);
    };

    const handleAccountAction = () => {
        if (isLoggedIn) {
            setShowAccount(!showAccount);
        } else {
            setShowLoginModal(true);
            setShowAccount(false);
        }
    };

    const handleModalLogin = (formData) => {
        if (onLogin) {
            onLogin(formData);
        } else {
            console.log("Login with:", formData);
            alert("Login successful!");
        }
        setShowLoginModal(false);
    };

    const handleLogout = () => {
        if (onLogout) {
            onLogout();
        } else {
            console.log("Logout clicked");
        }
        setShowAccount(false);
        setShowMobileMenu(false);
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

    const quickSearchTerms = [
        "Paracetamol", "Vitamin C", "Diabetes", "Blood Pressure", 
        "Skin Care", "Baby Care", "Pain Relief", "Allergy"
    ];

    const cartItemCount = cart.reduce((total, item) => total + (item.quantity || 0), 0);

    return (
        <>
            <header className="fixed top-0 w-full bg-white shadow-sm z-40">
                {/* Main Header Bar */}
                <div className="w-full px-2 py-3">
                    <div className="flex items-center justify-between gap-1">
                        {/* Logo Section - Mobile Optimized */}
                        <Link to="/" onClick={closeAllMobileViews} className="flex-shrink-0">
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1">
                                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border border-blue-100">
                                        <img
                                            src="/assets/CEO.png"
                                            alt="CEO"
                                            className="w-full h-full object-cover object-top"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = "https://ui-avatars.com/api/?name=A&background=3B82F6&color=fff";
                                            }}
                                        />
                                    </div>
                                    <div className="w-6 h-6 md:w-8 md:h-8">
                                        <img
                                            src="/assets/logo.png"
                                            alt="Logo"
                                            className="w-full h-full object-contain"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = "https://ui-avatars.com/api/?name=AP&background=3B82F6&color=fff";
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="xs:block">
                                    <h1 className="text-base md:text-xl font-bold text-gray-800 leading-tight">
                                        <span className="text-blue-600">Anand</span> Pharmacy
                                    </h1>
                                    <p className="hidden md:block text-xs text-gray-500">Trusted Healthcare</p>
                                </div>
                            </div>
                        </Link>

                        {/* Desktop Search Bar */}
                        <div className="hidden md:flex flex-1 max-w-2xl mx-4">
                            <form onSubmit={handleSearch} className="flex items-center w-full">
                                <div className="relative w-full">
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Search medicines, health products..."
                                        onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
                                    />
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                    {searchQuery && (
                                        <button
                                            type="button"
                                            onClick={clearSearch}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-full font-medium hover:bg-blue-700 transition whitespace-nowrap text-sm"
                                >
                                    Search
                                </button>
                            </form>
                        </div>

                        {/* Desktop Actions */}
                        <div className="hidden md:flex items-center gap-4">
                            {/* Scan Button */}
                            <button
                                onClick={() => setShowScanModal(true)}
                                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition p-2 rounded-lg hover:bg-blue-50"
                            >
                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                                </svg>
                                <span className="text-sm font-medium">Scan</span>
                            </button>

                            {/* Account Button */}
                            <div className="relative" ref={accountRef}>
                                <button
                                    onClick={handleAccountAction}
                                    className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition p-2 rounded-lg hover:bg-blue-50"
                                >
                                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                        {isLoggedIn ? (
                                            <span className="font-bold text-blue-600 text-sm">
                                                {user?.name?.charAt(0) || 'U'}
                                            </span>
                                        ) : (
                                            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        )}
                                    </div>
                                    <span className="text-sm font-medium">
                                        {isLoggedIn ? (user?.name?.split(' ')[0] || 'Account') : 'Account'}
                                    </span>
                                </button>

                                {/* Account Dropdown */}
                                {showAccount && isLoggedIn && (
                                    <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 z-50 animate-fadeIn">
                                        <div className="p-3 border-b border-gray-100">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                                                    <span className="text-white font-bold">
                                                        {user?.name?.charAt(0) || 'U'}
                                                    </span>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-semibold text-gray-800 text-sm truncate">{user?.name || 'User'}</h3>
                                                    <p className="text-xs text-gray-600 truncate">{user?.email || ''}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-1">
                                            <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg transition flex items-center gap-2 text-sm">
                                                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                                </svg>
                                                My Orders
                                            </button>
                                            <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg transition flex items-center gap-2 text-sm">
                                                <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                                </svg>
                                                My Wishlist
                                            </button>
                                            <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg transition flex items-center gap-2 text-sm">
                                                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                Account Settings
                                            </button>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full text-left px-3 py-2 hover:bg-red-50 rounded-lg transition flex items-center gap-2 text-red-600 text-sm mt-1"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                </svg>
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Cart Button */}
                            <button
                                onClick={() => setShowCart(true)}
                                className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition p-2 rounded-lg hover:bg-blue-50 relative"
                            >
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <span className="text-sm font-medium">Cart</span>
                                {cartItemCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                                        {cartItemCount}
                                    </span>
                                )}
                            </button>
                        </div>

                        {/* Mobile Actions */}
                        <div className="flex md:hidden items-center gap-1">
                            {/* Mobile Search Button */}
                            <button
                                onClick={toggleMobileSearch}
                                className="p-1 text-gray-600 hover:text-blue-600 transition rounded-lg hover:bg-blue-50"
                                aria-label="Search"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>

                            {/* Mobile Cart Button */}
                            <button
                                onClick={() => setShowCart(true)}
                                className="p-1 text-gray-600 hover:text-blue-600 transition rounded-lg hover:bg-blue-50 relative"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                {cartItemCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                                        {cartItemCount}
                                    </span>
                                )}
                            </button>

                            {/* Mobile Menu (Burger) Button */}
                            <button
                                onClick={toggleMobileMenu}
                                className="p-1 text-gray-600 hover:text-blue-600 transition rounded-lg hover:bg-blue-50"
                                aria-label="Menu"
                            >
                                {showMobileMenu ? (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Search Overlay */}
                    {showMobileSearch && (
                        <div 
                            ref={mobileSearchRef}
                            className="md:hidden fixed inset-0 bg-white z-50 top-0 left-0 right-0 bottom-0 pt-16 animate-slideDown"
                        >
                            <div className="p-4 border-b border-gray-200">
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowMobileSearch(false)}
                                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition"
                                        aria-label="Close search"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    <form onSubmit={handleMobileSearchSubmit} className="flex-1 flex items-center">
                                        <div className="relative flex-1">
                                            <input
                                                type="text"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                className="w-full pl-10 pr-4 py-3 text-sm bg-gray-50 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Search medicines..."
                                                autoFocus
                                            />
                                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            className="ml-2 bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition"
                                            aria-label="Search"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </button>
                                    </form>
                                </div>
                                
                                {/* Quick Search Suggestions */}
                                <div className="mt-4">
                                    <h3 className="text-xs font-medium text-gray-600 mb-2">Popular Searches</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {quickSearchTerms.map((term, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleQuickSearch(term)}
                                                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full text-xs transition"
                                            >
                                                {term}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Search Results */}
                    {searchResults && searchResults.length > 0 && (
                        <div className="mt-4 p-3 bg-white rounded-lg shadow-lg border border-gray-200 animate-fadeIn">
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="font-semibold text-gray-800 text-sm">Search Results</h3>
                                <button 
                                    onClick={clearSearch}
                                    className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                                >
                                    Clear
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                {searchResults.slice(0, 4).map(item => (
                                    <div 
                                        key={item.id} 
                                        className="flex items-center gap-2 p-2 border rounded-lg hover:bg-gray-50 transition cursor-pointer"
                                        onClick={() => {
                                            navigate(`/product/${item.id}`);
                                            clearSearch();
                                        }}
                                    >
                                        <img 
                                            src={item.img} 
                                            alt={item.name} 
                                            className="w-10 h-10 object-contain rounded" 
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = "https://via.placeholder.com/40x40/3B82F6/FFFFFF?text=AP";
                                            }}
                                        />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-medium text-gray-800 truncate">{item.name}</p>
                                            <p className="text-green-600 font-bold text-xs">{item.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Selected Category */}
                    {selectedCategory && (
                        <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200 animate-fadeIn">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h3 className="font-semibold text-gray-800 text-sm truncate">Browsing: {selectedCategory.name}</h3>
                                </div>
                                <button 
                                    onClick={clearCategory}
                                    className="text-xs text-blue-600 hover:underline flex items-center gap-1 flex-shrink-0"
                                >
                                    View All
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Overlay */}
                {showMobileMenu && (
                    <div 
                        ref={mobileMenuRef}
                        className="md:hidden fixed inset-0 bg-white z-50 top-0 left-0 right-0 bottom-0 pt-16 animate-slideInRight"
                    >
                        <div className="h-full overflow-y-auto pb-20">
                            {/* User Info Section */}
                            <div className="p-4 border-b border-gray-200">
                                {isLoggedIn ? (
                                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                                        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                                            <span className="text-white font-bold text-lg">
                                                {user?.name?.charAt(0) || 'U'}
                                            </span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-gray-800 truncate">{user?.name || 'User'}</h3>
                                            <p className="text-sm text-gray-600 truncate">{user?.email || ''}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center p-3">
                                        <h3 className="font-semibold text-gray-800 text-lg mb-1">Welcome!</h3>
                                        <p className="text-gray-600 text-sm mb-3">Login or create an account</p>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => {
                                                    setShowMobileMenu(false);
                                                    setShowLoginModal(true);
                                                }}
                                                className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition text-sm"
                                            >
                                                Login
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setShowMobileMenu(false);
                                                    setShowSignupModal(true);
                                                }}
                                                className="flex-1 border border-blue-600 text-blue-600 py-2.5 rounded-lg font-semibold hover:bg-blue-50 transition text-sm"
                                            >
                                                Sign Up
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Menu Items */}
                            <div className="p-2">
                                <Link
                                    to="/"
                                    onClick={() => setShowMobileMenu(false)}
                                    className="w-full text-left px-4 py-3 hover:bg-gray-100 rounded-lg transition flex items-center gap-3 text-gray-700"
                                >
                                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                    Home
                                </Link>

                                <button
                                    onClick={() => {
                                        setShowScanModal(true);
                                        setShowMobileMenu(false);
                                    }}
                                    className="w-full text-left px-4 py-3 hover:bg-gray-100 rounded-lg transition flex items-center gap-3 text-gray-700"
                                >
                                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                                    </svg>
                                    Scan Medicine
                                </button>

                                {isLoggedIn && (
                                    <>
                                        <Link
                                            to="/orders"
                                            onClick={() => setShowMobileMenu(false)}
                                            className="w-full text-left px-4 py-3 hover:bg-gray-100 rounded-lg transition flex items-center gap-3 text-gray-700"
                                        >
                                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                            </svg>
                                            My Orders
                                        </Link>

                                        <button
                                            onClick={() => {
                                                setShowMobileMenu(false);
                                                // Navigate to wishlist
                                            }}
                                            className="w-full text-left px-4 py-3 hover:bg-gray-100 rounded-lg transition flex items-center gap-3 text-gray-700"
                                        >
                                            <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                            </svg>
                                            My Wishlist
                                        </button>

                                        <button
                                            onClick={() => {
                                                setShowMobileMenu(false);
                                                // Navigate to account settings
                                            }}
                                            className="w-full text-left px-4 py-3 hover:bg-gray-100 rounded-lg transition flex items-center gap-3 text-gray-700"
                                        >
                                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            Account Settings
                                        </button>

                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-3 hover:bg-red-50 rounded-lg transition flex items-center gap-3 text-red-600 mt-2"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                            Logout
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </header>

            {/* Modals */}
            <LoginModal 
                isOpen={showLoginModal}
                onClose={() => setShowLoginModal(false)}
                onSwitchToSignup={handleSwitchToSignup}
                onSwitchToForgotPassword={handleSwitchToForgotPassword}
                onLogin={handleModalLogin}
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

            <ScanModal 
                isOpen={showScanModal}
                onClose={() => setShowScanModal(false)}
            />

            {/* Add CSS animations */}
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes slideDown {
                    from { 
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to { 
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes slideInRight {
                    from { 
                        transform: translateX(100%);
                    }
                    to { 
                        transform: translateX(0);
                    }
                }
                
                .animate-fadeIn {
                    animation: fadeIn 0.2s ease-out;
                }
                
                .animate-slideDown {
                    animation: slideDown 0.3s ease-out;
                }
                
                .animate-slideInRight {
                    animation: slideInRight 0.3s ease-out;
                }

                /* Extra small screen support */
                @media (max-width: 400px) {
                    .xs\\:block {
                        display: block !important;
                    }
                }
            `}</style>
        </>
    );
};

export default Header;