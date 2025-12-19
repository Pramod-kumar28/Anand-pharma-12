// src/components/Medical/BabyCare.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Import your baby products data
import babyProductsData from "../../data/babycare.json";

const BabyCare = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      console.log("Baby Care Data:", babyProductsData);
      
      if (Array.isArray(babyProductsData)) {
        setProducts(babyProductsData);
        setFilteredProducts(babyProductsData);
      } else {
        console.error("Baby care data is not an array:", babyProductsData);
        setProducts([]);
        setFilteredProducts([]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error loading baby care products:", error);
      setProducts([]);
      setFilteredProducts([]);
      setLoading(false);
    }
  }, []);

  // Filter products by category
  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => 
        product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
      setFilteredProducts(filtered);
    }
  }, [selectedCategory, products]);

  // Sort products
  useEffect(() => {
    const sorted = [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.priceNumeric - b.priceNumeric;
        case "price-high":
          return b.priceNumeric - a.priceNumeric;
        case "name":
          return a.name.localeCompare(b.name);
        case "savings":
          return parseInt(b.savings) - parseInt(a.savings);
        default:
          return 0;
      }
    });
    setFilteredProducts(sorted);
  }, [sortBy]);

  const handleProductClick = (product) => {
    navigate(`/ProductDetail/BabyCareDetail/${product.id}`, { state: { product } });
  };

  // Get unique categories
  const categories = ["all", ...new Set(products.map(product => product.category))];

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
        <h1 className="text-3xl font-bold text-gray-900">Baby Care</h1>
        <p className="text-gray-600 mt-2">Essential products for your baby's health and comfort</p>
      </div>

      {/* Baby Care Tips */}
      <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <i className="fas fa-baby text-blue-500 text-xl"></i>
          <span className="text-blue-800 font-bold">Baby Care Tips</span>
        </div>
        <p className="text-blue-700 text-sm">
          Gentle products only • Regular diaper changes • Proper hygiene • Pediatrician recommended • Hypoallergenic materials
        </p>
      </div>

      {/* Filters and Sorting */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {category === "all" ? "All Products" : category}
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <i className="fas fa-sort text-gray-500"></i>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="name">Sort by Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="savings">Best Savings</option>
          </select>
        </div>
      </div>

      {/* Debug Info - Optional (you can remove this in production) */}
      <div className="mb-4 p-2 bg-blue-100 rounded text-sm">
        Products loaded: {products.length} | Filtered: {filteredProducts.length}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 overflow-hidden"
            onClick={() => handleProductClick(product)}
          >
            {/* Product Image */}
            <div className="relative">
              <div className="w-full h-48 bg-gray-100 rounded-t-lg flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/300x300?text=No+Image";
                  }}
                />
              </div>
              
              {/* Savings Badge */}
              {product.savings && (
                <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
                  {product.savings} OFF
                </span>
              )}
              
              {/* Rating Badge */}
              <span className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded text-sm font-semibold flex items-center gap-1">
                <i className="fas fa-star text-xs"></i> 4.5+
              </span>

              {/* Category Badge */}
              <span className="absolute bottom-2 left-2 bg-blue-500 text-white px-2 py-1 rounded text-xs">
                {product.category}
              </span>
            </div>

            {/* Product Info */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                {product.name}
              </h3>
              
              <p className="text-gray-600 text-sm mb-2">
                {product.brand}
              </p>

              {/* Price */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg font-bold text-gray-900">
                  ₹{product.priceNumeric}
                </span>
                {product.originalPriceNumeric > product.priceNumeric && (
                  <span className="text-sm text-gray-500 line-through">
                    ₹{product.originalPriceNumeric}
                  </span>
                )}
              </div>

              {/* Key Features */}
              <div className="mb-3">
                <p className="text-xs text-gray-600 line-clamp-2">
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
          <i className="fas fa-box-open text-gray-300 text-5xl mb-4"></i>
          <p className="text-gray-500 text-lg">No products found in this category.</p>
        </div>
      )}

      {/* Age Group Recommendations */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
          <i className="fas fa-calendar-alt"></i>
          Recommended by Age Group
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <i className="fas fa-baby text-blue-500"></i>
            <span>Newborn (0-3 months)</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="fas fa-child text-blue-500"></i>
            <span>Infant (3-12 months)</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="fas fa-walking text-blue-500"></i>
            <span>Toddler (1-3 years)</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="fas fa-user text-blue-500"></i>
            <span>Kids (3+ years)</span>
          </div>
        </div>
      </div>

      {/* Safety Standards */}
      <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <i className="fas fa-shield-alt text-green-500 text-xl"></i>
          <span className="text-green-800 font-bold">Safety Standards</span>
        </div>
        <p className="text-green-700 text-sm">
          All products are dermatologically tested • Hypoallergenic • Paraben-free • Pediatrician recommended • Made with natural ingredients
        </p>
      </div>
    </div>
  );
};

export default BabyCare;