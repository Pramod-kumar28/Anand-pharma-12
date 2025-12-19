// src/pages/Detail/OralCareDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import oralData from "../../data/oralcare.json";

const OralCareDetail = () => {
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
      const foundProduct = oralData.find(p => p.id === parseInt(id));
      setProduct(foundProduct);
      if (foundProduct) findRelatedProducts(foundProduct);
    }
  }, [id, location.state]);

  const findRelatedProducts = (currentProduct) => {
    const related = oralData
      .filter(p => 
        p.id !== currentProduct.id && 
        (p.category === currentProduct.category || p.brand === currentProduct.brand)
      )
      .slice(0, 4);
    
    setRelatedProducts(related);
  };

  const getCart = () => {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  };

  const saveCart = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  const handleAddToCart = () => {
    if (!product) return;

    const cart = getCart();
    
    const existingItemIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity += quantity;
    } else {
      const cartProduct = {
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.priceNumeric,
        originalPrice: product.originalPriceNumeric,
        image: product.image,
        category: "Oral Care",
        prescriptionRequired: false,
        quantity: quantity,
        ingredients: product.ingredients || "Not specified",
        keyFeatures: product.keyFeatures || []
      };
      cart.push(cartProduct);
    }
    
    saveCart(cart);
    
    setShowCartSuccess(true);
    setTimeout(() => setShowCartSuccess(false), 3000);
    
    console.log(`Added ${quantity} of ${product.name} to cart`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setTimeout(() => {
      navigate("/checkout");
    }, 500);
  };

  const handleViewCart = () => {
    navigate("/cart");
  };

  if (!product) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Oral care product not found</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 text-sm text-gray-600">
          <li>
            <button onClick={() => navigate("/home/oral-care")} className="hover:text-blue-600 flex items-center gap-1">
              <i className="fas fa-arrow-left text-xs"></i>
              Oral Care
            </button>
          </li>
          <li><i className="fas fa-chevron-right text-xs"></i></li>
          <li className="text-gray-900 font-medium flex items-center gap-1">
            <i className="fas fa-tooth text-xs"></i>
            {product.name}
          </li>
        </ol>
      </nav>

      {/* Cart Success Message */}
      {showCartSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in">
          <div className="flex items-center gap-3">
            <i className="fas fa-check-circle text-xl"></i>
            <div>
              <p className="font-semibold">Added to Cart!</p>
              <p className="text-sm opacity-90">{quantity} × {product.name}</p>
            </div>
            <button 
              onClick={handleViewCart}
              className="ml-4 bg-white text-green-600 px-3 py-1 rounded text-sm font-semibold hover:bg-gray-100 flex items-center gap-1"
            >
              <i className="fas fa-shopping-cart"></i>
              View Cart
            </button>
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
                  e.target.src = "https://via.placeholder.com/400x400?text=Oral+Care";
                }}
              />
            </div>
          </div>
          
          {/* Ingredients */}
          {product.ingredients && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                <i className="fas fa-flask text-blue-600"></i>
                Ingredients
              </h3>
              <div className="mb-2">
                <p className="text-sm text-blue-800 font-medium">Key Ingredients:</p>
                <p className="text-blue-900 text-sm bg-blue-100 p-2 rounded mt-1">{product.ingredients}</p>
              </div>
            </div>
          )}

          {/* Quick Facts */}
          <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 mb-4">
            <h3 className="font-semibold text-teal-900 mb-3 flex items-center gap-2">
              <i className="fas fa-clipboard-list text-teal-600"></i>
              Quick Facts
            </h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex flex-col">
                <span className="text-teal-600">Category:</span>
                <span className="font-medium">{product.category}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-teal-600">Brand:</span>
                <span className="font-medium">{product.brand}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-teal-600">Suitable For:</span>
                <span className="font-medium text-teal-800">
                  {product.category.includes("Kids") ? "Children" : "Adults"}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-teal-600">Prescription:</span>
                <span className="font-medium text-green-600">Not Required</span>
              </div>
              <div className="flex flex-col">
                <span className="text-teal-600">Age Group:</span>
                <span className="font-medium">
                  {product.category.includes("Kids") ? "Children (2-12 years)" : "All ages"}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-teal-600">Quantity:</span>
                <span className="font-medium">{product.quantity || "Standard Pack"}</span>
              </div>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="mb-4 bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h3 className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
              <i className="fas fa-file-invoice-dollar text-purple-600"></i>
              Order Summary
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-purple-600">Price:</span>
                <span className="font-medium">₹{product.priceNumeric} × {quantity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-600">Total:</span>
                <span className="font-bold text-lg text-purple-900">
                  ₹{product.priceNumeric * quantity}
                </span>
              </div>
              {product.originalPriceNumeric > product.priceNumeric && (
                <div className="flex justify-between">
                  <span className="text-purple-600">You Save:</span>
                  <span className="text-green-600 font-semibold">
                    ₹{(product.originalPriceNumeric - product.priceNumeric) * quantity}
                  </span>
                </div>
              )}
              <div className="pt-2 border-t">
                <p className="text-purple-700 text-xs">
                  * No prescription required for oral care products
                </p>
              </div>
            </div>
          </div>

          {/* Key Features */}
          {product.keyFeatures && product.keyFeatures.length > 0 && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <i className="fas fa-star text-gray-600"></i>
                Key Features
              </h3>
              <div className="grid grid-cols-1 gap-2 text-sm">
                {product.keyFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <i className="fas fa-check-circle text-green-500 mt-0.5"></i>
                    <span className="font-medium text-gray-900">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          {/* Product Name with Type */}
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            
            {/* Category Display */}
            <div className="flex items-center gap-2 mb-2">
              {product.category.includes("Kids") ? (
                <i className="fas fa-child text-yellow-600 text-lg"></i>
              ) : product.category.includes("Whitening") ? (
                <i className="fas fa-sparkles text-blue-600 text-lg"></i>
              ) : product.category.includes("Floss") ? (
                <i className="fas fa-spa text-green-600 text-lg"></i>
              ) : (
                <i className="fas fa-tooth text-blue-600 text-lg"></i>
              )}
              <span className="text-blue-700 font-medium text-lg">
                {product.category}
              </span>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                <i className="fas fa-tag mr-1"></i>
                {product.brand}
              </span>
            </div>
            
            <p className="text-gray-600">
              by <span className="font-semibold">{product.brand}</span>
            </p>
          </div>

          {/* Rating and Stock */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1 bg-yellow-100 px-3 py-1 rounded-full">
              <i className="fas fa-star text-yellow-400"></i>
              <span className="font-semibold text-yellow-700">4.5</span>
            </div>
            <div className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full flex items-center gap-1">
              <i className="fas fa-check-circle"></i>
              In Stock
            </div>
            <div className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full flex items-center gap-1">
              <i className="fas fa-prescription-bottle"></i>
              No Prescription
            </div>
          </div>

          {/* Detailed Ingredients Section */}
          {product.ingredients && (
            <div className="mb-6 bg-white border border-blue-300 rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                <i className="fas fa-flask text-blue-600"></i>
                Complete Ingredients
              </h3>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-blue-800 font-medium">{product.ingredients}</p>
              </div>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl font-bold text-gray-900">
              ₹{product.priceNumeric}
            </span>
            {product.originalPriceNumeric > product.priceNumeric && (
              <>
                <span className="text-xl text-gray-500 line-through">
                  ₹{product.originalPriceNumeric}
                </span>
                <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-sm font-semibold flex items-center gap-1">
                  <i className="fas fa-percentage"></i>
                  Save {product.savings}
                </span>
              </>
            )}
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <i className="fas fa-align-left text-gray-600"></i>
              Description
            </h3>
            <p className="text-gray-600">{product.description}</p>
          </div>

          {/* How to Use */}
          {product.howToUse && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                <i className="fas fa-info-circle text-green-600"></i>
                How to Use
              </h3>
              <div className="mb-2">
                <p className="text-green-800 bg-green-100 p-2 rounded">{product.howToUse}</p>
              </div>
            </div>
          )}

          {/* Warnings */}
          {product.warnings && (
            <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-900 mb-2 flex items-center gap-2">
                <i className="fas fa-exclamation-triangle text-yellow-600"></i>
                Important Information
              </h3>
              <p className="text-yellow-800 text-sm bg-yellow-100 p-2 rounded">{product.warnings}</p>
            </div>
          )}

          {/* Oral Health Benefits */}
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
              <i className="fas fa-heart text-blue-600"></i>
              Oral Health Benefits
            </h3>
            <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside ml-4">
              <li>Prevents cavities and tooth decay</li>
              <li>Promotes fresh breath</li>
              <li>Strengthens tooth enamel</li>
              <li>Reduces plaque buildup</li>
              <li>Supports gum health</li>
            </ul>
          </div>

          {/* Quantity and Actions */}
          <div className="border-t pt-6">
            <div className="flex items-center gap-4 mb-4">
              <span className="font-semibold flex items-center gap-2">
                <i className="fas fa-boxes"></i>
                Quantity:
              </span>
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 hover:bg-gray-100 transition-colors text-gray-600"
                >
                  <i className="fas fa-minus"></i>
                </button>
                <span className="px-4 py-1 min-w-[40px] text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 hover:bg-gray-100 transition-colors text-gray-600"
                >
                  <i className="fas fa-plus"></i>
                </button>
              </div>
              <span className="text-sm text-gray-500">
                (Max: 10)
              </span>
            </div>

            <div className="flex gap-4 mb-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <i className="fas fa-shopping-cart"></i>
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                <i className="fas fa-bolt"></i>
                Buy Now
              </button>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleViewCart}
                className="flex-1 border border-blue-600 text-blue-600 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
              >
                <i className="fas fa-shopping-cart"></i>
                View Cart
              </button>
              <button
                onClick={() => navigate("/home")}
                className="flex-1 border border-gray-600 text-gray-600 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <i className="fas fa-home"></i>
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>


      {/* Important Dental Notice */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-bold text-yellow-900 mb-4 flex items-center gap-2">
          <i className="fas fa-exclamation-triangle text-yellow-500"></i>
          Important Dental Notice
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-start gap-2">
            <i className="fas fa-tooth text-yellow-500 mt-1"></i>
            <span>Consult a dentist for personalized oral care advice</span>
          </div>
          <div className="flex items-start gap-2">
            <i className="fas fa-exclamation-triangle text-yellow-500 mt-1"></i>
            <span>Discontinue use and consult a doctor if irritation persists</span>
          </div>
          <div className="flex items-start gap-2">
            <i className="fas fa-ban text-yellow-500 mt-1"></i>
            <span>Do not use if you have specific allergies to ingredients</span>
          </div>
          <div className="flex items-start gap-2">
            <i className="fas fa-calendar-check text-yellow-500 mt-1"></i>
            <span>Regular dental check-ups are essential for oral health</span>
          </div>
          <div className="flex items-start gap-2">
            <i className="fas fa-child text-yellow-500 mt-1"></i>
            <span>Supervise children under 6 years during brushing</span>
          </div>
          <div className="flex items-start gap-2">
            <i className="fas fa-clock text-yellow-500 mt-1"></i>
            <span>Replace oral care products regularly for best results</span>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="border-t pt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <i className="fas fa-boxes text-blue-600"></i>
            Related Oral Care Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(relatedProduct => {
              const isKids = relatedProduct.category.includes("Kids");
              
              return (
                <div
                  key={relatedProduct.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-gray-100"
                  onClick={() => navigate(`/ProductDetail/OralCareDetail/${relatedProduct.id}`, { 
                    state: { product: relatedProduct } 
                  })}
                >
                  <div className="relative">
                    <div className="w-full h-32 bg-gray-100 rounded-t-lg flex items-center justify-center">
                      <img
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        className="w-full h-full object-contain rounded-t-lg bg-white p-2"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/300x200?text=Oral+Care";
                        }}
                      />
                    </div>
                    {relatedProduct.savings && (
                      <span className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
                        <i className="fas fa-tag"></i>
                        {relatedProduct.savings}
                      </span>
                    )}
                    <div className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-semibold ${
                      isKids ? 'bg-yellow-500 text-white' : 'bg-blue-500 text-white'
                    }`}>
                      {isKids ? (
                        <>
                          <i className="fas fa-child mr-1"></i>
                          Kids
                        </>
                      ) : (
                        <>
                          <i className="fas fa-user mr-1"></i>
                          Adult
                        </>
                      )}
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
                      {relatedProduct.name}
                    </h3>
                    <div className="flex items-center gap-1 text-gray-600 text-xs mb-1">
                      <i className="fas fa-tags"></i>
                      <span>{relatedProduct.category}</span>
                    </div>
                    <p className="text-gray-600 text-xs mb-2 flex items-center gap-1">
                      <i className="fas fa-industry"></i>
                      {relatedProduct.brand}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-gray-900 flex items-center gap-1">
                        <i className="fas fa-rupee-sign text-sm"></i>
                        {relatedProduct.priceNumeric}
                      </span>
                      {relatedProduct.originalPriceNumeric > relatedProduct.priceNumeric && (
                        <span className="text-sm text-gray-500 line-through">
                          ₹{relatedProduct.originalPriceNumeric}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Add animation style */}
      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default OralCareDetail;