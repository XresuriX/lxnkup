import type * as React from "react"
import { cn } from "@/lib/utils"
import { getInitials } from "@/lib/utils"

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  name?: string
  status?: "online" | "offline" | "away" | "busy"
}

export function Avatar({ src, alt = "Avatar", size = "md", name, status, className, ...props }: AvatarProps) {
  const sizeClasses = {
    xs: "w-6 h-6 text-xs",
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-12 h-12 text-lg",
    xl: "w-16 h-16 text-xl",
  }

  const statusClasses = {
    online: "bg-green-500",
    offline: "bg-gray-400",
    away: "bg-yellow-500",
    busy: "bg-red-500",
  }

  const hasImage = src && src !== ""
  const initials = name ? getInitials(name) : "U"

  return (
    <div className="relative inline-block">
      <div
        className={cn("relative flex shrink-0 overflow-hidden rounded-full", sizeClasses[size], className)}
        {...props}
      >
        {hasImage ? (
          <img src={src || "/placeholder.svg"} alt={alt} className="aspect-square h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-r from-caribbean to-gold text-black font-medium">
            {initials}
          </div>
        )}
      </div>

      {status && (
        <span
          className={cn(
            "absolute right-0 bottom-0 block rounded-full ring-2 ring-background",
            statusClasses[status],
            size === "xs" || size === "sm" ? "h-2 w-2" : "h-3 w-3",
          )}
        />
      )}
    </div>
  )
}
