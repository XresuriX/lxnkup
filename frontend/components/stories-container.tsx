"use client"

import { useRef, useState } from "react"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { StoryCircle } from "./story-circle"
import { Button } from "@/components/ui/button"
import { useAppStore } from "@/lib/store"
import { useRouter } from "next/navigation"

export function StoriesContainer() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)
  const router = useRouter()

  // Get stories from store
  const stories = useAppStore((state) => state.stories)
  const currentUser = useAppStore((state) => state.currentUser)
  const viewedStories = useAppStore((state) => state.viewedStories)
  const setActiveStory = useAppStore((state) => state.setActiveStory)

  const handleScroll = () => {
    if (!containerRef.current) return

    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current
    setShowLeftArrow(scrollLeft > 0)
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
  }

  const scrollLeft = () => {
    if (!containerRef.current) return
    containerRef.current.scrollBy({ left: -200, behavior: "smooth" })
  }

  const scrollRight = () => {
    if (!containerRef.current) return
    containerRef.current.scrollBy({ left: 200, behavior: "smooth" })
  }

  const handleStoryPress = (id: string) => {
    setActiveStory(id)
    router.push(`/stories/${id}`)
  }

  const handleCreateStory = () => {
    router.push("/stories/create")
  }

  return (
    <div className="relative">
      {showLeftArrow && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 rounded-full h-8 w-8"
          onClick={scrollLeft}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
      )}

      <div
        ref={containerRef}
        className="flex space-x-4 overflow-x-auto py-3 px-4 scrollbar-hide"
        onScroll={handleScroll}
      >
        {/* Your story */}
        {currentUser && (
          <div className="flex flex-col items-center space-y-1 cursor-pointer" onClick={handleCreateStory}>
            <div className="relative">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-dashed border-muted-foreground p-[2px]">
                <div className="w-full h-full rounded-full bg-muted flex items-center justify-center">
                  <Plus className="h-6 w-6 text-muted-foreground" />
                </div>
              </div>
            </div>
            <span className="text-xs">Your story</span>
          </div>
        )}

        {/* Other stories */}
        {stories.map((story) => (
          <StoryCircle
            key={story.id}
            id={story.id}
            username={story.user.username}
            avatar={story.user.avatar}
            viewed={viewedStories.includes(story.id)}
            onPress={handleStoryPress}
          />
        ))}
      </div>

      {showRightArrow && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 rounded-full h-8 w-8"
          onClick={scrollRight}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      )}
    </div>
  )
}
