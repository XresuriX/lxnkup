"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { DesktopLayout } from "@/components/desktop-layout"
import { UserAvatar } from "@/components/user-avatar"
import { useAppStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Heart, Send, Gift, Share2, Mic, MicOff, Video, VideoOff } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import dynamic from "next/dynamic"
import Script from "next/script"
import { useIsMobile } from "@/hooks/use-mobile"

// Dynamically import JitsiMeeting to avoid SSR issues
const JitsiMeeting = dynamic(() => import("@jitsi/react-sdk").then((mod) => mod.JitsiMeeting), { ssr: false })

export default function StreamDetail() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const streams = useAppStore((state) => state.streams)
  const stream = streams.find((s) => s.id === id)
  const isMobile = useIsMobile()

  const [message, setMessage] = useState("")
  const [isJitsiLoaded, setIsJitsiLoaded] = useState(false)
  const [isAudioMuted, setIsAudioMuted] = useState(false)
  const [isVideoMuted, setIsVideoMuted] = useState(false)
  const [viewerCount, setViewerCount] = useState(stream?.viewers || 0)
  const [comments, setComments] = useState([
    {
      id: "1",
      user: { name: "John", avatar: "/placeholder.svg?height=50&width=50" },
      text: "Great stream!",
      time: "2m ago",
    },
    {
      id: "2",
      user: { name: "Emma", avatar: "/placeholder.svg?height=50&width=50" },
      text: "How are you today?",
      time: "1m ago",
    },
    {
      id: "3",
      user: { name: "Mike", avatar: "/placeholder.svg?height=50&width=50" },
      text: "Love the content!",
      time: "Just now",
    },
  ])

  // Generate a random room name based on the stream ID
  const roomName = `social-app-stream-${id}`

  useEffect(() => {
    // Set a timeout to simulate the Jitsi API loading
    const timer = setTimeout(() => {
      setIsJitsiLoaded(true)
    }, 1000)

    // Simulate increasing viewer count
    const viewerTimer = setInterval(() => {
      setViewerCount((prev) => prev + 1)
    }, 30000)

    return () => {
      clearTimeout(timer)
      clearInterval(viewerTimer)
    }
  }, [])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()

    if (!message.trim()) return

    const newComment = {
      id: Date.now().toString(),
      user: { name: "You", avatar: "/placeholder.svg?height=50&width=50" },
      text: message,
      time: "Just now",
    }

    setComments([...comments, newComment])
    setMessage("")
  }

  if (!stream) {
    return (
      <DesktopLayout>
        <div className="p-4">
          <p>Stream not found</p>
          <Button variant="outline" className="mt-4" onClick={() => router.push("/streams")}>
            Back to Streams
          </Button>
        </div>
      </DesktopLayout>
    )
  }

  if (isMobile) {
    return (
      <DesktopLayout showNav={false} showStatusBar={false}>
        <Script src="https://meet.jit.si/external_api.js" strategy="lazyOnload" onLoad={() => setIsJitsiLoaded(true)} />

        <div className="flex flex-col h-screen">
          <div className="relative h-[40vh] bg-black">
            {isJitsiLoaded ? (
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
                  displayName: stream.user.name,
                }}
                getIFrameRef={(iframeRef) => {
                  iframeRef.style.height = "100%"
                  iframeRef.style.width = "100%"
                }}
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-white">Loading stream...</p>
              </div>
            )}

            <div className="absolute top-4 left-4 flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 bg-black/50 text-white hover:bg-black/70"
                onClick={() => router.push("/streams")}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </div>

            <div className="absolute top-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
              {viewerCount} viewers
            </div>

            <div className="absolute bottom-4 right-4 flex gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full bg-black/50 border-none hover:bg-black/70 text-white"
                onClick={() => setIsAudioMuted(!isAudioMuted)}
              >
                {isAudioMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full bg-black/50 border-none hover:bg-black/70 text-white"
                onClick={() => setIsVideoMuted(!isVideoMuted)}
              >
                {isVideoMuted ? <VideoOff className="h-4 w-4" /> : <Video className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="p-3 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserAvatar src={stream.user.avatar} name={stream.user.name} size="sm" />

                <div>
                  <p className="font-medium">{stream.title}</p>
                  <p className="text-xs text-muted-foreground">@{stream.user.username}</p>
                </div>
              </div>

              <Button className="bg-brand-green hover:bg-brand-green/90" size="sm">
                Follow
              </Button>
            </div>

            <div className="flex gap-2 mt-3">
              <Button variant="outline" size="sm" className="flex-1 flex items-center gap-1">
                <Heart className="h-4 w-4" />
                <span>Like</span>
              </Button>

              <Button variant="outline" size="sm" className="flex-1 flex items-center gap-1">
                <Gift className="h-4 w-4" />
                <span>Gift</span>
              </Button>

              <Button variant="outline" size="sm" className="flex-1 flex items-center gap-1">
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3">
            <h2 className="font-medium mb-3">Comments</h2>

            <div className="space-y-3">
              {comments.map((comment) => (
                <div key={comment.id} className="flex items-start gap-2">
                  <UserAvatar src={comment.user.avatar} name={comment.user.name} size="sm" />

                  <div className="bg-muted rounded-lg p-2 flex-1">
                    <div className="flex justify-between items-center">
                      <p className="font-medium text-sm">{comment.user.name}</p>
                      <p className="text-xs text-muted-foreground">{comment.time}</p>
                    </div>
                    <p className="text-sm">{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSendMessage} className="border-t p-3 flex items-center gap-2">
            <Input
              placeholder="Add a comment..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1"
            />
            <Button
              type="submit"
              size="icon"
              className="bg-brand-green hover:bg-brand-green/90"
              disabled={!message.trim()}
            >
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </DesktopLayout>
    )
  }

  // Desktop layout
  return (
    <DesktopLayout>
      <Script src="https://meet.jit.si/external_api.js" strategy="lazyOnload" onLoad={() => setIsJitsiLoaded(true)} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        <div className="md:col-span-2">
          <div className="mb-4">
            <Button variant="ghost" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Streams
            </Button>
          </div>

          <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
            {isJitsiLoaded ? (
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
                  displayName: stream.user.name,
                }}
                getIFrameRef={(iframeRef) => {
                  iframeRef.style.height = "100%"
                  iframeRef.style.width = "100%"
                }}
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-white">Loading stream...</p>
              </div>
            )}

            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
              <span className="w-2 h-2 bg-white rounded-full mr-1"></span>
              LIVE: {viewerCount} viewers
            </div>

            <div className="absolute bottom-2 right-2 flex gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full bg-black/50 border-none hover:bg-black/70 text-white"
                onClick={() => setIsAudioMuted(!isAudioMuted)}
              >
                {isAudioMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full bg-black/50 border-none hover:bg-black/70 text-white"
                onClick={() => setIsVideoMuted(!isVideoMuted)}
              >
                {isVideoMuted ? <VideoOff className="h-4 w-4" /> : <Video className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="mt-4 p-4 border rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <UserAvatar src={stream.user.avatar} name={stream.user.name} size="md" />

                <div>
                  <p className="font-bold text-lg">{stream.title}</p>
                  <p className="text-sm text-muted-foreground">@{stream.user.username}</p>
                </div>
              </div>

              <Button className="bg-brand-green hover:bg-brand-green/90">Follow</Button>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 flex items-center gap-1">
                <Heart className="h-4 w-4" />
                <span>Like</span>
              </Button>

              <Button variant="outline" className="flex-1 flex items-center gap-1">
                <Gift className="h-4 w-4" />
                <span>Gift</span>
              </Button>

              <Button variant="outline" className="flex-1 flex items-center gap-1">
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="border rounded-lg overflow-hidden flex flex-col h-[calc(100vh-160px)]">
          <div className="p-3 border-b">
            <h2 className="font-bold text-lg">Live Chat</h2>
          </div>

          <div className="flex-1 overflow-y-auto p-3">
            <div className="space-y-3">
              {comments.map((comment) => (
                <div key={comment.id} className="flex items-start gap-2">
                  <UserAvatar src={comment.user.avatar} name={comment.user.name} size="sm" />

                  <div className="bg-muted rounded-lg p-2 flex-1">
                    <div className="flex justify-between items-center">
                      <p className="font-medium text-sm">{comment.user.name}</p>
                      <p className="text-xs text-muted-foreground">{comment.time}</p>
                    </div>
                    <p className="text-sm">{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSendMessage} className="border-t p-3 flex items-center gap-2">
            <Input
              placeholder="Add a comment..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1"
            />
            <Button
              type="submit"
              size="icon"
              className="bg-brand-green hover:bg-brand-green/90"
              disabled={!message.trim()}
            >
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </div>
    </DesktopLayout>
  )
}
