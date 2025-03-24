import { SidebarNavigation } from "@/components/sidebar-navigation"
import { RightSidebar } from "@/components/right-sidebar"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function Loading() {
  return (
    <div className="min-h-screen bg-black">
      <div className="flex">
        <SidebarNavigation />

        <main className="min-h-screen flex-1 border-l border-r border-twitter-gray max-w-xl">
          <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-twitter-gray">
            <div className="px-4 py-3">
              <h1 className="text-xl font-bold">Home</h1>
            </div>

            <div className="grid grid-cols-2 border-b">
              <div className="py-4 text-center font-medium border-b-2 border-caribbean">For you</div>
              <div className="py-4 text-center text-muted-foreground">Following</div>
            </div>
          </div>

          <div className="animate-pulse">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="border-b border-twitter-gray p-4">
                <div className="flex gap-3">
                  <div className="w-12 h-12 bg-twitter-gray rounded-full"></div>
                  <div className="flex-1">
                    <div className="flex gap-2 mb-2">
                      <div className="h-4 bg-twitter-gray rounded w-24"></div>
                      <div className="h-4 bg-twitter-gray rounded w-20"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 bg-twitter-gray rounded w-full"></div>
                      <div className="h-4 bg-twitter-gray rounded w-full"></div>
                      <div className="h-4 bg-twitter-gray rounded w-3/4"></div>
                    </div>
                    {i % 2 === 0 && <div className="mt-3 h-48 bg-twitter-gray rounded-xl"></div>}
                    <div className="mt-3 flex justify-between">
                      <div className="h-4 bg-twitter-gray rounded w-8"></div>
                      <div className="h-4 bg-twitter-gray rounded w-8"></div>
                      <div className="h-4 bg-twitter-gray rounded w-8"></div>
                      <div className="h-4 bg-twitter-gray rounded w-8"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>

        <RightSidebar />
      </div>

      <BottomNavigation />
    </div>
  )
}
