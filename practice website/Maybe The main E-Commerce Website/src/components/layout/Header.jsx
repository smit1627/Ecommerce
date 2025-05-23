import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const { currentUser, logout } = useContext(AuthContext);
  const { getCartCount } = useContext(CartContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const menuRef = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${searchTerm}`);
      setSearchTerm('');
      setIsMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const headerClasses = `fixed top-0 w-full z-50 bg-white backdrop-blur-sm bg-opacity-90 transition-all duration-300 shadow-sm ${isScrolled ? 'py-2 shadow-md' : 'py-4'
    }`;

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">

        {/* Logout Confirmation Modal */}
        {showLogoutConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 animate-fadeIn">
            <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6 animate-slideDown">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Confirm Logout</h2>
              <p className="text-gray-600 mb-6">Are you sure you want to log out?</p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="px-5 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    handleLogout();
                    setShowLogoutConfirm(false);
                  }}
                  className="px-5 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Logo */}
        <Link to="/" className="flex items-center text-2xl font-extrabold text-blue-900 hover:text-blue-800 transition">
          <ShoppingCart size={28} className="mr-2" />
          ShopHub
        </Link>

        {/* Search Bar (desktop) */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex flex-grow max-w-lg relative"
          aria-label="Search products"
        >
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-full border border-gray-300 pl-5 pr-12 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600 transition"
            aria-label="Submit search"
          >
            <Search size={20} />
          </button>
        </form>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 font-medium text-gray-700">
          <Link
            to="/products"
            className="hover:text-blue-700 transition"
          >
            Products
          </Link>

          <Link
            to="/cart"
            className="relative hover:text-blue-700 transition flex items-center"
            aria-label={`Cart with ${getCartCount()} items`}
          >
            <ShoppingCart size={22} />
            {getCartCount() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold shadow-md">
                {getCartCount()}
              </span>
            )}
          </Link>

          {currentUser ? (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-700 transition font-semibold"
                aria-haspopup="true"
                aria-expanded={menuOpen}
              >
                <User size={22} />
                <span>{currentUser.name?.split(' ')[0] || 'Account'}</span>
                <svg
                  className={`w-4 h-4 ml-1 transition-transform ${menuOpen ? 'rotate-180' : 'rotate-0'}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-20 animate-fadeIn">
                  {/* <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100 transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    Profile
                  </Link> */}
                  <button
                    onClick={() => setShowLogoutConfirm(true)}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center space-x-1 text-gray-700 hover:text-blue-700 transition font-semibold"
            >
              <User size={22} />
              <span>Login</span>
            </Link>
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle mobile menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md rounded-b-lg px-6 py-4 mt-2 animate-slideDown">
          <form onSubmit={handleSearch} className="mb-4" aria-label="Search products">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-full border border-gray-300 pl-5 pr-12 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600 transition"
                aria-label="Submit search"
              >
                <Search size={20} />
              </button>
            </div>
          </form>

          <nav className="flex flex-col space-y-3 font-medium text-gray-700">
            <Link
              to="/products"
              className="hover:text-blue-700 transition py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>

            <Link
              to="/cart"
              className="hover:text-blue-700 transition flex items-center py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <ShoppingCart size={20} className="mr-2" />
              <span>Cart ({getCartCount()})</span>
            </Link>

            {currentUser ? (
              <>
                <Link
                  to="/profile"
                  className="hover:text-blue-700 transition py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="text-left hover:text-blue-700 transition py-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="hover:text-blue-700 transition py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Login / Register
              </Link>
            )}
          </nav>
        </div>
      )}

      {/* Animations styles */}
      <style>
        {`
          @keyframes fadeIn {
            from {opacity: 0;}
            to {opacity: 1;}
          }
          .animate-fadeIn {
            animation: fadeIn 0.25s ease forwards;
          }
          @keyframes slideDown {
            from {opacity: 0; transform: translateY(-10px);}
            to {opacity: 1; transform: translateY(0);}
          }
          .animate-slideDown {
            animation: slideDown 0.3s ease forwards;
          }
        `}
      </style>
    </header>
  );
};

export default Header;