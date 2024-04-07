import { Outlet } from "react-router-dom";
import React, { useEffect } from "react";
import useSignalR from "../hooks/useSignalR";
import useAPI from "../hooks/useAPI";
import { useStore, StoreObjects } from "../App";

const ProtectedRoutes = () => {
  const [userProfile, setUserProfile] = useStore(
    (store) => store[StoreObjects.USER_PROFILE]
  );

  const [getUserProfile] = useAPI();
  const [createConnection] = useSignalR();

  console.log("ProtectedRoutes Activated", process.env.WEB_URL_LOGIN);

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
