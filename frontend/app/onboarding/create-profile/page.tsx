"use client"

import type React from "react"

import { useState } from "react"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"
import { ArrowLeft, Camera, AtSign, Info } from "lucide-react"
import { useRouter } from "next/navigation"

export default function CreateProfilePage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: "",
    bio: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would create the profile here
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
            <Logo size="md" />
          </div>

          <h1 className="text-2xl font-bold mb-6 text-center">Create your profile</h1>

          <div className="mb-8 flex justify-center">
            <div className="relative">
              <Avatar size="xl" name="User" />
              <button className="absolute bottom-0 right-0 bg-caribbean text-black p-2 rounded-full">
                <Camera size={18} />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                type="text"
                name="username"
                placeholder="Username"
                icon={<AtSign size={18} />}
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Input
                type="text"
                name="bio"
                placeholder="Bio (optional)"
                icon={<Info size={18} />}
                value={formData.bio}
                onChange={handleChange}
              />
            </div>

            <Button type="submit" variant="gradient" className="w-full">
              Create Profile
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-muted-foreground">You can always edit your profile later.</p>
          </div>
        </div>
      </main>
    </div>
  )
}
