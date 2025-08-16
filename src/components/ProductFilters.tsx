import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Filter, 
  SlidersHorizontal, 
  X, 
  Search,
  ChevronDown,
  ChevronUp,
  Star,
  Zap,
  Crown,
  Sparkles,
  Tag,
  DollarSign,
  Calendar,
  TrendingUp,
  Package,
  Eye,
  EyeOff,
  RotateCcw,
  Check
} from 'lucide-react';

export interface FilterOptions {
  priceRange: [number, number];
  categories: string[];
  sortBy: 'name' | 'price-low' | 'price-high' | 'newest' | 'popularity';
  showNew: boolean;
  showSale: boolean;
  showLimited: boolean;
  showExclusive: boolean;
  inStock: boolean;
}

interface ProductFiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  categories: string[];
  priceRange: [number, number];
  isOpen: boolean;
  onToggle: () => void;
  onClear: () => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  onFiltersChange,
  categories,
  priceRange,
  isOpen,
  onToggle,
  onClear
}) => {
  const [searchCategory, setSearchCategory] = useState('');
  const [expandedSections, setExpandedSections] = useState({
    sort: true,
    price: true,
    categories: true,
    attributes: true,
    advanced: false
  });
  const [priceInputMode, setPriceInputMode] = useState<'slider' | 'input'>('slider');
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [localPriceRange, setLocalPriceRange] = useState<[number, number]>(filters.priceRange);

  // Update local price range when filters change
  useEffect(() => {
    setLocalPriceRange(filters.priceRange);
  }, [filters.priceRange]);

  // Close panel when clicking outside or pressing escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Only close if clicking outside the entire filter area
      const target = event.target as Element;
      if (!target.closest('[data-filter-area]')) {
        if (isOpen) {
          onToggle();
        }
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onToggle();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onToggle]);

  const handlePriceChange = (index: number, value: number) => {
    const newValue = Math.max(priceRange[0], Math.min(priceRange[1], value));
    const newRange: [number, number] = [...localPriceRange];
    newRange[index] = newValue;
    
    // Ensure min doesn't exceed max and vice versa
    if (index === 0 && newRange[0] > newRange[1]) {
      newRange[1] = newRange[0];
    }
    if (index === 1 && newRange[1] < newRange[0]) {
      newRange[0] = newRange[1];
    }
    
    setLocalPriceRange(newRange);
    onFiltersChange({ ...filters, priceRange: newRange });
  };

  const handlePriceInputChange = (index: number, value: string) => {
    const numValue = parseInt(value) || (index === 0 ? priceRange[0] : priceRange[1]);
    handlePriceChange(index, numValue);
  };

  const handleCategoryToggle = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    onFiltersChange({ ...filters, categories: newCategories });
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const sortOptions = [
    { value: 'newest', label: 'Newest First', icon: <Calendar className="w-4 h-4" />, description: 'Latest arrivals' },
    { value: 'popularity', label: 'Most Popular', icon: <TrendingUp className="w-4 h-4" />, description: 'Trending items' },
    { value: 'price-low', label: 'Price: Low to High', icon: <DollarSign className="w-4 h-4" />, description: 'Budget friendly' },
    { value: 'price-high', label: 'Price: High to Low', icon: <Crown className="w-4 h-4" />, description: 'Premium first' },
    { value: 'name', label: 'Name A-Z', icon: <Package className="w-4 h-4" />, description: 'Alphabetical' }
  ];

  const attributeOptions = [
    { 
      key: 'showNew', 
      label: 'New Arrivals', 
      icon: <Sparkles className="w-4 h-4" />, 
      color: 'text-blue-600 bg-blue-50 border-blue-200',
      description: 'Fresh drops'
    },
    { 
      key: 'showSale', 
      label: 'On Sale', 
      icon: <Tag className="w-4 h-4" />, 
      color: 'text-red-600 bg-red-50 border-red-200',
      description: 'Special offers'
    },
    { 
      key: 'showLimited', 
      label: 'Limited Edition', 
      icon: <Star className="w-4 h-4" />, 
      color: 'text-purple-600 bg-purple-50 border-purple-200',
      description: 'Exclusive pieces'
    },
    { 
      key: 'showExclusive', 
      label: 'Exclusive', 
      icon: <Crown className="w-4 h-4" />, 
      color: 'text-pink-600 bg-pink-50 border-pink-200',
      description: 'VIP only'
    },
    { 
      key: 'inStock', 
      label: 'In Stock Only', 
      icon: <Package className="w-4 h-4" />, 
      color: 'text-green-600 bg-green-50 border-green-200',
      description: 'Available now'
    }
  ];

  const activeFiltersCount = 
    (filters.categories.length > 0 ? 1 : 0) +
    (filters.priceRange[0] !== priceRange[0] || filters.priceRange[1] !== priceRange[1] ? 1 : 0) +
    (filters.showNew ? 1 : 0) +
    (filters.showSale ? 1 : 0) +
    (filters.showLimited ? 1 : 0) +
    (filters.showExclusive ? 1 : 0) +
    (filters.inStock ? 1 : 0);

  const filteredCategories = categories.filter(category =>
    category.toLowerCase().includes(searchCategory.toLowerCase())
  );

  // Calculate percentage for slider visualization
  const pricePercentage = [
    ((localPriceRange[0] - priceRange[0]) / (priceRange[1] - priceRange[0])) * 100,
    ((localPriceRange[1] - priceRange[0]) / (priceRange[1] - priceRange[0])) * 100
  ];

  const handleQuickPricePreset = (min: number, max: number) => {
    const newRange: [number, number] = [
      Math.max(priceRange[0], min), 
      Math.min(priceRange[1], max)
    ];
    setLocalPriceRange(newRange);
    onFiltersChange({ ...filters, priceRange: newRange });
  };

  return (
    <div className="relative" data-filter-area>
      {/* Enhanced Filter Toggle Button */}
      <motion.button
        onClick={onToggle}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`group relative flex items-center space-x-3 px-6 py-3 rounded-xl transition-all duration-300 ${
          isOpen 
            ? 'bg-primary text-white shadow-lg' 
            : 'bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white shadow-md hover:shadow-lg'
        }`}
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <SlidersHorizontal className="w-5 h-5" />
        </motion.div>
        <span className="font-medium">Filters</span>
        
        {activeFiltersCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
              isOpen ? 'bg-white text-primary' : 'bg-primary text-white'
            }`}
          >
            {activeFiltersCount}
          </motion.div>
        )}

        {/* Pulse animation for active filters */}
        {activeFiltersCount > 0 && (
          <motion.div
            className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.button>

      {/* Advanced Filter Panel - Fixed positioning */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Enhanced Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-40"
              style={{ top: 0, left: 0, right: 0, bottom: 0 }}
            />
            
            <motion.div
              initial={{ opacity: 0, x: 100, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.95 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 overflow-hidden flex flex-col"
              data-filter-area
            >
              {/* Header with Gradient */}
              <div className="bg-gradient-to-r from-primary to-gray-800 text-white p-6 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                      <Filter className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Advanced Filters</h3>
                      <p className="text-white text-opacity-80 text-sm">Refine your search</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {activeFiltersCount > 0 && (
                      <motion.button
                        onClick={onClear}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center space-x-1 px-3 py-1 bg-white bg-opacity-20 rounded-lg text-sm hover:bg-opacity-30 transition-all"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Clear</span>
                      </motion.button>
                    )}
                    <motion.button
                      onClick={onToggle}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-all"
                    >
                      <X className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                <div className="p-6 space-y-6">
                  
                  {/* Sort Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <button
                      onClick={() => toggleSection('sort')}
                      className="flex items-center justify-between w-full mb-4 group"
                    >
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-5 h-5 text-primary" />
                        <span className="font-semibold text-primary">Sort Options</span>
                      </div>
                      <motion.div
                        animate={{ rotate: expandedSections.sort ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-primary transition-colors" />
                      </motion.div>
                    </button>
                    
                    <AnimatePresence>
                      {expandedSections.sort && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-2"
                        >
                          {sortOptions.map((option, index) => (
                            <motion.label
                              key={option.value}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                              className={`flex items-center p-3 rounded-xl cursor-pointer transition-all group hover:bg-gray-50 ${
                                filters.sortBy === option.value ? 'bg-primary bg-opacity-5 border-2 border-primary' : 'border-2 border-transparent'
                              }`}
                            >
                              <input
                                type="radio"
                                name="sortBy"
                                value={option.value}
                                checked={filters.sortBy === option.value}
                                onChange={(e) => onFiltersChange({ ...filters, sortBy: e.target.value as FilterOptions['sortBy'] })}
                                className="sr-only"
                              />
                              <div className={`p-2 rounded-lg mr-3 ${
                                filters.sortBy === option.value ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
                              }`}>
                                {option.icon}
                              </div>
                              <div className="flex-1">
                                <div className="font-medium text-gray-900">{option.label}</div>
                                <div className="text-sm text-gray-500">{option.description}</div>
                              </div>
                              {filters.sortBy === option.value && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="w-5 h-5 bg-primary rounded-full flex items-center justify-center"
                                >
                                  <Check className="w-3 h-3 text-white" />
                                </motion.div>
                              )}
                            </motion.label>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Enhanced Price Range Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <button
                      onClick={() => toggleSection('price')}
                      className="flex items-center justify-between w-full mb-4 group"
                    >
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-5 h-5 text-primary" />
                        <span className="font-semibold text-primary">Price Range</span>
                      </div>
                      <motion.div
                        animate={{ rotate: expandedSections.price ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-primary transition-colors" />
                      </motion.div>
                    </button>
                    
                    <AnimatePresence>
                      {expandedSections.price && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-4"
                        >
                          {/* Price Display */}
                          <div className="bg-gradient-to-r from-primary to-gray-800 text-white p-4 rounded-xl">
                            <div className="flex items-center justify-between">
                              <div className="text-center">
                                <div className="text-sm opacity-80">Min</div>
                                <div className="text-xl font-bold">₡{localPriceRange[0].toLocaleString()}</div>
                              </div>
                              <div className="text-2xl opacity-60">—</div>
                              <div className="text-center">
                                <div className="text-sm opacity-80">Max</div>
                                <div className="text-xl font-bold">₡{localPriceRange[1].toLocaleString()}</div>
                              </div>
                            </div>
                          </div>

                          {/* Mode Toggle */}
                          <div className="flex items-center justify-center space-x-2">
                            <button
                              onClick={() => setPriceInputMode('slider')}
                              className={`flex items-center space-x-1 px-3 py-1 rounded-lg text-sm transition-all ${
                                priceInputMode === 'slider' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              }`}
                            >
                              <SlidersHorizontal className="w-3 h-3" />
                              <span>Slider</span>
                            </button>
                            <button
                              onClick={() => setPriceInputMode('input')}
                              className={`flex items-center space-x-1 px-3 py-1 rounded-lg text-sm transition-all ${
                                priceInputMode === 'input' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              }`}
                            >
                              <Package className="w-3 h-3" />
                              <span>Input</span>
                            </button>
                          </div>

                          {priceInputMode === 'slider' ? (
                            /* Enhanced Dual Range Slider */
                            <div className="relative px-2 py-4">
                              <div className="relative h-2 bg-gray-200 rounded-full">
                                <div 
                                  className="absolute h-2 bg-gradient-to-r from-primary to-gray-800 rounded-full"
                                  style={{
                                    left: `${pricePercentage[0]}%`,
                                    width: `${pricePercentage[1] - pricePercentage[0]}%`
                                  }}
                                />
                              </div>
                              <input
                                type="range"
                                min={priceRange[0]}
                                max={priceRange[1]}
                                value={localPriceRange[0]}
                                onChange={(e) => handlePriceChange(0, Number(e.target.value))}
                                className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer slider-thumb"
                                style={{ top: '16px' }}
                              />
                              <input
                                type="range"
                                min={priceRange[0]}
                                max={priceRange[1]}
                                value={localPriceRange[1]}
                                onChange={(e) => handlePriceChange(1, Number(e.target.value))}
                                className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer slider-thumb"
                                style={{ top: '16px' }}
                              />
                            </div>
                          ) : (
                            /* Number Inputs */
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Minimum</label>
                                <input
                                  type="number"
                                  value={localPriceRange[0]}
                                  onChange={(e) => handlePriceInputChange(0, e.target.value)}
                                  min={priceRange[0]}
                                  max={priceRange[1]}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                                  placeholder="Min price"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Maximum</label>
                                <input
                                  type="number"
                                  value={localPriceRange[1]}
                                  onChange={(e) => handlePriceInputChange(1, e.target.value)}
                                  min={priceRange[0]}
                                  max={priceRange[1]}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                                  placeholder="Max price"
                                />
                              </div>
                            </div>
                          )}

                          {/* Quick Price Presets */}
                          <div className="grid grid-cols-3 gap-2">
                            {[
                              { label: 'Under ₡50', min: priceRange[0], max: 50 },
                              { label: '₡50-₡100', min: 50, max: 100 },
                              { label: 'Over ₡100', min: 100, max: priceRange[1] }
                            ].map((preset, index) => (
                              <button
                                key={index}
                                onClick={() => handleQuickPricePreset(preset.min, preset.max)}
                                className="px-3 py-2 text-xs bg-gray-100 hover:bg-primary hover:text-white rounded-lg transition-all"
                              >
                                {preset.label}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Enhanced Categories Section */}
                  {categories.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <button
                        onClick={() => toggleSection('categories')}
                        className="flex items-center justify-between w-full mb-4 group"
                      >
                        <div className="flex items-center space-x-2">
                          <Package className="w-5 h-5 text-primary" />
                          <span className="font-semibold text-primary">Categories</span>
                          {filters.categories.length > 0 && (
                            <span className="px-2 py-1 bg-primary text-white text-xs rounded-full">
                              {filters.categories.length}
                            </span>
                          )}
                        </div>
                        <motion.div
                          animate={{ rotate: expandedSections.categories ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-primary transition-colors" />
                        </motion.div>
                      </button>
                      
                      <AnimatePresence>
                        {expandedSections.categories && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-3"
                          >
                            {/* Category Search */}
                            <div className="relative">
                              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                              <input
                                type="text"
                                placeholder="Search categories..."
                                value={searchCategory}
                                onChange={(e) => setSearchCategory(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                              />
                            </div>

                            {/* Categories Grid */}
                            <div className="max-h-48 overflow-y-auto custom-scrollbar">
                              <div className="grid grid-cols-1 gap-2">
                                {filteredCategories.map((category, index) => (
                                  <motion.label
                                    key={category}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.03 }}
                                    onMouseEnter={() => setHoveredCategory(category)}
                                    onMouseLeave={() => setHoveredCategory(null)}
                                    className={`flex items-center p-3 rounded-lg cursor-pointer transition-all group ${
                                      filters.categories.includes(category) 
                                        ? 'bg-primary bg-opacity-10 border-2 border-primary' 
                                        : 'border-2 border-transparent hover:bg-gray-50'
                                    }`}
                                  >
                                    <input
                                      type="checkbox"
                                      checked={filters.categories.includes(category)}
                                      onChange={() => handleCategoryToggle(category)}
                                      className="sr-only"
                                    />
                                    <div className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center transition-all ${
                                      filters.categories.includes(category)
                                        ? 'bg-primary border-primary'
                                        : 'border-gray-300 group-hover:border-primary'
                                    }`}>
                                      {filters.categories.includes(category) && (
                                        <motion.div
                                          initial={{ scale: 0 }}
                                          animate={{ scale: 1 }}
                                        >
                                          <Check className="w-3 h-3 text-white" />
                                        </motion.div>
                                      )}
                                    </div>
                                    <span className={`font-medium transition-colors ${
                                      filters.categories.includes(category) ? 'text-primary' : 'text-gray-700'
                                    }`}>
                                      {category}
                                    </span>
                                    {hoveredCategory === category && (
                                      <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="ml-auto"
                                      >
                                        <Sparkles className="w-4 h-4 text-primary" />
                                      </motion.div>
                                    )}
                                  </motion.label>
                                ))}
                              </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="flex space-x-2">
                              <button
                                onClick={() => onFiltersChange({ ...filters, categories: categories })}
                                className="flex-1 px-3 py-2 text-xs bg-primary text-white rounded-lg hover:bg-gray-800 transition-all"
                              >
                                Select All
                              </button>
                              <button
                                onClick={() => onFiltersChange({ ...filters, categories: [] })}
                                className="flex-1 px-3 py-2 text-xs bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-all"
                              >
                                Clear All
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )}

                  {/* Enhanced Product Attributes */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <button
                      onClick={() => toggleSection('attributes')}
                      className="flex items-center justify-between w-full mb-4 group"
                    >
                      <div className="flex items-center space-x-2">
                        <Star className="w-5 h-5 text-primary" />
                        <span className="font-semibold text-primary">Product Types</span>
                      </div>
                      <motion.div
                        animate={{ rotate: expandedSections.attributes ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-primary transition-colors" />
                      </motion.div>
                    </button>
                    
                    <AnimatePresence>
                      {expandedSections.attributes && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-3"
                        >
                          {attributeOptions.map((attribute, index) => (
                            <motion.label
                              key={attribute.key}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                              className={`flex items-center p-4 rounded-xl cursor-pointer transition-all border-2 ${
                                filters[attribute.key as keyof FilterOptions] 
                                  ? `${attribute.color} border-current` 
                                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={filters[attribute.key as keyof FilterOptions] as boolean}
                                onChange={(e) => onFiltersChange({ 
                                  ...filters, 
                                  [attribute.key]: e.target.checked 
                                })}
                                className="sr-only"
                              />
                              <div className={`p-2 rounded-lg mr-3 ${
                                filters[attribute.key as keyof FilterOptions] 
                                  ? 'bg-current bg-opacity-20' 
                                  : 'bg-gray-100'
                              }`}>
                                {attribute.icon}
                              </div>
                              <div className="flex-1">
                                <div className="font-medium">{attribute.label}</div>
                                <div className="text-sm opacity-70">{attribute.description}</div>
                              </div>
                              {filters[attribute.key as keyof FilterOptions] && (
                                <motion.div
                                  initial={{ scale: 0, rotate: -180 }}
                                  animate={{ scale: 1, rotate: 0 }}
                                  className="w-6 h-6 bg-current rounded-full flex items-center justify-center"
                                >
                                  <Check className="w-4 h-4 text-white" />
                                </motion.div>
                              )}
                            </motion.label>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                </div>
              </div>

              {/* Enhanced Footer */}
              <div className="border-t bg-gray-50 p-4 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    {activeFiltersCount > 0 ? (
                      <span className="flex items-center space-x-1">
                        <Zap className="w-4 h-4 text-primary" />
                        <span>{activeFiltersCount} filter{activeFiltersCount !== 1 ? 's' : ''} active</span>
                      </span>
                    ) : (
                      <span className="flex items-center space-x-1">
                        <Eye className="w-4 h-4 text-gray-400" />
                        <span>No filters applied</span>
                      </span>
                    )}
                  </div>
                  <motion.button
                    onClick={onToggle}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-all"
                  >
                    Apply Filters
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Custom Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a1a1a1;
        }
        
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #000;
          cursor: pointer;
          border: 3px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          position: relative;
          z-index: 2;
        }
        
        .slider-thumb::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #000;
          cursor: pointer;
          border: 3px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          position: relative;
          z-index: 2;
        }
        
        .slider-thumb {
          pointer-events: none;
        }
        
        .slider-thumb::-webkit-slider-thumb {
          pointer-events: all;
        }
        
        .slider-thumb::-moz-range-thumb {
          pointer-events: all;
        }
      `}</style>
    </div>
  );
};

export default ProductFilters;