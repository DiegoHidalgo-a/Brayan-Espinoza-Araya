import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'PERFIL', href: '/perfil' },
    { name: 'LOGROS', href: '/logros' },
    { name: 'ESTADÍSTICAS', href: '/estadisticas' },
    { name: 'CALENDARIO', href: '/calendario' },
    { name: 'GALERÍA', href: '/galeria' },
    { name: 'SPONSORS', href: '/sponsors' },
  ];

  return (
    <>
      {/* Mobile Navbar */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-40 lg:hidden ${
          isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
        }`}
      >
        {/* Top Row - Logo + Icons */}
        <div className="flex justify-between items-center px-4 py-3 border-b border-white/10">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex-shrink-0"
          >
            <a href="/">
              <h1 className={`font-serif text-2xl font-bold ${
                isScrolled ? 'text-blue-600' : 'text-white'
              }`}>
                Brayan Espinoza
              </h1>
            </a>
          </motion.div>
          <div className="flex items-center space-x-4">
            <a href="/contacto">
              <motion.button
                whileHover={{ scale: 1.1 }}
                className={`p-1 ${isScrolled ? 'text-blue-600' : 'text-white'}`}
              >
                <span className="text-sm font-medium">Contactar</span>
              </motion.button>
            </a>
          </div>
        </div>
        
        {/* Bottom Row - Centered Menu */}
        <div className={`flex justify-center py-3 ${
          isScrolled ? 'bg-white/95' : 'bg-transparent'
        }`}>
          <div className="flex space-x-4 md:space-x-6 overflow-x-auto px-4">
            {navItems.slice(0, 4).map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`text-xs md:text-sm uppercase tracking-wider font-medium whitespace-nowrap ${
                  window.location.pathname === item.href
                    ? isScrolled 
                      ? 'text-blue-600 border-b border-blue-600' 
                      : 'text-white border-b border-white'
                    : isScrolled 
                      ? 'text-gray-700 hover:text-blue-600' 
                      : 'text-white/80 hover:text-white'
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* Desktop Navbar */}
      <nav className={`hidden lg:flex fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      } h-20 items-center px-12`}>
        {/* Logo */}
        <div className="flex-shrink-0 mr-8">
          <a href="/">
            <h1 className={`font-serif text-2xl font-bold transition-colors duration-500 ${
              isScrolled ? 'text-blue-600' : 'text-white'
            }`}>Brayan Espinoza</h1>
          </a>
        </div>
        
        {/* Nav Links */}
        <div className="flex-1 flex justify-center space-x-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`text-sm uppercase tracking-wider font-semibold transition-colors duration-300 pb-1 border-b-2 ${
                window.location.pathname === item.href
                  ? isScrolled 
                    ? 'text-blue-600 border-blue-600' 
                    : 'text-white border-white'
                  : isScrolled 
                    ? 'text-gray-700 border-transparent hover:text-blue-600 hover:border-blue-600' 
                    : 'text-white/80 border-transparent hover:text-white hover:border-white'
              }`}
            >
              {item.name}
            </a>
          ))}
        </div>
        
        {/* Icons */}
        <div className="flex items-center space-x-6 ml-8">
          <a href="/contacto">
            <button
              className={`relative p-2 transition-colors duration-500 ${isScrolled ? 'text-blue-600 hover:text-gray-600' : 'text-white hover:text-gray-300'}`}
            >
              <span className="text-sm font-medium">Contactar</span>
            </button>
          </a>
        </div>
      </nav>
    </>
  );
};

export default Navigation;