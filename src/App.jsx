import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useSyncExternalStore,
} from "react";
import { RouterProvider } from "react-router-dom";
import { SechatGamesRouter } from "./utils/RouterSetup";
import { GameView } from "./Battleships.js";
import InfoBar from "./components/global/InfoBar.jsx";

export const StoreObjects = {
  USER_PROFILE: "userProfile",
  SIGNALR_CONNECTION: "signalRConnection",
  SIGNALR_STATE: "signalRState",
  BATTLESHIPS_GAME_STATE: "battleshipsGameState",
  BATTLESHIPS_GAME_VIEW: "battleshipsGameView",
};

const AppContext = createContext(null);

const useStoreData = () => {
  const store = useRef({
    userProfile: null,
    signalRConnection: null,
    signalRState: "Not Initialized",
    battleshipsStore: null,
    battleshipsGameView: GameView.LANDING,
  });
  const get = useCallback(() => store.current, []);
  const subscribers = useRef(new Set());
  const set = useCallback((value) => {
    store.current = { ...store.current, ...value };
    return subscribers.current.forEach((callback) => callback());
  }, []);

  const subscribe = useCallback((callback) => {
    subscribers.current.add(callback);
    return () => subscribers.current.delete(callback);
  }, []);

  return { get, set, subscribe };
};

export const useStore = (selector) => {
  const store = useContext(AppContext);
  if (!store) {
    throw "Error";
  }

  const state = useSyncExternalStore(store.subscribe, () =>
    selector(store.get())
  );
  return [state, store.set];
};

export default function App() {
  return (
    <AppContext.Provider value={useStoreData()}>
      <InfoBar />
      <RouterProvider router={SechatGamesRouter()} />
    </AppContext.Provider>
  );
}
