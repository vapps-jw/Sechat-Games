import { Outlet } from "react-router-dom";
import React, { useEffect } from "react";
import useSignalR from "../hooks/useSignalR";
import useAPI from "../hooks/useAPI";
import { useStore, StoreObjects } from "../contexts/appState";

const ProtectedRoutes = () => {
  const [userProfile, setUserProfile] = useStore(
    (store) => store[StoreObjects.USER_PROFILE]
  );

  const { getUserProfile } = useAPI();
  const { createConnection } = useSignalR();

  useEffect(() => {
    getUserProfile()
      .catch(console.error)
      .then(() => createConnection().catch(console.error));
  }, []);

  if (!userProfile) {
    return null;
  }
  return <Outlet />;
};

export default ProtectedRoutes;
