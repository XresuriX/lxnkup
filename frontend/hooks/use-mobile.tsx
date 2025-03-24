"use client"

import { useState, useEffect } from "react"

export function useIsMobile() {
  // Default to false to avoid hydration mismatch
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return

    // Check if the window width is less than 768px
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Set initial value
    checkIsMobile()

    // Add event listener for window resize
    window.addEventListener("resize", checkIsMobile)

    // Clean up event listener
    return () => window.removeEventListener("resize", checkIsMobile)
  }, [])

  return isMobile
}
