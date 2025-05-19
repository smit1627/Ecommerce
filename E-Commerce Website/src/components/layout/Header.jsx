import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import PropTypes from 'prop-types'
import {
  FiSearch,
  FiShoppingCart,
  FiUser,
  FiHeart,
  FiMenu,
  FiX
} from 'react-icons/fi'
import UserDropdown from '../home/UserDropdown'

const Header = ({ isScrolled, toggleMobileMenu, isMobileMenuOpen }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [cartCount, setCartCount] = useState(3)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    // This would normally fetch cart data
    // For demonstration purposes, we're using a static count
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`)
      setSearchQuery('')
      setIsSearchOpen(false)
    }
  }

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
  }

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-white py-4'
        }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold text-primary-600"
            >
              ShopWorld
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="font-medium text-neutral-700 hover:text-primary-600 transition-colors">
              Home
            </Link>
            <Link to="/products" className="font-medium text-neutral-700 hover:text-primary-600 transition-colors">
              Products
            </Link>
            <Link to="/products?category=electronics" className="font-medium text-neutral-700 hover:text-primary-600 transition-colors">
              Electronics
            </Link>
            <Link to="/products?category=fashion" className="font-medium text-neutral-700 hover:text-primary-600 transition-colors">
              Fashion
            </Link>
            <Link to="/products?category=home" className="font-medium text-neutral-700 hover:text-primary-600 transition-colors">
              Home & Living
            </Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            {/* Search Icon/Form */}
            <div className="relative">
              <button
                onClick={toggleSearch}
                className="p-2 text-neutral-700 hover:text-primary-600 transition-colors"
                aria-label="Search"
              >
                {isSearchOpen ? <FiX size={20} /> : <FiSearch size={20} />}
              </button>

              <AnimatePresence>
                {isSearchOpen && (
                  <motion.form
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute right-0 top-full mt-2 bg-white rounded-md shadow-lg z-10"
                    onSubmit={handleSearch}
                  >
                    <div className="flex items-center border border-neutral-300 rounded-md overflow-hidden">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search products..."
                        className="px-4 py-2 w-64 focus:outline-none"
                      />
                      <button
                        type="submit"
                        className="bg-primary-600 text-white p-2 transition-colors hover:bg-primary-700"
                        aria-label="Search"
                      >
                        <FiSearch size={20} />
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            <Link to="/wishlist" className="hidden sm:block p-2 text-neutral-700 hover:text-primary-600 transition-colors">
              <FiHeart size={20} />
            </Link>

            <Link to="/cart" className="relative p-2 text-neutral-700 hover:text-primary-600 transition-colors">
              <FiShoppingCart size={20} />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-accent-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
                >
                  {cartCount}
                </motion.span>
              )}
            </Link>

            <UserDropdown />

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 text-neutral-700 hover:text-primary-600 transition-colors"
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

Header.propTypes = {
  isScrolled: PropTypes.bool.isRequired,
  toggleMobileMenu: PropTypes.func.isRequired,
  isMobileMenuOpen: PropTypes.bool.isRequired
}

export default Header