import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause, Fullscreen, Download } from 'lucide-react';
import { getRandomPhotos, getPhotoUrl, getTotalPhotoCount } from '../utils/photoUtils';

interface PhotoGalleryProps {
  photoCount?: number;
  autoPlay?: boolean;
  interval?: number;
  showControls?: boolean;
  className?: string;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({
  photoCount = 6,
  autoPlay = true,
  interval = 3000,
  showControls = true,
  className = ''
}) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [photos] = useState(() => getRandomPhotos(photoCount));
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
    }, interval);

    return () => clearInterval(timer);
  }, [isPlaying, interval, photos.length]);

  // Funcionalidad de teclado
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          prevPhoto();
          break;
        case 'ArrowRight':
          event.preventDefault();
          nextPhoto();
          break;
        case ' ':
          event.preventDefault();
          togglePlayPause();
          break;
        case 'Escape':
          if (isFullscreen) {
            exitFullscreen();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPhotoIndex, isPlaying, isFullscreen]);

  const nextPhoto = useCallback(() => {
    setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
  }, [photos.length]);

  const prevPhoto = useCallback(() => {
    setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
  }, [photos.length]);

  const togglePlayPause = useCallback(() => {
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const goToPhoto = useCallback((index: number) => {
    setCurrentPhotoIndex(index);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!isFullscreen) {
      const element = document.documentElement;
      if (element.requestFullscreen) {
        element.requestFullscreen();
        setIsFullscreen(true);
      }
    } else {
      exitFullscreen();
    }
  }, [isFullscreen]);

  const exitFullscreen = useCallback(() => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  const downloadPhoto = useCallback(() => {
    const currentPhoto = photos[currentPhotoIndex];
    if (currentPhoto) {
      const link = document.createElement('a');
      link.href = currentPhoto.imagen;
      link.download = `${currentPhoto.titulo}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [currentPhotoIndex, photos]);

  const handlePhotoClick = useCallback(() => {
    // Click en la foto principal avanza a la siguiente
    nextPhoto();
  }, [nextPhoto]);

  if (photos.length === 0) {
    return (
      <div className={`flex items-center justify-center h-64 bg-gray-100 rounded-lg ${className}`}>
        <p className="text-gray-500">No hay fotos disponibles</p>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-lg ${className}`}>
      {/* Foto principal */}
      <div className="aspect-video relative">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentPhotoIndex}
            src={photos[currentPhotoIndex].imagen}
            alt={photos[currentPhotoIndex].titulo}
            className="w-full h-full object-cover cursor-pointer"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            onClick={handlePhotoClick}
            title="Click para siguiente foto"
          />
        </AnimatePresence>

        {/* Overlay con información */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="text-white font-semibold text-lg mb-1">
            {photos[currentPhotoIndex].titulo}
          </h3>
          <p className="text-white/90 text-sm">
            {photos[currentPhotoIndex].descripcion}
          </p>
        </div>

        {/* Contador de fotos */}
        <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
          {currentPhotoIndex + 1} / {photos.length}
        </div>

        {/* Indicador de reproducción */}
        {isPlaying && (
          <div className="absolute top-4 left-4 bg-black/50 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            Auto
          </div>
        )}
      </div>

      {/* Controles */}
      {showControls && (
        <>
          {/* Botones de navegación */}
          <button
            onClick={prevPhoto}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-300 hover:scale-110"
            aria-label="Foto anterior"
            title="Foto anterior (←)"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextPhoto}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-300 hover:scale-110"
            aria-label="Foto siguiente"
            title="Foto siguiente (→)"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Botón de play/pause */}
          <button
            onClick={togglePlayPause}
            className="absolute top-4 left-16 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-300 hover:scale-110"
            aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
            title={`${isPlaying ? 'Pausar' : 'Reproducir'} (Espacio)`}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          {/* Botón de pantalla completa */}
          <button
            onClick={toggleFullscreen}
            className="absolute top-4 left-28 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-300 hover:scale-110"
            aria-label="Pantalla completa"
            title="Pantalla completa (F11)"
          >
            <Fullscreen className="w-4 h-4" />
          </button>

          {/* Botón de descarga */}
          <button
            onClick={downloadPhoto}
            className="absolute top-4 left-40 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-300 hover:scale-110"
            aria-label="Descargar foto"
            title="Descargar foto actual"
          >
            <Download className="w-4 h-4" />
          </button>
        </>
      )}

      {/* Indicadores de miniaturas */}
      <div className="flex justify-center gap-2 p-4 bg-gray-50">
        {photos.map((_, index) => (
          <button
            key={index}
            onClick={() => goToPhoto(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
              index === currentPhotoIndex
                ? 'bg-primary scale-125'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Ir a foto ${index + 1}`}
            title={`Foto ${index + 1}`}
          />
        ))}
      </div>

      {/* Información adicional */}
      <div className="p-4 bg-white">
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Mostrando {photos.length} de {getTotalPhotoCount()} fotos disponibles
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Las fotos se seleccionan aleatoriamente de nuestra colección
          </p>
          <div className="mt-2 text-xs text-gray-400">
            <p>Controles: ← → para navegar, Espacio para play/pause</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoGallery;


