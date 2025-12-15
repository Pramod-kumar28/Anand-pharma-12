import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
 
const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const hasProcessedOrder = useRef(false);
  const orderIdRef = useRef(`ORD${Math.floor(100000 + Math.random() * 900000)}`);
 
  useEffect(() => {
    if (hasProcessedOrder.current) return;
    hasProcessedOrder.current = true;
 
    /* ===========================
       1) ORDER FROM CHECKOUT PAGE
       =========================== */
    if (location.state?.orderDetails) {
      const od = location.state.orderDetails;
      setOrderDetails(od);
      setLoading(false);
 
      // ★ ADDED FOR TRACKING — Save order
      const existing = JSON.parse(localStorage.getItem("orders")) || [];
      localStorage.setItem("orders", JSON.stringify([...existing, od]));
 
      if (od.status === "confirmed") {
        setTimeout(() => clearCart(), 100);
      }
 
    } else {
      /* ===========================
         2) MOCK ORDER (fallback)
         =========================== */
      const mockOrder = {
        id: orderIdRef.current,
        status: "confirmed",
        date: new Date().toLocaleDateString(),
        total: location.state?.total || "₹0.00",
        items: location.state?.items || [],
        shippingAddress: location.state?.shippingAddress || {
          fullName: "John Doe",
          address: "123 Main Street",
          city: "Mumbai",
          state: "Maharashtra",
          pincode: "400001",
          phone: "+91 9876543210"
        },
        paymentMethod: location.state?.paymentMethod || "Credit Card",
        estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
          .toLocaleDateString()
      };
 
      setOrderDetails(mockOrder);
      setLoading(false);
 
      // ★ ADDED FOR TRACKING — Save mock order
      const existing = JSON.parse(localStorage.getItem("orders")) || [];
      localStorage.setItem("orders", JSON.stringify([...existing, mockOrder]));
 
      setTimeout(() => clearCart(), 100);
    }
  }, []);
 
  /* ===========================
      LOADING
     =========================== */
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }
 
  /* ===========================
      NO ORDER FOUND
     =========================== */
  if (!orderDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Unable to load order details.</p>
          <button
            onClick={() => navigate('/home')}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }
 
  /* ===========================
      MAIN UI (UNCHANGED)
     =========================== */
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
 
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600 mb-4">
            Thank you for your purchase. Your order has been successfully placed.
          </p>
          <div className="bg-white rounded-lg p-4 max-w-md mx-auto">
            <p className="text-sm text-gray-600">Order ID</p>
            <p className="text-lg font-semibold text-gray-900">{orderDetails.id}</p>
          </div>
        </div>
 
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
 
          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
 
              <div className="space-y-4 mb-6">
                {orderDetails.items?.length > 0 ? (
                  orderDetails.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 py-3 border-b">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-12 h-12 object-contain" />
                        ) : (
                          <span className="text-gray-500 text-xs">IMG</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    No items in order
                  </div>
                )}
              </div>
 
              {/* Order Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Shipping Address</h3>
                  <div className="text-sm text-gray-600">
                    <p className="font-medium">{orderDetails.shippingAddress.fullName}</p>
                    <p>{orderDetails.shippingAddress.address}</p>
                    <p>{orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state}</p>
                    <p>{orderDetails.shippingAddress.pincode}</p>
                    <p>Phone: {orderDetails.shippingAddress.phone}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Order Information</h3>
                  <div className="text-sm text-gray-600 space-y-2">
                    <div className="flex justify-between">
                      <span>Order Date:</span>
                      <span className="font-medium">{orderDetails.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Payment Method:</span>
                      <span className="font-medium">{orderDetails.paymentMethod}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estimated Delivery:</span>
                      <span className="font-medium">{orderDetails.estimatedDelivery}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2 mt-2">
                      <span className="font-semibold">Total Amount:</span>
                      <span className="font-bold text-lg text-green-600">{orderDetails.total}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
 
            {/* Next Steps */}
            <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
              <h3 className="font-semibold text-blue-900 mb-3">What's Next?</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">1</div>
                  <span className="text-blue-800">Order confirmation email sent</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">2</div>
                  <span className="text-blue-800">We're preparing your order</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">3</div>
                  <span className="text-blue-800">Delivery expected by {orderDetails.estimatedDelivery}</span>
                </div>
              </div>
            </div>
          </div>
 
          {/* Action Sidebar (Track Order button already ok) */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Track Your Order</h3>
              <button
                onClick={() => navigate(`/order-tracking/${orderDetails.id}`)}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Track Order
              </button>
            </div>
 
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  to="/home"
                  className="w-full border border-blue-600 text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 transition flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Continue Shopping
                </Link>
                
                <Link
                  to="/profile"
                  className="w-full border border-gray-600 text-gray-600 py-3 rounded-lg font-semibold hover:bg-gray-50 transition flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  View Order History
                </Link>
              </div>
            </div>
 
            {/* Support */}
            <div className="bg-yellow-50 rounded-lg border border-yellow-200 p-6">
              <h3 className="font-semibold text-yellow-900 mb-2">Need Help?</h3>
              <p className="text-yellow-800 text-sm mb-4">
                Our customer support team is here to help with any questions.
              </p>
              <div className="space-y-2 text-sm text-yellow-800">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+91 1800-123-4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>support@anandpharmacy.com</span>
                </div>
              </div>
            </div>
 
          </div>{/* Sidebar end */}
        </div>{/* Grid end */}
      </div>{/* Container end */}
    </div>
  );
};
 
export default OrderConfirmation;