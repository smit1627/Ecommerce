import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useData } from '../../context/DataContext';
import { ChevronDown, Filter, X } from 'lucide-react';
import ProductCard from '../../components/ui/ProductCard';
import CustomDropdown from '../../components/ui/CustomDropdown';
// import ProductCard from '@/components/ui/ProductCard';

const ProductsPage = () => {
  const { category } = useParams();
  const location = useLocation();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(category || 'all');
  const [priceRange, setPriceRange] = useState([0, 1500]);
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  const { products, categories, getProductsByCategory, searchProducts } = useData();
  const apiUrl = import.meta.env.VITE_API_URL || '';

  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search') || '';
  const showDiscounted = searchParams.get('discount') === 'true';

  const fetchAllProducts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/getAllProducts`);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, [apiUrl]);

  useEffect(() => {
    let productsToShow = [];

    if (searchQuery) {
      productsToShow = searchProducts(searchQuery);
    } else if (category) {
      productsToShow = getProductsByCategory(category);
    } else {
      productsToShow = [...products];
    }

    if (showDiscounted) {
      productsToShow = productsToShow.filter(product => product.discount > 0);
    }

    productsToShow = productsToShow.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

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
      default:
        break;
    }

    // handleCategoryChange()
    setFilteredProducts(productsToShow);
    setLoading(false);
  }, [category, searchQuery, showDiscounted, priceRange, sortBy, products]);

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategory(value);

    const newUrl = value === 'all' ? '/products' : `/products/${value}`;
    navigate(newUrl); // Properly navigates and triggers useEffect
  };

  useEffect(() => {
    setSelectedCategory(category || 'all');
  }, [category]);


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
    navigate('/products'); // Properly navigates
  };

  const toggleFilters = () => {
    setShowFilters(prev => !prev);
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
          <div className={`w-full md:w-1/4 bg-gray-50 shadow-md rounded-xl p-6 ${showFilters ? 'block' : 'hidden md:block'}`}>
            <div className="flex justify-between items-center border-b border-gray-300 pb-3 mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 tracking-wide">Filters</h2>
              <button
                onClick={clearFilters}
                className="text-blue-600 hover:text-blue-800 text-sm font-semibold flex items-center transition-colors duration-200"
                aria-label="Clear all filters"
              >
                <X size={18} className="mr-1" />
                Clear All
              </button>
            </div>

            {/* Categories */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-700 mb-4 tracking-wide">Categories</h3>
              <div className="flex flex-col space-y-3">
                <label
                  htmlFor="category-all"
                  className={`flex items-center cursor-pointer text-gray-800 select-none ${selectedCategory === 'all' ? 'font-semibold text-blue-700' : 'hover:text-blue-600'
                    }`}
                >
                  <input
                    type="radio"
                    id="category-all"
                    name="category"
                    value="all"
                    checked={selectedCategory === 'all'}
                    onChange={handleCategoryChange}
                    className="mr-3 w-5 h-5 accent-blue-600"
                  />
                  All Products
                </label>

                {categories.map((cat) => (
                  <label
                    key={cat.id}
                    htmlFor={`category-${cat.id}`}
                    className={`flex items-center cursor-pointer text-gray-800 select-none ${selectedCategory === cat.id ? 'font-semibold text-blue-700' : 'hover:text-blue-600'
                      }`}
                  >
                    <input
                      type="radio"
                      id={`category-${cat.id}`}
                      name="category"
                      value={cat.id}
                      checked={selectedCategory === cat.id}
                      onChange={handleCategoryChange}
                      className="mr-3 w-5 h-5 accent-blue-600"
                    />
                    {cat.name}
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-700 mb-4 tracking-wide">Price Range</h3>
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-gray-600 font-medium tracking-wide">
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
                  className="w-full accent-blue-600 cursor-pointer"
                />
                <input
                  type="range"
                  min="0"
                  max="1500"
                  step="50"
                  value={priceRange[1]}
                  onChange={(e) => handlePriceChange(e, 1)}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>
            </div>

            {/* On Sale */}
            <div className="mb-2">
              <label
                htmlFor="discount"
                className="flex items-center cursor-pointer select-none text-gray-800 font-medium hover:text-blue-600 transition-colors duration-200"
              >
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
                    navigate(`${location.pathname}?${newParams.toString()}`);
                  }}
                  className="mr-3 w-5 h-5 accent-blue-600"
                />
                On Sale
              </label>
            </div>
          </div>


          {/* Products - Main Content */}
          <div className="w-full md:w-3/4">
            {/* Results Header */}
            <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5">
                <div>
                  <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-1">
                    {searchQuery
                      ? `Search: "${searchQuery}"`
                      : category
                        ? categories.find((c) => c.id === category)?.name || 'Products'
                        : 'All Products'}
                  </h1>
                  <p className="text-sm text-gray-500 font-medium">
                    {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
                  </p>
                </div>

                <div className="flex items-center space-x-3 bg-gray-100 rounded-lg px-4 py-2 shadow-inner">
                  <label htmlFor="sort" className="text-sm text-gray-700 font-semibold select-none">
                    Sort by:
                  </label>
                  <CustomDropdown value={sortBy} onChange={setSortBy} />
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
                  <ProductCard key={product._id} product={product} />
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