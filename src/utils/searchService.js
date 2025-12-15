// src/utils/searchService.js

// Import all JSON data files
import babycareData from '../data/babycare.json';
import cardiacData from '../data/cardiac.json';
import covidData from '../data/covidesentials.json';
import diabetesData from '../data/Diabetes.json';
import heartCareData from '../data/HeartCare.json';
import liverCareData from '../data/LiverCare.json';
import oralCareData from '../data/oralcare.json';
import painReliefData from '../data/painrelief.json';
import skincareData from '../data/skincare.json';
import stomachData from '../data/Stomach.json';

// Helper function to normalize data - handles both arrays and objects
const normalizeData = (data, categoryName, routeName) => {
  if (!data) return [];
  
  // If data is already an array
  if (Array.isArray(data)) {
    return data.map(item => ({
      ...item,
      category: categoryName,
      route: routeName
    }));
  }
  
  // If data is an object with products array
  if (data.products && Array.isArray(data.products)) {
    return data.products.map(item => ({
      ...item,
      category: categoryName,
      route: routeName
    }));
  }
  
  // If data is an object with nested arrays
  if (typeof data === 'object') {
    // Try to find any array property
    for (const key in data) {
      if (Array.isArray(data[key])) {
        return data[key].map(item => ({
          ...item,
          category: categoryName,
          route: routeName
        }));
      }
    }
  }
  
  // If data is a single object, wrap it in an array
  if (typeof data === 'object') {
    return [{
      ...data,
      category: categoryName,
      route: routeName
    }];
  }
  
  return [];
};

// Combine all products into one array with category info
const getAllProducts = () => {
  try {
    const allProducts = [
      ...normalizeData(babycareData, 'BabyCare', 'BabyCareDetail'),
      ...normalizeData(cardiacData, 'HeartCare', 'HeartCareDetail'),
      ...normalizeData(covidData, 'Covid', 'CovidDetail'),
      ...normalizeData(diabetesData, 'Diabetes', 'DiabetesCareDetail'),
      ...normalizeData(heartCareData, 'HeartCare', 'HeartCareDetail'),
      ...normalizeData(liverCareData, 'LiverCare', 'LiverCareDetail'),
      ...normalizeData(oralCareData, 'OralCare', 'OralCareDetail'),
      ...normalizeData(painReliefData, 'PainRelief', 'PainReliefDetail'),
      ...normalizeData(skincareData, 'SkinCare', 'SkinCareDetail'),
      ...normalizeData(stomachData, 'Stomach', 'StomachDetail'),
    ];
    
    // Ensure all items have proper IDs
    return allProducts.map((item, index) => ({
      ...item,
      searchId: `${item.category}-${item.id || index}`,
      id: item.id || index,
      // Ensure all items have required properties
      name: item.name || item.title || 'Unnamed Product',
      priceNumeric: item.priceNumeric || item.price || 0,
      image: item.image || item.img || 'https://via.placeholder.com/150?text=Product',
      category: item.category || 'Uncategorized',
      brand: item.brand || 'Generic',
      description: item.description || '',
      keyFeatures: item.keyFeatures || []
    }));
  } catch (error) {
    console.error('Error loading products:', error);
    return [];
  }
};

// Search function
export const searchProducts = (query, products) => {
  if (!query || query.trim().length < 2) {
    return [];
  }
  
  const searchTerm = query.toLowerCase().trim();
  
  return products.filter(product => {
    // Search in multiple fields
    const searchFields = [
      product.name?.toLowerCase() || '',
      product.brand?.toLowerCase() || '',
      product.category?.toLowerCase() || '',
      product.description?.toLowerCase() || '',
      Array.isArray(product.keyFeatures) ? product.keyFeatures.join(' ').toLowerCase() : '',
      product.ingredients?.toLowerCase() || '',
    ];
    
    // Check if any field contains the search term
    return searchFields.some(field => field.includes(searchTerm));
  });
};

// Advanced search with ranking
export const advancedSearch = (query, products) => {
  if (!query || query.trim().length < 2) {
    return [];
  }
  
  const searchTerm = query.toLowerCase().trim();
  const searchWords = searchTerm.split(' ').filter(word => word.length > 1);
  
  const scoredResults = products.map(product => {
    let score = 0;
    
    // Exact name match (highest priority)
    if (product.name?.toLowerCase() === searchTerm) {
      score += 100;
    }
    
    // Name contains search term
    if (product.name?.toLowerCase().includes(searchTerm)) {
      score += 50;
    }
    
    // Brand match
    if (product.brand?.toLowerCase().includes(searchTerm)) {
      score += 40;
    }
    
    // Category match
    if (product.category?.toLowerCase().includes(searchTerm)) {
      score += 30;
    }
    
    // Description match
    if (product.description?.toLowerCase().includes(searchTerm)) {
      score += 20;
    }
    
    // Multi-word search
    searchWords.forEach(word => {
      if (product.name?.toLowerCase().includes(word)) score += 25;
      if (product.brand?.toLowerCase().includes(word)) score += 15;
      if (product.description?.toLowerCase().includes(word)) score += 10;
    });
    
    // Key features match
    if (product.keyFeatures && Array.isArray(product.keyFeatures)) {
      const keyFeaturesText = product.keyFeatures.join(' ').toLowerCase();
      if (keyFeaturesText.includes(searchTerm)) {
        score += 15;
      }
      searchWords.forEach(word => {
        if (keyFeaturesText.includes(word)) score += 8;
      });
    }
    
    return { ...product, relevanceScore: score };
  })
  .filter(item => item.relevanceScore > 0)
  .sort((a, b) => b.relevanceScore - a.relevanceScore);
  
  return scoredResults;
};

// Get product by ID and category
export const getProductById = (category, id) => {
  const products = getAllProducts();
  return products.find(product => 
    product.category === category && (product.id == id || product.searchId === id)
  );
};

// Get all unique categories
export const getCategories = () => {
  const categories = new Set();
  getAllProducts().forEach(product => {
    if (product.category) {
      categories.add(product.category);
    }
  });
  return Array.from(categories);
};

// Get popular searches
export const getPopularSearches = () => {
  return [
    "Paracetamol", "Vitamin C", "Insulin", "Blood Pressure", 
    "Face Mask", "Baby Oil", "Pain Relief", "Cough Syrup",
    "Diabetes", "Skin Care", "Heart Care", "Stomach",
    "N95 Mask", "Sanitizer", "Thermometer", "First Aid"
  ];
};

// Debug function to check data structure
export const debugDataStructure = () => {
  console.log('=== DEBUG DATA STRUCTURES ===');
  console.log('babycareData:', Array.isArray(babycareData) ? 'Array' : 'Object', babycareData);
  console.log('cardiacData:', Array.isArray(cardiacData) ? 'Array' : 'Object', cardiacData);
  console.log('covidData:', Array.isArray(covidData) ? 'Array' : 'Object', covidData);
  console.log('diabetesData:', Array.isArray(diabetesData) ? 'Array' : 'Object', diabetesData);
  console.log('heartCareData:', Array.isArray(heartCareData) ? 'Array' : 'Object', heartCareData);
  console.log('liverCareData:', Array.isArray(liverCareData) ? 'Array' : 'Object', liverCareData);
  console.log('oralCareData:', Array.isArray(oralCareData) ? 'Array' : 'Object', oralCareData);
  console.log('painReliefData:', Array.isArray(painReliefData) ? 'Array' : 'Object', painReliefData);
  console.log('skincareData:', Array.isArray(skincareData) ? 'Array' : 'Object', skincareData);
  console.log('stomachData:', Array.isArray(stomachData) ? 'Array' : 'Object', stomachData);
  
  const allProducts = getAllProducts();
  console.log('Total products loaded:', allProducts.length);
  console.log('Sample product:', allProducts[0]);
};

export default {
  getAllProducts,
  searchProducts,
  advancedSearch,
  getProductById,
  getCategories,
  getPopularSearches,
  debugDataStructure
};