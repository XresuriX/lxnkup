"use client"

import { useState } from "react"
import { MobileLayout } from "@/components/mobile-layout"
import { UserAvatar } from "@/components/user-avatar"
import { useAppStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Mic, MicOff, Phone, VolumeX, Volume2 } from "lucide-react"
import { useParams, useRouter } from "next/navigation"

export default function AudioCall() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const conversations = useAppStore((state) => state.conversations)
  const conversation = conversations.find((c) => c.id === id)

  const [isAudioMuted, setIsAudioMuted] = useState(false)
  const [isSpeakerOn, setIsSpeakerOn] = useState(true)
  const [callDuration, setCallDuration] = useState("00:00")

  const handleEndCall = () => {
    router.push(`/messages/${id}`)
  }

  if (!conversation) {
    return (
      <MobileLayout showNav={false} showStatusBar={false}>
        <div className="p-4">
          <p>Conversation not found</p>
          <Button variant="outline" className="mt-4" onClick={() => router.push("/messages")}>
            Back to Messages
          </Button>
        </div>
      </MobileLayout>
    )
  }

  return (
    <MobileLayout showNav={false} showStatusBar={false}>
      <div className="flex flex-col h-screen bg-brand-green">
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <UserAvatar
            src={conversation.user.avatar}
            name={conversation.user.name}
            size="xl"
            className="w-24 h-24 mb-4"
          />

          <h1 className="text-2xl font-bold text-white mb-2">{conversation.user.name}</h1>

          <p className="text-white/80 mb-6">{callDuration}</p>

          <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
            <div className="flex flex-col items-center">
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-full bg-white/20 border-none hover:bg-white/30 mb-2"
                onClick={() => setIsAudioMuted(!isAudioMuted)}
              >
                {isAudioMuted ? <MicOff className="h-6 w-6 text-white" /> : <Mic className="h-6 w-6 text-white" />}
              </Button>
              <span className="text-white/80 text-sm">{isAudioMuted ? "Unmute" : "Mute"}</span>
            </div>

            <div className="flex flex-col items-center">
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-full bg-white/20 border-none hover:bg-white/30 mb-2"
                onClick={() => setIsSpeakerOn(!isSpeakerOn)}
              >
                {isSpeakerOn ? <Volume2 className="h-6 w-6 text-white" /> : <VolumeX className="h-6 w-6 text-white" />}
              </Button>
              <span className="text-white/80 text-sm">{isSpeakerOn ? "Speaker" : "Headset"}</span>
            </div>
          </div>
        </div>

        <div className="h-24 bg-black/10 flex items-center justify-center">
          <Button variant="destructive" size="icon" className="h-16 w-16 rounded-full" onClick={handleEndCall}>
            <Phone className="h-8 w-8 rotate-135" />
          </Button>
        </div>
      </div>
    </MobileLayout>
  )
}
