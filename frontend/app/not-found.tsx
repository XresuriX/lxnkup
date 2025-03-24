import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
      <p className="text-muted-foreground mb-6">The page you are looking for doesn't exist or has been moved.</p>
      <Link href="/">
        <Button className="bg-brand-green hover:bg-brand-green/90">Return Home</Button>
      </Link>
    </div>
  )
}
