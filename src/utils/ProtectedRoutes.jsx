import { Navigate, Outlet } from "react-router-dom";
import { useStore } from "../App";

const ProtectedRoutes = () => {
  const [userProfile] = useStore((store) => store["UserProfile"]);
  console.log(
    "ProtectedRoutes Activated",
    process.env.WEB_URL_LOGIN,
    userProfile
  );

  // if (JSON.stringify(userProfile) === "{}") {
  //   window.location.replace(process.env.WEB_URL);
  //   return;
  // }

  return <Outlet />;
};

export default ProtectedRoutes;
