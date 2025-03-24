"use client"

import { DesktopLayout } from "@/components/desktop-layout"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { useIsMobile } from "@/hooks/use-mobile"
import { useState } from "react"

export default function Welcome() {
  const isMobile = useIsMobile()
  const [imageLoaded, setImageLoaded] = useState(true)

  if (isMobile) {
    return (
      <DesktopLayout showNav={false} showRightSidebar={false}>
        <div className="flex flex-col items-center justify-between min-h-[calc(100vh-44px)] p-6">
          <div className="w-full">
            <h1 className="text-2xl font-bold mb-2">Welcome to LxnkUp</h1>
            <p className="text-muted-foreground mb-6">Join our community and connect with friends around the world</p>
          </div>

          <div className="w-full flex-1 flex items-center justify-center">
            {imageLoaded ? (
              <Image
                src="/placeholder.svg?height=300&width=300"
                alt="Welcome illustration"
                width={300}
                height={300}
                className="rounded-lg"
                onError={() => setImageLoaded(false)}
              />
            ) : (
              <div className="w-[300px] h-[300px] bg-muted rounded-lg flex items-center justify-center">
                <span className="text-muted-foreground">Image not available</span>
              </div>
            )}
          </div>

          <div className="w-full space-y-4 mt-6">
            <Link href="/login" className="w-full block">
              <Button className="w-full bg-brand-green hover:bg-brand-green/90">Sign in with Email</Button>
            </Link>

            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/register" className="text-brand-green font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </DesktopLayout>
    )
  }

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="bg-brand-green flex flex-col justify-center items-center p-8 text-white">
        <div className="text-4xl font-bold mb-4">LxnkUp</div>
        <h1 className="text-3xl font-bold mb-4">Connect with the world</h1>
        <p className="text-xl max-w-md text-center">
          Join millions of users and share your stories, photos, and experiences.
        </p>
      </div>

      <div className="flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md space-y-6">
          <div className="text-4xl font-bold mb-2">Welcome</div>
          <p className="text-xl text-muted-foreground mb-6">Join our community today</p>

          <div className="space-y-4">
            <Link href="/login" className="w-full block">
              <Button className="w-full bg-brand-green hover:bg-brand-green/90 py-6 text-lg">Sign in with Email</Button>
            </Link>

            <Button variant="outline" className="w-full py-6 text-lg">
              Continue with Google
            </Button>

            <Button variant="outline" className="w-full py-6 text-lg">
              Continue with Apple
            </Button>

            <p className="text-center text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/register" className="text-brand-green font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
