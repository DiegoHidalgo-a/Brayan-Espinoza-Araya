import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { TrendingUp, Clock, Target, Award } from 'lucide-react';
import BackgroundPattern from './BackgroundPattern';

const EstadisticasSection: React.FC = () => {
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

  const prs = [
    { prueba: 'Salto de longitud', marca: '6,67 m', evento: 'Competencia Nacional 2025', fecha: '09 Mar 2025' },
    { prueba: 'Salto triple', marca: '13,43 m', evento: 'Campeonato Nacional 2023', fecha: '30 Abr 2023' },
    { prueba: '4x100m', marca: '—', evento: 'Centroamericano U18 y U20', fecha: '2025' },
    { prueba: 'Ranking', marca: '1° U20 · 3° nacional', evento: 'Ranking Nacional', fecha: '2025' },
  ];

  const progresionAnual = [
    { año: '2019', saltoLongitud: '5,80m', saltoTriple: '—' },
    { año: '2021', saltoLongitud: '6,45m', saltoTriple: '—' },
    { año: '2022', saltoLongitud: '6,50m', saltoTriple: '13,43m' },
    { año: '2025', saltoLongitud: '6,67m', saltoTriple: '13,43m' },
  ];

  const topPerformances = [
    { posicion: 1, marca: '6,67m', evento: 'Competencia Nacional', fecha: 'Mar 2025', viento: '+1.2 m/s' },
    { posicion: 2, marca: '6,50m', evento: 'Campeonato Nacional', fecha: 'Ago 2022', viento: '+0.8 m/s' },
    { posicion: 3, marca: '6,45m', evento: 'Campeonato Juvenil', fecha: 'Jul 2021', viento: '-0.5 m/s' },
    { posicion: 4, marca: '6,30m', evento: 'Copa Nacional', fecha: 'Sep 2020', viento: '+1.0 m/s' },
    { posicion: 5, marca: '6,20m', evento: 'Liga Nacional', fecha: 'May 2020', viento: '+0.3 m/s' },
  ];

  return (
    <section className="relative py-20 md:py-24 lg:py-28 px-4 sm:px-6" ref={sectionRef}>
      <BackgroundPattern type="lines" className="text-primary" opacity={0.03} />
      <div className="max-w-7xl mx-auto">
        {/* Encabezado */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20 lg:mb-24"
        >
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6">
            Progreso medible, metas claras
          </h2>
          <p className="text-stone-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            PB Salto de longitud: 6,67 m – 09/03/2025. PB Salto triple: 13,43 m – 30/04/2023. Ranking: 1° U20 · 3° nacional. Annual progression: gráfico de marcas desde 2019.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* PRs por Prueba */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInUp}
            transition={{ duration: 0.7, delay: 0.2 }}
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
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={fadeInUp}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex justify-between items-center p-4 bg-stone-50 rounded-lg"
                >
                  <div>
                    <h4 className="font-semibold text-stone-800 text-lg">{pr.prueba}</h4>
                    <p className="text-sm text-stone-600">{pr.evento}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-primary text-xl">{pr.marca}</div>
                    <div className="text-xs text-stone-500">{pr.fecha}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Progresión Anual */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={scaleUp}
            transition={{ duration: 0.7, delay: 0.4 }}
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
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={fadeInUp}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="p-4 bg-stone-50 rounded-lg"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-bold text-stone-800 text-lg">{año.año}</h4>
                    <div className="text-sm text-stone-500">Mejores marcas</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-stone-600">Salto de longitud</div>
                      <div className="font-semibold text-primary">{año.saltoLongitud}</div>
                    </div>
                    <div>
                      <div className="text-sm text-stone-600">Salto triple</div>
                      <div className="font-semibold text-primary">{año.saltoTriple}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Top 5 Performances */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 md:mt-20 bg-white rounded-xl shadow-lg p-8 md:p-12"
        >
          <div className="flex items-center mb-8">
            <Target className="w-8 h-8 text-primary mr-3" />
            <h3 className="font-serif text-3xl font-bold text-primary">
              Top 5 Performances - Salto de Longitud
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
                </tr>
              </thead>
              <tbody>
                {topPerformances.map((performance, index) => (
                  <motion.tr
                    key={performance.posicion}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={fadeInUp}
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
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
          o</div>
    </section>
  );
};

export default EstadisticasSection;