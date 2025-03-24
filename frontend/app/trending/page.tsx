"use client"

import { DesktopLayout } from "@/components/desktop-layout"
import { Button } from "@/components/ui/button"
import { Search, Settings } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useIsMobile } from "@/hooks/use-mobile"

// Screen 10: Trending Page
export default function Trending() {
  const isMobile = useIsMobile()

  // Mock trending data
  const trendingTopics = [
    {
      id: "1",
      category: "Sports",
      title: "World Cup",
      postCount: "125K posts",
    },
    {
      id: "2",
      category: "Entertainment",
      title: "New Movie Release",
      postCount: "89.5K posts",
    },
    {
      id: "3",
      category: "Technology",
      title: "iPhone 15",
      postCount: "45.2K posts",
    },
    {
      id: "4",
      category: "Politics",
      title: "Election Results",
      postCount: "203K posts",
    },
    {
      id: "5",
      category: "Business",
      title: "Stock Market",
      postCount: "32.1K posts",
    },
    {
      id: "6",
      category: "Health",
      title: "COVID-19",
      postCount: "78.3K posts",
    },
  ]

  const whatsHappening = [
    {
      id: "1",
      time: "LIVE",
      title: "Breaking news: Major announcement from tech giant",
      image: "/placeholder.svg?height=100&width=100&text=News",
    },
    {
      id: "2",
      time: "2 hours ago",
      title: "Sports: Championship finals set for this weekend",
      image: "/placeholder.svg?height=100&width=100&text=Sports",
    },
  ]

  return (
    <DesktopLayout>
      <div className="pb-16">
        {isMobile && (
          <div className="sticky top-0 z-10 bg-background">
            <div className="flex items-center justify-between p-4">
              <Link href="/profile">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5">
                    <g>
                      <path d="M5.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C15.318 13.65 13.838 13 12 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46zM12 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM8 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4z"></path>
                    </g>
                  </svg>
                </Button>
              </Link>

              <div className="mx-auto">
                <span className="font-bold text-xl">LxnkUp</span>
              </div>

              <Link href="/settings">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <Settings className="w-5 h-5" />
                </Button>
              </Link>
            </div>

            <div className="px-4 pb-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input placeholder="Search LxnkUp" className="pl-10 bg-muted border-none rounded-full" />
              </div>
            </div>

            <div className="x-tabs">
              <Link href="/trending" className="x-tab active">
                For you
              </Link>
              <Link href="/trending/news" className="x-tab">
                News
              </Link>
              <Link href="/trending/sports" className="x-tab">
                Sports
              </Link>
              <Link href="/trending/entertainment" className="x-tab">
                Entertainment
              </Link>
            </div>
          </div>
        )}

        <div className="p-4">
          <h2 className="font-bold text-xl mb-4">What's happening</h2>

          {whatsHappening.map((item) => (
            <div key={item.id} className="flex items-start gap-3 mb-4">
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">{item.time}</p>
                <p className="font-bold">{item.title}</p>
              </div>
              <div className="w-16 h-16 rounded-xl overflow-hidden">
                <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-full object-cover" />
              </div>
            </div>
          ))}

          <h2 className="font-bold text-xl mt-6 mb-4">Trends for you</h2>

          {trendingTopics.map((topic) => (
            <div key={topic.id} className="py-3 px-4 hover:bg-muted transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs text-muted-foreground">{topic.category} · Trending</p>
                  <p className="font-bold">{topic.title}</p>
                  <p className="text-xs text-muted-foreground">{topic.postCount}</p>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5">
                    <g>
                      <path d="M3 12c0-1.1.9-2 2-2s2  className="w-5 h-5\">
                    <g>
                      <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
                    </g>
                  </svg>
                </Button>
              </div>
            </div>
          ))}

          <div className="mt-4 text-primary">
            <Link href="/trending/more">Show more</Link>
          </div>
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
