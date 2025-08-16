import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import PaymentModal from './PaymentModal';

const CartSidebar: React.FC = () => {
  const { state, dispatch } = useCart();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  useEffect(() => {
    if (state.isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [state.isOpen]);

  const updateQuantity = (id: number, size: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, size, quantity } });
  };

  const removeItem = (id: number, size: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id, size } });
  };

  const closeCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };

  const handleCheckout = () => {
    setIsPaymentModalOpen(true);
  };

  return (
    <>
      <AnimatePresence>
        {state.isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm"
              onClick={closeCart}
            />
            
            {/* Sidebar */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-warm">
                <div className="flex items-center space-x-3">
                  <ShoppingBag className="w-6 h-6 text-primary" />
                  <h2 className="font-serif text-xl font-bold text-primary">
                    Shopping Bag ({state.items.length})
                  </h2>
                </div>
                <button
                  onClick={closeCart}
                  className="p-2 text-stone hover:text-primary transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto">
                {state.items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                    <ShoppingBag className="w-16 h-16 text-stone mb-4" />
                    <h3 className="font-medium text-primary mb-2">Your bag is empty</h3>
                    <p className="text-stone text-sm mb-6">Add some items to get started</p>
                    <button
                      onClick={closeCart}
                      className="btn-primary"
                    >
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  <div className="p-6 space-y-6">
                    {state.items.map((item) => (
                      <motion.div
                        key={`${item.id}-${item.size}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex space-x-4 pb-6 border-b border-warm last:border-b-0"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <div className="flex-1 space-y-2">
                          <h4 className="font-medium text-primary text-sm">{item.name}</h4>
                          <p className="text-xs text-stone uppercase tracking-wider">{item.category}</p>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-stone">Size:</span>
                            <span className="text-xs font-medium text-primary bg-cream px-2 py-1 rounded">
                              {item.size}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <button
                                onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                                className="w-8 h-8 border border-stone rounded-full flex items-center justify-center hover:border-primary transition-colors"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="font-medium text-primary">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                                className="w-8 h-8 border border-stone rounded-full flex items-center justify-center hover:border-primary transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                            <button
                              onClick={() => removeItem(item.id, item.size)}
                              className="p-2 text-stone hover:text-red-600 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-serif text-lg font-medium text-primary">
                            ₡{(parseFloat(item.price.replace('₡', '').replace(',', '')) * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {state.items.length > 0 && (
                <div className="border-t border-warm p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-primary">Total:</span>
                    <span className="font-serif text-xl font-bold text-primary">
                      ₡{state.total.toLocaleString()}
                    </span>
                  </div>
                  <div className="space-y-3">
                    <button 
                      onClick={handleCheckout}
                      className="w-full btn-primary"
                    >
                      Checkout
                    </button>
                    <button
                      onClick={closeCart}
                      className="w-full btn-secondary"
                    >
                      Continue Shopping
                    </button>
                  </div>
                  <p className="text-xs text-stone text-center">
                    Free shipping on orders over ₡65,000
                  </p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        total={state.total}
        items={state.items}
      />
    </>
  );
};

export default CartSidebar;