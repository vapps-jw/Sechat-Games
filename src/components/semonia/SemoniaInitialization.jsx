import React, { useState } from "react";
import {
  SemoniaStoreObjects,
  useSemoniaStore,
} from "../../contexts/semoniaState";

function SemoniaInitialization() {
  const [X1Y1] = useSemoniaStore((store) => store[SemoniaStoreObjects.X1Y1]);
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
      return await res.json();
    } catch (error) {
      console.error("joinSemonia Error", error);
    } finally {
      setInitializationInProgress(false);
    }
  };

  return (
    <>
      <div>SemoniaInitialization</div>
      <div>{X1Y1}</div>
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

export default SemoniaInitialization;
