import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  FiShoppingCart, 
  FiHeart, 
  FiShare2, 
  FiStar, 
  FiCheck, 
  FiTruck, 
  FiPackage, 
  FiRefreshCw 
} from 'react-icons/fi'

// Import sample data
import { featuredProducts } from '../data/products'

const ProductDetailPage = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')
  const [isLiked, setIsLiked] = useState(false)
  
  // For demo purposes, create multiple images
  const [productImages, setProductImages] = useState([])

  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0)
    
    // In a real app, you'd fetch product by ID from API
    // For demo, we'll use the featured products data
    setLoading(true)
    setTimeout(() => {
      const foundProduct = featuredProducts.find(p => p.id === parseInt(id))
      
      if (foundProduct) {
        setProduct(foundProduct)
        
        // Create multiple images for demo
        const images = [
          foundProduct.imageUrl,
          // Additional similar images for the gallery
          "https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg",
          "https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg",
          "https://images.pexels.com/photos/3829441/pexels-photo-3829441.jpeg",
        ]
        setProductImages(images)
        document.title = `${foundProduct.name} - ShopWorld`
      } else {
        document.title = 'Product Not Found - ShopWorld'
      }
      
      setLoading(false)
    }, 800)
  }, [id])

  const handleQuantityChange = (value) => {
    if (value < 1) return
    setQuantity(value)
  }
  
  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${product.name} to cart`)
    // In a real app, this would add to cart functionality
  }
  
  const toggleWishlist = () => {
    setIsLiked(!isLiked)
    // In a real app, this would toggle wishlist status
  }

  if (loading) {
    return (
      <div className="container-custom py-12">
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 border-4 border-neutral-200 border-t-primary-600 rounded-full animate-spin"></div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container-custom py-12 text-center">
        <h2 className="text-2xl font-bold text-neutral-800 mb-4">Product Not Found</h2>
        <p className="text-neutral-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/products" className="btn-primary">Browse All Products</Link>
      </div>
    )
  }

  return (
    <div className="py-8">
      <div className="container-custom">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <nav className="text-sm text-neutral-500">
            <ol className="flex flex-wrap items-center">
              <li className="flex items-center">
                <Link to="/" className="hover:text-primary-600 transition-colors">Home</Link>
                <span className="mx-2">/</span>
              </li>
              <li className="flex items-center">
                <Link to="/products" className="hover:text-primary-600 transition-colors">Products</Link>
                <span className="mx-2">/</span>
              </li>
              <li className="flex items-center">
                <span className="text-neutral-800 font-medium">{product.name}</span>
              </li>
            </ol>
          </nav>
        </div>
        
        {/* Product detail */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 p-6">
            {/* Product Images - Gallery */}
            <div className="lg:col-span-2">
              <div className="flex flex-col">
                {/* Main image */}
                <motion.div 
                  className="relative aspect-square bg-neutral-100 rounded-lg overflow-hidden mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <img 
                    src={productImages[selectedImage]} 
                    alt={product.name} 
                    className="w-full h-full object-contain"
                  />
                  {product.isOnSale && (
                    <div className="absolute top-4 left-4 bg-accent-500 text-white px-3 py-1 text-sm font-medium rounded">
                      {product.discount}% OFF
                    </div>
                  )}
                </motion.div>
                
                {/* Thumbnail images */}
                <div className="flex space-x-2">
                  {productImages.map((image, index) => (
                    <button
                      key={index}
                      className={`w-20 h-20 rounded-md overflow-hidden ${
                        selectedImage === index 
                          ? 'ring-2 ring-primary-600' 
                          : 'ring-1 ring-neutral-200'
                      }`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <img 
                        src={image} 
                        alt={`Product view ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Product Info */}
            <div className="lg:col-span-3">
              <div className="flex flex-col h-full">
                {/* Title, reviews, etc. */}
                <div className="mb-6">
                  <h1 className="text-2xl sm:text-3xl font-bold text-neutral-800 mb-2">
                    {product.name}
                  </h1>
                  
                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <FiStar
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(product.rating) 
                              ? 'text-yellow-400 fill-yellow-400' 
                              : 'text-neutral-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-neutral-500">{product.rating} ({product.reviewCount} reviews)</span>
                  </div>
                  
                  {/* Price */}
                  <div className="flex items-center mb-6">
                    {product.discountedPrice ? (
                      <>
                        <span className="text-2xl font-bold text-neutral-800">${product.discountedPrice}</span>
                        <span className="ml-3 text-lg text-neutral-500 line-through">${product.price}</span>
                        <span className="ml-3 text-accent-600 font-medium">Save ${(product.price - product.discountedPrice).toFixed(2)}</span>
                      </>
                    ) : (
                      <span className="text-2xl font-bold text-neutral-800">${product.price}</span>
                    )}
                  </div>
                  
                  {/* Short description */}
                  <p className="text-neutral-600 mb-6">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. 
                    Sed euismod, nisl eget ultricies ultricies, nisl nisl aliquam nisl, eget
                    aliquam nisl nisl eget nisl. Sed euismod, nisl eget ultricies ultricies.
                  </p>
                  
                  {/* Variants (if applicable) */}
                  <div className="mb-6">
                    <h3 className="font-medium text-neutral-800 mb-2">Available Colors:</h3>
                    <div className="flex space-x-3">
                      <button className="w-8 h-8 rounded-full bg-black ring-2 ring-offset-2 ring-black"></button>
                      <button className="w-8 h-8 rounded-full bg-white border border-neutral-300"></button>
                      <button className="w-8 h-8 rounded-full bg-blue-600"></button>
                      <button className="w-8 h-8 rounded-full bg-red-600"></button>
                    </div>
                  </div>
                  
                  {/* Quantity selector */}
                  <div className="mb-6">
                    <h3 className="font-medium text-neutral-800 mb-2">Quantity:</h3>
                    <div className="flex items-center">
                      <button 
                        className="w-10 h-10 border border-neutral-300 flex items-center justify-center rounded-l-md bg-neutral-50 hover:bg-neutral-100 transition-colors"
                        onClick={() => handleQuantityChange(quantity - 1)}
                        disabled={quantity <= 1}
                      >
                        -
                      </button>
                      <input 
                        type="number" 
                        min="1" 
                        value={quantity} 
                        onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                        className="w-16 h-10 border-y border-neutral-300 text-center focus:outline-none"
                      />
                      <button 
                        className="w-10 h-10 border border-neutral-300 flex items-center justify-center rounded-r-md bg-neutral-50 hover:bg-neutral-100 transition-colors"
                        onClick={() => handleQuantityChange(quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  {/* Shipping & availability info */}
                  <div className="flex flex-col space-y-2 mb-6">
                    <div className="flex items-center text-sm text-neutral-700">
                      <FiCheck className="w-5 h-5 mr-2 text-green-500" />
                      <span>In stock and ready to ship</span>
                    </div>
                    <div className="flex items-center text-sm text-neutral-700">
                      <FiTruck className="w-5 h-5 mr-2 text-neutral-500" />
                      <span>Free shipping on orders over $50</span>
                    </div>
                    <div className="flex items-center text-sm text-neutral-700">
                      <FiPackage className="w-5 h-5 mr-2 text-neutral-500" />
                      <span>Free returns within 30 days</span>
                    </div>
                  </div>
                  
                  {/* Action buttons */}
                  <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                    <button 
                      className="btn-primary flex-1 flex items-center justify-center py-3"
                      onClick={handleAddToCart}
                    >
                      <FiShoppingCart className="mr-2" />
                      Add to Cart
                    </button>
                    <button 
                      className={`btn-secondary flex items-center justify-center py-3 ${
                        isLiked ? 'text-accent-600 border-accent-600' : ''
                      }`}
                      onClick={toggleWishlist}
                    >
                      <FiHeart className={`mr-2 ${isLiked ? 'fill-accent-600' : ''}`} />
                      {isLiked ? 'Saved' : 'Save'}
                    </button>
                    <button className="btn-secondary flex items-center justify-center py-3 px-4">
                      <FiShare2 className="mr-2" />
                      Share
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Product tabs: Description, Specs, Reviews */}
          <div className="border-t border-neutral-200 mt-4">
            <div className="flex flex-wrap border-b border-neutral-200">
              <button 
                className={`px-6 py-3 font-medium text-sm ${
                  activeTab === 'description' 
                    ? 'text-primary-600 border-b-2 border-primary-600' 
                    : 'text-neutral-600 hover:text-neutral-800'
                }`}
                onClick={() => setActiveTab('description')}
              >
                Description
              </button>
              <button 
                className={`px-6 py-3 font-medium text-sm ${
                  activeTab === 'specifications' 
                    ? 'text-primary-600 border-b-2 border-primary-600' 
                    : 'text-neutral-600 hover:text-neutral-800'
                }`}
                onClick={() => setActiveTab('specifications')}
              >
                Specifications
              </button>
              <button 
                className={`px-6 py-3 font-medium text-sm ${
                  activeTab === 'reviews' 
                    ? 'text-primary-600 border-b-2 border-primary-600' 
                    : 'text-neutral-600 hover:text-neutral-800'
                }`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews ({product.reviewCount})
              </button>
            </div>
            
            <div className="p-6">
              {activeTab === 'description' && (
                <div className="prose max-w-none">
                  <h3>Product Description</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. 
                    Sed euismod, nisl eget ultricies ultricies, nisl nisl aliquam nisl, eget
                    aliquam nisl nisl eget nisl. Sed euismod, nisl eget ultricies ultricies, 
                    nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.
                  </p>
                  <p>
                    Nunc auctor, nisl eget ultricies ultricies, nisl nisl aliquam nisl, eget
                    aliquam nisl nisl eget nisl. Sed euismod, nisl eget ultricies ultricies, 
                    nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl. Nunc auctor, 
                    nisl eget ultricies ultricies, nisl nisl aliquam nisl.
                  </p>
                  <h4>Key Features</h4>
                  <ul>
                    <li>High-quality materials and craftsmanship</li>
                    <li>Innovative design for maximum comfort and functionality</li>
                    <li>Versatile usage for various settings and occasions</li>
                    <li>Durable construction for long-lasting performance</li>
                    <li>Easy to maintain and clean</li>
                  </ul>
                </div>
              )}
              
              {activeTab === 'specifications' && (
                <div className="overflow-hidden">
                  <table className="min-w-full">
                    <tbody className="bg-white">
                      <tr className="border-b border-neutral-200">
                        <td className="px-4 py-3 text-sm font-medium text-neutral-900 bg-neutral-50 w-1/3">Brand</td>
                        <td className="px-4 py-3 text-sm text-neutral-700">Premium Brand</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="px-4 py-3 text-sm font-medium text-neutral-900 bg-neutral-50">Model</td>
                        <td className="px-4 py-3 text-sm text-neutral-700">X-1000 Pro</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="px-4 py-3 text-sm font-medium text-neutral-900 bg-neutral-50">Dimensions</td>
                        <td className="px-4 py-3 text-sm text-neutral-700">10" x 8" x 3"</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="px-4 py-3 text-sm font-medium text-neutral-900 bg-neutral-50">Weight</td>
                        <td className="px-4 py-3 text-sm text-neutral-700">1.5 lbs</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="px-4 py-3 text-sm font-medium text-neutral-900 bg-neutral-50">Material</td>
                        <td className="px-4 py-3 text-sm text-neutral-700">Premium-grade aluminum and polymer</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="px-4 py-3 text-sm font-medium text-neutral-900 bg-neutral-50">Color Options</td>
                        <td className="px-4 py-3 text-sm text-neutral-700">Black, White, Blue, Red</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="px-4 py-3 text-sm font-medium text-neutral-900 bg-neutral-50">Warranty</td>
                        <td className="px-4 py-3 text-sm text-neutral-700">2-year limited warranty</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
              
              {activeTab === 'reviews' && (
                <div>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                    <div>
                      <h3 className="text-xl font-bold text-neutral-800 mb-2">Customer Reviews</h3>
                      <div className="flex items-center">
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <FiStar
                              key={i}
                              className={`w-5 h-5 ${
                                i < Math.floor(product.rating) 
                                  ? 'text-yellow-400 fill-yellow-400' 
                                  : 'text-neutral-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-neutral-600">Based on {product.reviewCount} reviews</span>
                      </div>
                    </div>
                    <button className="mt-4 md:mt-0 btn-primary">Write a Review</button>
                  </div>
                  
                  {/* Sample reviews */}
                  <div className="space-y-6">
                    {/* Review 1 */}
                    <div className="border-b border-neutral-200 pb-6">
                      <div className="flex justify-between mb-2">
                        <h4 className="font-medium text-neutral-800">John D.</h4>
                        <span className="text-neutral-500 text-sm">2 days ago</span>
                      </div>
                      <div className="flex mb-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <FiStar
                            key={i}
                            className={`w-4 h-4 ${
                              i < 5
                                ? 'text-yellow-400 fill-yellow-400' 
                                : 'text-neutral-300'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-neutral-700">
                        Excellent product! Exactly as described and arrived quickly. The quality is outstanding and I'm very happy with my purchase.
                      </p>
                    </div>
                    
                    {/* Review 2 */}
                    <div className="border-b border-neutral-200 pb-6">
                      <div className="flex justify-between mb-2">
                        <h4 className="font-medium text-neutral-800">Sarah M.</h4>
                        <span className="text-neutral-500 text-sm">1 week ago</span>
                      </div>
                      <div className="flex mb-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <FiStar
                            key={i}
                            className={`w-4 h-4 ${
                              i < 4
                                ? 'text-yellow-400 fill-yellow-400' 
                                : 'text-neutral-300'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-neutral-700">
                        Great product overall. Shipping was fast and packaging was secure. Only giving 4 stars because the color was slightly different than shown in the photos, but still very nice.
                      </p>
                    </div>
                    
                    {/* Review 3 */}
                    <div>
                      <div className="flex justify-between mb-2">
                        <h4 className="font-medium text-neutral-800">Michael P.</h4>
                        <span className="text-neutral-500 text-sm">2 weeks ago</span>
                      </div>
                      <div className="flex mb-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <FiStar
                            key={i}
                            className={`w-4 h-4 ${
                              i < 5
                                ? 'text-yellow-400 fill-yellow-400' 
                                : 'text-neutral-300'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-neutral-700">
                        This product exceeded my expectations! The build quality is exceptional and it works perfectly. Customer service was also very helpful when I had questions. Highly recommend!
                      </p>
                    </div>
                    
                    {/* See more reviews button */}
                    <div className="text-center mt-8">
                      <button className="btn-secondary">See All Reviews</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Related products */}
        <div className="mt-12">
          <h2 className="section-title">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            {featuredProducts
              .filter(p => p.id !== product.id)
              .slice(0, 4)
              .map(relatedProduct => (
                <Link key={relatedProduct.id} to={`/products/${relatedProduct.id}`}>
                  <div className="product-card">
                    <div className="relative overflow-hidden aspect-square">
                      <img 
                        src={relatedProduct.imageUrl} 
                        alt={relatedProduct.name} 
                        className="w-full h-full object-cover"
                      />
                      {relatedProduct.isOnSale && (
                        <div className="absolute top-2 left-2 bg-accent-500 text-white px-2 py-1 text-xs rounded">
                          SALE
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-neutral-800 truncate">{relatedProduct.name}</h3>
                      <div className="flex mt-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <FiStar
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(relatedProduct.rating) 
                                ? 'text-yellow-400 fill-yellow-400' 
                                : 'text-neutral-300'
                            }`}
                          />
                        ))}
                      </div>
                      <div className="mt-2">
                        {relatedProduct.discountedPrice ? (
                          <div className="flex items-center">
                            <span className="font-bold text-neutral-800">${relatedProduct.discountedPrice}</span>
                            <span className="ml-2 text-sm text-neutral-500 line-through">${relatedProduct.price}</span>
                          </div>
                        ) : (
                          <span className="font-bold text-neutral-800">${relatedProduct.price}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage