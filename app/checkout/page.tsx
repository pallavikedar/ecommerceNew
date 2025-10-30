"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useCart, saveOrder, type Order } from "@/components/site/cart-store"
import { formatINR } from "@/lib/format"
import { useState } from "react"

export default function CheckoutPage() {
  const { cart, subtotal, clear } = useCart()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  if (cart.items.length === 0) {
    return (
      <main className="container mx-auto px-4 py-10">
        <p className="text-sm text-muted-foreground">Your cart is empty.</p>
      </main>
    )
  }

  const shipping = 99
  const total = subtotal + shipping

  async function onSubmit(formData: FormData) {
    setLoading(true)
    // Simulated payment
    await new Promise((r) => setTimeout(r, 900))

    const order: Order = {
      id: `ord_${Date.now()}`,
      createdAt: new Date().toISOString(),
      items: cart.items,
      subtotal,
      shipping,
      total,
      customer: {
        name: String(formData.get("name") || ""),
        email: String(formData.get("email") || ""),
        address: String(formData.get("address") || ""),
        city: String(formData.get("city") || ""),
        country: String(formData.get("country") || ""),
        zip: String(formData.get("zip") || ""),
      },
    }

    saveOrder(order)
    clear()
    router.push(`/success?orderId=${order.id}`)
  }

  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6">Checkout</h1>

      <form action={onSubmit} className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <section className="space-y-4 lg:col-span-2">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" required />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" name="email" required />
            </div>
          </div>
          <div>
            <Label htmlFor="address">Address</Label>
            <Textarea id="address" name="address" rows={3} required />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <Label htmlFor="city">City</Label>
              <Input id="city" name="city" required />
            </div>
            <div>
              <Label htmlFor="country">Country</Label>
              <Input id="country" name="country" required />
            </div>
            <div>
              <Label htmlFor="zip">ZIP</Label>
              <Input id="zip" name="zip" required />
            </div>
          </div>

          <div className="pt-2">
            <Button disabled={loading} type="submit">
              {loading ? "Processing..." : "Pay Now"}
            </Button>
          </div>
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
        </aside>
      </form>
    </main>
  )
}
