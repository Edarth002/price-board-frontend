import axios from "axios";

export const sendEmail = async (email, subject, body) => {
  try {
    const response = await axios.post(
      "https://product-price-board.onrender.com/send_notification",
      {},
      {
        params: { email, subject, body },
      }
    );
    return response.data; // Return the API response
  } catch (error) {
    console.error("Error sending email:", error);
    throw error; // Forward the error for debugging
  }
};
