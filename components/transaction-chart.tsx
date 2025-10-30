"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { MoreVertical } from "lucide-react"

const data = [
  { date: "Apr 6", value: 25000 },
  { date: "Apr 11", value: 35000 },
  { date: "Apr 16", value: 28000 },
  { date: "Apr 22", value: 42000 },
  { date: "Apr 28", value: 32000 },
  { date: "May 4", value: 55000 },
  { date: "May 9", value: 38000 },
  { date: "May 15", value: 48000 },
  { date: "May 21", value: 45000 },
  { date: "May 27", value: 52000 },
  { date: "Jun 2", value: 48000 },
  { date: "Jun 7", value: 42000 },
  { date: "Jun 12", value: 55000 },
  { date: "Jun 18", value: 38000 },
  { date: "Jun 24", value: 50000 },
  { date: "Jun 30", value: 45000 },
]

export function TransactionChart() {
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-foreground">Transaction Activity</h2>
        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
          <MoreVertical size={20} className="text-muted-foreground" />
        </button>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="date" stroke="#9ca3af" style={{ fontSize: "12px" }} />
          <YAxis
            stroke="#9ca3af"
            style={{ fontSize: "12px" }}
            label={{ value: "100K", angle: -90, position: "insideLeft", offset: 10 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
            }}
            formatter={(value) => `$${value.toLocaleString()}`}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#14b8a6"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Tooltip Info */}
      <div className="mt-4 flex items-center gap-2 text-sm">
        <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
        <span className="text-muted-foreground">30 May, 2024</span>
        <span className="text-foreground font-semibold">Amount Made $30,583</span>
      </div>
    </div>
  )
}
