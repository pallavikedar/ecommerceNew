"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import { BACKEND_BASE } from "@/lib/backend";

interface Banner {
  id: number;
  name: string;
  image: string;
  category: string;
  discount: number;
  discountType: string;
  productId: number;
}

export default function HeroCarousel() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const router = useRouter();

  // ✅ Fetch all banners from backend
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await fetch(`${BACKEND_BASE}/banner/allBanner`);
        if (!res.ok) throw new Error("Failed to fetch banners");
        const data = await res.json();
        setBanners(data || []);
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };

    fetchBanners();
  }, []);

  // ✅ Handle click: Go to product list or category page
  const handleClick = (banner: Banner) => {
    if (banner.productId && banner.productId !== 0) {
      router.push(`/product/${banner.productId}`);
    } else if (banner.category) {
      router.push(`/category/${encodeURIComponent(banner.category)}`);
    } else {
      console.warn("No navigation target for this banner:", banner);
    }
  };

  return (
    <section aria-label="Featured banners" className="relative">
      <div className="mx-auto max-w-7xl px-4">
        <div className="relative">
          <Carousel opts={{ loop: true, align: "start" }} className="w-full">
            <CarouselContent>
              {banners.map((b, i) => (
                <CarouselItem key={b.id}>
                  <div
                    onClick={() => handleClick(b)}
                    className="relative aspect-[21/9] w-full overflow-hidden rounded-xl cursor-pointer"
                  >
                    <Image
                      src={b.image || "/placeholder.svg"}
                      alt={b.name}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
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
                      <h1 className="text-pretty text-2xl font-semibold tracking-tight md:text-4xl">
                        {b.name || "Our Collection"}
                      </h1>
                      {b.discount > 0 && (
                        <p className="mt-2 text-sm opacity-80 md:text-base">
                          {b.discountType === "CATEGORY"
                            ? `${b.discount}% off on ${b.category}`
                            : `${b.discount}% off!`}
                        </p>
                      )}
                      <div className="mt-4">
                        <Button size="lg" onClick={() => handleClick(b)}>
                          Shop Now
                        </Button>
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
  );
}
