import React from "react";
import { AppProvider } from "../../context/AppContext";
import LoginComponent from "../../components/loginComponent/LoginComponent";
import RegisterComponent from "../../components/registerComponent/RegisterComponent";


function HomePage() {
  return (
    <AppProvider>
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-4">
          <LoginComponent />
        </div>
        <div className="w-full max-w-md p-4">
          <RegisterComponent />
        </div>
      </main>
    </AppProvider>
  );
}

export default HomePage;
