import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Filter,
  RefreshCw,
  Plus,
  Download,
  Eye,
  Edit,
  Trash2,
  Tag,
  BarChart
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Table from '../../components/ui/Table';
import Button from '../../components/ui/Button';
import SearchInput from '../../components/ui/SearchInput';
import FilterDropdown from '../../components/ui/FilterDropdown';
import Badge from '../../components/ui/Badge';
import Pagination from '../../components/ui/Pagination';
import Modal, { useModal } from '../../components/ui/Modal';
import toast from 'react-hot-toast';
import axios from 'axios';




// Mock data for products
const generateProducts = (count) => {
  const categories = ['Electronics', 'Clothing', 'Home & Kitchen', 'Sports', 'Beauty'];
  const statuses = ['In Stock', 'Low Stock', 'Out of Stock'];

  return Array.from({ length: count }, (_, i) => ({
    id: `PRD-${1000 + i}`,
    name: [
      'Wireless Earbuds', 'Smartphone Case', 'Smart Watch', 'Bluetooth Speaker',
      'T-Shirt', 'Jeans', 'Sneakers', 'Backpack', 'Coffee Mug', 'Water Bottle',
      'Yoga Mat', 'Desk Lamp', 'Notebook', 'Sunglasses', 'Headphones'
    ][Math.floor(Math.random() * 15)],
    category: categories[Math.floor(Math.random() * categories.length)],
    price: `$${(Math.random() * 150 + 10).toFixed(2)}`,
    inventory: Math.floor(Math.random() * 100),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    image: [
      'https://images.pexels.com/photos/3394666/pexels-photo-3394666.jpeg?auto=compress&cs=tinysrgb&w=100',
      'https://images.pexels.com/photos/4071887/pexels-photo-4071887.jpeg?auto=compress&cs=tinysrgb&w=100',
      'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=100',
      'https://images.pexels.com/photos/1279107/pexels-photo-1279107.jpeg?auto=compress&cs=tinysrgb&w=100',
      'https://images.pexels.com/photos/5709639/pexels-photo-5709639.jpeg?auto=compress&cs=tinysrgb&w=100'
    ][Math.floor(Math.random() * 5)],
  }));
};

const mockProducts = generateProducts(48);

const statusColorMap = {
  'In Stock': 'success',
  'Low Stock': 'warning',
  'Out of Stock': 'danger',
};

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState(mockProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const deleteModal = useModal();

  const productsPerPage = 10;
  const getProductData = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const response = await axios.get(`${apiUrl}/getAllProducts`, {
        headers: {
          'Authorization': 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MWYzODFhYTM0NzAwMTkxMTQwMGQzOSIsImVtYWlsIjoic21pdHJud0BnbWFpbC5jb20iLCJpYXQiOjE3NDcwNDI4MzQsImV4cCI6MTc0NzA0NjQzNH0.t1Xa4vZAi4C3ZdvV1AxgRMx8iV2cfyd4s1aDJKd7Yp4"
        }
      })
      console.log(response.data, 'product data');
      setProducts(response.data);
    } catch (error) {
      console.log(error.message, 'error while fetching product data in products page');

    }
  }

  useEffect(() => {
    getProductData()
  }, []);
  // Filter options
  const categoryOptions = [
    { value: 'Electronics', label: 'Electronics' },
    { value: 'Clothing', label: 'Clothing' },
    { value: 'Home & Kitchen', label: 'Home & Kitchen' },
    { value: 'Sports', label: 'Sports' },
    { value: 'Beauty', label: 'Beauty' },
  ];

  const statusOptions = [
    { value: 'In Stock', label: 'In Stock' },
    { value: 'Low Stock', label: 'Low Stock' },
    { value: 'Out of Stock', label: 'Out of Stock' },
  ];

  // Filter products based on search and other filters
  const filteredProducts = products.filter(product => {
    const matchesSearch = searchQuery === '' ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);

    const matchesStatus = selectedStatuses.length === 0 ||
      selectedStatuses.includes(product.status);

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const refreshProducts = () => {
    setIsLoading(true);
    // Simulate API request
    setTimeout(() => {
      setProducts(generateProducts(48));
      setIsLoading(false);
    }, 800);
  };

  const handleDeleteClick = (product) => {
    console.log(product, 'product to delete');
    setProductToDelete(product);
    // console.log(productToDelete);

    deleteModal.open();
  };

  const confirmDelete = async () => {
    const apiUrl = import.meta.env.VITE_API_URL || '';
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MWYzODFhYTM0NzAwMTkxMTQwMGQzOSIsImVtYWlsIjoic21pdHJud0BnbWFpbC5jb20iLCJpYXQiOjE3NDcwNDI4MzQsImV4cCI6MTc0NzA0NjQzNH0.t1Xa4vZAi4C3ZdvV1AxgRMx8iV2cfyd4s1aDJKd7Yp4"
    const { _id } = productToDelete;

    const response = await axios.delete(`${apiUrl}/deleteProduct/${_id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    console.log(response, 'response after deleting product');
    // Simulate API request
    if (response.status === 200) {
      toast.promise(
        new Promise((resolve) => {
          setTimeout(() => {
            // setProducts(products.filter(p => p.id !== productToDelete.id));
            resolve();
          }, 1000);
        }),
        {
          loading: 'Deleting product...',
          success: 'Product deleted successfully',
          error: 'Failed to delete product',
        }
      );
      // setProducts(products.filter(product => product.id !== productToDelete.id));
      deleteModal.close();
      setProductToDelete(null);
      getProductData()
    }
    else {
      toast.error('Failed to delete product');
    }
  };

  // Table columns
  const columns = [
    {
      header: 'Product',
      accessor: 'title',
      cell: (row) => (
        <div className="flex items-center">
          <div className="h-10 w-10 rounded overflow-hidden bg-gray-100 dark:bg-gray-700 mr-3 flex-shrink-0">
            <img
              src={`http://localhost:3000/image/${row.image}`}
              alt={row.title}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <div className="font-medium text-gray-900 dark:text-white">{row.title}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{row._id}</div>
          </div>
        </div>
      ),
    },
    {
      header: 'Category',
      accessor: 'category',
      cell: (row) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
          {row.category}
        </span>
      ),
    },
    {
      header: 'Price',
      accessor: 'price',
      cell: (row) => (
        <span className="font-medium text-gray-900 dark:text-white">{row.price}</span>
      ),
    },
    // {
    //   header: 'Inventory',
    //   accessor: 'inventory',
    //   cell: (row) => (
    //     <span className="font-medium text-gray-900 dark:text-white">{row.inventory}</span>
    //   ),
    // },
    // {
    //   header: 'Status',
    //   accessor: 'status',
    //   cell: (row) => (
    //     <Badge variant={statusColorMap[row.status]}>
    //       {row.status}
    //     </Badge>
    //   ),
    // },
    {
      header: 'Actions',
      cell: (row) => (
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            leftIcon={<Eye className="h-4 w-4" />}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/products/${row.id}`);
            }}
          >
            View
          </Button>
          <Button
            variant="ghost"
            size="sm"
            leftIcon={<Edit className="h-4 w-4" />}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/products/edit/${row.id}`);
            }}
          >
            Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            leftIcon={<Trash2 className="h-4 w-4 text-red-500" />}
            className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteClick(row);
            }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-0"
        >
          Products
        </motion.h1>

        <div className="flex flex-wrap gap-2">
          <Button
            variant="primary"
            leftIcon={<Plus className="h-4 w-4" />}
            onClick={() => navigate('/products/add')}
          >
            Add Product
          </Button>
          <Button
            variant="secondary"
            leftIcon={<RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />}
            onClick={refreshProducts}
            disabled={isLoading}
          >
            Refresh
          </Button>
        </div>
      </div>

      <Card>
        <div className="mb-6 flex flex-col sm:flex-row flex-wrap gap-4">
          <SearchInput
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            onClear={() => {
              setSearchQuery('');
              setCurrentPage(1);
            }}
            placeholder="Search products..."
            className="sm:w-80"
          />

          <div className="flex gap-2 flex-wrap">
            <FilterDropdown
              label="Category"
              options={categoryOptions}
              selectedValues={selectedCategories}
              onChange={(values) => {
                setSelectedCategories(values);
                setCurrentPage(1);
              }}
              multiple
            />

            <FilterDropdown
              label="Status"
              options={statusOptions}
              selectedValues={selectedStatuses}
              onChange={(values) => {
                setSelectedStatuses(values);
                setCurrentPage(1);
              }}
              multiple
            />

            <Button
              variant="outline"
              leftIcon={<Filter className="h-4 w-4" />}
              onClick={() => {
                setSearchQuery('');
                setSelectedCategories([]);
                setSelectedStatuses([]);
                setCurrentPage(1);
              }}
              disabled={searchQuery === '' && selectedCategories.length === 0 && selectedStatuses.length === 0}
            >
              Clear Filters
            </Button>
          </div>
        </div>

        <Table
          columns={columns}
          data={currentProducts}
          isLoading={isLoading}
          emptyMessage="No products found"
          onRowClick={(row) => navigate(`/products/${row.id}`)}
        />

        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </Card>

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
            <Button variant="danger" onClick={confirmDelete}>
              Delete
            </Button>
          </>
        }
      >
        {productToDelete && (
          <div>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Are you sure you want to delete this product? This action cannot be undone.
            </p>
            <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="h-10 w-10 rounded overflow-hidden bg-gray-100 dark:bg-gray-700 mr-3">
                <img
                  src={productToDelete.image}
                  alt={productToDelete.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <div className="font-medium text-gray-900 dark:text-white">{productToDelete.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{productToDelete.id}</div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Products;