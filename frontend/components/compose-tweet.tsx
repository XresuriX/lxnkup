"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Image, MapPin, Calendar, Smile, VoteIcon as Poll } from "lucide-react"
import { cn } from "@/lib/utils"
import { usePostTweet } from "@/lib/api"
import { useTweetStore } from "@/lib/store/use-tweet-store"
import { tweetSchema, type TweetFormValues } from "@/lib/validations/tweet"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

interface ComposeTweetProps {
  placeholder?: string
  className?: string
  compact?: boolean
  onSuccess?: () => void
}

export function ComposeTweet({
  placeholder = "What's happening?",
  className,
  compact = false,
  onSuccess,
}: ComposeTweetProps) {
  const [images, setImages] = useState<string[]>([])
  const [isExpanded, setIsExpanded] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const { addTweet } = useTweetStore()
  const { mutate: postTweet, isPending } = usePostTweet()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TweetFormValues>({
    resolver: zodResolver(tweetSchema),
    defaultValues: {
      content: "",
      images: [],
    },
  })

  const handleFocus = () => {
    setIsExpanded(true)
  }

  const handleAddImage = () => {
    // In a real app, you would open a file picker
    // For now, we'll just add a placeholder image
    if (images.length < 4) {
      setImages([...images, "/placeholder.svg?height=400&width=600"])
    }
  }

  const handleRemoveImage = (index: number) => {
    const newImages = [...images]
    newImages.splice(index, 1)
    setImages(newImages)
  }

  const onSubmit = (data: TweetFormValues) => {
    postTweet(
      { content: data.content, images },
      {
        onSuccess: (newTweet) => {
          // Add the tweet to our local store
          addTweet(newTweet)

          // Reset form
          reset()
          setImages([])
          setIsExpanded(false)

          // Notify success
          toast.success("Tweet posted!")

          // Call onSuccess callback if provided
          onSuccess?.()
        },
        onError: () => {
          toast.error("Failed to post tweet. Please try again.")
        },
      },
    )
  }

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("border-b border-twitter-gray p-4", compact ? "py-2" : "py-4", className)}
    >
      <div className="flex gap-3">
        <Avatar size={compact ? "sm" : "md"} name="User" />

        <div className="flex-1">
          <textarea
            {...register("content")}
            ref={textareaRef}
            placeholder={placeholder}
            onChange={handleTextareaChange}
            onFocus={handleFocus}
            className={cn(
              "w-full bg-transparent border-none outline-none resize-none",
              "placeholder:text-muted-foreground text-xl",
              compact ? "min-h-[40px] max-h-[120px]" : "min-h-[60px] max-h-[300px]",
              errors.content && "border-red-500",
            )}
            rows={1}
          />

          {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}

          {images.length > 0 && (
            <div
              className={cn(
                "mt-3 grid gap-2 rounded-2xl overflow-hidden",
                images.length === 1
                  ? "grid-cols-1"
                  : images.length === 2
                    ? "grid-cols-2"
                    : images.length === 3
                      ? "grid-cols-2"
                      : "grid-cols-2",
              )}
            >
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Tweet image ${index + 1}`}
                    className="w-full h-auto object-cover rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-2 right-2 bg-black/70 text-white p-1 rounded-full"
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                      <g>
                        <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
                      </g>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}

          {(isExpanded || compact) && (
            <>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center text-caribbean">
                  <button
                    type="button"
                    onClick={handleAddImage}
                    className="p-2 rounded-full hover:bg-caribbean/10"
                    disabled={images.length >= 4}
                  >
                    <Image size={20} />
                  </button>
                  <button type="button" className="p-2 rounded-full hover:bg-caribbean/10">
                    <Poll size={20} />
                  </button>
                  <button type="button" className="p-2 rounded-full hover:bg-caribbean/10">
                    <Smile size={20} />
                  </button>
                  <button type="button" className="p-2 rounded-full hover:bg-caribbean/10">
                    <Calendar size={20} />
                  </button>
                  <button type="button" className="p-2 rounded-full hover:bg-caribbean/10">
                    <MapPin size={20} />
                  </button>
                </div>

                <Button
                  type="submit"
                  disabled={isPending}
                  className="rounded-full bg-caribbean hover:bg-caribbean/90 text-black font-bold"
                  size={compact ? "sm" : "default"}
                >
                  {isPending ? "Posting..." : "Tweet"}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </form>
  )
}
