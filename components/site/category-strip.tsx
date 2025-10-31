"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { BACKEND_BASE } from "@/lib/backend"
import { toast } from "react-toastify";

export default function CategoryStrip() {
  const [category,setCategory]=useState([]);
   const [loading, setLoading] = useState(true);
   useEffect(()=>{
   categories();
 },[])
const categories = async()=>{
  try {
        const res = await fetch(`${BACKEND_BASE}/product/getAll`, {
        
        });
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setCategory(data);
        console.log(category)
      } catch (err) {
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };


  return (
    <div className="relative">
      <div className="flex snap-x snap-mandatory items-stretch gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {category.map((c, idx) => (
          <motion.a
            key={idx}
            href="#"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
            className="group inline-flex snap-start flex-col items-center gap-2 rounded-lg border bg-card px-4 py-3"
          >
           
            <span className="text-xs font-medium">{c.name}</span>
          </motion.a>
        ))}
      </div>
    </div>
  )
}
