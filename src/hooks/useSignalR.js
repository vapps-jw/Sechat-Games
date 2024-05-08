import { useStore, StoreObjects } from "../contexts/appState";
import * as signalR from "@microsoft/signalr";
import { useSemoniaStore } from "../contexts/semoniaState";

export const SignalRHubMethods = {
  SemoniaStateUpdate: "SemoniaStateUpdate",
};

var prevBlocks = {};

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
      console.log("Semonia State Receiced");
      // console.log("Prev State", prevBlocks);

      data.blocks.forEach((block) => {
        const blockProp = `block-${block.displayOrder}`;
        if (!Object.keys(prevBlocks).some((pbk) => pbk === blockProp)) {
          prevBlocks[blockProp] = block;
          setSemonia({
            [blockProp]: block,
          });
          return;
        }
        const prevBlockProp = prevBlocks[blockProp];
        if (
          !(
            prevBlockProp.id === block.id &&
            prevBlockProp.displayOrder === block.displayOrder
          )
        ) {
          console.log("Updating block", block, prevBlockProp);
          setSemonia({
            [blockProp]: block,
          });
        }
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
