"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BACKEND_BASE } from "@/lib/backend";
import { toast } from "react-toastify";

interface Category {
  categoryName: string;
  id?: string;
}

export default function CategoryStrip() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${BACKEND_BASE}/category/All`);
      if (!res.ok) throw new Error("Failed to fetch categories");
      const data = await res.json();
      setCategories(data?.data || data || []);
    } catch (err) {
      console.error("❌ Category fetch failed:", err);
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="relative w-full px-4 py-4">
        <p className="text-center py-4 text-purple-300 animate-pulse text-sm">
          Loading categories...
        </p>
      </div>
    );

  if (categories.length === 0) {
    return (
      <div className="relative w-full px-4 py-4">
        <p className="text-center text-sm text-gray-500">No categories available</p>
      </div>
    );
  }

  return (
    <div className="relative w-full px-4 py-4 bg-white/90 backdrop-blur-sm border-b border-purple-50">
      <div
        ref={containerRef}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        <AnimatePresence mode="wait">
          {categories.map((category, idx) => (
            <motion.button
              key={category.id || idx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onClick={() => setActiveIndex(idx)}
              whileHover={{ y: -1, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className={`group relative inline-flex snap-start flex-col items-center justify-center min-w-[120px] h-14 rounded-xl border px-4 py-3 transition-all duration-300 font-medium text-sm tracking-tight
                ${
                  activeIndex === idx
                    ? "text-purple-700 border-purple-200 shadow-sm bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100"
                    : "border-purple-100 text-purple-600 hover:border-purple-200 hover:text-purple-700 hover:shadow-sm bg-white/80"
                }`}
              role="tab"
              aria-selected={activeIndex === idx}
              aria-controls={`category-${idx}`}
            >
              <span className="z-10">{category.categoryName}</span>

              {/* Shared underline for active state */}
              <AnimatePresence>
                {activeIndex === idx && (
                  <motion.div
                    layoutId="active-underline"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-gradient-to-r from-purple-300 via-pink-300 to-purple-400 opacity-80 w-8"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    exit={{ scaleX: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </AnimatePresence>

              {/* Subtle glow on active */}
              {activeIndex === idx && (
                <motion.div
                  className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-200/10 via-pink-200/10 to-purple-300/10 blur-md -z-10"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {/* Optional: Active category indicator below */}
      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="mt-2 flex justify-center"
          >
           
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}