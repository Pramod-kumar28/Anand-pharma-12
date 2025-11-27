// src/pages/Detail/DiabetesCareDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import diabetesData from "../../data/Diabetes.json";

const DiabetesCareDetail = () => {
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
      // Search across all diabetes products
      const foundProduct = findProductById(parseInt(id));
      setProduct(foundProduct);
      if (foundProduct) findRelatedProducts(foundProduct);
    }
  }, [id, location.state]);

  const findProductById = (productId) => {
    if (!diabetesData || !diabetesData.product) return null;
    
    // Search through all categories
    const categories = Object.values(diabetesData.product);
    for (const category of categories) {
      if (Array.isArray(category)) {
        const found = category.find(p => p.id === productId);
        if (found) return found;
      }
    }
    return null;
  };

  const getAllDiabetesProducts = () => {
    const allProducts = [];
    
    if (diabetesData && diabetesData.product) {
      Object.values(diabetesData.product).forEach(category => {
        if (Array.isArray(category)) {
          allProducts.push(...category);
        }
      });
    }
    
    return allProducts;
  };

  const findRelatedProducts = (currentProduct) => {
    const allProducts = getAllDiabetesProducts();
    
    const related = allProducts
      .filter(p => 
        p.id !== currentProduct.id && 
        (p.medicine_type === currentProduct.medicine_type || 
         (Array.isArray(p.uses) && Array.isArray(currentProduct.uses) && 
          p.uses.some(use => currentProduct.uses.includes(use))))
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
        brand: product.manufacturer,
        price: product.final_price,
        originalPrice: product.cost,
        image: product.images,
        category: "Diabetes Care",
        medicineType: product.medicine_type,
        prescriptionRequired: true, // Most diabetes medications require prescription
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
    alert("Please consult your doctor for proper prescription and dosage instructions for diabetes medications.");
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
            <button onClick={() => navigate("/home/diabetes-care")} className="hover:text-teal-600">
              Diabetes Care
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
              <p className="text-xs opacity-80">Prescription may be required</p>
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
              <img
                src={product.images || "/assets/placeholder.jpg"}
                alt={product.name}
                className="w-full h-full object-contain rounded-lg"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/400x400?text=Diabetes+Care";
                }}
              />
            </div>
          </div>
          
          {/* Quick Facts */}
          <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
            <h3 className="font-semibold text-teal-900 mb-3">Quick Facts</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex flex-col">
                <span className="text-teal-600">Medicine Type:</span>
                <span className="font-medium">{product.medicine_type}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-teal-600">Manufacturer:</span>
                <span className="font-medium">{product.manufacturer}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-teal-600">Stock Status:</span>
                <span className={`font-medium ${product.stock > 50 ? 'text-green-600' : 'text-yellow-600'}`}>
                  {product.stock > 50 ? 'In Stock' : 'Low Stock'}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-teal-600">Prescription:</span>
                <span className="font-medium text-red-600">Required</span>
              </div>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-3">Order Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-blue-600">Price:</span>
                <span className="font-medium">₹{product.final_price} × {quantity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-600">Total:</span>
                <span className="font-bold text-lg">₹{product.final_price * quantity}</span>
              </div>
              {product.cost > product.final_price && (
                <div className="flex justify-between">
                  <span className="text-blue-600">You Save:</span>
                  <span className="text-green-600 font-semibold">
                    ₹{(product.cost - product.final_price) * quantity}
                  </span>
                </div>
              )}
              <div className="pt-2 border-t">
                <p className="text-blue-700 text-xs">
                  * Prescription required for purchase
                </p>
              </div>
            </div>
          </div>

          {/* Highlights */}
          {product.highlights && (
            <div className="mt-4 bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Product Highlights</h3>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.manufacturer}</p>

          {/* Rating and Stock */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1 bg-yellow-100 px-3 py-1 rounded-full">
              <span className="text-yellow-400">⭐</span>
              <span className="font-semibold text-yellow-700">{product.rating || "4.0"}</span>
            </div>
            <div className={`text-sm px-3 py-1 rounded-full ${product.stock > 50 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
              {product.stock > 50 ? 'In Stock' : 'Low Stock'} ({product.stock} units)
            </div>
          </div>

          {/* Prescription Notice */}
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-red-500 text-xl">📋</span>
              <span className="text-red-800 font-bold">Prescription Required</span>
            </div>
            <p className="text-red-700 text-sm">
              This diabetes medication requires a valid prescription from a healthcare provider.
              Please consult your doctor before use.
            </p>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl font-bold text-gray-900">
              ₹{product.final_price}
            </span>
            {product.cost > product.final_price && (
              <>
                <span className="text-xl text-gray-500 line-through">
                  ₹{product.cost}
                </span>
                <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-semibold">
                  Save {product.discount}%
                </span>
              </>
            )}
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
            <p className="text-gray-600">{product.description || "Effective diabetes management medication for blood sugar control."}</p>
          </div>

          {/* Uses */}
          {Array.isArray(product.uses) && product.uses.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Primary Uses</h3>
              <div className="flex flex-wrap gap-2">
                {product.uses.map((use, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {use}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Ingredients */}
          {Array.isArray(product.ingredients) && product.ingredients.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Active Ingredients</h3>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ingredient, index) => (
                  <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Usage Information */}
          {product.information && (
            <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-900 mb-2">Usage Information</h3>
              {product.information.usage_instruction && (
                <p className="text-yellow-800 mb-2">
                  <strong>Instructions:</strong> {product.information.usage_instruction}
                </p>
              )}
              {product.information.disclaimer && (
                <p className="text-yellow-800 text-sm">
                  <strong>Note:</strong> {product.information.disclaimer}
                </p>
              )}
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
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 hover:bg-gray-100 transition-colors text-gray-600"
                >
                  +
                </button>
              </div>
              <span className="text-sm text-gray-500">
                (Max: 5)
              </span>
            </div>

            <div className="flex gap-4 mb-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors flex items-center justify-center gap-2"
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

            {/* Prescription Action */}
            <button
              onClick={handleConsultDoctor}
              className="w-full border border-red-600 text-red-600 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors flex items-center justify-center gap-2 mb-3"
            >
              <span>👨‍⚕️</span>
              Consult Doctor for Prescription
            </button>

            {/* Quick Cart Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleViewCart}
                className="flex-1 border border-teal-600 text-teal-600 py-2 rounded-lg font-semibold hover:bg-teal-50 transition-colors"
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

          {/* Seller Information */}
          {(product.seller_name || product.manufactured_by) && (
            <div className="mt-6 pt-6 border-t">
              <h3 className="font-semibold text-gray-900 mb-2">Seller Information</h3>
              <div className="text-sm text-gray-600 space-y-1">
                {product.seller_name && <p><strong>Seller:</strong> {product.seller_name}</p>}
                {product.seller_address && <p><strong>Address:</strong> {product.seller_address}</p>}
                {product.manufactured_by && <p><strong>Manufactured by:</strong> {product.manufactured_by}</p>}
                {product.country_of_origin && <p><strong>Origin:</strong> {product.country_of_origin}</p>}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Diabetes Management Tips */}
      <div className="border-t pt-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Diabetes Management Guidelines</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Medication Safety</h3>
            <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
              <li>Take medications as prescribed by your doctor</li>
              <li>Never skip doses or change dosage without consultation</li>
              <li>Monitor blood sugar levels regularly</li>
              <li>Keep track of medication timings</li>
            </ul>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Lifestyle Management</h3>
            <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
              <li>Follow a balanced diabetic diet plan</li>
              <li>Engage in regular physical activity</li>
              <li>Maintain healthy body weight</li>
              <li>Avoid smoking and limit alcohol</li>
            </ul>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Regular Monitoring</h3>
            <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
              <li>Regular blood sugar checks</li>
              <li>Quarterly HbA1c tests</li>
              <li>Annual eye and foot examinations</li>
              <li>Regular blood pressure monitoring</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Important Medical Notice */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-bold text-red-900 mb-4">Important Medical Notice</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-start gap-2">
            <span className="text-red-500 mt-1">⚠️</span>
            <span>Consult your doctor before starting any diabetes medication</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-red-500 mt-1">⚠️</span>
            <span>Do not self-medicate or change dosages without medical advice</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-red-500 mt-1">⚠️</span>
            <span>Monitor for symptoms of hypoglycemia (low blood sugar)</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-red-500 mt-1">⚠️</span>
            <span>Keep emergency glucose tablets handy</span>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="border-t pt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Diabetes Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(relatedProduct => (
              <div
                key={relatedProduct.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-gray-100"
                onClick={() => navigate(`/ProductDetail/DiabetesCareDetail/${relatedProduct.id}`, { 
                  state: { product: relatedProduct } 
                })}
              >
                <div className="relative">
                  <div className="w-full h-32 bg-gray-200 rounded-t-lg flex items-center justify-center">
                    <img
                      src={relatedProduct.images || "/assets/placeholder.jpg"}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover rounded-t-lg"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/300x200?text=Diabetes+Care";
                      }}
                    />
                  </div>
                  {relatedProduct.discount > 0 && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                      {relatedProduct.discount}% OFF
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
                  <p className="text-gray-600 text-xs mb-2">{relatedProduct.medicine_type}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-gray-900">
                      ₹{relatedProduct.final_price}
                    </span>
                    {relatedProduct.cost > relatedProduct.final_price && (
                      <span className="text-sm text-gray-500 line-through">
                        ₹{relatedProduct.cost}
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

export default DiabetesCareDetail;