import React, { useEffect } from "react";
import { useStore, StoreObjects } from "../App";
import { Link } from "react-router-dom";

function GamesIndex() {
  const [userProfile] = useStore((store) => store[StoreObjects.USER_PROFILE]);
  const [signalRConnection] = useStore(
    (store) => store[StoreObjects.SIGNALR_CONNECTION]
  );
  const [signalRState] = useStore((store) => store[StoreObjects.SIGNALR_STATE]);

  useEffect(() => {
    console.log(signalRConnection, "- Has changed");
  }, [signalRConnection]);

  return (
    <>
      <div>GamesIndex</div>
      <div>Profile: {JSON.stringify(userProfile)}</div>
      <div>SignalR State: {signalRState}</div>
      <div>SignalR Connection: {signalRConnection?.connectionId}</div>
      <Link
        to={"/bs"}
        className="h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm"
      >
        BS
      </Link>
    </>
  );
}

export default GamesIndex;
