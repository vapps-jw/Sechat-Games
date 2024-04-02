import React, { useEffect, useState } from "react";
import { useStore, StoreObjects } from "../App";
import { createNewClient, SignalRClient } from "../SignalRClient";

function GamesIndex() {
  const [userProfile] = useStore((store) => store[StoreObjects.USER_PROFILE]);
  const [signalRClient, setSignalRClient] = useStore(
    (store) => store[StoreObjects.SIGNALR_CLIENT]
  );

  useEffect(() => {
    const initializeSignalR = async () => {
      try {
        if (signalRClient) {
          return;
        }
        console.warn("Creating New SignalRClient");
        const newClient = createNewClient();
        setSignalRClient({ [StoreObjects.SIGNALR_CLIENT]: newClient });
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
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure>
          <img
            src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Shoes!</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
      <div>GamesIndex</div>
      <div>{JSON.stringify(userProfile)}</div>
    </>
  );
}

export default GamesIndex;
