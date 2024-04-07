import { useStore, StoreObjects } from "../App";

const useAPI = () => {
  const [userProfile, setUserProfile] = useStore(
    (store) => store[StoreObjects.USER_PROFILE]
  );

  const getUserProfile = async () => {
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
        setUserProfile({ ["userProfile"]: data });
      }
    } catch (error) {
      console.error("Profile Not Fetched", error);
      setUserProfile({ ["userProfile"]: null });
    }
  };

  return [getUserProfile];
};

export default useAPI;
