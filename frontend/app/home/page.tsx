"use client"

import { SidebarNavigation } from "@/components/sidebar-navigation"
import { RightSidebar } from "@/components/right-sidebar"
import { BottomNavigation } from "@/components/bottom-navigation"
import { ComposeTweet } from "@/components/compose-tweet"
import { Tweet } from "@/components/tweet"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTweets } from "@/lib/api"
import { Loader2 } from "lucide-react"
import App from "@/components/newscene"
import HtmlText from "@/components/ex1"
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'


const queryClient = new QueryClient()


export default function HomePage() {
  const { data: tweets, isLoading, error } = useTweets()

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background">
        <div className="flex">
          <SidebarNavigation />

          <main className="min-h-screen flex-1 border-l border-r border-twitter-gray max-w-xl">
            <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-twitter-gray">
              <div className="px-4 py-3">
                <h1 className="text-xl font-bold">Home</h1>
              </div>

              <Tabs defaultValue="for-you">
                <TabsList className="grid grid-cols-2">
                  <TabsTrigger value="for-you" className="py-4">
                    For you
                  </TabsTrigger>
                  <TabsTrigger value="following" className="py-4">
                    Following
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <ComposeTweet />

            {isLoading ? (
              <div className="flex justify-center items-center p-8">
                <Loader2 className="w-8 h-8 animate-spin text-caribbean" />
              </div>
            ) : error ? (
              <div className="p-8 text-center text-muted-foreground">Something went wrong. Please try again.</div>
            ) : tweets && tweets.length > 0 ? (
              <div>
                <App/>
                {tweets.map((tweet) => (
                  <Tweet key={tweet.id} tweet={tweet} />
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-muted-foreground">No tweets yet. Be the first to tweet!</div>
            )}
          </main>

          <RightSidebar />
        </div>

        <BottomNavigation />
      </div>
    </QueryClientProvider>
  )
}
