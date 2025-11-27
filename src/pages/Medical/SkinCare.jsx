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
    navigate(`/product/SkinCareDetail/${product.id}`, { state: { product } });
  };

  const categories = ["all", ...new Set(products.map(product => product.category))];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Skin Care</h1>
        <p className="text-gray-600 mt-2">Premium skincare products for healthy, glowing skin</p>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium capitalize ${
                selectedCategory === category
                  ? "bg-orange-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="name">Sort by Name</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="savings">Best Savings</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => handleProductClick(product)}
          >
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              {product.savings && (
                <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
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
          <p className="text-gray-500 text-lg">No products found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default SkinCare;