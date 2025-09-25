import API from "./axiosConfig";

export const addInvestment = async (data) => {
  try {
    const response = await API.post("/investment/add-investment", data);
    return response.data;
  } catch (error) {
    console.error("Error adding investment:", error.response?.data || error.message);
    throw error;
  }
};

export const updateInvestment = async (id, data) => {
  try {
    const response = await API.put(`/investment/update-investment/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating investment:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteInvestment = async (id) => {
  try {
    const response = await API.delete(`/investment/delete-investment/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting investment:", error.response?.data || error.message);
    throw error;
  }
};
