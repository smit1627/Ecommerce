import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import { FiHeart, FiShoppingCart, FiEye } from 'react-icons/fi'
import axios from 'axios'

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const imageUrl = import.meta.env.VITE_IMAGE_URL || ''
  const apiUrl = import.meta.env.VITE_API_URL || ''
  // const tokenData = JSON.parse(sessionStorage.getItem("currentUser"))
  // const token = tokenData.token

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MmFiMzY0MTgwZThhYjk0YmU0MGZhNSIsImVtYWlsIjoidXNlckBnbWFpbC5jb20iLCJpYXQiOjE3NDc2Mjg5MjEsImV4cCI6MTc0NzYzMjUyMX0.YV0mN1cQqPYhqAXMrZRifdHIznqB4NJZPddzDinfSpk"


  // Safety checks for missing properties
  const {
    _id,
    title,
    price,
    description,
    image,
    category
  } = product

  // Set default values for optional properties
  const discountedPrice = product.discountedPrice || null
  const rating = product.rating || 4 // Default rating
  const reviewCount = product.reviewCount || 0
  const isNew = product.isNew || false
  const isOnSale = product.isOnSale || false
  const discount = product.discount || 0

  const handleLikeToggle = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsLiked(!isLiked)
  }

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Product added to cart:', { title, _id });
    const cartProduct = {
      productId: _id,
      quantity: 1
    } // Log both title and ID for debugging
    try {
      const response = await axios.post(
        `${apiUrl}/addToCart`,
        cartProduct,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Add to cart response:', response.data);
      // Optionally, show a success message to the user
    } catch (error) {
      console.error('Error adding product to cart:', error);
      // Optionally, show an error message to the user
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  }

  // Format price to always show 2 decimal places
  const formatPrice = (value) => {
    return Number(value).toFixed(2)
  }

  return (
    <motion.div
      className="product-card rounded-lg shadow-sm bg-white overflow-hidden border border-neutral-200"
      variants={itemVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/products/${_id}`} className="block">
        <div className="relative overflow-hidden aspect-square">
          {/* Product image with fallback */}
          {image ? (
            <img
              src={`${imageUrl}/${image}`}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500"
              style={{ transform: isHovered ? 'scale(1.1)' : 'scale(1)' }}
              onError={(e) => {
                e.target.onerror = null
                e.target.src = '/placeholder-product.jpg' // Fallback image path
              }}
            />
          ) : (
            <div className="w-full h-full bg-neutral-200 flex items-center justify-center text-neutral-400">
              No Image
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {isNew && (
              <span className="bg-primary-600 text-white px-2 py-1 text-xs font-medium rounded">
                NEW
              </span>
            )}
            {isOnSale && discount > 0 && (
              <span className="bg-accent-500 text-white px-2 py-1 text-xs font-medium rounded">
                SALE {discount}% OFF
              </span>
            )}
            {category && (
              <span className="bg-neutral-700 text-white px-2 py-1 text-xs font-medium rounded">
                {category.toUpperCase()}
              </span>
            )}
          </div>

          {/* Quick actions */}
          <div className="absolute right-3 top-3 flex flex-col gap-2">
            <motion.button
              className={`w-9 h-9 rounded-full flex items-center justify-center ${isLiked
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
              to={`/products/${_id}`}
              className="text-neutral-700 hover:text-neutral-900 transition-colors"
              aria-label="Quick view"
            >
              <FiEye size={20} />
            </Link>
          </motion.div>
        </div>

        {/* Product info */}
        <div className="p-4">
          <h3 className="font-medium text-neutral-800 text-lg line-clamp-1">{title}</h3>

          {/* Description */}
          {description && (
            <p className="text-neutral-600 text-sm mt-1 line-clamp-2">{description}</p>
          )}

          {/* Rating - only show if defined */}
          <div className="flex items-center mt-2 mb-2">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < rating
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
            <span className="text-xs text-neutral-500 ml-1">({reviewCount})</span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {discountedPrice ? (
                <>
                  <span className="font-bold text-neutral-800">${formatPrice(discountedPrice)}</span>
                  <span className="ml-2 text-sm text-neutral-500 line-through">${formatPrice(price)}</span>
                </>
              ) : (
                <span className="font-bold text-neutral-800">${formatPrice(price)}</span>
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
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string,
    image: PropTypes.string,
    category: PropTypes.string,
    discountedPrice: PropTypes.number,
    rating: PropTypes.number,
    reviewCount: PropTypes.number,
    isNew: PropTypes.bool,
    isOnSale: PropTypes.bool,
    discount: PropTypes.number
  }).isRequired
}

export default ProductCard