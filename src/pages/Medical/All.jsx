// // src/components/Medical/All.jsx
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// // Import all category data
// import babyData from "../../data/babycare.json";
// import skinData from "../../data/skincare.json";
// import diabetesData from "../../data/Diabetes.json";
// import cardiacData from "../../data/cardiac.json";
// // Import other category data...

// const All = () => {
//   const [allProducts, setAllProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Combine all products from different categories
//     const combinedProducts = [
//       ...babyData.map(p => ({ ...p, mainCategory: "Baby Care" })),
//       ...skinData.map(p => ({ ...p, mainCategory: "Skin Care" })),
//       ...diabetesData.map(p => ({ ...p, mainCategory: "Diabetes Care" })),
//       ...cardiacData.map(p => ({ ...p, mainCategory: "Cardiac Care" })),
//       // Add other categories...
//     ];
    
//     setAllProducts(combinedProducts);
//     setFilteredProducts(combinedProducts);
//   }, []);

//   useEffect(() => {
//     let filtered = allProducts;
    
//     if (selectedCategory !== "all") {
//       filtered = filtered.filter(product => 
//         product.mainCategory === selectedCategory
//       );
//     }
    
//     if (searchTerm) {
//       filtered = filtered.filter(product =>
//         product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         product.mainCategory.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }
    
//     setFilteredProducts(filtered);
//   }, [searchTerm, selectedCategory, allProducts]);

//   const handleProductClick = (product) => {
//     const detailPageMap = {
//       "Baby Care": "BabyCareDetail",
//       "Skin Care": "SkinCareDetail",
//       "Diabetes Care": "DiabetesCareDetail",
//       "Cardiac Care": "HeartCareDetail",
//       // Add other mappings...
//     };
    
//     navigate(`/product/${detailPageMap[product.mainCategory]}/${product.id}`, { 
//       state: { product } 
//     });
//   };

//   const categories = ["all", ...new Set(allProducts.map(product => product.mainCategory))];

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
//         <p className="text-gray-600 mt-2">Browse our complete range of healthcare products</p>
//       </div>

//       {/* Search and Filter */}
//       <div className="flex flex-col lg:flex-row gap-4 mb-6">
//         <div className="flex-1">
//           <input
//             type="text"
//             placeholder="Search products, brands, categories..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//           />
//         </div>
        
//         <select
//           value={selectedCategory}
//           onChange={(e) => setSelectedCategory(e.target.value)}
//           className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//         >
//           <option value="all">All Categories</option>
//           {categories.filter(cat => cat !== "all").map(category => (
//             <option key={category} value={category}>{category}</option>
//           ))}
//         </select>
//       </div>

//       {/* Products Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//         {filteredProducts.map(product => (
//           <div
//             key={`${product.mainCategory}-${product.id}`}
//             className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
//             onClick={() => handleProductClick(product)}
//           >
//             <div className="relative">
//               <img
//                 src={product.image}
//                 alt={product.name}
//                 className="w-full h-48 object-cover rounded-t-lg"
//               />
//               <span className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded text-xs font-semibold">
//                 {product.mainCategory}
//               </span>
//               {product.savings && (
//                 <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
//                   {product.savings} OFF
//                 </span>
//               )}
//             </div>

//             <div className="p-4">
//               <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
//                 {product.name}
//               </h3>
//               <p className="text-gray-600 text-sm mb-2">{product.brand}</p>
              
//               <div className="flex items-center gap-2 mb-3">
//                 <span className="text-lg font-bold text-gray-900">
//                   ₹{product.priceNumeric}
//                 </span>
//                 {product.originalPriceNumeric > product.priceNumeric && (
//                   <span className="text-sm text-gray-500 line-through">
//                     ₹{product.originalPriceNumeric}
//                   </span>
//                 )}
//               </div>

//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   // Add to cart logic
//                 }}
//                 className="w-full bg-orange-600 text-white py-2 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
//               >
//                 Add to Cart
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {filteredProducts.length === 0 && (
//         <div className="text-center py-12">
//           <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default All;



































// src/components/Medical/All.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const All = () => {
  const navigate = useNavigate();

  // Category data with online images and routing info
  const categories = [
    {
      id: "baby-care",
      name: "Baby Care",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuIXsxcuDojj4h5-plPFMOXFBcrzNpfxsgJA&s",
      color: "bg-gradient-to-r from-pink-400 to-pink-500",
      description: "Diapers, baby lotions, and healthcare",
      count: "200+ items",
      component: "BabyCare"
    },
    {
      id: "skin-care",
      name: "Skin Care",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRhJDeRBYzTlw4kAr0L82_wA14sUdPPyH_6Q&s",
      color: "bg-gradient-to-r from-purple-400 to-purple-500",
      description: "Medicated creams & skincare",
      count: "150+ items",
      component: "SkinCare"
    },
    {
      id: "diabetes-care",
      name: "Diabetes Care",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjeAa1HtzBnre26_Zq7zEJH3qPUyeefPGCBg&s",
      color: "bg-gradient-to-r from-teal-500 to-teal-600",
      description: "Glucose monitors & medications",
      count: "120+ items",
      component: "DiabetesCare"
    },
    {
      id: "cardiac-care",
      name: "Heart Care",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXeM6pntqJsI8yPCYiX6tjLyaemnWcqheGug&s",
      color: "bg-gradient-to-r from-red-500 to-red-600",
      description: "Cardiac medications & monitors",
      count: "80+ items",
      component: "HeartCare"
    },
    {
      id: "covid-essentials",
      name: "Covid Essentials",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBrsZIz0kboRye5oFAVl-mzxy73wMCDgEprQ&s",
      color: "bg-gradient-to-r from-yellow-500 to-yellow-600",
      description: "Masks, sanitizers & test kits",
      count: "90+ items",
      component: "Covid"
    },
    {
      id: "elderly-care",
      name: "Elderly Care",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7lpv1rN6mUVP92IbXNUYsrqj3P3kNxe-thw&s",
      color: "bg-gradient-to-r from-indigo-500 to-indigo-600",
      description: "Senior healthcare products",
      count: "70+ items",
      component: "ElderlyCare"
    },
    {
      id: "first-aid",
      name: "First Aid",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-kmkhOni6IgcA7CHSswz8J47Lc7titizllA&s",
      color: "bg-gradient-to-r from-orange-500 to-orange-600",
      description: "Bandages & emergency supplies",
      count: "110+ items",
      component: "FirstAid"
    },
    {
      id: "cold-&-immunity",
      name: "Immunity Boosters",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9DXjj5ZZxhBzrLCsjPbk682vBxqnPGpIPoQ&s",
      color: "bg-gradient-to-r from-green-500 to-green-600",
      description: "Vitamins & supplements",
      count: "130+ items",
      component: "Immunity"
    },
    {
      id: "liver-care",
      name: "Liver Care",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXUxw0e8FBrXQMu4EpHlNgw4PQT60_JQK4sA&s",
      color: "bg-gradient-to-r from-emerald-500 to-emerald-600",
      description: "Liver health medications",
      count: "60+ items",
      component: "LiverCare"
    },
    {
      id: "oral-care",
      name: "Oral Care",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhTG-YQvdIUi02MyyJjXgJUx0oamdofTfEnQ&s",
      color: "bg-gradient-to-r from-cyan-400 to-cyan-500",
      description: "Dental care products",
      count: "85+ items",
      component: "OralCare"
    },
    {
      id: "pain-relief",
      name: "Pain Relief",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG30-R18oPHkLVtWgBeYlnTrU2sYWYh37TTw&s",
      color: "bg-gradient-to-r from-rose-500 to-rose-600",
      description: "Painkillers & analgesics",
      count: "95+ items",
      component: "PainRelief"
    },
    {
      id: "respiratory",
      name: "Respiratory",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSheqZAjSZ4WYNc63XztuBrHrCC4AMu-45QAQ&s",
      color: "bg-gradient-to-r from-sky-500 to-sky-600",
      description: "Asthma & breathing aids",
      count: "75+ items",
      component: "Respiratory"
    },
    {
      id: "sexual-health",
      name: "Sexual Health",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl5dsaX36yPCpfPYMR484mFh9t006UY2e9_Q&s",
      color: "bg-gradient-to-r from-fuchsia-500 to-fuchsia-600",
      description: "Contraceptives & wellness",
      count: "65+ items",
      component: "SexualHealth"
    },
    {
      id: "stomach-care",
      name: "Stomach Care",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2tw07Kxb7P8NSVVyPgNY944zzaZzutp6hkA&s",
      color: "bg-gradient-to-r from-amber-500 to-amber-600",
      description: "Digestive health products",
      count: "100+ items",
      component: "Stomach"
    },
    {
      id: "women-health",
      name: "Women's Health",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTHc2MwCQx7o_8GayJMo2f8JB9EhOXvqjTyg&s",
      color: "bg-gradient-to-r from-rose-400 to-rose-500",
      description: "Feminine care & wellness",
      count: "140+ items",
      component: "WomenHealth"
    }
  ];

  const handleCategoryClick = (category) => {
    // Navigate to the specific category component page
    // Assuming you have routes set up like: /medical/:categoryName
    navigate(`/home/${category.id}`);
  };

  const handleAllProductsClick = () => {
    // Navigate to a page showing all products (filtered view)
    navigate("/home/all");
  };

  // Popular products section (top 6 products across all categories)
  const popularProducts = [
    {
      id: 1,
      name: "Diapers Premium Pack",
      category: "Baby Care",
      price: "₹899",
      originalPrice: "₹1199",
      discount: "25% OFF",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpTEpVzTVYuu0Fj18PoiE0KOUmz-uNbnV2KA&s",
      rating: 4.5
    },
    {
      id: 2,
      name: "Vitamin C Tablets",
      category: "Immunity",
      price: "₹299",
      originalPrice: "₹399",
      discount: "25% OFF",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsJ_fRmr6Op30JiCqMRWB2lmlx47eAAbIkow&s",
      rating: 4.3
    },
    {
      id: 3,
      name: "Hand Sanitizer",
      category: "Covid",
      price: "₹149",
      originalPrice: "₹199",
      discount: "25% OFF",
      image: "https://images.unsplash.com/photo-1583947581924-860bda6a26df?w=400&h=300&fit=crop",
      rating: 4.2
    },
    {
      id: 4,
      name: "Blood Pressure Monitor",
      category: "Heart Care",
      price: "₹2499",
      originalPrice: "₹2999",
      discount: "17% OFF",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-zpHXRa0v5iNz5WpZDmhId2Lss0cQOti0fQ&s",
      rating: 4.7
    },
    {
      id: 5,
      name: "Moisturizing Cream",
      category: "Skin Care",
      price: "₹449",
      originalPrice: "₹599",
      discount: "25% OFF",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOVl6SXLVgiVpCc5PUuJrkKGwzYX0tVJyfmg&s",
      rating: 4.4
    },
    {
      id: 6,
      name: "First Aid Kit",
      category: "First Aid",
      price: "₹799",
      originalPrice: "₹999",
      discount: "20% OFF",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiKoI-M2HDZmwKdXUwpoOx3GCuXofsfcABXw&s",
      rating: 4.6
    }
  ];

  // Handle product click to navigate to product detail
  const handleProductClick = (product) => {
    // You'll need to create appropriate detail pages for each category
    navigate(`/product/${product.id}`, { state: { product } });
  };

  return (
    <div className="max-w-7xl mx-auto px-1 sm:px-1 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Medical & Healthcare Products
        </h1>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          Discover our comprehensive range of healthcare products across all categories. 
          From baby care to elderly care, we have everything you need for your family's health.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">16+</div>
          <div className="text-gray-600">Categories</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">1000+</div>
          <div className="text-gray-600">Products</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
          <div className="text-gray-600">Support</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
          <div className="text-3xl font-bold text-orange-600 mb-2">100%</div>
          <div className="text-gray-600">Authentic Products</div>
        </div>
      </div>

      {/* Featured Categories Section */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Browse Categories</h2>
          <button 
            onClick={handleAllProductsClick}
            className="text-orange-600 font-semibold hover:text-orange-700 flex items-center gap-1"
          >
            View All Products
            <span>→</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 overflow-hidden group"
              onClick={() => handleCategoryClick(category)}
            >
              <div className="relative h-40 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/400x300?text=Category";
                  }}
                />
                <div className={`absolute inset-0 ${category.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                  <h3 className="font-bold text-white text-sm">{category.name}</h3>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-600 text-xs mb-3 line-clamp-2">
                  {category.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {category.count}
                  </span>
                  <span className="text-orange-600 text-xs font-semibold group-hover:translate-x-1 transition-transform duration-300">
                    View Products →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Products Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Popular Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden group"
              onClick={() => handleProductClick(product)}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-white text-orange-600 text-xs font-bold px-2 py-1 rounded">
                  {product.discount}
                </span>
                <span className="absolute top-3 right-3 bg-white text-gray-600 text-xs font-semibold px-2 py-1 rounded">
                  {product.category}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {product.name}
                </h3>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-sm ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                  <span className="text-sm text-gray-600 ml-1">
                    {product.rating}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-lg font-bold text-gray-900">
                      {product.price}
                    </span>
                    <span className="text-sm text-gray-500 line-through ml-2">
                      {product.originalPrice}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      alert(`Added ${product.name} to cart`);
                    }}
                    className="bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-700 transition-colors text-sm"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Health Tips Section */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Health Tips & Advice
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
              <span className="text-blue-600 text-xl">💊</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Medication Safety</h3>
            <p className="text-gray-600 text-sm">
              Always check expiration dates and store medications properly to ensure effectiveness.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3">
              <span className="text-green-600 text-xl">🌿</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Natural Remedies</h3>
            <p className="text-gray-600 text-sm">
              Combine traditional medicine with natural remedies for holistic healthcare.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-3">
              <span className="text-red-600 text-xl">🩺</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Regular Check-ups</h3>
            <p className="text-gray-600 text-sm">
              Schedule regular health check-ups to prevent diseases and maintain wellness.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-4">Need Help Choosing?</h2>
        <p className="mb-6 opacity-90">
          Our healthcare experts are available 24/7 to help you find the right products.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/consultation")}
            className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Talk to a Doctor
          </button>
          <button
            onClick={handleAllProductsClick}
            className="bg-transparent border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors"
          >
            Browse All Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default All;