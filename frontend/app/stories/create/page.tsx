"use client"

import { useState } from "react"
import { DesktopLayout } from "@/components/desktop-layout"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Camera, ImageIcon, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useAppStore } from "@/lib/store"
import { v4 as uuidv4 } from "uuid"
import Image from "next/image"

export default function CreateStory() {
  const router = useRouter()
  const currentUser = useAppStore((state) => state.currentUser)
  const addStory = useAppStore((state) => state.addStory)

  const [caption, setCaption] = useState("")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = () => {
    if (!selectedImage || !currentUser) return

    setIsSubmitting(true)

    // Create a new story
    const newStory = {
      id: uuidv4(),
      user: currentUser,
      items: [
        {
          id: uuidv4(),
          image: selectedImage,
          caption: caption || undefined,
          time: "Just now",
        },
      ],
      createdAt: "Just now",
    }

    // Add the story to the store
    addStory(newStory)

    // Redirect to the story
    setTimeout(() => {
      router.push(`/stories/${newStory.id}`)
    }, 500)
  }

  return (
    <DesktopLayout showNav={false}>
      <div className="flex flex-col min-h-screen">
        <div className="border-b p-3 flex items-center gap-3">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <h1 className="font-medium">Create Story</h1>

          <Button
            className="ml-auto bg-brand-green hover:bg-brand-green/90"
            size="sm"
            onClick={handleSubmit}
            disabled={!selectedImage || isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Share"}
          </Button>
        </div>

        <div className="flex-1 p-4">
          {selectedImage ? (
            <div className="relative aspect-[9/16] w-full max-w-md mx-auto rounded-lg overflow-hidden mb-4">
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8 rounded-full z-10"
                onClick={() => setSelectedImage(null)}
              >
                <X className="h-4 w-4" />
              </Button>
              <Image src={selectedImage || "/placeholder.svg"} alt="Story preview" fill className="object-cover" />
            </div>
          ) : (
            <div className="aspect-[9/16] w-full max-w-md mx-auto border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center mb-4">
              <ImageIcon className="h-10 w-10 text-muted-foreground mb-2" />
              <p className="text-muted-foreground text-sm mb-4">Add a photo to your story</p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setSelectedImage("/placeholder.svg?height=800&width=400&text=Your+Story")}
                  className="flex items-center gap-2"
                >
                  <ImageIcon className="h-4 w-4" />
                  <span>Gallery</span>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setSelectedImage("/placeholder.svg?height=800&width=400&text=Camera+Photo")}
                  className="flex items-center gap-2"
                >
                  <Camera className="h-4 w-4" />
                  <span>Camera</span>
                </Button>
              </div>
            </div>
          )}

          {selectedImage && (
            <div className="w-full max-w-md mx-auto">
              <Textarea
                placeholder="Add a caption..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="resize-none"
                rows={3}
              />
            </div>
          )}
        </div>
      </div>
    </DesktopLayout>
  )
}
