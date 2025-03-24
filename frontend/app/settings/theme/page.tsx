"use client"

import { useState, useEffect } from "react"
import { SidebarNavigation } from "@/components/sidebar-navigation"
import { RightSidebar } from "@/components/right-sidebar"
import { BottomNavigation } from "@/components/bottom-navigation"
import { ArrowLeft, Check } from "lucide-react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { themes } from "@/lib/theme-config"
import { motion } from "framer-motion"

export default function ThemeSettingsPage() {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <SidebarNavigation />

        <main className="min-h-screen flex-1 border-l border-r border-twitter-gray max-w-xl">
          <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-twitter-gray">
            <div className="px-4 py-3 flex items-center gap-3">
              <button onClick={() => router.back()} className="rounded-full p-2 hover:bg-twitter-lightGray">
                <ArrowLeft size={20} />
              </button>
              <h1 className="text-xl font-bold">Theme</h1>
            </div>
          </div>

          <div className="p-4">
            <p className="text-muted-foreground mb-6">
              Manage how X looks to you. These settings affect all the X accounts on this browser.
            </p>

            <div className="space-y-4">
              {themes.map((t, index) => (
                <motion.button
                  key={t.value}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-twitter-lightGray transition-colors"
                  onClick={() => setTheme(t.value)}
                >
                  <span className="font-medium">{t.name}</span>
                  {theme === t.value && <Check className="text-caribbean" size={20} />}
                </motion.button>
              ))}
            </div>

            <div className="mt-8 p-4 rounded-xl bg-twitter-lightGray">
              <h3 className="font-bold mb-2">Background</h3>
              <div className="flex gap-4 mt-4">
                <button
                  className="w-10 h-10 rounded-full bg-black border-2 border-transparent focus:border-caribbean"
                  onClick={() => setTheme("dark")}
                  aria-label="Dark theme"
                />
                <button
                  className="w-10 h-10 rounded-full bg-white border-2 border-transparent focus:border-caribbean"
                  onClick={() => setTheme("light")}
                  aria-label="Light theme"
                />
              </div>
            </div>
          </div>
        </main>

        <RightSidebar />
      </div>

      <BottomNavigation />
    </div>
  )
}
