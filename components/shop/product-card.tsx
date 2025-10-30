"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { formatCurrency } from "@/lib/format"
import { useCart } from "@/components/store/cart-store"

export type ApiProduct = {
  id: string | number
  name?: string
  title?: string
  price?: number
  image?: string
  thumbnail?: string
  images?: string[]
  description?: string
}

export function ProductCard({ p }: { p: ApiProduct }) {
  const { add } = useCart()
  const id = String(p.id)
  const name = p.name || p.title || "Product"
  const price = typeof p.price === "number" ? p.price : 0
  const img = p.image || p.thumbnail || p.images?.[0] || "/cosmetics-product-photo.jpg"

  return (
    <Card className="group overflow-hidden">
      <CardHeader className="p-0">
        {/* Use next/image with fill for better perf; fallback to placeholder */}
        <div className="relative aspect-square w-full overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img || "/placeholder.svg"}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            crossOrigin="anonymous"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="line-clamp-1 font-medium">{name}</div>
        <div className="text-sm opacity-70">{formatCurrency(price)}</div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" onClick={() => add({ id, name, price, image: img }, 1)}>
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
