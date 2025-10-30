"use client"

import { useState } from "react"
import { Trash2, Edit2 } from "lucide-react"

const ordersData = [
  {
    id: "#ORD-001",
    customer: "John Doe",
    email: "john@example.com",
    date: "Jan 15, 2024",
    status: "Delivered",
    amount: "$1,250",
    items: 3,
  },
  {
    id: "#ORD-002",
    customer: "Sarah Smith",
    email: "sarah@example.com",
    date: "Jan 14, 2024",
    status: "Processing",
    amount: "$890",
    items: 2,
  },
  {
    id: "#ORD-003",
    customer: "Mike Johnson",
    email: "mike@example.com",
    date: "Jan 13, 2024",
    status: "Pending",
    amount: "$2,100",
    items: 5,
  },
  {
    id: "#ORD-004",
    customer: "Emma Wilson",
    email: "emma@example.com",
    date: "Jan 12, 2024",
    status: "Delivered",
    amount: "$650",
    items: 1,
  },
]

const statusColors: Record<string, string> = {
  Delivered: "bg-green-100 text-green-800",
  Processing: "bg-blue-100 text-blue-800",
  Pending: "bg-yellow-100 text-yellow-800",
  Cancelled: "bg-red-100 text-red-800",
}

export function OrdersTable() {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])

  const toggleSelectAll = () => {
    if (selectedOrders.length === ordersData.length) {
      setSelectedOrders([])
    } else {
      setSelectedOrders(ordersData.map((order) => order.id))
    }
  }

  const toggleSelect = (id: string) => {
    setSelectedOrders((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  return (
    <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedOrders.length === ordersData.length}
                  onChange={toggleSelectAll}
                  className="rounded border-border"
                />
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Order ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Customer</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Amount</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Items</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {ordersData.map((order) => (
              <tr key={order.id} className="hover:bg-muted/50 transition-colors">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedOrders.includes(order.id)}
                    onChange={() => toggleSelect(order.id)}
                    className="rounded border-border"
                  />
                </td>
                <td className="px-6 py-4 text-sm font-medium text-foreground">{order.id}</td>
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">{order.customer}</p>
                    <p className="text-xs text-muted-foreground">{order.email}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-foreground">{order.date}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-foreground">{order.amount}</td>
                <td className="px-6 py-4 text-sm text-foreground">{order.items}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-1 hover:bg-muted rounded transition-colors">
                      <Edit2 className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <button className="p-1 hover:bg-muted rounded transition-colors">
                      <Trash2 className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
