// src/pages/Detail/HeartCareDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import cardiacData from "../../data/HeartCare.json";

const HeartCareDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [showCartSuccess, setShowCartSuccess] = useState(false);

  useEffect(() => {
    if (location.state?.product) {
      setProduct(location.state.product);
      findRelatedProducts(location.state.product);
    } else {
      // Find product in the data
      const foundProduct = cardiacData.medications?.find(p => p.id === parseInt(id));
      setProduct(foundProduct);
      if (foundProduct) findRelatedProducts(foundProduct);
    }
  }, [id, location.state]);

  const findRelatedProducts = (currentProduct) => {
    const related = cardiacData.medications
      ?.filter(p => 
        p.id !== currentProduct.id && 
        (p.brand === currentProduct.brand || 
         p.name.toLowerCase().includes(currentProduct.name.split(' ')[0].toLowerCase()))
      )
      .slice(0, 4) || [];
    
    setRelatedProducts(related);
  };

  // Get cart from localStorage
  const getCart = () => {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  };

  // Save cart to localStorage
  const saveCart = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  const handleAddToCart = () => {
    if (!product) return;

    const cart = getCart();
    
    // Check if product already exists in cart
    const existingItemIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingItemIndex > -1) {
      // Update quantity if product exists
      cart[existingItemIndex].quantity += quantity;
    } else {
      // Add new product to cart
      const cartProduct = {
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: parseFloat(product.price.replace('₹', '')) || 0,
        originalPrice: parseFloat(product.originalPrice?.replace('₹', '')) || 0,
        image: "https://via.placeholder.com/100x100?text=Heart+Care",
        category: "Heart Care",
        prescriptionRequired: true,
        quantity: quantity
      };
      cart.push(cartProduct);
    }
    
    saveCart(cart);
    
    // Show success message
    setShowCartSuccess(true);
    setTimeout(() => setShowCartSuccess(false), 3000);
    
    console.log(`Added ${quantity} of ${product.name} to cart`);
  };

  const handleBuyNow = () => {
    // Add to cart first, then navigate to checkout
    handleAddToCart();
    setTimeout(() => {
      navigate("/checkout");
    }, 500);
  };

  const handleViewCart = () => {
    navigate("/cart");
  };

  const handleConsultDoctor = () => {
    alert("Please consult your cardiologist for proper prescription and dosage instructions.");
  };

  const handleUploadPrescription = () => {
    alert("Redirecting to prescription upload page...");
    // Navigate to prescription upload page
  };

  if (!product) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Medication not found</div>
      </div>
    );
  }

  // Calculate price values
  const price = parseFloat(product.price.replace('₹', '')) || 0;
  const originalPrice = parseFloat(product.originalPrice?.replace('₹', '')) || 0;
  const savings = product.savings;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 text-sm text-gray-600">
          <li>
            <button onClick={() => navigate("/home/cardiac-care")} className="hover:text-red-600">
              Heart Care
            </button>
          </li>
          <li>/</li>
          <li className="text-gray-900 font-medium">{product.name}</li>
        </ol>
      </nav>

      {/* Cart Success Message */}
      {showCartSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in">
          <div className="flex items-center gap-3">
            <span className="text-xl">✓</span>
            <div>
              <p className="font-semibold">Added to Cart!</p>
              <p className="text-sm opacity-90">{quantity} × {product.name}</p>
              <p className="text-xs opacity-80">Prescription required for purchase</p>
            </div>
            <button 
              onClick={handleViewCart}
              className="ml-4 bg-white text-green-600 px-3 py-1 rounded text-sm font-semibold hover:bg-gray-100"
            >
              View Cart
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Image */}
        <div>
          <div className="bg-white rounded-lg border p-4 mb-4">
            <div className="w-full h-80 bg-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
              </div>
            </div>
          </div>

          {/* Quick Facts */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="font-semibold text-red-900 mb-3">Quick Facts</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex flex-col">
                <span className="text-red-600">Medication Type:</span>
                <span className="font-medium">Cardiac Care</span>
              </div>
              <div className="flex flex-col">
                <span className="text-red-600">Brand:</span>
                <span className="font-medium">{product.brand}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-red-600">Prescription:</span>
                <span className="font-medium text-red-600">Required</span>
              </div>
              <div className="flex flex-col">
                <span className="text-red-600">Safety:</span>
                <span className="font-medium text-green-600">Cardiologist Approved</span>
              </div>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-3">Order Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-blue-600">Price:</span>
                <span className="font-medium">₹{price} × {quantity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-600">Total:</span>
                <span className="font-bold text-lg">₹{price * quantity}</span>
              </div>
              {originalPrice > price && (
                <div className="flex justify-between">
                  <span className="text-blue-600">You Save:</span>
                  <span className="text-green-600 font-semibold">
                    ₹{(originalPrice - price) * quantity}
                  </span>
                </div>
              )}
              <div className="pt-2 border-t">
                <p className="text-blue-700 text-xs">
                  * Valid prescription required for purchase
                </p>
              </div>
            </div>
          </div>

          {/* Medical Information */}
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-3">Cardiac Medication Information</h3>
            <div className="space-y-2 text-sm text-blue-800">
              <p><strong>Class:</strong> Antiplatelet / Statin Therapy</p>
              <p><strong>Primary Use:</strong> Heart attack and stroke prevention</p>
              <p><strong>Monitoring:</strong> Regular blood tests recommended</p>
              <p><strong>Storage:</strong> Store in cool, dry place</p>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.brand}</p>

          {/* Important Warning */}
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-red-500 text-xl">⚠️</span>
              <span className="text-red-800 font-bold">Important Medical Notice</span>
            </div>
            <p className="text-red-700 text-sm">
              This cardiac medication requires a valid prescription from a cardiologist. 
              Do not self-medicate. Always follow your doctor's prescription and dosage instructions.
            </p>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl font-bold text-gray-900">
              {product.price}
            </span>
            {product.originalPrice && (
              <>
                <span className="text-xl text-gray-500 line-through">
                  {product.originalPrice}
                </span>
                <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-sm font-semibold">
                  Save {product.savings}
                </span>
              </>
            )}
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
            <p className="text-gray-600">{product.description}</p>
          </div>

          {/* Composition */}
          {product.composition && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Composition</h3>
              <p className="text-gray-600 bg-gray-50 p-3 rounded-lg border">
                {product.composition}
              </p>
            </div>
          )}

          {/* How to Order */}
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-900 mb-3">How to Order Cardiac Medications</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">1</div>
                <span className="text-green-800">Consult your cardiologist</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">2</div>
                <span className="text-green-800">Get a valid prescription</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">3</div>
                <span className="text-green-800">Upload prescription and order</span>
              </div>
            </div>
          </div>

          {/* Safety Information */}
          <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-900 mb-2">Safety Information</h3>
            <ul className="text-yellow-800 text-sm space-y-1 list-disc list-inside">
              <li>Take exactly as prescribed by your doctor</li>
              <li>Do not stop taking without medical advice</li>
              <li>Report any unusual bleeding or bruising</li>
              <li>Regular liver function tests may be required</li>
              <li>Inform your doctor about all other medications</li>
            </ul>
          </div>

          {/* Quantity and Actions */}
          <div className="border-t pt-6">
            <div className="flex items-center gap-4 mb-4">
              <span className="font-semibold">Quantity:</span>
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 hover:bg-gray-100 transition-colors text-gray-600"
                >
                  -
                </button>
                <span className="px-4 py-1 min-w-[40px] text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 hover:bg-gray-100 transition-colors text-gray-600"
                >
                  +
                </button>
              </div>
              <span className="text-sm text-gray-500">
                (Max: 3)
              </span>
            </div>

            <div className="flex gap-4 mb-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
              >
                <span>🛒</span>
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                <span>⚡</span>
                Buy Now
              </button>
            </div>

            {/* Prescription Actions */}
            <div className="flex gap-3 mb-3">
              <button
                onClick={handleConsultDoctor}
                className="flex-1 border border-blue-600 text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
              >
                <span>👨‍⚕️</span>
                Consult Cardiologist
              </button>
              <button
                onClick={handleUploadPrescription}
                className="flex-1 border border-green-600 text-green-600 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors flex items-center justify-center gap-2"
              >
                <span>📋</span>
                Upload Prescription
              </button>
            </div>

            {/* Quick Cart Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleViewCart}
                className="flex-1 border border-red-600 text-red-600 py-2 rounded-lg font-semibold hover:bg-red-50 transition-colors"
              >
                View Cart
              </button>
              <button
                onClick={() => navigate("/home")}
                className="flex-1 border border-gray-600 text-gray-600 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Heart Care Guidelines */}
      <div className="border-t pt-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Heart Care Best Practices</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Medication Management</h3>
            <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
              <li>Take medications at same time daily</li>
              <li>Never skip doses without doctor's advice</li>
              <li>Keep regular follow-up appointments</li>
              <li>Monitor blood pressure regularly</li>
            </ul>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Lifestyle Changes</h3>
            <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
              <li>Follow a heart-healthy diet</li>
              <li>Engage in regular physical activity</li>
              <li>Maintain healthy body weight</li>
              <li>Avoid smoking and limit alcohol</li>
            </ul>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Warning Signs</h3>
            <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
              <li>Chest pain or discomfort</li>
              <li>Shortness of breath</li>
              <li>Irregular heartbeat</li>
              <li>Severe dizziness or fainting</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Emergency Information */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-bold text-red-900 mb-4">Emergency Heart Symptoms</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-start gap-2">
            <span className="text-red-500 mt-1">🚨</span>
            <span>Chest pain or pressure lasting more than few minutes</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-red-500 mt-1">🚨</span>
            <span>Pain spreading to shoulder, arm, back, neck or jaw</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-red-500 mt-1">🚨</span>
            <span>Shortness of breath with or without chest discomfort</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-red-500 mt-1">🚨</span>
            <span>Cold sweat, nausea, vomiting or lightheadedness</span>
          </div>
        </div>
        <div className="mt-4 p-3 bg-red-100 rounded-lg">
          <p className="text-red-700 text-center font-semibold">
            ⚕️ Call Emergency Services Immediately if you experience any of these symptoms!
          </p>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="border-t pt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Heart Medications</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(relatedProduct => (
              <div
                key={relatedProduct.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-gray-100"
                onClick={() => navigate(`/ProductDetail/HeartCareDetail/${relatedProduct.id}`, { 
                  state: { product: relatedProduct } 
                })}
              >
                <div className="relative">
                  <div className="w-full h-32 bg-gray-200 rounded-t-lg flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-red-500 text-3xl">❤️</span>
                      <p className="text-gray-500 text-xs mt-1">Cardiac Care</p>
                    </div>
                  </div>
                  {relatedProduct.savings && (
                    <span className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
                      {relatedProduct.savings} OFF
                    </span>
                  )}
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                    Rx
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
                    {relatedProduct.name}
                  </h3>
                  <p className="text-gray-600 text-xs mb-2">{relatedProduct.brand}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-gray-900">
                      {relatedProduct.price}
                    </span>
                    {relatedProduct.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        {relatedProduct.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HeartCareDetail;