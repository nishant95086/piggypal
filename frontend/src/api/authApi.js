import API from "./axiosConfig";

// Register user
export const registerUser = async (data) => {
  try {
    const response = await API.post("/auth/register", data);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error.response?.data || error.message);
    throw error;
  }
};

// Login user
export const loginUser = async (data) => {
  try {
    const response = await API.post("/auth/login", data);

    // ✅ Use accessToken (backend sends this)
    if (response.data?.accessToken) {
      localStorage.setItem("token", response.data.accessToken);
    }

    return response.data; // { status, message, accessToken, user? }
  } catch (error) {
    console.error("Error logging in:", error.response?.data || error.message);
    throw error;
  }
};

// Change password
export const changePassword = async (data) => {
  try {
    const response = await API.put("/auth/update-password", data);
    return response.data;
  } catch (error) {
    console.error("Error changing password:", error.response?.data || error.message);
    throw error;
  }
};
