"use client"

import { useState } from "react"
import { DesktopLayout } from "@/components/desktop-layout"
import { UserAvatar } from "@/components/user-avatar"
import { useAppStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Camera, Calendar, MapPin } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useIsMobile } from "@/hooks/use-mobile"

// Screen 20: Edit Profile Page
export default function EditProfile() {
  const router = useRouter()
  const currentUser = useAppStore((state) => state.currentUser)
  const isMobile = useIsMobile()

  const [name, setName] = useState(currentUser?.name || "")
  const [bio, setBio] = useState(
    "Digital creator and content enthusiast. Sharing my journey through photos and stories.",
  )
  const [location, setLocation] = useState("San Francisco, CA")
  const [website, setWebsite] = useState("example.com")
  const [birthdate, setBirthdate] = useState("May 15, 1990")

  const handleSave = () => {
    // In a real app, we would save the profile data
    router.push("/profile")
  }

  if (!currentUser) {
    return (
      <DesktopLayout>
        <div className="p-4">
          <p>Please log in to edit your profile</p>
          <Link href="/login">
            <Button variant="outline" className="mt-4">
              Login
            </Button>
          </Link>
        </div>
      </DesktopLayout>
    )
  }

  return (
    <DesktopLayout>
      <div className="pb-4">
        <div className="sticky top-0 z-10 bg-background border-b">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-6">
              <Link href="/profile">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <h1 className="font-bold text-xl">Edit profile</h1>
            </div>

            <Button
              onClick={handleSave}
              className="bg-foreground text-background hover:bg-foreground/90 rounded-full font-bold"
            >
              Save
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="h-32 bg-muted w-full">
            <Button
              variant="outline"
              size="icon"
              className="absolute top-12 left-1/2 transform -translate-x-1/2 h-10 w-10 rounded-full bg-background/70"
            >
              <Camera className="h-5 w-5" />
            </Button>
          </div>

          <div className="px-4 -mt-16 pt-20">
            <div className="relative inline-block">
              <UserAvatar
                src={currentUser.avatar}
                name={currentUser.name}
                size="xl"
                className="w-24 h-24 border-4 border-background"
              />
              <Button
                variant="outline"
                size="icon"
                className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-background"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-6">
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-background border-muted"
              maxLength={50}
            />
            <div className="flex justify-end">
              <span className="text-xs text-muted-foreground">{name.length}/50</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Bio</label>
            <Textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="bg-background border-muted resize-none"
              rows={3}
              maxLength={160}
            />
            <div className="flex justify-end">
              <span className="text-xs text-muted-foreground">{bio.length}/160</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Location</label>
            <div className="flex items-center border rounded-md px-3 py-2 bg-background border-muted">
              <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="border-0 p-0 focus-visible:ring-0 bg-transparent"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Website</label>
            <Input
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="bg-background border-muted"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Birth date</label>
            <div className="flex items-center border rounded-md px-3 py-2 bg-background border-muted">
              <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
              <Input
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                className="border-0 p-0 focus-visible:ring-0 bg-transparent"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              This information will not be publicly displayed. Confirm your own age, even if this account is for a
              business, pet, or something else.
            </p>
          </div>

          <div className="pt-4">
            <Link href="/professional-profile" className="text-primary">
              Switch to professional
            </Link>
          </div>
        </div>
      </div>
    </DesktopLayout>
  )
}
