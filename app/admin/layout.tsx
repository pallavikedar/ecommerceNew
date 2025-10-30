"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [allowed, setAllowed] = useState<boolean | null>(null)

  useEffect(() => {
    // run only on client
    const role = typeof window !== "undefined" ? localStorage.getItem("roleName") : null
    if (!role || role.toLowerCase() !== "admin") {
      // not an admin -> redirect to login
      router.replace("/login")
      setAllowed(false)
      return
    }

    setAllowed(true)
  }, [router])

  // while checking, avoid flashing admin UI
  if (allowed === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-sm text-gray-500">Checking access...</div>
      </div>
    )
  }

  if (!allowed) return null

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  )
}
