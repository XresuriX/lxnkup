"use client"

import { DesktopLayout } from "@/components/desktop-layout"
import { UserAvatar } from "@/components/user-avatar"
import { useAppStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SearchIcon, Plus } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { useIsMobile } from "@/hooks/use-mobile"

export default function Search() {
  const users = useAppStore((state) => state.users)
  const followUser = useAppStore((state) => state.followUser)
  const unfollowUser = useAppStore((state) => state.unfollowUser)
  const [searchQuery, setSearchQuery] = useState("")
  const isMobile = useIsMobile()

  const filteredUsers = searchQuery
    ? users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.username.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : users

  return (
    <DesktopLayout>
      <div className="p-4 max-w-3xl mx-auto">
        {!isMobile && <h1 className="text-2xl font-bold mb-4">Discover People</h1>}

        <div className="relative mb-6">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search users"
            className="pl-10 bg-muted border-none rounded-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="space-y-4">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between p-3 hover:bg-muted rounded-lg transition-colors"
            >
              <div className="flex items-center gap-3">
                <UserAvatar src={user.avatar} name={user.name} size="md" />

                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-muted-foreground">@{user.username}</p>
                </div>
              </div>

              {user.isFollowing ? (
                <Button variant="outline" size="sm" onClick={() => unfollowUser(user.id)}>
                  Following
                </Button>
              ) : (
                <Button
                  className="bg-foreground text-background hover:bg-foreground/90 rounded-full"
                  size="sm"
                  onClick={() => followUser(user.id)}
                >
                  Follow
                </Button>
              )}
            </div>
          ))}

          {filteredUsers.length === 0 && (
            <p className="text-center text-muted-foreground py-4">No users found matching "{searchQuery}"</p>
          )}
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
