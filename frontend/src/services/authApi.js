import api from "./api";

export const loginUser = (data) => api.post("/auth/login", data);
export const registerUser = (data) => api.post("/auth/register", data);

export const forgotPassword = (data) => {
  return api.post(
    "/auth/forgot-password",
    data
  );
};


export const verifyCode = (data)=>{
  return api.post(
    "/auth/verify-code",
    data
  );
};


export const resetPassword = (data)=>{
  return api.post(
    "/auth/reset-password",
    data
  );
};