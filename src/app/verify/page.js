'use client';
import {useRouter} from "next/navigation";
import { useState } from "react";

export default function EmailVerification() {
  const router = useRouter();
  const [code, setCode] = useState(Array(8).fill(""));

  const handleChange = (value, index) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Move to the next input field automatically
    if (value && index < 7) {
      document.getElementById(`code-${index + 1}`).focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(code.join("") === "12345678")
    {
      console.log("Verification code submitted:", code.join(""));
      
      router.push("/login");
      
    }
      
    
    else
      console.log("Verification code is incorrect");
    // Add your verification API call here
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center ">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Verify your email</h2>
        <p className="text-gray-600 ">
          Enter the 8-digit code you have received on <strong>sw***@gmail.com</strong>
        </p>
        <p className="text-gray-600 mb-6 text-sm"> Code hint (not 12345678) </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex space-x-1">
            {code.map((digit, index) => (
              <input
                key={index}
                id={`code-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                className="w-12 h-12 text-center text-xl border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-green-700"
              />
            ))}
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition"
          >
            VERIFY
          </button>
        </form>
      </div>
    </div>
  );
}
