"use client"

import Link from "next/link"
import Image from "next/image"
import useSWR from "swr"
import { fetchJSON } from "@/lib/swr-fetcher"
import { formatINR } from "@/lib/format"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/site/cart-store"
import { Badge } from "@/components/ui/badge"

type ApiProduct = {
  id?: string | number
  name?: string
  title?: string
  price?: number | string
  mrp?: number | string
  image?: string
  imageUrl?: string
  thumbnail?: string
  description?: string
  shortDescription?: string
  badges?: string[]
  // ...any other fields from your API
}

function normalize(p: ApiProduct) {
  const id = String(p.id ?? "")
  const name = p.name ?? p.title ?? "Product"
  const priceNum =
    typeof p.price === "string"
      ? Number.parseFloat(p.price)
      : typeof p.mrp === "string"
        ? Number.parseFloat(p.mrp)
        : ((p.price as number) ?? (p.mrp as number) ?? 0)
  const image = p.image ?? p.imageUrl ?? p.thumbnail ?? "/cosmetics-product.jpg"
  const description = p.description ?? p.shortDescription ?? ""
  const badges = Array.isArray(p.badges) ? p.badges : undefined
  return { id, name, price: priceNum || 0, image, description, badges }
}

export default function ProductsPage() {
  const { addItem } = useCart()

  // IMPORTANT: adjust "products" path to match your Swagger list endpoint if different.
  const { data, error, isLoading } = useSWR<ApiProduct[]>("/api/backend/products", fetchJSON)

  if (isLoading) {
    return (
      <main className="container mx-auto px-4 py-10">
        <h1 className="text-2xl font-semibold mb-6 text-pretty">Explore Products</h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="animate-pulse overflow-hidden rounded-lg border">
              <div className="h-56 w-full bg-muted" />
              <div className="p-4 space-y-3">
                <div className="h-4 w-2/3 bg-muted rounded" />
                <div className="h-3 w-1/2 bg-muted rounded" />
                <div className="h-8 w-32 bg-muted rounded" />
              </div>
            </div>
          ))}
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="container mx-auto px-4 py-10">
        <h1 className="text-2xl font-semibold mb-6 text-pretty">Explore Products</h1>
        <p className="text-sm text-destructive">Failed to load products: {error.message}</p>
      </main>
    )
  }

  const products = (data ?? []).map(normalize)

  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6 text-pretty">Explore Products</h1>
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <article
            key={p.id}
            className="group overflow-hidden rounded-lg border bg-card text-card-foreground transition hover:shadow-lg"
          >
            <Link href={`/products/${encodeURIComponent(p.id)}`} className="block overflow-hidden">
              <Image
                src={p.image || "/placeholder.svg"}
                alt={p.name}
                width={600}
                height={400}
                className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </Link>
            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <h2 className="text-base font-medium line-clamp-1">{p.name}</h2>
                <span className="text-sm font-semibold">{formatINR(p.price)}</span>
              </div>
              {p.description ? (
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{p.description}</p>
              ) : null}
              {p.badges && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.badges.map((b) => (
                    <Badge key={b} variant="secondary" className="text-xs">
                      {b}
                    </Badge>
                  ))}
                </div>
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
    </main>
  )
}
