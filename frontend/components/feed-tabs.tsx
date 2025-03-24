"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function FeedTabs() {
  const pathname = usePathname()

  // Only show on main feed page
  if (pathname !== "/") return null

  return (
    <div className="flex border-b">
      <Link
        href="/"
        className={cn("flex-1 text-center py-3 font-semibold", pathname === "/" && "border-b-2 border-primary")}
      >
        For you
      </Link>
      <Link
        href="/following"
        className={cn(
          "flex-1 text-center py-3 text-muted-foreground",
          pathname === "/following" && "border-b-2 border-primary text-foreground",
        )}
      >
        Following
      </Link>
    </div>
  )
}
