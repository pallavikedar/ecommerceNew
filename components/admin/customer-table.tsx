import { MoreVertical, Trash2, Edit2, CheckCircle } from "lucide-react"

const customers = [
  {
    id: "#3066",
    name: "Krystal Beer",
    email: "Evangeline30@gmail.com",
    date: "Jan 6, 2022",
    status: "Paid",
    purchase: "Monthly subscription",
  },
  {
    id: "#3065",
    name: "Mr. Tanya Runolfsdottir",
    email: "Casper_Rippin@hotmail.com",
    date: "Jan 6, 2022",
    status: "Paid",
    purchase: "Monthly subscription",
  },
]

export function CustomerTable() {
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-foreground">Customer Details</h2>
        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
          <MoreVertical size={20} className="text-muted-foreground" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4">
                <input type="checkbox" className="rounded" />
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Invoice</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Customer</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Date</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Status</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Purchase</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Action</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, idx) => (
              <tr key={idx} className="border-b border-border hover:bg-muted/50 transition-colors">
                <td className="py-4 px-4">
                  <input type="checkbox" className="rounded" />
                </td>
                <td className="py-4 px-4 text-sm font-medium text-foreground">{customer.id}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {customer.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{customer.name}</p>
                      <p className="text-xs text-muted-foreground">{customer.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 text-sm text-foreground">{customer.date}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                    <CheckCircle size={16} />
                    {customer.status}
                  </div>
                </td>
                <td className="py-4 px-4 text-sm text-foreground">{customer.purchase}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <button className="text-red-600 hover:text-red-700 transition-colors">
                      <Trash2 size={16} />
                    </button>
                    <button className="text-blue-600 hover:text-blue-700 transition-colors">
                      <Edit2 size={16} />
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
