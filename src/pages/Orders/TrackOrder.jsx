// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { FiPackage, FiTruck, FiCheckCircle, FiClock } from "react-icons/fi";
 
// const TrackOrder = () => {
//   const { orderId } = useParams();
//   const navigate = useNavigate();
 
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
 
//   const statusSteps = [
//     { key: "confirmed", label: "Order Confirmed", icon: <FiPackage /> },
//     { key: "packed", label: "Packed", icon: <FiClock /> },
//     { key: "shipped", label: "Out For Delivery", icon: <FiTruck /> },
//     { key: "delivered", label: "Delivered", icon: <FiCheckCircle /> },
//   ];
 
//   useEffect(() => {
//     const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
//     const found = savedOrders.find((o) => o.id === orderId);
 
//     setOrder(found || null);
//     setLoading(false);
//   }, [orderId]);
 
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100">
//         <div className="animate-spin h-10 w-10 border-b-2 border-blue-600 rounded-full"></div>
//       </div>
//     );
//   }
 
//   if (!order) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 text-center">
//         <h2 className="text-lg sm:text-xl text-gray-700 mb-4">Order not found</h2>
//         <button
//           onClick={() => navigate("/home")}
//           className="px-5 py-3 bg-blue-600 text-white rounded-lg"
//         >
//           Go Back Home
//         </button>
//       </div>
//     );
//   }
 
//   const currentIndex = statusSteps.findIndex((s) => s.key === order.status);
//   const progressPercent = ((currentIndex + 1) / statusSteps.length) * 100;
 
//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6"
//     >
//       <motion.div
//         initial={{ y: 30, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.4 }}
//         className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-6 sm:p-8"
//       >
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
//             Track Your Order
//           </h1>
//           <p className="mt-2 text-gray-600 text-sm sm:text-base">
//             Order ID:{" "}
//             <span className="text-blue-700 font-semibold break-all">
//               {order.id}
//             </span>
//           </p>
//         </div>
 
//         {/* PROGRESS BAR */}
//         <div className="relative mb-12 w-full">
//           {/* Base Line */}
//           <div className="absolute top-1/2 left-0 right-0 h-2 bg-gray-200 rounded-full -translate-y-1/2"></div>
 
//           {/* Animated Fill */}
//           <motion.div
//             initial={{ width: 0 }}
//             animate={{ width: `${progressPercent}%` }}
//             transition={{ duration: 0.8, ease: "easeInOut" }}
//             className="absolute top-1/2 left-0 h-2 bg-blue-600 rounded-full -translate-y-1/2"
//           ></motion.div>
 
//           {/* Truck Icon */}
//           <motion.div
//             initial={{ x: 0 }}
//             animate={{ x: `${progressPercent}%` }}
//             transition={{ duration: 0.8, ease: "easeInOut" }}
//             className="absolute -top-7 sm:-top-8"
//             style={{ transform: "translateX(-50%)" }}
//           >
//             <FiTruck className="text-blue-600 text-2xl sm:text-3xl drop-shadow-md" />
//           </motion.div>
 
//           {/* Status Nodes */}
//           <div className="flex justify-between mt-8">
//             {statusSteps.map((step, index) => {
//               const active = index <= currentIndex;
 
//               return (
//                 <div key={step.key} className="flex flex-col items-center w-16 sm:w-20">
//                   <div
//                     className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full text-lg sm:text-xl border-2 transition-all
//                       ${
//                         active
//                           ? "bg-blue-600 text-white border-blue-600 shadow-lg scale-110"
//                           : "bg-white text-gray-500 border-gray-300"
//                       }
//                     `}
//                   >
//                     {step.icon}
//                   </div>
 
//                   <p
//                     className={`mt-2 text-[10px] sm:text-xs md:text-sm font-medium text-center ${
//                       active ? "text-blue-700" : "text-gray-500"
//                     }`}
//                   >
//                     {step.label}
//                   </p>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
 
//         {/* Delivery ETA */}
//         <div className="bg-blue-50 border border-blue-200 p-4 sm:p-5 rounded-xl mb-10 shadow-sm">
//           <h3 className="text-base sm:text-lg font-semibold text-blue-800">
//             Estimated Delivery
//           </h3>
//           <p className="text-xl sm:text-2xl font-bold text-blue-700 mt-1">
//             {order.estimatedDelivery}
//           </p>
//           <p className="text-xs sm:text-sm text-blue-600 mt-2">
//             Your medicines are on the way 🚚
//           </p>
//         </div>
 
//         {/* Order Details */}
//         <div className="p-4 sm:p-6 bg-gray-100 rounded-xl mb-8">
//           <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
//             Order Details
//           </h2>
//           <p className="text-gray-700 text-sm sm:text-base">
//             <strong>Order Date:</strong> {order.date}
//           </p>
//           <p className="text-gray-700 text-sm sm:text-base">
//             <strong>Payment Method:</strong> {order.paymentMethod}
//           </p>
//           <p className="text-gray-700 text-sm sm:text-base">
//             <strong>Total:</strong> {order.total}
//           </p>
//         </div>
 
//         {/* Shipping Address */}
//         <div className="p-4 sm:p-6 bg-white border rounded-xl shadow-sm mb-8">
//           <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
//             Shipping Address
//           </h2>
//           <p className="text-gray-700 font-medium text-sm sm:text-base">
//             {order.shippingAddress.fullName}
//           </p>
//           <p className="text-gray-700 text-sm sm:text-base">
//             {order.shippingAddress.address}
//           </p>
//           <p className="text-gray-700 text-sm sm:text-base">
//             {order.shippingAddress.city}, {order.shippingAddress.state} -{" "}
//             {order.shippingAddress.pincode}
//           </p>
//           <p className="text-gray-700 text-sm sm:text-base">
//             Phone: {order.shippingAddress.phone}
//           </p>
//         </div>
 
//         {/* Back Button */}
//         <button
//           onClick={() => navigate("/")}
//           className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 text-sm sm:text-base"
//         >
//           Back to Home
//         </button>
//       </motion.div>
//     </motion.div>
//   );
// };
 
// export default TrackOrder;























import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiPackage, FiBox, FiTruck, FiCheckCircle, FiMapPin, FiCalendar, FiCreditCard, FiHome, FiChevronLeft, FiDownload, FiPrinter, FiFileText } from "react-icons/fi";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const TrackOrder = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const receiptRef = useRef(null);

  const statusSteps = [
    { key: "confirmed", label: "Confirmed", icon: <FiCheckCircle />, description: "Order received" },
    { key: "packed", label: "Packed", icon: <FiBox />, description: "Items prepared" },
    { key: "shipped", label: "Shipped", icon: <FiTruck />, description: "In transit" },
    { key: "out_for_delivery", label: "Out for Delivery", icon: <FiPackage />, description: "On the way" },
    { key: "delivered", label: "Delivered", icon: <FiHome />, description: "Delivered" },
  ];

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const found = savedOrders.find((o) => o.id === orderId);
    setOrder(found || null);
    setLoading(false);
  }, [orderId]);

  // Function to generate and download PDF receipt
  const downloadReceipt = async () => {
    if (!receiptRef.current || !order) return;

    try {
      const canvas = await html2canvas(receiptRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a5",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // Calculate aspect ratio
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = imgWidth / imgHeight;
      let imgHeightInPDF = pdfHeight - 20; // Leave some margin
      let imgWidthInPDF = imgHeightInPDF * ratio;
      
      // If width is too large, scale down
      if (imgWidthInPDF > pdfWidth - 20) {
        imgWidthInPDF = pdfWidth - 20;
        imgHeightInPDF = imgWidthInPDF / ratio;
      }

      // Center the image
      const x = (pdfWidth - imgWidthInPDF) / 2;
      const y = (pdfHeight - imgHeightInPDF) / 2;

      pdf.addImage(imgData, "PNG", x, y, imgWidthInPDF, imgHeightInPDF);
      pdf.save(`receipt-${order.id}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      // Fallback to print dialog
      window.print();
    }
  };

  // Function to print receipt
  const printReceipt = () => {
    const printContent = document.getElementById("printable-receipt");
    if (printContent) {
      const printWindow = window.open("", "_blank");
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Receipt - ${order.id}</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              margin: 20px; 
              color: #333;
            }
            .receipt-container {
              max-width: 500px;
              margin: 0 auto;
              padding: 20px;
              border: 1px solid #ddd;
              border-radius: 8px;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
              padding-bottom: 20px;
              border-bottom: 2px solid #3b82f6;
            }
            .header h1 {
              color: #1f2937;
              margin-bottom: 5px;
            }
            .order-id {
              color: #6b7280;
              font-size: 14px;
            }
            .section {
              margin-bottom: 25px;
            }
            .section h3 {
              color: #374151;
              border-bottom: 1px solid #e5e7eb;
              padding-bottom: 8px;
              margin-bottom: 15px;
            }
            .row {
              display: flex;
              justify-content: space-between;
              margin-bottom: 8px;
              padding-bottom: 8px;
              border-bottom: 1px dashed #f3f4f6;
            }
            .total-row {
              font-weight: bold;
              font-size: 18px;
              color: #1f2937;
              border-top: 2px solid #3b82f6;
              margin-top: 10px;
              padding-top: 10px;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #e5e7eb;
              color: #6b7280;
              font-size: 12px;
            }
            @media print {
              body { margin: 0; }
              .receipt-container { border: none; }
              button { display: none; }
            }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
          <script>
            window.onload = function() {
              window.print();
              setTimeout(() => window.close(), 1000);
            }
          </script>
        </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="relative">
          <div className="h-12 w-12 rounded-full border-4 border-blue-100"></div>
          <div className="absolute top-0 left-0 h-12 w-12 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
        </div>
        <p className="mt-4 text-gray-600 font-medium">Loading order details...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="bg-white rounded-xl shadow-sm p-6 max-w-sm w-full text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-red-100 flex items-center justify-center mb-4">
            <FiPackage className="text-2xl text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Order Not Found</h2>
          <p className="text-gray-600 text-sm mb-6">The order you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate("/home")}
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  const currentIndex = statusSteps.findIndex((s) => s.key === order.status);
  const progressPercent = ((currentIndex + 1) / statusSteps.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hidden Printable Receipt */}
      <div id="printable-receipt" className="hidden">
        <div className="receipt-container">
          <div className="header">
            <h1>Payment Receipt</h1>
            <div className="order-id">Order ID: {order.id}</div>
            <div>Date: {order.date}</div>
          </div>
          
          <div className="section">
            <h3>Order Details</h3>
            <div className="row">
              <span>Order Date:</span>
              <span>{order.date}</span>
            </div>
            <div className="row">
              <span>Payment Method:</span>
              <span>{order.paymentMethod}</span>
            </div>
            <div className="row">
              <span>Status:</span>
              <span>{statusSteps[currentIndex]?.label || "Processing"}</span>
            </div>
            <div className="row total-row">
              <span>Total Amount:</span>
              <span>{order.total}</span>
            </div>
          </div>

          <div className="section">
            <h3>Shipping Address</h3>
            <div>{order.shippingAddress.fullName}</div>
            <div>{order.shippingAddress.address}</div>
            <div>{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</div>
            <div>Phone: {order.shippingAddress.phone}</div>
          </div>

          <div className="section">
            <h3>Order Summary</h3>
            {order.items && order.items.map((item, index) => (
              <div key={index} className="row">
                <span>{item.name} x{item.quantity}</span>
                <span>{item.price}</span>
              </div>
            ))}
            <div className="row">
              <span>Subtotal:</span>
              <span>{order.total}</span>
            </div>
            <div className="row">
              <span>Shipping:</span>
              <span>₹0.00</span>
            </div>
            <div className="row">
              <span>Tax:</span>
              <span>₹0.00</span>
            </div>
            <div className="row total-row">
              <span>Total:</span>
              <span>{order.total}</span>
            </div>
          </div>

          <div className="footer">
            <p>Thank you for your purchase!</p>
            <p>For any queries, contact: support@medicare.com | 1-800-123-4567</p>
            <p>This is a computer-generated receipt and does not require a signature.</p>
          </div>
        </div>
      </div>

      {/* Visible Receipt Card for Preview */}
      <div ref={receiptRef} className="fixed -top-full -left-full">
        <div className="bg-white p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <FiFileText className="text-3xl text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Payment Receipt</h1>
            </div>
            <p className="text-gray-600 text-sm">Order ID: {order.id}</p>
            <p className="text-gray-600 text-sm">Date: {order.date}</p>
          </div>
          
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-3 pb-2 border-b">Order Details</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Order Date:</span>
                <span className="font-medium">{order.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Method:</span>
                <span className="font-medium">{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="font-medium">{statusSteps[currentIndex]?.label || "Processing"}</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-3 pb-2 border-b">Order Summary</h3>
            {order.items && order.items.map((item, index) => (
              <div key={index} className="flex justify-between py-1 border-b border-gray-100 last:border-0">
                <span className="text-gray-700">{item.name} ×{item.quantity}</span>
                <span className="font-medium">{item.price}</span>
              </div>
            ))}
            <div className="mt-4 pt-3 border-t">
              <div className="flex justify-between py-1">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium">{order.total}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-600">Shipping:</span>
                <span className="font-medium">₹0.00</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-600">Tax:</span>
                <span className="font-medium">₹0.00</span>
              </div>
              <div className="flex justify-between py-2 mt-2 pt-2 border-t border-gray-300">
                <span className="font-bold text-lg">Total:</span>
                <span className="font-bold text-lg text-blue-600">{order.total}</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-3 pb-2 border-b">Shipping Address</h3>
            <div className="text-gray-700">
              <p className="font-medium">{order.shippingAddress.fullName}</p>
              <p>{order.shippingAddress.address}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
              <p className="mt-1">Phone: {order.shippingAddress.phone}</p>
            </div>
          </div>

          <div className="text-center pt-6 border-t border-gray-200">
            <p className="text-gray-500 text-sm">Thank you for your purchase!</p>
            <p className="text-gray-500 text-xs mt-1">For any queries, contact: support@medicare.com</p>
            <p className="text-gray-400 text-xs mt-1">This is a computer-generated receipt</p>
          </div>
        </div>
      </div>

      {/* Main UI */}
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <FiChevronLeft className="text-xl" />
              <span className="hidden sm:inline">Back</span>
            </button>
            <h1 className="text-lg font-semibold text-gray-800">Track Order</h1>
            <div className="w-8"></div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Order ID Banner */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <p className="text-sm text-blue-700 font-medium">Order ID</p>
              <p className="text-base font-mono font-bold text-gray-800 break-all">{order.id}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Estimated Delivery</p>
              <p className="text-base font-semibold text-gray-800">{order.estimatedDelivery}</p>
            </div>
          </div>
        </div>

        {/* Progress Tracking Section */}
        <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">Delivery Progress</h2>
          
          <div className="relative px-2">
            <div className="absolute top-6 left-0 right-0 h-1.5 bg-gray-200 z-0">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 1 }}
                className="h-full bg-blue-500 rounded-full"
              />
            </div>

            <div className="relative flex justify-between mb-8">
              {statusSteps.map((step, index) => {
                const isActive = index <= currentIndex;
                const isCurrent = index === currentIndex;
                
                return (
                  <div key={step.key} className="relative z-10 flex flex-col items-center">
                    <div className="w-12 h-12 flex items-center justify-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300
                        ${isActive 
                          ? "bg-blue-500 border-blue-500 text-white" 
                          : "bg-white border-gray-300 text-gray-400"
                        }
                        ${isCurrent ? "ring-2 ring-blue-200 ring-offset-2 scale-110" : ""}
                      `}>
                        <div className="text-lg">
                          {step.icon}
                        </div>
                      </div>
                    </div>
                    
                    <div className="absolute top-14 w-20 text-center">
                      <p className={`text-xs font-medium ${isActive ? "text-gray-800" : "text-gray-500"}`}>
                        {step.label}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5 hidden sm:block">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="lg:mt-20 mt-14 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-700 font-medium">Current Status</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {statusSteps[currentIndex]?.label || "Processing"}
                  </p>
                </div>
                <div className="text-3xl animate-pulse">🚚</div>
              </div>
            </div>
          </div>
        </div>

        {/* Order & Shipping Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Order Details Card */}
          <div className="bg-white rounded-xl shadow-sm p-5">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FiCreditCard className="text-blue-500" />
              Order Details
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Order Date</span>
                <span className="font-medium text-gray-800">{order.date}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Payment Method</span>
                <span className="font-medium text-gray-800">{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-800 font-semibold">Total Amount</span>
                <span className="text-xl font-bold text-blue-600">{order.total}</span>
              </div>
            </div>
          </div>

          {/* Shipping Address Card */}
          <div className="bg-white rounded-xl shadow-sm p-5">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FiMapPin className="text-blue-500" />
              Shipping Address
            </h3>
            <div className="space-y-3">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="font-semibold text-gray-800 mb-1">{order.shippingAddress.fullName}</p>
                <p className="text-gray-700 text-sm mb-2">{order.shippingAddress.address}</p>
                <p className="text-gray-700 text-sm">
                  {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
                </p>
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="text-gray-700 text-sm">
                    <span className="font-medium">Phone:</span> {order.shippingAddress.phone}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Receipt Actions */}
        <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FiFileText className="text-blue-500" />
            Payment Receipt
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            Download or print your payment receipt for this order.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={downloadReceipt}
              className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <FiDownload />
              Download PDF Receipt
            </button>
            <button
              onClick={printReceipt}
              className="flex-1 py-3 bg-white border border-gray-300 text-gray-800 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              <FiPrinter />
              Print Receipt
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate("/")}
            className="flex-1 py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-900 transition-colors flex items-center justify-center gap-2"
          >
            <FiHome />
            Back to Home
          </button>
        </div>

        {/* Status Timeline - Mobile Only */}
        <div className="mt-8 sm:hidden bg-white rounded-xl shadow-sm p-5">
          <h4 className="font-semibold text-gray-800 mb-4">Delivery Timeline</h4>
          <div className="space-y-4">
            {statusSteps.map((step, index) => {
              const isActive = index <= currentIndex;
              const isCurrent = index === currentIndex;
              
              return (
                <div key={step.key} className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5
                    ${isActive ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-400"}
                    ${isCurrent ? "ring-2 ring-blue-300" : ""}
                  `}>
                    {step.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <p className={`font-medium ${isActive ? "text-gray-800" : "text-gray-500"}`}>
                        {step.label}
                      </p>
                      {isCurrent && (
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-0.5">{step.description}</p>
                    {index < statusSteps.length - 1 && (
                      <div className={`h-6 w-0.5 ml-3.5 mt-2 ${isActive ? "bg-blue-300" : "bg-gray-200"}`}></div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-gray-50 rounded-xl p-5 border border-gray-200">
          <p className="text-sm text-gray-600 text-center">
            Need help with your order? Contact support at{" "}
            <a href="tel:+18001234567" className="text-blue-600 font-medium hover:underline">
              1-800-123-4567
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;