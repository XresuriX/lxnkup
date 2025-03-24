"use client"

import { useEffect } from "react"
import { useAppStore } from "@/lib/store"
import { DesktopLayout } from "@/components/desktop-layout"
import Link from "next/link"
import { PostCard } from "@/components/post-card"
import { Plus } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import { useRouter } from "next/navigation"
import { StoriesContainer } from "@/components/stories/stories-container"

export default function Home() {
  const isAuthenticated = useAppStore((state) => state.isAuthenticated)
  const posts = useAppStore((state) => state.posts)
  const isMobile = useIsMobile()
  const router = useRouter()

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated && typeof window !== "undefined") {
      router.push("/welcome")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null // Return null to avoid rendering anything while redirecting
  }

  return (
    <DesktopLayout>
      <div className="pb-4">
        {/* Stories */}
        <StoriesContainer />

        {isMobile && (
          <div className="bg-brand-green text-white p-3 flex items-center justify-between rounded-md mb-3 mx-3">
            <div className="flex-1 text-center">
              <span className="text-sm font-medium">Latest updates available</span>
            </div>
          </div>
        )}

        <div className="text-center py-3 text-primary">
          <button className="hover:underline">Show new posts</button>
        </div>

        <div className="mt-2">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              user={post.user}
              content={post.content}
              image={post.image}
              likes={post.likes}
              comments={post.comments}
              isLiked={post.isLiked}
              createdAt={post.createdAt}
              showComments={true}
            />
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
