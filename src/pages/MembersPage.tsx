import React from 'react';
import { motion } from 'framer-motion';
import { User, LogOut, Package, Heart, Settings, Crown } from 'lucide-react';

const MembersPage: React.FC = () => {
  // Mock user data
  const user = {
    name: "John Doe",
    email: "john@example.com"
  };

  // Mock orders data
  const userOrders = [
    {
      id: "ORD-12345",
      createdAt: new Date("2023-05-15"),
      items: [{}, {}],
      total: 125000,
      status: "delivered"
    },
    {
      id: "ORD-12346",
      createdAt: new Date("2023-06-20"),
      items: [{}],
      total: 75000,
      status: "shipped"
    }
  ];

  const memberBenefits = [
    {
      icon: <Package className="w-6 h-6" />,
      title: 'Order History',
      description: 'Track all your purchases and order status',
      count: userOrders.length
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Wishlist',
      description: 'Save your favorite items for later',
      count: 0
    },
    {
      icon: <Crown className="w-6 h-6" />,
      title: 'VIP Access',
      description: 'Early access to new collections and sales',
      status: 'Active'
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: 'Preferences',
      description: 'Manage your account and notification settings',
      status: 'Configured'
    }
  ];

  const logout = () => {
    console.log("User logged out");
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-blue-600 mb-4">
            Welcome Back, {user.name || 'Member'}
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Your exclusive members area. Manage your orders, preferences, and enjoy VIP benefits.
          </p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">{userOrders.length}</div>
            <div className="text-gray-600 text-sm">Total Orders</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">
              ₡{userOrders.reduce((sum, order) => sum + order.total, 0).toLocaleString()}
            </div>
            <div className="text-gray-600 text-sm">Total Spent</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">VIP</div>
            <div className="text-gray-600 text-sm">Member Status</div>
          </div>
        </motion.div>

        {/* Member Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-blue-600 mb-8 text-center">
            Member Benefits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {memberBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-blue-600 rounded-lg text-white">
                    {benefit.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-blue-600 mb-2">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{benefit.description}</p>
                    {benefit.count !== undefined && (
                      <div className="text-xs bg-gray-100 px-2 py-1 rounded text-blue-600 font-medium">
                        {benefit.count} items
                      </div>
                    )}
                    {benefit.status && (
                      <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded font-medium">
                        {benefit.status}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Orders */}
        {userOrders.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-12"
          >
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-blue-600 mb-8 text-center">
              Recent Orders
            </h2>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">
                        Items
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">
                        Total
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {userOrders.slice(0, 5).map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                          {order.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {order.createdAt.toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                          ₡{order.total.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            order.status === 'delivered' 
                              ? 'bg-green-100 text-green-800'
                              : order.status === 'shipped'
                              ? 'bg-blue-100 text-blue-800'
                              : order.status === 'processing'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded text-sm font-medium tracking-wider uppercase text-center"
          >
            Continue Shopping
          </button>
          <button
            onClick={logout}
            className="flex items-center justify-center space-x-2 px-8 py-3 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 text-sm font-medium tracking-wider uppercase"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default MembersPage;