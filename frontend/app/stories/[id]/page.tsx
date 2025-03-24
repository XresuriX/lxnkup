"use client"

import { StoryViewer } from "@/components/stories/story-viewer"
import { useParams } from "next/navigation"

export default function StoryPage() {
  const params = useParams()
  const storyId = params.id as string

  return <StoryViewer storyId={storyId} />
}
