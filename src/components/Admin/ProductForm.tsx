import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Upload, Image as ImageIcon, Save, Loader } from 'lucide-react';
import { useProducts, Product, StockBySize } from '../../contexts/ProductContext';

interface ProductFormProps {
  product?: Product | null;
  onClose: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onClose }) => {
  const { createProduct, updateProduct } = useProducts();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    original_price: '',
    description: '',
    categories: [] as string[],
    primary_image: '',
    secondary_image: '',
    is_new: false,
    is_sale: false,
    is_limited_edition: false,
    is_exclusive: false,
    stock_by_size: {} as StockBySize,
  });

  const availableCategories = [
    'T-Shirts', 'Hoodies', 'Outerwear', 'Bottoms', 'Dresses', 
    'Fútbol', 'Footwear', 'Accessories', 'Knitwear',
    'New Arrivals', 'Men', 'Women', 'Costa Rica', 'Tico'
  ];

  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price.toString(),
        original_price: product.original_price?.toString() || '',
        description: product.description || '',
        categories: product.categories || [],
        primary_image: product.primary_image,
        secondary_image: product.secondary_image || '',
        is_new: product.is_new,
        is_sale: product.is_sale,
        is_limited_edition: product.is_limited_edition,
        is_exclusive: product.is_exclusive,
        stock_by_size: product.stock_by_size || {},
      });
    } else {
      // Initialize with default sizes for new products
      const defaultStock: StockBySize = {};
      availableSizes.forEach(size => {
        defaultStock[size] = 0;
      });
      setFormData(prev => ({ ...prev, stock_by_size: defaultStock }));
    }
  }, [product]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleStockChange = (size: string, value: string) => {
    const stockValue = parseInt(value) || 0;
    setFormData(prev => ({
      ...prev,
      stock_by_size: {
        ...prev.stock_by_size,
        [size]: stockValue
      }
    }));
  };

  const handleCategoryToggle = (category: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(cat => cat !== category)
        : [...prev.categories, category]
    }));
  };

  const handleImageUpload = (field: 'primary_image' | 'secondary_image') => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
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
      reader.onload = (event) => {
        const base64String = event.target?.result as string;
        setFormData(prev => ({ ...prev, [field]: base64String }));
      };
      reader.readAsDataURL(file);
    }
  };

  const getTotalStock = () => {
    return Object.values(formData.stock_by_size).reduce((total, stock) => total + stock, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (formData.categories.length === 0) {
        alert('Please select at least one category');
        setLoading(false);
        return;
      }

      const productData = {
        name: formData.name,
        price: parseFloat(formData.price),
        original_price: formData.original_price ? parseFloat(formData.original_price) : null,
        description: formData.description || null,
        categories: formData.categories,
        primary_image: formData.primary_image,
        secondary_image: formData.secondary_image || null,
        is_new: formData.is_new,
        is_sale: formData.is_sale,
        is_limited_edition: formData.is_limited_edition,
        is_exclusive: formData.is_exclusive,
        stock_by_size: formData.stock_by_size,
      };

      let success = false;
      if (product) {
        success = await updateProduct(product.id, productData);
      } else {
        success = await createProduct(productData);
      }

      if (success) {
        onClose();
      }
    } catch (error) {
      console.error('Error saving product:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">
            {product ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter product name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price (₡) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Original Price (₡)
                  </label>
                  <input
                    type="number"
                    name="original_price"
                    value={formData.original_price}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter product description"
                />
              </div>

              {/* Product Attributes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Product Attributes
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="is_new"
                      checked={formData.is_new}
                      onChange={handleInputChange}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="ml-2 text-sm text-gray-700">New Product</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="is_sale"
                      checked={formData.is_sale}
                      onChange={handleInputChange}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="ml-2 text-sm text-gray-700">On Sale</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="is_limited_edition"
                      checked={formData.is_limited_edition}
                      onChange={handleInputChange}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="ml-2 text-sm text-gray-700">Limited Edition</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="is_exclusive"
                      checked={formData.is_exclusive}
                      onChange={handleInputChange}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="ml-2 text-sm text-gray-700">Exclusive</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Product Images</h3>
              
              {/* Primary Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Image *
                </label>
                <div className="space-y-2">
                  <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload('primary_image')}
                      className="hidden"
                    />
                    <div className="text-center">
                      <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                      <span className="text-sm text-gray-500">Upload primary image</span>
                    </div>
                  </label>
                  {formData.primary_image && (
                    <img
                      src={formData.primary_image}
                      alt="Primary"
                      className="w-full h-32 object-cover rounded border"
                    />
                  )}
                </div>
              </div>

              {/* Secondary Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Secondary Image
                </label>
                <div className="space-y-2">
                  <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload('secondary_image')}
                      className="hidden"
                    />
                    <div className="text-center">
                      <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                      <span className="text-sm text-gray-500">Upload secondary image</span>
                    </div>
                  </label>
                  {formData.secondary_image && (
                    <img
                      src={formData.secondary_image}
                      alt="Secondary"
                      className="w-full h-32 object-cover rounded border"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Stock by Size */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Stock by Size</h3>
              <p className="text-sm text-gray-600">Set the quantity available for each size</p>
              
              <div className="space-y-3">
                {availableSizes.map(size => (
                  <div key={size} className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700 w-12">
                      {size}:
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.stock_by_size[size] || 0}
                      onChange={(e) => handleStockChange(size, e.target.value)}
                      className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-center"
                      placeholder="0"
                    />
                  </div>
                ))}
              </div>

              {/* Total Stock Display */}
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-blue-800">Total Stock:</span>
                  <span className="text-lg font-bold text-blue-900">{getTotalStock()}</span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    const stockValue = prompt('Enter stock quantity for all sizes:');
                    if (stockValue) {
                      const value = parseInt(stockValue) || 0;
                      const newStock: StockBySize = {};
                      availableSizes.forEach(size => {
                        newStock[size] = value;
                      });
                      setFormData(prev => ({ ...prev, stock_by_size: newStock }));
                    }
                  }}
                  className="w-full px-3 py-2 text-xs bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Set Same for All Sizes
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const newStock: StockBySize = {};
                    availableSizes.forEach(size => {
                      newStock[size] = 0;
                    });
                    setFormData(prev => ({ ...prev, stock_by_size: newStock }));
                  }}
                  className="w-full px-3 py-2 text-xs bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                >
                  Clear All Stock
                </button>
              </div>
            </div>
          </div>

          {/* Categories Section */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Categories *</h3>
            <p className="text-sm text-gray-600 mb-4">Select all categories where this product should appear</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {availableCategories.map(category => (
                <label key={category} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.categories.includes(category)}
                    onChange={() => handleCategoryToggle(category)}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="ml-2 text-sm text-gray-700">{category}</span>
                </label>
              ))}
            </div>
            {formData.categories.length > 0 && (
              <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Selected categories:</strong> {formData.categories.join(', ')}
                </p>
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center space-x-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>{product ? 'Update Product' : 'Create Product'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ProductForm;