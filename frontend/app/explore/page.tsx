"use client"

import { DesktopLayout } from "@/components/desktop-layout"
import { useAppStore } from "@/lib/store"
import { Input } from "@/components/ui/input"
import { Search, Heart, Plus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useIsMobile } from "@/hooks/use-mobile"

export default function Explore() {
  const explorePosts = useAppStore((state) => state.explorePosts)
  const isMobile = useIsMobile()

  return (
    <DesktopLayout>
      <div className="p-4">
        {!isMobile && <h1 className="text-2xl font-bold mb-4">Explore</h1>}

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input placeholder="Search posts" className="pl-10 bg-muted border-none rounded-full" />
        </div>

        <div className="grid grid-cols-3 gap-1 md:gap-3">
          {explorePosts.map((post) => (
            <Link key={post.id} href={`/explore/${post.id}`} className="relative aspect-square group">
              <Image
                src={post.image || "/placeholder.svg"}
                alt={`Post ${post.id}`}
                width={300}
                height={300}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="flex items-center gap-1 text-white">
                  <Heart className="w-4 h-4 fill-white" />
                  <span>{post.likes}</span>
                </div>
              </div>
            </Link>
          ))}
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
