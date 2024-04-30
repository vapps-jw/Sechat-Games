import { useStore, StoreObjects } from "../contexts/appState";

const useAPI = () => {
  const [userProfile, setUserProfile] = useStore(
    (store) => store[StoreObjects.USER_PROFILE]
  );

  const initializeSemonia = async () => {
    try {
    } catch (error) {
      console.error("InitializeSemonia Error", error);
    }
  };

  const checkSemoniaStatus = async () => {
    try {
      const res = await fetch(`${process.env.API_URL}/games/semonia/status`, {
        method: "GET",
        credentials: "include",
      });

      if (res.status == 405) {
        window.location.replace(
          `${process.env.WEB_URL_LOGIN}?url=${encodeURIComponent(
            process.env.CALLBACK_URL
          )}`
        );
        return;
      }

      return await res.json();
    } catch (error) {
      console.error("CheckSemoniaStatus Error", error);
    }
  };

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

  return { getUserProfile, checkSemoniaStatus, initializeSemonia };
};

export default useAPI;
