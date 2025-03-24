"use client"

import { DesktopLayout } from "@/components/desktop-layout"
import { UserAvatar } from "@/components/user-avatar"
import { useAppStore } from "@/lib/store"
import Link from "next/link"
import { Search, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useIsMobile } from "@/hooks/use-mobile"

export default function Messages() {
  const conversations = useAppStore((state) => state.conversations)
  const isMobile = useIsMobile()

  return (
    <DesktopLayout>
      <div className="p-4">
        {!isMobile && <h1 className="text-2xl font-bold mb-4">Messages</h1>}

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input placeholder="Search messages" className="pl-10 bg-muted border-none rounded-full" />
        </div>

        <div className="space-y-0">
          {conversations.map((conversation) => (
            <Link
              key={conversation.id}
              href={`/messages/${conversation.id}`}
              className="flex items-center gap-3 p-4 hover:bg-muted border-b"
            >
              <UserAvatar src={conversation.user.avatar} name={conversation.user.name} size="md" />

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold">{conversation.user.name}</p>
                    <p className="text-sm text-muted-foreground">@{conversation.user.username}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                </div>
                <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
              </div>

              {conversation.unread > 0 && (
                <div className="bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {conversation.unread}
                </div>
              )}
            </Link>
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
