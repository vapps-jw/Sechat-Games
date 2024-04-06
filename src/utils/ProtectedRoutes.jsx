import { Outlet } from "react-router-dom";
import { useStore, StoreObjects } from "../App";
import React, { useEffect } from "react";
import * as signalR from "@microsoft/signalr";

const ProtectedRoutes = () => {
  const [userProfile, setStore] = useStore(
    (store) => store[StoreObjects.USER_PROFILE]
  );
  const [signalRConnection, setSignalRConnection] = useStore(
    (store) => store[StoreObjects.SIGNALR_CONNECTION]
  );
  const [signalRState, setSignalRState] = useStore(
    (store) => store[StoreObjects.SIGNALR_STATE]
  );

  console.log(
    "ProtectedRoutes Activated",
    process.env.WEB_URL_LOGIN,
    userProfile
  );

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await fetch(`${process.env.API_URL}/user/get-profile`, {
          method: "GET",
          credentials: "include",
        });

        console.log("Profile Fetch Res", res);
        if (res.status == 405) {
          window.location.replace(
            `${process.env.WEB_URL_LOGIN}?url=${encodeURIComponent(
              process.env.CALLBACK_URL
            )}`
          );
          return;
        }
        const data = await res.json();

        if (!userProfile) {
          console.log("Updating Profile", data);
          setStore({ ["userProfile"]: data });
        }
      } catch (error) {
        console.error("Profile Not Fetched", error);
        setStore({ ["userProfile"]: null });
      }
    };

    const initializeSignalR = async () => {
      const connUrl = `${process.env.API_URL}/games-hub`;
      console.log("Creating new SignalR Connection", connUrl);
      const connection = new signalR.HubConnectionBuilder()
        .withUrl(connUrl)
        .configureLogging(signalR.LogLevel.Information)
        .withAutomaticReconnect({
          nextRetryDelayInMilliseconds: (retryContext) => {
            setSignalRState({
              [StoreObjects.SIGNALR_STATE]: connection?.state,
            });
            return 2000;
          },
        })
        .build();

      connection.onreconnected(async (connectionId) => {
        console.log("signalR Reconnecting Action", connectionId);
        setSignalRState({
          [StoreObjects.SIGNALR_STATE]: connection?.state,
        });
      });

      console.log("Starting Connection", connection);
      await connection.start();

      console.log("Saving Connection to the Store", connection);
      setSignalRConnection({
        [StoreObjects.SIGNALR_CONNECTION]: connection,
      });
      setSignalRState({
        [StoreObjects.SIGNALR_STATE]: connection?.state,
      });
    };

    fetchUserProfile()
      .catch(console.error)
      .then(() => initializeSignalR().catch(console.error));
  }, []);

  if (!userProfile) {
    return null;
  }
  return <Outlet />;
};

export default ProtectedRoutes;
