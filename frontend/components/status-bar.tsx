"use client"

import Link from "next/link"
import { useAppStore } from "@/lib/store"
import { FeedTabs } from "@/components/feed-tabs"

interface StatusBarProps {
  isDesktop?: boolean
}

export function StatusBar({ isDesktop = false }: StatusBarProps) {
  const currentUser = useAppStore((state) => state.currentUser)

  if (isDesktop) {
    return (
      <div className="border-b sticky top-0 z-10 bg-background">
        <div className="flex justify-between items-center px-4 py-3">
          <div className="flex space-x-4">
            <button className="font-semibold text-lg hover:bg-muted px-4 py-2 rounded-full">For you</button>
            <button className="text-muted-foreground text-lg hover:bg-muted px-4 py-2 rounded-full">Following</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="sticky top-0 z-10 bg-background">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex-1"></div>
        <div className="flex-1 flex justify-center">
          <Link href="/" className="font-bold text-xl">
            LxnkUp
          </Link>
        </div>
        <div className="flex-1 flex justify-end">{/* Premium button removed */}</div>
      </div>
      <FeedTabs />
    </div>
  )
}
