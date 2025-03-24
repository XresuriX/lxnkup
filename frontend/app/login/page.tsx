"use client"

import type React from "react"

import { useState } from "react"
import { DesktopLayout } from "@/components/desktop-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAppStore } from "@/lib/store"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useIsMobile } from "@/hooks/use-mobile"
import { useCallback } from "react"

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const setIsAuthenticated = useAppStore((state) => state.setIsAuthenticated)
  const setCurrentUser = useAppStore((state) => state.setCurrentUser)
  const isMobile = useIsMobile()

  const handleLogin = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()

      if (!email || !password) {
        return
      }

      try {
        setIsLoading(true)

        // In a real app, we would validate and authenticate
        // For demo purposes, we'll just set isAuthenticated to true
        setCurrentUser({
          id: "current-user",
          name: "Current User",
          username: "currentuser",
          avatar: "/placeholder.svg?height=100&width=100",
        })

        setIsAuthenticated(true)
        router.push("/")
      } catch (error) {
        console.error("Login error:", error)
      } finally {
        setIsLoading(false)
      }
    },
    [email, password, setCurrentUser, setIsAuthenticated, router],
  )

  if (isMobile) {
    return (
      <DesktopLayout showNav={false} showRightSidebar={false}>
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">Welcome to LxnkUp</h1>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password" className="text-sm text-brand-green">
                  Forgot Password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <Button type="submit" className="w-full bg-brand-green hover:bg-brand-green/90" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/register" className="text-brand-green font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </DesktopLayout>
    )
  }

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="bg-brand-green flex flex-col justify-center items-center p-8 text-white">
        <div className="text-4xl font-bold mb-4">LxnkUp</div>
        <h1 className="text-3xl font-bold mb-4">Welcome back</h1>
        <p className="text-xl max-w-md text-center">Sign in to continue sharing your stories with the world.</p>
      </div>

      <div className="flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6">Sign In</h1>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="desktop-email">Email</Label>
              <Input
                id="desktop-email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="py-6"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="desktop-password">Password</Label>
                <Link href="/forgot-password" className="text-sm text-brand-green">
                  Forgot Password?
                </Link>
              </div>
              <Input
                id="desktop-password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="py-6"
                disabled={isLoading}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-brand-green hover:bg-brand-green/90 py-6 text-lg"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/register" className="text-brand-green font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
