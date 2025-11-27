// src/pages/CartPage.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Colgate Strong Teeth Toothpaste",
      brand: "Colgate",
      price: 120,
      originalPrice: 150,
      quantity: 2,
      image: "https://via.placeholder.com/100x100?text=Toothpaste",
      category: "Oral Care",
      prescriptionRequired: false
    },
    {
      id: 2,
      name: "Baby Dove Rich Moisture Shampoo",
      brand: "Dove",
      price: 180,
      originalPrice: 200,
      quantity: 1,
      image: "https://via.placeholder.com/100x100?text=Baby+Care",
      category: "Baby Care",
      prescriptionRequired: false
    },
    {
      id: 3,
      name: "Digene Acidity & Gas Relief Tablets",
      brand: "Digene",
      price: 85,
      originalPrice: 100,
      quantity: 1,
      image: "https://via.placeholder.com/100x100?text=Stomach+Care",
      category: "Stomach Care",
      prescriptionRequired: false
    },
    {
      id: 4,
      name: "Metformin Hydrochloride Tablets",
      brand: "Sun Pharma",
      price: 250,
      originalPrice: 300,
      quantity: 1,
      image: "https://via.placeholder.com/100x100?text=Diabetes",
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
    return calculateSubtotal() - calculateDiscount();
  };

  const handleProceedToCheckout = () => {
    navigate("/checkout");
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-8">Add some products to your cart to get started.</p>
          <Link
            to="/home"
            className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
        <p className="text-gray-600 mt-2">Review your items and proceed to checkout</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md border border-gray-200">
            {/* Cart Header */}
            <div className="border-b border-gray-200 px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Cart Items ({cartItems.length})
              </h2>
            </div>

            {/* Cart Items List */}
            <div className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <div key={item.id} className="p-6">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {item.name}
                          </h3>
                          <p className="text-gray-600 text-sm mb-2">{item.brand}</p>
                          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                            {item.category}
                          </span>
                          {item.prescriptionRequired && (
                            <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full ml-2">
                              Prescription Required
                            </span>
                          )}
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xl font-bold text-gray-900">
                              ₹{item.price}
                            </span>
                            {item.originalPrice > item.price && (
                              <span className="text-sm text-gray-500 line-through">
                                ₹{item.originalPrice}
                              </span>
                            )}
                          </div>
                          {item.originalPrice > item.price && (
                            <span className="text-green-600 text-sm font-semibold">
                              Save ₹{item.originalPrice - item.price}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-gray-700">Quantity:</span>
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

                        {/* Remove Button */}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-700 font-medium text-sm"
                        >
                          Remove
                        </button>
                      </div>

                      {/* Item Total */}
                      <div className="mt-2 text-right">
                        <span className="text-lg font-semibold text-gray-900">
                          Item Total: ₹{item.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Continue Shopping */}
          <div className="mt-6">
            <Link
              to="/home"
              className="inline-flex items-center text-green-600 hover:text-green-700 font-semibold"
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md border border-gray-200 sticky top-8">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{calculateSubtotal()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Discount</span>
                  <span className="text-green-600 font-medium">-₹{calculateDiscount()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">Free</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>₹{calculateTotal()}</span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors mb-4"
              >
                Proceed to Checkout
              </button>

              {/* Security Badges */}
              <div className="text-center text-xs text-gray-500">
                <div className="flex justify-center gap-4 mb-2">
                  <span>🔒 Secure Checkout</span>
                  <span>🚚 Free Delivery</span>
                </div>
                <p>Your personal and payment information is secure</p>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-3">Benefits</h3>
            <ul className="text-sm text-blue-800 space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Free delivery on orders above ₹499
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Easy returns within 7 days
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Genuine products guaranteed
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                24/7 Customer support
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;