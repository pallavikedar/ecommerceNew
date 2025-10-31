

// "use client";

// import useSWR from "swr";
// import { BACKEND_BASE } from "@/lib/backend";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import { useRef, useState } from "react";

// export default function CartPage() {
//   const token =
//     typeof window !== "undefined" ? localStorage.getItem("userToken") : null;

//   const updatingRef = useRef(false); // 🧠 Prevents double triggers
//   const [updatingId, setUpdatingId] = useState<number | null>(null);

//   // ✅ Fetch cart data
//   const { data, mutate, error, isLoading } = useSWR(
//     token ? [`${BACKEND_BASE}/cart/view`, token] : null,
//     async ([url, token]) => {
//       const res = await fetch(url, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (!res.ok) throw new Error("Failed to fetch cart");
//       return res.json();
//     }
//   );

//   // ✅ Remove item
//   const handleRemove = async (variantId: number, quantity: number) => {
//     if (!token) return alert("Please login first");
//     if (updatingRef.current) return; // 🚫 Ignore duplicate calls
//     updatingRef.current = true;
//     setUpdatingId(variantId);

//     const authHeader = token.startsWith("Bearer") ? token : `Bearer ${token}`;
//     const url = `${BACKEND_BASE}/cart/remove?id=${variantId}&quantity=${quantity}`;

//     try {
//       const res = await fetch(url, {
//         method: "POST",
//         headers: {
//           Authorization: authHeader,
//           "Content-Type": "application/json",
//         },
//       });

//       if (!res.ok) {
//         const errText = await res.text();
//         console.error("❌ Remove failed:", errText);
//         alert(`Remove failed: ${res.status} ${errText}`);
//       } else {
//         await mutate();
//       }
//     } catch (err) {
//       console.error("⚠️ Network error while removing item:", err);
//     } finally {
//       updatingRef.current = false;
//       setUpdatingId(null);
//     }
//   };

//   // ✅ Update quantity (fixed double-trigger issue)
//   const handleUpdate = async (variantId: number, newQuantity: number) => {
//     if (!token) return alert("Please login first");
//     if (updatingRef.current) return; // 🚫 Prevent double call
//     if (newQuantity <= 0) {
//       await handleRemove(variantId, 1);
//       return;
//     }

//     updatingRef.current = true;
//     setUpdatingId(variantId);

//     const authHeader = token.startsWith("Bearer") ? token : `Bearer ${token}`;
//     const url = `${BACKEND_BASE}/cart/updateQuantity?id=${variantId}&quantity=${newQuantity}`;

//     try {
//       console.log("📤 Updating quantity:", url);
//       const res = await fetch(url, {
//         method: "POST",
//         headers: { Authorization: authHeader },
//       });

//       if (!res.ok) {
//         const errText = await res.text();
//         console.error("❌ Update quantity failed:", errText);
//         alert(`Update failed: ${res.status} ${errText}`);
//       } else {
//         await mutate();
//       }
//     } catch (err) {
//       console.error("⚠️ Network error while updating item:", err);
//     } finally {
//       updatingRef.current = false;
//       setUpdatingId(null);
//     }
//   };

//   if (isLoading) return <p>Loading cart...</p>;
//   if (error) return <p>Failed to load cart.</p>;

//   let items: any[] = [];
//   if (Array.isArray(data)) items = data;
//   else if (data?.items) items = data.items;
//   else if (data?.cartItems) items = data.cartItems;
//   else if (data?.data?.items) items = data.data.items;

//   const getVariantId = (item: any) =>
//     item.variant?.id ||
//     item.variantId ||
//     item.id ||
//     item.cartItemId ||
//     item.productVariantId;

//   const total = items.reduce(
//     (sum, item) =>
//       sum +
//       (item.price || item.variant?.discountedPrice || 0) *
//         (item.quantity || 0),
//     0
//   );

//   return (
//     <main className="container mx-auto px-4 py-10 space-y-8">
//       <h1 className="text-3xl font-semibold">🛒 Your Cart</h1>

//       {items.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <>
//           <div className="space-y-4">
//             {items.map((item: any) => {
//               const variantId = getVariantId(item);
//               const disabled = updatingId === variantId;

//               return (
//                 <div
//                   key={variantId}
//                   className="flex items-center justify-between border rounded-lg p-4 hover:shadow-sm transition"
//                 >
//                   <div className="flex items-center gap-4">
//                     <Image
//                       src={
//                         item.imageUrl ||
//                         item.variant?.imageUrls?.[0] ||
//                         "/placeholder.svg"
//                       }
//                       alt={item.productName || "Product"}
//                       width={80}
//                       height={80}
//                       className="rounded-md border object-cover"
//                     />
//                     <div>
//                       <p className="font-semibold">
//                         {item.productName || "Unnamed Product"}
//                       </p>
//                       {item.variant && (
//                         <p className="text-sm text-gray-500">
//                           {item.variant.color} / {item.variant.size}
//                         </p>
//                       )}
//                       <p className="text-sm text-gray-600">
//                         ₹
//                         {(
//                           item.price ||
//                           item.variant?.discountedPrice ||
//                           0
//                         ).toFixed(2)}{" "}
//                         each
//                       </p>
//                     </div>
//                   </div>

//                   {/* Quantity Controls */}
//                   <div className="flex items-center gap-3">
//                     <Button
//                       variant="outline"
//                       disabled={disabled}
//                       onClick={() =>
//                         handleUpdate(variantId, (item.quantity || 0) + 1)
//                       }
//                     >
//                       +
//                     </Button>

//                     <span className="font-medium w-6 text-center">
//                       {item.quantity}
//                     </span>

//                     <Button
//                       variant="outline"
//                       disabled={disabled}
//                       onClick={() =>
//                         handleUpdate(variantId, (item.quantity || 0) - 1)
//                       }
//                     >
//                       -
//                     </Button>

//                     <Button
//                       variant="destructive"
//                       disabled={disabled}
//                       onClick={() => handleRemove(variantId, item.quantity)}
//                     >
//                       Remove
//                     </Button>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           <div className="flex justify-between items-center border-t pt-6">
//             <h2 className="text-xl font-semibold">Total:</h2>
//             <p className="text-2xl font-bold text-primary">
//               ₹{total.toFixed(2)}
//             </p>
//           </div>

//           <div className="flex justify-end">
//             <Button className="mt-4 px-6 py-2 text-lg">
//               Proceed to Checkout
//             </Button>
//           </div>
//         </>
//       )}
//     </main>
//   );
// }










"use client";

import useSWR from "swr";
import { BACKEND_BASE } from "@/lib/backend";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState, useRef } from "react";

export default function CartPage() {
  const token = typeof window !== "undefined" ? localStorage.getItem("userToken") : null;
  const authHeader = token ? (token.startsWith("Bearer") ? token : `Bearer ${token}`) : "";
  const updatingRef = useRef(false);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  // ✅ Fetch cart
  const { data, mutate, error, isLoading } = useSWR(
    token ? [`${BACKEND_BASE}/cart/view`, token] : null,
    async ([url, token]) => {
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch cart");
      return res.json();
    }
  );

  // Normalize items
  const items =
    data?.items || data?.cartItems || data?.data?.items || (Array.isArray(data) ? data : []) || [];

  const getVariantId = (item: any) =>
    item.variant?.id || item.variantId || item.id || item.cartItemId || item.productVariantId;

  // ✅ Local quantity state (avoids stale data)
  const [localQty, setLocalQty] = useState<Record<number, number>>({});

  // Initialize localQty when data loads
  if (items.length > 0 && Object.keys(localQty).length === 0) {
    const map: Record<number, number> = {};
    items.forEach((i: any) => {
      const id = getVariantId(i);
      map[id] = i.quantity || 1;
    });
    setLocalQty(map);
  }

  // ✅ Update quantity
  const handleUpdate = async (variantId: number, delta: number) => {
    if (!token) return alert("Please login first");
    if (updatingRef.current) return;

    const current = localQty[variantId] ?? 0;
    const newQuantity = Math.max(current + delta, 0);

    // Optimistic update immediately
    setLocalQty((prev) => ({ ...prev, [variantId]: newQuantity }));

    if (newQuantity <= 0) {
      await handleRemove(variantId, 1);
      return;
    }

    updatingRef.current = true;
    setUpdatingId(variantId);

    try {
      const url = `${BACKEND_BASE}/cart/updateQuantity?id=${variantId}&quantity=${newQuantity}`;
      const res = await fetch(url, {
        method: "POST",
        headers: { Authorization: authHeader },
      });

      if (!res.ok) throw new Error(await res.text());
      await mutate();
    } catch (err) {
      console.error("❌ Update failed:", err);
      alert("Failed to update quantity");
    } finally {
      updatingRef.current = false;
      setUpdatingId(null);
    }
  };

  // ✅ Remove item
  const handleRemove = async (variantId: number, quantity: number) => {
    if (!token) return alert("Please login first");
    if (updatingRef.current) return;

    updatingRef.current = true;
    setUpdatingId(variantId);

    try {
      const url = `${BACKEND_BASE}/cart/remove?id=${variantId}&quantity=${quantity}`;
      const res = await fetch(url, {
        method: "POST",
        headers: { Authorization: authHeader },
      });
      if (!res.ok) throw new Error(await res.text());
      await mutate();
    } catch (err) {
      console.error("❌ Remove failed:", err);
      alert("Failed to remove item");
    } finally {
      updatingRef.current = false;
      setUpdatingId(null);
    }
  };

  if (isLoading) return <p>Loading cart...</p>;
  if (error) return <p>Failed to load cart.</p>;

  const total = items.reduce(
    (sum, i) =>
      sum + (i.price || i.variant?.discountedPrice || 0) * (localQty[getVariantId(i)] || i.quantity || 0),
    0
  );

  return (
    <main className="container mx-auto px-4 py-10 space-y-8">
      <h1 className="text-3xl font-semibold">🛒 Your Cart</h1>

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {items.map((item: any) => {
              const variantId = getVariantId(item);
              const quantity = localQty[variantId] ?? item.quantity ?? 1;
              const disabled = updatingId === variantId;

              return (
                <div
                  key={variantId}
                  className="flex items-center justify-between border rounded-lg p-4 hover:shadow-sm transition"
                >
                  <div className="flex items-center gap-4">
                    <Image
                      src={item.imageUrl || item.variant?.imageUrls?.[0] || "/placeholder.svg"}
                      alt={item.productName || "Product"}
                      width={80}
                      height={80}
                      className="rounded-md border object-cover"
                    />
                    <div>
                      <p className="font-semibold">{item.productName}</p>
                      <p className="text-sm text-gray-600">
                        ₹{(item.price || item.variant?.discountedPrice || 0).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Button variant="outline" disabled={disabled} onClick={() => handleUpdate(variantId, +1)}>
                      +
                    </Button>

                    <span className="font-medium w-6 text-center">{quantity}</span>

                    <Button variant="outline" disabled={disabled} onClick={() => handleUpdate(variantId, -1)}>
                      -
                    </Button>

                    <Button variant="destructive" disabled={disabled} onClick={() => handleRemove(variantId, quantity)}>
                      Remove
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between items-center border-t pt-6">
            <h2 className="text-xl font-semibold">Total:</h2>
            <p className="text-2xl font-bold text-primary">₹{total.toFixed(2)}</p>
          </div>

          <div className="flex justify-end">
            <Button className="mt-4 px-6 py-2 text-lg">Proceed to Checkout</Button>
          </div>
        </>
      )}
    </main>
  );
}
