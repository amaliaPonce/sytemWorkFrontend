import React from "react";
import HomePageComponent from "../../components/homePageComponent/HomePageComponent";
import { AppProvider } from "../../context/AppContext";

function HomePage() {
  return (
    <AppProvider>
      <main>
        <HomePageComponent />
      </main>
    </AppProvider>
  );
}

export default HomePage;
