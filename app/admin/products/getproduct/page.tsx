// "use client";
// import React, { useEffect, useState } from "react";
// import { BACKEND_BASE } from "@/lib/backend";
// import { toast } from "react-toastify";
// import { FaTrash, FaEdit, FaChevronDown, FaChevronUp } from "react-icons/fa";
// import { useRouter } from "next/navigation";

// interface Variant {
//   id: number;
//   color: string;
//   price: number;
//   discountedPrice: number;
//   qty: number;
//   size: string;
//   imageUrls: string[];
// }

// interface Product {
//   id: number;
//   name: string;
//   description: string;
//   category: string;
//   pickupLocation: string;
//   variants: Variant[];
// }

// const AllProductsWithVariants: React.FC = () => {
// const router = useRouter()
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [expanded, setExpanded] = useState<number | null>(null);

//   // Edit Modal States
//   const [editModal, setEditModal] = useState(false);
//   const [editProduct, setEditProduct] = useState<Product | null>(null);
//   const [saving, setSaving] = useState(false);

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     const token = localStorage.getItem("adminToken");
//     try {
//       const res = await fetch(`${BACKEND_BASE}/product/getAll`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (!res.ok) throw new Error("Failed to fetch products");
//       const data = await res.json();
//       setProducts(data);
//     } catch (err) {
//       setError("Failed to load products.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id: number) => {
//     const token = localStorage.getItem("adminToken");
//     if (!window.confirm("Are you sure you want to delete this product?")) return;

//     try {
//       const res = await fetch(`${BACKEND_BASE}/product/delete/${id}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (!res.ok) throw new Error("Delete failed");
//       toast.success("🗑️ Product deleted successfully");
//       setProducts((prev) => prev.filter((p) => p.id !== id));
//     } catch {
//       toast.error("Failed to delete product");
//     }
//   };

//   const toggleExpand = (id: number) => {
//     setExpanded((prev) => (prev === id ? null : id));
//   };

//   // ✅ Open Edit Modal
//   const handleEdit = async (id: number) => {
//     const token = localStorage.getItem("adminToken");
//     try {
//       const res = await fetch(`${BACKEND_BASE}/product/get/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (!res.ok) throw new Error("Failed to fetch product details");
//       const data = await res.json();
//       setEditProduct(data);
//       setEditModal(true);
//     } catch (err) {
//       toast.error("Failed to load product details");
//     }
//   };

//   // ✅ Handle Edit Save
//   const handleSaveEdit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!editProduct) return;

//     const token = localStorage.getItem("adminToken");
//     setSaving(true);

//     try {
//       const res = await fetch(`${BACKEND_BASE}/product/edit/${editProduct.id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           id: editProduct.id,
//           name: editProduct.name,
//           description: editProduct.description,
//           category: editProduct.category,
//           pickupLocation: editProduct.pickupLocation,
//         }),
//       });

//       if (!res.ok) throw new Error("Failed to update product");

//       toast.success("✅ Product updated successfully!");
//       setEditModal(false);
//       fetchProducts();
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to update product");
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading)
//     return (
//       <div className="flex justify-center items-center h-[50vh]">
//         <div className="h-12 w-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
//       </div>
//     );

//   if (error)
//     return <p className="text-center text-red-600 text-lg mt-10">{error}</p>;

//   return (
//     <div className="p-8 bg-gray-50 min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         {/* Page Header */}
//         <div className="mb-8 flex justify-between items-center">
//           <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
//             🛍️ Product Management
//           </h1>
//           <button
//             onClick={() => router.push("/admin/products")}
//             className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
//           >
//             + Add Product
//           </button>
//         </div>

//         {/* Product List */}
//         {products.length === 0 ? (
//           <p className="text-gray-500 text-center mt-10">
//             No products available.
//           </p>
//         ) : (
//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             {products.map((product) => (
//               <div
//                 key={product.id}
//                 className="bg-white shadow-lg rounded-2xl border border-gray-100 hover:shadow-xl transition-all overflow-hidden"
//               >
//                 {/* Product Image */}
//                 {product.variants?.[0]?.imageUrls?.[0] && (
//                   <img
//                     src={product.variants[0].imageUrls[0]}
//                     alt={product.name}
//                     className="w-full h-64 object-cover border-b"
//                   />
//                 )}

//                 {/* Product Info */}
//                 <div className="p-6">
//                   <h3 className="text-xl font-semibold text-gray-800 mb-1 truncate">
//                     {product.name}
//                   </h3>
//                   <p className="text-gray-600 text-sm mb-3 line-clamp-2">
//                     {product.description}
//                   </p>

//                   <div className="flex flex-wrap gap-2 text-sm mb-4">
//                     <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
//                       {product.category}
//                     </span>
//                     <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
//                       {product.pickupLocation}
//                     </span>
//                   </div>

//                   {/* Actions */}
//                   <div className="flex justify-between items-center border-t pt-4">
//                     <button
//                       onClick={() => toggleExpand(product.id)}
//                       className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-800 font-medium"
//                     >
//                       {expanded === product.id ? (
//                         <>
//                           <FaChevronUp /> Hide Variants
//                         </>
//                       ) : (
//                         <>
//                           <FaChevronDown /> View Variants
//                         </>
//                       )}
//                     </button>

//                     <div className="flex gap-3">
//                       <button
//                         onClick={()=>router.push("/admin/products")}
//                         className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200"
//                       >
//                         <FaEdit />
//                       </button>
//                       <button
//                         onClick={() => handleDelete(product.id)}
//                         className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200"
//                       >
//                         <FaTrash />
//                       </button>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Variant Section */}
//                 {expanded === product.id && (
//                   <div className="p-5 border-t bg-gray-50">
//                     <h4 className="text-md font-semibold mb-3 text-gray-700">
//                       Product Variants
//                     </h4>

//                     {product.variants.length === 0 ? (
//                       <p className="text-sm text-gray-500">
//                         No variants available.
//                       </p>
//                     ) : (
//                       <div className="grid grid-cols-1 gap-4">
//                         {product.variants.map((variant) => (
//                           <div
//                             key={variant.id}
//                             className="bg-white p-4 rounded-xl border shadow-sm hover:shadow-md transition"
//                           >
//                             <div className="flex flex-col gap-2">
//                               <div className="flex justify-between">
//                                 <p className="font-medium text-gray-800">
//                                   Color:{" "}
//                                   <span className="text-gray-600">
//                                     {variant.color}
//                                   </span>
//                                 </p>
//                                 <p className="text-sm text-gray-600">
//                                   Size: {variant.size}
//                                 </p>
//                               </div>
//                               <p className="text-sm text-gray-600">
//                                 Price: ₹{variant.price}{" "}
//                                 {variant.discountedPrice > 0 && (
//                                   <span className="text-green-600 ml-1">
//                                     (₹{variant.discountedPrice})
//                                   </span>
//                                 )}
//                               </p>
//                               <p className="text-sm text-gray-600">
//                                 Quantity: {variant.qty}
//                               </p>

//                               {variant.imageUrls.length > 0 && (
//                                 <div className="flex gap-3 mt-3 overflow-x-auto">
//                                   {variant.imageUrls.map((img, i) => (
//                                     <img
//                                       key={i}
//                                       src={img}
//                                       alt={`variant-${i}`}
//                                       className="h-24 w-24 object-cover rounded-lg border"
//                                     />
//                                   ))}
//                                 </div>
//                               )}
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* ✅ Edit Modal */}
//       {editModal && editProduct && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded-xl w-full max-w-lg shadow-lg">
//             <h2 className="text-xl font-semibold mb-4 text-gray-800">
//               ✏️ Edit Product
//             </h2>

//             <form onSubmit={handleSaveEdit} className="space-y-4">
//               <input
//                 type="text"
//                 value={editProduct.name}
//                 onChange={(e) =>
//                   setEditProduct({ ...editProduct, name: e.target.value })
//                 }
//                 placeholder="Product Name"
//                 className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
//                 required
//               />

//               <textarea
//                 value={editProduct.description}
//                 onChange={(e) =>
//                   setEditProduct({ ...editProduct, description: e.target.value })
//                 }
//                 placeholder="Description"
//                 rows={3}
//                 className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
//               />

//               <input
//                 type="text"
//                 value={editProduct.category}
//                 onChange={(e) =>
//                   setEditProduct({ ...editProduct, category: e.target.value })
//                 }
//                 placeholder="Category"
//                 className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
//                 required
//               />

//               <input
//                 type="text"
//                 value={editProduct.pickupLocation}
//                 onChange={(e) =>
//                   setEditProduct({
//                     ...editProduct,
//                     pickupLocation: e.target.value,
//                   })
//                 }
//                 placeholder="Pickup Location"
//                 className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
//                 required
//               />

//               <div className="flex justify-end gap-3 mt-5">
//                 <button
//                   type="button"
//                   onClick={() => setEditModal(false)}
//                   className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={saving}
//                   className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
//                 >
//                   {saving ? "Saving..." : "Save Changes"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllProductsWithVariants;

"use client";
import React, { useEffect, useState } from "react";
import { BACKEND_BASE } from "@/lib/backend";
import { toast } from "react-toastify";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  FaTrash,
  FaEdit,
  FaChevronDown,
  FaChevronUp,
  FaTimes,
  FaPlus,
} from "react-icons/fa";

interface Variant {
  id?: number;
  color: string;
  price: number;
  qty: number;
  size: string;
  images: (File | string)[];
}

interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  pickupLocation: string;
  variants: Variant[];
}

const AllProductsWithVariants: React.FC = () => {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // ✅ Fetch all products
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch(`${BACKEND_BASE}/product/getAll`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete Product
  const handleDelete = async (id: number) => {
    const token = localStorage.getItem("adminToken");
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`${BACKEND_BASE}/product/delete/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Delete failed");
      toast.success("🗑️ Product deleted successfully");
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch {
      toast.error("Failed to delete product");
    }
  };

  const toggleExpand = (id: number) => {
    setExpanded((prev) => (prev === id ? null : id));
  };

  // ✅ Load product details for editing
  const openEditPopup = async (id: number) => {
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch(`${BACKEND_BASE}/product/get/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch product details");
      const data = await res.json();
      const formattedData: Product = {
        ...data,
        variants: data.variants?.map((v: any) => ({
          ...v,
          images: v.imageUrls || [],
        })) || [],
      };
      setEditingProduct(formattedData);
    } catch {
      toast.error("Failed to load product details");
    }
  };

  // ✅ Handle Form Change Events
  const handleVariantChange = (
    index: number,
    field: keyof Variant,
    value: any
  ) => {
    if (!editingProduct) return;
    const updatedVariants = [...editingProduct.variants];
    (updatedVariants[index] as any)[field] = value;
    setEditingProduct({ ...editingProduct, variants: updatedVariants });
  };

  const handleImageUpload = (index: number, files: FileList | null) => {
    if (!files) return;
    const newImages = Array.from(files);
    handleVariantChange(index, "images", newImages);
  };

  const addVariant = () => {
    if (!editingProduct) return;
    setEditingProduct({
      ...editingProduct,
      variants: [
        ...editingProduct.variants,
        { color: "", price: 0, qty: 0, size: "", images: [] },
      ],
    });
  };

  const removeVariant = (index: number) => {
    if (!editingProduct) return;
    const updated = [...editingProduct.variants];
    updated.splice(index, 1);
    setEditingProduct({ ...editingProduct, variants: updated });
  };

  // ✅ Submit FormData via multipart/form-data
  // ✅ Submit FormData via multipart/form-data
const handleEditSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!editingProduct) return;

  const token = localStorage.getItem("adminToken");

  // ✅ Construct product JSON
  const productPayload = {
    name: editingProduct.name,
    description: editingProduct.description,
    category: editingProduct.category,
    pickupLocation: editingProduct.pickupLocation,
    variants: editingProduct.variants.map((v) => ({
      color: v.color,
      price: v.price,
      qty: v.qty,
      size: v.size,
    })),
  };

  // ✅ Construct FormData
  const formData = new FormData();
  formData.append(
    "product",
    new Blob([JSON.stringify(productPayload)], { type: "application/json" })
  );

  // ✅ Add variant images
  editingProduct.variants.forEach((variant) => {
    variant.images.forEach((img) => {
      if (img instanceof File) {
        formData.append("images", img);
      }
    });
  });

  try {
    const res = await fetch(`${BACKEND_BASE}/product/edit/${editingProduct.id}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Update failed: ${errorText}`);
    }

    toast.success("✅ Product updated successfully!");
    setEditingProduct(null);
    fetchProducts();
  } catch (err) {
    console.error("Error updating product:", err);
    toast.error("❌ Failed to update product");
  }
};


  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="h-12 w-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
            🛍️ Product Management
          </h1>
          <Button
            className="flex items-center gap-2"
            onClick={() => router.push("/admin/products")}
          >
            <Plus size={16} />
            Add Product
          </Button>
        </div>

        {products.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">
            No products available.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white shadow-lg rounded-2xl border hover:shadow-xl transition overflow-hidden"
              >
                {product.variants?.[0]?.imageUrls?.[0] && (
                  <img
                    src={product.variants[0].imageUrls[0]}
                    className="w-full h-72 object-cover border-b"
                    alt={product.name}
                  />
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center border-t pt-4">
                    <button
                      onClick={() => toggleExpand(product.id)}
                      className="text-indigo-600 text-sm flex items-center gap-2"
                    >
                      {expanded === product.id ? (
                        <>
                          <FaChevronUp /> Hide Variants
                        </>
                      ) : (
                        <>
                          <FaChevronDown /> View Variants
                        </>
                      )}
                    </button>
                    <div className="flex gap-3">
                      <button
                        onClick={() => openEditPopup(product.id)}
                        className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>

                {expanded === product.id && (
                  <div className="p-5 border-t bg-gray-50">
                    <h4 className="text-md font-semibold mb-3 text-gray-700">
                      Product Variants
                    </h4>
                    {product.variants.length === 0 ? (
                      <p className="text-sm text-gray-500">
                        No variants available.
                      </p>
                    ) : (
                      <div className="grid grid-cols-1 gap-4">
                        {product.variants.map((variant) => (
                          <div
                            key={variant.id}
                            className="bg-white p-4 rounded-xl border shadow-sm hover:shadow-md transition"
                          >
                            <div className="flex flex-col gap-2">
                              <div className="flex justify-between">
                                <p className="font-medium text-gray-800">
                                  Color:{" "}
                                  <span className="text-gray-600">
                                    {variant.color}
                                  </span>
                                </p>
                                <p className="text-sm text-gray-600">
                                  Size: {variant.size}
                                </p>
                              </div>
                              <p className="text-sm text-gray-600">
                                Price: ₹{variant.price}
                              </p>
                              <p className="text-sm text-gray-600">
                                Quantity: {variant.qty}
                              </p>
                              {variant.imageUrls?.length > 0 && (
                                <div className="flex gap-3 mt-3 overflow-x-auto">
                                  {variant.imageUrls.map((img, i) => (
                                    <img
                                      key={i}
                                      src={img}
                                      alt={`variant-${i}`}
                                      className="h-28 w-28 object-cover rounded-lg border"
                                    />
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ✅ Edit Popup */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 overflow-y-auto">
          <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl p-6 relative m-6">
            <button
              onClick={() => setEditingProduct(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <FaTimes />
            </button>

            <h2 className="text-2xl font-semibold mb-4">✏️ Edit Product</h2>

            <form onSubmit={handleEditSubmit} className="space-y-5">
              {/* Product Info */}
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={editingProduct.name}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, name: e.target.value })
                  }
                  className="border p-2 rounded-lg w-full"
                  required
                />
                <input
                  type="text"
                  placeholder="Category"
                  value={editingProduct.category}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      category: e.target.value,
                    })
                  }
                  className="border p-2 rounded-lg w-full"
                  required
                />
              </div>

              <textarea
                placeholder="Description"
                value={editingProduct.description}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    description: e.target.value,
                  })
                }
                className="border p-2 rounded-lg w-full"
                rows={3}
              />

              <input
                type="text"
                placeholder="Pickup Location"
                value={editingProduct.pickupLocation}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    pickupLocation: e.target.value,
                  })
                }
                className="border p-2 rounded-lg w-full"
              />

              {/* ✅ Variants */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-medium">Variants</h3>
                  <button
                    type="button"
                    onClick={addVariant}
                    className="flex items-center gap-2 bg-green-100 text-green-600 px-3 py-1 rounded-lg hover:bg-green-200"
                  >
                    <FaPlus /> Add Variant
                  </button>
                </div>

                {editingProduct.variants.map((variant, i) => (
                  <div
                    key={i}
                    className="border p-4 rounded-xl mb-3 bg-gray-50 space-y-3"
                  >
                    <div className="flex justify-between">
                      <h4 className="font-semibold">Variant {i + 1}</h4>
                      <button
                        type="button"
                        onClick={() => removeVariant(i)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Color"
                        value={variant.color}
                        onChange={(e) =>
                          handleVariantChange(i, "color", e.target.value)
                        }
                        className="border p-2 rounded-lg"
                      />
                      <input
                        type="text"
                        placeholder="Size"
                        value={variant.size}
                        onChange={(e) =>
                          handleVariantChange(i, "size", e.target.value)
                        }
                        className="border p-2 rounded-lg"
                      />
                      <input
                        type="number"
                        placeholder="Price"
                        value={variant.price}
                        onChange={(e) =>
                          handleVariantChange(i, "price", e.target.value)
                        }
                        className="border p-2 rounded-lg"
                      />
                      <input
                        type="number"
                        placeholder="Quantity"
                        value={variant.qty}
                        onChange={(e) =>
                          handleVariantChange(i, "qty", e.target.value)
                        }
                        className="border p-2 rounded-lg"
                      />
                    </div>

                    {/* ✅ Image Upload */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Upload Images
                      </label>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => handleImageUpload(i, e.target.files)}
                        className="border rounded-lg p-2 w-full"
                      />
                      <div className="flex gap-3 mt-2 overflow-x-auto">
                        {variant.images.map((img, index) => (
                          <img
                            key={index}
                            src={
                              img instanceof File
                                ? URL.createObjectURL(img)
                                : (img as string)
                            }
                            className="h-28 w-28 object-cover rounded-lg border"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* ✅ Buttons */}
              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProductsWithVariants;
