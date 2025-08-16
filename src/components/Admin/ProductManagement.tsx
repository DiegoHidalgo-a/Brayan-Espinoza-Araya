import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Search, 
  Filter,
  Package,
  Eye,
  Star,
  AlertCircle,
  Download,
  Upload
} from 'lucide-react';
import { useProducts, Product } from '../../contexts/ProductContext';
import ProductForm from './ProductForm';

const ProductManagement: React.FC = () => {
  const { state, deleteProduct, exportToExcel, importFromExcel, getTotalStock } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  // Get all unique categories from products
  const allCategories = ['all', ...Array.from(new Set(state.products.flatMap(product => product.categories)))];

  const filteredProducts = state.products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.categories.some(cat => cat.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === 'all' || product.categories.includes(categoryFilter);
    return matchesSearch && matchesCategory;
  });

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (productId: string) => {
    const success = await deleteProduct(productId);
    if (success) {
      setShowDeleteConfirm(null);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      importFromExcel(file).then(success => {
        if (success) {
          alert('Products imported successfully!');
        } else {
          alert('Failed to import products. Please check the file format.');
        }
      });
    }
  };

  const getProductBadges = (product: Product) => {
    const badges = [];
    if (product.is_new) badges.push({ text: 'New', color: 'bg-blue-100 text-blue-800' });
    if (product.is_sale) badges.push({ text: 'Sale', color: 'bg-red-100 text-red-800' });
    if (product.is_limited_edition) badges.push({ text: 'Limited', color: 'bg-purple-100 text-purple-800' });
    if (product.is_exclusive) badges.push({ text: 'Exclusive', color: 'bg-pink-100 text-pink-800' });
    return badges;
  };

  const getStockSummary = (product: Product) => {
    const totalStock = getTotalStock(product);
    const availableSizes = Object.entries(product.stock_by_size)
      .filter(([_, stock]) => stock > 0)
      .map(([size, _]) => size);
    
    return {
      total: totalStock,
      sizes: availableSizes,
      isLowStock: totalStock < 10
    };
  };

  if (state.loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Product Management</h2>
          <p className="text-gray-600">Manage your product catalog with size-specific stock and Excel integration</p>
        </div>
        <div className="flex space-x-3">
          <div className="relative">
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleImport}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <Upload className="w-4 h-4" />
              <span>Import Excel</span>
            </button>
          </div>
          <button
            onClick={exportToExcel}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export Excel</span>
          </button>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </button>
          <button
            onClick={() => {
              setEditingProduct({
                id: '',
                name: '',
                price: 0,
                categories: ['Costa Rica'],
                primary_image: '',
                is_new: false,
                is_sale: false,
                is_limited_edition: false,
                is_exclusive: true,
                stock_by_size: {},
                created_at: '',
                updated_at: ''
              });
              setShowForm(true);
            }}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Costa Rica Product</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Products</p>
              <p className="text-2xl font-bold text-gray-900">{state.products.length}</p>
            </div>
            <Package className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">New Products</p>
              <p className="text-2xl font-bold text-blue-600">
                {state.products.filter(p => p.is_new).length}
              </p>
            </div>
            <Star className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">On Sale</p>
              <p className="text-2xl font-bold text-red-600">
                {state.products.filter(p => p.is_sale).length}
              </p>
            </div>
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Low Stock</p>
              <p className="text-2xl font-bold text-yellow-600">
                {state.products.filter(p => getTotalStock(p) < 10).length}
              </p>
            </div>
            <Package className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Costa Rica</p>
              <p className="text-2xl font-bold text-green-600">
                {state.products.filter(p => 
                  p.categories.includes('Costa Rica') || 
                  p.categories.includes('Tico')
                ).length}
              </p>
            </div>
            <Star className="w-8 h-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 border">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {allCategories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => {
          const stockInfo = getStockSummary(product);
          
          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative">
                <img
                  src={product.primary_image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                
                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                  {getProductBadges(product).map((badge, index) => (
                    <span
                      key={index}
                      className={`px-2 py-1 text-xs font-medium rounded-full ${badge.color}`}
                    >
                      {badge.text}
                    </span>
                  ))}
                </div>
                {stockInfo.isLowStock && (
                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                      Low Stock
                    </span>
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <div className="mb-2">
                  <h3 className="font-medium text-gray-900 truncate">{product.name}</h3>
                  <p className="text-xs text-gray-500">{product.categories.join(', ')}</p>
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-primary">₡{product.price.toFixed(2)}</span>
                    {product.original_price && (
                      <span className="text-sm text-gray-500 line-through">
                        ₡{product.original_price.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Stock Information */}
                <div className="mb-3 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">Total Stock:</span>
                    <span className="text-sm font-medium text-gray-900">{stockInfo.total}</span>
                  </div>
                  {stockInfo.sizes.length > 0 ? (
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-600">Available:</span>
                      <span className="text-xs text-gray-700">{stockInfo.sizes.join(', ')}</span>
                    </div>
                  ) : (
                    <div className="text-xs text-red-600">Out of Stock</div>
                  )}
                </div>

                {/* Size Stock Breakdown */}
                <div className="mb-3 p-2 bg-gray-50 rounded text-xs">
                  <div className="grid grid-cols-3 gap-1">
                    {Object.entries(product.stock_by_size).map(([size, stock]) => (
                      <div key={size} className="flex justify-between">
                        <span className="text-gray-600">{size}:</span>
                        <span className={stock > 0 ? 'text-gray-900' : 'text-gray-400'}>{stock}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 text-sm border border-primary text-primary hover:bg-primary hover:text-white transition-colors rounded"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(product.id)}
                    className="flex items-center justify-center px-3 py-2 text-sm border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-colors rounded"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No products found</p>
        </div>
      )}

      {/* Product Form Modal */}
      <AnimatePresence>
        {showForm && (
          <ProductForm
            product={editingProduct}
            onClose={handleCloseForm}
          />
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4"
            onClick={() => setShowDeleteConfirm(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <Trash2 className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Delete Product</h3>
                  <p className="text-sm text-gray-500">This action cannot be undone</p>
                </div>
              </div>
              
              <p className="text-gray-700 mb-6">
                Are you sure you want to delete this product? This will permanently remove it from your catalog.
              </p>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(showDeleteConfirm)}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductManagement;