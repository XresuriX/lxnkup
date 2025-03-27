"use client"

import type React from "react"

import { useState } from "react"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"
import HtmlText from "@/components/ex1"
import App from "@/components/newscene"

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would authenticate the user here
    router.push("/home")
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
            <HtmlText/>
          </div>

          <h1 className="text-2xl font-bold mb-6 text-center">Log in to your account</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
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
            <HtmlText/>
            <App/>
            <div className="relative">
            <HtmlText/>
            <App/>
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

            <div className="text-right">
              <Link href="/onboarding/forgot-password" className="text-sm text-caribbean hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" variant="gradient" className="w-full">
              Log in
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/onboarding/signup" className="text-caribbean hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
