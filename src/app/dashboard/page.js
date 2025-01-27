'use client';
import React, { useState, useEffect } from "react";
import { Interests } from "../../../constant";
import Cookies from "js-cookie";
import ProtectedRoute from "../protectedRoute";
import { useRouter } from "next/navigation";
const InterestsPage = () => {
  const router = useRouter();
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const userId = Cookies.get("userId");
  const totalPages = Math.ceil(Interests.length / itemsPerPage);

  const paginatedInterests = Interests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    const fetchPreferences = async () => {
      const userId = Cookies.get("userId");
      if (!userId) {
        console.error("User ID not found ");
        return;
      }
      try {
        const response = await fetch(`/api/auth/preferences?id=${userId}`, {
          method: "GET",
          
        });
        if (response.ok) {
          const data = await response.json();
          setSelectedInterests(data.preferences || []);
        }
      } catch (error) {
        console.error("Error fetching preferences:", error);
      }
    };

    fetchPreferences();
  }, []);

  const handleCheckboxChange = (interest) => {
    setSelectedInterests((prev) => {
      if (prev.includes(interest)) {
        return prev.filter((item) => item !== interest);
      } else {
        return [...prev, interest];
      }
    });
  };

  const handlelogout = () => {
    Cookies.remove("userId");
    router.push("/login");
  }
  const savePreferences = async () => {
    if (!userId) {
      console.error("User ID not found");
      return;
    }
    try {
      const response = await fetch("/api/auth/preferences", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id:userId, preferences: selectedInterests }),
      });
      if (response.ok) {
        alert("Preferences saved successfully!");
      } else {
        alert("Failed to save preferences.");
      }
    } catch (error) {
      console.error("Error saving preferences:", error);
      alert("An error occurred while saving preferences.");
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <ProtectedRoute>  
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-2xl p-6 w-96">
        <h2 className="text-xl font-semibold text-center mb-2 text-gray-600">
          Please mark your interests!
        </h2>
        <p className="text-sm text-center mb-4 text-gray-600">
          We will keep you notified.
        </p>
        <div className="mb-6">
          <h3 className="text-base font-medium mb-2 text-gray-600">
            My saved interests!
          </h3>
          <div className="space-y-2">
            {paginatedInterests.map((interest) => (
              <label
                key={interest.value}
                className="flex items-center space-x-2 text-gray-700"
              >
                <input
                  type="checkbox"
                  checked={selectedInterests.includes(interest.label)}
                  onChange={() => handleCheckboxChange(interest.label)}
                  className="form-checkbox h-4 w-4 text-black rounded"
                />
                <span>{interest.label}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
        <button
          onClick={savePreferences}
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800"
        >
          Save Preferences
        </button>
        <button
          onClick={handlelogout}
          className="w-full bg-black text-white py-2 mt-4 rounded-lg hover:bg-gray-800"
        >
         Logout
        </button>
      </div>
    </div>
    </ProtectedRoute>
  );
};

export default InterestsPage;
