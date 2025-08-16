import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Target, Trophy, Clock, ExternalLink } from 'lucide-react';

const CalendarioPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('proximas');

  const proximasCompetencias = [
    {
      id: 1,
      fecha: '2025',
      evento: 'Juegos Deportivos Nacionales 2025',
      sede: 'Limón',
      prueba: 'Salto de longitud, Salto triple',
      objetivo: 'Mejorar marcas personales',
      estado: 'proximo'
    },
    {
      id: 2,
      fecha: '2026',
      evento: 'Temporada 2026',
      sede: 'Preparación',
      prueba: 'Entrenamiento y preparación',
      objetivo: 'Preparación para competencias internacionales',
      estado: 'proximo'
    }
  ];

  const resultadosRecientes = [
    {
      id: 1,
      fecha: '2025',
      evento: 'Centroamericano U18 y U20',
      sede: 'El Salvador',
      prueba: '4x100',
      posicion: 'Oro, Plata y Bronce',
      marca: '—',
      viento: '—',
      enlace: '#'
    },
    {
      id: 2,
      fecha: '2025',
      evento: 'Juegos Universitarios Centroamericanos',
      sede: 'Honduras',
      prueba: '4x100',
      posicion: 'Oro',
      marca: '—',
      viento: '—',
      enlace: '#'
    }
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Mobile Background Image */}
        <div className="absolute inset-0 block lg:hidden">
          <img
            src="/images/photo_8_2025-08-13_23-49-23.jpg"
            alt="Calendario de competencias - Vista móvil"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>

        {/* Desktop Background Image */}
        <div className="absolute inset-0 hidden lg:block">
          <img
            src="/images/photo_26_2025-08-13_23-49-23.jpg"
            alt="Calendario de competencias - Vista desktop"
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
              Calendario de Competencias
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl max-w-2xl mx-auto"
            >
              Próximas competencias y resultados recientes
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contenido Principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="flex justify-center">
            <div className="flex bg-white rounded-lg shadow-lg p-1">
              <button
                onClick={() => setActiveTab('proximas')}
                className={`px-8 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === 'proximas'
                    ? 'bg-primary text-white shadow-lg'
                    : 'text-stone-600 hover:text-stone-800'
                }`}
              >
                Próximas Competencias
              </button>
              <button
                onClick={() => setActiveTab('recientes')}
                className={`px-8 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === 'recientes'
                    ? 'bg-primary text-white shadow-lg'
                    : 'text-stone-600 hover:text-stone-800'
                }`}
              >
                Resultados Recientes
              </button>
            </div>
          </div>
        </motion.div>

        {/* Próximas Competencias */}
        {activeTab === 'proximas' && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {proximasCompetencias.map((competencia, index) => (
              <motion.div
                key={competencia.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-primary"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <div className="flex items-center mb-4">
                      <Calendar className="w-6 h-6 text-primary mr-3" />
                      <h3 className="font-serif text-2xl font-bold text-primary">
                        {competencia.evento}
                      </h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center text-stone-600">
                        <Clock className="w-4 h-4 mr-2" />
                        {competencia.fecha}
                      </div>
                      <div className="flex items-center text-stone-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        {competencia.sede}
                      </div>
                      <div className="flex items-center text-stone-600">
                        <Target className="w-4 h-4 mr-2" />
                        Pruebas: {competencia.prueba}
                      </div>
                    </div>
                  </div>
                  <div className="bg-stone-50 rounded-lg p-6">
                    <h4 className="font-semibold text-stone-800 mb-3">Objetivos</h4>
                    <div className="space-y-2">
                      {competencia.objetivo.split(', ').map((obj, idx) => (
                        <div key={idx} className="text-primary font-bold">
                          {obj}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Resultados Recientes */}
        {activeTab === 'recientes' && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {resultadosRecientes.map((resultado, index) => (
              <motion.div
                key={resultado.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-green-500"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <Trophy className="w-6 h-6 text-green-500 mr-3" />
                        <h3 className="font-serif text-2xl font-bold text-primary">
                          {resultado.evento}
                        </h3>
                      </div>
                      <span className="text-green-500 font-bold text-lg">
                        {resultado.posicion}
                      </span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center text-stone-600">
                        <Clock className="w-4 h-4 mr-2" />
                        {resultado.fecha}
                      </div>
                      <div className="flex items-center text-stone-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        {resultado.sede}
                      </div>
                      <div className="flex items-center text-stone-600">
                        <Target className="w-4 h-4 mr-2" />
                        {resultado.prueba}
                      </div>
                    </div>
                  </div>
                  <div className="bg-stone-50 rounded-lg p-6">
                    <h4 className="font-semibold text-stone-800 mb-3">Resultado</h4>
                    <div className="space-y-2">
                      <div className="text-primary font-bold text-xl">
                        {resultado.marca}
                      </div>
                      <div className="text-sm text-stone-600">
                        Viento: {resultado.viento}
                      </div>
                      <a
                        href={resultado.enlace}
                        className="inline-flex items-center text-primary hover:text-primary/80 transition-colors duration-300"
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Ver resultados
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Estadísticas del Calendario */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 md:mt-20 bg-white rounded-xl shadow-lg p-8 md:p-12"
        >
          <h3 className="font-serif text-3xl font-bold text-primary mb-8 text-center">
            Resumen de Temporada 2024
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">20</div>
              <div className="text-stone-600 font-medium">Competencias Planificadas</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-green-500 mb-2">4</div>
              <div className="text-stone-600 font-medium">Próximas Competencias</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-500 mb-2">3</div>
              <div className="text-stone-600 font-medium">Resultados Recientes</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-yellow-500 mb-2">10.35s</div>
              <div className="text-stone-600 font-medium">Objetivo 100m</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CalendarioPage;
