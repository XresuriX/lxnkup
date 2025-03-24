"use client"

import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { useState } from "react"

interface SuggestedUser {
  id: number
  name: string
  username: string
  avatar?: string
  verified?: boolean
}

interface WhoToFollowProps {
  users: SuggestedUser[]
}

export function WhoToFollow({ users }: WhoToFollowProps) {
  const [followingIds, setFollowingIds] = useState<number[]>([])

  const toggleFollow = (userId: number) => {
    setFollowingIds((prev) => (prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="bg-twitter-gray rounded-2xl overflow-hidden"
    >
      <h2 className="text-xl font-bold p-4">Who to follow</h2>

      <div>
        {users.map((user, index) => {
          const isFollowing = followingIds.includes(user.id)

          return (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.1 + index * 0.05 }}
              className="px-4 py-3 hover:bg-twitter-lightGray transition-colors cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <Avatar src={user.avatar} name={user.name} size="md" />
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-bold hover:underline">{user.name}</span>
                    {user.verified && (
                      <span className="text-caribbean">
                        <svg viewBox="0 0 24 24" aria-label="Verified account" className="w-4 h-4 fill-current">
                          <g>
                            <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z"></path>
                          </g>
                        </svg>
                      </span>
                    )}
                  </div>
                  <span className="text-muted-foreground text-sm">@{user.username}</span>
                </div>
              </div>

              <Button
                variant={isFollowing ? "outline" : "default"}
                className={
                  isFollowing
                    ? "rounded-full border-twitter-gray text-foreground hover:bg-red-500/10 hover:text-red-500 hover:border-red-500 font-bold"
                    : "rounded-full bg-white text-black hover:bg-white/90 font-bold"
                }
                size="sm"
                onClick={() => toggleFollow(user.id)}
              >
                {isFollowing ? "Following" : "Follow"}
              </Button>
            </motion.div>
          )
        })}
      </div>

      <Link href="/connect" className="block p-4 text-caribbean hover:bg-twitter-lightGray transition-colors">
        Show more
      </Link>
    </motion.div>
  )
}
