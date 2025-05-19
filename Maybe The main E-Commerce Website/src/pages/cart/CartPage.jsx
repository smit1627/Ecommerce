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
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useContext(CartContext);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);
  
  const handleQuantityChange = (productId, newQuantity) => {
    updateQuantity(productId, parseInt(newQuantity));
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
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
        
        {cart.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="flex justify-center mb-4">
              <ShoppingBag size={64} className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link 
              to="/products"
              className="inline-block bg-blue-900 hover:bg-blue-800 text-white font-medium px-6 py-3 rounded-lg transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="hidden md:grid grid-cols-12 gap-4 mb-4 text-sm font-medium text-gray-600">
                    <div className="col-span-6">Product</div>
                    <div className="col-span-2 text-center">Price</div>
                    <div className="col-span-2 text-center">Quantity</div>
                    <div className="col-span-2 text-center">Total</div>
                  </div>
                  
                  {/* Cart Item List */}
                  {cart.map((item) => {
                    // Calculate discounted price
                    const itemPrice = item.discount 
                      ? item.price - (item.price * item.discount / 100) 
                      : item.price;
                    
                    return (
                      <div key={item.id} className="py-4 border-t border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                          {/* Product Image & Info */}
                          <div className="col-span-6 flex items-center">
                            <Link to={`/product/${item.id}`} className="mr-4">
                              <img 
                                src={item.image} 
                                alt={item.title} 
                                className="w-16 h-16 object-cover rounded-md"
                              />
                            </Link>
                            <div>
                              <Link 
                                to={`/product/${item.id}`} 
                                className="font-medium text-gray-900 hover:text-blue-700 mb-1 block"
                              >
                                {item.title}
                              </Link>
                              {item.discount > 0 && (
                                <span className="inline-block bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-full">
                                  {item.discount}% OFF
                                </span>
                              )}
                            </div>
                          </div>
                          
                          {/* Price */}
                          <div className="md:col-span-2 text-center flex md:block items-center justify-between">
                            <span className="md:hidden font-medium">Price:</span>
                            {item.discount > 0 ? (
                              <div className="flex md:justify-center items-center">
                                <span className="font-medium">${itemPrice.toFixed(2)}</span>
                                <span className="text-gray-500 line-through text-sm ml-2">${item.price.toFixed(2)}</span>
                              </div>
                            ) : (
                              <span className="font-medium">${itemPrice.toFixed(2)}</span>
                            )}
                          </div>
                          
                          {/* Quantity */}
                          <div className="md:col-span-2 flex items-center justify-between md:justify-center">
                            <span className="md:hidden font-medium">Quantity:</span>
                            <select
                              value={item.quantity}
                              onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                              className="border border-gray-300 rounded-md p-1"
                            >
                              {[...Array(10)].map((_, i) => (
                                <option key={i + 1} value={i + 1}>
                                  {i + 1}
                                </option>
                              ))}
                            </select>
                          </div>
                          
                          {/* Total & Remove */}
                          <div className="md:col-span-2 flex items-center justify-between md:justify-center">
                            <span className="md:hidden font-medium">Total:</span>
                            <div className="flex items-center">
                              <span className="font-medium mr-4">
                                ${(itemPrice * item.quantity).toFixed(2)}
                              </span>
                              <button
                                onClick={() => handleRemove(item.id)}
                                className="text-gray-400 hover:text-red-600 transition-colors"
                                aria-label="Remove item"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Continue Shopping */}
              <div className="mt-4">
                <Link 
                  to="/products"
                  className="text-blue-700 hover:text-blue-900 flex items-center font-medium"
                >
                  <ArrowRight size={16} className="mr-2 transform rotate-180" />
                  Continue Shopping
                </Link>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">
                        {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    
                    {couponDiscount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount ({couponDiscount}%)</span>
                        <span>-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}
                    
                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Coupon Code */}
                  <form onSubmit={handleCouponSubmit} className="mb-6">
                    <label htmlFor="coupon" className="block text-sm font-medium text-gray-700 mb-2">
                      Apply Coupon Code
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        id="coupon"
                        placeholder="Enter coupon code"
                        className="flex-grow px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                      />
                      <Button
                        type="submit"
                        variant="primary"
                        className="rounded-l-none"
                      >
                        Apply
                      </Button>
                    </div>
                    {couponError && (
                      <p className="text-red-600 text-sm mt-1">{couponError}</p>
                    )}
                    {couponDiscount > 0 && (
                      <p className="text-green-600 text-sm mt-1">Coupon applied successfully!</p>
                    )}
                  </form>
                  
                  {/* Checkout Button */}
                  <Button
                    onClick={proceedToCheckout}
                    variant="primary"
                    fullWidth
                    className="py-3"
                  >
                    Proceed to Checkout
                  </Button>
                  
                  {/* Payment Methods */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">We Accept</h3>
                    <div className="flex items-center justify-between">
                      <CreditCard size={30} className="text-gray-700" />
                      <span className="text-sm text-gray-600">Secure Payments</span>
                    </div>
                  </div>
                  
                  {/* Assurances */}
                  <div className="mt-6 pt-4 border-t border-gray-200 space-y-3">
                    <div className="flex items-start">
                      <ShieldCheck size={16} className="text-green-600 mr-2 mt-0.5" />
                      <span className="text-sm text-gray-600">Secure transactions</span>
                    </div>
                    <div className="flex items-start">
                      <RefreshCw size={16} className="text-green-600 mr-2 mt-0.5" />
                      <span className="text-sm text-gray-600">30-day returns</span>
                    </div>
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