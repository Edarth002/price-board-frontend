"use client";
import React, { useState } from "react";
import Link from "next/link";
import RegisterUser from "./register";

export const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    is_superuser: true,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    if (!formData.username || !formData.email || !formData.password) {
      setError("All fields are required");
    }
    try {
      const data = await RegisterUser(formData);
      setSuccess(
        "Registration Successful, go to Login to use our awesome software"
      );
      setError("");
    } catch (error) {
      setError("error registering user");
      setSuccess("");
    }
  };

  return (
    <div className="bg-blue-50 w-full h-screen pt-20 md:px-auto px-5 ">
      <div className="md:w-1/3 w-full mx-auto  rounded-lg bg-white p-8 text-gray-100 ">
        <p className="text-center text-xl font-bold">Sign Up</p>
        <form className="mt-6 space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm text-gray-600">
              Username
            </label>
            <input
              onChange={handleChange}
              type="text"
              id="username"
              name="username"
              className="w-full rounded-md border border-gray-600 bg-gray-900 p-3 text-gray-800 outline-none focus:border-blue-400"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm text-gray-400">
              Email
            </label>
            <input
              onChange={handleChange}
              type="email"
              id="email"
              name="email"
              className="w-full rounded-md border border-gray-600 bg-gray-900 p-3 text-gray-800 outline-none focus:border-blue-400"
              placeholder="Enter your Email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm text-gray-600">
              Password
            </label>
            <input
              onChange={handleChange}
              type="password"
              id="password"
              name="password"
              className="w-full rounded-md border border-gray-600 bg-gray-900 p-3 text-gray-800 outline-none focus:border-blue-400"
              placeholder="Enter your password"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}
          <button
            type="submit"
            className="w-full rounded-md bg-blue-500 p-3 text-center font-semibold text-gray-900 hover:bg-blue-600"
            onClick={handleSubmit}
          >
            Sign up
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?
          <Link
            href="/auth/login"
            className="font-semibold text-gray-800 hover:underline hover:text-blue-400"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
