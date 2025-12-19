import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import "./App.css";

import Header from "./components/Header/Header";
// import CategorySlider from "./components/Header/CategorySlider";
import BackButton from "./components/Header/BackButton";
import PageLoader from "./components/Layout/PageLoader";

import { AuthContext } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext"; // Import CartProvider

// Pages
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import OtpVerify from "./pages/Auth/OtpVerify";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout/Checkout";
import PaymentPage from "./pages/Checkout/PaymentPage";
import OrderTracking from "./pages/Orders/TrackOrder";
import DeliveryMap from "./pages/Orders/DeliveryMap";
import Profile from "./pages/Profile/Profile";
import AddressManager from "./pages/Profile/AddressManager";
import LandingPage from "./components/Landingpage";
import OrderConfirmation from "./pages/Checkout/OrderConfirmation";
import ScrollToTop from "./components/ScrollToTop";
import TrackOrder from "./pages/Orders/TrackOrder";
import About from "./components/About";
import TermsConditions from "./components/TermsConditions";
import PrivacyPolicy from "./components/PrivacyPolicy";
import ContactPage from "./components/ContactPage";

// Protected Route
const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;
  return children;
};

// ================== NEW WRAPPER TO HANDLE UI CONDITION ==================
const LayoutController = ({ children }) => {
  const location = useLocation();

  const isProductDetailPage = location.pathname.startsWith("/ProductDetail");

  return (
    <>
      {/* <Header /> */}

      {/* Show BACK BUTTON on ProductDetail page */}
      {/* {isProductDetailPage ? (
        <BackButton />
      ) : (
        <CategorySlider />
      )} */}

      <PageLoader />

      {children}
    </>
  );
};

// ================= MAIN APP ===================
// const App = () => {
//   return (
//     <CartProvider> {/* Wrap entire app with CartProvider */}
//       <Router>
//       <ScrollToTop/>
//         <LayoutController>
//           <Routes>
//             {/* Home */}
//             <Route path="/" element={<LandingPage />} />
//             <Route path="/home/*" element={<Home />} />

//             {/* Product Detail */}
//             <Route path="/ProductDetail/*" element={<ProductDetail />} />

//             {/* Cart */}
//             <Route path="/cart" element={<CartPage />} />

//             {/* Checkout */}
//             <Route
//               path="/checkout"
//               element={
//                 <Checkout/>
//               }
//             />

//             {/* Payment */}
//             <Route
//               path="/payment"
//               element={
//                 <ProtectedRoute>
//                   <PaymentPage />
//                 </ProtectedRoute>
//               }
//             />
            
//             <Route
//               path="/landingpage"
//               element={
//                 <LandingPage />
//               }
//             />
            
//             {/* Orders */}
//             <Route
//               path="/order-tracking/:id"
//               element={
//                 <ProtectedRoute>
//                   <OrderTracking />
//                 </ProtectedRoute>
//               }
//             />

//             <Route
//               path="/delivery-map/:id"
//               element={
//                 <ProtectedRoute>
//                   <DeliveryMap />
//                 </ProtectedRoute>
//               }
//             />

//             {/* Profile */}
//             <Route
//               path="/profile"
//               element={
//                 <ProtectedRoute>
//                   <Profile />
//                 </ProtectedRoute>
//               }
//             />

//             {/* Address */}
//             <Route
//               path="/addresses"
//               element={
//                 <ProtectedRoute>
//                   <AddressManager />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/order-confirmation"
//               element={
//                   <OrderConfirmation />

//               }
//             />

//             {/* Auth */}
//             <Route path="/login/*" element={<Login />} />
//             <Route path="/otp-verify" element={<OtpVerify />} />

//             {/* Redirect wrong routes */}
//             <Route path="*" element={<Navigate to="/home" />} />
//           </Routes>
//         </LayoutController>
//       </Router>
//     </CartProvider>
//   );
// };


const App = () => {
  return (
    <CartProvider> {/* Wrap entire app with CartProvider */}
      <Router>
      <ScrollToTop/>
        <LayoutController>
          <Routes>
            {/* Home */}
            <Route path="/" element={<LandingPage />} />
            <Route path='/about' element={<About />} />
            <Route path="/home/*" element={<Home />} />
            <Route path='/terms' element={<TermsConditions/>} />
            <Route path="/privacy" element={<PrivacyPolicy/>} />
            <Route path="/contact" element={<ContactPage/>} />
            {/* Product Detail */}
            <Route path="/ProductDetail/*" element={<ProductDetail />} />
 
            {/* Cart */}
            <Route path="/cart" element={<CartPage />} />
 
            {/* Checkout */}
            <Route
              path="/checkout"
              element={
                <Checkout/>
              }
            />
 
            {/* Payment */}
            <Route
              path="/payment"
              element={
                <ProtectedRoute>
                  <PaymentPage />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/landingpage"
              element={
                <LandingPage />
              }
            />
            
            {/* Orders */}
            <Route path="/order-confirmation"element={<OrderConfirmation />}/>
 
             {/* PUBLIC Track Order route */}
              <Route path="/order-tracking/:orderId"element={<TrackOrder />}/>
 
             <Route path="/delivery-map/:id"element={
              <ProtectedRoute>
              <DeliveryMap />
               </ProtectedRoute>
             }
            />
 
            {/* Profile */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
 
            {/* Address */}
            <Route
              path="/addresses"
              element={
                <ProtectedRoute>
                  <AddressManager />
                </ProtectedRoute>
              }
            />
 
 
 
            {/* Auth */}
            <Route path="/login/*" element={<Login />} />
            <Route path="/otp-verify" element={<OtpVerify />} />
 
            {/* Redirect wrong routes */}
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </LayoutController>
      </Router>
    </CartProvider>
  );
};
 


export default App;