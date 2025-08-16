import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';

interface Category {
  title: string;
  mobileImage: string;
  desktopImage: string;
  subtitle: string;
  href: string;
  featured?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const CategoryGrid: React.FC = () => {
  const categories: Category[] = [
    {
      title: 'New Arrivals',
      subtitle: 'Latest Drops',
      href: '/new',
      mobileImage: '/images/new.jpg',
      desktopImage: '/images/new.jpg',
      featured: true,
      size: 'large'
    },
    {
      title: 'Men',
      subtitle: 'Contemporary Essentials',
      href: '/men',
      mobileImage: '/images/cr7.jpg',
      desktopImage: '/images/cr7a.webp',
      size: 'medium'
    },
    {
      title: 'Women',
      subtitle: 'Elevated Basics',
      href: '/women',
      mobileImage: '/images/w.jpg',
      desktopImage: '/images/w.jpg',
      size: 'medium'
    },
    {
      title: 'Costa Rica',
      subtitle: 'Pura Vida Collection',
      href: '/tico',
      mobileImage: '/images/diablo.jpg',
      desktopImage: '/images/carreta.webp',
      size: 'medium'
    },
    {
      title: 'Fútbol',
      subtitle: 'Sport Culture',
      href: '/futbol',
      mobileImage: '/images/dado.png',
      desktopImage: '/images/f2.jpg',
      size: 'large'
    }
  ];

  // Animaciones reutilizables
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const scaleUp = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 }
  };

  const CategoryCard: React.FC<{ category: Category; delay?: number }> = ({ 
    category, 
    delay = 0 
  }) => {
    const cardRef = React.useRef(null);
    const isInView = useInView(cardRef, { once: true, margin: "-100px" });

    const getCardSize = () => {
      switch (category.size) {
        case 'large':
          return 'h-96 md:h-[500px] lg:h-[600px]';
        case 'medium':
          return 'h-96 md:h-[500px] lg:h-[290px]';
        default:
          return 'h-80 md:h-96 lg:h-80';
      }
    };

    return (
      <motion.div
        ref={cardRef}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={scaleUp}
        transition={{ duration: 0.7, delay }}
      >
        <Link to={category.href} className="block group" aria-label={`Explore ${category.title}`}>
          <motion.div 
            className={`category-card ${getCardSize()} overflow-hidden relative rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300`}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            {/* Imágenes optimizadas con lazy loading */}
            <div className="w-full h-full">
              <img
                src={category.mobileImage}
                alt={category.title}
                className="w-full h-full object-cover block lg:hidden"
              />
              <img
                src={category.desktopImage}
                alt={category.title}
                className="w-full h-full object-cover hidden lg:block"
              />
            </div>
            
            {/* Overlay con gradiente */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
            
            {/* Contenido de la tarjeta */}
            <motion.div 
              className="absolute inset-0 flex items-end p-6 md:p-8 lg:p-10"
              variants={fadeInUp}
              transition={{ duration: 0.7, delay: delay + 0.2 }}
            >
              <div className="text-white space-y-2">
                <motion.h3 
                  className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  {category.title}
                </motion.h3>
                <p className="text-sm md:text-base tracking-wider uppercase opacity-90 font-medium">
                  {category.subtitle}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </Link>
      </motion.div>
    );
  };

  return (
    <section className="py-20 md:py-24 lg:py-28 px-4 sm:px-6" id="categories">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado con animación */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20 lg:mb-24"
        >
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6">
            Shop by Category
          </h2>
          <p className="text-stone-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Curated collections that speak to your style. Each piece tells a story, 
            every category defines a moment.
          </p>
        </motion.div>

        {/* Category Grid - Improved Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* New Arrivals - Featured (Takes full width on mobile, 2 columns on large screens) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Link to={categories[0].href} className="block group">
              <motion.div 
                className="category-card h-96 md:h-[500px] lg:h-[600px] overflow-hidden relative"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                {/* Mobile Image */}
                <motion.img 
                  src={categories[0].mobileImage} 
                  alt={categories[0].title}
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  className="w-full h-full object-cover block lg:hidden"
                />
                {/* Desktop Image */}
                <motion.img 
                  src={categories[0].desktopImage} 
                  alt={categories[0].title}
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  className="w-full h-full object-cover hidden lg:block"
                />
                <div className="category-overlay"></div>
                <motion.div 
                  className="absolute inset-0 flex items-end p-8 md:p-12"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                >
                  <div className="text-white">
                    <motion.h3 
                      className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-3"
                      whileHover={{ x: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      {categories[0].title}
                    </motion.h3>
                    <p className="text-sm md:text-base tracking-wide uppercase opacity-90">
                      {categories[0].subtitle}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </Link>
          </motion.div>

          {/* Men - Vertical on the right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:row-span-1"
          >
            <Link to={categories[1].href} className="block group">
              <motion.div 
                className="category-card h-96 md:h-[500px] lg:h-[290px] overflow-hidden relative"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                {/* Mobile Image */}
                <motion.img 
                  src={categories[1].mobileImage} 
                  alt={categories[1].title}
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  className="w-full h-full object-cover block lg:hidden"
                />
                {/* Desktop Image */}
                <motion.img 
                  src={categories[1].desktopImage} 
                  alt={categories[1].title}
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  className="w-full h-full object-cover hidden lg:block"
                />
                <div className="category-overlay"></div>
                <motion.div 
                  className="absolute inset-0 flex items-end p-6 md:p-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                >
                  <div className="text-white">
                    <motion.h3 
                      className="font-serif text-2xl md:text-3xl font-bold mb-2"
                      whileHover={{ x: 8 }}
                      transition={{ duration: 0.3 }}
                    >
                      {categories[1].title}
                    </motion.h3>
                    <p className="text-xs md:text-sm tracking-wide uppercase opacity-90">
                      {categories[1].subtitle}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </Link>
          </motion.div>

          {/* Women - Bottom right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:row-span-1"
          >
            <Link to={categories[2].href} className="block group">
              <motion.div 
                className="category-card h-96 md:h-[500px] lg:h-[290px] overflow-hidden relative"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                {/* Mobile Image */}
                <motion.img 
                  src={categories[2].mobileImage} 
                  alt={categories[2].title}
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  className="w-full h-full object-cover block lg:hidden"
                />
                {/* Desktop Image */}
                <motion.img 
                  src={categories[2].desktopImage} 
                  alt={categories[2].title}
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  className="w-full h-full object-cover hidden lg:block"
                />
                <div className="category-overlay"></div>
                <motion.div 
                  className="absolute inset-0 flex items-end p-6 md:p-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.5 }}
                >
                  <div className="text-white">
                    <motion.h3 
                      className="font-serif text-2xl md:text-3xl font-bold mb-2"
                      whileHover={{ x: 8 }}
                      transition={{ duration: 0.3 }}
                    >
                      {categories[2].title}
                    </motion.h3>
                    <p className="text-xs md:text-sm tracking-wide uppercase opacity-90">
                      {categories[2].subtitle}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </Link>
          </motion.div>

          {/* Costa Rica - New category */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="lg:col-span-1"
          >
            <Link to={categories[3].href} className="block group">
              <motion.div 
                className="category-card h-96 md:h-[500px] lg:h-[290px] overflow-hidden relative"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                {/* Mobile Image */}
                <motion.img 
                  src={categories[3].mobileImage} 
                  alt={categories[3].title}
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  className="w-full h-full object-cover block lg:hidden"
                />
                {/* Desktop Image */}
                <motion.img 
                  src={categories[3].desktopImage} 
                  alt={categories[3].title}
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  className="w-full h-full object-cover hidden lg:block"
                />
                <div className="category-overlay"></div>
                <motion.div 
                  className="absolute inset-0 flex items-end p-6 md:p-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.6 }}
                >
                  <div className="text-white">
                    <motion.h3 
                      className="font-serif text-2xl md:text-3xl font-bold mb-2"
                      whileHover={{ x: 8 }}
                      transition={{ duration: 0.3 }}
                    >
                      {categories[3].title}
                    </motion.h3>
                    <p className="text-xs md:text-sm tracking-wide uppercase opacity-90">
                      {categories[3].subtitle}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </Link>
          </motion.div>

          {/* Fútbol - Full width bottom */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="lg:col-span-3"
          >
            <Link to={categories[4].href} className="block group">
              <motion.div 
                className="category-card h-80 md:h-96 lg:h-80 overflow-hidden relative"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                {/* Mobile Image */}
                <motion.img 
                  src={categories[4].mobileImage} 
                  alt={categories[4].title}
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  className="w-full h-full object-cover block lg:hidden"
                />
                {/* Desktop Image */}
                <motion.img 
                  src={categories[4].desktopImage} 
                  alt={categories[4].title}
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  className="w-full h-full object-cover hidden lg:block"
                />
                <div className="category-overlay"></div>
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.7 }}
                >
                  <div className="text-white">
                    <motion.h3 
                      className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-3"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      {categories[4].title}
                    </motion.h3>
                    <p className="text-sm md:text-base tracking-wide uppercase opacity-90">
                      {categories[4].subtitle}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </Link>
          </motion.div>
        </div>

        {/* Llamada a la acción */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16 md:mt-20 lg:mt-24"
        >
          <p className="text-stone-600 text-base md:text-lg mb-8 max-w-2xl mx-auto">
            Can't decide? Explore our complete collection and discover pieces that resonate with your personal style.
          </p>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary text-white text-sm md:text-base px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
          >
            View All Collections
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default CategoryGrid;