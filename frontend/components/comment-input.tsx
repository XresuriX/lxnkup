"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"
import { useAppStore } from "@/lib/store"
import { v4 as uuidv4 } from "uuid"

interface CommentInputProps {
  postId: string
}

export function CommentInput({ postId }: CommentInputProps) {
  const [comment, setComment] = useState("")
  const currentUser = useAppStore((state) => state.currentUser)
  const addComment = useAppStore((state) => state.addComment)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!comment.trim() || !currentUser) return

    const newComment = {
      id: uuidv4(),
      user: currentUser,
      content: comment,
      createdAt: "Just now",
      likes: 0,
    }

    addComment(postId, newComment)
    setComment("")
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 p-3 border-t">
      <Input
        placeholder="Add a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="flex-1"
      />
      <Button type="submit" size="icon" className="bg-brand-green hover:bg-brand-green/90" disabled={!comment.trim()}>
        <Send className="h-5 w-5" />
      </Button>
    </form>
  )
}
