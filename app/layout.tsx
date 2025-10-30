import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { CartProvider } from "@/components/site/cart-store"
import { TopNav } from "@/components/site/top-nav"
import { BrowserRouter } from "react-router-dom"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.app",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <BrowserRouter>
        <CartProvider>
          <TopNav />
          {children}
        </CartProvider>
        </BrowserRouter>
        <Analytics />
      </body>
    </html>
  )
}
