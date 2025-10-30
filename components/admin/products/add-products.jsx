"use client";
import { useState } from "react";
import { BACKEND_BASE } from "@/lib/backend";

export default function AddProductForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    pickupLocation: "",
    variants: [
      {
        color: "",
        price: 0,
        qty: 0,
        size: "",
        images: [""],
      },
    ],
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Generic field handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Variant field handler
  const handleVariantChange = (index, e) => {
    const { name, value } = e.target;
    const updatedVariants = [...formData.variants];
    updatedVariants[index][name] =
      name === "price" || name === "qty" ? Number(value) : value;
    setFormData({ ...formData, variants: updatedVariants });
  };

  // Handle image input for each variant
  const handleImageChange = (variantIndex, imageIndex, value) => {
    const updatedVariants = [...formData.variants];
    updatedVariants[variantIndex].images[imageIndex] = value;
    setFormData({ ...formData, variants: updatedVariants });
  };

  // Add/remove variants
  const addVariant = () => {
    setFormData({
      ...formData,
      variants: [
        ...formData.variants,
        { color: "", price: 0, qty: 0, size: "", images: [""] },
      ],
    });
  };

  const removeVariant = (index) => {
    const updated = formData.variants.filter((_, i) => i !== index);
    setFormData({ ...formData, variants: updated });
  };

  // Add image URL field
  const addImageField = (variantIndex) => {
    const updatedVariants = [...formData.variants];
    updatedVariants[variantIndex].images.push("");
    setFormData({ ...formData, variants: updatedVariants });
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      token =localStorage.getItem("adminToken")
      const res = await fetch(`${ BACKEND_BASE}/product/add`, {
        method: "POST",
        headers: {
           "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
          },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setMessage({ type: "success", text: "✅ Product added successfully!" });
        setFormData({
          name: "",
          description: "",
          category: "",
          pickupLocation: "",
          variants: [{ color: "", price: 0, qty: 0, size: "", images: [""] }],
        });
      } else {
        setMessage({ type: "error", text: "❌ Failed to add product." });
      }
    } catch {
      setMessage({ type: "error", text: "⚠️ Something went wrong." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-10 px-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          🛒 Add New Product
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Product Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter product name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Enter product category"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pickup Location
              </label>
              <input
                type="text"
                name="pickupLocation"
                value={formData.pickupLocation}
                onChange={handleChange}
                placeholder="Enter pickup location"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write product description..."
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>

          {/* Variants */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Product Variants
            </h2>

            {formData.variants.map((variant, vIndex) => (
              <div
                key={vIndex}
                className="border border-gray-200 rounded-xl p-6 mb-6 bg-gray-50 shadow-sm transition hover:shadow-md"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-gray-700">
                    Variant {vIndex + 1}
                  </h3>
                  {formData.variants.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeVariant(vIndex)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="grid md:grid-cols-4 gap-4">
                  <input
                    type="text"
                    name="color"
                    value={variant.color}
                    onChange={(e) => handleVariantChange(vIndex, e)}
                    placeholder="Color"
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  <input
                    type="number"
                    name="price"
                    value={variant.price}
                    onChange={(e) => handleVariantChange(vIndex, e)}
                    placeholder="Price"
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  <input
                    type="number"
                    name="qty"
                    value={variant.qty}
                    onChange={(e) => handleVariantChange(vIndex, e)}
                    placeholder="Quantity"
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  <input
                    type="text"
                    name="size"
                    value={variant.size}
                    onChange={(e) => handleVariantChange(vIndex, e)}
                    placeholder="Size"
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>

                {/* Images */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Images (URLs)
                  </label>
                  {variant.images.map((img, iIndex) => (
                    <input
                      key={iIndex}
                      type="text"
                      value={img}
                      onChange={(e) =>
                        handleImageChange(vIndex, iIndex, e.target.value)
                      }
                      placeholder="Enter image URL"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  ))}
                  <button
                    type="button"
                    onClick={() => addImageField(vIndex)}
                    className="text-indigo-600 text-sm font-medium mt-1 hover:underline"
                  >
                    + Add Another Image
                  </button>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addVariant}
              className="mt-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg hover:bg-indigo-200 transition"
            >
              + Add Variant
            </button>
          </div>

          {/* Message */}
          {message.text && (
            <div
              className={`p-3 rounded-lg text-sm text-center ${
                message.type === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message.text}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
          >
            {loading ? "Adding Product..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
}
