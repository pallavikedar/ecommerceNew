import { TrendingUp } from "lucide-react"

export function MetricCards() {
  const metrics = [
    {
      label: "Total Revenue",
      value: "$ 25,334",
      change: "+12%",
      changeType: "positive",
      period: "From Jan 01, 2024 - March 30, 2024",
    },
    {
      label: "Avg. Order Value",
      value: "5,634",
      change: "+12%",
      changeType: "negative",
      period: "From Jan 01, 2024 - March 30, 2024",
    },
    {
      label: "Total Shipment",
      value: "5,334",
      change: "+12%",
      changeType: "positive",
      period: "From Jan 01, 2024 - March 30, 2024",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {metrics.map((metric, idx) => (
        <div key={idx} className="bg-card rounded-lg border border-border p-6">
          <p className="text-sm text-muted-foreground mb-2">{metric.label}</p>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-3xl font-bold text-foreground">{metric.value}</p>
              <p className="text-xs text-muted-foreground mt-2">{metric.period}</p>
            </div>
            <div
              className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 ${
                metric.changeType === "positive" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}
            >
              <TrendingUp size={14} />
              {metric.change}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
