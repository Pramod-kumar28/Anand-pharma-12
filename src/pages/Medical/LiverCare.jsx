// src/components/Medical/LiverCare.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import liverData from "../../data/LiverCare.json";

const LiverCare = () => {
  const [products, setProducts] = useState({});
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      console.log("Liver Data:", liverData);
      
      if (liverData && liverData.product) {
        setProducts(liverData.product);
        // Flatten all products into a single array for display
        const allProducts = [
          ...(liverData.product.tablets || []),
          ...(liverData.product.syrups || []),
          ...(liverData.product.injections || []),
          ...(liverData.product.herbal_supplements || []),
          ...(liverData.product.top_rated || []),
          ...(liverData.product.recommendations || [])
        ];
        setFilteredProducts(allProducts);
      } else {
        console.error("Liver data structure invalid:", liverData);
        setProducts({});
        setFilteredProducts([]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error loading liver care products:", error);
      setProducts({});
      setFilteredProducts([]);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!products || selectedCategory === "all") {
      const allProducts = [
        ...(products.tablets || []),
        ...(products.syrups || []),
        ...(products.injections || []),
        ...(products.herbal_supplements || []),
        ...(products.top_rated || []),
        ...(products.recommendations || [])
      ];
      setFilteredProducts(allProducts);
    } else {
      const filtered = products[selectedCategory] || [];
      setFilteredProducts(filtered);
    }
  }, [selectedCategory, products]);

  const handleProductClick = (product) => {
    navigate(`/ProductDetail/LiverCareDetail/${product.id}`, { state: { product, category: selectedCategory } });
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

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    
    // Check if prescription is required
    const prescriptionRequired = product.medicine_type?.includes("Injection") || 
                                product.product_type === "Injection" ||
                                product.name.toLowerCase().includes("injection") ||
                                (product.final_price > 2000 && product.medicine_type !== "Herbal Supplement");
    
    if (prescriptionRequired) {
      alert("⚠️ This product requires a doctor's prescription. Please consult your hepatologist or healthcare provider.");
      return;
    }

    const cart = getCart();
    
    // Check if product already exists in cart
    const existingItemIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingItemIndex > -1) {
      // Update quantity if product exists
      cart[existingItemIndex].quantity += 1;
    } else {
      // Add new product to cart
      const cartProduct = {
        id: product.id,
        name: product.name,
        description: product.description,
        brand: product.brand_name || product.manufacturer,
        price: product.final_price || product.cost,
        originalPrice: product.cost,
        image: product.images,
        category: selectedCategory,
        medicine_type: product.medicine_type,
        prescriptionRequired: prescriptionRequired,
        quantity: 1,
        liverCare: true,
        manufacturer: product.manufacturer
      };
      cart.push(cartProduct);
    }
    
    saveCart(cart);
    
    // Show success message
    const successMsg = document.createElement('div');
    successMsg.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg z-50 animate-slide-in';
    successMsg.innerHTML = `
      <div class="flex items-center gap-3">
        <span class="text-xl">✓</span>
        <div>
          <p class="font-semibold">Added to Cart!</p>
          <p class="text-sm opacity-90">${product.name}</p>
        </div>
      </div>
    `;
    document.body.appendChild(successMsg);
    setTimeout(() => successMsg.remove(), 3000);
    
    console.log(`Added ${product.name} to cart`);
  };

  // Get unique categories
  const categories = [
    { value: "all", label: "All Products" },
    { value: "tablets", label: "Tablets" },
    { value: "syrups", label: "Syrups" },
    { value: "injections", label: "Injections" },
    { value: "herbal_supplements", label: "Herbal Supplements" },
    { value: "top_rated", label: "Top Rated" },
    { value: "recommendations", label: "Recommendations" }
  ];

  // Liver health tips
  const liverHealthTips = [
    "Avoid alcohol consumption",
    "Maintain healthy weight",
    "Eat balanced diet with fruits & vegetables",
    "Exercise regularly",
    "Avoid processed foods",
    "Stay hydrated with plenty of water",
    "Limit sugar and salt intake",
    "Get vaccinated for hepatitis"
  ];

  // Liver function tests
  const liverTests = [
    { name: "ALT", normal: "7-55 U/L" },
    { name: "AST", normal: "8-48 U/L" },
    { name: "ALP", normal: "45-115 U/L" },
    { name: "Bilirubin", normal: "0.1-1.2 mg/dL" },
    { name: "Albumin", normal: "3.5-5.0 g/dL" }
  ];

  // Common liver conditions
  const liverConditions = [
    { name: "Fatty Liver", description: "Excess fat in liver cells" },
    { name: "Hepatitis", description: "Liver inflammation" },
    { name: "Cirrhosis", description: "Scarring of liver tissue" },
    { name: "Gallstones", description: "Hardened deposits in gallbladder" }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Liver Care & Hepatoprotective</h1>
        <p className="text-gray-600 mt-2">Essential medicines and supplements for liver health, protection, and treatment</p>
      </div>

      {/* Liver Health Alert Banner */}
      <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-green-500 text-xl">⚕️</span>
          <span className="text-green-800 font-bold">Liver Health Information</span>
        </div>
        <p className="text-green-700 text-sm">
          The liver is a vital organ - Take care of it with proper diet, exercise, and timely medical intervention
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {liverHealthTips.slice(0, 4).map((tip, index) => (
            <span key={index} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
              {tip}
            </span>
          ))}
        </div>
      </div>

      {/* Liver Function Tests */}
      <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-3">📊 Liver Function Test Ranges</h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {liverTests.map(test => (
            <div key={test.name} className="text-center">
              <div className="text-xs text-blue-600">{test.name}</div>
              <div className="font-bold text-blue-900">{test.normal}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <h3 className="font-semibold text-gray-900 mb-3">Filter by Category:</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.value
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Debug Info */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mb-4 p-2 bg-green-100 rounded text-sm">
          Products loaded: {filteredProducts.length} | Category: {selectedCategory}
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => {
          const prescriptionRequired = product.medicine_type?.includes("Injection") || 
                                      product.product_type === "Injection" ||
                                      product.name.toLowerCase().includes("injection") ||
                                      (product.final_price > 2000 && product.medicine_type !== "Herbal Supplement");
          
          const price = product.final_price || product.cost || 0;
          const originalPrice = product.cost || price;
          
          return (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 flex flex-col"
              onClick={() => handleProductClick(product)}
            >
              {/* Product Image */}
              <div className="relative flex-shrink-0">
                <div className="w-full h-48 bg-gray-200 rounded-t-lg flex items-center justify-center">
                  <img
                    src={product.images}
                    alt={product.name}
                    className="w-full h-full object-contain rounded-t-lg bg-white p-4"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/300x200?text=Liver+Care";
                    }}
                  />
                </div>
                
                {/* Discount Badge */}
                {product.discount && product.discount > 0 && (
                  <span className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-sm font-semibold">
                    {product.discount}% OFF
                  </span>
                )}
                
                {/* Prescription Required Badge */}
                {prescriptionRequired ? (
                  <span className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
                    ⚕️ Prescription
                  </span>
                ) : (
                  <span className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded text-xs font-semibold">
                    OTC
                  </span>
                )}

                {/* Medicine Type Badge */}
                <span className="absolute bottom-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs">
                  {product.medicine_type || selectedCategory}
                </span>
              </div>

              {/* Product Info */}
              <div className="p-4 flex-grow">
                <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                  {product.name}
                </h3>
                
                <p className="text-gray-600 text-sm mb-2">
                  {product.brand_name || product.manufacturer}
                </p>

                {/* Price */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg font-bold text-gray-900">
                    ₹{price.toLocaleString()}
                  </span>
                  {originalPrice > price && (
                    <span className="text-sm text-gray-500 line-through">
                      ₹{originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Description */}
                <div className="mb-3">
                  <p className="text-xs text-gray-600 line-clamp-3">
                    {product.description?.substring(0, 100)}...
                  </p>
                </div>

                {/* Uses */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {product.uses && product.uses.slice(0, 2).map((use, index) => (
                    <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {use}
                    </span>
                  ))}
                </div>

                {/* Rating */}
                {product.rating && (
                  <div className="flex items-center gap-1 mb-3">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm text-gray-700">{product.rating}</span>
                    <span className="text-xs text-gray-500">({product.stock || 100} in stock)</span>
                  </div>
                )}
              </div>

              {/* Add to Cart Button */}
              <div className="p-4 pt-0 mt-auto">
                <button
                  onClick={(e) => handleAddToCart(e, product)}
                  className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                    prescriptionRequired
                      ? "bg-gray-600 text-white hover:bg-gray-700"
                      : "bg-green-600 text-white hover:bg-green-700"
                  }`}
                >
                  {prescriptionRequired ? "Consult Doctor" : "Add to Cart"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProducts.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No liver care products found in this category.</p>
        </div>
      )}

      {/* Liver Health Guidelines */}
      <div className="mt-12 border-t pt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Liver Health Guidelines</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border border-green-200 rounded-lg p-4 text-center">
            <div className="text-3xl mb-2">🚫</div>
            <h3 className="font-semibold text-gray-900 mb-2">Avoid Alcohol</h3>
            <p className="text-sm text-gray-600">Limit or avoid alcohol to prevent liver damage</p>
          </div>
          <div className="bg-white border border-blue-200 rounded-lg p-4 text-center">
            <div className="text-3xl mb-2">🥗</div>
            <h3 className="font-semibold text-gray-900 mb-2">Healthy Diet</h3>
            <p className="text-sm text-gray-600">Eat fruits, vegetables, and whole grains</p>
          </div>
          <div className="bg-white border border-green-200 rounded-lg p-4 text-center">
            <div className="text-3xl mb-2">⚖️</div>
            <h3 className="font-semibold text-gray-900 mb-2">Weight Management</h3>
            <p className="text-sm text-gray-600">Maintain healthy weight to prevent fatty liver</p>
          </div>
          <div className="bg-white border border-purple-200 rounded-lg p-4 text-center">
            <div className="text-3xl mb-2">💊</div>
            <h3 className="font-semibold text-gray-900 mb-2">Medication Caution</h3>
            <p className="text-sm text-gray-600">Avoid unnecessary medications that stress liver</p>
          </div>
        </div>
      </div>

      {/* Liver Conditions Information */}
      <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h3 className="text-xl font-bold text-yellow-900 mb-4">⚕️ Common Liver Conditions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {liverConditions.map(condition => (
            <div key={condition.name} className="bg-white rounded-lg p-4 shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-2">{condition.name}</h4>
              <p className="text-sm text-gray-600">{condition.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Symptoms & Warning Signs */}
      <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-6">
        <h3 className="text-xl font-bold text-red-900 mb-4">⚠️ Liver Warning Signs</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-red-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-red-900">Symptoms</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-red-900">Possible Condition</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-red-900">Action Required</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-red-200">
              <tr>
                <td className="px-4 py-3 text-sm text-gray-700">Jaundice (yellow skin/eyes)</td>
                <td className="px-4 py-3 text-sm text-gray-700">Liver inflammation or obstruction</td>
                <td className="px-4 py-3 text-sm text-gray-700">Immediate medical consultation</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm text-gray-700">Abdominal swelling</td>
                <td className="px-4 py-3 text-sm text-gray-700">Ascites (fluid accumulation)</td>
                <td className="px-4 py-3 text-sm text-gray-700">Doctor visit within 24 hours</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm text-gray-700">Dark urine, pale stools</td>
                <td className="px-4 py-3 text-sm text-gray-700">Biliary obstruction</td>
                <td className="px-4 py-3 text-sm text-gray-700">Medical evaluation needed</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm text-gray-700">Chronic fatigue, weakness</td>
                <td className="px-4 py-3 text-sm text-gray-700">Liver dysfunction</td>
                <td className="px-4 py-3 text-sm text-gray-700">Schedule liver function tests</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Important Notice */}
      <div className="mt-8 bg-blue-50 border border-blue-300 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <span className="text-blue-500 text-2xl">ℹ️</span>
          <div>
            <h4 className="font-bold text-blue-900 mb-2">Important Liver Care Notice</h4>
            <p className="text-blue-800 text-sm">
              • Liver medications require proper diagnosis and prescription<br/>
              • Herbal supplements may interact with other medications<br/>
              • Regular liver function tests are essential for monitoring<br/>
              • Alcohol consumption should be avoided during treatment<br/>
              • Consult hepatologist for proper diagnosis and treatment plan<br/>
              • Maintain follow-up appointments for chronic conditions
            </p>
          </div>
        </div>
      </div>

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

export default LiverCare;