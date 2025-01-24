import axios from "axios";

const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const fetchCategories = async () => {
  try {
    const response = await api.get("/categories/");
    return response.data;
  } catch (error) {
    console.error(error.message);
    throw new Error(
      error.response?.data?.message || "Failed to fetch categories"
    );
  }
};

export const addCategory = async (categoryData) => {
  try {
    const response = await api.post("/categories/", categoryData);
    return response.data;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.response?.data?.message || "Failed to add category");
  }
};

export const updateCategory = async (id, categoryData) => {
  try {
    const response = await api.put(`/categories/${id}/`, categoryData);
    return response.data;
  } catch (error) {
    console.error(error.message);
    throw new Error(
      error.response?.data?.message || "Failed to update category"
    );
  }
};

export const deleteCategory = async (id) => {
  try {
    const response = await api.delete(`/categories/${id}/`);
    return response.data;
  } catch (error) {
    console.error(error.message);
    throw new Error(
      error.response?.data?.message || "Failed to delete category"
    );
  }
};
