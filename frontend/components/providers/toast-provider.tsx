"use client"

import { Toaster } from "sonner"
import { useTheme } from "next-themes"

export function ToastProvider() {
  const { theme } = useTheme()

  return (
    <Toaster
      position="top-center"
      toastOptions={{
        style: {
          background: theme === "dark" ? "hsl(0 0% 10%)" : "hsl(0 0% 98%)",
          color: theme === "dark" ? "hsl(0 0% 98%)" : "hsl(0 0% 10%)",
          border: `1px solid ${theme === "dark" ? "hsl(0 0% 15%)" : "hsl(0 0% 90%)"}`,
        },
      }}
    />
  )
}
