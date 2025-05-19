import React, { useState, useContext } from 'react';
import { User, Settings, ShoppingBag, Heart, LogOut, MapPin, Edit3 } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import Button from '../../components/ui/Button';

const ProfilePage = () => {
  const { currentUser, updateProfile, logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    address: currentUser?.address || '',
    city: currentUser?.city || '',
    state: currentUser?.state || '',
    zipCode: currentUser?.zipCode || '',
    country: currentUser?.country || 'United States',
  });
  
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is being edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      updateProfile(formData);
      setIsEditing(false);
    }
  };
  
  const handleCancel = () => {
    // Reset form data to current user data
    setFormData({
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      phone: currentUser?.phone || '',
      address: currentUser?.address || '',
      city: currentUser?.city || '',
      state: currentUser?.state || '',
      zipCode: currentUser?.zipCode || '',
      country: currentUser?.country || 'United States',
    });
    setErrors({});
    setIsEditing(false);
  };
  
  // Mock data for order history
  const orderHistory = [
    {
      id: 'ORD-763901',
      date: '2023-09-15',
      total: 249.98,
      status: 'Delivered',
      items: 3
    },
    {
      id: 'ORD-587432',
      date: '2023-08-22',
      total: 124.50,
      status: 'Delivered',
      items: 2
    },
    {
      id: 'ORD-329856',
      date: '2023-07-10',
      total: 79.99,
      status: 'Delivered',
      items: 1
    }
  ];
  
  // Mock data for wishlist
  const wishlist = [
    {
      id: '6',
      title: 'Smart Fitness Watch',
      price: 149.99,
      discount: 25,
      image: 'https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: '8',
      title: 'Professional Kitchen Knife Set',
      price: 129.99,
      discount: 10,
      image: 'https://images.pexels.com/photos/952478/pexels-photo-952478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Personal Information</h2>
                {!isEditing && (
                  <Button
                    onClick={() => setIsEditing(true)}
                    variant="outline"
                    size="sm"
                    className="flex items-center"
                  >
                    <Edit3 size={16} className="mr-1" />
                    Edit
                  </Button>
                )}
              </div>
              
              {isEditing ? (
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-3">Address Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Street Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Country
                      </label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Australia">Australia</option>
                        <option value="Germany">Germany</option>
                        <option value="France">France</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                    >
                      Save Changes
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Full Name</p>
                      <p className="font-medium">{currentUser?.name || 'Not provided'}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Email Address</p>
                      <p className="font-medium">{currentUser?.email || 'Not provided'}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Phone Number</p>
                      <p className="font-medium">{currentUser?.phone || 'Not provided'}</p>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="text-lg font-semibold mb-3">Address Information</h3>
                    
                    {currentUser?.address ? (
                      <div className="flex items-start">
                        <MapPin size={18} className="text-gray-500 mr-2 mt-0.5" />
                        <div>
                          <p className="font-medium">{currentUser.address}</p>
                          <p>
                            {currentUser.city && `${currentUser.city}, `}
                            {currentUser.state && `${currentUser.state} `}
                            {currentUser.zipCode && currentUser.zipCode}
                          </p>
                          <p>{currentUser.country}</p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-600">No address provided</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
        
      case 'orders':
        return (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6">Order History</h2>
              
              {orderHistory.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingBag size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-lg text-gray-600">You haven't placed any orders yet</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Order ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Items
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {orderHistory.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-700">
                            {order.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(order.date).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {order.items}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ${order.total.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <a href="#" className="text-blue-700 hover:text-blue-900">
                              View
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        );
        
      case 'wishlist':
        return (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6">Wishlist</h2>
              
              {wishlist.length === 0 ? (
                <div className="text-center py-8">
                  <Heart size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-lg text-gray-600">Your wishlist is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {wishlist.map((item) => (
                    <div key={item.id} className="flex border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-20 h-20 object-cover rounded-md mr-4"
                      />
                      <div className="flex-grow">
                        <h3 className="font-medium text-gray-900 mb-1">{item.title}</h3>
                        <div className="flex items-center mb-2">
                          {item.discount > 0 ? (
                            <>
                              <span className="font-medium text-gray-900">
                                ${(item.price - (item.price * item.discount / 100)).toFixed(2)}
                              </span>
                              <span className="text-gray-500 line-through text-sm ml-2">
                                ${item.price.toFixed(2)}
                              </span>
                            </>
                          ) : (
                            <span className="font-medium text-gray-900">${item.price.toFixed(2)}</span>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="primary"
                            size="sm"
                          >
                            Add to Cart
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
        
      case 'settings':
        return (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Password</h3>
                  <Button
                    variant="outline"
                  >
                    Change Password
                  </Button>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <h3 className="text-lg font-semibold mb-3">Email Preferences</h3>
                  
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="newsletter"
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        defaultChecked
                      />
                      <label htmlFor="newsletter" className="ml-2 block text-gray-700">
                        Receive newsletters
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="orderUpdates"
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        defaultChecked
                      />
                      <label htmlFor="orderUpdates" className="ml-2 block text-gray-700">
                        Order status updates
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="promotions"
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        defaultChecked
                      />
                      <label htmlFor="promotions" className="ml-2 block text-gray-700">
                        Promotional emails and offers
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <h3 className="text-lg font-semibold mb-3 text-red-600">Danger Zone</h3>
                  <Button
                    variant="danger"
                    onClick={logout}
                  >
                    Logout from all devices
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">My Account</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                {/* User Info */}
                <div className="flex flex-col items-center mb-6 pb-6 border-b border-gray-200">
                  <div className="w-20 h-20 bg-blue-900 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
                    {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <h2 className="text-xl font-bold">{currentUser?.name || 'User'}</h2>
                  <p className="text-gray-600">{currentUser?.email}</p>
                </div>
                
                {/* Navigation */}
                <nav className="space-y-1">
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${
                      activeTab === 'profile' 
                        ? 'bg-blue-900 text-white' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <User size={18} className="mr-3" />
                    <span>Profile</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('orders')}
                    className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${
                      activeTab === 'orders' 
                        ? 'bg-blue-900 text-white' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <ShoppingBag size={18} className="mr-3" />
                    <span>Order History</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('wishlist')}
                    className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${
                      activeTab === 'wishlist' 
                        ? 'bg-blue-900 text-white' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Heart size={18} className="mr-3" />
                    <span>Wishlist</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('settings')}
                    className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${
                      activeTab === 'settings' 
                        ? 'bg-blue-900 text-white' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Settings size={18} className="mr-3" />
                    <span>Settings</span>
                  </button>
                  
                  <button
                    onClick={logout}
                    className="w-full flex items-center px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <LogOut size={18} className="mr-3" />
                    <span>Logout</span>
                  </button>
                </nav>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="md:col-span-3">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;