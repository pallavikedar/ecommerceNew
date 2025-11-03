"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingBag } from "lucide-react"
import { useEffect, useState } from "react"
import { BACKEND_BASE } from "@/lib/backend"

export function TopNav() {
  const [cart, setCart] = useState<any>(null)
  const [cartCount, setCartCount] = useState<number>(0)

  useEffect(() => {
    const token = localStorage.getItem("userToken")
    if (!token) return

    const fetchCart = async () => {
      try {
        const res = await fetch(`${BACKEND_BASE}/cart/count`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        })

        if (!res.ok) {
          console.error("❌ Failed to fetch cart:", res.status)
          return
        }

        const data = await res.json()
        console.log("🛒 Raw backend cart data:", data)

        /**
         * ✅ Handle different possible response structures
         * Examples:
         * { count: 3 }
         * { data: { count: 3 } }
         * { cartItems: [...] }
         * { data: { cartItems: [...] } }
         */
        const count =
          data?.count ||
          data?.data?.count ||
          data?.cartItems?.length ||
          data?.data?.cartItems?.length ||
          data?.items?.length ||
          data?.data?.items?.length ||
          0

        setCart(data)
        setCartCount(count)

        console.log("🧮 Final cart count detected:", count)
      } catch (err) {
        console.error("❌ Error fetching cart:", err)
      }
    }

    fetchCart()
  }, [])

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Brand Name */}
        <Link href="/" className="font-semibold text-lg">
          Ecommerce
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-4">
          <Link href="/products" className="text-sm hover:opacity-80">
            Products
          </Link>
          <Link href="/orders" className="text-sm hover:opacity-80">
            My Orders
          </Link>
          <Link href="/profile" className="text-sm hover:opacity-80">
            Profile
          </Link>

          {/* Cart Button */}
          <Link href="/cart" className="relative" aria-label="Cart">
            <Button
              size="sm"
              variant="secondary"
              className="gap-2 relative flex items-center"
            >
              <ShoppingBag className="size-4" />
              <span className="text-xs font-medium">Cart</span>

              {cartCount > 0 && (
                <span
                  aria-live="polite"
                  className="absolute -top-1 -right-2 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-pink-600 px-1 text-[10px] font-semibold text-white shadow-sm"
                >
                  {cartCount}
                </span>
              )}
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  )
}
