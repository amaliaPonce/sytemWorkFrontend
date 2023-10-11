import React from 'react';
import { BrowserRouter } from "react-router-dom";
import RoutesApp from './RoutesApp';
import { AppProvider } from './context/AppContext'; 
import { CheckInOutProvider } from './context/CheckInOutContext';

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <AppProvider>
        <CheckInOutProvider>

          <RoutesApp />
          </CheckInOutProvider>,

        </AppProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
