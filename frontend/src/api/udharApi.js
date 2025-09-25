import API from "./axiosConfig";

export const addUdhar = (data) => API.post("/udhar/add-udhar", data);
export const updateUdhar = (id, data) =>
  API.put(`/udhar/update-udhar/${id}`, data);
export const deleteUdhar = (id) => API.delete(`/udhar/delete-udhar/${id}`);
