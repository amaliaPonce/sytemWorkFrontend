import React from "react";
import { AppProvider } from "../../context/AppContext";
import RegisterComponent from "../../components/registerComponent/RegisterComponent";
import fotoTrabajo1 from "../../assets/fotoTrabajo1.jpg";

function HomePage() {
  return (
    <AppProvider>
      <main className="flex items-center justify-center min-h-screen relative">
        <div className="h-screen w-1/2 p-4 relative">
          <img
            src={fotoTrabajo1}
            alt="Tu imagen"
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-9xl font-staatliches whitespace-nowrap">
            PLAY HARD
          </div>
        </div>
        <div className="w-1/2 p-4">
          <RegisterComponent />
        </div>
      </main>
    </AppProvider>
  );
}

export default HomePage;
