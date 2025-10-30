"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const categories = [
  {
    name: "Lipstick",
    img: "https://images.unsplash.com/photo-1580136579312-94651dfd596d?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Foundation",
    img: "https://images.unsplash.com/photo-1600803907087-f56d462fd26d?q=80&w=800&auto=format&fit=crop",
  },
  { name: "Eyes", img: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=800&auto=format&fit=crop" },
  {
    name: "Skincare",
    img: "https://images.unsplash.com/photo-1530971013997-e06bb52a2372?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Combos",
    img: "https://images.unsplash.com/photo-1585386959984-a4155223168f?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Brushes",
    img: "https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Nails",
    img: "https://images.unsplash.com/photo-1582582494700-76a1225cf272?q=80&w=800&auto=format&fit=crop",
  },
]

export default function CategoryStrip() {
  return (
    <div className="relative">
      <div className="flex snap-x snap-mandatory items-stretch gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {categories.map((c, idx) => (
          <motion.a
            key={idx}
            href="#"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
            className="group inline-flex snap-start flex-col items-center gap-2 rounded-lg border bg-card px-4 py-3"
          >
            <div className="relative size-16 overflow-hidden rounded-full">
              <Image
                src={c.img || "/placeholder.svg"}
                alt={`${c.name} category`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <span className="text-xs font-medium">{c.name}</span>
          </motion.a>
        ))}
      </div>
    </div>
  )
}
