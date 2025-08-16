import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Trophy, Target, Users, Award, Mail, Phone, Instagram } from 'lucide-react';

const PerfilPage: React.FC = () => {
  const datosRapidos = [
    { icon: Calendar, label: 'Nacimiento', value: '29 de Enero, 2006' },
    { icon: MapPin, label: 'País', value: 'Costa Rica' },
    { icon: Trophy, label: 'Ranking U20', value: '#1' },
    { icon: Target, label: 'Ranking Nacional', value: '#3' }
  ];

  const especialidades = [
    { nombre: 'Salto de Longitud', marca: '6,67m', fecha: '09/03/2025', descripcion: 'Marca personal - Campeonato nacional U18/U20' },
    { nombre: 'Salto Triple', marca: '13,43m', fecha: '30/04/2023', descripcion: 'Marca personal - Campeonato nacional U18/U20' },
    { nombre: 'Relevos 4x100', marca: '42,97s', fecha: '2025', descripcion: 'Centroamericano U18/U20 - El Salvador' }
  ];

  const topLogros = [
    {
      titulo: 'Clasificación NACAC',
      descripcion: 'Clasificar al campeonato NACAC en la prueba de salto triple',
      año: '2023',
      categoria: 'Internacional'
    },
    {
      titulo: 'Oro Centroamericano',
      descripcion: 'Oro en relevos 4x100 campeonato centroamericano U18 y U20 en El Salvador',
      año: '2025',
      categoria: 'Centroamericano'
    },
    {
      titulo: 'Oro Universitario',
      descripcion: 'Oro en relevos 4x100 en los juegos universitarios centroamericano en Honduras',
      año: '2025',
      categoria: 'Universitario'
    }
  ];

  const proximasCompetencias = [
    {
      evento: 'Juegos Deportivos Nacionales 2025',
      ubicacion: 'Limón, Costa Rica',
      fecha: '2025',
      categoria: 'Nacional'
    },
    {
      evento: 'Temporada 2026',
      ubicacion: 'Preparación',
      fecha: '2026',
      categoria: 'Preparación'
    }
  ];

  const patrocinador = {
    nombre: 'Fisiohands Terapiafisica',
    descripcion: 'Patrocinador oficial del atleta'
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Mobile Background Image */}
        <div className="absolute inset-0 block lg:hidden">
          <img
            src="/images/photo_2_2025-08-13_23-49-23.jpg"
            alt="Brayan José Espinoza Araya - Perfil del atleta - Vista móvil"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>

        {/* Desktop Background Image */}
        <div className="absolute inset-0 hidden lg:block">
          <img
            src="/images/photo_8_2025-08-13_23-49-23.jpg"
            alt="Brayan José Espinoza Araya - Perfil del atleta - Vista desktop"
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
              Brayan José Espinoza Araya
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl max-w-2xl mx-auto"
            >
              Atleta costarricense especializado en pruebas de salto y relevos
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contenido Principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        {/* Datos Rápidos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-8 text-center">
            Información del Atleta
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {datosRapidos.map((dato, index) => (
              <motion.div
                key={dato.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 text-center"
              >
                <dato.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-lg font-semibold text-stone-800 mb-1">{dato.label}</div>
                <div className="text-2xl font-bold text-primary">{dato.value}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Datos Físicos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-16"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-8 text-center">
            Datos Físicos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="text-4xl font-bold text-primary mb-2">181 cm</div>
              <div className="text-stone-600 font-medium">Estatura</div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="text-4xl font-bold text-primary mb-2">75 kg</div>
              <div className="text-stone-600 font-medium">Peso</div>
            </div>
          </div>
        </motion.div>

        {/* Especialidades y Marcas */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-8 text-center">
            Pruebas Principales y Marcas Personales
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <h3 className="font-semibold text-stone-800 text-xl mb-4">Salto de Longitud</h3>
              <div className="text-4xl font-bold text-primary mb-2">6,67m</div>
              <div className="text-stone-600 mb-2">09 de marzo del 2025</div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <h3 className="font-semibold text-stone-800 text-xl mb-4">Salto Triple</h3>
              <div className="text-4xl font-bold text-primary mb-2">13,43m</div>
              <div className="text-stone-600 mb-2">30 de abril del 2023</div>
            </div>
          </div>
        </motion.div>

        {/* Ranking Actual */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-8 text-center">
            Ranking Actual
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="text-4xl font-bold text-primary mb-2">#1</div>
              <div className="text-stone-600 font-medium">Categoría U20</div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="text-4xl font-bold text-primary mb-2">#3</div>
              <div className="text-stone-600 font-medium">Ranking del País</div>
            </div>
          </div>
        </motion.div>

        {/* Top 3 Logros */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-8 text-center">
            Top 3 Logros
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topLogros.map((logro, index) => (
              <motion.div
                key={logro.titulo}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-8 text-center"
              >
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  {index + 1}
                </div>
                <h3 className="font-semibold text-stone-800 text-xl mb-3">{logro.titulo}</h3>
                <p className="text-stone-600 mb-3">{logro.descripcion}</p>
                <div className="flex justify-between text-sm text-stone-500">
                  <span>{logro.año}</span>
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded-full">{logro.categoria}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Próximas Competencias */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-8 text-center">
            Próximas Competencias
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {proximasCompetencias.map((competencia, index) => (
              <motion.div
                key={competencia.evento}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-8"
              >
                <h3 className="font-semibold text-stone-800 text-xl mb-3">{competencia.evento}</h3>
                <div className="space-y-2 text-stone-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{competencia.ubicacion}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{competencia.fecha}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4" />
                    <span>{competencia.categoria}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Patrocinador */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-16"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-8 text-center">
            Patrocinador
          </h2>
          <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-2xl mx-auto">
            <h3 className="font-semibold text-stone-800 text-2xl mb-3">{patrocinador.nombre}</h3>
            <p className="text-stone-600">{patrocinador.descripcion}</p>
          </div>
        </motion.div>

        {/* Información de Contacto */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="bg-primary rounded-xl shadow-lg p-8 md:p-12 text-white text-center"
        >
          <h2 className="font-serif text-3xl font-bold mb-8">Información de Contacto</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex flex-col items-center">
              <Mail className="w-8 h-8 mb-3" />
              <div className="text-sm font-medium">Email</div>
              <div className="text-sm">brayaneslindo29012006@gmail.com</div>
            </div>
            <div className="flex flex-col items-center">
              <Phone className="w-8 h-8 mb-3" />
              <div className="text-sm font-medium">WhatsApp</div>
              <div className="text-sm">+506 8442 4482</div>
            </div>
            <div className="flex flex-col items-center">
              <Instagram className="w-8 h-8 mb-3" />
              <div className="text-sm font-medium">Instagram</div>
              <div className="text-sm">@bb_brayan29</div>
            </div>
            <div className="flex flex-col items-center">
              <MapPin className="w-8 h-8 mb-3" />
              <div className="text-sm font-medium">País</div>
              <div className="text-sm">Costa Rica</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PerfilPage;
