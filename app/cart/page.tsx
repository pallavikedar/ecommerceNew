"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "@/components/site/cart-store"
import { formatINR } from "@/lib/format"

export default function CartPage() {
  const { cart, updateQty, removeItem, subtotal } = useCart()
  const shipping = cart.items.length > 0 ? 99 : 0
  const total = subtotal + shipping

  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6">Your Cart</h1>

      {cart.items.length === 0 ? (
        <div className="text-sm text-muted-foreground">
          Cart is empty.{" "}
          <Link href="/products" className="underline">
            Browse products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <section className="lg:col-span-2 space-y-6">
            {cart.items.map((i) => (
              <div key={i.id} className="flex items-center gap-4 rounded-lg border p-3">
                <Image
                  src={i.image || "/placeholder.svg"}
                  alt={i.name}
                  width={96}
                  height={96}
                  className="size-24 rounded object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-medium">{i.name}</h2>
                    <span className="text-sm font-semibold">{formatINR(i.price)}</span>
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    <label htmlFor={`qty-${i.id}`} className="sr-only">
                      Quantity
                    </label>
                    <Input
                      id={`qty-${i.id}`}
                      type="number"
                      min={1}
                      value={i.qty}
                      onChange={(e) => updateQty(i.id, Number(e.target.value))}
                      className="w-20"
                    />
                    <Button variant="ghost" size="sm" onClick={() => removeItem(i.id)}>
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </section>

          <aside className="space-y-3 rounded-lg border p-4 h-fit">
            <div className="flex items-center justify-between text-sm">
              <span>Subtotal</span>
              <span>{formatINR(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Shipping</span>
              <span>{formatINR(shipping)}</span>
            </div>
            <div className="flex items-center justify-between text-sm font-semibold">
              <span>Total</span>
              <span>{formatINR(total)}</span>
            </div>
            <Link href="/checkout">
              <Button className="w-full mt-2">Checkout</Button>
            </Link>
            <Link href="/products">
              <Button variant="secondary" className="w-full">
                Continue Shopping
              </Button>
            </Link>
          </aside>
        </div>
      )}
    </main>
  )
}
