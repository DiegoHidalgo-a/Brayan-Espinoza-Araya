import React from 'react';
import { motion } from 'framer-motion';

const Editorial: React.FC = () => {
  const handleReadStory = () => {
    // Placeholder for read story functionality
    console.log('Read Our Story clicked - implement story page navigation');
  };

  return (
    <section className="py-16 md:py-20 section-padding" id="editorial">
      <div className="max-w-7xl mx-auto">
        {/* Main Editorial Block */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="order-2 lg:order-1"
          >
            <div className="space-y-4 md:space-y-6 px-4 lg:px-0">
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary leading-tight"
              >
                Fashion is
                <br />
                Philosophy
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-stone text-base md:text-lg leading-relaxed"
              >
                Lo que vestís no solo te cubre — te representa.
                Empezando from the ground hasta subir y representar tu esencia.
                It’s cómo caminás, cómo hablás, cómo te expresás sin decir una palabra.
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-stone text-sm md:text-base leading-relaxed"
              >
                En Brayan Espinoza, cada competencia cuenta una historia: de visión, cultura y propósito.
                Creamos piezas que no siguen tendencias — las trascienden.
              </motion.p>
              <motion.button 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReadStory}
                className="btn-secondary mt-4 md:mt-6 text-xs md:text-sm shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Read Our Story
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="relative order-1 lg:order-2 overflow-hidden"
          >
            <motion.img
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              src="/images/d.jpg"
              alt="Editorial Fashion"
              className="w-full h-80 md:h-96 lg:h-128 object-cover rounded-lg shadow-lg"
            />
          </motion.div>
        </div>

        {/* Quote Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center bg-cream p-8 md:p-12 lg:p-20 rounded-lg"
        >
          <motion.blockquote 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-serif text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light text-primary italic leading-relaxed max-w-4xl mx-auto px-4"
          >
            "¿Quién no compraría ropa a Noah Castro?."
          </motion.blockquote>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-stone mt-4 md:mt-6 tracking-wider uppercase text-xs md:text-sm"
          >
            — Creative Director
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default Editorial;