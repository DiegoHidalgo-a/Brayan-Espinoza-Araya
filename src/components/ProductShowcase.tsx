import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useProducts } from '../contexts/ProductContext';
import { Link } from 'react-router-dom';

const ProductShowcase: React.FC = () => {
  const { state, getTotalStock } = useProducts();
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Get all products for the carousel
  const allProducts = state.products;

  // Duplicate products to create seamless loop
  const duplicatedProducts = [...allProducts, ...allProducts];

  const handleViewAllProducts = () => {
    // Scroll to categories or navigate to a products page
    document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Handle touch events for mobile pause
  const handleTouchStart = () => {
    setIsPaused(true);
  };

  const handleTouchEnd = () => {
    // Resume after a short delay
    setTimeout(() => setIsPaused(false), 1000);
  };

  // Auto-scroll effect
  useEffect(() => {
    if (!carouselRef.current || isPaused) return;

    const scrollSpeed = 1; // pixels per frame
    let animationId: number;

    const scroll = () => {
      if (carouselRef.current) {
        carouselRef.current.scrollLeft += scrollSpeed;
        
        // Reset scroll position when reaching the end to create infinite loop
        if (carouselRef.current.scrollLeft >= carouselRef.current.scrollWidth / 2) {
          carouselRef.current.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isPaused]);

  return (
    <section className="py-16 md:py-20 bg-secondary section-padding" id="products">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
            Featured Pieces
          </h2>
          <p className="text-stone text-base md:text-lg max-w-2xl mx-auto px-4">
            Handpicked selections from our latest collection. 
            Each piece crafted with intention and designed for longevity.
          </p>
        </motion.div>

        {/* Auto-scrolling Carousel */}
        <div 
          ref={carouselRef}
          className="relative overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="flex space-x-4 md:space-x-6 lg:space-x-8">
            {duplicatedProducts.map((product, index) => {
            const totalStock = getTotalStock(product);
            const availableSizes = Object.entries(product.stock_by_size)
              .filter(([_, stock]) => stock > 0)
              .map(([size, _]) => size);

            return (
              <motion.div
                  key={`${product.id}-${index}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="product-card group flex-shrink-0 w-32 sm:w-40 md:w-48 lg:w-56 xl:w-64"
              >
                <Link to={`/product/${product.id}`}>
                  <motion.div 
                    className="relative mb-4 overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={product.primary_image}
                      alt={product.name}
                        className="product-image-primary w-full aspect-square object-cover transition-all duration-500"
                    />
                      {product.secondary_image && product.secondary_image !== product.primary_image && (
                      <img
                        src={product.secondary_image}
                        alt={product.name}
                          className="product-image-secondary absolute inset-0 w-full aspect-square object-cover opacity-0 pointer-events-none transition-all duration-500 group-hover:opacity-100 hidden md:block"
                      />
                    )}
                    
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col space-y-1">
                      {product.is_new && (
                        <span className="px-2 py-1 bg-primary text-white text-xs font-medium uppercase tracking-wider">
                          New
                        </span>
                      )}
                      {product.is_sale && (
                        <span className="px-2 py-1 bg-red-600 text-white text-xs font-medium uppercase tracking-wider">
                          Sale
                        </span>
                      )}
                        {product.is_limited_edition && (
                          <span className="px-2 py-1 bg-purple-600 text-white text-xs font-medium uppercase tracking-wider">
                            Limited
                          </span>
                        )}
                        {product.is_exclusive && (
                          <span className="px-2 py-1 bg-pink-600 text-white text-xs font-medium uppercase tracking-wider">
                            Exclusive
                        </span>
                      )}
                    </div>
                  </motion.div>
                </Link>
                
                <div className="space-y-2 px-2">
                  <p className="text-xs text-stone tracking-wider uppercase">{product.categories.join(', ')}</p>
                  <h3 className="font-medium text-primary text-sm md:text-base">{product.name}</h3>
                  <div className="flex items-center space-x-2">
                    <p className="font-serif text-lg font-medium text-primary">₡{product.price.toFixed(2)}</p>
                    {product.original_price && product.is_sale && (
                      <p className="font-serif text-sm text-stone line-through">₡{product.original_price.toFixed(2)}</p>
                    )}
                  </div>
                  
                  {/* Stock and Size Info */}
                  <div className="space-y-1">
                    {totalStock > 0 ? (
                      <div className="text-xs text-stone">
                        Available in: {availableSizes.join(', ')}
                      </div>
                    ) : (
                      <div className="text-xs text-red-600">Out of Stock</div>
                    )}
                  </div>
                </div>

                <Link to={`/product/${product.id}`}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-4 w-full py-3 text-xs md:text-sm font-medium tracking-wider uppercase border border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
                  >
                    {totalStock > 0 ? 'Select Options' : 'View Product'}
                  </motion.button>
                </Link>
              </motion.div>
            );
          })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleViewAllProducts}
            className="btn-primary"
          >
            View All Products
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductShowcase;