// src/components/Medical/Stomach.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StomachData from "../../data/Stomach.json";

const Stomach = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      console.log("Stomach Data:", StomachData);
      
      let data = StomachData;
      
      // If JSON contains "product", use product
      if (StomachData.product) {
        data = StomachData.product;
      }
      
      // Flatten all products from different categories
      const allProducts = [];
      Object.values(data).forEach(categoryProducts => {
        if (Array.isArray(categoryProducts)) {
          allProducts.push(...categoryProducts);
        }
      });
      
      console.log("All Products:", allProducts);
      
      if (allProducts.length > 0) {
        setProducts(allProducts);
        setFilteredProducts(allProducts);
      } else {
        console.error("No products found in stomach data");
        setProducts([]);
        setFilteredProducts([]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error loading stomach care products:", error);
      setProducts([]);
      setFilteredProducts([]);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => 
        product.category?.toLowerCase() === selectedCategory.toLowerCase() || 
        product.uses?.some(use => use.toLowerCase().includes(selectedCategory))
      );
      setFilteredProducts(filtered);
    }
  }, [selectedCategory, products]);

  const handleProductClick = (product) => {
    navigate(`/ProductDetail/StomachDetail/${product.id}`, { state: { product } });
  };

  // Get unique categories based on your data structure
  const categories = [
    { value: "all", label: "All Products" },
    { value: "tablets", label: "Tablets" },
    { value: "powders", label: "Powders" },
    { value: "syrups", label: "Syrups" },
    { value: "ors", label: "ORS" },
    { value: "kids", label: "Kids" },
    { value: "elder", label: "Elder" },
    { value: "ayurvedic", label: "Ayurvedic" },
    { value: "acidity", label: "Acidity Relief" },
    { value: "indigestion", label: "Indigestion" },
    { value: "constipation", label: "Constipation" }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Stomach Care</h1>
        <p className="text-gray-600 mt-2">Complete digestive health solutions for comfort and wellness</p>
      </div>

      {/* Stomach Health Tips */}
      <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-green-500 text-xl">🌿</span>
          <span className="text-green-800 font-bold">Digestive Health Tips</span>
        </div>
        <p className="text-green-700 text-sm">
          Eat slowly • Stay hydrated • Include fiber • Avoid spicy foods • Regular meals • Exercise regularly
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
      <div className="mb-4 p-2 bg-green-100 rounded text-sm">
        Products loaded: {products.length} | Filtered: {filteredProducts.length}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100"
            onClick={() => handleProductClick(product)}
          >
            {/* Product Image */}
            <div className="relative">
              <div className="w-full h-48 bg-gray-200 rounded-t-lg flex items-center justify-center">
                <img
                  src={product.images || product.images?.[0]}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-t-lg"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/300x300?text=No+Image";
                  }}
                />
              </div>
              
              {/* Savings Badge */}
              {product.cost > product.final_price && (
                <span className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-sm font-semibold">
                  ₹{product.cost - product.final_price} OFF
                </span>
              )}
              
              {/* Rating Badge */}
              <span className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded text-sm font-semibold">
                ⭐ {product.rating || "4.0+"}
              </span>

              {/* Category Badge */}
              {product.uses && product.uses[0] && (
                <span className="absolute bottom-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs">
                  {product.uses[0]}
                </span>
              )}
            </div>

            {/* Product Info */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                {product.name}
              </h3>
              
              <p className="text-gray-600 text-sm mb-2">
                {product.brand || "Trusted Brand"}
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

              {/* Key Features */}
              <div className="mb-3">
                <p className="text-xs text-gray-600 line-clamp-2">
                  {product.uses?.join(", ") || "Effective digestive relief solution"}
                </p>
              </div>

              {/* Pack Size */}
              {product.highlights?.pack_size && (
                <p className="text-xs text-gray-500 mb-2">
                  📦 {product.highlights.pack_size}
                </p>
              )}

              {/* Add to Cart Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  console.log(`Added ${product.name} to cart`);
                  // Add to cart logic here
                }}
                className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
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

      {/* Stomach Care Benefits */}
      <div className="mt-12 border-t pt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Benefits of Good Stomach Care</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-3xl mb-2">😊</div>
            <h3 className="font-semibold text-gray-900 mb-2">Comfort</h3>
            <p className="text-sm text-gray-600">Relief from acidity, indigestion and discomfort</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-3xl mb-2">🌱</div>
            <h3 className="font-semibold text-gray-900 mb-2">Better Digestion</h3>
            <p className="text-sm text-gray-600">Improved nutrient absorption and gut health</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="font-semibold text-gray-900 mb-2">Quick Relief</h3>
            <p className="text-sm text-gray-600">Fast-acting solutions for immediate comfort</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-3xl mb-2">❤️</div>
            <h3 className="font-semibold text-gray-900 mb-2">Overall Wellness</h3>
            <p className="text-sm text-gray-600">Good digestive health supports overall wellbeing</p>
          </div>
        </div>
      </div>

      {/* Common Stomach Issues */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-xl font-bold text-blue-900 mb-4">Common Stomach Issues We Address</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-red-500">•</span>
            <span>Acidity & Heartburn</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-red-500">•</span>
            <span>Indigestion</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-red-500">•</span>
            <span>Constipation</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-red-500">•</span>
            <span>Gas & Bloating</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-red-500">•</span>
            <span>Stomach Pain</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-red-500">•</span>
            <span>Diarrhea</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-red-500">•</span>
            <span>Loss of Appetite</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-red-500">•</span>
            <span>Nausea</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stomach;