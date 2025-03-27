"use client"

import { useState } from "react"
import { useAppStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { UserAvatar } from "@/components/user-avatar"
import { Search, X } from "lucide-react"
import Link from "next/link"
import HtmlText from "./ex1"

export function RightSidebar() {
  const [searchQuery, setSearchQuery] = useState("")
  const users = useAppStore((state) => state.users)
  const streams = useAppStore((state) => state.streams)

  const suggestedUsers = users.filter((user) => !user.isFollowing).slice(0, 3)
  const liveStreams = streams.filter((stream) => stream.isLive).slice(0, 2)

  return (
    <div className="p-4 space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search"
          className="pl-10 bg-muted border-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7"
            onClick={() => setSearchQuery("")}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="bg-muted rounded-xl p-4">
        <HtmlText/>
      </div>

      <div className="bg-muted rounded-xl p-4">
        <h2 className="font-bold text-xl mb-4">Who to follow</h2>
        <div className="space-y-4">
          {suggestedUsers.map((user) => (
            <div key={user.id} className="flex items-center justify-between">
              <div className="flex items-center">
                <UserAvatar src={user.avatar} name={user.name} size="sm" />
                <div className="ml-3">
                  <p className="font-medium text-sm">{user.name}</p>
                  <p className="text-xs text-muted-foreground">@{user.username}</p>
                </div>
              </div>
              <Button className="bg-brand-green hover:bg-brand-green/90" size="sm">
                Follow
              </Button>
            </div>
          ))}
          <Link href="/search" className="text-brand-green text-sm hover:underline block">
            Show more
          </Link>
        </div>
      </div>

      {liveStreams.length > 0 && (
        <div className="bg-muted rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-xl">Live now</h2>
            <Button variant="ghost" size="sm" className="text-brand-green">
              See all
            </Button>
          </div>
          <div className="space-y-4">
            {liveStreams.map((stream) => (
              <Link key={stream.id} href={`/streams/${stream.id}`}>
                <div className="flex items-center justify-between hover:bg-background p-2 rounded-lg transition-colors">
                  <div className="flex items-center">
                    <div className="relative">
                      <UserAvatar src={stream.user.avatar} name={stream.user.name} size="sm" />
                      <div className="absolute -top-1 -right-1 bg-red-500 w-3 h-3 rounded-full border-2 border-background"></div>
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-sm">{stream.title}</p>
                      <p className="text-xs text-muted-foreground">@{stream.user.username}</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{stream.viewers} viewers</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="pt-4 border-t">

        <p className="text-xs text-muted-foreground mt-4">© 2025 Social Media App • Privacy • Terms • Cookies</p>
      </div>
    </div>
  )
}
