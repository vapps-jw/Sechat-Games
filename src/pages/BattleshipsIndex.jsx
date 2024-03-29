import React, { useEffect } from "react";

function BattleshipsIndex() {
  useEffect(() => {
    console.log("Use Effect");
  }, []);

  return (
    <>
      <div>BattleshipsIndex</div>
    </>
  );
}

export default BattleshipsIndex;
