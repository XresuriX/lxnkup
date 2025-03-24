"use client"

import { useState } from "react"
import { UserAvatar } from "@/components/user-avatar"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Share2, BarChart2, MoreHorizontal } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useAppStore } from "@/lib/store"

interface PostCardProps {
  id: string
  user: {
    id: string
    name: string
    username: string
    avatar: string
  }
  content: string
  image: string
  likes: number
  comments: number
  isLiked: boolean
  createdAt: string
  showComments?: boolean
}

export function PostCard({
  id,
  user,
  content,
  image,
  likes,
  comments,
  isLiked: initialIsLiked,
  createdAt,
  showComments = false,
}: PostCardProps) {
  const [isLiked, setIsLiked] = useState(initialIsLiked)
  const [likesCount, setLikesCount] = useState(likes)
  const postComments = useAppStore((state) => state.comments[id] || [])

  const handleLike = () => {
    if (isLiked) {
      setIsLiked(false)
      setLikesCount((prev) => prev - 1)
    } else {
      setIsLiked(true)
      setLikesCount((prev) => prev + 1)
    }
  }

  return (
    <div className="post-card">
      <div className="post-card-header">
        <Link href={`/profile/${user.id}`} className="mr-3">
          <UserAvatar src={user.avatar} name={user.name} size="sm" />
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex items-center">
            <p className="font-bold text-sm truncate">{user.name}</p>
            <p className="text-muted-foreground text-sm ml-1 truncate">
              @{user.username} · {createdAt}
            </p>
          </div>
          <p className="mt-1">{content}</p>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8 ml-2 -mt-1">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </div>

      {image && (
        <div className="post-card-content mb-3">
          <div className="rounded-xl overflow-hidden mt-2">
            <Image
              src={image || "/placeholder.svg"}
              alt={`Post by ${user.name}`}
              width={500}
              height={300}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      )}

      <div className="post-card-content">
        <div className="post-card-actions">
          <button className="post-card-action" onClick={handleLike}>
            <div className="w-8 h-8 rounded-full hover:bg-primary/10 flex items-center justify-center">
              <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
            </div>
            <span className="text-xs">{likesCount}</span>
          </button>

          <Link href={`/posts/${id}`} className="post-card-action">
            <div className="w-8 h-8 rounded-full hover:bg-primary/10 flex items-center justify-center">
              <MessageCircle className="h-4 w-4" />
            </div>
            <span className="text-xs">{comments}</span>
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

        {showComments && postComments.length > 0 && (
          <div className="mt-2 space-y-1">
            {postComments.slice(0, 2).map((comment) => (
              <p key={comment.id} className="text-sm">
                <Link href={`/profile/${comment.user.id}`} className="font-medium">
                  {comment.user.username}
                </Link>{" "}
                {comment.content}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
