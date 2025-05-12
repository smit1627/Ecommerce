import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import { FiHeart, FiShoppingCart, FiEye } from 'react-icons/fi'

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  
  const {
    id,
    name,
    price,
    discountedPrice,
    rating,
    imageUrl,
    isNew,
    isOnSale,
    discount
  } = product

  const handleLikeToggle = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsLiked(!isLiked)
  }
  
  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('Product added to cart:', name)
    // This would normally add the product to cart
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  }

  return (
    <motion.div 
      className="product-card"
      variants={itemVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/products/${id}`} className="block">
        <div className="relative overflow-hidden aspect-square">
          {/* Product image */}
          <img 
            src={imageUrl} 
            alt={name} 
            className="w-full h-full object-cover transition-transform duration-500"
            style={{ transform: isHovered ? 'scale(1.1)' : 'scale(1)' }}
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {isNew && (
              <span className="bg-primary-600 text-white px-2 py-1 text-xs font-medium rounded">
                NEW
              </span>
            )}
            {isOnSale && (
              <span className="bg-accent-500 text-white px-2 py-1 text-xs font-medium rounded">
                SALE {discount}% OFF
              </span>
            )}
          </div>
          
          {/* Quick actions */}
          <div 
            className="absolute right-3 top-3 flex flex-col gap-2"
          >
            <motion.button
              className={`w-9 h-9 rounded-full flex items-center justify-center ${
                isLiked 
                  ? 'bg-accent-500 text-white' 
                  : 'bg-white text-neutral-700 hover:bg-neutral-100'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleLikeToggle}
              aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
            >
              <FiHeart className={isLiked ? 'fill-current' : ''} />
            </motion.button>
          </div>
          
          {/* Hover actions */}
          <motion.div 
            className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm py-3 px-4 flex justify-between items-center"
            initial={{ y: 100, opacity: 0 }}
            animate={{ 
              y: isHovered ? 0 : 100, 
              opacity: isHovered ? 1 : 0 
            }}
            transition={{ duration: 0.3 }}
          >
            <button 
              className="text-primary-600 hover:text-primary-700 transition-colors"
              onClick={handleAddToCart}
              aria-label="Add to cart"
            >
              <FiShoppingCart size={20} />
            </button>
            <Link 
              to={`/products/${id}`} 
              className="text-neutral-700 hover:text-neutral-900 transition-colors"
              aria-label="Quick view"
            >
              <FiEye size={20} />
            </Link>
          </motion.div>
        </div>
        
        {/* Product info */}
        <div className="p-4">
          <h3 className="font-medium text-neutral-800 text-lg line-clamp-1">{name}</h3>
          <div className="flex items-center mt-1 mb-2">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < rating 
                      ? 'text-yellow-400 fill-yellow-400' 
                      : 'text-neutral-300'
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-neutral-500 ml-1">({product.reviewCount})</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {discountedPrice ? (
                <>
                  <span className="font-bold text-neutral-800">${discountedPrice}</span>
                  <span className="ml-2 text-sm text-neutral-500 line-through">${price}</span>
                </>
              ) : (
                <span className="font-bold text-neutral-800">${price}</span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    discountedPrice: PropTypes.number,
    rating: PropTypes.number.isRequired,
    reviewCount: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
    isNew: PropTypes.bool,
    isOnSale: PropTypes.bool,
    discount: PropTypes.number,
    tags: PropTypes.arrayOf(PropTypes.string)
  }).isRequired
}

export default ProductCard