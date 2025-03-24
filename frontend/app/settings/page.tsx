"use client"

import { DesktopLayout } from "@/components/desktop-layout"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useAppStore } from "@/lib/store"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  ChevronRight,
  Moon,
  Sun,
  Palette,
  User,
  Bell,
  Lock,
  Smartphone,
  Megaphone,
  Bookmark,
  HelpCircle,
  LogOut,
} from "lucide-react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { useIsMobile } from "@/hooks/use-mobile"

export default function Settings() {
  const router = useRouter()
  const isMobile = useIsMobile()
  const setIsAuthenticated = useAppStore((state) => state.setIsAuthenticated)
  const { theme, setTheme } = useTheme()

  const handleLogout = () => {
    setIsAuthenticated(false)
    router.push("/welcome")
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <DesktopLayout showNav={true}>
      <div className="pb-4">
        {isMobile && (
          <div className="sticky top-0 z-10 bg-background border-b">
            <div className="flex items-center p-4">
              <Link href="/">
                <Button variant="ghost" size="icon" className="h-8 w-8 mr-6">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <h1 className="font-bold text-xl">Settings</h1>
            </div>
          </div>
        )}

        {!isMobile && <h1 className="text-2xl font-bold mb-6 p-4">Settings</h1>}

        <div className="space-y-6 p-4">
          <div className="space-y-1">
            <Link href="/profile" className="flex items-center justify-between p-4 hover:bg-muted rounded-lg">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-muted-foreground" />
                <span>Your account</span>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </Link>

            <Link href="/privacy" className="flex items-center justify-between p-4 hover:bg-muted rounded-lg">
              <div className="flex items-center gap-3">
                <Lock className="h-5 w-5 text-muted-foreground" />
                <span>Privacy and safety</span>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </Link>

            <Link
              href="/notifications/settings"
              className="flex items-center justify-between p-4 hover:bg-muted rounded-lg"
            >
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <span>Notifications</span>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </Link>
          </div>

          <div className="space-y-1">
            <Link
              href="/settings/accessibility"
              className="flex items-center justify-between p-4 hover:bg-muted rounded-lg"
            >
              <div className="flex items-center gap-3">
                <Smartphone className="h-5 w-5 text-muted-foreground" />
                <span>Accessibility, display, and languages</span>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </Link>

            <div className="flex items-center justify-between p-4 hover:bg-muted rounded-lg">
              <div className="flex items-center gap-3">
                {theme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                <span>Dark mode</span>
              </div>
              <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
            </div>

            <Link href="/settings/themes" className="flex items-center justify-between p-4 hover:bg-muted rounded-lg">
              <div className="flex items-center gap-3">
                <Palette className="h-5 w-5 text-muted-foreground" />
                <span>Theme</span>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </Link>
          </div>

          <div className="space-y-1">
            <Link href="/bookmarks" className="flex items-center justify-between p-4 hover:bg-muted rounded-lg">
              <div className="flex items-center gap-3">
                <Bookmark className="h-5 w-5 text-muted-foreground" />
                <span>Bookmarks</span>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </Link>

            <Link href="/monetization" className="flex items-center justify-between p-4 hover:bg-muted rounded-lg">
              <div className="flex items-center gap-3">
                <Megaphone className="h-5 w-5 text-muted-foreground" />
                <span>Monetization</span>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </Link>
          </div>

          <div className="space-y-1">
            <Link href="/help" className="flex items-center justify-between p-4 hover:bg-muted rounded-lg">
              <div className="flex items-center gap-3">
                <HelpCircle className="h-5 w-5 text-muted-foreground" />
                <span>Help center</span>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </Link>

            <Button
              variant="ghost"
              className="w-full justify-start p-4 hover:bg-muted rounded-lg text-destructive hover:text-destructive"
              onClick={handleLogout}
            >
              <div className="flex items-center gap-3">
                <LogOut className="h-5 w-5" />
                <span>Log out</span>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </DesktopLayout>
  )
}
