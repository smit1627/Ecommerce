import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import PropTypes from 'prop-types'
import { FiX, FiHome, FiShoppingBag, FiSmartphone, FiHeart, FiUser, FiHelpCircle } from 'react-icons/fi'

const MobileMenu = ({ isOpen, onClose }) => {
  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  const menuVariants = {
    closed: {
      x: '-100%',
      transition: {
        type: 'tween',
        duration: 0.3,
      }
    },
    open: {
      x: 0,
      transition: {
        type: 'tween',
        duration: 0.3,
      }
    }
  }

  const backdropVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.3
      }
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  }

  const menuItemVariants = {
    closed: { x: -20, opacity: 0 },
    open: i => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.4
      }
    })
  }

  const menuItems = [
    { icon: <FiHome size={20} />, text: 'Home', link: '/' },
    { icon: <FiShoppingBag size={20} />, text: 'All Products', link: '/products' },
    { icon: <FiSmartphone size={20} />, text: 'Electronics', link: '/products?category=electronics' },
    { icon: <FiShoppingBag size={20} />, text: 'Fashion', link: '/products?category=fashion' },
    { icon: <FiHeart size={20} />, text: 'Wishlist', link: '/wishlist' },
    { icon: <FiUser size={20} />, text: 'Account', link: '/login' },
    { icon: <FiHelpCircle size={20} />, text: 'Help & Support', link: '/contact' },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            variants={backdropVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={onClose}
          />
          
          {/* Menu */}
          <motion.div 
            className="fixed top-0 left-0 h-full w-[280px] bg-white z-50 shadow-xl flex flex-col"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-bold text-primary-600">ShopWorld</h2>
              <button 
                onClick={onClose}
                className="p-2 rounded-full hover:bg-neutral-100 transition-colors"
              >
                <FiX size={24} />
              </button>
            </div>
            
            <nav className="flex-1 overflow-y-auto py-4">
              <ul className="space-y-1">
                {menuItems.map((item, index) => (
                  <motion.li 
                    key={index}
                    custom={index}
                    variants={menuItemVariants}
                    initial="closed"
                    animate="open"
                  >
                    <Link 
                      to={item.link} 
                      className="flex items-center px-4 py-3 hover:bg-neutral-100 transition-colors"
                      onClick={onClose}
                    >
                      <span className="mr-3 text-neutral-600">{item.icon}</span>
                      <span className="font-medium">{item.text}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
            
            <div className="p-4 border-t">
              <Link 
                to="/login" 
                className="btn-primary w-full flex justify-center items-center"
                onClick={onClose}
              >
                Sign In / Register
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

MobileMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default MobileMenu