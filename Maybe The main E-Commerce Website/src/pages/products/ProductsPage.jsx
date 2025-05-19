import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Filter, X, ChevronDown } from 'lucide-react';
import products, { getProductsByCategory, categories, searchProducts } from '../../data/products';
import ProductCard from '../../components/ui/ProductCard';
import axios from 'axios';

const ProductsPage = () => {
  const { category } = useParams();
  const location = useLocation();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(category || 'all');
  const [priceRange, setPriceRange] = useState([0, 1500]);
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);

  // Get search query from URL
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search') || '';
  const showDiscounted = searchParams.get('discount') === 'true';
  const apiUrl = import.meta.env.VITE_API_URL || ''
  const token = JSON.parse(sessionStorage.getItem('currentUser')).token

  const getProductData = async () => {
    const response = await axios.get(`${apiUrl}/getAllProducts`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    console.log(response);

    setFilteredProducts(response.data)
  }

  useEffect(() => {
    setLoading(true);
    getProductData()
    setLoading(false);
  }, []);


  useEffect(() => {
    setLoading(true);

    // Determine which products to show
    let productsToShow
    console.log(productsToShow, "Product to Show");


    // If search query exists
    if (searchQuery) {
      productsToShow = searchProducts(searchQuery);
    }
    // If category is provided
    else if (category) {
      productsToShow = getProductsByCategory(category);
      setSelectedCategory(category);
    }
    // Show all products
    else {
      productsToShow = [...products];
      setSelectedCategory('all');
    }

    // Apply discount filter if needed
    if (showDiscounted) {
      productsToShow = productsToShow.filter(p => p.discount > 0);
    }

    // Apply price filter
    productsToShow = productsToShow.filter(
      p => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        productsToShow.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        productsToShow.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        productsToShow.sort((a, b) => b.rating - a.rating);
        break;
      // Default is "featured" - no sorting needed as products are already sorted by featured status
    }

    setFilteredProducts(productsToShow);
    setLoading(false);
  }, [category, searchQuery, showDiscounted, priceRange, sortBy]);

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategory(value);

    // Redirect to appropriate URL without using navigate
    if (value === 'all') {
      window.history.pushState({}, '', '/products');
    } else {
      window.history.pushState({}, '', `/products/${value}`);
    }
  };

  const handlePriceChange = (event, index) => {
    const newRange = [...priceRange];
    newRange[index] = parseInt(event.target.value);
    setPriceRange(newRange);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setPriceRange([0, 1500]);
    setSortBy('featured');
    setShowFilters(false);
    window.history.pushState({}, '', '/products');
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Mobile Filter Toggle */}
          <div className="md:hidden w-full bg-white shadow rounded-lg p-4 mb-4">
            <button
              onClick={toggleFilters}
              className="w-full flex justify-between items-center bg-gray-100 hover:bg-gray-200 rounded-lg p-3 transition-colors"
            >
              <span className="font-medium flex items-center">
                <Filter size={18} className="mr-2" />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </span>
              <ChevronDown size={18} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Filters - Left Sidebar on Desktop, Collapsible on Mobile */}
          <div className={`w-full md:w-1/4 bg-white shadow rounded-lg p-4 ${showFilters ? 'block' : 'hidden md:block'}`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Filters</h2>
              <button
                onClick={clearFilters}
                className="text-blue-700 hover:text-blue-900 text-sm font-medium flex items-center"
              >
                <X size={16} className="mr-1" />
                Clear All
              </button>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Categories</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="category-all"
                    name="category"
                    value="all"
                    checked={selectedCategory === 'all'}
                    onChange={handleCategoryChange}
                    className="mr-2"
                  />
                  <label htmlFor="category-all" className="text-gray-800">All Products</label>
                </div>

                {categories.map((cat) => (
                  <div key={cat.id} className="flex items-center">
                    <input
                      type="radio"
                      id={`category-${cat.id}`}
                      name="category"
                      value={cat.id}
                      checked={selectedCategory === cat.id}
                      onChange={handleCategoryChange}
                      className="mr-2"
                    />
                    <label htmlFor={`category-${cat.id}`} className="text-gray-800">{cat.name}</label>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Price Range</h3>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1500"
                  step="50"
                  value={priceRange[0]}
                  onChange={(e) => handlePriceChange(e, 0)}
                  className="w-full"
                />
                <input
                  type="range"
                  min="0"
                  max="1500"
                  step="50"
                  value={priceRange[1]}
                  onChange={(e) => handlePriceChange(e, 1)}
                  className="w-full"
                />
              </div>
            </div>

            {/* On Sale */}
            <div className="mb-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="discount"
                  checked={showDiscounted}
                  onChange={() => {
                    const newParams = new URLSearchParams(location.search);
                    if (showDiscounted) {
                      newParams.delete('discount');
                    } else {
                      newParams.set('discount', 'true');
                    }
                    window.history.pushState({}, '', `?${newParams.toString()}`);
                  }}
                  className="mr-2"
                />
                <label htmlFor="discount" className="text-gray-800">On Sale</label>
              </div>
            </div>
          </div>

          {/* Products - Main Content */}
          <div className="w-full md:w-3/4">
            {/* Results Header */}
            <div className="bg-white shadow rounded-lg p-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h1 className="text-2xl font-bold mb-1">
                    {searchQuery ? `Search: "${searchQuery}"` :
                      category ? categories.find(c => c.id === category)?.name || 'Products' :
                        'All Products'}
                  </h1>
                  <p className="text-gray-600">{filteredProducts.length} products found</p>
                </div>

                <div className="flex items-center space-x-2">
                  <label htmlFor="sort" className="text-sm text-gray-600">Sort by:</label>
                  <select
                    id="sort"
                    value={sortBy}
                    onChange={handleSortChange}
                    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="bg-white shadow rounded-lg p-8 text-center">
                <h2 className="text-xl font-medium mb-2">No products found</h2>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <button
                  onClick={clearFilters}
                  className="text-blue-700 hover:text-blue-900 font-medium"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;