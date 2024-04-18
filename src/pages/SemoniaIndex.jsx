import React, { useEffect } from "react";

function SemoniaIndex() {
  useEffect(() => {
    console.log("Semonia Use Effect");
  }, []);

  return <div>SemoniaIndex</div>;
}

export default SemoniaIndex;
