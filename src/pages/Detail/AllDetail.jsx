// src/pages/Detail/AllDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

// Import all data
import babyData from "../../data/babycare.json";
import skinData from "../../data/skincare.json";
import diabetesData from "../../data/Diabetes.json";
import cardiacData from "../../data/cardiac.json";
// Import other data...

const AllDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (location.state?.product) {
      setProduct(location.state.product);
      findRelatedProducts(location.state.product);
    } else {
      // Search across all categories
      const allProducts = [
        ...babyData,
        ...skinData,
        ...diabetesData,
        ...cardiacData,
        // Add other categories...
      ];
      const foundProduct = allProducts.find(p => p.id === parseInt(id));
      setProduct(foundProduct);
      if (foundProduct) findRelatedProducts(foundProduct);
    }
  }, [id, location.state]);

  const findRelatedProducts = (currentProduct) => {
    const allProducts = [
      ...babyData,
      ...skinData,
      ...diabetesData,
      ...cardiacData,
      // Add other categories...
    ];
    
    const related = allProducts
      .filter(p => 
        p.id !== currentProduct.id && 
        (p.category === currentProduct.category || p.brand === currentProduct.brand)
      )
      .slice(0, 4);
    
    setRelatedProducts(related);
  };

  const handleAddToCart = () => {
    // Add to cart logic
    console.log(`Added ${quantity} of ${product.name} to cart`);
  };

  const handleBuyNow = () => {
    // Buy now logic
    console.log(`Buying ${quantity} of ${product.name}`);
  };

  if (!product) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Product not found</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 text-sm text-gray-600">
          <li>
            <button onClick={() => navigate("/home/all")} className="hover:text-orange-600">
              All Products
            </button>
          </li>
          <li>/</li>
          <li className="text-gray-900 font-medium">{product.name}</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div>
          <div className="bg-white rounded-lg border p-4 mb-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-80 object-contain"
            />
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.brand}</p>

          {/* Price */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl font-bold text-gray-900">
              ₹{product.priceNumeric}
            </span>
            {product.originalPriceNumeric > product.priceNumeric && (
              <>
                <span className="text-xl text-gray-500 line-through">
                  ₹{product.originalPriceNumeric}
                </span>
                <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-semibold">
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

          {/* Key Features */}
          {product.keyFeatures && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Key Features</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {product.keyFeatures.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {/* How to Use */}
          {product.howToUse && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">How to Use</h3>
              <p className="text-gray-600">{product.howToUse}</p>
            </div>
          )}

          {/* Ingredients */}
          {product.ingredients && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Ingredients</h3>
              <p className="text-gray-600">{product.ingredients}</p>
            </div>
          )}

          {/* Warnings */}
          {product.warnings && (
            <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-900 mb-2">Important Information</h3>
              <p className="text-yellow-800 text-sm">{product.warnings}</p>
            </div>
          )}

          {/* Quantity and Actions */}
          <div className="border-t pt-6">
            <div className="flex items-center gap-4 mb-4">
              <span className="font-semibold">Quantity:</span>
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-4 py-1">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="border-t pt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(relatedProduct => (
              <div
                key={relatedProduct.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                onClick={() => navigate(`/product/AllDetail/${relatedProduct.id}`, { 
                  state: { product: relatedProduct } 
                })}
              >
                <div className="relative">
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  {relatedProduct.savings && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
                      {relatedProduct.savings} OFF
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                    {relatedProduct.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">{relatedProduct.brand}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-gray-900">
                      ₹{relatedProduct.priceNumeric}
                    </span>
                    {relatedProduct.originalPriceNumeric > relatedProduct.priceNumeric && (
                      <span className="text-sm text-gray-500 line-through">
                        ₹{relatedProduct.originalPriceNumeric}
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

export default AllDetail;