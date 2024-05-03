import React from "react";
import {
  SemoniaStoreObjects,
  useSemoniaStore,
} from "../../contexts/semoniaState";
import SemoniaBlocksContainer from "./SemoniaBlocksContainer";
import SemoniaInfoBar from "./SemoniaInfoBar";

function SemoniaGameBoard() {
  // todo: context not for block infos
  // const [state, setState] = useSemoniaStore(
  //   (store) => store[SemoniaStoreObjects.SEMONIA_STATE]
  // );

  return (
    <>
      <SemoniaInfoBar />
      <SemoniaBlocksContainer />
    </>
  );
}

export default SemoniaGameBoard;
