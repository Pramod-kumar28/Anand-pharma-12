// src/components/Medical/DiabetesCare.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import diabetesData from "../../data/Diabetes.json";

const DiabetesCare = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      console.log("Diabetes Data:", diabetesData);
      
      // Extract all products from the nested structure
      const allProducts = [];
      
      if (diabetesData && diabetesData.product) {
        // Get all categories from the product object
        const categories = Object.keys(diabetesData.product);
        
        categories.forEach(category => {
          const categoryProducts = diabetesData.product[category];
          if (Array.isArray(categoryProducts)) {
            allProducts.push(...categoryProducts.map(p => ({ 
              ...p, 
              categoryType: category 
            })));
          }
        });
      }
      
      console.log("All Diabetes Products:", allProducts);
      
      setProducts(allProducts);
      setFilteredProducts(allProducts);
      setLoading(false);
    } catch (error) {
      console.error("Error loading diabetes products:", error);
      setProducts([]);
      setFilteredProducts([]);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => product.categoryType === selectedCategory);
      setFilteredProducts(filtered);
    }
  }, [selectedCategory, products]);

  const handleProductClick = (product) => {
    navigate(`/ProductDetail/DiabetesCareDetail/${product.id}`, { state: { product } });
  };

  const categories = [
    { value: "all", label: "All Products" },
    { value: "tablets", label: "Tablets" },
    { value: "insulin", label: "Insulin" },
    { value: "glucometer", label: "Glucometers" },
    { value: "syrups", label: "Syrups" },
    { value: "top_rated", label: "Top Rated" },
    { value: "recommendations", label: "Recommended" },
    { value: "monitoring", label: "Monitoring" },
    { value: "ayurvedic", label: "Ayurvedic" }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Diabetes Care</h1>
        <p className="text-gray-600 mt-2">Comprehensive diabetes management products and medications for better health</p>
      </div>

      {/* Diabetes Health Tips */}
      <div className="mb-6 bg-teal-50 border border-teal-200 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-teal-500 text-xl">🩺</span>
          <span className="text-teal-800 font-bold">Diabetes Management Tips</span>
        </div>
        <p className="text-teal-700 text-sm">
          Monitor blood sugar regularly • Follow medication schedule • Healthy diet • Regular exercise • Regular doctor checkups
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.value
                  ? "bg-teal-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Debug Info */}
      <div className="mb-4 p-2 bg-teal-100 rounded text-sm">
        Products loaded: {products.length} | Filtered: {filteredProducts.length}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <div
            key={`${product.categoryType}-${product.id}`}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100"
            onClick={() => handleProductClick(product)}
          >
            {/* Product Image */}
            <div className="relative">
              <div className="w-full h-48 bg-gray-200 rounded-t-lg flex items-center justify-center">
                <img
                  src={product.images || "/assets/placeholder.jpg"}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-t-lg"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/300x300?text=No+Image";
                  }}
                />
              </div>
              
              {/* Discount Badge */}
              {product.discount > 0 && (
                <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
                  {product.discount}% OFF
                </span>
              )}
              
              {/* Rating Badge */}
              <span className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded text-sm font-semibold">
                ⭐ {product.rating || "4.0+"}
              </span>

              {/* Category Badge */}
              <span className="absolute bottom-2 left-2 bg-teal-500 text-white px-2 py-1 rounded text-xs capitalize">
                {product.categoryType?.replace('_', ' ')}
              </span>

              {/* Stock Status */}
              {product.stock < 50 && (
                <span className="absolute bottom-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs">
                  Low Stock
                </span>
              )}
            </div>

            {/* Product Info */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                {product.name}
              </h3>
              
              <p className="text-gray-600 text-sm mb-2">
                {product.medicine_type || "Diabetes Care"}
              </p>

              {/* Price */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg font-bold text-gray-900">
                  ₹{product.final_price}
                </span>
                {product.cost > product.final_price && (
                  <span className="text-sm text-gray-500 line-through">
                    ₹{product.cost}
                  </span>
                )}
              </div>

              {/* Uses */}
              <div className="mb-3">
                <p className="text-xs text-gray-600 line-clamp-2">
                  {Array.isArray(product.uses) ? product.uses.join(", ") : "Effective diabetes management solution"}
                </p>
              </div>

              {/* Medicine Type */}
              {product.medicine_type && (
                <p className="text-xs text-teal-600 mb-2 font-medium">
                  💊 {product.medicine_type}
                </p>
              )}

              {/* Add to Cart Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  console.log(`Added ${product.name} to cart`);
                  // Add to cart logic here
                }}
                className="w-full bg-teal-600 text-white py-2 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found in this category.</p>
        </div>
      )}

      {/* Diabetes Care Benefits */}
      <div className="mt-12 border-t pt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Benefits of Proper Diabetes Care</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-3xl mb-2">📊</div>
            <h3 className="font-semibold text-gray-900 mb-2">Blood Sugar Control</h3>
            <p className="text-sm text-gray-600">Maintain healthy glucose levels consistently</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-3xl mb-2">❤️</div>
            <h3 className="font-semibold text-gray-900 mb-2">Heart Health</h3>
            <p className="text-sm text-gray-600">Reduce risk of cardiovascular complications</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-3xl mb-2">👁️</div>
            <h3 className="font-semibold text-gray-900 mb-2">Vision Protection</h3>
            <p className="text-sm text-gray-600">Prevent diabetes-related eye problems</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-3xl mb-2">🦵</div>
            <h3 className="font-semibold text-gray-900 mb-2">Nerve Health</h3>
            <p className="text-sm text-gray-600">Protect against neuropathy and foot care issues</p>
          </div>
        </div>
      </div>

      {/* Important Information */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-xl font-bold text-blue-900 mb-4">Diabetes Management Guidelines</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-start gap-2">
            <span className="text-blue-500 mt-1">•</span>
            <span>Take medications as prescribed by your doctor</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-500 mt-1">•</span>
            <span>Monitor blood sugar levels regularly</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-500 mt-1">•</span>
            <span>Follow a balanced diet with controlled carbs</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-500 mt-1">•</span>
            <span>Engage in regular physical activity</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-500 mt-1">•</span>
            <span>Regular health checkups and screenings</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-500 mt-1">•</span>
            <span>Maintain healthy weight and blood pressure</span>
          </div>
        </div>
      </div>

      {/* Emergency Warning */}
      <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-red-500 text-xl">⚠️</span>
          <span className="text-red-800 font-bold">Important Notice</span>
        </div>
        <p className="text-red-700 text-sm">
          Consult your doctor before starting any new medication. Do not self-medicate. 
          Monitor for symptoms of hypoglycemia and seek immediate medical attention if needed.
        </p>
      </div>
    </div>
  );
};

export default DiabetesCare;