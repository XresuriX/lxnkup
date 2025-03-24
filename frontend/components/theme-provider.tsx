"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"
import type { ReactNode } from "react"

// Extend ThemeProviderProps to ensure children is properly typed
interface ExtendedThemeProviderProps extends ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children, ...props }: ExtendedThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
