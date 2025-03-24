"use client"

import type React from "react"

import { useState } from "react"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { ArrowLeft, User, Mail, Lock, Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"

export default function SignupPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would register the user here
    router.push("/onboarding/create-profile")
  }

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <header className="p-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="text-muted-foreground">
          <ArrowLeft size={24} />
        </Button>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md mx-auto">
          <div className="mb-8 flex justify-center">
            <Logo size="md" />
          </div>

          <h1 className="text-2xl font-bold mb-6 text-center">Create your account</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                type="text"
                name="name"
                placeholder="Full Name"
                icon={<User size={18} />}
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                icon={<Mail size={18} />}
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                icon={<Lock size={18} />}
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <p className="text-xs text-muted-foreground">
              By signing up, you agree to our{" "}
              <Link href="/terms" className="text-caribbean hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-caribbean hover:underline">
                Privacy Policy
              </Link>
              .
            </p>

            <Button type="submit" variant="gradient" className="w-full">
              Sign up
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <Link href="/onboarding/login" className="text-caribbean hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
