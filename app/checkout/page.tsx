"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useCart } from "@/components/site/cart-store"
import { formatINR } from "@/lib/format"
import { BACKEND_BASE } from "@/lib/backend"

export default function CheckoutPage() {
  const { cart, subtotal, clear } = useCart()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState<string | null>(null)

  const shipping = 99
  const total = subtotal + shipping

  // ✅ Check userToken on mount
  useEffect(() => {
    const userToken = localStorage.getItem("userToken")
    if (!userToken) {
      router.push("/login")
    } else {
      setToken(userToken)
    }
  }, [router])

  if (!token) {
    return (
      <main className="container mx-auto px-4 py-10">
        <p>Checking authentication...</p>
      </main>
    )
  }

  if (cart.items.length === 0) {
    return (
      <main className="container mx-auto px-4 py-10">
        <p className="text-sm text-muted-foreground">Your cart is empty.</p>
      </main>
    )
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const addressData = {
      fullName: formData.get("name"),
      street: formData.get("address"),
      city: formData.get("city"),
      state: formData.get("state"),
      zipCode: formData.get("zip"),
      country: formData.get("country"),
      phoneNumber: formData.get("phone"),
    }

    try {
      // ✅ Step 1: Add Address
      const addressRes = await fetch(`${BACKEND_BASE}/Address/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(addressData),
      })

      if (addressRes.status === 401) {
        router.push("/login")
        return
      }

      const address = await addressRes.json()
      const shippingAddressId = address?.id

      // ✅ Step 2: Create Razorpay Order (Backend should return order_id)
      const orderRes = await fetch(`${BACKEND_BASE}/order/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: total * 100, // Razorpay amount in paise
          currency: "INR",
        }),
      })

      const orderData = await orderRes.json()
      const razorpayOrderId = orderData.razorpayOrderId

      // ✅ Step 3: Open Razorpay Payment Modal
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: total * 100,
        currency: "INR",
        name: "Your Store",
        description: "Order Payment",
        order_id: razorpayOrderId,
        handler: async function (response: any) {
          // ✅ Step 4: Verify payment
          const verifyRes = await fetch(`${BACKEND_BASE}/order/verify`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            }),
          })

          const verifyData = await verifyRes.json()

          if (verifyRes.ok) {
            // ✅ Step 5: Place the order
            const placeRes = await fetch(`${BACKEND_BASE}/api/order/place`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                userId: verifyData.userId,
                shippingAddressId,
                paymentMethod: "Razorpay",
                items: cart.items.map((item) => ({
                  productId: item.product.id,
                  variantId: item.variant?.id || 0,
                  quantity: item.quantity,
                })),
              }),
            })

            if (placeRes.ok) {
              clear()
              router.push("/success")
            } else {
              alert("Failed to place order")
            }
          } else {
            alert("Payment verification failed")
          }
        },
        theme: {
          color: "#3399cc",
        },
      }

      const razorpay = new (window as any).Razorpay(options)
      razorpay.open()
    } catch (error) {
      console.error(error)
      alert("Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6">Checkout</h1>

      <form onSubmit={onSubmit} className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <section className="space-y-4 lg:col-span-2">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" required />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" required />
            </div>
          </div>
          <div>
            <Label htmlFor="address">Street Address</Label>
            <Textarea id="address" name="address" rows={3} required />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <Label htmlFor="city">City</Label>
              <Input id="city" name="city" required />
            </div>
            <div>
              <Label htmlFor="state">State</Label>
              <Input id="state" name="state" required />
            </div>
            <div>
              <Label htmlFor="zip">ZIP</Label>
              <Input id="zip" name="zip" required />
            </div>
          </div>
          <div>
            <Label htmlFor="country">Country</Label>
            <Input id="country" name="country" required />
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
