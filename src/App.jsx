import React from 'react';
import { BrowserRouter } from "react-router-dom";
import RoutesApp from './RoutesApp';
import { AppProvider } from './context/AppContext'; // Importa el AppProvider

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <AppProvider> {/* Envuelve tus rutas con AppProvider */}
          <RoutesApp />
        </AppProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
