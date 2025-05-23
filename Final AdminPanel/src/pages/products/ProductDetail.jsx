import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Edit,
  Trash2,
  Star,
  ExternalLink,
  Calendar,
  Clock,
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Modal, { useModal } from '../../components/ui/Modal';
import toast from 'react-hot-toast';
import axios from 'axios';

// Mock product details
const getProductDetails = (id) => {
  return {
    id,
    name: 'Wireless Earbuds',
    description: 'High-quality wireless earbuds with noise cancellation, water resistance, and long battery life.',
    price: '$59.99',
    regularPrice: '$79.99',
    category: 'Electronics',
    tags: ['wireless', 'audio', 'earbuds', 'bluetooth'],
    inventory: 42,
    status: 'In Stock',
    images: [
      'https://images.pexels.com/photos/3394666/pexels-photo-3394666.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    sales: {
      total: 328,
      lastMonth: 42,
      trend: '+8%',
    },
    reviews: {
      average: 4.7,
      count: 86,
      distribution: [
        { rating: 5, percentage: 78 },
        { rating: 4, percentage: 15 },
        { rating: 3, percentage: 5 },
        { rating: 2, percentage: 1 },
        { rating: 1, percentage: 1 },
      ],
    },
    related: [
      { id: 'PRD-1056', name: 'Wireless Headphones', price: '$89.99', image: 'https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=100' },
      { id: 'PRD-1022', name: 'Bluetooth Speaker', price: '$79.99', image: 'https://images.pexels.com/photos/1279107/pexels-photo-1279107.jpeg?auto=compress&cs=tinysrgb&w=100' },
    ],
    createdAt: '2024-12-15',
    updatedAt: '2025-02-20',
  };
};

const statusColorMap = {
  'In Stock': 'success',
  'Low Stock': 'warning',
  'Out of Stock': 'danger',
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('details');
  const imageUrl = import.meta.env.VITE_IMAGE_URL || ''
  const apiUrl = import.meta.env.VITE_API_URL || ''
  const tokenData = JSON.parse(sessionStorage.getItem('currentUser'))
  const token = tokenData.token

  useEffect(() => {
    const fetchAll = async () => {
      setIsLoading(true);
      try {

        const response = await axios.get(`${apiUrl}/getSingleProduct/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        console.log(response, "Response from getting the data in product details");

        setProduct(response.data);

      } catch (error) {
        console.log("Error fetching product:", error.message);
        setProduct(getProductDetails(id)); // fallback
      }
      setIsLoading(false);
    };

    fetchAll();
  }, [id]);

  const deleteModal = useModal();

  const handleDelete = async () => {

    const response = await axios.delete(`${apiUrl}/deleteProduct/${product._id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    console.log(response, 'response after deleting product');
    // Simulate API request
    if (response.status === 200) {
      toast.promise(
        new Promise((resolve) => {
          setTimeout(() => {
            resolve();
            navigate('/products');
          }, 1000);
        }),
        {
          loading: 'Deleting product...',
          success: 'Product deleted successfully',
          error: 'Failed to delete product',
        }
      );
      deleteModal.close();
    }
    else {
      toast.error('Failed to delete product');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <Card>
        <div className="text-center py-8">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Product not found</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">The product you're looking for doesn't exist or has been removed.</p>
          <Button
            variant="primary"
            onClick={() => navigate('/products')}
            leftIcon={<ArrowLeft className="h-4 w-4" />}
          >
            Back to Products
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <button
            className="flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 mb-2"
            onClick={() => navigate('/products')}
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Products
          </button>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center mt-6">
            {product.title.charAt(0).toUpperCase() + product.title.slice(1).toLowerCase()}
          </h1>
          {/* <p className="text-gray-500 dark:text-gray-400 mt-1">{product._id}</p> */}
        </div>

        <div className="mt-4 sm:mt-0 flex flex-wrap gap-2">
          <Button
            variant="outline"
            leftIcon={<Edit className="h-4 w-4" />}
            onClick={() => navigate(`/products/edit/${product._id}`)}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            leftIcon={<Trash2 className="h-4 w-4" />}
            onClick={deleteModal.open}
          >
            Delete
          </Button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-6 overflow-x-auto">
          <button
            className={`py-3 px-1 border-b-2 text-sm font-medium ${activeTab === 'details'
              ? 'border-purple-500 text-purple-600 dark:text-purple-400'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
              }`}
            onClick={() => setActiveTab('details')}
          >
            Product Details
          </button>
          <button
            className={`py-3 px-1 border-b-2 text-sm font-medium ${activeTab === 'reviews'
              ? 'border-purple-500 text-purple-600 dark:text-purple-400'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
              }`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews
          </button>
        </nav>
      </div>

      {/* Product Details Tab */}
      {activeTab === 'details' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Product Images */}
            <Card>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="md:col-span-5">
                  <img
                    src={`${imageUrl}/${product.image}`}
                    alt={product.title}
                    className="w-full h-auto rounded-lg object-cover"
                    style={{ maxHeight: '400px' }}
                  />
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Summary */}
            <Card>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Product Summary</h3>
                {/* <Badge variant={statusColorMap[product.status]}>
                  {product.status}
                </Badge> */}
              </div>

              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-500 dark:text-gray-400">Price</span>
                  <span className="font-medium text-gray-900 dark:text-white">$ {product.price}</span>
                </div>

                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-500 dark:text-gray-400">Category</span>
                  <span className="text-gray-900 dark:text-white">{product.category}</span>
                </div>
              </div>


            </Card>

            {/* Meta Information */}
            <Card title="Meta Information">
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
                  <span className="text-gray-500 dark:text-gray-400 mr-1">Created:</span>
                  <span className="text-gray-900 dark:text-white">
                    {new Intl.DateTimeFormat('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    }).format(new Date(product.createdAt))}
                  </span>
                </div>

                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
                  <span className="text-gray-500 dark:text-gray-400 mr-1">Last Updated:</span>
                  <span className="text-gray-900 dark:text-white">
                    {new Intl.DateTimeFormat('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    }).format(new Date(product.updatedAt))}
                  </span>
                </div>
              </div>
            </Card>

            {/* Description */}
            <Card title="Description">
              <p className="text-gray-700 dark:text-gray-300">
                {product.description}
              </p>
            </Card>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.close}
        title="Delete Product"
        size="sm"
        footer={
          <>
            <Button variant="secondary" onClick={deleteModal.close}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </>
        }
      >
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          Are you sure you want to delete this product? This action cannot be undone.
        </p>
        <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="h-10 w-10 rounded overflow-hidden bg-gray-100 dark:bg-gray-700 mr-3">
            <img
              src={`${imageUrl}/${product.image}`}
              alt={product.title}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <div className="font-medium text-gray-900 dark:text-white">{product.title}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{product._id}</div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProductDetail;