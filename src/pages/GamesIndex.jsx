import React, { useEffect } from "react";
import { useStore, StoreObjects } from "../contexts/appState";
import SemoniaCard from "../components/semonia/SemoniaCard";

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
      <div className="d-flex mx-4 my-2 flex-col">
        <SemoniaCard />
      </div>
    </>
  );
}

export default GamesIndex;
