"use client"

import type React from "react"
import { useRouter, usePathname } from "next/navigation"
import {
  LayoutGrid,
  ShoppingCart,
  Users,
  BarChart3,
  Megaphone,
  Star,
  CreditCard,
  Truck,
  Percent,
  ClipboardList as LogBook,
  HelpCircle,
  Plus,
} from "lucide-react"


export default function Sidebar() {
  const pathname = usePathname();
  
  return (
    <div className="w-80 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
            <span className="text-white font-bold text-lg">*</span>
          </div>
          <span className="font-semibold text-sidebar-foreground">eCommerce</span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-auto">
        {/* Main Section */}
        <div className="px-4 py-4">
          <p className="text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider mb-3">Main</p>
          <nav className="space-y-2">
            <NavItem 
              icon={<LayoutGrid size={20} />} 
              label="Dashboard" 
              active={pathname === "/admin"} 
              href="/admin" 
            />
            <NavItem 
              icon={<ShoppingCart size={20} />} 
              label="Products" 
              active={pathname === "/admin/products/getproduct"} 
              href="/admin/products/getproduct" 
            />
             <NavItem 
              icon={<ShoppingCart size={20} />} 
              label="Banners" 
              active={pathname === "/admin/banner/getbanner"} 
              href="/admin/banner/getbanner" 
            />

            <NavItem 
              icon={<ShoppingCart size={20} />} 
              label="Orders" 
              active={pathname === "/admin/orders"}
              href="/admin/orders"
            />
            <NavItem 
              icon={<Users size={20} />} 
              label="Customers" 
              active={pathname === "/admin/customers"}
              href="/admin/customers"
            />
            <NavItem 
              icon={<BarChart3 size={20} />} 
              label="Analytics" 
              active={pathname === "/admin/analytics"}
              href="/admin/analytics"
            />
            <NavItem 
              icon={<Megaphone size={20} />} 
              label="Marketing" 
              active={pathname === "/admin/marketing"}
              href="/admin/marketing"
            />
            <NavItem 
              icon={<Star size={20} />} 
              label="Reviews" 
              active={pathname === "/admin/reviews"}
              href="/admin/reviews"
            />
          </nav>
        </div>

        {/* Finance Section */}
        <div className="px-4 py-4 border-t border-sidebar-border">
          <p className="text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider mb-3">Finance</p>
          <nav className="space-y-2">
            <NavItem icon={<CreditCard size={20} />} label="Payments" />
            <NavItem icon={<Truck size={20} />} label="Shipping" />
            <NavItem icon={<Percent size={20} />} label="Taxes" />
            <NavItem icon={<LogBook size={20} />} label="Activity Log" />
            <NavItem icon={<HelpCircle size={20} />} label="Help Center" />
          </nav>
        </div>

        {/* Miscellaneous Section */}
        <div className="px-4 py-4 border-t border-sidebar-border">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider">Miscellaneous</p>
            <button className="text-sidebar-foreground/60 hover:text-sidebar-foreground">
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function NavItem({ 
  icon, 
  label, 
  active = false, 
  href 
}: { 
  icon: React.ReactNode; 
  label: string; 
  active?: boolean;
  href?: string;
}) {
  const router = useRouter();
  
  return (
    <button
      onClick={() => href && router.push(href)}
      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
        active
          ? "bg-sidebar-primary text-sidebar-primary-foreground"
          : "text-sidebar-foreground hover:bg-sidebar-accent"
      }`}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </button>
  )
}
