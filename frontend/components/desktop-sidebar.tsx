"use client"

import { useAppStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { UserAvatar } from "@/components/user-avatar"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Home,
  Search,
  Compass,
  Video,
  MessageSquare,
  Bell,
  User,
  Settings,
  LogOut,
  Plus,
  Sun,
  Moon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { useCallback } from "react"

export function DesktopSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const currentUser = useAppStore((state) => state.currentUser)
  const setIsAuthenticated = useAppStore((state) => state.setIsAuthenticated)

  const isActive = useCallback(
    (path: string) => {
      return pathname === path
    },
    [pathname],
  )

  const handleLogout = useCallback(() => {
    setIsAuthenticated(false)
    router.push("/welcome")
  }, [setIsAuthenticated, router])

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Search, label: "Search", path: "/search" },
    { icon: Compass, label: "Explore", path: "/explore" },
    { icon: Video, label: "Streams", path: "/streams" },
    { icon: MessageSquare, label: "Messages", path: "/messages" },
    { icon: Bell, label: "Notifications", path: "/notifications" },
    { icon: User, label: "Profile", path: "/profile" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ]

  const { theme, setTheme } = useTheme()

  return (
    <div className="flex flex-col h-full p-4">
      <Link href="/" className="text-2xl font-bold mb-6 block">
        LxnkUp
      </Link>

      <nav className="space-y-1 mb-6">
        {navItems.map((item) => (
          <Link key={item.path} href={item.path}>
            <Button
              variant={isActive(item.path) ? "default" : "ghost"}
              className={`w-full justify-start text-lg ${
                isActive(item.path) ? "bg-brand-green hover:bg-brand-green/90 text-white" : ""
              }`}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.label}
            </Button>
          </Link>
        ))}
      </nav>

      <Button className="w-full bg-brand-green hover:bg-brand-green/90 text-white rounded-full py-6">
        <Plus className="mr-2 h-5 w-5" />
        Create Post
      </Button>

      <div className="mt-4 mb-auto">
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? (
            <>
              <Sun className="mr-3 h-5 w-5" />
              Light Mode
            </>
          ) : (
            <>
              <Moon className="mr-3 h-5 w-5" />
              Dark Mode
            </>
          )}
        </Button>
        <Link href="/settings/themes">
          <Button variant="ghost" className="w-full justify-start mt-2">
            <Settings className="mr-3 h-5 w-5" />
            Theme Settings
          </Button>
        </Link>
      </div>

      {currentUser && (
        <div className="mt-auto flex items-center justify-between p-3 rounded-lg hover:bg-muted cursor-pointer">
          <div className="flex items-center">
            <UserAvatar src={currentUser.avatar} name={currentUser.name} size="sm" />
            <div className="ml-3">
              <p className="font-medium text-sm">{currentUser.name}</p>
              <p className="text-xs text-muted-foreground">@{currentUser.username}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
