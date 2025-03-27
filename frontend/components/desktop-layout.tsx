"use client"

import type { ReactNode } from "react"
import { DesktopSidebar } from "@/components/desktop-sidebar"
import { RightSidebar } from "@/components/right-sidebar"
import { StatusBar } from "@/components/status-bar"
import { useIsMobile } from "@/hooks/use-mobile"
import HtmlText from "./ex1"

interface DesktopLayoutProps {
  children: ReactNode
  showNav?: boolean
  showStatusBar?: boolean
  showRightSidebar?: boolean
}

export function DesktopLayout({
  children,
  showNav = true,
  showStatusBar = true,
  showRightSidebar = true,
}: DesktopLayoutProps) {
  const isMobile = useIsMobile()

  if (isMobile) {
    return (
      <div className="app-container">
        <div className="mobile-screen">
          {showStatusBar && <StatusBar />}
          <main>{children}</main>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex">
      {showNav && (
        <div className="w-64 border-r sticky top-0 h-screen overflow-y-auto hidden md:block">
          <DesktopSidebar />
        </div>
      )}
      <div className="flex-1 min-w-0">
        {showStatusBar && <StatusBar isDesktop />}
        <HtmlText/>
        <main className="max-w-3xl mx-auto">{children}</main>
      </div>
      {showRightSidebar && (
        <div className="w-80 border-l sticky top-0 h-screen overflow-y-auto hidden lg:block">
          <RightSidebar />
        </div>
      )}
    </div>
  )
}
