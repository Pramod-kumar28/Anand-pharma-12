// src/pages/Detail/CovidEssentialsDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import covidData from "../../data/covidesentials.json";

const CovidDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [showCartSuccess, setShowCartSuccess] = useState(false);
  const [prescriptionRequired, setPrescriptionRequired] = useState(false);

  useEffect(() => {
    if (location.state?.product) {
      const prod = location.state.product;
      setProduct(prod);
      setPrescriptionRequired(
        prod.category === "Oxygen Therapy" || 
        prod.name.toLowerCase().includes("oxygen") ||
        prod.priceNumeric > 10000
      );
      findRelatedProducts(prod);
    } else {
      // Find product in the data
      const foundProduct = covidData.find(p => p.id === parseInt(id));
      if (foundProduct) {
        setProduct(foundProduct);
        setPrescriptionRequired(
          foundProduct.category === "Oxygen Therapy" || 
          foundProduct.name.toLowerCase().includes("oxygen") ||
          foundProduct.priceNumeric > 10000
        );
        findRelatedProducts(foundProduct);
      }
    }
  }, [id, location.state]);

  const findRelatedProducts = (currentProduct) => {
    const related = covidData
      .filter(p => 
        p.id !== currentProduct.id && 
        (p.category === currentProduct.category || 
         (currentProduct.category.includes("Mask") && p.category.includes("Mask")) ||
         (currentProduct.category.includes("Sanitizer") && p.category.includes("Sanitizer")))
      )
      .slice(0, 4);
    
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

    // Check if prescription is required
    if (prescriptionRequired) {
      alert("This product requires a doctor's prescription. Please consult your healthcare provider.");
      return;
    }

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
        price: product.priceNumeric,
        originalPrice: product.originalPriceNumeric,
        image: product.image,
        category: product.category,
        prescriptionRequired: prescriptionRequired,
        quantity: quantity,
        covidEssential: true
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
    if (prescriptionRequired) {
      alert("This product requires a doctor's prescription. Please consult your healthcare provider before purchase.");
      return;
    }
    
    // Add to cart first, then navigate to checkout
    handleAddToCart();
    setTimeout(() => {
      navigate("/checkout");
    }, 500);
  };

  const handleConsultDoctor = () => {
    alert("Please consult your doctor or call emergency helpline 1075 for prescription requirements.");
  };

  const handleViewCart = () => {
    navigate("/cart");
  };

  if (!product) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Product not found</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 text-sm text-gray-600">
          <li>
            <button onClick={() => navigate("/home/covid-essentials")} className="hover:text-red-600">
              COVID Essentials
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
            <i className="fas fa-check text-xl"></i>
            <div>
              <p className="font-semibold">Added to Cart!</p>
              <p className="text-sm opacity-90">{quantity} × {product.name}</p>
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

      {/* Prescription Warning */}
      {prescriptionRequired && (
        <div className="mb-6 bg-red-50 border border-red-300 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <i className="fas fa-user-md text-red-500 text-2xl"></i>
            <div>
              <h3 className="font-bold text-red-900">Prescription Required</h3>
              <p className="text-red-800 text-sm">
                This medical device requires a valid doctor's prescription for purchase.
                Please consult your healthcare provider before ordering.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Image */}
        <div>
          <div className="bg-white rounded-lg border p-4 mb-4">
            <div className="w-full h-80 bg-gray-100 rounded-lg flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain rounded-lg"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/400x400?text=COVID+Essential";
                }}
              />
            </div>
          </div>
          
          {/* Quick Facts */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="font-semibold text-red-900 mb-3">Quick Facts</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex flex-col">
                <span className="text-red-600">Category:</span>
                <span className="font-medium">{product.category}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-red-600">Brand:</span>
                <span className="font-medium">{product.brand}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-red-600">Usage:</span>
                <span className="font-medium">
                  {product.category === "Face Mask" ? "Personal Protection" : 
                   product.category === "Test Kit" ? "Home Testing" : 
                   product.category === "Oxygen Therapy" ? "Medical Use" : "General Use"}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-red-600">Prescription:</span>
                <span className={`font-medium ${prescriptionRequired ? "text-red-600" : "text-green-600"}`}>
                  {prescriptionRequired ? (
                    <span className="flex items-center gap-1">
                      <i className="fas fa-user-md"></i>
                      Required
                    </span>
                  ) : "Not Required"}
                </span>
              </div>
            </div>
          </div>

          {/* Safety Warning */}
          <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-900 mb-2 flex items-center gap-2">
              <i className="fas fa-exclamation-triangle"></i>
              Safety First
            </h3>
            <ul className="text-xs text-yellow-800 space-y-1">
              <li className="flex items-start gap-1">
                <i className="fas fa-circle text-xs mt-1"></i>
                Read instructions carefully before use
              </li>
              <li className="flex items-start gap-1">
                <i className="fas fa-circle text-xs mt-1"></i>
                Follow all safety guidelines
              </li>
              <li className="flex items-start gap-1">
                <i className="fas fa-circle text-xs mt-1"></i>
                Keep away from children
              </li>
              <li className="flex items-start gap-1">
                <i className="fas fa-circle text-xs mt-1"></i>
                Store in cool, dry place
              </li>
              {product.category === "Sanitizer" && (
                <li className="flex items-start gap-1">
                  <i className="fas fa-circle text-xs mt-1"></i>
                  Keep away from flames
                </li>
              )}
              {product.category === "Oxygen Therapy" && (
                <li className="flex items-start gap-1">
                  <i className="fas fa-circle text-xs mt-1"></i>
                  No smoking near device
                </li>
              )}
            </ul>
          </div>

          {/* Cart Summary */}
          <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-900 mb-3">Order Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-green-600">Price:</span>
                <span className="font-medium">₹{product.priceNumeric.toLocaleString()} × {quantity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-600">Total:</span>
                <span className="font-bold text-lg">₹{(product.priceNumeric * quantity).toLocaleString()}</span>
              </div>
              {product.originalPriceNumeric > product.priceNumeric && (
                <div className="flex justify-between">
                  <span className="text-green-600">You Save:</span>
                  <span className="text-green-600 font-semibold">
                    ₹{((product.originalPriceNumeric - product.priceNumeric) * quantity).toLocaleString()}
                  </span>
                </div>
              )}
              <div className="pt-2 border-t">
                <p className="text-green-700 text-xs">
                  <i className="fas fa-truck mr-1"></i>
                  Free delivery on orders above ₹499
                </p>
                {prescriptionRequired && (
                  <p className="text-red-600 text-xs font-semibold">
                    <i className="fas fa-file-medical mr-1"></i>
                    Prescription verification required before dispatch
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div>
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-gray-600 mb-4">{product.brand}</p>
            </div>
            {product.category === "Face Mask" && (
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                <i className="fas fa-head-side-mask"></i>
                COVID Protection
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1 bg-yellow-100 px-3 py-1 rounded-full">
              <i className="fas fa-star text-yellow-400"></i>
              <span className="font-semibold text-yellow-700">4.6</span>
              <span className="text-yellow-600 text-sm">(856 reviews)</span>
            </div>
            <div className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">
              In Stock • Fast Delivery
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl font-bold text-gray-900">
              ₹{product.priceNumeric.toLocaleString()}
            </span>
            {product.originalPriceNumeric > product.priceNumeric && (
              <>
                <span className="text-xl text-gray-500 line-through">
                  ₹{product.originalPriceNumeric.toLocaleString()}
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

          {/* Key Features */}
          {product.keyFeatures && product.keyFeatures.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Key Features</h3>
              <ul className="text-gray-600 space-y-2">
                {product.keyFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <i className="fas fa-check text-green-500 mt-1"></i>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* How to Use */}
          {product.howToUse && (
            <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                <i className="fas fa-book"></i>
                How to Use
              </h3>
              <p className="text-blue-800">{product.howToUse}</p>
            </div>
          )}

          {/* Ingredients/Specifications */}
          {product.ingredients && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                {product.category === "Sanitizer" ? "Ingredients" : 
                 product.category === "Face Mask" ? "Materials" : "Specifications"}
              </h3>
              <p className="text-gray-600 bg-gray-50 p-3 rounded-lg border">
                {product.ingredients}
              </p>
            </div>
          )}

          {/* Warnings */}
          {product.warnings && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-semibold text-red-900 mb-2 flex items-center gap-2">
                <i className="fas fa-exclamation-triangle"></i>
                Important Warnings
              </h3>
              <p className="text-red-800 text-sm">{product.warnings}</p>
              <div className="mt-2 text-xs text-red-700">
                <p className="flex items-center gap-1">
                  <i className="fas fa-phone"></i>
                  For emergency numbers, call 1075
                </p>
                <p className="flex items-center gap-1">
                  <i className="fas fa-shield-virus"></i>
                  Follow all COVID safety protocols
                </p>
                <p className="flex items-center gap-1">
                  <i className="fas fa-user-md"></i>
                  Consult doctor for medical advice
                </p>
              </div>
            </div>
          )}

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
                  onClick={() => setQuantity(prescriptionRequired ? Math.min(1, quantity + 1) : Math.min(5, quantity + 1))}
                  className="px-3 py-1 hover:bg-gray-100 transition-colors text-gray-600"
                >
                  +
                </button>
              </div>
              <span className="text-sm text-gray-500">
                {prescriptionRequired ? "(Maximum: 1 per order)" : "(Maximum: 5 per order)"}
              </span>
            </div>

            <div className="flex gap-4 mb-3">
              {prescriptionRequired ? (
                <button
                  onClick={handleConsultDoctor}
                  className="flex-1 bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
                >
                  <i className="fas fa-user-md"></i>
                  Consult Doctor First
                </button>
              ) : (
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                >
                  <i className="fas fa-shopping-cart"></i>
                  Add to Cart
                </button>
              )}
              
              <button
                onClick={handleBuyNow}
                className={`flex-1 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
                  prescriptionRequired
                    ? "bg-yellow-600 text-white hover:bg-yellow-700"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
              >
                <i className="fas fa-bolt"></i>
                {prescriptionRequired ? "Request Prescription" : "Buy Now"}
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
                onClick={() => navigate("/home/covid-essentials")}
                className="flex-1 border border-gray-600 text-gray-600 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                View More Essentials
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* COVID Safety Guidelines */}
      <div className="border-t pt-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">COVID-19 Safety Guidelines</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white border border-red-200 rounded-lg p-4">
            <h3 className="font-semibold text-red-900 mb-2 flex items-center gap-2">
              <i className="fas fa-head-side-mask"></i>
              Mask Usage
            </h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start gap-2">
                <i className="fas fa-check text-green-500 mt-1"></i>
                Wear mask covering nose and mouth
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check text-green-500 mt-1"></i>
                Change mask every 8 hours
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check text-green-500 mt-1"></i>
                N95 masks are single-use only
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check text-green-500 mt-1"></i>
                Dispose of masks properly
              </li>
            </ul>
          </div>
          <div className="bg-white border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
              <i className="fas fa-pump-soap"></i>
              Sanitization
            </h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start gap-2">
                <i className="fas fa-check text-green-500 mt-1"></i>
                Use 70% alcohol-based sanitizer
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check text-green-500 mt-1"></i>
                Rub hands for 20 seconds
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check text-green-500 mt-1"></i>
                Sanitize frequently touched surfaces
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check text-green-500 mt-1"></i>
                Wash hands with soap regularly
              </li>
            </ul>
          </div>
          <div className="bg-white border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
              <i className="fas fa-home"></i>
              Home Monitoring
            </h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start gap-2">
                <i className="fas fa-check text-green-500 mt-1"></i>
                Check temperature twice daily
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check text-green-500 mt-1"></i>
                Monitor oxygen levels (SpO2)
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check text-green-500 mt-1"></i>
                Watch for breathing difficulties
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check text-green-500 mt-1"></i>
                Isolate if symptoms appear
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Emergency Information */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-bold text-red-900 mb-4 flex items-center gap-2">
          <i className="fas fa-exclamation-triangle"></i>
          When to Seek Emergency Help
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <i className="fas fa-thermometer-half text-red-500"></i>
            <span>Fever above 100.4°F for 2+ days</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="fas fa-lungs text-red-500"></i>
            <span>Difficulty in breathing</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="fas fa-heartbeat text-red-500"></i>
            <span>Oxygen level (SpO2) below 94%</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="fas fa-heart text-red-500"></i>
            <span>Chest pain or pressure</span>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-red-300">
          <h4 className="font-semibold text-red-900 mb-2">Emergency Contacts:</h4>
          <div className="flex flex-wrap gap-4">
            <div className="text-center">
              <div className="text-xs text-red-600">National Helpline</div>
              <div className="font-bold text-red-900">1075</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-red-600">Ambulance</div>
              <div className="font-bold text-red-900">102</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-red-600">MyGov Helpline</div>
              <div className="font-bold text-red-900">011-23978046</div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="border-t pt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related COVID Essentials</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(relatedProduct => (
              <div
                key={relatedProduct.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-gray-100"
                onClick={() => navigate(`/ProductDetail/CovidDetail/${relatedProduct.id}`, { 
                  state: { product: relatedProduct } 
                })}
              >
                <div className="relative">
                  <div className="w-full h-32 bg-gray-100 rounded-t-lg flex items-center justify-center">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover rounded-t-lg"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/300x200?text=COVID+Essential";
                      }}
                    />
                  </div>
                  {relatedProduct.savings && (
                    <span className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
                      {relatedProduct.savings} OFF
                    </span>
                  )}
                  {(relatedProduct.category === "Oxygen Therapy" || relatedProduct.priceNumeric > 10000) && (
                    <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
                      <i className="fas fa-user-md"></i>
                      RX
                    </span>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
                    {relatedProduct.name}
                  </h3>
                  <p className="text-gray-600 text-xs mb-2">{relatedProduct.brand}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-gray-900">
                      ₹{relatedProduct.priceNumeric.toLocaleString()}
                    </span>
                    {relatedProduct.originalPriceNumeric > relatedProduct.priceNumeric && (
                      <span className="text-sm text-gray-500 line-through">
                        ₹{relatedProduct.originalPriceNumeric.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="mt-8 bg-gray-50 border border-gray-300 rounded-lg p-4 text-sm text-gray-600">
        <p>
          <strong>Disclaimer:</strong> This product is for preventive/protective purposes only. 
          For medical emergencies, contact healthcare professionals immediately. 
          Follow all government guidelines and advisories. 
          Use products as per instructions only. 
          Some products may require prescription as per regulations.
        </p>
      </div>
    </div>
  );
};

export default CovidDetail;