import api from "./api";

export const getAdminStats = () => api.get("/admin/stats");
export const getAdminRevenue = () => api.get("/admin/revenue");