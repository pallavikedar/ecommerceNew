// "use client"

// import ProductCard from "./product-card"

// const products = [
//   {
//     id: "1",
//     name: "Matte Liquid Lipstick - Crimson",
//     price: 499,
//     rating: 4.6,
//     image: "https://images.unsplash.com/photo-1585238342028-4bbc91a30fa1?q=80&w=1200&auto=format&fit=crop",
//   },
//   {
//     id: "2",
//     name: "Lightweight Serum Foundation",
//     price: 799,
//     rating: 4.4,
//     image: "https://images.unsplash.com/photo-1596464716121-d8f4f5f00c8b?q=80&w=1200&auto=format&fit=crop",
//   },
//   {
//     id: "3",
//     name: "Hydra Glow Moisturizer",
//     price: 649,
//     rating: 4.5,
//     image: "https://images.unsplash.com/photo-1571786256017-aee7a0c009b7?q=80&w=1200&auto=format&fit=crop",
//   },
//   {
//     id: "4",
//     name: "Smudge-proof Kajal",
//     price: 299,
//     rating: 4.3,
//     image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1200&auto=format&fit=crop",
//   },
//   {
//     id: "5",
//     name: "Velvet Blush Duo",
//     price: 549,
//     rating: 4.7,
//     image: "https://images.unsplash.com/photo-1522335789203-9ed94b85f9f3?q=80&w=1200&auto=format&fit=crop",
//   },
//   {
//     id: "6",
//     name: "All-Day Setting Spray",
//     price: 399,
//     rating: 4.2,
//     image: "https://images.unsplash.com/photo-1547887537-6158d64c9b8a?q=80&w=1200&auto=format&fit=crop",
//   },
// ]

// const newArrivals = [
//   {
//     id: "7",
//     name: "Tinted Lip Oil",
//     price: 599,
//     rating: 4.5,
//     image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?q=80&w=1200&auto=format&fit=crop",
//   },
//   {
//     id: "8",
//     name: "Vitamin C Brightening Serum",
//     price: 899,
//     rating: 4.6,
//     image: "https://images.unsplash.com/photo-1611933157661-3b6a50ce5b07?q=80&w=1200&auto=format&fit=crop",
//   },
//   {
//     id: "9",
//     name: "Brow Definer Pencil",
//     price: 349,
//     rating: 4.1,
//     image: "https://images.unsplash.com/photo-1602276507500-027f5d8828d2?q=80&w=1200&auto=format&fit=crop",
//   },
//   {
//     id: "10",
//     name: "Cushion Foundation Compact",
//     price: 999,
//     rating: 4.8,
//     image: "https://images.unsplash.com/photo-1609667081321-c61dcdf85ae0?q=80&w=1200&auto=format&fit=crop",
//   },
//   {
//     id: "11",
//     name: "Cooling Eye Gel",
//     price: 549,
//     rating: 4.3,
//     image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=1200&auto=format&fit=crop",
//   },
//   {
//     id: "12",
//     name: "Sheer Highlighter Stick",
//     price: 499,
//     rating: 4.4,
//     image: "https://images.unsplash.com/photo-1596151254670-79b098d0e2ef?q=80&w=1200&auto=format&fit=crop",
//   },
// ]

// export default function ProductGrid({ variant }: { variant?: "new" | "best" } = {}) {
//   const data = variant === "new" ? newArrivals : products

//   return (
//     <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
//       {data.map((p) => (
//         <ProductCard key={p.id} p={p} />
//       ))}
//     </div>
//   )
// }


"use client"

import { useEffect, useState } from "react"
import ProductCard from "./product-card"
import { BACKEND_BASE } from "@/lib/backend"

type Variant = {
  id: number
  color: string
  price: number
  discountedPrice: number
  qty: number
  size: string
  imageUrls: string[]
}

type APIProduct = {
  id: number
  name: string
  description: string
  category: string
  pickupLocation: string
  variants: Variant[]
}

type Product = {
  id: string
  name: string
  price: number
  rating: number
  image: string
}

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${BACKEND_BASE}/product/getAll`)
      .then((res) => res.json())
      .then((data: APIProduct[]) => {
        const formatted = data.map((p) => ({
          id: p.id.toString(),
          name: p.name,
          price: p.variants[0]?.discountedPrice || p.variants[0]?.price || 0,
          rating: Math.random() * 2 + 3, // Fake rating between 3.0–5.0
          image: p.variants[0]?.imageUrls?.[0] || "/placeholder.svg",
        }))
        setProducts(formatted)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Error fetching products:", err)
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="p-6 text-center text-gray-500">Loading products...</div>

  if (products.length === 0) return <div className="p-6 text-center text-gray-500">No products found.</div>

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 p-4">
      {products.map((p) => (
        <ProductCard key={p.id} p={p} />
      ))}
    </div>
  )
}
