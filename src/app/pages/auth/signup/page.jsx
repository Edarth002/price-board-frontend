"use client";
import { useState } from "react";
import { useAuth } from "@/app/context/authcontext";
import Link from "next/link";

export default function SignUp() {
  const { signUpUser, loading, error, clearError } = useAuth();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUpUser(email, username, password, true);
      clearError();
      setSuccessMessage(
        "Sign-up successful! Welcome to the Product Price Board."
      );
    } catch (err) {
      console.error("Error during sign-up:", err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-center text-3xl font-bold -mt-28 mb-20">
        Welcome to Product Price Board
      </h1>
      <form onSubmit={handleSubmit} className="md:mx-0 mx-3 p-6 max-w-[30rem]">
        <h1 className="text-xl font-semibold mb-4">Sign Up</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />

        {error && <p className="text-red-500 mt-2">{error}</p>}
        {successMessage && (
          <p className="text-green-500 mt-2">{successMessage}</p>
        )}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>
      <p className="text-gray-600">
        Already have an account with us?{" "}
        <Link
          href="/pages/auth/login"
          className="text-gray-800 hover:text-blue-600 cursor-pointer hover:underline"
        >
          Login
        </Link>
      </p>
    </div>
  );
}
