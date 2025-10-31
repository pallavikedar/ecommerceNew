// "use client";
// import { useState } from "react";
// import { BACKEND_BASE } from "@/lib/backend";

// export default function AddProductForm() {
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     category: "",
//     pickupLocation: "",
//     variants: [
//       {
//         color: "",
//         price: 0,
//         qty: 0,
//         size: "",
//         images: [""],
//       },
//     ],
//   });

//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState({ type: "", text: "" });

//   // Generic field handler
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Variant field handler
//   const handleVariantChange = (index, e) => {
//     const { name, value } = e.target;
//     const updatedVariants = [...formData.variants];
//     updatedVariants[index][name] =
//       name === "price" || name === "qty" ? Number(value) : value;
//     setFormData({ ...formData, variants: updatedVariants });
//   };

//   // Handle image input for each variant
//   const handleImageChange = (variantIndex, imageIndex, value) => {
//     const updatedVariants = [...formData.variants];
//     updatedVariants[variantIndex].images[imageIndex] = value;
//     setFormData({ ...formData, variants: updatedVariants });
//   };

//   // Add/remove variants
//   const addVariant = () => {
//     setFormData({
//       ...formData,
//       variants: [
//         ...formData.variants,
//         { color: "", price: 0, qty: 0, size: "", images: [""] },
//       ],
//     });
//   };

//   const removeVariant = (index) => {
//     const updated = formData.variants.filter((_, i) => i !== index);
//     setFormData({ ...formData, variants: updated });
//   };

//   // Add image URL field
//   const addImageField = (variantIndex) => {
//     const updatedVariants = [...formData.variants];
//     updatedVariants[variantIndex].images.push("");
//     setFormData({ ...formData, variants: updatedVariants });
//   };

//   // Submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage({ type: "", text: "" });

//     try {
//       const res = await fetch(`${BACKEND_BASE}/api/product/add`, {
//         method: "POST",
//         headers: { "Content-Type": "multipart/form-data" },
//         body: JSON.stringify(formData),
//       });

//       if (res.ok) {
//         setMessage({ type: "success", text: "✅ Product added successfully!" });
//         setFormData({
//           name: "",
//           description: "",
//           category: "",
//           pickupLocation: "",
//           variants: [{ color: "", price: 0, qty: 0, size: "", images: [""] }],
//         });
//       } else {
//         setMessage({ type: "error", text: "❌ Failed to add product." });
//       }
//     } catch {
//       setMessage({ type: "error", text: "⚠️ Something went wrong." });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex justify-center py-10 px-4">
//       <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl p-8">
//         <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
//           🛒 Add New Product
//         </h1>

//         <form onSubmit={handleSubmit} className="space-y-8">
//           {/* Product Info */}
//           <div className="grid md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Product Name
//               </label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 placeholder="Enter product name"
//                 className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Category
//               </label>
//               <input
//                 type="text"
//                 name="category"
//                 value={formData.category}
//                 onChange={handleChange}
//                 placeholder="Enter product category"
//                 className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Pickup Location
//               </label>
//               <input
//                 type="text"
//                 name="pickupLocation"
//                 value={formData.pickupLocation}
//                 onChange={handleChange}
//                 placeholder="Enter pickup location"
//                 className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none"
//               />
//             </div>

//             <div className="md:col-span-2">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Description
//               </label>
//               <input
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 placeholder="Write product description..."
//                 rows={3}
//                 className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none"
//               />
//             </div>
//           </div>

//           {/* Variants */}
//           <div>
//             <h2 className="text-xl font-semibold text-gray-800 mb-4">
//               Product Variants
//             </h2>

//             {formData.variants.map((variant, vIndex) => (
//               <div
//                 key={vIndex}
//                 className="border border-gray-200 rounded-xl p-6 mb-6 bg-gray-50 shadow-sm transition hover:shadow-md"
//               >
//                 <div className="flex justify-between items-center mb-4">
//                   <h3 className="font-semibold text-gray-700">
//                     Variant {vIndex + 1}
//                   </h3>
//                   {formData.variants.length > 1 && (
//                     <button
//                       type="button"
//                       onClick={() => removeVariant(vIndex)}
//                       className="text-red-600 hover:text-red-800 text-sm font-medium"
//                     >
//                       Remove
//                     </button>
//                   )}
//                 </div>

//                 <div className="grid md:grid-cols-4 gap-4">
//                   <input
//                     type="text"
//                     name="color"
//                     value={variant.color}
//                     onChange={(e) => handleVariantChange(vIndex, e)}
//                     placeholder="Color"
//                     className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
//                   />
//                   <input
//                     type="number"
//                     name="price"
//                     value={variant.price}
//                     onChange={(e) => handleVariantChange(vIndex, e)}
//                     placeholder="Price"
//                     className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
//                   />
//                   <input
//                     type="number"
//                     name="qty"
//                     value={variant.qty}
//                     onChange={(e) => handleVariantChange(vIndex, e)}
//                     placeholder="Quantity"
//                     className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
//                   />
//                   <input
//                     type="text"
//                     name="size"
//                     value={variant.size}
//                     onChange={(e) => handleVariantChange(vIndex, e)}
//                     placeholder="Size"
//                     className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
//                   />
//                 </div>

//                 {/* Images */}
//                 <div className="mt-4">
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Images (URLs)
//                   </label>
//                   {variant.images.map((img, iIndex) => (
//                     <input
//                       key={iIndex}
//                       type="file"
//                       value={img}
//                       onChange={(e) =>
//                         handleImageChange(vIndex, iIndex, e.target.value)
//                       }
//                       placeholder="Enter image URL"
//                       className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-2 focus:ring-2 focus:ring-indigo-500 outline-none"
//                     />
//                   ))}
//                   <button
//                     type="button"
//                     onClick={() => addImageField(vIndex)}
//                     className="text-indigo-600 text-sm font-medium mt-1 hover:underline"
//                   >
//                     + Add Another Image
//                   </button>
//                 </div>
//               </div>
//             ))}

//             <button
//               type="button"
//               onClick={addVariant}
//               className="mt-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg hover:bg-indigo-200 transition"
//             >
//               + Add Variant
//             </button>
//           </div>

//           {/* Message */}
//           {message.text && (
//             <div
//               className={`p-3 rounded-lg text-sm text-center ${
//                 message.type === "success"
//                   ? "bg-green-100 text-green-700"
//                   : "bg-red-100 text-red-700"
//               }`}
//             >
//               {message.text}
//             </div>
//           )}

//           {/* Submit */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
//           >
//             {loading ? "Adding Product..." : "Add Product"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }





// "use client";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { BACKEND_BASE } from "@/lib/backend";

// export default function AddProductForm() {
//   const router = useRouter();

//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     category: "",
//     pickupLocation: "",
//     variants: [
//       {
//         color: "",
//         price: "",
//         qty: "",
//         size: "",
//         images: [],
//       },
//     ],
//   });

//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   // --- Fetch categories from API ---
//    useEffect(() => {
//     const fetchCategories = async () => {
//       const token = localStorage.getItem("adminToken"); // ✅ Get admin token

//       try {
//         const res = await fetch(`${BACKEND_BASE}/category/All`, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`, // ✅ Add Authorization header
//           },
//         });

//         if (!res.ok) throw new Error("Failed to fetch categories");

//         const data = await res.json();
//         setCategories(data);
//       } catch (err) {
//         console.error("Error fetching categories:", err);
//       }
//     };

//     fetchCategories();
//   }, []);

//   // --- handle top-level input ---
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // --- handle variant fields ---
//   const handleVariantChange = (index, e) => {
//     const updated = [...formData.variants];
//     updated[index][e.target.name] = e.target.value;
//     setFormData({ ...formData, variants: updated });
//   };

//   // --- Convert file to base64 ---
//   const fileToBase64 = (file) =>
//     new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => resolve(reader.result);
//       reader.onerror = (error) => reject(error);
//     });

//   // --- handle image upload ---
//   const handleImageChange = async (index, files) => {
//     const updated = [...formData.variants];
//     const fileArray = Array.from(files);
//     const base64Images = await Promise.all(fileArray.map(fileToBase64));
//     updated[index].images = base64Images;
//     setFormData({ ...formData, variants: updated });
//   };

//   // --- add/remove variant ---
//   const addVariant = () => {
//     setFormData({
//       ...formData,
//       variants: [
//         ...formData.variants,
//         { color: "", price: "", qty: "", size: "", images: [] },
//       ],
//     });
//   };

//   const removeVariant = (index) => {
//     const updated = formData.variants.filter((_, i) => i !== index);
//     setFormData({ ...formData, variants: updated });
//   };

//   // --- submit form ---
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     try {
//       const token = localStorage.getItem("adminToken"); // ✅ attach auth token

//       const res = await fetch(`${BACKEND_BASE}/product/add`, {
//         method: "POST",
        
//         body: JSON.stringify(formData),
//       });

//       if (!res.ok) throw new Error("Failed to add product");
//       setMessage("✅ Product added successfully!");

//       setFormData({
//         name: "",
//         description: "",
//         category: "",
//         pickupLocation: "",
//         variants: [{ color: "", price: "", qty: "", size: "", images: [] }],
//       });
//     } catch (err) {
//       console.error(err);
//       setMessage("❌ Error adding product. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8 mt-10">
//       <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
//         Add New Product
//       </h2>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Basic Product Info */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="text-gray-700 font-medium">Product Name</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//               className="w-full mt-1 border rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500"
//               placeholder="Enter product name"
//             />
//           </div>

//           {/* Category Dropdown + Add Button */}
//           <div>
//             <label className="text-gray-700 font-medium flex items-center justify-between">
//               Category
//               <button
//                 type="button"
//                 onClick={() => router.push("/admin/categary")}
//                 className="text-indigo-600 hover:text-indigo-800 font-bold text-xl"
//                 title="Add New Category"
//               >
//                 +
//               </button>
//             </label>

//             <select
//               name="category"
//               value={formData.category}
//               onChange={handleChange}
//               required
//               className="w-full mt-1 border rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 bg-white"
//             >
//               <option value="">Select a category</option>
//               {categories.map((cat) => (
//                 <option key={cat.categoryId} value={cat.categoryName}>
//                   {cat.categoryName}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="text-gray-700 font-medium">Pickup Location</label>
//             <input
//               type="text"
//               name="pickupLocation"
//               value={formData.pickupLocation}
//               onChange={handleChange}
//               className="w-full mt-1 border rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500"
//               placeholder="Enter pickup location"
//             />
//           </div>

//           <div>
//             <label className="text-gray-700 font-medium">Description</label>
//             <input
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               rows="3"
//               className="w-full mt-1 border rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500"
//               placeholder="Enter product description"
//             ></input>
//           </div>
//         </div>

//         {/* Variants */}
//         <div className="mt-6">
//           <h3 className="text-lg font-semibold text-gray-800 mb-3">Variants</h3>

//           {formData.variants.map((variant, index) => (
//             <div
//               key={index}
//               className="border border-gray-300 rounded-lg p-5 mb-5 bg-gray-50"
//             >
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <input
//                   type="text"
//                   name="color"
//                   value={variant.color}
//                   onChange={(e) => handleVariantChange(index, e)}
//                   placeholder="Color"
//                   className="border p-2.5 rounded-lg focus:ring-2 focus:ring-indigo-500"
//                 />
//                 <input
//                   type="number"
//                   name="price"
//                   value={variant.price}
//                   onChange={(e) => handleVariantChange(index, e)}
//                   placeholder="Price"
//                   className="border p-2.5 rounded-lg focus:ring-2 focus:ring-indigo-500"
//                 />
//                 <input
//                   type="number"
//                   name="qty"
//                   value={variant.qty}
//                   onChange={(e) => handleVariantChange(index, e)}
//                   placeholder="Quantity"
//                   className="border p-2.5 rounded-lg focus:ring-2 focus:ring-indigo-500"
//                 />
//                 <input
//                   type="text"
//                   name="size"
//                   value={variant.size}
//                   onChange={(e) => handleVariantChange(index, e)}
//                   placeholder="Size"
//                   className="border p-2.5 rounded-lg focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>

//               <div className="mt-3">
//                 <label className="text-gray-700 font-medium block mb-1">
//                   Upload Images
//                 </label>
//                 <input
//                   type="file"
//                   multiple
//                   accept="image/*"
//                   onChange={(e) => handleImageChange(index, e.target.files)}
//                   className="block w-full text-sm text-gray-600
//                              file:mr-4 file:py-2 file:px-4
//                              file:rounded-full file:border-0
//                              file:text-sm file:font-semibold
//                              file:bg-indigo-50 file:text-indigo-600
//                              hover:file:bg-indigo-100"
//                 />
//               </div>

//               {formData.variants.length > 1 && (
//                 <button
//                   type="button"
//                   onClick={() => removeVariant(index)}
//                   className="text-red-600 mt-3 text-sm hover:underline"
//                 >
//                   Remove Variant
//                 </button>
//               )}
//             </div>
//           ))}

//           <button
//             type="button"
//             onClick={addVariant}
//             className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg mt-2"
//           >
//             + Add Variant
//           </button>
//         </div>

//         <div className="flex justify-end mt-6">
//           <button
//             type="submit"
//             disabled={loading}
//             className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400"
//           >
//             {loading ? "Submitting..." : "Add Product"}
//           </button>
//         </div>

//         {message && (
//           <p
//             className={`text-center mt-4 ${
//               message.includes("✅") ? "text-green-600" : "text-red-600"
//             }`}
//           >
//             {message}
//           </p>
//         )}
//       </form>
//     </div>
//   );
// }












"use client";
import React, { useState,useEffect } from "react";
import { toast } from "react-toastify";
import { BACKEND_BASE } from "@/lib/backend";
import { useRouter } from "next/navigation";

const AddProduct = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    pickupLocation: "",
    variants: [
      {
        color: "",
        price: "",
        qty: "",
        size: "",
        images: [],
      },
    ],
  });

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
   useEffect(() => {
    const fetchCategories = async () => {
      const token = localStorage.getItem("adminToken"); // ✅ Get admin token

      try {
        const res = await fetch(`${BACKEND_BASE}/category/All`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // ✅ Add Authorization header
          },
        });

        if (!res.ok) throw new Error("Failed to fetch categories");

        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);
   const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle variant change
  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...formData.variants];
    updatedVariants[index][field] = value;
    setFormData({ ...formData, variants: updatedVariants });
  };

  // ✅ Handle image upload
  const handleImageChange = (index, files) => {
    const updatedVariants = [...formData.variants];
    updatedVariants[index].images = Array.from(files);
    setFormData({ ...formData, variants: updatedVariants });
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

  // ✅ Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

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

    formData.variants.forEach((variant) => {
      variant.images.forEach((file) => {
        formDataToSend.append("images", file);
      });
    });

    const token = localStorage.getItem("adminToken");

    try {
      setLoading(true);

      const res = await fetch(`${BACKEND_BASE}/product/add`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (!res.ok) {
        throw new Error("Failed to add product");
      }

      const data = await res.json();
      toast.success("✅ Product added successfully!");
      console.log("Response:", data);

      setFormData({
        name: "",
        description: "",
        category: "",
        pickupLocation: "",
        variants: [
          { color: "", price: "", qty: "", size: "", images: [] },
        ],
      });
    } catch (err) {
      console.error("Error adding product:", err);
      toast.error("❌ Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl p-8 mt-10 border border-gray-100">
      <h2 className="text-3xl font-semibold text-gray-800 mb-8 border-b pb-3">
        🛒 Add New Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Product Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-gray-700 font-medium">Product Name</label>
            <input
              type="text"
              placeholder="Enter product name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full mt-1 border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
             <label className="text-gray-700 font-medium flex items-center justify-between">
               Category
               <button
                type="button"
                onClick={() => router.push("/admin/categary")}
                className="text-indigo-600 hover:text-indigo-800 font-bold text-xl"
                title="Add New Category"
              >
                +
              </button>
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full mt-1 border rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 bg-white"
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
            <label className="text-gray-700 font-medium">Pickup Location</label>
            <input
              type="text"
              placeholder="Enter pickup location"
              value={formData.pickupLocation}
              onChange={(e) =>
                setFormData({ ...formData, pickupLocation: e.target.value })
              }
              className="w-full mt-1 border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-gray-700 font-medium">Description</label>
            <textarea
              placeholder="Enter product description..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={4}
              className="w-full mt-1 border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500"
              required
            ></textarea>
          </div>
        </div>

        {/* Variants Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">
              Product Variants
            </h3>
            <button
              type="button"
              onClick={addVariant}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              + Add Variant
            </button>
          </div>

          {formData.variants.map((variant, index) => (
            <div
              key={index}
              className="border border-gray-300 bg-gray-50 rounded-lg p-5 mb-5"
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
                  required
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={variant.price}
                  onChange={(e) =>
                    handleVariantChange(index, "price", e.target.value)
                  }
                  className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  required
                />
                <input
                  type="number"
                  placeholder="Quantity"
                  value={variant.qty}
                  onChange={(e) =>
                    handleVariantChange(index, "qty", e.target.value)
                  }
                  className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  required
                />
                <input
                  type="text"
                  placeholder="Size"
                  value={variant.size}
                  onChange={(e) =>
                    handleVariantChange(index, "size", e.target.value)
                  }
                  className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div className="mt-4">
                <label className="text-gray-700 font-medium block mb-1">
                  Upload Images
                </label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => handleImageChange(index, e.target.files)}
                  className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full 
                            file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 
                            file:text-indigo-600 hover:file:bg-indigo-100"
                  required
                />

                {variant.images.length > 0 && (
                  <div className="flex gap-2 flex-wrap mt-3">
                    {variant.images.map((img, i) => (
                      <img
                        key={i}
                        src={URL.createObjectURL(img)}
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

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 text-white py-3 px-8 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 transition"
          >
            {loading ? "Uploading..." : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
