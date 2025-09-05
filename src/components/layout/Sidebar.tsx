import { useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { 
  Home, 
  FileText, 
  Image, 
  Video, 
  Send, 
  BarChart3, 
  Settings,
  Menu,
  X,
  Sparkles
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Captions & Hashtags', href: '/captions', icon: FileText },
  { name: 'Thumbnails', href: '/thumbnails', icon: Image },
  { name: 'Videos', href: '/videos', icon: Video },
  { name: 'Publishing', href: '/publishing', icon: Send },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const location = useLocation()

  return (
    <div className={cn(
      "flex flex-col bg-card border-r border-border transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary to-accent flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              CreatorFlow
            </span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-8 w-8 p-0"
        >
          {isCollapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
                isActive 
                  ? "bg-primary text-primary-foreground shadow-md" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted",
                isCollapsed ? "justify-center" : "justify-start"
              )}
            >
              <item.icon className={cn("flex-shrink-0", isCollapsed ? "w-4 h-4" : "w-4 h-4 mr-3")} />
              {!isCollapsed && <span>{item.name}</span>}
            </NavLink>
          )
        })}
      </nav>
    </div>
  )
}