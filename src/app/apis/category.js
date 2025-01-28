import api from "./api";

// Fetch categories with pagination
export const fetchCategories = async (skip = 0, limit = 10) => {
  try {
    const response = await api.get("/categories", {
      params: { skip, limit }, // Include pagination parameters
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error.response || error);
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while fetching categories."
    );
  }
};

// Add a new category
export const addCategory = async (categoryData) => {
  try {
    const response = await api.post("/categories", categoryData);
    return response.data;
  } catch (error) {
    console.error("Error adding category:", error.response || error);
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while adding the category."
    );
  }
};

// Update an existing category by ID
export const updateCategory = async (id, categoryData) => {
  try {
    const response = await api.put(`/categories/${id}`, categoryData);
    return response.data;
  } catch (error) {
    console.error("Error updating category:", error.response || error);
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while updating the category."
    );
  }
};

// Delete a category by ID
export const deleteCategory = async (id) => {
  try {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting category:", error.response || error);
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while deleting the category."
    );
  }
};
