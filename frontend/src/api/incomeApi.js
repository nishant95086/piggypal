// incomeApi.js
import API from "./axiosConfig";

export const addIncome = async (data) => {
  const response = await API.post("/income/add-income", data);
  return response.data; 
};

export const updateIncome = async (id, data) => {
  const response = await API.put(`/income/update-income/${id}`, data);
  return response.data;
};

export const deleteIncome = async (id) => {
  const response = await API.delete(`/income/delete-income/${id}`);
  return response.data;
};
