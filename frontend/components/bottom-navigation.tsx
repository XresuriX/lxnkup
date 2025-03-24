"use client"

import { Home, Search, Bell, MessageSquare, Compass } from "lucide-react"
import { useAppStore } from "@/lib/store"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

export function BottomNavigation() {
  const pathname = usePathname()
  const setActiveTab = useAppStore((state) => state.setActiveTab)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 bg-background border-t z-50 transition-transform duration-300",
        !isVisible && "translate-y-full",
      )}
    >
      <div className="max-w-md mx-auto flex items-center justify-between">
        <Link
          href="/"
          className={cn("bottom-nav-item", isActive("/") && "active")}
          onClick={() => setActiveTab("home")}
        >
          <Home className="w-6 h-6" />
        </Link>
        <Link
          href="/search"
          className={cn("bottom-nav-item", isActive("/search") && "active")}
          onClick={() => setActiveTab("search")}
        >
          <Search className="w-6 h-6" />
        </Link>
        <Link
          href="/explore"
          className={cn("bottom-nav-item", isActive("/explore") && "active")}
          onClick={() => setActiveTab("explore")}
        >
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center -mt-3">
            <Compass className="w-5 h-5 text-white" />
          </div>
        </Link>
        <Link
          href="/notifications"
          className={cn("bottom-nav-item", isActive("/notifications") && "active")}
          onClick={() => setActiveTab("notifications")}
        >
          <Bell className="w-6 h-6" />
        </Link>
        <Link
          href="/messages"
          className={cn("bottom-nav-item", isActive("/messages") && "active")}
          onClick={() => setActiveTab("messages")}
        >
          <MessageSquare className="w-6 h-6" />
        </Link>
      </div>
    </div>
  )
}
