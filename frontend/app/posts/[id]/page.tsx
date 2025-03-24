"use client"

import { DesktopLayout } from "@/components/desktop-layout"
import { UserAvatar } from "@/components/user-avatar"
import { useAppStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { CommentInput } from "@/components/comment-input"
import { useIsMobile } from "@/hooks/use-mobile"

export default function PostDetail() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const posts = useAppStore((state) => state.posts)
  const post = posts.find((p) => p.id === id)
  const comments = useAppStore((state) => state.comments[id] || [])
  const [isLiked, setIsLiked] = useState(post?.isLiked || false)
  const [isSaved, setIsSaved] = useState(false)
  const isMobile = useIsMobile()

  if (!post) {
    return (
      <DesktopLayout>
        <div className="p-4">
          <p>Post not found</p>
          <Link href="/">
            <Button variant="outline" className="mt-4">
              Back to Feed
            </Button>
          </Link>
        </div>
      </DesktopLayout>
    )
  }

  return (
    <DesktopLayout>
      <div className={`${isMobile ? "h-[calc(100vh-44px)]" : ""} flex flex-col`}>
        {isMobile && (
          <div className="border-b p-3 flex items-center gap-3">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>

            <h1 className="font-medium">Post</h1>

            <Button variant="ghost" size="icon" className="h-8 w-8 ml-auto">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </div>
        )}

        <div className={`flex-1 overflow-y-auto ${!isMobile ? "max-w-3xl mx-auto p-4" : ""}`}>
          {!isMobile && (
            <Button variant="ghost" className="mb-4" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </Button>
          )}

          <div className="bg-background rounded-lg overflow-hidden border">
            <div className="p-3 flex items-center gap-3 border-b">
              <UserAvatar src={post.user.avatar} name={post.user.name} size="sm" />

              <div className="flex-1">
                <p className="font-medium">{post.user.name}</p>
                <p className="text-xs text-muted-foreground">@{post.user.username}</p>
              </div>

              <Button variant="outline" size="sm">
                Follow
              </Button>
            </div>

            <div className={`${isMobile ? "aspect-square" : "max-h-[500px]"} w-full relative`}>
              <Image
                src={post.image || "/placeholder.svg"}
                alt={`Post by ${post.user.name}`}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-3 border-b">
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

                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsSaved(!isSaved)}>
                  <Bookmark className={`h-5 w-5 ${isSaved ? "fill-brand-green text-brand-green" : ""}`} />
                </Button>
              </div>

              <p className="font-medium">{isLiked ? post.likes + 1 : post.likes} likes</p>

              <div className="mt-2">
                <p>
                  <span className="font-medium">{post.user.username}</span> {post.content}
                </p>
              </div>

              <p className="text-xs text-muted-foreground mt-2 uppercase">{post.createdAt}</p>
            </div>

            <div className="p-3">
              <h2 className="font-medium mb-3">Comments</h2>

              {comments.length > 0 ? (
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex items-start gap-3">
                      <UserAvatar src={comment.user.avatar} name={comment.user.name} size="sm" />

                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-sm">{comment.user.username}</p>
                          <p className="text-xs text-muted-foreground">{comment.createdAt}</p>
                        </div>
                        <p className="text-sm">{comment.content}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <button className="text-xs text-muted-foreground">Like</button>
                          <button className="text-xs text-muted-foreground">Reply</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">No comments yet. Be the first to comment!</p>
              )}
            </div>
          </div>

          <CommentInput postId={id} />
        </div>
      </div>
    </DesktopLayout>
  )
}
