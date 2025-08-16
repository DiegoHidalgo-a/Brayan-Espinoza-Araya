import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Calendar, MapPin, Trophy, Target } from 'lucide-react';
import BackgroundPattern from './BackgroundPattern';

const PerfilSection: React.FC = () => {
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

  const datosRapidos = [
    { icon: MapPin, label: 'País', value: 'Costa Rica' },
    { icon: Calendar, label: 'Fecha de nacimiento', value: '29 de Enero, 2006' },
    { icon: Target, label: 'Estatura', value: '181 cm' },
    { icon: Trophy, label: 'Peso', value: '75 kg' },
    { icon: Calendar, label: 'Pruebas principales', value: 'Salto de longitud, salto triple' },
    { icon: Target, label: 'Ranking', value: '1° U20 · 3° nacional' },
  ];

  const hitos = [
    { año: '2025', evento: 'Salto de Longitud PB', marca: '6,67m' },
    { año: '2023', evento: 'Salto Triple PB', marca: '13,43m' },
    { año: '2025', evento: 'Oro Centroamericano 4x100', marca: '42,97s' },
    { año: '2025', evento: 'Oro Universitario 4x100', marca: '43,05s' },
  ];

  return (
    <section className="relative py-20 md:py-24 lg:py-28 px-4 sm:px-6" id="perfil" ref={sectionRef}>
      <BackgroundPattern type="dots" className="text-primary" opacity={0.03} />
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
            Perfil y Trayectoria
          </h2>
          <p className="text-stone-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Brayan José Espinoza Araya es un atleta costarricense especialista en salto de longitud y salto triple. Con una trayectoria que comenzó desde la categoría U14, ha representado a Costa Rica en múltiples competencias nacionales e internacionales, acumulando títulos y récords que lo posicionan como una de las promesas más sólidas del atletismo centroamericano.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Bio y Datos Rápidos */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInUp}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Bio */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-6">
                Biografía
              </h3>
              <p className="text-stone-600 leading-relaxed text-lg">
                Brayan José Espinoza Araya es un atleta costarricense especialista en salto de longitud y salto triple. Con una trayectoria que comenzó desde la categoría U14, ha representado a Costa Rica en múltiples competencias nacionales e internacionales, acumulando títulos y récords que lo posicionan como una de las promesas más sólidas del atletismo centroamericano.
              </p>
            </div>

            {/* Datos Rápidos */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-6">
                Datos Rápidos
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {datosRapidos.map((dato, index) => (
                  <motion.div
                    key={dato.label}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={fadeInUp}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="flex items-center space-x-4"
                  >
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <dato.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-stone-500 font-medium">{dato.label}</p>
                      <p className="text-stone-800 font-semibold">{dato.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Línea Temporal */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={scaleUp}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-8">
              Línea Temporal
            </h3>
            <div className="space-y-6">
                {hitos.map((hito, index) => (
                <motion.div
                  key={hito.año}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={fadeInUp}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="flex items-start space-x-4"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{hito.año}</span>
                    </div>
                  </div>
                  <div className="flex-1 pt-1">
                    <h4 className="font-semibold text-stone-800 text-lg">{hito.evento}</h4>
                    <p className="text-primary font-medium">{hito.marca}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Removed CTA Button */}
      </div>
    </section>
  );
};

export default PerfilSection;
