"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { XLogo } from "@/components/x-logo"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { Home, Search, Bell, Mail, Bookmark, User, Settings, MoreHorizontal, Feather } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"

interface NavItemProps {
  href: string
  icon: React.ElementType

  label: string
  active?: boolean
  onClick?: () => void
}

function NavItem({ href, icon: Icon, label, active, onClick }: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-4 p-3 rounded-full hover:bg-twitter-lightGray transition-colors",
        active && "font-bold",
      )}
      onClick={onClick}
    >
      <Icon size={26} className={active ? "text-foreground" : "text-muted-foreground"} />
      <span className="text-xl hidden xl:inline">{label}</span>
    </Link>
  )
}

export function SidebarNavigation() {
  const pathname = usePathname()
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const isActive = (path: string) => {
    if (path === "/home" && pathname === "/home") return true
    if (path !== "/home" && pathname.startsWith(path)) return true
    return false
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col h-screen sticky top-0 w-20 xl:w-72 p-2 border-r border-twitter-gray">
        <div className="p-3">
          <Link href="/home">
            LxnkUp
          </Link>
        </div>

        <nav className="mt-2 space-y-1">
          <NavItem href="/home" icon={Home} label="Home" active={isActive("/home")} />
          <NavItem href="/explore" icon={Search} label="Explore" active={isActive("/explore")} />
          <NavItem href="/notifications" icon={Bell} label="Notifications" active={isActive("/notifications")} />
          <NavItem href="/messages" icon={Mail} label="Messages" active={isActive("/messages")} />
          <NavItem href="/bookmarks" icon={Bookmark} label="Bookmarks" active={isActive("/bookmarks")} />
          <NavItem href="/profile" icon={User} label="Profile" active={isActive("/profile")} />
          <NavItem href="/settings" icon={Settings} label="Settings" active={isActive("/settings")} />

          <div className="flex items-center gap-4 p-3">
            <ThemeToggle />
            <span className="text-xl hidden xl:inline">Theme</span>
          </div>
        </nav>

        <div className="mt-4 px-3 xl:pr-6">
          <Button
            variant="default"
            size="lg"
            className="w-full rounded-full bg-caribbean hover:bg-caribbean/90 text-black font-bold"
          >
            <span className="hidden xl:inline">Tweet</span>
            <Feather className="xl:hidden" size={24} />
          </Button>
        </div>

        <div className="mt-auto p-3">
          <div className="flex items-center gap-3 p-2 rounded-full hover:bg-twitter-lightGray cursor-pointer">
            <Avatar size="md" name="User" />
            <div className="hidden xl:block overflow-hidden">
              <p className="font-semibold truncate">Alex Johnson</p>
              <p className="text-muted-foreground truncate">@alexjohnson</p>
            </div>
            <MoreHorizontal className="hidden xl:block ml-auto text-muted-foreground" size={20} />
          </div>
        </div>
      </div>
    </>
  )
}
