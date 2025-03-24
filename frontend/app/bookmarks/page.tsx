"use client"

import { DesktopLayout } from "@/components/desktop-layout"
import { UserAvatar } from "@/components/user-avatar"
import { useAppStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MoreHorizontal, Plus, Heart, MessageCircle, Share2, BarChart2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useIsMobile } from "@/hooks/use-mobile"

// Screen 30: Bookmarks Page
export default function Bookmarks() {
  const currentUser = useAppStore((state) => state.currentUser)
  const posts = useAppStore((state) => state.posts)
  const isMobile = useIsMobile()

  // Mock bookmarked posts (using the first 2 posts from the store)
  const bookmarkedPosts = posts.slice(0, 2)

  return (
    <DesktopLayout>
      <div className="pb-16">
        <div className="sticky top-0 z-10 bg-background border-b">
          <div className="flex items-center p-4">
            <Link href="/">
              <Button variant="ghost" size="icon" className="h-8 w-8 mr-6">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>

            <div>
              <h1 className="font-bold text-xl">Bookmarks</h1>
              <p className="text-sm text-muted-foreground">@{currentUser?.username}</p>
            </div>

            <Button variant="ghost" size="icon" className="h-8 w-8 ml-auto">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {bookmarkedPosts.length > 0 ? (
          <div>
            {bookmarkedPosts.map((post) => (
              <div key={post.id} className="post-card">
                <div className="post-card-header">
                  <Link href={`/profile/${post.user.id}`} className="mr-3">
                    <UserAvatar src={post.user.avatar} name={post.user.name} size="sm" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center">
                      <p className="font-bold text-sm truncate">{post.user.name}</p>
                      <p className="text-muted-foreground text-sm ml-1 truncate">
                        @{post.user.username} · {post.createdAt}
                      </p>
                    </div>
                    <p className="mt-1">{post.content}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 ml-2 -mt-1">
                    <MoreHorizontal className="h-5 w-5" />
                  </Button>
                </div>

                {post.image && (
                  <div className="post-card-content mb-3">
                    <div className="rounded-xl overflow-hidden mt-2">
                      <Image
                        src={post.image || "/placeholder.svg"}
                        alt={`Post by ${post.user.name}`}
                        width={500}
                        height={300}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  </div>
                )}

                <div className="post-card-content">
                  <div className="post-card-actions">
                    <button className="post-card-action">
                      <div className="w-8 h-8 rounded-full hover:bg-primary/10 flex items-center justify-center">
                        <Heart className={`h-4 w-4 ${post.isLiked ? "fill-red-500 text-red-500" : ""}`} />
                      </div>
                      <span className="text-xs">{post.likes}</span>
                    </button>

                    <Link href={`/posts/${post.id}`} className="post-card-action">
                      <div className="w-8 h-8 rounded-full hover:bg-primary/10 flex items-center justify-center">
                        <MessageCircle className="h-4 w-4" />
                      </div>
                      <span className="text-xs">{post.comments}</span>
                    </Link>

                    <button className="post-card-action">
                      <div className="w-8 h-8 rounded-full hover:bg-primary/10 flex items-center justify-center">
                        <BarChart2 className="h-4 w-4" />
                      </div>
                      <span className="text-xs">20</span>
                    </button>

                    <button className="post-card-action">
                      <div className="w-8 h-8 rounded-full hover:bg-primary/10 flex items-center justify-center">
                        <Share2 className="h-4 w-4" />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-8 text-center h-[50vh]">
            <h2 className="text-2xl font-bold mb-2">Save posts for later</h2>
            <p className="text-muted-foreground mb-6 max-w-xs">
              Bookmark posts to easily find them again in the future.
            </p>
            <Link href="/">
              <Button className="bg-primary hover:bg-primary/90 rounded-full">Browse posts</Button>
            </Link>
          </div>
        )}
      </div>

      {isMobile && (
        <Link href="/create-post" className="floating-action-button">
          <Plus className="h-6 w-6" />
        </Link>
      )}
    </DesktopLayout>
  )
}
