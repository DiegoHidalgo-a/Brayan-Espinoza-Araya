import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ExternalLink, Download } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const navigate = useNavigate();

  const handleExploreCollection = () => {
    document.getElementById('perfil')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleMediaKitDownload = () => {
    // Navega a la página de media kit
    navigate('/media-kit');
  };

  const handleContactClick = () => {
    // Navega a la página de contacto
    navigate('/contacto');
  };

  const handleLogrosClick = () => {
    // Navega a la página de logros
    navigate('/logros');
  };

  const handleKeyPress = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Mobile Background Image */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="absolute inset-0 block lg:hidden"
      >
        <img
          src="/images/photo_1_2025-08-13_23-49-23.jpg"
          alt="Brayan Espinoza en acción - Vista móvil"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </motion.div>

      {/* Desktop Background Image */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="absolute inset-0 hidden lg:block"
      >
        <img
          src="/images/photo_28_2025-08-13_23-49-23.jpg"
          alt="Brayan Espinoza en competencia - Vista desktop"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center text-center text-white">
        <div className="section-padding max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
            className="font-serif text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 md:mb-6 leading-tight"
          >
            Brayan José Espinoza Araya
            <br />
            Atleta Tico
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
            className="text-base md:text-lg lg:text-xl font-light tracking-wide mb-6 md:mb-8 max-w-2xl mx-auto px-4"
          >
            Primero en el ranking U20 y tercero a nivel nacional, Brayan combina disciplina, velocidad y potencia para alcanzar marcas que rompen límites.
          </motion.p>

          {/* KPIs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
            className="flex justify-center gap-8 md:gap-12 mb-8"
          >
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold">6,67 m</div>
              <div className="text-xs md:text-sm opacity-80">Salto de longitud (09/03/2025)</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold">13,43 m</div>
              <div className="text-xs md:text-sm opacity-80">Salto triple (30/04/2023)</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold">42,97s</div>
              <div className="text-xs md:text-sm opacity-80">Relevo 4x100 (2025)</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: 'easeOut' }}
            className="flex flex-col items-center gap-3 md:gap-4 px-4"
          >
            <div className="flex flex-row gap-3 md:gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleContactClick}
                onKeyPress={(e) => handleKeyPress(e, handleContactClick)}
                className="btn-primary text-xs md:text-sm py-3 md:py-3 px-6 md:px-8 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                tabIndex={0}
                role="button"
                aria-label="Contactar"
              >
                Contactar
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogrosClick}
                onKeyPress={(e) => handleKeyPress(e, handleLogrosClick)}
                className="btn-primary text-xs md:text-sm py-3 md:py-3 px-6 md:px-8 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                tabIndex={0}
                role="button"
                aria-label="Ver Logros"
              >
                Ver Logros
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 text-white cursor-pointer"
        onClick={handleExploreCollection}
        onKeyPress={(e) => handleKeyPress(e, handleExploreCollection)}
        tabIndex={0}
        role="button"
        aria-label="Hacer scroll hacia abajo"
      >
        <motion.div 
          className="flex flex-col items-center"
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-xs md:text-sm font-light tracking-wider uppercase mb-2">Scroll</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown className="w-4 h-4 md:w-5 md:h-5" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;