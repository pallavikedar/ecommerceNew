"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { BACKEND_BASE } from "@/lib/backend";

const EditProduct = ({ productId, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    pickupLocation: "",
    variants: [],
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch product data to edit
  useEffect(() => {
    const fetchProduct = async () => {
      const token = localStorage.getItem("adminToken");
      try {
        const res = await fetch(`${BACKEND_BASE}/product/${productId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch product data");
        const data = await res.json();

        // ✅ Populate formData
        setFormData({
          name: data.name || "",
          description: data.description || "",
          category: data.category || "",
          pickupLocation: data.pickupLocation || "",
          variants: data.variants?.map((v) => ({
            color: v.color || "",
            price: v.price || "",
            qty: v.qty || "",
            size: v.size || "",
            images: v.images || [], // URLs
          })) || [],
        });
      } catch (err) {
        console.error(err);
        toast.error("❌ Failed to load product details");
      }
    };

    fetchProduct();
  }, [productId]);

  // ✅ Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      const token = localStorage.getItem("adminToken");
      try {
        const res = await fetch(`${BACKEND_BASE}/category/All`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // ✅ Handle input change
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // ✅ Handle variant change
  const handleVariantChange = (index, field, value) => {
    const updated = [...formData.variants];
    updated[index][field] = value;
    setFormData({ ...formData, variants: updated });
  };

  // ✅ Handle image upload
  const handleImageChange = (index, files) => {
    const updated = [...formData.variants];
    const newFiles = Array.from(files);
    updated[index].images = [
      ...updated[index].images.filter((img) => typeof img === "string"), // keep existing URLs
      ...newFiles,
    ];
    setFormData({ ...formData, variants: updated });
  };

  // ✅ Add new variant
  const addVariant = () => {
    setFormData({
      ...formData,
      variants: [
        ...formData.variants,
        { color: "", price: "", qty: "", size: "", images: [] },
      ],
    });
  };

  // ✅ PUT (multipart/form-data)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");
    const formDataToSend = new FormData();

    const productData = {
      name: formData.name,
      description: formData.description,
      category: formData.category,
      pickupLocation: formData.pickupLocation,
      variants: formData.variants.map((v) => ({
        color: v.color,
        price: v.price,
        qty: v.qty,
        size: v.size,
      })),
    };

    formDataToSend.append(
      "product",
      new Blob([JSON.stringify(productData)], { type: "application/json" })
    );

    // ✅ Attach images (both old URLs & new files)
    formData.variants.forEach((variant) => {
      variant.images.forEach((img) => {
        if (typeof img !== "string") {
          formDataToSend.append("images", img);
        }
      });
    });

    try {
      setLoading(true);
      const res = await fetch(`${BACKEND_BASE}/product/update/${productId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (!res.ok) throw new Error("Failed to update product");

      toast.success("✅ Product updated successfully!");
      onUpdate && onUpdate();
      onClose && onClose();
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-4xl overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
          ✏️ Edit Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Product Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-gray-700 font-medium">Product Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-1 border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="text-gray-700 font-medium">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full mt-1 border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.categoryId} value={cat.categoryName}>
                    {cat.categoryName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-gray-700 font-medium">
                Pickup Location
              </label>
              <input
                type="text"
                name="pickupLocation"
                value={formData.pickupLocation}
                onChange={handleChange}
                className="w-full mt-1 border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-gray-700 font-medium">Description</label>
              <textarea
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                className="w-full mt-1 border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500"
              ></textarea>
            </div>
          </div>

          {/* Variants */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Product Variants
              </h3>
              <button
                type="button"
                onClick={addVariant}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
              >
                + Add Variant
              </button>
            </div>

            {formData.variants.map((variant, index) => (
              <div
                key={index}
                className="border border-gray-200 bg-gray-50 rounded-lg p-5 mb-5"
              >
                <h4 className="font-semibold text-gray-700 mb-3">
                  Variant {index + 1}
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <input
                    type="text"
                    placeholder="Color"
                    value={variant.color}
                    onChange={(e) =>
                      handleVariantChange(index, "color", e.target.value)
                    }
                    className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    value={variant.price}
                    onChange={(e) =>
                      handleVariantChange(index, "price", e.target.value)
                    }
                    className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                  <input
                    type="number"
                    placeholder="Quantity"
                    value={variant.qty}
                    onChange={(e) =>
                      handleVariantChange(index, "qty", e.target.value)
                    }
                    className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                  <input
                    type="text"
                    placeholder="Size"
                    value={variant.size}
                    onChange={(e) =>
                      handleVariantChange(index, "size", e.target.value)
                    }
                    className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="mt-4">
                  <label className="text-gray-700 font-medium">
                    Upload Images
                  </label>
                  <input
                    type="file"
                    multiple
                    onChange={(e) => handleImageChange(index, e.target.files)}
                    className="block w-full text-sm mt-1 text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full 
                      file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 
                      file:text-indigo-600 hover:file:bg-indigo-100"
                  />

                  {/* ✅ Show existing + new previews */}
                  {variant.images.length > 0 && (
                    <div className="flex gap-2 flex-wrap mt-3">
                      {variant.images.map((img, i) => (
                        <img
                          key={i}
                          src={
                            typeof img === "string"
                              ? img
                              : URL.createObjectURL(img)
                          }
                          alt="preview"
                          className="w-20 h-20 object-cover rounded-md border"
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="border border-gray-400 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 text-white py-3 px-8 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400"
            >
              {loading ? "Updating..." : "Update Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
