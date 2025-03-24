"use client"

import { DesktopLayout } from "@/components/desktop-layout"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, ChevronRight, Lock, Globe, Users, Bell, Eye, Shield } from "lucide-react"
import Link from "next/link"
import { useIsMobile } from "@/hooks/use-mobile"

// Screen 31: Privacy Settings Page
export default function Privacy() {
  const isMobile = useIsMobile()

  return (
    <DesktopLayout>
      <div className="pb-4">
        <div className="sticky top-0 z-10 bg-background border-b">
          <div className="flex items-center p-4">
            <Link href="/settings">
              <Button variant="ghost" size="icon" className="h-8 w-8 mr-6">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="font-bold text-xl">Privacy and safety</h1>
          </div>
        </div>

        <div className="p-4">
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold mb-2">Your account</h2>
              <div className="rounded-lg border overflow-hidden">
                <Link href="/privacy/account" className="flex items-center justify-between p-4 hover:bg-muted">
                  <div className="flex items-center gap-3">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                    <span>Manage your account's privacy</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </Link>

                <div className="border-t" />

                <Link href="/privacy/audience" className="flex items-center justify-between p-4 hover:bg-muted">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <span>Manage who can see your content</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </Link>

                <div className="border-t" />

                <Link href="/privacy/location" className="flex items-center justify-between p-4 hover:bg-muted">
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-muted-foreground" />
                    <span>Manage location information</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </Link>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-bold mb-2">Direct Messages</h2>
              <div className="rounded-lg border overflow-hidden">
                <div className="flex items-center justify-between p-4">
                  <div className="flex-1">
                    <p className="font-medium">Message requests</p>
                    <p className="text-sm text-muted-foreground">Filter low-quality messages</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="border-t" />

                <div className="flex items-center justify-between p-4">
                  <div className="flex-1">
                    <p className="font-medium">Show read receipts</p>
                    <p className="text-sm text-muted-foreground">Let others know when you've seen their messages</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-bold mb-2">Discoverability and contacts</h2>
              <div className="rounded-lg border overflow-hidden">
                <div className="flex items-center justify-between p-4">
                  <div className="flex-1">
                    <p className="font-medium">Allow others to find you by email</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="border-t" />

                <div className="flex items-center justify-between p-4">
                  <div className="flex-1">
                    <p className="font-medium">Allow others to find you by phone</p>
                  </div>
                  <Switch />
                </div>

                <div className="border-t" />

                <Link href="/privacy/contacts" className="flex items-center justify-between p-4 hover:bg-muted">
                  <span>Manage contacts</span>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </Link>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-bold mb-2">Spaces</h2>
              <div className="rounded-lg border overflow-hidden">
                <div className="flex items-center justify-between p-4">
                  <div className="flex-1">
                    <p className="font-medium">Allow followers to see which Spaces you're listening to</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-bold mb-2">Posts</h2>
              <div className="rounded-lg border overflow-hidden">
                <Link href="/privacy/tags" className="flex items-center justify-between p-4 hover:bg-muted">
                  <div className="flex items-center gap-3">
                    <Bell className="h-5 w-5 text-muted-foreground" />
                    <span>Tagging</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </Link>

                <div className="border-t" />

                <Link href="/privacy/content" className="flex items-center justify-between p-4 hover:bg-muted">
                  <div className="flex items-center gap-3">
                    <Eye className="h-5 w-5 text-muted-foreground" />
                    <span>Content you see</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </Link>

                <div className="border-t" />

                <Link href="/privacy/mute-block" className="flex items-center justify-between p-4 hover:bg-muted">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-muted-foreground" />
                    <span>Muted and blocked accounts</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </Link>
              </div>
            </div>

            <div className="pt-4">
              <Link href="/privacy/data" className="text-primary">
                Your X data
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DesktopLayout>
  )
}
