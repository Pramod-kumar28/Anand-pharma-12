// src/pages/Checkout/Checkout.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Address, 2: Payment, 3: Review
  const [formData, setFormData] = useState({
    // Address Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",

    // Payment Information
    paymentMethod: "card",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    upiId: "",

    // Order Summary (dummy data)
    items: [
      {
        id: 1,
        name: "Colgate Strong Teeth Toothpaste",
        price: 120,
        quantity: 2,
        image: "https://via.placeholder.com/60x60?text=Toothpaste"
      },
      {
        id: 2,
        name: "Baby Dove Rich Moisture Shampoo",
        price: 180,
        quantity: 1,
        image: "https://via.placeholder.com/60x60?text=Baby+Care"
      },
      {
        id: 3,
        name: "Digene Acidity & Gas Relief Tablets",
        price: 85,
        quantity: 1,
        image: "https://via.placeholder.com/60x60?text=Stomach+Care"
      }
    ]
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNextStep = () => {
    setStep(prev => prev + 1);
  };

  const handlePreviousStep = () => {
    setStep(prev => prev - 1);
  };

  const handlePlaceOrder = () => {
    // In real app, this would process the payment and create order
    navigate("/order-confirmation", { 
      state: { 
        orderId: `ORD${Date.now()}`,
        totalAmount: 505,
        items: formData.items
      }
    });
  };

  const calculateTotal = () => {
    return formData.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const steps = [
    { number: 1, title: "Address", description: "Shipping" },
    { number: 2, title: "Payment", description: "Payment" },
    { number: 3, title: "Review", description: "Review" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">Complete your purchase securely</p>
        </div>

        {/* Progress Steps - Mobile Vertical / Desktop Horizontal */}
        <div className="mb-6 sm:mb-8">
          {/* Mobile Vertical Steps */}
          <div className="lg:hidden">
            <div className="flex flex-col space-y-4">
              {steps.map((stepItem, index) => (
                <div key={stepItem.number} className="flex items-center">
                  <div className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full ${
                    step >= stepItem.number ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
                  } font-semibold text-sm sm:text-base`}>
                    {stepItem.number}
                  </div>
                  <div className="ml-3 flex-1">
                    <div className={`text-sm font-medium ${
                      step >= stepItem.number ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      {stepItem.title}
                    </div>
                    <div className="text-xs text-gray-500">{stepItem.description}</div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-0.5 h-8 ml-4 ${
                      step > stepItem.number ? 'bg-green-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Horizontal Steps */}
          <div className="hidden lg:block">
            <div className="flex items-center justify-between">
              {steps.map((stepItem, index) => (
                <div key={stepItem.number} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    step >= stepItem.number ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
                  } font-semibold`}>
                    {stepItem.number}
                  </div>
                  <div className="ml-3">
                    <div className={`text-sm font-medium ${
                      step >= stepItem.number ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      {stepItem.title}
                    </div>
                    <div className="text-xs text-gray-500">{stepItem.description}</div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-0.5 mx-4 ${
                      step > stepItem.number ? 'bg-green-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              {/* Step 1: Address Information */}
              {step === 1 && (
                <div className="p-4 sm:p-6">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Shipping Address</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Address *
                      </label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        State *
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        PIN Code *
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Landmark
                      </label>
                      <input
                        type="text"
                        name="landmark"
                        value={formData.landmark}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Payment Information */}
              {step === 2 && (
                <div className="p-4 sm:p-6">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Payment Method</h2>
                  
                  {/* Payment Method Selection */}
                  <div className="grid grid-cols-1 gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <button
                      onClick={() => setFormData(prev => ({ ...prev, paymentMethod: "card" }))}
                      className={`p-3 sm:p-4 border-2 rounded-lg text-left ${
                        formData.paymentMethod === "card" 
                          ? "border-green-500 bg-green-50" 
                          : "border-gray-200"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 ${
                          formData.paymentMethod === "card" 
                            ? "border-green-500 bg-green-500" 
                            : "border-gray-300"
                        }`} />
                        <div>
                          <div className="font-semibold text-sm sm:text-base">Credit/Debit Card</div>
                          <div className="text-xs sm:text-sm text-gray-600">Pay with your card</div>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => setFormData(prev => ({ ...prev, paymentMethod: "upi" }))}
                      className={`p-3 sm:p-4 border-2 rounded-lg text-left ${
                        formData.paymentMethod === "upi" 
                          ? "border-green-500 bg-green-50" 
                          : "border-gray-200"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 ${
                          formData.paymentMethod === "upi" 
                            ? "border-green-500 bg-green-500" 
                            : "border-gray-300"
                        }`} />
                        <div>
                          <div className="font-semibold text-sm sm:text-base">UPI</div>
                          <div className="text-xs sm:text-sm text-gray-600">Google Pay, PhonePe, etc.</div>
                        </div>
                      </div>
                    </button>
                  </div>

                  {/* Card Details */}
                  {formData.paymentMethod === "card" && (
                    <div className="space-y-3 sm:space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                          Card Number *
                        </label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          placeholder="1234 5678 9012 3456"
                          className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                          Name on Card *
                        </label>
                        <input
                          type="text"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3 sm:gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                            Expiry Date *
                          </label>
                          <input
                            type="text"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            placeholder="MM/YY"
                            className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                            CVV *
                          </label>
                          <input
                            type="text"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            placeholder="123"
                            className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* UPI Details */}
                  {formData.paymentMethod === "upi" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        UPI ID *
                      </label>
                      <input
                        type="text"
                        name="upiId"
                        value={formData.upiId}
                        onChange={handleInputChange}
                        placeholder="yourname@upi"
                        className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  )}

                  {/* Security Notice */}
                  <div className="mt-4 sm:mt-6 bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
                    <div className="flex items-center gap-2 text-blue-800">
                      <span className="text-sm">🔒</span>
                      <span className="font-semibold text-sm sm:text-base">Secure Payment</span>
                    </div>
                    <p className="text-blue-700 text-xs sm:text-sm mt-1">
                      Your payment information is encrypted and secure. We don't store your card details.
                    </p>
                  </div>
                </div>
              )}

              {/* Step 3: Order Review */}
              {step === 3 && (
                <div className="p-4 sm:p-6">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Order Review</h2>
                  
                  {/* Order Summary */}
                  <div className="mb-4 sm:mb-6">
                    <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">Order Items</h3>
                    <div className="space-y-3 sm:space-y-4">
                      {formData.items.map((item) => (
                        <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900 text-sm sm:text-base truncate">{item.name}</h4>
                            <p className="text-xs sm:text-sm text-gray-600">Qty: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900 text-sm sm:text-base">₹{item.price * item.quantity}</p>
                            <p className="text-xs sm:text-sm text-gray-600">₹{item.price} each</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div className="mb-4 sm:mb-6">
                    <h3 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">Shipping Address</h3>
                    <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                      <p className="font-medium text-sm sm:text-base">{formData.firstName} {formData.lastName}</p>
                      <p className="text-gray-600 text-xs sm:text-sm mt-1">{formData.address}</p>
                      <p className="text-gray-600 text-xs sm:text-sm">
                        {formData.city}, {formData.state} - {formData.pincode}
                      </p>
                      <p className="text-gray-600 text-xs sm:text-sm">Phone: {formData.phone}</p>
                      <p className="text-gray-600 text-xs sm:text-sm">Email: {formData.email}</p>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">Payment Method</h3>
                    <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                      <p className="font-medium text-sm sm:text-base capitalize">{formData.paymentMethod} Payment</p>
                      {formData.paymentMethod === "card" && formData.cardNumber && (
                        <p className="text-gray-600 text-xs sm:text-sm mt-1">
                          Card ending with {formData.cardNumber.slice(-4)}
                        </p>
                      )}
                      {formData.paymentMethod === "upi" && formData.upiId && (
                        <p className="text-gray-600 text-xs sm:text-sm mt-1">UPI ID: {formData.upiId}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="border-t px-4 sm:px-6 py-3 sm:py-4 bg-gray-50">
                <div className="flex justify-between items-center">
                  {step > 1 ? (
                    <button
                      onClick={handlePreviousStep}
                      className="px-4 sm:px-6 py-2 text-sm sm:text-base border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Previous
                    </button>
                  ) : (
                    <div></div>
                  )}
                  
                  {step < 3 ? (
                    <button
                      onClick={handleNextStep}
                      className="px-4 sm:px-6 py-2 text-sm sm:text-base bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Continue
                    </button>
                  ) : (
                    <button
                      onClick={handlePlaceOrder}
                      className="px-4 sm:px-8 py-2 text-sm sm:text-base bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                    >
                      Place Order
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-24">
              <div className="p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Order Summary</h2>

                {/* Order Items Preview */}
                <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
                  {formData.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-xs sm:text-sm">
                      <span className="text-gray-600 truncate flex-1 mr-2">
                        {item.name} × {item.quantity}
                      </span>
                      <span className="flex-shrink-0">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="border-t pt-3 sm:pt-4 space-y-1 sm:space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span>₹{calculateTotal()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax</span>
                    <span>₹{(calculateTotal() * 0.18).toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between text-base sm:text-lg font-bold">
                      <span>Total</span>
                      <span>₹{(calculateTotal() * 1.18).toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Delivery Info */}
                <div className="mt-4 sm:mt-6 bg-green-50 border border-green-200 rounded-lg p-2 sm:p-3">
                  <div className="flex items-center gap-2 text-green-800 mb-1">
                    <span className="text-sm">🚚</span>
                    <span className="font-semibold text-sm">Free Delivery</span>
                  </div>
                  <p className="text-green-700 text-xs sm:text-sm">
                    Estimated delivery: 2-3 business days
                  </p>
                </div>
              </div>
            </div>

            {/* Support Info */}
            <div className="mt-4 sm:mt-6 bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
              <h3 className="font-semibold text-blue-900 text-sm sm:text-base mb-1 sm:mb-2">Need Help?</h3>
              <p className="text-blue-700 text-xs sm:text-sm mb-2">
                Our customer support team is here to help!
              </p>
              <div className="text-blue-600 text-xs sm:text-sm">
                <p>📞 1800-123-4567</p>
                <p>✉️ support@medicare.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;