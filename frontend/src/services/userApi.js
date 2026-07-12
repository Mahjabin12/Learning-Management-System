import api from "./api";


// Current user profile

export const getMyProfile = () => {
  return api.get("/users/profile");
};



export const updateMyProfile = (data) => {
  return api.patch(
    "/users/profile",
    data
  );
};



export const changePassword = (data) => {
  return api.patch(
    "/users/change-password",
    data
  );
};
