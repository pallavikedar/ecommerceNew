export type Product = {
  id: string
  name: string
  price: number
  image: string
  description: string
  badges?: string[]
}

export const PRODUCTS: Product[] = [
  {
    id: "lip-velvet-01",
    name: "Velvet Matte Lipstick",
    price: 999,
    image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?q=80&w=1800&auto=format&fit=crop",
    description: "Feather-light velvet matte formula with rich color payoff and all-day comfort.",
    badges: ["Bestseller", "Vegan"],
  },
  {
    id: "liner-ink-02",
    name: "Precision Ink Liner",
    price: 749,
    image: "https://images.unsplash.com/photo-1616394584738-fc6e6121d7d3?q=80&w=1800&auto=format&fit=crop",
    description: "Ultra-black, smudge-resistant liner for crisp wings and tightlines.",
    badges: ["Waterproof"],
  },
  {
    id: "serum-glow-03",
    name: "Radiance Glow Serum",
    price: 1299,
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1800&auto=format&fit=crop",
    description: "Vitamin C boosted serum for luminous, even-toned skin with daily use.",
    badges: ["New", "Derm Tested"],
  },
  {
    id: "palette-rose-04",
    name: "Rose Crush Palette",
    price: 1599,
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=1800&auto=format&fit=crop",
    description: "12-pan eyeshadow palette with buttery mattes and sparkling shimmers.",
  },
]

export function getById(id: string) {
  return PRODUCTS.find((p) => p.id === id)
}
