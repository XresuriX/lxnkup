"use client"

import { Avatar } from "@/components/ui/avatar"
import { formatDate } from "@/lib/utils"
import { cn } from "@/lib/utils"

interface MessageCardProps {
  user: {
    name: string
    avatar?: string
    status?: "online" | "offline" | "away" | "busy"
  }
  message: string
  timestamp: Date
  isUnread?: boolean
  isOwn?: boolean
  onClick?: () => void
}

export function MessageCard({ user, message, timestamp, isUnread = false, isOwn = false, onClick }: MessageCardProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 p-3 rounded-xl transition-colors",
        isUnread ? "bg-black/30" : "hover:bg-black/20",
        "cursor-pointer",
      )}
      onClick={onClick}
    >
      <Avatar src={user.avatar} name={user.name} status={user.status} size="md" />

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className={cn("font-semibold", isUnread && "text-white")}>{user.name}</h3>
          <span className="text-xs text-muted-foreground">{formatDate(timestamp)}</span>
        </div>

        <p className={cn("text-sm truncate", isUnread ? "text-white font-medium" : "text-muted-foreground")}>
          {isOwn && "You: "}
          {message}
        </p>
      </div>

      {isUnread && <div className="w-2 h-2 rounded-full bg-caribbean"></div>}
    </div>
  )
}
