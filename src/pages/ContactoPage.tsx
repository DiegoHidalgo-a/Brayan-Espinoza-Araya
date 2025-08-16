import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Instagram, Twitter, Youtube, Send } from 'lucide-react';

const ContactoPage: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    motivo: 'prensa',
    mensaje: ''
  });

  const motivos = [
    { id: 'prensa', label: 'Prensa/Entrevista' },
    { id: 'auspicio', label: 'Patrocinio/Auspicio' },
    { id: 'booking', label: 'Booking/Eventos' },
    { id: 'otro', label: 'Otro' }
  ];

  const redesSociales = [
    { nombre: 'Instagram', usuario: '@bb_brayan29', icon: Instagram, enlace: '#' },
    { nombre: 'TikTok', usuario: '@bb_brayan29', icon: Twitter, enlace: '#' },
    { nombre: 'YouTube', usuario: 'Brayan Espinoza', icon: Youtube, enlace: '#' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    console.log('Formulario enviado:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Mobile Background Image */}
        <div className="absolute inset-0 block lg:hidden">
          <img
            src="/images/photo_10_2025-08-13_23-49-23.jpg"
            alt="Contacto - Vista móvil"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>

        {/* Desktop Background Image */}
        <div className="absolute inset-0 hidden lg:block">
          <img
            src="/images/photo_7_2025-08-13_23-49-23.jpg"
            alt="Contacto - Vista desktop"
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
              Hablemos de tu próxima campaña
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl max-w-2xl mx-auto"
            >
              ¿Tienes una propuesta? ¡Me encantaría escucharla
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contenido Principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Formulario de Contacto */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-xl shadow-lg p-8 md:p-12"
          >
            <h2 className="font-serif text-3xl font-bold text-primary mb-8">
              Envíame un Mensaje
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-stone-700 mb-2">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-300"
                  placeholder="Tu nombre completo"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-300"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label htmlFor="motivo" className="block text-sm font-medium text-stone-700 mb-2">
                  Motivo del Contacto
                </label>
                <select
                  id="motivo"
                  name="motivo"
                  value={formData.motivo}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-300"
                >
                  {motivos.map((motivo) => (
                    <option key={motivo.id} value={motivo.id}>
                      {motivo.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="mensaje" className="block text-sm font-medium text-stone-700 mb-2">
                  Mensaje
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-300 resize-none"
                  placeholder="Cuéntame sobre tu propuesta..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-300 flex items-center justify-center"
              >
                <Send className="w-5 h-5 mr-2" />
                Enviar Mensaje
              </button>
            </form>
          </motion.div>

          {/* Información de Contacto */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Información Directa */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="font-serif text-2xl font-bold text-primary mb-6">
                Información de Contacto
              </h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-stone-500">Email Principal</p>
                    <p className="font-semibold text-stone-800">brayaneslindo29012006@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-stone-500">WhatsApp</p>
                    <p className="font-semibold text-stone-800">+506 8442 4482</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-stone-500">Ubicación</p>
                    <p className="font-semibold text-stone-800">San José, Costa Rica</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Redes Sociales */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="font-serif text-2xl font-bold text-primary mb-6">
                Sígueme en Redes
              </h3>
              <div className="space-y-4">
                {redesSociales.map((red, index) => (
                  <motion.a
                    key={red.nombre}
                    href={red.enlace}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    className="flex items-center space-x-4 p-4 bg-stone-50 rounded-lg hover:bg-stone-100 transition-colors duration-300"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <red.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-stone-800">{red.nombre}</p>
                      <p className="text-sm text-stone-600">{red.usuario}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Horarios de Respuesta */}
            <div className="bg-primary rounded-xl shadow-lg p-8 text-white">
              <h3 className="font-serif text-2xl font-bold mb-6">
                Tiempo de Respuesta
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold">Prensa/Entrevistas</p>
                  <p className="text-white/90">24-48 horas</p>
                </div>
                <div>
                  <p className="font-semibold">Patrocinios</p>
                  <p className="text-white/90">3-5 días hábiles</p>
                </div>
                <div>
                  <p className="font-semibold">Booking/Eventos</p>
                  <p className="text-white/90">1-2 semanas</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactoPage;
