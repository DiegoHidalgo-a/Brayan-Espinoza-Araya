import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useProducts } from './ProductContext';

interface SearchState {
  isOpen: boolean;
  query: string;
  results: SearchResult[];
  isLoading: boolean;
}

export interface SearchResult {
  id: number;
  name: string;
  price: string;
  image: string;
  category: string;
  type: 'product' | 'category';
  href: string;
}

interface SearchContextType {
  state: SearchState;
  openSearch: () => void;
  closeSearch: () => void;
  setQuery: (query: string) => void;
  performSearch: (query: string) => void;
}

const SearchContext = createContext<SearchContextType | null>(null);

// Categories for search
const categories: SearchResult[] = [
  { id: 101, name: 'Men\'s Collection', price: '', image: '', category: 'Men', type: 'category', href: '/men' },
  { id: 102, name: 'Women\'s Collection', price: '', image: '', category: 'Women', type: 'category', href: '/women' },
  { id: 103, name: 'Fútbol Collection', price: '', image: '', category: 'Fútbol', type: 'category', href: '/futbol' },
  { id: 104, name: 'New Arrivals', price: '', image: '', category: 'New', type: 'category', href: '/new' }
];

export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<SearchState>({
    isOpen: false,
    query: '',
    results: [],
    isLoading: false
  });

  const { state: productState } = useProducts();

  const openSearch = () => {
    setState(prev => ({ ...prev, isOpen: true }));
  };

  const closeSearch = () => {
    setState(prev => ({ ...prev, isOpen: false, query: '', results: [] }));
  };

  const setQuery = (query: string) => {
    setState(prev => ({ ...prev, query }));
  };

  const performSearch = (query: string) => {
    if (!query.trim()) {
      setState(prev => ({ ...prev, results: [], isLoading: false }));
      return;
    }

    setState(prev => ({ ...prev, isLoading: true }));

    // Simulate API delay
    setTimeout(() => {
      const searchTerm = query.toLowerCase();
      
      // Search products
      const productResults: SearchResult[] = productState.products
        .filter(product =>
          product.name.toLowerCase().includes(searchTerm) ||
          product.categories.some(cat => cat.toLowerCase().includes(searchTerm)) ||
          product.description?.toLowerCase().includes(searchTerm)
        )
        .map(product => ({
          id: parseInt(product.id),
          name: product.name,
          price: `₡${product.price.toFixed(2)}`,
          image: product.primary_image,
          category: product.categories.join(', '), // Join categories for display
          type: 'product' as const,
          href: `/product/${product.id}`
        }));

      // Search categories
      const categoryResults = categories.filter(category =>
        category.name.toLowerCase().includes(searchTerm) ||
        category.category.toLowerCase().includes(searchTerm)
      );

      const results = [...categoryResults, ...productResults].slice(0, 8);
      
      setState(prev => ({ ...prev, results, isLoading: false }));
    }, 300);
  };

  return (
    <SearchContext.Provider value={{
      state,
      openSearch,
      closeSearch,
      setQuery,
      performSearch
    }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};