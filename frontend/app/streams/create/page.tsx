"use client"

import { useState } from "react"
import { MobileLayout } from "@/components/mobile-layout"
import { UserAvatar } from "@/components/user-avatar"
import { useAppStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Video, Users, Globe, Lock } from "lucide-react"
import { useRouter } from "next/navigation"
import { v4 as uuidv4 } from "uuid"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CreateStream() {
  const router = useRouter()
  const currentUser = useAppStore((state) => state.currentUser)
  const [title, setTitle] = useState("")
  const [privacy, setPrivacy] = useState("public")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleStartStream = () => {
    if (!title.trim() || !currentUser) return

    setIsSubmitting(true)

    // In a real app, we would create a stream on the server
    // For demo purposes, we'll just redirect to the stream page
    const streamId = uuidv4()

    // Simulate a delay for the stream creation
    setTimeout(() => {
      router.push(`/streams/${streamId}`)
    }, 1000)
  }

  return (
    <MobileLayout showNav={false}>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Create Stream</h1>
        </div>

        {currentUser && (
          <div className="flex items-center gap-3 mb-6">
            <UserAvatar src={currentUser.avatar} name={currentUser.name} size="md" />

            <div>
              <p className="font-medium">{currentUser.name}</p>
              <p className="text-xs text-muted-foreground">@{currentUser.username}</p>
            </div>
          </div>
        )}

        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Stream Title
            </label>
            <Input
              id="title"
              placeholder="Enter a title for your stream"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="privacy" className="text-sm font-medium">
              Privacy
            </label>
            <Select value={privacy} onValueChange={setPrivacy}>
              <SelectTrigger>
                <SelectValue placeholder="Select privacy setting" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    <span>Public</span>
                  </div>
                </SelectItem>
                <SelectItem value="followers">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>Followers Only</span>
                  </div>
                </SelectItem>
                <SelectItem value="private">
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    <span>Private</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <Video className="h-5 w-5 text-brand-green" />
              <h3 className="font-medium">Stream Tips</h3>
            </div>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li>• Ensure you have a stable internet connection</li>
              <li>• Use good lighting for better video quality</li>
              <li>• Test your microphone before going live</li>
              <li>• Interact with your viewers during the stream</li>
            </ul>
          </div>

          <Button
            className="w-full bg-brand-green hover:bg-brand-green/90"
            onClick={handleStartStream}
            disabled={!title.trim() || isSubmitting}
          >
            {isSubmitting ? "Starting Stream..." : "Go Live"}
          </Button>
        </div>
      </div>
    </MobileLayout>
  )
}
