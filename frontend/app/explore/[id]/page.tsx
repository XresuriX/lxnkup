"use client"

import { MobileLayout } from "@/components/mobile-layout"
import { UserAvatar } from "@/components/user-avatar"
import { useAppStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"

export default function ExplorePostDetail() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const explorePosts = useAppStore((state) => state.explorePosts)
  const post = explorePosts.find((p) => p.id === id)
  const [isLiked, setIsLiked] = useState(false)

  if (!post) {
    return (
      <MobileLayout>
        <div className="p-4">
          <p>Post not found</p>
          <Link href="/explore">
            <Button variant="outline" className="mt-4">
              Back to Explore
            </Button>
          </Link>
        </div>
      </MobileLayout>
    )
  }

  return (
    <MobileLayout showNav={false}>
      <div className="flex flex-col h-[calc(100vh-44px)]">
        <div className="border-b p-3 flex items-center gap-3">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <h1 className="font-medium">Explore Post</h1>

          <Button variant="ghost" size="icon" className="h-8 w-8 ml-auto">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-3 flex items-center gap-3 border-b">
            <UserAvatar src="/placeholder.svg?height=100&width=100" name="Post Author" size="sm" />

            <div className="flex-1">
              <p className="font-medium">Post Author</p>
              <p className="text-xs text-muted-foreground">Location</p>
            </div>

            <Button variant="outline" size="sm">
              Follow
            </Button>
          </div>

          <div className="aspect-square w-full relative">
            <Image src={post.image || "/placeholder.svg"} alt={`Post ${post.id}`} fill className="object-cover" />
          </div>

          <div className="p-3">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsLiked(!isLiked)}>
                  <Heart className={`h-5 w-5 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                </Button>

                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MessageCircle className="h-5 w-5" />
                </Button>

                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Send className="h-5 w-5" />
                </Button>
              </div>

              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Bookmark className="h-5 w-5" />
              </Button>
            </div>

            <p className="font-medium">{isLiked ? post.likes + 1 : post.likes} likes</p>

            <div className="mt-2">
              <p>
                <span className="font-medium">Post Author</span> This is a beautiful photo I took during my travels.
                Hope you like it!
              </p>
            </div>

            <p className="text-xs text-muted-foreground mt-2">2 HOURS AGO</p>
          </div>
        </div>
      </div>
    </MobileLayout>
  )
}
