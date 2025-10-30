"use client"

import Link from "next/link"
import { useCart } from "./cart-store"
import { Button } from "@/components/ui/button"
import { ShoppingBag } from "lucide-react"

export function TopNav() {
  const { count } = useCart()
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="font-semibold text-lg text-pretty">
          RENEE Inspired
        </Link>

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
          <Link href="/cart" className="relative" aria-label="Cart">
            <Button size="sm" variant="secondary" className="gap-2">
              <ShoppingBag className="size-4" />
              <span className="sr-only">Cart</span>
              <span className="text-xs">Cart</span>
              <span
                aria-live="polite"
                className="ml-1 inline-flex min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-medium text-primary-foreground"
              >
                {count}
              </span>
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  )
}
