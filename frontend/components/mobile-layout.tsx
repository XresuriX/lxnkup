"use client"

import type { ReactNode } from "react"
import { useAppStore } from "@/lib/store"
import { BottomNav } from "@/components/bottom-navigation/bottom-nav"
import { StatusBar } from "@/components/status-bar"

interface MobileLayoutProps {
  children: ReactNode
  showNav?: boolean
  showStatusBar?: boolean
}

export function MobileLayout({ children, showNav = true, showStatusBar = true }: MobileLayoutProps) {
  const isAuthenticated = useAppStore((state) => state.isAuthenticated)

  return (
    <div className="app-container">
      <div className="mobile-screen">
        {showStatusBar && <StatusBar />}
        <main className="pb-20">{children}</main>
        {showNav && isAuthenticated && <BottomNav />}
      </div>
    </div>
  )
}
