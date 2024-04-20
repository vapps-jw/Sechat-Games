import React from "react";
import { RouterProvider } from "react-router-dom";
import { SechatGamesRouter } from "./utils/RouterSetup";
import InfoBar from "./components/global/InfoBar.jsx";
import { useStoreData } from "./contexts/appState.js";
import { AppContext } from "./contexts/appContexts";

export default function App() {
  return (
    <AppContext.Provider value={useStoreData()}>
      <InfoBar />
      <RouterProvider router={SechatGamesRouter()} />
    </AppContext.Provider>
  );
}
