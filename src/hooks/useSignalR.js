import { useStore, StoreObjects } from "../contexts/appState";
import * as signalR from "@microsoft/signalr";
import { SemoniaStoreObjects, useSemoniaStore } from "../contexts/semoniaState";
import { useContext } from "react";
import { SemoniaContext } from "../contexts/appContexts";
import React, { useState, useEffect } from "react";

export const SignalRHubMethods = {
  SemoniaStateUpdate: "SemoniaStateUpdate",
};

var prevState = null;

const useSignalR = () => {
  const [signalRConnection, setSignalRConnection] = useStore(
    (store) => store[StoreObjects.SIGNALR_CONNECTION]
  );
  const [signalRState, setSignalRState] = useStore(
    (store) => store[StoreObjects.SIGNALR_STATE]
  );

  const [semonia, setSemonia] = useSemoniaStore((store) => store);

  const createConnection = async () => {
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

    connection.on(SignalRHubMethods.SemoniaStateUpdate, (data) => {
      console.log("Semonia State Receiced", data);
      console.log("Prev State", prevState);

      data.blocks.forEach((block) => {
        const blockProp = `block-${block.displayOrder}`;
        setSemonia({
          [blockProp]: block,
        });
      });
      setSemonia({
        ["currentPositionX"]: data.currentPositionX,
      });
      setSemonia({
        ["currentPositionY"]: data.currentPositionY,
      });
      setSemonia({
        ["statePulled"]: true,
      });
      prevState = data;
    });

    connection.onreconnected(async (connectionId) => {
      console.log("signalR Reconnecting Action", connectionId);
      setSignalRState({
        [StoreObjects.SIGNALR_STATE]: connection?.state,
      });
    });

    await connection.start();

    setSignalRState({
      [StoreObjects.SIGNALR_STATE]: connection?.state,
    });

    setSignalRConnection({
      [StoreObjects.SIGNALR_CONNECTION]: connection,
    });
  };

  return { createConnection };
};

export default useSignalR;
