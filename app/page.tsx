import Header from "@/components/site/header"
import HeroCarousel from "@/components/site/hero-carousel"
import CategoryStrip from "@/components/site/category-strip"
import ProductGrid from "@/components/site/product-grid"
import BannerMarquee from "@/components/site/banner-marquee"
import Footer from "@/components/site/footer"

export default function HomePage() {
  return (
    <main>
      <Header />
      <HeroCarousel />
      <section aria-labelledby="categories" className="mx-auto max-w-7xl px-4 py-8 md:py-10">
        <h2 id="categories" className="mb-4 text-pretty text-2xl font-semibold tracking-tight">
          Shop by Category
        </h2>
        <CategoryStrip />
      </section>

      <section aria-labelledby="bestsellers" className="mx-auto max-w-7xl px-4 py-8 md:py-12">
        <div className="mb-4 flex items-end justify-between">
          <h2 id="bestsellers" className="text-pretty text-2xl font-semibold tracking-tight">
            Bestsellers
          </h2>
          <a href="#" className="text-sm font-medium text-primary hover:opacity-80">
            View all
          </a>
        </div>
                <ProductGrid />
      </section>

      <BannerMarquee />

      <section aria-labelledby="new-arrivals" className="mx-auto max-w-7xl px-4 py-8 md:py-12">
        <div className="mb-4 flex items-end justify-between">
          <h2 id="new-arrivals" className="text-pretty text-2xl font-semibold tracking-tight">
            New Arrivals
          </h2>
          <a href="#" className="text-sm font-medium text-primary hover:opacity-80">
            View all
          </a>
        </div>
        <ProductGrid />
      </section>

      <Footer />
    </main>
  )
}
