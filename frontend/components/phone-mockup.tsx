import Image from "next/image"
import { cn } from "@/lib/utils"

interface PhoneMockupProps {
  className?: string
  imageUrl: string
  alt: string
}

export function PhoneMockup({ className, imageUrl, alt }: PhoneMockupProps) {
  return (
    <div className={cn("relative mx-auto", className)}>
      {/* Phone frame */}
      <div className="relative w-[280px] h-[580px] bg-black rounded-[40px] p-4 shadow-xl border-4 border-gray-800">
        {/* Screen */}
        <div className="relative w-full h-full overflow-hidden rounded-[32px] bg-gray-900">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-6 bg-black rounded-b-xl z-10"></div>

          {/* Screen content */}
          <div className="relative w-full h-full">
            <Image src={imageUrl || "/placeholder.svg"} alt={alt} fill className="object-cover" priority />
          </div>
        </div>
      </div>
    </div>
  )
}
