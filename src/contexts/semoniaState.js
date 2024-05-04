import { useCallback, useContext, useRef, useSyncExternalStore } from "react";
import { SemoniaContext } from "../contexts/appContexts";

export const SemoniaStoreObjects = {
  INITIALIZED: "initialized",
  SEMONIA_STATE: "semoniaState",
};

const initializeState = () => {
  let initialState = {
    initialized: false,
    currentPositionX: null,
    currentPositionY: null,
    statePulled: false,
  };

  for (let index = 0; index < 49; index++) {
    initialState[`block-${index}`] = null;
  }
  console.log("Initial Semonia State", initialState);
  return initialState;
};

export const useSemoniaStoreData = () => {
  const store = useRef(initializeState());
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

export const useSemoniaStore = (selector) => {
  const store = useContext(SemoniaContext);
  if (!store) {
    throw `Store is null! >>> ${store}`;
  }

  const state = useSyncExternalStore(store.subscribe, () =>
    selector(store.get())
  );
  return [state, store.set];
};

export const useFullSemoniaStore = () => {
  const store = useContext(SemoniaContext);
  if (!store) {
    throw `Store is null! >>> ${store}`;
  }

  const state = useSyncExternalStore(store.subscribe);
  return [state, store.set];
};
