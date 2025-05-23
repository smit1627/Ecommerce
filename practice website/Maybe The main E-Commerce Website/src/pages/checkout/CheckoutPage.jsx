import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CreditCard,
  Lock,
  CheckCircle,
  MapPin,
  Truck,
  DollarSign
} from 'lucide-react';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';
import Button from '../../components/ui/Button';

const CheckoutPage = () => {
  const { cart, getCartTotal, clearCart } = useContext(CartContext);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const imageUrl = import.meta.env.VITE_IMAGE_URL || 'http://localhost:3000/image';

  const [formData, setFormData] = useState({
    firstName: currentUser?.name?.split(' ')[0] || '',
    lastName: currentUser?.name?.split(' ')[1] || '',
    email: currentUser?.email || '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    paymentMethod: 'credit-card',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const [errors, setErrors] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  // Calculate totals
  const subtotal = getCartTotal();
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.07; // 7% tax
  const total = subtotal + shipping + tax;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when field is being edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields
    const requiredFields = [
      'firstName', 'lastName', 'email', 'address',
      'city', 'state', 'zipCode', 'country'
    ];

    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'This field is required';
      }
    });

    // Email validation
    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Payment method validation
    if (formData.paymentMethod === 'credit-card') {
      if (!formData.cardNumber) {
        newErrors.cardNumber = 'Card number is required';
      } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
        newErrors.cardNumber = 'Please enter a valid 16-digit card number';
      }

      if (!formData.cardName) {
        newErrors.cardName = 'Name on card is required';
      }

      if (!formData.expiryDate) {
        newErrors.expiryDate = 'Expiry date is required';
      } else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
        newErrors.expiryDate = 'Use format MM/YY';
      }

      if (!formData.cvv) {
        newErrors.cvv = 'CVV is required';
      } else if (!/^\d{3,4}$/.test(formData.cvv)) {
        newErrors.cvv = 'Invalid CVV';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // In a real app, we would submit the order to an API
      console.log('Order submitted:', { items: cart, shippingDetails: formData, total });

      // Generate a random order number
      const newOrderNumber = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
      setOrderNumber(newOrderNumber);

      // Show success message and clear cart
      setOrderPlaced(true);
      clearCart();
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto bg-white rounded-xl shadow-md p-8 text-center">
            <div className="flex justify-center mb-6">
              <CheckCircle size={64} className="text-green-500" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Order Placed Successfully!</h1>
            <p className="text-gray-600 mb-6">
              Thank you for your purchase. Your order number is <span className="font-bold">{orderNumber}</span>.
              We've sent a confirmation email to {formData.email}.
            </p>
            <p className="text-gray-600 mb-8">
              You will receive your order within 3-5 business days.
            </p>
            <Button
              onClick={() => navigate('/')}
              variant="primary"
              fullWidth
              className="mb-4"
            >
              Continue Shopping
            </Button>
            <Button
              onClick={() => navigate('/profile')}
              variant="outline"
              fullWidth
            >
              View Order History
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Shipping Address */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <MapPin size={20} className="text-blue-700 mr-2" />
                    <h2 className="text-xl font-bold">Shipping Address</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.firstName ? 'border-red-500' : 'border-gray-300'
                          }`}
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.lastName ? 'border-red-500' : 'border-gray-300'
                          }`}
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'
                          }`}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Street Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.address ? 'border-red-500' : 'border-gray-300'
                          }`}
                      />
                      {errors.address && (
                        <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.city ? 'border-red-500' : 'border-gray-300'
                          }`}
                      />
                      {errors.city && (
                        <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        State / Province
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.state ? 'border-red-500' : 'border-gray-300'
                          }`}
                      />
                      {errors.state && (
                        <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ZIP / Postal Code
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.zipCode ? 'border-red-500' : 'border-gray-300'
                          }`}
                      />
                      {errors.zipCode && (
                        <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Country
                      </label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.country ? 'border-red-500' : 'border-gray-300'
                          }`}
                      >
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Australia">Australia</option>
                        <option value="Germany">Germany</option>
                        <option value="France">France</option>
                      </select>
                      {errors.country && (
                        <p className="text-red-500 text-sm mt-1">{errors.country}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping Method */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <Truck size={20} className="text-blue-700 mr-2" />
                    <h2 className="text-xl font-bold">Shipping Method</h2>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center p-3 border border-gray-200 rounded-lg">
                      <input
                        type="radio"
                        id="shipping-standard"
                        name="shippingMethod"
                        value="standard"
                        checked
                        className="mr-3"
                      />
                      <label htmlFor="shipping-standard" className="flex-grow">
                        <span className="font-medium block">Standard Shipping</span>
                        <span className="text-sm text-gray-600">Delivery in 3-5 business days</span>
                      </label>
                      <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                    </div>

                    <div className="flex items-center p-3 border border-gray-200 rounded-lg opacity-50">
                      <input
                        type="radio"
                        id="shipping-express"
                        name="shippingMethod"
                        value="express"
                        disabled
                        className="mr-3"
                      />
                      <label htmlFor="shipping-express" className="flex-grow">
                        <span className="font-medium block">Express Shipping</span>
                        <span className="text-sm text-gray-600">Delivery in 1-2 business days</span>
                      </label>
                      <span>$15.00</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <CreditCard size={20} className="text-blue-700 mr-2" />
                    <h2 className="text-xl font-bold">Payment Method</h2>
                  </div>

                  <div>
                    <div className="mb-4">
                      <div className="flex items-center p-3 border border-gray-200 rounded-lg">
                        <input
                          type="radio"
                          id="payment-credit-card"
                          name="paymentMethod"
                          value="credit-card"
                          checked={formData.paymentMethod === 'credit-card'}
                          onChange={handleChange}
                          className="mr-3"
                        />
                        <label htmlFor="payment-credit-card" className="flex-grow">
                          <span className="font-medium">Credit / Debit Card</span>
                        </label>
                        <CreditCard size={20} className="text-gray-600" />
                      </div>
                    </div>

                    {formData.paymentMethod === 'credit-card' && (
                      <div className="space-y-4 ml-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Card Number
                          </label>
                          <input
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            placeholder="1234 5678 9012 3456"
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                              }`}
                          />
                          {errors.cardNumber && (
                            <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Name on Card
                          </label>
                          <input
                            type="text"
                            name="cardName"
                            value={formData.cardName}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.cardName ? 'border-red-500' : 'border-gray-300'
                              }`}
                          />
                          {errors.cardName && (
                            <p className="text-red-500 text-sm mt-1">{errors.cardName}</p>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Expiry Date (MM/YY)
                            </label>
                            <input
                              type="text"
                              name="expiryDate"
                              value={formData.expiryDate}
                              onChange={handleChange}
                              placeholder="MM/YY"
                              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.expiryDate ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                            {errors.expiryDate && (
                              <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              CVV
                            </label>
                            <input
                              type="text"
                              name="cvv"
                              value={formData.cvv}
                              onChange={handleChange}
                              placeholder="123"
                              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.cvv ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                            {errors.cvv && (
                              <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="mt-4">
                      <div className="flex items-center p-3 border border-gray-200 rounded-lg opacity-50">
                        <input
                          type="radio"
                          id="payment-paypal"
                          name="paymentMethod"
                          value="paypal"
                          disabled
                          className="mr-3"
                        />
                        <label htmlFor="payment-paypal" className="flex-grow">
                          <span className="font-medium">PayPal</span>
                        </label>
                        <DollarSign size={20} className="text-gray-600" />
                      </div>
                    </div>

                    <div className="flex items-center mt-4 text-sm text-gray-600">
                      <Lock size={14} className="mr-1" />
                      <span>Your payment information is secure and encrypted</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Place Order Button - Mobile Only */}
              <div className="lg:hidden">
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  className="py-3"
                >
                  Place Order - ${total.toFixed(2)}
                </Button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-24">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                <div className="space-y-4 mb-4">
                  {/* Cart Items Summary */}
                  <div className="max-h-80 overflow-auto mb-4">
                    {cart.map((item) => {
                      // Calculate discounted price
                      const itemPrice = item.productId.price
                      return (
                        <div key={item.id} className="flex py-3 border-b border-gray-200 last:border-b-0">
                          <div className="w-16 h-16 rounded-md overflow-hidden mr-3">
                            <img
                              src={`${imageUrl}/${item.productId.image}`}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-grow">
                            <h3 className="text-sm font-medium line-clamp-1">{item.title}</h3>
                            <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                            <p className="font-medium">
                              ${(itemPrice * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">${subtotal.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">
                        {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>

                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Tax (7%)</span>
                      <span className="font-medium">${tax.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between pt-4 border-t border-gray-200 text-lg font-bold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Place Order Button - Desktop Only */}
                <div className="hidden lg:block">
                  <Button
                    onClick={handleSubmit}
                    variant="primary"
                    fullWidth
                    className="py-3"
                  >
                    Place Order
                  </Button>
                </div>

                {/* Security Notice */}
                <div className="mt-6 pt-4 border-t border-gray-200 flex items-center text-sm text-gray-600">
                  <Lock size={14} className="mr-2" />
                  <span>All transactions are secure and encrypted</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;