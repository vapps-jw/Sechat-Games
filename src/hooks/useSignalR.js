import { useStore, StoreObjects } from "../contexts/appState";
import * as signalR from "@microsoft/signalr";
import { SemoniaStoreObjects, useSemoniaStore } from "../contexts/semoniaState";

export const SignalRHubMethods = {
  SemoniaStateUpdate: "SemoniaStateUpdate",
};

const useSignalR = () => {
  const [signalRConnection, setSignalRConnection] = useStore(
    (store) => store[StoreObjects.SIGNALR_CONNECTION]
  );
  const [signalRState, setSignalRState] = useStore(
    (store) => store[StoreObjects.SIGNALR_STATE]
  );
  const [semonia, setSemonia] = useSemoniaStore(
    (store) => store[SemoniaStoreObjects.SEMONIA_STATE]
  );

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
      console.log("Semonia State Receiced:", data);
      setSemonia({
        [SemoniaStoreObjects.SEMONIA_STATE]: data,
      });
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
