"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/app/context/authcontext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const { loginUser, loading, error, clearError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Clear errors when component mounts or email/password changes
    clearError();
  }, [email, password, clearError]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous messages
    setSuccessMessage("");

    try {
      await loginUser(email, password); // Login the user
      setSuccessMessage("Login successful! Redirecting...");
      setTimeout(() => {
        router.push("/pages/categories");
      }, 2000);
    } catch {
      // Error handling is already managed in the AuthProvider
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen md:mx-0 mx-3">
      <h1 className="text-center text-3xl font-bold -mt-28 mb-20">
        We are glad to have you back!
      </h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 max-w-[30rem]">
        <h1 className="text-xl font-semibold mb-4">Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          required
        />

        {/* Display error or success messages */}
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {successMessage && (
          <p className="text-green-500 mt-2">{successMessage}</p>
        )}

        <button
          type="submit"
          className={`w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Loading..." : "Login"}
        </button>
        <p className="text-gray-600 mt-4">
          Don't have an account with us?{" "}
          <Link
            href="/pages/auth/signup"
            className="text-gray-800 hover:text-blue-600 cursor-pointer hover:underline"
          >
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}
