"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Search, PlusSquare, Bell, Play, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAppStore } from "@/lib/store"
import { useIsMobile } from "@/hooks/use-mobile"

export interface BottomNavProps {
  className?: string
}

export function BottomNav({ className }: BottomNavProps) {
  const pathname = usePathname()
  const isMobile = useIsMobile()
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const setActiveTab = useAppStore((state) => state.setActiveTab)

  // Handle scroll behavior
  const handleScroll = useCallback(() => {
    if (typeof window !== "undefined") {
      const currentScrollY = window.scrollY

      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }
  }, [lastScrollY])

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll, { passive: true })

      return () => {
        window.removeEventListener("scroll", handleScroll)
      }
    }
  }, [handleScroll])

  // Don't render on desktop
  if (!isMobile) return null

  // Don't render on certain pages
  if (
    pathname.includes("/stories/") ||
    pathname.includes("/login") ||
    pathname.includes("/register") ||
    pathname === "/welcome"
  ) {
    return null
  }

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Search, label: "Search", path: "/search" },
    { icon: PlusSquare, label: "Create", path: "/create-post" },
    { icon: Bell, label: "Alerts", path: "/notifications" },
    { icon: Play, label: "Streams", path: "/streams" },
    { icon: User, label: "Profile", path: "/profile" },
  ]

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 bg-background border-t transition-all duration-300 shadow-md",
        !isVisible && "translate-y-full",
        className,
      )}
      aria-label="Main Navigation"
    >
      <div className="max-w-md mx-auto flex items-center justify-between px-1">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={cn(
              "flex flex-col items-center justify-center py-2 px-1 flex-1",
              isActive(item.path) ? "text-primary" : "text-muted-foreground hover:text-foreground",
            )}
            onClick={() => setActiveTab(item.label.toLowerCase())}
            aria-current={isActive(item.path) ? "page" : undefined}
          >
            {item.path === "/create-post" ? (
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
                <item.icon className="w-5 h-5" />
              </div>
            ) : (
              <item.icon className="w-6 h-6" />
            )}
            <span className="text-xs mt-1 font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}
