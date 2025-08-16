import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Trophy, Medal, Award, Star } from 'lucide-react';
import BackgroundPattern from './BackgroundPattern';

const LogrosSection: React.FC = () => {
  const [filter, setFilter] = useState('todos');
  const sectionRef = React.useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const scaleUp = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 }
  };

  const logros = [
    {
      id: 1,
      tipo: 'internacional',
      año: '2025',
      evento: 'Centroamericano U18 y U20',
      posicion: 'Oro',
      prueba: '4x100',
      marca: '—',
      sede: 'El Salvador',
      icon: Trophy,
      color: 'text-yellow-500'
    },
    {
      id: 2,
      tipo: 'internacional',
      año: '2025',
      evento: 'Juegos Universitarios Centroamericanos',
      posicion: 'Oro',
      prueba: '4x100',
      marca: '—',
      sede: 'Honduras',
      icon: Trophy,
      color: 'text-yellow-500'
    },
    {
      id: 3,
      tipo: 'internacional',
      año: '2024',
      evento: 'Centroamericano U18 y U20',
      posicion: 'Oro',
      prueba: '4x100',
      marca: '—',
      sede: 'El Salvador',
      icon: Trophy,
      color: 'text-yellow-500'
    },
    {
      id: 4,
      tipo: 'internacional',
      año: '2023',
      evento: 'Centroamericano U18 y U20',
      posicion: 'Oro',
      prueba: '4x100',
      marca: '—',
      sede: 'El Salvador',
      icon: Trophy,
      color: 'text-yellow-500'
    },
    {
      id: 5,
      tipo: 'nacional',
      año: '2022',
      evento: 'Campeonato Nacional',
      posicion: 'Oro',
      prueba: 'Salto triple',
      marca: '13,43m',
      sede: 'Costa Rica',
      icon: Medal,
      color: 'text-yellow-500'
    },
    {
      id: 6,
      tipo: 'juvenil',
      año: '2021',
      evento: 'Campeonato Juvenil',
      posicion: 'Oro',
      prueba: 'Salto de longitud',
      marca: '6,45m',
      sede: 'Costa Rica',
      icon: Star,
      color: 'text-yellow-500'
    },
    {
      id: 7,
      tipo: 'juvenil',
      año: '2019',
      evento: 'Campeonato U14',
      posicion: 'Oro',
      prueba: 'Salto de longitud',
      marca: '5,80m',
      sede: 'Costa Rica',
      icon: Star,
      color: 'text-yellow-500'
    }
  ];

  const filtros = [
    { id: 'todos', label: 'Todos' },
    { id: 'internacional', label: 'Internacional' },
    { id: 'nacional', label: 'Nacional' },
    { id: 'juvenil', label: 'Juvenil' }
  ];

  const logrosFiltrados = filter === 'todos' 
    ? logros 
    : logros.filter(logro => logro.tipo === filter);

  return (
    <section className="relative py-20 md:py-24 lg:py-28 px-4 sm:px-6 bg-stone-50" ref={sectionRef}>
      <BackgroundPattern type="grid" className="text-primary" opacity={0.02} />
      <div className="max-w-7xl mx-auto">
        {/* Encabezado */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6">
            Resultados que hablan por sí solos
          </h2>
          <p className="text-stone-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Clasificación al Campeonato NACAC en salto triple. Oro en 4x100 – Campeonato Centroamericano U18 y U20 (El Salvador). Oro en 4x100 – Juegos Universitarios Centroamericanos (Honduras).
          </p>
        </motion.div>

        {/* Filtros */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="flex flex-wrap justify-center gap-4">
            {filtros.map((filtro) => (
              <button
                key={filtro.id}
                onClick={() => setFilter(filtro.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  filter === filtro.id
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-white text-stone-600 hover:bg-stone-100 shadow-md'
                }`}
              >
                {filtro.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Grid de Logros */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {logrosFiltrados.map((logro, index) => (
            <motion.div
              key={logro.id}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={scaleUp}
              transition={{ duration: 0.7, delay: 0.3 + index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-start justify-between mb-6">
                <div className={`p-3 rounded-lg bg-stone-100`}>
                  <logro.icon className={`w-8 h-8 ${logro.color}`} />
                </div>
                <span className="text-sm text-stone-500 font-medium">{logro.año}</span>
              </div>
              
              <h3 className="font-serif text-xl font-bold text-primary mb-2">
                {logro.evento}
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-stone-600">Posición:</span>
                  <span className={`font-bold text-lg ${logro.color}`}>
                    {logro.posicion}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-stone-600">Prueba:</span>
                  <span className="font-semibold text-stone-800">{logro.prueba}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-stone-600">Marca:</span>
                  <span className="font-bold text-primary">{logro.marca}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-stone-600">Sede:</span>
                  <span className="font-medium text-stone-800">{logro.sede}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Estadísticas */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 md:mt-20 bg-white rounded-xl shadow-lg p-8 md:p-12"
        >
          <h3 className="font-serif text-3xl font-bold text-primary mb-8 text-center">
            Resumen de Logros
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">12</div>
              <div className="text-stone-600 font-medium">Podios Totales</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-yellow-500 mb-2">8</div>
              <div className="text-stone-600 font-medium">Medallas de Oro</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-gray-400 mb-2">3</div>
              <div className="text-stone-600 font-medium">Medallas de Plata</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-amber-600 mb-2">1</div>
              <div className="text-stone-600 font-medium">Medalla de Bronce</div>
            </div>
          </div>
        </motion.div>

        {/* Removed CTA Button */}
      </div>
    </section>
  );
};

export default LogrosSection;
