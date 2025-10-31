// "use client"

// import { useParams } from "next/navigation"
// import useSWR from "swr"
// import Image from "next/image"
// import { fetchJSON } from "@/lib/swr-fetcher"
// import { Button } from "@/components/ui/button"
// import { useCart } from "@/components/site/cart-store"
// import { BACKEND_BASE } from "@/lib/backend"
// import Link from "next/link"

// type Variant = {
//   id: number
//   color: string
//   price: number
//   discountedPrice: number
//   qty: number
//   size: string
//   imageUrls: string[]
// }

// type Product = {
//   id: number
//   name: string
//   description: string
//   category: string
//   pickupLocation: string
//   variants: Variant[]
// }

// export default function ProductDetailsPage() {
//   const { id } = useParams<{ id: string }>()
//   const { addItem } = useCart()

//   // Fetch current product details
//   const { data, error, isLoading } = useSWR<Product>(
//     id ? `${BACKEND_BASE}/product/get/${id}` : null,
//     fetchJSON
//   )

//   // Fetch all products for "Related Products"
//   const { data: allProducts } = useSWR<Product[]>(
//     `${BACKEND_BASE}/product/getAll`,
//     fetchJSON
//   )

//   if (isLoading)
//     return (
//       <main className="container mx-auto px-4 py-10">
//         <div className="animate-pulse space-y-4">
//           <div className="h-[400px] w-full rounded-lg bg-muted" />
//           <div className="h-6 w-1/3 bg-muted rounded" />
//           <div className="h-4 w-1/2 bg-muted rounded" />
//         </div>
//       </main>
//     )

//   if (error)
//     return (
//       <main className="container mx-auto px-4 py-10 text-red-500">
//         Failed to load product.
//       </main>
//     )

//   if (!data) return null

//   const product = data

//   // Filter out current product
//   const relatedProducts =
//     allProducts?.filter((p) => String(p.id) !== String(product.id)) || []

//   return (
//     <main className="container mx-auto px-4 py-10 space-y-14">
//       {/* ===== Product Details Section ===== */}
//       <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
//         {/* Product Images */}
//         <div className="space-y-3">
//           {product.variants[0]?.imageUrls?.length > 0 ? (
//             <Image
//               src={product.variants[0].imageUrls[0]}
//               alt={product.name}
//               width={800}
//               height={800}
//               className="rounded-xl border object-cover w-full h-[480px]"
//             />
//           ) : (
//             <div className="h-[480px] w-full rounded-xl bg-muted" />
//           )}

//           <div className="grid grid-cols-5 gap-2">
//             {product.variants[0]?.imageUrls?.map((img, i) => (
//               <Image
//                 key={i}
//                 src={img}
//                 alt="Variant Image"
//                 width={100}
//                 height={100}
//                 className="rounded-md border object-cover h-20 w-20"
//               />
//             ))}
//           </div>
//         </div>

//         {/* Product Details */}
//         <div className="space-y-4">
//           <h1 className="text-3xl font-semibold">{product.name}</h1>
//           <p className="text-muted-foreground">{product.description}</p>

//           <div className="pt-4">
//             <p className="text-sm text-gray-500">
//               Category: <span className="font-medium">{product.category}</span>
//             </p>
//           </div>

//           <div className="border-t my-4" />

//           <h2 className="text-lg font-semibold">Available Variants</h2>
//           <div className="space-y-3">
//             {product.variants.map((variant) => (
//               <div
//                 key={variant.id}
//                 className="flex flex-col md:flex-row justify-between items-center gap-4 border rounded-lg p-4 hover:shadow-sm transition"
//               >
//                 <div className="flex items-center gap-4">
//                   {variant.imageUrls[0] && (
//                     <Image
//                       src={variant.imageUrls[0]}
//                       alt={variant.color}
//                       width={80}
//                       height={80}
//                       className="rounded-md border object-cover"
//                     />
//                   )}
//                   <div>
//                     <p className="font-medium capitalize">
//                       {variant.color} / {variant.size}
//                     </p>
//                     <p className="text-sm text-gray-500">Qty: {variant.qty}</p>
//                   </div>
//                 </div>

//                 <div className="text-right">
//                   <p className="text-lg font-semibold text-primary">
//                     ₹{variant.discountedPrice}
//                   </p>
//                   {variant.discountedPrice < variant.price && (
//                     <p className="text-sm line-through text-gray-400">
//                       ₹{variant.price}
//                     </p>
//                   )}
//                 </div>

//                 <Button
//                   onClick={() =>
//                     addItem(
//                       {
//                         id: `${product.id}-${variant.id}`,
//                         name: `${product.name} (${variant.color}/${variant.size})`,
//                         price: variant.discountedPrice || variant.price,
//                         image:
//                           variant.imageUrls[0] ||
//                           "/placeholder.svg",
//                       },
//                       1
//                     )
//                   }
//                 >
//                   Add to Cart
//                 </Button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* ===== Related Products Section ===== */}
//       {relatedProducts.length > 0 && (
//         <section className="mt-10 h-[800px] w-[800px]">
//           <h2 className="text-2xl font-semibold mb-6 ">
//             More Products You Might Like
//           </h2>
//           <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//             {relatedProducts.map((p) => {
//               const img = p.variants[0]?.imageUrls?.[0] || "/placeholder.svg"
//               const price =
//                 p.variants[0]?.discountedPrice || p.variants[0]?.price || 0
//               return (
//                 <div
//                   key={p.id}
//                   className="group border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
//                 >
//                   <Link href={`/products/${p.id}`}>
//                     <div className="relative aspect-[3/4] overflow-hidden">
//                       <Image
//                         src={img}
//                         alt={p.name}
//                         fill
//                         className="object-cover group-hover:scale-105 transition-transform duration-300"
//                       />
//                     </div>
//                     <div className="p-3 space-y-1">
//                       <p className="font-medium line-clamp-1">{p.name}</p>
//                       <p className="text-sm text-gray-500 line-clamp-1">
//                         {p.category}
//                       </p>
//                       <p className="font-semibold text-primary">
//                         ₹{price.toFixed(2)}
//                       </p>
//                     </div>
//                   </Link>
//                 </div>
//               )
//             })}
//           </div>
//         </section>
//       )}
//     </main>
//   )
// }




// "use client"

// import { useParams, useRouter } from "next/navigation"
// import useSWR from "swr"
// import Image from "next/image"
// import { fetchJSON } from "@/lib/swr-fetcher"
// import { Button } from "@/components/ui/button"
// import { useCart } from "@/components/site/cart-store"
// import { BACKEND_BASE } from "@/lib/backend"
// import Link from "next/link"

// type Variant = {
//   id: number
//   color: string
//   price: number
//   discountedPrice: number
//   qty: number
//   size: string
//   imageUrls: string[]
// }

// type Product = {
//   id: number
//   name: string
//   description: string
//   category: string
//   pickupLocation: string
//   variants: Variant[]
// }

// export default function ProductDetailsPage() {
//   const { id } = useParams<{ id: string }>()
//   const router = useRouter()
//   const { addItem } = useCart()

//   const { data, error, isLoading } = useSWR<Product>(
//     id ? `${BACKEND_BASE}/product/get/${id}` : null,
//     fetchJSON
//   )

//   const { data: allProducts } = useSWR<Product[]>(
//     `${BACKEND_BASE}/product/getAll`,
//     fetchJSON
//   )

//   const handleAddToCart = async (product: Product, variant: Variant) => {
//   try {
//     const token = localStorage.getItem("userToken");
//     if (!token) {
//       alert("Please log in to add items to cart.");
//       router.push("/login");
//       return;
//     }

//     const res = await fetch(`${BACKEND_BASE}/cart/add`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`, // 👈 must match your backend expectation
//       },
//       body: JSON.stringify({
//         variantId: variant.id,
//         quantity: 1,
//       }),
//     });

//     // Check authentication failure
//     if (res.status === 401 || res.status === 403) {
//       alert("Session expired or access denied. Please log in again.");
//       localStorage.removeItem("userToken");
//       router.push("/login");
//       return;
//     }

//     const text = await res.text();

//     // Backend might return plain text on error
//     let data;
//     try {
//       data = JSON.parse(text);
//     } catch {
//       throw new Error(text);
//     }

//     if (!res.ok) throw new Error(data?.message || "Failed to add to cart");

//     alert("✅ Added to cart successfully!");
//   } catch (err: any) {
//     console.error("❌ Add to cart error:", err);
//     alert(err.message || "Something went wrong while adding to cart.");
//   }
// };



//   if (isLoading)
//     return (
//       <main className="container mx-auto px-4 py-10">
//         <div className="animate-pulse space-y-4">
//           <div className="h-[400px] w-full rounded-lg bg-muted" />
//           <div className="h-6 w-1/3 bg-muted rounded" />
//           <div className="h-4 w-1/2 bg-muted rounded" />
//         </div>
//       </main>
//     )

//   if (error)
//     return (
//       <main className="container mx-auto px-4 py-10 text-red-500">
//         Failed to load product.
//       </main>
//     )

//   if (!data) return null

//   const product = data
//   const relatedProducts =
//     allProducts?.filter((p) => String(p.id) !== String(product.id)) || []

//   return (
//     <main className="container mx-auto px-4 py-10 space-y-14">
//       <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
//         {/* Product Images */}
//         <div className="space-y-3">
//           {product.variants[0]?.imageUrls?.length > 0 ? (
//             <Image
//               src={product.variants[0].imageUrls[0]}
//               alt={product.name}
//               width={800}
//               height={800}
//               className="rounded-xl border object-cover w-full h-[480px]"
//             />
//           ) : (
//             <div className="h-[480px] w-full rounded-xl bg-muted" />
//           )}

//           <div className="grid grid-cols-5 gap-2">
//             {product.variants[0]?.imageUrls?.map((img, i) => (
//               <Image
//                 key={i}
//                 src={img}
//                 alt="Variant Image"
//                 width={100}
//                 height={100}
//                 className="rounded-md border object-cover h-20 w-20"
//               />
//             ))}
//           </div>
//         </div>

//         {/* Product Details */}
//         <div className="space-y-4">
//           <h1 className="text-3xl font-semibold">{product.name}</h1>
//           <p className="text-muted-foreground">{product.description}</p>

//           <div className="pt-4">
//             <p className="text-sm text-gray-500">
//               Category: <span className="font-medium">{product.category}</span>
//             </p>
//           </div>

//           <div className="border-t my-4" />

//           <h2 className="text-lg font-semibold">Available Variants</h2>
//           <div className="space-y-3">
//             {product.variants.map((variant) => (
//               <div
//                 key={variant.id}
//                 className="flex flex-col md:flex-row justify-between items-center gap-4 border rounded-lg p-4 hover:shadow-sm transition"
//               >
//                 <div className="flex items-center gap-4">
//                   {variant.imageUrls[0] && (
//                     <Image
//                       src={variant.imageUrls[0]}
//                       alt={variant.color}
//                       width={80}
//                       height={80}
//                       className="rounded-md border object-cover"
//                     />
//                   )}
//                   <div>
//                     <p className="font-medium capitalize">
//                       {variant.color} / {variant.size}
//                     </p>
//                     <p className="text-sm text-gray-500">Qty: {variant.qty}</p>
//                   </div>
//                 </div>

//                 <div className="text-right">
//                   <p className="text-lg font-semibold text-primary">
//                     ₹{variant.discountedPrice}
//                   </p>
//                   {variant.discountedPrice < variant.price && (
//                     <p className="text-sm line-through text-gray-400">
//                       ₹{variant.price}
//                     </p>
//                   )}
//                 </div>

//                 <Button onClick={() => handleAddToCart(product, variant)}>
//                   Add to Cart
//                 </Button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Related Products */}
//       {relatedProducts.length > 0 && (
//         <section className="mt-10">
//           <h2 className="text-2xl font-semibold mb-6">
//             More Products You Might Like
//           </h2>
//           <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//             {relatedProducts.map((p) => {
//               const img = p.variants[0]?.imageUrls?.[0] || "/placeholder.svg"
//               const price =
//                 p.variants[0]?.discountedPrice || p.variants[0]?.price || 0
//               return (
//                 <div
//                   key={p.id}
//                   className="group border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
//                 >
//                   <Link href={`/products/${p.id}`}>
//                     <div className="relative aspect-[3/4] overflow-hidden">
//                       <Image
//                         src={img}
//                         alt={p.name}
//                         fill
//                         className="object-cover group-hover:scale-105 transition-transform duration-300"
//                       />
//                     </div>
//                     <div className="p-3 space-y-1">
//                       <p className="font-medium line-clamp-1">{p.name}</p>
//                       <p className="text-sm text-gray-500 line-clamp-1">
//                         {p.category}
//                       </p>
//                       <p className="font-semibold text-primary">
//                         ₹{price.toFixed(2)}
//                       </p>
//                     </div>
//                   </Link>
//                 </div>
//               )
//             })}
//           </div>
//         </section>
//       )}
//     </main>
//   )
// }

















"use client";

import { useParams, useRouter } from "next/navigation";
import useSWR from "swr";
import Image from "next/image";
import { fetchJSON } from "@/lib/swr-fetcher";
import { Button } from "@/components/ui/button";
import { BACKEND_BASE } from "@/lib/backend";
import Link from "next/link";

type Variant = {
  id: number;
  color: string;
  price: number;
  discountedPrice: number;
  qty: number;
  size: string;
  imageUrls: string[];
};

type Product = {
  id: number;
  name: string;
  description: string;
  category: string;
  pickupLocation: string;
  variants: Variant[];
};

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data, error, isLoading } = useSWR<Product>(
    id ? `${BACKEND_BASE}/product/get/${id}` : null,
    fetchJSON
  );

  const { data: allProducts } = useSWR<Product[]>(
    `${BACKEND_BASE}/product/getAll`,
    fetchJSON
  );

  // ✅ ADD TO CART API CALL
  const handleAddToCart = async (variant: Variant) => {
    try {
      const token = localStorage.getItem("userToken");
      if (!token) {
        alert("Please log in to add items to cart.");
        router.push("/login");
        return;
      }

      // ✅ your backend expects query params, not JSON body
      const res = await fetch(
        `${BACKEND_BASE}/cart/add?id=${variant.id}&quantity=1`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 401 || res.status === 403) {
        alert("Access denied or session expired. Please log in again.");
        localStorage.removeItem("userToken");
        router.push("/login");
        return;
      }

      const text = await res.text();

      if (!res.ok) {
        throw new Error(text || "Failed to add to cart");
      }

      alert("✅ Item added to cart successfully!");
    } catch (err: any) {
      console.error("❌ Add to cart error:", err);
      alert(err.message || "Something went wrong while adding to cart.");
    }
  };

  if (isLoading)
    return (
      <main className="container mx-auto px-4 py-10">
        <div className="animate-pulse space-y-4">
          <div className="h-[400px] w-full rounded-lg bg-muted" />
          <div className="h-6 w-1/3 bg-muted rounded" />
          <div className="h-4 w-1/2 bg-muted rounded" />
        </div>
      </main>
    );

  if (error)
    return (
      <main className="container mx-auto px-4 py-10 text-red-500">
        Failed to load product.
      </main>
    );

  if (!data) return null;

  const product = data;
  const relatedProducts =
    allProducts?.filter((p) => String(p.id) !== String(product.id)) || [];

  return (
    <main className="container mx-auto px-4 py-10 space-y-14">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {/* Product Images */}
        <div className="space-y-3">
          {product.variants[0]?.imageUrls?.length > 0 ? (
            <Image
              src={product.variants[0].imageUrls[0]}
              alt={product.name}
              width={800}
              height={800}
              className="rounded-xl border object-cover w-full h-[480px]"
            />
          ) : (
            <div className="h-[480px] w-full rounded-xl bg-muted" />
          )}

          <div className="grid grid-cols-5 gap-2">
            {product.variants[0]?.imageUrls?.map((img, i) => (
              <Image
                key={i}
                src={img}
                alt="Variant Image"
                width={100}
                height={100}
                className="rounded-md border object-cover h-20 w-20"
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-4">
          <h1 className="text-3xl font-semibold">{product.name}</h1>
          <p className="text-muted-foreground">{product.description}</p>

          <div className="pt-4">
            <p className="text-sm text-gray-500">
              Category: <span className="font-medium">{product.category}</span>
            </p>
          </div>

          <div className="border-t my-4" />

          <h2 className="text-lg font-semibold">Available Variants</h2>
          <div className="space-y-3">
            {product.variants.map((variant) => (
              <div
                key={variant.id}
                className="flex flex-col md:flex-row justify-between items-center gap-4 border rounded-lg p-4 hover:shadow-sm transition"
              >
                <div className="flex items-center gap-4">
                  {variant.imageUrls[0] && (
                    <Image
                      src={variant.imageUrls[0]}
                      alt={variant.color}
                      width={80}
                      height={80}
                      className="rounded-md border object-cover"
                    />
                  )}
                  <div>
                    <p className="font-medium capitalize">
                      {variant.color} / {variant.size}
                    </p>
                    <p className="text-sm text-gray-500">Qty: {variant.qty}</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-lg font-semibold text-primary">
                    ₹{variant.discountedPrice}
                  </p>
                  {variant.discountedPrice < variant.price && (
                    <p className="text-sm line-through text-gray-400">
                      ₹{variant.price}
                    </p>
                  )}
                </div>

                <Button onClick={() => handleAddToCart(variant)}>
                  Add to Cart
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-10">
          <h2 className="text-2xl font-semibold mb-6">
            More Products You Might Like
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {relatedProducts.map((p) => {
              const img = p.variants[0]?.imageUrls?.[0] || "/placeholder.svg";
              const price =
                p.variants[0]?.discountedPrice || p.variants[0]?.price || 0;
              return (
                <div
                  key={p.id}
                  className="group border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <Link href={`/products/${p.id}`}>
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <Image
                        src={img}
                        alt={p.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-3 space-y-1">
                      <p className="font-medium line-clamp-1">{p.name}</p>
                      <p className="text-sm text-gray-500 line-clamp-1">
                        {p.category}
                      </p>
                      <p className="font-semibold text-primary">
                        ₹{price.toFixed(2)}
                      </p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
}
