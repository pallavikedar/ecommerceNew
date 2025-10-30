import { ProductCard, type ApiProduct } from "./product-card"

export function ProductGrid({ products }: { products: ApiProduct[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((p) => (
        <ProductCard key={String(p.id)} p={p} />
      ))}
    </div>
  )
}
