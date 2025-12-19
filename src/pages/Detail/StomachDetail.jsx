// src/pages/Detail/StomachDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import stomachData from "../../data/Stomach.json";

const StomachDetail = () => {
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
      const foundProduct = findProductById(parseInt(id));
      setProduct(foundProduct);
      if (foundProduct) findRelatedProducts(foundProduct);
    }
  }, [id, location.state]);

  const findProductById = (productId) => {
    if (!stomachData || !stomachData.product) return null;
    
    const categories = Object.values(stomachData.product);
    for (const category of categories) {
      if (Array.isArray(category)) {
        const found = category.find(p => p.id === productId);
        if (found) return found;
      }
    }
    return null;
  };

  const getAllStomachProducts = () => {
    const allProducts = [];
    
    if (stomachData && stomachData.product) {
      Object.values(stomachData.product).forEach(category => {
        if (Array.isArray(category)) {
          allProducts.push(...category);
        }
      });
    }
    
    return allProducts;
  };

  const findRelatedProducts = (currentProduct) => {
    const allProducts = getAllStomachProducts();
    
    const related = allProducts
      .filter(p => 
        p.id !== currentProduct.id && 
        (Array.isArray(p.uses) && Array.isArray(currentProduct.uses) && 
         p.uses.some(use => currentProduct.uses.includes(use)))
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

    const prescriptionRequired = product.prescriptionRequired || 
                               (Array.isArray(product.uses) && 
                                product.uses.some(use => 
                                  use.toLowerCase().includes('prescription') || 
                                  use.toLowerCase().includes('severe')
                                ));

    if (prescriptionRequired) {
      alert("This product requires a prescription. Please consult your doctor.");
      return;
    }

    const cart = getCart();
    
    const existingItemIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity += quantity;
    } else {
      const cartProduct = {
        id: product.id,
        name: product.name,
        brand: product.brand || "Trusted Brand",
        price: product.final_price || product.priceNumeric,
        originalPrice: product.cost,
        image: product.images || product.image,
        category: "Stomach Care",
        prescriptionRequired: prescriptionRequired,
        quantity: quantity,
        uses: product.uses || [],
        composition: product.composition || "Not specified"
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

  const handleConsultDoctor = () => {
    alert("Please consult your doctor for proper prescription and dosage instructions for stomach medications.");
  };

  if (!product) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Stomach care product not found</div>
      </div>
    );
  }

  const prescriptionRequired = product.prescriptionRequired || 
                             (Array.isArray(product.uses) && 
                              product.uses.some(use => 
                                use.toLowerCase().includes('prescription') || 
                                use.toLowerCase().includes('severe')
                              ));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 text-sm text-gray-600">
          <li>
            <button onClick={() => navigate("/home/stomach-care")} className="hover:text-green-600 flex items-center gap-1">
              <i className="fas fa-arrow-left text-xs"></i>
              Stomach Care
            </button>
          </li>
          <li><i className="fas fa-chevron-right text-xs"></i></li>
          <li className="text-gray-900 font-medium flex items-center gap-1">
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
              {prescriptionRequired && (
                <p className="text-xs opacity-80">Prescription may be required</p>
              )}
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
                src={product.images || product.image}
                alt={product.name}
                className="w-full h-full object-contain rounded-lg"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/400x400?text=Stomach+Care";
                }}
              />
            </div>
          </div>
          
          {/* Composition */}
          {product.composition && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                <i className="fas fa-flask text-green-600"></i>
                Composition
              </h3>
              <div className="mb-2">
                <p className="text-sm text-green-800 font-medium">Active Ingredients:</p>
                <p className="text-green-900 text-sm bg-green-100 p-2 rounded mt-1">{product.composition}</p>
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
                <span className="text-teal-600">Form:</span>
                <span className="font-medium">{product.highlights?.form || "Tablet/Syrup"}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-teal-600">Pack Size:</span>
                <span className="font-medium">{product.highlights?.pack_size || "Standard"}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-teal-600">Prescription:</span>
                <span className={`font-medium ${prescriptionRequired ? 'text-red-600' : 'text-green-600'}`}>
                  {prescriptionRequired ? 'Required' : 'Not Required'}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-teal-600">Age Group:</span>
                <span className="font-medium">{product.highlights?.suitable_for || "Adults"}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-teal-600">Storage:</span>
                <span className="font-medium">Room Temperature</span>
              </div>
              <div className="flex flex-col">
                <span className="text-teal-600">Country of Origin:</span>
                <span className="font-medium">India</span>
              </div>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="mb-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
              <i className="fas fa-file-invoice-dollar text-blue-600"></i>
              Order Summary
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-blue-600">Price:</span>
                <span className="font-medium">₹{product.final_price || product.priceNumeric} × {quantity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-600">Total:</span>
                <span className="font-bold text-lg text-blue-900">
                  ₹{(product.final_price || product.priceNumeric) * quantity}
                </span>
              </div>
              {product.cost > (product.final_price || product.priceNumeric) && (
                <div className="flex justify-between">
                  <span className="text-blue-600">You Save:</span>
                  <span className="text-green-600 font-semibold">
                    ₹{(product.cost - (product.final_price || product.priceNumeric)) * quantity}
                  </span>
                </div>
              )}
              <div className="pt-2 border-t">
                <p className="text-blue-700 text-xs">
                  {prescriptionRequired 
                    ? "* Prescription required for purchase" 
                    : "* Over-the-counter product"}
                </p>
              </div>
            </div>
          </div>

          {/* Highlights */}
          {product.highlights && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <i className="fas fa-star text-gray-600"></i>
                Product Highlights
              </h3>
              <div className="grid grid-cols-1 gap-2 text-sm">
                {Object.entries(product.highlights).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-gray-600 capitalize">{key.replace('_', ' ')}:</span>
                    <span className="font-medium text-gray-900">{value}</span>
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
            
            {/* Brand Display */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-green-700 font-medium text-lg">
                {product.brand || "Trusted Brand"}
              </span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                <i className="fas fa-tag mr-1"></i>
                Stomach Care
              </span>
            </div>
            
            <p className="text-gray-600">
              {product.manufacturer && <span>Manufactured by <span className="font-semibold">{product.manufacturer}</span></span>}
            </p>
          </div>

          {/* Rating and Stock */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1 bg-yellow-100 px-3 py-1 rounded-full">
              <i className="fas fa-star text-yellow-400"></i>
              <span className="font-semibold text-yellow-700">{product.rating || "4.2"}</span>
            </div>
            <div className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full flex items-center gap-1">
              <i className="fas fa-check-circle"></i>
              In Stock
            </div>
            <div className={`text-sm px-3 py-1 rounded-full ${prescriptionRequired ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
              <i className={`fas fa-${prescriptionRequired ? 'prescription-bottle' : 'cart-plus'} mr-1`}></i>
              {prescriptionRequired ? 'Prescription Required' : 'OTC Available'}
            </div>
          </div>

          {/* Detailed Composition Section */}
          {product.composition && (
            <div className="mb-6 bg-white border border-green-300 rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                <i className="fas fa-flask text-green-600"></i>
                Detailed Composition
              </h3>
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-green-800 font-medium">{product.composition}</p>
              </div>
            </div>
          )}

          {/* Prescription Notice */}
          {prescriptionRequired && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <i className="fas fa-exclamation-triangle text-red-500"></i>
                <span className="text-red-800 font-bold">Prescription Required</span>
              </div>
              <p className="text-red-700 text-sm">
                This stomach medication requires a valid prescription from a healthcare provider.
                Please consult your doctor before use.
              </p>
              <div className="mt-2 text-xs text-red-600">
                <p><strong>Note:</strong> Always follow your doctor's advice for stomach medications.</p>
              </div>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl font-bold text-gray-900">
              ₹{product.final_price || product.priceNumeric}
            </span>
            {product.cost > (product.final_price || product.priceNumeric) && (
              <>
                <span className="text-xl text-gray-500 line-through">
                  ₹{product.cost}
                </span>
                <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-semibold flex items-center gap-1">
                  <i className="fas fa-percentage"></i>
                  Save ₹{product.cost - (product.final_price || product.priceNumeric)}
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
            <p className="text-gray-600">{product.description || "Effective stomach care solution for digestive health and comfort."}</p>
          </div>

          {/* Uses */}
          {Array.isArray(product.uses) && product.uses.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Primary Uses</h3>
              <div className="flex flex-wrap gap-2">
                {product.uses.map((use, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    <i className="fas fa-medical mr-1"></i>
                    {use}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Benefits */}
          {product.benefits && (
            <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                <i className="fas fa-heart text-blue-600"></i>
                Benefits
              </h3>
              <ul className="list-disc list-inside text-blue-800 space-y-1">
                {product.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Directions for Use */}
          {product.directions && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                <i className="fas fa-info-circle text-green-600"></i>
                Directions for Use
              </h3>
              <p className="text-green-800">{product.directions}</p>
            </div>
          )}

          {/* Precautions */}
          {product.precautions && (
            <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-900 mb-2 flex items-center gap-2">
                <i className="fas fa-exclamation-triangle text-yellow-600"></i>
                Precautions
              </h3>
              <p className="text-yellow-800 text-sm bg-yellow-100 p-2 rounded">{product.precautions}</p>
            </div>
          )}

          {/* Stomach Health Benefits */}
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
              <i className="fas fa-heartbeat text-green-600"></i>
              Digestive Health Benefits
            </h3>
            <ul className="text-sm text-gray-600 space-y-1 list-inside ml-4">
              <li>Promotes healthy digestion</li>
              <li>Relieves stomach discomfort</li>
              <li>Supports gut health</li>
              <li>Reduces acid reflux symptoms</li>
              <li>Improves nutrient absorption</li>
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
                (Max: {prescriptionRequired ? '3' : '10'})
              </span>
            </div>

            <div className="flex gap-4 mb-3">
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
                  prescriptionRequired
                    ? 'bg-gray-600 text-white hover:bg-gray-700'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                <i className="fas fa-shopping-cart"></i>
                {prescriptionRequired ? 'Consult Doctor' : 'Add to Cart'}
              </button>
              <button
                onClick={prescriptionRequired ? handleConsultDoctor : handleBuyNow}
                className={`flex-1 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
                  prescriptionRequired
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-green-700 text-white hover:bg-green-800'
                }`}
              >
                <i className="fas fa-bolt"></i>
                {prescriptionRequired ? 'Consult Doctor' : 'Buy Now'}
              </button>
            </div>

            {/* Consult Doctor Action */}
            {prescriptionRequired && (
              <button
                onClick={handleConsultDoctor}
                className="w-full border border-red-600 text-red-600 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors flex items-center justify-center gap-2 mb-3"
              >
                <i className="fas fa-user-md"></i>
                Consult Doctor for Prescription
              </button>
            )}

            {/* Quick Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleViewCart}
                className="flex-1 border border-green-600 text-green-600 py-2 rounded-lg font-semibold hover:bg-green-50 transition-colors flex items-center justify-center gap-2"
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

      {/* Important Medical Notice */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-bold text-red-900 mb-4 flex items-center gap-2">
          <i className="fas fa-exclamation-triangle text-red-500"></i>
          Important Medical Notice
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-start gap-2">
            <i className="fas fa-user-md text-red-500 mt-1"></i>
            <span>Consult a doctor before starting any stomach medication</span>
          </div>
          <div className="flex items-start gap-2">
            <i className="fas fa-exclamation-triangle text-red-500 mt-1"></i>
            <span>Do not self-medicate for persistent stomach issues</span>
          </div>
          <div className="flex items-start gap-2">
            <i className="fas fa-pills text-red-500 mt-1"></i>
            <span>Inform your doctor about all medications you're taking</span>
          </div>
          <div className="flex items-start gap-2">
            <i className="fas fa-heartbeat text-red-500 mt-1"></i>
            <span>Seek immediate medical attention for severe symptoms</span>
          </div>
          <div className="flex items-start gap-2">
            <i className="fas fa-ban text-red-500 mt-1"></i>
            <span>Avoid alcohol while taking stomach medications</span>
          </div>
          <div className="flex items-start gap-2">
            <i className="fas fa-calendar-check text-red-500 mt-1"></i>
            <span>Complete the prescribed course of medication</span>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="border-t pt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <i className="fas fa-boxes text-green-600"></i>
            Related Stomach Care Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(relatedProduct => {
              const isRxRequired = relatedProduct.prescriptionRequired || 
                                 (Array.isArray(relatedProduct.uses) && 
                                  relatedProduct.uses.some(use => 
                                    use.toLowerCase().includes('prescription') || 
                                    use.toLowerCase().includes('severe')
                                  ));
              
              return (
                <div
                  key={relatedProduct.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-gray-100"
                  onClick={() => navigate(`/ProductDetail/StomachDetail/${relatedProduct.id}`, { 
                    state: { product: relatedProduct } 
                  })}
                >
                  <div className="relative">
                    <div className="w-full h-32 bg-gray-100 rounded-t-lg flex items-center justify-center">
                      <img
                        src={relatedProduct.images || relatedProduct.image}
                        alt={relatedProduct.name}
                        className="w-full h-full object-contain rounded-t-lg bg-white p-2"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/300x200?text=Stomach+Care";
                        }}
                      />
                    </div>
                    {relatedProduct.cost > (relatedProduct.final_price || relatedProduct.priceNumeric) && (
                      <span className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
                        <i className="fas fa-tag"></i>
                        Save ₹{relatedProduct.cost - (relatedProduct.final_price || relatedProduct.priceNumeric)}
                      </span>
                    )}
                    <div className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-semibold ${
                      isRxRequired ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
                    }`}>
                      <i className={`fas fa-${isRxRequired ? 'prescription' : 'cart-plus'} mr-1`}></i>
                      {isRxRequired ? 'Rx' : 'OTC'}
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-gray-600 text-xs mb-2">
                      {Array.isArray(relatedProduct.uses) ? relatedProduct.uses[0] : "Stomach Care"}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-gray-900 flex items-center gap-1">
                        <i className="fas fa-rupee-sign text-sm"></i>
                        {relatedProduct.final_price || relatedProduct.priceNumeric}
                      </span>
                      {relatedProduct.cost > (relatedProduct.final_price || relatedProduct.priceNumeric) && (
                        <span className="text-sm text-gray-500 line-through">
                          ₹{relatedProduct.cost}
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

export default StomachDetail;