import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProductProvider } from './contexts/ProductContext';
import { CartProvider } from './contexts/CartContext';
import { SearchProvider } from './contexts/SearchContext';
import { OrderProvider } from './contexts/OrderContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import SearchModal from './components/SearchModal';
import CartSidebar from './components/CartSidebar';
import AdminPanel from './components/AdminPanel';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import LogrosPage from './pages/LogrosPage';
import PerfilPage from './pages/PerfilPage';
import EstadisticasPage from './pages/EstadisticasPage';
import CalendarioPage from './pages/CalendarioPage';
import GaleriaPage from './pages/GaleriaPage';
import SponsorsPage from './pages/SponsorsPage';
import ContactoPage from './pages/ContactoPage';
import LoginPage from './pages/LoginPage';
import MembersPage from './pages/MembersPage';
import StaticContentPage from './pages/StaticContentPage';

// Protected Route Component for Members Area
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { state } = useAuth();
  
  if (!state.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <OrderProvider>
          <CartProvider>
            <SearchProvider>
              <div className="min-h-screen overflow-x-hidden">
                <ScrollToTop />
                <Navigation />
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/perfil" element={<PerfilPage />} />
                  <Route path="/logros" element={<LogrosPage />} />
                  <Route path="/estadisticas" element={<EstadisticasPage />} />
                  <Route path="/calendario" element={<CalendarioPage />} />
                  <Route path="/galeria" element={<GaleriaPage />} />
               
                  <Route path="/sponsors" element={<SponsorsPage />} />
                  <Route path="/contacto" element={<ContactoPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route 
                    path="/members" 
                    element={
                      <ProtectedRoute>
                        <MembersPage />
                      </ProtectedRoute>
                    } 
                  />
                  <Route path="/admin" element={<AdminPanel />} />
                  
                  {/* Static Content Routes */}
                  <Route path="/careers" element={<StaticContentPage />} />
                  <Route path="/press" element={<StaticContentPage />} />
                  <Route path="/stores" element={<StaticContentPage />} />
                  <Route path="/size-guide" element={<StaticContentPage />} />
                  <Route path="/shipping" element={<StaticContentPage />} />
                  <Route path="/returns" element={<StaticContentPage />} />
                  <Route path="/privacy-policy" element={<StaticContentPage />} />
                  <Route path="/terms-of-service" element={<StaticContentPage />} />
                  <Route path="/cookie-policy" element={<StaticContentPage />} />
                  <Route path="/logros-page" element={<LogrosPage />} />
                  <Route path="/perfil-page" element={<PerfilPage />} />
                  <Route path="/estadisticas-page" element={<EstadisticasPage />} />
                </Routes>
                <Footer />
                <SearchModal />
                <CartSidebar />
              </div>
            </SearchProvider>
          </CartProvider>
        </OrderProvider>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;