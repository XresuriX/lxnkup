"use client"

import { DesktopLayout } from "@/components/desktop-layout"
import { UserAvatar } from "@/components/user-avatar"
import { useAppStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Settings, Plus, ArrowLeft, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useIsMobile } from "@/hooks/use-mobile"

export default function Profile() {
  const currentUser = useAppStore((state) => state.currentUser)
  const isMobile = useIsMobile()

  if (!currentUser) {
    return (
      <DesktopLayout>
        <div className="p-4">
          <p>Please log in to view your profile</p>
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
        {isMobile && (
          <div className="flex items-center gap-2 p-4">
            <Link href="/">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="font-bold">{currentUser.name}</h1>
              <p className="text-xs text-muted-foreground">120 posts</p>
            </div>
          </div>
        )}

        <div className="px-4 pt-2">
          <div className="flex justify-between items-start mb-3">
            <UserAvatar src={currentUser.avatar} name={currentUser.name} size="xl" className="md:w-24 md:h-24" />

            <div className="flex gap-2">
              <Link href="/settings">
                <Button variant="outline" size="sm" className="rounded-full">
                  <Settings className="h-4 w-4 md:mr-2" />
                  <span className="hidden md:inline">Settings</span>
                </Button>
              </Link>
              <Button variant="outline" size="sm" className="rounded-full">
                Edit profile
              </Button>
            </div>
          </div>

          <div className="mb-4">
            <h2 className="font-bold text-xl">{currentUser.name}</h2>
            <p className="text-muted-foreground">@{currentUser.username}</p>

            <p className="mt-2 text-sm">
              Digital creator and content enthusiast. Sharing my journey through photos and stories.
            </p>

            <div className="flex gap-4 mt-2 text-sm">
              <p className="text-muted-foreground">
                <span className="text-foreground font-bold">350</span> Following
              </p>
              <p className="text-muted-foreground">
                <span className="text-foreground font-bold">1.2K</span> Followers
              </p>
            </div>
          </div>
        </div>

        <div className="x-tabs">
          <Link href="#posts" className="x-tab active">
            Posts
          </Link>
          <Link href="#replies" className="x-tab">
            Replies
          </Link>
          <Link href="#media" className="x-tab">
            Media
          </Link>
          <Link href="#likes" className="x-tab">
            Likes
          </Link>
        </div>

        <div className="mt-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="post-card">
              <div className="post-card-header">
                <Link href={`/profile/${currentUser.id}`} className="mr-3">
                  <UserAvatar src={currentUser.avatar} name={currentUser.name} size="sm" />
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center">
                    <p className="font-bold text-sm truncate">{currentUser.name}</p>
                    <p className="text-muted-foreground text-sm ml-1 truncate">
                      @{currentUser.username} · {i + 1}d ago
                    </p>
                  </div>
                  <p className="mt-1">This is post #{i + 1} on my profile. Check out this amazing content!</p>
                </div>
              </div>

              <div className="post-card-content mb-3">
                <div className="rounded-xl overflow-hidden mt-2">
                  <Image
                    src={`/placeholder.svg?height=300&width=300&text=Post ${i + 1}`}
                    alt={`Post ${i + 1}`}
                    width={300}
                    height={300}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>

              <div className="post-card-content">
                <div className="post-card-actions">
                  <button className="post-card-action">
                    <div className="w-8 h-8 rounded-full hover:bg-primary/10 flex items-center justify-center">
                      <Heart className="h-4 w-4" />
                    </div>
                    <span className="text-xs">{(i + 1) * 24}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isMobile && (
        <Link href="/create-post" className="floating-action-button">
          <Plus className="h-6 w-6" />
        </Link>
      )}
    </DesktopLayout>
  )
}
