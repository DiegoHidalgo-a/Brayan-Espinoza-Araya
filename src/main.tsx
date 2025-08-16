import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import App from './App.tsx';
import './index.css';

const initialOptions = {
  clientId: "AWlgnoiMyPLU1z22ZXHGC3siVFgTE19uzkkd_5O5Tpar-muIb4j-CTbtCj2qEmxQdHcHiqQreepxViyu", // 👈 Cambiar a client ID original
  currency: "USD",
  locale: "es_ES", // 👈 Forzar español
  "enable-funding": "card,venmo,paylater", // 👈 Habilitar múltiples métodos
  "disable-funding": "", // 👈 No deshabilitar nada
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <PayPalScriptProvider options={initialOptions}>
        <App />
      </PayPalScriptProvider>
    </BrowserRouter>
  </StrictMode>
);
