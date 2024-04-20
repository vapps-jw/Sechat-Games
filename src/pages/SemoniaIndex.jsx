import React, { useEffect, useState } from "react";
import useAPI from "../hooks/useAPI";
import SemoniaGameBoard from "../components/semonia/SemoniaGameBoard";
import SemoniaInitialization from "../components/semonia/SemoniaInitialization";
import { useSemoniaStoreData } from "../contexts/semoniaState";
import { SemoniaContext } from "../contexts/appContexts";

function SemoniaIndex() {
  const { checkSemoniaStatus } = useAPI();
  const [semoniaStatus, setSemoniaStatus] = useState(false);

  useEffect(() => {
    checkSemoniaStatus()
      .catch(console.error)
      .then((res) => {
        console.log("Semonia Status: ", res);
        setSemoniaStatus(semoniaStatus);
      });
  }, []);

  return (
    <>
      <SemoniaContext.Provider value={useSemoniaStoreData()}>
        {semoniaStatus ? <SemoniaGameBoard /> : <SemoniaInitialization />}
      </SemoniaContext.Provider>
    </>
  );
}

export default SemoniaIndex;
