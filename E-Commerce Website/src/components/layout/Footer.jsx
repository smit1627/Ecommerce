import { Link } from 'react-router-dom'
import { FiMail, FiPhone, FiMapPin, FiFacebook, FiTwitter, FiInstagram, FiYoutube } from 'react-icons/fi'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-neutral-800 text-white pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">ShopWorld</h3>
            <p className="text-neutral-300 mb-4">
              Your one-stop destination for all your shopping needs. Quality products, competitive prices, and exceptional service.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-neutral-300 hover:text-white transition-colors" aria-label="Facebook">
                <FiFacebook size={20} />
              </a>
              <a href="https://twitter.com" className="text-neutral-300 hover:text-white transition-colors" aria-label="Twitter">
                <FiTwitter size={20} />
              </a>
              <a href="https://instagram.com" className="text-neutral-300 hover:text-white transition-colors" aria-label="Instagram">
                <FiInstagram size={20} />
              </a>
              <a href="https://youtube.com" className="text-neutral-300 hover:text-white transition-colors" aria-label="YouTube">
                <FiYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-neutral-300 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/products" className="text-neutral-300 hover:text-white transition-colors">All Products</Link>
              </li>
              <li>
                <Link to="/cart" className="text-neutral-300 hover:text-white transition-colors">Shopping Cart</Link>
              </li>
              <li>
                <Link to="/login" className="text-neutral-300 hover:text-white transition-colors">Account</Link>
              </li>
              <li>
                <Link to="/about" className="text-neutral-300 hover:text-white transition-colors">About Us</Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-xl font-bold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-neutral-300 hover:text-white transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link to="/faq" className="text-neutral-300 hover:text-white transition-colors">FAQs</Link>
              </li>
              <li>
                <Link to="/shipping" className="text-neutral-300 hover:text-white transition-colors">Shipping & Returns</Link>
              </li>
              <li>
                <Link to="/terms" className="text-neutral-300 hover:text-white transition-colors">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-neutral-300 hover:text-white transition-colors">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FiMapPin className="mt-1 mr-3 text-neutral-300" />
                <span className="text-neutral-300">123 Commerce St, Shopping City, SC 12345</span>
              </li>
              <li className="flex items-center">
                <FiPhone className="mr-3 text-neutral-300" />
                <span className="text-neutral-300">(123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <FiMail className="mr-3 text-neutral-300" />
                <span className="text-neutral-300">support@shopworld.com</span>
              </li>
            </ul>
            <div className="mt-4">
              <h4 className="font-bold mb-2">Newsletter</h4>
              <form className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-3 py-2 bg-neutral-700 text-white rounded-l-md focus:outline-none w-full"
                />
                <button 
                  type="submit" 
                  className="bg-primary-600 hover:bg-primary-700 px-4 py-2 rounded-r-md transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="border-t border-neutral-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-400 text-sm mb-4 md:mb-0">
              &copy; {currentYear} ShopWorld. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <img src="https://via.placeholder.com/40x25" alt="Visa" className="h-6" />
              <img src="https://via.placeholder.com/40x25" alt="Mastercard" className="h-6" />
              <img src="https://via.placeholder.com/40x25" alt="American Express" className="h-6" />
              <img src="https://via.placeholder.com/40x25" alt="PayPal" className="h-6" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer