import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Clock, TrendingUp } from 'lucide-react';
import { useSearch } from '../contexts/SearchContext';
import { Link } from 'react-router-dom';

const SearchModal: React.FC = () => {
  const { state, closeSearch, setQuery, performSearch } = useSearch();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state.isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [state.isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeSearch();
      }
    };

    if (state.isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [state.isOpen, closeSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setQuery(query);
    performSearch(query);
  };

  const popularSearches = ['Oversized Tee', 'Football Jersey', 'Blazer', 'Dress', 'Sneakers'];

  return (
    <AnimatePresence>
      {state.isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={closeSearch}
        >
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="bg-white w-full max-w-2xl mx-auto mt-16 rounded-lg shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Header */}
            <div className="flex items-center p-4 border-b border-warm">
              <Search className="w-5 h-5 text-stone mr-3" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search for products, categories..."
                value={state.query}
                onChange={handleInputChange}
                className="flex-1 text-lg text-primary placeholder-stone focus:outline-none"
              />
              <button
                onClick={closeSearch}
                className="p-2 text-stone hover:text-primary transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Content */}
            <div className="max-h-96 overflow-y-auto">
              {state.isLoading ? (
                <div className="p-8 text-center">
                  <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-stone">Searching...</p>
                </div>
              ) : state.query && state.results.length > 0 ? (
                <div className="p-4">
                  <h3 className="text-sm font-medium text-stone uppercase tracking-wider mb-4">
                    Search Results ({state.results.length})
                  </h3>
                  <div className="space-y-2">
                    {state.results.map((result) => (
                      <Link
                        key={result.id}
                        to={result.href}
                        onClick={closeSearch}
                        className="flex items-center p-3 hover:bg-cream rounded-lg transition-colors group"
                      >
                        {result.type === 'product' ? (
                          <img
                            src={result.image}
                            alt={result.name}
                            className="w-12 h-12 object-cover rounded mr-4"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-primary rounded mr-4 flex items-center justify-center">
                            <TrendingUp className="w-6 h-6 text-white" />
                          </div>
                        )}
                        <div className="flex-1">
                          <h4 className="font-medium text-primary group-hover:text-stone transition-colors">
                            {result.name}
                          </h4>
                          <p className="text-sm text-stone">{result.category}</p>
                        </div>
                        {result.price && (
                          <span className="font-serif text-primary">{result.price}</span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : state.query && state.results.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-stone mb-4">No results found for "{state.query}"</p>
                  <p className="text-sm text-stone">Try searching for something else</p>
                </div>
              ) : (
                <div className="p-4">
                  <h3 className="text-sm font-medium text-stone uppercase tracking-wider mb-4 flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    Popular Searches
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((search) => (
                      <button
                        key={search}
                        onClick={() => {
                          setQuery(search);
                          performSearch(search);
                        }}
                        className="px-3 py-2 bg-cream text-primary text-sm rounded-full hover:bg-warm transition-colors"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;