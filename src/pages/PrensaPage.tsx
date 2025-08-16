import React from 'react';
import { motion } from 'framer-motion';
import { 
  Download, 
  Image, 
  FileText, 
  Video, 
  Calendar, 
  Mail, 
  Users, 
  TrendingUp, 
  Award, 
  Star,
  ExternalLink
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PrensaPage: React.FC = () => {
  const navigate = useNavigate();
  const notas = [
    {
      id: 1,
      medio: 'La Nación',
      año: '2023',
      titular: 'Atleta costarricense rompe récord en 100m',
      enlace: '#',
      logo: '/images/travis.jpg'
    },
    {
      id: 2,
      medio: 'CRHoy',
      año: '2023',
      titular: 'Nuevo campeón centroamericano en velocidad',
      enlace: '#',
      logo: '/images/TRAVIS.jpeg'
    },
    {
      id: 3,
      medio: 'El Financiero',
      año: '2022',
      titular: 'La dedicación detrás del éxito deportivo',
      enlace: '#',
      logo: '/images/cr7.jpg'
    },
    {
      id: 4,
      medio: 'Teletica',
      año: '2022',
      titular: 'Entrevista exclusiva con el velocista',
      enlace: '#',
      logo: '/images/cr7a.webp'
    }
  ];

  const testimonios = [
    {
      id: 1,
      nombre: 'Carlos Mora',
      cargo: 'Entrenador',
      texto: 'Su dedicación y disciplina son ejemplares. Cada día veo su progreso y sé que aún tiene mucho potencial por desarrollar.',
      imagen: '/images/diablo.jpg'
    },
    {
      id: 2,
      nombre: 'María González',
      cargo: 'Periodista Deportiva',
      texto: 'Es un atleta que representa los valores del deporte costarricense. Su humildad y trabajo duro lo hacen un ejemplo a seguir.',
      imagen: '/images/w.jpg'
    },
    {
      id: 3,
      nombre: 'Nike Costa Rica',
      cargo: 'Patrocinador',
      texto: 'Su profesionalismo y resultados nos han impresionado. Es un orgullo tenerlo como parte de nuestra familia deportiva.',
      imagen: '/images/carreta.webp'
    }
  ];

  const descargables = [
    { nombre: 'Bio Completa', tipo: 'PDF', tamaño: '2.3 MB', icon: FileText },
    { nombre: 'Headshots', tipo: 'ZIP', tamaño: '15.7 MB', icon: Download },
    { nombre: 'Fotos de Competencia', tipo: 'ZIP', tamaño: '28.4 MB', icon: Download },
    { nombre: 'Permisos de Uso', tipo: 'PDF', tamaño: '1.1 MB', icon: FileText }
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Mobile Background Image */}
        <div className="absolute inset-0 block lg:hidden">
          <img
            src="/images/photo_13_2025-08-13_23-49-23.jpg"
            alt="Prensa y medios - Vista móvil"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>

        {/* Desktop Background Image */}
        <div className="absolute inset-0 hidden lg:block">
          <img
            src="/images/photo_29_2025-08-13_23-49-23.jpg"
            alt="Prensa y medios - Vista desktop"
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
              Presencia en medios
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl max-w-2xl mx-auto"
            >
              Notas y entrevistas en medios locales e internacionales (añadir enlaces y logos de medios). Kit de prensa descargable con bio, fotos y estadísticas.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contenido Principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        {/* Notas y Entrevistas */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-8 text-center">
            Notas y Entrevistas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {notas.map((nota, index) => (
              <motion.div
                key={nota.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={nota.logo}
                      alt={nota.medio}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-stone-800 text-lg">{nota.medio}</h3>
                      <span className="text-sm text-stone-500">{nota.año}</span>
                    </div>
                    <p className="text-stone-600 mb-4">{nota.titular}</p>
                    <a
                      href={nota.enlace}
                      className="inline-flex items-center text-primary hover:text-primary/80 transition-colors duration-300"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Leer nota completa
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonios */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-8 text-center">
            Testimonios
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonios.map((testimonio, index) => (
              <motion.div
                key={testimonio.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-8 text-center"
              >
                <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-6">
                  <img
                    src={testimonio.imagen}
                    alt={testimonio.nombre}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-stone-600 italic mb-6">"{testimonio.texto}"</p>
                <h4 className="font-semibold text-stone-800 text-lg">{testimonio.nombre}</h4>
                <p className="text-stone-500 text-sm">{testimonio.cargo}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recursos Descargables */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-8 md:p-12"
        >
          <h2 className="font-serif text-3xl font-bold text-primary mb-8 text-center">
            Recursos para Medios
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {descargables.map((item, index) => (
              <motion.div
                key={item.nombre}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="p-6 bg-stone-50 rounded-lg text-center hover:bg-stone-100 transition-colors duration-300"
              >
                <item.icon className="w-8 h-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-stone-800 mb-2">{item.nombre}</h3>
                <p className="text-sm text-stone-600 mb-3">{item.tipo} • {item.tamaño}</p>
                <button 
                  onClick={() => navigate('/media-kit')}
                  className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors duration-300"
                >
                  Descargar
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contacto para Prensa */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 md:mt-20 bg-primary rounded-xl shadow-lg p-8 md:p-12 text-white text-center"
        >
          <h3 className="font-serif text-3xl font-bold mb-6">
            ¿Eres Periodista?
          </h3>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Estoy disponible para entrevistas, comentarios y colaboraciones con medios de comunicación. 
            Contacta conmigo para coordinar cualquier solicitud de prensa.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/contacto')}
              className="bg-white text-primary font-semibold py-3 px-8 rounded-lg hover:bg-stone-100 transition-colors duration-300"
            >
              Solicitar Entrevista
            </button>
            <button 
              onClick={() => navigate('/contacto')}
              className="border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-primary transition-colors duration-300"
            >
              Contactar Agente
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrensaPage;
