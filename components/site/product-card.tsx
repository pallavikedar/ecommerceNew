// "use client"

// import { motion } from "framer-motion"
// import Image from "next/image"
// import { Card } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Star, Heart } from "lucide-react"

// type Product = {
//   id: string
//   name: string
//   price: number
//   rating: number
//   image: string
// }

// export default function ProductCard({ p }: { p: Product }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 18 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true, margin: "-40px" }}
//       transition={{ duration: 0.4, ease: "easeOut" }}
//     >
//       <Card className="group relative overflow-hidden">
//         <button
//           aria-label="Add to wishlist"
//           className="absolute right-2 top-2 z-10 rounded-full border bg-background/80 p-1.5 backdrop-blur hover:bg-background"
//         >
//           <Heart className="size-4" />
//         </button>
//         <div className="relative aspect-[3/4] w-full overflow-hidden">
//           <Image
//             src={p.image || "/placeholder.svg"}
//             alt={p.name}
//             fill
//             sizes="(max-width: 768px) 50vw, 25vw"
//             className="object-cover transition-transform duration-300 group-hover:scale-105"
//           />
//         </div>
//         <div className="space-y-1 p-3">
//           <div className="line-clamp-1 text-sm font-medium">{p.name}</div>
//           <div className="flex items-center gap-1 text-xs opacity-80">
//             <Star className="size-3.5 fill-current" />
//             <span>{p.rating.toFixed(1)}</span>
//           </div>
//           <div className="flex items-center justify-between pt-1">
//             <div className="text-sm font-semibold">₹{p.price.toFixed(0)}</div>
//             <Button size="sm" className="transition-transform group-hover:translate-y-[-2px]">
//               Add to Cart
//             </Button>
//           </div>
//         </div>
//       </Card>
//     </motion.div>
//   )
// }
"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Heart } from "lucide-react"

type Product = {
  id: string
  name: string
  price: number
  rating: number
  image: string
}

export default function ProductCard({ p }: { p: Product }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Card className="group relative overflow-hidden">
        <button
          aria-label="Add to wishlist"
          className="absolute right-2 top-2 z-10 rounded-full border bg-background/80 p-1.5 backdrop-blur hover:bg-background"
        >
          <Heart className="size-4" />
        </button>

        <div className="relative aspect-[3/4] w-full overflow-hidden">
          <Image
            src={p.image || "/placeholder.svg"}
            alt={p.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="space-y-1 p-3">
          <div className="line-clamp-1 text-sm font-medium">{p.name}</div>
          <div className="flex items-center gap-1 text-xs opacity-80">
            <Star className="size-3.5 fill-current" />
            <span>{p.rating ? p.rating.toFixed(1) : "4.0"}</span>
          </div>
          <div className="flex items-center justify-between pt-1">
            <div className="text-sm font-semibold">₹{p.price.toFixed(0)}</div>
            <Button size="sm" className="transition-transform group-hover:translate-y-[-2px]">
              Add to Cart
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
