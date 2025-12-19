// src/components/Medical/HeartCare.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import cardiacData from "../../data/HeartCare.json";

const HeartCare = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedType, setSelectedType] = useState("all");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      console.log("Cardiac Data:", cardiacData);
      
      if (cardiacData && Array.isArray(cardiacData.medications)) {
        setProducts(cardiacData.medications);
        setFilteredProducts(cardiacData.medications);
      } else {
        console.error("Cardiac data is not in expected format:", cardiacData);
        setProducts([]);
        setFilteredProducts([]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error loading cardiac products:", error);
      setProducts([]);
      setFilteredProducts([]);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (selectedType === "all") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => {
        const name = product.name.toLowerCase();
        if (selectedType === "clopidogrel") return name.includes("clopidogrel");
        if (selectedType === "atorvastatin") return name.includes("atorvastatin");
        if (selectedType === "rosuvastatin") return name.includes("rosuvastatin");
        if (selectedType === "aspirin") return name.includes("aspirin");
        if (selectedType === "other") return !name.includes("clopidogrel") && !name.includes("atorvastatin") && !name.includes("rosuvastatin") && !name.includes("aspirin");
        return true;
      });
      setFilteredProducts(filtered);
    }
  }, [selectedType, products]);

  const handleProductClick = (product) => {
    navigate(`/ProductDetail/HeartCareDetail/${product.id}`, { state: { product } });
  };

  const types = [
    { value: "all", label: "All Medications" },
    { value: "clopidogrel", label: "Clopidogrel" },
    { value: "atorvastatin", label: "Atorvastatin" },
    { value: "rosuvastatin", label: "Rosuvastatin" },
    { value: "aspirin", label: "Aspirin" },
    { value: "other", label: "Other" }
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
        <h1 className="text-3xl font-bold text-gray-900">Heart Care</h1>
        <p className="text-gray-600 mt-2">Essential medications for heart health and cardiovascular protection</p>
      </div>

      {/* Heart Health Tips */}
      <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <i className="fas fa-heart text-blue-500 text-xl"></i>
          <span className="text-blue-800 font-bold">Heart Health Tips</span>
        </div>
        <p className="text-blue-700 text-sm">
          Regular exercise • Healthy diet • Blood pressure control • Cholesterol management • No smoking • Stress management
        </p>
      </div>

      {/* Important Notice */}
      <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center gap-2">
          <i className="fas fa-exclamation-triangle text-yellow-500 text-xl"></i>
          <span className="text-yellow-800 font-bold">Important Medical Notice</span>
        </div>
        <p className="text-yellow-700 text-sm mt-1">
          Cardiac medications require proper medical prescription and supervision. 
          Please consult your cardiologist before using any cardiac care products.
        </p>
      </div>

      {/* Featured Medication */}
      {cardiacData.featuredMedication && (
        <div className="mb-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">Featured Heart Care Bundle</h2>
              <h3 className="text-xl font-semibold mb-2">{cardiacData.featuredMedication.name}</h3>
              <p className="text-blue-100 mb-4">{cardiacData.featuredMedication.description}</p>
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold">{cardiacData.featuredMedication.price}</span>
                <span className="text-xl line-through text-blue-200">{cardiacData.featuredMedication.originalPrice}</span>
                <span className="bg-white text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">
                  Save {cardiacData.featuredMedication.savings}
                </span>
              </div>
            </div>
            <div className="w-32 h-32 bg-white rounded-lg flex items-center justify-center p-2">
              <span className="text-blue-500 text-xs text-center font-semibold">Heart Care Bundle</span>
            </div>
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {types.map(type => (
            <button
              key={type.value}
              onClick={() => setSelectedType(type.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedType === type.value
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Debug Info */}
      <div className="mb-4 p-2 bg-blue-100 rounded text-sm">
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
                <div className="text-center p-4">
                  <img src={product.image} alt={product.name} className="w-full h-48 object-contain" />
                </div>
              </div>
              
              {/* Prescription Required Badge */}
              <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded text-xs font-semibold">
                Prescription
              </div>
              
              {/* Savings Badge */}
              {product.savings && (
                <span className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-sm font-semibold">
                  {product.savings} OFF
                </span>
              )}

              {/* Rating Badge */}
              <span className="absolute bottom-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded text-sm font-semibold flex items-center gap-1">
                <i className="fas fa-star"></i>
                4.5+
              </span>
            </div>

            {/* Product Info */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                {product.name}
              </h3>
              
              <p className="text-gray-600 text-sm mb-2">
                {product.brand || "Trusted Pharmaceutical"}
              </p>

              {/* Price */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg font-bold text-gray-900">
                  {product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    {product.originalPrice}
                  </span>
                )}
              </div>

              {/* Composition */}
              <div className="mb-3">
                <p className="text-xs text-gray-600 line-clamp-2">
                  {product.composition || "Cardiac care formulation"}
                </p>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  alert("Prescription required for cardiac medications. Please consult your doctor.");
                }}
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Prescription Required
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No medications found in this category.</p>
        </div>
      )}

      {/* Medical Guidelines */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-xl font-bold text-blue-900 mb-4">Heart Care Guidelines</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-start gap-2">
            <i className="fas fa-pills text-blue-500 mt-1"></i>
            <span>Take medications exactly as prescribed by your cardiologist</span>
          </div>
          <div className="flex items-start gap-2">
            <i className="fas fa-ban text-blue-500 mt-1"></i>
            <span>Never stop taking heart medications abruptly</span>
          </div>
          <div className="flex items-start gap-2">
            <i className="fas fa-chart-line text-blue-500 mt-1"></i>
            <span>Regular monitoring of blood pressure and cholesterol</span>
          </div>
          <div className="flex items-start gap-2">
            <i className="fas fa-heartbeat text-blue-500 mt-1"></i>
            <span>Maintain a heart-healthy diet and exercise routine</span>
          </div>
          <div className="flex items-start gap-2">
            <i className="fas fa-user-md text-blue-500 mt-1"></i>
            <span>Regular follow-ups with your healthcare provider</span>
          </div>
          <div className="flex items-start gap-2">
            <i className="fas fa-exclamation-circle text-blue-500 mt-1"></i>
            <span>Report any side effects or concerns immediately</span>
          </div>
        </div>
      </div>

      {/* Emergency Information */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <i className="fas fa-exclamation-triangle text-red-500 text-xl"></i>
          <span className="text-red-800 font-bold">Emergency Heart Symptoms</span>
        </div>
        <p className="text-red-700 text-sm">
          Seek immediate medical attention for: Chest pain • Shortness of breath • Irregular heartbeat • 
          Severe dizziness • Fainting • Pain radiating to arm/jaw
        </p>
      </div>
    </div>
  );
};

export default HeartCare;