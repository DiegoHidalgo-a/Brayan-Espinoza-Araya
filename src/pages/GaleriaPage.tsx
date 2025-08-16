import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Download, 
  Mail, 
  MapPin, 
  User, 
  Target, 
  Trophy, 
  Medal,
  Star,
  Calendar,
  Instagram,
  Phone
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GaleriaPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [currentFilter, setCurrentFilter] = useState<string>('todos');

  const categorias = [
    { id: 'todas', label: 'Todas' },
    { id: 'competencia', label: 'Competencia' },
    { id: 'entrenamiento', label: 'Entrenamiento' },
    { id: 'lifestyle', label: 'Lifestyle' },
    { id: 'sponsors', label: 'Sponsors' }
  ];

  // Función para generar todas las fotos del 1 al 49
  const generateAllPhotos = () => {
    const photos = [];
    for (let i = 1; i <= 49; i++) {
      photos.push({
        id: i,
        categoria: getRandomCategory(),
        imagen: `/images/photo_${i}_2025-08-13_23-49-23.jpg`,
        titulo: getPhotoTitle(i),
        descripcion: getPhotoDescription(i),
        tipo: 'imagen'
      });
    }
    return photos;
  };

  // Función para asignar categorías aleatorias
  const getRandomCategory = () => {
    const categories = ['competencia', 'entrenamiento', 'lifestyle', 'sponsors'];
    return categories[Math.floor(Math.random() * categories.length)];
  };

  // Función para generar títulos únicos para cada foto
  const getPhotoTitle = (photoNumber: number) => {
    const titles = [
      'Campeonato Centroamericano 2025',
      'Sesión de velocidad',
      'Preparación mental',
      'Sesión fotográfica',
      'Salto triple',
      'Entrenamiento de fuerza',
      'Recuperación',
      'Evento promocional',
      'Competencia nacional',
      'Entrenamiento técnico',
      'Momentos de concentración',
      'Sesión de flexibilidad',
      'Preparación física',
      'Competencia internacional',
      'Entrenamiento de resistencia',
      'Sesión de coordinación',
      'Momentos de descanso',
      'Trabajo con patrocinadores',
      'Entrenamiento de potencia',
      'Sesión de movilidad',
      'Competencia regional',
      'Entrenamiento de agilidad',
      'Sesión de equilibrio',
      'Preparación táctica',
      'Competencia local',
      'Entrenamiento de velocidad',
      'Sesión de fuerza',
      'Momentos de celebración',
      'Trabajo en equipo',
      'Entrenamiento de salto',
      'Sesión de técnica',
      'Competencia universitaria',
      'Entrenamiento de lanzamiento',
      'Sesión de resistencia',
      'Preparación mental',
      'Competencia escolar',
      'Entrenamiento de flexibilidad',
      'Sesión de coordinación',
      'Momentos de victoria',
      'Trabajo individual',
      'Entrenamiento de potencia',
      'Sesión de movilidad',
      'Competencia de club',
      'Entrenamiento de agilidad',
      'Sesión de equilibrio',
      'Preparación física',
      'Competencia de liga',
      'Entrenamiento de velocidad',
      'Sesión de fuerza',
      'Momentos de superación'
    ];
    
    return titles[photoNumber - 1] || `Foto ${photoNumber}`;
  };

  // Función para generar descripciones únicas para cada foto
  const getPhotoDescription = (photoNumber: number) => {
    const descriptions = [
      'Salto de longitud en El Salvador',
      'Entrenamiento en pista',
      'Momentos de concentración',
      'Trabajo con patrocinadores',
      'Competencia nacional',
      'Sesión en gimnasio',
      'Momentos de descanso',
      'Actividad con marca',
      'Salto triple en competencia',
      'Técnica de carrera',
      'Preparación mental',
      'Ejercicios de flexibilidad',
      'Entrenamiento físico',
      'Representando a Costa Rica',
      'Sesión de resistencia',
      'Coordinación y equilibrio',
      'Recuperación activa',
      'Colaboración con sponsors',
      'Desarrollo de potencia',
      'Movilidad articular',
      'Competencia regional',
      'Entrenamiento de agilidad',
      'Ejercicios de equilibrio',
      'Estrategia de competencia',
      'Evento local',
      'Desarrollo de velocidad',
      'Fuerza explosiva',
      'Celebración de logros',
      'Trabajo en conjunto',
      'Técnica de salto',
      'Perfeccionamiento técnico',
      'Competencia universitaria',
      'Técnica de lanzamiento',
      'Resistencia aeróbica',
      'Preparación psicológica',
      'Competencia escolar',
      'Flexibilidad muscular',
      'Coordinación motora',
      'Momentos de triunfo',
      'Entrenamiento personalizado',
      'Desarrollo de potencia',
      'Movilidad funcional',
      'Competencia de club',
      'Agilidad y rapidez',
      'Equilibrio corporal',
      'Preparación física integral',
      'Liga deportiva',
      'Velocidad de reacción',
      'Fuerza máxima',
      'Superación personal'
    ];
    
    return descriptions[photoNumber - 1] || `Descripción de la foto ${photoNumber}`;
  };

  // Usar todas las 49 fotos
  const galeria = generateAllPhotos();

  const galeriaFiltrada = currentFilter === 'todas' 
    ? galeria 
    : galeria.filter(item => item.categoria === currentFilter);

  const logros = [
    {
      año: 2019,
      medallas: [
        { tipo: 'oro', evento: '80m plano, salto de longitud, lanzamiento de bola', categoria: 'Campeón nacional y centroamericano U14' },
        { tipo: 'oro', evento: 'Heptatlón', categoria: 'Juegos Deportivos Nacionales' },
        { tipo: 'plata', evento: 'Heptatlón y relevo 4x100', categoria: '' },
        { tipo: 'bronce', evento: 'Campo traviesa', categoria: '' }
      ]
    },
    {
      año: 2021,
      medallas: [
        { tipo: 'oro', evento: 'Salto de longitud', categoria: 'JDN U16' },
        { tipo: 'plata', evento: '100m vallas', categoria: '' },
        { tipo: 'bronce', evento: '110m vallas', categoria: 'Nacional Mayor' }
      ]
    },
    {
      año: 2022,
      medallas: [
        { tipo: 'oro', evento: 'Salto de longitud', categoria: 'Nacional U18 y U20' },
        { tipo: 'plata', evento: 'Salto de longitud', categoria: 'Centroamericano – Managua' },
        { tipo: 'bronce', evento: 'Salto de altura', categoria: 'Centroamericano' }
      ]
    },
    {
      año: 2023,
      medallas: [
        { tipo: 'oro', evento: 'Salto de longitud y salto triple', categoria: 'Nacional U18 y U20' },
        { tipo: 'plata', evento: 'Salto de longitud', categoria: 'Centroamericano – Guatemala' },
        { tipo: 'bronce', evento: 'Salto triple', categoria: 'Centroamericano' },
        { tipo: 'oro', evento: 'Salto de longitud', categoria: 'JDN U18' },
        { tipo: 'bronce', evento: 'Salto de altura', categoria: 'JDN U18' }
      ]
    },
    {
      año: 2024,
      medallas: [
        { tipo: 'plata', evento: 'Salto de longitud', categoria: 'Nacional U18, U20 y Mayor' },
        { tipo: 'oro', evento: 'Salto triple', categoria: 'JDN U20' },
        { tipo: 'bronce', evento: 'Salto de longitud', categoria: 'JDN U20' }
      ]
    },
    {
      año: 2025,
      medallas: [
        { tipo: 'plata', evento: 'Salto triple', categoria: 'Nacional U18 y U20' },
        { tipo: 'bronce', evento: 'Salto de longitud', categoria: 'Nacional U18 y U20' },
        { tipo: 'oro', evento: 'Relevo 4x100', categoria: 'Centroamericano – El Salvador' },
        { tipo: 'plata', evento: 'Salto de longitud', categoria: 'Centroamericano – El Salvador' },
        { tipo: 'bronce', evento: 'Salto triple', categoria: 'Centroamericano – El Salvador' },
        { tipo: 'oro', evento: 'Relevo 4x100', categoria: 'Juegos Universitarios – Honduras' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Mobile Background Image */}
        <div className="absolute inset-0 block lg:hidden">
          <img
            src="/images/photo_9_2025-08-13_23-49-23.jpg"
            alt="Brayan José Espinoza Araya - Vista móvil"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>

        {/* Desktop Background Image */}
        <div className="absolute inset-0 hidden lg:block">
          <img
            src="/images/photo_4_2025-08-13_23-49-23.jpg"
            alt="Brayan José Espinoza Araya - Vista desktop"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>

        <div className="relative z-10 h-full flex items-center justify-center text-center text-white">
          <div className="max-w-6xl px-4">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold mb-4"
            >
              Brayan José Espinoza Araya
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl mb-6 text-yellow-300 font-medium"
            >
              "Atleta costarricense – Salto de Longitud y Salto Triple"
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-gray-200"
            >
              "Primero en el ranking U20 y tercero a nivel nacional, Brayan combina disciplina, velocidad y potencia para alcanzar marcas que rompen límites."
            </motion.p>
            
            {/* KPIs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-3xl md:text-4xl font-bold text-yellow-300 mb-2">6,67 m</div>
                <div className="text-sm text-gray-300">Salto de longitud</div>
                <div className="text-xs text-gray-400">09/03/2025</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-3xl md:text-4xl font-bold text-yellow-300 mb-2">13,43 m</div>
                <div className="text-sm text-gray-300">Salto triple</div>
                <div className="text-xs text-gray-400">30/04/2023</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-3xl md:text-4xl font-bold text-yellow-300 mb-2">#1 U20</div>
                <div className="text-sm text-gray-300">#3 Nacional</div>
                <div className="text-xs text-gray-400">Ranking actual</div>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              {/* Media Kit button removed */}
              <button 
                onClick={() => navigate('/contacto')}
                className="px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white hover:text-black font-bold rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Mail className="w-5 h-5" />
                Contactar
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Perfil Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-6">
              Perfil y Trayectoria
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Brayan José Espinoza Araya es un atleta costarricense especialista en salto de longitud y salto triple. 
              Con una trayectoria que comenzó desde la categoría U14, ha representado a Costa Rica en múltiples 
              competencias nacionales e internacionales, acumulando títulos y récords que lo posicionan como una 
              de las promesas más sólidas del atletismo centroamericano.
            </p>
          </motion.div>

          {/* Datos clave */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-5 gap-6"
          >
            <div className="text-center p-6 bg-stone-50 rounded-lg">
              <MapPin className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="font-semibold text-gray-800">País</div>
              <div className="text-gray-600">Costa Rica</div>
            </div>
            <div className="text-center p-6 bg-stone-50 rounded-lg">
              <User className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="font-semibold text-gray-800">Fecha de nacimiento</div>
              <div className="text-gray-600">—</div>
            </div>
            <div className="text-center p-6 bg-stone-50 rounded-lg">
              <User className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="font-semibold text-gray-800">Estatura</div>
              <div className="text-gray-600">—</div>
            </div>
            <div className="text-center p-6 bg-stone-50 rounded-lg">
              <Target className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="font-semibold text-gray-800">Peso de competición</div>
              <div className="text-gray-600">—</div>
            </div>
            <div className="text-center p-6 bg-stone-50 rounded-lg">
              <Trophy className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="font-semibold text-gray-800">Ranking</div>
              <div className="text-gray-600">1° U20 · 3° nacional</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Logros Destacados */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-6">
              Resultados que hablan por sí solos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Clasificación NACAC</h3>
                <p className="text-gray-600">Clasificación al Campeonato NACAC en salto triple</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <Medal className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Centroamericano U18 y U20</h3>
                <p className="text-gray-600">Oro en 4x100 – El Salvador</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <Medal className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Juegos Universitarios</h3>
                <p className="text-gray-600">Oro en 4x100 – Honduras</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Historial de Medallas */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-6">
              Historial de Medallas
            </h2>
            <p className="text-lg text-gray-600 mb-12">
              Presentado en cards por año
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {logros.map((año, index) => (
              <motion.div
                key={año.año}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-stone-50 rounded-xl p-6 shadow-lg"
              >
                <div className="text-center mb-6">
                  <h3 className="text-3xl font-bold text-primary">{año.año}</h3>
                </div>
                <div className="space-y-3">
                  {año.medallas.map((medalla, medallaIndex) => (
                    <div key={medallaIndex} className="flex items-start gap-3">
                      <div className={`w-4 h-4 rounded-full mt-2 flex-shrink-0 ${
                        medalla.tipo === 'oro' ? 'bg-yellow-500' :
                        medalla.tipo === 'plata' ? 'bg-gray-400' : 'bg-amber-600'
                      }`}></div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-800 capitalize">{medalla.tipo}</div>
                        <div className="text-sm text-gray-600">{medalla.evento}</div>
                        {medalla.categoria && (
                          <div className="text-xs text-gray-500">{medalla.categoria}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Estadísticas */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-6">
              Progreso medible, metas claras
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Personal Bests */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <h3 className="text-2xl font-bold text-primary mb-6">Personal Bests</h3>
              <div className="space-y-6">
                <div className="border-l-4 border-primary pl-6">
                  <div className="text-3xl font-bold text-gray-800 mb-2">6,67 m</div>
                  <div className="text-lg text-gray-600 mb-1">Salto de longitud</div>
                  <div className="text-sm text-gray-500">09/03/2025</div>
                </div>
                <div className="border-l-4 border-primary pl-6">
                  <div className="text-3xl font-bold text-gray-800 mb-2">13,43 m</div>
                  <div className="text-lg text-gray-600 mb-1">Salto triple</div>
                  <div className="text-sm text-gray-500">30/04/2023</div>
                </div>
              </div>
            </motion.div>

            {/* Ranking y Progresión */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <h3 className="text-2xl font-bold text-primary mb-6">Ranking y Progresión</h3>
              <div className="space-y-6">
                <div className="text-center p-6 bg-primary/10 rounded-lg">
                  <div className="text-4xl font-bold text-primary mb-2">#1</div>
                  <div className="text-lg text-gray-800">U20</div>
                </div>
                <div className="text-center p-6 bg-blue-100 rounded-lg">
                  <div className="text-4xl font-bold text-blue-600 mb-2">#3</div>
                  <div className="text-lg text-gray-800">Nacional</div>
                </div>
                <div className="text-center">
                  <Star className="w-12 h-12 text-green-500 mx-auto mb-2" />
                  <div className="text-sm text-gray-600">Progresión anual desde 2019</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Calendario */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-6">
              Calendario
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Próximas Competencias */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-stone-50 p-8 rounded-xl shadow-lg"
            >
              <h3 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
                <Calendar className="w-6 h-6" />
                Próximas Competencias
              </h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <div className="font-semibold text-lg text-gray-800">Juegos Deportivos Nacionales 2025</div>
                  <div className="text-gray-600">Limón</div>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="font-semibold text-lg text-gray-800">Temporada 2026</div>
                  <div className="text-gray-600">Preparación</div>
                </div>
              </div>
            </motion.div>

            {/* Resultados Recientes */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-stone-50 p-8 rounded-xl shadow-lg"
            >
              <h3 className="text-2xl font-bold text-primary mb-6">Resultados Recientes</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border-l-4 border-yellow-500">
                  <div className="font-semibold text-lg text-gray-800">Centroamericano U18 y U20</div>
                  <div className="text-gray-600">El Salvador, 2025</div>
                  <div className="text-sm text-gray-500">Oro, Plata y Bronce</div>
                </div>
                <div className="bg-white p-4 rounded-lg border-l-4 border-yellow-500">
                  <div className="font-semibold text-lg text-gray-800">Juegos Universitarios</div>
                  <div className="text-gray-600">Honduras, 2025</div>
                  <div className="text-sm text-gray-500">Oro</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Galería */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-6">
              Momentos que inspiran
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              {galeriaFiltrada.length} de {galeria.length} fotos disponibles
            </p>
            <p className="text-sm text-gray-500">
              Explora nuestra colección completa de momentos deportivos
            </p>
          </motion.div>

          {/* Filtros */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex flex-wrap justify-center gap-4">
              {categorias.map((categoria) => (
                <button
                  key={categoria.id}
                  onClick={() => setCurrentFilter(categoria.id)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    currentFilter === categoria.id
                      ? 'bg-primary text-white shadow-lg'
                      : 'bg-white text-stone-600 hover:bg-stone-100 shadow-md'
                  }`}
                >
                  {categoria.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Grid de Galería */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {galeriaFiltrada.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={item.imagen}
                    alt={item.titulo}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300"></div>
                  
                  {/* Overlay con información */}
                  <div className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-white">
                      <h3 className="font-semibold text-lg mb-2">{item.titulo}</h3>
                      <p className="text-sm text-white/90">{item.descripcion}</p>
                    </div>
                  </div>

                  {/* Iconos de acción */}
                  <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-300">
                      <Star className="w-4 h-4 text-white" />
                    </button>
                    <button className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-300">
                      <Instagram className="w-4 h-4 text-white" />
                    </button>
                  </div>

                  {/* Badge de categoría */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary text-white text-xs font-medium rounded-full">
                      {categorias.find(cat => cat.id === item.categoria)?.label}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsors */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-6">
              Aliados que impulsan cada meta
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-stone-50 rounded-xl p-8 shadow-lg text-center"
          >
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-primary mb-6">Fisiohands Terapia Física</h3>
              <p className="text-gray-600 mb-6">
                Propuesta de valor para futuros patrocinadores
              </p>
              {/* Media Kit button removed */}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contacto */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-6">
              Hablemos de tu próxima campaña
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Email</h3>
              <a href="mailto:brayaneslindo29012006@gmail.com" className="text-primary hover:underline">
                brayaneslindo29012006@gmail.com
              </a>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <Phone className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">WhatsApp</h3>
              <a href="https://wa.me/50684424482" className="text-primary hover:underline">
                +506 8442 4482
              </a>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <Instagram className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Instagram</h3>
              <a href="https://instagram.com/bb_brayan29" className="text-primary hover:underline">
                @bb_brayan29
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default GaleriaPage;
