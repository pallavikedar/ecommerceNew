"use client"

import { useParams, useRouter } from "next/navigation"
import useSWR from "swr"
import Image from "next/image"
import { fetchJSON } from "@/lib/swr-fetcher"
import { formatINR } from "@/lib/format"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/site/cart-store"

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
  return { id, name, price: priceNum || 0, image, description }
}

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const { addItem } = useCart()

  // IMPORTANT: adjust path to match your product details endpoint if different.
  const { data, error, isLoading } = useSWR<ApiProduct>(id ? `/api/product/get/{id}/${id}` : null, fetchJSON)

  if (isLoading) {
    return (
      <main className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="h-[480px] w-full animate-pulse rounded-lg border bg-muted" />
          <div className="space-y-4">
            <div className="h-7 w-1/2 animate-pulse rounded bg-muted" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
            <div className="h-8 w-24 animate-pulse rounded bg-muted" />
          </div>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="container mx-auto px-4 py-10">
        <p className="text-sm text-destructive">Failed to load product: {error.message}</p>
      </main>
    )
  }

  if (!data) {
    return (
      <main className="container mx-auto px-4 py-10">
        <p className="text-sm text-muted-foreground">Product not found.</p>
      </main>
    )
  }

  const product = normalize(data)

  return (
    <main className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="overflow-hidden rounded-lg border">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={900}
            height={900}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <h1 className="text-2xl font-semibold">{product.name}</h1>
          {product.description ? <p className="mt-2 text-muted-foreground">{product.description}</p> : null}
          <div className="mt-4 text-xl font-semibold">{formatINR(product.price)}</div>

          <div className="mt-6 flex gap-3">
            <Button
              onClick={() =>
                addItem({ id: product.id, name: product.name, price: product.price, image: product.image }, 1)
              }
            >
              Add to Cart
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                addItem({ id: product.id, name: product.name, price: product.price, image: product.image }, 1)
                router.push("/cart")
              }}
            >
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
