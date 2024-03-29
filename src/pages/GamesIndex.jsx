import React, { useEffect, useState } from "react";
import { useStore } from "../App";
import { createNewClient, SignalRClient } from "../SignalRClient";

function GamesIndex() {
  const [userProfile] = useStore((store) => store["userProfile"]);
  const [signalRClient, setSignalRClient] = useStore(
    (store) => store["signalRClient"]
  );

  useEffect(() => {
    const initializeSignalR = async () => {
      try {
        if (signalRClient) {
          return;
        }
        console.warn("Creating New SignalRClient");
        const newClient = createNewClient();
        setSignalRClient({ ["signalRClient"]: newClient });
        await newClient.startConnection();
      } catch (error) {
        console.log(error);
      }
    };

    initializeSignalR().catch(console.error);
    return () => {
      console.log("SignalR Cleanup");
      signalRClient?.dispose().catch(console.error);
    };
  }, []);
  return (
    <>
      <div>GamesIndex</div>
      <div>{JSON.stringify(userProfile)}</div>
    </>
  );
}

export default GamesIndex;
