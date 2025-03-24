"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { X, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAppStore } from "@/lib/store"
import { UserAvatar } from "@/components/user-avatar"
import { Input } from "@/components/ui/input"

interface StoryViewerProps {
  storyId: string
}

export function StoryViewer({ storyId }: StoryViewerProps) {
  const router = useRouter()
  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [message, setMessage] = useState("")
  const progressInterval = useRef<NodeJS.Timeout | null>(null)

  const stories = useAppStore((state) => state.stories)
  const markStoryAsViewed = useAppStore((state) => state.markStoryAsViewed)

  const story = stories.find((s) => s.id === storyId)

  useEffect(() => {
    if (!story) {
      router.push("/")
      return
    }

    // Mark story as viewed
    markStoryAsViewed(storyId)

    // Reset progress when story changes
    setProgress(0)
    setActiveIndex(0)

    // Clean up interval on unmount
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current)
      }
    }
  }, [storyId, story, router, markStoryAsViewed])

  useEffect(() => {
    if (isPaused) {
      if (progressInterval.current) {
        clearInterval(progressInterval.current)
        progressInterval.current = null
      }
      return
    }

    // Start progress
    progressInterval.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          // Move to next story or close
          clearInterval(progressInterval.current!)

          // If there are more stories, go to next one
          if (story && story.items && activeIndex < story.items.length - 1) {
            setActiveIndex((prev) => prev + 1)
            return 0
          } else {
            // Find next user's story
            const storyIndex = stories.findIndex((s) => s.id === storyId)
            if (storyIndex < stories.length - 1) {
              router.push(`/stories/${stories[storyIndex + 1].id}`)
            } else {
              router.push("/")
            }
            return 0
          }
        }
        return prev + 1
      })
    }, 30) // 3 seconds per story (100 * 30ms = 3000ms)

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current)
      }
    }
  }, [isPaused, activeIndex, story, storyId, stories, router])

  if (!story) return null

  const currentItem = story.items?.[activeIndex]
  if (!currentItem) return null

  const handlePrevious = () => {
    if (activeIndex > 0) {
      setActiveIndex((prev) => prev - 1)
      setProgress(0)
    } else {
      // Go to previous user's story
      const storyIndex = stories.findIndex((s) => s.id === storyId)
      if (storyIndex > 0) {
        router.push(`/stories/${stories[storyIndex - 1].id}`)
      }
    }
  }

  const handleNext = () => {
    if (story.items && activeIndex < story.items.length - 1) {
      setActiveIndex((prev) => prev + 1)
      setProgress(0)
    } else {
      // Go to next user's story
      const storyIndex = stories.findIndex((s) => s.id === storyId)
      if (storyIndex < stories.length - 1) {
        router.push(`/stories/${stories[storyIndex + 1].id}`)
      } else {
        router.push("/")
      }
    }
  }

  const handleClose = () => {
    router.push("/")
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    // In a real app, we would send the message to the server
    console.log(`Sending message to ${story.user.username}: ${message}`)
    setMessage("")

    // Show a toast or feedback
    handleNext()
  }

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Progress bars */}
      <div className="absolute top-0 left-0 right-0 z-10 flex px-2 pt-2 gap-1">
        {story.items?.map((_, index) => (
          <div key={index} className="h-1 bg-white/30 rounded-full flex-1 overflow-hidden">
            {index === activeIndex && (
              <div className="h-full bg-white rounded-full" style={{ width: `${progress}%` }} />
            )}
            {index < activeIndex && <div className="h-full bg-white rounded-full w-full" />}
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center p-4 pt-6">
        <div className="flex items-center">
          <UserAvatar src={story.user.avatar} name={story.user.name} size="sm" />
          <div className="ml-2">
            <p className="text-white font-medium">{story.user.username}</p>
            <p className="text-white/70 text-xs">{currentItem.time}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="text-white h-8 w-8" onClick={handleClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Story content */}
      <div
        className="flex-1 flex items-center justify-center"
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        onMouseDown={() => setIsPaused(true)}
        onMouseUp={() => setIsPaused(false)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat"
          style={{ backgroundImage: `url(${currentItem.image})` }}
        >
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Navigation areas */}
        <div className="absolute left-0 top-0 bottom-0 w-1/3 z-10" onClick={handlePrevious} />
        <div className="absolute right-0 top-0 bottom-0 w-1/3 z-10" onClick={handleNext} />

        {/* Caption */}
        {currentItem.caption && (
          <div className="absolute bottom-20 left-4 right-4 text-white text-center">
            <p className="text-lg font-medium">{currentItem.caption}</p>
          </div>
        )}
      </div>

      {/* Footer / Reply */}
      <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <Input
            placeholder={`Reply to ${story.user.username}...`}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="bg-white/10 border-0 text-white placeholder:text-white/70 focus-visible:ring-0"
          />
          <Button
            type="submit"
            size="icon"
            className="bg-primary text-white h-10 w-10 rounded-full"
            disabled={!message.trim()}
          >
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  )
}
