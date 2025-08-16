import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Calendar, MapPin, Award, Star } from 'lucide-react';

const LogrosPage: React.FC = () => {
  const [filter, setFilter] = useState('todos');

  const logros = [
    // 2019 - Campo traviesa y heptatlón
    {
      año: 2019,
      evento: 'Campeonato nacional de campo traviesa categoría U14',
      ubicacion: 'Costa Rica',
      resultado: 'Medalla de plata, distancia 2 km, marca 8,09 minutos',
      categoria: 'Campo traviesa',
      destacado: false
    },
    {
      año: 2019,
      evento: 'Campeonato centroamericano de campo traviesa categoría U14',
      ubicacion: 'Centroamérica',
      resultado: 'Medalla de bronce, distancia 2 km, marca 8,01 minutos',
      categoria: 'Campo traviesa',
      destacado: false
    },
    {
      año: 2019,
      evento: 'Juegos Deportivos Nacionales en la prueba de heptatlón categoría U14',
      ubicacion: 'Costa Rica',
      resultado: 'Medalla de oro, puntaje 4427',
      categoria: 'Heptatlón',
      destacado: true
    },
    {
      año: 2019,
      evento: 'Juegos deportivos estudiantiles en la prueba de salto de altura categoría C',
      ubicacion: 'Costa Rica',
      resultado: 'Medalla de oro, marca 1,66m',
      categoria: 'Salto de altura',
      destacado: true
    },
    {
      año: 2019,
      evento: 'Clasificado a los juegos deportivos centroamericanos estudiantiles en el país de Honduras',
      ubicacion: 'Honduras',
      resultado: 'Cuarto lugar en salto de altura, marca 1,60m',
      categoria: 'Salto de altura',
      destacado: false
    },
    {
      año: 2019,
      evento: 'Campeonato nacional U14 y U16 en la prueba de heptatlón',
      ubicacion: 'Costa Rica',
      resultado: 'Medalla de plata, puntaje 3947',
      categoria: 'Heptatlón',
      destacado: false
    },
    {
      año: 2019,
      evento: 'Campeonato centroamericano U14 y U16 en el país El Salvador',
      ubicacion: 'El Salvador',
      resultado: 'Medalla de plata en el relevo 4x100, Cuarto lugar en heptatlón, puntaje 4180',
      categoria: 'Relevos y Heptatlón',
      destacado: false
    },
    {
      año: 2019,
      evento: 'Campeonato por ranking año 2019 categoría U14',
      ubicacion: 'Costa Rica',
      resultado: 'Oro en 80 plano (marca 10,16s), Oro en salto de longitud (marca 5,40m), Oro en lanzamiento de bola (marca 55,79m)',
      categoria: 'Múltiples pruebas',
      destacado: true
    },

    // 2021 - Vallas y salto de longitud
    {
      año: 2021,
      evento: 'Campeonato nacional de asociaciones año 2021 categoría mayor',
      ubicacion: 'Costa Rica',
      resultado: 'Bronce en 110 vallas, marca 17,41s',
      categoria: 'Vallas',
      destacado: false
    },
    {
      año: 2021,
      evento: 'Juegos deportivos nacionales 2021 categoría U16',
      ubicacion: 'Costa Rica',
      resultado: 'Oro en salto de longitud (marca 6,08m), Plata en 100 metros con vallas (marca 15,24s)',
      categoria: 'Salto de longitud y Vallas',
      destacado: true
    },

    // 2022 - Salto de longitud
    {
      año: 2022,
      evento: 'Campeonato nacional categoría U18 y U20 año 2022',
      ubicacion: 'Costa Rica',
      resultado: 'Oro en salto de longitud, marca 6,64m',
      categoria: 'Salto de longitud',
      destacado: false
    },
    {
      año: 2022,
      evento: 'Campeonato centroamericano U18 y U20 en el país de Nicaragua Managua año 2022',
      ubicacion: 'Nicaragua, Managua',
      resultado: 'Medalla de plata en salto de longitud (marca 6,31m), Medalla de bronce de salto de altura (marca 1,77m)',
      categoria: 'Salto de longitud y Salto de altura',
      destacado: false
    },

    // 2023 - Salto de longitud y triple
    {
      año: 2023,
      evento: 'Juegos deportivos nacionales categoría U18 año 2023',
      ubicacion: 'Costa Rica',
      resultado: 'Oro en salto de longitud (marca 6,22m), Bronce en salto de altura (marca 1,75m)',
      categoria: 'Salto de longitud y Salto de altura',
      destacado: false
    },
    {
      año: 2023,
      evento: 'Campeonato nacional categoría U18 y U20 año 2023',
      ubicacion: 'Costa Rica',
      resultado: 'Oro en salto de longitud (marca 6,32m), Oro en salto triple (marca 13,43m)',
      categoria: 'Salto de longitud y Salto triple',
      destacado: true
    },
    {
      año: 2023,
      evento: 'Campeonato Centroamericano U18 y U20 en el país de Guatemala Ciudad de Guatemala año 2023',
      ubicacion: 'Guatemala, Ciudad de Guatemala',
      resultado: 'Plata en salto de longitud (marca 6,40m), Bronce en salto triple (marca 13,28m)',
      categoria: 'Salto de longitud y Salto triple',
      destacado: false
    },
    {
      año: 2023,
      evento: 'NACAC categoría U18 y U23 año 2023',
      ubicacion: 'NACAC',
      resultado: 'No pude competir por lesión',
      categoria: 'Salto triple',
      destacado: false
    },

    // 2024 - Salto de longitud y triple
    {
      año: 2024,
      evento: 'Campeonato nacional categoría U18 y U20 año 2024',
      ubicacion: 'Costa Rica',
      resultado: 'Plata en salto de longitud, marca 6,25m',
      categoria: 'Salto de longitud',
      destacado: false
    },
    {
      año: 2024,
      evento: 'Campeonato nacional mayor año 2024',
      ubicacion: 'Costa Rica',
      resultado: 'Plata en salto de longitud, marca 6,19m',
      categoria: 'Salto de longitud',
      destacado: false
    },
    {
      año: 2024,
      evento: 'Juegos deportivos nacionales categoría U20 año 2024',
      ubicacion: 'Costa Rica',
      resultado: 'Oro en salto triple (marca 12,67m), Bronce en salto de longitud (marca 6,07m)',
      categoria: 'Salto triple y Salto de longitud',
      destacado: true
    },

    // 2025 - Salto de longitud, triple y relevos
    {
      año: 2025,
      evento: 'Campeonato nacional Categoría U18 y U20 año 2025',
      ubicacion: 'Costa Rica',
      resultado: 'Bronce en salto de longitud (marca 6,37m), Plata en salto triple (marca 12,75m)',
      categoria: 'Salto de longitud y Salto triple',
      destacado: false
    },
    {
      año: 2025,
      evento: 'Campeonato centroamericano Categoría U18 y U20 en el país de El Salvador año 2025',
      ubicacion: 'El Salvador',
      resultado: 'Oro en relevos 4x100 (marca 42,97s), Plata en salto de longitud (marca 6,11m), Bronce en salto triple (marca 12,05m)',
      categoria: 'Relevos, Salto de longitud y Salto triple',
      destacado: true
    },
    {
      año: 2025,
      evento: 'Juegos Deportivos Universitarios en el país de Honduras año 2025',
      ubicacion: 'Honduras',
      resultado: 'Oro en relevo 4x100, marca 43,05s',
      categoria: 'Relevos',
      destacado: true
    }
  ];

  const logrosFiltrados = logros.filter(logro => {
    if (filter === 'todos') return true;
    if (filter === 'oro') return logro.resultado.includes('Oro');
    if (filter === 'plata') return logro.resultado.includes('Plata');
    if (filter === 'bronce') return logro.resultado.includes('Bronce');
    if (filter === '2025') return logro.año === 2025;
    if (filter === '2024') return logro.año === 2024;
    if (filter === '2023') return logro.año === 2023;
    if (filter === '2022') return logro.año === 2022;
    if (filter === '2021') return logro.año === 2021;
    if (filter === '2019') return logro.año === 2019;
    return true;
  });

  const totalOros = logros.filter(l => l.resultado.includes('Oro')).length;
  const totalPlatas = logros.filter(l => l.resultado.includes('Plata')).length;
  const totalBronces = logros.filter(l => l.resultado.includes('Bronce')).length;

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Mobile Background Image */}
        <div className="absolute inset-0 block lg:hidden">
          <img
            src="/images/photo_5_2025-08-13_23-49-23.jpg"
            alt="Brayan Espinoza con medallas - Vista móvil"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>

        {/* Desktop Background Image */}
        <div className="absolute inset-0 hidden lg:block">
          <img
            src="/images/photo_24_2025-08-13_23-49-23.jpg"
            alt="Brayan Espinoza con medallas - Vista desktop"
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
              Logros y Medallas
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl max-w-2xl mx-auto"
            >
              Una trayectoria de éxitos que refleja años de dedicación y pasión
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contenido Principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        {/* Estadísticas Rápidas */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-8 text-center">
            Resumen de Logros
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <div className="text-4xl font-bold text-yellow-500 mb-2">{totalOros}</div>
              <div className="text-stone-600 font-medium">Medallas de Oro</div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <div className="text-4xl font-bold text-gray-400 mb-2">{totalPlatas}</div>
              <div className="text-stone-600 font-medium">Medallas de Plata</div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <Star className="w-16 h-16 text-amber-600 mx-auto mb-4" />
              <div className="text-4xl font-bold text-amber-600 mb-2">{totalBronces}</div>
              <div className="text-stone-600 font-medium">Medallas de Bronce</div>
            </div>
          </div>
        </motion.div>

        {/* Filtros */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-wrap justify-center gap-4">
            {['todos', 'oro', 'plata', 'bronce', '2025', '2024', '2023', '2022', '2021', '2019'].map((filtro) => (
              <button
                key={filtro}
                onClick={() => setFilter(filtro)}
                className={`px-6 py-3 rounded-full font-medium transition-colors duration-300 ${
                  filter === filtro
                    ? 'bg-primary text-white'
                    : 'bg-white text-stone-600 hover:bg-stone-100'
                }`}
              >
                {filtro === 'todos' ? 'Todos' : 
                 filtro === 'oro' ? 'Oro' :
                 filtro === 'plata' ? 'Plata' :
                 filtro === 'bronce' ? 'Bronce' : filtro}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Lista de Logros */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-6"
        >
          {logrosFiltrados.map((logro, index) => (
            <motion.div
              key={`${logro.año}-${logro.evento}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`bg-white rounded-xl shadow-lg p-6 md:p-8 ${
                logro.destacado ? 'ring-2 ring-primary' : ''
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-primary text-white px-3 py-1 rounded-full text-sm font-bold">
                      {logro.año}
                    </div>
                    {logro.destacado && (
                      <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                        Destacado
                      </div>
                    )}
                  </div>
                  <h3 className="font-semibold text-stone-800 text-lg md:text-xl mb-2">
                    {logro.evento}
                  </h3>
                  <div className="flex items-center gap-4 text-stone-600 text-sm mb-3">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{logro.ubicacion}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Trophy className="w-4 h-4" />
                      <span>{logro.categoria}</span>
                    </div>
                  </div>
                  <div className="text-primary font-semibold text-lg">
                    {logro.resultado}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Información Adicional */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 bg-primary rounded-xl shadow-lg p-8 md:p-12 text-white text-center"
        >
          <h3 className="font-serif text-3xl font-bold mb-6">
            Próximos Objetivos
          </h3>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Juegos deportivos nacionales 2025 en Limón y preparándome para la temporada 2026
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="bg-white/20 rounded-lg px-6 py-3">
              <div className="text-sm font-medium">Próxima Competencia</div>
              <div className="text-lg font-bold">Juegos Deportivos Nacionales 2025</div>
              <div className="text-sm">Limón, Costa Rica</div>
            </div>
            <div className="bg-white/20 rounded-lg px-6 py-3">
              <div className="text-sm font-medium">Objetivo</div>
              <div className="text-lg font-bold">Temporada 2026</div>
              <div className="text-sm">Preparación en curso</div>
            </div>
          </div>
        </motion.div>

        {/* Progresión Temporal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-8 text-center">
            Progresión de Marcas por Año
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Salto de Longitud */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-semibold text-stone-800 text-xl mb-4 text-center">Salto de Longitud</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-stone-600">2019:</span>
                  <span className="font-semibold text-primary">5,40m</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-600">2021:</span>
                  <span className="font-semibold text-primary">6,08m</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-600">2022:</span>
                  <span className="font-semibold text-primary">6,64m</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-600">2023:</span>
                  <span className="font-semibold text-primary">6,32m</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-600">2024:</span>
                  <span className="font-semibold text-primary">6,25m</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-600">2025:</span>
                  <span className="font-bold text-primary text-lg">6,67m</span>
                </div>
              </div>
            </div>

            {/* Salto Triple */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-semibold text-stone-800 text-xl mb-4 text-center">Salto Triple</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-stone-600">2023:</span>
                  <span className="font-semibold text-primary">13,43m</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-600">2024:</span>
                  <span className="font-semibold text-primary">12,67m</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-600">2025:</span>
                  <span className="font-semibold text-primary">12,75m</span>
                </div>
              </div>
            </div>

            {/* Relevos 4x100 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-semibold text-stone-800 text-xl mb-4 text-center">Relevo 4x100</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-stone-600">2019:</span>
                  <span className="font-semibold text-primary">Plata</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-600">2025:</span>
                  <span className="font-bold text-primary text-lg">42,97s</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-600">2025:</span>
                  <span className="font-semibold text-primary">43,05s</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LogrosPage;
