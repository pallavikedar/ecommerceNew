// "use client"

// import type React from "react"
// import { createContext, useContext, useMemo } from "react"
// import useSWR from "swr"

// export type CartItem = {
//   id: string
//   name: string
//   image: string
//   price: number
//   qty: number
// }

// type CartState = {
//   items: CartItem[]
// }

// const CART_KEY = "shop.cart.v1"
// const ORDERS_KEY = "shop.orders.v1"
// const PROFILE_KEY = "shop.profile.v1"

// function readLocal<T>(key: string, fallback: T): T {
//   if (typeof window === "undefined") return fallback
//   try {
//     const raw = window.localStorage.getItem(key)
//     return raw ? (JSON.parse(raw) as T) : fallback
//   } catch {
//     return fallback
//   }
// }

// function writeLocal<T>(key: string, value: T) {
//   if (typeof window === "undefined") return
//   window.localStorage.setItem(key, JSON.stringify(value))
// }

// const CartCtx = createContext<ReturnType<typeof createCartAPI> | null>(null)

// function createCartAPI(cart: CartState, setCart: (next: CartState) => void) {
//   const addItem = (item: Omit<CartItem, "qty">, qty = 1) => {
//     const existing = cart.items.find((i) => i.id === item.id)
//     const items = existing
//       ? cart.items.map((i) => (i.id === item.id ? { ...i, qty: i.qty + qty } : i))
//       : [...cart.items, { ...item, qty }]
//     setCart({ items })
//   }

//   const removeItem = (id: string) => {
//     setCart({ items: cart.items.filter((i) => i.id !== id) })
//   }

//   const updateQty = (id: string, qty: number) => {
//     if (qty <= 0) return removeItem(id)
//     setCart({ items: cart.items.map((i) => (i.id === id ? { ...i, qty } : i)) })
//   }

//   const clear = () => setCart({ items: [] })

//   const count = cart.items.reduce((sum, i) => sum + i.qty, 0)
//   const subtotal = cart.items.reduce((sum, i) => sum + i.qty * i.price, 0)

//   return { cart, addItem, removeItem, updateQty, clear, count, subtotal }
// }

// export function CartProvider({ children }: { children: React.ReactNode }) {
//   const { data, mutate } = useSWR<CartState>(CART_KEY, () => readLocal(CART_KEY, { items: [] }), {
//     fallbackData: { items: [] },
//   })

//   const setCart = (next: CartState) => {
//     writeLocal(CART_KEY, next)
//     mutate(next, false)
//   }

//   const api = useMemo(() => createCartAPI(data!, setCart), [data])

//   return <CartCtx.Provider value={api}>{children}</CartCtx.Provider>
// }

// export function useCart() {
//   const ctx = useContext(CartCtx)
//   if (!ctx) throw new Error("useCart must be used within CartProvider")
//   return ctx
// }

// // Orders/profile helpers
// export type Order = {
//   id: string
//   createdAt: string
//   items: CartItem[]
//   subtotal: number
//   shipping: number
//   total: number
//   customer: {
//     name: string
//     email: string
//     address: string
//     city: string
//     country: string
//     zip: string
//   }
// }

// export function saveOrder(order: Order) {
//   const orders = readLocal<Order[]>(ORDERS_KEY, [])
//   const next = [order, ...orders]
//   writeLocal(ORDERS_KEY, next)
// }

// export function loadOrders(): Order[] {
//   return readLocal<Order[]>(ORDERS_KEY, [])
// }

// export type Profile = {
//   name: string
//   email: string
//   phone?: string
//   address?: string
//   city?: string
//   country?: string
//   zip?: string
// }

// export function loadProfile(): Profile {
//   return readLocal<Profile>(PROFILE_KEY, { name: "", email: "" })
// }

// export function saveProfile(profile: Profile) {
//   writeLocal(PROFILE_KEY, profile)
// }



"use client"

import type React from "react"
import { createContext, useContext, useMemo, useEffect } from "react"
import useSWR from "swr"
import { BACKEND_BASE } from "@/lib/backend"

// 🛒 Cart Item Type
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

// ✅ Helpers for localStorage
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

// ✅ Core Cart Logic
function createCartAPI(cart: CartState, setCart: (next: CartState) => void) {
  const token = typeof window !== "undefined" ? localStorage.getItem("userToken") : null

  // 🆕 Add item to cart
  const addItem = async (item: Omit<CartItem, "qty">, qty = 1) => {
    const existing = cart.items.find((i) => i.id === item.id)
    const items = existing
      ? cart.items.map((i) => (i.id === item.id ? { ...i, qty: i.qty + qty } : i))
      : [...cart.items, { ...item, qty }]
    setCart({ items })

    if (!token) return console.warn("⚠️ No userToken found — saved locally only")

    try {
      await fetch(`${BACKEND_BASE}/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: item.id, quantity: qty }),
      })
    } catch (err) {
      console.error("❌ Error syncing /api/cart/add:", err)
    }
  }

  // 🗑 Remove item
  const removeItem = async (id: string) => {
    setCart({ items: cart.items.filter((i) => i.id !== id) })

    if (!token) return
    try {
      await fetch(`${BACKEND_BASE}/cart/remove`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
      })
    } catch (err) {
      console.error("❌ Error syncing /api/cart/remove:", err)
    }
  }

  // 🔁 Update quantity
  const updateQty = async (id: string, qty: number) => {
    if (qty <= 0) return removeItem(id)

    setCart({
      items: cart.items.map((i) => (i.id === id ? { ...i, qty } : i)),
    })

    if (!token) return
    try {
      await fetch(`${BACKEND_BASE}/cart/updateQuantity`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id, quantity: qty }),
      })
    } catch (err) {
      console.error("❌ Error syncing /api/cart/updateQuantity:", err)
    }
  }

  // 🧹 Clear cart
  const clear = () => setCart({ items: [] })

  // 📦 Totals
  const count = cart.items.reduce((sum, i) => sum + i.qty, 0)
  const subtotal = cart.items.reduce((sum, i) => sum + i.qty * i.price, 0)

  return { cart, addItem, removeItem, updateQty, clear, count, subtotal }
}

// ✅ Provider Setup
export function CartProvider({ children }: { children: React.ReactNode }) {
  const { data, mutate } = useSWR<CartState>(CART_KEY, () => readLocal(CART_KEY, { items: [] }), {
    fallbackData: { items: [] },
  })

  const setCart = (next: CartState) => {
    writeLocal(CART_KEY, next)
    mutate(next, false)
  }

  const api = useMemo(() => createCartAPI(data!, setCart), [data])

  // 🧠 On mount — load cart from backend if logged in
  useEffect(() => {
    const token = localStorage.getItem("userToken")
    if (!token) return

    const fetchCart = async () => {
      try {
        const res = await fetch(`${BACKEND_BASE}/cart/view`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (res.ok) {
          const data = await res.json()
          // Assuming backend returns items in the same shape
          setCart({ items: data.items || [] })
        }
      } catch (err) {
        console.error("❌ Error fetching /api/cart/view:", err)
      }
    }

    fetchCart()
  }, [])

  return <CartCtx.Provider value={api}>{children}</CartCtx.Provider>
}

// ✅ Hook for using Cart anywhere
export function useCart() {
  const ctx = useContext(CartCtx)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}

// 🧾 Orders/Profile Management
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

// 👤 Profile Management
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
