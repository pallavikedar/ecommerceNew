import { Search, Bell, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  const username = localStorage.getItem('data')
  const data =username?JSON.parse(username ) : null

 const userName = data?.admin?.name || "Guest";
 const userInitial = userName.charAt(0).toUpperCase();
  return (
    <header className="border-b border-border bg-background px-6 py-4">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Welcome Message */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground">Welcome Back.</h1>
          <p className="text-sm text-muted-foreground">Welcome to the Dashboard</p>
        </div>

        {/* Center: Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        {/* Right: User Profile & Actions */}
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-muted rounded-lg transition-colors">
            <Bell size={20} className="text-foreground" />
          </button>
          <div className="flex items-center gap-3 pl-4 border-l border-border">
            <div className="text-right">
              <p className="text-sm font-semibold text-foreground">{userName}</p>
              <p className="text-xs text-muted-foreground">Admin</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold">
             {userInitial}
            </div>
          </div>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <span>📅</span>
            Date
          </Button>
          <Button size="sm" className="gap-2 bg-foreground text-background hover:bg-foreground/90">
            <Download size={16} />
            Export
          </Button>
        </div>
      </div>
    </header>
  )
}
