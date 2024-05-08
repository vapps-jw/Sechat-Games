import React, { useEffect, useState } from "react";
import useAPI from "../hooks/useAPI";
import SemoniaGameBoard from "../components/semonia/SemoniaGameBoard";
import SemoniaInitialization from "../components/semonia/SemoniaInitialization";
import { SemoniaStoreObjects, useSemoniaStore } from "../contexts/semoniaState";

function SemoniaIndex() {
  const { checkSemoniaStatus } = useAPI();
  const [semoniaState, setSemoniaState] = useSemoniaStore(
    (store) => store[SemoniaStoreObjects.INITIALIZED]
  );

  useEffect(() => {
    checkSemoniaStatus()
      .catch(console.error)
      .then((res) => {
        setSemoniaState({
          [SemoniaStoreObjects.INITIALIZED]: res,
        });
      });
  }, []);

  if (semoniaState) {
    return (
      <>
        <SemoniaGameBoard />
      </>
    );
  } else {
    return <SemoniaInitialization />;
  }
}

export default SemoniaIndex;
