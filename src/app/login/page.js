'use client'
import { useState } from "react";
import Header from "@/components/Header";
import Offers from "@/components/Offers";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
export default function Register() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) {
        const errorData = await response.json();
        setError("Check your email and password");
        throw new Error(errorData.message || "Login failed");
        
      }
      Cookies.set("userId", data.user.id, { expires: 7 });
      router.push("/dashboard");
    } catch (error) {
      setError(error.message);
    } finally {
      console.log("Form");
    }

  };

  return (
    <>
    <Header />
    <Offers />
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">Login</h1>
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Welcome back to ECOMMERCE</h2>
        <h5 className="text-sm font-bold text-center mb-4 text-gray-800">The next gen business marketplace</h5>
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
         
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 ">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black text-gray-950"
              placeholder="Enter"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black text-gray-950"
              placeholder="Enter"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't Have an Account?{" "}
          <a href="/" className="text-black font-medium hover:underline">
            Signup
          </a>
        </p>
      </div>
    </div>
    </>
  );
}
