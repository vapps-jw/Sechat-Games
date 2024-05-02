import { useCallback, useContext, useRef, useSyncExternalStore } from "react";
import { AppContext } from "../contexts/appContexts";

export const StoreObjects = {
  USER_PROFILE: "userProfile",
  SIGNALR_CONNECTION: "signalRConnection",
  SIGNALR_STATE: "signalRState",
  SEMONIA_STORE: "semoniaStore",
};

export const useStoreData = () => {
  const store = useRef({
    userProfile: null,
    signalRConnection: null,
    signalRState: "Not Initialized",
    semoniaStore: null,
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
    throw `Store is null! >>> ${store}`;
  }

  const state = useSyncExternalStore(store.subscribe, () =>
    selector(store.get())
  );
  return [state, store.set];
};
