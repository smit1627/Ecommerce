import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter, RefreshCw, Download, Eye, Trash2, ExternalLink } from 'lucide-react';
import Card from '../../components/ui/Card';
import Table from '../../components/ui/Table';
import Button from '../../components/ui/Button';
import SearchInput from '../../components/ui/SearchInput';
import FilterDropdown from '../../components/ui/FilterDropdown';
import Badge from '../../components/ui/Badge';
import Pagination from '../../components/ui/Pagination';

// Mock data for orders
const generateOrders = (count) => {
  const statuses = ['Pending', 'Processing', 'Delivered', 'Cancelled', 'Refunded'];
  const customers = [
    'John Doe', 'Sarah Johnson', 'Mike Brown', 'Emily Wilson', 'Robert Chen',
    'Lisa Park', 'David Kim', 'Anna Smith', 'Michael Jones', 'Jennifer Lee'
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: `ORD-${5999 - i}`,
    customer: customers[Math.floor(Math.random() * customers.length)],
    date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    amount: `$${(Math.random() * 500 + 50).toFixed(2)}`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    items: Math.floor(Math.random() * 5) + 1,
  }));
};

const mockOrders = generateOrders(45);

const statusColorMap = {
  Pending: 'warning',
  Processing: 'info',
  Delivered: 'success',
  Cancelled: 'danger',
  Refunded: 'secondary',
};

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState(mockOrders);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const ordersPerPage = 10;

  // Filter options
  const statusOptions = [
    { value: 'Pending', label: 'Pending' },
    { value: 'Processing', label: 'Processing' },
    { value: 'Delivered', label: 'Delivered' },
    { value: 'Cancelled', label: 'Cancelled' },
    { value: 'Refunded', label: 'Refunded' },
  ];

  // Filter orders based on search and status filters
  const filteredOrders = orders.filter(order => {
    const matchesSearch = searchQuery === '' ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = selectedStatuses.length === 0 ||
      selectedStatuses.includes(order.status);

    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const refreshOrders = () => {
    setIsLoading(true);
    // Simulate API request
    setTimeout(() => {
      setOrders(generateOrders(45));
      setIsLoading(false);
    }, 800);
  };

  // Table columns
  const columns = [
    {
      header: 'Order ID',
      accessor: 'id',
      cell: (row) => (
        <span className="font-medium text-gray-900 dark:text-white">{row.id}</span>
      ),
    },
    {
      header: 'Customer',
      accessor: 'customer',
      cell: (row) => (
        <span className="text-center dark:text-white">{row.customer}</span>
      ),
    },
    {
      header: 'Date',
      accessor: 'date',
      cell: (row) => (
        <span className="text-center dark:text-white">{row.date}</span>
      ),
    },
    {
      header: 'Items',
      accessor: 'items',
      cell: (row) => (
        <span className="text-center dark:text-white">{row.items}</span>
      ),
    },
    {
      header: 'Amount',
      accessor: 'amount',
      cell: (row) => (
        <span className="font-medium text-gray-900 dark:text-white">{row.amount}</span>
      ),
    },
    {
      header: 'Actions',
      cell: (row) => (
        <div className="flex justify-left space-x-2">
          <Button
            variant="ghost"
            size="sm"
            leftIcon={<Eye className="h-4 w-4" />}
            onClick={() => navigate(`/orders/${row.id}`)}
          >
            View
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
          Orders
        </motion.h1>

        <div className="flex space-x-2">
          <Button
            variant="outline"
            leftIcon={<Download className="h-4 w-4" />}
          >
            Export
          </Button>
          <Button
            variant="secondary"
            leftIcon={<RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />}
            onClick={refreshOrders}
            disabled={isLoading}
          >
            Refresh
          </Button>
        </div>
      </div>

      <Card>
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
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
            placeholder="Search orders..."
            className="sm:w-80"
          />

          <div className="flex gap-2 flex-wrap">
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
                setSelectedStatuses([]);
                setCurrentPage(1);
              }}
              disabled={searchQuery === '' && selectedStatuses.length === 0}
            >
              Clear Filters
            </Button>
          </div>
        </div>

        <Table
          columns={columns}
          data={currentOrders}
          isLoading={isLoading}
          emptyMessage="No orders found"
          onRowClick={(row) => navigate(`/orders/${row.id}`)}
        />

        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </Card>
    </div>
  );
};

export default Orders;