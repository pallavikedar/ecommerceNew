"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function SuccessPage() {
  return (
    <main className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-2xl font-semibold">Payment Successful</h1>
      <p className="mt-2 text-muted-foreground">Thank you! Your order has been placed.</p>
      <div className="mt-6 flex items-center justify-center gap-3">
        <Link href="/orders">
          <Button>View Orders</Button>
        </Link>
        <Link href="/products">
          <Button variant="secondary">Continue Shopping</Button>
        </Link>
      </div>
    </main>
  )
}
