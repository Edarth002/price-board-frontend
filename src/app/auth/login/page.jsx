"use client";
import React from "react";
import Link from "next/link";

export const LoginForm = () => {
  return (
    <div className="bg-blue-50 w-full h-screen pt-20">
      <div className="md:w-1/3 w-full mx-auto rounded-lg bg-gray-800 p-8 text-gray-100 mt-20">
        <p className="text-center text-xl font-bold">Login</p>
        <form className="mt-6 space-y-4">
          <div>
            <label for="username" className="block text-sm text-gray-400">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full rounded-md border border-gray-600 bg-gray-900 p-3 text-gray-100 outline-none focus:border-blue-400"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label for="password" className="block text-sm text-gray-400">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full rounded-md border border-gray-600 bg-gray-900 p-3 text-gray-100 outline-none focus:border-blue-400"
              placeholder="Enter your password"
            />
            <div className="mt-2 text-right text-xs text-gray-400">
              <a href="#" className="hover:underline hover:text-blue-400">
                Forgot Password?
              </a>
            </div>
          </div>
          <button
            type="submit"
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
