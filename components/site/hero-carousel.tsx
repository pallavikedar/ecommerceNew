"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import { BACKEND_BASE } from "@/lib/backend";
import { toast } from "react-toastify";

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
  const [loading, setLoading] = useState(true);

  // ✅ Fetch all banners from backend
  useEffect(() => {
    const fetchBanners = async () => {
      const token = localStorage.getItem("userToken");
      
      if (!token) {
        toast.error("Please login to view banners");
        setLoading(false);
        return;
      }
      
      try {
        const authHeader = token.startsWith("Bearer")
          ? token
          : `Bearer ${token}`;
        const res = await fetch(`${BACKEND_BASE}/banner/allBanner`, {
          headers: {
            Authorization: authHeader,
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) throw new Error("Failed to fetch banners");
        const data = await res.json();
        setBanners(data || []);
      } catch (error) {
        console.error("Error fetching banners:", error);
        toast.error("Failed to load banners");
      } finally {
        setLoading(false);
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

  if (loading) {
    return (
      <section aria-label="Featured banners" className="relative">
        <div className="mx-auto max-w-7xl px-4">
          <div className="relative aspect-[16/5] w-full overflow-hidden rounded-xl bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse" />
        </div>
      </section>
    );
  }

  if (banners.length === 0) {
    return (
      <section aria-label="Featured banners" className="relative">
        <div className="mx-auto max-w-7xl px-4">
          <p className="text-center py-8 text-gray-500">No banners available at the moment.</p>
        </div>
      </section>
    );
  }

  return (
    <section aria-label="Featured banners" className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <Carousel opts={{ loop: true, align: "start", duration: 5000 }} className="w-full">
            <CarouselContent>
              {banners.map((b, i) => (
                <CarouselItem key={b.id}>
                  <div
                    onClick={() => handleClick(b)}
                    className="group relative aspect-[16/5] w-full overflow-hidden rounded-2xl cursor-pointer shadow-xl"
                  >
                    <Image
                      src={b.image || "/placeholder.svg"}
                      alt={b.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      priority={i === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    
                    <motion.div
                      initial={{ opacity: 0, y: 32 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      viewport={{ once: true }}
                      className="absolute bottom-6 left-6 max-w-md md:bottom-8 md:left-8 lg:bottom-12 lg:left-12 z-10"
                    >
                      <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-tight mb-3 drop-shadow-lg">
                        {b.name || "Discover Beauty"}
                      </h2>
                      {b.discount > 0 && (
                        <p className="text-rose-100/90 text-sm md:text-base font-medium mb-4 drop-shadow-md">
                          {b.discountType === "CATEGORY"
                            ? `${b.discount}% OFF on ${b.category.toUpperCase()} Collection`
                            : `${b.discount}% OFF Selected Favorites`}
                        </p>
                      )}
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block"
                      >
                        <Button 
                          size="lg" 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleClick(b);
                          }}
                          className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold shadow-lg border-0 px-8 py-3 rounded-full transition-all duration-300"
                        >
                          Shop Now
                        </Button>
                      </motion.div>
                    </motion.div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 md:left-4 lg:left-8 h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white shadow-lg border-0 -translate-y-1/2 top-1/2" />
            <CarouselNext className="right-2 md:right-4 lg:right-8 h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white shadow-lg border-0 -translate-y-1/2 top-1/2" />
          </Carousel>
        </div>
      </div>
      
      {/* Subtle indicator dots below carousel */}
      {/*  */}
    </section>
  );
}

// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import { Button } from "@/components/ui/button";
// import { motion } from "framer-motion";
// import Image from "next/image";
// import { BACKEND_BASE } from "@/lib/backend";
// import { toast } from "react-toastify";

// // ✅ Local fallback banners (stored in /public)
// const localFallbackBanners = [
//   {
//     id: 1,
//     name: "Bold. Clean. You.",
//     image: "/banner.jpg", // ✅ Correct path
//     category: "makeup",
//     discount: 20,
//     discountType: "CATEGORY",
//     productId: 0,
//   },
//   {
//     id: 2,
//     name: "Statement Lips",
//     image: "/banner2.jpg", // ✅ Correct path
//     category: "lipstick",
//     discount: 15,
//     discountType: "CATEGORY",
//     productId: 0,
//   },
// ];

// interface Banner {
//   id: number;
//   name: string;
//   image: string;
//   category: string;
//   discount: number;
//   discountType: string;
//   productId: number;
// }

// export default function HeroCarousel() {
//   const [banners, setBanners] = useState<Banner[]>([]);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchBanners = async () => {
//       const token = localStorage.getItem("userToken");

//       try {
//         const authHeader = token
//           ? token.startsWith("Bearer")
//             ? token
//             : `Bearer ${token}`
//           : "";

//         const res = await fetch(`${BACKEND_BASE}/banner/allBanner`, {
//           headers: {
//             ...(authHeader && { Authorization: authHeader }),
//             "Content-Type": "application/json",
//           },
//         });

//         if (!res.ok) throw new Error("Failed to fetch banners");
//         const data = await res.json();

//         // ✅ Fix image path to point to /public
//         const fixedData = Array.isArray(data)
//           ? data.map((b: Banner) => ({
//               ...b,
//               image: b.image?.startsWith("/")
//                 ? b.image
//                 : `/banners/${b.image}`, // if backend gives only filenames
//             }))
//           : [];

//         setBanners(fixedData.length > 0 ? fixedData : localFallbackBanners);
//       } catch (error) {
//         console.error("Error fetching banners:", error);
//         toast.warn("Loading default banners");
//         setBanners(localFallbackBanners);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBanners();
//   }, []);

//   const handleClick = (banner: Banner) => {
//     if (banner.productId && banner.productId !== 0) {
//       router.push(`/product/${banner.productId}`);
//     } else if (banner.category) {
//       router.push(`/category/${encodeURIComponent(banner.category)}`);
//     } else {
//       toast.info("No category linked with this banner");
//     }
//   };

//   if (loading) {
//     return <div className="text-center py-10 text-gray-500">Loading banners...</div>;
//   }

//   return (
//     <section aria-label="Featured banners" className="relative">
//       <div className="mx-auto max-w-7xl px-4">
//         <div className="relative">
//           <Carousel opts={{ loop: true, align: "start" }} className="w-full">
//             <CarouselContent>
//               {banners.map((b, i) => (
//                 <CarouselItem key={b.id}>
//                   <div
//                     onClick={() => handleClick(b)}
//                     className="relative aspect-[21/9] w-full overflow-hidden rounded-xl cursor-pointer"
//                   >
//                     <Image
//                       src={b.image || "/placeholder.svg"}
//                       alt={b.name || "Banner"}
//                       fill
//                       className="object-cover transition-transform duration-500 hover:scale-105"
//                       priority={i === 0}
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/20 to-transparent" />
//                     <motion.div
//                       initial={{ opacity: 0, y: 24 }}
//                       whileInView={{ opacity: 1, y: 0 }}
//                       transition={{ duration: 0.6, ease: "easeOut" }}
//                       viewport={{ once: true }}
//                       className="absolute bottom-6 left-6 max-w-xl md:bottom-10 md:left-10"
//                     >
//                       <h1 className="text-pretty text-2xl font-semibold tracking-tight md:text-4xl">
//                         {b.name || "Our Collection"}
//                       </h1>
//                       {b.discount > 0 && (
//                         <p className="mt-2 text-sm opacity-80 md:text-base">
//                           {b.discountType === "CATEGORY"
//                             ? `${b.discount}% off on ${b.category}`
//                             : `${b.discount}% off!`}
//                         </p>
//                       )}
//                       <div className="mt-4">
//                         <Button
//                           size="lg"
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             handleClick(b);
//                           }}
//                         >
//                           Shop Now
//                         </Button>
//                       </div>
//                     </motion.div>
//                   </div>
//                 </CarouselItem>
//               ))}
//             </CarouselContent>
//             <CarouselPrevious className="left-2 md:-left-12" />
//             <CarouselNext className="right-2 md:-right-12" />
//           </Carousel>
//         </div>
//       </div>
//     </section>
//   );
// }
