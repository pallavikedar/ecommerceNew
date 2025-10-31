// "use client";
// import React, { useEffect, useState } from "react";
// import { BACKEND_BASE } from "@/lib/backend";
// import { toast } from "react-toastify";
// import { useRouter } from "next/navigation";

// interface Banner {
//   id?: number;
//   name: string;
//   image: any;
//   category: string;
//   discount: number;
// }

// const AllBanners: React.FC = () => {
//   const router = useRouter();
//   const [banners, setBanners] = useState<Banner[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [submitting, setSubmitting] = useState(false); // ✅ New loader for submit
//   const [formData, setFormData] = useState<Banner>({
//     name: "",
//     image: "",
//     category: "",
//     discount: 0,
//   });
//   const [editId, setEditId] = useState<number | null>(null);
//   const [categories, setCategories] = useState([]);

//   // ✅ Fetch Categories
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
//       }
//     };

//     fetchCategories();
//   }, []);

//   // ✅ Fetch Banners
//   useEffect(() => {
//     fetchBanners();
//   }, []);

//   const fetchBanners = async () => {
//     const token = localStorage.getItem("adminToken");
//     try {
//       const res = await fetch(`${BACKEND_BASE}/banner/allBanner`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (!res.ok) throw new Error("Failed to fetch banners");
//       const data = await res.json();
//       setBanners(data);
//     } catch (err) {
//       console.error("❌ Error fetching banners:", err);
//       setError("Failed to load banners. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Delete Banner
//   const handleDelete = async (id: number) => {
//     const token = localStorage.getItem("adminToken");
//     if (!window.confirm("Are you sure you want to delete this banner?")) return;

//     try {
//       const res = await fetch(`${BACKEND_BASE}/banner/deleteBanner/${id}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (!res.ok) throw new Error("Failed to delete banner");
//       toast.success("🗑️ Banner deleted successfully");
//       setBanners((prev) => prev.filter((b) => b.id !== id));
//     } catch (err) {
//       console.error("❌ Error deleting banner:", err);
//       toast.error("Failed to delete banner");
//     }
//   };

//   // ✅ Open Modal for Add
//   const handleAdd = () => {
//     setEditId(null);
//     setFormData({ name: "", image: "", category: "", discount: 0 });
//     setShowModal(true);
//   };

//   // ✅ Open Modal for Edit
//   const handleEdit = async (id: number) => {
//     const token = localStorage.getItem("adminToken");
//     try {
//       const res = await fetch(`${BACKEND_BASE}/banner/Banner/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (!res.ok) throw new Error("Failed to fetch banner details");
//       const data = await res.json();
//       setFormData(data);
//       setEditId(id);
//       setShowModal(true);
//     } catch (err) {
//       toast.error("Failed to fetch banner details");
//     }
//   };

//   // ✅ Handle Form Submit with Loader
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setSubmitting(true); // 🌀 Start loader
//     const token = localStorage.getItem("adminToken");
//     const method = editId ? "PUT" : "POST";
//     const url = editId
//       ? `${BACKEND_BASE}/banner/updateBanner/${editId}`
//       : `${BACKEND_BASE}/banner/addBanner`;

//     const form = new FormData();
//     form.append("name", formData.name);
//     form.append("category", formData.category);
//     form.append("discount", String(formData.discount));
//     if (formData.image) form.append("image", formData.image);

//     try {
//       const res = await fetch(url, {
//         method,
//         headers: { Authorization: `Bearer ${token}` },
//         body: form,
//       });

//       if (!res.ok) throw new Error("Failed to save banner");

//       toast.success(editId ? "✅ Banner updated!" : "🎉 Banner added!");
//       setShowModal(false);
//       fetchBanners();
//     } catch (err) {
//       toast.error("Something went wrong while saving banner");
//     } finally {
//       setSubmitting(false); // 🛑 Stop loader
//     }
//   };

//   // ✅ Page Loader
//   if (loading)
//     return (
//       <div className="flex justify-center items-center h-40">
//         <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-600"></div>
//       </div>
//     );

//   if (error)
//     return <p className="text-center text-red-500 mt-10">{error}</p>;

//   return (
//     <div className="max-w-6xl mx-auto p-6 relative">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-semibold text-gray-800">🎯 All Banners</h2>
//         <button
//           onClick={handleAdd}
//           className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg transition"
//         >
//           + Add Banner
//         </button>
//       </div>

//       {/* Banner Grid */}
//       {banners.length === 0 ? (
//         <p className="text-center text-gray-500">No banners found.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {banners.map((banner) => (
//             <div
//               key={banner.id}
//               className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
//             >
//               <img
//                 src={banner.image}
//                 alt={banner.name}
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-4">
//                 <h3 className="text-lg font-semibold text-gray-800 mb-1">{banner.name}</h3>
//                 <p className="text-sm text-gray-500 mb-1">Category: {banner.category}</p>
//                 <p className="text-indigo-600 font-medium mb-3">Discount: {banner.discount}%</p>
//                 <div className="flex justify-between">
//                   <button
//                     onClick={() => handleEdit(banner.id!)}
//                     className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-lg hover:bg-blue-200"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(banner.id!)}
//                     className="text-sm bg-red-100 text-red-700 px-3 py-1 rounded-lg hover:bg-red-200"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* ✅ Add/Edit Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40">
//           <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md relative">
//             <h2 className="text-xl font-semibold mb-4">
//               {editId ? "Edit Banner" : "Add New Banner"}
//             </h2>

//             <form onSubmit={handleSubmit} className="space-y-4">
//               <input
//                 type="text"
//                 placeholder="Name"
//                 value={formData.name}
//                 onChange={(e) =>
//                   setFormData({ ...formData, name: e.target.value })
//                 }
//                 className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 required
//               />

//               <label className="block text-sm font-medium text-gray-700">
//                 Category
//                 <button
//                   type="button"
//                   onClick={() => router.push("/admin/categary")}
//                   className="text-indigo-600 hover:text-indigo-800 font-bold text-xl ml-2"
//                   title="Add New Category"
//                 >
//                   +
//                 </button>
//               </label>

//               <select
//                 name="category"
//                 value={formData.category}
//                 onChange={(e) =>
//                   setFormData({ ...formData, category: e.target.value })
//                 }
//                 required
//                 className="w-full mt-1 border rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 bg-white"
//               >
//                 <option value="">Select a category</option>
//                 {categories.map((cat: any) => (
//                   <option key={cat.categoryId} value={cat.categoryName}>
//                     {cat.categoryName}
//                   </option>
//                 ))}
//               </select>

//               <input
//                 type="number"
//                 placeholder="Discount %"
//                 value={formData.discount}
//                 onChange={(e) =>
//                   setFormData({ ...formData, discount: Number(e.target.value) })
//                 }
//                 className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 required
//               />

//               <input
//                 type="file"
//                 onChange={(e) =>
//                   setFormData({
//                     ...formData,
//                     image: e.target.files?.[0] as any,
//                   })
//                 }
//                 className="w-full border border-gray-300 rounded-lg px-3 py-2"
//                 accept="image/*"
//               />

//               <div className="flex justify-end gap-3 mt-4">
//                 <button
//                   type="button"
//                   onClick={() => setShowModal(false)}
//                   className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
//                   disabled={submitting}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={submitting}
//                   className={`px-4 py-2 rounded-lg text-white ${
//                     submitting
//                       ? "bg-gray-400 cursor-not-allowed"
//                       : "bg-indigo-600 hover:bg-indigo-700"
//                   }`}
//                 >
//                   {submitting
//                     ? "Saving..."
//                     : editId
//                     ? "Update"
//                     : "Add"}
//                 </button>
//               </div>
//             </form>

//             {/* ✅ Loader Overlay while submitting */}
//             {submitting && (
//               <div className="absolute inset-0 bg-white bg-opacity-60 flex items-center justify-center rounded-xl">
//                 <div className="animate-spin h-10 w-10 border-t-2 border-b-2 border-indigo-600 rounded-full"></div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllBanners;







"use client";
import React, { useEffect, useState } from "react";
import { BACKEND_BASE } from "@/lib/backend";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface Banner {
  id?: number;
  name: string;
  image: any;
  category: string;
  discount: number;
  discountType: string; // ✅ Added
  productId?: number;
}

const AllBanners: React.FC = () => {
  const router = useRouter();
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<Banner>({
    name: "",
    image: "",
    category: "",
    discount: 0,
    discountType: "CATEGORY", // ✅ Default type
    productId: undefined,
  });
  const [editId, setEditId] = useState<number | null>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  // ✅ Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      const token = localStorage.getItem("adminToken");
      try {
        const res = await fetch(`${BACKEND_BASE}/category/All`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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

  // ✅ Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("adminToken");
      try {
        const res = await fetch(`${BACKEND_BASE}/product/getAll`, {
          headers: {
            "Content-Type": "application/json",
           
          },
        });
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  // ✅ Fetch Banners
  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch(`${BACKEND_BASE}/banner/allBanner`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch banners");
      const data = await res.json();
      setBanners(data);
    } catch (err) {
      console.error("❌ Error fetching banners:", err);
      setError("Failed to load banners. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete Banner
  const handleDelete = async (id: number) => {
    const token = localStorage.getItem("adminToken");
    if (!window.confirm("Are you sure you want to delete this banner?")) return;

    try {
      const res = await fetch(`${BACKEND_BASE}/banner/deleteBanner/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete banner");
      toast.success("🗑️ Banner deleted successfully");
      setBanners((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      console.error("❌ Error deleting banner:", err);
      toast.error("Failed to delete banner");
    }
  };

  // ✅ Edit Banner
  const handleEdit = async (id: number) => {
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch(`${BACKEND_BASE}/banner/Banner/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch banner details");
      const data = await res.json();
      setFormData(data);
      setEditId(id);
      setShowModal(true);
    } catch (err) {
      toast.error("Failed to fetch banner details");
    }
  };

  // ✅ Add New Banner
  const handleAdd = () => {
    setEditId(null);
    setFormData({
      name: "",
      image: "",
      category: "",
      discount: 0,
      discountType: "CATEGORY",
      productId: undefined,
    });
    setShowModal(true);
  };

  // ✅ Submit Banner
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const token = localStorage.getItem("adminToken");
    const method = editId ? "PUT" : "POST";
    const url = editId
      ? `${BACKEND_BASE}/banner/updateBanner/${editId}`
      : `${BACKEND_BASE}/banner/addBanner`;

    const form = new FormData();
    form.append("name", formData.name);
    form.append("discountType", formData.discountType);
    form.append("discount", String(formData.discount));

    // ✅ Conditionally add category or productId
    if (formData.discountType === "CATEGORY") {
      form.append("category", formData.category);
    } else if (formData.discountType === "PRODUCT" && formData.productId) {
      form.append("productId", String(formData.productId));
    }

    if (formData.image) form.append("image", formData.image);

    try {
      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      });
      if (!res.ok) throw new Error("Failed to save banner");
      toast.success(editId ? "✅ Banner updated!" : "🎉 Banner added!");
      setShowModal(false);
      fetchBanners();
    } catch (err) {
      toast.error("Failed to save banner");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">🎯 All Banners</h2>
        <button
          onClick={handleAdd}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg"
        >
          + Add Banner
        </button>
      </div>

      {/* Banner Grid */}
      {banners.length === 0 ? (
        <p className="text-center text-gray-500">No banners found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="bg-white border rounded-xl shadow-md hover:shadow-lg transition"
            >
              <img
                src={banner.image}
                alt={banner.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{banner.name}</h3>
                <p className="text-sm text-gray-500">
                  Type: {banner.discountType}
                </p>
                {banner.discountType === "CATEGORY" && (
                  <p className="text-sm text-gray-500">
                    Category: {banner.category}
                  </p>
                )}
                {banner.discountType === "PRODUCT" && (
                  <p className="text-sm text-gray-500">
                    Product ID: {banner.productId}
                  </p>
                )}
                <p className="text-indigo-600 font-medium">
                  Discount: {banner.discount}%
                </p>
                <div className="flex justify-between mt-3">
                  <button
                    onClick={() => handleEdit(banner.id!)}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(banner.id!)}
                    className="bg-red-100 text-red-700 px-3 py-1 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ✅ Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md relative">
            <h2 className="text-xl font-semibold mb-4">
              {editId ? "Edit Banner" : "Add New Banner"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <input
                type="text"
                placeholder="Banner Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full border px-3 py-2 rounded-lg"
                required
              />

              {/* Discount Type */}
              <select
                value={formData.discountType}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    discountType: e.target.value,
                    category: "",
                    productId: undefined,
                  })
                }
                className="w-full border px-3 py-2 rounded-lg"
                required
              >
                <option value="CATEGORY">Category</option>
                <option value="PRODUCT">Product</option>
              </select>

              {/* Conditionally render dropdowns */}
              {formData.discountType === "CATEGORY" && (
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded-lg"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.categoryId} value={cat.categoryName}>
                      {cat.categoryName}
                    </option>
                  ))}
                </select>
              )}

              {formData.discountType === "PRODUCT" && (
                <select
                  value={formData.productId ?? ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      productId: Number(e.target.value),
                    })
                  }
                  className="w-full border px-3 py-2 rounded-lg"
                  required
                >
                  <option value="">Select Product</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              )}

              {/* Discount */}
              <input
                type="number"
                placeholder="Discount %"
                value={formData.discount}
                onChange={(e) =>
                  setFormData({ ...formData, discount: Number(e.target.value) })
                }
                className="w-full border px-3 py-2 rounded-lg"
                required
              />

              {/* Image */}
              <input
                type="file"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    image: e.target.files?.[0] as any,
                  })
                }
                className="w-full border px-3 py-2 rounded-lg"
                accept="image/*"
              />

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className={`px-4 py-2 rounded-lg text-white ${
                    submitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  }`}
                >
                  {submitting
                    ? "Saving..."
                    : editId
                    ? "Update"
                    : "Add"}
                </button>
              </div>
            </form>

            {/* Loader Overlay */}
            {submitting && (
              <div className="absolute inset-0 bg-white bg-opacity-60 flex items-center justify-center rounded-xl">
                <div className="animate-spin h-10 w-10 border-t-2 border-b-2 border-indigo-600 rounded-full"></div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllBanners;
