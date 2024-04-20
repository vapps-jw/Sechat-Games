import React from "react";
import {
  SemoniaStoreObjects,
  useSemoniaStore,
} from "../../contexts/semoniaState";

function SemoniaInitialization() {
  const [X1Y1] = useSemoniaStore((store) => store[SemoniaStoreObjects.X1Y1]);

  return (
    <>
      <div>SemoniaInitialization</div>
      <div>{X1Y1}</div>
    </>
  );
}

export default SemoniaInitialization;
