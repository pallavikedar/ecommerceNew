"use client"

import Link from "next/link"
import Image from "next/image"
import { Menu, Search, ShoppingBag, Heart, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"

export default function Header() {
  const [query, setQuery] = useState("")

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <nav className="mt-6 grid gap-3 text-lg">
                <Link href="#" className="hover:opacity-80">
                  Bestsellers
                </Link>
                <Link href="#" className="hover:opacity-80">
                  Makeup
                </Link>
                <Link href="#" className="hover:opacity-80">
                  Skincare
                </Link>
                <Link href="#" className="hover:opacity-80">
                  New
                </Link>
                <Link href="#" className="hover:opacity-80">
                  Offers
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center gap-2">
            <Image src="/placeholder-logo.svg" width={28} height={28} alt="Brand logo" className="rounded-md" />
            <span className="text-balance text-lg font-semibold tracking-tight">Beauty Shop</span>
          </Link>
        </div>

        <div className="hidden max-w-md flex-1 md:block">
          <form
            role="search"
            className="relative"
            onSubmit={(e) => {
              e.preventDefault()
              // no-op for demo
            }}
          >
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 opacity-60" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for lipstick, foundation, combos..."
              className="pl-9"
              aria-label="Search products"
            />
          </form>
        </div>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" aria-label="Wishlist">
            <Heart className="size-5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Account">
            <User className="size-5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Cart">
            <ShoppingBag className="size-5" />
          </Button>
        </div>
      </div>

      <nav className="hidden border-t md:block">
        <div className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-2 text-sm">
          <Link href="#" className="hover:opacity-80">
            Bestsellers
          </Link>
          <Link href="#" className="hover:opacity-80">
            Makeup
          </Link>
          <Link href="#" className="hover:opacity-80">
            Skincare
          </Link>
          <Link href="#" className="hover:opacity-80">
            Combos
          </Link>
          <Link href="#" className="hover:opacity-80">
            New
          </Link>
          <Link href="#" className="hover:opacity-80">
            Offers
          </Link>
        </div>
      </nav>
    </header>
  )
}
