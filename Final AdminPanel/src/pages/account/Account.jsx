import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Camera, Mail, Phone, MapPin, UserCog, Shield, Key } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import toast from 'react-hot-toast';

const Account = () => {
  const { currentUser, updateProfile, updateProfilePicture } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    address: currentUser?.address || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate API call
    updateProfile(formData);
    setIsEditing(false);
  };

  const handleProfilePictureUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // In a real app, you would upload this to a server and get a URL back
    // For demo purposes, we'll use a FileReader to create a data URL
    const reader = new FileReader();
    reader.onload = (event) => {
      updateProfilePicture(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-gray-900 dark:text-white mb-4"
      >
        Your Account
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="flex flex-col sm:flex-row items-center sm:items-start">
              <div className="mb-6 sm:mb-0 sm:mr-8 flex flex-col items-center">
                <div className="relative mb-4">
                  <div className="h-32 w-32 rounded-full overflow-hidden bg-purple-100 dark:bg-purple-800 flex items-center justify-center">
                    {currentUser?.profilePicture ? (
                      <img
                        src={currentUser.profilePicture}
                        alt="Profile"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-4xl font-medium text-purple-700 dark:text-purple-300">
                        {currentUser?.name?.charAt(0) || 'A'}
                      </span>
                    )}
                  </div>
                  <label
                    htmlFor="profile-upload"
                    className="absolute bottom-0 right-0 p-2 bg-purple-600 dark:bg-purple-500 text-white rounded-full cursor-pointer shadow-md hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors"
                  >
                    <Camera className="h-5 w-5" />
                    <input
                      id="profile-upload"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleProfilePictureUpload}
                    />
                  </label>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Click the camera icon to upload a new photo
                </p>
              </div>

              <div className="flex-1 w-full">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Profile Information
                </h3>

                {isEditing ? (
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      <Input
                        label="Full Name"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        required
                        leftIcon={<User className="h-5 w-5 text-gray-400" />}
                      />

                      <Input
                        label="Email"
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your email address"
                        required
                        leftIcon={<Mail className="h-5 w-5 text-gray-400" />}
                      />

                      <Input
                        label="Phone"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Your phone number"
                        leftIcon={<Phone className="h-5 w-5 text-gray-400" />}
                      />

                      <div>
                        <label
                          htmlFor="address"
                          className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          Address
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MapPin className="h-5 w-5 text-gray-400" />
                          </div>
                          <textarea
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Your address"
                            className="w-full pl-10 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-800 focus:border-purple-500 dark:focus:border-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            rows="3"
                          ></textarea>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2">
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={() => setIsEditing(false)}
                        >
                          Cancel
                        </Button>
                        <Button type="submit" variant="primary">
                          Save Changes
                        </Button>
                      </div>
                    </div>
                  </form>
                ) : (
                  <>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <User className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
                          <p className="text-gray-900 dark:text-white">{currentUser?.name || 'Not provided'}</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <Mail className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                          <p className="text-gray-900 dark:text-white">{currentUser?.email || 'Not provided'}</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <Phone className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                          <p className="text-gray-900 dark:text-white">{currentUser?.phone || 'Not provided'}</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Address</p>
                          <p className="text-gray-900 dark:text-white">{currentUser?.address || 'Not provided'}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <Button
                        variant="primary"
                        onClick={() => setIsEditing(true)}
                        leftIcon={<UserCog className="h-4 w-4" />}
                      >
                        Edit Profile
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card title="Account Summary">
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-500 dark:text-gray-400">Role</span>
                <span className="text-gray-900 dark:text-white">{currentUser?.role || 'Admin'}</span>
              </div>

              <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-500 dark:text-gray-400">Account ID</span>
                <span className="text-gray-900 dark:text-white">{currentUser?.id || 'USR-001'}</span>
              </div>

              <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-500 dark:text-gray-400">Status</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                  Active
                </span>
              </div>

              <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-500 dark:text-gray-400">Member Since</span>
                <span className="text-gray-900 dark:text-white">March 15, 2025</span>
              </div>

              <div className="flex justify-between py-2">
                <span className="text-gray-500 dark:text-gray-400">Last Login</span>
                <span className="text-gray-900 dark:text-white">Today</span>
              </div>
            </div>
          </Card>

          <Card title="Danger Zone" className="border-red-200 dark:border-red-900/50">
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <Button
              variant="danger"
              size="sm"
              fullWidth
              onClick={() => toast.error('Account deletion is disabled for demo accounts')}
            >
              Delete Account
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Account;