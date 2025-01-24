import axios from "axios";

const LoginUser = async (loginForm) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      loginForm
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error response: ", error.response);
      const errorMessage = error.response?.data?.message || "An error occurred";
      throw new Error(errorMessage);
    } else if (error.request) {
      console.error("Error request: ", error.request);
      throw new Error("Network error: Please check your internet connection.");
    } else {
      console.error("Error message: ", error.message);
      throw new Error(error.message);
    }
  }
};

export default LoginUser;
