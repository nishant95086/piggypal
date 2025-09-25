import API from "./axiosConfig";

export const addWish = (data) => API.post("/wish/add-wish", data);
export const updateWish = (id, data) =>
  API.put(`/wish/update-wish/${id}`, data);
export const deleteWish = (id) => API.delete(`/wish/delete-wish/${id}`);
