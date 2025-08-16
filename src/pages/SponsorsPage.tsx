import React from 'react';
import { motion } from 'framer-motion';
import { Star, Users, TrendingUp, Award, Download, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SponsorsPage: React.FC = () => {
  const navigate = useNavigate();

  const sponsorsActuales = [
    { nombre: 'Fisiohands Terapiafisica', logo: '/images/travis.jpg', categoria: 'Terapia Física', enlace: '#' }
  ];

  const paquetes = [
    {
      nombre: 'Bronce',
      precio: '$5,000',
      beneficios: [
        'Logo en uniforme de entrenamiento',
        'Menciones en redes sociales (2x/mes)',
        'Foto con producto en Instagram',
        'Acceso a eventos deportivos'
      ],
      destacado: false
    },
    {
      nombre: 'Plata',
      precio: '$12,000',
      beneficios: [
        'Logo prominente en uniforme de competencia',
        'Menciones en redes sociales (5x/mes)',
        'Video promocional dedicado',
        'Aparición en entrevistas de prensa',
        'Evento exclusivo con marca'
      ],
      destacado: true
    },
    {
      nombre: 'Oro',
      precio: '$25,000',
      beneficios: [
        'Logo principal en uniforme de competencia',
        'Menciones diarias en redes sociales',
        'Serie de videos promocionales',
        'Apariciones en medios de comunicación',
        'Eventos exclusivos y meet & greet',
        'Contenido personalizado para marca'
      ],
      destacado: false
    }
  ];

  const metricas = [
    { categoria: 'Seguidores Instagram', valor: '15.2K', icon: Users },
    { categoria: 'Alcance Promedio', valor: '45K', icon: TrendingUp },
    { categoria: 'Engagement Rate', valor: '8.5%', icon: Award },
    { categoria: 'Audiencia Demográfica', valor: '18-35', icon: Award }
  ];

  const handleSeleccionarPaquete = (paquete: string) => {
    // Navega a la página de contacto con información del paquete
    navigate('/contacto', { state: { paquete } });
  };

  const handleDescargarMediaKit = () => {
    // Navega a la página de media kit
    navigate('/media-kit');
  };

  const handleContactar = () => {
    // Navega a la página de contacto
    navigate('/contacto');
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Mobile Background Image */}
        <div className="absolute inset-0 block lg:hidden">
          <img
            src="/images/photo_14_2025-08-13_23-49-23.jpg"
            alt="Oportunidades de patrocinio - Vista móvil"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>

        {/* Desktop Background Image */}
        <div className="absolute inset-0 hidden lg:block">
          <img
            src="/images/photo_12_2025-08-13_23-49-23.jpg"
            alt="Oportunidades de patrocinio - Vista desktop"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>

        <div className="relative z-10 h-full flex items-center justify-center text-center text-white">
          <div className="max-w-4xl px-4">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-4"
            >
              Aliados que impulsan cada meta
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl max-w-2xl mx-auto"
            >
              Fisiohands Terapia Física (logo + enlace). Propuesta de valor para futuros patrocinadores. {/* Removed Media Kit reference */}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contenido Principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        {/* Propuesta de Valor */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-8 text-center">
            Propuesta de Valor
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {metricas.map((metrica, index) => (
              <motion.div
                key={metrica.categoria}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-8 text-center"
              >
                <metrica.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                <div className="text-3xl font-bold text-primary mb-2">{metrica.valor}</div>
                <div className="text-stone-600 font-medium">{metrica.categoria}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Sponsors Actuales */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-8 text-center">
            Patrocinadores Actuales
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sponsorsActuales.map((sponsor, index) => (
              <motion.div
                key={sponsor.nombre}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-8 text-center"
              >
                <div className="w-24 h-24 rounded-lg overflow-hidden mx-auto mb-6">
                  <img
                    src={sponsor.logo}
                    alt={sponsor.nombre}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold text-stone-800 text-xl mb-2">{sponsor.nombre}</h3>
                <p className="text-stone-600">{sponsor.categoria}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Paquetes de Patrocinio */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-8 text-center">
            Paquetes de Patrocinio
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {paquetes.map((paquete, index) => (
              <motion.div
                key={paquete.nombre}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className={`bg-white rounded-xl shadow-lg p-8 ${
                  paquete.destacado ? 'ring-2 ring-primary scale-105' : ''
                }`}
              >
                {paquete.destacado && (
                  <div className="bg-primary text-white text-center py-2 px-4 rounded-full text-sm font-medium mb-6">
                    Más Popular
                  </div>
                )}
                <h3 className="font-serif text-2xl font-bold text-primary mb-4">{paquete.nombre}</h3>
                <div className="text-4xl font-bold text-stone-800 mb-6">{paquete.precio}</div>
                <ul className="space-y-3 mb-8">
                  {paquete.beneficios.map((beneficio, idx) => (
                    <li key={idx} className="flex items-start">
                      <Star className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-stone-600">{beneficio}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleSeleccionarPaquete(paquete.nombre)}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors duration-300 ${
                    paquete.destacado
                      ? 'bg-primary text-white hover:bg-primary/90'
                      : 'bg-stone-100 text-stone-800 hover:bg-stone-200'
                  }`}
                >
                  Seleccionar Paquete
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Principal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-primary rounded-xl shadow-lg p-8 md:p-12 text-white text-center"
        >
          <h3 className="font-serif text-3xl font-bold mb-6">
            ¿Interesado en Patrocinar?
          </h3>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Descarga nuestro media kit completo con estadísticas detalladas, 
            propuestas personalizadas y casos de éxito de patrocinadores actuales.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
              {/* Removed Media Kit button */}
            <button
              onClick={handleContactar}
              className="border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-primary transition-colors duration-300 flex items-center justify-center"
            >
              <Mail className="w-5 h-5 mr-2" />
              Contactar para Más Info
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SponsorsPage;
