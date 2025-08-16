import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Package, 
  Bell, 
  Search, 
  Filter, 
  Eye, 
  Edit3, 
  Truck, 
  CheckCircle, 
  XCircle,
  Clock,
  AlertCircle,
  Download,
  Calendar,
  LogOut,
  User,
  MapPin,
  Mail,
  Image as ImageIcon,
  Settings,
  ShoppingBag,
  Upload
} from 'lucide-react';
import { useOrders, Order } from '../contexts/OrderContext';
import { useAuth } from '../contexts/AuthContext';
import AdminLogin from './AdminLogin';
import ProductManagement from './Admin/ProductManagement';
import * as XLSX from 'xlsx';
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

interface PayPalButtonProps {
  amount: string;
  onSuccess: (details: any) => void;
  onError?: (error: any) => void;
}

const PayPalButton: React.FC<PayPalButtonProps> = ({ amount, onSuccess, onError }) => {
  const [{ isPending }] = usePayPalScriptReducer();

  return (
    <div>
      {isPending ? <div>Loading PayPal...</div> : null}
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: amount,
                },
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          if (actions.order) {
            const details = await actions.order.capture();
            onSuccess(details);
          }
        }}
        onError={onError}
      />
    </div>
  );
};

const AdminPanel: React.FC = () => {
  const { state: authState, logout } = useAuth();
  const { state, updateOrderStatus, getUnreadNotifications, dispatch, exportOrdersToExcel } = useOrders();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [newsletterSubscribers, setNewsletterSubscribers] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'orders' | 'products'>('orders');

  // Load newsletter subscribers on component mount
  useEffect(() => {
    const fetchNewsletterSubscribers = () => {
      try {
        const subscribers = JSON.parse(
          localStorage.getItem('fortysix_newsletter_subscribers') || '[]'
        );
        setNewsletterSubscribers(subscribers);
      } catch (error) {
        console.error('Error fetching newsletter subscribers:', error);
        setNewsletterSubscribers([]);
      }
    };

    fetchNewsletterSubscribers();
  }, []);

  // Show login if not authenticated or not admin
  if (!authState.isAuthenticated || authState.user?.email !== 'fortysixpluss@gmail.com') {
    return <AdminLogin />;
  }

  const unreadNotifications = getUnreadNotifications();

  const filteredOrders = state.orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerInfo.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerInfo.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'confirmed': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'processing': return <Package className="w-4 h-4 text-blue-600" />;
      case 'shipped': return <Truck className="w-4 h-4 text-purple-600" />;
      case 'delivered': return <CheckCircle className="w-4 h-4 text-green-700" />;
      case 'cancelled': return <XCircle className="w-4 h-4 text-red-600" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-200 text-green-900';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusUpdate = (orderId: string, newStatus: Order['status']) => {
    // Get the current order to check if it's being confirmed for the first time
    const currentOrder = state.orders.find(order => order.id === orderId);
    const isBeingConfirmed = currentOrder && currentOrder.status !== 'confirmed' && newStatus === 'confirmed';
    
    updateOrderStatus(orderId, newStatus);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }

    // Show notification if order is being confirmed
    if (isBeingConfirmed) {
      // You could add a toast notification here
      console.log(`Order ${orderId} confirmed - profit added to revenue`);
    }
  };

  const exportNewsletterSubscribers = () => {
    if (newsletterSubscribers.length === 0) {
      alert('No newsletter subscribers to export');
      return;
    }

    const subscribersForExport = newsletterSubscribers.map(subscriber => ({
      'Email': subscriber.email,
      'Subscription Date': new Date(subscriber.subscribed_at).toLocaleString(),
      'ID': subscriber.id
    }));

    const worksheet = XLSX.utils.json_to_sheet(subscribersForExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Newsletter Subscribers');
    
    // Auto-size columns
    const cols = [
      { wch: 30 }, // Email
      { wch: 20 }, // Subscription Date
      { wch: 15 }, // ID
    ];
    worksheet['!cols'] = cols;
    
    XLSX.writeFile(workbook, `fortysix-newsletter-subscribers-${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const handleImportSubscribers = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet) as any[];

        const importedSubscribers = jsonData.map((row, index) => ({
          id: row.ID || (Date.now() + index).toString(),
          email: row.Email || row.email,
          subscribed_at: row['Subscription Date'] || row.subscribed_at || new Date().toISOString()
        })).filter(sub => sub.email);

        if (importedSubscribers.length > 0) {
          localStorage.setItem('fortysix_newsletter_subscribers', JSON.stringify(importedSubscribers));
          setNewsletterSubscribers(importedSubscribers);
          alert(`Successfully imported ${importedSubscribers.length} subscribers`);
        } else {
          alert('No valid email addresses found in the file');
        }
      } catch (error) {
        console.error('Error importing subscribers:', error);
        alert('Error importing file. Please check the format and try again.');
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Manage orders, products, and subscribers with Excel integration</p>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* User Info */}
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <User className="w-4 h-4" />
                <span>Welcome, {authState.user?.name}</span>
              </div>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Bell className="w-6 h-6" />
                  {unreadNotifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {unreadNotifications.length}
                    </span>
                  )}
                </button>

                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 top-12 w-80 bg-white rounded-lg shadow-lg border z-50 max-h-96 overflow-y-auto"
                    >
                      <div className="p-4 border-b">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">Notifications</h3>
                          <button
                            onClick={() => dispatch({ type: 'CLEAR_NOTIFICATIONS' })}
                            className="text-sm text-blue-600 hover:text-blue-800"
                          >
                            Clear all
                          </button>
                        </div>
                      </div>
                      <div className="max-h-64 overflow-y-auto">
                        {state.notifications.length === 0 ? (
                          <p className="p-4 text-gray-500 text-center">No notifications</p>
                        ) : (
                          state.notifications.map((notification) => (
                            <div
                              key={notification.id}
                              className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
                                !notification.read ? 'bg-blue-50' : ''
                              }`}
                              onClick={() => dispatch({ type: 'MARK_NOTIFICATION_READ', payload: notification.id })}
                            >
                              <p className="text-sm font-medium">{notification.message}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                {notification.timestamp.toLocaleString()}
                              </p>
                            </div>
                          ))
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Export Buttons */}
              <button
                onClick={exportOrdersToExcel}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Export Orders</span>
              </button>

              <div className="relative">
                <button
                  onClick={exportNewsletterSubscribers}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>Export Subscribers</span>
                </button>
              </div>

              {/* Import Subscribers */}
              <div className="relative">
                <input
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={handleImportSubscribers}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  <Upload className="w-4 h-4" />
                  <span>Import Subscribers</span>
                </button>
              </div>

              {/* Logout Button */}
              <button
                onClick={logout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('orders')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'orders'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="w-4 h-4" />
                  <span>Orders</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('products')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'products'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Package className="w-4 h-4" />
                  <span>Products</span>
                </div>
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'orders' ? (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-600">Total Orders</p>
                    <p className="text-xl font-bold text-gray-900">{state.orders.length}</p>
                  </div>
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-600">Pending</p>
                    <p className="text-xl font-bold text-yellow-600">
                      {state.orders.filter(o => o.status === 'pending').length}
                    </p>
                  </div>
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-600">Confirmed</p>
                    <p className="text-xl font-bold text-green-600">
                      {state.orders.filter(o => o.status === 'confirmed').length}
                    </p>
                  </div>
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-600">Delivered</p>
                    <p className="text-xl font-bold text-blue-600">
                      {state.orders.filter(o => o.status === 'delivered').length}
                    </p>
                  </div>
                  <Truck className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-600">Confirmed Revenue</p>
                    <p className="text-xl font-bold text-green-600">
                      ₡{state.orders
                        .filter(o => ['confirmed', 'processing', 'shipped', 'delivered'].includes(o.status))
                        .reduce((sum, order) => sum + order.total, 0)
                        .toLocaleString()}
                    </p>
                  </div>
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-600">Cancelled</p>
                    <p className="text-xl font-bold text-red-600">
                      {state.orders.filter(o => o.status === 'cancelled').length}
                    </p>
                  </div>
                  <XCircle className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </div>

            {/* Additional Analytics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-600">Newsletter Subscribers</p>
                    <p className="text-xl font-bold text-purple-600">{newsletterSubscribers.length}</p>
                  </div>
                  <Mail className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-600">Unread Notifications</p>
                    <p className="text-xl font-bold text-red-600">{unreadNotifications.length}</p>
                  </div>
                  <Bell className="w-6 h-6 text-red-600" />
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-600">Conversion Rate</p>
                    <p className="text-xl font-bold text-indigo-600">
                      {state.orders.length > 0 
                        ? `${Math.round((state.orders.filter(o => ['confirmed', 'processing', 'shipped', 'delivered'].includes(o.status)).length / state.orders.length) * 100)}%`
                        : '0%'
                      }
                    </p>
                  </div>
                  <AlertCircle className="w-6 h-6 text-indigo-600" />
                </div>
              </div>
            </div>

            {/* Profit Calculation Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-blue-900 mb-1">Profit Calculation Logic</h3>
                  <p className="text-sm text-blue-700">
                    <strong>Revenue is only counted from confirmed orders.</strong> Orders with status: 
                    <span className="font-semibold text-green-700"> confirmed</span>, 
                    <span className="font-semibold text-blue-700"> processing</span>, 
                    <span className="font-semibold text-purple-700"> shipped</span>, or 
                    <span className="font-semibold text-green-700"> delivered</span> are included in revenue calculations. 
                    <span className="font-semibold text-red-700"> Cancelled</span> and 
                    <span className="font-semibold text-yellow-700"> pending</span> orders are excluded.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions and Filters */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6">
                {/* Search and Filters */}
                <div className="flex-1 space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search orders by ID, customer email, or name..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-gray-400" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex flex-wrap items-center space-x-2">
                  <button
                    onClick={exportOrdersToExcel}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export Orders</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      const confirmedOrders = state.orders.filter(o => ['confirmed', 'processing', 'shipped', 'delivered'].includes(o.status));
                      const totalRevenue = confirmedOrders.reduce((sum, order) => sum + order.total, 0);
                      alert(`Confirmed Revenue: ₡${totalRevenue.toLocaleString()}\nTotal Confirmed Orders: ${confirmedOrders.length}`);
                    }}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Revenue Report</span>
                  </button>

                  <button
                    onClick={() => {
                      const pendingOrders = state.orders.filter(o => o.status === 'pending');
                      if (pendingOrders.length > 0) {
                        const shouldConfirm = confirm(`Confirm all ${pendingOrders.length} pending orders?`);
                        if (shouldConfirm) {
                          pendingOrders.forEach(order => handleStatusUpdate(order.id, 'confirmed'));
                        }
                      } else {
                        alert('No pending orders to confirm');
                      }
                    }}
                    className="flex items-center space-x-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Confirm All Pending</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Items
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Payment
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {order.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{order.createdAt.toLocaleDateString()}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div>
                            <div className="font-medium text-gray-900">
                              {order.customerInfo.name || 'N/A'}
                            </div>
                            <div className="text-gray-500">{order.customerInfo.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          ₡{order.total.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center space-x-2">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                              order.paymentMethod === 'sinpe' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {order.paymentMethod.toUpperCase()}
                            </span>
                            {order.paymentProofImage && (
                              <div className="relative group">
                                <ImageIcon className="w-4 h-4 text-green-600 cursor-help" />
                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                                  Payment proof attached
                                </div>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(order.status)}
                            <select
                              value={order.status}
                              onChange={(e) => handleStatusUpdate(order.id, e.target.value as Order['status'])}
                              className={`text-xs font-medium rounded-full px-2 py-1 border-0 focus:ring-2 focus:ring-blue-500 ${getStatusColor(order.status)}`}
                            >
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="processing">Processing</option>
                              <option value="shipped">Shipped</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setSelectedOrder(order)}
                              className="text-blue-600 hover:text-blue-900 transition-colors p-1 rounded hover:bg-blue-50"
                              title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                            {order.status === 'pending' && (
                              <button
                                onClick={() => handleStatusUpdate(order.id, 'confirmed')}
                                className="text-green-600 hover:text-green-900 transition-colors p-1 rounded hover:bg-green-50"
                                title="Confirm Order"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </button>
                            )}
                            {order.status !== 'cancelled' && order.status !== 'delivered' && (
                              <button
                                onClick={() => handleStatusUpdate(order.id, 'cancelled')}
                                className="text-red-600 hover:text-red-900 transition-colors p-1 rounded hover:bg-red-50"
                                title="Cancel Order"
                              >
                                <XCircle className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {filteredOrders.length === 0 && (
                <div className="text-center py-12">
                  <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No orders found</p>
                </div>
              )}
            </div>
          </>
        ) : (
          <ProductManagement />
        )}

        {/* Order Detail Modal */}
        <AnimatePresence>
          {selectedOrder && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4"
              onClick={() => setSelectedOrder(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">Order Details</h2>
                      <p className="text-gray-600">{selectedOrder.id}</p>
                    </div>
                    <button
                      onClick={() => setSelectedOrder(null)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <XCircle className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="space-y-6">
                    {/* Customer Info */}
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Customer Information</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p><strong>Name:</strong> {selectedOrder.customerInfo.name || 'N/A'}</p>
                        <p><strong>Email:</strong> {selectedOrder.customerInfo.email || 'N/A'}</p>
                        <p><strong>Phone:</strong> {selectedOrder.customerInfo.phone || 'N/A'}</p>
                      </div>
                    </div>

                    {/* Shipping Address */}
                    {selectedOrder.customerInfo.shippingAddress && (
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          Shipping Address
                        </h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p>{selectedOrder.customerInfo.shippingAddress.addressLine1}</p>
                          {selectedOrder.customerInfo.shippingAddress.addressLine2 && (
                            <p>{selectedOrder.customerInfo.shippingAddress.addressLine2}</p>
                          )}
                          <p>
                            {selectedOrder.customerInfo.shippingAddress.city}, {selectedOrder.customerInfo.shippingAddress.state} {selectedOrder.customerInfo.shippingAddress.zipCode}
                          </p>
                          <p>{selectedOrder.customerInfo.shippingAddress.country}</p>
                        </div>
                      </div>
                    )}

                    {/* Payment Information */}
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Payment Information</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p><strong>Method:</strong> {selectedOrder.paymentMethod.toUpperCase()}</p>
                            {selectedOrder.paymentReference && (
                              <p><strong>Reference:</strong> {selectedOrder.paymentReference}</p>
                            )}
                            <p><strong>Status:</strong> 
                              <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedOrder.status)}`}>
                                {selectedOrder.status}
                              </span>
                            </p>
                          </div>
                          
                          {/* Payment Proof Image */}
                          {selectedOrder.paymentProofImage && (
                            <div>
                              <p className="font-medium mb-2">Payment Proof:</p>
                              <div className="border rounded-lg overflow-hidden">
                                <img
                                  src={selectedOrder.paymentProofImage}
                                  alt="Payment proof"
                                  className="w-full h-48 object-contain bg-gray-100"
                                />
                              </div>
                              <p className="text-xs text-gray-500 mt-1">
                                Click to view full size
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Order Items</h3>
                      <div className="space-y-3">
                        {selectedOrder.items.map((item) => (
                          <div key={item.id} className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium">{item.name}</h4>
                              <p className="text-sm text-gray-600">{item.category}</p>
                              <p className="text-sm">Quantity: {item.quantity}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">
                                ₡{(parseFloat(item.price.replace('₡', '').replace(',', '')) * item.quantity).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Order Summary */}
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Order Summary</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span>Order Date:</span>
                          <span>{selectedOrder.createdAt.toLocaleString()}</span>
                        </div>
                        <div className="border-t pt-2 mt-2">
                          <div className="flex justify-between items-center font-bold text-lg">
                            <span>Total:</span>
                            <span>₡{selectedOrder.total.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {selectedOrder.notes && (
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">Notes</h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p>{selectedOrder.notes}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminPanel;