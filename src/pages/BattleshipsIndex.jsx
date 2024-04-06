import React from "react";
import { useStore, StoreObjects } from "../App";

function BattleshipsIndex() {
  const [signalRClient, setSignalRClient] = useStore(
    (store) => store[StoreObjects.SIGNALR_CONNECTION]
  );

  return (
    <>
      <div>BattleshipsIndex</div>
    </>
  );
}

export default BattleshipsIndex;
