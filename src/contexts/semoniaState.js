import { useCallback, useContext, useRef, useSyncExternalStore } from "react";
import { SemoniaContext } from "../contexts/appContexts";

export const SemoniaStoreObjects = {
  initialized: "initialized",
  X1Y1: "X1Y1",
};
export const useSemoniaStoreData = () => {
  const store = useRef({
    initialized: false,
    X1Y1: "XYtest",
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
