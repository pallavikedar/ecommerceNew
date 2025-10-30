"use client"

import useSWR from "swr"
import { backendPath, endpoints } from "./backend"
import { jsonFetcher, jsonPoster } from "./swr-fetcher"

// Types below are examples. Adjust to your Swagger schemas if different.
export type Product = {
  id: string | number
  name: string
  price: number
  image?: string
  description?: string
  [k: string]: any
}

export type OrderItem = {
  productId: string | number
  name: string
  price: number
  qty: number
}

export type Order = {
  id?: string | number
  items: OrderItem[]
  total: number
  status?: string
  createdAt?: string
  [k: string]: any
}

export type UserProfile = {
  id: string | number
  name: string
  email?: string
  avatar?: string
  [k: string]: any
}

export function useProducts() {
  return useSWR<Product[]>(backendPath(endpoints.products), jsonFetcher)
}

export function useProduct(id?: string | number) {
  const key = id ? backendPath(endpoints.productById(id)) : null
  return useSWR<Product>(key, jsonFetcher)
}

export function useCategories<T = any[]>() {
  return useSWR<T>(backendPath(endpoints.categories), jsonFetcher)
}

export function useOrders<T = Order[]>() {
  return useSWR<T>(backendPath(endpoints.orders), jsonFetcher)
}

export function useProfile() {
  return useSWR<UserProfile>(backendPath(endpoints.me), jsonFetcher)
}

export async function createOrder(order: Order) {
  return jsonPoster<Order>(backendPath(endpoints.orders), order)
}
