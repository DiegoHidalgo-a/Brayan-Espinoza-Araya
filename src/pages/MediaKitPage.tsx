import React from 'react';
import { motion } from 'framer-motion';
import { Download, Image, Users, TrendingUp, Award } from 'lucide-react';

const MediaKitPage: React.FC = () => {
  const estadisticas = [
    { categoria: 'Seguidores Instagram', valor: '15.2K', icon: Users },
    { categoria: 'Alcance Promedio', valor: '45K', icon: TrendingUp },
    { categoria: 'Engagement Rate', valor: '8.5%', icon: Award },
    { categoria: 'Audiencia Demográfica', valor: '18-35', icon: Users }
  ];

  const archivos = [
    { 
      nombre: 'Fotos Profesionales', 
      tipo: 'ZIP', 
      icon: Image,
      destacado: true 
    },
    { 
      nombre: 'Media Kit Completo', 
      tipo: 'ZIP', 
      icon: Image,
      destacado: true 
    }
  ];

  const handleDownload = (item: any) => {
    console.log('Descargando:', item.nombre);
    const link = document.createElement('a');
    link.href = '#';
    link.download = `${item.nombre}.${item.tipo.toLowerCase()}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 h-full flex items-center justify-center text-center text-white">
          <div className="max-w-4xl px-4">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-4"
            >
              Media Kit
            </motion.h1>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-8 text-center">
            Estadísticas Clave
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {estadisticas.map((stat, index) => (
              <motion.div
                key={stat.categoria}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-8 text-center"
              >
                <stat.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                <div className="text-3xl font-bold text-primary mb-2">{stat.valor}</div>
                <div className="text-stone-600 font-medium">{stat.categoria}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Files Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-8 text-center">
            Archivos Disponibles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {archivos.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className={`bg-white rounded-xl shadow-lg p-8 ${
                  item.destacado ? 'ring-2 ring-primary' : ''
                }`}
              >
                <div className="text-center mb-6">
                  <item.icon className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-stone-800 text-xl mb-2">{item.nombre}</h3>
                </div>
                <button
                  onClick={() => handleDownload(item)}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center ${
                    item.destacado
                      ? 'bg-primary text-white hover:bg-primary/90'
                      : 'bg-stone-100 text-stone-800 hover:bg-stone-200'
                  }`}
                >
                  <Download className="w-5 h-5 mr-2" />
                  Descargar
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MediaKitPage;
