// src/pages/Detail/HeartCareDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import cardiacData from "../../data/HeartCare.json";

const HeartCareDetail = () => {
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
      // Find product in the data
      const foundProduct = cardiacData.medications?.find(p => p.id === parseInt(id));
      setProduct(foundProduct);
      if (foundProduct) findRelatedProducts(foundProduct);
    }
  }, [id, location.state]);

  const findRelatedProducts = (currentProduct) => {
    const related = cardiacData.medications
      ?.filter(p => 
        p.id !== currentProduct.id && 
        (p.brand === currentProduct.brand || 
         (p.chemical_name && currentProduct.chemical_name && 
          p.chemical_name.includes(currentProduct.chemical_name.split(' ')[0])))
      )
      .slice(0, 4) || [];
    
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

    const cart = getCart();
    
    // Check if product already exists in cart
    const existingItemIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingItemIndex > -1) {
      // Update quantity if product exists
      cart[existingItemIndex].quantity += quantity;
    } else {
      // Add new product to cart
      const cartProduct = {
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: parseFloat(product.price.replace('₹', '')) || 0,
        originalPrice: parseFloat(product.originalPrice?.replace('₹', '')) || 0,
        image: "https://via.placeholder.com/100x100?text=Heart+Care",
        category: "Heart Care",
        prescriptionRequired: true,
        quantity: quantity,
        // Add chemical composition for cart display
        chemical_name: product.chemical_name,
        company_name: product.company_name
      };
      cart.push(cartProduct);
    }
    
    saveCart(cart);
    
    // Show success message
    setShowCartSuccess(true);
    setTimeout(() => setShowCartSuccess(false), 3000);
    
    console.log(`Added ${quantity} of ${product.name} to cart`);
  };

  const handleBuyNow = () => {
    // Add to cart first, then navigate to checkout
    handleAddToCart();
    setTimeout(() => {
      navigate("/checkout");
    }, 500);
  };

  const handleViewCart = () => {
    navigate("/cart");
  };

  const handleConsultDoctor = () => {
    alert("Please consult your cardiologist for proper prescription and dosage instructions.");
  };

  const handleUploadPrescription = () => {
    alert("Redirecting to prescription upload page...");
    // Navigate to prescription upload page
  };

  if (!product) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Medication not found</div>
      </div>
    );
  }

  // Calculate price values
  const price = parseFloat(product.price.replace('₹', '')) || 0;
  const originalPrice = parseFloat(product.originalPrice?.replace('₹', '')) || 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 text-sm text-gray-600">
          <li>
            <button onClick={() => navigate("/home/cardiac-care")} className="hover:text-red-600">
              Heart Care
            </button>
          </li>
          <li>/</li>
          <li className="text-gray-900 font-medium">{product.name}</li>
        </ol>
      </nav>

      {/* Cart Success Message */}
      {showCartSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in">
          <div className="flex items-center gap-3">
            <i className="fas fa-check text-xl"></i>
            <div>
              <p className="font-semibold">Added to Cart!</p>
              <p className="text-sm opacity-90">{quantity} × {product.name}</p>
              <p className="text-xs opacity-80">Prescription required for purchase</p>
            </div>
            <button 
              onClick={handleViewCart}
              className="ml-4 bg-white text-green-600 px-3 py-1 rounded text-sm font-semibold hover:bg-gray-100"
            >
              View Cart
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Image */}
        <div>
          <div className="bg-white rounded-lg border p-4 mb-4">
            <div className="w-full h-80 bg-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
              </div>
            </div>
          </div>

          {/* Chemical Composition Highlight */}
          {product.chemical_name && (
            <div className="mb-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                <i className="fas fa-flask text-blue-600"></i>
                Chemical Composition
              </h3>
              <div className="space-y-2">
                {product.chemical_name && (
                  <div>
                    <p className="text-sm text-blue-800 font-medium">Chemical Name:</p>
                    <p className="text-blue-900 text-sm bg-blue-100 p-2 rounded mt-1">
                      {product.chemical_name}
                    </p>
                  </div>
                )}
                {product.composition && (
                  <div>
                    <p className="text-sm text-blue-800 font-medium">Formulation:</p>
                    <p className="text-blue-900 text-sm">{product.composition}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Quick Facts */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <h3 className="font-semibold text-red-900 mb-3 flex items-center gap-2">
              <i className="fas fa-clipboard-list text-red-600"></i>
              Quick Facts
            </h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex flex-col">
                <span className="text-red-600">Medication Type:</span>
                <span className="font-medium">Cardiac Care</span>
              </div>
              <div className="flex flex-col">
                <span className="text-red-600">Brand:</span>
                <span className="font-medium">{product.brand}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-red-600">Company:</span>
                <span className="font-medium">{product.company_name || "Not specified"}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-red-600">Prescription:</span>
                <span className="font-medium text-red-600">Required</span>
              </div>
              <div className="flex flex-col">
                <span className="text-red-600">Drug Class:</span>
                <span className="font-medium">
                  {product.chemical_name?.includes('Clopidogrel') ? 'Antiplatelet' : 
                   product.chemical_name?.includes('Atorvastatin') || product.chemical_name?.includes('Rosuvastatin') ? 'Statin' :
                   product.chemical_name?.includes('Aspirin') ? 'NSAID/Antiplatelet' :
                   product.chemical_name?.includes('Ticagrelor') || product.chemical_name?.includes('Prasugrel') ? 'P2Y12 Inhibitor' :
                   product.chemical_name?.includes('Ezetimibe') ? 'Cholesterol Absorption Inhibitor' : 'Cardiovascular'}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-red-600">Safety:</span>
                <span className="font-medium text-green-600">Cardiologist Approved</span>
              </div>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="mb-4 bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h3 className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
              <i className="fas fa-shopping-basket text-purple-600"></i>
              Order Summary
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-purple-600">Price:</span>
                <span className="font-medium">₹{price} × {quantity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-600">Total:</span>
                <span className="font-bold text-lg text-purple-900">₹{price * quantity}</span>
              </div>
              {originalPrice > price && (
                <div className="flex justify-between">
                  <span className="text-purple-600">You Save:</span>
                  <span className="text-green-600 font-semibold">
                    ₹{(originalPrice - price) * quantity}
                  </span>
                </div>
              )}
              <div className="pt-2 border-t">
                <p className="text-purple-700 text-xs">
                  <i className="fas fa-file-medical mr-1"></i>
                  Valid prescription required for purchase
                </p>
              </div>
            </div>
          </div>

          {/* Medical Information */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
              <i className="fas fa-pills text-blue-600"></i>
              Cardiac Medication Information
            </h3>
            <div className="space-y-2 text-sm text-blue-800">
              {product.chemical_name && (
                <p><strong>Chemical Class:</strong> {getChemicalClass(product.chemical_name)}</p>
              )}
              <p><strong>Primary Use:</strong> {getPrimaryUse(product.chemical_name)}</p>
              <p><strong>Monitoring:</strong> Regular blood tests recommended</p>
              <p><strong>Storage:</strong> Store in cool, dry place away from moisture</p>
              {product.company_name && (
                <p><strong>Manufacturer:</strong> {product.company_name}</p>
              )}
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div>
          {/* Product Name with Chemical Info */}
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            
            {/* Chemical Name Display */}
            {product.chemical_name && (
              <div className="flex items-center gap-2 mb-2">
                <i className="fas fa-dna text-blue-600 text-lg"></i>
                <span className="text-blue-700 font-medium text-lg">
                  {product.chemical_name}
                </span>
                {product.brand && (
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm">
                    Brand: {product.brand}
                  </span>
                )}
              </div>
            )}
            
            <p className="text-gray-600">
              {product.composition ? (
                <><span className="font-semibold">{product.composition}</span></>
              ) : (
                <>by <span className="font-semibold">{product.composition}</span></>
              )}
            </p>
          </div>

          {/* Important Warning */}
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <i className="fas fa-exclamation-triangle text-red-500 text-xl"></i>
              <span className="text-red-800 font-bold">Important Medical Notice</span>
            </div>
            <p className="text-red-700 text-sm">
              This cardiac medication requires a valid prescription from a cardiologist. 
              Do not self-medicate. Always follow your doctor's prescription and dosage instructions.
            </p>
            {product.chemical_name && (
              <div className="mt-2 text-xs text-red-600">
                <p><strong>Note:</strong> Always verify chemical composition ({product.chemical_name}) with your cardiologist before use.</p>
              </div>
            )}
          </div>

          {/* Price */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl font-bold text-gray-900">
              {product.price}
            </span>
            {product.originalPrice && (
              <>
                <span className="text-xl text-gray-500 line-through">
                  {product.originalPrice}
                </span>
                <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-sm font-semibold">
                  Save {product.savings}
                </span>
              </>
            )}
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
            <p className="text-gray-600">{product.description}</p>
          </div>

          {/* Detailed Composition Section */}
          {(product.composition || product.chemical_name) && (
            <div className="mb-6 bg-white border border-blue-300 rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                <i className="fas fa-vial text-blue-600 text-xl"></i>
                Detailed Chemical Information
              </h3>
              <div className="space-y-3">
                {product.chemical_name && (
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-blue-800 font-medium mb-1">Chemical Name:</p>
                    <p className="text-blue-900 font-medium">{product.chemical_name}</p>
                  </div>
                )}
                {product.composition && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Formulation:</p>
                    <p className="text-gray-700 bg-gray-50 p-2 rounded">{product.composition}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* How to Order */}
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
              <i className="fas fa-book text-green-600"></i>
              How to Order Cardiac Medications
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">1</div>
                <span className="text-green-800">Consult your cardiologist</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">2</div>
                <span className="text-green-800">Get a valid prescription</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">3</div>
                <span className="text-green-800">Upload prescription and order</span>
              </div>
            </div>
          </div>

          {/* Safety Information */}
          <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-900 mb-2 flex items-center gap-2">
              <i className="fas fa-exclamation-triangle text-yellow-600"></i>
              Safety Information
            </h3>
            <ul className="text-yellow-800 text-sm space-y-2">
              <li className="flex items-start gap-2">
                <i className="fas fa-check text-green-500 mt-1"></i>
                Take exactly as prescribed by your doctor
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check text-green-500 mt-1"></i>
                Do not stop taking without medical advice
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check text-green-500 mt-1"></i>
                Report any unusual bleeding or bruising
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check text-green-500 mt-1"></i>
                Regular liver function tests may be required
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check text-green-500 mt-1"></i>
                Inform your doctor about all other medications
              </li>
              {product.chemical_name && (
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-green-500 mt-1"></i>
                  Verify chemical compatibility with other drugs
                </li>
              )}
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
                  -
                </button>
                <span className="px-4 py-1 min-w-[40px] text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(3, quantity + 1))}
                  className="px-3 py-1 hover:bg-gray-100 transition-colors text-gray-600"
                >
                  +
                </button>
              </div>
              <span className="text-sm text-gray-500">
                (Maximum: 3)
              </span>
            </div>

            <div className="flex gap-4 mb-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
              >
                <i className="fas fa-shopping-cart"></i>
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                <i className="fas fa-bolt"></i>
                Buy Now
              </button>
            </div>

            {/* Prescription Actions */}
            <div className="flex gap-3 mb-3">
              <button
                onClick={handleConsultDoctor}
                className="flex-1 border border-blue-600 text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
              >
                <i className="fas fa-user-md"></i>
                Consult Cardiologist
              </button>
              <button
                onClick={handleUploadPrescription}
                className="flex-1 border border-green-600 text-green-600 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors flex items-center justify-center gap-2"
              >
                <i className="fas fa-file-medical"></i>
                Upload Prescription
              </button>
            </div>

            {/* Quick Cart Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleViewCart}
                className="flex-1 border border-red-600 text-red-600 py-2 rounded-lg font-semibold hover:bg-red-50 transition-colors"
              >
                View Cart
              </button>
              <button
                onClick={() => navigate("/home")}
                className="flex-1 border border-gray-600 text-gray-600 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Heart Care Guidelines */}
      <div className="border-t pt-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Heart Care Best Practices</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Medication Management</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start gap-2">
                <i className="fas fa-check text-green-500 mt-1"></i>
                Take medications at same time daily
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check text-green-500 mt-1"></i>
                Never skip doses without doctor's advice
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check text-green-500 mt-1"></i>
                Keep regular follow-up appointments
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check text-green-500 mt-1"></i>
                Monitor blood pressure regularly
              </li>
            </ul>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Lifestyle Changes</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start gap-2">
                <i className="fas fa-check text-green-500 mt-1"></i>
                Follow a heart-healthy diet
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check text-green-500 mt-1"></i>
                Engage in regular physical activity
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check text-green-500 mt-1"></i>
                Maintain healthy body weight
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check text-green-500 mt-1"></i>
                Avoid smoking and limit alcohol consumption
              </li>
            </ul>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Warning Signs</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start gap-2">
                <i className="fas fa-check text-green-500 mt-1"></i>
                Chest pain or discomfort
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check text-green-500 mt-1"></i>
                Shortness of breath
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check text-green-500 mt-1"></i>
                Irregular heartbeat
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check text-green-500 mt-1"></i>
                Severe dizziness or fainting
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Emergency Information */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-bold text-red-900 mb-4 flex items-center gap-2">
          <i className="fas fa-exclamation-triangle text-red-500"></i>
          Emergency Heart Symptoms
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-start gap-2">
            <i className="fas fa-heart text-red-500 mt-1"></i>
            <span>Chest pain or pressure lasting more than few minutes</span>
          </div>
          <div className="flex items-start gap-2">
            <i className="fas fa-heart text-red-500 mt-1"></i>
            <span>Pain spreading to shoulder, arm, back, neck or jaw</span>
          </div>
          <div className="flex items-start gap-2">
            <i className="fas fa-lungs text-red-500 mt-1"></i>
            <span>Shortness of breath with or without chest discomfort</span>
          </div>
          <div className="flex items-start gap-2">
            <i className="fas fa-thermometer-full text-red-500 mt-1"></i>
            <span>Cold sweat, nausea, vomiting or lightheadedness</span>
          </div>
        </div>
        <div className="mt-4 p-3 bg-red-100 rounded-lg">
          <p className="text-red-700 text-center font-semibold flex items-center justify-center gap-2">
            <i className="fas fa-ambulance"></i>
            Call Emergency Services Immediately if you experience any of these symptoms!
          </p>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="border-t pt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Heart Medications</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(relatedProduct => (
              <div
                key={relatedProduct.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-gray-100"
                onClick={() => navigate(`/ProductDetail/HeartCareDetail/${relatedProduct.id}`, { 
                  state: { product: relatedProduct } 
                })}
              >
                <div className="relative">
                  <div className="w-full h-32 bg-gray-200 rounded-t-lg flex items-center justify-center">
                    <div className="text-center">
                      <img src={relatedProduct.image} alt="" className="w-full h-32 object-contain"/>
                    </div>
                  </div>
                  {relatedProduct.savings && (
                    <span className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
                      {relatedProduct.savings} OFF
                    </span>
                  )}
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                    Rx
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
                    {relatedProduct.name}
                  </h3>
                  {/* Show chemical name in related products */}
                  {relatedProduct.chemical_name && (
                    <p className="text-blue-600 text-xs mb-1 line-clamp-1">
                      {relatedProduct.chemical_name}
                    </p>
                  )}
                  <p className="text-gray-600 text-xs mb-2">{relatedProduct.brand}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-gray-900">
                      {relatedProduct.price}
                    </span>
                    {relatedProduct.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        {relatedProduct.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Helper functions for drug information
const getChemicalClass = (chemicalName) => {
  if (!chemicalName) return "Cardiovascular Drug";
  
  if (chemicalName.includes('Clopidogrel')) return "P2Y12 Inhibitor (Antiplatelet)";
  if (chemicalName.includes('Atorvastatin') || chemicalName.includes('Rosuvastatin')) return "HMG-CoA Reductase Inhibitor (Statin)";
  if (chemicalName.includes('Aspirin') || chemicalName.includes('Acetylsalicylic')) return "NSAID / Antiplatelet";
  if (chemicalName.includes('Ticagrelor')) return "P2Y12 Inhibitor (Reversible)";
  if (chemicalName.includes('Prasugrel')) return "P2Y12 Inhibitor (Irreversible)";
  if (chemicalName.includes('Ezetimibe')) return "Cholesterol Absorption Inhibitor";
  
  return "Cardiovascular Agent";
};

const getPrimaryUse = (chemicalName) => {
  if (!chemicalName) return "Heart attack and stroke prevention";
  
  if (chemicalName.includes('Clopidogrel') || chemicalName.includes('Aspirin') || 
      chemicalName.includes('Ticagrelor') || chemicalName.includes('Prasugrel')) {
    return "Prevention of blood clots, heart attack, and stroke";
  }
  if (chemicalName.includes('Atorvastatin') || chemicalName.includes('Rosuvastatin')) {
    return "Cholesterol lowering and cardiovascular risk reduction";
  }
  if (chemicalName.includes('Ezetimibe')) {
    return "Cholesterol absorption inhibition";
  }
  
  return "Cardiovascular protection";
};

const getMechanismOfAction = (chemicalName) => {
  if (!chemicalName) return "Cardiovascular protective mechanism";
  
  if (chemicalName.includes('Clopidogrel') || chemicalName.includes('Ticagrelor') || 
      chemicalName.includes('Prasugrel')) {
    return "Inhibits platelet aggregation to prevent clot formation";
  }
  if (chemicalName.includes('Aspirin') || chemicalName.includes('Acetylsalicylic')) {
    return "Irreversibly inhibits platelet COX-1 enzyme";
  }
  if (chemicalName.includes('Atorvastatin') || chemicalName.includes('Rosuvastatin')) {
    return "Inhibits HMG-CoA reductase, reducing cholesterol synthesis";
  }
  if (chemicalName.includes('Ezetimibe')) {
    return "Inhibits cholesterol absorption in small intestine";
  }
  
  return "Cardiovascular protective action";
};

export default HeartCareDetail;