import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { useProducts } from './ProductContext';
import * as XLSX from 'xlsx';

export interface OrderItem {
  id: number;
  name: string;
  price: string;
  quantity: number;
  image: string;
  category: string;
  size: string; // Added size property
}

export interface ShippingAddress {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  customerInfo: {
    email?: string;
    phone?: string;
    name?: string;
    shippingAddress?: ShippingAddress;
  };
  paymentMethod: 'sinpe' | 'paypal';
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
  trackingNumber?: string;
  notes?: string;
  paymentProofImage?: string;
  paymentReference?: string;
}

interface OrderState {
  orders: Order[];
  currentOrder: Order | null;
  notifications: OrderNotification[];
  loading: boolean;
  error: string | null;
}

interface OrderNotification {
  id: string;
  orderId: string;
  type: 'new_order' | 'payment_confirmed' | 'status_update';
  message: string;
  timestamp: Date;
  read: boolean;
}

type OrderAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_ORDERS'; payload: Order[] }
  | { type: 'ADD_ORDER'; payload: Order }
  | { type: 'UPDATE_ORDER'; payload: Order }
  | { type: 'ADD_NOTIFICATION'; payload: Omit<OrderNotification, 'id' | 'timestamp'> }
  | { type: 'MARK_NOTIFICATION_READ'; payload: string }
  | { type: 'CLEAR_NOTIFICATIONS' }
  | { type: 'SET_CURRENT_ORDER'; payload: Order | null };

const initialState: OrderState = {
  orders: [],
  currentOrder: null,
  notifications: [],
  loading: false,
  error: null,
};

const orderReducer = (state: OrderState, action: OrderAction): OrderState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    
    case 'SET_ORDERS':
      return { ...state, orders: action.payload };
    
    case 'ADD_ORDER':
      return { ...state, orders: [action.payload, ...state.orders] };
    
    case 'UPDATE_ORDER':
      return {
        ...state,
        orders: state.orders.map(order =>
          order.id === action.payload.id ? action.payload : order
        ),
      };
    
    case 'ADD_NOTIFICATION': {
      const notification: OrderNotification = {
        ...action.payload,
        id: `NOT-${Date.now()}`,
        timestamp: new Date(),
      };

      return {
        ...state,
        notifications: [notification, ...state.notifications],
      };
    }

    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map(notification =>
          notification.id === action.payload
            ? { ...notification, read: true }
            : notification
        ),
      };

    case 'CLEAR_NOTIFICATIONS':
      return { ...state, notifications: [] };

    case 'SET_CURRENT_ORDER':
      return { ...state, currentOrder: action.payload };

    default:
      return state;
  }
};

const OrderContext = createContext<{
  state: OrderState;
  dispatch: React.Dispatch<OrderAction>;
  createOrder: (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => Promise<boolean>;
  updateOrderStatus: (orderId: string, status: Order['status'], notes?: string) => Promise<boolean>;
  fetchOrders: () => Promise<void>;
  getOrderById: (orderId: string) => Order | undefined;
  getUnreadNotifications: () => OrderNotification[];
  requestNotificationPermission: () => void;
  exportOrdersToExcel: () => void;
  importOrdersFromExcel: (file: File) => Promise<boolean>;
} | null>(null);

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(orderReducer, initialState);
  const { adjustProductStock } = useProducts();

  const saveOrders = (orders: Order[]) => {
    const ordersToSave = orders.map(order => ({
      ...order,
      createdAt: order.createdAt.toISOString(),
      updatedAt: order.updatedAt.toISOString(),
    }));
    localStorage.setItem('fortysix_orders', JSON.stringify(ordersToSave));
  };

  const fetchOrders = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      const savedOrders = localStorage.getItem('fortysix_orders');
      let orders: Order[] = [];
      
      if (savedOrders) {
        const parsedOrders = JSON.parse(savedOrders);
        orders = parsedOrders.map((order: any) => ({
          ...order,
          createdAt: new Date(order.createdAt),
          updatedAt: new Date(order.updatedAt),
        }));
      }

      dispatch({ type: 'SET_ORDERS', payload: orders });
    } catch (error) {
      console.error('Error fetching orders:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch orders' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const createOrder = async (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<boolean> => {
    try {
      const newOrder: Order = {
        ...orderData,
        id: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const updatedOrders = [newOrder, ...state.orders];
      saveOrders(updatedOrders);

      dispatch({ type: 'ADD_ORDER', payload: newOrder });
      dispatch({ type: 'SET_CURRENT_ORDER', payload: newOrder });

      // Deduct stock for each item in the order (with size)
      for (const item of newOrder.items) {
        await adjustProductStock(item.id.toString(), item.size, -item.quantity);
      }

      // Add notification
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          orderId: newOrder.id,
          type: 'new_order',
          message: `New order received: ${newOrder.id} - ₡${newOrder.total.toLocaleString()}`,
          read: false,
        },
      });

      // Show browser notification if permission granted
      if (Notification.permission === 'granted') {
        new Notification('New Order Received!', {
          body: `Order ${newOrder.id} - ₡${newOrder.total.toLocaleString()}`,
          icon: '/vite.svg',
        });
      }

      return true;
    } catch (error) {
      console.error('Error creating order:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to create order' });
      return false;
    }
  };

  const updateOrderStatus = async (orderId: string, status: Order['status'], notes?: string): Promise<boolean> => {
    try {
      const orderToUpdate = state.orders.find(order => order.id === orderId);
      if (!orderToUpdate) {
        throw new Error('Order not found');
      }

      const oldStatus = orderToUpdate.status;

      // If order is being cancelled and wasn't already cancelled, return stock
      if (status === 'cancelled' && oldStatus !== 'cancelled') {
        for (const item of orderToUpdate.items) {
          await adjustProductStock(item.id.toString(), item.size, item.quantity);
        }
      }

      const updatedOrders = state.orders.map(order =>
        order.id === orderId
          ? {
              ...order,
              status,
              notes: notes || order.notes,
              updatedAt: new Date(),
            }
          : order
      );

      saveOrders(updatedOrders);
      
      const updatedOrder = updatedOrders.find(o => o.id === orderId);
      if (updatedOrder) {
        dispatch({ type: 'UPDATE_ORDER', payload: updatedOrder });
      }

      // Add notification
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          orderId,
          type: 'status_update',
          message: `Order ${orderId} status updated to: ${status}`,
          read: false,
        },
      });

      return true;
    } catch (error) {
      console.error('Error updating order status:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to update order status' });
      return false;
    }
  };

  const getOrderById = (orderId: string) => {
    return state.orders.find(order => order.id === orderId);
  };

  const getUnreadNotifications = () => {
    return state.notifications.filter(notification => !notification.read);
  };

  const requestNotificationPermission = () => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  };

  const exportOrdersToExcel = () => {
    const ordersForExport = state.orders.map(order => ({
      'Order ID': order.id,
      'Date': order.createdAt.toLocaleDateString(),
      'Customer Name': order.customerInfo.name || 'N/A',
      'Customer Email': order.customerInfo.email || 'N/A',
      'Customer Phone': order.customerInfo.phone || 'N/A',
      'Total': order.total,
      'Payment Method': order.paymentMethod,
      'Payment Reference': order.paymentReference || 'N/A',
      'Status': order.status,
      'Items Count': order.items.length,
      'Items': order.items.map(item => `${item.name} (${item.size}) x${item.quantity}`).join(', '), // Include size
      'Shipping Address': order.customerInfo.shippingAddress 
        ? `${order.customerInfo.shippingAddress.addressLine1}, ${order.customerInfo.shippingAddress.city}, ${order.customerInfo.shippingAddress.state} ${order.customerInfo.shippingAddress.zipCode}, ${order.customerInfo.shippingAddress.country}`
        : 'N/A',
      'Notes': order.notes || 'N/A',
      'Created At': order.createdAt.toISOString(),
      'Updated At': order.updatedAt.toISOString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(ordersForExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders');
    
    // Auto-size columns
    const cols = [
      { wch: 15 }, // Order ID
      { wch: 12 }, // Date
      { wch: 20 }, // Customer Name
      { wch: 25 }, // Customer Email
      { wch: 15 }, // Customer Phone
      { wch: 10 }, // Total
      { wch: 15 }, // Payment Method
      { wch: 20 }, // Payment Reference
      { wch: 12 }, // Status
      { wch: 10 }, // Items Count
      { wch: 60 }, // Items (with sizes)
      { wch: 50 }, // Shipping Address
      { wch: 30 }, // Notes
      { wch: 20 }, // Created At
      { wch: 20 }, // Updated At
    ];
    worksheet['!cols'] = cols;
    
    XLSX.writeFile(workbook, `fortysix-orders-${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const importOrdersFromExcel = async (file: File): Promise<boolean> => {
    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet) as any[];

      // This is a simplified import - in a real scenario, you'd need more complex parsing
      console.log('Orders import data:', jsonData);
      alert('Order import functionality is available but requires careful data validation. Please contact support for assistance.');
      
      return true;
    } catch (error) {
      console.error('Error importing orders:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to import orders' });
      return false;
    }
  };

  useEffect(() => {
    fetchOrders();
    requestNotificationPermission();
  }, []);

  return (
    <OrderContext.Provider value={{
      state,
      dispatch,
      createOrder,
      updateOrderStatus,
      fetchOrders,
      getOrderById,
      getUnreadNotifications,
      requestNotificationPermission,
      exportOrdersToExcel,
      importOrdersFromExcel,
    }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};