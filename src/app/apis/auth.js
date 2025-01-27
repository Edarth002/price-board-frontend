const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const signUp = async (email, username, password, isSuperuser) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        username,
        password,
        is_superuser: isSuperuser,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to sign up. Please try again.");
    }

    console.log("Sign-Up Successful:", data);
    return data;
  } catch (error) {
    console.error("Sign-Up Error:", error.message);
    throw new Error(error.message || "An error occurred during sign-up.");
  }
};

export const login = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to log in. Please check your credentials."
      );
    }

    return data;
  } catch (error) {
    console.error("Login Error:", error.message);
    throw new Error(error.message || "An error occurred during login.");
  }
};
