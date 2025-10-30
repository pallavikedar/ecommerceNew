import { MarketingCampaigns } from "@/components/admin/marketing/marketing-campaigns"
import { MarketingHeader } from "@/components/admin/marketing/marketing-header"

export default function MarketingPage() {
  return (
    <div className="space-y-6">
      <MarketingHeader />
      <MarketingCampaigns />
    </div>
  )
}
