import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiPackage, FiTruck, FiCheckCircle, FiClock } from "react-icons/fi";
 
const TrackOrder = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
 
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
 
  const statusSteps = [
    { key: "confirmed", label: "Order Confirmed", icon: <FiPackage /> },
    { key: "packed", label: "Packed", icon: <FiClock /> },
    { key: "shipped", label: "Out For Delivery", icon: <FiTruck /> },
    { key: "delivered", label: "Delivered", icon: <FiCheckCircle /> },
  ];
 
  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const found = savedOrders.find((o) => o.id === orderId);
 
    setOrder(found || null);
    setLoading(false);
  }, [orderId]);
 
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin h-10 w-10 border-b-2 border-blue-600 rounded-full"></div>
      </div>
    );
  }
 
  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 text-center">
        <h2 className="text-lg sm:text-xl text-gray-700 mb-4">Order not found</h2>
        <button
          onClick={() => navigate("/home")}
          className="px-5 py-3 bg-blue-600 text-white rounded-lg"
        >
          Go Back Home
        </button>
      </div>
    );
  }
 
  const currentIndex = statusSteps.findIndex((s) => s.key === order.status);
  const progressPercent = ((currentIndex + 1) / statusSteps.length) * 100;
 
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6"
    >
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-6 sm:p-8"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            Track Your Order
          </h1>
          <p className="mt-2 text-gray-600 text-sm sm:text-base">
            Order ID:{" "}
            <span className="text-blue-700 font-semibold break-all">
              {order.id}
            </span>
          </p>
        </div>
 
        {/* PROGRESS BAR */}
        <div className="relative mb-12 w-full">
          {/* Base Line */}
          <div className="absolute top-1/2 left-0 right-0 h-2 bg-gray-200 rounded-full -translate-y-1/2"></div>
 
          {/* Animated Fill */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute top-1/2 left-0 h-2 bg-blue-600 rounded-full -translate-y-1/2"
          ></motion.div>
 
          {/* Truck Icon */}
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: `${progressPercent}%` }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute -top-7 sm:-top-8"
            style={{ transform: "translateX(-50%)" }}
          >
            <FiTruck className="text-blue-600 text-2xl sm:text-3xl drop-shadow-md" />
          </motion.div>
 
          {/* Status Nodes */}
          <div className="flex justify-between mt-8">
            {statusSteps.map((step, index) => {
              const active = index <= currentIndex;
 
              return (
                <div key={step.key} className="flex flex-col items-center w-16 sm:w-20">
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full text-lg sm:text-xl border-2 transition-all
                      ${
                        active
                          ? "bg-blue-600 text-white border-blue-600 shadow-lg scale-110"
                          : "bg-white text-gray-500 border-gray-300"
                      }
                    `}
                  >
                    {step.icon}
                  </div>
 
                  <p
                    className={`mt-2 text-[10px] sm:text-xs md:text-sm font-medium text-center ${
                      active ? "text-blue-700" : "text-gray-500"
                    }`}
                  >
                    {step.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
 
        {/* Delivery ETA */}
        <div className="bg-blue-50 border border-blue-200 p-4 sm:p-5 rounded-xl mb-10 shadow-sm">
          <h3 className="text-base sm:text-lg font-semibold text-blue-800">
            Estimated Delivery
          </h3>
          <p className="text-xl sm:text-2xl font-bold text-blue-700 mt-1">
            {order.estimatedDelivery}
          </p>
          <p className="text-xs sm:text-sm text-blue-600 mt-2">
            Your medicines are on the way 🚚
          </p>
        </div>
 
        {/* Order Details */}
        <div className="p-4 sm:p-6 bg-gray-100 rounded-xl mb-8">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
            Order Details
          </h2>
          <p className="text-gray-700 text-sm sm:text-base">
            <strong>Order Date:</strong> {order.date}
          </p>
          <p className="text-gray-700 text-sm sm:text-base">
            <strong>Payment Method:</strong> {order.paymentMethod}
          </p>
          <p className="text-gray-700 text-sm sm:text-base">
            <strong>Total:</strong> {order.total}
          </p>
        </div>
 
        {/* Shipping Address */}
        <div className="p-4 sm:p-6 bg-white border rounded-xl shadow-sm mb-8">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
            Shipping Address
          </h2>
          <p className="text-gray-700 font-medium text-sm sm:text-base">
            {order.shippingAddress.fullName}
          </p>
          <p className="text-gray-700 text-sm sm:text-base">
            {order.shippingAddress.address}
          </p>
          <p className="text-gray-700 text-sm sm:text-base">
            {order.shippingAddress.city}, {order.shippingAddress.state} -{" "}
            {order.shippingAddress.pincode}
          </p>
          <p className="text-gray-700 text-sm sm:text-base">
            Phone: {order.shippingAddress.phone}
          </p>
        </div>
 
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 text-sm sm:text-base"
        >
          Back to Home
        </button>
      </motion.div>
    </motion.div>
  );
};
 
export default TrackOrder;