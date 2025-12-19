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
      
      if (StomachData.product) {
        data = StomachData.product;
      }
      
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          Stomach Care
        </h1>
        <p className="text-gray-600 mt-2 flex items-center gap-1">
          Complete digestive health solutions for comfort and wellness
        </p>
      </div>

      {/* Digestive Health Tips */}
      <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <i className="fas fa-lightbulb text-green-500"></i>
          <span className="text-green-800 font-bold">Digestive Health Tips</span>
        </div>
        <p className="text-green-700 text-sm">
          Eat slowly • 
          Stay hydrated • 
          Include fiber • 
          Avoid spicy foods • 
          Regular meals • 
          Exercise regularly
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
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {category.value === "all"}
              {category.value === "tablets"}
              {category.value === "powders"}
              {category.value === "syrups"}
              {category.value === "ors"}
              {category.value === "kids"}
              {category.value === "elder"}
              {category.value === "ayurvedic"}
              {category.value === "acidity"}
              {category.value === "indigestion"}
              {category.value === "constipation"}
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Products Count */}
      <div className="mb-4 p-2 bg-green-100 rounded text-sm flex items-center gap-2">
        <i className="fas fa-info-circle text-green-600"></i>
        <span>Products loaded: {products.length} | Filtered: {filteredProducts.length}</span>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 hover:border-green-200 group"
            onClick={() => handleProductClick(product)}
          >
            {/* Product Image */}
            <div className="relative">
              <div className="w-full h-48 bg-gray-100 rounded-t-lg flex items-center justify-center overflow-hidden">
                <img
                  src={product.images || product.images?.[0]}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/300x300?text=No+Image";
                  }}
                />
              </div>
              
              {/* Savings Badge */}
              {product.cost > product.final_price && (
                <span className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-sm font-semibold flex items-center gap-1">
                  <i className="fas fa-tag"></i>
                  ₹{product.cost - product.final_price} OFF
                </span>
              )}
              
              {/* Rating Badge */}
              <span className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded text-sm font-semibold flex items-center gap-1">
                <i className="fas fa-star"></i>
                {product.rating || "4.0+"}
              </span>

              {/* Prescription Badge */}
              {(product.prescriptionRequired || 
                (product.uses && product.uses.some(use => 
                  use.toLowerCase().includes('prescription') || 
                  use.toLowerCase().includes('severe')
                ))) && (
                <span className="absolute bottom-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
                  <i className="fas fa-prescription-bottle"></i>
                  Rx
                </span>
              )}

              {/* Category Badge */}
              {product.uses && product.uses[0] && (
                <span className="absolute bottom-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                  <i className="fas fa-tags"></i>
                  {product.uses[0]}
                </span>
              )}
            </div>

            {/* Product Info */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 flex items-start gap-2">
                {product.name}
              </h3>
              
              <p className="text-gray-600 text-sm mb-2 flex items-center gap-1">
                {product.brand || "Trusted Brand"}
              </p>

              {/* Price */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg font-bold text-gray-900 flex items-center gap-1">
                  ₹
                  {product.final_price}
                </span>
                {product.cost > product.final_price && (
                  <span className="text-sm text-gray-500 line-through flex items-center gap-1">
                    ₹
                    {product.cost}
                  </span>
                )}
              </div>

              {/* Key Features */}
              <div className="mb-3">
                <p className="text-xs text-gray-600 line-clamp-2 flex items-start gap-1">
                  <i className="fas fa-info-circle text-gray-400 mt-0.5"></i>
                  {product.uses?.join(", ") || "Effective digestive relief solution"}
                </p>
              </div>

              {/* Pack Size */}
              {product.highlights?.pack_size && (
                <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                  {product.highlights.pack_size}
                </p>
              )}

              {/* Add to Cart Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  console.log(`Added ${product.name} to cart`);
                  // Add to cart logic here
                }}
                className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2 group"
              >
                <i className="fas fa-shopping-cart group-hover:scale-110 transition-transform"></i>
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
          <button
            onClick={() => setSelectedCategory("all")}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 mx-auto"
          >
            <i className="fas fa-redo"></i>
            View All Products
          </button>
        </div>
      )}

      {/* Common Stomach Issues */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
          <i className="fas fa-stethoscope text-blue-600"></i>
          Common Stomach Issues We Address
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <i className="fas fa-fire text-red-500"></i>
            <span>Acidity & Heartburn</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="fas fa-stomach text-red-500"></i>
            <span>Indigestion</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="fas fa-wind text-red-500"></i>
            <span>Constipation</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="fas fa-cloud text-red-500"></i>
            <span>Gas & Bloating</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="fas fa-exclamation-circle text-red-500"></i>
            <span>Stomach Pain</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="fas fa-running text-red-500"></i>
            <span>Diarrhea</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="fas fa-utensils text-red-500"></i>
            <span>Loss of Appetite</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="fas fa-head-side-virus text-red-500"></i>
            <span>Nausea</span>
          </div>
        </div>
      </div>

      {/* Digestive Health Guide */}
      <div className="mt-8 border-t pt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <i className="fas fa-book-medical text-green-600"></i>
          Digestive Health Guide
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
              <i className="fas fa-utensils text-green-600"></i>
              Dietary Recommendations
            </h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start gap-2">
                <i className="fas fa-check-circle text-green-500 mt-0.5"></i>
                <span>Include probiotic-rich foods</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check-circle text-green-500 mt-0.5"></i>
                <span>Eat fiber-rich vegetables</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check-circle text-green-500 mt-0.5"></i>
                <span>Stay hydrated throughout the day</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check-circle text-green-500 mt-0.5"></i>
                <span>Limit processed and fried foods</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
              <i className="fas fa-heartbeat text-blue-600"></i>
              Lifestyle Habits
            </h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start gap-2">
                <i className="fas fa-check-circle text-blue-500 mt-0.5"></i>
                <span>Regular physical activity</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check-circle text-blue-500 mt-0.5"></i>
                <span>Adequate sleep and rest</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check-circle text-blue-500 mt-0.5"></i>
                <span>Stress management techniques</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check-circle text-blue-500 mt-0.5"></i>
                <span>Maintain regular meal timings</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white border border-purple-200 rounded-lg p-4">
            <h3 className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
              <i className="fas fa-user-md text-purple-600"></i>
              When to See a Doctor
            </h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start gap-2">
                <i className="fas fa-exclamation-triangle text-red-500 mt-0.5"></i>
                <span>Persistent abdominal pain</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-exclamation-triangle text-red-500 mt-0.5"></i>
                <span>Unexplained weight loss</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-exclamation-triangle text-red-500 mt-0.5"></i>
                <span>Blood in stool or vomit</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-exclamation-triangle text-red-500 mt-0.5"></i>
                <span>Severe or worsening symptoms</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Stomach;