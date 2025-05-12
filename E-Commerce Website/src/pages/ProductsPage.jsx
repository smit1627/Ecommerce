import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiGrid, FiList, FiFilter, FiX, FiChevronDown } from 'react-icons/fi'
import ProductCard from '../components/products/ProductCard'

// Sample product data for demonstration
import { featuredProducts } from '../data/products'

const ProductsPage = () => {
  const [searchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState('grid')
  const [sortBy, setSortBy] = useState('popularity')
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [expandedFilters, setExpandedFilters] = useState({
    categories: true,
    price: true,
    brand: false,
    rating: false,
  })

  // Get category from URL params
  const category = searchParams.get('category')
  const search = searchParams.get('search')

  useEffect(() => {
    // In a real app, this would fetch products from an API
    // Simulating API call
    setLoading(true)
    setTimeout(() => {
      let filteredProducts = [...featuredProducts]
      
      // Filter by category if provided
      if (category) {
        filteredProducts = filteredProducts.filter(product => 
          product.tags.includes(category.toLowerCase())
        )
      }
      
      // Filter by search query if provided
      if (search) {
        filteredProducts = filteredProducts.filter(product => 
          product.name.toLowerCase().includes(search.toLowerCase())
        )
      }
      
      // Add more products for demonstration
      const duplicatedProducts = [...filteredProducts]
      for (let i = 0; i < 2; i++) {
        duplicatedProducts.forEach(product => {
          filteredProducts.push({
            ...product,
            id: product.id + featuredProducts.length * (i + 1)
          })
        })
      }
      
      setProducts(filteredProducts)
      setLoading(false)
    }, 800)
    
    // Set page title
    document.title = category 
      ? `${category.charAt(0).toUpperCase() + category.slice(1)} Products - ShopWorld`
      : search
      ? `Search results for "${search}" - ShopWorld`
      : 'All Products - ShopWorld'
  }, [category, search])

  const toggleFilterSection = (section) => {
    setExpandedFilters({
      ...expandedFilters,
      [section]: !expandedFilters[section]
    })
  }
  
  const handleSortChange = (e) => {
    setSortBy(e.target.value)
    
    // In a real app, this would fetch sorted products or sort locally
    // For demo, just simulate different sorting
    const sortedProducts = [...products]
    
    if (e.target.value === 'price-low') {
      sortedProducts.sort((a, b) => 
        (a.discountedPrice || a.price) - (b.discountedPrice || b.price)
      )
    } else if (e.target.value === 'price-high') {
      sortedProducts.sort((a, b) => 
        (b.discountedPrice || b.price) - (a.discountedPrice || a.price)
      )
    }
    
    setProducts(sortedProducts)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  }

  return (
    <div className="py-8">
      <div className="container-custom">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-800">
            {category 
              ? `${category.charAt(0).toUpperCase() + category.slice(1)} Products`
              : search
              ? `Search results for "${search}"`
              : 'All Products'}
          </h1>
          <p className="text-neutral-600 mt-2">
            {loading 
              ? 'Finding the best products for you...'
              : `Showing ${products.length} products`}
          </p>
        </div>
        
        {/* Filters and products container */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile filter button */}
          <div className="lg:hidden">
            <button 
              className="w-full flex items-center justify-center space-x-2 bg-white border border-neutral-300 px-4 py-3 rounded-md"
              onClick={() => setFiltersOpen(!filtersOpen)}
            >
              {filtersOpen ? (
                <>
                  <FiX size={20} />
                  <span>Close Filters</span>
                </>
              ) : (
                <>
                  <FiFilter size={20} />
                  <span>Show Filters</span>
                </>
              )}
            </button>
          </div>
          
          {/* Filters sidebar - mobile */}
          <motion.div 
            className={`lg:hidden ${filtersOpen ? 'block' : 'hidden'}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: filtersOpen ? 'auto' : 0,
              opacity: filtersOpen ? 1 : 0
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white border border-neutral-200 p-4 rounded-lg">
              <h2 className="font-bold text-lg mb-4">Filters</h2>
              
              {/* Category filter */}
              <div className="mb-6">
                <div 
                  className="flex justify-between items-center cursor-pointer mb-2"
                  onClick={() => toggleFilterSection('categories')}
                >
                  <h3 className="font-medium">Categories</h3>
                  <FiChevronDown 
                    className={`transition-transform ${expandedFilters.categories ? 'rotate-180' : ''}`} 
                  />
                </div>
                
                {expandedFilters.categories && (
                  <div className="space-y-2 pl-2">
                    <div className="flex items-center">
                      <input type="checkbox" id="category-all-mobile" className="mr-2" />
                      <label htmlFor="category-all-mobile">All Categories</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="category-electronics-mobile" className="mr-2" />
                      <label htmlFor="category-electronics-mobile">Electronics</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="category-fashion-mobile" className="mr-2" />
                      <label htmlFor="category-fashion-mobile">Fashion</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="category-home-mobile" className="mr-2" />
                      <label htmlFor="category-home-mobile">Home & Living</label>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Price filter */}
              <div className="mb-6">
                <div 
                  className="flex justify-between items-center cursor-pointer mb-2"
                  onClick={() => toggleFilterSection('price')}
                >
                  <h3 className="font-medium">Price Range</h3>
                  <FiChevronDown 
                    className={`transition-transform ${expandedFilters.price ? 'rotate-180' : ''}`} 
                  />
                </div>
                
                {expandedFilters.price && (
                  <div className="space-y-4 pl-2">
                    <div className="flex items-center">
                      <input type="checkbox" id="price-all-mobile" className="mr-2" />
                      <label htmlFor="price-all-mobile">All Prices</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="price-under100-mobile" className="mr-2" />
                      <label htmlFor="price-under100-mobile">Under $100</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="price-100to500-mobile" className="mr-2" />
                      <label htmlFor="price-100to500-mobile">$100 - $500</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="price-500plus-mobile" className="mr-2" />
                      <label htmlFor="price-500plus-mobile">$500 & Above</label>
                    </div>
                  </div>
                )}
              </div>
              
              <button className="w-full btn-primary">Apply Filters</button>
            </div>
          </motion.div>
          
          {/* Filters sidebar - desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white border border-neutral-200 p-6 rounded-lg sticky top-28">
              <h2 className="font-bold text-lg mb-6">Filters</h2>
              
              {/* Category filter */}
              <div className="mb-6">
                <div 
                  className="flex justify-between items-center cursor-pointer mb-3"
                  onClick={() => toggleFilterSection('categories')}
                >
                  <h3 className="font-medium">Categories</h3>
                  <FiChevronDown 
                    className={`transition-transform ${expandedFilters.categories ? 'rotate-180' : ''}`} 
                  />
                </div>
                
                {expandedFilters.categories && (
                  <div className="space-y-2 pl-1">
                    <div className="flex items-center">
                      <input type="checkbox" id="category-all" className="mr-2" />
                      <label htmlFor="category-all">All Categories</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="category-electronics" className="mr-2" />
                      <label htmlFor="category-electronics">Electronics</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="category-fashion" className="mr-2" />
                      <label htmlFor="category-fashion">Fashion</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="category-home" className="mr-2" />
                      <label htmlFor="category-home">Home & Living</label>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Price filter */}
              <div className="mb-6">
                <div 
                  className="flex justify-between items-center cursor-pointer mb-3"
                  onClick={() => toggleFilterSection('price')}
                >
                  <h3 className="font-medium">Price Range</h3>
                  <FiChevronDown 
                    className={`transition-transform ${expandedFilters.price ? 'rotate-180' : ''}`} 
                  />
                </div>
                
                {expandedFilters.price && (
                  <div className="space-y-2 pl-1">
                    <div className="flex items-center">
                      <input type="checkbox" id="price-all" className="mr-2" />
                      <label htmlFor="price-all">All Prices</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="price-under100" className="mr-2" />
                      <label htmlFor="price-under100">Under $100</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="price-100to500" className="mr-2" />
                      <label htmlFor="price-100to500">$100 - $500</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="price-500plus" className="mr-2" />
                      <label htmlFor="price-500plus">$500 & Above</label>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Brand filter */}
              <div className="mb-6">
                <div 
                  className="flex justify-between items-center cursor-pointer mb-3"
                  onClick={() => toggleFilterSection('brand')}
                >
                  <h3 className="font-medium">Brand</h3>
                  <FiChevronDown 
                    className={`transition-transform ${expandedFilters.brand ? 'rotate-180' : ''}`} 
                  />
                </div>
                
                {expandedFilters.brand && (
                  <div className="space-y-2 pl-1">
                    <div className="flex items-center">
                      <input type="checkbox" id="brand-all" className="mr-2" />
                      <label htmlFor="brand-all">All Brands</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="brand-apple" className="mr-2" />
                      <label htmlFor="brand-apple">Apple</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="brand-samsung" className="mr-2" />
                      <label htmlFor="brand-samsung">Samsung</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="brand-sony" className="mr-2" />
                      <label htmlFor="brand-sony">Sony</label>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Rating filter */}
              <div className="mb-6">
                <div 
                  className="flex justify-between items-center cursor-pointer mb-3"
                  onClick={() => toggleFilterSection('rating')}
                >
                  <h3 className="font-medium">Customer Rating</h3>
                  <FiChevronDown 
                    className={`transition-transform ${expandedFilters.rating ? 'rotate-180' : ''}`} 
                  />
                </div>
                
                {expandedFilters.rating && (
                  <div className="space-y-2 pl-1">
                    <div className="flex items-center">
                      <input type="checkbox" id="rating-4plus" className="mr-2" />
                      <label htmlFor="rating-4plus">4★ & Above</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="rating-3plus" className="mr-2" />
                      <label htmlFor="rating-3plus">3★ & Above</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="rating-2plus" className="mr-2" />
                      <label htmlFor="rating-2plus">2★ & Above</label>
                    </div>
                  </div>
                )}
              </div>
              
              <button className="w-full btn-primary">Apply Filters</button>
            </div>
          </div>
          
          {/* Products section */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white border border-neutral-200 p-4 rounded-lg mb-6 flex flex-col sm:flex-row justify-between items-center">
              <div className="flex items-center space-x-3 mb-4 sm:mb-0">
                <button 
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-primary-100 text-primary-700' : 'hover:bg-neutral-100'}`}
                  onClick={() => setViewMode('grid')}
                  aria-label="Grid view"
                >
                  <FiGrid size={20} />
                </button>
                <button 
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-primary-100 text-primary-700' : 'hover:bg-neutral-100'}`}
                  onClick={() => setViewMode('list')}
                  aria-label="List view"
                >
                  <FiList size={20} />
                </button>
                <span className="text-neutral-500 text-sm">
                  Showing <span className="font-medium">{products.length}</span> products
                </span>
              </div>
              
              <div className="flex items-center">
                <label htmlFor="sort-by" className="mr-2 text-neutral-700">Sort by:</label>
                <select
                  id="sort-by"
                  value={sortBy}
                  onChange={handleSortChange}
                  className="border border-neutral-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="popularity">Popularity</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>
            </div>
            
            {/* Products grid */}
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="w-12 h-12 border-4 border-neutral-200 border-t-primary-600 rounded-full animate-spin"></div>
              </div>
            ) : (
              <motion.div 
                className={viewMode === 'grid' 
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" 
                  : "space-y-6"
                }
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </motion.div>
            )}
            
            {/* Pagination */}
            {!loading && products.length > 0 && (
              <div className="mt-10 flex justify-center">
                <nav className="flex items-center space-x-2">
                  <button className="px-4 py-2 border border-neutral-300 rounded-md text-neutral-700 hover:bg-neutral-50">
                    Previous
                  </button>
                  <button className="px-4 py-2 bg-primary-600 text-white rounded-md">
                    1
                  </button>
                  <button className="px-4 py-2 border border-neutral-300 rounded-md text-neutral-700 hover:bg-neutral-50">
                    2
                  </button>
                  <button className="px-4 py-2 border border-neutral-300 rounded-md text-neutral-700 hover:bg-neutral-50">
                    3
                  </button>
                  <span className="px-2">...</span>
                  <button className="px-4 py-2 border border-neutral-300 rounded-md text-neutral-700 hover:bg-neutral-50">
                    10
                  </button>
                  <button className="px-4 py-2 border border-neutral-300 rounded-md text-neutral-700 hover:bg-neutral-50">
                    Next
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductsPage