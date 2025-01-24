"use client";
import React, { useState } from "react";
import Link from "next/link";
import LoginUser from "./loginuser";
import { useRouter } from "next/navigation";

export const LoginForm = () => {
  const router = useRouter();
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [success, setSucess] = useState("");
  const [error, setError] = useState("");

  const handleInput = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSucess("");
    try {
      const data = await LoginUser(loginForm);
      setSucess("Welcome back, redirecting you to our awesome software");
      console.log(success);

      // Save the token in localStorage
      localStorage.setItem("token", data.token);

      // Redirect to categories page
      router.push("/authpages/categories");

      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="w-full h-screen pt-10 md:px-0 px-2">
      <h1 className="text-center text-3xl font-bold mb-10">Welcome Back</h1>
      <div className="md:w-1/3 w-full min-w-[350px] mx-auto rounded-lg bg-white p-8 text-gray-800 mt-20">
        <p className="text-center text-xl font-bold">Login</p>
        <form className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm text-gray-600 mb-2">
              Email
            </label>
            <input
              onChange={handleInput}
              type="text"
              id="email"
              name="email"
              className="w-full rounded-md border border-gray-600 p-3 text-gray-100 outline-none focus:border-blue-400"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm text-gray-600 mb-2 mt-5"
            >
              Password
            </label>
            <input
              onChange={handleInput}
              type="password"
              id="password"
              name="password"
              className="w-full rounded-md border border-gray-600 p-3 text-gray-800 outline-none focus:border-blue-400"
              placeholder="Enter your password"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full rounded-md bg-blue-500 p-3 text-center font-semibold text-gray-900 hover:bg-blue-600"
          >
            Sign in
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?
          <Link
            href="/auth/signup"
            className="font-semibold text-gray-800 hover:underline hover:text-blue-400"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
