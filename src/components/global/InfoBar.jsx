import React, { useEffect } from "react";
import { useStore, StoreObjects } from "../../App";
import ConnectionStatus from "./ConnectionStatus";
import UserInfo from "./UserInfo";

function InfoBar() {
  const [signalRConnection] = useStore(
    (store) => store[StoreObjects.SIGNALR_CONNECTION]
  );

  useEffect(() => {
    console.log(signalRConnection, "- Has changed");
  }, [signalRConnection]);

  return (
    <>
      <div className="navbar bg-base-300">
        <div className="navbar-start">
          <ConnectionStatus />
        </div>
        <div className="navbar-end">
          <UserInfo />
        </div>
      </div>
    </>
  );
}

export default InfoBar;
