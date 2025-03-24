"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface StoryCircleProps {
  id: string
  username: string
  avatar: string
  viewed?: boolean
  active?: boolean
  onPress?: (id: string) => void
}

export function StoryCircle({ id, username, avatar, viewed = false, active = false, onPress }: StoryCircleProps) {
  const [imageError, setImageError] = useState(false)

  const handlePress = () => {
    if (onPress) {
      onPress(id)
    }
  }

  return (
    <div className="flex flex-col items-center space-y-1 cursor-pointer" onClick={handlePress}>
      <div
        className={cn(
          "p-[2px] rounded-full",
          viewed ? "bg-muted" : "bg-gradient-to-tr from-brand-green to-brand-gold",
          active && "ring-2 ring-primary",
        )}
      >
        <div className="bg-background p-[2px] rounded-full">
          <div className="relative w-16 h-16 rounded-full overflow-hidden">
            {!imageError ? (
              <Image
                src={avatar || "/placeholder.svg"}
                alt={username}
                fill
                className="object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center text-2xl font-bold text-muted-foreground">
                {username.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        </div>
      </div>
      <span className="text-xs truncate max-w-[70px] text-center">{username}</span>
    </div>
  )
}
