"use client"

import { DesktopLayout } from "@/components/desktop-layout"
import { UserAvatar } from "@/components/user-avatar"
import { useAppStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Video, Plus } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Streams() {
  const router = useRouter()
  const streams = useAppStore((state) => state.streams)

  return (
    <DesktopLayout>
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold md:hidden">Live Streams</h1>
          <Link href="/streams/create">
            <Button className="bg-brand-green hover:bg-brand-green/90" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Go Live
            </Button>
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {streams.map((stream) => (
            <div
              key={stream.id}
              className="border rounded-lg overflow-hidden cursor-pointer"
              onClick={() => router.push(`/streams/${stream.id}`)}
            >
              <div className="relative h-40 bg-muted">
                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                  <span className="w-2 h-2 bg-white rounded-full mr-1"></span>
                  LIVE
                </div>
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                  {stream.viewers} viewers
                </div>
                <div className="flex items-center justify-center h-full">
                  <Video className="h-12 w-12 text-muted-foreground" />
                </div>
              </div>

              <div className="p-3">
                <div className="flex items-center gap-3">
                  <UserAvatar src={stream.user.avatar} name={stream.user.name} size="sm" />

                  <div>
                    <p className="font-medium">{stream.title}</p>
                    <p className="text-xs text-muted-foreground">@{stream.user.username}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {streams.length === 0 && (
            <div className="text-center py-8 md:col-span-2">
              <Video className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No live streams available right now</p>
              <Button
                className="mt-4 bg-brand-green hover:bg-brand-green/90"
                onClick={() => router.push("/streams/create")}
              >
                Start Streaming
              </Button>
            </div>
          )}
        </div>
      </div>
    </DesktopLayout>
  )
}
