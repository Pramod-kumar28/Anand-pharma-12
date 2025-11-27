// src/pages/Detail/PainReliefDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import painReliefData from "../../data/painrelief.json";

const PainReliefDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (location.state?.product) {
      setProduct(location.state.product);
    } else {
      const foundProduct = painReliefData.find(p => p.id === parseInt(id));
      setProduct(foundProduct);
    }
  }, [id, location.state]);

  if (!product) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Product not found</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 text-sm text-gray-600">
          <li>
            <button onClick={() => navigate("/home/pain-relief")} className="hover:text-orange-600">
              Pain Relief
            </button>
          </li>
          <li>/</li>
          <li className="text-gray-900 font-medium">{product.name}</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="bg-white rounded-lg border p-4 mb-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-80 object-contain"
            />
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.brand}</p>

          {/* Pain Type Indicator */}
          {product.painType && (
            <div className="mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                For: {product.painType}
              </span>
            </div>
          )}

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

          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
            <p className="text-gray-600">{product.description}</p>
          </div>

          {product.reliefTime && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Fast Relief</h3>
              <p className="text-gray-600">Starts working in {product.reliefTime}</p>
            </div>
          )}

          {product.directions && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Directions</h3>
              <p className="text-gray-600">{product.directions}</p>
            </div>
          )}

          {product.warnings && (
            <div className="mb-6 bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h3 className="font-semibold text-orange-900 mb-2">Important</h3>
              <p className="text-orange-800 text-sm">{product.warnings}</p>
            </div>
          )}

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
                onClick={() => {
                  // Add to cart logic
                  console.log(`Added ${quantity} of ${product.name} to cart`);
                }}
                className="flex-1 bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
              >
                Add to Cart
              </button>
              <button
                onClick={() => {
                  // Buy now logic
                }}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PainReliefDetail;