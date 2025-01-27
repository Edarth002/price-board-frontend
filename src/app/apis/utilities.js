// utilities.js

const BASE_URL = "https://product-price-board.onrender.com";

// Helper function for detailed error logging
const handleApiError = async (response) => {
  const errorDetails = await response
    .json()
    .catch(() => "No details available");
  console.error(`API Error:`, {
    status: response.status,
    statusText: response.statusText,
    details: errorDetails,
  });
  throw new Error(
    `${response.status} ${response.statusText}: ${
      errorDetails.message || "Unknown error"
    }`
  );
};

// Calculate Price API
export const calculatePrice = async (productData) => {
  const { productId } = productData;

  const queryParams = new URLSearchParams({
    product_id: productId,
  });

  const response = await fetch(
    `${BASE_URL}/calculate_price/?${queryParams.toString()}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    await handleApiError(response);
  }

  return await response.json();
};

// Send Email API
export const sendEmailNotification = async (emailData) => {
  const { email, subject, body } = emailData;

  const queryParams = new URLSearchParams({
    email,
    subject,
    body,
  });

  const response = await fetch(
    `${BASE_URL}/send_notification/?${queryParams.toString()}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    await handleApiError(response);
  }

  return await response.json();
};
