"use client"

import { useState } from "react"
import { DesktopLayout } from "@/components/desktop-layout"
import { UserAvatar } from "@/components/user-avatar"
import { useAppStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, ImageIcon, MapPin, Tag, X } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { v4 as uuidv4 } from "uuid"
import { useIsMobile } from "@/hooks/use-mobile"

export default function CreatePost() {
  const router = useRouter()
  const currentUser = useAppStore((state) => state.currentUser)
  const addPost = useAppStore((state) => state.addPost)
  const [content, setContent] = useState("")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isMobile = useIsMobile()

  const handleSubmit = () => {
    if (!content.trim() || !selectedImage || !currentUser) return

    setIsSubmitting(true)

    // In a real app, we would upload the image to a server
    // For demo purposes, we'll just use the placeholder image
    const newPost = {
      id: uuidv4(),
      user: currentUser,
      content,
      image: selectedImage,
      likes: 0,
      comments: 0,
      isLiked: false,
      createdAt: "Just now",
    }

    addPost(newPost)

    // Simulate a delay for the post creation
    setTimeout(() => {
      router.push("/")
    }, 1000)
  }

  return (
    <DesktopLayout showNav={!isMobile}>
      <div className={`${isMobile ? "flex flex-col h-[calc(100vh-44px)]" : "max-w-3xl mx-auto"}`}>
        {isMobile ? (
          <div className="border-b p-3 flex items-center gap-3">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>

            <h1 className="font-medium">Create Post</h1>

            <Button
              className="ml-auto bg-brand-green hover:bg-brand-green/90"
              size="sm"
              onClick={handleSubmit}
              disabled={!content.trim() || !selectedImage || isSubmitting}
            >
              {isSubmitting ? "Posting..." : "Post"}
            </Button>
          </div>
        ) : (
          <div className="p-4 border-b flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Button variant="ghost" onClick={() => router.back()}>
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back
              </Button>
              <h1 className="text-xl font-bold">Create New Post</h1>
            </div>
            <Button
              className="bg-brand-green hover:bg-brand-green/90"
              onClick={handleSubmit}
              disabled={!content.trim() || !selectedImage || isSubmitting}
            >
              {isSubmitting ? "Posting..." : "Post"}
            </Button>
          </div>
        )}

        <div className={`${isMobile ? "flex-1 overflow-y-auto p-4" : "p-6"}`}>
          {currentUser && (
            <div className="flex items-center gap-3 mb-4">
              <UserAvatar src={currentUser.avatar} name={currentUser.name} size="sm" />

              <div>
                <p className="font-medium">{currentUser.name}</p>
                <p className="text-xs text-muted-foreground">@{currentUser.username}</p>
              </div>
            </div>
          )}

          <Textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full resize-none border-none focus-visible:ring-0 p-0 text-base"
            rows={4}
          />

          {selectedImage ? (
            <div className="relative mt-4 rounded-lg overflow-hidden">
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8 rounded-full"
                onClick={() => setSelectedImage(null)}
              >
                <X className="h-4 w-4" />
              </Button>
              <Image
                src={selectedImage || "/placeholder.svg"}
                alt="Selected image"
                width={400}
                height={400}
                className="w-full h-auto"
              />
            </div>
          ) : (
            <div className="mt-4 border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center">
              <ImageIcon className="h-10 w-10 text-muted-foreground mb-2" />
              <p className="text-muted-foreground text-sm mb-4">Add photos to your post</p>
              <Button
                variant="outline"
                onClick={() => setSelectedImage("/placeholder.svg?height=500&width=500&text=Your+Image")}
              >
                Select from gallery
              </Button>
            </div>
          )}
        </div>

        {isMobile && (
          <div className="border-t p-3 flex items-center justify-around">
            <Button variant="ghost" className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-brand-green" />
              <span>Photo</span>
            </Button>

            <Button variant="ghost" className="flex items-center gap-2">
              <Tag className="h-5 w-5 text-brand-green" />
              <span>Tag</span>
            </Button>

            <Button variant="ghost" className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-brand-green" />
              <span>Location</span>
            </Button>
          </div>
        )}
      </div>
    </DesktopLayout>
  )
}
