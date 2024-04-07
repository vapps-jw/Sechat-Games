import { useStore, StoreObjects } from "../App";
import * as signalR from "@microsoft/signalr";

const useSignalR = () => {
  const [signalRConnection, setSignalRConnection] = useStore(
    (store) => store[StoreObjects.SIGNALR_CONNECTION]
  );
  const [signalRState, setSignalRState] = useStore(
    (store) => store[StoreObjects.SIGNALR_STATE]
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

    connection.onreconnected(async (connectionId) => {
      console.log("signalR Reconnecting Action", connectionId);
      setSignalRState({
        [StoreObjects.SIGNALR_STATE]: connection?.state,
      });
    });

    console.log("Starting Connection", connection);
    await connection.start();

    console.log("Saving Connection to the Store", connection);
    setSignalRState({
      [StoreObjects.SIGNALR_STATE]: connection?.state,
    });

    console.log("Saving Connection to Store", connection);
    setSignalRConnection({
      [StoreObjects.SIGNALR_CONNECTION]: connection,
    });
  };

  return [createConnection];
};

export default useSignalR;
