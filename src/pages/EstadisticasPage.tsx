import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Target, Award, BarChart3, Calendar, Wind } from 'lucide-react';

const EstadisticasPage: React.FC = () => {
  const prs = [
    { prueba: '100m', marca: '10.45s', evento: 'Campeonato Centroamericano 2023', fecha: '15 Jun 2023', viento: '+1.2 m/s' },
    { prueba: '200m', marca: '21.34s', evento: 'Copa Nacional 2022', fecha: '22 Ago 2022', viento: '+0.8 m/s' },
    { prueba: '4x100m', marca: '40.12s', evento: 'Juegos Centroamericanos 2022', fecha: '5 Jul 2022', viento: 'N/A' },
    { prueba: '60m Indoor', marca: '6.78s', evento: 'Copa Indoor 2023', fecha: '12 Mar 2023', viento: 'N/A' },
  ];

  const progresionAnual = [
    { año: '2020', marca100m: '10.78s', marca200m: '22.15s', competencias: 8 },
    { año: '2021', marca100m: '10.65s', marca200m: '21.78s', competencias: 12 },
    { año: '2022', marca100m: '10.52s', marca200m: '21.34s', competencias: 15 },
    { año: '2023', marca100m: '10.45s', marca200m: '21.45s', competencias: 18 },
  ];

  const topPerformances = [
    { posicion: 1, marca: '10.45s', evento: 'Campeonato Centroamericano', fecha: 'Jun 2023', viento: '+1.2 m/s', condicion: 'Óptima' },
    { posicion: 2, marca: '10.52s', evento: 'Campeonato Nacional', fecha: 'Ago 2023', viento: '+0.8 m/s', condicion: 'Buena' },
    { posicion: 3, marca: '10.58s', evento: 'Juegos Centroamericanos', fecha: 'Jul 2022', viento: '-0.5 m/s', condicion: 'Adversa' },
    { posicion: 4, marca: '10.65s', evento: 'Copa Nacional', fecha: 'Sep 2021', viento: '+1.0 m/s', condicion: 'Buena' },
    { posicion: 5, marca: '10.72s', evento: 'Liga Nacional', fecha: 'May 2021', viento: '+0.3 m/s', condicion: 'Buena' },
  ];

  const estadisticasGenerales = [
    { categoria: 'Competencias Totales', valor: '53', descripcion: 'Desde 2020' },
    { categoria: 'Podios', valor: '12', descripcion: '8 oro, 3 plata, 1 bronce' },
    { categoria: 'Mejora Promedio', valor: '0.11s', descripcion: 'Por año en 100m' },
    { categoria: 'Ranking Nacional', valor: '#3', descripcion: 'Actual en 100m' },
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Mobile Background Image */}
        <div className="absolute inset-0 block lg:hidden">
          <img
            src="/images/photo_12_2025-08-13_23-49-23.jpg"
            alt="Brayan Espinoza - Análisis de estadísticas - Vista móvil"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>

        {/* Desktop Background Image */}
        <div className="absolute inset-0 hidden lg:block">
          <img
            src="/images/photo_22_2025-08-13_23-49-23.jpg"
            alt="Brayan Espinoza - Análisis de estadísticas - Vista desktop"
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
              Estadísticas y Análisis
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl max-w-2xl mx-auto"
            >
              Un análisis detallado de mi progresión y rendimiento
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contenido Principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        {/* Estadísticas Generales */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-8 text-center">
            Estadísticas Generales
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {estadisticasGenerales.map((stat, index) => (
              <motion.div
                key={stat.categoria}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.valor}</div>
                <div className="text-stone-800 font-semibold mb-2">{stat.categoria}</div>
                <div className="text-sm text-stone-600">{stat.descripcion}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* PRs por Prueba */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <div className="flex items-center mb-6">
              <Award className="w-8 h-8 text-primary mr-3" />
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-primary">
                Marcas Personales
              </h3>
            </div>
            <div className="space-y-4">
              {prs.map((pr, index) => (
                <motion.div
                  key={pr.prueba}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="p-4 bg-stone-50 rounded-lg"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-stone-800 text-lg">{pr.prueba}</h4>
                      <p className="text-sm text-stone-600">{pr.evento}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-primary text-xl">{pr.marca}</div>
                      <div className="text-xs text-stone-500">{pr.fecha}</div>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-stone-600">
                    <Wind className="w-4 h-4 mr-2" />
                    Viento: {pr.viento}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Progresión Anual */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <div className="flex items-center mb-6">
              <TrendingUp className="w-8 h-8 text-primary mr-3" />
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-primary">
                Progresión Anual
              </h3>
            </div>
            <div className="space-y-4">
              {progresionAnual.map((año, index) => (
                <motion.div
                  key={año.año}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  className="p-4 bg-stone-50 rounded-lg"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-bold text-stone-800 text-lg">{año.año}</h4>
                    <span className="text-sm text-stone-500">{año.competencias} competencias</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-stone-600">100m</div>
                      <div className="font-semibold text-primary">{año.marca100m}</div>
                    </div>
                    <div>
                      <div className="text-sm text-stone-600">200m</div>
                      <div className="font-semibold text-primary">{año.marca200m}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Top 5 Performances */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 md:mt-20 bg-white rounded-xl shadow-lg p-8 md:p-12"
        >
          <div className="flex items-center mb-8">
            <Target className="w-8 h-8 text-primary mr-3" />
            <h3 className="font-serif text-3xl font-bold text-primary">
              Top 5 Performances - 100m
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-stone-200">
                  <th className="text-left py-4 px-4 font-semibold text-stone-600">#</th>
                  <th className="text-left py-4 px-4 font-semibold text-stone-600">Marca</th>
                  <th className="text-left py-4 px-4 font-semibold text-stone-600">Evento</th>
                  <th className="text-left py-4 px-4 font-semibold text-stone-600">Fecha</th>
                  <th className="text-left py-4 px-4 font-semibold text-stone-600">Viento</th>
                  <th className="text-left py-4 px-4 font-semibold text-stone-600">Condición</th>
                </tr>
              </thead>
              <tbody>
                {topPerformances.map((performance, index) => (
                  <motion.tr
                    key={performance.posicion}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                    className="border-b border-stone-100 hover:bg-stone-50"
                  >
                    <td className="py-4 px-4">
                      <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {performance.posicion}
                      </div>
                    </td>
                    <td className="py-4 px-4 font-bold text-primary text-lg">{performance.marca}</td>
                    <td className="py-4 px-4 text-stone-800">{performance.evento}</td>
                    <td className="py-4 px-4 text-stone-600">{performance.fecha}</td>
                    <td className="py-4 px-4 text-stone-600">{performance.viento}</td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        performance.condicion === 'Óptima' ? 'bg-green-100 text-green-800' :
                        performance.condicion === 'Buena' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {performance.condicion}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Análisis de Rendimiento */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <BarChart3 className="w-8 h-8 text-primary mr-3" />
              <h3 className="font-serif text-2xl font-bold text-primary">
                Análisis de Rendimiento
              </h3>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-stone-50 rounded-lg">
                <div className="text-sm text-stone-600 mb-2">Mejora en 100m (2020-2023)</div>
                <div className="text-2xl font-bold text-primary">0.33s</div>
                <div className="text-xs text-stone-500">Promedio de 0.11s por año</div>
              </div>
              <div className="p-4 bg-stone-50 rounded-lg">
                <div className="text-sm text-stone-600 mb-2">Consistencia</div>
                <div className="text-2xl font-bold text-primary">85%</div>
                <div className="text-xs text-stone-500">Carreras bajo 10.80s</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <Calendar className="w-8 h-8 text-primary mr-3" />
              <h3 className="font-serif text-2xl font-bold text-primary">
                Temporada 2024
              </h3>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-stone-50 rounded-lg">
                <div className="text-sm text-stone-600 mb-2">Objetivo 100m</div>
                <div className="text-2xl font-bold text-primary">10.35s</div>
                <div className="text-xs text-stone-500">Nuevo récord personal</div>
              </div>
              <div className="p-4 bg-stone-50 rounded-lg">
                <div className="text-sm text-stone-600 mb-2">Competencias Planificadas</div>
                <div className="text-2xl font-bold text-primary">20</div>
                <div className="text-xs text-stone-500">Nacionales e internacionales</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EstadisticasPage;
