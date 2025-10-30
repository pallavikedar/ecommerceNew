import React, { useState } from "react";
import { BACKEND_BASE } from "@/lib/backend";

const AddCategoryForm = () => {
  const [formData, setFormData] = useState({
   
    categoryName: "",
  });

  const [loading, setLoading] = useState(false);

  const Token = localStorage.getItem("adminToken");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!Token) {
      alert("Unauthorized! Please log in as Admin.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${BACKEND_BASE}/category/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Token}`, // ✅ Auth header
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data)
      if (res.ok) {
        alert("✅ Category added successfully!");
        console.log("Response:", data);
        setFormData({  categoryName: "" });
      } else {
        console.error("Error Response:", data);
        alert(data.message || "❌ Failed to add category.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-indigo-100 px-4">
      <div className="bg-white w-full max-w-md shadow-xl rounded-2xl p-8 border border-gray-100">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-1">
          Add New Category 🗂️
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Fill in the details below to create a new category.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* <div>
            <label className="block text-gray-600 mb-1">Category ID</label>
            <input
              type="number"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="Enter category ID"
            />
          </div> */}

          <div>
            <label className="block text-gray-600 mb-1">Category Name</label>
            <input
              type="text"
              name="categoryName"
              value={formData.categoryName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="Enter category name"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg font-medium text-white shadow-md transition-all duration-200 ${
              loading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Adding..." : "Add Category"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryForm;
