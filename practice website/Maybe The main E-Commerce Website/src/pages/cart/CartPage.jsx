import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Trash2,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  CreditCard
} from 'lucide-react';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';
import Button from '../../components/ui/Button';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, setCart } = useContext(CartContext);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);
  const imageUrl = import.meta.env.VITE_IMAGE_URL || 'http://localhost:3000/image';

  const handleQuantityChange = (productId, newQuantity) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.productId._id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
    updateQuantity(productId, newQuantity);
  };

  const handleRemove = (productId) => {
    removeFromCart(productId);
  };

  const handleCouponSubmit = (e) => {
    e.preventDefault();

    // Simple coupon code validation
    if (couponCode.toUpperCase() === 'SAVE10') {
      setCouponDiscount(10);
      setCouponError('');
    } else if (couponCode.toUpperCase() === 'WELCOME20') {
      setCouponDiscount(20);
      setCouponError('');
    } else {
      setCouponDiscount(0);
      setCouponError('Invalid coupon code');
    }
  };

  const proceedToCheckout = () => {
    if (currentUser) {
      navigate('/checkout');
    } else {
      navigate('/login', { state: { from: '/checkout' } });
    }
  };

  // Calculate totals
  const subtotal = getCartTotal();
  const shipping = subtotal > 100 ? 0 : 10;
  const discountAmount = subtotal * (couponDiscount / 100);
  const total = subtotal + shipping - discountAmount;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-10 text-gray-800">Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
            <div className="flex justify-center mb-6">
              <ShoppingBag size={64} className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">
              Looks like you haven't added any products yet.
            </p>
            <Link
              to="/products"
              className="inline-block bg-blue-900 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-full transition-all duration-200"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b text-gray-500 text-sm font-medium">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-center">Total</div>
                </div>

                {cart.map((item) => {
                  const itemPrice = item?.productId?.price || 0;

                  return (
                    <div key={item._id} className="py-4 border-b border-gray-100">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                        <div className="col-span-6 flex items-center">
                          <Link to={`/product/${item.productId._id}`} className="mr-4">
                            <img
                              src={item.productId?.image ? `${imageUrl}/${item.productId.image}` : '/fallback.png'}
                              alt={item.productId?.title || 'Product'}
                              className="w-20 h-20 object-cover rounded-lg shadow"
                            />
                          </Link>
                          <div>
                            <Link
                              to={`/product/${item.productId._id}`}
                              className="text-gray-900 font-semibold hover:text-blue-700 block"
                            >
                              {item.productId.title}
                            </Link>
                            {item.discount > 0 && (
                              <span className="inline-block mt-1 bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full">
                                {item.discount}% OFF
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="md:col-span-2 text-center font-medium text-gray-800">
                          {item.discount > 0 ? (
                            <div className="flex flex-col md:items-center">
                              <span className="text-sm text-red-600">${itemPrice.toFixed(2)}</span>
                              <span className="text-xs line-through text-gray-400">${itemPrice.toFixed(2)}</span>
                            </div>
                          ) : (
                            <span>${itemPrice.toFixed(2)}</span>
                          )}
                        </div>

                        <div className="md:col-span-2 flex items-center justify-center">
                          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                            <button
                              onClick={() => handleQuantityChange(item.productId._id, Math.max(1, item.quantity - 1))}
                              className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                            >
                              -
                            </button>
                            <span className="px-4 py-1 text-gray-800">{item.quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(item.productId._id, item.quantity + 1)}
                              className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="md:col-span-2 flex items-center justify-between md:justify-center">
                          <span className="font-semibold text-gray-800">${(itemPrice * item.quantity).toFixed(2)}</span>
                          <button
                            onClick={() => handleRemove(item._id)}
                            className="ml-4 p-1 text-gray-400 hover:text-red-600"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <Link
                to="/products"
                className="text-blue-700 hover:text-blue-900 font-medium flex items-center"
              >
                <ArrowRight size={16} className="mr-2 rotate-180" />
                Continue Shopping
              </Link>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Order Summary</h2>
                <div className="space-y-4 text-gray-700 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="font-medium">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({couponDiscount}%)</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between text-lg font-bold text-gray-900">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleCouponSubmit} className="mb-6">
                  <label htmlFor="coupon" className="block text-sm font-medium text-gray-600 mb-1">
                    Coupon Code
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      id="coupon"
                      className="w-full px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring focus:ring-blue-300"
                      placeholder="Enter coupon"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <Button type="submit" variant="primary" className="rounded-l-none">Apply</Button>
                  </div>
                  {couponError && <p className="text-sm text-red-600 mt-1">{couponError}</p>}
                  {couponDiscount > 0 && <p className="text-sm text-green-600 mt-1">Coupon applied!</p>}
                </form>

                <Button onClick={proceedToCheckout} variant="primary" fullWidth className="py-3">
                  Proceed to Checkout
                </Button>

                <div className="mt-6 pt-4 border-t border-gray-200 text-sm text-gray-600">
                  <div className="flex items-center justify-between mb-3">
                    <CreditCard size={24} />
                    <span>Secure Payments</span>
                  </div>
                  <div className="flex items-start mb-1">
                    <ShieldCheck size={16} className="text-green-600 mr-2" />
                    <span>Secure transactions</span>
                  </div>
                  <div className="flex items-start">
                    <RefreshCw size={16} className="text-green-600 mr-2" />
                    <span>30-day returns</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>

  );
};

export default CartPage;