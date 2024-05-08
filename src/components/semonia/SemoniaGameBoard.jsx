import React from "react";
import {
  SemoniaStoreObjects,
  useSemoniaStore,
} from "../../contexts/semoniaState";
import SemoniaBlocksContainer from "./SemoniaBlocksContainer";
import SemoniaInfoBar from "./SemoniaInfoBar";
import BottomDetailsPanel from "./BottomDetailsPanel";
import BlockContainerLoading from "./BlockContainerLoading";

function SemoniaGameBoard() {
  const [statePulled, setStatePulled] = useSemoniaStore(
    (store) => store[SemoniaStoreObjects.STATE_PULLED]
  );

  return (
    <>
      <div className="h-10 flex justify-center">
        <SemoniaInfoBar />
      </div>
      {statePulled ? (
        <SemoniaBlocksContainer />
      ) : (
        <div className="flex justify-center">
          <BlockContainerLoading />
        </div>
      )}

      <div className="flex justify-center">
        <BottomDetailsPanel />
      </div>
    </>
  );
}

export default SemoniaGameBoard;
