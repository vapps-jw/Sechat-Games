import React, { useEffect, useState } from "react";
import useAPI from "../hooks/useAPI";
import SemoniaGameBoard from "../components/semonia/SemoniaGameBoard";
import SemoniaInitialization from "../components/semonia/SemoniaInitialization";

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
    <> {semoniaStatus ? <SemoniaGameBoard /> : <SemoniaInitialization />}</>
  );
}

export default SemoniaIndex;
