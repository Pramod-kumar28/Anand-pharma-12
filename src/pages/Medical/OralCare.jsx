// src/components/Medical/OralCare.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import oralData from "../../data/oralcare.json";

const OralCare = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      console.log("Oral Data:", oralData);
      
      if (Array.isArray(oralData)) {
        setProducts(oralData);
        setFilteredProducts(oralData);
      } else {
        console.error("Oral data is not an array:", oralData);
        setProducts([]);
        setFilteredProducts([]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error loading oral care products:", error);
      setProducts([]);
      setFilteredProducts([]);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => product.category === selectedCategory);
      setFilteredProducts(filtered);
    }
  }, [selectedCategory, products]);

  const handleProductClick = (product) => {
    navigate(`/ProductDetail/OralCareDetail/${product.id}`, { state: { product } });
  };

  // Get unique categories
  const categories = [
    { value: "all", label: "All Products" },
    { value: "Toothpaste", label: "Toothpaste" },
    { value: "Mouthwash", label: "Mouthwash" },
    { value: "Toothbrush", label: "Toothbrush" },
    { value: "Kids Toothpaste", label: "Kids Toothpaste" },
    { value: "Kids Toothbrush", label: "Kids Toothbrush" },
    { value: "Floss", label: "Dental Floss" },
    { value: "Spray", label: "Oral Spray" },
    { value: "Interdental Brush", label: "Interdental Brush" },
    { value: "Teeth Whitening", label: "Teeth Whitening" },
    { value: "Specialized Toothbrush", label: "Special Toothbrush" }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Oral Care
        </h1>
        <p className="text-gray-600 mt-2 flex items-center gap-1">
          Complete dental hygiene products for a healthy, confident smile
        </p>
      </div>

      {/* Oral Health Tips */}
      <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <i className="fas fa-lightbulb text-blue-500"></i>
          <span className="text-blue-800 font-bold">Oral Health Tips</span>
        </div>
        <p className="text-blue-700 text-sm">
          Brush twice daily • 
          Floss regularly • 
          Use mouthwash • 
          Replace toothbrush every 3 months • 
          Visit dentist regularly
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-1 ${
                selectedCategory === category.value
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {category.value === "all" }
              {category.value === "Toothpaste"}
              {category.value === "Mouthwash"}
              {category.value === "Toothbrush"}
              {category.value === "Kids Toothpaste"}
              {category.value === "Kids Toothbrush"}
              {category.value === "Floss"}
              {category.value === "Spray"}
              {category.value === "Interdental Brush"}
              {category.value === "Teeth Whitening"}
              {category.value === "Specialized Toothbrush"}
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Debug Info */}
      <div className="mb-4 p-2 bg-green-100 rounded text-sm flex items-center gap-2">
        <i className="fas fa-info-circle text-green-600"></i>
        <span>Products loaded: {products.length} | Filtered: {filteredProducts.length}</span>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 hover:border-blue-200"
            onClick={() => handleProductClick(product)}
          >
            {/* Product Image */}
            <div className="relative">
              <div className="w-full h-48 bg-gray-100 rounded-t-lg flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-t-lg"
                />
              </div>
              
              {/* Savings Badge */}
              {product.savings && (
                <span className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-sm font-semibold flex items-center gap-1">
                  <i className="fas fa-tag"></i>
                  {product.savings} OFF
                </span>
              )}
              
              {/* Rating Badge */}
              <span className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded text-sm font-semibold flex items-center gap-1">
                <i className="fas fa-star"></i>
                4.5+
              </span>

              {/* Category Badge */}
              <span className="absolute bottom-2 left-2 bg-blue-500 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                <i className="fas fa-tags"></i>
                {product.category}
              </span>
            </div>

            {/* Product Info */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 flex items-start gap-2">
                <i className="fas fa-tooth text-gray-400 mt-1 text-sm"></i>
                {product.name}
              </h3>
              
              <p className="text-gray-600 text-sm mb-2 flex items-center gap-1">
                <i className="fas fa-industry text-gray-400"></i>
                {product.brand}
              </p>

              {/* Price */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg font-bold text-gray-900 flex items-center gap-1">
                  <i className="fas fa-rupee-sign text-gray-700 text-sm"></i>
                  {product.priceNumeric}
                </span>
                {product.originalPriceNumeric > product.priceNumeric && (
                  <span className="text-sm text-gray-500 line-through flex items-center gap-1">
                    <i className="fas fa-rupee-sign text-gray-400 text-xs"></i>
                    {product.originalPriceNumeric}
                  </span>
                )}
              </div>

              {/* Key Features */}
              <div className="mb-3">
                <p className="text-xs text-gray-600 line-clamp-2 flex items-start gap-1">
                  <i className="fas fa-info-circle text-gray-400 mt-0.5"></i>
                  {product.keyFeatures?.[0] || product.description?.substring(0, 60)}...
                </p>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  console.log(`Added ${product.name} to cart`);
                  // Add to cart logic here
                }}
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <i className="fas fa-shopping-cart"></i>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && !loading && (
        <div className="text-center py-12">
          <i className="fas fa-search text-gray-400 text-4xl mb-4"></i>
          <p className="text-gray-500 text-lg">No products found in this category.</p>
        </div>
      )}

      {/* Additional Tips Section */}
      <div className="mt-8 border-t pt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <i className="fas fa-lightbulb text-yellow-500"></i>
          Dental Care Guidelines
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
              <i className="fas fa-toothbrush text-green-600"></i>
              Brushing Techniques
            </h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start gap-2">
                <i className="fas fa-check-circle text-green-500 mt-1"></i>
                <span>Brush for 2 minutes, twice daily</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check-circle text-green-500 mt-1"></i>
                <span>Use fluoride toothpaste</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check-circle text-green-500 mt-1"></i>
                <span>Brush in circular motions</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check-circle text-green-500 mt-1"></i>
                <span>Clean your tongue gently</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
              <i className="fas fa-spa text-blue-600"></i>
              Flossing & Mouthwash
            </h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start gap-2">
                <i className="fas fa-check-circle text-blue-500 mt-1"></i>
                <span>Floss at least once a day</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check-circle text-blue-500 mt-1"></i>
                <span>Use mouthwash after brushing</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check-circle text-blue-500 mt-1"></i>
                <span>Choose alcohol-free mouthwash</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check-circle text-blue-500 mt-1"></i>
                <span>Rinse for 30-60 seconds</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white border border-purple-200 rounded-lg p-4">
            <h3 className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
              <i className="fas fa-calendar-check text-purple-600"></i>
              Regular Checkups
            </h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start gap-2">
                <i className="fas fa-check-circle text-purple-500 mt-1"></i>
                <span>Visit dentist every 6 months</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check-circle text-purple-500 mt-1"></i>
                <span>Professional cleaning annually</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check-circle text-purple-500 mt-1"></i>
                <span>Regular dental X-rays</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check-circle text-purple-500 mt-1"></i>
                <span>Address issues promptly</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OralCare;