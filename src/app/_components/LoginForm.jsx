"use client";
import React, { useState } from "react";

import { useRouter } from "next/navigation";
import { EyeOff, Eye } from "lucide-react";
import Link from "next/link";
import Forgetpassword from "./Forgetpassword";
export default function LoginForm() {
  const [forgetPassword, setForgetPassword] = useState(false);
  const [showpassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(loginForm),
          credentials: "include", // Add if using cookies
        }
      );

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Failed fetching data");
      }
      router.push("/admin");
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };
  if (forgetPassword) {
    return <Forgetpassword />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">LOGIN FORM</h1>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Email:</label>
          <input
            type="email"
            name="email"
            value={loginForm.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-6 relative">
          <label className="block mb-1 font-medium">Password:</label>
          <input
            type={showpassword ? "text" : "password"}
            name="password"
            value={loginForm.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
            placeholder="Enter your password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showpassword)}
            className="absolute right-3 top-9 text-blue-600 cursor-pointer hover:text-gray-800"
            tabIndex={-1}
          >
            {showpassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {error && <p className="mb-4 text-red-600 font-medium">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-md cursor-pointer text-white transition duration-200 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Logging in..." : "LOGIN"}
        </button>
        <div className="flex justify-between">
          <button
            onClick={() => setForgetPassword(!forgetPassword)}
            className="mt-4 text-md text-blue-600 cursor-pointer"
          >
            Forget Password
          </button>
          <Link href="/" className="text-blue-600 underline mt-4">
            Home page
          </Link>
        </div>
      </form>
    </div>
  );
}
