import { Outlet } from "react-router-dom";
import { useStore } from "../App";
import React, { useEffect } from "react";

const ProtectedRoutes = () => {
  const [userProfile, setStore] = useStore((store) => store["userProfile"]);
  console.log(
    "ProtectedRoutes Activated",
    process.env.WEB_URL_LOGIN,
    userProfile
  );

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await fetch(`${process.env.API_URL}/user/get-profile`, {
          method: "GET",
          credentials: "include",
        });

        console.log("Profile Fetch Res", res);
        if (res.status == 405) {
          window.location.replace(
            `${process.env.WEB_URL_LOGIN}?url=${encodeURIComponent(
              process.env.CALLBACK_URL
            )}`
          );
          return;
        }
        const data = await res.json();

        if (!userProfile) {
          console.log("Updating Profile", data);
          setStore({ ["userProfile"]: data });
        }
      } catch (error) {
        console.error("Profile Not Fetched", error);
        setStore({ ["userProfile"]: null });
      }
    };

    fetchUserProfile().catch(console.error);
  }, []);

  console.log("Profile Updated", userProfile);
  return <Outlet />;
};

export default ProtectedRoutes;
