"use client"

import { useEffect, useState } from "react"
import { MobileLayout } from "@/components/mobile-layout"
import { useAppStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Mic, MicOff, Phone, Video, VideoOff } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import dynamic from "next/dynamic"
import Script from "next/script"

// Dynamically import JitsiMeeting to avoid SSR issues
const JitsiMeeting = dynamic(() => import("@jitsi/react-sdk").then((mod) => mod.JitsiMeeting), { ssr: false })

export default function VideoCall() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const conversations = useAppStore((state) => state.conversations)
  const conversation = conversations.find((c) => c.id === id)

  const [isAudioMuted, setIsAudioMuted] = useState(false)
  const [isVideoMuted, setIsVideoMuted] = useState(false)
  const [isJitsiLoaded, setIsJitsiLoaded] = useState(false)

  // Generate a random room name based on the conversation ID
  const roomName = `social-app-call-${id}-${Date.now()}`

  useEffect(() => {
    // Set a timeout to simulate the Jitsi API loading
    const timer = setTimeout(() => {
      setIsJitsiLoaded(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

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
      <Script src="https://meet.jit.si/external_api.js" strategy="lazyOnload" onLoad={() => setIsJitsiLoaded(true)} />

      <div className="flex flex-col h-screen bg-black">
        {isJitsiLoaded ? (
          <div className="flex-1 relative">
            <JitsiMeeting
              domain="meet.jit.si"
              roomName={roomName}
              configOverwrite={{
                startWithAudioMuted: isAudioMuted,
                startWithVideoMuted: isVideoMuted,
                prejoinPageEnabled: false,
                disableDeepLinking: true,
                toolbarButtons: [],
              }}
              interfaceConfigOverwrite={{
                TOOLBAR_BUTTONS: [],
                SHOW_JITSI_WATERMARK: false,
                SHOW_WATERMARK_FOR_GUESTS: false,
                DEFAULT_BACKGROUND: "#000000",
              }}
              userInfo={{
                displayName: "You",
              }}
              getIFrameRef={(iframeRef) => {
                iframeRef.style.height = "100%"
                iframeRef.style.width = "100%"
              }}
            />

            <div className="absolute top-4 left-4 text-white bg-black/50 px-3 py-1 rounded-full text-sm">
              {conversation.user.name}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-white">Connecting to call...</p>
          </div>
        )}

        <div className="h-24 bg-black flex items-center justify-center gap-4">
          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-full bg-gray-800 border-none hover:bg-gray-700"
            onClick={() => setIsAudioMuted(!isAudioMuted)}
          >
            {isAudioMuted ? <MicOff className="h-6 w-6 text-white" /> : <Mic className="h-6 w-6 text-white" />}
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-full bg-gray-800 border-none hover:bg-gray-700"
            onClick={() => setIsVideoMuted(!isVideoMuted)}
          >
            {isVideoMuted ? <VideoOff className="h-6 w-6 text-white" /> : <Video className="h-6 w-6 text-white" />}
          </Button>

          <Button variant="destructive" size="icon" className="h-12 w-12 rounded-full" onClick={handleEndCall}>
            <Phone className="h-6 w-6 rotate-135" />
          </Button>
        </div>
      </div>
    </MobileLayout>
  )
}
