"use client"

import { Button } from "@/components/ui/button"

import { useEffect } from "react"
import { useAppStore } from "@/lib/store"
import { DesktopLayout } from "@/components/desktop-layout"
import Link from "next/link"
import { PostCard } from "@/components/post-card"
import { Plus } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import { useRouter } from "next/navigation"
import { StoriesContainer } from "@/components/stories/stories-container"

export default function Following() {
  const isAuthenticated = useAppStore((state) => state.isAuthenticated)
  const users = useAppStore((state) => state.users)
  const posts = useAppStore((state) => state.posts)
  const isMobile = useIsMobile()
  const router = useRouter()

  // Get only posts from followed users
  const followedUsers = users.filter((user) => user.isFollowing).map((user) => user.id)
  const followingPosts = posts.filter((post) => followedUsers.includes(post.user.id))

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

        {followingPosts.length > 0 ? (
          <div className="mt-2">
            {followingPosts.map((post) => (
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
        ) : (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <h2 className="text-xl font-bold mb-2">No posts yet</h2>
            <p className="text-muted-foreground mb-6 max-w-xs">When you follow people, their posts will appear here.</p>
            <Link href="/search">
              <Button className="bg-brand-green hover:bg-brand-green/90">Find people to follow</Button>
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
