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
      // Find product in the data
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
        price: product.priceNumeric,
        originalPrice: product.originalPriceNumeric,
        image: product.image,
        category: product.category,
        prescriptionRequired: false,
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
            <button onClick={() => navigate("/home/oral-care")} className="hover:text-blue-600">
              Oral Care
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
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain rounded-lg"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/400x400?text=Oral+Care";
                }}
              />
            </div>
          </div>
          
          {/* Quick Facts */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-3">Quick Facts</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex flex-col">
                <span className="text-blue-600">Category:</span>
                <span className="font-medium">{product.category}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-blue-600">Brand:</span>
                <span className="font-medium">{product.brand}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-blue-600">Suitable For:</span>
                <span className="font-medium">
                  {product.category.includes("Kids") ? "Children" : "Adults"}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-blue-600">Prescription:</span>
                <span className="font-medium text-green-600">Not Required</span>
              </div>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-900 mb-3">Order Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-green-600">Price:</span>
                <span className="font-medium">₹{product.priceNumeric} × {quantity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-600">Total:</span>
                <span className="font-bold text-lg">₹{product.priceNumeric * quantity}</span>
              </div>
              {product.originalPriceNumeric > product.priceNumeric && (
                <div className="flex justify-between">
                  <span className="text-green-600">You Save:</span>
                  <span className="text-green-600 font-semibold">
                    ₹{(product.originalPriceNumeric - product.priceNumeric) * quantity}
                  </span>
                </div>
              )}
              <div className="pt-2 border-t">
                <p className="text-green-700 text-xs">
                  * No prescription required
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.brand}</p>

          {/* Rating */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1 bg-yellow-100 px-3 py-1 rounded-full">
              <span className="text-yellow-400">⭐</span>
              <span className="font-semibold text-yellow-700">4.5</span>
            </div>
            <div className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">
              In Stock
            </div>
          </div>

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
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {product.keyFeatures.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {/* How to Use */}
          {product.howToUse && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">How to Use</h3>
              <p className="text-green-800">{product.howToUse}</p>
            </div>
          )}

          {/* Ingredients */}
          {product.ingredients && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Ingredients</h3>
              <p className="text-gray-600 bg-gray-50 p-3 rounded-lg border">
                {product.ingredients}
              </p>
            </div>
          )}

          {/* Warnings */}
          {product.warnings && (
            <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-900 mb-2">Important Information</h3>
              <p className="text-yellow-800 text-sm">{product.warnings}</p>
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
                (Max: 10)
              </span>
            </div>

            <div className="flex gap-4 mb-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
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

            {/* Quick Cart Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleViewCart}
                className="flex-1 border border-blue-600 text-blue-600 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
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

      {/* Oral Care Tips */}
      <div className="border-t pt-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Oral Care Best Practices</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Brushing Technique</h3>
            <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
              <li>Brush for 2 minutes twice daily</li>
              <li>Use gentle circular motions</li>
              <li>Don't forget to brush your tongue</li>
              <li>Replace toothbrush every 3 months</li>
            </ul>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Flossing & Mouthwash</h3>
            <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
              <li>Floss at least once daily</li>
              <li>Use mouthwash after brushing</li>
              <li>Don't rinse immediately after brushing</li>
              <li>Clean between teeth thoroughly</li>
            </ul>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Diet & Lifestyle</h3>
            <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
              <li>Limit sugary foods and drinks</li>
              <li>Drink plenty of water</li>
              <li>Avoid tobacco products</li>
              <li>Regular dental check-ups</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Oral Health Benefits */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-bold text-green-900 mb-4">Benefits of Good Oral Care</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-green-500">😁</span>
            <span>Confident, bright smile</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-500">🦷</span>
            <span>Prevents cavities & decay</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-500">🌿</span>
            <span>Fresh breath all day</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-500">❤️</span>
            <span>Supports overall health</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-500">💰</span>
            <span>Saves on dental costs</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-500">⏱️</span>
            <span>Quick daily routine</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-500">🌱</span>
            <span>Natural ingredients</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-500">🛡️</span>
            <span>Protects tooth enamel</span>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="border-t pt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Oral Care Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(relatedProduct => (
              <div
                key={relatedProduct.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-gray-100"
                onClick={() => navigate(`/ProductDetail/OralCareDetail/${relatedProduct.id}`, { 
                  state: { product: relatedProduct } 
                })}
              >
                <div className="relative">
                  <div className="w-full h-32 bg-gray-200 rounded-t-lg flex items-center justify-center">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover rounded-t-lg"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/300x200?text=Oral+Care";
                      }}
                    />
                  </div>
                  {relatedProduct.savings && (
                    <span className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
                      {relatedProduct.savings} OFF
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
                      ₹{relatedProduct.priceNumeric}
                    </span>
                    {relatedProduct.originalPriceNumeric > relatedProduct.priceNumeric && (
                      <span className="text-sm text-gray-500 line-through">
                        ₹{relatedProduct.originalPriceNumeric}
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

export default OralCareDetail;