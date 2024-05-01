import React from "react";
import {
  SemoniaStoreObjects,
  useSemoniaStore,
} from "../../contexts/semoniaState";

function SemoniaGameBoard() {
  const [state, setState] = useSemoniaStore(
    (store) => store[SemoniaStoreObjects.SEMONIA_STATE]
  );

  return (
    <>
      <div>SemoniaGameBoard</div>
      <div>State: {JSON.stringify(state)}</div>
    </>
  );
}

export default SemoniaGameBoard;
