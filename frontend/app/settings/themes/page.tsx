"use client"

import { DesktopLayout } from "@/components/desktop-layout"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { ArrowLeft, Check } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"

export default function ThemeSettings() {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const isMobile = useIsMobile()

  const themes = [
    {
      name: "Green & Gold",
      value: "light",
      primary: "#2A9D8F",
      secondary: "#E9C46A",
      background: "#FFFFFF",
      text: "#264653",
    },
    {
      name: "Dark Mode",
      value: "dark",
      primary: "#2A9D8F",
      secondary: "#E9C46A",
      background: "#1F2937",
      text: "#F9FAFB",
    },
    {
      name: "High Contrast",
      value: "high-contrast",
      primary: "#000000",
      secondary: "#FFFFFF",
      background: "#FFFFFF",
      text: "#000000",
    },
  ]

  return (
    <DesktopLayout>
      <div className="p-4 max-w-xl mx-auto">
        {isMobile && (
          <div className="flex items-center gap-2 mb-6">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">Theme Settings</h1>
          </div>
        )}

        {!isMobile && <h1 className="text-2xl font-bold mb-6">Theme Settings</h1>}

        <div className="space-y-6">
          <p className="text-muted-foreground">
            Choose a theme for your app. This will change the colors and appearance.
          </p>

          <div className="grid gap-4">
            {themes.map((t) => (
              <button
                key={t.value}
                className={cn(
                  "flex items-center gap-3 p-4 rounded-lg border transition-all",
                  theme === t.value ? "border-brand-green ring-2 ring-brand-green/20" : "hover:bg-muted",
                )}
                onClick={() => setTheme(t.value)}
              >
                <div
                  className="w-12 h-12 rounded-md overflow-hidden grid grid-cols-2 grid-rows-2"
                  style={{
                    backgroundColor: t.background,
                    border: "1px solid rgba(0,0,0,0.1)",
                  }}
                >
                  <div style={{ backgroundColor: t.primary }}></div>
                  <div style={{ backgroundColor: t.secondary }}></div>
                  <div style={{ backgroundColor: t.text }}></div>
                  <div style={{ backgroundColor: t.background }}></div>
                </div>

                <div className="flex-1 text-left">
                  <p className="font-medium">{t.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {t.value === "light"
                      ? "Default light theme"
                      : t.value === "dark"
                        ? "Dark theme for night use"
                        : "High contrast for accessibility"}
                  </p>
                </div>

                {theme === t.value && <Check className="h-5 w-5 text-brand-green" />}
              </button>
            ))}
          </div>
        </div>
      </div>
    </DesktopLayout>
  )
}
