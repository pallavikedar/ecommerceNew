"use client"

const campaignsData = [
  {
    id: 1,
    name: "Summer Sale 2024",
    status: "Active",
    startDate: "Jun 1, 2024",
    endDate: "Aug 31, 2024",
    reach: "45,230",
    conversions: "3,421",
    roi: "245%",
  },
  {
    id: 2,
    name: "Flash Deal - Electronics",
    status: "Active",
    startDate: "Jun 15, 2024",
    endDate: "Jun 22, 2024",
    reach: "28,900",
    conversions: "2,156",
    roi: "189%",
  },
  {
    id: 3,
    name: "Email Newsletter",
    status: "Scheduled",
    startDate: "Jul 1, 2024",
    endDate: "Jul 1, 2024",
    reach: "12,500",
    conversions: "0",
    roi: "0%",
  },
]

const statusColors: Record<string, string> = {
  Active: "bg-green-100 text-green-800",
  Scheduled: "bg-blue-100 text-blue-800",
  Completed: "bg-gray-100 text-gray-800",
}

export function MarketingCampaigns() {
  return (
    <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Campaign Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Start Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">End Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Reach</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Conversions</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">ROI</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {campaignsData.map((campaign) => (
              <tr key={campaign.id} className="hover:bg-muted/50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-foreground">{campaign.name}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusColors[campaign.status]}`}
                  >
                    {campaign.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-foreground">{campaign.startDate}</td>
                <td className="px-6 py-4 text-sm text-foreground">{campaign.endDate}</td>
                <td className="px-6 py-4 text-sm font-medium text-foreground">{campaign.reach}</td>
                <td className="px-6 py-4 text-sm font-medium text-foreground">{campaign.conversions}</td>
                <td className="px-6 py-4 text-sm font-semibold text-green-600">{campaign.roi}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
