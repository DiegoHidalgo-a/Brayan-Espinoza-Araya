import React from 'react';
import Hero from '../components/Hero';
import PerfilSection from '../components/PerfilSection';
import LogrosSection from '../components/LogrosSection';
import EstadisticasSection from '../components/EstadisticasSection';
import Newsletter from '../components/Newsletter';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-warm to-stone-100 relative">
      {/* Overlay sutil para oscurecer */}
      <div className="absolute inset-0 bg-black/15 pointer-events-none"></div>
      
      {/* Contenido de la página */}
      <div className="relative z-10">
        <Hero />
        <PerfilSection />
        <LogrosSection />
        <EstadisticasSection />
        <Newsletter />
      </div>
    </div>
  );
};

export default HomePage;