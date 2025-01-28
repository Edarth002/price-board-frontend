import axios from "axios";

// Create Axios instance with base URL
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Interceptor to add Authorization token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Fetch token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Fetch products
export const fetchProducts = async (skip = 0, limit = 10) => {
  try {
    const response = await api.get("/products/", {
      params: { skip, limit }, // Query parameters for pagination
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error.response || error);
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while fetching products."
    );
  }
};

// Add a new product
export const addProduct = async ({ name, price, category_id, image }) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("price", price);
  formData.append("category_id", category_id);
  if (image) formData.append("image", image);

  try {
    const response = await fetch(
      "https://product-price-board.onrender.com/products/",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer arthur", // Replace with your actual token
        },
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Error ${response.status}: ${
          errorData?.detail?.[0]?.msg || "Unknown error"
        }`
      );
    }

    const newProduct = await response.json();
    return newProduct;
  } catch (error) {
    throw new Error(error.message || "Unknown error occurred");
  }
};
