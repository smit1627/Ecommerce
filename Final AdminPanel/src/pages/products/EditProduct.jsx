import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { title } from 'framer-motion/client';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [previewUrl, setPreviewUrl] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    stock: ''
  });

  const apiUrl = import.meta.env.VITE_API_URL || ''

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'image') {
      const file = files && files[0];
      if (file) {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${apiUrl}/getSingleProduct/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setFormData({
          title: response.data.title || '',
          description: response.data.description || '',
          price: response.data.price || '',
          stock: response.data.stock || ''
        });
        setPreviewUrl(response.data.imageUrl || '');
      } catch (error) {
        console.error("Error fetching product:", error.message);
      }
    };

    fetchData();
  }, [apiUrl, id]);



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const formPayload = new FormData();

      // Append data
      formPayload.append('title', formData.title);
      formPayload.append('description', formData.description);
      formPayload.append('price', formData.price);
      formPayload.append('stock', formData.stock);

      // If there's an image uploaded
      const imageInput = document.querySelector('input[name="image"]');
      if (imageInput?.files?.[0]) {
        formPayload.append('image', imageInput.files[0]);
      }

      await axios.put(`${apiUrl}/updateProduct/${id}`, formPayload, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Product updated!');
      navigate('/products');

    } catch (err) {
      console.error('Error updating product:', err.message);
    }
  };


  return (
    <div className="p-6 max-w-5xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-gray-900 dark:text-white mb-8"
      >
        Edit Product
      </motion.h1>

      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Product Name
            </label>
            <input
              type="text"
              name="title"
              value={formData.title || ''}
              onChange={handleChange}
              placeholder="Enter product name"
              className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              name="description"
              rows={4}
              value={formData.description || ''}
              onChange={handleChange}
              placeholder="Write product description..."
              className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Price & Stock */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Price ($)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price || ''}
                onChange={handleChange}
                placeholder="e.g. 99.99"
                className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Stock
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock || ''}
                onChange={handleChange}
                placeholder="e.g. 25"
                className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Upload Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Image Preview */}
          {previewUrl && (
            <div className="mt-2">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Image Preview:</p>
              <img
                src={previewUrl}
                alt="Preview"
                className="w-40 h-40 object-cover rounded-lg border border-gray-300 dark:border-gray-700"
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => navigate('/products')}
              className="px-4 py-2 rounded-lg border border-gray-400 text-gray-700 dark:text-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
