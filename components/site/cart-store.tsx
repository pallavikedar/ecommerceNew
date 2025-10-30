"use client"

import type React from "react"
import { createContext, useContext, useMemo } from "react"
import useSWR from "swr"

export type CartItem = {
  id: string
  name: string
  image: string
  price: number
  qty: number
}

type CartState = {
  items: CartItem[]
}

const CART_KEY = "shop.cart.v1"
const ORDERS_KEY = "shop.orders.v1"
const PROFILE_KEY = "shop.profile.v1"

function readLocal<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function writeLocal<T>(key: string, value: T) {
  if (typeof window === "undefined") return
  window.localStorage.setItem(key, JSON.stringify(value))
}

const CartCtx = createContext<ReturnType<typeof createCartAPI> | null>(null)

function createCartAPI(cart: CartState, setCart: (next: CartState) => void) {
  const addItem = (item: Omit<CartItem, "qty">, qty = 1) => {
    const existing = cart.items.find((i) => i.id === item.id)
    const items = existing
      ? cart.items.map((i) => (i.id === item.id ? { ...i, qty: i.qty + qty } : i))
      : [...cart.items, { ...item, qty }]
    setCart({ items })
  }

  const removeItem = (id: string) => {
    setCart({ items: cart.items.filter((i) => i.id !== id) })
  }

  const updateQty = (id: string, qty: number) => {
    if (qty <= 0) return removeItem(id)
    setCart({ items: cart.items.map((i) => (i.id === id ? { ...i, qty } : i)) })
  }

  const clear = () => setCart({ items: [] })

  const count = cart.items.reduce((sum, i) => sum + i.qty, 0)
  const subtotal = cart.items.reduce((sum, i) => sum + i.qty * i.price, 0)

  return { cart, addItem, removeItem, updateQty, clear, count, subtotal }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { data, mutate } = useSWR<CartState>(CART_KEY, () => readLocal(CART_KEY, { items: [] }), {
    fallbackData: { items: [] },
  })

  const setCart = (next: CartState) => {
    writeLocal(CART_KEY, next)
    mutate(next, false)
  }

  const api = useMemo(() => createCartAPI(data!, setCart), [data])

  return <CartCtx.Provider value={api}>{children}</CartCtx.Provider>
}

export function useCart() {
  const ctx = useContext(CartCtx)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}

// Orders/profile helpers
export type Order = {
  id: string
  createdAt: string
  items: CartItem[]
  subtotal: number
  shipping: number
  total: number
  customer: {
    name: string
    email: string
    address: string
    city: string
    country: string
    zip: string
  }
}

export function saveOrder(order: Order) {
  const orders = readLocal<Order[]>(ORDERS_KEY, [])
  const next = [order, ...orders]
  writeLocal(ORDERS_KEY, next)
}

export function loadOrders(): Order[] {
  return readLocal<Order[]>(ORDERS_KEY, [])
}

export type Profile = {
  name: string
  email: string
  phone?: string
  address?: string
  city?: string
  country?: string
  zip?: string
}

export function loadProfile(): Profile {
  return readLocal<Profile>(PROFILE_KEY, { name: "", email: "" })
}

export function saveProfile(profile: Profile) {
  writeLocal(PROFILE_KEY, profile)
}
