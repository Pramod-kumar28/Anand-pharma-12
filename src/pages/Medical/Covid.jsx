// src/components/Medical/CovidEssentials.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import covidData from "../../data/covidesentials.json";

const Covid = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      console.log("COVID Data:", covidData);
      
      if (Array.isArray(covidData)) {
        setProducts(covidData);
        setFilteredProducts(covidData);
      } else {
        console.error("COVID data is not an array:", covidData);
        setProducts([]);
        setFilteredProducts([]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error loading COVID essentials:", error);
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
    navigate(`/ProductDetail/CovidDetail/${product.id}`, { state: { product } });
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
    const prescriptionRequired = product.category === "Oxygen Therapy" || 
                                product.name.toLowerCase().includes("oxygen") ||
                                product.priceNumeric > 10000;
    
    if (prescriptionRequired) {
      alert("⚠️ This product requires a doctor's prescription. Please consult your healthcare provider.");
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
        brand: product.brand,
        price: product.priceNumeric,
        originalPrice: product.originalPriceNumeric,
        image: product.image,
        category: product.category,
        prescriptionRequired: prescriptionRequired,
        quantity: 1,
        covidEssential: true
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
    { value: "all", label: "All Essentials" },
    { value: "Face Mask", label: "Face Masks" },
    { value: "Sanitizer", label: "Sanitizers" },
    { value: "Thermometer", label: "Thermometers" },
    { value: "Gloves", label: "Protective Gloves" },
    { value: "PPE Kit", label: "PPE Kits" },
    { value: "Disinfectant", label: "Disinfectants" },
    { value: "Monitor", label: "Health Monitors" },
    { value: "Face Shield", label: "Face Shields" },
    { value: "Oxygen Therapy", label: "Oxygen Therapy" },
    { value: "Protective Wear", label: "Protective Wear" },
    { value: "Nasal Spray", label: "Nasal Sprays" },
    { value: "Test Kit", label: "Test Kits" },
    { value: "Respiratory Care", label: "Respiratory Care" }
  ];

  // COVID prevention tips
  const preventionTips = [
    "Wear mask properly covering nose and mouth",
    "Maintain 6 feet distance",
    "Wash hands frequently with soap",
    "Use alcohol-based sanitizer",
    "Avoid crowded places",
    "Get vaccinated",
    "Disinfect surfaces regularly",
    "Monitor symptoms daily"
  ];

  // Emergency contact numbers
  const emergencyContacts = [
    { name: "National Helpline", number: "1075" },
    { name: "MyGov Helpline", number: "011-23978046" },
    { name: "Child Helpline", number: "1098" },
    { name: "Ambulance", number: "102" }
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
        <h1 className="text-3xl font-bold text-gray-900">COVID-19 Essentials</h1>
        <p className="text-gray-600 mt-2">Essential products for protection, prevention, and monitoring during the pandemic</p>
      </div>

      {/* COVID Alert Banner */}
      <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-green-500 text-xl">⚠️</span>
          <span className="text-green-800 font-bold">Important COVID-19 Information</span>
        </div>
        <p className="text-green-700 text-sm">
          Stay safe • Get vaccinated • Wear masks • Practice social distancing • Follow government guidelines
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {preventionTips.slice(0, 4).map((tip, index) => (
            <span key={index} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
              {tip}
            </span>
          ))}
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-3">📞 Emergency Contacts</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {emergencyContacts.map(contact => (
            <div key={contact.name} className="text-center">
              <div className="text-xs text-blue-600">{contact.name}</div>
              <div className="font-bold text-blue-900">{contact.number}</div>
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
      <div className="mb-4 p-2 bg-green-100 rounded text-sm">
        Products loaded: {products.length} | Filtered: {filteredProducts.length}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => {
          const prescriptionRequired = product.category === "Oxygen Therapy" || 
                                      product.name.toLowerCase().includes("oxygen") ||
                                      product.priceNumeric > 10000;
          
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
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-t-lg"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/300x200?text=COVID+Essential";
                    }}
                  />
                </div>
                
                {/* Savings Badge */}
                {product.savings && (
                  <span className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-sm font-semibold">
                    {product.savings} OFF
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

                {/* Category Badge */}
                <span className="absolute bottom-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs">
                  {product.category}
                </span>
              </div>

              {/* Product Info - This section will grow to fill available space */}
              <div className="p-4 flex-grow">
                <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                  {product.name}
                </h3>
                
                <p className="text-gray-600 text-sm mb-2">
                  {product.brand}
                </p>

                {/* Price */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg font-bold text-gray-900">
                    ₹{product.priceNumeric.toLocaleString()}
                  </span>
                  {product.originalPriceNumeric > product.priceNumeric && (
                    <span className="text-sm text-gray-500 line-through">
                      ₹{product.originalPriceNumeric.toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Key Features */}
                <div className="mb-3">
                  <p className="text-xs text-gray-600 line-clamp-3">
                    {product.keyFeatures?.[0] || product.description?.substring(0, 80)}...
                  </p>
                </div>

                {/* Safety Icons */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {product.category === "Face Mask" && (
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">😷 Protection</span>
                  )}
                  {product.category === "Sanitizer" && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">🧴 Hygiene</span>
                  )}
                  {product.category === "Thermometer" && (
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">🌡️ Monitoring</span>
                  )}
                  {product.name.includes("N95") && (
                    <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">NIOSH Approved</span>
                  )}
                </div>
              </div>

              {/* Add to Cart Button - Fixed to bottom */}
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
          <p className="text-gray-500 text-lg">No products found in this category.</p>
        </div>
      )}

      {/* COVID Prevention Guidelines */}
      <div className="mt-12 border-t pt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">COVID-19 Prevention Guidelines</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border border-green-200 rounded-lg p-4 text-center">
            <div className="text-3xl mb-2">😷</div>
            <h3 className="font-semibold text-gray-900 mb-2">Wear Mask</h3>
            <p className="text-sm text-gray-600">Always wear mask properly covering nose and mouth in public</p>
          </div>
          <div className="bg-white border border-blue-200 rounded-lg p-4 text-center">
            <div className="text-3xl mb-2">🧼</div>
            <h3 className="font-semibold text-gray-900 mb-2">Hand Hygiene</h3>
            <p className="text-sm text-gray-600">Wash hands frequently with soap or use alcohol-based sanitizer</p>
          </div>
          <div className="bg-white border border-green-200 rounded-lg p-4 text-center">
            <div className="text-3xl mb-2">↔️</div>
            <h3 className="font-semibold text-gray-900 mb-2">Social Distance</h3>
            <p className="text-sm text-gray-600">Maintain at least 6 feet distance from others</p>
          </div>
          <div className="bg-white border border-purple-200 rounded-lg p-4 text-center">
            <div className="text-3xl mb-2">💉</div>
            <h3 className="font-semibold text-gray-900 mb-2">Get Vaccinated</h3>
            <p className="text-sm text-gray-600">Get vaccinated and follow booster dose schedule</p>
          </div>
        </div>
      </div>

      {/* Symptoms & Action Table */}
      <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h3 className="text-xl font-bold text-yellow-900 mb-4">🚨 COVID-19 Symptoms & Actions</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-yellow-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-yellow-900">Symptoms</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-yellow-900">Immediate Action</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-yellow-900">When to Seek Help</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-yellow-200">
              <tr>
                <td className="px-4 py-3 text-sm text-gray-700">Fever, Dry Cough</td>
                <td className="px-4 py-3 text-sm text-gray-700">Isolate, Monitor Temperature</td>
                <td className="px-4 py-3 text-sm text-gray-700">Fever above 100.4°F for 2+ days</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm text-gray-700">Loss of Taste/Smell</td>
                <td className="px-4 py-3 text-sm text-gray-700">Home Test, Isolate</td>
                <td className="px-4 py-3 text-sm text-gray-700">Symptoms worsen</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm text-gray-700">Difficulty Breathing</td>
                <td className="px-4 py-3 text-sm text-gray-700">Check Oxygen Level</td>
                <td className="px-4 py-3 text-sm text-gray-700">SpO2 below 94%</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm text-gray-700">Chest Pain</td>
                <td className="px-4 py-3 text-sm text-gray-700">Emergency Contact</td>
                <td className="px-4 py-3 text-sm text-gray-700">Immediate medical attention</td>
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
            <h4 className="font-bold text-blue-900 mb-2">Important Notice</h4>
            <p className="text-blue-800 text-sm">
              • Oxygen concentrators require doctor's prescription<br/>
              • N95 masks are for single use only<br/>
              • Home test kits are for screening, confirm with PCR test<br/>
              • Consult healthcare provider before using medical equipment<br/>
              • Follow all government guidelines and advisories
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

export default Covid;































// // src/components/Medical/CovidEssentials.jsx
// import React from "react";
// import ProductList from "../Products/ProductList";
// import covidData from "../../data/covidesentials.json";

// const CovidEssentials = () => {
//   const categories = [
//     { value: "all", label: "All Essentials" },
//     { value: "Face Mask", label: "Face Masks" },
//     { value: "Sanitizer", label: "Sanitizers" },
//     { value: "Thermometer", label: "Thermometers" },
//     { value: "PPE Kit", label: "PPE Kits" },
//     { value: "Test Kit", label: "Test Kits" }
//   ];

//   const covidAlert = (
//     <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
//       <div className="flex items-center gap-2 mb-2">
//         <span className="text-red-500 text-xl">⚠️</span>
//         <span className="text-red-800 font-bold">Important COVID-19 Information</span>
//       </div>
//       <p className="text-red-700 text-sm">
//         Stay safe • Get vaccinated • Wear masks • Practice social distancing
//       </p>
//     </div>
//   );

//   const emergencyContacts = (
//     <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
//       <h3 className="font-semibold text-blue-900 mb-3">📞 Emergency Contacts</h3>
//       <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
//         <div className="text-center">
//           <div className="text-xs text-blue-600">National Helpline</div>
//           <div className="font-bold text-blue-900">1075</div>
//         </div>
//         <div className="text-center">
//           <div className="text-xs text-blue-600">Ambulance</div>
//           <div className="font-bold text-blue-900">102</div>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <ProductList
//       title="COVID-19 Essentials"
//       description="Essential products for protection, prevention, and monitoring during the pandemic"
//       data={covidData}
//       categories={categories}
//       alertBanner={covidAlert}
//       infoSection={emergencyContacts}
//       detailRoute="CovidDetail"
//     />
//   );
// };

// export default CovidEssentials;