"use client"

import { useState } from "react"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Image, MapPin, Tag, X } from "lucide-react"
import { useRouter } from "next/navigation"

export default function CreatePostPage() {
  const router = useRouter()
  const [content, setContent] = useState("")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const handlePost = () => {
    // In a real app, you would send the post to the server
    router.push("/home")
  }

  const handleImageSelect = () => {
    // In a real app, you would open a file picker
    setSelectedImage("/placeholder.svg?height=400&width=600")
  }

  const handleRemoveImage = () => {
    setSelectedImage(null)
  }

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => router.back()} className="text-muted-foreground">
            <ArrowLeft size={24} />
          </button>
          <h1 className="font-bold text-xl">Create Post</h1>
          <Button variant="gradient" size="sm" onClick={handlePost} disabled={content.trim() === "" && !selectedImage}>
            Post
          </Button>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-4">
        <div className="flex gap-3 mb-4">
          <Avatar size="md" name="User" />
          <div className="flex-1">
            <textarea
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-transparent border-none outline-none resize-none h-32"
            />

            {selectedImage && (
              <div className="relative mt-2 rounded-xl overflow-hidden">
                <img src={selectedImage || "/placeholder.svg"} alt="Selected image" className="w-full h-auto" />
                <button onClick={handleRemoveImage} className="absolute top-2 right-2 bg-black/70 p-1 rounded-full">
                  <X size={20} />
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="sticky bottom-0 bg-background border-t p-3">
        <div className="container mx-auto flex items-center justify-around">
          <button className="flex items-center gap-2 text-muted-foreground" onClick={handleImageSelect}>
            <Image size={24} />
            <span>Image</span>
          </button>
          <button className="flex items-center gap-2 text-muted-foreground">
            <Tag size={24} />
            <span>Tag</span>
          </button>
          <button className="flex items-center gap-2 text-muted-foreground">
            <MapPin size={24} />
            <span>Location</span>
          </button>
        </div>
      </footer>
    </div>
  )
}
