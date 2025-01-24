"use client";
import React, { useState } from "react";
import Link from "next/link";
import LoginUser from "./loginuser";
import { useRouter } from "next/navigation";

export const LoginForm = () => {
  //LoginForm is name of component and loginForm with camel Notation is name of object that is submitted
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

      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="bg-blue-50 w-full h-screen pt-20 md:px-0 px-5">
      <div className="md:w-1/3 w-full mx-auto rounded-lg bg-white p-8 text-gray-800 mt-20">
        <p className="text-center text-xl font-bold">Login</p>
        <form className="mt-6 space-y-4">
          <div>
            <label for="email" className="block text-sm text-gray-600">
              Email
            </label>
            <input
              onChange={handleInput}
              type="text"
              id="email"
              name="email"
              className="w-full rounded-md border border-gray-600  p-3 text-gray-100 outline-none focus:border-blue-400"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label for="password" className="block text-sm text-gray-600">
              Password
            </label>
            <input
              onChange={handleInput}
              type="password"
              id="password"
              name="password"
              className="w-full rounded-md border border-gray-600 bg-gray-900 p-3 text-gray-800 outline-none focus:border-blue-400"
              placeholder="Enter your password"
            />
            <div className="mt-2 text-right text-xs text-gray-600">
              <a href="#" className="hover:underline hover:text-blue-400">
                Forgot Password?
              </a>
            </div>
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
        <p className="mt-6 text-center text-sm text-gray-400">
          Don't have an account?
          <Link
            href="/auth/signup"
            className="font-semibold text-gray-100 hover:underline hover:text-blue-400"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
