// src/components/Medical/All.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Import all category data
import babyData from "../../data/babycare.json";
import skinData from "../../data/skincare.json";
import diabetesData from "../../data/Diabetes.json";
import cardiacData from "../../data/cardiac.json";
// Import other category data...

const All = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    // Combine all products from different categories
    const combinedProducts = [
      ...babyData.map(p => ({ ...p, mainCategory: "Baby Care" })),
      ...skinData.map(p => ({ ...p, mainCategory: "Skin Care" })),
      ...diabetesData.map(p => ({ ...p, mainCategory: "Diabetes Care" })),
      ...cardiacData.map(p => ({ ...p, mainCategory: "Cardiac Care" })),
      // Add other categories...
    ];
    
    setAllProducts(combinedProducts);
    setFilteredProducts(combinedProducts);
  }, []);

  useEffect(() => {
    let filtered = allProducts;
    
    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => 
        product.mainCategory === selectedCategory
      );
    }
    
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.mainCategory.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, allProducts]);

  const handleProductClick = (product) => {
    const detailPageMap = {
      "Baby Care": "BabyCareDetail",
      "Skin Care": "SkinCareDetail",
      "Diabetes Care": "DiabetesCareDetail",
      "Cardiac Care": "HeartCareDetail",
      // Add other mappings...
    };
    
    navigate(`/product/${detailPageMap[product.mainCategory]}/${product.id}`, { 
      state: { product } 
    });
  };

  const categories = ["all", ...new Set(allProducts.map(product => product.mainCategory))];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
        <p className="text-gray-600 mt-2">Browse our complete range of healthcare products</p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search products, brands, categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="all">All Categories</option>
          {categories.filter(cat => cat !== "all").map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <div
            key={`${product.mainCategory}-${product.id}`}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => handleProductClick(product)}
          >
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <span className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded text-xs font-semibold">
                {product.mainCategory}
              </span>
              {product.savings && (
                <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
                  {product.savings} OFF
                </span>
              )}
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                {product.name}
              </h3>
              <p className="text-gray-600 text-sm mb-2">{product.brand}</p>
              
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

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  // Add to cart logic
                }}
                className="w-full bg-orange-600 text-white py-2 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default All;