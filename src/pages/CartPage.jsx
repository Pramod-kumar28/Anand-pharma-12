// src/pages/CartPage.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Digene Acidity & Gas Relief Tablets",
      brand: "Digene",
      price: 85,
      originalPrice: 100,
      quantity: 1,
      image: "https://via.placeholder.com/100x100?text=Digene",
      category: "Stomach Care",
      prescriptionRequired: false
    },
    {
      id: 2,
      name: "Metformin Hydrochloride Tablets",
      brand: "Sun Pharma",
      price: 250,
      originalPrice: 300,
      quantity: 1,
      image: "https://via.placeholder.com/100x100?text=Metformin",
      category: "Diabetes Care",
      prescriptionRequired: true
    }
  ]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateDiscount = () => {
    return cartItems.reduce((total, item) => 
      total + ((item.originalPrice - item.price) * item.quantity), 0
    );
  };

  const calculateTotal = () => {
    return calculateSubtotal();
  };

  const handleProceedToCheckout = () => {
    navigate("/checkout");
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12 sm:py-16">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">Add some products to your cart to get started.</p>
            <Link
              to="/home"
              className="bg-green-600 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors text-sm sm:text-base"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">Review your items and proceed to checkout</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              {/* Cart Header */}
              <div className="border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                  Cart Items ({cartItems.length})
                </h2>
              </div>

              {/* Cart Items List */}
              <div className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-4 sm:p-6">
                    <div className="flex gap-3 sm:gap-4">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border border-gray-200"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
                              {item.name}
                            </h3>
                            <p className="text-gray-600 text-xs sm:text-sm mb-2">{item.brand}</p>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-lg sm:text-xl font-bold text-gray-900">
                                ₹{item.price}
                              </span>
                              {item.originalPrice > item.price && (
                                <>
                                  <span className="text-sm text-gray-500 line-through">
                                    ₹{item.originalPrice}
                                  </span>
                                  <span className="text-green-600 text-xs font-semibold">
                                    Save ₹{item.originalPrice - item.price}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Quantity Controls and Remove */}
                        <div className="flex justify-between items-center mt-3">
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-gray-700">Qty:</span>
                            <div className="flex items-center border border-gray-300 rounded-lg">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="px-3 py-1 hover:bg-gray-100 transition-colors text-gray-600"
                              >
                                -
                              </button>
                              <span className="px-4 py-1 min-w-[40px] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="px-3 py-1 hover:bg-gray-100 transition-colors text-gray-600"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-600 hover:text-red-700 font-medium text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Continue Shopping */}
            <div className="mt-4 sm:mt-6">
              <Link
                to="/home"
                className="inline-flex items-center text-green-600 hover:text-green-700 font-semibold text-sm sm:text-base"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary - Simplified like in the image */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-24">
              <div className="p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Order Summary</h2>

                {/* Total Amount - Prominent like in image */}
                <div className="mb-4">
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-gray-900">₹{calculateTotal()}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors text-sm sm:text-base mb-3"
                >
                  Checkout
                </button>

                {/* Security Badges - Simplified */}
                <div className="text-center text-xs text-gray-500">
                  <div className="flex flex-col items-center gap-1">
                    <span className="flex items-center gap-1">
                      <span>🔒</span> Secure checkout
                    </span>
                    <span className="flex items-center gap-1">
                      <span>🚚</span> Free delivery
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;