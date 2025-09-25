import API from "./axiosConfig";

export const getDashboardSummary = () => API.get("/dashboard/all");
