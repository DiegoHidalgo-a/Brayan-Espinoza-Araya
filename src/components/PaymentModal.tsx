import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Smartphone, Copy, Check, ExternalLink, Upload, Image } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useOrders, ShippingAddress } from '../contexts/OrderContext';
import PayPalButton from './PayPalButton';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  total: number;
  items: Array<{
    id: number;
    name: string;
    price: string;
    quantity: number;
    image: string;
    category: string;
  }>;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, total, items }) => {
  const [selectedMethod, setSelectedMethod] = useState<'sinpe' | 'paypal' | null>(null);
  const [copied, setCopied] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'select' | 'processing' | 'success'>('select');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Costa Rica'
  });
  const [paymentProofImage, setPaymentProofImage] = useState<string>('');
  const [paymentReference, setPaymentReference] = useState<string>('');

  const { dispatch: cartDispatch } = useCart();
  const { createOrder } = useOrders();

  const sinpeNumber = '+506 85489448';

  // Convert colones to USD for PayPal (approximate rate: 1 USD = 650 CRC)
  const totalUSD = (total / 650).toFixed(2);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size must be less than 5MB');
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = e.target?.result as string;
        setPaymentProofImage(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    if (!customerInfo.email) {
      alert('Please provide an email address');
      return false;
    }
    if (!shippingAddress.addressLine1 || !shippingAddress.city || !shippingAddress.state || !shippingAddress.zipCode) {
      alert('Please fill in all required shipping address fields');
      return false;
    }
    if (selectedMethod === 'sinpe' && !paymentProofImage) {
      alert('Please upload a payment proof image for SINPE payment');
      return false;
    }
    if (selectedMethod === 'paypal' && !paymentReference) {
      alert('Please provide a PayPal transaction reference');
      return false;
    }
    return true;
  };

  const handleSinpePayment = () => {
    if (!validateForm()) return;

    setPaymentStep('processing');
    
    // Create order
    setTimeout(() => {
      createOrder({
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
          category: item.category
        })),
        total,
        customerInfo: {
          ...customerInfo,
          shippingAddress
        },
        paymentMethod: 'sinpe',
        status: 'pending',
        paymentProofImage,
        paymentReference: `SINPE-${Date.now()}`
      });

      setPaymentStep('success');
      
      // Clear cart after successful order
      setTimeout(() => {
        cartDispatch({ type: 'CLEAR_CART' });
      }, 1000);
    }, 2000);
  };

  const handlePayPalSuccess = (details: any) => {
    if (!validateForm()) return;

    setPaymentStep('processing');
    
    setTimeout(() => {
      createOrder({
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
          category: item.category
        })),
        total,
        customerInfo: {
          ...customerInfo,
          shippingAddress
        },
        paymentMethod: 'paypal',
        status: 'confirmed',
        paymentReference
      });

      setPaymentStep('success');
      
      // Clear cart after successful order
      setTimeout(() => {
        cartDispatch({ type: 'CLEAR_CART' });
      }, 1000);
    }, 1000);
  };

  const resetModal = () => {
    setSelectedMethod(null);
    setPaymentStep('select');
    setCopied(false);
    setPaymentProofImage('');
    setPaymentReference('');
    setCustomerInfo({ name: '', email: '', phone: '' });
    setShippingAddress({
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'Costa Rica'
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={resetModal}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-lg shadow-2xl w-full max-w-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-warm">
            <h2 className="font-serif text-xl font-bold text-primary">
              {paymentStep === 'select' && 'Checkout'}
              {paymentStep === 'processing' && 'Processing Payment'}
              {paymentStep === 'success' && 'Payment Successful'}
            </h2>
            <button
              onClick={resetModal}
              className="p-2 text-stone hover:text-primary transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {paymentStep === 'select' && (
              <>
                {/* Customer Information */}
                <div className="mb-6">
                  <h3 className="font-medium text-primary mb-3">Customer Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <input
                      type="email"
                      placeholder="Email Address *"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent md:col-span-2"
                    />
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="mb-6">
                  <h3 className="font-medium text-primary mb-3">Shipping Address</h3>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Address Line 1 *"
                      value={shippingAddress.addressLine1}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, addressLine1: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Address Line 2 (Optional)"
                      value={shippingAddress.addressLine2}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, addressLine2: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="City *"
                        value={shippingAddress.city}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                      />
                      <input
                        type="text"
                        placeholder="State/Province *"
                        value={shippingAddress.state}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="ZIP/Postal Code *"
                        value={shippingAddress.zipCode}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, zipCode: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                      />
                      <select
                        value={shippingAddress.country}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="Costa Rica">Costa Rica</option>
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="Mexico">Mexico</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="mb-6 p-4 bg-cream rounded-lg">
                  <h3 className="font-medium text-primary mb-3">Order Summary</h3>
                  <div className="space-y-2 text-sm">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between">
                        <span className="text-stone">
                          {item.name} x{item.quantity}
                        </span>
                        <span className="text-primary">
                          ₡{(parseFloat(item.price.replace('₡', '').replace(',', '')) * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                    <div className="border-t border-warm pt-2 flex justify-between font-medium">
                      <span>Total</span>
                      <span className="font-serif text-lg">₡{total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="space-y-3">
                  {/* SINPE Móvil */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedMethod('sinpe')}
                    className={`w-full p-4 border-2 rounded-lg transition-all duration-300 flex items-center space-x-4 ${
                      selectedMethod === 'sinpe'
                        ? 'border-primary bg-primary text-white'
                        : 'border-warm hover:border-primary'
                    }`}
                  >
                    <div className={`p-2 rounded-full ${
                      selectedMethod === 'sinpe' ? 'bg-white/20' : 'bg-primary'
                    }`}>
                      <Smartphone className={`w-5 h-5 ${
                        selectedMethod === 'sinpe' ? 'text-white' : 'text-white'
                      }`} />
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="font-medium">SINPE Móvil</h4>
                      <p className={`text-sm ${
                        selectedMethod === 'sinpe' ? 'text-white/80' : 'text-stone'
                      }`}>
                        Pago instantáneo desde tu banco
                      </p>
                    </div>
                    <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      Costa Rica
                    </div>
                  </motion.button>

                  {/* PayPal */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedMethod('paypal')}
                    className={`w-full p-4 border-2 rounded-lg transition-all duration-300 flex items-center space-x-4 ${
                      selectedMethod === 'paypal'
                        ? 'border-blue-600 bg-blue-600 text-white'
                        : 'border-warm hover:border-blue-600'
                    }`}
                  >
                    <div className={`p-2 rounded-full ${
                      selectedMethod === 'paypal' ? 'bg-white/20' : 'bg-blue-600'
                    }`}>
                      <CreditCard className={`w-5 h-5 text-white`} />
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="font-medium">PayPal</h4>
                      <p className={`text-sm ${
                        selectedMethod === 'paypal' ? 'text-white/80' : 'text-stone'
                      }`}>
                        Secure international payments
                      </p>
                    </div>
                    <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      Global
                    </div>
                  </motion.button>
                </div>

                {/* Payment Details */}
                <AnimatePresence>
                  {selectedMethod === 'sinpe' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg"
                    >
                      <h4 className="font-medium text-green-800 mb-3">
                        Instrucciones SINPE Móvil
                      </h4>
                      <div className="space-y-3 text-sm text-green-700">
                        <div>
                          <p className="font-medium mb-1">1. Número de teléfono:</p>
                          <div className="flex items-center space-x-2 bg-white p-2 rounded border">
                            <span className="font-mono">{sinpeNumber}</span>
                            <button
                              onClick={() => copyToClipboard(sinpeNumber)}
                              className="p-1 hover:bg-green-100 rounded transition-colors"
                            >
                              {copied ? (
                                <Check className="w-4 h-4 text-green-600" />
                              ) : (
                                <Copy className="w-4 h-4 text-green-600" />
                              )}
                            </button>
                          </div>
                        </div>
                        <div>
                          <p className="font-medium mb-1">2. Monto a transferir:</p>
                          <div className="bg-white p-2 rounded border font-mono text-lg">
                            ₡{total.toLocaleString()}
                          </div>
                        </div>
                        <div>
                          <p className="font-medium">3. Concepto:</p>
                          <p>Brayan Espinoza - Pedido #{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                        </div>
                        
                        {/* Payment Proof Upload */}
                        <div>
                          <p className="font-medium mb-2">4. Comprobante de pago *</p>
                          <div className="space-y-2">
                            <label className="flex items-center justify-center w-full p-4 border-2 border-dashed border-green-300 rounded-lg cursor-pointer hover:border-green-400 transition-colors">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                              />
                              <div className="text-center">
                                <Upload className="w-6 h-6 text-green-600 mx-auto mb-2" />
                                <span className="text-sm text-green-700">
                                  {paymentProofImage ? 'Imagen cargada ✓' : 'Subir captura de pantalla del SINPE'}
                                </span>
                              </div>
                            </label>
                            {paymentProofImage && (
                              <div className="mt-2">
                                <img
                                  src={paymentProofImage}
                                  alt="Payment proof"
                                  className="w-full max-w-xs h-32 object-cover rounded border"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={handleSinpePayment}
                        disabled={!paymentProofImage}
                        className="w-full mt-4 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Confirmar Pago SINPE
                      </button>
                    </motion.div>
                  )}

                  {selectedMethod === 'paypal' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg"
                    >
                      <h4 className="font-medium text-blue-800 mb-3">
                        PayPal Payment
                      </h4>
                      <p className="text-sm text-blue-700 mb-4">
                        Secure payment of ${totalUSD} USD (₡{total.toLocaleString()}).
                      </p>
                      {/* PayPalButton solo si los campos requeridos están completos */}
                      {customerInfo.email && shippingAddress.addressLine1 ? (
                        <div className="bg-white p-4 rounded border">
                          <p className="text-sm text-gray-600 mb-2">Paga con PayPal de forma segura:</p>
                          <PayPalButton />
                        </div>
                      ) : (
                        <div className="text-center py-4">
                          <p className="text-red-600 text-sm mb-2">Please fill in all required fields to continue with PayPal</p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}

            {paymentStep === 'processing' && (
              <div className="text-center py-8">
                <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                <h3 className="font-medium text-primary mb-2">Processing Payment</h3>
                <p className="text-stone text-sm">
                  {selectedMethod === 'sinpe' 
                    ? 'Verificando transferencia SINPE...' 
                    : 'Processing PayPal payment...'}
                </p>
              </div>
            )}

            {paymentStep === 'success' && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-medium text-primary mb-2">Order Created Successfully!</h3>
                <p className="text-stone text-sm mb-6">
                  Your order has been received and will be processed once payment is verified. You will receive updates via email.
                </p>
                <button
                  onClick={resetModal}
                  className="btn-primary w-full"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PaymentModal;