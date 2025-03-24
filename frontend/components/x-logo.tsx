import { cn } from "@/lib/utils"

interface XLogoProps {
  className?: string
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  variant?: "default" | "gradient"
}

export function XLogo({ className, size = "md", variant = "default" }: XLogoProps) {
  const sizeClasses = {
    xs: "w-4 h-4",
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
    xl: "w-12 h-12",
  }

  return (
    <div className={cn("relative", sizeClasses[size], className)}>
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={cn("fill-current", variant === "default" ? "text-caribbean" : "text-transparent")}
      >
        <g>
          <path
            d={
              variant === "gradient"
                ? "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                : "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
            }
            fill={variant === "gradient" ? "url(#gradient)" : "currentColor"}
          />
          {variant === "gradient" && (
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                <stop stopColor="#00D9A5" />
                <stop offset="1" stopColor="#FFD700" />
              </linearGradient>
            </defs>
          )}
        </g>
      </svg>
    </div>
  )
}
