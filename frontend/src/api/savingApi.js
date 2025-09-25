import API from "./axiosConfig";

export const addSaving = (data) => API.post("/saving/add-saving", data);
export const updateSaving = (id, data) =>
  API.put(`/saving/update-saving/${id}`, data);
export const deleteSaving = (id) => API.delete(`/saving/delete-saving/${id}`);
