import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiTrash2, FiPlus, FiMinus, FiChevronRight, FiShield, FiCreditCard, FiTruck, FiRefreshCw } from 'react-icons/fi'
import axios from 'axios'

const CartPage = () => {
  const [cartItems, setCartItems] = useState([])
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  const [promoDiscount, setPromoDiscount] = useState(0)
  const [fadeId, setFadeId] = useState(null)
  const [loading, setLoading] = useState(true)

  const apiUrl = import.meta.env.VITE_API_URL
  const imageUrl = import.meta.env.VITE_IMAGE_URL
  const token = JSON.parse(sessionStorage.getItem("currentUser"))?.token

  useEffect(() => {
    // Set page title
    document.title = 'Your Cart - ShopWorld'
    // Scroll to top
    window.scrollTo(0, 0)
  }, [])

  const fetchCartData = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${apiUrl}/getCart`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log("Cart data response:", response.data.items)
      setCartItems(response.data.items || [])
    } catch (error) {
      console.error("Error fetching cart data:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token) {
      fetchCartData()
    }
  }, [token])

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return
    console.log(`Updating quantity for ${productId} to ${newQuantity}`)

    try {
      // Optimistic UI update
      setCartItems(items =>
        items.map(item =>
          item.productId._id === productId ? { ...item, quantity: newQuantity } : item
        )
      )

      // Call existing addToCart endpoint
      await axios.post(`${apiUrl}/addToCart`, {
        productId,
        quantity: newQuantity
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    } catch (error) {
      console.error("Error updating quantity:", error)
      fetchCartData()
    }
  }

  const removeItem = async (id) => {
    setFadeId(id)

    try {
      // Wait for animation to complete
      setTimeout(async () => {
        // Remove from server (you may need to adjust this endpoint)
        await axios.delete(`${apiUrl}/deletedProduct/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        // Update local state
        setCartItems(items => items.filter(item => item._id !== id))
        setFadeId(null)
      }, 300)
    } catch (error) {
      console.error("Error removing item:", error)
      setFadeId(null)
      fetchCartData()
    }
  }

  const applyPromoCode = (e) => {
    e.preventDefault()

    // Simple promo code validation for demo
    if (promoCode.toLowerCase() === 'discount20') {
      setPromoApplied(true)
      setPromoDiscount(20)
    } else {
      alert('Invalid promo code')
    }
  }

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => {
    // Check if productId exists and has price
    const price = item.productId?.price || 0
    return sum + (price * item.quantity)
  }, 0)

  const shipping = subtotal > 100 ? 0 : 10
  const discount = promoApplied ? (subtotal * (promoDiscount / 100)) : 0
  const total = subtotal + shipping - discount

  // Check if cart is empty
  const isCartEmpty = cartItems.length === 0

  if (loading) {
    return (
      <div className="py-8">
        <div className="container-custom">
          <h1 className="text-3xl font-bold text-neutral-800 mb-8">Your Shopping Cart</h1>
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <p className="text-neutral-600">Loading your cart...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-8">
      <div className="container-custom">
        <h1 className="text-3xl font-bold text-neutral-800 mb-8">Your Shopping Cart</h1>

        {isCartEmpty ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <img
              src="https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg"
              alt="Empty Cart"
              className="w-64 h-64 object-contain mx-auto mb-6"
            />
            <h2 className="text-2xl font-bold text-neutral-800 mb-4">Your cart is empty</h2>
            <p className="text-neutral-600 mb-8">
              Looks like you haven't added anything to your cart yet. Browse our products and find something you'll love!
            </p>
            <Link to="/products" className="btn-primary px-8 py-3">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6 border-b border-neutral-200">
                  <h2 className="text-xl font-bold text-neutral-800">Cart Items ({cartItems.length})</h2>
                </div>

                <div className="divide-y divide-neutral-200">
                  {cartItems.map((item) => {
                    // Ensure productId exists before rendering
                    if (!item.productId) {
                      return null
                    }

                    return (
                      <motion.div
                        key={item._id}
                        className="p-6 flex flex-col sm:flex-row items-center"
                        animate={{
                          opacity: fadeId === item._id ? 0 : 1,
                          height: fadeId === item._id ? 0 : 'auto',
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Product image */}
                        <div className="w-full sm:w-24 h-24 bg-neutral-100 rounded-md overflow-hidden mb-4 sm:mb-0">
                          <img
                            src={`${imageUrl}/${item.productId.image}`}
                            alt={item.productId.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Product info */}
                        <div className="flex-1 sm:ml-6 flex flex-col sm:flex-row sm:items-center justify-between">
                          <div className="mb-4 sm:mb-0">
                            <h3 className="text-lg font-medium text-neutral-800 mb-1">{item.productId.title}</h3>
                            <p className="text-neutral-600 text-sm">Unit Price: ${item.productId.price.toFixed(2)}</p>
                          </div>

                          <div className="flex items-center">
                            {/* Quantity controls */}
                            <div className="flex items-center mr-6">
                              <button
                                className="p-1 rounded-full hover:bg-neutral-100 transition-colors"
                                onClick={() => updateQuantity(item.productId._id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                <FiMinus className="text-neutral-600" />
                              </button>
                              <span className="w-10 text-center font-medium">{item.quantity}</span>
                              <button
                                className="p-1 rounded-full hover:bg-neutral-100 transition-colors"
                                onClick={() => updateQuantity(item.productId._id, item.quantity + 1)}
                              >
                                <FiPlus className="text-neutral-600" />
                              </button>
                            </div>

                            {/* Item total & remove button */}
                            <div className="flex flex-col items-end">
                              <span className="font-bold text-neutral-800 mb-1">
                                ${(item.productId.price * item.quantity).toFixed(2)}
                              </span>
                              <button
                                className="text-neutral-500 hover:text-accent-600 transition-colors flex items-center text-sm"
                                onClick={() => removeItem(item._id)}
                              >
                                <FiTrash2 className="mr-1" />
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>

                <div className="p-6 bg-neutral-50 flex justify-between items-center">
                  <Link to="/products" className="text-primary-600 hover:text-primary-700 transition-colors font-medium flex items-center">
                    <FiChevronRight className="mr-1 rotate-180" />
                    Continue Shopping
                  </Link>
                  <button
                    className="btn-primary"
                    onClick={fetchCartData}
                  >
                    Update Cart
                  </button>
                </div>
              </div>
            </div>

            {/* Order summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden sticky top-28">
                <div className="p-6 border-b border-neutral-200">
                  <h2 className="text-xl font-bold text-neutral-800">Order Summary</h2>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-neutral-600">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>

                  {promoApplied && (
                    <div className="flex justify-between text-accent-600">
                      <span>Discount ({promoDiscount}%)</span>
                      <span className="font-medium">-${discount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="border-t border-neutral-200 pt-4 mt-4">
                    <div className="flex justify-between text-lg">
                      <span className="font-bold text-neutral-800">Total</span>
                      <span className="font-bold text-neutral-800">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Promo code form */}
                  <form className="mt-6" onSubmit={applyPromoCode}>
                    <label htmlFor="promo-code" className="block text-sm font-medium text-neutral-700 mb-2">
                      Add Promo Code
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        id="promo-code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Enter code"
                        className="flex-1 px-4 py-2 border border-neutral-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        disabled={promoApplied}
                      />
                      <button
                        type="submit"
                        className={`px-4 py-2 rounded-r-md ${promoApplied
                          ? 'bg-neutral-400 cursor-not-allowed'
                          : 'bg-neutral-800 hover:bg-neutral-700'
                          } text-white transition-colors`}
                        disabled={promoApplied || !promoCode}
                      >
                        Apply
                      </button>
                    </div>
                    {promoApplied && (
                      <p className="text-green-600 text-sm mt-1">
                        Promo code applied successfully!
                      </p>
                    )}
                  </form>

                  {/* Checkout button */}
                  <button className="btn-primary w-full py-3 mt-6">
                    Proceed to Checkout
                  </button>

                  {/* Trust badges */}
                  <div className="flex justify-between items-center mt-6 text-sm text-neutral-500">
                    <div className="flex items-center">
                      <FiShield className="mr-1" />
                      <span>Secure Checkout</span>
                    </div>
                    <div className="flex items-center">
                      <FiCreditCard className="mr-1" />
                      <span>Various Payment Methods</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Additional information */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
            <FiTruck className="text-primary-600 text-3xl mb-4" />
            <h3 className="font-bold text-lg mb-2">Free Shipping</h3>
            <p className="text-neutral-600">
              Enjoy free shipping on all orders over $100
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
            <FiRefreshCw className="text-primary-600 text-3xl mb-4" />
            <h3 className="font-bold text-lg mb-2">Easy Returns</h3>
            <p className="text-neutral-600">
              30-day hassle-free return policy
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
            <FiShield className="text-primary-600 text-3xl mb-4" />
            <h3 className="font-bold text-lg mb-2">Secure Payments</h3>
            <p className="text-neutral-600">
              Your payment information is always secure
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage