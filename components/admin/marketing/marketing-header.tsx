export function MarketingHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Marketing</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage campaigns and promotions</p>
      </div>
      <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
        + New Campaign
      </button>
    </div>
  )
}
