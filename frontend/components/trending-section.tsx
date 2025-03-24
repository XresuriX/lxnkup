"use client"

import { MoreHorizontal } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

interface TrendingTopic {
  id: number
  category: string
  title: string
  tweetCount: number
}

interface TrendingSectionProps {
  trends: TrendingTopic[]
}

export function TrendingSection({ trends }: TrendingSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-twitter-gray rounded-2xl overflow-hidden"
    >
      <h2 className="text-xl font-bold p-4">Trends for you</h2>

      <div>
        {trends.map((trend, index) => (
          <motion.div
            key={trend.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
            className="px-4 py-3 hover:bg-twitter-lightGray transition-colors cursor-pointer"
          >
            <div className="flex justify-between">
              <span className="text-xs text-muted-foreground">{trend.category}</span>
              <button className="text-muted-foreground p-1 rounded-full hover:bg-caribbean/10 hover:text-caribbean">
                <MoreHorizontal size={16} />
              </button>
            </div>
            <h3 className="font-bold">{trend.title}</h3>
            <span className="text-xs text-muted-foreground">{trend.tweetCount.toLocaleString()} Tweets</span>
          </motion.div>
        ))}
      </div>

      <Link href="/explore" className="block p-4 text-caribbean hover:bg-twitter-lightGray transition-colors">
        Show more
      </Link>
    </motion.div>
  )
}
