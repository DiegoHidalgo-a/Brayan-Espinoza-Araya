import { useState, useMemo, useEffect } from 'react';
import { Product } from '../contexts/ProductContext';
import { FilterOptions } from '../components/ProductFilters';

export const useProductFilters = (products: Product[]) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Calculate price range from products
  const priceRange = useMemo((): [number, number] => {
    if (products.length === 0) return [0, 1000];
    const prices = products.map(p => p.price);
    return [Math.floor(Math.min(...prices)), Math.ceil(Math.max(...prices))];
  }, [products]);

  // Get unique categories from all products (flattened from categories arrays)
  const categories = useMemo(() => {
    const allCategories = products.flatMap(p => p.categories);
    const uniqueCategories = [...new Set(allCategories)];
    return uniqueCategories.sort();
  }, [products]);

  // Helper function to get total stock for a product
  const getTotalStock = (product: Product): number => {
    return Object.values(product.stock_by_size).reduce((total, stock) => total + stock, 0);
  };

  // Default filter state
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: priceRange,
    categories: [],
    sortBy: 'newest',
    showNew: false,
    showSale: false,
    showLimited: false,
    showExclusive: false,
    inStock: false,
  });

  // Update price range when products change
  useEffect(() => {
    setFilters(prev => {
      // Only update if the price range has actually changed
      if (prev.priceRange[0] !== priceRange[0] || prev.priceRange[1] !== priceRange[1]) {
        return {
          ...prev,
          priceRange: priceRange
        };
      }
      return prev;
    });
  }, [priceRange]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // Price range filter
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false;
      }

      // Category filter - check if product has any of the selected categories
      if (filters.categories.length > 0) {
        const hasMatchingCategory = filters.categories.some(filterCat => 
          product.categories.includes(filterCat)
        );
        if (!hasMatchingCategory) return false;
      }

      // Product type filters
      if (filters.showNew && !product.is_new) return false;
      if (filters.showSale && !product.is_sale) return false;
      if (filters.showLimited && !product.is_limited_edition) return false;
      if (filters.showExclusive && !product.is_exclusive) return false;
      if (filters.inStock && getTotalStock(product) === 0) return false;

      return true;
    });

    // Sort products
    switch (filters.sortBy) {
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case 'popularity':
        // Sort by total stock (higher stock = more popular)
        filtered.sort((a, b) => getTotalStock(b) - getTotalStock(a));
        break;
      default:
        break;
    }

    return filtered;
  }, [products, filters]);

  const clearFilters = () => {
    setFilters({
      priceRange: priceRange,
      categories: [],
      sortBy: 'newest',
      showNew: false,
      showSale: false,
      showLimited: false,
      showExclusive: false,
      inStock: false,
    });
  };

  const toggleFilterPanel = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return {
    filters,
    setFilters,
    filteredProducts,
    categories,
    priceRange,
    isFilterOpen,
    toggleFilterPanel,
    clearFilters,
  };
};