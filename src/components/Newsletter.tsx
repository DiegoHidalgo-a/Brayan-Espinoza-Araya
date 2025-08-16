import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle, AlertCircle, Download } from 'lucide-react';
import * as XLSX from 'xlsx';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError('');
    
    if (value && !validateEmail(value)) {
      setEmailError('Por favor ingresa un email válido');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('Por favor ingresa tu email');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Por favor ingresa un email válido');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      // Get existing subscribers from localStorage
      const existingSubscribers = JSON.parse(
        localStorage.getItem('fortysix_newsletter_subscribers') || '[]'
      );

      const emailExists = existingSubscribers.some(
        (subscriber: any) => subscriber.email.toLowerCase() === email.toLowerCase()
      );

      if (!emailExists) {
        const newSubscriber = {
          id: Date.now().toString(),
          email: email,
          subscribed_at: new Date().toISOString()
        };

        const updatedSubscribers = [...existingSubscribers, newSubscriber];
        localStorage.setItem('fortysix_newsletter_subscribers', JSON.stringify(updatedSubscribers));
        
        // Simular envío a servidor
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setEmail('');
        }, 5000);
      } else {
        setError('Este email ya está suscrito');
      }
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      setError('Hubo un error al suscribirte. Por favor intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const downloadSubscribers = () => {
    try {
      const subscribers = JSON.parse(
        localStorage.getItem('fortysix_newsletter_subscribers') || '[]'
      );
      
      if (subscribers.length === 0) {
        alert('No hay suscriptores para descargar');
        return;
      }

      const ws = XLSX.utils.json_to_sheet(subscribers);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Suscriptores');
      
      const fileName = `newsletter_subscribers_${new Date().toISOString().split('T')[0]}.xlsx`;
      XLSX.writeFile(wb, fileName);
    } catch (error) {
      console.error('Error downloading subscribers:', error);
      alert('Error al descargar la lista de suscriptores');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e as any);
    }
  };

  return (
    <section className="py-16 md:py-20 bg-primary section-padding" id="newsletter">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
            Sígueme en mi Trayectoria
          </h2>
          <p className="text-white/80 text-base md:text-lg mb-6 md:mb-8 max-w-2xl mx-auto px-4">
            Recibe actualizaciones sobre mis próximas competencias, logros deportivos, 
            y contenido exclusivo detrás de escena de mi entrenamiento.
          </p>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto px-4">
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <div className="flex-1 relative">
                  <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Tu email"
                    className={`w-full px-4 md:px-6 py-3 md:py-4 bg-white text-primary placeholder-stone focus:outline-none focus:ring-2 focus:ring-white/50 text-sm md:text-base pr-10 ${
                      emailError ? 'ring-2 ring-red-400' : ''
                    }`}
                    required
                    disabled={isLoading}
                    aria-describedby={emailError ? 'email-error' : undefined}
                  />
                  <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-stone" />
                  {emailError && (
                    <div id="email-error" className="absolute -bottom-6 left-0 text-red-300 text-xs">
                      {emailError}
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isLoading || !email || !!emailError}
                  className="px-6 md:px-8 py-3 md:py-4 bg-white text-primary font-medium tracking-wider uppercase hover:bg-stone hover:text-white transition-all duration-300 text-xs md:text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 justify-center min-w-[120px]"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                      Suscribiendo...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Suscribirse
                    </>
                  )}
                </button>
              </div>
              
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 flex items-center justify-center gap-2 text-red-300 text-sm"
                >
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </motion.div>
              )}
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-white px-4"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-white/20 rounded-full mb-4">
                <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <p className="text-base md:text-lg font-medium">¡Gracias por suscribirte!</p>
              <p className="text-white/80 text-sm md:text-base">Recibirás mis últimas actualizaciones pronto.</p>
            </motion.div>
          )}

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <p className="text-white/60 text-xs tracking-wide px-4">
              Al suscribirte, aceptas nuestra Política de Privacidad. Puedes cancelar en cualquier momento.
            </p>
            
            {/* Botón de descarga para administradores */}
            <button
              onClick={downloadSubscribers}
              className="text-white/60 hover:text-white text-xs tracking-wide px-4 py-2 border border-white/20 rounded hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
              title="Descargar lista de suscriptores (solo para administradores)"
            >
              <Download className="w-3 h-3" />
              Exportar
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;