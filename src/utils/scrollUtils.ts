/**
 * Función para hacer scroll suave al top de la página
 */
export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
};

/**
 * Función para hacer scroll instantáneo al top de la página
 */
export const scrollToTopInstant = () => {
  window.scrollTo(0, 0);
};

/**
 * Función para hacer scroll a un elemento específico
 */
export const scrollToElement = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
};

