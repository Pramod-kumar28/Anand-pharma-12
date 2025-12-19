// src/pages/Detail/LiverCareDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import liverData from "../../data/LiverCare.json";

const LiverCareDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [showCartSuccess, setShowCartSuccess] = useState(false);

  useEffect(() => {
    if (location.state?.product) {
      setProduct(location.state.product);
      findRelatedProducts(location.state.product);
    } else {
      const foundProduct = findProductById(parseInt(id));
      setProduct(foundProduct);
      if (foundProduct) findRelatedProducts(foundProduct);
    }
  }, [id, location.state]);

  const findProductById = (productId) => {
    if (!liverData || !liverData.product) return null;
    
    // Search through all categories
    const categories = Object.values(liverData.product);
    for (const category of categories) {
      if (Array.isArray(category)) {
        const found = category.find(p => p.id === productId);
        if (found) return found;
      }
    }
    return null;
  };

  const getAllLiverProducts = () => {
    const allProducts = [];
    
    if (liverData && liverData.product) {
      Object.values(liverData.product).forEach(category => {
        if (Array.isArray(category)) {
          allProducts.push(...category);
        }
      });
    }
    
    return allProducts;
  };

  const findRelatedProducts = (currentProduct) => {
    const allProducts = getAllLiverProducts();
    
    const related = allProducts
      .filter(p => 
        p.id !== currentProduct.id && 
        (p.medicine_type === currentProduct.medicine_type || 
         (Array.isArray(p.uses) && Array.isArray(currentProduct.uses) && 
          p.uses.some(use => currentProduct.uses.includes(use))))
      )
      .slice(0, 4);
    
    setRelatedProducts(related);
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

  const handleAddToCart = () => {
    if (!product) return;

    const prescriptionRequired = product.medicine_type?.includes("Injection") || 
                                product.product_type === "Injection" ||
                                product.name.toLowerCase().includes("injection") ||
                                (product.final_price > 2000 && product.medicine_type !== "Herbal Supplement");
    
    if (prescriptionRequired) {
      alert("⚠️ This liver medication requires a doctor's prescription. Please consult your hepatologist.");
      return;
    }

    const cart = getCart();
    
    // Check if product already exists in cart
    const existingItemIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity += quantity;
    } else {
      const cartProduct = {
        id: product.id,
        name: product.name,
        brand: product.brand_name || product.manufacturer,
        price: product.final_price || product.cost,
        originalPrice: product.cost,
        image: product.images,
        category: "Liver Care",
        medicineType: product.medicine_type,
        prescriptionRequired: prescriptionRequired,
        quantity: quantity,
        composition: product.composition || "Not specified",
        uses: product.uses || []
      };
      cart.push(cartProduct);
    }
    
    saveCart(cart);
    
    setShowCartSuccess(true);
    setTimeout(() => setShowCartSuccess(false), 3000);
    
    console.log(`Added ${quantity} of ${product.name} to cart`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setTimeout(() => {
      navigate("/checkout");
    }, 500);
  };

  const handleViewCart = () => {
    navigate("/cart");
  };

  const handleConsultDoctor = () => {
    alert("Please consult your hepatologist or healthcare provider for proper prescription and dosage instructions for liver medications.");
  };

  const isPrescriptionRequired = () => {
    if (!product) return false;
    return product.medicine_type?.includes("Injection") || 
           product.product_type === "Injection" ||
           product.name.toLowerCase().includes("injection") ||
           (product.final_price > 2000 && product.medicine_type !== "Herbal Supplement");
  };

  if (!product) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Liver care product not found</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 text-sm text-gray-600">
          <li>
            <button onClick={() => navigate("/home/liver-care")} className="hover:text-green-600 flex items-center gap-1">
              <i className="fas fa-arrow-left text-xs"></i>
              Liver Care
            </button>
          </li>
          <li><i className="fas fa-chevron-right text-xs"></i></li>
          <li className="text-gray-900 font-medium flex items-center gap-1">
            <i className="fas fa-pills text-xs"></i>
            {product.name}
          </li>
        </ol>
      </nav>

      {/* Cart Success Message */}
      {showCartSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in">
          <div className="flex items-center gap-3">
            <i className="fas fa-check-circle text-xl"></i>
            <div>
              <p className="font-semibold">Added to Cart!</p>
              <p className="text-sm opacity-90">{quantity} × {product.name}</p>
              {isPrescriptionRequired() && (
                <p className="text-xs opacity-80">Consult doctor for prescription</p>
              )}
            </div>
            <button 
              onClick={handleViewCart}
              className="ml-4 bg-white text-green-600 px-3 py-1 rounded text-sm font-semibold hover:bg-gray-100 flex items-center gap-1"
            >
              <i className="fas fa-shopping-cart"></i>
              View Cart
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Image */}
        <div>
          <div className="bg-white rounded-lg border p-4 mb-4">
            <div className="w-full h-80 bg-gray-100 rounded-lg flex items-center justify-center">
              <img
                src={product.images || "/assets/placeholder.jpg"}
                alt={product.name}
                className="w-full h-full object-contain rounded-lg"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/400x400?text=Liver+Care";
                }}
              />
            </div>
          </div>
          
          {/* Composition & Ingredients */}
          {(product.composition || product.chemical_name || product.ingredients) && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                <i className="fas fa-leaf text-green-600"></i>
                Composition & Ingredients
              </h3>
              {product.composition && (
                <div className="mb-2">
                  <p className="text-sm text-green-800 font-medium">Full Composition:</p>
                  <p className="text-green-900 text-sm bg-green-100 p-2 rounded mt-1">{product.composition}</p>
                </div>
              )}
              {product.chemical_name && product.chemical_name !== "Herbal Extract Formulation" && (
                <div className="mb-2">
                  <p className="text-sm text-green-800 font-medium">Chemical Name:</p>
                  <p className="text-green-900 text-sm">{product.chemical_name}</p>
                </div>
              )}
              {product.chemical_name === "Herbal Extract Formulation" && (
                <div className="mb-2">
                  <p className="text-sm text-green-800 font-medium">Type:</p>
                  <p className="text-green-900 text-sm"><i className="fas fa-leaf text-green-600 mr-1"></i> Herbal/Ayurvedic Formulation</p>
                </div>
              )}
              {product.ingredients && product.ingredients.length > 0 && (
                <div>
                  <p className="text-sm text-green-800 font-medium">Key Ingredients:</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {product.ingredients.map((ingredient, index) => (
                      <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Quick Facts */}
          <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 mb-4">
            <h3 className="font-semibold text-teal-900 mb-3 flex items-center gap-2">
              <i className="fas fa-clipboard-list text-teal-600"></i>
              Quick Facts
            </h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex flex-col">
                <span className="text-teal-600">Medicine Type:</span>
                <span className="font-medium">{product.medicine_type}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-teal-600">Manufacturer:</span>
                <span className="font-medium">{product.manufacturer}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-teal-600">Brand Name:</span>
                <span className="font-medium text-teal-800">
                  {product.brand_name || "Not specified"}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-teal-600">Stock Status:</span>
                <span className={`font-medium ${product.stock > 50 ? 'text-green-600' : 'text-yellow-600'}`}>
                  {product.stock > 50 ? 'In Stock' : 'Low Stock'}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-teal-600">Prescription:</span>
                <span className={`font-medium ${isPrescriptionRequired() ? 'text-red-600' : 'text-green-600'}`}>
                  {isPrescriptionRequired() ? 'Required' : 'Not Required'}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-teal-600">Country of Origin:</span>
                <span className="font-medium">{product.country_of_origin || "India"}</span>
              </div>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="mb-4 bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h3 className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
              <i className="fas fa-file-invoice-dollar text-purple-600"></i>
              Order Summary
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-purple-600">Price:</span>
                <span className="font-medium">₹{(product.final_price || product.cost)} × {quantity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-600">Total:</span>
                <span className="font-bold text-lg text-purple-900">
                  ₹{(product.final_price || product.cost) * quantity}
                </span>
              </div>
              {product.cost > (product.final_price || product.cost) && (
                <div className="flex justify-between">
                  <span className="text-purple-600">You Save:</span>
                  <span className="text-green-600 font-semibold">
                    ₹{(product.cost - (product.final_price || product.cost)) * quantity}
                  </span>
                </div>
              )}
              <div className="pt-2 border-t">
                <p className="text-purple-700 text-xs">
                  {isPrescriptionRequired() 
                    ? "* Prescription required for purchase" 
                    : "* Over-the-counter product"}
                </p>
              </div>
            </div>
          </div>

          {/* Highlights */}
          {product.highlights && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <i className="fas fa-star text-gray-600"></i>
                Product Highlights
              </h3>
              <div className="grid grid-cols-1 gap-2 text-sm">
                {Object.entries(product.highlights).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-gray-600 capitalize">{key.replace('_', ' ')}:</span>
                    <span className="font-medium text-gray-900">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          {/* Product Name with Type */}
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            
            {/* Chemical/Herbal Info Display */}
            {product.chemical_name && product.chemical_name !== "Herbal Extract Formulation" && (
              <div className="flex items-center gap-2 mb-2">
                <i className="fas fa-flask text-blue-600"></i>
                <span className="text-blue-700 font-medium text-lg">
                  {product.chemical_name}
                </span>
                {product.brand_name && (
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                    <i className="fas fa-tag mr-1"></i>
                    {product.brand_name}
                  </span>
                )}
              </div>
            )}
            
            {/* Herbal/Ayurvedic Display */}
            {product.chemical_name === "Herbal Extract Formulation" && (
              <div className="flex items-center gap-2 mb-2">
                <i className="fas fa-leaf text-green-600"></i>
                <span className="text-green-700 font-medium text-lg">
                  Ayurvedic/Herbal Formulation
                </span>
                {product.brand_name && (
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                    <i className="fas fa-tag mr-1"></i>
                    {product.brand_name}
                  </span>
                )}
              </div>
            )}
            
            <p className="text-gray-600">
              by <span className="font-semibold">{product.manufacturer}</span>
              {product.company_name && ` (${product.company_name})`}
            </p>
          </div>

          {/* Rating and Stock */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1 bg-yellow-100 px-3 py-1 rounded-full">
              <i className="fas fa-star text-yellow-400"></i>
              <span className="font-semibold text-yellow-700">{product.rating || "4.0"}</span>
            </div>
            <div className={`text-sm px-3 py-1 rounded-full ${product.stock > 50 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
              <i className={`fas fa-${product.stock > 50 ? 'check-circle' : 'exclamation-triangle'} mr-1`}></i>
              {product.stock > 50 ? 'In Stock' : 'Low Stock'} ({product.stock || 100} units)
            </div>
            {isPrescriptionRequired() ? (
              <div className="text-sm px-3 py-1 rounded-full bg-red-100 text-red-700">
                <i className="fas fa-prescription-bottle mr-1"></i>
                Prescription Required
              </div>
            ) : (
              <div className="text-sm px-3 py-1 rounded-full bg-green-100 text-green-700">
                <i className="fas fa-cart-plus mr-1"></i>
                OTC Available
              </div>
            )}
          </div>

          {/* Detailed Composition Section */}
          {product.composition && (
            <div className="mb-6 bg-white border border-green-300 rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                <i className="fas fa-flask text-green-600"></i>
                Detailed Composition
              </h3>
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-green-800 font-medium">{product.composition}</p>
              </div>
              {product.ingredients && product.ingredients.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm text-gray-600 mb-2">Active Ingredients:</p>
                  <div className="flex flex-wrap gap-2">
                    {product.ingredients.map((ingredient, index) => (
                      <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Prescription Notice */}
          {isPrescriptionRequired() && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <i className="fas fa-exclamation-triangle text-red-500"></i>
                <span className="text-red-800 font-bold">Prescription Required</span>
              </div>
              <p className="text-red-700 text-sm">
                This liver medication requires a valid prescription from a hepatologist or healthcare provider.
                Please consult your doctor before use.
              </p>
              <div className="mt-2 text-xs text-red-600">
                <p><strong>Note:</strong> Always follow your doctor's advice for liver medications.</p>
              </div>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl font-bold text-gray-900">
              ₹{product.final_price || product.cost}
            </span>
            {product.cost > (product.final_price || product.cost) && (
              <>
                <span className="text-xl text-gray-500 line-through">
                  ₹{product.cost}
                </span>
                <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-semibold">
                  <i className="fas fa-percentage mr-1"></i>
                  Save {product.discount}%
                </span>
              </>
            )}
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
            <p className="text-gray-600">{product.description || "Effective liver care and hepatoprotective medication."}</p>
          </div>

          {/* Uses */}
          {Array.isArray(product.uses) && product.uses.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Primary Uses</h3>
              <div className="flex flex-wrap gap-2">
                {product.uses.map((use, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    <i className="fas fa-medical mr-1"></i>
                    {use}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Usage Information */}
          {product.information && (
            <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-900 mb-2 flex items-center gap-2">
                <i className="fas fa-info-circle text-yellow-600"></i>
                Usage Information
              </h3>
              {product.information.usage_instruction && (
                <div className="mb-2">
                  <p className="text-sm text-yellow-800 font-medium mb-1">Instructions:</p>
                  <p className="text-yellow-800 bg-yellow-100 p-2 rounded">{product.information.usage_instruction}</p>
                </div>
              )}
              {product.information.disclaimer && (
                <div>
                  <p className="text-sm text-yellow-800 font-medium mb-1">Important Note:</p>
                  <p className="text-yellow-800 text-sm bg-yellow-100 p-2 rounded">{product.information.disclaimer}</p>
                </div>
              )}
            </div>
          )}

          {/* Liver Health Benefits */}
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
              <i className="fas fa-heart text-green-600"></i>
              Liver Health Benefits
            </h3>
            <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside ml-4">
              <li>Supports liver detoxification processes</li>
              <li>Protects liver cells from damage</li>
              <li>Promotes liver regeneration</li>
              <li>Helps reduce liver inflammation</li>
              <li>Supports healthy bile flow</li>
            </ul>
          </div>

          {/* Quantity and Actions */}
          <div className="border-t pt-6">
            <div className="flex items-center gap-4 mb-4">
              <span className="font-semibold">Quantity:</span>
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 hover:bg-gray-100 transition-colors text-gray-600"
                >
                  <i className="fas fa-minus"></i>
                </button>
                <span className="px-4 py-1 min-w-[40px] text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 hover:bg-gray-100 transition-colors text-gray-600"
                >
                  <i className="fas fa-plus"></i>
                </button>
              </div>
              <span className="text-sm text-gray-500">
                (Max: {isPrescriptionRequired() ? '3' : '5'})
              </span>
            </div>

            <div className="flex gap-4 mb-3">
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
                  isPrescriptionRequired()
                    ? 'bg-gray-600 text-white hover:bg-gray-700'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                <i className="fas fa-shopping-cart"></i>
                {isPrescriptionRequired() ? 'Consult Doctor' : 'Add to Cart'}
              </button>
              <button
                onClick={handleBuyNow}
                className={`flex-1 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
                  isPrescriptionRequired()
                    ? 'bg-gray-700 text-white hover:bg-gray-800'
                    : 'bg-green-700 text-white hover:bg-green-800'
                }`}
                disabled={isPrescriptionRequired()}
              >
                <i className="fas fa-bolt"></i>
                Buy Now
              </button>
            </div>

            {/* Consult Doctor Action */}
            {isPrescriptionRequired() && (
              <button
                onClick={handleConsultDoctor}
                className="w-full border border-red-600 text-red-600 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors flex items-center justify-center gap-2 mb-3"
              >
                <i className="fas fa-user-md"></i>
                Consult Hepatologist for Prescription
              </button>
            )}

            {/* Quick Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleViewCart}
                className="flex-1 border border-green-600 text-green-600 py-2 rounded-lg font-semibold hover:bg-green-50 transition-colors flex items-center justify-center gap-2"
              >
                <i className="fas fa-shopping-cart"></i>
                View Cart
              </button>
              <button
                onClick={() => navigate("/home")}
                className="flex-1 border border-gray-600 text-gray-600 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <i className="fas fa-home"></i>
                Continue Shopping
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Liver Health Information */}
      {/* <div className="border-t pt-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <i className="fas fa-shield-alt text-green-600"></i>
          Liver Health & Safety Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
              <i className="fas fa-temperature-low text-green-600"></i>
              Storage Instructions
            </h3>
            <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
              <li>Store in original packaging</li>
              <li>Keep away from moisture and heat</li>
              <li>Store at room temperature</li>
              <li>Keep out of reach of children</li>
            </ul>
          </div>
          <div className="bg-white border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
              <i className="fas fa-exclamation-triangle text-green-600"></i>
              Safety Precautions
            </h3>
            <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
              <li>Do not exceed recommended dosage</li>
              <li>Check expiry date before use</li>
              <li>Consult doctor for liver conditions</li>
              <li>Monitor liver function regularly</li>
            </ul>
          </div>
          <div className="bg-white border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
              <i className="fas fa-heartbeat text-green-600"></i>
              Liver Health Tips
            </h3>
            <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
              <li>Maintain a healthy diet</li>
              <li>Limit alcohol consumption</li>
              <li>Exercise regularly</li>
              <li>Stay hydrated</li>
            </ul>
          </div>
        </div>
      </div> */}

      {/* Liver Care Guidelines */}
      {/* <div className="border-t pt-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Liver Care Guidelines</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <i className="fas fa-wine-bottle text-gray-600"></i>
              Alcohol Management
            </h3>
            <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
              <li>Limit alcohol intake or avoid completely</li>
              <li>Allow liver recovery time between drinks</li>
              <li>Never mix alcohol with liver medications</li>
              <li>Consult your doctor about safe limits</li>
            </ul>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <i className="fas fa-utensils text-gray-600"></i>
              Dietary Management
            </h3>
            <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
              <li>Eat antioxidant-rich foods</li>
              <li>Include fiber in your diet</li>
              <li>Limit processed and fried foods</li>
              <li>Maintain a healthy weight</li>
            </ul>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <i className="fas fa-stethoscope text-gray-600"></i>
              Medical Monitoring
            </h3>
            <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
              <li>Regular liver function tests</li>
              <li>Monitor medication side effects</li>
              <li>Annual ultrasound if recommended</li>
              <li>Keep doctor appointments</li>
            </ul>
          </div>
        </div>
      </div> */}

      {/* Important Medical Notice */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-bold text-red-900 mb-4 flex items-center gap-2">
          <i className="fas fa-exclamation-triangle text-red-500"></i>
          Important Medical Notice
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-start gap-2">
            <i className="fas fa-file-medical text-red-500 mt-1"></i>
            <span>Consult a hepatologist before starting any liver medication</span>
          </div>
          <div className="flex items-start gap-2">
            <i className="fas fa-exclamation-triangle text-red-500 mt-1"></i>
            <span>Do not self-medicate for liver conditions</span>
          </div>
          <div className="flex items-start gap-2">
            <i className="fas fa-pills text-red-500 mt-1"></i>
            <span>Inform your doctor about all medications you're taking</span>
          </div>
          <div className="flex items-start gap-2">
            <i className="fas fa-stethoscope text-red-500 mt-1"></i>
            <span>Monitor for symptoms like jaundice or abdominal pain</span>
          </div>
          <div className="flex items-start gap-2">
            <i className="fas fa-wine-bottle text-red-500 mt-1"></i>
            <span>Avoid alcohol while taking liver medications</span>
          </div>
          <div className="flex items-start gap-2">
            <i className="fas fa-heartbeat text-red-500 mt-1"></i>
            <span>Get regular liver function tests as advised</span>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="border-t pt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <i className="fas fa-boxes text-green-600"></i>
            Related Liver Care Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(relatedProduct => {
              const isRxRequired = relatedProduct.medicine_type?.includes("Injection") || 
                                 relatedProduct.name.toLowerCase().includes("injection");
              
              return (
                <div
                  key={relatedProduct.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-gray-100"
                  onClick={() => navigate(`/ProductDetail/LiverCareDetail/${relatedProduct.id}`, { 
                    state: { product: relatedProduct } 
                  })}
                >
                  <div className="relative">
                    <div className="w-full h-32 bg-gray-100 rounded-t-lg flex items-center justify-center">
                      <img
                        src={relatedProduct.images || "/assets/placeholder.jpg"}
                        alt={relatedProduct.name}
                        className="w-full h-full object-contain rounded-t-lg bg-white p-2"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/300x200?text=Liver+Care";
                        }}
                      />
                    </div>
                    {relatedProduct.discount > 0 && (
                      <span className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
                        <i className="fas fa-tag mr-1"></i>
                        {relatedProduct.discount}% OFF
                      </span>
                    )}
                    <div className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-semibold ${
                      isRxRequired ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
                    }`}>
                      <i className={`fas fa-${isRxRequired ? 'prescription' : 'cart-plus'} mr-1`}></i>
                      {isRxRequired ? 'Rx' : 'OTC'}
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
                      {relatedProduct.name}
                    </h3>
                    {/* Show type info */}
                    {relatedProduct.chemical_name === "Herbal Extract Formulation" ? (
                      <p className="text-green-600 text-xs mb-1 flex items-center gap-1">
                        <i className="fas fa-leaf"></i>
                        Herbal Formulation
                      </p>
                    ) : relatedProduct.chemical_name && (
                      <p className="text-blue-600 text-xs mb-1 line-clamp-1 flex items-center gap-1">
                        <i className="fas fa-flask"></i>
                        {relatedProduct.chemical_name}
                      </p>
                    )}
                    <p className="text-gray-600 text-xs mb-2">{relatedProduct.medicine_type}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-gray-900">
                        ₹{relatedProduct.final_price || relatedProduct.cost}
                      </span>
                      {relatedProduct.cost > (relatedProduct.final_price || relatedProduct.cost) && (
                        <span className="text-sm text-gray-500 line-through">
                          ₹{relatedProduct.cost}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

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

export default LiverCareDetail;