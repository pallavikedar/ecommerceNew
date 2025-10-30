export function CustomersHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Customers</h1>
        <p className="text-sm text-muted-foreground mt-1">View and manage all customer accounts</p>
      </div>
      <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
        + Add Customer
      </button>
    </div>
  )
}
