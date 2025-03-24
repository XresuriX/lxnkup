import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function OnboardingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md mx-auto text-center">
          <div className="mb-8 flex justify-center">
            <Logo size="lg" />
          </div>

          <h1 className="text-3xl font-bold mb-6">
            Welcome to <span className="gradient-text">SocialConnect</span>
          </h1>

          <p className="text-muted-foreground mb-8">Connect with friends, share moments, and discover communities.</p>

          <div className="space-y-4">
            <Button asChild variant="gradient" className="w-full">
              <Link href="/onboarding/signup">Create an account</Link>
            </Button>

            <Button asChild variant="outline" className="w-full">
              <Link href="/onboarding/login">Log in</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
