"use client";
import { createContext, useContext, useState } from "react";
import { signUp } from "../apis/auth";
import { login } from "../apis/auth";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const signUpUser = async (email, username, password, isSuperuser) => {
    setLoading(true);
    setError(null);
    try {
      const data = await signUp(email, username, password, isSuperuser);
      sessionStorage.setItem("access_token", data.access_token);
      setUser(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const loginUser = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const data = await login(email, password);
      sessionStorage.setItem("access_token", data.access_token);
      setUser(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ signUpUser, loginUser, loading, error, user, clearError }}
    >
      {children}
    </AuthContext.Provider>
  );
};
