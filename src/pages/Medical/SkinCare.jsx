// src/components/Medical/SkinCare.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import skinCareData from "../../data/skincare.json";

const SkinCare = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const navigate = useNavigate();

  useEffect(() => {
    setProducts(skinCareData);
    setFilteredProducts(skinCareData);
  }, []);

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
    navigate(`/ProductDetail/SkinCareDetail/${product.id}`, { state: { product } });
  };

  const categories = ["all", ...new Set(products.map(product => product.category))];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          Skin Care
        </h1>
        <p className="text-gray-600 mt-2 flex items-center gap-1">
          Premium skincare products for healthy, glowing skin
        </p>
      </div>

      {/* Skin Health Tips */}
      <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <i className="fas fa-lightbulb text-blue-500"></i>
          <span className="text-blue-800 font-bold">Skin Health Tips</span>
        </div>
        <p className="text-blue-700 text-sm">
          Cleanse twice daily • 
          Use sunscreen • 
          Stay hydrated • 
          Healthy diet • 
          Adequate sleep
        </p>
      </div>

      {/* Category Filter & Sort */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium capitalize flex items-center gap-1 ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {category === "all"}
              {category === "Face Wash"}
              {category === "Moisturizer"}
              {category === "Sunscreen"}
              {category === "Serum"}
              {category === "Cream"}
              {category === "Mask"}
              {category === "Scrub"}
              {category === "Toner"}
              {category === "Lotion"}
              {category === "Gel"}
              {category}
            </button>
          ))}
        </div>

        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
          >
            <option value="name">
              <i className="fas fa-sort-alpha-down"></i> Sort by Name
            </option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="savings">Best Savings</option>
          </select>
          <i className="fas fa-sort absolute left-3 top-3 text-gray-400"></i>
        </div>
      </div>

      {/* Products Count */}
      <div className="mb-4 p-2 bg-blue-100 rounded text-sm flex items-center gap-2">
        <i className="fas fa-info-circle text-blue-600"></i>
        <span>Showing {filteredProducts.length} of {products.length} skincare products</span>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-gray-100 hover:border-blue-200 group"
            onClick={() => handleProductClick(product)}
          >
            <div className="relative">
              <div className="w-full h-48 bg-gray-100 rounded-t-lg flex items-center justify-center overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              {/* Savings Badge */}
              {product.savings && (
                <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold flex items-center gap-1">
                  <i className="fas fa-tag"></i>
                  {product.savings} OFF
                </span>
              )}
              
              {/* Category Badge */}
              <span className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
                <i className="fas fa-tags"></i>
                {product.category}
              </span>

              {/* Rating Badge */}
              <span className="absolute bottom-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
                <i className="fas fa-star"></i>
                4.5
              </span>
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 flex items-start gap-2">
                {product.name}
              </h3>
              
              <p className="text-gray-600 text-sm mb-2 flex items-center gap-1">
                {product.brand}
              </p>

              {/* Price */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg font-bold text-gray-900 flex items-center gap-1">
                  ₹
                  {product.priceNumeric}
                </span>
                {product.originalPriceNumeric > product.priceNumeric && (
                  <span className="text-sm text-gray-500 line-through flex items-center gap-1">
                    ₹
                    {product.originalPriceNumeric}
                  </span>
                )}
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  console.log(`Added ${product.name} to cart`);
                  // Add to cart logic here
                }}
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 group"
              >
                <i className="fas fa-shopping-cart group-hover:scale-110 transition-transform"></i>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <i className="fas fa-search text-gray-400 text-4xl mb-4"></i>
          <p className="text-gray-500 text-lg">No products found in this category.</p>
          <button
            onClick={() => setSelectedCategory("all")}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
          >
            <i className="fas fa-redo"></i>
            View All Products
          </button>
        </div>
      )}

      {/* Skin Care Routine Guide */}
      <div className="mt-8 border-t pt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <i className="fas fa-calendar-check text-blue-500"></i>
          Daily Skin Care Routine
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <i className="fas fa-sun text-blue-600"></i>
              </div>
              <h3 className="font-semibold text-blue-900">Morning Routine</h3>
            </div>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start gap-2">
                <i className="fas fa-check-circle text-green-500 mt-0.5"></i>
                <span>Cleanse with a gentle face wash</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check-circle text-green-500 mt-0.5"></i>
                <span>Apply toner (optional)</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check-circle text-green-500 mt-0.5"></i>
                <span>Use serum for specific concerns</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check-circle text-green-500 mt-0.5"></i>
                <span>Moisturize to hydrate skin</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check-circle text-green-500 mt-0.5"></i>
                <span>Apply sunscreen (essential)</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white border border-purple-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <i className="fas fa-moon text-purple-600"></i>
              </div>
              <h3 className="font-semibold text-purple-900">Night Routine</h3>
            </div>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start gap-2">
                <i className="fas fa-check-circle text-purple-500 mt-0.5"></i>
                <span>Remove makeup thoroughly</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check-circle text-purple-500 mt-0.5"></i>
                <span>Cleanse with appropriate face wash</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check-circle text-purple-500 mt-0.5"></i>
                <span>Exfoliate 2-3 times a week</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check-circle text-purple-500 mt-0.5"></i>
                <span>Apply night serum or treatment</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check-circle text-purple-500 mt-0.5"></i>
                <span>Moisturize or use night cream</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <i className="fas fa-spa text-green-600"></i>
              </div>
              <h3 className="font-semibold text-green-900">Weekly Care</h3>
            </div>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start gap-2">
                <i className="fas fa-check-circle text-green-500 mt-0.5"></i>
                <span>Face mask for deep cleansing</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check-circle text-green-500 mt-0.5"></i>
                <span>Gentle exfoliation</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check-circle text-green-500 mt-0.5"></i>
                <span>Sheet masks for hydration</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check-circle text-green-500 mt-0.5"></i>
                <span>Lip care treatment</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check-circle text-green-500 mt-0.5"></i>
                <span>Eye care treatments</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <i className="fas fa-heart text-yellow-600"></i>
              </div>
              <h3 className="font-semibold text-yellow-900">Skin Health Tips</h3>
            </div>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start gap-2">
                <i className="fas fa-check-circle text-yellow-500 mt-0.5"></i>
                <span>Drink 8 glasses of water daily</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check-circle text-yellow-500 mt-0.5"></i>
                <span>Eat fruits and vegetables</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check-circle text-yellow-500 mt-0.5"></i>
                <span>Get 7-8 hours of sleep</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check-circle text-yellow-500 mt-0.5"></i>
                <span>Manage stress levels</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check-circle text-yellow-500 mt-0.5"></i>
                <span>Avoid smoking and limit alcohol</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
};

export default SkinCare;