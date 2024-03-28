import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useSyncExternalStore,
  useEffect,
} from "react";
import { RouterProvider } from "react-router-dom";
import { SechatGamesRouter } from "./utils/RouterSetup";
import { AppContext, BattleshipsContext } from "./Contexts.js";

function App() {
  console.log("App Starting");

  const appContext = useContext(AppContext);

  console.log("Profile From App", ctx);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await fetch(`${process.env.API_URL}/user/get-profile`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();

        console.log("Fetched Profile", userProfile, data);
        setUserProfile({ ["UserProfile"]: JSON.parse(data) });
      } catch (error) {
        console.error("Profile Not Fetched", error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <AppContext.Provider value={appContext}>
      <RouterProvider router={SechatGamesRouter()} />
    </AppContext.Provider>
  );
}

export default App;
