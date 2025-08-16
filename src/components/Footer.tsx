import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Mail, MapPin, ChevronDown, ChevronUp } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({});
  const [language, setLanguage] = useState('es');

  const handleAboutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
    setTimeout(() => {
      document.getElementById('perfil')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
    setTimeout(() => {
      document.getElementById('newsletter')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    // Aquí podrías implementar la lógica de cambio de idioma
    console.log(`Idioma cambiado a: ${newLanguage}`);
  };

  const handleSocialMediaClick = (platform: string) => {
    const socialLinks = {
      instagram: 'https://instagram.com/brayanespinoza',
      twitter: 'https://twitter.com/brayanespinoza',
      facebook: 'https://facebook.com/brayanespinoza'
    };
    
    if (socialLinks[platform as keyof typeof socialLinks]) {
      window.open(socialLinks[platform as keyof typeof socialLinks], '_blank');
    }
  };

  const handleEmailClick = () => {
    window.open('mailto:brayan.espinoza@email.com', '_blank');
  };

  const footerLinks = {
    atleta: [
      { name: 'Perfil', href: '/perfil' },
      { name: 'Logros', href: '/logros' },
      { name: 'Estadísticas', href: '/estadisticas' },
      { name: 'Calendario', href: '/calendario' },
    ],
    recursos: [
      { name: 'Galería', href: '/galeria' },

      { name: 'Sponsors', href: '/sponsors' },
    
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Terms of Service', href: '/terms-of-service' },
      { name: 'Cookie Policy', href: '/cookie-policy' },
    ],
  };

  return (
    <footer className="bg-cream section-padding py-8 md:py-16">
      <div className="max-w-7xl mx-auto">
        {/* Mobile Layout */}
        <div className="block md:hidden">
          {/* Brand Section - Always Visible */}
          <div className="mb-8">
            <h3 className="font-serif text-2xl font-bold text-primary mb-4">Brayan Espinoza</h3>
            <p className="text-stone text-sm leading-relaxed mb-6">
              Atleta costarricense especializado en pruebas de velocidad. Representando a Costa Rica 
              en competencias nacionales e internacionales con dedicación y pasión por el atletismo.
            </p>
            <div className="flex items-center space-x-4 mb-6">
              <Instagram 
                className="w-5 h-5 text-stone hover:text-primary cursor-pointer transition-colors" 
                onClick={() => handleSocialMediaClick('instagram')}
              />
            </div>
          </div>

          {/* Collapsible Sections */}
          <div className="space-y-4">
            {/* Atleta Section */}
            <div className="border-b border-warm pb-4">
              <button
                onClick={() => toggleSection('atleta')}
                className="flex items-center justify-between w-full text-left"
              >
                <h4 className="font-medium text-primary tracking-wider uppercase text-sm">Atleta</h4>
                {expandedSections.atleta ? (
                  <ChevronUp className="w-4 h-4 text-stone" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-stone" />
                )}
              </button>
              {expandedSections.atleta && (
                <ul className="mt-4 space-y-3 pl-2">
                  {footerLinks.atleta.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="text-stone hover:text-primary transition-colors text-sm block py-1"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Recursos Section */}
            <div className="border-b border-warm pb-4">
              <button
                onClick={() => toggleSection('recursos')}
                className="flex items-center justify-between w-full text-left"
              >
                <h4 className="font-medium text-primary tracking-wider uppercase text-sm">Recursos</h4>
                {expandedSections.recursos ? (
                  <ChevronUp className="w-4 h-4 text-stone" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-stone" />
                )}
              </button>
              {expandedSections.recursos && (
                <ul className="mt-4 space-y-3 pl-2">
                  {footerLinks.recursos.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="text-stone hover:text-primary transition-colors text-sm block py-1"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Contact Section */}
            <div className="border-b border-warm pb-4">
              <button
                onClick={() => toggleSection('contact')}
                className="flex items-center justify-between w-full text-left"
              >
                <h4 className="font-medium text-primary tracking-wider uppercase text-sm">Contacto</h4>
                {expandedSections.contact ? (
                  <ChevronUp className="w-4 h-4 text-stone" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-stone" />
                )}
              </button>
              {expandedSections.contact && (
                <div className="mt-4 space-y-3 pl-2">
                  <div className="flex items-start space-x-3">
                    <Mail 
                      className="w-4 h-4 text-stone mt-0.5 flex-shrink-0 cursor-pointer hover:text-primary transition-colors" 
                      onClick={handleEmailClick}
                    />
                    <span className="text-stone text-sm">brayaneslindo29012006@gmail.com</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-4 h-4 text-stone mt-0.5 flex-shrink-0" />
                    <span className="text-stone text-sm">
                      Costa Rica
                      <br />
                      Atleta Nacional
                    </span>
                  </div>
                  
                  {/* Language Selector */}
                  <div className="mt-4">
                    <select 
                      value={language}
                      onChange={(e) => handleLanguageChange(e.target.value)}
                      className="bg-transparent border-b border-stone text-stone text-sm focus:outline-none focus:border-primary w-full py-2 cursor-pointer"
                    >
                      <option value="es">Español</option>
                      <option value="en">English</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Bottom Bar */}
          <div className="border-t border-warm pt-6 mt-6">
            <div className="text-center space-y-4">
              <p className="text-stone text-sm">
                © {currentYear} Brayan Espinoza. All rights reserved.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {footerLinks.legal.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="text-stone hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout - Unchanged */}
        <div className="hidden md:block">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <h3 className="font-serif text-2xl font-bold text-primary mb-4">Brayan Espinoza</h3>
              <p className="text-stone text-sm leading-relaxed mb-6">
                Atleta costarricense especializado en pruebas de velocidad. Representando a Costa Rica 
                en competencias nacionales e internacionales con dedicación y pasión por el atletismo.
              </p>
            <div className="flex items-center space-x-4">
              <Instagram 
                className="w-5 h-5 text-stone hover:text-primary cursor-pointer transition-colors" 
                onClick={() => handleSocialMediaClick('instagram')}
              />
            </div>
          </div>

          {/* Atleta Links */}
          <div>
            <h4 className="font-medium text-primary tracking-wider uppercase text-sm mb-4">Atleta</h4>
            <ul className="space-y-3">
              {footerLinks.atleta.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-stone hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Recursos Links */}
          <div>
            <h4 className="font-medium text-primary tracking-wider uppercase text-sm mb-4">Recursos</h4>
            <ul className="space-y-3">
              {footerLinks.recursos.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-stone hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-medium text-primary tracking-wider uppercase text-sm mb-4">Contacto</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Mail 
                  className="w-4 h-4 text-stone mt-0.5 flex-shrink-0 cursor-pointer hover:text-primary transition-colors" 
                  onClick={handleEmailClick}
                />
                <span className="text-stone text-sm">brayaneslindo29012006@gmail.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-stone mt-0.5 flex-shrink-0" />
                <span className="text-stone text-sm">
                  Costa Rica
                  <br />
                  Atleta Nacional
                </span>
              </div>
            </div>

            {/* Language Selector */}
            <div className="mt-6">
              <select 
                value={language}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="bg-transparent border-b border-stone text-stone text-sm focus:outline-none focus:border-primary cursor-pointer"
              >
                <option value="es">Español</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>
        </div>

          {/* Desktop Bottom Bar */}
        <div className="border-t border-warm pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-stone text-sm">
              © {currentYear} Brayan Espinoza. All rights reserved.
            </p>
            <div className="flex space-x-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-stone hover:text-primary transition-colors text-sm"
                >
                  {link.name}
                </Link>
              ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;