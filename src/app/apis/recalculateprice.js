import axios from "axios";

export const recalculatePrice = async (productId) => {
  try {
    const response = await axios.post(
      "https://product-price-board.onrender.com/calculate_price/", // Replace with the actual API endpoint
      {},
      { params: { product_id: productId } } // Pass product_id as a query parameter
    );
    return response.data; // Return the response data
  } catch (error) {
    throw error; // Throw error to handle it in the component
  }
};
