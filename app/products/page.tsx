"use client"

import { useMemo, useState } from "react"
import useSWR from "swr"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { fetchJSON } from "@/lib/swr-fetcher"
import { formatINR } from "@/lib/format"
import { useCart } from "@/components/site/cart-store"
import { BACKEND_BASE } from "@/lib/backend"
// API Product Type
type ApiProduct = {
  id: number
  name: string
  description?: string | null
  category?: string | null
  pickupLocation?: string | null
  variants?: {
    id: number
    color?: string | null
    price?: number
    discountedPrice?: number
    qty?: number
    size?: string | null
    imageUrls?: string[]
  }[]
}

// Normalize data safely
function normalize(p: ApiProduct) {
  const id = p.id
  const name = p.name || "Unnamed Product"
  const description = p.description || ""
  const category = p.category || "Uncategorized"
  const firstVariant = p.variants?.[0]
  const price = firstVariant?.discountedPrice || firstVariant?.price || 0
  const image = firstVariant?.imageUrls?.[0] || "/placeholder.svg"

  return { id, name, description, category, price, image }
}

export default function ProductsPage() {
  const { addItem } = useCart()
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const { data, error, isLoading } = useSWR<ApiProduct[]>(`${BACKEND_BASE}/product/getAll`, fetchJSON)

  const products = (data ?? []).map(normalize)

  const categories = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.category))).filter(Boolean)
  }, [products])

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const name = p.name ?? ""
      const desc = p.description ?? ""
      const category = p.category ?? ""

      const matchesCategory =
        !categoryFilter || category.toLowerCase() === categoryFilter.toLowerCase()
      const matchesSearch =
        !search ||
        name.toLowerCase().includes(search.toLowerCase()) ||
        desc.toLowerCase().includes(search.toLowerCase())

      return matchesCategory && matchesSearch
    })
  }, [products, categoryFilter, search])

  // ✅ Now conditionally render, but hooks above never change order
  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error loading products</div>
  }

  return (
    <main className="container mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-semibold">Explore Products</h1>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-64"
          />

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Product Grid */}
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((p) => (
          <article
            key={p.id}
            className="group overflow-hidden rounded-lg border bg-card text-card-foreground transition hover:shadow-lg"
          >
            <Link href={`/products/${encodeURIComponent(p.id)}`} className="block overflow-hidden">
              <Image
                src={p.image}
                alt={p.name}
                width={600}
                height={400}
                className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </Link>

            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <h2 className="text-base font-medium line-clamp-1">{p.name}</h2>
                <span className="text-sm font-semibold">{p.price}</span>
              </div>

              {p.description && (
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{p.description}</p>
              )}

              <div className="mt-4 flex items-center gap-2">
                <Link href={`/products/${encodeURIComponent(p.id)}`}>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </Link>
                <Button
                  size="sm"
                  onClick={() => addItem({ id: p.id, name: p.name, price: p.price, image: p.image }, 1)}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* No Results */}
      {filteredProducts.length === 0 && (
        <div className="text-center text-muted-foreground mt-10">
          No products found matching your criteria.
        </div>
      )}
    </main>
  )
}
