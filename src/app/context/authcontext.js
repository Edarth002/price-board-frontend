"use client";
import { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // User state
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const router = useRouter();

  // Clear error state
  const clearError = () => setError(null);

  // Signup function (do not touch, as per your instructions)
  const signupUser = async (email, username, password, isSuperUser) => {
    setLoading(true);
    clearError();

    try {
      const response = await fetch(
        "https://product-price-board.onrender.com/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            username,
            password,
            is_superuser: isSuperUser,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.detail && Array.isArray(errorData.detail)) {
          const errorMsg = errorData.detail.map((err) => err.msg).join(", ");
          throw new Error(errorMsg);
        } else if (errorData.detail) {
          throw new Error(errorData.detail);
        } else {
          throw new Error("An unknown error occurred.");
        }
      }

      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      router.push("/pages/auth/login"); // Redirect to login after signup
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Login function (updated)
  const loginUser = async (email, password) => {
    setLoading(true);
    clearError();

    try {
      const response = await fetch(
        "https://product-price-board.onrender.com/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.detail) {
          throw new Error(errorData.detail);
        } else {
          throw new Error("Invalid credentials.");
        }
      }

      const { access_token } = await response.json();

      // Ensure the access token exists in response
      if (access_token) {
        console.log("Access Token:", access_token); // Log the access token
        localStorage.setItem("access_token", access_token);
        setUser({ email }); // Store user info (you can store the token in state if needed)

        // Redirect to categories page
        router.replace("/pages/categories");
      } else {
        throw new Error("Login failed: No access token received.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, signupUser, loginUser, loading, error, clearError }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
