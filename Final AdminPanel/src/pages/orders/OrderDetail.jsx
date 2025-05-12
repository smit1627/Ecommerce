import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Truck as TruckDelivery, X } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Select from '../../components/ui/Select';
import toast from 'react-hot-toast';

// Mock order details
const getOrderDetails = (id) => {
  return {
    id,
    customer: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
    },
    date: '2025-03-15',
    items: [
      {
        id: 'PRD-1001',
        name: 'Wireless Earbuds',
        price: '$59.99',
        quantity: 1,
        total: '$59.99',
        image: 'https://images.pexels.com/photos/3394666/pexels-photo-3394666.jpeg?auto=compress&cs=tinysrgb&w=100'
      },
      {
        id: 'PRD-1056',
        name: 'Smartphone Case',
        price: '$14.99',
        quantity: 2,
        total: '$29.98',
        image: 'https://images.pexels.com/photos/4071887/pexels-photo-4071887.jpeg?auto=compress&cs=tinysrgb&w=100'
      },
    ],
    shipping: {
      address: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States',
      method: 'Express Shipping',
      cost: '$12.99',
    },
    payment: {
      method: 'Credit Card',
      cardNumber: '**** **** **** 4242',
      subtotal: '$89.97',
      tax: '$8.10',
      total: '$111.06',
    },
  };
};

const statusColorMap = {
  Pending: 'warning',
  Processing: 'info',
  Shipped: 'info',
  Delivered: 'success',
  Cancelled: 'danger',
  Refunded: 'secondary',
};

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [statusOptions, setStatusOptions] = useState([]);
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    // Simulate API request
    setIsLoading(true);
    setTimeout(() => {
      const orderDetails = getOrderDetails(id);
      setOrder(orderDetails);
      setNewStatus(orderDetails.status);

      // Generate status options based on current status
      const allStatuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Refunded'];
      setStatusOptions(allStatuses.map(status => ({ value: status, label: status })));

      setIsLoading(false);
    }, 800);
  }, [id]);

  const handleStatusChange = (e) => {
    setNewStatus(e.target.value);
  };

  const updateStatus = () => {
    if (newStatus !== order.status) {
      // Simulate API call to update status
      toast.promise(
        new Promise((resolve) => {
          setTimeout(() => {
            setOrder(prev => ({
              ...prev,
              status: newStatus,
              timeline: prev.timeline.map(item => {
                if (item.status === newStatus) {
                  return { ...item, date: new Date().toLocaleString(), completed: true };
                }
                return item;
              }),
            }));
            resolve();
          }, 1000);
        }),
        {
          loading: 'Updating order status...',
          success: `Order status updated to ${newStatus}`,
          error: 'Failed to update status',
        }
      );
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <Card>
        <div className="text-center py-8">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Order not found</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">The order you're looking for doesn't exist or has been removed.</p>
          <Button
            variant="primary"
            onClick={() => navigate('/orders')}
            leftIcon={<ArrowLeft className="h-4 w-4" />}
          >
            Back to Orders
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
            onClick={() => navigate('/orders')}
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Orders
          </button>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            Order {order.id}
            <Badge variant={statusColorMap[order.status]} className="ml-3">
              {order.status}
            </Badge>
          </h1>
        </div>

        <div className="mt-4 sm:mt-0 flex flex-wrap gap-2">
          <Button
            variant="outline"
            leftIcon={<Mail className="h-4 w-4" />}
            onClick={() => toast.success('Email sent to customer')}
          >
            Email Customer
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Summary */}
        <div className="lg:col-span-2 space-y-6">
          {/* Status and Timeline */}
          {/* <Card title="Order Status">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Update Status
                </label>
                <div className="flex gap-2">
                  <Select
                    id="status"
                    name="status"
                    value={newStatus}
                    onChange={handleStatusChange}
                    options={statusOptions}
                    className="flex-1"
                  />
                  <Button
                    variant="primary"
                    onClick={updateStatus}
                    disabled={newStatus === order.status}
                  >
                    Update
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="relative">
              {order.timeline.map((step, index) => (
                <div key={index} className="flex mb-6 last:mb-0">
                  <div className="flex flex-col items-center mr-4">
                    <div className={`
                      rounded-full h-8 w-8 flex items-center justify-center
                      ${step.completed 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}
                    `}>
                      {step.completed ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <span className="text-sm">{index + 1}</span>
                      )}
                    </div>
                    {index < order.timeline.length - 1 && (
                      <div className={`
                        h-full w-0.5 mt-2
                        ${order.timeline[index + 1].completed 
                          ? 'bg-green-500' 
                          : 'bg-gray-200 dark:bg-gray-700'}
                      `} />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-medium ${step.completed ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                      {step.status}
                    </h4>
                    {step.date ? (
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {step.date}
                      </p>
                    ) : (
                      <p className="text-sm text-gray-400 dark:text-gray-500 italic">
                        Pending
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card> */}

          {/* Order Items */}
          <Card title={`Order Items (${order.items.length})`}>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:items-center py-3 border-b border-gray-200 dark:border-gray-700 last:border-0"
                >
                  <div className="flex items-center flex-1 mb-3 sm:mb-0">
                    <div className="h-16 w-16 rounded overflow-hidden bg-gray-100 dark:bg-gray-700 mr-4 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                        {item.name}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Item ID: {item.id}
                      </p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">
                        {item.price}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end sm:space-x-6">
                    <div className="text-sm">
                      <p className="text-gray-500 dark:text-gray-400">Quantity</p>
                      <p className="font-medium text-gray-900 dark:text-white">{item.quantity}</p>
                    </div>
                    <div className="text-sm text-right">
                      <p className="text-gray-500 dark:text-gray-400">Subtotal</p>
                      <p className="font-medium text-gray-900 dark:text-white">{item.total}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500 dark:text-gray-400">Subtotal</span>
                <span className="font-medium text-gray-900 dark:text-white">{order.payment.subtotal}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500 dark:text-gray-400">Shipping</span>
                <span className="font-medium text-gray-900 dark:text-white">{order.shipping.cost}</span>
              </div>
              <div className="flex justify-between text-sm mb-4">
                <span className="text-gray-500 dark:text-gray-400">Tax</span>
                <span className="font-medium text-gray-900 dark:text-white">{order.payment.tax}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-900 dark:text-white">Total</span>
                <span className="font-bold text-lg text-gray-900 dark:text-white">{order.payment.total}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Customer and Shipping Info */}
        <div className="space-y-6">
          {/* Customer Info */}
          <Card title="Customer Information">
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Name</h4>
              <p className="text-gray-900 dark:text-white">{order.customer.name}</p>
            </div>
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Email</h4>
              <p className="text-gray-900 dark:text-white">{order.customer.email}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Phone</h4>
              <p className="text-gray-900 dark:text-white">{order.customer.phone}</p>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button
                variant="outline"
                size="sm"
                fullWidth
                onClick={() => navigate(`/users/${order.customer.id}`)}
              >
                View Customer Profile
              </Button>
            </div>
          </Card>

          {/* Shipping Info */}
          <Card title="Shipping Information">
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Address</h4>
              <p className="text-gray-900 dark:text-white">{order.shipping.address}</p>
              <p className="text-gray-900 dark:text-white">
                {order.shipping.city}, {order.shipping.state} {order.shipping.zipCode}
              </p>
              <p className="text-gray-900 dark:text-white">{order.shipping.country}</p>
            </div>
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Shipping Method</h4>
              <p className="text-gray-900 dark:text-white">{order.shipping.method}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Estimated Delivery</h4>
              <p className="text-gray-900 dark:text-white">March 18 - March 20, 2025</p>
            </div>
          </Card>

          {/* Payment Info */}
          <Card title="Payment Information">
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Payment Method</h4>
              <p className="text-gray-900 dark:text-white">{order.payment.method}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Card Number</h4>
              <p className="text-gray-900 dark:text-white">{order.payment.cardNumber}</p>
            </div>
          </Card>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setNewStatus('Cancelled');
                updateStatus();
              }}
              leftIcon={<X className="h-4 w-4" />}
              className="border-red-300 text-red-600 hover:bg-red-50 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-900/20"
            >
              Cancel Order
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="border-green-300 text-green-600 hover:bg-green-50 dark:border-green-700 dark:text-green-400 dark:hover:bg-green-900/20"
              leftIcon={<TruckDelivery className="h-4 w-4" />}
              onClick={() => {
                if (order.status === 'Processing') {
                  setNewStatus('Shipped');
                  updateStatus();
                } else if (order.status === 'Shipped') {
                  setNewStatus('Delivered');
                  updateStatus();
                }
              }}
              disabled={!['Processing', 'Shipped'].includes(order.status)}
            >
              {order.status === 'Processing' ? 'Mark Shipped' : 'Mark Delivered'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;