export const fetchUserProfile = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/user/get-profile`, {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json();

    console.log("Fetched Profile", data);
    return data;
  } catch (error) {
    console.error("Profile Not Fetched", error);
    return null;
  }
};
