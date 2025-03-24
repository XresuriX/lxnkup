"use client"

import type React from "react"

import { useState } from "react"
import { MobileLayout } from "@/components/mobile-layout"
import { UserAvatar } from "@/components/user-avatar"
import { useAppStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Phone, Send, Video } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"

export default function ChatDetail() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const conversations = useAppStore((state) => state.conversations)
  const conversation = conversations.find((c) => c.id === id)
  const [message, setMessage] = useState("")

  if (!conversation) {
    return (
      <MobileLayout>
        <div className="p-4">
          <p>Conversation not found</p>
          <Link href="/messages">
            <Button variant="outline" className="mt-4">
              Back to Messages
            </Button>
          </Link>
        </div>
      </MobileLayout>
    )
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      // In a real app, we would send the message
      setMessage("")
    }
  }

  return (
    <MobileLayout showNav={false}>
      <div className="flex flex-col h-[calc(100vh-44px)]">
        <div className="border-b p-3 flex items-center gap-3">
          <Link href="/messages">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>

          <UserAvatar src={conversation.user.avatar} name={conversation.user.name} size="sm" />

          <div className="flex-1">
            <p className="font-medium">{conversation.user.name}</p>
            <p className="text-xs text-muted-foreground">Online</p>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => router.push(`/messages/${id}/audio-call`)}
          >
            <Phone className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => router.push(`/messages/${id}/call`)}>
            <Video className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {/* Chat messages would go here */}
          <div className="flex justify-start mb-4">
            <div className="bg-muted rounded-lg p-3 max-w-[80%]">
              <p className="text-sm">Hey, how are you doing?</p>
              <p className="text-xs text-muted-foreground mt-1">10:30 AM</p>
            </div>
          </div>

          <div className="flex justify-end mb-4">
            <div className="bg-brand-green text-white rounded-lg p-3 max-w-[80%]">
              <p className="text-sm">I'm good! Just checking out this new app.</p>
              <p className="text-xs text-white/70 mt-1">10:32 AM</p>
            </div>
          </div>

          <div className="flex justify-start">
            <div className="bg-muted rounded-lg p-3 max-w-[80%]">
              <p className="text-sm">It looks great! Let's catch up later.</p>
              <p className="text-xs text-muted-foreground mt-1">10:33 AM</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSendMessage} className="border-t p-3 flex items-center gap-2">
          <Input
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="icon" className="bg-brand-green hover:bg-brand-green/90">
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </MobileLayout>
  )
}
