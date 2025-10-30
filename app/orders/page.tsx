"use client"

import { useEffect, useState } from "react"
import { loadOrders, type Order } from "@/components/site/cart-store"
import { formatINR } from "@/lib/format"

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    setOrders(loadOrders())
  }, [])

  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-sm text-muted-foreground">No orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((o) => (
            <article key={o.id} className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-medium">Order #{o.id}</h2>
                <span className="text-sm">{new Date(o.createdAt).toLocaleString()}</span>
              </div>
              <div className="mt-3 divide-y">
                {o.items.map((it) => (
                  <div key={it.id} className="flex items-center justify-between py-2 text-sm">
                    <span>
                      {it.name} × {it.qty}
                    </span>
                    <span>{formatINR(it.price * it.qty)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex items-center justify-end gap-6 text-sm">
                <span>Subtotal: {formatINR(o.subtotal)}</span>
                <span>Shipping: {formatINR(o.shipping)}</span>
                <span className="font-semibold">Total: {formatINR(o.total)}</span>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  )
}
