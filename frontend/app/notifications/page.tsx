"use client"

import { DesktopLayout } from "@/components/desktop-layout"
import { UserAvatar } from "@/components/user-avatar"
import { Button } from "@/components/ui/button"
import { Heart, Plus } from "lucide-react"
import Link from "next/link"
import { useIsMobile } from "@/hooks/use-mobile"

export default function Notifications() {
  const isMobile = useIsMobile()

  // Mock notification data
  const notifications = [
    {
      id: "1",
      user: {
        id: "1",
        name: "Alexandra Pires",
        username: "alexandra_pires",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      type: "like",
      content: "liked your photo",
      time: "2h ago",
    },
    {
      id: "2",
      user: {
        id: "2",
        name: "John Smith",
        username: "johnsmith",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      type: "follow",
      content: "started following you",
      time: "5h ago",
    },
    {
      id: "3",
      user: {
        id: "3",
        name: "Emma Johnson",
        username: "emmaj",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      type: "comment",
      content: "commented on your post",
      time: "1d ago",
    },
  ]

  return (
    <DesktopLayout>
      <div className="pb-4">
        {!isMobile && <h1 className="text-2xl font-bold mb-4 px-4">Notifications</h1>}

        <div className="space-y-0">
          {notifications.map((notification) => (
            <div key={notification.id} className="flex items-start gap-3 p-4 hover:bg-muted transition-colors border-b">
              {notification.type === "like" && (
                <div className="mt-2 w-8 h-8 flex items-center justify-center text-primary">
                  <Heart className="w-5 h-5" />
                </div>
              )}

              {notification.type === "follow" && (
                <div className="mt-2 w-8 h-8 flex items-center justify-center text-primary">
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5">
                    <g>
                      <path
                        fill="currentColor"
                        d="M17.863 13.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44zM12 2C9.791 2 8 3.79 8 6s1.791 4 4 4 4-1.79 4-4-1.791-4-4-4z"
                      ></path>
                    </g>
                  </svg>
                </div>
              )}

              {notification.type === "comment" && (
                <div className="mt-2 w-8 h-8 flex items-center justify-center text-primary">
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5">
                    <g>
                      <path
                        fill="currentColor"
                        d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"
                      ></path>
                    </g>
                  </svg>
                </div>
              )}

              <div className="flex-1">
                <UserAvatar src={notification.user.avatar} name={notification.user.name} size="md" className="mb-2" />
                <p>
                  <span className="font-bold">{notification.user.name}</span>{" "}
                  <span className="text-muted-foreground">@{notification.user.username}</span>
                  <br />
                  {notification.content}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
              </div>

              {notification.type === "follow" && (
                <Button className="bg-foreground text-background hover:bg-foreground/90 rounded-full" size="sm">
                  Follow
                </Button>
              )}
            </div>
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
