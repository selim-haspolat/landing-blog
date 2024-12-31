"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import instance from "@/helper/axios-intance";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await instance.post("/auth/login", {
        userName,
        password,
      });

      toast.success("Login successful", {
        position: "top-right",
      });

      router.push("/admin/create-blog");

    } catch (err) {
      const errMsg = err.message;
      toast.error(errMsg, {
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="userName"
            >
              User Name
            </label>
            <input
              type="text"
              id="userName"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="example@example.com"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full bg-blue-600 text-white font-bold py-2 rounded-md hover:bg-blue-700 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
