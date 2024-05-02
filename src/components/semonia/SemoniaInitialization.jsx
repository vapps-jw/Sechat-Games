import React, { useState } from "react";
import {
  SemoniaStoreObjects,
  useSemoniaStore,
} from "../../contexts/semoniaState";
import InitializationView from "./InitializationView";

function SemoniaInitialization() {
  const [semoniaState, setSemoniaState] = useSemoniaStore(
    (store) => store[SemoniaStoreObjects.INITIALIZED]
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
        setSemoniaState({
          [SemoniaStoreObjects.INITIALIZED]: true,
        });
        console.log("Semonia Initialized", semoniaState);
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
