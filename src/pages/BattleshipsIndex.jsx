import React, { useEffect } from "react";
import { useStore } from "../App";

function BattleshipsIndex() {
  const [fieldValue] = useStore((store) => store["UserProfile"]);

  useEffect(() => {
    console.log("Use Effect");
  }, []);

  return (
    <>
      <div>BattleshipsIndex</div>
      <div>UserProfile: {JSON.stringify(fieldValue)}</div>
    </>
  );
}

export default BattleshipsIndex;
