import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  className?: string
}

export function FeatureCard({ icon: Icon, title, description, className }: FeatureCardProps) {
  return (
    <div
      className={cn(
        "relative p-6 rounded-2xl border bg-black/20 backdrop-blur-sm",
        "hover:border-caribbean/50 transition-all duration-300",
        "group",
        className,
      )}
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-caribbean to-gold opacity-0 group-hover:opacity-20 rounded-2xl blur-sm transition-opacity duration-300"></div>

      <div className="relative">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-caribbean to-gold flex items-center justify-center mb-4">
          <Icon className="w-6 h-6 text-black" />
        </div>

        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}
