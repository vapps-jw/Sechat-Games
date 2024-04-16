import React from "react";
import { useStore, StoreObjects } from "../../App";

function UserInfo() {
  const [userProfile] = useStore((store) => store[StoreObjects.USER_PROFILE]);

  return (
    <>
      <p className="bangers-default">
        {userProfile ? userProfile.userName : ""}
      </p>
    </>
  );
}

export default UserInfo;
