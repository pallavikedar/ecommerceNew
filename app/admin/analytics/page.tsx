import { AnalyticsCharts } from "@/components/admin/analytics/analytics-charts"
import { AnalyticsHeader } from "@/components/admin/analytics/analytics-header"

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <AnalyticsHeader />
      <AnalyticsCharts />
    </div>
  )
}
