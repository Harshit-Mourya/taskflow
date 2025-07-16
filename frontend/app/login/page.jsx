"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { toast } from "react-hot-toast";
import Loader from "@/components/Loader";

export default function LoginPage() {
  const router = useRouter();
  const { login, loading } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form);
      router.push("/");
    } catch (err) {
      toast.error("Login failed!");
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex items-center justify-center min-h-[92vh] bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className={`bg-gray-800 p-8 rounded-2xl shadow-md w-full max-w-sm ${
          loading ? "opacity-70 pointer-events-none" : ""
        }`}
      >
        <h1 className="text-2xl font-bold mb-6 text-gray-100">Login</h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          disabled={loading}
          className="w-full mb-4 px-3 py-2 border border-gray-700 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          disabled={loading}
          className="w-full mb-6 px-3 py-2 border border-gray-700 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition-colors disabled:bg-purple-500"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
