"use client";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "@/lib/axiosInstance";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await axios.get("/auth/me");
      setUser(res.data);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const register = async (form) => {
    try {
      const res = await axios.post("/auth/register", form);
      localStorage.setItem("token", res.data.token);
      await fetchUser();
      toast.success("Registered & logged in!");
    } catch (err) {
      toast.error(err?.response?.data?.error || "Registration failed");
    }
  };

  const login = async (form) => {
    try {
      const res = await axios.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      await fetchUser();
      toast.success("Login successful!");
    } catch (err) {
      toast.error(err?.response?.data?.error || "Login failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    toast.success("Logged out!");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
