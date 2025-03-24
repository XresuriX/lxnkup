import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

export function Logo({ className, size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  }

  return (
    <div className={cn("relative", sizeClasses[size], className)}>
      <div className="absolute inset-0 bg-caribbean rounded-full opacity-20 animate-pulse"></div>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("relative z-10", className)}
      >
        <path
          d="M13 3L4 14H15L11 21"
          stroke="url(#gradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <defs>
          <linearGradient id="gradient" x1="4" y1="3" x2="15" y2="21" gradientUnits="userSpaceOnUse">
            <stop stopColor="#00D9A5" />
            <stop offset="1" stopColor="#FFD700" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
