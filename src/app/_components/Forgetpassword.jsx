"use client";
import { useState } from "react";
import Link from "next/link";
export default function ForgetPassword() {
  const [error, setError] = useState("");
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent form reload

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/resetpassword`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const res = await response.json();

      if (!response.ok) {
        setError(res.message || "Something went wrong");
      } else {
        alert("Password reset successful!");
        setError("");
      }
    } catch (e) {
      console.error(e.message);
      setError(e.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-cyan-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-blue-100 rounded p-8 w-full max-w-md flex flex-col items-center"
      >
        <div className="w-full mb-4">
          <label className="block text-xl">Email</label>
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            className="mt-1 w-full p-2 border border-black rounded"
            onChange={handleChange}
            required
          />
        </div>

        <div className="w-full mb-6">
          <label className="block text-xl">New Password</label>
          <input
            name="password"
            type="password"
            placeholder="New password"
            className="mt-1 w-full p-2 border border-black rounded"
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
        <Link href="/" className="text-blue-600 underline mt-3">
          Home page
        </Link>

        {error && (
          <p className="text-red-600 mt-4 font-medium text-sm">{error}</p>
        )}
      </form>
    </div>
  );
}
