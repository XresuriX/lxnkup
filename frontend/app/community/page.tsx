"use client"

import { useState } from "react"
import { Avatar } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { BottomNavigation } from "@/components/bottom-navigation"
import { ArrowLeft, Search, Plus, Users } from "lucide-react"
import { useRouter } from "next/navigation"

// Sample data
const communities = [
  {
    id: 1,
    name: "Photography Enthusiasts",
    members: 12543,
    avatar: "/placeholder.svg?height=40&width=40",
    isJoined: true,
  },
  {
    id: 2,
    name: "Travel Adventures",
    members: 8976,
    avatar: "/placeholder.svg?height=40&width=40",
    isJoined: false,
  },
  {
    id: 3,
    name: "Foodies Unite",
    members: 15234,
    avatar: "/placeholder.svg?height=40&width=40",
    isJoined: true,
  },
  {
    id: 4,
    name: "Fitness & Wellness",
    members: 7654,
    avatar: "/placeholder.svg?height=40&width=40",
    isJoined: false,
  },
  {
    id: 5,
    name: "Tech Innovators",
    members: 9876,
    avatar: "/placeholder.svg?height=40&width=40",
    isJoined: false,
  },
]

export default function CommunityPage() {
  const router = useRouter()
  const [joined, setJoined] = useState<number[]>([1, 3])

  const handleJoin = (communityId: number) => {
    setJoined((prev) => (prev.includes(communityId) ? prev.filter((id) => id !== communityId) : [...prev, communityId]))
  }

  return (
    <div className="min-h-screen bg-black pb-16">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button onClick={() => router.back()} className="text-muted-foreground">
              <ArrowLeft size={24} />
            </button>
            <h1 className="font-bold text-xl">Communities</h1>
          </div>

          <button className="text-muted-foreground">
            <Plus size={24} />
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-4">
        <div className="mb-6">
          <Input placeholder="Search communities" icon={<Search size={18} />} />
        </div>

        <div className="space-y-4">
          {communities.map((community) => (
            <div key={community.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-800/30">
              <div className="flex items-center gap-3">
                <Avatar src={community.avatar} name={community.name} size="md" />
                <div>
                  <h3 className="font-semibold">{community.name}</h3>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Users size={12} />
                    <span>{community.members.toLocaleString()} members</span>
                  </div>
                </div>
              </div>

              <Button
                variant={joined.includes(community.id) ? "outline" : "gradient"}
                size="sm"
                onClick={() => handleJoin(community.id)}
              >
                {joined.includes(community.id) ? "Joined" : "Join"}
              </Button>
            </div>
          ))}
        </div>
      </main>

      <BottomNavigation />
    </div>
  )
}
