"use client"

import useSWR from "swr"
import { useCallback } from "react"

type CartItem = {
  id: string
  name: string
  price: number
  image?: string
  qty: number
}
type Order = {
  id: string
  items: CartItem[]
  total: number
  createdAt: string
  status: "paid" | "processing"
}
type Profile = {
  name?: string
  email?: string
  address?: string
}

const fetcher = (key: string) => {
  if (typeof window === "undefined") return null
  const v = window.localStorage.getItem(key)
  try {
    return v ? JSON.parse(v) : null
  } catch {
    return null
  }
}
const persist = (key: string, val: any) => {
  if (typeof window === "undefined") return
  window.localStorage.setItem(key, JSON.stringify(val))
}

export function useCart() {
  const { data: items = [], mutate } = useSWR<CartItem[]>("cart", fetcher)
  const itemsCount = items.reduce((n, it) => n + it.qty, 0)
  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0)

  const add = useCallback(
    (p: Omit<CartItem, "qty">, qty = 1) => {
      mutate(
        (prev = []) => {
          const idx = prev.findIndex((i) => i.id === p.id)
          const next = [...prev]
          if (idx >= 0) next[idx] = { ...next[idx], qty: next[idx].qty + qty }
          else next.push({ ...p, qty })
          persist("cart", next)
          return next
        },
        { revalidate: false },
      )
    },
    [mutate],
  )

  const remove = useCallback(
    (id: string) => {
      mutate(
        (prev = []) => {
          const next = (prev || []).filter((i) => i.id !== id)
          persist("cart", next)
          return next
        },
        { revalidate: false },
      )
    },
    [mutate],
  )

  const setQty = useCallback(
    (id: string, qty: number) => {
      mutate(
        (prev = []) => {
          const next = [...prev]
          const idx = next.findIndex((i) => i.id === id)
          if (idx >= 0) {
            if (qty <= 0) next.splice(idx, 1)
            else next[idx] = { ...next[idx], qty }
          }
          persist("cart", next)
          return next
        },
        { revalidate: false },
      )
    },
    [mutate],
  )

  const clear = useCallback(() => {
    persist("cart", [])
    mutate([], { revalidate: false })
  }, [mutate])

  return { items, itemsCount, subtotal, add, remove, setQty, clear }
}

export function useOrders() {
  const { data: orders = [], mutate } = useSWR<Order[]>("orders", fetcher)
  const addOrder = useCallback(
    (o: Order) => {
      mutate(
        (prev = []) => {
          const next = [o, ...prev]
          persist("orders", next)
          return next
        },
        { revalidate: false },
      )
    },
    [mutate],
  )
  return { orders, addOrder }
}

export function useProfile() {
  const { data: profile = {}, mutate } = useSWR<Profile>("profile", fetcher)
  const update = useCallback(
    (p: Profile) => {
      persist("profile", p)
      mutate(p, { revalidate: false })
    },
    [mutate],
  )
  return { profile, update }
}
