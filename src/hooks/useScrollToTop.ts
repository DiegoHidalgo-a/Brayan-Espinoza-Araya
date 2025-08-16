import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export const useScrollToTop = () => {
  const { pathname } = useLocation();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    // Solo hacer scroll si realmente cambió la ruta
    if (prevPathname.current !== pathname) {
      // Pequeño delay para asegurar que la navegación esté completa
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      }, 100);
      
      prevPathname.current = pathname;
    }
  }, [pathname]);
};
