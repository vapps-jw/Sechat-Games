import React from "react";
import { RouterProvider } from "react-router-dom";
import { SechatGamesRouter } from "./utils/RouterSetup";
import InfoBar from "./components/global/InfoBar.jsx";
import { useStoreData } from "./contexts/appState.js";
import { AppContext } from "./contexts/appContexts";
import { useSemoniaStoreData } from "./contexts/semoniaState";
import { SemoniaContext } from "./contexts/appContexts";

export default function App() {
  return (
    <AppContext.Provider value={useStoreData()}>
      <SemoniaContext.Provider value={useSemoniaStoreData()}>
        <InfoBar />
        <RouterProvider router={SechatGamesRouter()} />
      </SemoniaContext.Provider>
    </AppContext.Provider>
  );
}
