"use client"

import { useState } from "react"
import { Edit2, Trash2 } from "lucide-react"

const customersData = [
  {
    id: 1,
    name: "Krystal Beer",
    email: "evangeline30@gmail.com",
    phone: "+1 (555) 123-4567",
    location: "New York, USA",
    joinDate: "Jan 6, 2022",
    totalOrders: 12,
    totalSpent: "$3,450",
  },
  {
    id: 2,
    name: "Mr. Tanya Runolfsdottir",
    email: "casper.rippin@hotmail.com",
    phone: "+1 (555) 234-5678",
    location: "Los Angeles, USA",
    joinDate: "Jan 6, 2022",
    totalOrders: 8,
    totalSpent: "$2,100",
  },
  {
    id: 3,
    name: "Alex Martinez",
    email: "alex.martinez@gmail.com",
    phone: "+1 (555) 345-6789",
    location: "Chicago, USA",
    joinDate: "Feb 14, 2022",
    totalOrders: 15,
    totalSpent: "$5,200",
  },
  {
    id: 4,
    name: "Jessica Chen",
    email: "jessica.chen@yahoo.com",
    phone: "+1 (555) 456-7890",
    location: "Houston, USA",
    joinDate: "Mar 20, 2022",
    totalOrders: 6,
    totalSpent: "$1,800",
  },
]

export function CustomersTable() {
  const [selectedCustomers, setSelectedCustomers] = useState<number[]>([])

  const toggleSelectAll = () => {
    if (selectedCustomers.length === customersData.length) {
      setSelectedCustomers([])
    } else {
      setSelectedCustomers(customersData.map((c) => c.id))
    }
  }

  const toggleSelect = (id: number) => {
    setSelectedCustomers((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
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
                  checked={selectedCustomers.length === customersData.length}
                  onChange={toggleSelectAll}
                  className="rounded border-border"
                />
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Phone</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Location</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Join Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Orders</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Total Spent</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {customersData.map((customer) => (
              <tr key={customer.id} className="hover:bg-muted/50 transition-colors">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedCustomers.includes(customer.id)}
                    onChange={() => toggleSelect(customer.id)}
                    className="rounded border-border"
                  />
                </td>
                <td className="px-6 py-4 text-sm font-medium text-foreground">{customer.name}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{customer.email}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{customer.phone}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{customer.location}</td>
                <td className="px-6 py-4 text-sm text-foreground">{customer.joinDate}</td>
                <td className="px-6 py-4 text-sm font-medium text-foreground">{customer.totalOrders}</td>
                <td className="px-6 py-4 text-sm font-semibold text-foreground">{customer.totalSpent}</td>
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
