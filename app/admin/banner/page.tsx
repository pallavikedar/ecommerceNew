// "use client";
// import React, { useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import { useRouter } from "next/navigation";
// import { BACKEND_BASE } from "@/lib/backend";

// const AddBanner: React.FC = () => {
//   const router = useRouter();

//   const [formData, setFormData] = useState({
//     name: "",
//     category: "",
//     discount: "",
//     image: null as File | null,
//   });

//   const [loading, setLoading] = useState(false);
//   const [categories, setCategories] = useState<
//     { categoryId: string; categoryName: string }[]
//   >([]);

//   // ✅ Fetch categories only once
//   useEffect(() => {
//     const fetchCategories = async () => {
//       const token = localStorage.getItem("adminToken");
//       try {
//         const res = await fetch(`${BACKEND_BASE}/category/All`, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!res.ok) throw new Error("Failed to fetch categories");

//         const data = await res.json();
//         setCategories(data);
//       } catch (err) {
//         console.error("Error fetching categories:", err);
//         toast.error("Failed to load categories");
//       }
//     };

//     fetchCategories();
//   }, []);

//   // ✅ Handles both <input> and <select> fields correctly
//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // ✅ Image upload
//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setFormData((prev) => ({ ...prev, image: e.target.files![0] }));
//     }
//   };

//   // ✅ Submit handler
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!formData.image) {
//       toast.error("Please select an image!");
//       return;
//     }

//     const formDataToSend = new FormData();
//     formDataToSend.append("name", formData.name);
//     formDataToSend.append("category", formData.category);
//     formDataToSend.append("discount", formData.discount);
//     formDataToSend.append("image", formData.image);

//     const token = localStorage.getItem("adminToken");

//     try {
//       setLoading(true);
//       const response = await fetch(`${BACKEND_BASE}/banner/addBanner`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         body: formDataToSend,
//       });

//       if (!response.ok) throw new Error("Failed to add banner");

//       const data = await response.json();
//       toast.success("✅ Banner added successfully!");
//       console.log("Response:", data);

//       // ✅ Reset form
//       setFormData({
//         name: "",
//         category: "",
//         discount: "",
//         image: null,
//       });
//     } catch (error) {
//       console.error("❌ Error adding banner:", error);
//       toast.error("Failed to add banner. Please check authentication.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 mt-10">
//       <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
//         🛒 Add Banner
//       </h2>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Banner Name */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Banner Name
//           </label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//             className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             placeholder="Enter banner name"
//           />
//         </div>

//         {/* Category */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 flex justify-between items-center">
//             Category
//             <button
//               type="button"
//               onClick={() => router.push("/admin/categary")}
//               className="text-indigo-600 hover:text-indigo-800 font-bold text-lg"
//               title="Add New Category"
//             >
//               +
//             </button>
//           </label>
//           <select
//             name="category"
//             value={formData.category}
//             onChange={handleChange}
//             required
//             className="w-full mt-1 border rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 bg-white"
//           >
//             <option value="">Select a category</option>
//             {categories.map((cat) => (
//               <option key={cat.categoryId} value={cat.categoryId}>
//                 {cat.categoryName}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Discount */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Discount (%)
//           </label>
//           <input
//             type="number"
//             name="discount"
//             value={formData.discount}
//             onChange={handleChange}
//             required
//             className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             placeholder="Enter discount"
//           />
//         </div>

//         {/* Image Upload */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Banner Image
//           </label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageChange}
//             required
//             className="mt-2 block w-full text-sm text-gray-700
//               file:mr-4 file:py-2 file:px-4
//               file:rounded-lg file:border-0
//               file:text-sm file:font-medium
//               file:bg-blue-50 file:text-blue-700
//               hover:file:bg-blue-100"
//           />
//           {formData.image && (
//             <p className="text-sm text-gray-500 mt-1">
//               Selected: {formData.image.name}
//             </p>
//           )}
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           disabled={loading}
//           className={`w-full bg-blue-600 text-white py-2 rounded-lg font-medium transition ${
//             loading ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700"
//           }`}
//         >
//           {loading ? "Uploading..." : "Add Banner"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddBanner;
