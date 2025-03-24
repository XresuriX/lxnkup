"use client"

import type React from "react"

import { useState } from "react"
import { MobileLayout } from "@/components/mobile-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ForgotPassword() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, we would send a password reset email
    // For demo purposes, we'll just show a success message
    setSubmitted(true)
  }

  return (
    <MobileLayout showNav={false}>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-2">Forgot Password?</h1>
        <p className="text-muted-foreground mb-6">Enter your email and we'll send you a link to reset your password</p>

        {submitted ? (
          <div className="space-y-6">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <p className="text-brand-green">Password reset link sent! Check your email inbox.</p>
            </div>

            <Button onClick={() => router.push("/login")} className="w-full bg-brand-green hover:bg-brand-green/90">
              Back to Login
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full bg-brand-green hover:bg-brand-green/90">
              Send Reset Link
            </Button>

            <div className="text-center">
              <Link href="/login" className="text-sm text-brand-green">
                Back to Login
              </Link>
            </div>
          </form>
        )}
      </div>
    </MobileLayout>
  )
}
