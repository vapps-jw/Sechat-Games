import React, { useState } from "react";
import {
  SemoniaStoreObjects,
  useSemoniaStore,
} from "../../contexts/semoniaState";
import InitializationView from "./InitializationView";

function SemoniaInitialization() {
  const [state] = useSemoniaStore(
    (store) => store[SemoniaStoreObjects.SEMONIA_STATE]
  );
  const [initializationInProgress, setInitializationInProgress] =
    useState(false);

  const joinSemonia = async () => {
    try {
      setInitializationInProgress(true);
      const res = await fetch(`${process.env.API_URL}/games/semonia/join`, {
        method: "POST",
        credentials: "include",
      });

      console.log("Join Response", res);
      if (res.status == 200) {
        console.log("Initialized");
      }
    } catch (error) {
      console.error("joinSemonia Error", error);
    } finally {
      setInitializationInProgress(false);
    }
  };

  if (initializationInProgress) {
    <InitializationView />;
  } else {
    return (
      <>
        <div>SemoniaInitialization</div>
        <div>{JSON.stringify(state)}</div>
        <button
          onClick={joinSemonia}
          className="btn rounded-full bangers-font text-lg"
        >
          Initialize
        </button>
        <button className="btn rounded-full bangers-font text-lg">Back</button>
      </>
    );
  }
}

export default SemoniaInitialization;
