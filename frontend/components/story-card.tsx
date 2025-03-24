"use client"

import { Avatar } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface StoryCardProps {
  user: {
    name: string
    avatar?: string
  }
  isViewed?: boolean
  isOwn?: boolean
  onClick?: () => void
}

export function StoryCard({ user, isViewed = false, isOwn = false, onClick }: StoryCardProps) {
  return (
    <div className="flex flex-col items-center gap-1 cursor-pointer" onClick={onClick}>
      <div className={cn("p-0.5 rounded-full", isViewed ? "bg-gray-700" : "bg-gradient-to-r from-caribbean to-gold")}>
        <Avatar
          src={user.avatar}
          name={user.name}
          size="lg"
          className={cn("border-2", isOwn ? "border-black" : "border-background")}
        />
      </div>
      <span className="text-xs truncate max-w-[64px] text-center">{isOwn ? "Your story" : user.name}</span>
    </div>
  )
}
