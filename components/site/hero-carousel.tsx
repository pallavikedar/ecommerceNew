"use client"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Image from "next/image"

const slides = [
  {
    src: "https://images.unsplash.com/photo-1580136579312-94651dfd596d?q=80&w=2000&auto=format&fit=crop",
    alt: "Makeup essentials flatlay",
    headline: "Bold. Clean. You.",
    sub: "High-performance beauty for every day.",
    cta: "Shop Bestsellers",
  },
  {
    src: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=2000&auto=format&fit=crop",
    alt: "Model with vibrant lipstick",
    headline: "Statement Lips",
    sub: "Ultra-matte, long-wear pigments.",
    cta: "Explore Lipsticks",
  },
  {
    src: "https://images.unsplash.com/photo-1522335789203-9ed94b85f9f3?q=80&w=2000&auto=format&fit=crop",
    alt: "Skincare and serums",
    headline: "Skin First",
    sub: "Lightweight skincare with results.",
    cta: "Discover Skincare",
  },
]

export default function HeroCarousel() {
  return (
    <section aria-label="Featured banners" className="relative">
      <div className="mx-auto max-w-7xl px-4">
        <div className="relative">
          <Carousel opts={{ loop: true, align: "start" }} className="w-full">
            <CarouselContent>
              {slides.map((s, i) => (
                <CarouselItem key={i}>
                  <div className="relative aspect-[21/9] w-full overflow-hidden rounded-xl">
                    <Image
                      src={s.src || "/placeholder.svg"}
                      alt={s.alt}
                      fill
                      className="object-cover"
                      priority={i === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/20 to-transparent" />
                    <motion.div
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      viewport={{ once: true }}
                      className="absolute bottom-6 left-6 max-w-xl md:bottom-10 md:left-10"
                    >
                      <h1 className="text-pretty text-2xl font-semibold tracking-tight md:text-4xl">{s.headline}</h1>
                      <p className="mt-2 text-sm opacity-80 md:text-base">{s.sub}</p>
                      <div className="mt-4">
                        <Button size="lg">{s.cta}</Button>
                      </div>
                    </motion.div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 md:-left-12" />
            <CarouselNext className="right-2 md:-right-12" />
          </Carousel>
        </div>
      </div>
    </section>
  )
}
