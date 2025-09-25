import API from "./axiosConfig";

export const addTodo = (data) => API.post("/todo/add-todo", data);
export const updateTodo = (id, data) =>
  API.put(`/todo/update-todo/${id}`, data);
export const deleteTodo = (id) => API.delete(`/todo/delete-todo/${id}`);
